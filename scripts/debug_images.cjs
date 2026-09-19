const { chromium } = require('playwright');

async function checkImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('response', res => {
    if (res.url().includes('/media/')) {
      console.log('HTTP RESP:', res.status(), res.url(), res.headers()['content-type']);
    }
  });

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('https://travel4you-app.pages.dev/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const wellnessBtn = page.locator('button[data-filter="wellness"]');
  await wellnessBtn.click();
  await page.waitForTimeout(4000);

  // Check the image elements in the DOM
  const imgUrls = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.destination-card-item'));
    return cards.slice(0, 6).map(c => {
      const img = c.querySelector('img');
      return {
        title: c.getAttribute('data-title'),
        src: img ? img.src : null,
        complete: img ? img.complete : null,
        naturalWidth: img ? img.naturalWidth : null,
        naturalHeight: img ? img.naturalHeight : null
      };
    });
  });

  console.log('DOM Image Evaluation:', JSON.stringify(imgUrls, null, 2));

  await browser.close();
}

checkImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
