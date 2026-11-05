import fs from 'fs';

const html = fs.readFileSync('textiles/.next/server/app/en.html', 'utf8');
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) process.exit(1);

const content = mainMatch[1];
const sections = content.split(/<section/i).slice(1);
sections.forEach((sec, i) => {
  const idMatch = sec.match(/id=['"]([^'"]+)['"]/i);
  const id = idMatch ? idMatch[1] : 'sec-' + i;
  const text = sec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean);
  console.log(id, ':', words.length, 'words');
  console.log('Words:', words.join(' '));
  console.log('---');
});
