// Generate small (480px wide) thumbs of each LinkedIn design for quick QC.
// Saves alongside the originals on Desktop with -thumb-NEW suffix.

const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

const designs = [
  'linkedin-1-hero.html',
  'linkedin-2-quote.html',
  'linkedin-3-minimal.html',
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 480, height: 600 },
    deviceScaleFactor: 1,
  });

  for (const file of designs) {
    const page = await context.newPage();
    const fileUrl = 'file:///' + path.resolve(__dirname, file).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    // Force the body to render at scaled-down size so thumb fits
    await page.addStyleTag({ content: 'body { transform: scale(0.4); transform-origin: 0 0; }' });
    await page.waitForTimeout(500);
    const out = path.join(os.homedir(), 'Desktop', 'qc-' + file.replace('.html','.png'));
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 480, height: 600 } });
    console.log('Saved:', out);
    await page.close();
  }
  await browser.close();
})();
