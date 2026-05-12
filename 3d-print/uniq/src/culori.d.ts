declare module 'culori' {
  export interface Color {
    mode: string;
    l?: number;
    c?: number;
    h?: number;
    r?: number;
    g?: number;
    b?: number;
  }

  export function oklch(color: Color | string): Color | undefined;
  export function formatHex(color: Color): string;
  export function formatCss(color: Color): string;
}
