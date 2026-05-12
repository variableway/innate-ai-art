import { generateHash, hashToSegments } from '../core/hash.js';
import { makeTriangle, makeQuad, saveSTL, type Vec3 } from '../core/stl.js';
import type { CardOptions } from '../core/types.js';

const DEFAULT_CARD: CardOptions = {
  width: 85.6,       // standard credit card
  height: 54,
  thickness: 1.5,
  nfcSlotRadius: 12.5, // 25mm diameter tag
  nfcSlotDepth: 0.5,
  style: 'waves',
};

export function generateCardGeometry(
  input: string,
  options: Partial<CardOptions> = {},
): ReturnType<typeof makeTriangle>[] {
  const opts = { ...DEFAULT_CARD, ...options };
  const hash = generateHash(input);
  const segments = hashToSegments(hash, 8);

  const triangles: ReturnType<typeof makeTriangle>[] = [];
  const w = opts.width;
  const h = opts.height;
  const t = opts.thickness;

  // Round corners (credit card standard: 3.48mm radius)
  const cornerRadius = 3.48;

  // Generate card outline with rounded corners
  function cardOutline(a: number, r: number): Vec3 {
    // Determine which corner quadrant
    const hw = w / 2;
    const hh = h / 2;

    let cx = 0, cy = 0;
    const cornerInset = cornerRadius;

    if (a >= 0 && a < Math.PI / 2) {
      // Bottom-right
      cx = hw - cornerInset;
      cy = -(hh - cornerInset);
    } else if (a >= Math.PI / 2 && a < Math.PI) {
      // Bottom-left
      cx = -(hw - cornerInset);
      cy = -(hh - cornerInset);
    } else if (a >= Math.PI && a < Math.PI * 1.5) {
      // Top-left
      cx = -(hw - cornerInset);
      cy = hh - cornerInset;
    } else {
      // Top-right
      cx = hw - cornerInset;
      cy = hh - cornerInset;
    }

    return {
      x: cx + Math.cos(a) * cornerInset,
      y: cy + Math.sin(a) * cornerInset,
      z: 0,
    };
  }

  // Check if a point is inside the NFC slot area (centered)
  function inNFCSlot(x: number, y: number): boolean {
    return Math.sqrt(x * x + y * y) < opts.nfcSlotRadius;
  }

  const outlineSteps = 64;

  // Top surface with pattern
  const gridX = 40;
  const gridY = 26;

  for (let xi = 0; xi < gridX; xi++) {
    for (let yi = 0; yi < gridY; yi++) {
      const x1 = -w / 2 + (xi / gridX) * w;
      const x2 = -w / 2 + ((xi + 1) / gridX) * w;
      const y1 = -h / 2 + (yi / gridY) * h;
      const y2 = -h / 2 + ((yi + 1) / gridY) * h;

      // Skip if outside card bounds (rough check)
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      if (Math.abs(mx) > w / 2 - 1 || Math.abs(my) > h / 2 - 1) continue;
      if (inNFCSlot(mx, my)) continue;

      // Generate pattern based on style and hash
      const segIdx = (xi + yi * gridX) % segments.length;
      let zTop = t;

      if (opts.style === 'waves') {
        const wave1 = Math.sin(xi * 0.5 + segments[segIdx].h * 0.05) * 0.3;
        const wave2 = Math.cos(yi * 0.4 + segments[segIdx].l * 3) * 0.2;
        zTop = t * 0.6 + Math.max(0, wave1 + wave2) * t * 0.3;
      } else if (opts.style === 'grid') {
        const gridPattern = ((xi + yi) % 3 === 0) ? 0.2 : 0;
        zTop = t * 0.7 + gridPattern * t * 0.2;
      } else if (opts.style === 'fingerprint') {
        const dist = Math.sqrt(mx * mx + my * my);
        const ring = Math.sin(dist * 0.5 + segments[segIdx].h * 0.1) * 0.3;
        zTop = t * 0.6 + Math.max(0, ring) * t * 0.3;
      } else {
        zTop = t * 0.8;
      }

      const v1: Vec3 = { x: x1, y: y1, z: zTop };
      const v2: Vec3 = { x: x2, y: y1, z: zTop };
      const v3: Vec3 = { x: x2, y: y2, z: zTop };
      const v4: Vec3 = { x: x1, y: y2, z: zTop };

      triangles.push(...makeQuad(v1, v2, v3, v4));
    }
  }

  // NFC slot area — recessed
  const slotSteps = 24;
  const slotR = opts.nfcSlotRadius;
  const slotD = opts.nfcSlotDepth;
  const slotTop = t - slotD;

  // Slot top surface (flat, recessed)
  for (let a = 0; a < slotSteps; a++) {
    const a1 = (a / slotSteps) * Math.PI * 2;
    const a2 = ((a + 1) / slotSteps) * Math.PI * 2;

    triangles.push(makeTriangle(
      { x: 0, y: 0, z: slotTop },
      { x: Math.cos(a1) * slotR, y: Math.sin(a1) * slotR, z: slotTop },
      { x: Math.cos(a2) * slotR, y: Math.sin(a2) * slotR, z: slotTop },
    ));
  }

  // Slot walls
  for (let a = 0; a < slotSteps; a++) {
    const a1 = (a / slotSteps) * Math.PI * 2;
    const a2 = ((a + 1) / slotSteps) * Math.PI * 2;

    triangles.push(...makeQuad(
      { x: Math.cos(a1) * slotR, y: Math.sin(a1) * slotR, z: t },
      { x: Math.cos(a2) * slotR, y: Math.sin(a2) * slotR, z: t },
      { x: Math.cos(a2) * slotR, y: Math.sin(a2) * slotR, z: slotTop },
      { x: Math.cos(a1) * slotR, y: Math.sin(a1) * slotR, z: slotTop },
    ));
  }

  // Bottom surface (flat)
  for (let a = 0; a < outlineSteps; a++) {
    const p1 = cardOutline((a / outlineSteps) * Math.PI * 2, cornerRadius);
    const p2 = cardOutline(((a + 1) / outlineSteps) * Math.PI * 2, cornerRadius);

    triangles.push(makeTriangle(
      { x: 0, y: 0, z: 0 },
      { x: p2.x, y: p2.y, z: 0 },
      { x: p1.x, y: p1.y, z: 0 },
    ));
  }

  // Side walls
  for (let a = 0; a < outlineSteps; a++) {
    const p1 = cardOutline((a / outlineSteps) * Math.PI * 2, cornerRadius);
    const p2 = cardOutline(((a + 1) / outlineSteps) * Math.PI * 2, cornerRadius);

    triangles.push(...makeQuad(
      { x: p1.x, y: p1.y, z: 0 },
      { x: p2.x, y: p2.y, z: 0 },
      { x: p2.x, y: p2.y, z: t },
      { x: p1.x, y: p1.y, z: t },
    ));
  }

  return triangles;
}

export async function generateCard(
  input: string,
  options: Partial<CardOptions> & { outputFile: string; url?: string },
): Promise<{ stlFile: string; nfcFile: string; triangles: number }> {
  const triangles = generateCardGeometry(input, options);
  const stlFile = options.outputFile as string;
  saveSTL(triangles, stlFile);

  const { generateNFCJson } = await import('../core/nfc.js');
  const fs = await import('node:fs');
  const nfcFile = stlFile.replace(/\.stl$/, '.nfc.json');
  fs.writeFileSync(nfcFile, generateNFCJson(input, options.url));

  return { stlFile, nfcFile, triangles: triangles.length };
}
