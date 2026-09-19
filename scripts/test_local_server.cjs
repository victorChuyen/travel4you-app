const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const distDir = path.join(__dirname, '..', 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(4322, async () => {
  console.log('Local preview running on http://localhost:4322');
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

    await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const wellnessBtn = page.locator('button[data-filter="wellness"]');
    await wellnessBtn.click();
    await page.waitForTimeout(2000);

    // Scroll down to cards
    await page.evaluate(() => window.scrollBy(0, 650));
    await page.waitForTimeout(2000);

    const shot = 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/02b2faf5-1626-4618-8f6e-db6829d15983/qa_wellness_cards_now_working.png';
    await page.screenshot({ path: shot });
    console.log('Saved local screenshot to:', shot);

    const imgData = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.destination-card-item')).slice(0, 3);
      return cards.map(c => {
        const img = c.querySelector('img');
        return {
          title: c.getAttribute('data-title'),
          complete: img ? img.complete : false,
          currentSrc: img ? img.currentSrc : '',
          width: img ? img.naturalWidth : 0,
          height: img ? img.naturalHeight : 0
        };
      });
    });
    console.log('Filtered Wellness Image status in DOM:', JSON.stringify(imgData, null, 2));

    await browser.close();
  } catch (e) {
    console.error('Test error:', e);
  } finally {
    server.close();
    process.exit(0);
  }
});
