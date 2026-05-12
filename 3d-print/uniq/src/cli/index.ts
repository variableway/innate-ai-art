#!/usr/bin/env node
import { Command } from 'commander';
import { generateLithophane } from '../lithophane/generator.js';
import { generateRelief } from '../relief/generator.js';
import { generateVase } from '../vase/generator.js';
import { generateCard } from '../nfc-card/generator.js';
import { generateGradientDisc, generateAMSScript } from '../carrier/color-gradient.js';
import { generateReliefDisc } from '../carrier/surface-relief.js';
import { generateShadowGift } from '../shadow-sculpture/generator.js';
import { hashToOKLCH, oklchToCSS, oklchToHex } from '../core/oklch.js';
import { generateHash } from '../core/hash.js';
import { generateNFCJson } from '../core/nfc.js';
import { saveSTL } from '../core/stl.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

const program = new Command();

program
  .name('uniq')
  .description('OKLCH hash → 3D print + NFC. Turn text, sound, personal data into unique physical objects.')
  .version('1.0.0');

program
  .command('color')
  .description('Generate OKLCH color from input text')
  .argument('<text>', 'Input text')
  .action((text: string) => {
    const color = hashToOKLCH(text);
    console.log(`Input: "${text}"`);
    console.log(`OKLCH: ${oklchToCSS(color)}`);
    console.log(`HEX:   ${oklchToHex(color)}`);
    console.log(`L: ${color.l.toFixed(3)}  C: ${color.c.toFixed(3)}  H: ${color.h.toFixed(1)}`);
  });

program
  .command('nfc')
  .description('Generate NFC write data from input text')
  .argument('<text>', 'Input text')
  .option('-u, --url <url>', 'URL to encode in NFC tag')
  .option('-o, --output <file>', 'Output JSON file')
  .action((text: string, opts: { url?: string; output?: string }) => {
    const json = generateNFCJson(text, opts.url);
    if (opts.output) {
      fs.writeFileSync(opts.output, json);
      console.log(`NFC data saved to ${opts.output}`);
    } else {
      console.log(json);
    }
  });

program
  .command('lithophane')
  .description('Generate lithophane STL from text (light-shadow art)')
  .argument('<text>', 'Input text to encode')
  .option('-w, --width <mm>', 'Width in mm', '100')
  .option('-h, --height <mm>', 'Height in mm', '80')
  .option('-t, --thickness <mm>', 'Max thickness in mm', '3')
  .option('-r, --resolution <px/mm>', 'Pixels per mm', '2')
  .option('-o, --output <file>', 'Output STL file', './output/lithophane.stl')
  .action(async (text: string, opts: Record<string, string>) => {
    const outputFile = opts.output;
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    console.log(`Generating lithophane for "${text}"...`);
    const result = await generateLithophane(text, {
      maxWidth: parseFloat(opts.width),
      maxHeight: parseFloat(opts.height),
      maxThickness: parseFloat(opts.thickness),
      resolution: parseFloat(opts.resolution),
      outputFile,
    });

    console.log(`STL saved: ${result.stlFile} (${result.stats.triangles} triangles)`);
    console.log(`NFC data:  ${result.nfcFile}`);
    console.log(`Size: ${result.stats.width} x ${result.stats.height} mm`);
  });

program
  .command('relief')
  .description('Generate 3D relief or pendant STL from text')
  .argument('<text>', 'Input text')
  .option('--type <type>', 'pendant or relief', 'pendant')
  .option('--radius <mm>', 'Pendant radius in mm', '25')
  .option('--output <file>', 'Output STL file', './output/pendant.stl')
  .action(async (text: string, opts: Record<string, string>) => {
    const outputFile = opts.output;
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    console.log(`Generating ${opts.type} for "${text}"...`);
    const result = await generateRelief(text, opts.type as 'pendant' | 'relief', {
      radius: parseFloat(opts.radius),
      outputFile,
    });

    console.log(`STL saved: ${result.stlFile} (${result.triangles} triangles)`);
    console.log(`NFC data:  ${result.nfcFile}`);
  });

program
  .command('vase')
  .description('Generate multi-color vase STL from personal data')
  .argument('<text>', 'Personal data (name, birthday, etc.)')
  .option('--height <mm>', 'Vase height in mm', '100')
  .option('--layers <n>', 'Number of layers', '200')
  .option('--shape <type>', 'bezier, cylinder, or wave', 'bezier')
  .option('--output <file>', 'Output STL file', './output/vase.stl')
  .action(async (text: string, opts: Record<string, string>) => {
    const outputFile = opts.output;
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    console.log(`Generating vase for "${text}"...`);
    const result = await generateVase(text, {
      height: parseFloat(opts.height),
      layers: parseInt(opts.layers),
      shape: opts.shape as 'bezier' | 'cylinder' | 'wave',
      outputFile,
    });

    console.log(`STL saved: ${result.stlFile} (${result.triangles} triangles)`);
    console.log(`Color change G-code: ${result.gcodeFile}`);
    console.log(`NFC data: ${result.nfcFile}`);
    console.log(`Palette:`);
    result.palette.forEach((c, i) => {
      console.log(`  ${i + 1}. ${oklchToCSS(c)} → ${oklchToHex(c)}`);
    });
  });

program
  .command('nfc-card')
  .description('Generate NFC business card STL')
  .argument('<text>', 'Name or text for the card')
  .option('--url <url>', 'URL to encode in NFC tag')
  .option('--style <style>', 'waves, grid, fingerprint, or minimal', 'waves')
  .option('--output <file>', 'Output STL file', './output/nfc-card.stl')
  .action(async (text: string, opts: Record<string, string>) => {
    const outputFile = opts.output;
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    console.log(`Generating NFC card for "${text}"...`);
    const result = await generateCard(text, {
      style: opts.style as 'waves' | 'grid' | 'fingerprint' | 'minimal',
      outputFile,
      url: opts.url,
    });

    console.log(`STL saved: ${result.stlFile} (${result.triangles} triangles)`);
    console.log(`NFC data:  ${result.nfcFile}`);
    console.log(`\nTo complete:`);
    console.log(`1. Open STL in Bambu Studio`);
    console.log(`2. Slice with pause at NFC slot layer`);
    console.log(`3. During pause, insert NTAG213 tag`);
    console.log(`4. Use NFC Tools app to write data from ${result.nfcFile}`);
  });

program
  .command('gift')
  .description('Generate complete gift set with all 4 carriers for P1S')
  .argument('<text>', 'Secret message / personal data')
  .option('--name <name>', 'Recipient name', 'Someone Special')
  .option('-o, --output <dir>', 'Output directory', './output/gift')
  .action(async (text: string, opts: { name: string; output: string }) => {
    const outDir = opts.output;
    fs.mkdirSync(outDir, { recursive: true });
    const hash = generateHash(text);
    const color = hashToOKLCH(text);

    console.log(`\nGenerating complete gift set for "${opts.name}"...`);
    console.log(`Hash: ${hash.slice(0, 16)}...`);
    console.log(`Theme color: ${oklchToCSS(color)} → ${oklchToHex(color)}\n`);

    // Carrier 1: Color gradient disc (AMS multi-color)
    console.log('--- Carrier 1: Color Gradient Disc ---');
    const gradTriangles = generateGradientDisc(text, { diameter: 60, thickness: 3 });
    const gradFile = path.join(outDir, 'gradient-disc.stl');
    saveSTL(gradTriangles, gradFile);
    console.log(`  STL: ${gradFile} (${gradTriangles.length} triangles)`);

    const { gcode: amsGcode, colorChanges } = generateAMSScript(text, { diameter: 60, thickness: 3 });
    const amsFile = path.join(outDir, 'gradient-disc-ams.gcode');
    fs.writeFileSync(amsFile, amsGcode);
    console.log(`  AMS: ${amsFile} (${colorChanges.length} color changes)`);

    // Carrier 2: Surface relief pendant (Voronoi texture)
    console.log('\n--- Carrier 2: Surface Relief Pendant ---');
    const reliefTriangles = generateReliefDisc(text, { diameter: 50, thickness: 4 });
    const reliefFile = path.join(outDir, 'relief-pendant.stl');
    saveSTL(reliefTriangles, reliefFile);
    console.log(`  STL: ${reliefFile} (${reliefTriangles.length} triangles)`);
    console.log(`  Print: 0.12mm layer height, 30-50mm/s outer wall, Random Seam ON`);

    // Carrier 3: Lithophane (light transmission)
    console.log('\n--- Carrier 3: Lithophane ---');
    const lithoResult = await generateLithophane(text, {
      maxWidth: 80, maxHeight: 60, maxThickness: 3, outputFile: path.join(outDir, 'lithophane.stl'),
    });
    console.log(`  STL: ${lithoResult.stlFile} (${lithoResult.stats.triangles} triangles)`);
    console.log(`  Print: White PLA, 0.08-0.12mm layer height, 100% infill, vertical`);

    // Carrier 4: NFC digital carrier
    console.log('\n--- Carrier 4: NFC Digital Data ---');
    const nfcFile = path.join(outDir, 'nfc-data.json');
    const decoderUrl = `https://uniq.art/decode#${hash.slice(0, 16)}`;
    fs.writeFileSync(nfcFile, generateNFCJson(text, decoderUrl));
    console.log(`  Data: ${nfcFile}`);

    // Copy decoder web page
    const webSrc = path.join(path.dirname(path.dirname(import.meta.url.replace('file://', ''))), 'web', 'decoder.html');
    const webDst = path.join(outDir, 'decoder.html');
    try {
      fs.copyFileSync(webSrc, webDst);
      console.log(`  Page: ${webDst}`);
    } catch {
      console.log(`  Page: (decoder.html source not found, generate with 'npx uniq web')`);
    }

    // Summary
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Gift Set Summary for "${opts.name}"`);
    console.log(`${'='.repeat(50)}`);
    console.log(`Files generated in: ${outDir}/`);
    console.log(``);
    console.log(`Print order for P1S:`);
    console.log(`  1. gradient-disc.stl  → AMS: Red(T0), Yellow(T1), White(T2)`);
    console.log(`     Use gradient-disc-ams.gcode for color changes`);
    console.log(`  2. relief-pendant.stl → Single color, 0.12mm, slow outer wall`);
    console.log(`  3. lithophane.stl     → White PLA, 0.08mm, vertical, 100% infill`);
    console.log(``);
    console.log(`NFC embedding (for each print with slot):`);
    console.log(`  - Slice → Add pause at NFC slot layer`);
    console.log(`  - During pause → Insert NTAG213 (25mm round)`);
    console.log(`  - After print → Write nfc-data.json via NFC Tools app`);
    console.log(``);
    console.log(`Verification: open decoder.html in phone browser`);
  });

program
  .command('web')
  .description('Copy decoder web page to output directory')
  .option('-o, --output <dir>', 'Output directory', './output')
  .action((opts: { output: string }) => {
    fs.mkdirSync(opts.output, { recursive: true });
    const webSrc = path.join(path.dirname(path.dirname(import.meta.url.replace('file://', ''))), 'web', 'decoder.html');
    const webDst = path.join(opts.output, 'decoder.html');
    fs.copyFileSync(webSrc, webDst);
    console.log(`Decoder page saved to ${webDst}`);
    console.log(`Open in browser to test the verification flow.`);
  });

program
  .command('shadow')
  .description('Generate shadow sculpture — flashlight reveals hidden pattern')
  .argument('<text>', 'Secret message to encode in shadow')
  .option('--width <mm>', 'Total width in mm', '60')
  .option('--height <mm>', 'Total height in mm', '50')
  .option('--panels <n>', 'Number of shadow panels', '12')
  .option('--url <url>', 'URL for NFC tag')
  .option('-o, --output <file>', 'Output STL file', './output/shadow-sculpture.stl')
  .action(async (text: string, opts: Record<string, string>) => {
    const outputFile = opts.output;
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    console.log(`Generating shadow sculpture for "${text}"...`);
    const result = await generateShadowGift(text, {
      width: parseFloat(opts.width),
      height: parseFloat(opts.height),
      panelCount: parseInt(opts.panels),
      outputFile,
      url: opts.url,
    });

    console.log(`\nSTL saved: ${result.stlFile} (${result.triangles} triangles)`);
    console.log(`NFC data:  ${result.nfcFile}`);
    console.log(`\n${result.instructions}`);
  });

program.parse();
