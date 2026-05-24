// Render the live tweet at iPhone 14 size to show Ali how it looks on phone.
const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('https://x.com/AlMokdadAli1/status/2058099318561603605', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);
  const outPath = path.join(os.homedir(), 'Desktop', 'ankommer-tweet-mobile.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('Saved:', outPath);
  await browser.close();
})();
