/**
 * Frame extraction script for Stack'd
 * Run: node extract-frames.mjs
 *
 * Extracts 30fps .webp frames from Burger.mp4 → public/frames/
 * Uses ffmpeg-static (bundled binary — no system ffmpeg needed)
 */

import { createRequire } from 'module';
import { execSync } from 'child_process';
import { mkdirSync, existsSync, readdirSync } from 'fs';

const require = createRequire(import.meta.url);
const ffmpegPath = require('ffmpeg-static');

const outDir = 'public/frames';

mkdirSync(outDir, { recursive: true });

const existing = existsSync(outDir) ? readdirSync(outDir).filter(f => f.endsWith('.webp')) : [];
if (existing.length > 0) {
  console.log(`Found ${existing.length} existing frames. Skipping extraction.`);
  console.log('Delete public/frames/ and re-run to regenerate.');
  process.exit(0);
}

console.log('Extracting frames from Burger.mp4 at 30fps → public/frames/...');

execSync(
  `"${ffmpegPath}" -i Burger.mp4 -vf fps=30 -c:v libwebp -quality 85 "${outDir}/frame_%04d.webp"`,
  { stdio: 'inherit' }
);

const count = readdirSync(outDir).filter(f => f.endsWith('.webp')).length;
console.log(`\nDone! ${count} frames extracted to ${outDir}/`);
