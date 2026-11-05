import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require(path.resolve('textiles/node_modules/sharp'));

const BRAIN = 'C:\\Users\\dudej\\.gemini\\antigravity\\brain\\464796c6-fdc6-49aa-b28d-dd2754229030';
const OUT = path.resolve('castings/public/images/products');
const HERO_OUT = path.resolve('castings/public/images/hero');

const valveHero = path.join(BRAIN, 'ss316_valve_hero_1793843992986.jpg');
const impeller = path.join(BRAIN, 'closed_pump_impeller_1793844011389.jpg');
const flange = path.join(BRAIN, 'weld_neck_flange_1793844041835.jpg');
const bracket = path.join(BRAIN, 'ductile_iron_bracket_1793844066381.jpg');

console.log('Processing sharp CNC studio images for Castings...');

// 1. Valve hero for Datum Inspector and product catalogue
await sharp(valveHero)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 88 })
  .toFile(path.join(HERO_OUT, 'valve-body-cad-base.webp'));

await sharp(valveHero)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'ss316-valve-body-1.webp'));

await sharp(valveHero)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 88 })
  .toFile(path.join(OUT, 'ss316-valve-body-2.webp'));

// 2. Closed pump impeller
await sharp(impeller)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'closed-pump-impeller-1.webp'));

await sharp(impeller)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'closed-pump-impeller-2.webp'));

// 3. Weld-neck flange
await sharp(flange)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'weld-neck-flange-1.webp'));

await sharp(flange)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'weld-neck-flange-2.webp'));

// 4. Ductile iron bracket
await sharp(bracket)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'ductile-iron-bracket-1.webp'));

await sharp(bracket)
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT, 'ductile-iron-bracket-2.webp'));

// 5. Normalizing remaining products to eliminate any warm/grimy cast
const remaining = [
  'aluminium-actuator-housing-1.webp',
  'aluminium-actuator-housing-2.webp',
  'machined-shaft-coupling-1.webp',
  'machined-shaft-coupling-2.webp',
  'ss316-marine-deck-fitting-1.webp',
  'ss316-marine-deck-fitting-2.webp',
  'tractor-linkage-yoke-1.webp',
  'tractor-linkage-yoke-2.webp',
];

for (const f of remaining) {
  const filePath = path.join(OUT, f);
  if (fs.existsSync(filePath)) {
    const inputBuf = fs.readFileSync(filePath);
    const outputBuf = await sharp(inputBuf)
      .modulate({ saturation: 0.6, brightness: 1.05 })
      .linear(1.15, -12)
      .webp({ quality: 85 })
      .toBuffer();
    fs.writeFileSync(filePath, outputBuf);
  }
}

console.log('Castings product images processed cleanly.');
