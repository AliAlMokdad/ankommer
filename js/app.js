/* ═══════════════════════════════════════════════════════
   ANKOMMER — Main Application
   Atmosphere · Wizard · Chapters · i18n · Gamification
═══════════════════════════════════════════════════════ */

/* ── GLOBAL LANG ───────────────────────────────────── */
// Auto-detect from browser locale on first visit; fall back to English.
// localStorage is wrapped in try/catch — Safari private mode and some
// privacy-locked browsers throw `SecurityError` on any access, which
// would otherwise crash the entire boot.
const _SUPPORTED_LANGS = ['en','fr','ar','es','da','de','uk','pl','ur','fa'];
const _detectedLang = navigator.language?.slice(0,2).toLowerCase();
let _savedLang = null;
try { _savedLang = localStorage.getItem('ankommer_lang'); } catch (_) { /* private mode */ }
// `?lang=xx` overrides everything else — supports deep-links from hreflang
// alternates and shareable URLs like /ankommer/?lang=ar
const _urlLang = (() => {
  try {
    const v = new URLSearchParams(location.search).get('lang')?.toLowerCase();
    return v && _SUPPORTED_LANGS.includes(v) ? v : null;
  } catch (_) { return null; }
})();
window.currentLang = _urlLang || _savedLang
  || (_SUPPORTED_LANGS.includes(_detectedLang) ? _detectedLang : 'en');

// Sync <html lang/dir> immediately so screen readers + RTL work from first paint
document.documentElement.setAttribute('lang', window.currentLang);
document.documentElement.setAttribute('dir', ['ar','ur','fa'].includes(window.currentLang) ? 'rtl' : 'ltr');

/* ── UI TRANSLATIONS ───────────────────────────────── */
const UI_T = {
  yourChecklist: { en:'Your Checklist', fr:'Votre Liste de Tâches', ar:'قائمة مهامك', es:'Tu Lista de Tareas', da:'Din Tjekliste', ur:'آپ کی چیک لسٹ', fa:'چک‌لیست شما' },
  tasksComplete: { en:(d,t)=>`${d} of ${t} tasks complete`, fr:(d,t)=>`${d} sur ${t} tâches terminées`, ar:(d,t)=>`${d} من ${t} مهام مكتملة`, es:(d,t)=>`${d} de ${t} tareas completas`, da:(d,t)=>`${d} af ${t} opgaver fuldført`, ur:(d,t)=>`${t} میں سے ${d} کام مکمل`, fa:(d,t)=>`${d} از ${t} وظیفه انجام شد` },
  complete:      { en:'✅ Complete!', fr:'✅ Terminé!', ar:'✅ مكتمل!', es:'✅ ¡Completo!', da:'✅ Færdig!', ur:'✅ مکمل!', fa:'✅ کامل شد!' },
  readTime:      { en:(t)=>`⏱ ${t} read`, fr:(t)=>`⏱ ${t} de lecture`, ar:(t)=>`⏱ ${t} للقراءة`, es:(t)=>`⏱ ${t} de lectura`, da:(t)=>`⏱ ${t} læsning`, ur:(t)=>`⏱ ${t} مطالعہ`, fa:(t)=>`⏱ ${t} مطالعه` },
  tasks:         { en:'tasks', fr:'tâches', ar:'مهام', es:'tareas', da:'opgaver', ur:'کام', fa:'وظایف' },
  bjornSays:     { en:'Björn says:', fr:'Björn dit :', ar:'يقول بيورن:', es:'Björn dice:', da:'Björn siger:', ur:'بیورن کہتا ہے:', fa:'بیورن می‌گوید:' },
  askBjorn:      { en:(t)=>`🛡️ Ask Björn about ${t}`, fr:(t)=>`🛡️ Demander à Björn sur ${t}`, ar:(t)=>`🛡️ اسأل بيورن عن ${t}`, es:(t)=>`🛡️ Preguntar a Björn sobre ${t}`, da:(t)=>`🛡️ Spørg Björn om ${t}`, ur:(t)=>`🛡️ ${t} کے بارے میں بیورن سے پوچھیں`, fa:(t)=>`🛡️ از بیورن درباره ${t} بپرسید` },
  askBjornCh:    { en:'🛡️ Ask Björn about this chapter', fr:'🛡️ Demander à Björn sur ce chapitre', ar:'🛡️ اسأل بيورن عن هذا الفصل', es:'🛡️ Preguntar a Björn sobre este capítulo', da:'🛡️ Spørg Björn om dette kapitel', ur:'🛡️ اس باب کے بارے میں بیورن سے پوچھیں', fa:'🛡️ از بیورن درباره این فصل بپرسید' },
  chapterWord:   { en:'Chapter', fr:'Chapitre', ar:'فصل', es:'Capítulo', da:'Kapitel', ur:'باب', fa:'فصل' },
  comingSoonTitle:{ en:'Full content coming soon', fr:'Contenu complet bientôt disponible', ar:'المحتوى الكامل قريباً', es:'Contenido completo próximamente', da:'Fuldt indhold kommer snart', ur:'مکمل مواد جلد آ رہا ہے', fa:'محتوای کامل به زودی می‌آید' },
  comingSoonBody: { en:'This chapter is being researched and written to our ultra-high standard. In the meantime, Björn can answer any questions about this topic.', fr:'Ce chapitre est en cours de recherche et de rédaction selon nos normes les plus élevées. En attendant, Björn peut répondre à vos questions sur ce sujet.', ar:'يتم حالياً البحث في هذا الفصل وكتابته وفق أعلى معاييرنا. في هذه الأثناء، يمكن لبيورن الإجابة على أي أسئلة حول هذا الموضوع.', es:'Este capítulo está siendo investigado y redactado según nuestros más altos estándares. Mientras tanto, Björn puede responder cualquier pregunta sobre este tema.', da:'Dette kapitel er ved at blive undersøgt og skrevet til vores højeste standard. I mellemtiden kan Björn besvare spørgsmål om dette emne.', ur:'اس باب پر ہمارے اعلیٰ معیار کے مطابق تحقیق اور تحریر جاری ہے۔ اس دوران، بیورن اس موضوع کے کسی بھی سوال کا جواب دے سکتا ہے۔', fa:'این فصل در حال تحقیق و نگارش با بالاترین استانداردهای ما است. در این میان، بیورن می‌تواند هر سوالی درباره این موضوع را پاسخ دهد.' },
  // Roadmap strip
  roadmapTitle: { en:(c)=>`Your Denmark Roadmap — ${c}`, fr:(c)=>`Votre Feuille de Route — ${c}`, ar:(c)=>`خارطة طريقك — ${c}`, es:(c)=>`Tu Hoja de Ruta — ${c}`, da:(c)=>`Din Danmarksplan — ${c}`, ur:(c)=>`ڈنمارک کا آپ کا روڈ میپ — ${c}`, fa:(c)=>`نقشه راه دانمارک شما — ${c}` },
  roadmapSub:   { en:(r)=>`Here for ${r} · Your top priorities`, fr:(r)=>`Ici pour ${r} · Vos priorités`, ar:(r)=>`هنا من أجل ${r} · أولوياتك`, es:(r)=>`Aquí para ${r} · Tus prioridades`, da:(r)=>`Her for ${r} · Dine prioriteter`, ur:(r)=>`${r} کے لیے یہاں · آپ کی اولین ترجیحات`, fa:(r)=>`اینجا برای ${r} · اولویت‌های شما` },
  roadmapUpdate:{ en:'✏️ Update', fr:'✏️ Modifier', ar:'✏️ تعديل', es:'✏️ Actualizar', da:'✏️ Opdater', ur:'✏️ اپ ڈیٹ', fa:'✏️ به‌روزرسانی' },
  // Roadmap priority chip labels
  prio_cpr:    { en:'Register address & get CPR', fr:'Adresse & CPR', ar:'التسجيل والـ CPR', es:'Dirección & CPR', da:'Adresse & CPR', ur:'پتہ رجسٹر کریں اور CPR حاصل کریں', fa:'ثبت آدرس و دریافت CPR' },
  prio_tax:    { en:'Get skattekort & NemKonto', fr:'Skattekort & NemKonto', ar:'Skattekort و NemKonto', es:'Skattekort & NemKonto', da:'Skattekort & NemKonto', ur:'Skattekort اور NemKonto حاصل کریں', fa:'دریافت Skattekort و NemKonto' },
  prio_akasse: { en:"Join a-kasse (don't wait!)", fr:"A-kasse (n'attendez pas!)", ar:"انضم لـ a-kasse الآن!", es:"Unirse a a-kasse (¡ya!)", da:"Tilmeld a-kasse (vent ikke!)", ur:"a-kasse میں شامل ہوں (انتظار نہ کریں!)", fa:"عضویت a-kasse (صبر نکنید!)" },
  prio_su:     { en:'Apply for SU grant', fr:'Demander la bourse SU', ar:'التقدم لمنحة SU', es:'Solicitar beca SU', da:'Ansøg om SU', ur:'SU گرانٹ کے لیے درخواست دیں', fa:'درخواست بورسیه SU' },
  prio_cvr:    { en:'Register CVR number', fr:'Numéro CVR', ar:'رقم CVR', es:'Número CVR', da:'CVR-nummer', ur:'CVR نمبر رجسٹر کریں', fa:'ثبت شماره CVR' },
  prio_child:  { en:'Apply for childcare (waitlist!)', fr:'Crèche (liste d\'attente!)', ar:'الحضانة (قائمة انتظار!)', es:'Guardería (¡lista espera!)', da:'Daginstitution (venteliste!)', ur:'بچوں کی دیکھ بھال کے لیے درخواست دیں (ویٹ لسٹ!)', fa:'درخواست مراقبت از کودک (لیست انتظار!)' },
  prio_health: { en:'Join Sygeforsikring "denmark"', fr:'Sygeforsikring "denmark"', ar:'Sygeforsikring "denmark"', es:'Sygeforsikring "denmark"', da:'Sygeforsikring "denmark"', ur:'Sygeforsikring "denmark" میں شامل ہوں', fa:'عضویت Sygeforsikring "denmark"' },
  prio_housing:{ en:'Find your housing', fr:'Trouver votre logement', ar:'ابحث عن مسكنك', es:'Encontrar tu vivienda', da:'Find din bolig', ur:'اپنی رہائش تلاش کریں', fa:'یافتن مسکن' },
  // Roadmap reason labels
  reason_work:   { en:'work', fr:'le travail', ar:'العمل', es:'trabajo', da:'arbejde', ur:'کام', fa:'کار' },
  reason_study:  { en:'study', fr:'les études', ar:'الدراسة', es:'estudios', da:'studier', ur:'تعلیم', fa:'تحصیل' },
  reason_love:   { en:'family', fr:'la famille', ar:'العائلة', es:'familia', da:'familie', ur:'خاندان', fa:'خانواده' },
  reason_startup:{ en:'a startup', fr:'une startup', ar:'مشروعك', es:'un startup', da:'en startup', ur:'ایک اسٹارٹ اپ', fa:'یک استارتاپ' },
  reason_nomad:  { en:'remote work', fr:'le télétravail', ar:'العمل عن بُعد', es:'trabajo remoto', da:'fjernarbejde', ur:'ریموٹ کام', fa:'کار از راه دور' },
  reason_asylum: { en:'a new start', fr:'un nouveau départ', ar:'بداية جديدة', es:'un nuevo comienzo', da:'en ny start', ur:'ایک نئی شروعات', fa:'یک شروع تازه' },
  continueJourney:    { en:'Continue My Journey →', fr:'Continuer mon parcours →', ar:'← متابعة رحلتي', es:'Continuar mi viaje →', da:'Fortsæt min rejse →', ur:'← میرا سفر جاری رکھیں', fa:'← ادامه سفرم' },
  actionPlanHeading:  { en:'✦ Your personalised action plan', fr:'✦ Votre plan d\'action personnalisé', ar:'✦ خطتك الشخصية', es:'✦ Tu plan de acción personalizado', da:'✦ Din personlige handlingsplan', ur:'✦ آپ کا ذاتی ایکشن پلان', fa:'✦ برنامه عمل شخصی شما' },
  openChapterLink:    { en:(c)=>`→ Open ${c}`, fr:(c)=>`→ Ouvrir ${c}`, ar:(c)=>`→ افتح ${c}`, es:(c)=>`→ Abrir ${c}`, da:(c)=>`→ Åbn ${c}`, ur:(c)=>`← ${c} کھولیں`, fa:(c)=>`← باز کردن ${c}` },
  xpEarnedProfile:    { en:'✦ +100 Viking Points earned for completing your profile', fr:'✦ +100 Points Viking gagnés pour avoir complété votre profil', ar:'✦ +100 نقطة فايكنج للحصول عليها بإكمال ملفك الشخصي', es:'✦ +100 Puntos Vikingo ganados por completar tu perfil', da:'✦ +100 Vikingpoint optjent for at færdiggøre din profil', ur:'✦ پروفائل مکمل کرنے پر +100 وائیکنگ پوائنٹس', fa:'✦ +100 امتیاز وایکینگ برای تکمیل پروفایل' },
  wizStep:            { en:(s,t)=>`Step ${s} of ${t}`, fr:(s,t)=>`Étape ${s} sur ${t}`, ar:(s,t)=>`خطوة ${s} من ${t}`, es:(s,t)=>`Paso ${s} de ${t}`, da:(s,t)=>`Trin ${s} af ${t}`, ur:(s,t)=>`${t} میں سے ${s} قدم`, fa:(s,t)=>`مرحله ${s} از ${t}` },
  wizPct:             { en:(p)=>`${p}% complete`, fr:(p)=>`${p}% terminé`, ar:(p)=>`${p}% مكتمل`, es:(p)=>`${p}% completado`, da:(p)=>`${p}% fuldført`, ur:(p)=>`${p}% مکمل`, fa:(p)=>`${p}% کامل` },
  wizNoneSelected:    { en:'None selected yet', fr:'Rien sélectionné', ar:'لم تُحدَّد خيارات بعد', es:'Ninguno seleccionado', da:'Intet valgt endnu', ur:'ابھی کچھ منتخب نہیں', fa:'هنوز چیزی انتخاب نشده' },
  wizSelected:        { en:(n)=>`${n} selected`, fr:(n)=>`${n} sélectionné(s)`, ar:(n)=>`${n} محدد`, es:(n)=>`${n} seleccionado(s)`, da:(n)=>`${n} valgt`, ur:(n)=>`${n} منتخب`, fa:(n)=>`${n} انتخاب شد` },
  wizContinue:        { en:(n)=>`Continue${n > 0 ? ` (${n})` : ''} →`, fr:(n)=>`Continuer${n > 0 ? ` (${n})` : ''} →`, ar:(n)=>`← متابعة${n > 0 ? ` (${n})` : ''}`, es:(n)=>`Continuar${n > 0 ? ` (${n})` : ''} →`, da:(n)=>`Fortsæt${n > 0 ? ` (${n})` : ''} →`, ur:(n)=>`← جاری رکھیں${n > 0 ? ` (${n})` : ''}`, fa:(n)=>`← ادامه${n > 0 ? ` (${n})` : ''}` },
  searchHint:      { en:'Search chapters, topics, tasks — try "CPR", "a-kasse", "dental", "tax card"…', fr:'Rechercher chapitres, sujets, tâches — essayez « CPR », « a-kasse », « logement »…', ar:'ابحث في الفصول، الموضوعات، المهام — جرّب "CPR"، "a-kasse"، "سكن"…', es:'Busca capítulos, temas, tareas — prueba "CPR", "a-kasse", "vivienda"…', da:'Søg i kapitler, emner, opgaver — prøv "CPR", "a-kasse", "bolig"…', ur:'ابواب، موضوعات، کام تلاش کریں — "CPR"، "a-kasse"، "رہائش" آزمائیں…', fa:'جستجوی فصل‌ها، موضوعات، وظایف — "CPR"، "a-kasse"، "مسکن" را امتحان کنید…' },
  searchNoResults: { en:(q)=>`No results for "${q}" — try different keywords`, fr:(q)=>`Aucun résultat pour « ${q} » — essayez d'autres mots-clés`, ar:(q)=>`لا نتائج لـ "${q}" — جرّب كلمات مختلفة`, es:(q)=>`Sin resultados para "${q}" — prueba otras palabras`, da:(q)=>`Ingen resultater for "${q}" — prøv andre søgeord`, ur:(q)=>`"${q}" کے لیے کوئی نتیجہ نہیں — مختلف الفاظ آزمائیں`, fa:(q)=>`نتیجه‌ای برای "${q}" پیدا نشد — کلمات دیگری امتحان کنید` },
  searchTypeChapter:{ en:'Chapter', fr:'Chapitre', ar:'فصل', es:'Capítulo', da:'Kapitel', ur:'باب', fa:'فصل' },
  searchTypeTopic:  { en:'Topic', fr:'Sujet', ar:'موضوع', es:'Tema', da:'Emne', ur:'موضوع', fa:'موضوع' },
  searchTypeTask:   { en:'Task', fr:'Tâche', ar:'مهمة', es:'Tarea', da:'Opgave', ur:'کام', fa:'وظیفه' },
};
const t_ = (key, lang, ...args) => {
  const val = UI_T[key]?.[lang] || UI_T[key]?.en;
  return typeof val === 'function' ? val(...args) : (val || '');
};

/* ── SAFE STORAGE HELPERS ──────────────────────────── */
// Guards against corrupted/tampered localStorage values crashing the app
const safeParseJSON = (str, fallback) => {
  try { const r = JSON.parse(str); return r ?? fallback; } catch (e) { return fallback; }
};
const safeGetJSON = (key, fallback) =>
  safeParseJSON(safeGetItem(key), fallback);

// Guards against localStorage quota exceeded errors
const safeSetItem = (key, value) => {
  try { localStorage.setItem(key, value); } catch (e) { /* quota exceeded — silently skip */ }
};

// Safari private mode + disabled-storage browsers throw on read too —
// every direct localStorage read in this file goes through this helper now
const safeGetItem = (key, fallback = null) => {
  try { return localStorage.getItem(key) ?? fallback; } catch (e) { return fallback; }
};

/* ══════════════════════════════════════════════════════
   PROGRESS EXPORT / IMPORT
   ──────────────────────────────────────────────────────
   localStorage gets wiped when users clear their browser, switch
   devices, or use private mode. This lets them download a JSON
   file ("ankommer-plan.json") and re-import it elsewhere.
   No backend, no account, no cost.
══════════════════════════════════════════════════════ */
const PROGRESS_KEYS = [
  'ankommer_lang', 'ankommer_theme', 'ankommer_xp',
  'ankommer_tasks', 'ankommer_wizard', 'ankommer_profile',
  'ankommer_roadmap_profile', 'ankommer_roadmap_dismissed',
  'ankommer_pwa_dismissed', 'ankommer_last_visit'
];

const ProgressIO = {
  // Build a portable snapshot of every ankommer_* localStorage entry
  exportAll: () => {
    const data = {};
    PROGRESS_KEYS.forEach(k => {
      const v = safeGetItem(k);
      if (v !== null && v !== undefined) data[k] = v;
    });
    return {
      ankommer_export: 1,                       // file format version
      exportedAt: new Date().toISOString(),
      lang: window.currentLang || 'en',
      data
    };
  },

  // Trigger a browser download of the snapshot
  download: () => {
    const payload = ProgressIO.exportAll();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `ankommer-plan-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  // Read a user-supplied file and merge it into localStorage.
  // Keys that already have a non-empty value are NOT overwritten unless
  // `overwrite` is true — protects users from accidental data loss when
  // they upload an older export onto a more recent state.
  importFile: (file, { overwrite = false } = {}) => new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    if (file.size > 1_000_000) return reject(new Error('File too large (max 1 MB)'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        if (!json || json.ankommer_export !== 1 || !json.data) {
          return reject(new Error('Not a valid ANKOMMER export'));
        }
        let restored = 0, skipped = 0;
        Object.entries(json.data).forEach(([k, v]) => {
          if (!PROGRESS_KEYS.includes(k)) return;            // ignore unknown keys
          if (typeof v !== 'string') return;                  // safety: must be string
          const existing = safeGetItem(k);
          if (existing && !overwrite) { skipped++; return; }
          safeSetItem(k, v);
          restored++;
        });
        resolve({ restored, skipped, exportedAt: json.exportedAt });
      } catch (e) {
        reject(new Error('File is not valid JSON'));
      }
    };
    reader.readAsText(file);
  })
};

// Expose for inline UI handlers and DevTools
window.ProgressIO = ProgressIO;

// UI wiring for the footer Save / Restore buttons
const initProgressIO = () => {
  const exportBtn = document.getElementById('progress-export-btn');
  const importBtn = document.getElementById('progress-import-btn');
  const fileInput = document.getElementById('progress-import-file');

  exportBtn?.addEventListener('click', () => {
    try {
      ProgressIO.download();
      // Cheap visible confirmation — no toast component needed
      const orig = exportBtn.textContent;
      exportBtn.textContent = '✓ ' + (i18n.t('footer_progress_done') || 'Saved');
      setTimeout(() => { exportBtn.textContent = orig; }, 2000);
    } catch (e) {
      console.warn('Export failed:', e);
      alert((i18n.t('footer_progress_export_err') || 'Could not save your plan') + ': ' + e.message);
    }
  });

  importBtn?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // Ask before overwriting an active session
      const hasState = !!safeGetItem('ankommer_xp') || !!safeGetItem('ankommer_tasks');
      const overwrite = hasState
        ? confirm(i18n.t('footer_progress_confirm') ||
                  'Restoring will overwrite your current plan. Continue?')
        : true;
      if (!overwrite) { e.target.value = ''; return; }

      const result = await ProgressIO.importFile(file, { overwrite: true });
      const msg = (i18n.t('footer_progress_restored') || 'Restored {n} items')
                    .replace('{n}', result.restored);
      alert(msg);
      window.location.reload();
    } catch (err) {
      console.warn('Import failed:', err);
      alert((i18n.t('footer_progress_import_err') || 'Could not read that file') + ': ' + err.message);
      e.target.value = '';
    }
  });
};

/* ── APP STATE ─────────────────────────────────────── */
const AppState = {
  xp: (() => { const n = parseInt(safeGetItem('ankommer_xp', '0'), 10); return Number.isFinite(n) ? n : 0; })(),
  completedTasks: safeGetJSON('ankommer_tasks', {}),
  currentChapter: null,
  wizardDone: !!safeGetItem('ankommer_wizard'),
  profile: safeGetJSON('ankommer_profile', {}),
};

/* ══════════════════════════════════════════════════════
   FOCUS TRAP — accessibility for modals/dialogs
   Returns a handler obj: { activate(triggerEl), deactivate() }
   - Tab/Shift+Tab cycles focus inside `container`
   - Escape calls onEscape() if provided
   - Restores focus to the element that opened the modal
══════════════════════════════════════════════════════ */
const FocusTrap = (container, { onEscape } = {}) => {
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;
  let keyHandler = null;

  const getFocusable = () =>
    [...container.querySelectorAll(FOCUSABLE)].filter(el =>
      !el.hasAttribute('hidden') && el.offsetParent !== null
    );

  return {
    activate: (triggerEl) => {
      lastFocused = triggerEl || document.activeElement;
      keyHandler = (e) => {
        if (e.key === 'Escape' && onEscape) {
          e.preventDefault();
          onEscape();
          return;
        }
        if (e.key !== 'Tab') return;
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last  = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      };
      container.addEventListener('keydown', keyHandler);
    },
    deactivate: () => {
      if (keyHandler) container.removeEventListener('keydown', keyHandler);
      keyHandler = null;
      // Restore focus to whatever opened us
      try { lastFocused?.focus({ preventScroll: true }); } catch (_) {}
      lastFocused = null;
    }
  };
};

// Expose so bjorn.js (separate file) can use it
window.FocusTrap = FocusTrap;

/* ── XP RANKS ──────────────────────────────────────── */
const XP_RANKS = [
  { min:0,    label:'Nybegynder',       en:'Newcomer' },
  { min:100,  label:'Indvandrer',       en:'Settler' },
  { min:300,  label:'Bosiddende',       en:'Resident' },
  { min:600,  label:'Dansker i Sjælen', en:'Dane at Heart' },
];

/* ══════════════════════════════════════════════════════
   i18n — TRANSLATION ENGINE
══════════════════════════════════════════════════════ */
const i18n = {
  t: (key) => {
    const lang = window.currentLang || 'en';
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['en'][key] || key;
  },
  applyAll: () => {
    const lang = window.currentLang || 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = ['ar','ur','fa'].includes(lang) ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = i18n.t(key);
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const val = i18n.t(key);
      if (val) el.placeholder = val;
    });
  },
  setLang: (lang) => {
    window.currentLang = lang;
    safeSetItem('ankommer_lang', lang);

    // Update html[lang] and html[dir] for screen readers + RTL
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', ['ar','ur','fa'].includes(lang) ? 'rtl' : 'ltr');

    document.querySelectorAll('.lang-btn').forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    i18n.applyAll();
    if (AppState.currentChapter !== null) renderChapter(AppState.currentChapter);
    renderChaptersPreview();
    RoadmapStrip.refresh();
    updateDailyFeed();
    window.dispatchEvent(new CustomEvent('langChange', { detail: lang }));
  }
};

/* ══════════════════════════════════════════════════════
   ATMOSPHERE — Time of Day · Season · Rain
══════════════════════════════════════════════════════ */
const Atmosphere = {
  // Internal: live animation token so we can swap effects when weather changes
  _rafToken: null,
  _resizeBound: null,
  _condition: 'cloudy',

  init: () => {
    Atmosphere.setTimeOfDay();
    Atmosphere.setSeason();
    Atmosphere.generateStars();
    setInterval(Atmosphere.setTimeOfDay, 60 * 1000);
    // Kick off the weather-driven atmosphere. Show light rain immediately
    // so there's something during the network round-trip; swap to the real
    // condition once Copenhagen's weather is back.
    Atmosphere.applyEffect('rain', 60); // small drop count while loading
    Atmosphere.fetchWeather();
    // Re-fetch every 30 minutes so a sunny morning becomes a wet afternoon
    // without needing a reload.
    setInterval(Atmosphere.fetchWeather, 30 * 60 * 1000);
  },

  setTimeOfDay: () => {
    const h = new Date().getHours();
    let time = 'night';
    if (h >= 6  && h < 10) time = 'morning';
    else if (h >= 10 && h < 17) time = 'day';
    else if (h >= 17 && h < 21) time = 'evening';
    document.documentElement.setAttribute('data-time', time);
  },

  setSeason: () => {
    const m = new Date().getMonth() + 1;
    let season = 'winter';
    if (m >= 3 && m <= 5)  season = 'spring';
    else if (m >= 6 && m <= 8)  season = 'summer';
    else if (m >= 9 && m <= 11) season = 'autumn';
    document.documentElement.setAttribute('data-season', season);
  },

  // Open-Meteo current weather for Copenhagen — free, no key, supports CORS.
  // Falls back to "cloudy" silently on any failure so we never hang the UI.
  fetchWeather: async () => {
    try {
      const url = 'https://api.open-meteo.com/v1/forecast' +
        '?latitude=55.6761&longitude=12.5683' +
        '&current=weather_code,is_day,temperature_2m' +
        '&timezone=Europe/Copenhagen';
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) throw new Error('http ' + r.status);
      const j = await r.json();
      const code  = j?.current?.weather_code;
      const isDay = j?.current?.is_day === 1;
      const cond  = Atmosphere.classifyWMO(code);
      Atmosphere._condition = cond;
      document.documentElement.setAttribute('data-weather', cond);
      document.documentElement.setAttribute('data-daypart', isDay ? 'day' : 'night');
      Atmosphere.applyEffect(cond);
    } catch {
      // Silent fallback: leave whatever's already running, mark cloudy.
      document.documentElement.setAttribute('data-weather', 'cloudy');
      Atmosphere.applyEffect('cloudy');
    }
  },

  // WMO weather code → simplified condition class. WMO codes are documented
  // at https://open-meteo.com/en/docs (search "Weather variable documentation").
  classifyWMO: (c) => {
    // WMO: 0 clear, 1 mainly clear, 2 partly cloudy, 3 overcast.
    // For the hero look we treat "mainly clear" the same as "clear" so a
    // typical Danish "sunny but a few clouds" day shows the sun glow.
    if (c === 0 || c === 1) return 'clear';
    if (c === 2 || c === 3) return 'cloudy';
    if (c === 45 || c === 48) return 'fog';
    if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return 'rain';
    if ((c >= 71 && c <= 77) || c === 85 || c === 86) return 'snow';
    if (c >= 95 && c <= 99) return 'rain'; // thunderstorms render as heavy rain
    return 'cloudy';
  },

  // Stop whatever's running, then start the new effect. Idempotent — safe to
  // call repeatedly (e.g. on the 30-minute weather refresh).
  applyEffect: (cond, drops = null) => {
    Atmosphere.stopPrecip();
    if (cond === 'rain') Atmosphere.startRain(drops || 120);
    else if (cond === 'snow') Atmosphere.startSnow(drops || 90);
    // 'clear', 'cloudy', 'fog' → nothing animated; CSS handles the look
    // (see [data-weather="..."] selectors in main.css for sun rays / fog).
  },

  stopPrecip: () => {
    if (Atmosphere._rafToken) {
      cancelAnimationFrame(Atmosphere._rafToken);
      Atmosphere._rafToken = null;
    }
    const canvas = document.getElementById('rain-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },

  // Internal: shared canvas setup + resize wiring. Returns ctx + resize fn.
  _setupCanvas: () => {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    if (Atmosphere._resizeBound) window.removeEventListener('resize', Atmosphere._resizeBound);
    Atmosphere._resizeBound = resize;
    window.addEventListener('resize', resize);
    return { canvas, ctx };
  },

  startRain: (count = 120) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const setup = Atmosphere._setupCanvas();
    if (!setup) return;
    const { canvas, ctx } = setup;
    // Mobile gets fewer drops to save battery / CPU
    const adjusted = window.innerWidth < 600 ? Math.round(count * 0.6) : count;
    const drops = Array.from({ length: adjusted }, () => ({
      x:    Math.random() * window.innerWidth,
      y:    Math.random() * window.innerHeight,
      len:  Math.random() * 18 + 8,
      spd:  Math.random() * 4 + 3,
      opac: Math.random() * 0.4 + 0.15,
      w:    Math.random() * 0.8 + 0.3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.12, d.y + d.len);
        ctx.strokeStyle = `rgba(180,210,255,${d.opac})`;
        ctx.lineWidth = d.w;
        ctx.stroke();
        d.y += d.spd;
        d.x -= d.spd * 0.08;
        if (d.y > canvas.height) {
          d.y = -20;
          d.x = Math.random() * canvas.width;
        }
      });
      Atmosphere._rafToken = requestAnimationFrame(draw);
    };
    Atmosphere._rafToken = requestAnimationFrame(draw);
  },

  startSnow: (count = 90) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const setup = Atmosphere._setupCanvas();
    if (!setup) return;
    const { canvas, ctx } = setup;
    const adjusted = window.innerWidth < 600 ? Math.round(count * 0.6) : count;
    const flakes = Array.from({ length: adjusted }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 2 + 1,             // radius 1–3 px
      spd:   Math.random() * 0.8 + 0.4,         // gentle fall
      sway:  Math.random() * 0.6 + 0.3,         // horizontal drift
      phase: Math.random() * Math.PI * 2,
      opac:  Math.random() * 0.5 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach(f => {
        f.phase += 0.015;
        f.y += f.spd;
        f.x += Math.sin(f.phase) * f.sway;
        if (f.y > canvas.height + 5) {
          f.y = -5;
          f.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${f.opac})`;
        ctx.fill();
      });
      Atmosphere._rafToken = requestAnimationFrame(draw);
    };
    Atmosphere._rafToken = requestAnimationFrame(draw);
  },

  generateStars: () => {
    const container = document.getElementById('hero-stars');
    if (!container) return;
    const count = 150;
    container.innerHTML = Array.from({ length: count }, () => {
      const x    = Math.random() * 100;
      const y    = Math.random() * 60;
      const size = Math.random() * 2 + 0.5;
      const dur  = Math.random() * 3 + 2;
      const del  = Math.random() * 4;
      return `<div style="position:absolute;left:${x}%;top:${y}%;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,${0.4+Math.random()*0.6});animation:star-twinkle ${dur}s ${del}s ease-in-out infinite alternate"></div>`;
    }).join('');

    const style = document.createElement('style');
    style.textContent = `@keyframes star-twinkle{from{opacity:0.2;transform:scale(0.8)}to{opacity:1;transform:scale(1.2)}}`;
    document.head.appendChild(style);
  }
};

/* ══════════════════════════════════════════════════════
   DARK MODE
══════════════════════════════════════════════════════ */
const ThemeManager = {
  init: () => {
    const saved = safeGetItem('ankommer_theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    ThemeManager.set(saved);

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      ThemeManager.set(current === 'dark' ? 'light' : 'dark');
    });
  },
  set: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    safeSetItem('ankommer_theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      // aria-pressed reflects "dark mode is currently active"
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (btn) btn.innerHTML = theme === 'dark'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
  }
};

/* ══════════════════════════════════════════════════════
   GAMIFICATION — XP & RANKS
══════════════════════════════════════════════════════ */
const XPSystem = {
  add: (points, label) => {
    AppState.xp += points;
    safeSetItem('ankommer_xp', AppState.xp);
    XPSystem.updateUI();
    if (label) App.showToast(`+${points} XP — ${label}`, 'success');
  },
  getRank: () => {
    const rank = [...XP_RANKS].reverse().find(r => AppState.xp >= r.min);
    return rank || XP_RANKS[0];
  },
  updateUI: () => {
    const xpDisplay = document.getElementById('xp-display');
    const xpFill    = document.getElementById('xp-fill');
    const xpRank    = document.getElementById('xp-rank');
    const navPct    = document.getElementById('nav-progress-pct');
    const navFill   = document.getElementById('nav-progress-fill');
    const xpMotivate = document.getElementById('xp-motivate');

    if (xpDisplay) xpDisplay.textContent = AppState.xp;

    const rank = XPSystem.getRank();
    if (xpRank) xpRank.textContent = rank.label;

    // Progress within current rank
    const rankIndex = XP_RANKS.indexOf(rank);
    const nextRank  = XP_RANKS[rankIndex + 1];
    const pct = nextRank
      ? Math.min(100, ((AppState.xp - rank.min) / (nextRank.min - rank.min)) * 100)
      : 100;
    if (xpFill) xpFill.style.width = pct + '%';

    // "X XP to next rank" motivation + tooltip on rank badge
    if (xpMotivate) {
      if (nextRank) {
        const xpNeeded = nextRank.min - AppState.xp;
        xpMotivate.textContent = `${xpNeeded} Viking Points → ${nextRank.label}`;
        xpMotivate.style.display = '';
        // Tooltip on the rank badge itself
        if (xpRank) xpRank.title = `${AppState.xp} VP · ${xpNeeded} more to reach ${nextRank.label} (${nextRank.en})`;
      } else {
        xpMotivate.textContent = '🇩🇰 Max rank reached!';
        xpMotivate.style.display = '';
        if (xpRank) xpRank.title = `${AppState.xp} Viking Points · Highest rank achieved!`;
      }
    }

    // Overall task progress
    const allTasks = CHAPTERS.flatMap(c => c.checklist || []);
    const doneTasks = allTasks.filter(t => AppState.completedTasks[t.id]).length;
    const totalPct = allTasks.length ? Math.round((doneTasks / allTasks.length) * 100) : 0;
    if (navPct) navPct.textContent = totalPct + '%';
    if (navFill) navFill.style.width = totalPct + '%';
  }
};

/* ══════════════════════════════════════════════════════
   WIZARD — Perfect Edition
══════════════════════════════════════════════════════ */
let wizardState = { step: 0, answers: {}, direction: 'forward' };

const STEP_NAMES = ['Timeline', 'Purpose', 'Location', 'Household', 'Passport', 'Concerns'];

const Wizard = {

  _focusTrap: null,

  open: () => {
    const overlay = document.getElementById('wizard-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    wizardState = { step: 0, answers: {}, direction: 'forward' };
    // Reset progress wrap visibility
    const pw = document.getElementById('wiz-progress-wrap');
    if (pw) pw.style.display = '';
    // Hide result
    const res = document.getElementById('wizard-result');
    if (res) res.classList.add('hidden');
    Wizard.renderStep(0);
    // Activate focus trap (Escape closes, Tab cycles inside modal)
    Wizard._focusTrap = FocusTrap(overlay, { onEscape: Wizard.close });
    Wizard._focusTrap.activate(document.activeElement);
    // Defer initial focus to first focusable element so screen readers announce it
    requestAnimationFrame(() => {
      const first = overlay.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      first?.focus({ preventScroll: true });
    });
  },

  close: () => {
    const overlay = document.getElementById('wizard-overlay');
    if (!overlay) return;
    // Tear down focus trap and restore focus to opener
    Wizard._focusTrap?.deactivate();
    Wizard._focusTrap = null;
    // Animate out before hiding
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.classList.remove('closing');
      overlay.classList.add('hidden');
    }, 250);
  },

  updateProgress: (stepIndex) => {
    const total = WIZARD_QUESTIONS.length;
    const pct = Math.round((stepIndex / total) * 100);

    const labelEl   = document.getElementById('wiz-step-label');
    const pctEl     = document.getElementById('wiz-pct-label');
    const fillEl    = document.getElementById('wiz-bar-fill');

    const _wl = window.currentLang || 'en';
    if (labelEl) labelEl.textContent = `${t_('wizStep', _wl, stepIndex + 1, total)} · ${STEP_NAMES[stepIndex] || ''}`;
    if (pctEl)   pctEl.textContent   = pct > 0 ? t_('wizPct', _wl, pct) : '';
    if (fillEl)  fillEl.style.width  = pct + '%';

    document.querySelectorAll('.wdot').forEach((dot, i) => {
      dot.classList.toggle('active', i === stepIndex);
      dot.classList.toggle('done',   i < stepIndex);
    });
  },

  renderStep: (stepIndex) => {
    wizardState.step = stepIndex;
    const q = WIZARD_QUESTIONS[stepIndex];
    if (!q) return;

    const lang = window.currentLang || 'en';
    Wizard.updateProgress(stepIndex);

    const container = document.getElementById('wizard-questions');
    if (!container) return;

    // Restore previously selected values for this step
    const prevAnswers = wizardState.answers[q.id];
    const selectedSet = new Set(
      Array.isArray(prevAnswers) ? prevAnswers :
      prevAnswers ? [prevAnswers] : []
    );

    // Layout: single column when ≤4 options or multi-select
    const singleCol = q.options.length <= 4 || q.multi;

    const optionsHtml = q.options.map(opt => `
      <button class="wiz-opt${selectedSet.has(opt.value) ? ' selected' : ''}" data-value="${opt.value}" type="button">
        <span class="wiz-opt-icon">${opt.icon}</span>
        <span class="wiz-opt-text">${opt.label[lang] || opt.label.en}</span>
      </button>
    `).join('');

    const backHtml = stepIndex > 0
      ? `<button class="wiz-back-btn" id="wiz-back" type="button">← Back</button>`
      : '<div></div>';

    const navHtml = q.multi ? `
      <div class="wizard-nav">
        ${backHtml}
        <button class="wizard-skip" id="wiz-skip" type="button">Skip for now</button>
        <button class="wiz-next-btn" id="wiz-next" type="button" ${selectedSet.size === 0 ? 'disabled' : ''}>
          Continue ${selectedSet.size > 0 ? `(${selectedSet.size})` : ''} →
        </button>
      </div>
    ` : `
      <div class="wizard-nav">
        ${backHtml}
        <button class="wizard-skip" id="wiz-skip" type="button">Skip for now</button>
        <div></div>
      </div>
    `;

    const counterHtml = q.multi ? `
      <div class="wiz-select-counter" id="wiz-counter">
        <strong id="wiz-sel-text">${selectedSet.size === 0 ? 'None selected yet' : `${selectedSet.size} selected`}</strong>
        &nbsp;— choose up to <strong>${q.maxSelect}</strong>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="wizard-q${wizardState.direction === 'back' ? ' wiz-back-dir' : ''}">
        <div class="wizard-q-icon">${q.icon}</div>
        <h2 class="wizard-q-title">${q.title[lang] || q.title.en}</h2>
        <p class="wizard-q-sub">${q.sub[lang] || q.sub.en}</p>
        ${q.multi ? `<div class="wizard-multi-hint">✦ Select up to ${q.maxSelect} that apply</div>` : ''}
        <div class="wizard-options${singleCol ? ' single-col' : ''}">
          ${optionsHtml}
        </div>
        ${counterHtml}
        ${navHtml}
      </div>
    `;

    // ── Bind option clicks ──────────────────────────────
    container.querySelectorAll('.wiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.value;

        if (q.multi) {
          if (selectedSet.has(val)) {
            selectedSet.delete(val);
            btn.classList.remove('selected');
          } else if (selectedSet.size < q.maxSelect) {
            selectedSet.add(val);
            btn.classList.add('selected');
          }
          // Update counter + next button live
          const nextBtn = document.getElementById('wiz-next');
          const selText = document.getElementById('wiz-sel-text');
          const _ml = window.currentLang || 'en';
          if (selText) selText.textContent = selectedSet.size === 0
            ? t_('wizNoneSelected', _ml)
            : t_('wizSelected', _ml, selectedSet.size);
          if (nextBtn) {
            nextBtn.disabled = selectedSet.size === 0;
            nextBtn.textContent = t_('wizContinue', _ml, selectedSet.size);
          }
          // Auto-advance when max reached
          if (selectedSet.size >= q.maxSelect) {
            wizardState.answers[q.id] = [...selectedSet];
            setTimeout(() => { wizardState.direction = 'forward'; Wizard.nextStep(); }, 520);
          }
        } else {
          // Single select — highlight + auto-advance
          container.querySelectorAll('.wiz-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          wizardState.answers[q.id] = val;
          setTimeout(() => { wizardState.direction = 'forward'; Wizard.nextStep(); }, 360);
        }
      });
    });

    document.getElementById('wiz-next')?.addEventListener('click', () => {
      wizardState.answers[q.id] = [...selectedSet];
      wizardState.direction = 'forward';
      Wizard.nextStep();
    });
    document.getElementById('wiz-back')?.addEventListener('click', () => {
      wizardState.direction = 'back';
      Wizard.renderStep(stepIndex - 1);
    });
    document.getElementById('wiz-skip')?.addEventListener('click', () => {
      wizardState.direction = 'forward';
      Wizard.nextStep();
    });
  },

  nextStep: () => {
    const next = wizardState.step + 1;
    if (next >= WIZARD_QUESTIONS.length) {
      Wizard.showResult();
    } else {
      Wizard.renderStep(next);
    }
  },

  /* ─── Result Screen ─────────────────────────────── */
  showResult: () => {
    const lang = window.currentLang || 'en';
    const a = wizardState.answers;

    // Persist profile
    AppState.profile = a;
    safeSetItem('ankommer_profile', JSON.stringify(a));
    safeSetItem('ankommer_wizard', '1');
    AppState.wizardDone = true;

    // Award XP
    XPSystem.add(100, 'Completed your journey profile!');

    // Dispatch events
    window.dispatchEvent(new CustomEvent('profileSet', { detail: a }));
    window.dispatchEvent(new CustomEvent('wizardComplete', { detail: { answers: a } }));
    // Also save to roadmap storage key
    safeSetItem('ankommer_roadmap_profile', JSON.stringify({ answers: a }));
    if (typeof Bjorn !== 'undefined') Bjorn.setProfile(a);

    // Build content pieces
    const heroData   = Wizard.buildHero(a);
    const chips      = Wizard.buildChips(a);
    const priorities = Wizard.buildPriorities(a);
    const bjornNote  = Wizard.buildBjornNote(a);

    // Hide progress, clear questions
    const pwEl        = document.getElementById('wiz-progress-wrap');
    const questionsEl = document.getElementById('wizard-questions');
    const resultEl    = document.getElementById('wizard-result');
    if (pwEl)        pwEl.style.display = 'none';
    if (questionsEl) questionsEl.innerHTML = '';
    if (!resultEl)   return;

    resultEl.innerHTML = `
      <div class="result-hero">
        <div class="result-hero-emoji">${heroData.emoji}</div>
        <div class="result-hero-title">${heroData.title}</div>
        <div class="result-hero-sub">${heroData.sub}</div>
      </div>

      <div class="result-chips">
        ${chips.map((c, i) => `
          <span class="result-chip" style="animation-delay:${i * 0.06}s">
            <span>${c.icon}</span> ${c.label}
          </span>
        `).join('')}
      </div>

      <div class="result-priorities-wrap">
        <div class="result-priorities-heading">${t_('actionPlanHeading', lang)}</div>
        ${priorities.map((p, i) => `
          <div class="result-priority-item${p.chapterIndex !== undefined ? ' clickable' : ''}" ${p.chapterIndex !== undefined ? `onclick="openChapter(${p.chapterIndex}); Wizard.close();" title="${p.chapter}"` : ''}>
            <div class="priority-badge p${i + 1}">${i + 1}</div>
            <div class="result-priority-body">
              <div class="result-priority-name">${p.title}</div>
              <div class="result-priority-desc">${p.desc}</div>
              ${p.chapter ? `<div class="result-priority-chapter">${t_('openChapterLink', lang, p.chapter)}</div>` : ''}
            </div>
            ${p.chapterIndex !== undefined ? '<div class="result-priority-arrow">›</div>' : ''}
          </div>
        `).join('')}
      </div>

      <div class="result-bjorn-card">
        <div class="result-bjorn-avatar">🛡️</div>
        <div>
          <span class="result-bjorn-label">${t_('bjornSays', lang)}</span>
          <p class="result-bjorn-text">${bjornNote}</p>
        </div>
      </div>

      <div class="result-xp-strip">${t_('xpEarnedProfile', lang)}</div>

      <div class="result-ctas">
        <button class="btn-primary" id="wiz-start">${TRANSLATIONS[lang]?.wiz_result_cta || 'Start My Journey'} →</button>
        <button class="result-bjorn-btn" id="wiz-bjorn">💬 ${TRANSLATIONS[lang]?.wiz_result_bjorn || 'Chat with Björn'}</button>
      </div>
    `;

    resultEl.classList.remove('hidden');
    launchConfetti();

    document.getElementById('wiz-start')?.addEventListener('click', () => {
      Wizard.close();
      showAppLayout();
      openChapter(a.timing === 'pre_arrival' ? 0 : 1);
    });
    document.getElementById('wiz-bjorn')?.addEventListener('click', () => {
      Wizard.close();
      if (typeof Bjorn !== 'undefined') Bjorn.open();
    });
  },

  /* ─── Content builders ───────────────────────────── */
  buildHero: (a) => {
    if (a.timing === 'just_arrived') return {
      emoji: '🛬',
      title: 'Welcome to Denmark!',
      sub: 'Your personalised roadmap is ready. Let\'s get you settled — step by step.'
    };
    if (a.timing === 'settling') return {
      emoji: '🏠',
      title: 'Your Roadmap is Ready',
      sub: 'You\'re finding your footing. Here\'s exactly what to tackle next.'
    };
    if (a.timing === 'established') return {
      emoji: '⭐',
      title: 'Time to Level Up',
      sub: 'You\'re already here — let\'s make sure everything is properly sorted.'
    };
    if (a.timing === 'pre_arrival') return {
      emoji: '✈️',
      title: 'Your Pre-Arrival Plan',
      sub: 'Getting ahead before you land. Smart. Here\'s your preparation roadmap.'
    };
    return {
      emoji: '✨',
      title: 'Your Denmark Roadmap',
      sub: 'Personalised to your unique journey. Let\'s go.'
    };
  },

  buildChips: (a) => {
    const chips = [];
    const maps = {
      timing:   { just_arrived:'Just arrived', settling:'1–3 months in', established:'3+ months here', pre_arrival:'Pre-arrival' },
      reason:   { work:'Working', study:'Studying', love:'Partner/Family', startup:'Entrepreneur', nomad:'Remote worker', asylum:'Asylum seeker' },
      location: { cph:'Copenhagen', aarhus:'Aarhus', odense:'Odense', aalborg:'Aalborg', small:'Smaller town', undecided:'Location TBD' },
      family:   { solo:'Solo', couple:'With partner', family_small:'Young family', family_school:'School-age kids', extended:'Extended family' },
      passport: { eu:'EU citizen', work_permit:'Work permit', student_visa:'Student visa', family_reunification:'Family reunification', refugee:'Refugee status' },
    };
    const icons = { timing:'✈️', reason:'🎯', location:'📍', family:'👤', passport:'🛂' };
    Object.entries(maps).forEach(([key, labels]) => {
      const val = a[key];
      if (val && labels[val]) chips.push({ icon: icons[key], label: labels[val] });
    });
    return chips;
  },

  buildPriorities: (a) => {
    const p = [];

    if (a.timing === 'just_arrived' || a.timing === 'settling') {
      p.push({ title:'Register your address', desc:'borger.dk or Borgerservice — the absolute first step. Everything else depends on this.', chapter:'Chapter 1: First 72 Hours', chapterIndex:1 });
      p.push({ title:'Get your CPR number', desc:'Your Civil Registration number — required for doctors, banks, tax, phone contracts, everything.', chapter:'Chapter 1: First 72 Hours', chapterIndex:1 });
      p.push({ title:'Activate MitID & set up e-Boks', desc:'Your digital identity and official mail. Missing a letter from SKAT can be very costly.', chapter:'Chapter 1: First 72 Hours', chapterIndex:1 });
    }
    if (a.timing === 'pre_arrival') {
      p.push({ title:'Apply for your visa / residence permit', desc:'Start today at newtodenmark.dk — processing takes 1–4 months. Don\'t book a one-way ticket yet.', chapter:'Chapter 0: Before You Land', chapterIndex:0 });
      p.push({ title:'Start your housing search now', desc:'BoligPortal.dk and Lejebolig.dk — the Copenhagen market is competitive. Earlier is always better.', chapter:'Chapter 0: Before You Land', chapterIndex:0 });
      p.push({ title:'Set up Wise or Revolut', desc:'International banking sorted before you land. Bring funds for 2+ months of expenses as a buffer.', chapter:'Chapter 0: Before You Land', chapterIndex:0 });
    }
    if (a.timing === 'established') {
      p.push({ title:'Verify your tax situation with SKAT', desc:'SKAT.dk — make sure your skattekort is correct. Many newcomers overpay without knowing.', chapter:'Chapter 2: Papers & Legal Identity', chapterIndex:2 });
      p.push({ title:'Join an a-kasse if you haven\'t', desc:'Unemployment insurance is essential. You can\'t join while unemployed — do it now.', chapter:'Chapter 8: Employment', chapterIndex:8 });
    }
    if (a.reason === 'work' || a.reason === 'startup') {
      p.push({ title:'Get your skattekort (tax card) from SKAT', desc:'Register at skat.dk on day one. Without it, your employer deducts maximum tax (55%+).', chapter:'Chapter 2: Papers & Legal Identity', chapterIndex:2 });
      if (a.timing !== 'established') {
        p.push({ title:'Join an a-kasse within your first month', desc:'Unemployment insurance for workers. ASE and Krifa are popular English-friendly options.', chapter:'Chapter 8: Employment', chapterIndex:8 });
      }
    }
    if (a.reason === 'study') {
      p.push({ title:'Visit your university\'s international office first', desc:'They handle much of the admin — CPR, housing, permits. This is genuinely your best friend.', chapter:null });
      p.push({ title:'Sign up for free Danish classes now', desc:'State-subsidised Danskuddannelse — 3 years free. They fill up fast. Register before your first week is out.', chapter:null });
    }
    if (a.reason === 'asylum') {
      p.push({ title:'Contact Dansk Flygtningehjælp (Refugee Council)', desc:'Free legal support and guidance. They know the system better than anyone.', chapter:null });
      p.push({ title:'Know your rights during the asylum process', desc:'You have the right to a lawyer and an interpreter at every interview. Always ask for them.', chapter:null });
    }
    if (a.family === 'family_small' || a.family === 'family_school') {
      p.push({ title:'Join daycare / school waitlist immediately', desc:'Copenhagen waitlists for pasningsgaranti (guaranteed childcare) can be 6–18 months. Apply on day one.', chapter:null });
    }
    if (a.anxiety?.includes('health')) {
      p.push({ title:'Register with a local GP (læge) right away', desc:'sundhed.dk — find a doctor taking new patients near your address. This is your gateway to the health system.', chapter:'Chapter 5: Healthcare', chapterIndex:5 });
    }
    if (a.anxiety?.includes('housing') && a.timing !== 'pre_arrival') {
      p.push({ title:'Secure even temporary accommodation first', desc:'You need a registered address for your CPR. AirBnb or student housing works while you search properly.', chapter:'Chapter 3: Housing', chapterIndex:3 });
    }
    if (a.anxiety?.includes('money')) {
      p.push({ title:'Open a Danish bank account (requires CPR)', desc:'Lunar is the most newcomer-friendly. Once open, designate it as your NemKonto at nemkonto.dk.', chapter:'Chapter 4: Money & Banking', chapterIndex:4 });
    }
    if (a.anxiety?.includes('language')) {
      p.push({ title:'Enroll in Danskuddannelse (free Danish lessons)', desc:'All newcomers are legally entitled to 3 years of free, subsidised Danish instruction. Enroll early.', chapter:null });
    }
    if (a.anxiety?.includes('social')) {
      p.push({ title:'Join InterNations or local expat groups', desc:'internations.org and Facebook groups for your city are excellent. Danes are reserved but warm once you connect.', chapter:null });
    }

    // Deduplicate and cap at 5
    const seen = new Set();
    return p.filter(item => {
      if (seen.has(item.title)) return false;
      seen.add(item.title); return true;
    }).slice(0, 5);
  },

  buildBjornNote: (a) => {
    if (a.passport === 'eu' || a.passport === 'nordic') {
      return `Good news — as an EU/EEA citizen, your path is dramatically simpler than most. No work permit, no immigration lawyer needed. Just register your address within 3 months and get your CPR number. You can be fully set up in a week. <em>Tillykke og velkommen!</em>`;
    }
    if (a.reason === 'asylum' || a.passport === 'refugee') {
      return `You are navigating something genuinely difficult, and I want to help every step of the way. The Danish Refugee Council (flygtningehjaelpen.dk) provides free legal guidance — reach out to them immediately. Your safety and health come first. The paperwork will follow.`;
    }
    if (a.reason === 'study') {
      return `As a student, your university's international office is your most important first resource — make them your first stop after landing. And sign up for free Danish classes right away. They fill up within days of term starting. Learning even basic Danish transforms your social life here.`;
    }
    if (a.reason === 'nomad') {
      return `Digital nomad life in Denmark is wonderful — the infrastructure is world-class. But tax residency kicks in at 183+ days, and SKAT (the tax authority) is very thorough. Contact them proactively before you hit that threshold. Being ahead of SKAT is always better than being behind.`;
    }
    if (a.reason === 'startup') {
      return `Denmark is genuinely excellent for startups — low bureaucracy, well-educated workforce, strong engineering culture. Your first steps: CPR number, register your company (virk.dk), and get advice from the Danish Business Authority. They have a free English-language startup hotline.`;
    }
    if (a.reason === 'work' || a.passport === 'work_permit') {
      return `Welcome to the working majority of internationals here. Your employer handles the permit paperwork, but the CPR, MitID, skattekort, and a-kasse — those are on you, and they matter enormously. Get them done this week, not next month.`;
    }
    if (a.family === 'family_small' || a.family === 'family_school') {
      return `Denmark is genuinely one of the best places in the world to raise children — world-class childcare, excellent schools, safe streets. But the waitlists for daycare are very long. Apply for the pasningsgaranti (guaranteed childcare place) on your very first day. Everything else can wait a week. The daycare list cannot.`;
    }
    return `Your most important first move is registering your address at borger.dk or your local Borgerservice office. Bring your passport and proof of accommodation. Everything else in Denmark — your CPR, your bank account, your doctor, your tax card — all of it flows from that one step. I'm here whenever you need me. <em>Du klarer det!</em> (You've got this!)`;
  }
};

/* ══════════════════════════════════════════════════════
   CHAPTER SYSTEM
══════════════════════════════════════════════════════ */
const buildRailNav = () => {
  const nav = document.getElementById('rail-nav');
  if (!nav) return;
  const lang = window.currentLang || 'en';

  // Detect first visit: no tasks done and no chapter opened yet
  const totalDone = Object.values(AppState.completedTasks).filter(Boolean).length;
  const isFirstVisit = totalDone === 0 && AppState.currentChapter === null;

  nav.innerHTML = CHAPTERS.map((ch, i) => {
    const allTasks = ch.checklist || [];
    const done = allTasks.filter(t => AppState.completedTasks[t.id]).length;
    const isComplete = allTasks.length > 0 && done === allTasks.length;
    const isActive = AppState.currentChapter === i;
    // Show "Start here →" badge only on first chapter during first visit
    const startHint = (isFirstVisit && i === 0)
      ? `<span class="rail-start-hint">Start here →</span>`
      : '';

    return `<button class="rail-item ${isActive ? 'active' : ''} ${isComplete ? 'completed' : ''}"
      onclick="openChapter(${i})"
      style="--ch-accent:${ch.color}"
      aria-label="${ch.title[lang] || ch.title.en}"
      aria-current="${isActive ? 'page' : 'false'}">
      <span class="rail-icon" aria-hidden="true">${ch.icon}</span>
      <span>${ch.title[lang] || ch.title.en}</span>
      ${startHint}
      <span class="rail-check" aria-hidden="true">✓</span>
    </button>`;
  }).join('');
};

const renderChapter = (index) => {
  const ch = CHAPTERS[index];
  if (!ch) return;
  const lang = window.currentLang || 'en';
  AppState.currentChapter = index;

  const allTasks = ch.checklist || [];
  const doneTasks = allTasks.filter(t => AppState.completedTasks[t.id]).length;
  const pct = allTasks.length ? Math.round((doneTasks / allTasks.length) * 100) : 0;

  const sectionsHtml = (ch.sections || []).map((sec, si) => `
    <div class="chapter-section" id="ch-sec-${index}-${si}">
      <button class="section-toggle" onclick="toggleSection('ch-sec-${index}-${si}')">
        <span class="section-toggle-icon">${sec.icon || '📌'}</span>
        <span>${sec.title[lang] || sec.title.en || sec.title}</span>
        <span class="section-toggle-arrow">▼</span>
      </button>
      <div class="section-body">
        ${sec.content[lang] || sec.content.en || sec.content}
      </div>
    </div>
  `).join('');

  const checklistHtml = allTasks.length ? `
    <div class="mt-lg">
      <h3 style="margin-bottom:12px">✅ ${t_('yourChecklist', lang)}</h3>
      <div class="chapter-progress-bar" style="--ch-accent:${ch.color}">
        <div class="chapter-progress-fill" style="width:${pct}%;background:${ch.color}"></div>
      </div>
      <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px">${t_('tasksComplete', lang, doneTasks, allTasks.length)}</p>
      <ul class="checklist">
        ${allTasks.map(task => `
          <li class="check-item ${AppState.completedTasks[task.id] ? 'done' : ''}"
              onclick="toggleTask('${task.id}', ${task.xp || 10})">
            <div class="check-box">${AppState.completedTasks[task.id] ? '✓' : ''}</div>
            <div>
              <div class="check-label">${task.text[lang] || task.text.en || task.text}</div>
            </div>
            <div class="check-xp">+${task.xp || 10} XP</div>
          </li>
        `).join('')}
      </ul>
    </div>
  ` : '';

  const bjornTip = ch.bjornTip ? `
    <div class="bjorn-tip">
      <div class="bjorn-tip-avatar">🛡️</div>
      <div class="bjorn-tip-body">
        <strong>${t_('bjornSays', lang)}</strong>
        <p>${ch.bjornTip[lang] || ch.bjornTip.en || ch.bjornTip}</p>
      </div>
    </div>
  ` : '';

  const comingSoon = (!ch.sections || ch.sections.length === 0) ? `
    <div style="text-align:center;padding:60px 20px">
      <div style="font-size:3rem;margin-bottom:16px">${ch.icon}</div>
      <h3 style="margin-bottom:12px;color:var(--text-muted)">${t_('comingSoonTitle', lang)}</h3>
      <p style="color:var(--text-muted);max-width:400px;margin:0 auto 24px">
        ${t_('comingSoonBody', lang)}
      </p>
      <button class="ask-bjorn-btn" data-query="Tell me everything about: ${ch.title.en}">
        ${t_('askBjorn', lang, ch.title[lang] || ch.title.en)}
      </button>
    </div>
  ` : '';

  // Honest fallback notice: when content for the active language hasn't been
  // translated yet, the chapter falls back to English. Tell the user instead
  // of silently pretending it's their language. (Tier-2 fix: silent fallback.)
  const T_NOTICE = {
    fr: "Ce chapitre n'est pas encore traduit en français — affiché en anglais.",
    ar: "لم يُترجم هذا الفصل إلى العربية بعد — يُعرض بالإنجليزية.",
    es: "Este capítulo aún no está traducido al español — se muestra en inglés.",
    da: "Dette kapitel er ikke oversat til dansk endnu — vist på engelsk.",
    de: "Dieses Kapitel ist noch nicht ins Deutsche übersetzt — auf Englisch angezeigt.",
    uk: "Цей розділ ще не перекладено українською — відображається англійською.",
    pl: "Ten rozdział nie jest jeszcze przetłumaczony na polski — wyświetlany po angielsku.",
    ur: "یہ باب ابھی اردو میں ترجمہ نہیں ہوا — انگریزی میں دکھایا گیا۔",
    fa: "این فصل هنوز به فارسی ترجمه نشده — به انگلیسی نمایش داده می‌شود."
  };
  // Round 2A/2B: don't trust the title alone — many chapters have translated
  // titles but English-only section bodies. Check the first section's content
  // too, so users get the honest "shown in English" notice when the body is.
  const titleIsTranslated = !!ch.title?.[lang];
  const firstSection = Array.isArray(ch.sections) ? ch.sections[0] : null;
  const bodyIsTranslated = !!firstSection?.content?.[lang];
  const fullyTranslated = titleIsTranslated && bodyIsTranslated;
  const fallbackNotice = (lang !== 'en' && !fullyTranslated) ? `
    <div style="margin:0 0 16px;padding:10px 14px;border-radius:10px;
                background:rgba(46,109,164,0.08);border-left:3px solid var(--nordic-blue,#2E6DA4);
                font-size:0.85rem;color:var(--text-muted);">
      🌐 ${T_NOTICE[lang] || ''}
    </div>
  ` : '';

  const html = `
    <div class="chapter-page" style="--ch-accent:${ch.color}">
      <div class="chapter-header">
        <div class="chapter-num">${t_('chapterWord', lang)} ${index} · ${ch.subtitle[lang] || ch.subtitle.en}</div>
        <div class="chapter-icon">${ch.icon}</div>
        <h1 class="chapter-title">${ch.title[lang] || ch.title.en}</h1>
        <p class="chapter-intro">${ch.intro[lang] || ch.intro.en}</p>
        <div class="chapter-meta">
          <span class="chapter-meta-tag">${t_('readTime', lang, ch.readTime || '10 min')}</span>
          <span class="chapter-meta-tag">${allTasks.length} ${t_('tasks', lang)}</span>
          ${pct === 100 ? `<span class="chapter-meta-tag" style="background:rgba(106,158,106,0.15);color:var(--sage)">${t_('complete', lang)}</span>` : ''}
          ${ch.lastUpdated ? `<span class="chapter-meta-tag chapter-meta-updated" title="Last reviewed">🛠 ${ch.lastUpdated}</span>` : ''}
        </div>
      </div>
      ${fallbackNotice}
      ${bjornTip}
      ${sectionsHtml}
      ${comingSoon}
      ${checklistHtml}
      <button class="ask-bjorn-btn mt-lg" data-query="I'm reading about ${ch.title.en} in Denmark. Can you give me the most important things I need to know?">
        ${t_('askBjornCh', lang)}
      </button>

      <div class="chapter-rating" id="chapter-rating-${index}">
        ${ChapterRating.render(index, lang)}
      </div>

      <div class="chapter-actions-row">
        <button class="print-chapter-btn" onclick="window.print()" title="Print this chapter">
          🖨️ ${{ en:'Print Chapter', fr:'Imprimer', ar:'طباعة', es:'Imprimir', da:'Print kapitel' }[lang] || 'Print Chapter'}
        </button>
        <button class="print-chapter-btn" onclick="printChecklist()" title="Print full checklist">
          📋 ${{ en:'Print My Checklist', fr:'Imprimer ma liste', ar:'طباعة قائمتي', es:'Imprimir mi lista', da:'Print min tjekliste' }[lang] || 'Print My Checklist'}
        </button>
      </div>
    </div>
  `;

  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = html;
    main.scrollTop = 0;
    window.scrollTo({ top: document.getElementById('app-layout')?.offsetTop || 0, behavior: 'instant' });
  }

  // Update page title & meta description for SEO / browser tab
  const chTitle = ch.title[lang] || ch.title.en;
  const chIntro = ch.intro[lang] || ch.intro.en;
  document.title = `${chTitle} — ANKOMMER | Moving to Denmark`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', chIntro.substring(0, 155));

  // Reading progress bar — tracks scroll within chapter
  ChapterProgress.init();

  buildRailNav();
};

window.openChapter = (index) => {
  showAppLayout();
  renderChapter(index);
  // Update URL hash so chapters are bookmarkable and shareable
  if (history.replaceState) {
    history.replaceState(null, '', '#chapter-' + index);
  }
  // Also expose via global for any code that reads it before AppState is available
  window._currentChapterIdx = index;
  // Close mobile sidebar (rail + hamburger + aria-expanded sync)
  document.getElementById('chapter-rail')?.classList.remove('open');
  const hb = document.getElementById('hamburger');
  if (hb) {
    hb.classList.remove('open');
    hb.setAttribute('aria-expanded', 'false');
  }
};

/* ══════════════════════════════════════════════════════
   CHAPTER READING PROGRESS BAR
══════════════════════════════════════════════════════ */
const ChapterProgress = (() => {
  let ticking = false;
  let _listenerAdded = false;  // prevent accumulating scroll listeners on every chapter open

  const update = () => {
    const bar = document.getElementById('chapter-read-bar');
    if (!bar) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    const scrollTop = window.scrollY - (document.getElementById('app-layout')?.offsetTop || 0);
    const total = main.scrollHeight - window.innerHeight;
    const pct = total > 0 ? Math.min(100, Math.max(0, (scrollTop / total) * 100)) : 0;
    bar.style.width = pct + '%';
  };

  const init = () => {
    // Create bar if not present
    if (!document.getElementById('chapter-read-bar')) {
      const bar = document.createElement('div');
      bar.id = 'chapter-read-bar';
      bar.className = 'chapter-read-bar';
      document.getElementById('app-layout')?.prepend(bar);
    }
    // Only attach scroll listener once — re-calling init() on chapter switch just resets position
    if (!_listenerAdded) {
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => { update(); ticking = false; });
          ticking = true;
        }
      }, { passive: true });
      _listenerAdded = true;
    }
    update();
  };

  return { init, update };
})();

/* ══════════════════════════════════════════════════════
   CHAPTER RATING — "Was this helpful?"
══════════════════════════════════════════════════════ */
const ChapterRating = (() => {
  const KEY = 'ankommer_ratings';
  const getRatings = () => safeGetJSON(KEY, {});

  const rate = (chapterIndex, value) => {
    const ratings = getRatings();
    ratings[chapterIndex] = value;
    safeSetItem(KEY, JSON.stringify(ratings));
    // Re-render rating widget with thanks state
    const el = document.getElementById(`chapter-rating-${chapterIndex}`);
    if (el) {
      const lang = window.currentLang || 'en';
      el.innerHTML = `<div class="rating-thanks">
        ${value === 1 ? '👍' : '👎'}
        ${{ en:'Thanks for the feedback!', fr:'Merci pour votre retour !', ar:'شكراً على ملاحظاتك!', es:'¡Gracias por tu opinión!', da:'Tak for din feedback!' }[lang] || 'Thanks!'}
      </div>`;
    }
  };

  const render = (chapterIndex, lang = 'en') => {
    const ratings = getRatings();
    const existing = ratings[chapterIndex];
    if (existing !== undefined) {
      return `<div class="rating-thanks">${existing === 1 ? '👍' : '👎'} ${{ en:'Feedback recorded', fr:'Commentaire enregistré', ar:'تم تسجيل الملاحظة', es:'Opinión registrada', da:'Feedback registreret' }[lang] || 'Feedback recorded'}</div>`;
    }
    const label = { en:'Was this chapter helpful?', fr:'Ce chapitre était-il utile ?', ar:'هل كان هذا الفصل مفيداً؟', es:'¿Fue útil este capítulo?', da:'Var dette kapitel nyttigt?' }[lang] || 'Was this chapter helpful?';
    return `<div class="rating-prompt">
      <span class="rating-label">${label}</span>
      <button class="rating-btn" onclick="ChapterRating.rate(${chapterIndex}, 1)" title="Yes">👍</button>
      <button class="rating-btn" onclick="ChapterRating.rate(${chapterIndex}, 0)" title="No">👎</button>
    </div>`;
  };

  return { rate, render };
})();
window.ChapterRating = ChapterRating;

/* ══════════════════════════════════════════════════════
   PWA INSTALL PROMPT
══════════════════════════════════════════════════════ */
const PWAInstall = (() => {
  let deferredPrompt = null;

  const init = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show banner after 45s or after user opens first chapter
      setTimeout(showBanner, 45000);
    });

    window.addEventListener('appinstalled', () => {
      hideBanner();
      deferredPrompt = null;
    });

    document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') hideBanner();
      deferredPrompt = null;
    });

    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
      hideBanner();
      safeSetItem('ankommer_pwa_dismissed', 'true');
    });
  };

  const showBanner = () => {
    if (safeGetItem('ankommer_pwa_dismissed') === 'true') return;
    if (!deferredPrompt) return;
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.remove('hidden');
  };

  const hideBanner = () => {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.add('hidden');
  };

  return { init, showBanner };
})();

window.toggleSection = (id) => {
  const sec = document.getElementById(id);
  if (sec) sec.classList.toggle('open');
};

window.toggleTask = (taskId, xp) => {
  const wasComplete = !!AppState.completedTasks[taskId];
  if (wasComplete) {
    delete AppState.completedTasks[taskId];
    // Mirror XPSystem.add() for symmetry — mutate then persist + update UI
    AppState.xp = Math.max(0, AppState.xp - xp);
    safeSetItem('ankommer_xp', AppState.xp);
  } else {
    AppState.completedTasks[taskId] = true;
    // Pass a non-empty label so the +XP toast actually shows on task completion (Round 2A bug).
    const taskLabel = (typeof window.i18n?.t === 'function' && window.i18n.t('xpTaskDone')) || 'Task complete';
    XPSystem.add(xp, taskLabel);
  }
  safeSetItem('ankommer_tasks', JSON.stringify(AppState.completedTasks));

  // Re-render current chapter
  if (AppState.currentChapter !== null) renderChapter(AppState.currentChapter);

  // Celebrate completion
  if (!wasComplete) {
    const allTasks = CHAPTERS[AppState.currentChapter]?.checklist || [];
    const done = allTasks.filter(t => AppState.completedTasks[t.id]).length;
    if (done === allTasks.length && allTasks.length > 0) {
      App.showToast(i18n.t('complete_msg'), 'success');
      launchConfetti();
    }
  }
  XPSystem.updateUI();
};

/* ══════════════════════════════════════════════════════
   CONFETTI
══════════════════════════════════════════════════════ */
const launchConfetti = () => {
  const colors = ['#C60C30','#2E6DA4','#E8A020','#6A9E6A','#F5F2EC','#B87333'];
  const count = 80;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}%;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};pointer-events:none;z-index:9999;animation:confetti-fall ${1+Math.random()*2}s linear forwards`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, i * 20);
  }
  const style = document.getElementById('confetti-style') || document.createElement('style');
  style.id = 'confetti-style';
  style.textContent = `@keyframes confetti-fall{to{transform:translateY(110vh) rotate(${360+Math.random()*360}deg);opacity:0}}`;
  document.head.appendChild(style);
};

/* ══════════════════════════════════════════════════════
   STORIES
══════════════════════════════════════════════════════ */
const renderStories = (filter = 'all') => {
  const grid = document.getElementById('stories-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? STORIES : STORIES.filter(s => s.category === filter);

  grid.innerHTML = filtered.map(s => `
    <div class="story-card">
      <div class="story-bg" style="background:${s.gradient}"></div>
      <div class="story-content">
        <p class="story-quote">"${s.quote}"</p>
        <div class="story-meta">
          <span class="story-tag">— ${s.name}, from ${s.from}</span>
          <span class="story-tag">${s.city}</span>
          <span class="story-tag">${s.year}</span>
        </div>
      </div>
    </div>
  `).join('');
};

/* ══════════════════════════════════════════════════════
   DAILY FEED
══════════════════════════════════════════════════════ */
const updateDailyFeed = () => {
  // Phrase of the day (based on date)
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const phrase = DAILY_PHRASES[dayOfYear % DAILY_PHRASES.length];
  const fact = CULTURE_FACTS[dayOfYear % CULTURE_FACTS.length];
  const nextFact = CULTURE_FACTS[(dayOfYear + 1) % CULTURE_FACTS.length];

  const phraseVal = document.getElementById('daily-phrase-val');
  const phraseSub = document.getElementById('daily-phrase-sub');
  const factVal   = document.getElementById('daily-fact-val');

  if (phraseVal) phraseVal.textContent = `"${phrase.danish}" — ${phrase.meaning}`;
  if (phraseSub) phraseSub.textContent = `Pronunciation: ${phrase.phonetic} · ${phrase.context}`;
  if (factVal)   factVal.textContent = fact;

  // Daylight (approximate for Copenhagen)
  const m = new Date().getMonth() + 1;
  const daylightHours = {
    1:'7h 15min', 2:'9h 20min', 3:'12h 10min', 4:'14h 40min',
    5:'16h 50min', 6:'17h 30min', 7:'17h 5min', 8:'15h 10min',
    9:'12h 30min', 10:'10h 10min', 11:'8h 5min', 12:'7h 0min'
  };
  const lightVal = document.getElementById('daily-light-val');
  const lightSub = document.getElementById('daily-light-sub');
  if (lightVal) lightVal.textContent = daylightHours[m];
  if (lightSub) {
    const notes = {1:'Dark season. Get a daylight lamp.', 2:'Light returning. Hang in there!',
      3:'Spring is here. Cyclists rejoice.', 4:'Beautiful golden evenings.',
      5:'Nearly midsummer magic.', 6:'Midsummer! Barely dark at midnight.',
      7:'Peak Danish summer. Everyone\'s at the beach.', 8:'Still glorious.',
      9:'Autumn colours arriving.', 10:'Cosy season begins. Hygge time.',
      11:'Dark arrives early. Candles out.', 12:'Jul (Christmas). Magical, despite the cold.'};
    lightSub.textContent = notes[m];
  }

  // Weather placeholder (would use real API in production)
  const weatherVal = document.getElementById('daily-weather-val');
  const seasons = {
    spring: '11°C · Cloudy with some sun · Good cycling weather',
    summer: '22°C · Partly sunny · Perfect beach day',
    autumn: '8°C · Rain likely · Bring a jacket',
    winter: '2°C · Cold, possibly snowy · Layer up'
  };
  const season = document.documentElement.getAttribute('data-season') || 'spring';
  if (weatherVal) weatherVal.textContent = seasons[season];
};

/* ══════════════════════════════════════════════════════
   LAYOUT HELPERS
══════════════════════════════════════════════════════ */
const showAppLayout = () => {
  const app = document.getElementById('app-layout');
  const hero = document.getElementById('hero');
  if (app) app.classList.remove('hidden');
  if (hero) {
    hero.style.height = '64px';
    hero.style.minHeight = '64px';
    hero.style.overflow = 'hidden';
  }
};

window.scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const hero = document.getElementById('hero');
  if (hero) {
    hero.style.height = '100vh';
    hero.style.minHeight = '600px';
  }
};

/* ══════════════════════════════════════════════════════
   PRINT CHECKLIST — collects all incomplete tasks
══════════════════════════════════════════════════════ */
window.printChecklist = () => {
  const lang = window.currentLang || 'en';
  const lines = [];
  lines.push(`<html><head><meta charset="utf-8"><title>My Denmark Checklist — ANKOMMER</title>`);
  lines.push(`<style>
    body{font-family:Georgia,serif;max-width:680px;margin:40px auto;color:#1a1a2e;line-height:1.6}
    h1{font-size:1.6rem;color:#C60C30;border-bottom:2px solid #C60C30;padding-bottom:8px}
    h2{font-size:1.1rem;color:#2E6DA4;margin:24px 0 8px}
    .task{display:flex;align-items:flex-start;gap:10px;padding:6px 0;border-bottom:1px solid #eee}
    .box{width:16px;height:16px;border:2px solid #888;border-radius:3px;flex-shrink:0;margin-top:3px}
    .done .box{background:#6A9E6A;border-color:#6A9E6A}
    .done .label{text-decoration:line-through;color:#999}
    .xp{font-size:0.75rem;color:#888;margin-left:auto;flex-shrink:0}
    .meta{font-size:0.8rem;color:#888;margin-top:40px;border-top:1px solid #eee;padding-top:12px}
    @media print{body{margin:20px}}
  </style></head><body>`);
  lines.push(`<h1>🇩🇰 My Denmark Checklist</h1>`);
  lines.push(`<p style="color:#888;font-size:0.85rem">Printed from ANKOMMER · movingtodenmark.org · ${new Date().toLocaleDateString()}</p>`);

  CHAPTERS.forEach(ch => {
    const tasks = ch.checklist || [];
    if (!tasks.length) return;
    const done = tasks.filter(t => AppState.completedTasks[t.id]).length;
    lines.push(`<h2>${ch.icon} ${ch.title[lang] || ch.title.en} <span style="font-size:0.75rem;font-weight:400;color:#888">(${done}/${tasks.length} done)</span></h2>`);
    tasks.forEach(t => {
      const isDone = !!AppState.completedTasks[t.id];
      const label = t.text[lang] || t.text.en || t.text;
      lines.push(`<div class="task ${isDone ? 'done' : ''}"><div class="box"></div><span class="label">${label}</span><span class="xp">+${t.xp || 10} VP</span></div>`);
    });
  });

  lines.push(`<div class="meta">ANKOMMER · Your life in Denmark. Chapter by chapter.</div></body></html>`);
  const w = window.open('', '_blank');
  if (w) { w.document.write(lines.join('')); w.document.close(); w.print(); }
};

/* ══════════════════════════════════════════════════════
   COPY TOOL RESULT TO CLIPBOARD
══════════════════════════════════════════════════════ */
window.copyToolResult = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) return;
  // Extract plain text — strip HTML tags
  const text = el.innerText || el.textContent || '';
  navigator.clipboard.writeText(text.trim()).then(() => {
    App.showToast('Result copied to clipboard ✓', 'success');
  }).catch(() => {
    App.showToast('Copy failed — try selecting the text manually', 'error');
  });
};

/* ══════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════ */
const App = {
  showToast: (msg, type = '') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
window.App = App;
window.Wizard = Wizard;
window.openBjorn = () => Bjorn.open();

/* ══════════════════════════════════════════════════════
   SCROLL ANIMATIONS (Intersection Observer)
══════════════════════════════════════════════════════ */
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  ['.tool-card', '.story-card', '.daily-card', '.section-header'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.cssText += `;opacity:0;transform:translateY(28px);transition:opacity 0.5s ${i * 0.07}s ease,transform 0.5s ${i * 0.07}s ease`;
      observer.observe(el);
    });
  });
};

/* ══════════════════════════════════════════════════════
   CHAPTERS PREVIEW GRID
   Renders all chapters as clickable cards on the landing
   page. Re-runs on every language switch.
══════════════════════════════════════════════════════ */
const renderChaptersPreview = () => {
  const grid = document.getElementById('chapters-preview-grid');
  if (!grid) return;
  const chapData = (typeof CHAPTERS !== 'undefined' && CHAPTERS) || window.CHAPTERS;
  if (!chapData || !Array.isArray(chapData)) return;
  const lang = window.currentLang || 'en';
  const L = l => (l && (l[lang] || l.en)) || '';

  grid.innerHTML = chapData.map(ch => {
    const title    = L(ch.title);
    const subtitle = L(ch.subtitle);
    const readTime = ch.readTime || '';
    const num      = String(ch.id + 1).padStart(2, '0');
    return `<button
      class="ch-preview-card"
      onclick="openChapter(${ch.id})"
      style="--ch-color: ${ch.color || 'var(--nordic-blue)'}"
      aria-label="Chapter ${ch.id + 1}: ${title}"
    >
      <div class="ch-preview-icon">${ch.icon}</div>
      <div class="ch-preview-num">${i18n.t('chapter_label')} ${num}</div>
      <div class="ch-preview-title">${title}</div>
      <div class="ch-preview-sub">${subtitle}</div>
      ${readTime ? `<div class="ch-preview-time">${readTime}</div>` : ''}
    </button>`;
  }).join('');
};
window.renderChaptersPreview = renderChaptersPreview;

/* ══════════════════════════════════════════════════════
   LIVE STATS TRACKER
   Uses CountAPI (free, no-account hit counter) with
   localStorage fallback when offline.
══════════════════════════════════════════════════════ */
const StatsTracker = (() => {
  // counterapi.dev — free, no signup required
  // NOTE: only the /up (increment) endpoint has CORS headers.
  // Strategy: hit /up once per session for visitors; cache last
  // known value in localStorage so returning visitors see real numbers.
  const NS  = 'ankommer-dk';
  const API = 'https://api.counterapi.dev/v1';

  /* Smooth count-up animation — but the COUNTER MUST BE CORRECT even if
     rAF never fires. Browsers throttle rAF in backgrounded tabs (and in
     headless / automated testing tabs), so the previous version left the
     display frozen at the wrong number until the user re-focused the tab.
     New approach:
       1. Write the final value synchronously up-front (always correct).
       2. Then start an rAF animation from `fromRaw` toward `n`. If the
          rAF runs, the user sees a count-up. If rAF is throttled, the
          synchronous write already won — display = truth.
     Per-element token cancels prior in-flight animations so back-to-back
     updates can't stomp each other. */
  const _rafTokens = new WeakMap();
  const animateTo = (el, target) => {
    if (!el) return;
    const n = parseInt(target);
    if (isNaN(n) || n < 0) return;
    const fromRaw = parseInt((el.textContent || '').replace(/[^0-9]/g, '')) || 0;
    // Synchronous final value FIRST — rAF is icing.
    el.textContent = n.toLocaleString();
    if (fromRaw === n) return;
    // Cancel any prior animation on this element
    const prior = _rafTokens.get(el);
    if (prior) cancelAnimationFrame(prior);
    const dur = 1600;
    const start = performance.now();
    // Reset to start value for the animation if rAF is alive (will overwrite
    // the synchronous final value on first tick, then ease toward target).
    const tick = (now) => {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(fromRaw + (n - fromRaw) * ease).toLocaleString();
      if (p < 1) {
        _rafTokens.set(el, requestAnimationFrame(tick));
      } else {
        _rafTokens.delete(el);
        el.textContent = n.toLocaleString();
      }
    };
    _rafTokens.set(el, requestAnimationFrame(tick));
  };

  /* Hit /up — increments counter, returns new count */
  const apiHit = async (key) => {
    const r = await fetch(`${API}/${NS}/${key}/up`, { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    // Cache the returned value so we can show it without re-hitting
    safeSetItem(`ankommer_cnt_${key}`, d.count);
    return d.count;
  };

  /* Read from localStorage cache (no network call needed for reads) */
  const localGet  = (key) => parseInt(safeGetItem(`ankommer_cnt_${key}`)) || 0;
  const localHit  = (key) => {
    const v = localGet(key) + 1;
    safeSetItem(`ankommer_cnt_${key}`, v);
    return v;
  };

  /* Show cached value immediately, then fetch real value if needed */
  const showCached = (elId, key) => {
    const cached = localGet(key);
    if (cached > 0) animateTo(document.getElementById(elId), cached);
  };

  /* Count visitor once per browser session */
  const trackVisitor = async () => {
    const el = document.getElementById('stat-visitors');
    // Show cached value immediately while fetch runs
    showCached('stat-visitors', 'visitors');
    if (sessionStorage.getItem('ankommer_session')) return; // already counted
    sessionStorage.setItem('ankommer_session', '1');
    try {
      const count = await apiHit('visitors');
      animateTo(el, count);
    } catch (_) {
      animateTo(el, localHit('visitors'));
    }
  };

  /* Count each answered Björn question */
  const trackBjornQuestion = async () => {
    const el = document.getElementById('stat-bjorn');
    try {
      const count = await apiHit('bjorn-questions');
      animateTo(el, count);
    } catch (_) {
      animateTo(el, localHit('bjorn-questions'));
    }
  };

  const init = () => {
    // Show cached counts instantly while async calls run
    showCached('stat-visitors',  'visitors');
    showCached('stat-bjorn', 'bjorn-questions');
    // Then fire live updates
    trackVisitor();
    window.addEventListener('bjornMessageSent', trackBjornQuestion);
  };

  return { init, trackBjornQuestion };
})();
window.StatsTracker = StatsTracker;

const animateHeroStats = () => StatsTracker.init();

/* ══════════════════════════════════════════════════════
   MOBILE SIDEBAR
══════════════════════════════════════════════════════ */
const initMobileSidebar = () => {
  const hamburger = document.getElementById('hamburger');
  const rail = document.getElementById('chapter-rail');

  hamburger?.addEventListener('click', () => {
    const opened = hamburger.classList.toggle('open');
    rail?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (rail?.classList.contains('open') &&
        !rail.contains(e.target) &&
        !hamburger?.contains(e.target)) {
      rail.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });
};

/* ══════════════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════════════ */
const hideLoader = () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('done');
  }, 1800);
};

/* ══════════════════════════════════════════════════════
   LANGUAGE BUTTONS
══════════════════════════════════════════════════════ */
const initLangButtons = () => {
  // Tag the .lang-selector with the current code so the mobile dropdown
  // (CSS ::before content: attr(data-current-lang)) shows e.g. "EN" / "AR"
  const syncCurrentLang = () => {
    const selector = document.querySelector('.lang-selector');
    if (selector) selector.dataset.currentLang = (window.currentLang || 'en').toUpperCase();
  };
  syncCurrentLang();
  // Re-sync after every language switch
  window.addEventListener('langChange', syncCurrentLang);

  // Mobile: tap the ::before pill to expand/collapse the dropdown
  const selector = document.querySelector('.lang-selector');
  if (selector) {
    selector.addEventListener('click', (e) => {
      // Only toggle when the click is on the bare selector (not a lang-btn child)
      if (window.matchMedia('(max-width: 600px)').matches && e.target === selector) {
        selector.classList.toggle('open');
      }
    });
    // Close after picking a language on mobile
    selector.addEventListener('click', (e) => {
      if (e.target.classList.contains('lang-btn')) selector.classList.remove('open');
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!selector.contains(e.target)) selector.classList.remove('open');
    });
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => i18n.setLang(btn.dataset.lang));
  });
};

/* ══════════════════════════════════════════════════════
   FILTER BUTTONS (stories)
══════════════════════════════════════════════════════ */
const initStoryFilters = () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStories(btn.dataset.filter);
    });
  });
};

/* ══════════════════════════════════════════════════════
   BEGIN JOURNEY BUTTON
══════════════════════════════════════════════════════ */
const initBeginBtn = () => {
  const btn = document.getElementById('begin-btn');
  if (!btn) return;

  if (AppState.wizardDone) {
    btn.textContent = t_('continueJourney', window.currentLang || 'en');
    btn.addEventListener('click', () => {
      showAppLayout();
      openChapter(1);
    });
  } else {
    btn.addEventListener('click', () => Wizard.open());
  }
};

/* ══════════════════════════════════════════════════════
   WIZARD CLOSE
══════════════════════════════════════════════════════ */
const initWizardClose = () => {
  document.getElementById('wizard-close')?.addEventListener('click', () => Wizard.close());
  document.getElementById('wizard-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'wizard-overlay') Wizard.close();
  });
};

/* ══════════════════════════════════════════════════════
   MAIN INIT
══════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════
   GLOBAL SEARCH — Ctrl/Cmd+K across all chapter content
══════════════════════════════════════════════════════ */
const Search = (() => {
  let searchIndex = [];
  let selectedIdx = -1;

  const buildIndex = () => {
    searchIndex = [];
    (CHAPTERS || []).forEach(ch => {
      const lang = window.currentLang || 'en';
      const chTitle = ch.title?.[lang] || ch.title?.en || '';
      const chSub   = ch.subtitle?.[lang] || ch.subtitle?.en || '';
      const chIntro = ch.intro?.[lang] || ch.intro?.en || '';

      // Index the chapter itself
      searchIndex.push({
        type: 'chapter', chapterId: ch.id, icon: ch.icon,
        title: chTitle, sub: chSub,
        body: chIntro, color: ch.color,
      });

      // Index each section
      (ch.sections || []).forEach(sec => {
        const secTitle = sec.title?.[lang] || sec.title?.en || '';
        const secBody  = (sec.content?.[lang] || sec.content?.en || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        searchIndex.push({
          type: 'section', chapterId: ch.id, icon: sec.icon || ch.icon,
          title: secTitle, sub: `${ch.icon} ${chTitle}`,
          body: secBody, color: ch.color,
        });
      });

      // Index checklist items
      (ch.checklist || []).forEach(item => {
        const itemText = item.text?.[lang] || item.text?.en || '';
        searchIndex.push({
          type: 'task', chapterId: ch.id, icon: '☑️',
          title: itemText, sub: `${ch.icon} ${chTitle} · checklist`,
          body: '', color: ch.color,
        });
      });
    });
  };

  const query = (q) => {
    if (!q || q.length < 2) return [];
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = searchIndex.map(item => {
      const haystack = `${item.title} ${item.sub} ${item.body}`.toLowerCase();
      let score = 0;
      terms.forEach(t => {
        if (item.title.toLowerCase().includes(t)) score += 10;
        if (item.sub.toLowerCase().includes(t)) score += 5;
        if (item.body.toLowerCase().includes(t)) score += 2;
      });
      return { ...item, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);
    return scored.slice(0, 8);
  };

  // Escape HTML special chars — prevents XSS when user input is rendered into innerHTML
  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const highlight = (text, q) => {
    if (!q) return escapeHtml(text);
    // Escape the source text first, then wrap matches in <mark>
    const safeText = escapeHtml(text);
    const terms = q.split(/\s+/).filter(Boolean);
    let out = safeText;
    terms.forEach(t => {
      if (t.length < 2) return;
      const safeT = escapeHtml(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp(`(${safeT})`, 'gi'), '<mark>$1</mark>');
    });
    return out;
  };

  const render = (results, q) => {
    const el = document.getElementById('search-results');
    if (!el) return;
    selectedIdx = -1;

    const _l = window.currentLang || 'en';
    if (!q || q.length < 2) {
      el.innerHTML = `<div class="search-empty">
        <div class="search-empty-icon">🔍</div>
        <div class="search-empty-text">${t_('searchHint', _l)}</div>
      </div>`;
      return;
    }

    if (!results.length) {
      // escapeHtml prevents XSS from user query appearing in innerHTML
      el.innerHTML = `<div class="search-empty"><div class="search-empty-icon">🤷</div><div class="search-empty-text">${t_('searchNoResults', _l, escapeHtml(q))}</div></div>`;
      return;
    }

    const typeLabel = { chapter: t_('searchTypeChapter', _l), section: t_('searchTypeTopic', _l), task: t_('searchTypeTask', _l) };

    el.innerHTML = `<ul class="search-result-list" role="listbox">
      ${results.map((r, i) => `
        <li class="search-result-item" role="option" data-idx="${i}" data-chapter="${r.chapterId}">
          <div class="sri-icon" style="background:${r.color}20;color:${r.color}">${r.icon}</div>
          <div class="sri-body">
            <div class="sri-title">${highlight(r.title, q)}</div>
            <div class="sri-sub">${highlight(r.sub, q)} <span class="sri-type">${typeLabel[r.type]}</span></div>
          </div>
          <div class="sri-arrow">→</div>
        </li>
      `).join('')}
    </ul>`;

    el.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const chId = parseInt(item.dataset.chapter);
        close();
        setTimeout(() => openChapter(chId), 120);
      });
      item.addEventListener('mouseenter', () => {
        el.querySelectorAll('.search-result-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        selectedIdx = parseInt(item.dataset.idx);
      });
    });
  };

  let focusTrap = null;

  const open = () => {
    const overlay = document.getElementById('search-overlay');
    const input   = document.getElementById('search-input');
    if (!overlay) return;
    buildIndex();
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Use two rAF frames so the overlay is painted before focus — prevents dropped keystrokes
    requestAnimationFrame(() => requestAnimationFrame(() => {
      input?.focus();
      input?.select();
    }));
    render([], '');
    // Focus trap: Tab cycles inside, Escape closes, focus returns to trigger
    focusTrap = FocusTrap(overlay, { onEscape: close });
    focusTrap.activate(document.activeElement);
  };

  const close = () => {
    const overlay = document.getElementById('search-overlay');
    if (!overlay || overlay.classList.contains('hidden')) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    focusTrap?.deactivate();
    focusTrap = null;
  };

  const init = () => {
    document.getElementById('search-open-btn')?.addEventListener('click', open);
    document.getElementById('search-backdrop')?.addEventListener('click', close);

    // Ctrl+K / Cmd+K — Escape is handled by FocusTrap when overlay is open
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
    });

    // Input handler
    let debounce;
    document.getElementById('search-input')?.addEventListener('input', (e) => {
      clearTimeout(debounce);
      const q = e.target.value.trim();
      debounce = setTimeout(() => render(query(q), q), 140);
    });

    // Keyboard navigation inside overlay
    document.getElementById('search-overlay')?.addEventListener('keydown', (e) => {
      const items = document.querySelectorAll('.search-result-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = Math.max(selectedIdx - 1, 0);
      } else if (e.key === 'Enter' && selectedIdx >= 0) {
        e.preventDefault();
        const active = items[selectedIdx];
        if (active) { close(); setTimeout(() => openChapter(parseInt(active.dataset.chapter)), 120); }
        return;
      }
      items.forEach((item, i) => item.classList.toggle('active', i === selectedIdx));
      items[selectedIdx]?.scrollIntoView({ block: 'nearest' });
    });
  };

  return { init, open, close };
})();

/* ══════════════════════════════════════════════════════
   PERSISTENT ROADMAP STRIP — survives page refresh
══════════════════════════════════════════════════════ */
const RoadmapStrip = (() => {
  const STORAGE_KEY = 'ankommer_roadmap_profile';
  const DISMISS_KEY = 'ankommer_roadmap_dismissed';

  const CHAPTER_LABELS = {
    0: 'Before You Land', 1: 'First 72 Hours', 2: 'Papers & Legal',
    3: 'Housing', 4: 'Money & Banking', 5: 'Healthcare',
    6: 'Children & Family', 7: 'Education', 8: 'Employment', 9: 'Startups',
  };
  const CHAPTER_ICONS = {
    0:'✈️', 1:'⚡', 2:'📋', 3:'🏠', 4:'💰', 5:'🏥', 6:'👧', 7:'🎓', 8:'💼', 9:'🚀',
  };

  const buildPriorities = (answers, lang) => {
    const prios = [];
    const a = answers || {};
    const l = lang || window.currentLang || 'en';

    // Always: address + CPR first
    prios.push({ chapterIndex: 1, label: t_('prio_cpr', l), icon: '⚡', urgent: true });

    if (a.timing === 'just_arrived' || a.timing === 'settling') {
      prios.push({ chapterIndex: 4, label: t_('prio_tax', l), icon: '💰', urgent: true });
    }
    if (a.reason === 'work' || a.reason === 'startup') {
      prios.push({ chapterIndex: 8, label: t_('prio_akasse', l), icon: '💼', urgent: false });
    }
    if (a.reason === 'study') {
      prios.push({ chapterIndex: 7, label: t_('prio_su', l), icon: '🎓', urgent: false });
    }
    if (a.reason === 'startup') {
      prios.push({ chapterIndex: 9, label: t_('prio_cvr', l), icon: '🚀', urgent: false });
    }
    if (a.family === 'family_small' || a.family === 'family_school') {
      prios.push({ chapterIndex: 6, label: t_('prio_child', l), icon: '👧', urgent: false });
    }
    prios.push({ chapterIndex: 5, label: t_('prio_health', l), icon: '🏥', urgent: false });
    prios.push({ chapterIndex: 3, label: t_('prio_housing', l), icon: '🏠', urgent: false });

    return prios.slice(0, 4);
  };

  const show = (profile, lang) => {
    if (safeGetItem(DISMISS_KEY) === 'true') return;
    const strip = document.getElementById('my-roadmap-strip');
    if (!strip) return;

    const l = lang || window.currentLang || 'en';
    const a = profile.answers || {};
    const cityMap = { cph: 'Copenhagen', aarhus: 'Aarhus', odense: 'Odense', aalborg: 'Aalborg', small: 'your city', undecided: 'Denmark' };
    const city = cityMap[a.location] || 'Denmark';
    const reason = t_('reason_' + (a.reason || 'work'), l) || 'your journey';

    document.getElementById('roadmap-strip-title').textContent = t_('roadmapTitle', l, city);
    document.getElementById('roadmap-strip-sub').textContent = t_('roadmapSub', l, reason);
    // Update button text
    const editBtn = document.getElementById('roadmap-edit-btn');
    if (editBtn) editBtn.textContent = t_('roadmapUpdate', l);

    const prios = buildPriorities(a, l);
    const priEl = document.getElementById('roadmap-strip-priorities');
    if (priEl) {
      priEl.innerHTML = prios.map(p => `
        <button class="roadmap-prio-chip ${p.urgent ? 'urgent' : ''}" onclick="openChapter(${p.chapterIndex})">
          ${p.icon} ${p.label} ${p.urgent ? '<span class="prio-dot"></span>' : ''}
        </button>
      `).join('');
    }

    strip.classList.remove('hidden');
    strip.style.animation = 'roadmap-slide-in 0.4s cubic-bezier(0.34,1.56,0.64,1)';
  };

  const hide = () => {
    const strip = document.getElementById('my-roadmap-strip');
    if (strip) strip.classList.add('hidden');
    safeSetItem(DISMISS_KEY, 'true');
  };

  // Re-render with current language (called on lang switch)
  const refresh = () => {
    if (safeGetItem(DISMISS_KEY) === 'true') return;
    const saved = safeGetItem(STORAGE_KEY);
    if (saved) {
      try { show(JSON.parse(saved), window.currentLang); } catch(e) {}
    }
  };

  const init = () => {
    document.getElementById('roadmap-dismiss-btn')?.addEventListener('click', hide);
    document.getElementById('roadmap-edit-btn')?.addEventListener('click', () => {
      try { localStorage.removeItem(DISMISS_KEY); } catch(_){}
      Wizard.open();
    });

    // Show if wizard already completed in a previous session
    const saved = safeGetItem(STORAGE_KEY);
    if (saved) {
      try { show(JSON.parse(saved)); } catch(e) {}
    }

    // Show when wizard completes (fresh run)
    window.addEventListener('wizardComplete', (e) => {
      if (e.detail) {
        safeSetItem(STORAGE_KEY, JSON.stringify(e.detail));
        localStorage.removeItem(DISMISS_KEY);
        show(e.detail);
      }
    });
  };

  return { init, show, hide, refresh };
})();

/* ══════════════════════════════════════════════════════
   TIMELINE VIEW — Week 1 / Month 1 / Month 3 / Year 1
══════════════════════════════════════════════════════ */
const Timeline = (() => {
  const TIMELINE_DATA = {
    week1: {
      label: 'Week 1 — The Critical Window',
      icon: '⚡',
      color: '#C60C30',
      desc: 'These are not optional. Do all of these in your first 7 days.',
      tasks: [
        { id:'tl_address',   icon:'📍', text:'Register your address at Borgerservice or borger.dk',       source:'borger.dk', urgent:true,  chapter:1 },
        { id:'tl_cpr_book',  icon:'🆔', text:'Book ICS appointment to get your CPR number',               source:'nyidanmark.dk', urgent:true, chapter:1 },
        { id:'tl_mitid',     icon:'🔐', text:'Activate MitID — your Danish digital identity',             source:'mitid.dk', urgent:true, chapter:1 },
        { id:'tl_ebox',      icon:'📬', text:'Set up e-Boks and enable push notifications',               source:'e-boks.com', urgent:true, chapter:1 },
        { id:'tl_sim',       icon:'📱', text:'Get a Danish SIM card (TDC, Lebara, Oister, Lycamobile)',   source:'—', urgent:false, chapter:1 },
        { id:'tl_emergency', icon:'🚨', text:'Save 1813 (urgent medical) and 112 (emergency) in phone',   source:'sundhed.dk', urgent:true, chapter:5 },
        { id:'tl_insurance', icon:'🛡️', text:'Confirm you have health insurance until yellow card arrives',source:'—', urgent:true, chapter:5 },
      ]
    },
    month1: {
      label: 'Month 1 — Building the Foundation',
      icon: '🏗️',
      color: '#2E6DA4',
      desc: 'Get the essentials working. Your financial and healthcare life starts here.',
      tasks: [
        { id:'tl_skattekort', icon:'📊', text:'Get your skattekort (tax card) from skat.dk before first paycheck', source:'skat.dk', urgent:true, chapter:4 },
        { id:'tl_bank',       icon:'🏦', text:'Open a Danish bank account (Lunar, Nordea, or Danske Bank)',        source:'—', urgent:true, chapter:4 },
        { id:'tl_nemkonto',   icon:'💳', text:'Register your NemKonto at nemkonto.dk',                             source:'nemkonto.dk', urgent:true, chapter:4 },
        { id:'tl_mobilepay',  icon:'📱', text:'Download and activate MobilePay',                                   source:'mobilepay.dk', urgent:false, chapter:4 },
        { id:'tl_gp',         icon:'👨‍⚕️', text:'Register with a GP (doctor) at sundhed.dk',                         source:'sundhed.dk', urgent:true, chapter:5 },
        { id:'tl_sygesik',    icon:'🦷', text:'Join Sygeforsikring "denmark" for dental coverage',                 source:'sygeforsikring.dk', urgent:false, chapter:5 },
        { id:'tl_akasse',     icon:'🛡️', text:'Join an a-kasse (unemployment insurance) — 12 month wait starts now',source:'ase.dk', urgent:true, chapter:8 },
        { id:'tl_childcare',  icon:'🍼', text:'Apply for vuggestue/børnehave if you have young children',           source:'borger.dk', urgent:false, chapter:6 },
        { id:'tl_rejsekort',  icon:'🚌', text:'Buy a Rejsekort for public transport',                              source:'rejsekort.dk', urgent:false, chapter:10 },
      ]
    },
    month3: {
      label: 'Month 3 — Settling In',
      icon: '🌱',
      color: '#6A9E6A',
      desc: 'The paperwork is done. Now build your actual life.',
      tasks: [
        { id:'tl_danish',     icon:'🗣️', text:'Enrol in free Danskuddannelse language classes at your municipality',source:'nyidanmark.dk', urgent:false, chapter:11 },
        { id:'tl_union',      icon:'🤝', text:'Consider joining a union (fagforening) for contract protection',    source:'—', urgent:false, chapter:8 },
        { id:'tl_pension',    icon:'🏛️', text:'Confirm your employer pension (arbejdsmarkedspension) is active',   source:'pensionsinfo.dk', urgent:false, chapter:4 },
        { id:'tl_yellowcard', icon:'💛', text:'Receive and use your yellow sundhedskort at your GP',               source:'sundhed.dk', urgent:false, chapter:5 },
        { id:'tl_bike',       icon:'🚲', text:'Buy a bicycle — you will use it every day',                         source:'—', urgent:false, chapter:10 },
        { id:'tl_expat',      icon:'👥', text:'Join an expat community (InterNations, local Facebook groups)',      source:'—', urgent:false, chapter:12 },
        { id:'tl_insurance2', icon:'🏠', text:'Get indboforsikring (home contents insurance)',                     source:'—', urgent:false, chapter:3 },
        { id:'tl_sport',      icon:'⚽', text:'Join a sports club or forening — this is how Danes socialise',      source:'—', urgent:false, chapter:12 },
      ]
    },
    month6: {
      label: 'Month 6 — Taking Root',
      icon: '🌳',
      color: '#B87333',
      desc: 'Half a year in. Time to think longer-term.',
      tasks: [
        { id:'tl_pd1',        icon:'📝', text:'Book your first Danish language test (PD1 or PD2)',                 source:'—', urgent:false, chapter:11 },
        { id:'tl_perm_date',  icon:'📅', text:'Calculate your permanent residency eligibility date',               source:'nyidanmark.dk', urgent:false, chapter:2 },
        { id:'tl_tax_check',  icon:'💰', text:'Review and update your forskudsopgørelse at skat.dk',              source:'skat.dk', urgent:false, chapter:4 },
        { id:'tl_social_hous',icon:'🏘️', text:'Join social housing (almen bolig) waitlist if planning long-term', source:'—', urgent:false, chapter:3 },
        { id:'tl_driving',    icon:'🚗', text:'Sort your driving licence conversion if applicable',                source:'borger.dk', urgent:false, chapter:2 },
        { id:'tl_atp',        icon:'🏛️', text:'Check your ATP pension balance at atp.dk',                         source:'atp.dk', urgent:false, chapter:4 },
      ]
    },
    year1: {
      label: 'Year 1 Complete — Well Done',
      icon: '🎉',
      color: '#C60C30',
      desc: 'You\'ve made it through the first year. Check these milestones.',
      tasks: [
        { id:'tl_aarsopg',   icon:'📋', text:'Check your årsopgørelse in March — claim your tax refund!',         source:'skat.dk', urgent:true, chapter:4 },
        { id:'tl_cpr_update',icon:'🔄', text:'Update your CPR address if you moved during the year',              source:'borger.dk', urgent:false, chapter:1 },
        { id:'tl_pd2',       icon:'📝', text:'Aim to pass PD2 Danish language test by end of year 1',             source:'—', urgent:false, chapter:11 },
        { id:'tl_network',   icon:'💼', text:'Attend at least one professional networking event in Denmark',       source:'—', urgent:false, chapter:8 },
        { id:'tl_perm_check',icon:'⏱️', text:'Review permanent residency requirements and progress',              source:'nyidanmark.dk', urgent:false, chapter:2 },
        { id:'tl_pension_rv',icon:'🏛️', text:'Review your pension contributions at pensionsinfo.dk',             source:'pensionsinfo.dk', urgent:false, chapter:4 },
        { id:'tl_celebrate', icon:'🎊', text:'You\'ve built a life in Denmark. That\'s remarkable.',              source:'—', urgent:false, chapter:0 },
      ]
    }
  };

  let completedTasks = safeGetJSON('ankommer_tl_tasks', {});
  let currentPhase = 'week1';

  const saveTask = (id, done) => {
    completedTasks[id] = done;
    safeSetItem('ankommer_tl_tasks', JSON.stringify(completedTasks));
  };

  const render = (phase) => {
    currentPhase = phase;
    const data = TIMELINE_DATA[phase];
    const el   = document.getElementById('timeline-content');
    if (!el || !data) return;

    const done  = data.tasks.filter(t => completedTasks[t.id]).length;
    const total = data.tasks.length;
    const pct   = Math.round((done / total) * 100);

    el.innerHTML = `
      <div class="tl-phase-card">
        <div class="tl-phase-header" style="--phase-color:${data.color}">
          <div class="tl-phase-title">${data.icon} ${data.label}</div>
          <div class="tl-phase-progress">
            <div class="tl-progress-bar"><div class="tl-progress-fill" style="width:${pct}%;background:${data.color}"></div></div>
            <span class="tl-progress-label">${done}/${total} done</span>
          </div>
        </div>
        <p class="tl-phase-desc">${data.desc}</p>
        <ul class="tl-task-list">
          ${data.tasks.map(t => `
            <li class="tl-task ${completedTasks[t.id] ? 'done' : ''} ${t.urgent ? 'urgent' : ''}" data-id="${t.id}" data-chapter="${t.chapter}">
              <button class="tl-check-btn" aria-label="Mark done" onclick="Timeline.toggle('${t.id}')">
                ${completedTasks[t.id] ? '✓' : ''}
              </button>
              <div class="tl-task-body">
                <span class="tl-task-icon">${t.icon}</span>
                <span class="tl-task-text">${t.text}</span>
                ${t.urgent ? '<span class="tl-urgent-badge">Urgent</span>' : ''}
              </div>
              <button class="tl-chapter-btn" onclick="openChapter(${t.chapter})" title="Open chapter">→</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    // Add XP when tasks completed via timeline
    el.querySelectorAll('.tl-check-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const task = data.tasks[i];
        if (!completedTasks[task.id]) {
          XPSystem.add(15, `${task.icon} Timeline task`);
        }
      });
    });
  };

  const toggle = (id) => {
    completedTasks[id] = !completedTasks[id];
    saveTask(id, completedTasks[id]);
    render(currentPhase);
  };

  const init = () => {
    document.querySelectorAll('.tl-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tl-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        render(tab.dataset.phase);
      });
    });
    render('week1');
  };

  return { init, render, toggle };
})();

window.Timeline = Timeline;

document.addEventListener('DOMContentLoaded', () => {

  const _try = (label, fn) => {
    try { fn(); } catch (e) { console.error(`[ANKOMMER] ${label} failed:`, e); }
  };

  // Core systems
  _try('ThemeManager', () => ThemeManager.init());
  _try('Atmosphere',   () => Atmosphere.init());
  _try('i18n',         () => i18n.applyAll());

  // UI
  _try('hideLoader',       () => hideLoader());
  _try('initLangButtons',  () => initLangButtons());
  _try('initBeginBtn',     () => initBeginBtn());
  _try('initWizardClose',  () => initWizardClose());
  _try('initMobileSidebar',() => initMobileSidebar());
  _try('initProgressIO',   () => initProgressIO());

  // Content
  _try('updateDailyFeed',       () => updateDailyFeed());
  _try('buildRailNav',          () => buildRailNav());
  _try('XPSystem',              () => XPSystem.updateUI());
  _try('ChaptersPreview',       () => renderChaptersPreview());

  // Search, Roadmap, Timeline
  _try('Search',      () => Search.init());
  _try('Roadmap',     () => RoadmapStrip.init());
  _try('Timeline',    () => Timeline.init());

  // Tools
  _try('Calculators', () => Calculators.init());

  // Live APIs (exchange rates, DAWA, weather, transport, jobs)
  _try('APIs', () => { if (typeof APIs !== 'undefined') APIs.init(); });

  // Björn
  _try('Bjorn', () => {
    Bjorn.init();
    if (AppState.profile) Bjorn.setProfile(AppState.profile);
  });

  // PWA install prompt
  _try('PWAInstall', () => PWAInstall.init());

  // Round 2B: cross-tab sync. Without this, two open tabs each hold a stale
  // copy of completedTasks/xp; the last writer wins and silently overwrites
  // the other tab's progress. Listen for storage events and re-hydrate state.
  _try('crossTabSync', () => {
    window.addEventListener('storage', (e) => {
      if (!e.key || !e.key.startsWith('ankommer_')) return;
      if (e.key === 'ankommer_xp') {
        const n = parseInt(e.newValue || '0', 10);
        AppState.xp = Number.isFinite(n) ? n : 0;
        XPSystem.updateUI();
      } else if (e.key === 'ankommer_tasks') {
        try { AppState.completedTasks = JSON.parse(e.newValue || '{}') || {}; } catch { /* keep current */ }
        if (AppState.currentChapter !== null) renderChapter(AppState.currentChapter);
      } else if (e.key === 'ankommer_profile') {
        try { AppState.profile = JSON.parse(e.newValue || '{}') || {}; } catch { /* keep current */ }
      }
    });
  });

  // Scroll animations (small delay for layout settle)
  _try('scrollAnimations', () => setTimeout(initScrollAnimations, 500));
  _try('heroStats',        () => animateHeroStats());

  // Resume journey if wizard was completed
  if (AppState.wizardDone && AppState.profile) {
    window.dispatchEvent(new CustomEvent('profileSet', { detail: AppState.profile }));
  }

  // ── URL hash deep-link: open chapter directly from URL ──
  const _openFromHash = (hash) => {
    const m = hash.match(/^#chapter-(\d+)$/);
    if (m) {
      const idx = parseInt(m[1], 10);
      if (idx >= 0 && idx < CHAPTERS.length) {
        showAppLayout();
        renderChapter(idx);
      }
    }
  };
  _openFromHash(location.hash);
  window.addEventListener('hashchange', () => _openFromHash(location.hash));

  // ── Re-entry prompt: welcome back returning users ──
  const _VISIT_KEY  = 'ankommer_last_visit';
  const _VISIT_NOW  = Date.now();
  const _lastVisit  = parseInt(safeGetItem(_VISIT_KEY, '0'), 10);
  safeSetItem(_VISIT_KEY, _VISIT_NOW);

  // Show nudge if: returning after 2+ days AND has started the journey
  if (_lastVisit > 0 && _VISIT_NOW - _lastVisit > 2 * 86400000 && AppState.wizardDone) {
    const _lang = window.currentLang || 'en';
    // Find their next incomplete task
    let _nextTask = null;
    for (const ch of CHAPTERS) {
      for (const t of (ch.checklist || [])) {
        if (!AppState.completedTasks[t.id]) {
          _nextTask = { task: t.text[_lang] || t.text.en, chapterTitle: ch.title[_lang] || ch.title.en };
          break;
        }
      }
      if (_nextTask) break;
    }
    const _msg = {
      en: _nextTask ? `Welcome back 🇩🇰 Next up: "${_nextTask.task}" in ${_nextTask.chapterTitle}` : 'Welcome back 🇩🇰 All tasks complete — Dansker i Sjælen!',
      fr: _nextTask ? `Content de vous revoir 🇩🇰 Prochain: "${_nextTask.task}"` : 'Content de vous revoir 🇩🇰',
      ar: _nextTask ? `مرحباً بعودتك 🇩🇰 التالي: "${_nextTask.task}"` : 'مرحباً بعودتك 🇩🇰',
      es: _nextTask ? `Bienvenido de nuevo 🇩🇰 Siguiente: "${_nextTask.task}"` : 'Bienvenido de nuevo 🇩🇰',
      da: _nextTask ? `Velkommen tilbage 🇩🇰 Næste: "${_nextTask.task}"` : 'Velkommen tilbage 🇩🇰 Alt klaret!',
    };
    setTimeout(() => App.showToast(_msg[_lang] || _msg.en, 'info'), 1200);
  }

  // Smooth scroll to section when fragment links used
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('%cANKOMMER 🇩🇰', 'font-size:24px;font-weight:bold;color:#C60C30;font-family:serif');
  console.log('%cYour life in Denmark. Chapter by chapter.', 'color:#2E6DA4;font-size:12px');
});
