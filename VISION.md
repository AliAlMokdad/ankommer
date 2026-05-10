# The Summit — How Do We Make ANKOMMER Genuinely Great?

> *The lead agent convened five voices in the round room. Constraint: no money. Goal: a site real immigrants would say "this changed my move."*

---

## The voices

- **🎒 The Newcomer** — Maria. Arrived Aarhus three weeks ago with two kids and bad jet lag. Speaks no Danish.
- **🛡 The Lead Agent** — Me. Synthesizes, vetoes anything that costs money or breaks accuracy.
- **📈 The Product Lead** — Cares about people actually finding and using the site.
- **🛠 The Engineer** — Cares about what's buildable in a weekend without a backend.
- **🇩🇰 The Local Dane** — Sofie. Senior nurse in Odense, mentor to four newcomers over the years.

---

## Round 1 — "What's the *one thing* that would have changed your life?"

**🎒 Maria:** A timeline that knew where I was. Day 3 nobody told me to register CPR before the schools opened — by the time I figured it out, my older kid had missed two weeks. The site has 16 chapters, but I needed a "today, do this" view, ordered by deadline, with the actual phone numbers and the actual addresses. Not "research the Borgerservice" — I needed *the* Borgerservice.

**🇩🇰 Sofie:** What hurts my mentees most is the silent stuff. They don't know that *not* responding to an e-Boks letter for 14 days starts a clock. They don't know rental contracts here have a `depositum` cap. They don't know the difference between `lønmodtager` and `selvstændig` for tax purposes. Six chapters of background reading isn't help — they need a watchdog.

**📈 Product:** People will find it through three paths: search, immigrant subreddits, and friends. The site is good at "I'm planning to move someday." It's weaker at "I'm here right now and I have a question." Most search traffic for Denmark is question-shaped: *"do I need a CPR number to open a bank account"* — we should be the answer.

**🛠 Engineer:** Half of what's been said is achievable as static content with smart structure — the other half wants a backend we don't have and won't pay for. We can fake a lot of the personalization with localStorage + URL state. We can do email reminders without a server using calendar `.ics` downloads. We can publish embeddable widgets so we live inside Reddit answers and Facebook groups.

**🛡 Lead:** Three themes are emerging — *deadline-driven* personalization, *signal* vs background, and *meeting users where they search*. Round 2: what could we actually build for each?

---

## Round 2 — Concrete proposals (and pushback)

### A. Personal timeline ("My Denmark Plan")

**🎒** From the wizard, I get a personalized list: *"Day 0–3: register CPR. Day 4–7: open NemKonto. Day 14: bank appointment ready."* Each item has a link to the chapter and a checkbox.

**🛠** Doable today. We already capture profile + chapter completion. Add a `myPlan()` view that filters tasks by `dueWeek` field on each task, ordered. ~2 hours of work, no new dependencies.

**🇩🇰** It needs to be *honest* about regional variation. CPR registration takes 2 days in Aalborg, can take 3 weeks in Copenhagen with a backlog. Hardcoded "Day 3" misleads.

**🛡** Add `expectedDays: { cph: 21, aar: 5, ode: 5, aal: 2 }` per task instead of a flat number. We already have `kommune` info. Cost: zero, just data.

### B. The Watchdog ("What changes today?")

**🎒** I want a daily-or-weekly "here's what matters this week for you" — the things I won't otherwise know.

**🇩🇰** Tax year boundaries (forskudsopgørelse → årsopgørelse), CPR-renewal deadlines, public holiday closures, school enrollment windows, parental leave deadline (8 weeks before due date)…

**📈** Email newsletter would convert — but we don't have a backend or an email provider on the free tier without a credit card.

**🛠** Three free options:
1. **`.ics` calendar downloads.** Pick your move date, download a calendar of every key Danish deadline anchored to it. Works in Apple/Google/Outlook. Zero infra.
2. **RSS feed** of "today/this week" updates. Power-users subscribe in their reader. Free.
3. **Web Push notifications** straight from the PWA. No server needed for the simple "remind me" flow if we use the Notifications API + IndexedDB scheduling. Modern browsers only.

**🛡** All three are free and complementary. Let's queue all three; ship the `.ics` first — it's the most universal.

### C. Question-shaped landing pages

**📈** Every Reddit thread for Denmark immigration is the same questions repeated: *"do I need a CPR for a bank?", "how much is rent in Aarhus?", "what's an a-kasse?"* If we have a page per question, with a clear answer + the relevant chapter link, search engines bring people directly to the answer.

**🛠** Without a build step we can't easily mint hundreds of static pages. But we *can* use hash-routes (`/#q/cpr-bank-account`) plus a JSON-LD `FAQPage` schema injected dynamically — Google's been crawling JS-rendered pages for ~5 years. We get the SEO without per-page HTML files. Risk: AI search engines (Perplexity, ChatGPT browsing) prefer real HTML. Compromise: write the top 50 questions as a `FAQ.md` per language, render the rendered version + put structured data in `<head>` server-side via simple SSG step.

**🛡** That last sentence violates "no build step." Counter-proposal: ship the questions as part of the existing search index AND emit FAQPage schema in `<head>` listing all 50 questions with answers. Search engines parse JSON-LD even for SPAs. Costs: zero, just a `FAQ` data table.

### D. Document explainer (Bjørn upgrade)

**🎒** I get letters in Danish. Bjørn already translates them. But I'd love an upload — take a *photo* of the letter, get an explanation. Half the letters I get are paper.

**🛠** Browser OCR via Tesseract.js works offline, ~3 MB lazy-load. Pipe extracted text into Bjørn. No new API needed. Free.

**🛡** Approve. Lazy-load Tesseract only when the camera/upload button is clicked so it doesn't bloat first paint.

### E. Community contributions (translations + content)

**🎒** Half the chapters fall back to English in my friends' languages. They'd happily translate if there were a way.

**📈** Open the project to translators via GitHub Issues + a `/contribute` page that explains how. Each language gets a "maintainer" badge — social currency.

**🛠** We can split data.js by language (suggested in the perf audit) and accept PRs against `data.de.js`, etc. Lower bar to contribute than touching a 2,000-line monolith.

**🇩🇰** Add a translator credit line per language in the footer ("German chapters by [name] · contribute at github.com/…") — this is small but motivating.

**🛡** Approve. Combines perf win (smaller initial payload) with community growth.

### F. Real-data accuracy audits

**🇩🇰** The Boligindeks rent figures are from 2023. They're already 12% stale. The kommuneskat dropdown lists rates from "your last update." Without a process, the site bit-rots.

**🛠** Add a `_DATA_REVIEWED` field to each data table: `{ source: 'skat.dk', reviewedDate: '2025-01-15', nextReviewBy: '2026-01-15' }`. Display "Data sourced 14 months ago" in the calculator footer when stale. Forces the maintainer (you) to revisit yearly.

**🛡** Approve. Trust depends on this.

### G. Embeddable widgets

**📈** Each tool (salary, rent index, residency timeline) becomes an `<iframe>` embed people can drop into Reddit posts, blog articles, Facebook group pinned posts. We become the *infrastructure* of Denmark immigration content, not just one site.

**🛠** Add `?embed=salary` etc. that renders just that one tool, full-bleed, with attribution. We already have query-param routing.

**🛡** Approve. Distribution is the cheap superpower.

### H. Cultural decoder (the Sofie special)

**🇩🇰** "What does it mean when my Danish coworker says 'we should grab coffee'?" "Why did my landlord say 'okay' but it was actually a no?" — there's a cultural-translation layer that's invisible until it bites. I've spent so many evenings explaining this to mentees.

**🛠** A new chapter, or a sidebar inside the existing Culture chapter. Or — more discoverable — small *"culture asterisks"* throughout other chapters: when you read about workplace etiquette, a small `*` mark expands a one-line cultural footnote.

**🛡** Approve the asterisk treatment. The dedicated Culture chapter exists; the asterisks make the insight *meet you where you are*.

### I. Voice + accessibility-first reading

**📈** Half our potential users are partial Danish speakers, or can't read English fluently either. A "play this chapter" button using browser TTS would be transformative for users with literacy or vision challenges.

**🛠** Web Speech API. Free. Works in all modern browsers. ~30 lines of JS to wire up.

**🛡** Approve.

### J. Storage of user progress beyond localStorage

**🛠** localStorage gets wiped when users clear their browser, switch devices, or use private mode. We could let users export their progress as a JSON file ("Take my plan with me") and re-import elsewhere.

**🎒** Yes — I switched from my phone to my laptop and lost everything.

**🛡** Approve. Trivial — file download/upload, no backend.

---

## Round 3 — Ranking by impact × cost

The lead agent stack-ranks under the LEAD_AGENT.md priorities. Cost is in the "no money" sense and in implementation effort.

| # | Move | Impact | $ cost | Eng cost | Tier |
|---|---|---|---|---|---|
| 1 | **Personal timeline ("My Plan")** with dueWeek + regional days | 🌟🌟🌟🌟🌟 | 0 | half day | Tier 1 — solves the #1 newcomer pain |
| 2 | **`.ics` calendar export** of all key deadlines | 🌟🌟🌟🌟 | 0 | 2 hours | Tier 1 — universal, no infra |
| 3 | **Question-shaped FAQ + JSON-LD** for SEO | 🌟🌟🌟🌟 | 0 | half day | Tier 1 — distribution unlock |
| 4 | **Cultural asterisks** in existing chapters | 🌟🌟🌟🌟 | 0 | quarter day per chapter | Tier 2 — sustained value |
| 5 | **Embeddable tool widgets** (`?embed=salary`) | 🌟🌟🌟 | 0 | 2 hours | Tier 2 — distribution |
| 6 | **`_DATA_REVIEWED` freshness markers** | 🌟🌟🌟 | 0 | 2 hours | Tier 2 — trust durability |
| 7 | **Export/import user plan** as JSON | 🌟🌟🌟 | 0 | 1 hour | Tier 2 — quality of life |
| 8 | **Voice playback** for chapters (TTS) | 🌟🌟🌟 | 0 | 1 hour | Tier 2 — accessibility |
| 9 | **Document photo OCR** (Bjørn upgrade) | 🌟🌟🌟 | 0 | half day | Tier 3 — needs lazy load |
| 10 | **Community translation infra** (split data.js) | 🌟🌟🌟 | 0 | half day | Tier 3 — needs governance |
| 11 | **`.ics`** + RSS + Web Push (full watchdog suite) | 🌟🌟 | 0 | 1 day | Tier 3 — overlapping with #2 |
| 12 | **Custom domain** (`ankommer.dk`) | 🌟 | $10/yr | 1 hour | ⛔ violates "no money" — skip until justified |

---

## What I'm shipping in round 5

The Lead Agent picks one move that scores high on all axes and is achievable in the remaining session budget:

> **#7 — Export / import user plan.**
>
> Smallest scope. Solves a real Maria pain (lost her plan switching devices). No new dependencies. Touches localStorage which we already have safe accessors for. Validates the architecture for later "My Plan" work in #1.

Then queue moves #1, #2, #3 for next sessions — they're the high-impact ones.

---

## What this debate revealed

1. **The product hole is "I'm here right now"** — the site does well at planning, weaker at "today, do this." Every Tier-1 idea attacks that gap.
2. **Distribution > features** — one well-ranked FAQ page or one shareable widget reaches more people than three new tools.
3. **No-money is fine** — every idea here ships free. The "free tier" of modern browsers (TTS, Notifications, Service Workers, OCR) and the static-host model is enough.
4. **Trust degrades silently** — without a freshness mechanism, the calculators will quietly drift from accurate to wrong.
5. **The Lead Agent doc is already paying off** — it killed the custom-domain proposal in 30 seconds and forced "no build step" alternatives we wouldn't have found otherwise.

---

*Filed by the Lead Agent, 2026-05-04. Round 5 deliverable: export/import. Pending: #1–6 above.*
