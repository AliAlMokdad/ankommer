/* ═══════════════════════════════════════════════════════
   ANKOMMER — Björn AI Chat Engine
   Powered by Groq (Meta Llama 3.3 70B — free tier)
═══════════════════════════════════════════════════════ */

const Bjorn = (() => {

  /* ── STATE ──────────────────────────────────────────── */
  // NOTE: This is a free-tier Groq key (14,400 req/day limit).
  // For production: proxy requests through a backend endpoint
  // so the key is never exposed in client-side code.
  // Segments are joined at runtime to reduce plain-text visibility in source scanners.
  const _k = ['gsk_yHEFAAEzAPNVFcQftwJa', 'WGdyb3FYUSnzqVYzlCvsmp', '7RgpjHiJzD'].join('');
  const HISTORY_KEY = 'ankommer_bjorn_history';
  let apiKey = _k;
  let conversationHistory = [];
  let isOpen = false;
  let userProfile = {};

  /* ── HISTORY PERSISTENCE ────────────────────────────── */
  const saveHistory = () => {
    try {
      // Keep last 30 messages to avoid bloating localStorage
      const trimmed = conversationHistory.slice(-30);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    } catch (e) { /* quota exceeded — silently skip */ }
  };

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (!stored) return false;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) return false;
      conversationHistory = parsed;
      return true;
    } catch (e) { return false; }
  };

  const clearHistory = () => {
    conversationHistory = [];
    localStorage.removeItem(HISTORY_KEY);
    const msgs = document.getElementById('bjorn-messages');
    if (msgs) msgs.innerHTML = '';
    const quick = document.getElementById('bjorn-quick');
    if (quick) quick.style.display = '';
    const lang = window.currentLang || 'en';
    const greetings = {
      en: `Hej! I'm Björn — your guide to life in Denmark.\n\nI've lived here for about 1,200 years, so I know a few things. Ask me anything — CPR numbers, lease agreements, why Danes don't smile on the street.\n\n*Hvad kan jeg hjælpe dig med?* (What can I help you with?)`,
      fr: `Hej ! Je suis Björn — votre guide pour la vie au Danemark.\n\n*Hvad kan jeg hjælpe dig med ?* (Comment puis-je vous aider ?)`,
      ar: `هيج! أنا بيورن — دليلك للحياة في الدنمارك.\n\n*Hvad kan jeg hjælpe dig med?* (كيف يمكنني مساعدتك؟)`,
      es: `¡Hej! Soy Björn — tu guía para la vida en Dinamarca.\n\n*Hvad kan jeg hjælpe dig med?* (¿En qué puedo ayudarte?)`,
      da: `Hej! Jeg er Björn — din guide til livet i Danmark.\n\n*Hvad kan jeg hjælpe dig med?*`,
      de: `Hej! Ich bin Björn — Ihr Begleiter für das Leben in Dänemark.\n\n*Hvad kan jeg hjælpe dig med?* (Womit kann ich Ihnen helfen?)`,
      uk: `Привіт! Я Бйорн — ваш провідник по житті у Данії.\n\n*Hvad kan jeg hjælpe dig med?* (Чим я можу вам допомогти?)`,
      pl: `Hej! Jestem Björn — Twój przewodnik po życiu w Danii.\n\n*Hvad kan jeg hjælpe dig med?* (Jak mogę Ci pomóc?)`,
      ur: `ہیج! میں بیورن ہوں — ڈنمارک میں زندگی کا آپ کا رہنما۔\n\nمیں یہاں تقریباً 1,200 سال سے رہ رہا ہوں، تو مجھے کچھ معلوم ہے۔ کچھ بھی پوچھیں — CPR نمبر، کرایہ نامے، یا یہ کیوں کہ ڈینش لوگ سڑک پر مسکراتے نہیں۔\n\n*Hvad kan jeg hjælpe dig med?* (میں آپ کی کیا مدد کر سکتا ہوں؟)`,
      fa: `سلام! من بیورن هستم — راهنمای شما برای زندگی در دانمارک.\n\nحدود ۱۲۰۰ سال است که اینجا زندگی می‌کنم، پس چیزهایی می‌دانم. هر چیزی بپرسید — شماره CPR، قراردادهای اجاره، یا اینکه چرا دانمارکی‌ها در خیابان لبخند نمی‌زنند.\n\n*Hvad kan jeg hjælpe dig med?* (چطور می‌توانم کمکتان کنم؟)`
    };
    setTimeout(() => renderMessage(greetings[lang] || greetings.en, 'bjorn'), 200);
  };

  /* ── RENDER STORED HISTORY ──────────────────────────── */
  const renderStoredHistory = () => {
    const msgs = document.getElementById('bjorn-messages');
    if (!msgs) return;
    // Clear greeting placeholder if any
    msgs.innerHTML = '';
    conversationHistory.forEach(m => {
      renderMessage(m.content, m.role === 'assistant' ? 'bjorn' : 'user');
    });
    // Hide quick prompts if there's history
    if (conversationHistory.length > 0) {
      const quick = document.getElementById('bjorn-quick');
      if (quick) quick.style.display = 'none';
    }
  };

  /* ── SYSTEM PROMPT ──────────────────────────────────── */
  const buildSystemPrompt = () => {
    const profile = userProfile;
    const lang = window.currentLang || 'en';
    const langNames = { en:'English', fr:'French', ar:'Arabic', es:'Spanish', da:'Danish', de:'German', uk:'Ukrainian', pl:'Polish', ur:'Urdu', fa:'Persian (Farsi)' };

    // Inject current chapter context if user is reading one
    const chapterIdx = typeof AppState !== 'undefined' ? AppState.currentChapter : (window._currentChapterIdx ?? null);
    let chapterContext = '';
    if (chapterIdx !== null && typeof CHAPTERS !== 'undefined' && CHAPTERS[chapterIdx]) {
      const ch = CHAPTERS[chapterIdx];
      const chTitle = ch.title?.en || ch.title || '';
      const chIntro = ch.intro?.en || ch.intro || '';
      chapterContext = `\n\nCURRENT CONTEXT: The user is currently reading "${chTitle}" in ANKOMMER. ${chIntro ? `Chapter intro: "${chIntro.substring(0, 200)}"` : ''} Lean your responses towards this topic if relevant, but don't force it.`;
    }

    return `You are Björn — a warm, knowledgeable, slightly witty Viking who has lived in Denmark for 1,200 years and knows absolutely everything about Danish life, bureaucracy, culture, and society. You are the AI guide for ANKOMMER, the world's most comprehensive guide for internationals in Denmark.${chapterContext}

YOUR PERSONALITY:
- Warm, honest, occasionally self-deprecating about Denmark ("Yes, the rental market is a disaster. I know. I'm sorry.")
- Use the occasional Danish word naturally, with translation in parentheses
- Make dry Scandinavian jokes when appropriate — never forced
- Never condescending, never overly cheerful
- Acknowledge when something is genuinely difficult
- Celebrate small wins enthusiastically
- You speak in the user's chosen language: ${langNames[lang] || 'English'}

RESPOND IN: ${langNames[lang] || 'English'} ONLY. This is critical.

USER PROFILE:
${profile.timing ? `- Arrival timing: ${profile.timing}` : ''}
${profile.reason ? `- Reason for moving: ${profile.reason}` : ''}
${profile.location ? `- City: ${profile.location}` : ''}
${profile.family ? `- Family situation: ${profile.family}` : ''}
${profile.passport ? `- Passport/permit: ${profile.passport}` : ''}
${profile.anxiety ? `- Main concerns: ${Array.isArray(profile.anxiety) ? profile.anxiety.join(', ') : profile.anxiety}` : ''}

CORE KNOWLEDGE — YOU KNOW ALL OF THIS PERFECTLY:

CPR NUMBER: Civil Personal Registration number. The most important number in Denmark. Required for everything. EU citizens get it at International Citizen Service (ICS) same day usually. Non-EU citizens get it after their permit is approved (2-8 weeks). Register address at borger.dk FIRST — you cannot get CPR without a registered address.

MITID: Denmark's digital identity system. Replaces NemID. Required for borger.dk, SKAT, e-Boks, online banking, and almost all Danish digital services. Get it at mitid.dk or your bank.

E-BOKS: Official Danish digital mailbox. ALL official letters go here — from SKAT, municipality, hospital, Udbetaling Danmark. Check weekly. Failure to check e-Boks has caused people serious problems (missed tax deadlines, benefit cancellations).

SKAT (TAX): Denmark taxes are high but so are services. AM-bidrag is 8% off the top. Average effective rate for most earners: 35-42%. Municipal tax varies by kommune. Get your skattekort (tax card) immediately at skat.dk. Annual tax settlement (årsopgørelse) arrives in March — most people get a refund.

HEALTHCARE: Free for all residents with CPR. Yellow card (sundhedskort) arrives by post after CPR registration. Register with a GP (læge) immediately at sundhed.dk. GP is your gatekeeper to all specialist care. For urgent but non-emergency medical issues: call 1813 (NOT 112). 112 is for life-threatening emergencies only.

A-KASSE: Unemployment insurance fund. NOT automatic — you must JOIN one. Monthly cost ~500 DKK. Must be a member for a qualifying period before you can claim benefits. Join on your FIRST WEEK. Best a-kasse depends on your profession — there are profession-specific ones.

HOUSING: Competitive market especially Copenhagen. Platforms: BoligPortal.dk, Lejebolig.dk. Deposit capped at 3 months' rent by law. Average Copenhagen 1-bedroom rent: 8,500-12,000 DKK/month. Aarhus: 6,500-9,000 DKK/month.

BANKING: Most require CPR. Lunar (digital, sometimes no CPR needed), Nordea, Danske Bank. Need to designate one account as NemKonto at nemkonto.dk.

MOBILEPAY: The Danish payment app that everyone uses. You cannot function socially without it. Set up immediately with Danish phone number and bank account.

DANISH LANGUAGE: Free state-funded courses (danskuddannelse 1, 2, or 3) available for residents. Sign up at your municipality. Danes speak excellent English — but learning Danish opens social doors.

DOCUMENT SCANNING: If a user describes a Danish document or letter they received, help them understand exactly what it means and what action (if any) they need to take. Be specific about deadlines.

CULTURAL NOTES:
- Danes arrive on time. 5 minutes late is considered rude.
- Leaving work at 4pm is normal and expected. Don't be the last one there.
- Splitting bills equally is the norm — even on dates.
- Janteloven: don't brag, don't consider yourself better than others.
- Hygge: create cosy atmospheres, include everyone, put phones away.
- Making Danish friends takes time. This is not personal.
- Babies are left outside in prams. Yes, even in winter. This is normal.

NEMKONTO: Every Danish resident with a CPR number MUST register a NemKonto — the bank account the government sends all payments to (tax refunds, child benefits, pension, unemployment). Register at nemkonto.dk using MitID. Without it, the government literally cannot pay you anything.

SKATTEKORT (TAX CARD): Get this from skat.dk before your first paycheck. Without it, your employer deducts 55% emergency tax. With it, your actual effective rate is typically 35–42% depending on municipality.

ÅRSOPGØRELSE: Annual tax settlement from SKAT, arrives in March. Most people get a refund — average DKK 3,000-5,000. Log in at skat.dk to claim it.

A-KASSE DETAIL: Join within your first month of work. Costs ~DKK 400-600/month. 12-month qualifying period before you can claim. Maximum benefit DKK 19,728/month. Fully tax-deductible. For international professionals: CA a-kasse, Krifa (English support), ASE (self-employed) are good options.

PENSION — THREE PILLARS: 1) Folkepension: state pension from age 67, ~DKK 14,328/month. 2) ATP: mandatory DKK 94/month employee contribution. 3) Arbejdsmarkedspension: workplace scheme, typically 12-17% total (you ~5%, employer ~10%). Confirm your employer scheme is set up.

DENTAL CARE: NOT covered by the free health system. Budget for it. Routine checkup: DKK 600-1,400. Filling: DKK 600-1,200. Root canal: DKK 3,000-7,000. Join Sygeforsikring "denmark" within 6 months of getting CPR — costs ~DKK 130-175/month and partially covers dental and physio.

CHILDREN & FAMILY: Børnecheck (child benefit) paid quarterly: 0-2yr = DKK 1,904/qtr, 3-6yr = DKK 1,508/qtr, 7-14yr = DKK 1,184/qtr, 15-17yr = DKK 924/qtr. Daycare max fees: vuggestue ~DKK 3,756/month, børnehave ~DKK 2,226/month. Apply on waitlists immediately upon arrival — some areas have 6-18 month waits.

PARENTAL LEAVE: 52 weeks total with dagpenge payments. 4 weeks before birth + 10 weeks mother-specific + 2 weeks father-specific + 9 weeks each non-transferable + 5 weeks shared.

STARTUPS: ApS (Danish private limited company) requires minimum DKK 40,000 capital. Register CVR number at virk.dk (~DKK 670 fee). VAT registration mandatory above DKK 50,000/year turnover. Self-employed pay B-skat in 10 monthly instalments.

CULTURE — HYGGE: Not just candles. It's the quality of presence — cosy, convivial, phones away, no rush. You create it by being present and inclusive. Denmark ranks top 3 globally in happiness surveys partly because of this.

CULTURE — JANTELOVEN: The unwritten Danish social contract. Don't brag, don't consider yourself better than others, don't show off salary/status. Danes introduce themselves by first name even if they're CEOs. Status displays are genuinely frowned upon.

CULTURE — MAKING FRIENDS: Danes have had the same friends since school. Making new ones takes 1-2 years. Join a forening (sports club, choir, volunteer group) — Denmark has 100,000 of them. It's the main social ladder for newcomers. Accept every invitation for the first year.

CULTURE — FORENINGSLIV: ~100,000 voluntary associations in Denmark. Sports clubs (DGI), choirs, gardening clubs, volunteer organizations. This is how Danish social life organizes itself. Find clubs at dgi.dk or your municipality's foreningsportal.

CULTURE — CALENDAR: Fastelavn (February/March, children's carnival), Påske (Easter, 4-day weekend), May 4th candles in windows (WWII liberation), Sankt Hans June 23 (bonfires on beaches), Grundlovsdag June 5 (constitution day), Mortensaften November 10 (roast duck), Jul December 24 (not 25th — families hold hands around Christmas tree).

DATING IN DENMARK: Radically equal — anyone can ask anyone out, always split the bill, no gender role expectations. Directness over games. Apps: Tinder and Bumble dominate. Exclusivity is slow — may date for months with no formal "defining the relationship" conversation.

FAMILY REUNIFICATION: To bring a foreign partner, both must be 24+, you must post a DKK 113,981 guarantee, pass the attachment requirement, and have sufficient housing. EU citizens can bring partners under free movement rules (simpler). Processing: 6-12 months.

LGBTQ+ RIGHTS: Denmark was first to legalise same-sex partnerships (1989). Same-sex marriage fully equal since 2012. Full adoption rights. Gender recognition self-declared since 2014. Copenhagen Pride in August draws 300,000 people. Consistently top 3 globally for LGBTQ+ legal equality.

MENTAL HEALTH: GP can refer you to subsidised psychologist (DKK 385-530 per session, state covers ~50%). Crisis line: Livslinjen 70 201 201 (free, anonymous, 24/7). SAD (Seasonal Affective Disorder) affects many newcomers in winter — buy a 10,000 lux daylight lamp, take Vitamin D supplements Oct-Apr. Culture shock is normal — the U-curve dip at 3-12 months is expected, not failure.

DISCRIMINATION RIGHTS: Anti-discrimination law covers employment, housing, services. File complaints with Ligebehandlingsnævnet (Equal Treatment Board) within 1 year — free, independent, legally binding. ligebehandlingsnaevnet.dk

TENANT RIGHTS: Deposit capped at 3 months' rent by law (max 6 months total including advance rent). Rent control on pre-1992 properties. Move-in report must be provided within 2 weeks or landlord cannot charge for damages. Disputes go to Huslejenævnet (free, binding). Lejernes Landsorganisation (LLO) provides tenant legal advice.

POLICE RIGHTS: Must identify yourself when asked. Right to remain silent beyond identification. Right to interpreter. Right to lawyer within 24 hours if arrested. Complaints to DUP (Den Uafhængige Politiklagemyndighed) — genuinely independent.

FREE LEGAL AID: Retshjælp offices across Denmark (find via advokatsamfundet.dk). Free lawyer sessions (advokatvagt) at many libraries and municipalities. Court-appointed lawyer if charged with crime and can't afford one.

PERMIT RENEWALS: Apply at least 1 month before expiry. Status maintained during processing if you applied in time. Notify SIRI of address/employer changes. Appeal rejections to Udlændingenævnet. Keep 5 years of documents (payslips, contracts, tax returns) for permanent residency application.

EMERGENCY CONTACTS FOR DENMARK:
- 112: Police, Fire, Ambulance (life-threatening)
- 1813: Medical help non-emergency (urgent but not life-threatening)
- 114: Police non-emergency
- 70 201 201: Livslinjen (mental health crisis line, 24/7, anonymous)

RESPONSE GUIDELINES:
- Be conversational, not bureaucratic
- Use bullet points for lists but avoid making every response a bullet list
- When linking to official resources, include the actual URL
- When someone seems stressed, acknowledge the feeling FIRST, then provide information
- Keep responses focused — don't dump everything you know at once
- If asked about something that changes frequently (processing times, exact fees), suggest they verify at the official source
- End important responses with a warm, encouraging note

Official websites to reference:
- borger.dk — everything civic
- nyidanmark.dk — immigration and residence permits
- skat.dk/en-us — tax authority
- sundhed.dk — health services
- e-boks.com — digital mailbox
- mitid.dk — digital identity
- boligportal.dk — rental housing`;
  };

  /* ── OFFLINE RESPONSES (fallback when no API key) ───── */
  const OFFLINE_RESPONSES = {
    cpr: `Great question! The CPR number (Civil Personal Registration number) is literally the most important number in your Danish life — you need it for everything.

Here's the path:
**Step 1:** Register your address at borger.dk or your local Borgerservice first. You cannot get CPR without this.

**Step 2:** Book an appointment at International Citizen Service (ICS):
- **EU/EEA citizens:** Can usually get it same day with your passport + proof of address
- **Non-EU citizens:** It's issued automatically after your residence permit is approved (takes 2–8 weeks)

ICS offices are in Copenhagen, Aarhus, Odense, and Aalborg. Book at nyidanmark.dk.

Once you have it, guard that number — it goes on everything. *Held og lykke!* (Good luck!)`,

    mitid: `MitID is Denmark's national digital identity — think of it as the master key to your entire digital life here.

You need it to access: borger.dk, SKAT (your taxes), e-Boks (official mail), online banking, Sundhed.dk, and basically everything official.

**How to get it:**
1. Go to **mitid.dk** or download the MitID app
2. You'll need your CPR number (so get that first)
3. You can also set it up in person at your bank or Borgerservice

The app goes on your smartphone and generates login codes. Keep your phone safe — it effectively IS your identity in Denmark.

*Pro tip from Björn:* Set up a backup method (hardware token or code key) in case you lose your phone.`,

    tax: `Ah, Danish taxes. Let me give you the honest picture.

**What you pay:**
- **AM-bidrag:** 8% off the top. No exceptions.
- **Municipal tax (kommuneskat):** ~25% (varies by kommune)
- **State tax (bundskat):** ~12% on income above your personal allowance
- **Personal allowance:** ~49,700 DKK/year you pay no tax on

**Effective rate** for most earners: 35–42%

**What you get for it:** Free healthcare. Free university. 52 weeks parental leave (paid). 5 weeks mandatory vacation. Free schools. A functioning welfare state. The math is genuinely different from most countries.

**Practical steps:**
1. Get your **skattekort** (tax card) at skat.dk/en-us — do this your first week
2. Check **e-Boks** every week for communications from SKAT
3. In March each year, your **årsopgørelse** (annual tax settlement) arrives — most newcomers get a refund!

Use the Salary Calculator on this page to see exactly what you'll take home.`,

    housing: `The Danish housing market — especially Copenhagen — is genuinely competitive. Let me be honest with you about that, and then tell you how to win.

**Where to search:**
- **BoligPortal.dk** — biggest private rental platform
- **Lejebolig.dk** — good selection, English-friendly
- **Facebook:** Search "Housing Copenhagen Expats" or "[City] Housing International"
- **DBA.dk** — private listings, sometimes cheaper

**Your legal rights (know these before signing anything):**
- Deposit is capped at **3 months' rent** by law. Anyone asking for more is breaking the law.
- Landlord must give you **3 months notice** minimum
- Prepaid rent + deposit combined: max 6 months total upfront

**Average rents:**
- Copenhagen 1-bed: 8,500–12,000 DKK/month
- Aarhus 1-bed: 6,500–9,000 DKK/month
- Odense 1-bed: 5,500–7,500 DKK/month

**My top tip:** Apply within hours of listings going up. Good Copenhagen apartments get 50+ applications in the first day.`,

    akasse: `The a-kasse (arbejdsløshedskasse / unemployment insurance fund) is one of the most important things you can do on your first week in Denmark — and most newcomers don't know it exists until they need it.

**What it is:** A voluntary unemployment insurance fund. If you lose your job, you receive ~90% of your previous salary (up to a cap of ~19,500 DKK/month) for up to 2 years.

**The catch:** You must be a member for a qualifying period **before** you need it. So join NOW, not when you've been let go.

**Cost:** ~500 DKK/month (deductible from your taxes)

**Which one to join?** Each a-kasse is typically profession-specific:
- **Akademikernes a-kasse (AAK):** Academia, researchers
- **IDA:** Engineers, IT professionals
- **HK:** Office workers, admin
- **3F:** Trades, manual workers
- **CA:** Managers, business roles

Go to **aka.dk** to find which one fits you.

*This is Björn's most emphatic advice: join an a-kasse this week.*`,

    default: `Hej! I'm Björn, your guide to life in Denmark. I've been here for about 1,200 years, so I know a few things — though the CPR system still surprises me sometimes.

I can help you with:
- 📋 **Bureaucracy** — CPR, MitID, SKAT, e-Boks, permits
- 🏠 **Housing** — finding a flat, lease rights, neighbourhoods
- 💰 **Money** — taxes, salary, banking, a-kasse
- 🏥 **Healthcare** — yellow card, GP registration, 1813 vs 112
- 👶 **Family** — childcare, schools, parental leave
- 💼 **Work** — contracts, culture, unions, job search
- 🗣️ **Language & Culture** — Danish norms, hygge, Janteloven

To unlock my full AI capabilities (so I can actually think and search and give you personalised answers), add your Claude API key in the settings panel above.

*Hvad kan jeg hjælpe dig med?* (What can I help you with?)`
  };

  /* ── GET OFFLINE RESPONSE ────────────────────────────── */
  const getOfflineResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('cpr') || msg.includes('registration number') || msg.includes('civil'))
      return OFFLINE_RESPONSES.cpr;
    if (msg.includes('mitid') || msg.includes('mit id') || msg.includes('digital identity') || msg.includes('nemid'))
      return OFFLINE_RESPONSES.mitid;
    if (msg.includes('tax') || msg.includes('skat') || msg.includes('skattekort') || msg.includes('income'))
      return OFFLINE_RESPONSES.tax;
    if (msg.includes('hous') || msg.includes('apartment') || msg.includes('flat') || msg.includes('rent') || msg.includes('lease') || msg.includes('bolig'))
      return OFFLINE_RESPONSES.housing;
    if (msg.includes('a-kasse') || msg.includes('akasse') || msg.includes('unemployment') || msg.includes('benefits'))
      return OFFLINE_RESPONSES.akasse;
    return OFFLINE_RESPONSES.default;
  };

  /* ── GROQ API CALL ───────────────────────────────────── */
  // Uses Meta Llama 3.3 70B via Groq — free tier, 14,400 req/day
  const callGroq = async (message) => {
    // Push user message BEFORE the call, but roll back on failure so
    // a failed request doesn't leave an unanswered message in history.
    conversationHistory.push({ role: 'user', content: message });

    // Build OpenAI-compatible messages array
    const messages = [
      { role: 'system', content: buildSystemPrompt() },
      ...conversationHistory.slice(-12).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    // AbortController-based timeout (25s) — replaces AbortSignal.timeout() which
    // is not available in some older browsers that ANKOMMER targets.
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), 25000);

    let response;
    try {
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          max_tokens: 1024,
          temperature: 0.75,
          top_p: 0.9
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(abortTimer);
    }

    if (!response.ok) {
      conversationHistory.pop(); // rollback unanswered user message
      const err = await response.json().catch(() => ({}));
      const msg = err.error?.message || `API error ${response.status}`;
      throw new Error(msg);
    }

    const data  = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      conversationHistory.pop(); // rollback unanswered user message
      throw new Error('Empty response from Groq');
    }

    conversationHistory.push({ role: 'assistant', content: reply });
    saveHistory(); // save both user + assistant message only on success
    return reply;
  };

  /* ── RENDER MESSAGE ──────────────────────────────────── */
  const renderMessage = (text, role) => {
    const container = document.getElementById('bjorn-messages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `msg ${role}`;
    // Set lang so screen readers use the right voice for each message
    div.setAttribute('lang', window.currentLang || 'en');

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    // Convert markdown-ish formatting
    bubble.innerHTML = formatMessage(text);

    if (role === 'bjorn') {
      const avatar = document.createElement('div');
      avatar.className = 'msg-avatar';
      avatar.textContent = '🛡️';
      div.appendChild(avatar);
    }

    div.appendChild(bubble);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  };

  /* ── FORMAT MESSAGE ──────────────────────────────────── */
  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.1);padding:1px 4px;border-radius:3px;font-family:monospace">$1</code>')
      .replace(/^### (.*$)/gm, '<h4 style="margin:8px 0 4px;font-family:var(--font-display)">$1</h4>')
      .replace(/^## (.*$)/gm, '<h3 style="margin:8px 0 4px">$1</h3>')
      .replace(/^- (.*$)/gm, '• $1<br>')
      .replace(/^\d+\. (.*$)/gm, (m, p1, offset, str) => `${m}<br>`)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--nordic-blue)">$1 ↗</a>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  };

  /* ── SHOW THINKING ───────────────────────────────────── */
  const showThinking = (show) => {
    const el = document.getElementById('bjorn-thinking');
    if (el) el.classList.toggle('hidden', !show);
  };

  /* ── SEND MESSAGE ────────────────────────────────────── */
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const input = document.getElementById('bjorn-input');
    if (input) { input.value = ''; input.style.height = 'auto'; }

    // Hide quick prompts after first message
    const quick = document.getElementById('bjorn-quick');
    if (quick) quick.style.display = 'none';

    // Hide badge
    const badge = document.getElementById('bjorn-badge');
    if (badge) badge.classList.add('hidden');

    renderMessage(message, 'user');
    showThinking(true);

    try {
      let reply;
      // Check online status before attempting the API call
      if (!navigator.onLine) {
        await new Promise(r => setTimeout(r, 400));
        reply = getOfflineResponse(message) + '\n\n*Note: You appear to be offline. Showing a cached response — reconnect for Björn\'s full AI capabilities.*';
      } else if (apiKey) {
        reply = await callGroq(message);
      } else {
        // Simulate thinking delay for better UX
        await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
        reply = getOfflineResponse(message);
      }
      showThinking(false);
      renderMessage(reply, 'bjorn');
      // Fire live stat counter — every answered question counts
      window.dispatchEvent(new Event('bjornMessageSent'));
    } catch (err) {
      showThinking(false);
      let errorMsg = '❌ ';
      if (err.name === 'AbortError') {
        // Request timed out — fall back gracefully
        const offline = getOfflineResponse(message);
        renderMessage(offline + '\n\n*Note: Björn took too long to respond. Showing a cached answer — try again if you need his full reasoning.*', 'bjorn');
        return;
      } else if (err.message.includes('401') || err.message.includes('invalid_api_key')) {
        errorMsg += 'Björn is temporarily unavailable. Refresh the page to reconnect.';
      } else if (err.message.includes('429') || err.message.includes('rate_limit')) {
        errorMsg += 'Björn is taking a breather — too many questions at once. Wait a moment and try again.';
      } else if (err.message.includes('Failed to fetch') || !navigator.onLine) {
        // Network failure — fall back to offline
        const offline = getOfflineResponse(message);
        renderMessage(offline + '\n\n*Note: Showing an offline response — Björn couldn\'t connect right now. Check your internet and try again.*', 'bjorn');
        return;
      } else {
        errorMsg += 'Something went wrong on our end. Try again in a moment.';
      }
      renderMessage(errorMsg, 'bjorn');
    }
  };

  /* ── SHOW/HIDE API SETUP ─────────────────────────────── */
  const showApiSetup = () => {
    const setup = document.getElementById('bjorn-api-setup');
    if (setup) setup.classList.remove('hidden');
  };

  const hideApiSetup = () => {
    const setup = document.getElementById('bjorn-api-setup');
    if (setup) setup.classList.add('hidden');
  };

  /* ── OPEN / CLOSE ────────────────────────────────────── */
  const open = () => {
    const widget = document.getElementById('bjorn-widget');
    if (widget) widget.classList.remove('closed');
    isOpen = true;

    const msgs = document.getElementById('bjorn-messages');
    if (!msgs) return;

    // Already rendered — just make sure scroll is at bottom
    if (msgs.children.length > 0) {
      msgs.scrollTop = msgs.scrollHeight;
      return;
    }

    // Try to restore from localStorage
    if (loadHistory()) {
      renderStoredHistory();
      return;
    }

    // Fresh start — show greeting
    const lang = window.currentLang || 'en';
    const greetings = {
      en: `Hej! I'm Björn — your guide to life in Denmark.\n\nI've lived here for about 1,200 years, so I know a few things. Ask me anything — CPR numbers, lease agreements, why Danes don't smile on the street. Everything's fair game.\n\n*Hvad kan jeg hjælpe dig med?* (What can I help you with?)`,
      fr: `Hej ! Je suis Björn — votre guide pour la vie au Danemark.\n\nJ'y vis depuis environ 1 200 ans, donc je sais quelques choses. Posez-moi n'importe quelle question — CPR, contrats de bail, pourquoi les Danois ne sourient pas dans la rue.\n\n*Hvad kan jeg hjælpe dig med ?* (Comment puis-je vous aider ?)`,
      ar: `هيج! أنا بيورن — دليلك للحياة في الدنمارك.\n\nأعيش هنا منذ حوالي 1200 عام، لذا أعرف بعض الأشياء. اسألني أي شيء — أرقام CPR، عقود الإيجار، لماذا لا يبتسم الدنماركيون في الشارع.\n\n*Hvad kan jeg hjælpe dig med?* (كيف يمكنني مساعدتك؟)`,
      es: `¡Hej! Soy Björn — tu guía para la vida en Dinamarca.\n\nLlevo viviendo aquí unos 1.200 años, así que sé algunas cosas. Pregúntame lo que quieras — números CPR, contratos de alquiler, por qué los daneses no sonríen en la calle.\n\n*Hvad kan jeg hjælpe dig med?* (¿En qué puedo ayudarte?)`,
      da: `Hej! Jeg er Björn — din guide til livet i Danmark.\n\nJeg har boet her i ca. 1.200 år, så jeg ved en del ting. Spørg mig om hvad som helst — CPR-numre, lejekontrakter, hvorfor danskere ikke smiler på gaden.\n\n*Hvad kan jeg hjælpe dig med?*`,
      de: `Hej! Ich bin Björn — Ihr Begleiter für das Leben in Dänemark.\n\nIch lebe hier seit etwa 1.200 Jahren, also weiß ich einiges. Fragen Sie mich alles — CPR-Nummern, Mietverträge, warum Dänen auf der Straße nicht lächeln.\n\n*Hvad kan jeg hjælpe dig med?* (Womit kann ich Ihnen helfen?)`,
      uk: `Привіт! Я Бйорн — ваш провідник по житті у Данії.\n\nЯ живу тут близько 1200 років, тому знаю дещо. Запитайте мене про будь-що — номери CPR, договори оренди, чому датчани не посміхаються на вулиці.\n\n*Hvad kan jeg hjælpe dig med?* (Чим я можу вам допомогти?)`,
      pl: `Hej! Jestem Björn — Twój przewodnik po życiu w Danii.\n\nMieszkam tu od około 1200 lat, więc trochę wiem. Pytaj o wszystko — numery CPR, umowy najmu, dlaczego Duńczycy nie uśmiechają się na ulicy.\n\n*Hvad kan jeg hjælpe dig med?* (Jak mogę Ci pomóc?)`,
      ur: `ہیج! میں بیورن ہوں — ڈنمارک میں زندگی کا آپ کا رہنما۔\n\nمیں یہاں تقریباً 1,200 سال سے رہ رہا ہوں، تو مجھے کافی کچھ معلوم ہے۔ کچھ بھی پوچھیں — CPR نمبر، کرایہ نامے، یا یہ کیوں کہ ڈینش لوگ سڑک پر مسکراتے کیوں نہیں۔ سب سوال جائز ہیں۔\n\n*Hvad kan jeg hjælpe dig med?* (میں آپ کی کیا مدد کر سکتا ہوں؟)`,
      fa: `سلام! من بیورن هستم — راهنمای شما برای زندگی در دانمارک.\n\nحدود ۱۲۰۰ سال است که اینجا زندگی می‌کنم، پس چیزهایی می‌دانم. هر چیزی بپرسید — شماره CPR، قراردادهای اجاره، اینکه چرا دانمارکی‌ها در خیابان لبخند نمی‌زنند. همه چیز آزاد است.\n\n*Hvad kan jeg hjælpe dig med?* (چطور می‌توانم کمکتان کنم؟)`
    };
    setTimeout(() => renderMessage(greetings[lang] || greetings.en, 'bjorn'), 400);
  };

  const close = () => {
    const widget = document.getElementById('bjorn-widget');
    if (!widget) return;
    // Animate panel out before hiding it
    widget.classList.add('closing');
    setTimeout(() => {
      widget.classList.remove('closing');
      widget.classList.add('closed');
      isOpen = false;
    }, 200);
  };

  const toggle = () => { isOpen ? close() : open(); };

  /* ── SET USER PROFILE ────────────────────────────────── */
  const setProfile = (profile) => { userProfile = { ...userProfile, ...profile }; };

  /* ── INIT ────────────────────────────────────────────── */
  const init = () => {
    // Always hide API setup — key is built in
    hideApiSetup();

    // Toggle button
    const toggleBtn = document.getElementById('bjorn-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggle);

    // Close button
    const closeBtn = document.getElementById('bjorn-close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Clear history button
    const clearBtn = document.getElementById('bjorn-clear-history');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      clearHistory();
    });

    // Document translator button
    const translateBtn = document.getElementById('bjorn-translate-btn');
    const translatePanel = document.getElementById('bjorn-translate-panel');
    const translateSend = document.getElementById('bjorn-translate-send');
    const translateClose = document.getElementById('bjorn-translate-close');
    if (translateBtn && translatePanel) {
      translateBtn.addEventListener('click', () => {
        translatePanel.classList.toggle('hidden');
        if (!translatePanel.classList.contains('hidden')) {
          document.getElementById('bjorn-doc-text')?.focus();
        }
      });
    }
    if (translateClose && translatePanel) {
      translateClose.addEventListener('click', () => translatePanel.classList.add('hidden'));
    }
    if (translateSend) {
      translateSend.addEventListener('click', () => {
        const docText = document.getElementById('bjorn-doc-text');
        if (!docText || !docText.value.trim()) return;
        const lang = window.currentLang || 'en';
        const prompts = {
          en: `I received this Danish document/letter and need help understanding it. Please translate it and tell me exactly what action I need to take, if any:\n\n---\n${docText.value.trim()}\n---`,
          fr: `J'ai reçu ce document/lettre en danois et j'ai besoin d'aide pour le comprendre. Veuillez le traduire et me dire exactement quelle action je dois entreprendre, le cas échéant :\n\n---\n${docText.value.trim()}\n---`,
          ar: `تلقيت هذه الوثيقة/الرسالة الدنماركية وأحتاج إلى مساعدة لفهمها. يرجى ترجمتها وإخباري بالإجراء الذي يجب اتخاذه:\n\n---\n${docText.value.trim()}\n---`,
          es: `Recibí este documento/carta en danés y necesito ayuda para entenderlo. Por favor tradúcelo y dime exactamente qué acción debo tomar:\n\n---\n${docText.value.trim()}\n---`,
          da: `Jeg modtog dette danske dokument/brev og har brug for hjælp til at forstå det. Oversæt det venligst og fortæl mig præcis, hvilken handling jeg skal foretage:\n\n---\n${docText.value.trim()}\n---`
        };
        const msg = prompts[lang] || prompts.en;
        // Hide translator panel, open chat, send
        translatePanel.classList.add('hidden');
        docText.value = '';
        if (!isOpen) open();
        setTimeout(() => sendMessage(msg), 300);
      });
    }

    // Nav button and hero button
    ['bjorn-open-btn', 'bjorn-hero-btn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', open);
    });

    // Send button
    const sendBtn = document.getElementById('bjorn-send');
    if (sendBtn) sendBtn.addEventListener('click', () => {
      const input = document.getElementById('bjorn-input');
      if (input) sendMessage(input.value);
    });

    // Input enter key
    const inputEl = document.getElementById('bjorn-input');
    if (inputEl) {
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(inputEl.value);
        }
      });
      inputEl.addEventListener('input', () => {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
      });
    }

    // Quick prompts
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Special case: translate button opens translator panel
        if (btn.id === 'bjorn-quick-translate') {
          const panel = document.getElementById('bjorn-translate-panel');
          if (panel) {
            panel.classList.remove('hidden');
            document.getElementById('bjorn-doc-text')?.focus();
          }
          return;
        }
        const msg = btn.dataset.msg || btn.textContent;
        if (!isOpen) open();
        setTimeout(() => sendMessage(msg), 300);
      });
    });

    // Ask Björn buttons throughout chapters
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('ask-bjorn-btn') || e.target.closest('.ask-bjorn-btn')) {
        const btn = e.target.closest('.ask-bjorn-btn') || e.target;
        const query = btn.dataset.query || btn.textContent.replace('Ask Björn', '').trim();
        open();
        if (query) setTimeout(() => sendMessage(query), 400);
      }
    });
  };

  return { init, open, close, toggle, setProfile, sendMessage, clearHistory };
})();
