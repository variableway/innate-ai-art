import { generateHash, hashToSegments } from '../core/hash.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';
import type { OKLCHColor } from '../core/types.js';

/**
 * Carrier 1: Color Gradient Band
 *
 * Generates a disc/tile with concentric color bands designed for AMS multi-color printing.
 * Red → Yellow → White transitions create visible gradient zones.
 * The gradient width/pattern varies based on input hash, making each print unique.
 *
 * P1S printing: Use AMS with red, yellow, white filaments.
 * The color transition zones (2-5 layers of mixing) form the physical "barcode".
 */

export interface ColorGradientOptions {
  diameter: number;      // mm, default 60
  thickness: number;     // mm, default 3
  bandCount: number;     // number of color bands, default 8
  nfcSlotRadius: number; // mm, 0 = no slot
  nfcSlotDepth: number;  // mm
}

const DEFAULT_GRADIENT: ColorGradientOptions = {
  diameter: 60,
  thickness: 3,
  bandCount: 8,
  nfcSlotRadius: 12.5,
  nfcSlotDepth: 0.5,
};

export function generateGradientDisc(
  input: string,
  options: Partial<ColorGradientOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts = { ...DEFAULT_GRADIENT, ...options };
  const hash = generateHash(input);
  const segments = hashToSegments(hash, opts.bandCount);

  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const r = opts.diameter / 2;
  const t = opts.thickness;
  const angularSteps = 48;
  const radialSteps = opts.bandCount * 4; // 4 subdivisions per band

  // Generate concentric bands with varying heights
  // Each band's height encodes an OKLCH L value → creates a physical "barcode" profile
  for (let ri = 0; ri < radialSteps; ri++) {
    const r1 = (ri / radialSteps) * r;
    const r2 = ((ri + 1) / radialSteps) * r;

    // Which band does this radial step belong to?
    const bandIdx = Math.floor((ri / radialSteps) * opts.bandCount);
    const seg = segments[bandIdx % segments.length];

    // Height modulation: use L and H to create unique profile
    // L controls base height, H adds a sinusoidal ripple
    const t1 = ri / radialSteps;
    const t2 = (ri + 1) / radialSteps;
    const baseH = t * 0.6;
    const modulation = seg.l * t * 0.35; // L value controls peak height
    const ripple = Math.sin(t1 * Math.PI * seg.h / 30) * t * 0.1; // H controls ripple frequency

    const z1 = baseH + modulation * Math.pow(Math.sin(t1 * Math.PI), 0.5) + ripple;
    const z2 = baseH + modulation * Math.pow(Math.sin(t2 * Math.PI), 0.5) + ripple;

    for (let ai = 0; ai < angularSteps; ai++) {
      const a1 = (ai / angularSteps) * Math.PI * 2;
      const a2 = ((ai + 1) / angularSteps) * Math.PI * 2;

      // Top surface (profiled)
      triangles.push(...makeQuad(
        { x: Math.cos(a1) * r1, y: Math.sin(a1) * r1, z: z1 },
        { x: Math.cos(a2) * r1, y: Math.sin(a2) * r1, z: z1 },
        { x: Math.cos(a2) * r2, y: Math.sin(a2) * r2, z: z2 },
        { x: Math.cos(a1) * r2, y: Math.sin(a1) * r2, z: z2 },
      ));

      // Bottom surface (flat)
      triangles.push(...makeQuad(
        { x: Math.cos(a2) * r1, y: Math.sin(a2) * r1, z: 0 },
        { x: Math.cos(a1) * r1, y: Math.sin(a1) * r1, z: 0 },
        { x: Math.cos(a1) * r2, y: Math.sin(a1) * r2, z: 0 },
        { x: Math.cos(a2) * r2, y: Math.sin(a2) * r2, z: 0 },
      ));
    }
  }

  // Outer rim wall
  for (let ai = 0; ai < angularSteps; ai++) {
    const a1 = (ai / angularSteps) * Math.PI * 2;
    const a2 = ((ai + 1) / angularSteps) * Math.PI * 2;
    // Average top height at rim
    const zTop = t;
    triangles.push(...makeQuad(
      { x: Math.cos(a1) * r, y: Math.sin(a1) * r, z: 0 },
      { x: Math.cos(a2) * r, y: Math.sin(a2) * r, z: 0 },
      { x: Math.cos(a2) * r, y: Math.sin(a2) * r, z: zTop },
      { x: Math.cos(a1) * r, y: Math.sin(a1) * r, z: zTop },
    ));
  }

  // NFC slot (center bottom)
  if (opts.nfcSlotRadius > 0) {
    const slotR = opts.nfcSlotRadius;
    const slotD = opts.nfcSlotDepth;
    const slotSteps = 24;

    for (let ai = 0; ai < slotSteps; ai++) {
      const a1 = (ai / slotSteps) * Math.PI * 2;
      const a2 = ((ai + 1) / slotSteps) * Math.PI * 2;

      // Slot walls
      triangles.push(...makeQuad(
        { x: Math.cos(a1) * slotR, y: Math.sin(a1) * slotR, z: 0 },
        { x: Math.cos(a2) * slotR, y: Math.sin(a2) * slotR, z: 0 },
        { x: Math.cos(a2) * slotR, y: Math.sin(a2) * slotR, z: slotD },
        { x: Math.cos(a1) * slotR, y: Math.sin(a1) * slotR, z: slotD },
      ));
    }

    // Slot bottom
    for (let ai = 0; ai < slotSteps; ai++) {
      const a1 = (ai / slotSteps) * Math.PI * 2;
      const a2 = ((ai + 1) / slotSteps) * Math.PI * 2;
      triangles.push(makeTriangle(
        { x: 0, y: 0, z: slotD },
        { x: Math.cos(a2) * slotR, y: Math.sin(a2) * slotR, z: slotD },
        { x: Math.cos(a1) * slotR, y: Math.sin(a1) * slotR, z: slotD },
      ));
    }
  }

  return triangles;
}

/**
 * Generate AMS color change instructions for Bambu Studio.
 * Maps hash-derived band positions to filament color changes.
 */
export function generateAMSScript(
  input: string,
  options: Partial<ColorGradientOptions> = {},
  layerHeight: number = 0.12,
): { colorChanges: { layer: number; color: string; filament: number }[]; gcode: string } {
  const opts = { ...DEFAULT_GRADIENT, ...options };
  const hash = generateHash(input);
  const segments = hashToSegments(hash, opts.bandCount);

  // Total layers
  const totalLayers = Math.ceil(opts.thickness / layerHeight);

  // Color scheme: red → yellow → white → yellow → red (symmetric)
  const colors = [
    { name: 'red', filament: 0, oklch: 'oklch(55% 0.22 25)' },
    { name: 'yellow', filament: 1, oklch: 'oklch(85% 0.16 85)' },
    { name: 'white', filament: 2, oklch: 'oklch(95% 0.02 90)' },
  ];

  // Map bands to layers
  const layersPerBand = Math.floor(totalLayers / opts.bandCount);
  const colorChanges: { layer: number; color: string; filament: number }[] = [];

  // Cycle through colors based on hash
  let lastFilament = -1;
  for (let i = 0; i < opts.bandCount; i++) {
    const seg = segments[i];
    const layer = i * layersPerBand;

    // Use H value to select color (0-120 → red, 120-240 → yellow, 240-360 → white)
    let colorIdx: number;
    if (seg.h < 120) colorIdx = 0;      // red
    else if (seg.h < 240) colorIdx = 1;  // yellow
    else colorIdx = 2;                    // white

    if (colors[colorIdx].filament !== lastFilament) {
      colorChanges.push({
        layer,
        color: colors[colorIdx].name,
        filament: colors[colorIdx].filament,
      });
      lastFilament = colors[colorIdx].filament;
    }
  }

  // Generate G-code with M600 color changes
  let gcode = '; Uniq Color Gradient - AMS Script for Bambu P1S\n';
  gcode += `; Input hash: ${hash.slice(0, 16)}...\n`;
  gcode += `; Layers: ${totalLayers}, Layer height: ${layerHeight}mm\n`;
  gcode += `; Filaments: T0=Red, T1=Yellow, T2=White\n\n`;

  for (const change of colorChanges) {
    const z = (change.layer * layerHeight).toFixed(2);
    gcode += `; >>> Color change at layer ${change.layer} (Z=${z}mm)\n`;
    gcode += `M600 P${change.filament} ; Switch to ${change.color} (T${change.filament})\n\n`;
  }

  gcode += '; >>> NFC pause - insert tag before this layer\n';
  const nfcLayer = Math.floor((opts.thickness - opts.nfcSlotDepth) / layerHeight);
  gcode += `; Pause at layer ${nfcLayer} (Z=${(nfcLayer * layerHeight).toFixed(2)}mm)\n`;
  gcode += `M400 ; Wait for moves to complete\n`;
  gcode += `; INSERT NFC TAG NOW, then resume printing\n\n`;

  return { colorChanges, gcode };
}
