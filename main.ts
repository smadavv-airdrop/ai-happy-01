// for you — steam cat tea entry
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
const width = data.readUInt32BE(16);
const height = data.readUInt32BE(20);
const length = statSync(destination).size;
if (width !== 1024) throw new Error(`Wrong PNG width: ${width}`);
if (height !== 1024) throw new Error(`Wrong PNG height: ${height}`);
if (length > 1048576) throw new Error(`PNG exceeds 1048576 bytes: ${length}`);
console.log(`${destination} ${width} ${height} ${length}`);
