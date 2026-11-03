import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const CASTINGS_ROOT = process.cwd();
const REPO_ROOT = path.resolve(CASTINGS_ROOT, '..');

const HERO_DIR = path.join(CASTINGS_ROOT, 'public', 'images', 'hero');
const PRODUCTS_DIR = path.join(CASTINGS_ROOT, 'public', 'images', 'products');
const PROCESS_DIR = path.join(CASTINGS_ROOT, 'public', 'images', 'process');
const SPEC_DIR = path.join(CASTINGS_ROOT, 'public', 'spec-sheets');

fs.mkdirSync(HERO_DIR, { recursive: true });
fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
fs.mkdirSync(PROCESS_DIR, { recursive: true });
fs.mkdirSync(SPEC_DIR, { recursive: true });

async function writeWebpUnderBudget(input, dest, width, height, maxKb, darkGrade = false) {
  let quality = 78;
  while (quality >= 38) {
    let pipeline = sharp(input).resize(width, height, { fit: 'cover' });
    if (darkGrade) {
      pipeline = pipeline.modulate({ brightness: 0.88, saturation: 0.92 }).linear(1.08, -8);
    }
    const buf = await pipeline.webp({ quality, effort: 5 }).toBuffer();
    if (buf.byteLength <= maxKb * 1024 || quality <= 42) {
      fs.writeFileSync(dest, buf);
      return Math.round(buf.byteLength / 1024);
    }
    quality -= 6;
  }
}

const STOCK_ASSETS = [
  {
    url: 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=1600&h=900&fit=crop&q=82',
    sourcePage: 'https://unsplash.com/photos/photo-1698031610493-c19fa20dfeab',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(HERO_DIR, 'valve-body-cad-base.webp'),
    relPath: 'castings/public/images/hero/valve-body-cad-base.webp',
    width: 1440,
    height: 810,
    maxKb: 82,
    darkGrade: true,
    notes: 'Licensed Unsplash industrial stainless valve & flange assembly macro, graded & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1698031610493-c19fa20dfeab?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1698031610493-c19fa20dfeab',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'ss316-valve-body-1.webp'),
    relPath: 'castings/public/images/products/ss316-valve-body-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash stainless valve body photo, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1759148414485-5f624fe9d1ea?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1759148414485-5f624fe9d1ea',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'ss316-valve-body-2.webp'),
    relPath: 'castings/public/images/products/ss316-valve-body-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash industrial valve assembly detail, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1606755767959-5e014ce90ad2?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1606755767959-5e014ce90ad2',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'closed-pump-impeller-1.webp'),
    relPath: 'castings/public/images/products/closed-pump-impeller-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash radial metal rotor/impeller geometry, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1593062087953-b837e95b7095?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1593062087953-b837e95b7095',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'closed-pump-impeller-2.webp'),
    relPath: 'castings/public/images/products/closed-pump-impeller-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash precision round metal hub detail, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1559024610-7e78d62c9298?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1559024610-7e78d62c9298',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'weld-neck-flange-1.webp'),
    relPath: 'castings/public/images/products/weld-neck-flange-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash CNC-turned stainless steel flanges with bolt circle, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1774290490354-3c2fb95f8bf2?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1774290490354-3c2fb95f8bf2',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'weld-neck-flange-2.webp'),
    relPath: 'castings/public/images/products/weld-neck-flange-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash bolted high-pressure pipe flange connection, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1553007837-057e28298e01?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1553007837-057e28298e01',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'ductile-iron-bracket-1.webp'),
    relPath: 'castings/public/images/products/ductile-iron-bracket-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash heavy cast automotive/chassis metal components on dark surface, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1769147339214-076740872485?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1769147339214-076740872485',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'ductile-iron-bracket-2.webp'),
    relPath: 'castings/public/images/products/ductile-iron-bracket-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash machined mechanical parts on engineering blueprint, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1780034766224-04cfda73fa09?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1780034766224-04cfda73fa09',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'aluminium-actuator-housing-1.webp'),
    relPath: 'castings/public/images/products/aluminium-actuator-housing-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash cast aluminium industrial valve actuator housing, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1661571094656-1887a27885db?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1661571094656-1887a27885db',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'aluminium-actuator-housing-2.webp'),
    relPath: 'castings/public/images/products/aluminium-actuator-housing-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash precision CNC-machined aluminium housing detail, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1715322506425-2fc19fe0fc5f?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1715322506425-2fc19fe0fc5f',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'tractor-linkage-yoke-1.webp'),
    relPath: 'castings/public/images/products/tractor-linkage-yoke-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash heavy alloy steel mechanical linkage & forged parts, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1546710237-057a5519a3d1?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1546710237-057a5519a3d1',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'tractor-linkage-yoke-2.webp'),
    relPath: 'castings/public/images/products/tractor-linkage-yoke-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash precision steel mechanical tool/yoke assembly, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1790535002115-5c68efe11dfe?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1790535002115-5c68efe11dfe',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'ss316-marine-deck-fitting-1.webp'),
    relPath: 'castings/public/images/products/ss316-marine-deck-fitting-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash stainless steel marine deck hardware with water droplets, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1670580479846-261c4e21ff17?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1670580479846-261c4e21ff17',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'ss316-marine-deck-fitting-2.webp'),
    relPath: 'castings/public/images/products/ss316-marine-deck-fitting-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash mirror-polished stainless steel hardware close-up, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1713244433542-4c6205d09d97?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1713244433542-4c6205d09d97',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'machined-shaft-coupling-1.webp'),
    relPath: 'castings/public/images/products/machined-shaft-coupling-1.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash precision CNC-machined steel gear & shaft coupling, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1666634157070-6fd830fb5672?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1666634157070-6fd830fb5672',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'machined-shaft-coupling-2.webp'),
    relPath: 'castings/public/images/products/machined-shaft-coupling-2.webp',
    width: 960,
    height: 720,
    maxKb: 65,
    darkGrade: true,
    notes: 'Licensed Unsplash metal shaft held in CNC lathe chuck being machined, compressed to WebP',
  },
  // 6 Process Stage Photos
  {
    url: 'https://images.unsplash.com/photo-1520697517317-6767553cc51a?w=1280&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1520697517317-6767553cc51a',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PROCESS_DIR, 'step-01-pattern.webp'),
    relPath: 'castings/public/images/process/step-01-pattern.webp',
    width: 1120,
    height: 720,
    maxKb: 78,
    darkGrade: true,
    notes: 'Licensed Unsplash precision tooling & die setup for Process Step 01, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1787039467622-ddec5c24320c?w=1280&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1787039467622-ddec5c24320c',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PROCESS_DIR, 'step-02-shell.webp'),
    relPath: 'castings/public/images/process/step-02-shell.webp',
    width: 1120,
    height: 720,
    maxKb: 78,
    darkGrade: true,
    notes: 'Licensed Unsplash automated industrial casting workshop for Process Step 02, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1791356099225-82e4901ea804?w=1280&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1791356099225-82e4901ea804',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PROCESS_DIR, 'step-03-pour.webp'),
    relPath: 'castings/public/images/process/step-03-pour.webp',
    width: 1120,
    height: 720,
    maxKb: 78,
    darkGrade: false,
    notes: 'Licensed Unsplash industrial foundry ladle pouring molten metal for Process Step 03, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1280&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1740209475472-aa7d280f7452',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PROCESS_DIR, 'step-04-machine.webp'),
    relPath: 'castings/public/images/process/step-04-machine.webp',
    width: 1120,
    height: 720,
    maxKb: 78,
    darkGrade: true,
    notes: 'Licensed Unsplash CNC milling machine cutting metal casting for Process Step 04, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=1280&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1666618090858-fbcee636bd3e',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PROCESS_DIR, 'step-05-inspect.webp'),
    relPath: 'castings/public/images/process/step-05-inspect.webp',
    width: 1120,
    height: 720,
    maxKb: 78,
    darkGrade: true,
    notes: 'Licensed Unsplash precision metrology & spindle inspection for Process Step 05, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1280&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1586528116311-ad8dd3c8310d',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PROCESS_DIR, 'step-06-pack.webp'),
    relPath: 'castings/public/images/process/step-06-pack.webp',
    width: 1120,
    height: 720,
    maxKb: 78,
    darkGrade: true,
    notes: 'Licensed Unsplash palletised export dispatch warehouse for Process Step 06, compressed to WebP',
  },
];

function writePdfFile(outPath, lines) {
  const contentStreamLines = ['BT', '/F1 10 Tf', '42 780 Td', '15 TL'];
  for (const line of lines) {
    const escaped = line
      .replace(/†/g, ' (sample figure)')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
    contentStreamLines.push(`(${escaped}) Tj T*`);
  }
  contentStreamLines.push('ET');
  const streamData = contentStreamLines.join('\n');

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n',
    `5 0 obj\n<< /Length ${Buffer.byteLength(streamData, 'utf8')} >>\nstream\n${streamData}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }
  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  fs.writeFileSync(outPath, pdf, 'utf8');
}

const PRODUCTS_DATA = [
  {
    slug: 'ss316-valve-body',
    partNumber: 'KCM-VB-316',
    name: 'Flanged Ball Valve Body',
    materialGrade: '316 Stainless Steel',
    process: 'Investment Cast + 5-Axis CNC',
    weight: '6.8 kg (sample figure)',
    moq: '200 pcs (sample figure)',
    leadTime: '28 days FOB Mundra (sample figure)',
    hsCode: '8481',
  },
  {
    slug: 'closed-pump-impeller',
    partNumber: 'KCM-PI-316L',
    name: 'Closed-Vane Pump Impeller',
    materialGrade: '316L Stainless Steel',
    process: 'Investment Cast + Dynamic Balance + CNC',
    weight: '4.2 kg (sample figure)',
    moq: '150 pcs (sample figure)',
    leadTime: '28 days FOB Mundra (sample figure)',
    hsCode: '8413',
  },
  {
    slug: 'weld-neck-flange',
    partNumber: 'KCM-WN-300',
    name: 'High-Pressure Weld-Neck Flange',
    materialGrade: 'Forged 316L Stainless',
    process: 'CNC Turned & Drilled',
    weight: '8.9 kg (sample figure)',
    moq: '300 pcs (sample figure)',
    leadTime: '21 days CIF Hamburg (sample figure)',
    hsCode: '7307',
  },
  {
    slug: 'ductile-iron-bracket',
    partNumber: 'KCM-DB-400',
    name: 'Heavy Chassis Mounting Bracket',
    materialGrade: 'GGG40 Ductile Iron',
    process: 'Resin Sand Cast + 4-Axis CNC',
    weight: '18.4 kg (sample figure)',
    moq: '150 pcs (sample figure)',
    leadTime: '25 days CIF Hamburg (sample figure)',
    hsCode: '7325',
  },
  {
    slug: 'aluminium-actuator-housing',
    partNumber: 'KCM-AH-356',
    name: 'Pneumatic Actuator Housing',
    materialGrade: 'Heat-Treated Aluminium',
    process: 'Shell Cast + High-Speed CNC',
    weight: '2.6 kg (sample figure)',
    moq: '400 pcs (sample figure)',
    leadTime: '21 days FOB Mundra (sample figure)',
    hsCode: '8481',
  },
  {
    slug: 'tractor-linkage-yoke',
    partNumber: 'KCM-TY-414',
    name: 'Three-Point Hitch Linkage Yoke',
    materialGrade: 'Quenched Alloy Steel',
    process: 'Investment Cast + Broached + CNC',
    weight: '7.1 kg (sample figure)',
    moq: '250 pcs (sample figure)',
    leadTime: '25 days FOB Mundra (sample figure)',
    hsCode: '7326',
  },
  {
    slug: 'ss316-marine-deck-fitting',
    partNumber: 'KCM-MF-316L',
    name: 'Mirror-Passivated Mooring Fairlead',
    materialGrade: 'Marine 316L Stainless',
    process: 'Investment Cast + Electropolished + CNC',
    weight: '3.4 kg (sample figure)',
    moq: '200 pcs (sample figure)',
    leadTime: '24 days CIF Hamburg (sample figure)',
    hsCode: '7325',
  },
  {
    slug: 'machined-shaft-coupling',
    partNumber: 'KCM-SC-1045',
    name: 'Keyed Flanged Shaft Coupling',
    materialGrade: 'Black-Oxide Carbon Steel',
    process: 'Precision CNC Turned + Keyway Broached',
    weight: '5.3 kg (sample figure)',
    moq: '300 pcs (sample figure)',
    leadTime: '18 days FOB Mundra (sample figure)',
    hsCode: '8483',
  },
];

async function main() {
  const newRows = [];

  for (const item of STOCK_ASSETS) {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${item.url}: HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const kb = await writeWebpUnderBudget(buf, item.dest, item.width, item.height, item.maxKb, item.darkGrade);
    console.log(`Processed asset: ${path.basename(item.dest)} (${kb} KB)`);
    newRows.push(
      `| castings | \`${item.relPath}\` | ${item.sourcePage} | ${item.licence} | ${item.notes} (${kb} KB) |`
    );
  }

  for (const p of PRODUCTS_DATA) {
    const outPdf = path.join(SPEC_DIR, `${p.slug}.pdf`);
    writePdfFile(outPdf, [
      'SAMPLE COMPONENT SPECIFICATION SHEET — FICTIONAL COMPANY',
      '====================================================================',
      'Manufacturer:    Kinesis Cast & Machine Works, Rajkot, India [fictional]',
      `Component Name:  ${p.name}`,
      `Part Number:     ${p.partNumber}                 HS Code: ${p.hsCode}`,
      '--------------------------------------------------------------------',
      `Material:        ${p.materialGrade}`,
      `Process:         ${p.process}`,
      `Unit Weight:     ${p.weight}`,
      `Minimum Order:   ${p.moq}`,
      `Lead Time:       ${p.leadTime}`,
      'Incoterms:       FOB Mundra (INMUN) / CIF Hamburg / CIF Houston',
      'Export Packing:  VCI polybag + heat-treated seaworthy wooden crate',
      '--------------------------------------------------------------------',
      'WATERMARK: SAMPLE SPECIFICATION — FICTIONAL COMPANY DEMO ONLY.',
      'Concept design — fictional company. Website by Rajiv Dudeja.',
    ]);
    newRows.push(
      `| castings | \`castings/public/spec-sheets/${p.slug}.pdf\` | Build-time generated from \`lib/products.ts\` | Owned / generated for this project | Watermarked SAMPLE component spec sheet PDF |`
    );
  }

  const cmmPdf = path.join(CASTINGS_ROOT, 'public', 'sample-cmm-inspection-report.pdf');
  writePdfFile(cmmPdf, [
    'SAMPLE CMM & SPECTRO INSPECTION REPORT — FICTIONAL COMPANY',
    '====================================================================',
    'Manufacturer:    Kinesis Cast & Machine Works, Rajkot, India [fictional]',
    'Component:       Flanged Ball Valve Body (KCM-VB-316)',
    'Sample Heat ID:  KCM-HEAT-2026-44 (sample figure)',
    '--------------------------------------------------------------------',
    'CHECKPOINT                 NOMINAL          MEASURED (SAMPLE)   STATUS',
    '--------------------------------------------------------------------',
    'Primary Seat Bore          50.00 mm         50.01 mm (sample)   PASS',
    'Flange Bolt Circle         125.00 mm        124.99 mm (sample)  PASS',
    'Face-to-Face Length        180.00 mm        180.02 mm (sample)  PASS',
    'Sealing Bore Roughness     Ra 0.8 um        Ra 0.6 um (sample)  PASS',
    'Hydrostatic Shell Test     60 bar           60 bar (sample)     PASS',
    '--------------------------------------------------------------------',
    'WATERMARK: SAMPLE INSPECTION REPORT — FICTIONAL COMPANY DEMO ONLY.',
    'Concept design — fictional company. Website by Rajiv Dudeja.',
  ]);
  newRows.push(
    `| castings | \`castings/public/sample-cmm-inspection-report.pdf\` | Build-time generated from \`lib/products.ts\` | Owned / generated for this project | Watermarked SAMPLE CMM inspection report PDF |`
  );

  const creditsPath = path.join(REPO_ROOT, 'docs', 'credits.md');
  const existing = fs.readFileSync(creditsPath, 'utf8');
  const keptLines = existing
    .split(/\r?\n/)
    .filter((line) => !line.startsWith('| castings |') && line.trim().length > 0);
  const updated = `${keptLines.join('\n')}\n${newRows.join('\n')}\n`;
  fs.writeFileSync(creditsPath, updated, 'utf8');
  console.log('Appended', newRows.length, 'castings entries to docs/credits.md.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
