// One-shot screenshot generator for Twitter announce image.
// Captures the ankommer hero in dark mode at iPhone 14 dimensions (390x844)
// at 2x DPR for retina-crisp output (780x1688 final).
//
// Run: node tools/twitter-shot.js
// Output: ankommer-twitter.png on the user's Desktop.

const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  await page.addInitScript(() => {
    try { localStorage.setItem('ankommer-theme', 'dark'); } catch (e) {}
  });

  await page.goto('http://localhost:3456/?lang=en', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // let fonts + stats load

  const outPath = path.join(os.homedir(), 'Desktop', 'ankommer-twitter.png');
  await page.screenshot({ path: outPath, fullPage: false });

  console.log('Saved to:', outPath);
  await browser.close();
})();
