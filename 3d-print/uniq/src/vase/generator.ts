import { generateHash } from '../core/hash.js';
import { generateGradientPalette, oklchToHex, oklchToCSS } from '../core/oklch.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';
import type { VaseParams, OKLCHColor, ColorLayer } from '../core/types.js';

const DEFAULT_PARAMS: VaseParams = {
  height: 100,
  bottomRadius: 30,
  topRadius: 20,
  wallThickness: 2,
  layers: 200,
  shape: 'bezier',
};

export function generateVaseGeometry(
  input: string,
  params: Partial<VaseParams> = {},
): { triangles: ReturnType<typeof makeTriangle>[]; profile: number[] } {
  const opts = { ...DEFAULT_PARAMS, ...params };
  const hash = generateHash(input);

  // Generate vase profile (radius at each height) controlled by hash
  const profile: number[] = [];
  const h = opts.height;
  const rBottom = opts.bottomRadius;
  const rTop = opts.topRadius;

  // Use hash bytes to create unique profile variations
  const hashBytes = Array.from(hash.slice(0, 16)).map(c => parseInt(c, 16) / 15);

  for (let i = 0; i <= opts.layers; i++) {
    const t = i / opts.layers;

    let radius: number;
    if (opts.shape === 'bezier') {
      // Bézier vase shape with hash-driven control points
      const bulge = hashBytes[0] * 0.5 + 0.5; // 0.5 - 1.0
      const waist = hashBytes[1] * 0.3 + 0.2; // where the narrowest point is
      const r1 = rBottom;
      const r2 = rBottom * bulge + rTop * (1 - bulge); // max bulge
      const r3 = rTop;

      if (t < waist) {
        const lt = t / waist;
        radius = r1 * (1 - lt) * (1 - lt) + 2 * r1 * lt * (1 - lt) + r2 * lt * lt;
      } else {
        const lt = (t - waist) / (1 - waist);
        radius = r2 * (1 - lt) * (1 - lt) + 2 * r2 * lt * (1 - lt) + r3 * lt * lt;
      }
    } else if (opts.shape === 'wave') {
      // Wavy profile
      const baseR = rBottom + (rTop - rBottom) * t;
      const waveAmp = hashBytes[2] * 10;
      const waveFreq = hashBytes[3] * 3 + 2;
      radius = baseR + Math.sin(t * Math.PI * waveFreq) * waveAmp;
    } else {
      // Simple cylinder/cone
      radius = rBottom + (rTop - rBottom) * t;
    }

    profile.push(radius);
  }

  // Generate triangles
  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const angularSteps = 48;

  for (let layer = 0; layer < opts.layers; layer++) {
    const z1 = (layer / opts.layers) * h;
    const z2 = ((layer + 1) / opts.layers) * h;
    const r1Outer = profile[layer];
    const r2Outer = profile[layer + 1];
    const r1Inner = Math.max(0, r1Outer - opts.wallThickness);
    const r2Inner = Math.max(0, r2Outer - opts.wallThickness);

    for (let a = 0; a < angularSteps; a++) {
      const a1 = (a / angularSteps) * Math.PI * 2;
      const a2 = ((a + 1) / angularSteps) * Math.PI * 2;

      const cos1 = Math.cos(a1), sin1 = Math.sin(a1);
      const cos2 = Math.cos(a2), sin2 = Math.sin(a2);

      // Outer wall
      triangles.push(...makeQuad(
        { x: cos1 * r1Outer, y: sin1 * r1Outer, z: z1 },
        { x: cos2 * r1Outer, y: sin2 * r1Outer, z: z1 },
        { x: cos2 * r2Outer, y: sin2 * r2Outer, z: z2 },
        { x: cos1 * r2Outer, y: sin1 * r2Outer, z: z2 },
      ));

      // Inner wall (reversed normals)
      if (r1Inner > 0 && r2Inner > 0) {
        triangles.push(...makeQuad(
          { x: cos2 * r1Inner, y: sin2 * r1Inner, z: z1 },
          { x: cos1 * r1Inner, y: sin1 * r1Inner, z: z1 },
          { x: cos1 * r2Inner, y: sin1 * r2Inner, z: z2 },
          { x: cos2 * r2Inner, y: sin2 * r2Inner, z: z2 },
        ));
      }
    }
  }

  // Bottom cap
  for (let a = 0; a < angularSteps; a++) {
    const a1 = (a / angularSteps) * Math.PI * 2;
    const a2 = ((a + 1) / angularSteps) * Math.PI * 2;
    const r = profile[0];
    const cos1 = Math.cos(a1), sin1 = Math.sin(a1);
    const cos2 = Math.cos(a2), sin2 = Math.sin(a2);

    triangles.push(...makeQuad(
      { x: cos1 * r, y: sin1 * r, z: 0 },
      { x: cos2 * r, y: sin2 * r, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ));
    // Use a single triangle for bottom fan
    triangles.push(makeTriangle(
      { x: 0, y: 0, z: 0 },
      { x: cos2 * r, y: sin2 * r, z: 0 },
      { x: cos1 * r, y: sin1 * r, z: 0 },
    ));
  }

  return { triangles, profile };
}

export function generateColorMap(
  input: string,
  layers: number,
): { layers: ColorLayer[]; palette: OKLCHColor[]; gcode: string } {
  // Determine number of colors based on layer count
  const numColors = Math.min(Math.max(2, Math.floor(layers / 40)), 8);
  const palette = generateGradientPalette(input, numColors);

  const colorLayers: ColorLayer[] = [];
  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1);
    const palIdx = Math.min(Math.floor(t * numColors), numColors - 1);
    colorLayers.push({
      layerHeight: i * 0.2, // assuming 0.2mm layer height
      color: palette[palIdx],
      filamentIndex: palIdx,
    });
  }

  // Generate M600 color change G-code
  let gcode = '; Uniq vase color change commands\n';
  let lastFilament = 0;
  for (const layer of colorLayers) {
    if (layer.filamentIndex !== lastFilament) {
      gcode += `; Layer at Z=${layer.layerHeight.toFixed(1)}mm\n`;
      gcode += `M600 ; Change to filament ${layer.filamentIndex} (${oklchToCSS(layer.color)})\n`;
      lastFilament = layer.filamentIndex;
    }
  }

  return { layers: colorLayers, palette, gcode };
}

export async function generateVase(
  input: string,
  options: Partial<VaseParams> & { outputFile: string },
): Promise<{
  stlFile: string;
  gcodeFile: string;
  nfcFile: string;
  palette: OKLCHColor[];
  triangles: number;
}> {
  const { triangles } = generateVaseGeometry(input, options);
  const colorMap = generateColorMap(input, options.layers ?? 200);

  const stlFile = options.outputFile as string;
  saveSTL(triangles, stlFile);

  const fs = await import('node:fs');

  // Save color change G-code
  const gcodeFile = stlFile.replace(/\.stl$/, '-color-change.gcode');
  fs.writeFileSync(gcodeFile, colorMap.gcode);

  // Save palette info
  const paletteFile = stlFile.replace(/\.stl$/, '-palette.json');
  fs.writeFileSync(paletteFile, JSON.stringify({
    palette: colorMap.palette.map(c => ({
      oklch: oklchToCSS(c),
      hex: oklchToHex(c),
    })),
    instructions: 'Use Bambu Studio to import STL, then add M600 commands from the gcode file at the corresponding layer heights.',
  }, null, 2));

  const { generateNFCJson } = await import('../core/nfc.js');
  const nfcFile = stlFile.replace(/\.stl$/, '.nfc.json');
  fs.writeFileSync(nfcFile, generateNFCJson(input));

  return {
    stlFile,
    gcodeFile,
    nfcFile,
    palette: colorMap.palette,
    triangles: triangles.length,
  };
}
