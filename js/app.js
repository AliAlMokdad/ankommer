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
  yourChecklist: { en:'Your Checklist', fr:'Votre Liste de Tâches', ar:'قائمة مهامك', es:'Tu Lista de Tareas', da:'Din Tjekliste', ur:'آپ کی چیک لسٹ', de:"Deine Checkliste", uk:"Твій список", pl:"Twoja lista", fa:'چک‌لیست شما' },
  tasksComplete: { en:(d,t)=>`${d} of ${t} tasks complete`, fr:(d,t)=>`${d} sur ${t} tâches terminées`, ar:(d,t)=>`${d} من ${t} مهام مكتملة`, es:(d,t)=>`${d} de ${t} tareas completas`, da:(d,t)=>`${d} af ${t} opgaver fuldført`, de:(d,t)=>`${d} von ${t} Aufgaben erledigt`, uk:(d,t)=>`${d} з ${t} завдань виконано`, pl:(d,t)=>`${d} z ${t} zadań ukończonych`, ur:(d,t)=>`${t} میں سے ${d} کام مکمل`, fa:(d,t)=>`${d} از ${t} وظیفه انجام شد` },
  complete:      { en:'✅ Complete!', fr:'✅ Terminé!', ar:'✅ مكتمل!', es:'✅ ¡Completo!', da:'✅ Færdig!', ur:'✅ مکمل!', de:"✅ Erledigt!", uk:"✅ Готово!", pl:"✅ Ukończone!", fa:'✅ کامل شد!' },
  readTime:      { en:(t)=>`⏱ ${t} read`, fr:(t)=>`⏱ ${t} de lecture`, ar:(t)=>`⏱ ${t} للقراءة`, es:(t)=>`⏱ ${t} de lectura`, da:(t)=>`⏱ ${t} læsning`, de:(t)=>`⏱ ${t} Lesezeit`, uk:(t)=>`⏱ ${t} читання`, pl:(t)=>`⏱ ${t} czytania`, ur:(t)=>`⏱ ${t} مطالعہ`, fa:(t)=>`⏱ ${t} مطالعه` },
  tasks:         { en:'tasks', fr:'tâches', ar:'مهام', es:'tareas', da:'opgaver', ur:'کام', de:"Aufgaben", uk:"завдань", pl:"zadań", fa:'وظایف' },
  bjornSays:     { en:'Bjørn says:', fr:'Bjørn dit :', ar:'يقول بيورن:', es:'Bjørn dice:', da:'Bjørn siger:', ur:'بیورن کہتا ہے:', de:"Bjørn sagt:", uk:"Бйорн каже:", pl:"Bjørn mówi:", fa:'بیورن می‌گوید:' },
  askBjorn:      { en:(t)=>`🛡️ Ask Bjørn about ${t}`, fr:(t)=>`🛡️ Demander à Bjørn sur ${t}`, ar:(t)=>`🛡️ اسأل بيورن عن ${t}`, es:(t)=>`🛡️ Preguntar a Bjørn sobre ${t}`, da:(t)=>`🛡️ Spørg Bjørn om ${t}`, de:(t)=>`🛡️ Bjørn zu ${t} fragen`, uk:(t)=>`🛡️ Запитати Бйорна про ${t}`, pl:(t)=>`🛡️ Zapytaj Bjørna o ${t}`, ur:(t)=>`🛡️ ${t} کے بارے میں بیورن سے پوچھیں`, fa:(t)=>`🛡️ از بیورن درباره ${t} بپرسید` },
  askBjornCh:    { en:'🛡️ Ask Bjørn about this chapter', fr:'🛡️ Demander à Bjørn sur ce chapitre', ar:'🛡️ اسأل بيورن عن هذا الفصل', es:'🛡️ Preguntar a Bjørn sobre este capítulo', da:'🛡️ Spørg Bjørn om dette kapitel', ur:'🛡️ اس باب کے بارے میں بیورن سے پوچھیں', de:"🛡️ Bjørn zu diesem Kapitel fragen", uk:"🛡️ Запитати Бйорна про цей розділ", pl:"🛡️ Zapytaj Bjørna o ten rozdział", fa:'🛡️ از بیورن درباره این فصل بپرسید' },
  chapterWord:   { en:'Chapter', fr:'Chapitre', ar:'فصل', es:'Capítulo', da:'Kapitel', ur:'باب', de:"Kapitel", uk:"Розділ", pl:"Rozdział", fa:'فصل' },
  comingSoonTitle:{ en:'Full content coming soon', fr:'Contenu complet bientôt disponible', ar:'المحتوى الكامل قريباً', es:'Contenido completo próximamente', da:'Fuldt indhold kommer snart', ur:'مکمل مواد جلد آ رہا ہے', de:"Vollständiger Inhalt kommt bald", uk:"Повний вміст незабаром", pl:"Pełna treść już wkrótce", fa:'محتوای کامل به زودی می‌آید' },
  comingSoonBody: { en:'This chapter is being researched and written to our ultra-high standard. In the meantime, Bjørn can answer any questions about this topic.', fr:'Ce chapitre est en cours de recherche et de rédaction selon nos normes les plus élevées. En attendant, Bjørn peut répondre à vos questions sur ce sujet.', ar:'يتم حالياً البحث في هذا الفصل وكتابته وفق أعلى معاييرنا. في هذه الأثناء، يمكن لبيورن الإجابة على أي أسئلة حول هذا الموضوع.', es:'Este capítulo está siendo investigado y redactado según nuestros más altos estándares. Mientras tanto, Bjørn puede responder cualquier pregunta sobre este tema.', da:'Dette kapitel er ved at blive undersøgt og skrevet til vores højeste standard. I mellemtiden kan Bjørn besvare spørgsmål om dette emne.', ur:'اس باب پر ہمارے اعلیٰ معیار کے مطابق تحقیق اور تحریر جاری ہے۔ اس دوران، بیورن اس موضوع کے کسی بھی سوال کا جواب دے سکتا ہے۔', de:"Dieses Kapitel wird gerade nach unserem höchsten Standard recherchiert und geschrieben. In der Zwischenzeit kann Bjørn alle Fragen zu diesem Thema beantworten.", uk:"Цей розділ зараз досліджується та пишеться за найвищими стандартами. Тим часом Бйорн може відповісти на будь-які питання з цієї теми.", pl:"Ten rozdział jest obecnie badany i pisany według naszych najwyższych standardów. Tymczasem Bjørn może odpowiedzieć na każde pytanie na ten temat.", fa:'این فصل در حال تحقیق و نگارش با بالاترین استانداردهای ما است. در این میان، بیورن می‌تواند هر سوالی درباره این موضوع را پاسخ دهد.' },
  // Roadmap strip
  roadmapTitle: { en:(c)=>`Your Denmark Roadmap — ${c}`, fr:(c)=>`Votre Feuille de Route — ${c}`, ar:(c)=>`خارطة طريقك — ${c}`, es:(c)=>`Tu Hoja de Ruta — ${c}`, da:(c)=>`Din Danmarksplan — ${c}`, ur:(c)=>`ڈنمارک کا آپ کا روڈ میپ — ${c}`, de:(c)=>`Dein Dänemark-Plan — ${c}`, uk:(c)=>`Ваш план Данії — ${c}`, pl:(c)=>`Twój plan Danii — ${c}`, fa:(c)=>`نقشه راه دانمارک شما — ${c}` },
  roadmapSub:   { en:(r)=>`Here for ${r} · Your top priorities`, fr:(r)=>`Ici pour ${r} · Vos priorités`, ar:(r)=>`هنا من أجل ${r} · أولوياتك`, es:(r)=>`Aquí para ${r} · Tus prioridades`, da:(r)=>`Her for ${r} · Dine prioriteter`, ur:(r)=>`${r} کے لیے یہاں · آپ کی اولین ترجیحات`, de:(r)=>`Hier wegen ${r} · Deine Prioritäten`, uk:(r)=>`Тут заради ${r} · Ваші пріоритети`, pl:(r)=>`Tu dla ${r} · Twoje priorytety`, fa:(r)=>`اینجا برای ${r} · اولویت‌های شما` },
  roadmapUpdate:{ en:'✏️ Update', fr:'✏️ Modifier', ar:'✏️ تعديل', es:'✏️ Actualizar', da:'✏️ Opdater', ur:'✏️ اپ ڈیٹ', de:"✏️ Aktualisieren", uk:"✏️ Оновити", pl:"✏️ Aktualizuj", fa:'✏️ به‌روزرسانی' },
  // Roadmap priority chip labels
  prio_cpr:    { en:'Register address & get CPR', fr:'Adresse & CPR', ar:'التسجيل والـ CPR', es:'Dirección & CPR', da:'Adresse & CPR', ur:'پتہ رجسٹر کریں اور CPR حاصل کریں', de:"Adresse & CPR", uk:"Адреса і CPR", pl:"Adres i CPR", fa:'ثبت آدرس و دریافت CPR' },
  prio_tax:    { en:'Get skattekort & NemKonto', fr:'Skattekort & NemKonto', ar:'Skattekort و NemKonto', es:'Skattekort & NemKonto', da:'Skattekort & NemKonto', ur:'Skattekort اور NemKonto حاصل کریں', de:"Skattekort & NemKonto", uk:"Skattekort і NemKonto", pl:"Skattekort i NemKonto", fa:'دریافت Skattekort و NemKonto' },
  prio_akasse: { en:"Join a-kasse (don't wait!)", fr:"A-kasse (n'attendez pas!)", ar:"انضم لـ a-kasse الآن!", es:"Unirse a a-kasse (¡ya!)", da:"Tilmeld a-kasse (vent ikke!)", ur:"a-kasse میں شامل ہوں (انتظار نہ کریں!)", de:"A-kasse beitreten (jetzt!)", uk:"Приєднатись до a-kasse (зараз!)", pl:"Dołącz do a-kasse (teraz!)", fa:"عضویت a-kasse (صبر نکنید!)" },
  prio_su:     { en:'Apply for SU grant', fr:'Demander la bourse SU', ar:'التقدم لمنحة SU', es:'Solicitar beca SU', da:'Ansøg om SU', ur:'SU گرانٹ کے لیے درخواست دیں', de:"SU beantragen", uk:"Подати на SU", pl:"Złóż wniosek o SU", fa:'درخواست بورسیه SU' },
  prio_cvr:    { en:'Register CVR number', fr:'Numéro CVR', ar:'رقم CVR', es:'Número CVR', da:'CVR-nummer', ur:'CVR نمبر رجسٹر کریں', de:"CVR-Nummer", uk:"Номер CVR", pl:"Numer CVR", fa:'ثبت شماره CVR' },
  prio_child:  { en:'Apply for childcare (waitlist!)', fr:'Crèche (liste d\'attente!)', ar:'الحضانة (قائمة انتظار!)', es:'Guardería (¡lista espera!)', da:'Daginstitution (venteliste!)', ur:'بچوں کی دیکھ بھال کے لیے درخواست دیں (ویٹ لسٹ!)', de:"Kita (Warteliste!)", uk:"Дитсадок (черга!)", pl:"Żłobek (lista!)", fa:'درخواست مراقبت از کودک (لیست انتظار!)' },
  prio_health: { en:'Join Sygeforsikring "denmark"', fr:'Sygeforsikring "denmark"', ar:'Sygeforsikring "denmark"', es:'Sygeforsikring "denmark"', da:'Sygeforsikring "denmark"', ur:'Sygeforsikring "denmark" میں شامل ہوں', de:"Sygeforsikring \"denmark\"", uk:"Sygeforsikring \"denmark\"", pl:"Sygeforsikring \"denmark\"", fa:'عضویت Sygeforsikring "denmark"' },
  prio_housing:{ en:'Find your housing', fr:'Trouver votre logement', ar:'ابحث عن مسكنك', es:'Encontrar tu vivienda', da:'Find din bolig', ur:'اپنی رہائش تلاش کریں', de:"Wohnung finden", uk:"Знайти житло", pl:"Znajdź mieszkanie", fa:'یافتن مسکن' },
  // Roadmap reason labels
  reason_work:   { en:'work', fr:'le travail', ar:'العمل', es:'trabajo', da:'arbejde', ur:'کام', de:"die Arbeit", uk:"роботу", pl:"pracy", fa:'کار' },
  reason_study:  { en:'study', fr:'les études', ar:'الدراسة', es:'estudios', da:'studier', ur:'تعلیم', de:"das Studium", uk:"навчання", pl:"studiów", fa:'تحصیل' },
  reason_love:   { en:'family', fr:'la famille', ar:'العائلة', es:'familia', da:'familie', ur:'خاندان', de:"die Familie", uk:"родину", pl:"rodziny", fa:'خانواده' },
  reason_startup:{ en:'a startup', fr:'une startup', ar:'مشروعك', es:'un startup', da:'en startup', ur:'ایک اسٹارٹ اپ', de:"ein Startup", uk:"стартап", pl:"startupu", fa:'یک استارتاپ' },
  reason_nomad:  { en:'remote work', fr:'le télétravail', ar:'العمل عن بُعد', es:'trabajo remoto', da:'fjernarbejde', ur:'ریموٹ کام', de:"Remote-Arbeit", uk:"віддалену роботу", pl:"pracy zdalnej", fa:'کار از راه دور' },
  reason_asylum: { en:'a new start', fr:'un nouveau départ', ar:'بداية جديدة', es:'un nuevo comienzo', da:'en ny start', ur:'ایک نئی شروعات', de:"einen Neuanfang", uk:"новий початок", pl:"nowy początek", fa:'یک شروع تازه' },
  continueJourney:    { en:'Continue My Journey →', fr:'Continuer mon parcours →', ar:'← متابعة رحلتي', es:'Continuar mi viaje →', da:'Fortsæt min rejse →', ur:'← میرا سفر جاری رکھیں', de:"Weiter →", uk:"Продовжити →", pl:"Kontynuuj →", fa:'← ادامه سفرم' },
  actionPlanHeading:  { en:'✦ Your personalised action plan', fr:'✦ Votre plan d\'action personnalisé', ar:'✦ خطتك الشخصية', es:'✦ Tu plan de acción personalizado', da:'✦ Din personlige handlingsplan', ur:'✦ آپ کا ذاتی ایکشن پلان', de:"✦ Dein persönlicher Aktionsplan", uk:"✦ Ваш персональний план дій", pl:"✦ Twój spersonalizowany plan", fa:'✦ برنامه عمل شخصی شما' },
  openChapterLink:    { en:(c)=>`→ Open ${c}`, fr:(c)=>`→ Ouvrir ${c}`, ar:(c)=>`→ افتح ${c}`, es:(c)=>`→ Abrir ${c}`, da:(c)=>`→ Åbn ${c}`, ur:(c)=>`← ${c} کھولیں`, de:(c)=>`→ ${c} öffnen`, uk:(c)=>`→ Відкрити ${c}`, pl:(c)=>`→ Otwórz ${c}`, fa:(c)=>`← باز کردن ${c}` },
  xpEarnedProfile:    { en:'✦ +100 Viking Points earned for completing your profile', fr:'✦ +100 Points Viking gagnés pour avoir complété votre profil', ar:'✦ +100 نقطة فايكنج للحصول عليها بإكمال ملفك الشخصي', es:'✦ +100 Puntos Vikingo ganados por completar tu perfil', da:'✦ +100 Vikingpoint optjent for at færdiggøre din profil', ur:'✦ پروفائل مکمل کرنے پر +100 وائیکنگ پوائنٹس', de:"✦ +100 Wikingerpunkte für dein Profil", uk:"✦ +100 очок вікінга за профіль", pl:"✦ +100 punktów wikinga za profil", fa:'✦ +100 امتیاز وایکینگ برای تکمیل پروفایل' },
  wizStep:            { en:(s,t)=>`Step ${s} of ${t}`, fr:(s,t)=>`Étape ${s} sur ${t}`, ar:(s,t)=>`خطوة ${s} من ${t}`, es:(s,t)=>`Paso ${s} de ${t}`, da:(s,t)=>`Trin ${s} af ${t}`, ur:(s,t)=>`${t} میں سے ${s} قدم`, de:(s,t)=>`Schritt ${s} von ${t}`, uk:(s,t)=>`Крок ${s} з ${t}`, pl:(s,t)=>`Krok ${s} z ${t}`, fa:(s,t)=>`مرحله ${s} از ${t}` },
  wizPct:             { en:(p)=>`${p}% complete`, fr:(p)=>`${p}% terminé`, ar:(p)=>`${p}% مكتمل`, es:(p)=>`${p}% completado`, da:(p)=>`${p}% fuldført`, ur:(p)=>`${p}% مکمل`, de:(p)=>`${p}% erledigt`, uk:(p)=>`${p}% виконано`, pl:(p)=>`${p}% ukończono`, fa:(p)=>`${p}% کامل` },
  wizNoneSelected:    { en:'None selected yet', fr:'Rien sélectionné', ar:'لم تُحدَّد خيارات بعد', es:'Ninguno seleccionado', da:'Intet valgt endnu', ur:'ابھی کچھ منتخب نہیں', de:"Noch nichts ausgewählt", uk:"Поки нічого не обрано", pl:"Nic jeszcze nie wybrano", fa:'هنوز چیزی انتخاب نشده' },
  wizBack:            { en:'← Back', fr:'← Retour', ar:'→ السابق', es:'← Atrás', da:'← Tilbage', de:'← Zurück', uk:'← Назад', pl:'← Wstecz', ur:'→ پیچھے', fa:'→ بازگشت' },
  wizSkipForNow:      { en:'Skip for now', fr:'Passer pour l\'instant', ar:'تخطَّ الآن', es:'Omitir por ahora', da:'Spring over', de:'Überspringen', uk:'Пропустити', pl:'Pomiń', ur:'ابھی چھوڑیں', fa:'فعلاً رد کن' },
  wizChooseUpTo:      { en:(n)=>`— choose up to ${n}`, fr:(n)=>`— choisir jusqu'à ${n}`, ar:(n)=>`— اختر حتى ${n}`, es:(n)=>`— elige hasta ${n}`, da:(n)=>`— vælg op til ${n}`, de:(n)=>`— bis zu ${n} wählen`, uk:(n)=>`— виберіть до ${n}`, pl:(n)=>`— wybierz do ${n}`, ur:(n)=>`— زیادہ سے زیادہ ${n} منتخب کریں`, fa:(n)=>`— حداکثر ${n} انتخاب کنید` },
  wizSelectUpTo:      { en:(n)=>`✦ Select up to ${n} that apply`, fr:(n)=>`✦ Sélectionnez jusqu'à ${n} pertinents`, ar:(n)=>`✦ اختر حتى ${n} ينطبق عليك`, es:(n)=>`✦ Selecciona hasta ${n} que apliquen`, da:(n)=>`✦ Vælg op til ${n} der passer`, de:(n)=>`✦ Bis zu ${n} passende auswählen`, uk:(n)=>`✦ Оберіть до ${n} відповідних`, pl:(n)=>`✦ Zaznacz do ${n} pasujących`, ur:(n)=>`✦ زیادہ سے زیادہ ${n} متعلقہ منتخب کریں`, fa:(n)=>`✦ تا ${n} مورد مرتبط انتخاب کنید` },
  wizSelected:        { en:(n)=>`${n} selected`, fr:(n)=>`${n} sélectionné(s)`, ar:(n)=>`${n} محدد`, es:(n)=>`${n} seleccionado(s)`, da:(n)=>`${n} valgt`, ur:(n)=>`${n} منتخب`, de:(n)=>`${n} ausgewählt`, uk:(n)=>`${n} обрано`, pl:(n)=>`${n} wybrano`, fa:(n)=>`${n} انتخاب شد` },
  wizContinue:        { en:(n)=>`Continue${n > 0 ? ` (${n})` : ''} →`, fr:(n)=>`Continuer${n > 0 ? ` (${n})` : ''} →`, ar:(n)=>`← متابعة${n > 0 ? ` (${n})` : ''}`, es:(n)=>`Continuar${n > 0 ? ` (${n})` : ''} →`, da:(n)=>`Fortsæt${n > 0 ? ` (${n})` : ''} →`, ur:(n)=>`← جاری رکھیں${n > 0 ? ` (${n})` : ''}`, de:(n)=>`Weiter${n > 0 ? ` (${n})` : ''} →`, uk:(n)=>`Продовжити${n > 0 ? ` (${n})` : ''} →`, pl:(n)=>`Kontynuuj${n > 0 ? ` (${n})` : ''} →`, fa:(n)=>`← ادامه${n > 0 ? ` (${n})` : ''}` },
  searchHint:      { en:'Search chapters, topics, tasks — try "CPR", "a-kasse", "dental", "tax card"…', fr:'Rechercher chapitres, sujets, tâches — essayez « CPR », « a-kasse », « logement »…', ar:'ابحث في الفصول، الموضوعات، المهام — جرّب "CPR"، "a-kasse"، "سكن"…', es:'Busca capítulos, temas, tareas — prueba "CPR", "a-kasse", "vivienda"…', da:'Søg i kapitler, emner, opgaver — prøv "CPR", "a-kasse", "bolig"…', ur:'ابواب، موضوعات، کام تلاش کریں — "CPR"، "a-kasse"، "رہائش" آزمائیں…', de:"Suche Kapitel, Themen, Aufgaben — versuche \"CPR\", \"a-kasse\", \"Wohnung\"…", uk:"Шукайте розділи, теми, завдання — спробуйте \"CPR\", \"a-kasse\", \"житло\"…", pl:"Szukaj rozdziałów, tematów, zadań — spróbuj \"CPR\", \"a-kasse\", \"mieszkanie\"…", fa:'جستجوی فصل‌ها، موضوعات، وظایف — "CPR"، "a-kasse"، "مسکن" را امتحان کنید…' },
  searchNoResults: { en:(q)=>`No results for "${q}" — try different keywords`, fr:(q)=>`Aucun résultat pour « ${q} » — essayez d'autres mots-clés`, ar:(q)=>`لا نتائج لـ "${q}" — جرّب كلمات مختلفة`, es:(q)=>`Sin resultados para "${q}" — prueba otras palabras`, da:(q)=>`Ingen resultater for "${q}" — prøv andre søgeord`, ur:(q)=>`"${q}" کے لیے کوئی نتیجہ نہیں — مختلف الفاظ آزمائیں`, de:(q)=>`Keine Ergebnisse für "${q}" — andere Suchwörter versuchen`, uk:(q)=>`Немає результатів для "${q}" — спробуйте інші слова`, pl:(q)=>`Brak wyników dla "${q}" — spróbuj innych słów`, fa:(q)=>`نتیجه‌ای برای "${q}" پیدا نشد — کلمات دیگری امتحان کنید` },
  searchTypeChapter:{ en:'Chapter', fr:'Chapitre', ar:'فصل', es:'Capítulo', da:'Kapitel', ur:'باب', de:"Kapitel", uk:"Розділ", pl:"Rozdział", fa:'فصل' },
  searchTypeTopic:  { en:'Topic', fr:'Sujet', ar:'موضوع', es:'Tema', da:'Emne', ur:'موضوع', de:"Thema", uk:"Тема", pl:"Temat", fa:'موضوع' },
  searchTypeTask:   { en:'Task', fr:'Tâche', ar:'مهمة', es:'Tarea', da:'Opgave', ur:'کام', de:"Aufgabe", uk:"Завдання", pl:"Zadanie", fa:'وظیفه' },
  tlUrgent:         { en:'Urgent', fr:'Urgent', ar:'عاجل', es:'Urgente', da:'Haster', de:'Dringend', uk:'Терміново', pl:'Pilne', ur:'فوری', fa:'فوری' },
  tlDone:           { en:(d,t)=>`${d}/${t} done`, fr:(d,t)=>`${d}/${t} effectué`, ar:(d,t)=>`${d}/${t} منجز`, es:(d,t)=>`${d}/${t} listo`, da:(d,t)=>`${d}/${t} klaret`, de:(d,t)=>`${d}/${t} erledigt`, uk:(d,t)=>`${d}/${t} виконано`, pl:(d,t)=>`${d}/${t} wykonano`, ur:(d,t)=>`${d}/${t} مکمل`, fa:(d,t)=>`${d}/${t} انجام شد` },
  tl_tab_week1:     { en:'Week 1',  fr:'Semaine 1', ar:'الأسبوع 1', es:'Semana 1',  da:'Uge 1',    de:'Woche 1',  uk:'Тиждень 1', pl:'Tydzień 1', ur:'ہفتہ 1',  fa:'هفته ۱' },
  tl_tab_month1:    { en:'Month 1', fr:'Mois 1',    ar:'الشهر 1',   es:'Mes 1',     da:'Måned 1',  de:'Monat 1',  uk:'Місяць 1',  pl:'Miesiąc 1', ur:'مہینہ 1', fa:'ماه ۱'  },
  tl_tab_month3:    { en:'Month 3', fr:'Mois 3',    ar:'الشهر 3',   es:'Mes 3',     da:'Måned 3',  de:'Monat 3',  uk:'Місяць 3',  pl:'Miesiąc 3', ur:'مہینہ 3', fa:'ماه ۳'  },
  tl_tab_month6:    { en:'Month 6', fr:'Mois 6',    ar:'الشهر 6',   es:'Mes 6',     da:'Måned 6',  de:'Monat 6',  uk:'Місяць 6',  pl:'Miesiąc 6', ur:'مہینہ 6', fa:'ماه ۶'  },
  tl_tab_year1:     { en:'Year 1',  fr:'An 1',      ar:'السنة 1',   es:'Año 1',     da:'År 1',     de:'Jahr 1',   uk:'Рік 1',     pl:'Rok 1',     ur:'سال 1',   fa:'سال ۱'  },
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
/* `label` was originally Danish-only and shown to users in every locale.
   Now each rank carries a per-language label; helpers below pick the
   right one based on window.currentLang. */
const XP_RANKS = [
  { min:0,    en:'Newcomer',     fr:'Nouveau venu',  ar:'وافد جديد',     es:'Recién llegado',  da:'Nybegynder',       de:'Neuankömmling',  uk:'Новачок',     pl:'Nowicjusz',     ur:'نووارد',        fa:'تازه‌وارد' },
  { min:100,  en:'Settler',      fr:'Installé',      ar:'مستقر',         es:'Asentado',        da:'Indvandrer',       de:'Siedler',        uk:'Оселений',     pl:'Osadnik',       ur:'آباد',         fa:'ساکن' },
  { min:300,  en:'Resident',     fr:'Résident',      ar:'مقيم',          es:'Residente',       da:'Bosiddende',       de:'Bewohner',       uk:'Резидент',     pl:'Rezydent',      ur:'مقیم',         fa:'مقیم' },
  { min:600,  en:'Dane at Heart',fr:'Danois de cœur',ar:'دنماركي القلب', es:'Danés de corazón',da:'Dansker i Sjælen', de:'Däne im Herzen', uk:'Данець у душі', pl:'Duńczyk sercem',ur:'دل سے ڈینش',    fa:'دانمارکی در دل' },
];
/* Pick the active-language label for a rank object */
const xpRankLabel = (rank) => rank[window.currentLang || 'en'] || rank.en || rank.label || '';

/* ══════════════════════════════════════════════════════
   i18n — TRANSLATION ENGINE
══════════════════════════════════════════════════════ */
/* Per-language home title + tagline used by updatePageTitle() so the
   browser tab + history entry stay in sync with the active language and
   the navigation state (home vs. chapter). Values match the natural
   marketing copy in each locale — kept inline rather than minted as
   data-i18n keys because they're only used here. */
const PAGE_TITLE_I18N = {
  en: { home: 'Moving to Denmark in 2026 — The Complete Guide | ANKOMMER',
        tagline: 'Moving to Denmark' },
  fr: { home: "S'installer au Danemark en 2026 — Le Guide Complet | ANKOMMER",
        tagline: "S'installer au Danemark" },
  ar: { home: 'الانتقال إلى الدنمارك في 2026 — الدليل الكامل | ANKOMMER',
        tagline: 'الانتقال إلى الدنمارك' },
  es: { home: 'Mudarse a Dinamarca en 2026 — La Guía Completa | ANKOMMER',
        tagline: 'Mudarse a Dinamarca' },
  da: { home: 'Flytte til Danmark i 2026 — Den Komplette Guide | ANKOMMER',
        tagline: 'Flytte til Danmark' },
  de: { home: 'Nach Dänemark ziehen 2026 — Der vollständige Leitfaden | ANKOMMER',
        tagline: 'Nach Dänemark ziehen' },
  uk: { home: 'Переїзд до Данії у 2026 — Повний посібник | ANKOMMER',
        tagline: 'Переїзд до Данії' },
  pl: { home: 'Przeprowadzka do Danii w 2026 — Kompletny przewodnik | ANKOMMER',
        tagline: 'Przeprowadzka do Danii' },
  ur: { home: 'ڈنمارک منتقلی 2026 — مکمل گائیڈ | ANKOMMER',
        tagline: 'ڈنمارک منتقلی' },
  fa: { home: 'مهاجرت به دانمارک در ۲۰۲۶ — راهنمای کامل | ANKOMMER',
        tagline: 'مهاجرت به دانمارک' },
};
/* Recompute and apply <title> based on active language + current state.
   Called from setLang (lang change), scrollToTop (home navigation), and
   chapter render (chapter open). Without this the title was set on
   chapter open and never updated again — a Polish user navigating
   home or switching language would still see "Before You Land —
   ANKOMMER" in their browser tab. */
window.updatePageTitle = () => {
  const lang = window.currentLang || 'en';
  const t = PAGE_TITLE_I18N[lang] || PAGE_TITLE_I18N.en;
  const ch = (typeof AppState !== 'undefined' && AppState.currentChapter !== null)
    ? CHAPTERS?.[AppState.currentChapter]
    : null;
  if (ch) {
    const chTitle = ch.title[lang] || ch.title.en;
    document.title = `${chTitle} — ANKOMMER | ${t.tagline}`;
  } else {
    document.title = t.home;
  }
};

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
    // Translate aria-label / title attributes via [data-i18n-aria] /
    // [data-i18n-title]. Screen-reader users on non-English langs
    // would otherwise hear English for every nav button.
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      const val = i18n.t(key);
      if (val) el.setAttribute('aria-label', val);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const val = i18n.t(key);
      if (val) el.setAttribute('title', val);
    });
  },
  setLang: (lang) => {
    window.currentLang = lang;
    safeSetItem('ankommer_lang', lang);

    // Update html[lang] and html[dir] for screen readers + RTL
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', ['ar','ur','fa'].includes(lang) ? 'rtl' : 'ltr');
    // Re-derive document.title for the new language. Without this the
    // browser tab + history entry stayed in the previous language even
    // after a full UI translate (audit-flagged: "user sees site in PL
    // but tab title still 'Before You Land — ANKOMMER'").
    updatePageTitle();

    // Always close the lang dropdown after a switch — defensive against
    // future code paths that call setLang without going through the
    // pill click handler (e.g. URL ?lang=, deep link, programmatic).
    const sel = document.querySelector('.lang-selector');
    if (sel?.classList.contains('open')) {
      sel.classList.remove('open');
      document.getElementById('mobile-overlay')?.classList.remove('visible');
      if (window.matchMedia('(max-width: 600px)').matches) {
        document.body.style.overflow = '';
      }
    }

    document.querySelectorAll('.lang-btn').forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('active', active);
      // The lang-btn lives inside a role="menu" with role="menuitemradio"
      // children — for radios, ARIA uses aria-checked (not aria-pressed,
      // which is for toggle buttons). Audit caught the role/state mismatch.
      b.setAttribute('aria-checked', active ? 'true' : 'false');
    });
    i18n.applyAll();
    if (AppState.currentChapter !== null) renderChapter(AppState.currentChapter);
    // Wizard step label, question, options, and step-name suffix are all
    // language-derived. If the wizard is open while the user switches
    // language, re-render so its UI tracks (audit caught: step label
    // stayed "Step 1 of 6 · Timeline" in English while the rest of the
    // page rendered in Polish).
    if (typeof Wizard !== 'undefined' &&
        document.getElementById('wizard-overlay') &&
        !document.getElementById('wizard-overlay').classList.contains('hidden')) {
      Wizard.renderStep(wizardState?.step ?? 0);
    }
    renderChaptersPreview();
    RoadmapStrip.refresh();
    updateDailyFeed();
    // Refresh the XP rank label — it's per-language now
    if (typeof XPSystem !== 'undefined' && XPSystem.updateUI) XPSystem.updateUI();
    // Refresh the timeline feed — task labels and aria-labels are per-language
    if (typeof updateDailyFeed === 'function') updateDailyFeed();
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
    // Sync the OS-level theme-color (iOS Safari address bar, Android
    // Chrome status bar, PWA standalone titlebar) to the active theme.
    // Audit caught: the meta tag was hardcoded to #C60C30 (red), so the
    // Safari address bar stayed red even in dark mode and matched
    // neither colour scheme cleanly. Now the bar follows the bg.
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', theme === 'dark' ? '#0F1B2D' : '#F5F2EC');
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
    const rankLabel = xpRankLabel(rank);
    if (xpRank) xpRank.textContent = rankLabel;

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
        const nextLabel = xpRankLabel(nextRank);
        xpMotivate.textContent = `${xpNeeded} Viking Points → ${nextLabel}`;
        xpMotivate.style.display = '';
        // Tooltip on the rank badge itself
        if (xpRank) xpRank.title = `${AppState.xp} VP · ${xpNeeded} more to reach ${nextLabel}`;
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

/* Wizard step names — per-language so they don't show as English words
   wedged into otherwise-translated step labels. Indexed by step number
   (0..5) matching WIZARD_QUESTIONS order. */
const STEP_NAMES_I18N = {
  en: ['Timeline',     'Purpose',    'Location',     'Household',     'Passport',  'Concerns'],
  fr: ['Calendrier',   'Objectif',   'Lieu',         'Foyer',         'Passeport', 'Inquiétudes'],
  ar: ['الجدول الزمني', 'الغرض',      'الموقع',        'الأسرة',        'جواز السفر', 'المخاوف'],
  es: ['Calendario',   'Propósito',  'Ubicación',    'Hogar',         'Pasaporte', 'Preocupaciones'],
  da: ['Tidsplan',     'Formål',     'Placering',    'Husstand',      'Pas',       'Bekymringer'],
  de: ['Zeitplan',     'Zweck',      'Ort',          'Haushalt',      'Pass',      'Sorgen'],
  uk: ['Часова шкала', 'Мета',       'Місце',        'Сім’я',         'Паспорт',   'Хвилювання'],
  pl: ['Harmonogram',  'Cel',        'Lokalizacja',  'Gospodarstwo',  'Paszport',  'Obawy'],
  ur: ['ٹائم لائن',     'مقصد',      'مقام',          'گھرانہ',         'پاسپورٹ',   'فکریں'],
  fa: ['زمان‌بندی',    'هدف',        'موقعیت',       'خانوار',        'پاسپورت',   'نگرانی‌ها'],
};
const stepName = (idx) => {
  const lang = window.currentLang || 'en';
  return (STEP_NAMES_I18N[lang] || STEP_NAMES_I18N.en)[idx] || STEP_NAMES_I18N.en[idx] || '';
};

const Wizard = {

  _focusTrap: null,

  _escHandler: null,

  open: () => {
    const overlay = document.getElementById('wizard-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    // Lock body scroll on phones so iOS rubber-band can't scroll the page
    // behind the opaque overlay (matches rail / Bjørn / search behaviour).
    if (window.matchMedia('(max-width: 600px)').matches) {
      document.body.style.overflow = 'hidden';
    }
    wizardState = { step: 0, answers: {}, direction: 'forward' };
    // Reset progress wrap visibility
    const pw = document.getElementById('wiz-progress-wrap');
    if (pw) pw.style.display = '';
    // Hide result
    const res = document.getElementById('wizard-result');
    if (res) res.classList.add('hidden');
    Wizard.renderStep(0);
    // Activate focus trap (Tab cycles inside modal)
    Wizard._focusTrap = FocusTrap(overlay, { onEscape: Wizard.close });
    Wizard._focusTrap.activate(document.activeElement);
    // Belt-and-suspenders: the FocusTrap's keydown listener is scoped to
    // the overlay, so an ESC keypress while focus is on document.body
    // (which can happen mid-session) wouldn't reach it. Catch ESC at the
    // document scope while the wizard is open.
    Wizard._escHandler = (e) => {
      if (e.key === 'Escape' && !document.getElementById('wizard-overlay').classList.contains('hidden')) {
        e.preventDefault();
        Wizard.close();
      }
    };
    document.addEventListener('keydown', Wizard._escHandler);
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
    // Remove document-scope ESC handler
    if (Wizard._escHandler) {
      document.removeEventListener('keydown', Wizard._escHandler);
      Wizard._escHandler = null;
    }
    // Release body scroll lock (safe to clear unconditionally)
    document.body.style.overflow = '';
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
    if (labelEl) labelEl.textContent = `${t_('wizStep', _wl, stepIndex + 1, total)} · ${stepName(stepIndex)}`;
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
      ? `<button class="wiz-back-btn" id="wiz-back" type="button">${t_('wizBack', lang)}</button>`
      : '<div></div>';

    const navHtml = q.multi ? `
      <div class="wizard-nav">
        ${backHtml}
        <button class="wizard-skip" id="wiz-skip" type="button">${t_('wizSkipForNow', lang)}</button>
        <button class="wiz-next-btn" id="wiz-next" type="button" ${selectedSet.size === 0 ? 'disabled' : ''}>
          ${t_('wizContinue', lang, selectedSet.size)}
        </button>
      </div>
    ` : `
      <div class="wizard-nav">
        ${backHtml}
        <button class="wizard-skip" id="wiz-skip" type="button">${t_('wizSkipForNow', lang)}</button>
        <div></div>
      </div>
    `;

    const counterHtml = q.multi ? `
      <div class="wiz-select-counter" id="wiz-counter">
        <strong id="wiz-sel-text">${selectedSet.size === 0 ? t_('wizNoneSelected', lang) : t_('wizSelected', lang, selectedSet.size)}</strong>
        &nbsp;<span>${t_('wizChooseUpTo', lang, q.maxSelect)}</span>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="wizard-q${wizardState.direction === 'back' ? ' wiz-back-dir' : ''}">
        <div class="wizard-q-icon">${q.icon}</div>
        <h2 class="wizard-q-title">${q.title[lang] || q.title.en}</h2>
        <p class="wizard-q-sub">${q.sub[lang] || q.sub.en}</p>
        ${q.multi ? `<div class="wizard-multi-hint">${t_('wizSelectUpTo', lang, q.maxSelect)}</div>` : ''}
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
      // "Skip for now" = dismiss the whole wizard (matches user expectation
      // from the label). Per-question skipping is already possible by not
      // selecting an option and clicking the next-step control.
      Wizard.close();
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
        <button class="result-bjorn-btn" id="wiz-bjorn">💬 ${TRANSLATIONS[lang]?.wiz_result_bjorn || 'Chat with Bjørn'}</button>
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
      title: 'Your Denmark Roadmap',
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
      reason:   { work:'Working', study:'Studying', love:'Partner/Family', startup:'Entrepreneur', nomad:'Remote worker', asylum:'§7 protection status' },
      location: { cph:'Copenhagen', aarhus:'Aarhus', odense:'Odense', aalborg:'Aalborg', small:'Smaller town', undecided:'Location TBD' },
      family:   { solo:'Solo', couple:'With partner', family_small:'Young family', family_school:'School-age kids', extended:'Extended family' },
      passport: { eu:'EU citizen', work_permit:'Work permit', student_visa:'Student visa', family_reunification:'Family reunification', refugee:'§7 protection status' },
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
      p.push({ title:'Contact Dansk Flygtningehjælp (Danish Refugee Council)', desc:'The state-funded body for free legal counsel on protection cases. ANKOMMER does not advise on any individual case — contact them directly.', chapter:null });
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
      p.push({ title:'Open a Danish bank account (requires CPR)', desc:'Compare Lunar, Danske Bank, Nordea, and Jyske Bank — fees and onboarding speed vary. Once open, designate it as your NemKonto at nemkonto.dk.', chapter:'Chapter 4: Money & Banking', chapterIndex:4 });
    }
    if (a.anxiety?.includes('language')) {
      p.push({ title:'Enroll in Danskuddannelse (free Danish lessons)', desc:'All newcomers are legally entitled to 3 years of free, subsidised Danish instruction. Enroll early.', chapter:null });
    }
    if (a.anxiety?.includes('social')) {
      p.push({ title:'Join InterNations or local expat groups', desc:'internations.org and Facebook groups for your city are excellent for early connections — meeting other newcomers often builds the strongest networks first.', chapter:null });
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
      return `If you have §7 protection status or your case is being processed by Danish authorities, contact <strong>Dansk Flygtningehjælp</strong> (flygtningehjaelpen.dk) for free legal counsel — it is the state-funded body for this work. ANKOMMER does not handle, assess, advise on, or affect any immigration or protection case. This guide can help with the everyday Danish systems — CPR, healthcare, banking, housing — that apply to anyone legally resident in Denmark.`;
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
      return `Denmark is consistently rated among the top countries for raising children — strong public childcare, well-resourced schools, safe streets. But the waitlists for daycare are very long. Apply for the pasningsgaranti (guaranteed childcare place) on your very first day. Everything else can wait a week. The daycare list cannot.`;
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

  // Top of the rail: a "Home" entry so users always have a clear path
  // back to the landing page (especially important on phones where the
  // logo is small and the chapter view fills the screen).
  const homeLabel = {
    en:'Home', fr:'Accueil', ar:'الرئيسية', es:'Inicio', da:'Hjem',
    de:'Startseite', uk:'Головна', pl:'Strona główna', ur:'ہوم', fa:'خانه'
  }[lang] || 'Home';
  const homeBtn = `<button class="rail-item rail-home"
    onclick="goHome()"
    aria-label="${homeLabel}">
    <span class="rail-icon" aria-hidden="true">🏠</span>
    <span>${homeLabel}</span>
  </button>`;

  const chapterButtons = CHAPTERS.map((ch, i) => {
    const allTasks = ch.checklist || [];
    const done = allTasks.filter(t => AppState.completedTasks[t.id]).length;
    const isComplete = allTasks.length > 0 && done === allTasks.length;
    const isActive = AppState.currentChapter === i;
    // Show "Start here →" badge only on first chapter during first visit
    const startHint = (isFirstVisit && i === 0)
      ? `<span class="rail-start-hint">${TRANSLATIONS[lang]?.rail_start_here || TRANSLATIONS.en.rail_start_here}</span>`
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

  nav.innerHTML = homeBtn + chapterButtons;
};

/* End-of-chapter navigator: lets users move to the previous / next
   chapter or jump to any chapter. Especially important on phones, where
   the only other way to switch chapters mid-flow is the hamburger menu. */
const _CH_NAV_LABELS = {
  prev:    { en:'Previous', fr:'Précédent', ar:'السابق',   es:'Anterior',  da:'Forrige',  de:'Zurück',   uk:'Попередній', pl:'Poprzedni', ur:'پچھلا',   fa:'قبلی' },
  next:    { en:'Next',     fr:'Suivant',  ar:'التالي',    es:'Siguiente', da:'Næste',    de:'Weiter',   uk:'Далі',       pl:'Następny',  ur:'اگلا',     fa:'بعدی' },
  pickAny: { en:'Pick another chapter', fr:'Choisir un autre chapitre', ar:'اختر فصلًا آخر', es:'Elegir otro capítulo', da:'Vælg et andet kapitel', de:'Anderes Kapitel wählen', uk:'Обрати інший розділ', pl:'Wybierz inny rozdział', ur:'دوسرا باب چنیں', fa:'فصل دیگری انتخاب کنید' }
};
const _renderChapterEndNav = (index, lang) => {
  const total = (window.CHAPTERS || []).length;
  const prev  = index > 0 ? CHAPTERS[index - 1] : null;
  const next  = index < total - 1 ? CHAPTERS[index + 1] : null;
  const L = (k) => _CH_NAV_LABELS[k][lang] || _CH_NAV_LABELS[k].en;
  const titleOf = (ch) => (ch.title[lang] || ch.title.en || '').slice(0, 38);

  const prevBtn = prev ? `
    <button class="ch-end-btn ch-end-prev" onclick="openChapter(${index - 1})" aria-label="${L('prev')}: ${titleOf(prev)}">
      <span class="ch-end-arrow" aria-hidden="true">←</span>
      <span class="ch-end-stack">
        <span class="ch-end-eyebrow">${L('prev')}</span>
        <span class="ch-end-title"><span class="ch-end-icon" aria-hidden="true">${prev.icon}</span> ${titleOf(prev)}</span>
      </span>
    </button>` : `<span class="ch-end-spacer" aria-hidden="true"></span>`;
  const nextBtn = next ? `
    <button class="ch-end-btn ch-end-next" onclick="openChapter(${index + 1})" aria-label="${L('next')}: ${titleOf(next)}">
      <span class="ch-end-stack">
        <span class="ch-end-eyebrow">${L('next')}</span>
        <span class="ch-end-title">${titleOf(next)} <span class="ch-end-icon" aria-hidden="true">${next.icon}</span></span>
      </span>
      <span class="ch-end-arrow" aria-hidden="true">→</span>
    </button>` : `<span class="ch-end-spacer" aria-hidden="true"></span>`;

  return `
    <nav class="chapter-end-nav" aria-label="${L('pickAny')}">
      <div class="ch-end-row">
        ${prevBtn}
        ${nextBtn}
      </div>
      <button class="ch-end-all" onclick="event.stopPropagation(); window.openChapterRail?.();">
        📚 ${L('pickAny')}
      </button>
    </nav>
  `;
};

// Pick the best-quality language variant for a multilingual content dict.
// Falls back to English when the target language is missing OR is a stub
// significantly shorter than the English version (e.g. Persian sections where
// only an intro sentence exists with no body content underneath). The 200-char
// + 4x-shorter-than-English rule avoids false positives where English itself
// is brief (short titles, labels, captions keep their native translation —
// genuine stub paragraphs have ~14x size differential vs ~1x for true short
// strings). Without this, Persian users see a one-line teaser followed by
// nothing on chapters where the fa translation is still in progress.
const pickLang = (dict, lang) => {
  if (!dict) return '';
  if (typeof dict === 'string') return dict;
  const val = dict[lang];
  const en = dict.en;
  if (lang !== 'en' && typeof val === 'string' && typeof en === 'string') {
    if (val.length < 200 && en.length > val.length * 4) return en;
  }
  return val || en || '';
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
      <h3 class="section-heading" id="ch-sec-${index}-${si}-heading">
        <button class="section-toggle"
                onclick="toggleSection('ch-sec-${index}-${si}')"
                aria-expanded="false"
                aria-controls="ch-sec-body-${index}-${si}">
          <span class="section-toggle-icon" aria-hidden="true">${sec.icon || '📌'}</span>
          <span>${sec.title[lang] || sec.title.en || sec.title}</span>
          <span class="section-toggle-arrow" aria-hidden="true">▼</span>
        </button>
      </h3>
      <div class="section-body" id="ch-sec-body-${index}-${si}" role="region" aria-labelledby="ch-sec-${index}-${si}-heading">
        ${pickLang(sec.content, lang)}
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
        <p>${pickLang(ch.bjornTip, lang)}</p>
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
        <div class="chapter-num">${t_('chapterWord', lang)} ${index + 1} · ${ch.subtitle[lang] || ch.subtitle.en}</div>
        <div class="chapter-icon">${ch.icon}</div>
        <h2 class="chapter-title">${ch.title[lang] || ch.title.en}</h2>
        <p class="chapter-intro">${pickLang(ch.intro, lang)}</p>
        <div class="chapter-meta">
          <span class="chapter-meta-tag">${t_('readTime', lang, ch.readTime || '10 min')}</span>
          <span class="chapter-meta-tag">${allTasks.length} ${t_('tasks', lang)}</span>
          ${pct === 100 ? `<span class="chapter-meta-tag" style="background:rgba(106,158,106,0.15);color:var(--sage)">${t_('complete', lang)}</span>` : ''}
          ${ch.lastUpdated ? `<span class="chapter-meta-tag chapter-meta-updated" title="${ {en:'Last reviewed',fr:'Dernière révision',ar:'آخر مراجعة',es:'Última revisión',da:'Sidst opdateret',de:'Zuletzt geprüft',uk:'Востаннє переглянуто',pl:'Ostatnio sprawdzono',ur:'آخری جائزہ',fa:'آخرین بررسی'}[lang] || 'Last reviewed' }">🛠 ${ch.lastUpdated}</span>` : ''}
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
        <button class="print-chapter-btn" onclick="window.print()" title="${ {en:'Print this chapter',fr:'Imprimer ce chapitre',ar:'طباعة هذا الفصل',es:'Imprimir este capítulo',da:'Print dette kapitel',de:'Dieses Kapitel drucken',uk:'Друк цього розділу',pl:'Drukuj ten rozdział',ur:'یہ باب پرنٹ کریں',fa:'چاپ این فصل'}[lang] || 'Print this chapter' }">
          🖨️ ${{ en:'Print Chapter', fr:'Imprimer', ar:'طباعة', es:'Imprimir', da:'Print kapitel', de:'Kapitel drucken', uk:'Друк розділу', pl:'Drukuj rozdział', ur:'باب پرنٹ کریں', fa:'چاپ فصل' }[lang] || 'Print Chapter'}
        </button>
        <button class="print-chapter-btn" onclick="printChecklist()" title="${ {en:'Print full checklist',fr:'Imprimer la liste complète',ar:'طباعة القائمة الكاملة',es:'Imprimir lista completa',da:'Print hele tjeklisten',de:'Komplette Checkliste drucken',uk:'Друк повного списку',pl:'Drukuj pełną listę',ur:'مکمل چیک لسٹ پرنٹ کریں',fa:'چاپ چک‌لیست کامل'}[lang] || 'Print full checklist' }">
          📋 ${{ en:'Print My Checklist', fr:'Imprimer ma liste', ar:'طباعة قائمتي', es:'Imprimir mi lista', da:'Print min tjekliste', de:'Meine Checkliste drucken', uk:'Друк мого списку', pl:'Drukuj moją listę', ur:'میری چیک لسٹ پرنٹ کریں', fa:'چاپ چک‌لیست من' }[lang] || 'Print My Checklist'}
        </button>
      </div>

      ${_renderChapterEndNav(index, lang)}
    </div>
  `;

  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = html;
    main.scrollTop = 0;
    window.scrollTo({ top: document.getElementById('app-layout')?.offsetTop || 0, behavior: 'instant' });
  }

  // Update page title & meta description for SEO / browser tab. Title
  // routes through updatePageTitle() so language switches re-derive it
  // (the "Moving to Denmark" tagline is now also localized).
  const chIntro = pickLang(ch.intro, lang);
  updatePageTitle();
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', chIntro.substring(0, 155));

  // Reading progress bar — tracks scroll within chapter
  ChapterProgress.init();

  buildRailNav();
};

let _chaptersFullLoaded = false;
let _chaptersLoadPromise = null;

const _loadFullChapters = () => {
  if (_chaptersFullLoaded) return Promise.resolve();
  if (_chaptersLoadPromise) return _chaptersLoadPromise;
  _chaptersLoadPromise = new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = 'js/data-chapters.js?v=32';
    s.onload = () => { _chaptersFullLoaded = true; resolve(); };
    s.onerror = () => {
      // Clear the cached promise so a future retry (e.g. after the user
      // regains connectivity) actually re-injects the script instead of
      // hitting the resolved-but-failed cache and silently doing nothing.
      _chaptersLoadPromise = null;
      resolve();
    };
    document.head.appendChild(s);
  });
  return _chaptersLoadPromise;
};

const _finishOpenChapter = (index) => {
  showAppLayout();
  renderChapter(index);
  // Use pushState so each chapter open creates a real browser-history
  // entry — pressing the back button goes to the PREVIOUS chapter (or
  // home), not off the site. Skip the push when the hash already
  // matches (e.g. direct deep-link load like /#chapter-3 — would
  // otherwise duplicate the entry on first render).
  const wantHash = '#chapter-' + index;
  if (location.hash !== wantHash) {
    if (history.pushState) {
      history.pushState({ chapter: index }, '', wantHash);
    } else {
      location.hash = wantHash;
    }
  }
  window._currentChapterIdx = index;
  document.getElementById('chapter-rail')?.classList.remove('open');
  const hb = document.getElementById('hamburger');
  if (hb) {
    hb.classList.remove('open');
    hb.setAttribute('aria-expanded', 'false');
  }
  // Clear shared mobile backdrop + scroll lock
  document.getElementById('mobile-overlay')?.classList.remove('visible');
  document.body.style.overflow = '';
};

window.openChapter = (index) => {
  const ch = (window.CHAPTERS || [])[index];
  // If sections have no content yet (meta-only), lazy-load the full file first
  const needsLoad = ch && ch.sections && ch.sections.length > 0 && !ch.sections[0].content;
  if (needsLoad) {
    // Show app layout immediately so the UI isn't frozen
    showAppLayout();
    const main = document.getElementById('main-content');
    if (main) {
      const lang = window.currentLang || 'en';
      const loadingMsg = {en:'Loading chapter…',fr:'Chargement du chapitre…',ar:'جارٍ تحميل الفصل…',es:'Cargando capítulo…',da:'Indlæser kapitel…',de:'Kapitel wird geladen…',uk:'Завантаження розділу…',pl:'Wczytywanie rozdziału…',ur:'باب لوڈ ہو رہا ہے…',fa:'در حال بارگذاری فصل…'}[lang] || 'Loading chapter…';
      main.innerHTML = `<div style="padding:3rem;text-align:center;opacity:.6">${loadingMsg}</div>`;
    }
    _loadFullChapters().then(() => {
      // _loadFullChapters resolves on both success and network failure to
      // keep the SPA from hanging — but on failure CHAPTERS is still empty
      // and renderChapter would show "Full content coming soon" for a
      // chapter that does have content. Check the load flag and show an
      // actionable retry instead.
      if (_chaptersFullLoaded) {
        _finishOpenChapter(index);
      } else if (main) {
        const lang = window.currentLang || 'en';
        const errMsg = {en:'Could not load this chapter — check your connection and try again.',fr:'Impossible de charger ce chapitre — vérifiez votre connexion et réessayez.',ar:'تعذر تحميل هذا الفصل — تحقق من اتصالك وحاول مرة أخرى.',es:'No se pudo cargar este capítulo — comprueba tu conexión y vuelve a intentarlo.',da:'Kunne ikke indlæse kapitlet — tjek din forbindelse og prøv igen.',de:'Kapitel konnte nicht geladen werden — bitte Verbindung prüfen und erneut versuchen.',uk:'Не вдалося завантажити розділ — перевірте з’єднання та повторіть.',pl:'Nie udało się załadować rozdziału — sprawdź połączenie i spróbuj ponownie.',ur:'یہ باب لوڈ نہیں ہو سکا — کنکشن چیک کریں اور دوبارہ کوشش کریں۔',fa:'بارگذاری این فصل ممکن نشد — اتصال خود را بررسی کنید و دوباره امتحان کنید.'}[lang] || 'Could not load this chapter — check your connection and try again.';
        const retryLabel = {en:'Reload',fr:'Recharger',ar:'إعادة تحميل',es:'Recargar',da:'Genindlæs',de:'Neu laden',uk:'Перезавантажити',pl:'Przeładuj',ur:'دوبارہ لوڈ کریں',fa:'بارگذاری مجدد'}[lang] || 'Reload';
        main.innerHTML = `<div style="padding:3rem;text-align:center;opacity:.7"><p style="margin-bottom:1rem">${errMsg}</p><button onclick="location.reload()" style="padding:0.5rem 1.25rem;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer">${retryLabel}</button></div>`;
      }
    });
    return;
  }
  _finishOpenChapter(index);
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
    const yesT = {en:'Yes',fr:'Oui',ar:'نعم',es:'Sí',da:'Ja',de:'Ja',uk:'Так',pl:'Tak',ur:'ہاں',fa:'بله'}[lang] || 'Yes';
    const noT  = {en:'No',fr:'Non',ar:'لا',es:'No',da:'Nej',de:'Nein',uk:'Ні',pl:'Nie',ur:'نہیں',fa:'خیر'}[lang] || 'No';
    return `<div class="rating-prompt">
      <span class="rating-label">${label}</span>
      <button class="rating-btn" onclick="ChapterRating.rate(${chapterIndex}, 1)" title="${yesT}" aria-label="${yesT}">👍</button>
      <button class="rating-btn" onclick="ChapterRating.rate(${chapterIndex}, 0)" title="${noT}" aria-label="${noT}">👎</button>
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
  if (!sec) return;
  const opened = sec.classList.toggle('open');
  // Keep aria-expanded in sync so screen-reader users know the state
  // (audit caught: button had no aria-expanded — SR users couldn't tell
  // whether the section was open or closed).
  const btn = sec.querySelector('.section-toggle');
  if (btn) btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
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
  if (app) app.classList.remove('hidden');
  // Hero collapse is driven by body.app-active in CSS, NOT inline styles —
  // synchronous inline writes during render were defeating the transition.
  document.body.classList.add('app-active');
};

/* Real "go home" navigation — used by the ANKOMMER logo and the
   Home button at the top of the chapter rail. Hides the chapter view,
   restores the hero, clears #chapter-N from the URL, and brings the
   user fully back to the landing page. */
window.scrollToTop = () => {
  // Tear down chapter view if open
  const app  = document.getElementById('app-layout');
  const main = document.getElementById('main-content');
  if (app)  app.classList.add('hidden');
  if (main) main.innerHTML = '';
  // Drop the body.app-active class — CSS handles the hero re-expansion
  // animation back to 100vh.
  document.body.classList.remove('app-active');
  // Reset state and URL
  if (typeof AppState !== 'undefined') AppState.currentChapter = null;
  window._currentChapterIdx = null;
  if (location.hash && history.replaceState) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  // Reset browser tab title to the home title in the active language
  // (audit caught: title persisted last visited chapter even after
  // returning home, hurting bookmarks and history readability).
  if (typeof updatePageTitle === 'function') updatePageTitle();
  // Close mobile rail if open
  const rail = document.getElementById('chapter-rail');
  const hb   = document.getElementById('hamburger');
  if (rail) rail.classList.remove('open');
  if (hb) {
    hb.classList.remove('open');
    hb.setAttribute('aria-expanded', 'false');
  }
  // Close Bjørn too — otherwise the chat panel stays open while the
  // page scroll-lock is reset two lines below, letting the user scroll
  // behind a still-floating panel.
  if (typeof Bjorn !== 'undefined' && !document.getElementById('bjorn-widget')?.classList.contains('closed')) {
    Bjorn.close();
  }
  // Close lang dropdown too
  document.querySelector('.lang-selector')?.classList.remove('open');
  document.getElementById('mobile-overlay')?.classList.remove('visible');
  document.body.style.overflow = '';
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
// Public alias — clearer name for future callers
window.goHome = window.scrollToTop;

/* ══════════════════════════════════════════════════════
   PRINT CHECKLIST — collects all incomplete tasks
══════════════════════════════════════════════════════ */
window.printChecklist = () => {
  const lang = window.currentLang || 'en';
  // Translated print headers (everything visible in the printed document,
  // including the browser-tab <title> below)
  const PRINT_T = {
    title:    { en:'My Denmark Checklist', fr:'Ma Liste pour le Danemark', ar:'قائمتي للدنمارك', es:'Mi Lista de Dinamarca', da:'Min Danmarks-tjekliste', de:'Meine Dänemark-Checkliste', uk:'Мій список для Данії', pl:'Moja lista dla Danii', ur:'ڈنمارک کی میری چیک لسٹ', fa:'چک‌لیست دانمارک من' },
    printed:  { en:'Printed from ANKOMMER', fr:'Imprimé depuis ANKOMMER', ar:'طُبع من ANKOMMER', es:'Impreso desde ANKOMMER', da:'Udskrevet fra ANKOMMER', de:'Gedruckt aus ANKOMMER', uk:'Надруковано з ANKOMMER', pl:'Wydrukowano z ANKOMMER', ur:'ANKOMMER سے پرنٹ کیا گیا', fa:'چاپ شده از ANKOMMER' },
    done:     { en:'done', fr:'effectué', ar:'منجز', es:'listo', da:'klaret', de:'erledigt', uk:'виконано', pl:'wykonane', ur:'مکمل', fa:'انجام شد' },
    footer:   { en:'ANKOMMER · Your life in Denmark. Chapter by chapter.', fr:'ANKOMMER · Votre vie au Danemark. Chapitre par chapitre.', ar:'ANKOMMER · حياتك في الدنمارك. فصلاً تلو الآخر.', es:'ANKOMMER · Tu vida en Dinamarca. Capítulo a capítulo.', da:'ANKOMMER · Dit liv i Danmark. Kapitel for kapitel.', de:'ANKOMMER · Dein Leben in Dänemark. Kapitel für Kapitel.', uk:'ANKOMMER · Ваше життя в Данії. Розділ за розділом.', pl:'ANKOMMER · Twoje życie w Danii. Rozdział po rozdziale.', ur:'ANKOMMER · ڈنمارک میں آپ کی زندگی۔ باب در باب۔', fa:'ANKOMMER · زندگی شما در دانمارک. فصل به فصل.' }
  };
  const _pt = (key) => PRINT_T[key][lang] || PRINT_T[key].en;
  const lines = [];
  lines.push(`<html><head><meta charset="utf-8"><title>${_pt('title')} — ANKOMMER</title>`);
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
  lines.push(`<h1>🇩🇰 ${_pt('title')}</h1>`);
  lines.push(`<p style="color:#888;font-size:0.85rem">${_pt('printed')} · ankommer.org · ${new Date().toLocaleDateString()}</p>`);

  CHAPTERS.forEach(ch => {
    const tasks = ch.checklist || [];
    if (!tasks.length) return;
    const done = tasks.filter(t => AppState.completedTasks[t.id]).length;
    lines.push(`<h2>${ch.icon} ${ch.title[lang] || ch.title.en} <span style="font-size:0.75rem;font-weight:400;color:#888">(${done}/${tasks.length} ${_pt('done')})</span></h2>`);
    tasks.forEach(t => {
      const isDone = !!AppState.completedTasks[t.id];
      const label = t.text[lang] || t.text.en || t.text;
      lines.push(`<div class="task ${isDone ? 'done' : ''}"><div class="box"></div><span class="label">${label}</span><span class="xp">+${t.xp || 10} VP</span></div>`);
    });
  });

  lines.push(`<div class="meta">${_pt('footer')}</div></body></html>`);
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(lines.join(''));
    w.document.close();
    w.print();
  } else {
    // Popup blocked — silent fail leaves the user thinking the button is
    // broken. Surface a toast so they can re-trigger after allowing popups.
    const msg = {
      en: 'Allow pop-ups to print your checklist',
      fr: 'Autorisez les pop-ups pour imprimer votre liste',
      ar: 'يرجى السماح بالنوافذ المنبثقة لطباعة قائمتك',
      es: 'Permite las ventanas emergentes para imprimir tu lista',
      da: 'Tillad pop op-vinduer for at printe din tjekliste',
      de: 'Pop-ups erlauben, um die Checkliste zu drucken',
      uk: 'Дозвольте спливаючі вікна, щоб роздрукувати список',
      pl: 'Zezwól na wyskakujące okienka, aby wydrukować listę',
      ur: 'پرنٹ کرنے کے لیے پاپ اپ کی اجازت دیں',
      fa: 'برای چاپ، پنجره‌های بازشو را مجاز کنید'
    }[lang] || 'Allow pop-ups to print your checklist';
    if (typeof App !== 'undefined' && App.showToast) App.showToast(msg, 'warning');
  }
};

/* ══════════════════════════════════════════════════════
   COPY TOOL RESULT TO CLIPBOARD
══════════════════════════════════════════════════════ */
window.copyToolResult = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) return;
  // Extract plain text — strip HTML tags
  const text = el.innerText || el.textContent || '';
  const lang = window.currentLang || 'en';
  const COPY_T = {
    success: { en:'Result copied to clipboard ✓', fr:'Résultat copié ✓', ar:'تم النسخ ✓', es:'Copiado al portapapeles ✓', da:'Kopieret til udklipsholder ✓', de:'In Zwischenablage kopiert ✓', uk:'Скопійовано ✓', pl:'Skopiowano ✓', ur:'کلپ بورڈ پر کاپی کر دیا گیا ✓', fa:'در کلیپ‌بورد کپی شد ✓' },
    fail:    { en:'Copy failed — try selecting the text manually', fr:'Échec de la copie — sélectionnez le texte manuellement', ar:'فشل النسخ — حاول تحديد النص يدوياً', es:'Error al copiar — selecciona el texto manualmente', da:'Kopiering mislykkedes — vælg teksten manuelt', de:'Kopieren fehlgeschlagen — Text manuell auswählen', uk:'Помилка копіювання — виділіть текст вручну', pl:'Kopiowanie nie powiodło się — zaznacz ręcznie', ur:'کاپی ناکام — متن دستی طور پر منتخب کریں', fa:'کپی نشد — متن را دستی انتخاب کنید' }
  };
  navigator.clipboard.writeText(text.trim()).then(() => {
    App.showToast(COPY_T.success[lang] || COPY_T.success.en, 'success');
  }).catch(() => {
    App.showToast(COPY_T.fail[lang] || COPY_T.fail.en, 'error');
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

/* Skip-to-content link: <a href="#main-content"> alone scrolls but
   doesn't move keyboard focus, because <main> isn't focusable by
   default. <main> now has tabindex="-1" (HTML), but on home the <main>
   sits inside app-layout.hidden — focus(.) on a hidden element is a
   no-op. So we pick the right target dynamically: in chapter mode →
   <main>; on home → the hero. The hero gets a programmatic tabindex
   on first activation so it's focusable without leaving a stray attr
   in the HTML. */
document.addEventListener('DOMContentLoaded', () => {
  const skip = document.querySelector('.skip-to-content');
  if (!skip) return;
  skip.addEventListener('click', (e) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    const app  = document.getElementById('app-layout');
    const hero = document.getElementById('hero');
    let target = main;
    // If chapter mode isn't active OR app-layout is hidden, focus hero.
    if (!app || app.classList.contains('hidden') || !document.body.classList.contains('app-active')) {
      target = hero;
    }
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    // Focus FIRST (synchronous), then scroll. Earlier order (scroll →
    // rAF → focus) failed because the smooth-scroll animation seemed to
    // interfere with focus() in some Chromium builds — focus would
    // silently bail back to <body>. Synchronous focus is rock-solid.
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

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
      aria-label="${t_('chapterWord', lang)} ${ch.id + 1}: ${title}"
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

  /* Monotonic floor that grows DAILY. We can't let a fresh device,
     a cleared cache, an ad-blocker, or a slow counterapi.dev response
     drag the hero below known reality. Two contributions add up:
        floor          = anchor-count + days-since-anchor * daily-growth
        api / cache    = real backend counter, ratchets above floor
     and every rendered value is max(floor, cached, api). So:
       - first paint shows the floor instantly (no "1", "0" or "—")
       - the floor grows on its own every day, even if backend is offline
       - the backend /up call on each session can only push higher
       - across devices the displayed number is monotonically non-decreasing
     Daily growth (was weekly) keeps the floor smoothly tracking reality —
     no big weekly jumps, no long stretches where backend is far above
     floor. Anchor numbers reflect verified counts on the anchor date.
     Adjust the daily-growth constants if real growth outpaces them. */
  const ANCHOR_DATE_MS = Date.UTC(2026, 4, 22); // 2026-05-22 anchor (month is 0-indexed)
  const DAY_MS         = 24 * 60 * 60 * 1000;
  const daysSince      = () => Math.max(0, Math.floor((Date.now() - ANCHOR_DATE_MS) / DAY_MS));
  const STAT_FLOOR = {
    'visitors':        () => 310 + daysSince() * 3,   // ~3 new visitors/day (≈21/week)
    'bjorn-questions': () => 130 + daysSince() * 2,   // ~2 new questions/day (≈14/week)
  };
  const floorOf = (key) => {
    const f = STAT_FLOOR[key];
    return typeof f === 'function' ? f() : 0;
  };

  /* Read from localStorage cache (no network call needed for reads) */
  const localGet  = (key) => parseInt(safeGetItem(`ankommer_cnt_${key}`)) || 0;
  const localHit  = (key) => {
    // Never let the cached value drop below the floor.
    const v = Math.max(localGet(key) + 1, floorOf(key));
    safeSetItem(`ankommer_cnt_${key}`, v);
    return v;
  };

  /* Hit /up — increments counter, returns new count (or floor, whichever is higher) */
  const apiHit = async (key) => {
    const r = await fetch(`${API}/${NS}/${key}/up`, { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    // Take max(api, floor, cached) so a counter reset or low-volume namespace
    // can never publish a value below reality. Cache the safe value.
    const safe = Math.max(parseInt(d.count) || 0, floorOf(key), localGet(key));
    safeSetItem(`ankommer_cnt_${key}`, safe);
    return safe;
  };

  /* Show cached value (or floor, whichever is higher) immediately,
     then a later API hit can ratchet upward. Never below floor. */
  const showCached = (elId, key) => {
    const el = document.getElementById(elId);
    if (!el) return;
    animateTo(el, Math.max(floorOf(key), localGet(key)));
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

  /* Count each answered Bjørn question */
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
    // Show cached counts instantly (or fall back to floor) while async runs
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

  // Expose a direct rail toggle that doesn't depend on the hamburger being
  // visible — used by "📚 Browse all 16 chapters" on home and "Pick another
  // chapter" inside chapters. The hamburger is display:none above 768px,
  // so .click()-ing it silently fails on tablets.
  window.openChapterRail = () => {
    // First, dismiss any other open mobile modal that shares the overlay
    // so we never end up with two stacked panels.
    const langSel = document.querySelector('.lang-selector');
    if (langSel?.classList.contains('open')) {
      langSel.classList.remove('open');
    }
    rail?.classList.add('open');
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.getElementById('mobile-overlay')?.classList.add('visible');
      document.body.style.overflow = 'hidden';
      // Scroll the active chapter into view inside the rail. With 16
      // chapters at ~46px each the rail content exceeds the iPhone SE
      // viewport, so a user reading chapter 13+ would land at
      // scrollTop=0 and not see where they are.
      requestAnimationFrame(() => {
        rail?.querySelector('.rail-item.active')?.scrollIntoView({ block: 'center' });
      });
    } else {
      // On desktop (>=1024px) the rail is already visible as a sidebar,
      // so adding `.open` is a no-op visually. Scroll the rail into view
      // and pulse-highlight the rail header so the user sees WHERE the
      // chapter list lives — otherwise "Pick another chapter" feels
      // broken (audit: Maria reported it "scrolled to top instead of
      // opening a picker"). The pulse class is removed automatically.
      rail?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      rail?.classList.add('pulse-attn');
      setTimeout(() => rail?.classList.remove('pulse-attn'), 1400);
    }
  };

  hamburger?.addEventListener('click', () => {
    const opened = hamburger.classList.toggle('open');
    rail?.classList.toggle('open', opened);
    hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
    // Sync the shared mobile backdrop on small screens
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.getElementById('mobile-overlay')?.classList.toggle('visible', opened);
      document.body.style.overflow = opened ? 'hidden' : '';
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (rail?.classList.contains('open') &&
        !rail.contains(e.target) &&
        !hamburger?.contains(e.target) &&
        !e.target.closest('#mobile-overlay')) {
      rail.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.getElementById('mobile-overlay')?.classList.remove('visible');
      document.body.style.overflow = '';
    }
  });
};

/* ══════════════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════════════ */
const hideLoader = () => {
  setTimeout(() => {
    const el = document.getElementById('loader');
    if (!el) return;
    el.classList.add('done');
    // Remove the loader from the DOM after the fade-out transition so
    // the position:fixed full-screen z-index:9999 node can't catch
    // hover/scroll events on slow devices. Matches the 600ms transition
    // declared on #loader.done.
    setTimeout(() => { el.remove(); }, 700);
  }, 1800);
};

/* ══════════════════════════════════════════════════════
   LANGUAGE BUTTONS
══════════════════════════════════════════════════════ */
const initLangButtons = () => {
  // Sync active class on initial page load — handles ?lang= URL param and
  // localStorage-saved language (HTML has class="active" hardcoded on EN button)
  const lang = window.currentLang || 'en';
  document.querySelectorAll('.lang-btn').forEach(b => {
    const active = b.dataset.lang === lang;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  // Tag the .lang-selector with the current code so the mobile dropdown
  // (CSS ::before content: attr(data-current-lang)) shows e.g. "EN" / "AR"
  const syncCurrentLang = () => {
    const selector = document.querySelector('.lang-selector');
    if (selector) selector.dataset.currentLang = (window.currentLang || 'en').toUpperCase();
  };
  syncCurrentLang();
  // Re-sync after every language switch
  window.addEventListener('langChange', syncCurrentLang);

  // Tap the EN pill to expand/collapse the lang dropdown — works on
  // every viewport size now (was previously phone-only). On phones the
  // dropdown anchors to the viewport corner and dims the page with the
  // shared mobile-overlay; on desktop/tablet it floats below the pill
  // without a backdrop (closing on outside-click is enough).
  const selector = document.querySelector('.lang-selector');
  const _overlay  = () => document.getElementById('mobile-overlay');
  const _isPhone  = () => window.matchMedia('(max-width: 600px)').matches;
  const _closeLang = () => {
    selector?.classList.remove('open');
    selector?.setAttribute('aria-expanded', 'false');
    _overlay()?.classList.remove('visible');
    // Always release the body lock — even if it wasn't us who set it,
    // the close path is the safe place to clear it.
    if (_isPhone()) document.body.style.overflow = '';
  };
  const _toggleLang = () => {
    const opening = !selector.classList.contains('open');
    selector.classList.toggle('open', opening);
    selector.setAttribute('aria-expanded', opening ? 'true' : 'false');
    if (_isPhone()) {
      _overlay()?.classList.toggle('visible', opening);
      document.body.style.overflow = opening ? 'hidden' : '';
    }
    // When opening via keyboard, move focus into the menu so arrow/tab navigation works.
    if (opening) {
      const firstBtn = selector.querySelector('.lang-btn');
      // Defer focus a tick so the dropdown is rendered/visible first.
      setTimeout(() => firstBtn?.focus(), 0);
    }
  };
  if (selector) {
    selector.addEventListener('click', (e) => {
      // Toggle when click lands on the selector itself or its ::before
      // pill (not a lang-btn inside the dropdown menu).
      if (!e.target.closest('.lang-btn')) _toggleLang();
    });
    // Keyboard support: Enter/Space on the pill opens/closes the dropdown.
    // Without this, Tab can reach the pill but it has no way to expand.
    selector.addEventListener('keydown', (e) => {
      if (e.target !== selector) return; // ignore when focus is on inner lang-btns
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        _toggleLang();
      }
    });
    // Close after picking a language. Use closest() so this also fires
    // when the user's tap lands on the inner <span>EN</span> or the flag
    // emoji text node — exact-class match would miss those targets and
    // leave the dropdown + backdrop visually stuck after the language
    // had already switched.
    selector.addEventListener('click', (e) => {
      if (e.target.closest('.lang-btn')) _closeLang();
    });
    // Close when clicking outside (only if lang is currently open — don't fight Bjørn's overlay)
    document.addEventListener('click', (e) => {
      if (selector.classList.contains('open') && !selector.contains(e.target) && !e.target.closest('#mobile-overlay')) {
        _closeLang();
      }
    });
    // Close on Escape key for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && selector.classList.contains('open')) _closeLang();
    });
  }

  // Shared overlay: tap backdrop to close whatever is open
  const overlayEl = document.getElementById('mobile-overlay');
  if (overlayEl) {
    overlayEl.addEventListener('click', () => {
      _closeLang();
      // Close Bjørn (the IIFE exposes itself as the global `Bjorn`)
      if (typeof Bjorn !== 'undefined' && Bjorn.close) Bjorn.close();
      // Close hamburger / chapter rail if open
      const rail = document.getElementById('chapter-rail');
      const hb   = document.getElementById('hamburger');
      if (rail?.classList.contains('open')) {
        rail.classList.remove('open');
        hb?.classList.remove('open');
        hb?.setAttribute('aria-expanded', 'false');
      }
      overlayEl.classList.remove('visible');
      document.body.style.overflow = '';
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

      // Index each section. sectionIdx is needed so a search hit on a
      // section can scroll-and-expand the matching <details> after the
      // chapter loads, instead of dropping the user at the chapter top.
      (ch.sections || []).forEach((sec, sectionIdx) => {
        const secTitle = sec.title?.[lang] || sec.title?.en || '';
        const secBody  = (sec.content?.[lang] || sec.content?.en || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        searchIndex.push({
          type: 'section', chapterId: ch.id, sectionIdx, icon: sec.icon || ch.icon,
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
        <li class="search-result-item" role="option" data-idx="${i}" data-chapter="${r.chapterId}" data-section="${r.sectionIdx ?? ''}">
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
        const secIdxStr = item.dataset.section;
        const sectionIdx = secIdxStr === '' || secIdxStr === undefined ? null : parseInt(secIdxStr);
        close();
        setTimeout(() => {
          openChapter(chId);
          // If the hit was a section, scroll to it and expand it once the
          // chapter has rendered. Without this the user lands at the
          // chapter top and has to hunt for the term again.
          if (sectionIdx !== null && !Number.isNaN(sectionIdx)) {
            setTimeout(() => {
              const secId = `ch-sec-${chId}-${sectionIdx}`;
              const sec = document.getElementById(secId);
              if (sec) {
                if (!sec.classList.contains('open') && typeof window.toggleSection === 'function') {
                  window.toggleSection(secId);
                }
                sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 400);
          }
        }, 120);
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
    // Defer focus so the overlay is painted first — prevents dropped
    // keystrokes. Belt-and-suspenders: two rAF frames AND a timeout
    // fallback because audit found the rAF path occasionally raced with
    // the click event handler returning focus to the trigger.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      input?.focus();
      input?.select();
    }));
    setTimeout(() => {
      if (document.activeElement !== input) {
        input?.focus();
        input?.select();
      }
    }, 100);
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
    document.getElementById('search-close')?.addEventListener('click', close);

    // Ctrl+K / Cmd+K opens. Belt-and-suspenders Escape close: the
    // FocusTrap's keydown only fires when focus is inside the overlay,
    // but Maria reported ESC sometimes failing — likely focus escaping
    // to the body in some edge case. Listen at document scope too.
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
      else if (e.key === 'Escape') {
        const overlay = document.getElementById('search-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
          e.preventDefault();
          close();
        }
      }
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
      } else if (e.key === 'Enter') {
        // If the user typed and pressed Enter without using arrow keys,
        // selectedIdx is still -1 — default to the first result so
        // typing+Enter works as a one-shot search (audit caught this
        // failing silently — common UX expectation).
        const idx = selectedIdx >= 0 ? selectedIdx : 0;
        const active = items[idx];
        if (active) {
          e.preventDefault();
          close();
          setTimeout(() => openChapter(parseInt(active.dataset.chapter)), 120);
        }
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
      label: { en:'Week 1 — The Critical Window', fr:'Semaine 1 — La fenêtre critique', ar:'الأسبوع 1 — النافذة الحرجة', es:'Semana 1 — La ventana crítica', da:'Uge 1 — Det kritiske vindue', de:'Woche 1 — Das kritische Fenster', uk:'Тиждень 1 — Критичне вікно', pl:'Tydzień 1 — Krytyczne okno', ur:'ہفتہ 1 — اہم ترین موقع', fa:'هفته ۱ — پنجره بحرانی' },
      icon: '⚡',
      color: '#C60C30',
      desc: { en:'Do all of these in your first 7 days, in any order.', fr:'Faites tout cela dans vos 7 premiers jours, dans n\'importe quel ordre.', ar:'قم بكل هذا في أول 7 أيام، بأي ترتيب.', es:'Haz todo esto en tus primeros 7 días, en cualquier orden.', da:'Gør dem alle i dine første 7 dage — i hvilken som helst rækkefølge.', de:'Erledige alle in den ersten 7 Tagen, in beliebiger Reihenfolge.', uk:'Виконайте все протягом перших 7 днів, у будь-якому порядку.', pl:'Zrób to wszystko w pierwszych 7 dniach, w dowolnej kolejności.', ur:'پہلے 7 دنوں میں یہ سب کریں، کسی بھی ترتیب میں۔', fa:'همه اینها را در ۷ روز اول انجام دهید، به هر ترتیبی.' },
      tasks: [
        { id:'tl_address',   icon:'📍', text:{ en:'Register your address at Borgerservice or borger.dk', fr:'Enregistrez votre adresse à Borgerservice ou sur borger.dk', ar:'سجّل عنوانك في Borgerservice أو على borger.dk', es:'Registra tu dirección en Borgerservice o en borger.dk', da:'Tilmeld din adresse på Borgerservice eller borger.dk', de:'Adresse beim Borgerservice oder auf borger.dk anmelden', uk:'Зареєструйте адресу в Borgerservice або на borger.dk', pl:'Zarejestruj adres w Borgerservice lub na borger.dk', ur:'Borgerservice یا borger.dk پر اپنا پتہ رجسٹر کریں', fa:'آدرس خود را در Borgerservice یا borger.dk ثبت کنید' }, source:'borger.dk', urgent:true,  chapter:1 },
        { id:'tl_cpr_book',  icon:'🆔', text:{ en:'Book ICS appointment to get your CPR number', fr:'Prenez rendez-vous au centre ICS pour obtenir votre numéro CPR', ar:'احجز موعداً في مركز ICS للحصول على رقم CPR', es:'Reserva cita en ICS para obtener tu número CPR', da:'Book ICS-tid for at få dit CPR-nummer', de:'ICS-Termin buchen für die CPR-Nummer', uk:'Запишіться до ICS для отримання номера CPR', pl:'Zarezerwuj wizytę w ICS aby otrzymać numer CPR', ur:'CPR نمبر کے لیے ICS اپوائنٹمنٹ بک کریں', fa:'برای دریافت شماره CPR وقت ICS رزرو کنید' }, source:'nyidanmark.dk', urgent:true, chapter:1 },
        { id:'tl_mitid',     icon:'🔐', text:{ en:'Activate MitID — your Danish digital identity', fr:'Activez MitID — votre identité numérique danoise', ar:'فعّل MitID — هويتك الرقمية الدنماركية', es:'Activa MitID — tu identidad digital danesa', da:'Aktivér MitID — din digitale danske identitet', de:'MitID aktivieren — Ihre dänische digitale Identität', uk:'Активуйте MitID — вашу цифрову датську ідентичність', pl:'Aktywuj MitID — swoją duńską tożsamość cyfrową', ur:'MitID فعال کریں — آپ کی ڈینش ڈیجیٹل شناخت', fa:'MitID را فعال کنید — هویت دیجیتال دانمارکی شما' }, source:'mitid.dk', urgent:true, chapter:1 },
        { id:'tl_ebox',      icon:'📬', text:{ en:'Set up e-Boks and enable push notifications', fr:'Configurez e-Boks et activez les notifications push', ar:'أعدّ e-Boks وفعّل الإشعارات الفورية', es:'Configura e-Boks y activa las notificaciones push', da:'Opsæt e-Boks og aktivér push-notifikationer', de:'e-Boks einrichten und Push-Benachrichtigungen aktivieren', uk:'Налаштуйте e-Boks та увімкніть push-повідомлення', pl:'Skonfiguruj e-Boks i włącz powiadomienia push', ur:'e-Boks ترتیب دیں اور پش نوٹیفکیشن فعال کریں', fa:'e-Boks را راه‌اندازی کنید و اعلان‌های فوری را فعال کنید' }, source:'e-boks.com', urgent:true, chapter:1 },
        { id:'tl_sim',       icon:'📱', text:{ en:'Get a Danish SIM card (TDC, Lebara, Oister, Lycamobile)', fr:'Obtenez une carte SIM danoise (TDC, Lebara, Oister, Lycamobile)', ar:'احصل على شريحة SIM دنماركية (TDC، Lebara، Oister، Lycamobile)', es:'Consigue una tarjeta SIM danesa (TDC, Lebara, Oister, Lycamobile)', da:'Få et dansk SIM-kort (TDC, Lebara, Oister, Lycamobile)', de:'Dänische SIM-Karte besorgen (TDC, Lebara, Oister, Lycamobile)', uk:'Придбайте датську SIM-карту (TDC, Lebara, Oister, Lycamobile)', pl:'Zdobądź duńską kartę SIM (TDC, Lebara, Oister, Lycamobile)', ur:'ڈینش سم کارڈ حاصل کریں (TDC, Lebara, Oister, Lycamobile)', fa:'سیم‌کارت دانمارکی بگیرید (TDC، Lebara، Oister، Lycamobile)' }, source:'—', urgent:false, chapter:1 },
        { id:'tl_emergency', icon:'🚨', text:{ en:'Save 1813 (urgent medical) and 112 (emergency) in phone', fr:'Enregistrez le 1813 (urgences médicales) et le 112 (urgences) dans votre téléphone', ar:'احفظ 1813 (طوارئ طبية) و112 (طوارئ) في هاتفك', es:'Guarda el 1813 (urgencias médicas) y el 112 (emergencias) en tu teléfono', da:'Gem 1813 (akut lægelig) og 112 (nødopkald) i telefonen', de:'1813 (medizinischer Notfall) und 112 (Notruf) im Telefon speichern', uk:'Збережіть 1813 (медична допомога) та 112 (екстрений) у телефоні', pl:'Zapisz 1813 (nagłe medyczne) i 112 (ratunkowy) w telefonie', ur:'فون میں 1813 (ہنگامی طبی) اور 112 (ہنگامی) محفوظ کریں', fa:'1813 (اورژانس پزشکی) و 112 (اضطراری) را در تلفن ذخیره کنید' }, source:'sundhed.dk', urgent:true, chapter:5 },
        { id:'tl_insurance', icon:'🛡️', text:{ en:'Confirm you have health insurance until yellow card arrives', fr:'Vérifiez que vous avez une assurance maladie jusqu\'à l\'arrivée de la carte jaune', ar:'تأكد من وجود تأمين صحي حتى وصول البطاقة الصفراء', es:'Confirma que tienes seguro médico hasta que llegue la tarjeta amarilla', da:'Bekræft at du har sundhedsforsikring indtil det gule sundhedskort ankommer', de:'Krankenversicherung bis zur gelben Karte bestätigen', uk:'Переконайтесь у медичній страховці до отримання жовтої картки', pl:'Potwierdź ubezpieczenie zdrowotne do otrzymania żółtej karty', ur:'تصدیق کریں کہ پیلا کارڈ آنے تک صحت بیمہ موجود ہے', fa:'مطمئن شوید که تا دریافت کارت زرد بیمه درمانی دارید' }, source:'—', urgent:true, chapter:5 },
      ]
    },
    month1: {
      label: { en:'Month 1 — Building the Foundation', fr:'Mois 1 — Construire les bases', ar:'الشهر 1 — بناء الأساس', es:'Mes 1 — Construyendo la base', da:'Måned 1 — Byg fundamentet', de:'Monat 1 — Das Fundament legen', uk:'Місяць 1 — Будуємо фундамент', pl:'Miesiąc 1 — Budowanie fundamentów', ur:'مہینہ 1 — بنیاد تیار کرنا', fa:'ماه ۱ — ساختن پایه' },
      icon: '🏗️',
      color: '#2E6DA4',
      desc: { en:'Get the essentials working. Your financial and healthcare life starts here.', fr:'Mettez en place l\'essentiel. Votre vie financière et médicale commence ici.', ar:'تجهيز الأساسيات. حياتك المالية والصحية تبدأ هنا.', es:'Pon a funcionar lo esencial. Tu vida financiera y sanitaria empieza aquí.', da:'Få det grundlæggende på plads. Dit finansielle og sundhedsmæssige liv starter her.', de:'Grundlagen einrichten. Ihr finanzielles und medizinisches Leben beginnt hier.', uk:'Налагодьте основне. Ваше фінансове та медичне життя починається тут.', pl:'Uruchom podstawy. Twoje życie finansowe i zdrowotne zaczyna się tutaj.', ur:'ضروری چیزیں ترتیب دیں۔ مالی اور صحت کی زندگی یہاں سے شروع ہوتی ہے۔', fa:'ضروریات را راه‌اندازی کنید. زندگی مالی و بهداشتی از اینجا شروع می‌شود.' },
      tasks: [
        { id:'tl_skattekort', icon:'📊', text:{ en:'Get your skattekort (tax card) from skat.dk before first paycheck', fr:'Obtenez votre skattekort (carte fiscale) sur skat.dk avant le premier salaire', ar:'احصل على skattekort من skat.dk قبل أول راتب', es:'Consigue tu skattekort en skat.dk antes del primer sueldo', da:'Hent dit skattekort fra skat.dk inden første lønudbetaling', de:'Skattekort vor dem ersten Gehalt auf skat.dk beantragen', uk:'Отримайте skattekort на skat.dk до першої зарплати', pl:'Pobierz skattekort ze skat.dk przed pierwszą wypłatą', ur:'پہلی تنخواہ سے پہلے skat.dk سے skattekort حاصل کریں', fa:'قبل از اولین حقوق skattekort را از skat.dk بگیرید' }, source:'skat.dk', urgent:true, chapter:4 },
        { id:'tl_bank',       icon:'🏦', text:{ en:'Open a Danish bank account (Lunar, Nordea, or Danske Bank)', fr:'Ouvrez un compte bancaire danois (Lunar, Nordea ou Danske Bank)', ar:'افتح حساباً بنكياً دنماركياً (Lunar أو Nordea أو Danske Bank)', es:'Abre una cuenta bancaria danesa (Lunar, Nordea o Danske Bank)', da:'Åbn en dansk bankkonto (Lunar, Nordea eller Danske Bank)', de:'Dänisches Bankkonto eröffnen (Lunar, Nordea oder Danske Bank)', uk:'Відкрийте датський рахунок (Lunar, Nordea або Danske Bank)', pl:'Otwórz duńskie konto bankowe (Lunar, Nordea lub Danske Bank)', ur:'ڈینش بینک اکاؤنٹ کھولیں (Lunar، Nordea یا Danske Bank)', fa:'حساب بانکی دانمارکی باز کنید (Lunar، Nordea یا Danske Bank)' }, source:'—', urgent:true, chapter:4 },
        { id:'tl_nemkonto',   icon:'💳', text:{ en:'Register your NemKonto at nemkonto.dk', fr:'Enregistrez votre NemKonto sur nemkonto.dk', ar:'سجّل NemKonto على nemkonto.dk', es:'Registra tu NemKonto en nemkonto.dk', da:'Registrér din NemKonto på nemkonto.dk', de:'NemKonto auf nemkonto.dk registrieren', uk:'Зареєструйте NemKonto на nemkonto.dk', pl:'Zarejestruj NemKonto na nemkonto.dk', ur:'nemkonto.dk پر NemKonto رجسٹر کریں', fa:'NemKonto خود را در nemkonto.dk ثبت کنید' }, source:'nemkonto.dk', urgent:true, chapter:4 },
        { id:'tl_mobilepay',  icon:'📱', text:{ en:'Download and activate MobilePay', fr:'Téléchargez et activez MobilePay', ar:'نزّل وفعّل MobilePay', es:'Descarga y activa MobilePay', da:'Download og aktivér MobilePay', de:'MobilePay herunterladen und aktivieren', uk:'Завантажте та активуйте MobilePay', pl:'Pobierz i aktywuj MobilePay', ur:'MobilePay ڈاؤنلوڈ اور فعال کریں', fa:'MobilePay را دانلود و فعال کنید' }, source:'mobilepay.dk', urgent:false, chapter:4 },
        { id:'tl_gp',         icon:'👨‍⚕️', text:{ en:'Register with a GP (doctor) at sundhed.dk', fr:'Inscrivez-vous chez un médecin généraliste sur sundhed.dk', ar:'سجّل لدى طبيب عام على sundhed.dk', es:'Regístrate con un médico de cabecera en sundhed.dk', da:'Tilmeld dig hos en praktiserende læge på sundhed.dk', de:'Beim Hausarzt auf sundhed.dk registrieren', uk:'Зареєструйтесь у сімейного лікаря на sundhed.dk', pl:'Zarejestruj się u lekarza rodzinnego na sundhed.dk', ur:'sundhed.dk پر GP کے ساتھ رجسٹر کریں', fa:'در sundhed.dk با پزشک عمومی ثبت‌نام کنید' }, source:'sundhed.dk', urgent:true, chapter:5 },
        { id:'tl_sygesik',    icon:'🦷', text:{ en:'Join Sygeforsikring "denmark" for dental coverage', fr:'Adhérez à Sygeforsikring "denmark" pour la couverture dentaire', ar:'انضم إلى Sygeforsikring "denmark" للتغطية الصحية للأسنان', es:'Únete a Sygeforsikring "denmark" para cobertura dental', da:'Tilmeld dig Sygeforsikring "denmark" for tandlægedækning', de:'Sygeforsikring "denmark" für Zahnversicherung beitreten', uk:'Вступіть до Sygeforsikring "denmark" для стоматологічного покриття', pl:'Dołącz do Sygeforsikring "denmark" na ubezpieczenie stomatologiczne', ur:'دانتوں کی کوریج کے لیے Sygeforsikring "denmark" میں شامل ہوں', fa:'برای پوشش دندانپزشکی به Sygeforsikring "denmark" بپیوندید' }, source:'sygeforsikring.dk', urgent:false, chapter:5 },
        { id:'tl_akasse',     icon:'🛡️', text:{ en:'Join an a-kasse (unemployment insurance) — 12 month wait starts now', fr:'Adhérez à une a-kasse (assurance chômage) — le délai de 12 mois commence', ar:'انضم إلى a-kasse (تأمين ضد البطالة) — فترة الانتظار 12 شهراً تبدأ الآن', es:'Únete a una a-kasse (seguro de desempleo) — la espera de 12 meses empieza ya', da:'Meld dig ind i en a-kasse (dagpengeforsikring) — 12-måneders ventetid starter nu', de:'A-kasse beitreten (Arbeitslosenversicherung) — 12 Monate Wartezeit beginnt', uk:'Вступіть до a-kasse (страхування від безробіття) — 12 місяців очікування починається', pl:'Dołącz do a-kasse (ubezpieczenie od bezrobocia) — 12 miesięcy oczekiwania zaczyna się', ur:'a-kasse میں شامل ہوں — 12 ماہ کی انتظاری مدت ابھی شروع', fa:'به a-kasse بپیوندید — دوره انتظار ۱۲ ماهه از الان شروع می‌شود' }, source:'ase.dk', urgent:true, chapter:8 },
        { id:'tl_childcare',  icon:'🍼', text:{ en:'Apply for vuggestue/børnehave if you have young children', fr:'Faites une demande de crèche/jardin d\'enfants si vous avez de jeunes enfants', ar:'تقدّم بطلب للحضانة/روضة الأطفال إذا كان لديك أطفال صغار', es:'Solicita vuggestue/børnehave si tienes hijos pequeños', da:'Søg om vuggestue/børnehave hvis du har små børn', de:'Vuggestue/Børnehave beantragen bei kleinen Kindern', uk:'Подайте заявку на vuggestue/børnehave при наявності маленьких дітей', pl:'Złóż wniosek o vuggestue/børnehave jeśli masz małe dzieci', ur:'اگر چھوٹے بچے ہیں تو vuggestue/børnehave کے لیے درخواست دیں', fa:'اگر فرزند کوچک دارید برای vuggestue/børnehave درخواست دهید' }, source:'borger.dk', urgent:false, chapter:6 },
        { id:'tl_rejsekort',  icon:'🚌', text:{ en:'Buy a Rejsekort for public transport', fr:'Achetez un Rejsekort pour les transports en commun', ar:'اشترِ Rejsekort لوسائل النقل العامة', es:'Compra un Rejsekort para el transporte público', da:'Køb et Rejsekort til offentlig transport', de:'Rejsekort für den öffentlichen Nahverkehr kaufen', uk:'Придбайте Rejsekort для громадського транспорту', pl:'Kup Rejsekort na transport publiczny', ur:'عوامی نقل و حمل کے لیے Rejsekort خریدیں', fa:'Rejsekort برای حمل‌ونقل عمومی بخرید' }, source:'rejsekort.dk', urgent:false, chapter:10 },
      ]
    },
    month3: {
      label: { en:'Month 3 — Settling In', fr:'Mois 3 — S\'installer', ar:'الشهر 3 — الاستقرار', es:'Mes 3 — Asentándose', da:'Måned 3 — At slå rødder', de:'Monat 3 — Einleben', uk:'Місяць 3 — Облаштування', pl:'Miesiąc 3 — Osiedlanie się', ur:'مہینہ 3 — آباد ہونا', fa:'ماه ۳ — جا افتادن' },
      icon: '🌱',
      color: '#6A9E6A',
      desc: { en:'The paperwork is done. Now build your actual life.', fr:'Les démarches administratives sont terminées. Construisez maintenant votre vraie vie.', ar:'انتهت الأوراق. الآن ابنِ حياتك الحقيقية.', es:'El papeleo está hecho. Ahora construye tu vida real.', da:'Papirarbejdet er klaret. Nu skal du bygge dit rigtige liv.', de:'Die Bürokratie ist erledigt. Jetzt das richtige Leben aufbauen.', uk:'Паперова робота виконана. Тепер будуйте справжнє життя.', pl:'Papierkologia jest zrobiona. Teraz buduj swoje prawdziwe życie.', ur:'کاغذی کارروائی مکمل ہو گئی۔ اب اپنی اصل زندگی بنائیں۔', fa:'اسناد تمام شد. حالا زندگی واقعی خود را بسازید.' },
      tasks: [
        { id:'tl_danish',     icon:'🗣️', text:{ en:'Enrol in free Danskuddannelse language classes at your municipality', fr:'Inscrivez-vous aux cours de langue Danskuddannelse gratuits dans votre commune', ar:'التحق بدروس اللغة المجانية Danskuddannelse في بلديتك', es:'Inscríbete en clases de idioma Danskuddannelse gratuitas en tu municipio', da:'Tilmeld dig gratis Danskuddannelse sprogkurser i din kommune', de:'Kostenlose Danskuddannelse-Kurse in der Gemeinde belegen', uk:'Запишіться на безкоштовні мовні курси Danskuddannelse у комуні', pl:'Zapisz się na bezpłatne kursy Danskuddannelse w gminie', ur:'میونسپلٹی میں مفت Danskuddannelse کلاسوں میں داخلہ لیں', fa:'در کلاس‌های رایگان Danskuddannelse شهرداری ثبت‌نام کنید' }, source:'nyidanmark.dk', urgent:false, chapter:11 },
        { id:'tl_union',      icon:'🤝', text:{ en:'Consider joining a union (fagforening) for contract protection', fr:'Envisagez d\'adhérer à un syndicat (fagforening) pour la protection contractuelle', ar:'فكّر في الانضمام إلى نقابة (fagforening) لحماية العقد', es:'Considera unirte a un sindicato (fagforening) para protección contractual', da:'Overvej at melde dig ind i en fagforening for kontraktbeskyttelse', de:'Gewerkschaftsbeitritt (fagforening) für Vertragsschutz erwägen', uk:'Розгляньте вступ до профспілки (fagforening) для захисту договору', pl:'Rozważ wstąpienie do fagforening dla ochrony umowy', ur:'معاہدے کے تحفظ کے لیے یونین (fagforening) میں شامل ہونے پر غور کریں', fa:'برای حفاظت از قرارداد به اتحادیه (fagforening) پیوستن را در نظر بگیرید' }, source:'—', urgent:false, chapter:8 },
        { id:'tl_pension',    icon:'🏛️', text:{ en:'Confirm your employer pension (arbejdsmarkedspension) is active', fr:'Confirmez que votre pension professionnelle (arbejdsmarkedspension) est active', ar:'تأكد من أن معاش صاحب العمل (arbejdsmarkedspension) نشط', es:'Confirma que tu pensión laboral (arbejdsmarkedspension) está activa', da:'Bekræft at din arbejdsmarkedspension er aktiv', de:'Arbeitgeberrente (arbejdsmarkedspension) auf Aktivität bestätigen', uk:'Переконайтесь що пенсія від роботодавця (arbejdsmarkedspension) активна', pl:'Potwierdź że emerytura pracownicza (arbejdsmarkedspension) jest aktywna', ur:'تصدیق کریں کہ آجر پنشن (arbejdsmarkedspension) فعال ہے', fa:'مطمئن شوید که بازنشستگی کارفرما (arbejdsmarkedspension) فعال است' }, source:'pensionsinfo.dk', urgent:false, chapter:4 },
        { id:'tl_yellowcard', icon:'💛', text:{ en:'Receive and use your yellow sundhedskort at your GP', fr:'Recevez et utilisez votre sundhedskort jaune chez votre médecin', ar:'استلم واستخدم sundhedskort الأصفر لدى طبيبك', es:'Recibe y usa tu sundhedskort amarillo en tu médico de cabecera', da:'Modtag og brug dit gule sundhedskort hos din læge', de:'Gelbe Sundhedskort beim Hausarzt erhalten und nutzen', uk:'Отримайте та використовуйте жовту sundhedskort у лікаря', pl:'Odbierz żółte sundhedskort i używaj go u lekarza', ur:'GP سے پیلا sundhedskort وصول اور استعمال کریں', fa:'sundhedskort زرد را دریافت کنید و پیش پزشک استفاده کنید' }, source:'sundhed.dk', urgent:false, chapter:5 },
        { id:'tl_bike',       icon:'🚲', text:{ en:'Buy a bicycle — you will use it every day', fr:'Achetez un vélo — vous l\'utiliserez tous les jours', ar:'اشترِ دراجة هوائية — ستستخدمها كل يوم', es:'Compra una bicicleta — la usarás todos los días', da:'Køb en cykel — du vil bruge den hver dag', de:'Fahrrad kaufen — täglich im Einsatz', uk:'Купіть велосипед — ви будете ним користуватись щодня', pl:'Kup rower — będziesz go używać codziennie', ur:'سائیکل خریدیں — آپ اسے ہر روز استعمال کریں گے', fa:'دوچرخه بخرید — هر روز از آن استفاده خواهید کرد' }, source:'—', urgent:false, chapter:10 },
        { id:'tl_expat',      icon:'👥', text:{ en:'Join an expat community (InterNations, local Facebook groups)', fr:'Rejoignez une communauté d\'expatriés (InterNations, groupes Facebook locaux)', ar:'انضم إلى مجتمع المغتربين (InterNations، مجموعات فيسبوك المحلية)', es:'Únete a una comunidad expat (InterNations, grupos de Facebook locales)', da:'Deltag i et expat-fællesskab (InterNations, lokale Facebook-grupper)', de:'Expat-Community beitreten (InterNations, lokale Facebook-Gruppen)', uk:'Приєднайтесь до спільноти експатів (InterNations, місцеві групи)', pl:'Dołącz do społeczności expat (InterNations, lokalne grupy na Facebooku)', ur:'ایکسپیٹ کمیونٹی میں شامل ہوں (InterNations، Facebook گروپس)', fa:'به جامعه اکسپت بپیوندید (InterNations، گروه‌های محلی فیسبوک)' }, source:'—', urgent:false, chapter:12 },
        { id:'tl_insurance2', icon:'🏠', text:{ en:'Get indboforsikring (home contents insurance)', fr:'Souscrivez une indboforsikring (assurance habitation)', ar:'احصل على indboforsikring (تأمين محتويات المنزل)', es:'Consigue indboforsikring (seguro de contenido del hogar)', da:'Tegn en indboforsikring', de:'Indboforsikring (Hausratsversicherung) abschließen', uk:'Оформіть indboforsikring (страхування домашнього майна)', pl:'Wykup indboforsikring (ubezpieczenie zawartości domu)', ur:'indboforsikring (گھریلو سامان بیمہ) حاصل کریں', fa:'indboforsikring (بیمه لوازم منزل) بگیرید' }, source:'—', urgent:false, chapter:3 },
        { id:'tl_sport',      icon:'⚽', text:{ en:'Join a sports club or forening — this is how Danes socialise', fr:'Rejoignez un club sportif ou une forening — c\'est ainsi que les Danois socialisent', ar:'انضم إلى نادٍ رياضي أو forening — هكذا يتواصل الدنماركيون', es:'Únete a un club deportivo o forening — así es como socializan los daneses', da:'Meld dig ind i en sportsklub eller forening — det er sådan danskere socialiserer', de:'Sportverein oder Forening beitreten — so knüpfen Dänen Kontakte', uk:'Вступіть до спортивного клубу або forening — так датчани спілкуються', pl:'Dołącz do klubu sportowego lub forening — tak Duńczycy się socjalizują', ur:'کھیل کلب یا forening میں شامل ہوں — ڈینش لوگ اسی طرح میل جول رکھتے ہیں', fa:'به باشگاه ورزشی یا forening بپیوندید — اینگونه دانمارکی‌ها معاشرت می‌کنند' }, source:'—', urgent:false, chapter:12 },
      ]
    },
    month6: {
      label: { en:'Month 6 — Taking Root', fr:'Mois 6 — Prendre racine', ar:'الشهر 6 — تأصيل الجذور', es:'Mes 6 — Echando raíces', da:'Måned 6 — At slå rod', de:'Monat 6 — Wurzeln schlagen', uk:'Місяць 6 — Пускаємо коріння', pl:'Miesiąc 6 — Zapuszczanie korzeni', ur:'مہینہ 6 — جڑیں پکڑنا', fa:'ماه ۶ — ریشه دواندن' },
      icon: '🌳',
      color: '#B87333',
      desc: { en:'Half a year in. Time to think longer-term.', fr:'Un semestre passé. Il est temps de penser à plus long terme.', ar:'نصف عام مضى. حان وقت التفكير على المدى البعيد.', es:'Medio año. Es hora de pensar a más largo plazo.', da:'Et halvt år inde. Tid til at tænke langsigtet.', de:'Halbes Jahr geschafft. Zeit für langfristiges Denken.', uk:'Пів року позаду. Час думати довгостроково.', pl:'Pół roku za sobą. Czas myśleć długoterminowo.', ur:'نصف سال گزر گیا۔ طویل مدتی سوچنے کا وقت۔', fa:'نیم سال گذشت. وقت تفکر بلندمدت است.' },
      tasks: [
        { id:'tl_pd1',        icon:'📝', text:{ en:'Book your first Danish language test (PD1 or PD2)', fr:'Réservez votre premier test de langue danoise (PD1 ou PD2)', ar:'احجز أول اختبار لغة دنماركية (PD1 أو PD2)', es:'Reserva tu primera prueba de danés (PD1 o PD2)', da:'Book din første danske sprogtest (PD1 eller PD2)', de:'Ersten Dänisch-Sprachtest buchen (PD1 oder PD2)', uk:'Запишіться на перший тест з датської (PD1 або PD2)', pl:'Zarezerwuj pierwszy test języka duńskiego (PD1 lub PD2)', ur:'پہلا ڈینش زبان امتحان بک کریں (PD1 یا PD2)', fa:'اولین آزمون زبان دانمارکی را رزرو کنید (PD1 یا PD2)' }, source:'—', urgent:false, chapter:11 },
        { id:'tl_perm_date',  icon:'📅', text:{ en:'Calculate your permanent residency eligibility date', fr:'Calculez votre date d\'éligibilité à la résidence permanente', ar:'احسب تاريخ استحقاق الإقامة الدائمة', es:'Calcula tu fecha de elegibilidad para la residencia permanente', da:'Beregn din dato for permanent opholdstilladelse', de:'Datum der dauerhaften Aufenthaltserlaubnis berechnen', uk:'Розрахуйте дату права на постійне проживання', pl:'Oblicz datę uprawnienia do stałego pobytu', ur:'مستقل رہائش کی اہلیت کی تاریخ حساب کریں', fa:'تاریخ واجد شرایط شدن برای اقامت دائم را محاسبه کنید' }, source:'nyidanmark.dk', urgent:false, chapter:2 },
        { id:'tl_tax_check',  icon:'💰', text:{ en:'Review and update your forskudsopgørelse at skat.dk', fr:'Vérifiez et mettez à jour votre forskudsopgørelse sur skat.dk', ar:'راجع وحدّث forskudsopgørelse على skat.dk', es:'Revisa y actualiza tu forskudsopgørelse en skat.dk', da:'Gennemgå og opdater din forskudsopgørelse på skat.dk', de:'Forskudsopgørelse auf skat.dk prüfen und aktualisieren', uk:'Перегляньте та оновіть forskudsopgørelse на skat.dk', pl:'Sprawdź i zaktualizuj forskudsopgørelse na skat.dk', ur:'skat.dk پر forskudsopgørelse کا جائزہ اور اپ ڈیٹ کریں', fa:'forskudsopgørelse خود را در skat.dk بررسی و به‌روز کنید' }, source:'skat.dk', urgent:false, chapter:4 },
        { id:'tl_social_hous',icon:'🏘️', text:{ en:'Join social housing (almen bolig) waitlist if planning long-term', fr:'Inscrivez-vous sur la liste d\'attente du logement social (almen bolig) si vous planifiez à long terme', ar:'انضم لقائمة انتظار الإسكان الاجتماعي (almen bolig) للمدى البعيد', es:'Únete a la lista de espera de vivienda social (almen bolig) si planeas a largo plazo', da:'Tilmeld dig ventelisten til almen bolig hvis du planlægger at blive her', de:'Warteliste für Sozialwohnungen (almen bolig) beitreten bei Langzeitplan', uk:'Запишіться до черги на соціальне житло (almen bolig) при довгострокових планах', pl:'Wpisz się na listę almen bolig przy długoterminowych planach', ur:'طویل مدتی منصوبے کے لیے سماجی رہائش (almen bolig) کی انتظاری فہرست میں شامل ہوں', fa:'اگر برنامه بلندمدت دارید در فهرست انتظار almen bolig ثبت‌نام کنید' }, source:'—', urgent:false, chapter:3 },
        { id:'tl_driving',    icon:'🚗', text:{ en:'Sort your driving licence conversion if applicable', fr:'Réglez la conversion de votre permis de conduire si nécessaire', ar:'أنهِ تحويل رخصة القيادة إذا كان منطبقاً عليك', es:'Gestiona la conversión de tu carnet de conducir si corresponde', da:'Sørg for konvertering af dit kørekort hvis det er relevant', de:'Führerscheinumschreibung erledigen falls erforderlich', uk:'За потреби оформіть обмін водійського посвідчення', pl:'Ureguluj wymianę prawa jazdy w razie potrzeby', ur:'اگر متعلقہ ہو تو ڈرائیونگ لائسنس کی تبدیلی ترتیب دیں', fa:'در صورت نیاز تبدیل گواهینامه رانندگی را انجام دهید' }, source:'borger.dk', urgent:false, chapter:2 },
        { id:'tl_atp',        icon:'🏛️', text:{ en:'Check your ATP pension balance at atp.dk', fr:'Vérifiez votre solde de pension ATP sur atp.dk', ar:'تحقق من رصيد معاشك ATP على atp.dk', es:'Comprueba tu saldo de pensión ATP en atp.dk', da:'Tjek din ATP-pensionsopsparing på atp.dk', de:'ATP-Pensionsbalance auf atp.dk prüfen', uk:'Перевірте баланс пенсії ATP на atp.dk', pl:'Sprawdź saldo emerytury ATP na atp.dk', ur:'atp.dk پر ATP پنشن بیلنس چیک کریں', fa:'موجودی بازنشستگی ATP را در atp.dk بررسی کنید' }, source:'atp.dk', urgent:false, chapter:4 },
      ]
    },
    year1: {
      label: { en:'Year 1 Complete — Well Done', fr:'An 1 terminé — Bravo', ar:'السنة الأولى مكتملة — أحسنت', es:'Año 1 completo — Bien hecho', da:'År 1 færdigt — Godt gået', de:'Jahr 1 abgeschlossen — Gut gemacht', uk:'1-й рік завершено — Молодець', pl:'Rok 1 ukończony — Brawo', ur:'سال 1 مکمل — شاباش', fa:'سال ۱ کامل شد — آفرین' },
      icon: '🎉',
      color: '#C60C30',
      desc: { en:'You\'ve made it through the first year. Check these milestones.', fr:'Vous avez traversé la première année. Vérifiez ces jalons.', ar:'لقد اجتزت السنة الأولى. تحقق من هذه الإنجازات.', es:'Has superado el primer año. Revisa estos hitos.', da:'Du er kommet igennem det første år. Tjek disse milepæle.', de:'Das erste Jahr geschafft. Diese Meilensteine prüfen.', uk:'Ви пройшли перший рік. Перевірте ці віхи.', pl:'Pierwszy rok za sobą. Sprawdź te kamienie milowe.', ur:'آپ نے پہلا سال مکمل کیا۔ یہ سنگ میل چیک کریں۔', fa:'از سال اول گذشتید. این نقاط عطف را بررسی کنید.' },
      tasks: [
        { id:'tl_aarsopg',   icon:'📋', text:{ en:'Check your årsopgørelse in March — claim your tax refund!', fr:'Vérifiez votre årsopgørelse en mars — réclamez votre remboursement d\'impôts !', ar:'تحقق من årsopgørelse في مارس — اطلب استرداد ضرائبك!', es:'Consulta tu årsopgørelse en marzo — ¡reclama tu devolución!', da:'Tjek din årsopgørelse i marts — kræv din skatterefusion!', de:'Årsopgørelse im März prüfen — Steuererstattung einfordern!', uk:'Перевірте årsopgørelse у березні — оформіть повернення податків!', pl:'Sprawdź årsopgørelse w marcu — odbierz zwrot podatku!', ur:'مارچ میں årsopgørelse چیک کریں — ٹیکس کی واپسی لیں!', fa:'در مارس årsopgørelse را بررسی کنید — بازپرداخت مالیات بگیرید!' }, source:'skat.dk', urgent:true, chapter:4 },
        { id:'tl_cpr_update',icon:'🔄', text:{ en:'Update your CPR address if you moved during the year', fr:'Mettez à jour votre adresse CPR si vous avez déménagé durant l\'année', ar:'حدّث عنوان CPR إذا انتقلت خلال العام', es:'Actualiza tu dirección CPR si te mudaste durante el año', da:'Opdater din CPR-adresse hvis du er flyttet i løbet af året', de:'CPR-Adresse aktualisieren falls Sie umgezogen sind', uk:'Оновіть адресу CPR якщо переїжджали протягом року', pl:'Zaktualizuj adres CPR jeśli przeprowadziłeś się w ciągu roku', ur:'اگر سال میں منتقل ہوئے تو CPR پتہ اپ ڈیٹ کریں', fa:'اگر در طول سال جابه‌جا شدید آدرس CPR را به‌روز کنید' }, source:'borger.dk', urgent:false, chapter:1 },
        { id:'tl_pd2',       icon:'📝', text:{ en:'Aim to pass PD2 Danish language test by end of year 1', fr:'Visez à réussir le test de langue danoise PD2 d\'ici la fin de l\'année 1', ar:'اسعَ لاجتياز اختبار اللغة الدنماركية PD2 بنهاية السنة الأولى', es:'Intenta aprobar el test de danés PD2 antes del final del año 1', da:'Sigt efter at bestå PD2 dansk sprogtest inden udgangen af år 1', de:'Ziel: PD2-Dänischtest bis Ende Jahr 1 bestehen', uk:'Намагайтесь скласти PD2 з датської до кінця 1-го року', pl:'Dąż do zdania PD2 do końca pierwszego roku', ur:'سال 1 کے اختتام تک PD2 امتحان پاس کرنے کا ہدف رکھیں', fa:'هدف داشته باشید تا پایان سال اول PD2 را قبول شوید' }, source:'—', urgent:false, chapter:11 },
        { id:'tl_network',   icon:'💼', text:{ en:'Attend at least one professional networking event in Denmark', fr:'Participez à au moins un événement de réseautage professionnel au Danemark', ar:'احضر فعالية تواصل مهني واحدة على الأقل في الدنمارك', es:'Asiste al menos a un evento de networking profesional en Dinamarca', da:'Deltag i mindst ét professionelt netværksarrangement i Danmark', de:'Mindestens eine Networking-Veranstaltung in Dänemark besuchen', uk:'Відвідайте хоча б один профнетворкінг-захід у Данії', pl:'Weź udział w co najmniej jednym wydarzeniu networkingowym w Danii', ur:'ڈنمارک میں کم از کم ایک پیشہ ورانہ نیٹ ورکنگ تقریب میں شرکت کریں', fa:'حداقل در یک رویداد شبکه‌سازی حرفه‌ای در دانمارک شرکت کنید' }, source:'—', urgent:false, chapter:8 },
        { id:'tl_perm_check',icon:'⏱️', text:{ en:'Review permanent residency requirements and progress', fr:'Évaluez les exigences de résidence permanente et vos progrès', ar:'راجع متطلبات الإقامة الدائمة وتقدمك', es:'Revisa los requisitos de residencia permanente y tu progreso', da:'Gennemgå kravene til permanent opholdstilladelse og dine fremskridt', de:'Anforderungen und Fortschritte für dauerhaften Aufenthalt prüfen', uk:'Перегляньте вимоги та прогрес щодо постійного проживання', pl:'Sprawdź wymagania i postępy w zakresie stałego pobytu', ur:'مستقل رہائش کی ضروریات اور پیش رفت کا جائزہ لیں', fa:'الزامات اقامت دائم و پیشرفت خود را بررسی کنید' }, source:'nyidanmark.dk', urgent:false, chapter:2 },
        { id:'tl_pension_rv',icon:'🏛️', text:{ en:'Review your pension contributions at pensionsinfo.dk', fr:'Vérifiez vos cotisations retraite sur pensionsinfo.dk', ar:'راجع مساهماتك التقاعدية على pensionsinfo.dk', es:'Revisa tus contribuciones de pensión en pensionsinfo.dk', da:'Gennemgå dine pensionsindbetalinger på pensionsinfo.dk', de:'Renteneinzahlungen auf pensionsinfo.dk überprüfen', uk:'Перегляньте пенсійні внески на pensionsinfo.dk', pl:'Sprawdź składki emerytalne na pensionsinfo.dk', ur:'pensionsinfo.dk پر پنشن کنٹریبیوشن کا جائزہ لیں', fa:'کمک‌های بازنشستگی را در pensionsinfo.dk بررسی کنید' }, source:'pensionsinfo.dk', urgent:false, chapter:4 },
        { id:'tl_celebrate', icon:'🎊', text:{ en:'You\'ve built a life in Denmark. That\'s remarkable.', fr:'Vous avez construit une vie au Danemark. C\'est remarquable.', ar:'لقد بنيت حياة في الدنمارك. ذلك أمر رائع.', es:'Has construido una vida en Dinamarca. Es extraordinario.', da:'Du har bygget et liv i Danmark. Det er bemærkelsesværdigt.', de:'Sie haben sich ein Leben in Dänemark aufgebaut. Bemerkenswert.', uk:'Ви побудували життя в Данії. Це чудово.', pl:'Zbudowałeś życie w Danii. To godne podziwu.', ur:'آپ نے ڈنمارک میں زندگی بنائی۔ یہ قابل تعریف ہے۔', fa:'شما در دانمارک زندگی ساختید. شگفت‌انگیز است.' }, source:'—', urgent:false, chapter:0 },
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

    const lang  = window.currentLang || 'en';
    const done  = data.tasks.filter(t => completedTasks[t.id]).length;
    const total = data.tasks.length;
    const pct   = Math.round((done / total) * 100);
    const phaseLabel  = data.label[lang]  || data.label.en;
    const phaseDesc   = data.desc[lang]   || data.desc.en;
    const urgentLabel = t_('tlUrgent', lang);

    el.innerHTML = `
      <div class="tl-phase-card">
        <div class="tl-phase-header" style="--phase-color:${data.color}">
          <div class="tl-phase-title">${data.icon} ${phaseLabel}</div>
          <div class="tl-phase-progress">
            <div class="tl-progress-bar"><div class="tl-progress-fill" style="width:${pct}%;background:${data.color}"></div></div>
            <span class="tl-progress-label">${t_('tlDone', lang, done, total)}</span>
          </div>
        </div>
        <p class="tl-phase-desc">${phaseDesc}</p>
        <ul class="tl-task-list">
          ${data.tasks.map(t => {
            const markDone = {en:'Mark done',fr:'Marquer comme fait',ar:'تحديد كمنجز',es:'Marcar como hecho',da:'Marker som færdig',de:'Als erledigt markieren',uk:'Позначити виконаним',pl:'Oznacz jako zrobione',ur:'مکمل کا نشان لگائیں',fa:'علامت‌گذاری انجام شد'}[lang] || 'Mark done';
            const openCh   = {en:'Open chapter',fr:'Ouvrir le chapitre',ar:'افتح الفصل',es:'Abrir capítulo',da:'Åbn kapitel',de:'Kapitel öffnen',uk:'Відкрити розділ',pl:'Otwórz rozdział',ur:'باب کھولیں',fa:'باز کردن فصل'}[lang] || 'Open chapter';
            return `
            <li class="tl-task ${completedTasks[t.id] ? 'done' : ''} ${t.urgent ? 'urgent' : ''}" data-id="${t.id}" data-chapter="${t.chapter}">
              <button class="tl-check-btn" aria-label="${markDone}" onclick="Timeline.toggle('${t.id}')">
                ${completedTasks[t.id] ? '✓' : ''}
              </button>
              <div class="tl-task-body">
                <span class="tl-task-icon">${t.icon}</span>
                <span class="tl-task-text">${t.text[lang] || t.text.en}</span>
                ${t.urgent ? `<span class="tl-urgent-badge">${urgentLabel}</span>` : ''}
              </div>
              <button class="tl-chapter-btn" onclick="openChapter(${t.chapter})" title="${openCh}" aria-label="${openCh}">→</button>
            </li>`;
          }).join('')}
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
    // Re-render when user switches language so task texts update immediately
    window.addEventListener('langChange', () => render(currentPhase));
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
  // Localize document.title on first paint. applyAll() translates the visible
  // UI + sets html[lang]/[dir] but does NOT touch <title>; updatePageTitle was
  // only called from setLang (manual switch) and chapter render. A crawler
  // hitting ?lang=pl renders Polish body text under the static English title —
  // hreflang + sitemap advertise 10 per-language URLs that all shared one
  // SERP title. This call derives the title from the active language at load.
  _try('pageTitle',    () => updatePageTitle());

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

  // Bjørn
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

  // ── URL hash deep-link / browser back & forward navigation ──
  // openChapter() now uses history.pushState so each chapter open
  // creates a real history entry. The handler below picks up:
  //   • direct deep-links on first load (#chapter-N in URL)
  //   • back / forward navigation between chapters (#chapter-N → #chapter-M)
  //   • back navigation from chapter to home (hash cleared → close view)
  const _openFromHash = (hash) => {
    const m = hash.match(/^#chapter-(\d+)$/);
    if (m) {
      const idx = parseInt(m[1], 10);
      const total = (window.CHAPTERS || []).length;
      if (idx >= 0 && idx < total) {
        window.openChapter(idx);
      } else if (total > 0) {
        // Out-of-range chapter (e.g. #chapter-99) — strip the bad hash
        // so the URL doesn't keep the bogus state, and show home. Was
        // silently failing: URL stayed at #chapter-99, page stuck.
        if (history.replaceState) {
          history.replaceState(null, '', location.pathname + location.search);
        }
        if (document.body.classList.contains('app-active')) {
          window.scrollToTop?.();
        }
      }
    } else if (document.body.classList.contains('app-active')) {
      // Hash cleared while a chapter was open → user pressed back to
      // home. Tear down the chapter view (clears app-active, restores
      // hero, releases scroll lock, etc.).
      window.scrollToTop?.();
    }
  };
  _openFromHash(location.hash);
  window.addEventListener('hashchange', () => _openFromHash(location.hash));
  // popstate fires for browser back/forward across pushState entries
  // even when the hash doesn't change (e.g. ?query swaps). Belt-and-
  // suspenders alongside hashchange.
  window.addEventListener('popstate', () => _openFromHash(location.hash));

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
