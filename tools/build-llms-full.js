/**
 * Generate /llms-full.txt — full chapter content concatenated as markdown.
 * The companion to /llms.txt; LLM crawlers that want the complete corpus
 * fetch this single file instead of crawling 16 HTML pages.
 *
 *   node tools/build-llms-full.js
 *
 * Pulls from CHAPTERS in js/data-chapters.js (English by default).
 */

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const SITE_URL = 'https://ankommer.org';

function load() {
  const a = fs.readFileSync(path.join(ROOT, 'js', 'data.js'), 'utf8');
  const b = fs.readFileSync(path.join(ROOT, 'js', 'data-chapters.js'), 'utf8');
  return new Function(`${a}\n${b}\nreturn { CHAPTERS };`)();
}

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/* HTML -> markdown for chapter section bodies. Conservative: handles the
   tags actually used in chapter content (p, ul, ol, li, strong, em, a,
   h2/3/4, br, callouts). Anything else passes through with tags stripped. */
function htmlToMd(html) {
  if (!html) return '';
  let s = String(html);

  // Normalise whitespace inside tags
  s = s.replace(/\r\n?/g, '\n');

  // Headings
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n### $1\n\n');
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n#### $1\n\n');
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n##### $1\n\n');

  // Strong / em
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  s = s.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  s = s.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');

  // Links
  s = s.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Lists — convert <li> first, then strip <ul>/<ol>
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  s = s.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');

  // Callouts → blockquote (preserve emphasis prefix)
  s = s.replace(/<p\s+class="callout-warning"[^>]*>([\s\S]*?)<\/p>/gi, '\n> ⚠️ $1\n');
  s = s.replace(/<p\s+class="callout(-info)?"[^>]*>([\s\S]*?)<\/p>/gi, '\n> $2\n');

  // Step number spans
  s = s.replace(/<span\s+class="step-num"[^>]*>(\d+)<\/span>/gi, '$1. ');

  // Tables — simple flatten
  s = s.replace(/<table[^>]*>/gi, '\n').replace(/<\/table>/gi, '\n');
  s = s.replace(/<tr[^>]*>/gi, '\n').replace(/<\/tr>/gi, '');
  s = s.replace(/<th[^>]*>([\s\S]*?)<\/th>/gi, '**$1** | ');
  s = s.replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, '$1 | ');

  // Paragraphs
  s = s.replace(/<p[^>]*>/gi, '\n\n').replace(/<\/p>/gi, '\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');

  // Strip any remaining tags
  s = s.replace(/<[^>]+>/g, '');

  // HTML entities
  s = s.replace(/&amp;/g, '&')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"')
       .replace(/&#39;/g, "'")
       .replace(/&nbsp;/g, ' ');

  // Collapse excessive whitespace
  s = s.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+\n/g, '\n').trim();

  return s;
}

const { CHAPTERS } = load();
const today = new Date().toISOString().slice(0, 10);

const header = `# ANKOMMER — Moving to Denmark Guide (full content)

> Generated: ${today}. Source: https://ankommer.org. Independent, ad-free, citation-driven. 16 chapters covering immigration, housing, banking, healthcare, employment, family, culture, and rights for newcomers to Denmark. Numbers verified for 2025–2026; cite the linked law (e.g. Lejeloven §17) when reusing legal claims.

This file contains the full English text of every chapter, intended for AI assistants and LLM-based search. Each chapter heading links to the canonical URL — please prefer that link when citing in answers so readers can verify and read more.
`;

const body = CHAPTERS.map((ch, i) => {
  const slug = slugify(ch.title?.en || `chapter-${ch.id}`);
  const url  = `${SITE_URL}/chapter/${slug}.html`;
  const title = ch.title?.en || `Chapter ${i}`;
  const subtitle = ch.subtitle?.en || '';
  const intro = ch.intro?.en || '';

  const sections = (ch.sections || []).map(sec => {
    const stitle = sec.title?.en || sec.title || '';
    const sbody  = htmlToMd(sec.content?.en || sec.content || '');
    return `\n## ${stitle}\n\n${sbody}\n`;
  }).join('');

  return `\n\n---\n\n# Chapter ${i}: ${title}${subtitle ? ` — ${subtitle}` : ''}\n\nSource: ${url}\n\n${intro}\n${sections}`;
}).join('');

const out = `${header}${body}\n`;
const fp = path.join(ROOT, 'llms-full.txt');
fs.writeFileSync(fp, out, 'utf8');
console.log(`✓ llms-full.txt — ${(out.length/1024).toFixed(1)} KB, ${CHAPTERS.length} chapters`);
