import { generateHash } from '../core/hash.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';
import { oklchToCSS } from '../core/oklch.js';
import { hashToSegments } from '../core/hash.js';
import type { OKLCHColor } from '../core/types.js';

/**
 * Shadow Sculpture Generator
 *
 * Creates a stack of vertical slices whose outer profile is determined by
 * the input hash. When a phone flashlight shines through from the side,
 * the stack casts a shadow that reveals a hidden pattern/message.
 *
 * Design:
 * - A series of vertical panels arranged in a row
 * - Each panel has a unique cutout shape derived from the hash
 * - Flashlight from the side projects the combined silhouette
 * - Base has a channel for phone flashlight alignment
 * - Internal cavity for embedding small objects
 * - NFC tag slot on the bottom
 */

export interface ShadowSculptureOptions {
  width: number;        // total width in mm (direction of light)
  height: number;       // total height in mm
  depth: number;        // depth of each panel in mm
  panelCount: number;   // number of vertical panels
  baseThickness: number; // base plate thickness
  flashlightSlot: boolean; // include phone flashlight channel
  embedCavity: boolean;  // include cavity for embedding objects
  nfcSlot: boolean;     // include NFC tag slot
}

const DEFAULT_SHADOW: ShadowSculptureOptions = {
  width: 60,
  height: 50,
  depth: 3,
  panelCount: 12,
  baseThickness: 3,
  flashlightSlot: true,
  embedCavity: true,
  nfcSlot: true,
};

// Seeded PRNG
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// Generate a smooth closed curve (periodic) from hash segments
function generateProfile(
  segments: OKLCHColor[],
  samples: number,
  radius: number,
): [number, number][] {
  const points: [number, number][] = [];

  for (let i = 0; i < samples; i++) {
    const t = i / samples;
    const angle = t * Math.PI * 2;

    // Sum contributions from each segment's L and H
    let r = radius * 0.5; // base radius
    for (let s = 0; s < segments.length; s++) {
      const seg = segments[s];
      const freq = (s + 1) * 2;
      const amp = seg.l * radius * 0.3;
      const phase = seg.h * Math.PI / 180;
      r += amp * Math.sin(angle * freq + phase);
    }

    // Clamp radius to keep it positive and reasonable
    r = Math.max(radius * 0.15, Math.min(radius * 1.2, r));

    points.push([
      Math.cos(angle) * r,
      Math.sin(angle) * r,
    ]);
  }

  return points;
}

// Generate a panel with a specific silhouette cutout
function generatePanel(
  centerX: number,
  profile: [number, number][],
  panelHeight: number,
  panelDepth: number,
): ReturnType<typeof makeTriangle>[] {
  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const n = profile.length;

  // Front face (z = panelDepth)
  // Triangulate the polygon using fan from centroid
  let cx = 0, cy = 0;
  for (const [x, y] of profile) { cx += x; cy += y; }
  cx /= n; cy /= n;

  // Front face
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    triangles.push(makeTriangle(
      { x: centerX + cx, y: cy, z: panelDepth },
      { x: centerX + profile[next][0], y: profile[next][1], z: panelDepth },
      { x: centerX + profile[i][0], y: profile[i][1], z: panelDepth },
    ));
  }

  // Back face (z = 0)
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    triangles.push(makeTriangle(
      { x: centerX + cx, y: cy, z: 0 },
      { x: centerX + profile[i][0], y: profile[i][1], z: 0 },
      { x: centerX + profile[next][0], y: profile[next][1], z: 0 },
    ));
  }

  // Side walls
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    triangles.push(...makeQuad(
      { x: centerX + profile[i][0], y: profile[i][1], z: 0 },
      { x: centerX + profile[next][0], y: profile[next][1], z: 0 },
      { x: centerX + profile[next][0], y: profile[next][1], z: panelDepth },
      { x: centerX + profile[i][0], y: profile[i][1], z: panelDepth },
    ));
  }

  return triangles;
}

export function generateShadowSculpture(
  input: string,
  options: Partial<ShadowSculptureOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts = { ...DEFAULT_SHADOW, ...options };
  const hash = generateHash(input);
  const segments = hashToSegments(hash, opts.panelCount);
  const rand = seededRandom(parseInt(hash.slice(0, 8), 16));

  const triangles: ReturnType<typeof makeTriangle>[] = [];

  const totalW = opts.width;
  const totalH = opts.height;
  const baseH = opts.baseThickness;
  const panelH = totalH - baseH;
  const panelSpacing = totalW / (opts.panelCount + 1);
  const maxRadius = Math.min(panelSpacing * 0.45, panelH * 0.45);

  // Base plate
  const bw = totalW + 4; // slight overhang
  const bd = opts.depth + 6; // extra depth for flashlight channel
  triangles.push(...makeQuad(
    { x: -2, y: -3, z: 0 },
    { x: bw - 2, y: -3, z: 0 },
    { x: bw - 2, y: bd - 3, z: 0 },
    { x: -2, y: bd - 3, z: 0 },
  ));
  // Base top
  triangles.push(...makeQuad(
    { x: bw - 2, y: -3, z: baseH },
    { x: -2, y: -3, z: baseH },
    { x: -2, y: bd - 3, z: baseH },
    { x: bw - 2, y: bd - 3, z: baseH },
  ));
  // Base sides
  triangles.push(...makeQuad(
    { x: -2, y: -3, z: 0 },
    { x: -2, y: -3, z: baseH },
    { x: bw - 2, y: -3, z: baseH },
    { x: bw - 2, y: -3, z: 0 },
  ));
  triangles.push(...makeQuad(
    { x: bw - 2, y: bd - 3, z: 0 },
    { x: bw - 2, y: bd - 3, z: baseH },
    { x: -2, y: bd - 3, z: baseH },
    { x: -2, y: bd - 3, z: 0 },
  ));
  triangles.push(...makeQuad(
    { x: -2, y: bd - 3, z: 0 },
    { x: -2, y: -3, z: 0 },
    { x: -2, y: -3, z: baseH },
    { x: -2, y: bd - 3, z: baseH },
  ));
  triangles.push(...makeQuad(
    { x: bw - 2, y: -3, z: 0 },
    { x: bw - 2, y: bd - 3, z: 0 },
    { x: bw - 2, y: bd - 3, z: baseH },
    { x: bw - 2, y: -3, z: baseH },
  ));

  // Generate panels - each with unique profile from hash
  for (let i = 0; i < opts.panelCount; i++) {
    const centerX = panelSpacing * (i + 1);

    // Each panel gets its own profile from a different segment
    // Shift the center Y based on segment to create the shadow pattern
    const seg = segments[i];
    const yOffset = baseH + panelH / 2;

    // Generate a small profile (the "pixel" of the shadow image)
    // The profile radius is modulated to create the shadow pattern
    const baseRadius = maxRadius * 0.3;
    const modulation = seg.l * maxRadius * 0.6;
    const panelRadius = baseRadius + modulation;

    // Create circular profile with hash-driven variations
    const samples = 16;
    const profile: [number, number][] = [];
    for (let s = 0; s < samples; s++) {
      const angle = (s / samples) * Math.PI * 2;
      const noise = Math.sin(angle * (3 + i % 3) + seg.h * 0.02) * maxRadius * 0.1;
      const r = panelRadius + noise;
      profile.push([
        Math.cos(angle) * r,
        yOffset + Math.sin(angle) * r - yOffset, // relative to center
      ]);
    }

    // Generate the panel
    const panelTriangles = generatePanel(centerX, profile, panelH, opts.depth);

    // Offset Y so panels sit on top of base
    for (const tri of panelTriangles) {
      triangles.push({
        normal: tri.normal,
        v1: { ...tri.v1, y: tri.v1.y + baseH },
        v2: { ...tri.v2, y: tri.v2.y + baseH },
        v3: { ...tri.v3, y: tri.v3.y + baseH },
        attributeByteCount: tri.attributeByteCount,
      });
    }

    // Vertical connection ribs between panels (thin walls)
    if (i > 0) {
      const prevX = panelSpacing * i;
      const ribH = panelH * 0.15;
      const ribY = baseH + panelH * 0.1;

      triangles.push(...makeQuad(
        { x: prevX + panelSpacing * 0.35, y: ribY, z: 0 },
        { x: centerX - panelSpacing * 0.35, y: ribY, z: 0 },
        { x: centerX - panelSpacing * 0.35, y: ribY, z: opts.depth },
        { x: prevX + panelSpacing * 0.35, y: ribY, z: opts.depth },
      ));
      triangles.push(...makeQuad(
        { x: prevX + panelSpacing * 0.35, y: ribY, z: 0 },
        { x: prevX + panelSpacing * 0.35, y: ribY + ribH, z: 0 },
        { x: prevX + panelSpacing * 0.35, y: ribY + ribH, z: opts.depth },
        { x: prevX + panelSpacing * 0.35, y: ribY, z: opts.depth },
      ));
      triangles.push(...makeQuad(
        { x: centerX - panelSpacing * 0.35, y: ribY, z: 0 },
        { x: centerX - panelSpacing * 0.35, y: ribY, z: opts.depth },
        { x: centerX - panelSpacing * 0.35, y: ribY + ribH, z: opts.depth },
        { x: centerX - panelSpacing * 0.35, y: ribY + ribH, z: 0 },
      ));
      triangles.push(...makeQuad(
        { x: prevX + panelSpacing * 0.35, y: ribY + ribH, z: 0 },
        { x: centerX - panelSpacing * 0.35, y: ribY + ribH, z: 0 },
        { x: centerX - panelSpacing * 0.35, y: ribY + ribH, z: opts.depth },
        { x: prevX + panelSpacing * 0.35, y: ribY + ribH, z: opts.depth },
      ));
    }
  }

  // Flashlight channel (slot in the base for phone flashlight alignment)
  if (opts.flashlightSlot) {
    const slotW = 12; // mm, phone flashlight width
    const slotD = 4;  // mm, depth into base
    const slotY = opts.depth + 1; // behind the panels

    // Channel through the base
    const chStartX = panelSpacing * 0.5;
    const chEndX = totalW - panelSpacing * 0.5;

    // Top opening of channel
    for (let xi = 0; xi < 10; xi++) {
      const x1 = chStartX + (chEndX - chStartX) * xi / 10;
      const x2 = chStartX + (chEndX - chStartX) * (xi + 1) / 10;

      // Channel walls
      triangles.push(...makeQuad(
        { x: x1, y: slotY, z: baseH - 1 },
        { x: x2, y: slotY, z: baseH - 1 },
        { x: x2, y: slotY, z: baseH },
        { x: x1, y: slotY, z: baseH },
      ));
      triangles.push(...makeQuad(
        { x: x1, y: slotY + slotD, z: baseH - 1 },
        { x: x2, y: slotY + slotD, z: baseH - 1 },
        { x: x2, y: slotY + slotD, z: baseH },
        { x: x1, y: slotY + slotD, z: baseH },
      ));
    }
  }

  // Embedding cavity (under the panels, accessible from bottom)
  if (opts.embedCavity) {
    const cavW = totalW * 0.5;
    const cavD = opts.depth;
    const cavDepth = 2; // mm deep into base
    const cavX = (totalW - cavW) / 2;
    const cavY = 0;

    // Cavity walls
    const cavSteps = 24;
    for (let i = 0; i < cavSteps; i++) {
      const x1 = cavX + (cavW * i / cavSteps);
      const x2 = cavX + (cavW * (i + 1) / cavSteps);

      triangles.push(...makeQuad(
        { x: x1, y: cavY, z: cavDepth },
        { x: x2, y: cavY, z: cavDepth },
        { x: x2, y: cavY, z: baseH },
        { x: x1, y: cavY, z: baseH },
      ));
      triangles.push(...makeQuad(
        { x: x1, y: cavD, z: cavDepth },
        { x: x1, y: cavD, z: baseH },
        { x: x2, y: cavD, z: baseH },
        { x: x2, y: cavD, z: cavDepth },
      ));
    }
    // Cavity bottom
    for (let i = 0; i < cavSteps; i++) {
      const x1 = cavX + (cavW * i / cavSteps);
      const x2 = cavX + (cavW * (i + 1) / cavSteps);
      triangles.push(makeTriangle(
        { x: cavX + cavW / 2, y: cavD / 2, z: cavDepth },
        { x: x2, y: cavY, z: cavDepth },
        { x: x1, y: cavY, z: cavDepth },
      ));
      triangles.push(makeTriangle(
        { x: cavX + cavW / 2, y: cavD / 2, z: cavDepth },
        { x: x1, y: cavD, z: cavDepth },
        { x: x2, y: cavD, z: cavDepth },
      ));
    }
  }

  // NFC slot (bottom center)
  if (opts.nfcSlot) {
    const slotR = 12.5;
    const slotD = 0.5;
    const centerX = totalW / 2;
    const centerY = opts.depth / 2;

    for (let ai = 0; ai < 24; ai++) {
      const a1 = (ai / 24) * Math.PI * 2;
      const a2 = ((ai + 1) / 24) * Math.PI * 2;

      // Wall
      triangles.push(...makeQuad(
        { x: centerX + Math.cos(a1) * slotR, y: centerY + Math.sin(a1) * slotR, z: 0 },
        { x: centerX + Math.cos(a2) * slotR, y: centerY + Math.sin(a2) * slotR, z: 0 },
        { x: centerX + Math.cos(a2) * slotR, y: centerY + Math.sin(a2) * slotR, z: slotD },
        { x: centerX + Math.cos(a1) * slotR, y: centerY + Math.sin(a1) * slotR, z: slotD },
      ));

      // Bottom
      triangles.push(makeTriangle(
        { x: centerX, y: centerY, z: slotD },
        { x: centerX + Math.cos(a2) * slotR, y: centerY + Math.sin(a2) * slotR, z: slotD },
        { x: centerX + Math.cos(a1) * slotR, y: centerY + Math.sin(a1) * slotR, z: slotD },
      ));
    }
  }

  return triangles;
}

export async function generateShadowGift(
  input: string,
  options: Partial<ShadowSculptureOptions> & { outputFile: string; url?: string },
): Promise<{
  stlFile: string;
  nfcFile: string;
  instructions: string;
  triangles: number;
}> {
  const triangles = generateShadowSculpture(input, options);
  saveSTL(triangles, options.outputFile);

  const { generateNFCJson } = await import('../core/nfc.js');
  const fs = await import('node:fs');
  const nfcFile = options.outputFile.replace(/\.stl$/, '.nfc.json');
  fs.writeFileSync(nfcFile, generateNFCJson(input, options.url));

  const hash = generateHash(input);
  const instructions = `
Shadow Sculpture — Print Instructions for Bambu P1S
=====================================================

Input: "${input.slice(0, 30)}${input.length > 30 ? '...' : ''}"
Hash: ${hash.slice(0, 16)}

1. MATERIAL: White PLA (recommended)
   - Layer height: 0.12mm (for clean shadow edges)
   - Infill: 100% (panels must be solid)
   - Outer wall speed: 30mm/s (for consistent surfaces)
   - Supports: Not needed (designed for supportless printing)

2. EMBED OBJECT (during print):
   - Slice in Bambu Studio
   - Add pause at layer ${Math.floor(options.baseThickness! / 0.12)} (top of base, before panels)
   - During pause, place small object in the cavity:
     · Dried flower, handwritten note, coin, etc.
   - Resume printing

3. NFC TAG (during print):
   - At the same pause, place NTAG213 tag (25mm round) in bottom slot
   - Resume printing to seal
   - After printing, use NFC Tools app to write: ${nfcFile}

4. EXPERIENCE:
   - Turn off the lights
   - Place the sculpture on a white surface/wall
   - Shine phone flashlight through the channel (back side)
   - The shadow reveals a unique pattern encoded by your message!

5. VARIATION:
   - Try different flashlight angles for different shadow effects
   - The layer lines add subtle uniqueness to each print's shadow
`.trim();

  const instrFile = options.outputFile.replace(/\.stl$/, '-instructions.txt');
  fs.writeFileSync(instrFile, instructions);

  return {
    stlFile: options.outputFile,
    nfcFile,
    instructions,
    triangles: triangles.length,
  };
}
