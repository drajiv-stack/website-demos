import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';

const targetUrl = 'https://textiles-coral.vercel.app/en';
const outDir = path.resolve('docs/gallery/textiles');
fs.mkdirSync(outDir, { recursive: true });

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Desktop 1280x769 Hero
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1280, height: 769, deviceScaleFactor: 1 });
  await desktopPage.goto(targetUrl, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  const heroPath = path.join(outDir, '01-desktop-hero.png');
  await desktopPage.screenshot({
    path: heroPath,
    clip: { x: 0, y: 0, width: 1280, height: 769 },
  });
  console.log('Saved 01-desktop-hero.png');

  // 2. Desktop 1280x769 Signature Section Mid-Animation (#weave-workbench with Loupe & Fanning cards)
  const rect = await desktopPage.evaluate(() => {
    const el = document.querySelector('#weave-workbench');
    if (!el) return null;
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
    const r = el.getBoundingClientRect();
    return { x: 0, y: window.scrollY + r.top, width: 1280, height: 769 };
  });
  await new Promise((r) => setTimeout(r, 1500));

  const signaturePath = path.join(outDir, '02-desktop-signature-workbench.png');
  await desktopPage.screenshot({
    path: signaturePath,
    clip: rect || { x: 0, y: 1400, width: 1280, height: 769 },
  });
  console.log('Saved 02-desktop-signature-workbench.png');
  await desktopPage.close();

  // 3. Mobile 390x844 Hero with Sticky CTA
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await mobilePage.goto(targetUrl, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileHeroPath = path.join(outDir, '03-mobile-hero-sticky-cta.png');
  await mobilePage.screenshot({
    path: mobileHeroPath,
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log('Saved 03-mobile-hero-sticky-cta.png');
  await mobilePage.close();

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
