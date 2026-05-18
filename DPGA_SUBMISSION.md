# Digital Public Goods Alliance — Nomination: ANKOMMER

This document is the source-of-truth submission for ANKOMMER's nomination to the Digital Public Goods Alliance (DPGA) registry at https://digitalpublicgoods.net.

It is structured to map directly to the 9 DPG Standard indicators. Sections in this document can be copied into the official nomination form at https://app.digitalpublicgoods.net/.

---

## 0. Basic information

- **Name**: ANKOMMER
- **Website**: https://ankommer.org
- **Source code repository**: https://github.com/AliAlMokdad/ankommer
- **Description (one line)**: An AI-native, multilingual, open-source guide that walks newcomers through the full journey of arriving in and settling in Denmark, in ten languages.
- **Description (paragraph)**: ANKOMMER is a privacy-first progressive web application that helps internationals navigate moving to and living in Denmark. It covers the full arrival journey across 16 chapters, ships content in 10 languages (including Arabic, Farsi, Polish, and Urdu), provides interactive tools (salary calculator, residency timeline, visa decision tree, cost-of-living, weather and transit planning), and includes an AI assistant ("Bjørn") that can answer questions in the user's own language and explain Danish letters and forms. It is free, ad-free, and tracker-free. Personal data is stored locally on the user's device.
- **Country of origin**: Denmark
- **Stage**: Production (live at ankommer.org)
- **Type**: Software (web application + progressive web app + Cloudflare worker)
- **Sectors**: Migration and integration; civic technology; multilingual public information
- **Primary contact**: Ali Al Mokdad, project creator

---

## 1. Relevance to Sustainable Development Goals (SDGs)

ANKOMMER advances the following SDGs:

### SDG 4 — Quality Education
ANKOMMER provides accessible, multilingual learning material on Danish institutions, rights, and procedures. It supports lifelong learning for adult migrants and helps newcomers acquire the practical knowledge required to navigate a new country.

**Specific targets supported**: 4.7 (knowledge and skills for global citizenship and appreciation of cultural diversity).

### SDG 10 — Reduced Inequalities
By translating arrival information into 10 languages including Arabic, Farsi, Polish, and Urdu, ANKOMMER reduces the information asymmetry that puts non-English, non-Danish speaking newcomers at a structural disadvantage. The EU has formally flagged that Denmark's immigration service does not translate basic information into common immigrant languages such as Arabic or Turkish; ANKOMMER directly addresses that gap.

**Specific targets supported**: 10.2 (empower and promote social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status); 10.7 (facilitate orderly, safe, regular and responsible migration).

### SDG 16 — Peace, Justice and Strong Institutions
ANKOMMER increases the legibility of Danish public institutions for new arrivals, supporting informed access to legal, administrative, and civic systems.

**Specific targets supported**: 16.10 (ensure public access to information and protect fundamental freedoms).

### SDG 17 — Partnerships for the Goals
ANKOMMER is open source. A team in Norway is already building a localised version on the same code base. The project actively encourages and supports forks for other countries.

**Specific targets supported**: 17.6 (enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation, and enhance knowledge sharing).

---

## 2. Use of approved open licenses

- **Code**: MIT License — an OSI-approved open source license. See `LICENSE` in the repository.
- **Content**: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) — a Creative Commons "free culture" license.

Both licenses appear on the DPGA's list of approved open licenses.

---

## 3. Clear ownership

- **Copyright holder of code and content**: Ali Al Mokdad, project creator.
- **No assigned ownership claims by third parties.** All dependencies used at runtime are themselves open source under permissive licenses.
- **Contact for ownership questions**: via the GitHub repository.

---

## 4. Platform independence

ANKOMMER has no mandatory dependency on any closed-source or proprietary platform component.

- The web app is a **pure static site**: HTML, CSS, vanilla JavaScript, and a service worker. It runs in any modern browser.
- It can be hosted on any static-file host (Netlify, Cloudflare Pages, GitHub Pages, Vercel, a plain web server). The `_headers` and `_redirects` files are platform-neutral configuration that most static hosts honour.
- The AI assistant (Bjørn) uses a Cloudflare Worker as the inference proxy in the production deployment, but this is a thin proxy. It can be replaced with any equivalent server-side proxy or self-hosted endpoint. The Worker code is in the `cloudflare-worker/` directory and is itself open source.
- Live data comes from open public APIs (Open-Meteo, DAWA, Rejseplanen). Each is itself open source or operates as open data.

There is no required vendor lock-in.

---

## 5. Documentation

The repository includes:

- `README.md` — project overview, stack, install, deploy, license, fork guidance.
- `CONTRIBUTING.md` — how to contribute code, translations, and content.
- `CODE_OF_CONDUCT.md` — community standards (Contributor Covenant 2.1).
- `SECURITY.md` — responsible disclosure and privacy commitments.
- `LICENSE` — code license (MIT) and content license (CC BY-SA 4.0).
- `LEAD_AGENT.md` — operating manual for any agent working on the codebase.
- `SEO.md` — search engine configuration and indexing notes.
- `VISION.md` — long-term vision and design principles.
- `cloudflare-worker/DEPLOY.md` — deployment guide for the AI assistant edge worker.
- `llms.txt`, `llms-full.txt` — machine-readable summaries for LLM crawlers.

Documentation is sufficient for a third party to fork and re-launch the project for another country. The Norway team is doing this as a real-world test of documentation completeness.

---

## 6. Mechanism for extracting data

ANKOMMER does not collect personal data on a server. Therefore there is no central dataset to export.

User-level state (chapter progress, language preference, Viking Points) is stored in the browser's `localStorage`. Any user can extract their own data at any time by exporting their browser's local storage for the `ankommer.org` origin. A user-facing export-to-file feature is on the roadmap to make this easier for non-technical users.

The chapter content itself is openly licensed and available in plain form via the repository, the `llms-full.txt` file, and the public chapter URLs.

---

## 7. Adherence to privacy and applicable laws

ANKOMMER is built around a privacy-first design principle:

- **No analytics.** No Google Analytics, no Plausible, no other tracking.
- **No cookies set by the application** beyond functional, in-browser storage.
- **No third-party scripts** with user-tracking behaviour.
- **No accounts, no email collection, no IP logging** on the application layer.
- **AI assistant** sends individual user messages to an inference endpoint for processing but does not attach a stable user identifier.
- **Local data only** for user progress and preferences.

Applicable laws and frameworks:

- **GDPR** (EU 2016/679): the application processes virtually no personal data. Where the AI assistant transiently processes a message, the legal basis is performance of a service the user has actively initiated. No long-term storage occurs.
- **Danish Data Protection Act**: same principles apply.
- **EU ePrivacy Directive / Cookie rules**: ANKOMMER does not store non-essential cookies or use trackers, so consent banners are not required.

For users in fragile situations (asylum seekers, undocumented arrivals), this design is not cosmetic — it is a deliberate safety property.

---

## 8. Adherence to standards and best practices

ANKOMMER conforms to:

- **Web standards**: HTML5, CSS3, ECMAScript (vanilla, no transpilation needed).
- **Progressive Web App** specifications: service worker, web app manifest.
- **WCAG 2.1 Level AA accessibility** is the target. Specific implementations: keyboard navigation throughout, focus management on route changes, ARIA labels on interactive elements, full RTL support for Arabic, Urdu, and Farsi, color contrast meets AA, semantic HTML.
- **Open data APIs**: Open-Meteo, DAWA (Danish Addresses Web API), Rejseplanen — all officially sanctioned public-data sources.
- **Internationalization (i18n)**: standard BCP-47 language codes, separation of strings from code, RTL-aware layout.
- **Versioning**: semantic versioning of releases via Git tags.

---

## 9. Do no harm by design

ANKOMMER's users include people in vulnerable situations: asylum seekers, newly arrived workers, students far from home, families with limited language access. The "do no harm" principle has shaped specific design choices:

- **No data harvesting.** A breach of an arrival guide that tracked users would be a direct safety risk. We collect none.
- **Citation-driven content.** Every factual claim links to an official source so users can verify. We do not invent rules.
- **AI assistant is grounded, not generative-only.** Bjørn is anchored to chapter content and is designed to redirect to authoritative chapters or external sources rather than fabricate answers. The system prompt explicitly forbids guessing on immigration, legal, medical, or tax matters.
- **Clear disclaimer.** The site and license make explicit that ANKOMMER is not a substitute for legal, immigration, tax, medical, or financial advice.
- **Inclusive content review.** Translations are checked by native speakers wherever possible. Sensitive topics (asylum, mental health, domestic violence) include emergency-services information and links to professional support.
- **No tracking of vulnerable users.** No marketing pixels, no fingerprinting, no behavioural analytics, by design.
- **Code of Conduct** for contributors enforces inclusive, non-discriminatory participation.

---

## Supporting evidence and links

- **Live application**: https://ankommer.org
- **Source code**: https://github.com/AliAlMokdad/ankommer
- **Documentation**: in the repository (`README.md`, `CONTRIBUTING.md`, `LEAD_AGENT.md`, `SECURITY.md`)
- **Norway fork (in development)**: link to be added once public
- **EU statement of language gap**: EU Migration and Home Affairs note that Denmark's immigration service does not translate basic newcomer information into common immigrant languages.
- **Independent press coverage**: pending coverage in The Copenhagen Post, May 2026.

---

## Submission notes

This document is a working draft. To submit:

1. Create an account at https://app.digitalpublicgoods.net/.
2. Start a new nomination for ANKOMMER.
3. Paste the relevant sections of this document into each indicator field.
4. Attach links to LICENSE, README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY.
5. Mention the Norway fork as evidence of real-world community uptake.

Expected review time: several weeks. The DPGA reviewers will ask follow-up questions; expect to engage in a back-and-forth before approval.
