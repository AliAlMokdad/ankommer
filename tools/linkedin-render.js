// Render the LinkedIn design HTMLs to PNGs on the Desktop.
// Each is 1200x1500 (4:5, LinkedIn's highest-engagement aspect ratio),
// captured at 2x DPR for retina-crisp output (final 2400x3000).
//
// Run: node tools/linkedin-render.js
//
// Outputs (on user's Desktop):
//   - ankommer-linkedin-1-hero.png       (dark navy / hero / stats / skyline)
//   - ankommer-linkedin-2-quote.png      (light cream / quote-card / attribution)
//   - ankommer-linkedin-3-minimal.png    (dark / bold typography / language strip)

const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

const designs = [
  { html: 'linkedin-1-hero.html',    out: 'ankommer-linkedin-1-hero.png' },
  { html: 'linkedin-2-quote.html',   out: 'ankommer-linkedin-2-quote.png' },
  { html: 'linkedin-3-minimal.html', out: 'ankommer-linkedin-3-minimal.png' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1500 },
    deviceScaleFactor: 2,
  });

  for (const d of designs) {
    const page = await context.newPage();
    const fileUrl = 'file:///' + path.resolve(__dirname, d.html).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500); // let Google Fonts settle
    const outPath = path.join(os.homedir(), 'Desktop', d.out);
    await page.screenshot({ path: outPath, fullPage: false, clip: { x: 0, y: 0, width: 1200, height: 1500 } });
    console.log('Saved:', outPath);
    await page.close();
  }

  await browser.close();
})();
