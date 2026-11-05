import fs from 'fs';

const enHtml = fs.readFileSync('textiles/.next/server/app/en.html', 'utf8');

const sections = [
  'atelier-stage',
  'room-explorer',
  'weave-workbench',
  'retail-readiness',
  'quote',
];

for (const id of sections) {
  const re = new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`);
  const match = enHtml.match(re);
  if (match) {
    const clean = match[0]
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&rsquo;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
    const words = clean.split(' ').filter(Boolean);
    console.log(`Section #${id}: ${words.length} words`);
  }
}
