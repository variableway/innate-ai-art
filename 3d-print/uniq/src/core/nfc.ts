import { generateHash } from './hash.js';
import type { NFCData, NDEFRecord } from './types.js';

export function generateNFCContent(
  input: string,
  options: {
    url?: string;
    label?: string;
  } = {},
): NFCData[] {
  const hash = generateHash(input);
  const records: NFCData[] = [];

  if (options.url) {
    records.push({
      type: 'url',
      content: options.url,
      label: options.label ?? 'Uniq Link',
    });
  }

  records.push({
    type: 'text',
    content: `uniq:${hash.slice(0, 16)}`,
    label: 'Digital Fingerprint',
  });

  return records;
}

export function ndefToWriteInstructions(data: NFCData[]): object {
  return {
    version: '1.0',
    tag: {
      recommendedChip: 'NTAG213',
      capacity: '144 bytes',
      format: 'NDEF',
    },
    records: data.map((d) => ({
      type: d.type,
      content: d.content,
      label: d.label,
      instructions:
        d.type === 'url'
          ? `Open NFC Tools app → Write → URL → Enter: ${d.content} → Hold tag`
          : `Open NFC Tools app → Write → Text → Enter: ${d.content} → Hold tag`,
    })),
    embedding: {
      method: 'pause-and-insert',
      steps: [
        '1. Slice model in Bambu Studio / OrcaSlicer',
        '2. Add pause at the layer where NFC slot bottom is complete',
        '3. Start print, wait for pause',
        '4. Place NFC tag (NTAG213, 25mm round) into the slot',
        '5. Resume print to seal the tag inside',
        '6. After print, tap with phone to verify NFC works',
      ],
    },
  };
}

export function generateNFCJson(
  input: string,
  url?: string,
): string {
  const data = generateNFCContent(input, { url });
  const instructions = ndefToWriteInstructions(data);
  return JSON.stringify(instructions, null, 2);
}
