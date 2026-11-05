import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require(path.resolve('textiles/node_modules/sharp'));

const FFMPEG = 'C:\\Users\\dudej\\Projects\\testing-video\\node_modules\\@remotion\\compositor-win32-x64-msvc\\ffmpeg.exe';
const BRAIN = 'C:\\Users\\dudej\\.gemini\\antigravity\\brain\\464796c6-fdc6-49aa-b28d-dd2754229030';

const shotPaths = [
  path.join(BRAIN, 'cardamom_shot_1_whole_1793843989696.jpg'),
  path.join(BRAIN, 'cardamom_shot_2_splitting_1793844008599.jpg'),
  path.join(BRAIN, 'cardamom_shot_3_parting_1793844029741.jpg'),
  path.join(BRAIN, 'cardamom_shot_4_floating_cloud_1793844053245.jpg'),
];

const framesDir = path.resolve('scratch/cardamom-frames');
if (fs.existsSync(framesDir)) {
  fs.rmSync(framesDir, { recursive: true, force: true });
}
fs.mkdirSync(framesDir, { recursive: true });

console.log('Loading and resizing 4 keyframes to 1280x720 raw RGB buffers...');
const rawBuffers = [];
for (const p of shotPaths) {
  const buf = await sharp(p)
    .resize(1280, 720, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer();
  rawBuffers.push(buf);
}

// 150 frames total = 5.0s at 30fps
// Keyframe timings (frame indices):
// 0 - 25: Hold Shot 1 (whole pod)
// 25 - 60: Transition Shot 1 -> Shot 2 (splitting)
// 60 - 75: Hold Shot 2
// 75 - 105: Transition Shot 2 -> Shot 3 (parting)
// 105 - 115: Hold Shot 3
// 115 - 145: Transition Shot 3 -> Shot 4 (seeds floating)
// 145 - 150: Hold Shot 4 (cloud of seeds floating)
const TOTAL_FRAMES = 150;
const pixelCount = 1280 * 720 * 3;

function getInterpolatedBuffer(frameIdx) {
  let fromIdx = 0;
  let toIdx = 0;
  let t = 0;

  if (frameIdx <= 25) {
    fromIdx = 0;
    toIdx = 0;
    t = 0;
  } else if (frameIdx < 60) {
    fromIdx = 0;
    toIdx = 1;
    t = (frameIdx - 25) / 35;
  } else if (frameIdx <= 75) {
    fromIdx = 1;
    toIdx = 1;
    t = 0;
  } else if (frameIdx < 105) {
    fromIdx = 1;
    toIdx = 2;
    t = (frameIdx - 75) / 30;
  } else if (frameIdx <= 115) {
    fromIdx = 2;
    toIdx = 2;
    t = 0;
  } else if (frameIdx < 145) {
    fromIdx = 2;
    toIdx = 3;
    t = (frameIdx - 115) / 30;
  } else {
    fromIdx = 3;
    toIdx = 3;
    t = 0;
  }

  // Smooth cosine easing for organic growth
  const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);

  if (fromIdx === toIdx || ease === 0) {
    return rawBuffers[fromIdx];
  }

  const bufA = rawBuffers[fromIdx];
  const bufB = rawBuffers[toIdx];
  const out = Buffer.allocUnsafe(pixelCount);

  for (let i = 0; i < pixelCount; i++) {
    out[i] = Math.round(bufA[i] * (1 - ease) + bufB[i] * ease);
  }
  return out;
}

console.log(`Generating ${TOTAL_FRAMES} PNG frames in ${framesDir}...`);
for (let f = 0; f < TOTAL_FRAMES; f++) {
  const buf = getInterpolatedBuffer(f);
  const fname = path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`);
  await sharp(buf, {
    raw: {
      width: 1280,
      height: 720,
      channels: 3,
    },
  })
    .png({ compressionLevel: 1 })
    .toFile(fname);
}
console.log('Frames generated!');

const outVideoDir = path.resolve('spices/public/video');
fs.mkdirSync(outVideoDir, { recursive: true });

const mp4Target = path.join(outVideoDir, 'cardamom-split-720p.mp4');
const webmTarget = path.join(outVideoDir, 'cardamom-split-720p.webm');

console.log('Encoding MP4 with ffmpeg -g 8...');
const mp4Cmd = `"${FFMPEG}" -y -r 30 -i "${framesDir}\\frame_%04d.png" -c:v libx264 -crf 20 -preset slow -g 8 -keyint_min 8 -sc_threshold 0 -pix_fmt yuv420p -an "${mp4Target}"`;
execSync(mp4Cmd, { stdio: 'inherit' });

console.log('Encoding WebM with ffmpeg -g 8...');
const webmCmd = `"${FFMPEG}" -y -i "${mp4Target}" -c:v libvpx-vp9 -b:v 1.2M -crf 26 -g 8 -keyint_min 8 -r 30 -an "${webmTarget}"`;
execSync(webmCmd, { stdio: 'inherit' });

console.log('Writing high-res hero-poster.webp...');
const posterTarget = path.resolve('spices/public/images/story/hero-poster.webp');
await sharp(shotPaths[0])
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile(posterTarget);

console.log('Cleaning up frames...');
fs.rmSync(framesDir, { recursive: true, force: true });
console.log('Done! cardamom-split-720p.mp4, webm, and poster are ready.');
