# LEAD AGENT — Operating Manual for ANKOMMER

This document is the **system prompt for any agent working on this codebase**. Read it first. Follow it. If you're a sub-agent working in parallel, the lead agent (whoever ran you) extracted the relevant constraints from here.

---

## What ANKOMMER is

A static, multilingual PWA that helps immigrants build their life in Denmark. It runs at https://ankommer.org/. No backend. No build step. Just HTML + CSS + vanilla JS + a service worker. Deployed via GitHub Pages on every push to `main`.

Users are people in vulnerable situations — recently arrived, language barriers, navigating bureaucracy. **Anything that doesn't work hurts a real person trying to figure out their life.**

---

## Three non-negotiable constraints

### 1. Zero money

The project must never require a paid service. Period.

| Need | Free option | Avoid |
|---|---|---|
| Hosting | GitHub Pages (already set up) | Vercel/Netlify Pro, paid CDNs |
| LLM proxy | Cloudflare Workers free tier (100k req/day, no credit card) | Any paid LLM API |
| Domain | `username.github.io/ankommer/` is fine | $10/yr custom domains until justified |
| Analytics | Plausible Community Edition self-hosted, or none | Google Analytics is free but creepy; paid tools off-limits |
| Email/forms | mailto: links, GitHub issues | Paid form services |

If a fix requires money, **document the alternative free path or flag it clearly to the user** — don't ship it.

### 2. Accuracy over polish

This is a guide for real life decisions. Wrong tax math, wrong residency rules, or wrong timeline numbers can cost someone real money or visa status. When choosing between "looks great" and "is correct," correctness wins.

- **All calculators must be sourced** to authoritative material (Skattestyrelsen for tax, nyidanmark.dk for visas, etc.)
- **Bake the year into formulas** so we know when to revisit (`2025 bundskat = 0.1201`)
- **Show disclaimers** wherever the user might mistake an estimate for legal advice
- **Never invent numbers** to make a UI look complete — leave a clear "coming soon" instead

### 3. Must actually work

A button that does nothing is worse than a button that isn't there. Before shipping any change:

1. Open the live site or local dev server
2. Click through the changed surface
3. Watch the console for errors
4. Verify the result is what a non-developer would expect
5. Test in the active language and at least one RTL language

Silent failures are bugs. If a network call can fail, the user must see *why*.

---

## Priority order for any new round of work

Use this stack-ranked list. Don't move down the stack until the items above are clean.

1. **Crash bugs** — anything that throws on a normal user action
2. **Silent failures** — buttons that do nothing, API calls that return without feedback
3. **Math/data errors** — wrong tax rates, wrong residency math, outdated rules
4. **Security** — XSS, exposed credentials, unsafe innerHTML
5. **Accessibility blockers** — keyboard traps, no focus indicators, missing labels
6. **Performance regressions** — first paint > 3s on 4G, render-blocking resources
7. **Translation gaps** — strings that fall back to English in non-EN languages
8. **Polish** — animations, hover states, copy refinements

If a sub-agent reports findings across multiple tiers, **fix tier-1 items first, then tier-2, etc**. Don't ship a polish PR while a crash bug is open.

---

## How the lead agent should orchestrate sub-agents

Use parallel sub-agents when the work is **independent** and the task is **scoped**. Don't spawn agents for trivial questions.

### When to spawn

- Cross-cutting audits (a11y, security, perf, math correctness)
- Static analysis that needs reading many files
- Content review that needs sustained focus
- End-to-end flow tracing

### When NOT to spawn

- Single-file edits — just do them
- Conversational follow-ups
- Anything where the user is waiting on a quick answer
- When the org has hit usage limits — fall back to direct work

### Prompts that produce good agent output

- Specify the exact files to read (paths)
- Tell them the output format and word limit
- Use `🔴/🟡/🟢` severity markers — easy to triage
- Demand `file:line` references, not vague descriptions
- Cap at 600-1500 words depending on scope

### After agents return

1. **Synthesize** — merge overlapping findings, dedupe
2. **Stack-rank** — apply the priority order above
3. **TodoWrite** the fix list before touching code
4. **Fix in order** — don't jump around
5. **Smoke test** every fix in the live browser before commit
6. **Commit message describes the WHY** — what user impact, what was wrong, sourced

---

## Codebase invariants — keep these true forever

### Files

- `index.html` — single page, no templating
- `css/main.css` — one file, themed via CSS vars (light/dark)
- `js/app.js` — boot, i18n, routing, modals, gamification
- `js/data.js` — translations + content data tables
- `js/apis.js` — every external integration (DAWA, Open-Meteo, Rejseplanen, jobs, exchange rates)
- `js/calculators.js` — pure-math calculators (no DOM-blocking work in here)
- `js/bjorn.js` — chat widget
- `sw.js` — service worker (cache-first JS/CSS, network-first HTML)

### Do not

- Add a build step (no webpack/vite/rollup) — keep it deployable as raw files
- Add a backend or paid service
- Embed unminified third-party JS bigger than ~30 KB without lazy-loading it
- Use `innerHTML` with user input without escaping (`escapeHtml()` exists in app.js + apis.js)
- Read `localStorage` directly — use `safeGetItem` / `safeGetJSON` (Safari private mode crashes otherwise)
- Use `AbortSignal.timeout` directly in apis.js — use the `timeoutSignal` helper (older Safari compat)
- Hardcode strings shown to the user without an entry in `TRANSLATIONS` (`data.js`)
- Bump the SW `CACHE_NAME` and forget to update precache list

### Always

- Increment `CACHE_NAME` in `sw.js` when CSS/JS changes (so users get fresh assets)
- Add new translation keys to all 10 languages or accept English fallback
- Test RTL (`?lang=ar`) for any layout change
- Use `defer` on every new `<script>` tag

---

## Free Björn proxy — concrete plan (no money)

The Groq API key is currently in client source (`bjorn.js`). Anyone can scrape it. The fix without spending money:

1. User creates free Cloudflare account (no credit card required for Workers)
2. Create a Worker that proxies POST → `https://api.groq.com/openai/v1/chat/completions`
3. Worker stores the Groq key in an environment variable (encrypted)
4. Worker validates request origin matches `alialmokdad.github.io`
5. Worker enforces simple rate limit (e.g., 30 req per IP per hour) to prevent abuse
6. Update `bjorn.js`: change endpoint to `https://your-worker.workers.dev`, remove the inline key

Free tier limits: 100,000 requests/day. ANKOMMER could host millions of users at this rate before paying anything.

When you implement this, write the Worker code, give the user the deployment steps in plain language, and update `bjorn.js`. Don't deploy it yourself — the user's account is theirs.

---

## What "done" looks like for a round

A round is done when:

- ✅ Every item in the round's TodoWrite list is marked `completed`
- ✅ Live site loads with zero JS console errors
- ✅ The specific surface the round targeted has been clicked through manually
- ✅ At least one non-English + one RTL language load was tested
- ✅ Commit message documents what changed and why
- ✅ GitHub Action deploy succeeded
- ✅ The user has been told what shipped and what's left

Don't move on without all six.

---

## Strategic backlog

The next 6–10 high-impact moves for the site live in **VISION.md** in this folder. That doc was produced by a multi-perspective summit (newcomer, product, engineering, local Dane, lead agent) and ranks ideas by impact × cost. Every idea there is verified `$0 cost` per the no-money rule.

When a session starts and the user asks "what's next?" — read VISION.md, pick the highest-ranked unshipped item, scope it to the available time, write a TodoWrite plan, and execute under the priority order above.

---

*Maintained by the lead agent for the lead agent. Updated 2026-05-04 (round 5).*
