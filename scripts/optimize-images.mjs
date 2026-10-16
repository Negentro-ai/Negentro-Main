/**
 * Automated Asset Optimization Utility for Negentro AI
 *
 * Scans public/assets and public/logos for any new or modified PNG, JPG, or SVG files.
 * Automatically generates high-efficiency WebP counterparts and optimizes SVGs.
 * Run with: npm run optimize:images
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = ['public'];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    const baseName = path.basename(entry.name, ext);

    // 1. Process PNG and JPG/JPEG files -> Generate WebP
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const webpPath = path.join(dir, `${baseName}.webp`);
      const originalStat = fs.statSync(fullPath);

      // Only generate if webp doesn't exist or original is newer
      if (!fs.existsSync(webpPath) || originalStat.mtime > fs.statSync(webpPath).mtime) {
        try {
          const image = sharp(fullPath);
          const meta = await image.metadata();

          await image
            .resize({ width: Math.min(meta.width || 1400, 1400), withoutEnlargement: true })
            .webp({ quality: 85, effort: 6 })
            .toFile(webpPath);

          const webpStat = fs.statSync(webpPath);
          console.log(`[Optimized] ${fullPath} (${(originalStat.size/1024).toFixed(1)} KB) -> ${webpPath} (${(webpStat.size/1024).toFixed(1)} KB)`);
        } catch (err) {
          console.warn(`[Skip] Could not convert ${fullPath}:`, err.message);
        }
      }
    }

    // 2. Check SVGs for heavy embedded base64 images (>50KB)
    if (ext === '.svg') {
      const svgStat = fs.statSync(fullPath);
      if (svgStat.size > 50 * 1024) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const match = content.match(/data:image\/(?:png|jpeg|jpg);base64,([^"]+)/i);
        if (match) {
          try {
            const rawBuffer = Buffer.from(match[1], 'base64');
            const compressed = await sharp(rawBuffer)
              .webp({ quality: 85, effort: 6 })
              .toBuffer();

            const newSvg = content.replace(
              /data:image\/(?:png|jpeg|jpg);base64,[^"]+/i,
              `data:image/webp;base64,${compressed.toString('base64')}`
            );
            fs.writeFileSync(fullPath, newSvg, 'utf8');
            const newStat = fs.statSync(fullPath);
            console.log(`[SVG Optimized] ${fullPath}: ${(svgStat.size/1024).toFixed(1)} KB -> ${(newStat.size/1024).toFixed(1)} KB`);
          } catch (err) {
            console.warn(`[Skip] Could not optimize embedded SVG in ${fullPath}:`, err.message);
          }
        }
      }
    }
  }
}

async function main() {
  console.log('--- Starting Negentro Image Optimization ---');
  for (const dir of TARGET_DIRS) {
    await processDirectory(dir);
  }
  console.log('--- Negentro Image Optimization Complete ---');
}

main().catch(console.error);
