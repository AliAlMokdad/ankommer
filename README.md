# ANKOMMER

**The world's most complete multilingual guide to arriving in Denmark, built AI-native.**

A free, open source, privacy-first progressive web app that walks newcomers through the full journey of moving to and settling in Denmark, in ten languages, with an AI assistant tied to chapter content.

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](LICENSE)
[![Content: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![PWA](https://img.shields.io/badge/PWA-installable-success.svg)](https://ankommer.org)
[![Live site](https://img.shields.io/badge/live-ankommer.org-1F3864.svg)](https://ankommer.org)

🌍 **10 languages** · 📚 **16 life chapters** · 🛠️ **9 smart tools** · 🤖 **Bjørn AI guide**

## Why this exists

Denmark's official information for newcomers is published almost entirely in English and Danish. The EU has formally flagged that the system is not translated into common immigrant languages like Arabic, Farsi, or Polish. Existing guides answer single questions; they do not walk you through arrival as a journey.

ANKOMMER fills that gap. It is built around the user's arrival journey, not around which Danish ministry owns which topic. Every chapter exists in ten languages by design, not as a translation afterthought. The Bjørn assistant can read a Danish letter and explain it in your language.

## Features

- **16 chapters** covering everything from before-you-land through citizenship and inclusion
- **Smart tools**: salary calculator, cost of living, rent index, weather planner, kommune finder, journey planner, job search, visa decision tree, residency timeline
- **Bjørn** — an AI assistant with persona-tuned answers, anchored to chapter content
- **Live data** via Open-Meteo, DAWA (Danish addresses), Rejseplanen, and exchange rates
- **PWA** — installable, works offline once installed
- **Full RTL** support for Arabic, Urdu, Farsi
- **10 languages**: English, French, Arabic, Spanish, Danish, German, Ukrainian, Polish, Urdu, Farsi
- **Privacy-first**: no tracking, no ads, no analytics, no accounts. Personal data stays on your device.

## Stack

Pure static site. No build step, no framework, no transpiler.

```
ankommer/
├── index.html              # Single-page app shell
├── css/main.css            # All styles (light + dark themes)
├── js/
│   ├── app.js              # Main app, routing, i18n, rendering
│   ├── data.js             # Translations, chapters, content
│   ├── apis.js             # Live data integrations
│   ├── calculators.js      # Salary, cost of living, residency math
│   └── bjorn.js            # AI chat assistant
├── sw.js                   # Service worker (offline cache)
├── manifest.json           # PWA manifest
├── icons/                  # App icons
└── cloudflare-worker/      # Edge worker for the AI assistant
```

## Run locally

```bash
git clone https://github.com/AliAlMokdad/ankommer.git
cd ankommer
npx serve -p 3456
```

Open http://localhost:3456 in your browser.

## Deploy

Drop the folder on any static host: Netlify, Cloudflare Pages, GitHub Pages, Vercel. `_headers` and `_redirects` are pre-configured for Netlify and Cloudflare.

## Fork it for another country

ANKOMMER is open source so that the same pattern can be applied elsewhere. A team in Norway is already building a Norwegian version on this code base.

If you are building a localised version for another country, please:

1. Keep the chapter structure that maps to the actual arrival journey of your country, not to which ministry owns which topic.
2. Source content from official authorities and cite them.
3. Preserve the privacy-first stance — no tracking, no ads.
4. Let us know! We will link to your fork from the project page.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to report issues, submit code, or improve translations. Native-speaker translators are especially welcome.

Please also read the [`Code of Conduct`](CODE_OF_CONDUCT.md). Security and responsible disclosure: [`SECURITY.md`](SECURITY.md).

## License

- **Code** is released under the **MIT License**. See [`LICENSE`](LICENSE).
- **Editorial content, translations, and documentation** are released under **Creative Commons Attribution-ShareAlike 4.0 International** (CC BY-SA 4.0).

You are free to use, fork, adapt, and redistribute this project, including for commercial purposes, provided you give appropriate credit and pass content changes along under the same license.

## Disclaimer

ANKOMMER is an independent guide. It is not a substitute for official legal, immigration, tax, medical, or financial advice. Always verify important information with the relevant Danish authorities or a qualified professional before acting on it.

## Acknowledgements

Built by [Ali Al Mokdad](https://github.com/AliAlMokdad). Live data courtesy of Open-Meteo, DAWA, Rejseplanen, and others. Inspired by the people who keep asking how to make sense of arriving in a new country.
