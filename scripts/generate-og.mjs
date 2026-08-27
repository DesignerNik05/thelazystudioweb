/**
 * Renders the Open Graph card to public/assets/og-cover.png.
 *
 *   npm run og
 *
 * Rendered by headless Chrome rather than sharp's SVG renderer, because
 * libvips on macOS resolves fonts through the system font list and will not
 * read a custom directory — it silently falls back to Helvetica. Chrome loads
 * the project's own Inter woff2 via @font-face, so the card uses the real
 * brand typeface. Edit scripts/og/card.html to change the design.
 */
import { execFile } from "node:child_process";
import { access, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CARD = resolve("scripts/og/card.html");
const RAW = resolve("scripts/og/.og-raw.png");
const OUT = resolve("public/assets/og-cover.png");
const WIDTH = 1200;
const HEIGHT = 630;

try {
  await access(CHROME);
} catch {
  console.error(`Chrome not found at ${CHROME}.`);
  console.error("Install Chrome, or point CHROME at another Chromium build.");
  process.exit(1);
}

await rm(RAW, { force: true });

await run(CHROME, [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  `--window-size=${WIDTH},${HEIGHT}`,
  `--screenshot=${RAW}`,
  `file://${CARD}`,
]).catch(() => {}); // Chrome exits non-zero on some builds even when it succeeds

try {
  await access(RAW);
} catch {
  console.error("Chrome produced no screenshot. Is the card path readable?");
  process.exit(1);
}

const meta = await sharp(RAW).metadata();
if (meta.width !== WIDTH || meta.height !== HEIGHT) {
  console.error(`Expected ${WIDTH}x${HEIGHT}, got ${meta.width}x${meta.height}.`);
  process.exit(1);
}

await sharp(RAW).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(OUT);
await rm(RAW, { force: true });

const before = meta.size ?? (await stat(RAW).catch(() => ({ size: 0 }))).size;
const { size } = await stat(OUT);
console.log(
  `\n  ${OUT.replace(process.cwd() + "/", "")}  ${WIDTH}x${HEIGHT}  ${(size / 1024).toFixed(0)} kB`,
);
if (before) console.log(`  (optimised from ${(before / 1024).toFixed(0)} kB)`);
