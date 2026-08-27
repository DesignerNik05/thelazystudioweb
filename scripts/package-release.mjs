/**
 * Builds the site and zips it for upload to GoDaddy cPanel.
 *
 *   npm run release
 *
 * Produces release/thelazystudio-<n>.zip containing the CONTENTS of dist/
 * (not the dist folder itself), so it can be extracted straight into
 * public_html/ via cPanel File Manager -> Upload -> Extract.
 *
 * Includes the dotfiles: .htaccess must ship or client-side routes 404.
 */
import { execFile } from "node:child_process";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const DIST = "dist";
const OUT_DIR = "release";

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

if (!(await exists(DIST))) {
  console.error(`No ${DIST}/ found. Run "npm run build" first.`);
  process.exit(1);
}

if (!(await exists(join(DIST, ".htaccess")))) {
  console.error("dist/.htaccess is missing — client-side routes would 404 on Apache.");
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

// Name by build count so successive uploads are distinguishable without a clock
// (Date.now() is unavailable in some sandboxes and adds no real value here).
const existing = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".zip"));
const name = `thelazystudio-${String(existing.length + 1).padStart(3, "0")}.zip`;
const zipPath = join(OUT_DIR, name);
await rm(zipPath, { force: true });

// -r recurse, -q quiet. Zipping "." from inside dist keeps paths relative
// and includes dotfiles.
await run("zip", ["-rq", join("..", zipPath), "."], { cwd: DIST });

const { size } = await stat(zipPath);
console.log(`\n  ${zipPath}  (${(size / 1024).toFixed(0)} kB)`);
console.log("\n  Upload to cPanel:");
console.log("    1. File Manager -> public_html");
console.log("    2. Delete the previous build's files (keep .well-known if present)");
console.log("    3. Upload this zip, then right-click -> Extract");
console.log("    4. Confirm .htaccess is present (enable 'Show Hidden Files' in Settings)\n");
