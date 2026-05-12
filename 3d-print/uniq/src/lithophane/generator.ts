import { generateHash, hashToSegments } from '../core/hash.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';
import type { LithophaneOptions } from '../core/types.js';
import * as path from 'node:path';

const DEFAULT_OPTIONS: LithophaneOptions = {
  maxWidth: 100,       // mm
  maxHeight: 80,       // mm
  maxThickness: 3.0,   // mm (darkest = thickest)
  minThickness: 0.5,   // mm (lightest = thinnest)
  border: 2,           // mm
  resolution: 2,       // pixels per mm
};

export function textToBitmap(
  text: string,
  width: number,
  height: number,
): number[][] {
  // Generate OKLCH colors from text hash — one per character group
  const hash = generateHash(text);
  const groupSize = Math.max(1, Math.ceil(text.length / Math.min(width * height, 100)));
  const groups: string[] = [];

  for (let i = 0; i < text.length; i += groupSize) {
    groups.push(text.slice(i, i + groupSize));
  }

  // Generate OKLCH colors for each group
  const colors = hashToSegments(hash, groups.length);

  // Create bitmap by tiling the OKLCH pattern
  const bitmap: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      // Map position to color index with a flowing pattern
      const colorIdx = Math.floor(
        (Math.sin(x * 0.1) * 50 + Math.cos(y * 0.15) * 50 + 100) % colors.length,
      );
      const color = colors[colorIdx];
      // L value (0-1) maps to brightness — high L = bright = thin in lithophane
      row.push(color.l);
    }
    bitmap.push(row);
  }

  return bitmap;
}

export function hashToBitmap(
  input: string,
  width: number,
  height: number,
): number[][] {
  // Create a more structured bitmap from the hash directly
  const hash = generateHash(input);
  const segments = hashToSegments(hash, Math.ceil((width * height) / 100));

  const bitmap: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      // Use hash segments to create flowing pattern
      const segIdx = (x + y * 7) % segments.length;
      const nextIdx = (segIdx + 1) % segments.length;

      // Smooth interpolation between segments
      const fx = x / width;
      const fy = y / height;

      // Create organic pattern using OKLCH L values
      const l1 = segments[segIdx].l;
      const l2 = segments[nextIdx].l;
      const t = (Math.sin(fx * Math.PI * 4 + segIdx) * 0.5 + 0.5);

      // Add H-based variation
      const hFactor = Math.sin(segments[segIdx].h * Math.PI / 180) * 0.1;

      const l = l1 * (1 - t) + l2 * t + hFactor * Math.cos(fy * Math.PI * 3);
      row.push(Math.max(0, Math.min(1, l)));
    }
    bitmap.push(row);
  }

  return bitmap;
}

export function bitmapToTriangles(
  bitmap: number[][],
  options: Partial<LithophaneOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const imgH = bitmap.length;
  const imgW = bitmap[0]?.length ?? 0;
  if (imgW === 0 || imgH === 0) return [];

  // Physical dimensions
  const totalW = opts.maxWidth;
  const totalH = opts.maxHeight;
  const border = opts.border;

  // Inner area (without border)
  const innerW = totalW - 2 * border;
  const innerH = totalH - 2 * border;

  // Pixel size in mm
  const pixelW = innerW / imgW;
  const pixelH = innerH / imgH;

  const triangles: ReturnType<typeof makeTriangle>[] = [];

  // Helper to convert pixel (px, py) + L value to Z thickness
  // High L = bright = thin, Low L = dark = thick
  function toZ(lValue: number): number {
    return opts.minThickness + (1 - lValue) * (opts.maxThickness - opts.minThickness);
  }

  // Convert pixel coordinates to physical coordinates
  function toX(px: number): number {
    return border + px * pixelW;
  }
  function toY(py: number): number {
    return border + py * pixelH;
  }

  // Generate top surface triangles from the heightmap
  for (let y = 0; y < imgH - 1; y++) {
    for (let x = 0; x < imgW - 1; x++) {
      const tl: Vec3 = { x: toX(x), y: toY(y), z: toZ(bitmap[y][x]) };
      const tr: Vec3 = { x: toX(x + 1), y: toY(y), z: toZ(bitmap[y][x + 1]) };
      const bl: Vec3 = { x: toX(x), y: toY(y + 1), z: toZ(bitmap[y + 1][x]) };
      const br: Vec3 = { x: toX(x + 1), y: toY(y + 1), z: toZ(bitmap[y + 1][x + 1]) };

      triangles.push(...makeQuad(tl, tr, br, bl));
    }
  }

  // Bottom face (flat, at Z=0)
  const b0: Vec3 = { x: 0, y: 0, z: 0 };
  const b1: Vec3 = { x: totalW, y: 0, z: 0 };
  const b2: Vec3 = { x: totalW, y: totalH, z: 0 };
  const b3: Vec3 = { x: 0, y: totalH, z: 0 };
  triangles.push(...makeQuad(b0, b3, b2, b1)); // flipped normal (facing down)

  // Side walls — connect top surface edges to bottom
  // Front edge (y=0)
  for (let x = 0; x < imgW - 1; x++) {
    const z1 = toZ(bitmap[0][x]);
    const z2 = toZ(bitmap[0][x + 1]);
    const t1: Vec3 = { x: toX(x), y: border, z: z1 };
    const t2: Vec3 = { x: toX(x + 1), y: border, z: z2 };
    const bb1: Vec3 = { x: toX(x), y: border, z: 0 };
    const bb2: Vec3 = { x: toX(x + 1), y: border, z: 0 };
    triangles.push(...makeQuad(bb1, bb2, t2, t1));
  }
  // Front border strip
  {
    const t1: Vec3 = { x: 0, y: 0, z: opts.maxThickness };
    const t2: Vec3 = { x: totalW, y: 0, z: opts.maxThickness };
    const t3: Vec3 = { x: totalW, y: border, z: opts.maxThickness };
    const t4: Vec3 = { x: 0, y: border, z: opts.maxThickness };
    triangles.push(...makeQuad(t1, t2, t3, t4));
    const bb1: Vec3 = { x: 0, y: 0, z: 0 };
    const bb2: Vec3 = { x: totalW, y: 0, z: 0 };
    const bb3: Vec3 = { x: totalW, y: border, z: 0 };
    const bb4: Vec3 = { x: 0, y: border, z: 0 };
    triangles.push(...makeQuad(bb4, bb3, bb2, bb1));
    triangles.push(...makeQuad(bb1, bb2, t2, t1));
    triangles.push(...makeQuad(t4, t3, bb3, bb4));
  }

  // Back edge (y=last)
  for (let x = 0; x < imgW - 1; x++) {
    const z1 = toZ(bitmap[imgH - 1][x]);
    const z2 = toZ(bitmap[imgH - 1][x + 1]);
    const t1: Vec3 = { x: toX(x), y: toY(imgH - 1) + pixelH, z: z1 };
    const t2: Vec3 = { x: toX(x + 1), y: toY(imgH - 1) + pixelH, z: z2 };
    const bb1: Vec3 = { x: toX(x), y: toY(imgH - 1) + pixelH, z: 0 };
    const bb2: Vec3 = { x: toX(x + 1), y: toY(imgH - 1) + pixelH, z: 0 };
    triangles.push(...makeQuad(t1, t2, bb2, bb1));
  }
  // Back border strip
  {
    const y0 = totalH - border;
    const t1: Vec3 = { x: 0, y: y0, z: opts.maxThickness };
    const t2: Vec3 = { x: totalW, y: y0, z: opts.maxThickness };
    const t3: Vec3 = { x: totalW, y: totalH, z: opts.maxThickness };
    const t4: Vec3 = { x: 0, y: totalH, z: opts.maxThickness };
    triangles.push(...makeQuad(t4, t3, t2, t1));
    const bb1: Vec3 = { x: 0, y: y0, z: 0 };
    const bb2: Vec3 = { x: totalW, y: y0, z: 0 };
    const bb3: Vec3 = { x: totalW, y: totalH, z: 0 };
    const bb4: Vec3 = { x: 0, y: totalH, z: 0 };
    triangles.push(...makeQuad(bb1, bb2, bb3, bb4));
    triangles.push(...makeQuad(t1, t2, bb2, bb1));
    triangles.push(...makeQuad(bb4, bb3, t3, t4));
  }

  // Left border
  {
    const t1: Vec3 = { x: 0, y: 0, z: opts.maxThickness };
    const t2: Vec3 = { x: border, y: 0, z: opts.maxThickness };
    const t3: Vec3 = { x: border, y: totalH, z: opts.maxThickness };
    const t4: Vec3 = { x: 0, y: totalH, z: opts.maxThickness };
    triangles.push(...makeQuad(t4, t1, t2, t3));
    const bb1: Vec3 = { x: 0, y: 0, z: 0 };
    const bb2: Vec3 = { x: border, y: 0, z: 0 };
    const bb3: Vec3 = { x: border, y: totalH, z: 0 };
    const bb4: Vec3 = { x: 0, y: totalH, z: 0 };
    triangles.push(...makeQuad(bb1, bb4, bb3, bb2));
    triangles.push(...makeQuad(bb4, t4, t3, bb3));
    triangles.push(...makeQuad(t2, t1, bb1, bb2));
  }

  // Right border
  {
    const x0 = totalW - border;
    const t1: Vec3 = { x: x0, y: 0, z: opts.maxThickness };
    const t2: Vec3 = { x: totalW, y: 0, z: opts.maxThickness };
    const t3: Vec3 = { x: totalW, y: totalH, z: opts.maxThickness };
    const t4: Vec3 = { x: x0, y: totalH, z: opts.maxThickness };
    triangles.push(...makeQuad(t1, t4, t3, t2));
    const bb1: Vec3 = { x: x0, y: 0, z: 0 };
    const bb2: Vec3 = { x: totalW, y: 0, z: 0 };
    const bb3: Vec3 = { x: totalW, y: totalH, z: 0 };
    const bb4: Vec3 = { x: x0, y: totalH, z: 0 };
    triangles.push(...makeQuad(bb2, bb3, bb4, bb1));
    triangles.push(...makeQuad(bb3, t3, t4, bb4));
    triangles.push(...makeQuad(t1, t2, bb2, bb1));
  }

  return triangles;
}

export async function generateLithophane(
  input: string,
  options: Partial<LithophaneOptions> & { outputFile: string },
): Promise<{ stlFile: string; nfcFile: string; stats: { width: number; height: number; triangles: number } }> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const imgW = Math.floor((opts.maxWidth - 2 * opts.border) * opts.resolution);
  const imgH = Math.floor((opts.maxHeight - 2 * opts.border) * opts.resolution);

  const bitmap = hashToBitmap(input, imgW, imgH);
  const triangles = bitmapToTriangles(bitmap, opts);

  const stlFile = options.outputFile;
  saveSTL(triangles, stlFile);

  // Generate NFC data
  const { generateNFCJson } = await import('../core/nfc.js');
  const nfcFile = stlFile.replace(/\.stl$/, '.nfc.json');
  const fs = await import('node:fs');
  fs.writeFileSync(nfcFile, generateNFCJson(input));

  return {
    stlFile,
    nfcFile,
    stats: {
      width: opts.maxWidth,
      height: opts.maxHeight,
      triangles: triangles.length,
    },
  };
}
