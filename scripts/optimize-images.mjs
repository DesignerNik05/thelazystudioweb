/**
 * Converts the PNGs in public/assets to WebP.
 *
 * The originals are ~5.4 MB combined and were shipping uncompressed, which is
 * both slow for visitors and expensive in Vercel origin transfer. Re-run after
 * adding a new source image:  npm run optimize:images
 */
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const DIR = "public/assets";
const QUALITY = 80;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith(".png"));
if (files.length === 0) {
  console.log("No PNGs found in", DIR);
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of files) {
  const src = join(DIR, file);
  const out = join(DIR, `${parse(file).name}.webp`);

  const originalSize = (await stat(src)).size;
  await sharp(src).webp({ quality: QUALITY, effort: 6 }).toFile(out);
  const newSize = (await stat(out)).size;

  before += originalSize;
  after += newSize;

  const saved = (100 * (1 - newSize / originalSize)).toFixed(0);
  console.log(
    `  ${file.padEnd(28)} ${kb(originalSize).padStart(9)} -> ${kb(newSize).padStart(8)}  (-${saved}%)`,
  );
}

console.log(
  `\n  total ${kb(before)} -> ${kb(after)}  (-${(100 * (1 - after / before)).toFixed(0)}%)`,
);
