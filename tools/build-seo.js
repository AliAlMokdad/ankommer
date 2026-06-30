/**
 * ANKOMMER — SEO build script
 *
 * Reads CHAPTERS from js/data.js and writes one indexable static
 * HTML page per chapter, plus a sitemap.xml covering everything.
 *
 *   node tools/build-seo.js
 *
 * Why: the SPA renders chapters via JS only after openChapter(). To
 * search-engine crawlers the homepage HTML contains zero chapter
 * content, so 95% of the site's value is invisible. These static
 * pages give Google/Bing/Yandex an indexable surface that links
 * back into the live SPA for the interactive experience.
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.resolve(__dirname, '..');
const SITE_URL   = 'https://ankommer.org';
const TODAY      = new Date().toISOString().slice(0, 10);

/* ── 1. Load CHAPTERS — concat data.js + data-chapters.js ────── */
function loadChapters() {
  const dataSrc = fs.readFileSync(path.join(ROOT, 'js', 'data.js'), 'utf8');
  const chapSrc = fs.readFileSync(path.join(ROOT, 'js', 'data-chapters.js'), 'utf8');
  // Both files declare globals via `const NAME = ...`. Concat them and wrap
  // in a function that returns the bindings — no pollution of Node globals.
  const wrapped = `${dataSrc}\n${chapSrc}\nreturn { CHAPTERS, TIMELINE_EVENTS };`;
  return new Function(wrapped)();
}

/* ── 2. URL slug from English title ──────────────────────────── */
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/* ── 3. HTML escape for attributes/text ──────────────────────── */
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

/* ── 4. Strip HTML tags + normalise whitespace (for meta desc) ── */
function plain(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(s, max) {
  if (!s) return '';
  if (s.length <= max) return s;
  return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

/* ── 5. Render one chapter's HTML body sections ──────────────── */
function renderSections(ch) {
  if (!Array.isArray(ch.sections)) return '';
  return ch.sections.map(sec => {
    const title = (sec.title?.en) || sec.title || '';
    const body  = (sec.content?.en) || sec.content || '';
    return `
      <section class="ch-section">
        <h2>${sec.icon || ''} ${esc(title)}</h2>
        <div class="ch-section-body">${body}</div>
      </section>`;
  }).join('\n');
}

/* ── 6. JSON-LD blocks (Article + BreadcrumbList + FAQPage) ──── */
function buildJsonLd(ch, slug, idx, allChapters) {
  const url = `${SITE_URL}/chapter/${slug}.html`;
  const title = ch.title?.en || `Chapter ${idx}`;
  const intro = plain(ch.intro?.en || '');

  // Article: each chapter is a long-form guide article
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": clip(intro, 200),
    "image": `${SITE_URL}/og-image.png`,
    "datePublished": "2026-05-04",
    "dateModified": ch.lastUpdated ? `${ch.lastUpdated}-01` : TODAY,
    "author": { "@type": "Organization", "name": "ANKOMMER" },
    "publisher": {
      "@type": "Organization",
      "name": "ANKOMMER",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/icons/icon-512.png` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ANKOMMER — Moving to Denmark Guide",
      "url": SITE_URL
    }
  };

  // Breadcrumb: Home → Chapters → This chapter
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Chapters", "item": `${SITE_URL}/#chapters` },
      { "@type": "ListItem", "position": 3, "name": title, "item": url }
    ]
  };

  // FAQ: pull section titles + first sentence as Q&A pairs (Google rich result)
  const faqEntities = (ch.sections || []).slice(0, 5).map(sec => {
    const q = sec.title?.en || sec.title;
    const a = clip(plain(sec.content?.en || ''), 300);
    if (!q || !a) return null;
    return {
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    };
  }).filter(Boolean);
  const faq = faqEntities.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqEntities
  } : null;

  const out = [article, breadcrumb];
  if (faq) out.push(faq);
  return out.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
}

/* ── 7. Cross-link rail (prev / next / all) ──────────────────── */
function buildCrossLinks(idx, slugs, titles) {
  const prev = idx > 0 ? `<a href="/chapter/${slugs[idx-1]}.html" rel="prev">← ${esc(titles[idx-1])}</a>` : '';
  const next = idx < slugs.length-1 ? `<a href="/chapter/${slugs[idx+1]}.html" rel="next">${esc(titles[idx+1])} →</a>` : '';
  return `
    <nav class="ch-nav" aria-label="Chapter navigation">
      ${prev}
      <a href="/" class="ch-nav-home">All chapters</a>
      ${next}
    </nav>`;
}

/* ── 8. Render full chapter HTML page ────────────────────────── */
function renderChapter(ch, idx, slug, slugs, titles) {
  const title = ch.title?.en || `Chapter ${idx}`;
  const subtitle = ch.subtitle?.en || '';
  const intro = ch.intro?.en || '';
  const introPlain = plain(intro);
  const desc = clip(introPlain, 158);
  const url = `${SITE_URL}/chapter/${slug}.html`;
  const sectionsHtml = renderSections(ch);
  const jsonld = buildJsonLd(ch, slug, idx, slugs);
  const crosslinks = buildCrossLinks(idx, slugs, titles);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — Moving to Denmark | ANKOMMER</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="keywords" content="${esc(slug.replace(/-/g, ', '))}, Denmark, moving to Denmark, expat Denmark, Denmark guide">
<link rel="canonical" href="${url}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)} — Moving to Denmark | ANKOMMER">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE_URL}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="ANKOMMER">
<meta property="article:section" content="Moving to Denmark">
${ch.lastUpdated ? `<meta property="article:modified_time" content="${ch.lastUpdated}-01T00:00:00Z">` : ''}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)} | ANKOMMER">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE_URL}/og-image.png">

<!-- Chapter pages are English-only static documents. The localized experience
     lives on the SPA at /?lang=xx, so we emit ONLY self-referential en +
     x-default here. The old per-language #chapter-N fragment URLs were not
     real localized documents and formed an invalid hreflang cluster. -->
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">

<meta name="theme-color" content="${ch.color || '#C60C30'}">
<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/icons/icon-192.png">

${jsonld}

<style>
  :root { --accent: ${ch.color || '#C60C30'}; --bg: #F5F2EC; --text: #1A1A2E; --muted: #5C5C78; --card: #fff; --border: rgba(0,0,0,0.1); }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0F1B2D; --text: #E8E3DC; --muted: #8899AA; --card: #1A2840; --border: rgba(255,255,255,0.1); }
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; line-height: 1.65; color: var(--text); background: var(--bg); }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  .topbar { background: var(--card); border-bottom: 1px solid var(--border); padding: 14px 20px; position: sticky; top: 0; z-index: 10; }
  .topbar-inner { max-width: 760px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
  .brand { font-weight: 800; font-size: 1.2rem; letter-spacing: 0.05em; color: var(--text); }
  .brand-a { color: #C60C30; }
  .topbar-cta { background: var(--accent); color: #fff !important; padding: 8px 16px; border-radius: 999px; font-size: 0.88rem; font-weight: 600; }
  .topbar-cta:hover { text-decoration: none; opacity: 0.9; }
  main { max-width: 760px; margin: 0 auto; padding: 32px 20px 64px; }
  .ch-eyebrow { color: var(--accent); font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; }
  h1 { font-size: 2.4rem; line-height: 1.15; margin: 8px 0 16px; }
  .ch-intro { font-size: 1.08rem; color: var(--muted); margin: 0 0 32px; }
  .ch-section { margin: 40px 0; padding-top: 24px; border-top: 1px solid var(--border); }
  .ch-section h2 { font-size: 1.4rem; margin: 0 0 16px; }
  .ch-section-body p { margin: 0 0 14px; }
  .ch-section-body ul, .ch-section-body ol { margin: 0 0 14px; padding-inline-start: 22px; }
  .ch-section-body li { margin-bottom: 6px; }
  .ch-section-body a { color: var(--accent); }
  .ch-section-body strong { color: var(--text); }
  .ch-section-body .callout-warning, .ch-section-body .callout, .ch-section-body .callout-info { padding: 14px 16px; border-radius: 8px; background: rgba(232,160,32,0.08); border-left: 4px solid var(--accent); margin: 14px 0; }
  .ch-section-body .step-num { display: inline-block; width: 22px; height: 22px; background: var(--accent); color: #fff; border-radius: 50%; text-align: center; font-size: 0.78rem; line-height: 22px; margin-right: 8px; }
  .ch-nav { margin: 48px 0 24px; padding-top: 24px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 0.95rem; }
  .ch-nav a { font-weight: 500; }
  .ch-nav-home { color: var(--muted) !important; }
  .footer { max-width: 760px; margin: 0 auto; padding: 32px 20px; border-top: 1px solid var(--border); color: var(--muted); font-size: 0.85rem; }
  .footer a { color: var(--muted); }
  .interactive-cta { display: block; margin: 32px 0; padding: 16px 20px; background: var(--accent); color: #fff !important; border-radius: 12px; text-align: center; font-weight: 600; }
  .interactive-cta:hover { text-decoration: none; opacity: 0.92; }
</style>
</head>
<body>

<header class="topbar">
  <div class="topbar-inner">
    <a href="/" class="brand"><span class="brand-a">A</span>NKOMMER</a>
    <a href="/#chapter-${idx}" class="topbar-cta">Open interactive guide →</a>
  </div>
</header>

<main>
  <article>
    <div class="ch-eyebrow">Chapter ${idx} · ${esc(subtitle)}</div>
    <h1>${ch.icon || ''} ${esc(title)}</h1>
    <p class="ch-intro">${esc(introPlain)}</p>

    ${sectionsHtml}

    <a class="interactive-cta" href="/#chapter-${idx}">Read this chapter in the interactive guide — with checklists, tools, and Bjørn AI →</a>

    ${crosslinks}
  </article>
</main>

<footer class="footer">
  <p>ANKOMMER is a free, multilingual guide for newcomers to Denmark. Independent, ad-free.</p>
  <p>Always verify with official Danish authorities. Built by <a href="https://www.linkedin.com/in/ali-al-mokdad/" target="_blank" rel="noopener">Ali Al Mokdad</a>.</p>
  <p>© ${new Date().getFullYear()} ANKOMMER · <a href="/">Home</a> · <a href="/sitemap.xml">Sitemap</a></p>
</footer>

</body>
</html>
`;
}

/* ── 9. Build sitemap covering everything ────────────────────── */
function buildSitemap(chapterUrls) {
  const langs = ['en','fr','ar','es','da','de','uk','pl','ur','fa'];
  const hreflang = (path) => langs.map(l =>
    `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l === 'en' ? '' : `?lang=${l}`}${path}"/>`
  ).join('\n    ') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${path}"/>`;

  const homepageEntry = `
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    ${hreflang('')}
  </url>`;

  const hubEntry = `
  <url>
    <loc>${SITE_URL}/chapter/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/chapter/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/chapter/"/>
  </url>`;

  const chapterEntries = chapterUrls.map(({ url, slug }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homepageEntry}${hubEntry}
${chapterEntries}
</urlset>
`;
}

/* ── 10. Run ────────────────────────────────────────────────── */
function main() {
  const { CHAPTERS } = loadChapters();
  if (!Array.isArray(CHAPTERS)) {
    console.error('Failed to load CHAPTERS from data.js');
    process.exit(1);
  }

  const outDir = path.join(ROOT, 'chapter');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Two-pass: compute slugs first so prev/next links can use them
  const slugs  = CHAPTERS.map(ch => slugify(ch.title?.en || `chapter-${ch.id}`));
  const titles = CHAPTERS.map(ch => ch.title?.en || `Chapter ${ch.id}`);

  // De-duplicate slug collisions
  const seen = new Set();
  slugs.forEach((s, i) => {
    let final = s;
    let n = 2;
    while (seen.has(final)) { final = `${s}-${n++}`; }
    slugs[i] = final;
    seen.add(final);
  });

  const chapterUrls = [];
  CHAPTERS.forEach((ch, i) => {
    const slug = slugs[i];
    const html = renderChapter(ch, i, slug, slugs, titles);
    const fp = path.join(outDir, `${slug}.html`);
    fs.writeFileSync(fp, html, 'utf8');
    chapterUrls.push({ url: `${SITE_URL}/chapter/${slug}.html`, slug });
    console.log(`✓ chapter/${slug}.html (${(html.length/1024).toFixed(1)} KB)`);
  });

  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(chapterUrls), 'utf8');
  console.log(`✓ sitemap.xml (${chapterUrls.length + 1} URLs)`);

  // Friendly index of all chapters at /chapter/index.html — also helps crawlers
  const indexHtml = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<title>All Chapters — Moving to Denmark Guide | ANKOMMER</title>
<meta name="description" content="Browse all 16 chapters of the ANKOMMER moving-to-Denmark guide: CPR, MitID, housing, banking, healthcare, work permits, family reunification, and more.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_URL}/chapter/">
<style>body{font-family:system-ui;max-width:760px;margin:40px auto;padding:0 20px;line-height:1.6}h1{font-size:2rem}a{color:#C60C30;text-decoration:none}a:hover{text-decoration:underline}li{margin:10px 0}small{color:#666}</style>
</head><body>
<p><a href="/">← Home</a></p>
<h1>All chapters</h1>
<p>Every chapter of the Moving-to-Denmark guide, indexable and shareable.</p>
<ol>
${CHAPTERS.map((ch, i) => `  <li><a href="/chapter/${slugs[i]}.html">${esc(ch.title?.en || `Chapter ${i}`)}</a> <small>— ${esc(plain(ch.intro?.en || '').slice(0, 100))}…</small></li>`).join('\n')}
</ol>
<p><a href="/">Open the interactive guide →</a></p>
</body></html>`;
  fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml, 'utf8');
  console.log('✓ chapter/index.html');

  console.log(`\nDone. ${CHAPTERS.length} chapter pages + sitemap + index.`);
}

main();
