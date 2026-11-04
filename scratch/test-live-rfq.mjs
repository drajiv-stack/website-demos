import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  console.log('Navigating to live page...');
  await page.goto('https://textiles-coral.vercel.app/en', { waitUntil: 'domcontentloaded' });

  // Scroll to RFQ section
  await page.evaluate(() => {
    document.querySelector('#quote')?.scrollIntoView();
  });

  // Wait 3.5s to pass the anti-spam timer
  console.log('Waiting 3.5s for spam timer...');
  await new Promise((r) => setTimeout(r, 3500));

  await page.type('input[name="name"]', 'QA Test Buyer');
  await page.type('input[name="email"]', 'buyer@hotel-concept.de');
  await page.type('input[name="country"]', 'Germany');
  await page.type('input[name="product_quantity"]', 'Washed Percale Duvet Set, 1200 sets');
  await page.type('textarea[name="message"]', 'Need sample swatches shipped to Hamburg.');

  console.log('Clicking submit...');
  await page.click('button[type="submit"]');

  await new Promise((r) => setTimeout(r, 4000));

  const content = await page.evaluate(() => document.querySelector('#quote')?.innerText);
  console.log('RFQ Section innerText:\n', content);

  await browser.close();
})();
