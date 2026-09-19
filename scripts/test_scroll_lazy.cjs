const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://travel4you-app.pages.dev/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const wellnessBtn = page.locator('button[data-filter="wellness"]');
  await wellnessBtn.click();
  await page.waitForTimeout(1000);

  // Check before scroll
  const before = await page.evaluate(() => {
    const img = document.querySelector('.destination-card-item img');
    return { complete: img.complete, currentSrc: img.currentSrc, naturalWidth: img.naturalWidth };
  });
  console.log('Before scroll:', before);

  // Dispatch scroll
  await page.evaluate(() => {
    window.scrollBy(0, 100);
  });
  await page.waitForTimeout(2000);

  // Check after scroll
  const after = await page.evaluate(() => {
    const img = document.querySelector('.destination-card-item img');
    return { complete: img.complete, currentSrc: img.currentSrc, naturalWidth: img.naturalWidth };
  });
  console.log('After scroll:', after);

  await browser.close();
}

test().catch(console.error);
