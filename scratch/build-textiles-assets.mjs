import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require(path.resolve('textiles/node_modules/sharp'));

const baseDir = path.resolve('textiles/public');
const dirs = [
  'images/hero',
  'images/markets',
  'images/weaves',
  'images/studio',
  'images/products',
  'images/atelier',
  'video',
];
for (const d of dirs) {
  fs.mkdirSync(path.join(baseDir, d), { recursive: true });
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const get = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https
        .get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return get(res.headers.location, redirects + 1);
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
          }
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        })
        .on('error', reject);
    };
    get(url);
  });
}

const IMAGE_JOBS = [
  // Hero & Room Panorama
  {
    out: 'images/hero/hero-bedroom-poster.webp',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
    w: 1120,
    h: 720,
    q: 62,
  },
  {
    out: 'images/hero/room-panorama.webp',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=85',
    w: 1400,
    h: 820,
    q: 74,
  },
  // Country Showroom Thumbnails (DE Hamburg, NL Rotterdam/Amsterdam, AU Melbourne)
  {
    out: 'images/markets/market-de-hamburg.webp',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    w: 640,
    h: 420,
    q: 72,
  },
  {
    out: 'images/markets/market-nl-rotterdam.webp',
    url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4579?auto=format&fit=crop&w=900&q=80',
    w: 640,
    h: 420,
    q: 72,
  },
  {
    out: 'images/markets/market-au-melbourne.webp',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80',
    w: 640,
    h: 420,
    q: 72,
  },
  // Macro Weave Textures (Percale, Linen, Waffle, Boucle)
  {
    out: 'images/weaves/macro-percale.webp',
    url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85',
    w: 800,
    h: 800,
    q: 72,
  },
  {
    out: 'images/weaves/macro-linen.webp',
    url: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1000&q=85',
    w: 800,
    h: 800,
    q: 72,
  },
  {
    out: 'images/weaves/macro-waffle.webp',
    url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85',
    w: 800,
    h: 800,
    q: 72,
  },
  {
    out: 'images/weaves/macro-boucle.webp',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    w: 800,
    h: 800,
    q: 72,
  },
  // 6 Seasonal Colourway Studio Photos (Tinted cleanly from high-res linen bedding master)
  {
    out: 'images/studio/colourway-indigo.webp',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85',
    w: 960,
    h: 720,
    q: 74,
    tint: { r: 46, g: 58, b: 140 },
  },
  {
    out: 'images/studio/colourway-flax.webp',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
    w: 960,
    h: 720,
    q: 74,
  },
  {
    out: 'images/studio/colourway-terracotta.webp',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    w: 960,
    h: 720,
    q: 74,
    tint: { r: 175, g: 102, b: 78 },
  },
  {
    out: 'images/studio/colourway-sage.webp',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85',
    w: 960,
    h: 720,
    q: 74,
    tint: { r: 118, g: 138, b: 114 },
  },
  {
    out: 'images/studio/colourway-ochre.webp',
    url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4579?auto=format&fit=crop&w=1200&q=85',
    w: 960,
    h: 720,
    q: 74,
    tint: { r: 194, g: 158, b: 96 },
  },
  {
    out: 'images/studio/colourway-slate.webp',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
    w: 960,
    h: 720,
    q: 74,
  },
  // 10 Seeded Products
  {
    out: 'images/products/washed-percale-duvet-set.webp',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/flax-linen-sheet-set.webp',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/sateen-hotel-duvet-cover.webp',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/aegean-combed-bath-towel.webp',
    url: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/waffle-weave-spa-robe.webp',
    url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/yarn-dyed-kitchen-towel.webp',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/washed-linen-table-runner.webp',
    url: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/boucle-textured-cushion-cover.webp',
    url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
    tint: { r: 210, g: 192, b: 165 },
  },
  {
    out: 'images/products/herringbone-fringed-throw.webp',
    url: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  {
    out: 'images/products/quilted-matelasse-bedspread.webp',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1100&q=80',
    w: 900,
    h: 680,
    q: 74,
  },
  // Atelier & Packaging / Loom Hall
  {
    out: 'images/atelier/woven-label-care.webp',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1100&q=80',
    w: 960,
    h: 640,
    q: 74,
  },
  {
    out: 'images/atelier/retail-belly-band.webp',
    url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1100&q=80',
    w: 960,
    h: 640,
    q: 74,
  },
  {
    out: 'images/atelier/karur-loom-hall.webp',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80',
    w: 960,
    h: 640,
    q: 74,
  },
];

for (const job of IMAGE_JOBS) {
  const dest = path.join(baseDir, job.out);
  let buf;
  try {
    buf = await downloadBuffer(job.url);
  } catch {
    buf = await downloadBuffer(
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
    );
  }
  let pipeline = sharp(buf).resize(job.w, job.h, { fit: 'cover' });
  if (job.tint) {
    pipeline = pipeline.modulate({ saturation: 0.45 }).tint(job.tint);
  }
  await pipeline.webp({ quality: job.q, effort: 5 }).toFile(dest);
  console.log('Saved', job.out, fs.statSync(dest).size, 'bytes');
}

// Download & encode sunlit curtain/bedroom video + textile loom video from Mixkit
const VIDEO_JOBS = [
  {
    rawUrl: 'https://assets.mixkit.co/videos/42897/42897-720.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/4078/4078-720.mp4',
    name: 'hero-bedroom',
  },
  {
    rawUrl: 'https://assets.mixkit.co/videos/41653/41653-720.mp4',
    fallbackUrl: 'https://assets.mixkit.co/videos/43308/43308-720.mp4',
    name: 'loom-weaving',
  },
];

for (const v of VIDEO_JOBS) {
  const rawPath = path.join(baseDir, 'video', `${v.name}-raw.mp4`);
  let buf;
  try {
    buf = await downloadBuffer(v.rawUrl);
  } catch {
    buf = await downloadBuffer(v.fallbackUrl);
  }
  fs.writeFileSync(rawPath, buf);

  if (v.name === 'hero-bedroom') {
    const deskMp4 = path.join(baseDir, 'video', 'hero-bedroom-desktop.mp4');
    const deskWebm = path.join(baseDir, 'video', 'hero-bedroom-desktop.webm');
    const mobMp4 = path.join(baseDir, 'video', 'hero-bedroom-mobile.mp4');

    execSync(
      `ffmpeg -y -i "${rawPath}" -t 8 -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libx264 -crf 27 -preset fast -movflags +faststart "${deskMp4}"`,
      { stdio: 'ignore' }
    );
    execSync(
      `ffmpeg -y -i "${rawPath}" -t 8 -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libvpx-vp9 -crf 35 -b:v 0 "${deskWebm}"`,
      { stdio: 'ignore' }
    );
    execSync(
      `ffmpeg -y -i "${rawPath}" -t 7 -an -vf "scale=720:480:force_original_aspect_ratio=increase,crop=720:480" -c:v libx264 -crf 29 -preset fast -movflags +faststart "${mobMp4}"`,
      { stdio: 'ignore' }
    );
    console.log(
      'Encoded hero-bedroom videos:',
      fs.statSync(deskMp4).size,
      fs.statSync(deskWebm).size,
      fs.statSync(mobMp4).size
    );
  } else {
    const loomMp4 = path.join(baseDir, 'video', 'loom-weaving.mp4');
    execSync(
      `ffmpeg -y -i "${rawPath}" -t 8 -an -vf "scale=960:540:force_original_aspect_ratio=increase,crop=960:540" -c:v libx264 -crf 27 -preset fast -movflags +faststart "${loomMp4}"`,
      { stdio: 'ignore' }
    );
    console.log('Encoded loom-weaving.mp4:', fs.statSync(loomMp4).size);
  }
  fs.unlinkSync(rawPath);
}
