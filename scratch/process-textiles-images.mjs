import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require(path.resolve('textiles/node_modules/sharp'));

const BRAIN = 'C:\\Users\\dudej\\.gemini\\antigravity\\brain\\464796c6-fdc6-49aa-b28d-dd2754229030';
const STUDIO_OUT = path.resolve('textiles/public/images/studio');
const HERO_OUT = path.resolve('textiles/public/images/hero');
fs.mkdirSync(STUDIO_OUT, { recursive: true });
fs.mkdirSync(HERO_OUT, { recursive: true });

const indigoMaster = path.join(BRAIN, 'bed_colourway_indigo_1793844000362.jpg');
const flaxMaster = path.join(BRAIN, 'bed_colourway_flax_1793844017768.jpg');
const slateMaster = path.join(BRAIN, 'bed_colourway_slate_1793844035074.jpg');
const terracottaMaster = path.join(BRAIN, 'bed_colourway_terracotta_1793844049540.jpg');
const ochreMaster = path.join(BRAIN, 'bed_colourway_ochre_1793844068669.jpg');

console.log('Processing 6 exact-angle bed colourways for Textiles...');

// 1. Indigo
await sharp(indigoMaster)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(STUDIO_OUT, 'colourway-indigo.webp'));

// 2. Flax
await sharp(flaxMaster)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(STUDIO_OUT, 'colourway-flax.webp'));

// 3. Slate
await sharp(slateMaster)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(STUDIO_OUT, 'colourway-slate.webp'));

// 4. Terracotta
await sharp(terracottaMaster)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(STUDIO_OUT, 'colourway-terracotta.webp'));

// 5. Ochre
await sharp(ochreMaster)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(STUDIO_OUT, 'colourway-ochre.webp'));

// 6. Sage (derived from Slate/Flax master with exact muted sage colorway)
const slateBuf = await sharp(slateMaster).resize(1280, 720, { fit: 'cover' }).toBuffer();
await sharp(slateBuf)
  .tint({ r: 142, g: 158, b: 142 }) // Dusty Sage (#8E9E8E)
  .webp({ quality: 85 })
  .toFile(path.join(STUDIO_OUT, 'colourway-sage.webp'));

console.log('Creating hero macro-fabric-to-room visual...');
// A split-panel transition showing macro European flax linen texture seamlessly revealing the clean bedroom
const macroTexture = path.resolve('textiles/public/images/weaves/macro-linen.webp');
const macroBuf = await sharp(macroTexture).resize(640, 720, { fit: 'cover' }).toBuffer();
const bedBuf = await sharp(flaxMaster).resize(640, 720, { fit: 'cover' }).toBuffer();

await sharp({
  create: {
    width: 1280,
    height: 720,
    channels: 3,
    background: '#F4F1EA',
  },
})
  .composite([
    { input: macroBuf, top: 0, left: 0 },
    { input: bedBuf, top: 0, left: 640 },
  ])
  .webp({ quality: 88 })
  .toFile(path.join(HERO_OUT, 'hero-macro-to-room.webp'));

// Also update hero-bedroom-poster.webp
await sharp(flaxMaster)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(HERO_OUT, 'hero-bedroom-poster.webp'));

console.log('All Textiles bed colourways and hero macro visual generated cleanly.');
