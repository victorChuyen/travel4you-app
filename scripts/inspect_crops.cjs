const { chromium } = require('playwright');
const fs = require('fs');

async function inspectImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://travel4you-app.pages.dev/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const wellnessBtn = page.locator('button[data-filter="wellness"]');
  await wellnessBtn.click();
  await page.waitForTimeout(3000);

  // Take a screenshot of JUST Card 1's image container
  const firstCardImgContainer = page.locator('.destination-card-item .relative.aspect-\\[16\\/10\\]').first();
  await firstCardImgContainer.screenshot({ path: 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/02b2faf5-1626-4618-8f6e-db6829d15983/card1_img_crop.png' });

  // Check Card 1's img element properties
  const imgProps = await firstCardImgContainer.locator('img').evaluate(img => ({
    src: img.src,
    currentSrc: img.currentSrc,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    clientRect: img.getBoundingClientRect()
  }));

  console.log('Card 1 Img Props:', JSON.stringify(imgProps, null, 2));

  // Take a screenshot of JUST Card 2's image container
  const secondCardImgContainer = page.locator('.destination-card-item .relative.aspect-\\[16\\/10\\]').nth(1);
  await secondCardImgContainer.screenshot({ path: 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/02b2faf5-1626-4618-8f6e-db6829d15983/card2_img_crop.png' });

  await browser.close();
}

inspectImages().catch(console.error);
