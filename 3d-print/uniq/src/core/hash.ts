import { createHash } from 'node:crypto';
import type { OKLCHColor } from './types.js';

export function generateHash(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex');
}

export function hashToOKLCHParams(hash: string): OKLCHColor {
  const lRaw = parseInt(hash.slice(0, 8), 16);
  const cRaw = parseInt(hash.slice(8, 16), 16);
  const hRaw = parseInt(hash.slice(16, 24), 16);

  return {
    l: 0.3 + (lRaw % 401) / 1000,  // 0.3 - 0.7
    c: 0.05 + (cRaw % 151) / 1000,  // 0.05 - 0.20
    h: hRaw % 360,
  };
}

export function hashToSegments(hash: string, count: number): OKLCHColor[] {
  // Each segment uses 24 hex chars (12 bytes): 8 for L, 8 for C, 8 for H
  // SHA-256 gives 64 hex chars, enough for ~2 full segments
  // For more segments, use hash-chaining
  const segments: OKLCHColor[] = [];
  let currentHash = hash;

  for (let i = 0; i < count; i++) {
    const offset = (i * 24) % 64;
    if (offset + 24 <= 64) {
      const segment = currentHash.slice(offset, offset + 24);
      segments.push(hashToOKLCHParams(segment.padEnd(24, '0')));
    } else {
      // Chain hash for more entropy
      currentHash = generateHash(currentHash + i);
      segments.push(hashToOKLCHParams(currentHash.slice(0, 24)));
    }
  }

  return segments;
}
