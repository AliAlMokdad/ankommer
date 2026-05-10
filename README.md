# ANKOMMER

**Moving to Denmark — The Complete Guide.** A multilingual progressive web app helping immigrants build their life in Denmark, chapter by chapter.

🌍 **10 languages** · 📚 **16 life chapters** · 🛠️ **9 smart tools** · 🤖 **Bjørn AI guide**

## Features

- **16 chapters** covering everything from before-you-land through citizenship
- **Smart tools**: salary calculator, cost of living, rent index, weather planner, kommune finder, journey planner, job search, visa decision tree, residency timeline
- **Bjørn** — AI assistant with persona-tuned answers
- **Live data** via Open-Meteo, DAWA (Danish addresses), Rejseplanen, exchange rates
- **PWA** — installable, works offline
- **Full RTL** support for Arabic, Urdu, Farsi
- **10 languages**: English, French, Arabic, Spanish, Danish, German, Ukrainian, Polish, Urdu, Farsi

## Stack

Pure static site — no build step. Just HTML, CSS, vanilla JS, and a service worker.

```
ankommer/
├── index.html          # Single-page app shell
├── css/main.css        # All styles (light + dark themes)
├── js/
│   ├── app.js          # Main app, routing, i18n, rendering
│   ├── data.js         # Translations, chapters, content
│   ├── apis.js         # Live data integrations
│   ├── calculators.js  # Salary, COL, rent, residency math
│   └── bjorn.js        # AI chat assistant
├── sw.js               # Service worker (network-first, offline cache)
├── manifest.json       # PWA manifest
└── icons/              # App icons
```

## Run locally

```bash
npx serve -p 3456
```

Then open http://localhost:3456

## Deploy

Drop the folder on any static host: Netlify, Cloudflare Pages, GitHub Pages, Vercel.

`_headers` and `_redirects` are pre-configured for Netlify/Cloudflare.

## License

All rights reserved. ANKOMMER is an independent guide — always verify important information with official Danish authorities.
