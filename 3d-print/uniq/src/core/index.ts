export { generateHash, hashToOKLCHParams, hashToSegments } from './hash.js';
export {
  hashToOKLCH,
  generatePalette,
  oklchToHex,
  oklchToRGB,
  oklchToGrayscale,
  oklchToCSS,
  interpolateOKLCH,
  generateGradientPalette,
} from './oklch.js';
export {
  generateNFCContent,
  ndefToWriteInstructions,
  generateNFCJson,
} from './nfc.js';
export {
  writeSTLBinary,
  saveSTL,
  makeTriangle,
  makeQuad,
  computeNormal,
} from './stl.js';
export type { Vec3, Triangle } from './stl.js';
export type {
  OKLCHColor,
  RGBColor,
  NFCData,
  NDEFRecord,
  LithophaneOptions,
  PendantOptions,
  ReliefOptions,
  VaseParams,
  CardOptions,
  ColorLayer,
} from './types.js';
