// Render thumbnails of LinkedIn slides for in-conversation viewing.
// Outputs at exactly 1080x1350 (1x DPR) so they fit Anthropic's 2000px max.
const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const htmlPath = 'file:///' + path.resolve('tools/linkedin-slides.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const desktopDir = path.join(os.homedir(), 'Desktop');
  for (let i = 1; i <= 5; i++) {
    const el = await page.$(`#slide-${i}`);
    const outPath = path.join(desktopDir, `ankommer-linkedin-${i}-preview.png`);
    await el.screenshot({ path: outPath });
    console.log('Saved:', outPath);
  }
  await browser.close();
})();
