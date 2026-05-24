// Generate a medium-sized (800px wide) preview of v3 for clearer viewing in chat.
const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 800, height: 1000 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, 'linkedin-1-hero-v3.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.addStyleTag({ content: 'body { transform: scale(0.667); transform-origin: 0 0; }' });
  await page.waitForTimeout(500);
  const out = path.join(os.homedir(), 'Desktop', 'preview-linkedin-v3.png');
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 800, height: 1000 } });
  console.log('Saved:', out);
  await browser.close();
})();
