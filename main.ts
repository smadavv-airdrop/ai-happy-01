import { copyFile, mkdir } from 'node:fs/promises';
import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const destination = resolve(outputDir, 'entry.png');

await mkdir(dirname(destination), { recursive: true });
await copyFile(fileURLToPath(source), destination);

const data = readFileSync(destination);
const length = statSync(destination).size;
let format: 'PNG' | 'JPEG';
let width: number;
let height: number;

if (data.length >= 24 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47) {
  format = 'PNG';
  width = data.readUInt32BE(16);
  height = data.readUInt32BE(20);
} else if (data.length >= 4 && data[0] === 0xff && data[1] === 0xd8) {
  format = 'JPEG';
  let offset = 2;
  let dimensions: [number, number] | undefined;
  while (offset < data.length) {
    if (data[offset++] !== 0xff) throw new Error('Invalid JPEG marker');
    while (data[offset] === 0xff) offset++;
    const marker = data[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7 || marker === 0x01) continue;
    if (offset + 2 > data.length) break;
    const segmentLength = data.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > data.length) throw new Error('Invalid JPEG segment');
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      if (segmentLength < 7) throw new Error('Invalid JPEG frame');
      height = data.readUInt16BE(offset + 3);
      width = data.readUInt16BE(offset + 5);
      dimensions = [width, height];
      break;
    }
    offset += segmentLength;
  }
  if (!dimensions) throw new Error('JPEG dimensions not found');
  [width, height] = dimensions;
} else {
  throw new Error('Unsupported image format');
}

if (width !== 1024) throw new Error(`Wrong ${format} width: ${width}`);
if (height !== 1024) throw new Error(`Wrong ${format} height: ${height}`);
if (length > 1048576) throw new Error(`Image exceeds 1048576 bytes: ${length}`);
console.log(`${destination} ${format} ${width} ${height} ${length}`);
