export interface OKLCHColor {
  l: number; // 0-1 lightness
  c: number; // 0-0.4 chroma
  h: number; // 0-360 hue
}

export interface RGBColor {
  r: number; // 0-255
  g: number;
  b: number;
}

export interface NFCData {
  type: 'url' | 'text' | 'vcard' | 'smart-poster';
  content: string;
  label?: string;
}

export interface NDEFRecord {
  tnf: number; // Type Name Format
  type: string;
  payload: string;
}

export interface LithophaneOptions {
  maxWidth: number;   // mm
  maxHeight: number;  // mm
  maxThickness: number; // mm (darkest areas)
  minThickness: number; // mm (lightest areas)
  border: number;     // mm
  resolution: number; // pixels per mm
}

export interface PendantOptions {
  radius: number;      // mm
  height: number;      // mm
  turns: number;       // spiral turns
  wallThickness: number; // mm
  nfcSlotRadius: number; // mm (0 = no slot)
  nfcSlotDepth: number;  // mm
}

export interface ReliefOptions {
  width: number;       // mm
  height: number;      // mm
  maxDepth: number;    // mm
  border: number;      // mm
}

export interface VaseParams {
  height: number;      // mm
  bottomRadius: number;
  topRadius: number;
  wallThickness: number;
  layers: number;
  shape: 'bezier' | 'cylinder' | 'wave';
}

export interface CardOptions {
  width: number;       // mm (default 85.6 credit card)
  height: number;      // mm (default 54)
  thickness: number;   // mm (default 1.5)
  nfcSlotRadius: number; // mm (default 12.5 for 25mm tag)
  nfcSlotDepth: number;  // mm (default 0.5)
  style: 'waves' | 'grid' | 'fingerprint' | 'minimal';
}

export interface ColorLayer {
  layerHeight: number; // mm from bottom
  color: OKLCHColor;
  filamentIndex: number;
}
