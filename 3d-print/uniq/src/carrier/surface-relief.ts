import { generateHash, hashToSegments } from '../core/hash.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';

/**
 * Carrier 2: Surface Voronoi/Noise Relief
 *
 * Generates a pendant/disc with 0.5-1mm deep random texture on the surface.
 * The texture is hash-derived, making each design unique.
 * Phone camera can capture these features (0.5mm+ scale).
 *
 * P1S: Print at 0.12mm layer height, 30-50mm/s outer wall speed.
 */

export interface SurfaceReliefOptions {
  diameter: number;
  thickness: number;
  reliefDepth: number;    // max depth of relief, default 1.0mm
  cellSize: number;       // Voronoi cell size in mm, default 3.0
  nfcSlotRadius: number;
  nfcSlotDepth: number;
  hangingHole: boolean;
}

const DEFAULT_RELIEF: SurfaceReliefOptions = {
  diameter: 50,
  thickness: 4,
  reliefDepth: 1.0,
  cellSize: 3.0,
  nfcSlotRadius: 12.5,
  nfcSlotDepth: 0.5,
  hangingHole: true,
};

// Simple hash-based pseudo-random
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// Distance to nearest Voronoi seed point
function voronoiDistance(x: number, y: number, seeds: [number, number][], cellSize: number): number {
  // Find which cell we're in
  const cx = Math.round(x / cellSize);
  const cy = Math.round(y / cellSize);

  let minDist = Infinity;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const sx = (cx + dx) * cellSize;
      const sy = (cy + dy) * cellSize;
      // Hash the cell position to get seed offset
      const seedIdx = (((cx + dx + 100) * 7 + (cy + dy + 100) * 13) & 0x7fffffff) % seeds.length;
      const px = sx + seeds[seedIdx][0] * cellSize * 0.4;
      const py = sy + seeds[seedIdx][1] * cellSize * 0.4;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      minDist = Math.min(minDist, dist);
    }
  }
  return minDist;
}

export function generateReliefDisc(
  input: string,
  options: Partial<SurfaceReliefOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts = { ...DEFAULT_RELIEF, ...options };
  const hash = generateHash(input);
  const rand = seededRandom(parseInt(hash.slice(0, 8), 16));

  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const r = opts.diameter / 2;
  const baseH = opts.thickness - opts.reliefDepth;

  // Generate Voronoi seed offsets from hash
  const seedCount = 50;
  const seeds: [number, number][] = [];
  for (let i = 0; i < seedCount; i++) {
    seeds.push([rand() * 2 - 1, rand() * 2 - 1]);
  }

  // Grid resolution for the relief surface
  const gridRes = Math.floor(r * 2 / 1.0); // 1mm grid
  const gridSize = (r * 2) / gridRes;

  for (let gx = 0; gx < gridRes; gx++) {
    for (let gy = 0; gy < gridRes; gy++) {
      const x1 = -r + gx * gridSize;
      const y1 = -r + gy * gridSize;
      const x2 = x1 + gridSize;
      const y2 = y1 + gridSize;

      // Skip if outside circle
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      if (mx * mx + my * my > r * r) continue;

      // Skip NFC slot area
      if (mx * mx + my * my < opts.nfcSlotRadius * opts.nfcSlotRadius) continue;

      // Calculate Voronoi-based height at corners
      const corners = [
        [x1, y1], [x2, y1], [x2, y2], [x1, y2],
      ];

      const heights = corners.map(([cx, cy]) => {
        const dist = voronoiDistance(cx, cy, seeds, opts.cellSize);
        const cellDist = dist / opts.cellSize;
        // Create pits at Voronoi edges (high distance = edge)
        const edgeFactor = Math.min(1, cellDist * 1.5);
        // Use hash-derived noise for extra variation
        const noiseVal = Math.sin(cx * 0.5 + parseInt(hash.slice(8, 12), 16) * 0.01) *
                         Math.cos(cy * 0.5 + parseInt(hash.slice(12, 16), 16) * 0.01);
        return baseH + opts.reliefDepth * (1 - edgeFactor) + noiseVal * opts.reliefDepth * 0.15;
      });

      const v1: Vec3 = { x: x1, y: y1, z: heights[0] };
      const v2: Vec3 = { x: x2, y: y1, z: heights[1] };
      const v3: Vec3 = { x: x2, y: y2, z: heights[2] };
      const v4: Vec3 = { x: x1, y: y2, z: heights[3] };

      triangles.push(...makeQuad(v1, v2, v3, v4));
    }
  }

  // Bottom surface (flat)
  const angularSteps = 48;
  for (let ai = 0; ai < angularSteps; ai++) {
    const a1 = (ai / angularSteps) * Math.PI * 2;
    const a2 = ((ai + 1) / angularSteps) * Math.PI * 2;
    triangles.push(makeTriangle(
      { x: 0, y: 0, z: 0 },
      { x: Math.cos(a2) * r, y: Math.sin(a2) * r, z: 0 },
      { x: Math.cos(a1) * r, y: Math.sin(a1) * r, z: 0 },
    ));
  }

  // Rim wall
  for (let ai = 0; ai < angularSteps; ai++) {
    const a1 = (ai / angularSteps) * Math.PI * 2;
    const a2 = ((ai + 1) / angularSteps) * Math.PI * 2;
    triangles.push(...makeQuad(
      { x: Math.cos(a1) * r, y: Math.sin(a1) * r, z: 0 },
      { x: Math.cos(a2) * r, y: Math.sin(a2) * r, z: 0 },
      { x: Math.cos(a2) * r, y: Math.sin(a2) * r, z: opts.thickness },
      { x: Math.cos(a1) * r, y: Math.sin(a1) * r, z: opts.thickness },
    ));
  }

  // NFC slot
  if (opts.nfcSlotRadius > 0) {
    const slotSteps = 24;
    for (let ai = 0; ai < slotSteps; ai++) {
      const a1 = (ai / slotSteps) * Math.PI * 2;
      const a2 = ((ai + 1) / slotSteps) * Math.PI * 2;
      triangles.push(...makeQuad(
        { x: Math.cos(a1) * opts.nfcSlotRadius, y: Math.sin(a1) * opts.nfcSlotRadius, z: 0 },
        { x: Math.cos(a2) * opts.nfcSlotRadius, y: Math.sin(a2) * opts.nfcSlotRadius, z: 0 },
        { x: Math.cos(a2) * opts.nfcSlotRadius, y: Math.sin(a2) * opts.nfcSlotRadius, z: opts.nfcSlotDepth },
        { x: Math.cos(a1) * opts.nfcSlotRadius, y: Math.sin(a1) * opts.nfcSlotRadius, z: opts.nfcSlotDepth },
      ));
    }
    // Slot bottom
    for (let ai = 0; ai < slotSteps; ai++) {
      const a1 = (ai / slotSteps) * Math.PI * 2;
      const a2 = ((ai + 1) / slotSteps) * Math.PI * 2;
      triangles.push(makeTriangle(
        { x: 0, y: 0, z: opts.nfcSlotDepth },
        { x: Math.cos(a2) * opts.nfcSlotRadius, y: Math.sin(a2) * opts.nfcSlotRadius, z: opts.nfcSlotDepth },
        { x: Math.cos(a1) * opts.nfcSlotRadius, y: Math.sin(a1) * opts.nfcSlotRadius, z: opts.nfcSlotDepth },
      ));
    }
  }

  // Hanging hole
  if (opts.hangingHole) {
    const holeR = 3;
    const holeOffset = r * 0.7;
    const holeSteps = 16;
    for (let ai = 0; ai < holeSteps; ai++) {
      const a1 = (ai / holeSteps) * Math.PI * 2;
      const a2 = ((ai + 1) / holeSteps) * Math.PI * 2;
      const cy = -holeOffset;

      // Inner wall
      triangles.push(...makeQuad(
        { x: Math.cos(a1) * holeR, y: cy + Math.sin(a1) * holeR, z: opts.thickness },
        { x: Math.cos(a2) * holeR, y: cy + Math.sin(a2) * holeR, z: opts.thickness },
        { x: Math.cos(a2) * holeR, y: cy + Math.sin(a2) * holeR, z: opts.thickness - 1 },
        { x: Math.cos(a1) * holeR, y: cy + Math.sin(a1) * holeR, z: opts.thickness - 1 },
      ));

      // Top ring
      const outerR = holeR + 2;
      triangles.push(...makeQuad(
        { x: Math.cos(a1) * holeR, y: cy + Math.sin(a1) * holeR, z: opts.thickness },
        { x: Math.cos(a2) * holeR, y: cy + Math.sin(a2) * holeR, z: opts.thickness },
        { x: Math.cos(a2) * outerR, y: cy + Math.sin(a2) * outerR, z: opts.thickness },
        { x: Math.cos(a1) * outerR, y: cy + Math.sin(a1) * outerR, z: opts.thickness },
      ));
    }
  }

  return triangles;
}
