# Contributing to ANKOMMER

Thank you for your interest in contributing. ANKOMMER exists to help newcomers to Denmark navigate arrival in their own language, and every contribution moves that mission forward.

This guide covers how to report issues, suggest improvements, contribute code or translations, and propose new chapters or features.

## Ways to contribute

- **Fix a factual error.** Rules change, numbers change. If you spot something out of date or incorrect, please open an issue or pull request.
- **Improve a translation.** Native speakers are especially welcome. Quality matters more than quantity.
- **Add or refine an interactive tool.** Salary calculators, visa decision trees, residency timelines, and similar tools live in `js/calculators.js`.
- **Suggest a new chapter.** Open an issue describing the gap, the audience, and proposed sources.
- **Improve accessibility.** Screen reader support, keyboard navigation, RTL handling, color contrast, and ARIA semantics.
- **Help fork the project for another country.** A team in Norway is already doing this. We will happily link to country-specific forks from the main site.

## Before you start

1. **Open an issue first** for non-trivial changes so we can align on scope. Tiny fixes can go straight to a pull request.
2. **Check existing issues and pull requests** to avoid duplicate work.
3. **Be kind.** See `CODE_OF_CONDUCT.md`.

## Local development

ANKOMMER is a pure static site. No build step, no framework, no package manager required to run it.

```bash
git clone https://github.com/AliAlMokdad/ankommer.git
cd ankommer
npx serve -p 3456
```

Open http://localhost:3456 in a browser. The service worker may cache aggressively, so use a private window or `Ctrl+Shift+R` to bypass cache while testing changes.

## Project structure

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

## Style and quality

- Vanilla JavaScript only. No frameworks, no transpilers.
- Keep dependencies near zero. Adding a runtime dependency requires a strong justification in the pull request description.
- Match existing code style. We do not enforce a linter; please read nearby files and follow the conventions you see.
- All user-facing text must be in the translation catalog in `js/data.js`. Never hard-code English in templates.
- Accessibility is not optional. Keyboard, screen reader, and RTL all need to keep working.

## Sources and citations

ANKOMMER is citation-driven. When you add or change a factual claim, please cite the official source (ministry, municipality, agency) in the pull request description, with a link and the date you verified it.

## Translations

We currently support: English, French, Arabic, Spanish, Danish, German, Ukrainian, Polish, Urdu, and Farsi.

To add or improve a translation:

1. Find your language code in `js/data.js`.
2. Add or update the relevant string keys.
3. If your language is right-to-left (Arabic, Urdu, Farsi), verify that the UI still works in RTL mode.
4. Mark uncertain translations with a `TODO:` comment so a second speaker can review.

We prefer translations done by humans who speak the language natively. Machine-translated submissions are welcome as a starting point, but flag them as such.

## Privacy commitment

ANKOMMER stores no personal data on a server. Anything that collects or transmits user data must go through review. Contributions that add tracking, analytics, or third-party scripts will not be accepted.

## License of contributions

By contributing, you agree that your contributions will be licensed under the same terms as the project:

- **Code** under the MIT License
- **Content** (chapter text, translations, prose, documentation) under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)

You retain copyright to your contribution. You are simply granting the project the right to use it under these licenses.

## Contact

For sensitive issues (security, abuse, takedown requests), see `SECURITY.md`. For everything else, open an issue on GitHub.
