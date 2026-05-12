import { generateHash, hashToSegments } from '../core/hash.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';
import type { PendantOptions, ReliefOptions } from '../core/types.js';

export function textToWaveform(text: string, samples: number): number[] {
  const hash = generateHash(text);
  const segments = hashToSegments(hash, Math.max(8, Math.ceil(samples / 20)));

  const waveform: number[] = [];
  for (let i = 0; i < samples; i++) {
    const segIdx = i % segments.length;
    const nextIdx = (segIdx + 1) % segments.length;
    const t = (i % 20) / 20;

    // Interpolate between segment L values
    const l = segments[segIdx].l * (1 - t) + segments[nextIdx].l * t;
    // Add H-based oscillation
    const h = segments[segIdx].h;
    const osc = Math.sin(i * 0.3 + h * 0.01) * 0.15;

    waveform.push(Math.max(-1, Math.min(1, (l - 0.5) * 3 + osc)));
  }

  return waveform;
}

export function waveformToPendant(
  waveform: number[],
  options: Partial<PendantOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts: PendantOptions = {
    radius: 25,
    height: 8,
    turns: 3,
    wallThickness: 2,
    nfcSlotRadius: 12.5,
    nfcSlotDepth: 1.0,
    ...options,
  };

  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const segments = waveform.length;
  const r = opts.radius;
  const h = opts.height;

  // Create a disc pendant with waveform embossed on surface
  const circumference = 2 * Math.PI * r;

  // Top surface with waveform
  const radialSteps = 32;
  const angularSteps = Math.min(segments, 128);

  for (let a = 0; a < angularSteps; a++) {
    const angle1 = (a / angularSteps) * Math.PI * 2;
    const angle2 = ((a + 1) / angularSteps) * Math.PI * 2;

    const waveIdx1 = Math.floor((a / angularSteps) * segments);
    const waveIdx2 = Math.floor(((a + 1) / angularSteps) * segments);
    const wave1 = waveform[waveIdx1] ?? 0;
    const wave2 = waveform[waveIdx2] ?? 0;

    for (let rd = 0; rd < radialSteps - 1; rd++) {
      const r1 = (rd / radialSteps) * r;
      const r2 = ((rd + 1) / radialSteps) * r;
      const r3 = ((rd + 2) / radialSteps) * r;

      // Wave height decreases toward center and edge
      const center = Math.abs(rd / radialSteps - 0.5) * 2; // 0 at center, 1 at edge
      const waveHeight1 = wave1 * (1 - center * center) * 2;
      const waveHeight2 = wave2 * (1 - center * center) * 2;

      const v1: Vec3 = {
        x: Math.cos(angle1) * r1,
        y: Math.sin(angle1) * r1,
        z: h + waveHeight1,
      };
      const v2: Vec3 = {
        x: Math.cos(angle2) * r1,
        y: Math.sin(angle2) * r1,
        z: h + waveHeight2,
      };
      const v3: Vec3 = {
        x: Math.cos(angle2) * r2,
        y: Math.sin(angle2) * r2,
        z: h + waveHeight2 * 0.8,
      };
      const v4: Vec3 = {
        x: Math.cos(angle1) * r2,
        y: Math.sin(angle1) * r2,
        z: h + waveHeight1 * 0.8,
      };

      triangles.push(...makeQuad(v1, v4, v3, v2));
    }
  }

  // Bottom surface (flat)
  for (let a = 0; a < angularSteps; a++) {
    const angle1 = (a / angularSteps) * Math.PI * 2;
    const angle2 = ((a + 1) / angularSteps) * Math.PI * 2;

    for (let rd = 0; rd < radialSteps - 1; rd++) {
      const r1 = (rd / radialSteps) * r;
      const r2 = ((rd + 1) / radialSteps) * r;

      const v1: Vec3 = { x: Math.cos(angle1) * r1, y: Math.sin(angle1) * r1, z: 0 };
      const v2: Vec3 = { x: Math.cos(angle2) * r1, y: Math.sin(angle2) * r1, z: 0 };
      const v3: Vec3 = { x: Math.cos(angle2) * r2, y: Math.sin(angle2) * r2, z: 0 };
      const v4: Vec3 = { x: Math.cos(angle1) * r2, y: Math.sin(angle1) * r2, z: 0 };

      triangles.push(...makeQuad(v1, v2, v3, v4));
    }
  }

  // Outer rim
  for (let a = 0; a < angularSteps; a++) {
    const angle1 = (a / angularSteps) * Math.PI * 2;
    const angle2 = ((a + 1) / angularSteps) * Math.PI * 2;

    const top: Vec3 = { x: Math.cos(angle1) * r, y: Math.sin(angle1) * r, z: h };
    const top2: Vec3 = { x: Math.cos(angle2) * r, y: Math.sin(angle2) * r, z: h };
    const bot: Vec3 = { x: Math.cos(angle1) * r, y: Math.sin(angle1) * r, z: 0 };
    const bot2: Vec3 = { x: Math.cos(angle2) * r, y: Math.sin(angle2) * r, z: 0 };

    triangles.push(...makeQuad(bot, bot2, top2, top));
  }

  // Hanging hole (8mm diameter, offset from center)
  const holeRadius = 4;
  const holeOffset = r * 0.65;
  const holeSegments = 16;
  for (let a = 0; a < holeSegments; a++) {
    const angle1 = (a / holeSegments) * Math.PI * 2;
    const angle2 = ((a + 1) / holeSegments) * Math.PI * 2;

    const cx = 0;
    const cy = -holeOffset;

    const i1: Vec3 = { x: cx + Math.cos(angle1) * holeRadius, y: cy + Math.sin(angle1) * holeRadius, z: h + 1 };
    const i2: Vec3 = { x: cx + Math.cos(angle2) * holeRadius, y: cy + Math.sin(angle2) * holeRadius, z: h + 1 };
    const o1: Vec3 = { x: cx + Math.cos(angle1) * (holeRadius + opts.wallThickness), y: cy + Math.sin(angle1) * (holeRadius + opts.wallThickness), z: h + 1 };
    const o2: Vec3 = { x: cx + Math.cos(angle2) * (holeRadius + opts.wallThickness), y: cy + Math.sin(angle2) * (holeRadius + opts.wallThickness), z: h + 1 };

    triangles.push(...makeQuad(o1, o2, i2, i1));
  }

  // NFC slot cavity (on bottom face)
  if (opts.nfcSlotRadius > 0 && opts.nfcSlotDepth > 0) {
    const slotSteps = 24;
    const slotR = opts.nfcSlotRadius;
    const slotD = opts.nfcSlotDepth;

    for (let a = 0; a < slotSteps; a++) {
      const angle1 = (a / slotSteps) * Math.PI * 2;
      const angle2 = ((a + 1) / slotSteps) * Math.PI * 2;

      const b1: Vec3 = { x: Math.cos(angle1) * slotR, y: Math.sin(angle1) * slotR, z: slotD };
      const b2: Vec3 = { x: Math.cos(angle2) * slotR, y: Math.sin(angle2) * slotR, z: slotD };
      const t1: Vec3 = { x: Math.cos(angle1) * slotR, y: Math.sin(angle1) * slotR, z: 0 };
      const t2: Vec3 = { x: Math.cos(angle2) * slotR, y: Math.sin(angle2) * slotR, z: 0 };

      triangles.push(...makeQuad(t1, t2, b2, b1));
    }

    // Slot bottom
    for (let a = 0; a < slotSteps; a++) {
      const angle1 = (a / slotSteps) * Math.PI * 2;
      const angle2 = ((a + 1) / slotSteps) * Math.PI * 2;

      triangles.push(makeTriangle(
        { x: 0, y: 0, z: slotD },
        { x: Math.cos(angle1) * slotR, y: Math.sin(angle1) * slotR, z: slotD },
        { x: Math.cos(angle2) * slotR, y: Math.sin(angle2) * slotR, z: slotD },
      ));
    }
  }

  return triangles;
}

export function waveformToRelief(
  waveform: number[],
  options: Partial<ReliefOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts: ReliefOptions = {
    width: 100,
    height: 40,
    maxDepth: 3,
    border: 3,
    ...options,
  };

  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const samples = waveform.length;
  const w = opts.width;
  const h = opts.height;
  const b = opts.border;

  const innerW = w - 2 * b;
  const innerH = h - 2 * b;
  const depth = opts.maxDepth;

  // Top surface — waveform embossed
  const xSteps = Math.min(samples, 200);
  const ySteps = 20;

  for (let xi = 0; xi < xSteps - 1; xi++) {
    const waveIdx = Math.floor((xi / xSteps) * samples);
    const waveIdx2 = Math.floor(((xi + 1) / xSteps) * samples);
    const wave1 = waveform[waveIdx] ?? 0;
    const wave2 = waveform[waveIdx2] ?? 0;

    for (let yi = 0; yi < ySteps - 1; yi++) {
      const x1 = b + (xi / xSteps) * innerW;
      const x2 = b + ((xi + 1) / xSteps) * innerW;
      const y1 = b + (yi / ySteps) * innerH;
      const y2 = b + ((yi + 1) / ySteps) * innerH;

      // Wave height varies across Y for 3D effect
      const yFactor = 1 - Math.pow(Math.abs(yi / ySteps - 0.5) * 2, 2);
      const z1 = depth + wave1 * depth * 0.8 * yFactor;
      const z2 = depth + wave2 * depth * 0.8 * yFactor;
      const z3 = depth + wave1 * depth * 0.8 * yFactor * 0.9;
      const z4 = depth + wave2 * depth * 0.8 * yFactor * 0.9;

      const v1: Vec3 = { x: x1, y: y1, z: z1 };
      const v2: Vec3 = { x: x2, y: y1, z: z2 };
      const v3: Vec3 = { x: x2, y: y2, z: z4 };
      const v4: Vec3 = { x: x1, y: y2, z: z3 };

      triangles.push(...makeQuad(v1, v4, v3, v2));
    }
  }

  // Bottom, sides, and borders (similar to lithophane)
  triangles.push(...makeQuad(
    { x: 0, y: 0, z: 0 },
    { x: 0, y: h, z: 0 },
    { x: w, y: h, z: 0 },
    { x: w, y: 0, z: 0 },
  ));

  // Side walls
  triangles.push(...makeQuad(
    { x: 0, y: 0, z: depth },
    { x: w, y: 0, z: depth },
    { x: w, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
  ));
  triangles.push(...makeQuad(
    { x: 0, y: h, z: 0 },
    { x: w, y: h, z: 0 },
    { x: w, y: h, z: depth },
    { x: 0, y: h, z: depth },
  ));
  triangles.push(...makeQuad(
    { x: 0, y: 0, z: depth },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: h, z: 0 },
    { x: 0, y: h, z: depth },
  ));
  triangles.push(...makeQuad(
    { x: w, y: 0, z: 0 },
    { x: w, y: 0, z: depth },
    { x: w, y: h, z: depth },
    { x: w, y: h, z: 0 },
  ));

  return triangles;
}

export async function generateRelief(
  input: string,
  type: 'pendant' | 'relief',
  options: Record<string, unknown> & { outputFile: string },
): Promise<{ stlFile: string; nfcFile: string; triangles: number }> {
  const waveform = textToWaveform(input, 256);
  const triangles = type === 'pendant'
    ? waveformToPendant(waveform, options as Partial<PendantOptions>)
    : waveformToRelief(waveform, options as Partial<ReliefOptions>);

  const stlFile = options.outputFile as string;
  saveSTL(triangles, stlFile);

  const { generateNFCJson } = await import('../core/nfc.js');
  const fs = await import('node:fs');
  const nfcFile = stlFile.replace(/\.stl$/, '.nfc.json');
  fs.writeFileSync(nfcFile, generateNFCJson(input));

  return { stlFile, nfcFile, triangles: triangles.length };
}
