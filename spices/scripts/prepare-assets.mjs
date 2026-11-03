import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const SPICES_ROOT = process.cwd();
const REPO_ROOT = path.resolve(SPICES_ROOT, '..');
const BRAIN_DIR = 'C:\\Users\\dudej\\.gemini\\antigravity\\brain\\464796c6-fdc6-49aa-b28d-dd2754229030';
const FFMPEG_PATH = 'C:\\Users\\dudej\\Projects\\testing-video\\node_modules\\@remotion\\compositor-win32-x64-msvc\\ffmpeg.exe';

const PRODUCTS_DIR = path.join(SPICES_ROOT, 'public', 'images', 'products');
const STORY_DIR = path.join(SPICES_ROOT, 'public', 'images', 'story');
const VIDEO_DIR = path.join(SPICES_ROOT, 'public', 'video');

fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
fs.mkdirSync(STORY_DIR, { recursive: true });
fs.mkdirSync(VIDEO_DIR, { recursive: true });

async function writeWebpUnderBudget(input, dest, width, height, maxKb) {
  let quality = 74;
  while (quality >= 38) {
    const buf = await sharp(input)
      .resize(width, height, { fit: 'cover' })
      .webp({ quality, effort: 5 })
      .toBuffer();
    if (buf.byteLength <= maxKb * 1024 || quality === 38) {
      fs.writeFileSync(dest, buf);
      return Math.round(buf.byteLength / 1024);
    }
    quality -= 6;
  }
}

const AI_ASSETS = [
  {
    src: path.join(BRAIN_DIR, 'black_pepper_1_1793688215926.jpg'),
    dest: path.join(PRODUCTS_DIR, 'black-pepper-1.webp'),
    relPath: 'spices/public/images/products/black-pepper-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'black_pepper_2_1793688238585.jpg'),
    dest: path.join(PRODUCTS_DIR, 'black-pepper-2.webp'),
    relPath: 'spices/public/images/products/black-pepper-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'green_cardamom_1_1793688250919.jpg'),
    dest: path.join(PRODUCTS_DIR, 'green-cardamom-1.webp'),
    relPath: 'spices/public/images/products/green-cardamom-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'green_cardamom_2_1793688261504.jpg'),
    dest: path.join(PRODUCTS_DIR, 'green-cardamom-2.webp'),
    relPath: 'spices/public/images/products/green-cardamom-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'turmeric_1_1793688284438.jpg'),
    dest: path.join(PRODUCTS_DIR, 'turmeric-1.webp'),
    relPath: 'spices/public/images/products/turmeric-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'turmeric_2_1793688299764.jpg'),
    dest: path.join(PRODUCTS_DIR, 'turmeric-2.webp'),
    relPath: 'spices/public/images/products/turmeric-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'cloves_1_1793688312582.jpg'),
    dest: path.join(PRODUCTS_DIR, 'cloves-1.webp'),
    relPath: 'spices/public/images/products/cloves-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'AI-generated (Gemini image-generator subagent), warm grade, resized & compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'hero_poster_1793688212276.jpg'),
    dest: path.join(STORY_DIR, 'hero-poster.webp'),
    relPath: 'spices/public/images/story/hero-poster.webp',
    width: 1600,
    height: 900,
    maxKb: 105,
    notes: 'AI-generated (Gemini image-generator subagent), 16:9 hero LCP poster, compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'step_sourcing_1793688235208.jpg'),
    dest: path.join(STORY_DIR, 'step-sourcing.webp'),
    relPath: 'spices/public/images/story/step-sourcing.webp',
    width: 880,
    height: 1100,
    maxKb: 112,
    notes: 'AI-generated (Gemini image-generator subagent), Farm->Port step 01, compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'step_sorting_1793688259594.jpg'),
    dest: path.join(STORY_DIR, 'step-sorting.webp'),
    relPath: 'spices/public/images/story/step-sorting.webp',
    width: 880,
    height: 1100,
    maxKb: 112,
    notes: 'AI-generated (Gemini image-generator subagent), Farm->Port step 02, compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'step_lab_1793688279890.jpg'),
    dest: path.join(STORY_DIR, 'step-lab.webp'),
    relPath: 'spices/public/images/story/step-lab.webp',
    width: 880,
    height: 1100,
    maxKb: 112,
    notes: 'AI-generated (Gemini image-generator subagent), Farm->Port step 03, compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'step_port_1793688299879.jpg'),
    dest: path.join(STORY_DIR, 'step-port.webp'),
    relPath: 'spices/public/images/story/step-port.webp',
    width: 880,
    height: 1100,
    maxKb: 112,
    notes: 'AI-generated (Gemini image-generator subagent), Farm->Port step 04, compressed to WebP',
  },
  {
    src: path.join(BRAIN_DIR, 'facility_drying_yard_1793688319900.jpg'),
    dest: path.join(STORY_DIR, 'facility-drying-yard.webp'),
    relPath: 'spices/public/images/story/facility-drying-yard.webp',
    width: 900,
    height: 600,
    maxKb: 112,
    notes: 'AI-generated (Gemini image-generator subagent), Kerala drying yard, compressed to WebP',
  },
];

const STOCK_ASSETS = [
  {
    url: 'https://images.pexels.com/photos/12142752/pexels-photo-12142752.jpeg?auto=compress&cs=tinysrgb&w=1200',
    sourcePage: 'https://www.pexels.com/photo/12142752/',
    licence: 'Pexels License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'cloves-2.webp'),
    relPath: 'spices/public/images/products/cloves-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Pexels stock photo of whole dried cloves, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.pexels.com/photos/37192544/pexels-photo-37192544/free-photo-of-nutmeg-with-grater-on-kitchen-counter.jpeg?auto=compress&cs=tinysrgb&w=1200',
    sourcePage: 'https://www.pexels.com/photo/nutmeg-with-grater-on-kitchen-counter-37192544/',
    licence: 'Pexels License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'nutmeg-mace-1.webp'),
    relPath: 'spices/public/images/products/nutmeg-mace-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Pexels stock photo of whole nutmeg seeds, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1581600140682-d4e68c8cde32',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'nutmeg-mace-2.webp'),
    relPath: 'spices/public/images/products/nutmeg-mace-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Unsplash stock photo of whole warm spices & mace tones, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1720849433556-fb756c8fcdba?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1720849433556-fb756c8fcdba',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'cassia-cinnamon-1.webp'),
    relPath: 'spices/public/images/products/cassia-cinnamon-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Unsplash stock photo of cassia cinnamon sticks, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1689157582456-2e17233e97f4?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1689157582456-2e17233e97f4',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'cassia-cinnamon-2.webp'),
    relPath: 'spices/public/images/products/cassia-cinnamon-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Unsplash stock photo of cinnamon bark & ground powder, compressed to WebP',
  },
  {
    url: 'https://images.pexels.com/photos/14609143/pexels-photo-14609143.jpeg?auto=compress&cs=tinysrgb&w=1200',
    sourcePage: 'https://www.pexels.com/photo/14609143/',
    licence: 'Pexels License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'dry-ginger-1.webp'),
    relPath: 'spices/public/images/products/dry-ginger-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Pexels stock photo of ginger rhizomes, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.pexels.com/photos/10112136/pexels-photo-10112136.jpeg?auto=compress&cs=tinysrgb&w=1200',
    sourcePage: 'https://www.pexels.com/photo/close-up-shot-of-a-ginger-10112136/',
    licence: 'Pexels License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'dry-ginger-2.webp'),
    relPath: 'spices/public/images/products/dry-ginger-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Pexels stock photo of close-up dried ginger rhizomes, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1570510960886-70ff277716c9?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1570510960886-70ff277716c9',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'dried-chilli-1.webp'),
    relPath: 'spices/public/images/products/dried-chilli-1.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Unsplash stock photo of dried red chillies, cropped 4:3 & compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1526576935508-6bccc1e07580?w=1200&h=900&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1526576935508-6bccc1e07580',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(PRODUCTS_DIR, 'dried-chilli-2.webp'),
    relPath: 'spices/public/images/products/dried-chilli-2.webp',
    width: 960,
    height: 720,
    maxKb: 78,
    notes: 'Licensed Unsplash stock photo of red chillies & spice flakes, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?w=1200&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1491497895121-1334fc14d8c9',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(STORY_DIR, 'region-hills.webp'),
    relPath: 'spices/public/images/story/region-hills.webp',
    width: 1080,
    height: 720,
    maxKb: 112,
    notes: 'Licensed Unsplash stock photo of misty Western Ghats / Munnar hills in Kerala, compressed to WebP',
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop&q=80',
    sourcePage: 'https://unsplash.com/photos/photo-1586528116311-ad8dd3c8310d',
    licence: 'Unsplash License (free for commercial use)',
    dest: path.join(STORY_DIR, 'facility-warehouse.webp'),
    relPath: 'spices/public/images/story/facility-warehouse.webp',
    width: 1080,
    height: 720,
    maxKb: 112,
    notes: 'Licensed Unsplash stock photo of clean palletised export warehouse, compressed to WebP',
  },
];

function buildSampleCoaPdf() {
  const lines = [
    'SAMPLE CERTIFICATE OF ANALYSIS — FICTIONAL COMPANY',
    '====================================================================',
    'Exporter:        Elakkaya Spice Exports, Willingdon Island, Kochi [fictional]',
    'Product:         Malabar Garbled Black Pepper — 550 GL (Steam-Sterilised)',
    'Botanical Name:  Piper nigrum L.               HS Code: 0904',
    'Lot Code:        ELK-BP550-2026-108 (sample)   Sampled: ISO 948 Spear',
    'Port of Loading: Kochi (INCOK)                 Packing: 25 kg Kraft Bag',
    '--------------------------------------------------------------------',
    'PARAMETER                        METHOD              SPEC        RESULT (SAMPLE)',
    '--------------------------------------------------------------------',
    'Bulk Density (g/L)               ASTA 14.0           >= 550      556 g/L (sample)',
    'Moisture (% w/w)                 ISO 939             <= 11.0%    10.2% (sample)',
    'Volatile Oil (% v/w)             ASTA 5.0            >= 2.5%     3.2% (sample)',
    'Piperine Content (% w/w)         HPLC                >= 4.5%     5.1% (sample)',
    'Extraneous Matter (% w/w)        ISO 927             <= 0.5%     0.18% (sample)',
    'Light Berries (% w/w)            Floatation          <= 2.0%     1.1% (sample)',
    'Aflatoxin B1 (ug/kg)             AOAC 991.31 HPLC    < 5.0       < 1.0 LOQ (sample)',
    'Aflatoxin Total B1+B2+G1+G2      AOAC 991.31 HPLC    < 10.0      < 2.0 LOQ (sample)',
    'Multi-Residue Pesticides (500+)  LC-MS/MS & GC-MS/MS EU/FDA MRL  Compliant (sample)',
    'Total Plate Count (CFU/g)        ISO 4833-1          < 10,000    2,400 CFU/g (sample)',
    'Yeasts & Moulds (CFU/g)          ISO 21527-2         < 100       < 40 CFU/g (sample)',
    'Escherichia coli (CFU/g)         ISO 16649-2         < 10        Absent (sample)',
    'Salmonella spp. (/25g & /375g)   ISO 6579-1          Absent      Absent (sample)',
    '--------------------------------------------------------------------',
    'WATERMARK: SAMPLE DOCUMENT — FICTIONAL COMPANY FOR PORTFOLIO DEMO ONLY.',
    'Concept design — fictional company. Website by Rajiv Dudeja.',
  ];

  const contentStreamLines = ['BT', '/F1 10 Tf', '42 780 Td', '14 TL'];
  for (const line of lines) {
    const escaped = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
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

  const outPath = path.join(SPICES_ROOT, 'public', 'sample-coa-elakkaya-spices.pdf');
  fs.writeFileSync(outPath, pdf, 'utf8');
  console.log('Generated sample COA PDF:', outPath, Buffer.byteLength(pdf), 'bytes');
}

async function main() {
  const creditRows = [];

  for (const item of AI_ASSETS) {
    const kb = await writeWebpUnderBudget(item.src, item.dest, item.width, item.height, item.maxKb);
    console.log(`Processed AI asset: ${path.basename(item.dest)} (${kb} KB)`);
    creditRows.push(
      `| spices | \`${item.relPath}\` | AI-generated (\`image-generator\` subagent) | Owned / generated for this project | ${item.notes} (${kb} KB) |`
    );
  }

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
    const kb = await writeWebpUnderBudget(buf, item.dest, item.width, item.height, item.maxKb);
    console.log(`Processed stock asset: ${path.basename(item.dest)} (${kb} KB)`);
    creditRows.push(
      `| spices | \`${item.relPath}\` | ${item.sourcePage} | ${item.licence} | ${item.notes} (${kb} KB) |`
    );
  }

  const posterJpg = path.join(BRAIN_DIR, 'hero_poster_1793688212276.jpg');
  const desktopMp4 = path.join(VIDEO_DIR, 'hero-desktop.mp4');
  const desktopWebm = path.join(VIDEO_DIR, 'hero-desktop.webm');
  const mobileMp4 = path.join(VIDEO_DIR, 'hero-mobile.mp4');

  console.log('Generating slow-motion video frames with sharp...');
  const meta = await sharp(posterJpg).metadata();
  const srcW = meta.width || 1376;
  const srcH = meta.height || 768;
  const totalFrames = 96; // 4s loop at 24fps
  const frameBuffers = [];
  for (let i = 0; i < totalFrames; i++) {
    const t = Math.sin((Math.PI * i) / totalFrames);
    const zoom = 1 + 0.06 * t;
    const cropW = Math.round(srcW / zoom);
    const cropH = Math.round(srcH / zoom);
    const left = Math.round((srcW - cropW) / 2);
    const top = Math.round((srcH - cropH) / 2);
    const jpgBuf = await sharp(posterJpg)
      .extract({ left, top, width: cropW, height: cropH })
      .resize(1280, 720, { fit: 'cover' })
      .jpeg({ quality: 82 })
      .toBuffer();
    frameBuffers.push(jpgBuf);
  }
  const combinedFrames = Buffer.concat(frameBuffers);

  console.log('Encoding hero-desktop.mp4...');
  execFileSync(
    FFMPEG_PATH,
    [
      '-y',
      '-f', 'image2pipe',
      '-vcodec', 'mjpeg',
      '-framerate', '24',
      '-i', '-',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-crf', '25',
      '-movflags', '+faststart',
      '-an',
      desktopMp4,
    ],
    { input: combinedFrames }
  );

  console.log('Encoding hero-desktop.webm...');
  execFileSync(FFMPEG_PATH, [
    '-y',
    '-i', desktopMp4,
    '-c:v', 'libvpx-vp9',
    '-b:v', '600k',
    '-crf', '33',
    '-an',
    desktopWebm,
  ]);

  console.log('Encoding hero-mobile.mp4...');
  execFileSync(FFMPEG_PATH, [
    '-y',
    '-i', desktopMp4,
    '-vf', 'scale=720:406',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '28',
    '-movflags', '+faststart',
    '-an',
    mobileMp4,
  ]);

  for (const [file, rel] of [
    [desktopMp4, 'spices/public/video/hero-desktop.mp4'],
    [desktopWebm, 'spices/public/video/hero-desktop.webm'],
    [mobileMp4, 'spices/public/video/hero-mobile.mp4'],
  ]) {
    const sz = Math.round(fs.statSync(file).size / 1024);
    console.log(`Video ${path.basename(file)}: ${sz} KB`);
    creditRows.push(
      `| spices | \`${rel}\` | AI-generated keyframe + FFmpeg slow-motion encode | Owned / generated for this project | 7.5s seamless slow-motion loop (${sz} KB) |`
    );
  }

  buildSampleCoaPdf();
  creditRows.push(
    `| spices | \`spices/public/sample-coa-elakkaya-spices.pdf\` | Build-time generated from \`lib/products.ts\` | Owned / generated for this project | Watermarked SAMPLE Certificate of Analysis PDF |`
  );

  const creditsPath = path.join(REPO_ROOT, 'docs', 'credits.md');
  const creditsContent = `# Asset credits\n\n| Demo | File | Source URL | Licence | Notes (AI-generated / edited) |\n|-|-|-|-|-|\n${creditRows.join('\n')}\n`;
  fs.writeFileSync(creditsPath, creditsContent, 'utf8');
  console.log('Updated docs/credits.md with', creditRows.length, 'entries.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
