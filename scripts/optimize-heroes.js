#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.resolve(__dirname, '../src/assets');
const outDir = path.resolve(__dirname, '../public/assets');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = [
  'hero-students.jpg',
  'hero-image2.png',
  'hero-image3.png',
  'hero-image4.png',
];

async function optimize() {
  for (const file of files) {
    const src = path.join(srcDir, file);
    if (!fs.existsSync(src)) {
      console.warn('Missing', src);
      continue;
    }

    const name = path.parse(file).name;
    const out = path.join(outDir, `${name}.webp`);

    try {
      await sharp(src)
        .resize({ width: 1600 })
        .webp({ quality: 80 })
        .toFile(out);
      console.log('Wrote', out);
    } catch (err) {
      console.error('Failed to optimize', src, err);
    }
  }
}

optimize().catch((e) => { console.error(e); process.exit(1); });
