import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const FFMPEG = 'C:\\Users\\dudej\\Projects\\testing-video\\node_modules\\@remotion\\compositor-win32-x64-msvc\\ffmpeg.exe';
const BRAIN = 'C:\\Users\\dudej\\.gemini\\antigravity\\brain\\464796c6-fdc6-49aa-b28d-dd2754229030';

const shot1 = path.join(BRAIN, 'cardamom_shot_1_whole_1793843989696.jpg');
const shot2 = path.join(BRAIN, 'cardamom_shot_2_splitting_1793844008599.jpg');
const shot3 = path.join(BRAIN, 'cardamom_shot_3_parting_1793844029741.jpg');
const shot4 = path.join(BRAIN, 'cardamom_shot_4_floating_cloud_1793844053245.jpg');

const outDir = 'spices/public/video';
fs.mkdirSync(outDir, { recursive: true });

const mp4Out = path.join(outDir, 'cardamom-split-720p.mp4');
const webmOut = path.join(outDir, 'cardamom-split-720p.webm');
const posterOut = 'spices/public/images/story/hero-poster.webp';

console.log('Generating cardamom-split-720p.mp4 with ffmpeg -g 8...');

// Complex filter with smooth crossfades between the 4 shots:
// Total length ~5.5 seconds, 30fps
// Clip 1: 0 - 2.0s
// Clip 2: offset 1.2s, dur 0.8s crossfade
// Clip 3: offset 2.5s, dur 0.8s crossfade
// Clip 4: offset 3.8s, dur 0.8s crossfade -> ends at 5.5s
const filter = `
[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuva420p,setpts=PTS-STARTPTS[v0];
[1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuva420p,setpts=PTS-STARTPTS[v1];
[2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuva420p,setpts=PTS-STARTPTS[v2];
[3:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuva420p,setpts=PTS-STARTPTS[v3];
[v0][v1]xfade=transition=fade:duration=0.7:offset=1.2[x1];
[x1][v2]xfade=transition=fade:duration=0.7:offset=2.5[x2];
[x2][v3]xfade=transition=fade:duration=0.7:offset=3.8[outv]
`.replace(/\n/g, '');

const cmdMp4 = `"${FFMPEG}" -y -loop 1 -t 2.0 -i "${shot1}" -loop 1 -t 2.1 -i "${shot2}" -loop 1 -t 2.1 -i "${shot3}" -loop 1 -t 2.5 -i "${shot4}" -filter_complex "${filter}" -map "[outv]" -c:v libx264 -crf 20 -preset slow -g 8 -keyint_min 8 -sc_threshold 0 -pix_fmt yuv420p -r 30 -an "${mp4Out}"`;

console.log('Running mp4 command...');
execSync(cmdMp4, { stdio: 'inherit' });

console.log('Generating webm encode...');
const cmdWebm = `"${FFMPEG}" -y -i "${mp4Out}" -c:v libvpx-vp9 -b:v 1M -crf 28 -g 8 -r 30 -an "${webmOut}"`;
execSync(cmdWebm, { stdio: 'inherit' });

console.log('Generating high-res WebP poster from Shot 1...');
const cmdPoster = `"${FFMPEG}" -y -i "${shot1}" -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -vcodec libwebp -quality 85 "${posterOut}"`;
execSync(cmdPoster, { stdio: 'inherit' });

console.log('Done! Files generated.');
