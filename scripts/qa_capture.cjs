const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const outDir = 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/02b2faf5-1626-4618-8f6e-db6829d15983';

  console.log('1. Navigating to homepage...');
  await page.goto('https://travel4you-app.pages.dev/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('2. Clicking Wellness Spas filter...');
  const wellnessBtn = page.locator('button[data-filter="wellness"]');
  if (await wellnessBtn.count() > 0) {
    await wellnessBtn.click();
    await page.waitForTimeout(3000);
  }

  // Scroll down a bit to see the cards clearly
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);

  const shot1 = path.join(outDir, 'qa_wellness_cards_fixed.png');
  await page.screenshot({ path: shot1, fullPage: false });
  console.log('Screenshot 1 saved:', shot1);

  console.log('3. Navigating to Paris Seine River detail page...');
  await page.goto('https://travel4you-app.pages.dev/experience/paris-seine-river-gourmet-dinner-cruise-eiffel-vip/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Scroll to YouTube review section
  const ytSection = page.locator('iframe[title*="Video Review"]');
  if (await ytSection.count() > 0) {
    await ytSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
  }

  const shot2 = path.join(outDir, 'qa_youtube_embed_fixed.png');
  await page.screenshot({ path: shot2, fullPage: false });
  console.log('Screenshot 2 saved:', shot2);

  await browser.close();
  console.log('QA Screenshots captured successfully!');
}

main().catch(err => {
  console.error('Error during QA capture:', err);
  process.exit(1);
});
