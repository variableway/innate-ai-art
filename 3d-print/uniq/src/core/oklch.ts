import { oklch, formatHex, type Color } from 'culori';
import { generateHash, hashToOKLCHParams, hashToSegments } from './hash.js';
import type { OKLCHColor, RGBColor } from './types.js';

export function hashToOKLCH(input: string): OKLCHColor {
  const hash = generateHash(input);
  return hashToOKLCHParams(hash);
}

export function generatePalette(input: string, count: number): OKLCHColor[] {
  const hash = generateHash(input);
  return hashToSegments(hash, count);
}

export function oklchToHex(color: OKLCHColor): string {
  const c: Color = { mode: 'oklch', l: color.l, c: color.c, h: color.h };
  return formatHex(c);
}

export function oklchToRGB(color: OKLCHColor): RGBColor {
  const c: Color = { mode: 'oklch', l: color.l, c: color.c, h: color.h };
  const hex = formatHex(c);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function oklchToGrayscale(color: OKLCHColor): number {
  return color.l;
}

export function oklchToCSS(color: OKLCHColor): string {
  return `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`;
}

export function interpolateOKLCH(from: OKLCHColor, to: OKLCHColor, t: number): OKLCHColor {
  // Interpolate in OKLCH space — this is the key advantage over RGB/HSL
  const dh = to.h - from.h;
  // Take shortest path around hue wheel
  const hueDiff = Math.abs(dh) > 180 ? (dh > 0 ? dh - 360 : dh + 360) : dh;

  return {
    l: from.l + (to.l - from.l) * t,
    c: from.c + (to.c - from.c) * t,
    h: (from.h + hueDiff * t + 360) % 360,
  };
}

export function generateGradientPalette(
  input: string,
  count: number,
): OKLCHColor[] {
  // Generate a smooth gradient palette by creating 2 anchor colors and interpolating
  const hash = generateHash(input);
  const anchors = hashToSegments(hash, 2);
  const palette: OKLCHColor[] = [];

  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0;
    palette.push(interpolateOKLCH(anchors[0], anchors[1], t));
  }

  return palette;
}
