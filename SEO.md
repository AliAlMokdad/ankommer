# ANKOMMER — SEO playbook

Reference for keeping the site discoverable on Google, Bing, Yandex, DuckDuckGo, and AI search (Perplexity / ChatGPT / Claude).

## What's done

### On-page
- Title rewritten with year + intent: *"Moving to Denmark in 2026 — The Complete Guide"*
- Description widened to cover all 16 chapter topics + AI guide
- Keywords expanded (Pay Limit Scheme, Lejeloven, family reunification…)
- Open Graph + Twitter cards for rich previews on social
- 10-language `hreflang` already in place; `x-default` set
- Canonical URL on every page

### Structured data (JSON-LD)
On the homepage, a single `@graph` payload contains:
- `WebSite` with SearchAction
- `Organization` with founder + logo
- `BreadcrumbList`
- `FAQPage` with 5 high-intent Q&As (CPR 5-day rule, 8-year PR, Lejeloven §17 deposit cap, NemID dead, Pay Limit threshold)

Each chapter page (16 of them) carries its own:
- `Article` (headline, dateModified from `lastUpdated`, publisher)
- `BreadcrumbList`
- `FAQPage` from the first 5 sections

### Indexable static chapter pages
The SPA used `#chapter-N` hash routing — **completely invisible to crawlers**. We now generate one static HTML page per chapter at `/chapter/{slug}.html`:

```
/chapter/before-you-land.html
/chapter/first-72-hours.html
/chapter/papers-and-legal-identity.html
/chapter/housing.html
... (16 total)
/chapter/index.html              ← landing page listing all chapters
```

Each carries the full chapter text in indexable `<article>` HTML, plus a prominent **"Open interactive guide →"** CTA that takes the user back into the SPA.

### Sitemap + robots
- `sitemap.xml` lists 17 URLs (homepage + 16 chapters), with `xhtml:link hreflang` per language for the homepage
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, DuckDuckBot, YandexBot, Applebot, and points to the sitemap

### Performance / crawl signals
- `_headers` already sets long-cache for assets, no-cache for HTML
- All 10 languages declared in `<html lang>` per page (chapter pages are EN; SPA flips on lang switch)
- PWA installable (manifest split icons any+maskable, screenshots `form_factor:wide`)

## Rebuilding chapter pages

When `js/data.js` changes:

```bash
node tools/build-seo.js
```

This regenerates all `/chapter/*.html` and `sitemap.xml`. Commit the result.

## How to submit to search engines

### Google Search Console — required
1. Go to https://search.google.com/search-console
2. Add property: **URL prefix** → `https://ankommer.org/`
3. Verify with the DNS TXT record method (most reliable for GitHub Pages):
   - Add a TXT record `google-site-verification=...` to your domain DNS
4. Once verified, **Sitemaps → Add new sitemap** → `sitemap.xml` → Submit
5. **URL Inspection** → paste `https://ankommer.org/` → Request indexing
6. Repeat for `/chapter/index.html` to seed crawl of all chapters

Optional but recommended:
- **Settings → Crawl rate** → leave default (Googlebot autoadjusts)
- **International targeting** is satisfied by hreflang tags — nothing to set
- Track these reports weekly for the first month: *Coverage*, *Sitemaps*, *Performance*, *Mobile usability*, *Core Web Vitals*

### Bing Webmaster Tools
1. https://www.bing.com/webmasters
2. **Add a site** → `https://ankommer.org/`
3. Verify via DNS TXT record OR the meta-tag method
4. **Sitemaps → Submit a sitemap** → `https://ankommer.org/sitemap.xml`
5. Bing also feeds DuckDuckGo + Yahoo, so this single submission covers three engines
6. Use **URL Inspection** to request indexing of the homepage

### Yandex Webmaster
1. https://webmaster.yandex.com
2. Add site, verify via DNS TXT
3. Indexing → Sitemap files → add `https://ankommer.org/sitemap.xml`
4. Useful especially for the Ukrainian and Russian-speaking newcomers in DK

### DuckDuckGo
No submission needed — DDG indexes via Bing. Submit to Bing and you're covered.

### IndexNow (Bing + Yandex protocol)
Optional but cheap. After deploying changes, ping:
```
curl "https://api.indexnow.org/indexnow?url=https://ankommer.org/&key=YOUR_KEY"
```
You'll need to host a `YOUR_KEY.txt` file at the site root with the key value.

## Off-page SEO — earning links

The biggest lever now is backlinks from sites newcomers actually use. Suggestions:

- Reddit: post in /r/copenhagen, /r/Denmark, /r/IWantOut once with genuine value (don't spam)
- Quora: answer questions about CPR, MitID, Lejeloven, work permits — link the relevant chapter
- Internations forum: post the resource in Denmark community
- Ankommer.org has a clean methodology — pitch a guest post / interview to:
  - InterNations Denmark country page
  - The Local Denmark
  - Lonely Planet thorntree forum
  - Expat.com Denmark
- LinkedIn: founder Ali Al Mokdad already shares — keep posting one chapter excerpt per week

## What still moves the needle

In rough priority order:

1. **Content depth / freshness** — search engines reward thoroughness. Keep `lastUpdated` current. The new chapter pages already render that field.
2. **Inbound links** — see "Off-page" above. 5 quality links matter more than 100 trash ones.
3. **Page experience** — Lighthouse Performance is currently ~70. Splitting `js/data.js` (CHAPTERS section is 175 KB / ~60% of payload) into a lazy chunk would raise it materially. Round 2D flagged this.
4. **Mobile UX** — already good; touch targets cleaned up in Round 9.
5. **Schema breadth** — when adding a new tool (e.g. parental-leave calculator), give it `SoftwareApplication` + `HowTo` schema.

## Quick sanity checks

```bash
# Re-run after any data.js update
node tools/build-seo.js

# Validate the sitemap
curl -sS https://ankommer.org/sitemap.xml | head -40

# Validate robots
curl -sS https://ankommer.org/robots.txt

# Test a chapter page
curl -sIL https://ankommer.org/chapter/housing.html | head -10
```

External validators:
- **Rich Results Test** → https://search.google.com/test/rich-results (paste any chapter URL — should see Article + FAQ)
- **Mobile-Friendly Test** → https://search.google.com/test/mobile-friendly
- **PageSpeed Insights** → https://pagespeed.web.dev/?url=https%3A%2F%2Fankommer.org%2F
- **Schema.org validator** → https://validator.schema.org/

## Realistic timeline

- Week 1: Submit to GSC + Bing. Indexing begins. Expect a handful of pages crawled.
- Week 2–4: Most chapter pages indexed. Long-tail queries start trickling in (e.g. "Lejeloven §17 deposit cap newcomer Denmark").
- Month 2–3: First brand searches ("ankommer denmark"). FAQ rich results appear in SERPs.
- Month 3–6: With backlinks landing, ranking improves on competitive head terms ("moving to Denmark guide", "CPR number Denmark").
- Month 6–12: AI-search citations (Perplexity, ChatGPT, Claude) start sending traffic — that's where the GPTBot / ClaudeBot / PerplexityBot allow rules in robots.txt earn their keep.

Don't expect rankings on competitive terms in week 1. Search engines need to crawl, evaluate, and trust the site before they rank it. 30–90 days is the honest expectation for traction.
