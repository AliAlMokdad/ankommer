// Render Design 1 v3.
const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1500 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, 'linkedin-1-hero-v3.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const outPath = path.join(os.homedir(), 'Desktop', 'ankommer-linkedin-1-hero-v3.png');
  await page.screenshot({ path: outPath, fullPage: false, clip: { x: 0, y: 0, width: 1200, height: 1500 } });
  console.log('Full-size saved:', outPath);
  await page.close();

  const tpage = await context.newPage();
  await tpage.setViewportSize({ width: 480, height: 600 });
  await tpage.goto(fileUrl, { waitUntil: 'networkidle' });
  await tpage.waitForTimeout(2000);
  await tpage.addStyleTag({ content: 'body { transform: scale(0.4); transform-origin: 0 0; }' });
  await tpage.waitForTimeout(500);
  const thumbPath = path.join(os.homedir(), 'Desktop', 'qc-linkedin-1-hero-v3.png');
  await tpage.screenshot({ path: thumbPath, clip: { x: 0, y: 0, width: 480, height: 600 } });
  console.log('QC thumb saved:', thumbPath);

  await browser.close();
})();
