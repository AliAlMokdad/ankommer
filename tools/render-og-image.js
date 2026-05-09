#!/usr/bin/env node
/**
 * Renders og-image.svg → og-image.png at 1200x630.
 * Run: node tools/render-og-image.js
 */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const svgPath = path.join(__dirname, '../og-image.svg');
const pngPath = path.join(__dirname, '../og-image.png');

const svg = fs.readFileSync(svgPath, 'utf8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  background: '#0F1B2D',
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'Georgia',
    serifFamily: 'Georgia',
    sansSerifFamily: 'Arial',
  },
});
const png = resvg.render().asPng();
fs.writeFileSync(pngPath, png);

const sizeKB = (png.length / 1024).toFixed(1);
console.log(`Wrote ${pngPath} (${sizeKB} KB)`);
