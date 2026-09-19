const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  console.log('Navigating to homepage...');
  await page.goto('https://travel4you-app.pages.dev/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Clicking wellness filter...');
  const wellnessBtn = page.locator('button[data-filter="wellness"]');
  await wellnessBtn.click();
  await page.waitForTimeout(2000);

  // Scroll card into view
  const firstCard = page.locator('.destination-card-item').first();
  await firstCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);

  const shot = 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/02b2faf5-1626-4618-8f6e-db6829d15983/qa_wellness_scrolled_card.png';
  await page.screenshot({ path: shot });
  console.log('Saved screenshot to:', shot);

  await browser.close();
}

test().catch(console.error);
