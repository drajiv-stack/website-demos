import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { execSync } from 'node:child_process';

const FFMPEG = 'C:\\Users\\dudej\\Projects\\testing-video\\node_modules\\@remotion\\compositor-win32-x64-msvc\\ffmpeg.exe';
const videoDir = path.resolve('textiles/public/video');
fs.mkdirSync(videoDir, { recursive: true });

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

// 1. Hero Bedroom / Sunlit Linen Breeze Video
const heroRaw = path.join(videoDir, 'hero-bedroom-raw.mp4');
if (!fs.existsSync(heroRaw)) {
  const buf = await downloadBuffer('https://assets.mixkit.co/videos/42897/42897-720.mp4');
  fs.writeFileSync(heroRaw, buf);
}
const deskMp4 = path.join(videoDir, 'hero-bedroom-desktop.mp4');
const deskWebm = path.join(videoDir, 'hero-bedroom-desktop.webm');
const mobMp4 = path.join(videoDir, 'hero-bedroom-mobile.mp4');

execSync(
  `"${FFMPEG}" -y -i "${heroRaw}" -t 7.5 -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libx264 -crf 26 -preset fast -movflags +faststart "${deskMp4}"`,
  { stdio: 'inherit' }
);
execSync(
  `"${FFMPEG}" -y -i "${heroRaw}" -t 7.5 -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libvpx-vp9 -crf 35 -b:v 0 "${deskWebm}"`,
  { stdio: 'inherit' }
);
execSync(
  `"${FFMPEG}" -y -i "${heroRaw}" -t 7 -an -vf "scale=720:480:force_original_aspect_ratio=increase,crop=720:480" -c:v libx264 -crf 28 -preset fast -movflags +faststart "${mobMp4}"`,
  { stdio: 'inherit' }
);
fs.unlinkSync(heroRaw);

// 2. Karur Loom / Textile Thread Weaving Video
const loomRaw = path.join(videoDir, 'loom-raw.mp4');
let loomBuf;
try {
  loomBuf = await downloadBuffer('https://assets.mixkit.co/videos/41653/41653-720.mp4');
} catch {
  loomBuf = await downloadBuffer('https://assets.mixkit.co/videos/42897/42897-720.mp4');
}
fs.writeFileSync(loomRaw, loomBuf);
const loomMp4 = path.join(videoDir, 'loom-weaving.mp4');
execSync(
  `"${FFMPEG}" -y -i "${loomRaw}" -t 7 -an -vf "scale=960:540:force_original_aspect_ratio=increase,crop=960:540" -c:v libx264 -crf 26 -preset fast -movflags +faststart "${loomMp4}"`,
  { stdio: 'inherit' }
);
fs.unlinkSync(loomRaw);

console.log('Videos ready:', {
  deskMp4: fs.statSync(deskMp4).size,
  deskWebm: fs.statSync(deskWebm).size,
  mobMp4: fs.statSync(mobMp4).size,
  loomMp4: fs.statSync(loomMp4).size,
});
