const { chromium } = require('playwright');

async function checkCard1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://travel4you-app.pages.dev/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const wellnessBtn = page.locator('button[data-filter="wellness"]');
  await wellnessBtn.click();
  await page.waitForTimeout(2000);

  const card1Info = await page.evaluate(() => {
    const card = document.querySelector('.destination-card-item');
    if (!card) return null;
    const img = card.querySelector('img');
    const container = card.querySelector('.relative.aspect-\\[16\\/10\\]') || card.firstElementChild;
    const style = img ? window.getComputedStyle(img) : null;
    const rect = img ? img.getBoundingClientRect() : null;
    const containerRect = container ? container.getBoundingClientRect() : null;

    return {
      cardHtml: card.outerHTML.substring(0, 800),
      imgSrc: img ? img.src : null,
      imgDisplay: style ? style.display : null,
      imgVisibility: style ? style.visibility : null,
      imgOpacity: style ? style.opacity : null,
      imgObjectFit: style ? style.objectFit : null,
      imgRect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
      containerRect: containerRect ? { x: containerRect.x, y: containerRect.y, width: containerRect.width, height: containerRect.height } : null
    };
  });

  console.log('Card 1 Info:', JSON.stringify(card1Info, null, 2));
  await browser.close();
}

checkCard1().catch(console.error);
