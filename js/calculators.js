/* ═══════════════════════════════════════════════════════
   ANKOMMER — Smart Calculators
   Salary · Cost of Living · Visa Tree · Residency
═══════════════════════════════════════════════════════ */

const Calculators = (() => {

  /* ── i18n helpers ───────────────────────────────────────
     Round 2A finding: every calculator string was English-only.
     Round-2 fix: minimal in-file table for the user-visible
     output strings, with English fallback. Languages match the
     app's 10 supported langs. Date formatting uses BCP-47 codes.
  ────────────────────────────────────────────────────────── */
  const CALC_I18N = {
    en: {
      enterSalary:'Enter a salary amount first', enterArrival:'Please select your arrival date',
      gross:'Gross salary', amBidrag:'AM-bidrag (8%)', incomeTax:'Income tax', topTax:'Top tax (15%)',
      netMonthly:'Net monthly pay', effRate:'Effective tax rate', netAnnual:'Net annual',
      payslipLink:'📖 Want to understand your payslip, pension and skattekort in detail?',
      readCh4:'Read Chapter 4 — Money & Banking →',
      copyResult:'📋 Copy result',
      median:'The Danish median gross salary is ~44,500 DKK/month.',
      medianAbove:'Your salary is above the Danish median gross salary (~44,500 DKK/month).',
      rentComfortable:'You can comfortably afford most Copenhagen apartments.',
      rentAvg:'You can afford average Copenhagen rents, though it will be a significant portion of your income.',
      rentTight:'Budget-conscious choices will be important. Consider Aarhus or Odense for more comfortable living costs.',
      euYes:'Yes — EU/EEA citizen', euNo:'No — Non-EU citizen',
      arrived:'Arrived in Denmark', fastTrack:'Fast-track permanent residency possible',
      citizenship:'Danish Citizenship eligible',
      planArrive:'📋 Planning ahead — you arrive in', roadmapFromDate:'. Here\'s your residency roadmap from that date.',
      beenIn:'You\'ve been in Denmark for', nextMilestone:' Next milestone in', allMilestones:'You\'ve reached all major milestones! 🎉',
      lessThanMonth:'less than a month', month:'month', months:'months', years:'years', yearsAfter:'After', yearsResidence:'years of residence',
      calNoDate:'Please enter your arrival date first.', calBadDate:'That date doesn\'t look valid. Please pick again.',
      calOutOfRange:'Please pick a date within the next 50 years.', calDone:'Calendar downloaded',
      calDownloadGuide:'Open ankommer.org in Safari or Chrome, then try saving the calendar again.',
      arrivalOutOfRange:'Please pick an arrival date within the last/next 50 years.',
      arrivalInvalid:'That date doesn\'t look valid. Please pick again.',
      apt_room:'Room / flatshare', apt_studio:'Studio', apt_1bed:'1-bedroom', apt_2bed:'2-bedroom', apt_3bed:'3+ bedroom',
      trans_bike:'🚲 Bike', trans_public:'🚌 Public transport', trans_car:'🚗 Car',
      food_budget:'🥦 Budget cooking', food_normal:'🍳 Home cooking', food_mixed:'🍝 Mix: home + dining', food_dine:'🍽️ Mostly restaurants',
      subs_minimal:'📱 Internet & phone', subs_normal:'🎬 + Streaming', subs_active:'🏋️ + Gym', subs_full:'🎧 All subscriptions',
      col_groceries:'🛒 Groceries', col_dining:'🍽️ Dining out', col_utilities:'⚡ Utilities (est.)',
      col_total:'Estimated monthly total', col_rates_live:'Live rates', col_rates_approx:'Approx.',
      col_ctx_salary:'At median {city} salary, this budget leaves roughly {amount} for savings ({pct}% of take-home).',
      col_ctx_tight:'At median {city} salary, this budget leaves very little — tight.',
      col_rent:'Rent',
      col_tip_car:'💡 Switching to public transport could save ~4,400 kr/month.',
      col_tip_city:'💡 Moving to Aarhus cuts rent by ~25% with similar job opportunities.',
      col_tip_food:'💡 Cooking at home 4× more per week could save ~5,000 kr/month.',
    },
    fr: { enterSalary:'Entrez d\'abord un salaire', enterArrival:'Veuillez choisir votre date d\'arrivée', gross:'Salaire brut', amBidrag:'AM-bidrag (8 %)', incomeTax:'Impôt sur le revenu', topTax:'Top tax (15 %)', netMonthly:'Salaire net mensuel', effRate:'Taux d\'imposition effectif', netAnnual:'Net annuel', payslipLink:'📖 Comprendre votre fiche de paie, pension et skattekort en détail ?', readCh4:'Lire le chapitre 4 — Argent et banques →', copyResult:'📋 Copier le résultat', median:'Le salaire brut médian danois est d\'environ 44 500 DKK/mois.', medianAbove:'Votre salaire est au-dessus du brut médian danois (~44 500 DKK/mois).', rentComfortable:'Vous pouvez vous offrir confortablement la plupart des appartements à Copenhague.', rentAvg:'Vous pouvez vous offrir des loyers moyens à Copenhague, mais cela représentera une part importante du revenu.', rentTight:'Des choix économiques seront importants. Envisagez Aarhus ou Odense.', euYes:'Oui — Citoyen UE/EEE', euNo:'Non — Hors UE', arrived:'Arrivée au Danemark', fastTrack:'Résidence permanente accélérée possible', citizenship:'Citoyenneté danoise éligible', planArrive:'📋 Anticipation — vous arrivez dans', roadmapFromDate:'. Voici votre feuille de route à partir de cette date.', beenIn:'Vous êtes au Danemark depuis', nextMilestone:' Prochaine étape dans', allMilestones:'Vous avez atteint toutes les étapes majeures ! 🎉', lessThanMonth:'moins d\'un mois', month:'mois', months:'mois', years:'ans', yearsAfter:'Après', yearsResidence:'ans de résidence', calNoDate:'Veuillez d\'abord entrer votre date d\'arrivée.', calBadDate:'Cette date semble invalide. Réessayez.', calOutOfRange:'Choisissez une date dans les 50 prochaines années.', calDone:'Calendrier téléchargé', arrivalOutOfRange:'Choisissez une date d\'arrivée dans les ±50 ans.', arrivalInvalid:'Cette date semble invalide.',
      apt_room:'Chambre / colocation', apt_studio:'Studio', apt_1bed:'1 chambre', apt_2bed:'2 chambres', apt_3bed:'3+ chambres',
      trans_bike:'🚲 Vélo', trans_public:'🚌 Transport en commun', trans_car:'🚗 Voiture',
      food_budget:'🥦 Cuisine économique', food_normal:'🍳 Cuisine maison', food_mixed:'🍝 Mix: maison + resto', food_dine:'🍽️ Surtout restaurants',
      subs_minimal:'📱 Internet & téléphone', subs_normal:'🎬 + Streaming', subs_active:'🏋️ + Salle de sport', subs_full:'🎧 Tout inclus',
      col_groceries:'🛒 Courses alimentaires', col_dining:'🍽️ Restaurants', col_utilities:'⚡ Charges (est.)',
      col_total:'Total mensuel estimé', col_rates_live:'Cours en direct', col_rates_approx:'Approx.',
      col_ctx_salary:'Au salaire médian de {city}, ce budget laisse environ {amount} d\'épargne ({pct}% du net).',
      col_ctx_tight:'Au salaire médian de {city}, ce budget laisse très peu — serré.',
      col_rent:'Loyer',
      col_tip_car:'💡 Passer aux transports en commun pourrait économiser ~4 400 kr/mois.',
      col_tip_city:'💡 Déménager à Aarhus réduit le loyer d\'environ 25% avec des opportunités similaires.',
      col_tip_food:'💡 Cuisiner 4 fois de plus par semaine pourrait économiser ~5 000 kr/mois.' },
    ar: { enterSalary:'أدخل قيمة الراتب أولاً', enterArrival:'يرجى اختيار تاريخ وصولك', gross:'الراتب الإجمالي', amBidrag:'مساهمة سوق العمل (8٪)', incomeTax:'ضريبة الدخل', topTax:'الضريبة العليا (15٪)', netMonthly:'صافي الراتب الشهري', effRate:'المعدل الضريبي الفعلي', netAnnual:'الصافي السنوي', payslipLink:'📖 هل تريد فهم قسيمة الراتب والمعاش والـ skattekort بالتفصيل؟', readCh4:'اقرأ الفصل 4 — المال والمصارف ←', copyResult:'📋 نسخ النتيجة', median:'متوسط الراتب الإجمالي الدنماركي حوالي 44,500 كرونة شهرياً.', medianAbove:'راتبك أعلى من المتوسط الدنماركي (~44,500 كرونة).', rentComfortable:'يمكنك تحمل معظم شقق كوبنهاغن بشكل مريح.', rentAvg:'يمكنك تحمل متوسط الإيجارات في كوبنهاغن، لكنها ستمثل جزءاً كبيراً من دخلك.', rentTight:'الاختيارات الاقتصادية مهمة. فكّر في آرهوس أو أودنسه.', euYes:'نعم — مواطن الاتحاد الأوروبي/الإيكسا', euNo:'لا — من خارج الاتحاد الأوروبي', arrived:'الوصول إلى الدنمارك', fastTrack:'الإقامة الدائمة السريعة ممكنة', citizenship:'مؤهل للجنسية الدنماركية', planArrive:'📋 التخطيط مسبقاً — تصل خلال', roadmapFromDate:'. هذه خارطة طريق إقامتك من ذلك التاريخ.', beenIn:'أنت في الدنمارك منذ', nextMilestone:' الإنجاز التالي خلال', allMilestones:'لقد حققت جميع الإنجازات الكبرى! 🎉', lessThanMonth:'أقل من شهر', month:'شهر', months:'أشهر', years:'سنوات', yearsAfter:'بعد', yearsResidence:'سنوات من الإقامة', calNoDate:'يرجى إدخال تاريخ وصولك أولاً.', calBadDate:'يبدو هذا التاريخ غير صالح. يرجى الاختيار مرة أخرى.', calOutOfRange:'اختر تاريخاً ضمن الخمسين سنة القادمة.', calDone:'تم تنزيل التقويم', arrivalOutOfRange:'اختر تاريخ وصول ضمن ±50 سنة.', arrivalInvalid:'هذا التاريخ غير صالح.',
      apt_room:'غرفة / شقة مشتركة', apt_studio:'استوديو', apt_1bed:'غرفة نوم', apt_2bed:'غرفتا نوم', apt_3bed:'3+ غرف',
      trans_bike:'🚲 دراجة', trans_public:'🚌 مواصلات عامة', trans_car:'🚗 سيارة',
      food_budget:'🥦 طبخ اقتصادي', food_normal:'🍳 طبخ منزلي', food_mixed:'🍝 مزيج: منزل + مطاعم', food_dine:'🍽️ غالباً مطاعم',
      subs_minimal:'📱 إنترنت وهاتف', subs_normal:'🎬 + بث', subs_active:'🏋️ + نادٍ رياضي', subs_full:'🎧 جميع الاشتراكات',
      col_groceries:'🛒 بقالة', col_dining:'🍽️ مطاعم', col_utilities:'⚡ فواتير (تقديرية)',
      col_total:'الإجمالي الشهري المقدر', col_rates_live:'أسعار مباشرة', col_rates_approx:'تقريبي',
      col_ctx_salary:'بمتوسط راتب {city}، يترك هذا الميزانية نحو {amount} للادخار ({pct}% من الصافي).',
      col_ctx_tight:'بمتوسط راتب {city}، يترك هذا الميزانية القليل جداً — ضيق.',
      col_rent:'إيجار',
      col_tip_car:'💡 التحول إلى المواصلات العامة قد يوفر ~4,400 كرونة شهرياً.',
      col_tip_city:'💡 الانتقال إلى آرهوس يخفض الإيجار بنحو 25٪ مع فرص عمل مماثلة.',
      col_tip_food:'💡 الطبخ في المنزل 4 مرات أكثر أسبوعياً قد يوفر ~5,000 كرونة شهرياً.' },
    es: { enterSalary:'Introduce un salario primero', enterArrival:'Por favor selecciona tu fecha de llegada', gross:'Salario bruto', amBidrag:'AM-bidrag (8 %)', incomeTax:'Impuesto sobre la renta', topTax:'Top tax (15 %)', netMonthly:'Salario neto mensual', effRate:'Tipo impositivo efectivo', netAnnual:'Neto anual', payslipLink:'📖 ¿Quieres entender tu nómina, pensión y skattekort en detalle?', readCh4:'Leer capítulo 4 — Dinero y bancos →', copyResult:'📋 Copiar resultado', median:'El salario bruto medio danés es ~44.500 DKK/mes.', medianAbove:'Tu salario está por encima de la media danesa (~44.500 DKK/mes).', rentComfortable:'Puedes permitirte cómodamente la mayoría de pisos en Copenhague.', rentAvg:'Puedes permitirte alquileres medios en Copenhague, pero ocuparán una parte significativa de tus ingresos.', rentTight:'Las decisiones económicas serán importantes. Considera Aarhus u Odense.', euYes:'Sí — Ciudadano UE/EEE', euNo:'No — Fuera de la UE', arrived:'Llegada a Dinamarca', fastTrack:'Residencia permanente acelerada posible', citizenship:'Elegible para la ciudadanía danesa', planArrive:'📋 Planificando — llegas en', roadmapFromDate:'. Aquí tienes tu hoja de ruta desde esa fecha.', beenIn:'Llevas en Dinamarca', nextMilestone:' Próximo hito en', allMilestones:'¡Has alcanzado todos los hitos importantes! 🎉', lessThanMonth:'menos de un mes', month:'mes', months:'meses', years:'años', yearsAfter:'Tras', yearsResidence:'años de residencia', calNoDate:'Por favor introduce tu fecha de llegada.', calBadDate:'Esa fecha no parece válida. Inténtalo de nuevo.', calOutOfRange:'Elige una fecha dentro de los próximos 50 años.', calDone:'Calendario descargado', arrivalOutOfRange:'Elige una fecha de llegada dentro de ±50 años.', arrivalInvalid:'Fecha no válida.',
      apt_room:'Habitación / piso compartido', apt_studio:'Estudio', apt_1bed:'1 habitación', apt_2bed:'2 habitaciones', apt_3bed:'3+ habitaciones',
      trans_bike:'🚲 Bicicleta', trans_public:'🚌 Transporte público', trans_car:'🚗 Coche',
      food_budget:'🥦 Cocina económica', food_normal:'🍳 Cocina casera', food_mixed:'🍝 Mix: casa + restaurantes', food_dine:'🍽️ Sobre todo restaurantes',
      subs_minimal:'📱 Internet y teléfono', subs_normal:'🎬 + Streaming', subs_active:'🏋️ + Gimnasio', subs_full:'🎧 Todo incluido',
      col_groceries:'🛒 Alimentación', col_dining:'🍽️ Restaurantes', col_utilities:'⚡ Suministros (est.)',
      col_total:'Total mensual estimado', col_rates_live:'Cotización en vivo', col_rates_approx:'Aprox.',
      col_ctx_salary:'Con el salario medio de {city}, este presupuesto deja aproximadamente {amount} para ahorro ({pct}% del neto).',
      col_ctx_tight:'Con el salario medio de {city}, este presupuesto deja muy poco — ajustado.',
      col_rent:'Alquiler',
      col_tip_car:'💡 Cambiar a transporte público podría ahorrar ~4.400 kr/mes.',
      col_tip_city:'💡 Mudarse a Aarhus reduce el alquiler ~25% con oportunidades similares.',
      col_tip_food:'💡 Cocinar en casa 4 veces más por semana podría ahorrar ~5.000 kr/mes.' },
    da: { enterSalary:'Indtast først en lønbeløb', enterArrival:'Vælg din ankomstdato', gross:'Bruttoløn', amBidrag:'AM-bidrag (8 %)', incomeTax:'Indkomstskat', topTax:'Topskat (15 %)', netMonthly:'Nettoløn pr. måned', effRate:'Effektiv skatteprocent', netAnnual:'Netto årligt', payslipLink:'📖 Vil du forstå din lønseddel, pension og skattekort i detaljer?', readCh4:'Læs kapitel 4 — Penge & bank →', copyResult:'📋 Kopiér resultat', median:'Median bruttoløn i Danmark er ~44.500 DKK/md.', medianAbove:'Din løn er over den danske median (~44.500 DKK/md).', rentComfortable:'Du kan komfortabelt betale de fleste lejligheder i København.', rentAvg:'Du kan betale gennemsnitlig husleje i København, men det fylder meget i budgettet.', rentTight:'Budgetbevidste valg er vigtige. Overvej Aarhus eller Odense.', euYes:'Ja — EU/EØS-borger', euNo:'Nej — ikke-EU', arrived:'Ankommet til Danmark', fastTrack:'Hurtig permanent opholdstilladelse mulig', citizenship:'Berettiget til dansk statsborgerskab', planArrive:'📋 Planlægning — du ankommer om', roadmapFromDate:'. Her er din opholdsplan fra den dato.', beenIn:'Du har været i Danmark i', nextMilestone:' Næste milepæl om', allMilestones:'Du har nået alle store milepæle! 🎉', lessThanMonth:'mindre end en måned', month:'måned', months:'måneder', years:'år', yearsAfter:'Efter', yearsResidence:'års ophold', calNoDate:'Indtast din ankomstdato først.', calBadDate:'Denne dato ser ikke gyldig ud.', calOutOfRange:'Vælg en dato inden for de næste 50 år.', calDone:'Kalender hentet', arrivalOutOfRange:'Vælg en dato inden for ±50 år.', arrivalInvalid:'Dato ikke gyldig.',
      apt_room:'Værelse / bofællesskab', apt_studio:'Studiebolig', apt_1bed:'1 værelse', apt_2bed:'2 værelser', apt_3bed:'3+ værelser',
      trans_bike:'🚲 Cykel', trans_public:'🚌 Offentlig transport', trans_car:'🚗 Bil',
      food_budget:'🥦 Billig hjemmemad', food_normal:'🍳 Hjemmemad', food_mixed:'🍝 Mix: hjem + restaurant', food_dine:'🍽️ Mest restaurant',
      subs_minimal:'📱 Internet & telefon', subs_normal:'🎬 + Streaming', subs_active:'🏋️ + Fitnesscenter', subs_full:'🎧 Alt inkluderet',
      col_groceries:'🛒 Dagligvarer', col_dining:'🍽️ Restaurant', col_utilities:'⚡ Forsyninger (est.)',
      col_total:'Estimeret månedlig total', col_rates_live:'Live kurser', col_rates_approx:'Ca.',
      col_ctx_salary:'Baseret på medianløn i {city} efterlader dette budget ca. {amount} til opsparing ({pct}% af nettolønnen).',
      col_ctx_tight:'Baseret på medianløn i {city} efterlader dette budget meget lidt — stramt.',
      col_rent:'Husleje',
      col_tip_car:'💡 Skift til offentlig transport og spar ~4.400 kr/md.',
      col_tip_city:'💡 Flytning til Aarhus sænker huslejen ~25% med lignende jobmuligheder.',
      col_tip_food:'💡 Madlav 4 gange mere om ugen og spar ~5.000 kr/md.' },
    de: { enterSalary:'Geben Sie zuerst ein Gehalt ein', enterArrival:'Bitte wählen Sie Ihr Ankunftsdatum', gross:'Bruttogehalt', amBidrag:'AM-bidrag (8 %)', incomeTax:'Einkommensteuer', topTax:'Topskat (15 %)', netMonthly:'Netto pro Monat', effRate:'Effektiver Steuersatz', netAnnual:'Netto jährlich', payslipLink:'📖 Möchten Sie Lohnzettel, Rente und skattekort verstehen?', readCh4:'Kapitel 4 lesen — Geld & Banken →', copyResult:'📋 Ergebnis kopieren', median:'Das dänische Bruttomedian-Gehalt liegt bei ~44.500 DKK/Monat.', medianAbove:'Ihr Gehalt liegt über dem dänischen Median (~44.500 DKK/Monat).', rentComfortable:'Sie können sich die meisten Wohnungen in Kopenhagen problemlos leisten.', rentAvg:'Sie können durchschnittliche Mieten in Kopenhagen tragen, sie machen aber einen großen Teil aus.', rentTight:'Sparsame Entscheidungen sind wichtig. Aarhus oder Odense erwägen.', euYes:'Ja — EU/EWR-Bürger', euNo:'Nein — Nicht-EU', arrived:'Ankunft in Dänemark', fastTrack:'Beschleunigte Daueraufenthaltserlaubnis möglich', citizenship:'Berechtigt für dänische Staatsbürgerschaft', planArrive:'📋 Planung — Sie kommen in', roadmapFromDate:'. Hier ist Ihre Aufenthaltskarte ab diesem Datum.', beenIn:'Sie sind in Dänemark seit', nextMilestone:' Nächster Meilenstein in', allMilestones:'Sie haben alle Hauptmeilensteine erreicht! 🎉', lessThanMonth:'weniger als einem Monat', month:'Monat', months:'Monaten', years:'Jahren', yearsAfter:'Nach', yearsResidence:'Jahren Aufenthalt', calNoDate:'Bitte zuerst Ankunftsdatum eingeben.', calBadDate:'Datum scheint ungültig.', calOutOfRange:'Wählen Sie ein Datum in den nächsten 50 Jahren.', calDone:'Kalender heruntergeladen', arrivalOutOfRange:'Datum innerhalb ±50 Jahre.', arrivalInvalid:'Datum nicht gültig.',
      apt_room:'Zimmer / WG', apt_studio:'Einzimmerwohnung', apt_1bed:'1-Zimmer', apt_2bed:'2-Zimmer', apt_3bed:'3+ Zimmer',
      trans_bike:'🚲 Fahrrad', trans_public:'🚌 Öffentlicher Nahverkehr', trans_car:'🚗 Auto',
      food_budget:'🥦 Günstiges Kochen', food_normal:'🍳 Heimkochen', food_mixed:'🍝 Mix: Zuhause + Restaurant', food_dine:'🍽️ Hauptsächlich Restaurants',
      subs_minimal:'📱 Internet & Telefon', subs_normal:'🎬 + Streaming', subs_active:'🏋️ + Fitnessstudio', subs_full:'🎧 Alles inklusive',
      col_groceries:'🛒 Lebensmittel', col_dining:'🍽️ Restaurant', col_utilities:'⚡ Nebenkosten (ca.)',
      col_total:'Geschätztes Monatsbudget', col_rates_live:'Live-Kurse', col_rates_approx:'Ca.',
      col_ctx_salary:'Beim Mediangehalt in {city} verbleiben ca. {amount} zum Sparen ({pct}% des Nettogehalts).',
      col_ctx_tight:'Beim Mediangehalt in {city} bleibt sehr wenig — knapp.',
      col_rent:'Miete',
      col_tip_car:'💡 Wechsel zu öffentlichen Verkehrsmitteln spart ~4.400 kr/Monat.',
      col_tip_city:'💡 Umzug nach Aarhus senkt die Miete ~25% bei ähnlichen Jobchancen.',
      col_tip_food:'💡 Viermal mehr zu Hause kochen spart ~5.000 kr/Monat.' },
    uk: { enterSalary:'Спочатку введіть зарплату', enterArrival:'Будь ласка, оберіть дату прибуття', gross:'Брутто-зарплата', amBidrag:'AM-bidrag (8 %)', incomeTax:'Податок на дохід', topTax:'Topskat (15 %)', netMonthly:'Чиста зарплата/міс.', effRate:'Ефективна ставка', netAnnual:'Чиста на рік', payslipLink:'📖 Хочете розібратися з розрахунковим листом і skattekort?', readCh4:'Читати розділ 4 — Гроші та банки →', copyResult:'📋 Копіювати результат', median:'Медіанна брутто-зарплата в Данії ~44 500 DKK/міс.', medianAbove:'Ваша зарплата вища за медіану (~44 500 DKK/міс).', rentComfortable:'Ви комфортно можете дозволити собі більшість квартир у Копенгагені.', rentAvg:'Середні орендні плати в Копенгагені посядуть значну частку доходу.', rentTight:'Економний вибір буде важливим. Розгляньте Орхус або Оденсе.', euYes:'Так — громадянин ЄС/ЄЕЗ', euNo:'Ні — не з ЄС', arrived:'Прибуття до Данії', fastTrack:'Прискорене постійне проживання можливе', citizenship:'Право на громадянство Данії', planArrive:'📋 Планування — ви прибуваєте через', roadmapFromDate:'. Ось ваша дорожня карта проживання від цієї дати.', beenIn:'Ви у Данії вже', nextMilestone:' Наступний рубіж через', allMilestones:'Ви досягли всіх ключових рубежів! 🎉', lessThanMonth:'менше місяця', month:'місяць', months:'місяців', years:'років', yearsAfter:'Після', yearsResidence:'років проживання', calNoDate:'Спочатку введіть дату прибуття.', calBadDate:'Дата виглядає некоректно.', calOutOfRange:'Оберіть дату протягом наступних 50 років.', calDone:'Календар завантажено', arrivalOutOfRange:'Оберіть дату ±50 років.', arrivalInvalid:'Дата некоректна.',
      apt_room:'Кімната / спільне житло', apt_studio:'Студія', apt_1bed:'1 кімната', apt_2bed:'2 кімнати', apt_3bed:'3+ кімнати',
      trans_bike:'🚲 Велосипед', trans_public:'🚌 Громадський транспорт', trans_car:'🚗 Авто',
      food_budget:'🥦 Економна їжа', food_normal:'🍳 Домашня їжа', food_mixed:'🍝 Мікс: дома + ресторан', food_dine:'🍽️ Переважно ресторани',
      subs_minimal:'📱 Інтернет і телефон', subs_normal:'🎬 + Стрімінг', subs_active:'🏋️ + Спортзал', subs_full:'🎧 Все включено',
      col_groceries:'🛒 Продукти', col_dining:'🍽️ Ресторани', col_utilities:'⚡ Комунальні (ор.)',
      col_total:'Орієнтовний місячний підсумок', col_rates_live:'Живий курс', col_rates_approx:'Прибл.',
      col_ctx_salary:'При медіанній зарплаті в {city}, бюджет залишає ~{amount} на заощадження ({pct}% з чистого).',
      col_ctx_tight:'При медіанній зарплаті в {city}, бюджет залишає дуже мало — тісно.',
      col_rent:'Оренда',
      col_tip_car:'💡 Перехід на громадський транспорт заощадить ~4 400 kr/міс.',
      col_tip_city:'💡 Переїзд до Орхуса знижує оренду ~25% з аналогічними вакансіями.',
      col_tip_food:'💡 Готувати вдома 4 рази більше на тиждень заощадить ~5 000 kr/міс.' },
    pl: { enterSalary:'Wpisz najpierw kwotę wynagrodzenia', enterArrival:'Wybierz datę przyjazdu', gross:'Wynagrodzenie brutto', amBidrag:'AM-bidrag (8 %)', incomeTax:'Podatek dochodowy', topTax:'Topskat (15 %)', netMonthly:'Netto miesięcznie', effRate:'Efektywna stopa podatku', netAnnual:'Netto rocznie', payslipLink:'📖 Chcesz zrozumieć pasek wypłaty, emeryturę i skattekort?', readCh4:'Przeczytaj rozdział 4 — Pieniądze i banki →', copyResult:'📋 Kopiuj wynik', median:'Mediana wynagrodzenia brutto w Danii to ~44 500 DKK/mies.', medianAbove:'Twoje wynagrodzenie jest powyżej duńskiej mediany (~44 500 DKK/mies).', rentComfortable:'Możesz wygodnie pozwolić sobie na większość mieszkań w Kopenhadze.', rentAvg:'Czynsze średnie w Kopenhadze pochłoną znaczną część dochodu.', rentTight:'Ważne będą oszczędne wybory. Rozważ Aarhus lub Odense.', euYes:'Tak — obywatel UE/EOG', euNo:'Nie — spoza UE', arrived:'Przyjazd do Danii', fastTrack:'Możliwy szybki pobyt stały', citizenship:'Możliwość duńskiego obywatelstwa', planArrive:'📋 Planowanie — przyjeżdżasz za', roadmapFromDate:'. Oto Twoja mapa pobytu od tej daty.', beenIn:'Jesteś w Danii od', nextMilestone:' Kolejny kamień milowy za', allMilestones:'Osiągnąłeś wszystkie główne kamienie milowe! 🎉', lessThanMonth:'mniej niż miesiąc', month:'miesiąc', months:'miesięcy', years:'lat', yearsAfter:'Po', yearsResidence:'latach pobytu', calNoDate:'Wpisz najpierw datę przyjazdu.', calBadDate:'Ta data wygląda niepoprawnie.', calOutOfRange:'Wybierz datę w ciągu najbliższych 50 lat.', calDone:'Kalendarz pobrany', arrivalOutOfRange:'Wybierz datę ±50 lat.', arrivalInvalid:'Data niepoprawna.',
      apt_room:'Pokój / współlokatorzy', apt_studio:'Kawalerka', apt_1bed:'1 pokój', apt_2bed:'2 pokoje', apt_3bed:'3+ pokoje',
      trans_bike:'🚲 Rower', trans_public:'🚌 Transport publiczny', trans_car:'🚗 Samochód',
      food_budget:'🥦 Tanie gotowanie', food_normal:'🍳 Domowe gotowanie', food_mixed:'🍝 Mix: dom + restauracje', food_dine:'🍽️ Głównie restauracje',
      subs_minimal:'📱 Internet i telefon', subs_normal:'🎬 + Streaming', subs_active:'🏋️ + Siłownia', subs_full:'🎧 Wszystko w pakiecie',
      col_groceries:'🛒 Zakupy spożywcze', col_dining:'🍽️ Restauracje', col_utilities:'⚡ Media (szac.)',
      col_total:'Szacowany miesięczny budżet', col_rates_live:'Kursy na żywo', col_rates_approx:'Approx.',
      col_ctx_salary:'Przy medianie wynagrodzenia w {city}, ten budżet pozostawia ok. {amount} na oszczędności ({pct}% netto).',
      col_ctx_tight:'Przy medianie wynagrodzenia w {city}, ten budżet pozostawia bardzo mało — napięty.',
      col_rent:'Czynsz',
      col_tip_car:'💡 Przesiadka na transport publiczny zaoszczędzi ~4 400 kr/mies.',
      col_tip_city:'💡 Przeprowadzka do Aarhus obniża czynsz ~25% przy podobnych szansach zawodowych.',
      col_tip_food:'💡 Gotowanie w domu 4 razy więcej na tydzień zaoszczędzi ~5 000 kr/mies.' },
    ur: { enterSalary:'پہلے تنخواہ درج کریں', enterArrival:'اپنی آمد کی تاریخ منتخب کریں', gross:'مجموعی تنخواہ', amBidrag:'AM-bidrag (8٪)', incomeTax:'انکم ٹیکس', topTax:'Topskat (15٪)', netMonthly:'ماہانہ خالص تنخواہ', effRate:'مؤثر ٹیکس کی شرح', netAnnual:'سالانہ خالص', payslipLink:'📖 اپنی پے سلپ، پنشن اور skattekort کو تفصیل سے سمجھنا چاہتے ہیں؟', readCh4:'باب 4 پڑھیں — پیسہ اور بینکنگ ←', copyResult:'📋 نتیجہ کاپی کریں', median:'ڈنمارک کی اوسط تنخواہ ~44,500 DKK/ماہ ہے۔', medianAbove:'آپ کی تنخواہ ڈنمارک کی اوسط سے زیادہ ہے (~44,500 DKK/ماہ)۔', rentComfortable:'آپ کوپن ہیگن کے زیادہ تر اپارٹمنٹس آرام سے برداشت کر سکتے ہیں۔', rentAvg:'کوپن ہیگن کے اوسط کرائے آپ کی آمدنی کا بڑا حصہ لیں گے۔', rentTight:'بجٹ پر دھیان دینا اہم ہے۔ Aarhus یا Odense پر غور کریں۔', euYes:'ہاں — EU/EEA شہری', euNo:'نہیں — غیر-EU', arrived:'ڈنمارک پہنچے', fastTrack:'تیز رفتار مستقل قیام ممکن', citizenship:'ڈینش شہریت کے اہل', planArrive:'📋 منصوبہ بندی — آپ پہنچتے ہیں', roadmapFromDate:'. اس تاریخ سے آپ کا قیام پلان یہ ہے۔', beenIn:'آپ ڈنمارک میں ہیں', nextMilestone:' اگلا سنگ میل', allMilestones:'آپ نے تمام بڑے سنگ میل حاصل کر لیے! 🎉', lessThanMonth:'ایک ماہ سے کم', month:'ماہ', months:'ماہ', years:'سال', yearsAfter:'بعد', yearsResidence:'سال کا قیام', calNoDate:'پہلے اپنی آمد کی تاریخ درج کریں۔', calBadDate:'یہ تاریخ درست نہیں لگتی۔', calOutOfRange:'اگلے 50 سال کے اندر تاریخ منتخب کریں۔', calDone:'کیلنڈر ڈاؤنلوڈ ہو گیا', arrivalOutOfRange:'±50 سال کی حد میں تاریخ۔', arrivalInvalid:'تاریخ درست نہیں۔',
      apt_room:'کمرہ / شیئرڈ فلیٹ', apt_studio:'اسٹوڈیو', apt_1bed:'1 بیڈروم', apt_2bed:'2 بیڈروم', apt_3bed:'3+ کمرے',
      trans_bike:'🚲 سائیکل', trans_public:'🚌 عوامی نقل و حمل', trans_car:'🚗 کار',
      food_budget:'🥦 سستا کھانا', food_normal:'🍳 گھریلو کھانا', food_mixed:'🍝 مکس: گھر + ریستوراں', food_dine:'🍽️ زیادہ تر ریستوراں',
      subs_minimal:'📱 انٹرنیٹ اور فون', subs_normal:'🎬 + اسٹریمنگ', subs_active:'🏋️ + جم', subs_full:'🎧 سب کچھ',
      col_groceries:'🛒 گروسری', col_dining:'🍽️ ریستوراں', col_utilities:'⚡ یوٹیلیٹیز (تخمینی)',
      col_total:'ماہانہ تخمینی کل', col_rates_live:'لائیو ریٹ', col_rates_approx:'تقریباً',
      col_ctx_salary:'{city} کی اوسط تنخواہ پر یہ بجٹ ~{amount} بچت کے لیے چھوڑتا ہے ({pct}% خالص سے)۔',
      col_ctx_tight:'{city} کی اوسط تنخواہ پر یہ بجٹ بہت کم چھوڑتا ہے — تنگ۔',
      col_rent:'کرایہ',
      col_tip_car:'💡 عوامی نقل و حمل پر جانا ~4,400 kr/ماہ بچا سکتا ہے۔',
      col_tip_city:'💡 Aarhus منتقلی کرائے میں ~25٪ کمی کر سکتی ہے۔',
      col_tip_food:'💡 ہر ہفتے 4 بار زیادہ گھر میں کھانا پکانا ~5,000 kr/ماہ بچا سکتا ہے۔' },
    fa: { enterSalary:'ابتدا مبلغ حقوق را وارد کنید', enterArrival:'لطفاً تاریخ ورود خود را انتخاب کنید', gross:'حقوق ناخالص', amBidrag:'AM-bidrag (۸٪)', incomeTax:'مالیات بر درآمد', topTax:'Topskat (۱۵٪)', netMonthly:'حقوق خالص ماهانه', effRate:'نرخ مؤثر مالیات', netAnnual:'خالص سالانه', payslipLink:'📖 می‌خواهید فیش حقوقی، بازنشستگی و skattekort را با جزئیات بفهمید؟', readCh4:'فصل ۴ را بخوانید — پول و بانک ←', copyResult:'📋 کپی نتیجه', median:'میانه حقوق ناخالص دانمارک حدود ۴۴,۵۰۰ کرون در ماه است.', medianAbove:'حقوق شما بالاتر از میانه دانمارک است (~۴۴,۵۰۰ کرون).', rentComfortable:'بیشتر آپارتمان‌های کپنهاگ را به‌راحتی می‌توانید تأمین کنید.', rentAvg:'اجاره‌های متوسط کپنهاگ بخش زیادی از درآمد را خواهد گرفت.', rentTight:'انتخاب‌های اقتصادی مهم است. Aarhus یا Odense را در نظر بگیرید.', euYes:'بله — شهروند EU/EEA', euNo:'خیر — خارج از EU', arrived:'ورود به دانمارک', fastTrack:'اقامت دائم سریع ممکن است', citizenship:'واجد شرایط شهروندی دانمارک', planArrive:'📋 برنامه‌ریزی — شما تا', roadmapFromDate:' وارد می‌شوید. این نقشه راه اقامت شماست.', beenIn:'شما در دانمارک هستید', nextMilestone:' نقطه عطف بعدی', allMilestones:'به همه نقاط عطف بزرگ رسیدید! 🎉', lessThanMonth:'کمتر از یک ماه', month:'ماه', months:'ماه', years:'سال', yearsAfter:'پس از', yearsResidence:'سال اقامت', calNoDate:'ابتدا تاریخ ورود را وارد کنید.', calBadDate:'این تاریخ معتبر نیست.', calOutOfRange:'تاریخی در ۵۰ سال آینده انتخاب کنید.', calDone:'تقویم دانلود شد', arrivalOutOfRange:'تاریخ در محدوده ±۵۰ سال.', arrivalInvalid:'تاریخ نامعتبر.',
      apt_room:'اتاق / خانه اشتراکی', apt_studio:'استودیو', apt_1bed:'۱ خوابه', apt_2bed:'۲ خوابه', apt_3bed:'۳+ خوابه',
      trans_bike:'🚲 دوچرخه', trans_public:'🚌 حمل‌ونقل عمومی', trans_car:'🚗 خودرو',
      food_budget:'🥦 آشپزی اقتصادی', food_normal:'🍳 آشپزی خانگی', food_mixed:'🍝 ترکیب: خانه + رستوران', food_dine:'🍽️ عمدتاً رستوران',
      subs_minimal:'📱 اینترنت و تلفن', subs_normal:'🎬 + استریمینگ', subs_active:'🏋️ + باشگاه', subs_full:'🎧 همه اشتراک‌ها',
      col_groceries:'🛒 خرید مواد غذایی', col_dining:'🍽️ رستوران', col_utilities:'⚡ قبوض (تخمینی)',
      col_total:'جمع تخمینی ماهانه', col_rates_live:'نرخ زنده', col_rates_approx:'تقریبی',
      col_ctx_salary:'با درآمد میانه {city}، این بودجه تقریباً {amount} برای پس‌انداز می‌گذارد ({pct}٪ از خالص).',
      col_ctx_tight:'با درآمد میانه {city}، این بودجه بسیار کم می‌گذارد — تنگ.',
      col_rent:'اجاره',
      col_tip_car:'💡 تغییر به حمل‌ونقل عمومی می‌تواند ~۴,۴۰۰ کرون در ماه صرفه‌جویی کند.',
      col_tip_city:'💡 اسباب‌کشی به Aarhus اجاره را ~۲۵٪ کاهش می‌دهد.',
      col_tip_food:'💡 چهار بار بیشتر در هفته آشپزی کردن می‌تواند ~۵,۰۰۰ کرون در ماه صرفه‌جویی کند.' },
  };
  const t = (key) => {
    const lang = (window.currentLang || document.documentElement.lang || 'en');
    return (CALC_I18N[lang] && CALC_I18N[lang][key]) || CALC_I18N.en[key] || key;
  };
  const DATE_LOCALE = { en:'en-GB', fr:'fr-FR', ar:'ar', es:'es-ES', da:'da-DK', de:'de-DE', uk:'uk-UA', pl:'pl-PL', ur:'ur', fa:'fa-IR' };
  const dateLocale = () => DATE_LOCALE[window.currentLang || 'en'] || 'en-GB';

  const LocalDownloadHelper = (() => {
    const IN_APP_UA = /FBAN|FBAV|Instagram|Messenger|LinkedInApp|TikTok|Twitter|Snapchat|Line\/|Pinterest|GSA/i;
    const defaultGuidance = 'Open ankommer.org in Safari or Chrome, then try saving again.';

    const isIOS = () => {
      const ua = navigator.userAgent || '';
      return /iPad|iPhone|iPod/i.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };

    const needsBrowserGuidance = () =>
      IN_APP_UA.test(navigator.userAgent || '') || isIOS();

    const revokeObjectURLLater = (url) => {
      let done = false;
      let timer = null;

      const cleanup = () => {
        if (done) return;
        done = true;
        URL.revokeObjectURL(url);
        window.removeEventListener('pagehide', cleanup);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (timer) clearTimeout(timer);
      };

      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') cleanup();
      };

      timer = setTimeout(cleanup, 60000);
      window.addEventListener('pagehide', cleanup, { once: true });
      document.addEventListener('visibilitychange', onVisibilityChange);
    };

    const download = async (blob, {
      filename,
      mimeType,
      title,
      text,
      guidanceMessage
    } = {}) => {
      const safeFilename = filename || 'download';
      const type = mimeType || blob.type || 'application/octet-stream';

      // Prefer Web Share only on touch devices; on a laptop keep the direct
      // download (a.download works there and a share sheet would be a regression).
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(max-width: 600px)').matches;
      if (isTouch && typeof File === 'function' && navigator.share && navigator.canShare) {
        const file = new File([blob], safeFilename, { type });
        let canShareFiles = false;
        try { canShareFiles = navigator.canShare({ files: [file] }); } catch (_) {}

        if (canShareFiles) {
          try {
            await navigator.share({
              files: [file],
              title: title || safeFilename,
              text: text || ''
            });
            return { ok: true, method: 'share' };
          } catch (err) {
            if (err?.name === 'AbortError') return { ok: false, reason: 'cancelled' };
            throw err;
          }
        }
      }

      if (needsBrowserGuidance()) {
        return {
          ok: false,
          reason: 'guidance',
          message: guidanceMessage || defaultGuidance
        };
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = safeFilename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      revokeObjectURLLater(url);
      return { ok: true, method: 'download' };
    };

    return { download };
  })();
  const downloadHelper = () => window.AnkommerDownloadHelper || LocalDownloadHelper;

  /* ══════════════════════════════════════════════════════
     1. SALARY CALCULATOR — Real Danish Tax Logic (2025 rates)
     ──────────────────────────────────────────────────────
     Source: Skattestyrelsen 2025 satser
     - AM-bidrag 8% (deducted first from gross)
     - Bundskat 12.01% (down from 12.06% in 2024)
     - Topskat 15% above 611,800 DKK/yr personal income (after AM)
     - Personfradrag 51,600 DKK/yr — applied as a TAX CREDIT against
       (bundskat + kommuneskat), NOT as a base deduction
     - Skatteloft (combined cap, excl AM/church): 52.07%
  ══════════════════════════════════════════════════════ */
  const calcSalary = (gross, kommuneSkatPct) => {
    const grossM = parseFloat(gross);
    if (!grossM || grossM <= 0) return null;

    // 1) AM-bidrag (labour-market contribution) comes off the top
    const amBidrag        = grossM * 0.08;
    const afterAM         = grossM - amBidrag;     // "personlig indkomst"

    // 2) Base tax = (bundskat + kommuneskat) × afterAM,
    //    minus the personfradrag tax credit at the same rate.
    //    Personfradrag is a CREDIT, not a base deduction — it doesn't
    //    reduce the topskat-eligible base.
    const bundskat        = 0.1201;                // 2025 bundskat rate
    const kommuneSkat     = parseFloat(kommuneSkatPct) / 100;
    const baseTaxRate     = bundskat + kommuneSkat;
    const personfradragM  = 51600 / 12;            // 2025 monthly personal allowance
    const personfradragCredit = personfradragM * baseTaxRate;
    const baseTaxGross    = afterAM * baseTaxRate;
    const baseTax         = Math.max(0, baseTaxGross - personfradragCredit);

    // 3) Topskat: 15% on the slice of afterAM above the 2025 threshold
    //    (611,800 DKK/yr ÷ 12 ≈ 50,983/mo). Topskat ignores personfradrag.
    const topTaxThreshold = 611800 / 12;
    const topTax          = Math.max(0, afterAM - topTaxThreshold) * 0.15;

    // 4) Skatteloft (tax ceiling) — combined marginal rate (excl. AM and
    //    church tax) is capped at 52.07% in 2025. If kommuneskat is high,
    //    cap topskat so total marginal stays <= 52.07%.
    const SKATTELOFT      = 0.5207;
    const marginalCap     = afterAM * SKATTELOFT;
    const cappedBaseTax   = Math.min(baseTax, marginalCap);
    const cappedTopTax    = Math.min(topTax, Math.max(0, marginalCap - cappedBaseTax));

    const totalTax        = amBidrag + cappedBaseTax + cappedTopTax;
    const netMonthly      = grossM - totalTax;

    // Annual
    const grossAnnual     = grossM * 12;
    const netAnnual       = netMonthly * 12;
    const effectiveRate   = (totalTax / grossM) * 100;

    return {
      gross:          Math.round(grossM),
      amBidrag:       Math.round(amBidrag),
      afterAM:        Math.round(afterAM),
      baseTax:        Math.round(cappedBaseTax),
      topTax:         Math.round(cappedTopTax),
      totalTax:       Math.round(totalTax),
      net:            Math.round(netMonthly),
      netAnnual:      Math.round(netAnnual),
      grossAnnual:    Math.round(grossAnnual),
      effectiveRate:  effectiveRate.toFixed(1),
    };
  };

  const formatDKK = (n) => {
    if (n >= 1000) return Math.round(n).toLocaleString('da-DK') + ' DKK';
    return Math.round(n) + ' DKK';
  };

  const drawDonut = (canvasId, net, totalTax, gross) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70, lineW = 18;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const netAngle  = (net / gross) * 2 * Math.PI;
    const taxAngle  = (totalTax / gross) * 2 * Math.PI;

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-strong').trim() || '#e0e0e0';
    ctx.stroke();

    // Tax segment (red)
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + taxAngle);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = '#C60C30';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Net segment (green)
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2 + taxAngle, -Math.PI / 2 + taxAngle + netAngle);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = '#6A9E6A';
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  // Cache last donut values so we can redraw on theme change
  // (Round 2A: donut canvas froze with stale colours after dark/light toggle).
  let lastDonut = null;

  const initSalaryCalc = () => {
    const btn = document.getElementById('salary-calc-btn');
    if (!btn) return;
    // Listen once for theme switches and redraw the donut if it's been drawn.
    if (!initSalaryCalc._themeWired) {
      initSalaryCalc._themeWired = true;
      window.addEventListener('themeChange', () => {
        if (lastDonut) drawDonut(lastDonut.id, lastDonut.net, lastDonut.tax, lastDonut.gross);
      });
    }

    btn.addEventListener('click', () => {
      const grossInput = document.getElementById('salary-input');
      const muniSelect = document.getElementById('salary-municipality');
      const resultDiv  = document.getElementById('salary-result');
      const breakdown  = document.getElementById('salary-breakdown');
      const contextDiv = document.getElementById('salary-context');
      const netVal     = document.getElementById('donut-net-val');

      if (!grossInput?.value) {
        window.App?.showToast(t('enterSalary'), 'warning');
        return;
      }

      const r = calcSalary(grossInput.value, muniSelect?.value || '25.10');   // 2025 national avg
      // Audit caught: invalid input ("abc", "-1000", "0") made calcSalary
      // return null and the handler returned silently — leaving the donut
      // at "—" with no feedback. Now we show the same enterSalary toast
      // so the user knows their input wasn't a positive number.
      if (!r) {
        window.App?.showToast(t('enterSalary'), 'warning');
        return;
      }

      // Draw donut + cache for theme redraw
      lastDonut = { id:'salary-donut', net:r.net, tax:r.totalTax, gross:r.gross };
      drawDonut('salary-donut', r.net, r.totalTax, r.gross);

      // Pre-seed the center to "0" so the animation starts cleanly. The
      // earlier code set the final value here AND then animated 0→final,
      // which made the donut flash the answer for one paint frame before
      // resetting to 0 to count up. Setting to 0 here matches what the
      // animation's first frame would render anyway.
      if (netVal) netVal.textContent = formatDKK(0);

      // Breakdown rows
      if (breakdown) {
        breakdown.innerHTML = `
          <div class="breakdown-row"><span class="breakdown-label">${t('gross')}</span><span class="breakdown-val">${formatDKK(r.gross)}</span></div>
          <div class="breakdown-row"><span class="breakdown-label">${t('amBidrag')}</span><span class="breakdown-val red">– ${formatDKK(r.amBidrag)}</span></div>
          <div class="breakdown-row"><span class="breakdown-label">${t('incomeTax')}</span><span class="breakdown-val red">– ${formatDKK(r.baseTax)}</span></div>
          ${r.topTax > 0 ? `<div class="breakdown-row"><span class="breakdown-label">${t('topTax')}</span><span class="breakdown-val red">– ${formatDKK(r.topTax)}</span></div>` : ''}
          <div class="breakdown-row" style="border-top:2px solid var(--border-strong);padding-top:8px;margin-top:4px"><span class="breakdown-label" style="font-weight:700;color:var(--text)">${t('netMonthly')}</span><span class="breakdown-val green" style="font-size:1rem">${formatDKK(r.net)}</span></div>
          <div class="breakdown-row"><span class="breakdown-label" style="color:var(--text-faint)">${t('effRate')}</span><span class="breakdown-val" style="color:var(--text-faint)">${r.effectiveRate}%</span></div>
          <div class="breakdown-row"><span class="breakdown-label" style="color:var(--text-faint)">${t('netAnnual')}</span><span class="breakdown-val" style="color:var(--text-faint)">${formatDKK(r.netAnnual)}</span></div>
        `;
      }

      // Context message
      if (contextDiv) {
        const medianSalary = 44500; // DKK/month gross (approx 2025 median)
        const comparison = r.gross > medianSalary ? t('medianAbove') : t('median');
        const rentContext = r.net >= 12000 ? t('rentComfortable') : r.net >= 9000 ? t('rentAvg') : t('rentTight');
        contextDiv.innerHTML = `💡 ${comparison} ${rentContext}`;
      }

      resultDiv.classList.remove('hidden');

      // Animate the net value
      animateCounter(netVal, 0, r.net, 1000, (v) => formatDKK(v));

      // Chapter link
      const existingLink = resultDiv.querySelector('.tool-chapter-link');
      if (!existingLink) {
        const link = document.createElement('div');
        link.className = 'tool-chapter-link';
        link.innerHTML = `${t('payslipLink')} <button class="tool-chapter-btn" onclick="openChapter(4)">${t('readCh4')}</button>`;
        resultDiv.appendChild(link);
      }

      // Copy button
      if (!resultDiv.querySelector('.tool-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'tool-copy-btn';
        copyBtn.textContent = t('copyResult');
        copyBtn.onclick = () => window.copyToolResult?.('salary-result');
        resultDiv.appendChild(copyBtn);
      }
    });
  };

  const animateCounter = (el, from, to, duration, formatter) => {
    if (!el) return;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.round(from + (to - from) * ease);
      el.textContent = formatter ? formatter(val) : val.toLocaleString();
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  /* ══════════════════════════════════════════════════════
     2. MONTHLY BUDGET ESTIMATOR
  ══════════════════════════════════════════════════════ */

  // Base costs for Copenhagen — other cities use a multiplier
  const CITY_MULTIPLIER = { cph: 1.0, aar: 0.84, ode: 0.76, aal: 0.73 };
  // Localised city names so the salary-context sentence reads naturally in
  // every supported language (otherwise non-English users see Latin city
  // names interpolated into otherwise-translated copy).
  const CITY_LABELS_I18N = {
    en: { cph: 'Copenhagen',  aar: 'Aarhus', ode: 'Odense',  aal: 'Aalborg'  },
    fr: { cph: 'Copenhague',  aar: 'Aarhus', ode: 'Odense',  aal: 'Aalborg'  },
    ar: { cph: 'كوبنهاغن',     aar: 'آرهوس',  ode: 'أودنسه',   aal: 'ألبورغ'    },
    es: { cph: 'Copenhague',  aar: 'Aarhus', ode: 'Odense',  aal: 'Aalborg'  },
    da: { cph: 'København',   aar: 'Aarhus', ode: 'Odense',  aal: 'Aalborg'  },
    de: { cph: 'Kopenhagen',  aar: 'Aarhus', ode: 'Odense',  aal: 'Aalborg'  },
    uk: { cph: 'Копенгаген',  aar: 'Орхус',  ode: 'Оденсе',   aal: 'Ольборг'  },
    pl: { cph: 'Kopenhaga',   aar: 'Aarhus', ode: 'Odense',  aal: 'Aalborg'  },
    ur: { cph: 'کوپن ہیگن',    aar: 'آرہوس',  ode: 'اوڈنسے',    aal: 'آلبورگ'   },
    fa: { cph: 'کپنهاگ',       aar: 'آرهوس',  ode: 'اودنسه',   aal: 'آلبورگ'   },
  };
  const cityLabel = (key) => {
    const lang = window.currentLang || 'en';
    return (CITY_LABELS_I18N[lang] || CITY_LABELS_I18N.en)[key]
        || CITY_LABELS_I18N.en[key];
  };

  const APT_COSTS = { // CPH base rent
    room:   4500,
    studio: 8000,
    '1bed': 11000,
    '2bed': 15500,
    '3bed': 22000,
  };
  const APT_LABELS = {
    room: 'Room / flatshare', studio: 'Studio', '1bed': '1-bedroom',
    '2bed': '2-bedroom', '3bed': '3+ bedroom'
  };

  const TRANSPORT_COSTS = { // CPH base
    bike:   200,
    public: 430,
    car:    4800,
  };
  const TRANSPORT_LABELS = {
    bike: '🚲 Bike', public: '🚌 Public transport', car: '🚗 Car'
  };

  const FOOD_COSTS = { // CPH base (groceries only)
    budget: 2100,
    normal: 3000,
    mixed:  3000, // groceries portion; dining added separately
    dine:   1200, // minimal groceries — mostly dining out
  };
  const DINING_OUT_COSTS = {
    budget: 0,
    normal: 400,   // occasional
    mixed:  2400,  // ~8 meals out/mo @ avg 300 kr
    dine:   7500,  // mostly restaurants
  };
  const FOOD_LABELS = {
    budget: '🥦 Budget cooking', normal: '🍳 Home cooking',
    mixed:  '🍝 Mix: home + dining', dine: '🍽️ Mostly restaurants'
  };

  const SUBS_COSTS = { // same across cities
    minimal: 500,   // phone + internet
    normal:  900,   // + Netflix/HBO
    active:  1350,  // + gym
    full:    1750,  // + gym + Spotify + extra
  };
  const SUBS_LABELS = {
    minimal: '📱 Internet & phone',
    normal:  '🎬 + Streaming',
    active:  '🏋️ + Gym',
    full:    '🎧 All subscriptions'
  };

  // Realistic 2025 monthly utilities for a single person in DK:
  // electricity ~600, district heat ~700, water ~150, internet ~250 ≈ 1700.
  // Old default of 700 understated the total budget by ~1000 DKK/mo.
  const FIXED_EXTRAS = 1700;

  const initCostOfLiving = () => {
    let selectedCity = 'cph';

    // City tab switching
    document.querySelectorAll('.col-city-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.col-city-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCity = btn.dataset.city;
      });
    });

    const calcBtn = document.getElementById('col-calc-btn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
      const mult = CITY_MULTIPLIER[selectedCity];
      const city = cityLabel(selectedCity);

      const aptKey   = document.getElementById('col-apt')?.value || '1bed';
      const transKey = document.getElementById('col-transport')?.value || 'public';
      const foodKey  = document.getElementById('col-food')?.value || 'normal';
      const subsKey  = document.getElementById('col-subs')?.value || 'normal';

      // Calculate each item (apply city multiplier to location-sensitive costs)
      const rent      = Math.round(APT_COSTS[aptKey] * mult);
      const transport = transKey === 'car'
        ? Math.round(TRANSPORT_COSTS.car * mult)   // car costs scale with city
        : Math.round(TRANSPORT_COSTS[transKey]);   // bike/transit: fixed or local rate
      const groceries = Math.round(FOOD_COSTS[foodKey] * mult);
      const dining    = Math.round(DINING_OUT_COSTS[foodKey] * mult);
      const subs      = SUBS_COSTS[subsKey];
      const utilities = Math.round(FIXED_EXTRAS * mult);

      const items = [
        { label: `🏠 ${t('col_rent')} (${t('apt_' + aptKey)})`,  amount: rent,      key: 'rent' },
        { label: t('col_groceries'),                             amount: groceries, key: 'groceries' },
        ...(dining > 0 ? [{ label: t('col_dining'),             amount: dining,    key: 'dining' }] : []),
        { label: t('trans_' + transKey),                         amount: transport, key: 'transport' },
        { label: t('subs_' + subsKey),                           amount: subs,      key: 'subs' },
        { label: t('col_utilities'),                             amount: utilities, key: 'utilities' },
      ];

      const total = items.reduce((s, i) => s + i.amount, 0);

      // Render breakdown bars
      const breakdownEl = document.getElementById('col-breakdown');
      const totalBarEl  = document.getElementById('col-total-bar');
      const contextEl   = document.getElementById('col-context');
      const resultEl    = document.getElementById('col-result');

      if (!breakdownEl) return;

      breakdownEl.innerHTML = items.map(item => {
        const pct = Math.round((item.amount / total) * 100);
        return `
          <div class="col-item">
            <div class="col-item-header">
              <span class="col-item-label">${item.label}</span>
              <span class="col-item-amount">${item.amount.toLocaleString()} kr</span>
            </div>
            <div class="col-item-bar">
              <div class="col-item-fill col-fill-${item.key}" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join('');

      if (totalBarEl) {
        // Use live rates if available, fallback to fixed
        const rates = window.liveRates || { EUR: 0.1342, USD: 0.1448, GBP: 0.1148 };
        const eurAmt = Math.round(total * rates.EUR).toLocaleString();
        const usdAmt = Math.round(total * rates.USD).toLocaleString();
        const gbpAmt = Math.round(total * rates.GBP).toLocaleString();
        const rateLabel = window.liveRates ? t('col_rates_live') : t('col_rates_approx');

        totalBarEl.innerHTML = `
          <div class="col-total-row">
            <span>${t('col_total')}</span>
            <span class="col-total-amount">${total.toLocaleString()} <small>kr/mo</small></span>
          </div>
          <div class="col-total-note" id="col-total-note">
            <span class="rate-label">${rateLabel}:</span>
            <span>€${eurAmt}</span><span class="rate-dot">·</span>
            <span>$${usdAmt}</span><span class="rate-dot">·</span>
            <span>£${gbpAmt}</span>
          </div>
        `;
        // Fire event so apis.js can update with fresh rates
        window.dispatchEvent(new CustomEvent('budgetCalculated', { detail: { total } }));
      }

      if (contextEl) {
        // Median salary context
        const medianNet = selectedCity === 'cph' ? 32000 : 28000;
        const diff = medianNet - total;
        const pctLeft = Math.round((diff / medianNet) * 100);
        let tip = '';
        if (transKey === 'car') tip = t('col_tip_car');
        else if (aptKey === '1bed' && selectedCity === 'cph') tip = t('col_tip_city');
        else if (foodKey === 'dine') tip = t('col_tip_food');

        const salaryStr = diff > 0
          ? t('col_ctx_salary').replace('{city}', city).replace('{amount}', diff.toLocaleString() + ' kr').replace('{pct}', pctLeft)
          : t('col_ctx_tight').replace('{city}', city);

        contextEl.innerHTML = `
          <p class="col-ctx-salary">${salaryStr}</p>
          ${tip ? `<p class="col-ctx-tip">${tip}</p>` : ''}
        `;
      }

      resultEl?.classList.remove('hidden');
    });
  };

  /* ══════════════════════════════════════════════════════
     3. VISA DECISION TREE
  ══════════════════════════════════════════════════════ */
  // Pull a translatable field from a VISA_TREE node — every visible
  // string is now a {en, fr, ar, …} map. Falls back to English if the
  // active language lacks an entry. Plain strings are returned as-is so
  // links/values that aren't user-visible still work.
  const vt = (field) => {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    const lang = window.currentLang || 'en';
    return field[lang] || field.en || '';
  };
  // Inline translations for VISA fallback labels — small enough to keep
  // here rather than mint dedicated CALC_I18N keys.
  const VISA_LBL = {
    learn_more: { en:'Learn more →', fr:'En savoir plus →', ar:'اعرف المزيد ←', es:'Más información →', da:'Læs mere →',
                  de:'Mehr erfahren →', uk:'Дізнатися більше →', pl:'Dowiedz się więcej →', ur:'مزید جانیں ←', fa:'بیشتر بدانید ←' },
    start_over: { en:'Start over', fr:'Recommencer', ar:'البدء من جديد', es:'Empezar de nuevo', da:'Start forfra',
                  de:'Neu beginnen', uk:'Почати спочатку', pl:'Zacznij od nowa', ur:'دوبارہ شروع کریں', fa:'شروع دوباره' },
  };
  const vtl = (k) => VISA_LBL[k]?.[window.currentLang || 'en'] || VISA_LBL[k]?.en || k;

  const renderVisaNode = (node, container) => {
    container.innerHTML = '';

    if (node.result) {
      container.innerHTML = `
        <div class="visa-result">
          <h4>✅ ${vt(node.title)}</h4>
          <p>${vt(node.description)}</p>
          ${node.link ? `<a href="${node.link}" target="_blank" rel="noopener">${vt(node.linkText) || vtl('learn_more')}</a>` : ''}
        </div>
        <button type="button" class="visa-reset" id="visa-reset">${(['ar','ur','fa'].includes(window.currentLang||'en')) ? '→' : '←'} ${vtl('start_over')}</button>
      `;
      document.getElementById('visa-reset')?.addEventListener('click', () => initVisaTree());
      return;
    }

    const div = document.createElement('div');
    div.className = 'visa-node';

    const q = document.createElement('p');
    q.className = 'visa-question';
    q.textContent = vt(node.question);
    div.appendChild(q);

    const opts = document.createElement('div');
    opts.className = 'visa-options';

    if (node.options) {
      node.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'visa-opt-btn';
        btn.textContent = vt(opt.label);
        btn.addEventListener('click', () => {
          if (opt.result !== undefined) {
            renderVisaNode(opt, container);
          } else if (opt.next) {
            renderVisaNode(opt.next, container);
          }
        });
        opts.appendChild(btn);
      });
    }

    // Yes/No options (binary)
    if (node.yes && node.no) {
      [t('euYes'), t('euNo')].forEach((label, i) => {
        const btn = document.createElement('button');
        btn.className = 'visa-opt-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => renderVisaNode(i === 0 ? node.yes : node.no, container));
        opts.appendChild(btn);
      });
    }

    div.appendChild(opts);
    container.appendChild(div);
  };

  const initVisaTree = () => {
    const body = document.getElementById('visa-tree-body');
    if (!body) return;
    renderVisaNode(VISA_TREE, body);
  };

  // Re-render the Visa Decision Tree when the user switches language so
  // its question + option labels track the active locale instead of
  // staying stuck in whatever language was active at first paint. The
  // residency calculator and other tools already reset themselves via
  // their input handlers, so they don't need a langChange listener.
  window.addEventListener('langChange', () => {
    const body = document.getElementById('visa-tree-body');
    if (body) initVisaTree();
  });

  /* ══════════════════════════════════════════════════════
     4. RESIDENCY TIMELINE CALCULATOR
  ══════════════════════════════════════════════════════ */
  const RESIDENCY_RULES = {
    eu:               { permRes: 5,  citizenship: 9,  permLabel:'EU Permanent Residence', euNote:'EU/EEA citizens get a registration certificate, then permanent residence after 5 years.' },
    work_permit:      { permRes: 8,  citizenship: 9,  fastTrack: 4, permLabel:'Permanent Residence Permit' },
    student_visa:     { permRes: 8,  citizenship: 9,  permLabel:'Permanent Residence Permit', note:'Student years count towards residency if you transition to a work permit after.' },
    family_reunification: { permRes: 8, citizenship: 9, permLabel:'Permanent Residence Permit' },
    refugee:          { permRes: 8,  citizenship: 9,  permLabel:'Permanent Residence Permit', note:'Refugees and §7 protection holders follow the standard 8-year path under post-2015 rules. Some narrower fast-track exceptions may apply — check with your kommune or a refugee-aid org.' },
  };

  // Leap-year safe: arrival 2020-02-29 + 5 years should produce 2025-02-28,
  // not 2025-03-01 (which native setFullYear rolls over to).
  const addYears = (date, years) => {
    const d = new Date(date);
    const targetMonth = d.getMonth();
    d.setFullYear(d.getFullYear() + years);
    if (d.getMonth() !== targetMonth) d.setDate(0); // last day of prev month
    return d;
  };

  const initResidencyCalc = () => {
    const btn = document.getElementById('res-calc-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const dateInput   = document.getElementById('res-arrival-date');
      const permitSel   = document.getElementById('res-permit-type');
      const resultDiv   = document.getElementById('res-result');

      if (!dateInput?.value) {
        window.App?.showToast(t('enterArrival'), 'warning');
        return;
      }

      // Parse YYYY-MM-DD as local-midnight (not UTC), so users in negative-UTC
      // timezones don't see their arrival shift to the previous calendar day.
      const arrival  = new Date(dateInput.value + 'T00:00:00');
      // Round 2B fix: residency calc had no sanity bounds (deadline-calendar did).
      // Reject obviously bad input so we don't render "1024 years in Denmark".
      if (isNaN(arrival.getTime())) {
        window.App?.showToast(t('arrivalInvalid'), 'warning');
        return;
      }
      const nowGuard = new Date();
      const fiftyYearsMs = 50 * 365 * 24 * 60 * 60 * 1000;
      if (Math.abs(arrival - nowGuard) > fiftyYearsMs) {
        window.App?.showToast(t('arrivalOutOfRange'), 'warning');
        return;
      }
      const now      = new Date();
      const permit   = permitSel?.value || 'work_permit';
      const rules    = RESIDENCY_RULES[permit] || RESIDENCY_RULES.work_permit;
      const yearsHere = (now - arrival) / (1000 * 60 * 60 * 24 * 365.25);

      const permResDate   = addYears(arrival, rules.permRes);
      const citizenDate   = addYears(arrival, rules.citizenship);
      const fastTrackDate = rules.fastTrack ? addYears(arrival, rules.fastTrack) : null;

      const milestones = [
        {
          label: t('arrived'),
          date: arrival,
          reached: true,
          icon: '✈️'
        },
        ...(fastTrackDate ? [{
          label: t('fastTrack'),
          date: fastTrackDate,
          reached: now >= fastTrackDate,
          icon: '⚡',
          note: 'Requires meeting all 4 supplementary requirements (Danish language at PD2/B1, 3.5 years employment, active citizenship test, and income threshold)'
        }] : []),
        {
          label: rules.permLabel,
          date: permResDate,
          reached: now >= permResDate,
          icon: '🏠',
          note: `${t('yearsAfter')} ${rules.permRes} ${t('yearsResidence')}`
        },
        {
          label: t('citizenship'),
          date: citizenDate,
          reached: now >= citizenDate,
          icon: '🇩🇰',
          note: `Requires Prøve i Dansk 3 (≈B2), citizenship test, self-sufficiency, and 9 years' continuous residence`
        }
      ];

      // Handle planners (future arrival): show "you arrive in N months"
      // instead of "you've been in Denmark for -3 years" which was confusing.
      // The arrival milestone's `reached` flag still uses the real date check
      // so the timeline below renders correctly either way.
      const isFutureArrival = arrival > now;
      const monthsUntilArrival = Math.round((arrival - now) / (1000 * 60 * 60 * 24 * 30.44));
      let intro;
      if (isFutureArrival) {
        // Update the first milestone for accuracy when planning
        if (milestones[0]) milestones[0].reached = false;
        const arrivalIn = monthsUntilArrival < 1
          ? t('lessThanMonth')
          : monthsUntilArrival < 12
            ? `${monthsUntilArrival} ${monthsUntilArrival === 1 ? t('month') : t('months')}`
            : `${(monthsUntilArrival / 12).toFixed(1)} ${t('years')}`;
        intro = `${t('planArrive')} <strong>${arrivalIn}</strong>${t('roadmapFromDate')}`;
      } else {
        const yearsDisplay = yearsHere < 1
          ? `${Math.round(yearsHere * 12)} ${t('months')}`
          : `${yearsHere.toFixed(1)} ${t('years')}`;
        intro = `${t('beenIn')} <strong>${yearsDisplay}</strong>.`;
      }

      const nextMilestone = milestones.find(m => !m.reached);
      const yearsToNext   = nextMilestone
        ? Math.max(0, (nextMilestone.date - now) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1)
        : null;

      resultDiv.innerHTML = `
        <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:12px">
          ${intro}
          ${nextMilestone ? `${t('nextMilestone')} <strong>${yearsToNext} ${t('years')}</strong> (${nextMilestone.date.toLocaleDateString(dateLocale(), {month:'long', year:'numeric'})}).` : t('allMilestones')}
        </div>
        ${rules.note ? `<div style="font-size:0.8rem;color:var(--amber);margin-bottom:12px;padding:8px 12px;background:rgba(232,160,32,0.1);border-radius:8px">ℹ️ ${rules.note}</div>` : ''}
        <div class="res-timeline">
          ${milestones.map(m => `
            <div class="res-milestone">
              <div class="res-dot ${m.reached ? 'reached' : (m === nextMilestone ? 'next' : '')}">${m.reached ? '✓' : (m === nextMilestone ? '→' : m.icon)}</div>
              <div class="res-text">
                <strong>${m.label}</strong>
                <span>${m.date.toLocaleDateString(dateLocale(), {day:'numeric', month:'long', year:'numeric'})}${m.note ? ' · ' + m.note : ''}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener" style="font-size:0.8rem;color:var(--nordic-blue);margin-top:12px;display:inline-block">→ Official permanent residency requirements</a>
      `;

      resultDiv.classList.remove('hidden');

      // Copy button for residency timeline
      if (!resultDiv.querySelector('.tool-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'tool-copy-btn';
        copyBtn.textContent = t('copyResult');
        copyBtn.onclick = () => window.copyToolResult?.('res-result');
        resultDiv.appendChild(copyBtn);
      }
    });
  };

  /* ══════════════════════════════════════════════════════
     5. DENMARK DEADLINE CALENDAR — .ics generator (RFC 5545)
     ──────────────────────────────────────────────────────
     Takes the user's arrival date and produces a downloadable
     .ics file that imports into Apple / Google / Outlook
     calendars with all key Danish deadlines as reminders.
     Pure JS, no library. ~50 lines.
  ══════════════════════════════════════════════════════ */
  const padICS = (n) => String(n).padStart(2, '0');

  // Format a Date as YYYYMMDD (ICS DATE value, not DATE-TIME — we use
  // all-day events so timezones don't bite us)
  const icsDate = (d) =>
    `${d.getFullYear()}${padICS(d.getMonth() + 1)}${padICS(d.getDate())}`;

  // ICS spec: text fields must be folded at 75 octets; commas, semicolons,
  // backslashes, and newlines must be escaped. Keep it simple — we own
  // the source strings so we just escape the chars.
  const icsEscape = (s) => String(s)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');

  // Add days to a date safely (handles month boundaries, DST)
  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  /**
   * Build an .ics file body from TIMELINE_EVENTS anchored to arrivalDate.
   * Events are all-day. Urgent ones get a 24-hour-prior alarm; others
   * get a 7-day-prior alarm so the user has time to act.
   */
  const buildICS = (arrivalDate, lang = 'en') => {
    const events = (typeof TIMELINE_EVENTS !== 'undefined') ? TIMELINE_EVENTS : [];
    const now = new Date();
    const stamp = `${icsDate(now)}T${padICS(now.getHours())}${padICS(now.getMinutes())}${padICS(now.getSeconds())}Z`;
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ANKOMMER//Denmark Deadline Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Denmark Deadlines',
      'X-WR-CALDESC:Your personal Denmark relocation timeline from ANKOMMER'
    ];

    // Round 2B fix: annual SKAT events were anchored as arrival+constant-days,
    // which is only correct for early-Jan arrivals. forskudsopgørelse publishes
    // every November; årsopgørelse every March. Snap to the next real Nov 1 /
    // Mar 11 after the user's arrival so dates land in the right calendar year.
    const nextAnnual = (afterDate, month /* 0-11 */, day) => {
      const d = new Date(afterDate.getFullYear(), month, day);
      if (d <= afterDate) d.setFullYear(d.getFullYear() + 1);
      return d;
    };

    events.forEach(ev => {
      let start;
      if (ev.id === 'forskuds-yearly')      start = nextAnnual(arrivalDate, 10, 1);  // Nov 1
      else if (ev.id === 'aarsopgoerelse')  start = nextAnnual(arrivalDate,  2, 11); // Mar 11
      else                                   start = addDays(arrivalDate, ev.offsetDays);
      const end   = addDays(start, ev.durationDays || 1);   // DTEND is exclusive in all-day form
      const summary = ev.summary[lang] || ev.summary.en;
      const description = (ev.description || '') +
        ' — More in ANKOMMER chapter ' + (ev.chapter ?? '');
      const alarmLead = ev.urgent ? '-PT24H' : '-P7D';
      lines.push(
        'BEGIN:VEVENT',
        `UID:${ev.id}-${icsDate(start)}@ankommer.github.io`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${icsDate(start)}`,
        `DTEND;VALUE=DATE:${icsDate(end)}`,
        `SUMMARY:${icsEscape(summary)}`,
        `DESCRIPTION:${icsEscape(description)}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `TRIGGER:${alarmLead}`,
        `DESCRIPTION:${icsEscape(summary)}`,
        'END:VALARM',
        'END:VEVENT'
      );
    });
    lines.push('END:VCALENDAR');
    // RFC 5545 requires CRLF line endings
    return lines.join('\r\n');
  };

  const initDeadlineCalendar = () => {
    const btn = document.getElementById('cal-download-btn');
    if (!btn) return;

    // Show feedback inline next to the button — never silently fail
    const showCalMsg = (msg, kind = 'error') => {
      const wrap = btn.parentElement;
      let msgEl = wrap.querySelector('.cal-inline-msg');
      if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.className = 'cal-inline-msg';
        msgEl.style.cssText = 'margin-top:10px;padding:10px 12px;border-radius:8px;font-size:0.85rem;';
        btn.insertAdjacentElement('afterend', msgEl);
      }
      msgEl.style.background = kind === 'error' ? 'rgba(198,12,48,0.1)' : 'rgba(46,109,164,0.1)';
      msgEl.style.color      = kind === 'error' ? 'var(--brand-red)'    : 'var(--nordic-blue)';
      msgEl.textContent = msg;
      setTimeout(() => msgEl.remove(), 4000);
    };

    btn.addEventListener('click', async () => {
      const dateInput = document.getElementById('cal-arrival-date');
      const v = dateInput?.value;
      if (!v) {
        showCalMsg(t('calNoDate'));
        dateInput?.focus();
        return;
      }
      const arrival = new Date(v + 'T00:00:00');
      if (isNaN(arrival.getTime())) {
        showCalMsg(t('calBadDate'));
        dateInput?.focus();
        return;
      }
      // Sane bounds — within ~50 years of now
      const now = new Date();
      const fiftyYearsMs = 50 * 365 * 24 * 60 * 60 * 1000;
      if (Math.abs(arrival - now) > fiftyYearsMs) {
        showCalMsg(t('calOutOfRange'));
        dateInput?.focus();
        return;
      }
      const lang = window.currentLang || 'en';
      const ics = buildICS(arrival, lang);
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const filename = `denmark-deadlines-${icsDate(arrival)}.ics`;
      let result;
      try {
        result = await downloadHelper().download(blob, {
          filename,
          mimeType: 'text/calendar;charset=utf-8',
          title: 'ANKOMMER Denmark Deadline Calendar',
          text: 'Save these Denmark deadline reminders.',
          guidanceMessage: t('calDownloadGuide')
        });
      } catch (err) {
        console.warn('Calendar download failed:', err);
        showCalMsg(err.message || t('calDownloadGuide'));
        return;
      }
      if (!result?.ok) {
        if (result?.reason === 'guidance') showCalMsg(result.message, 'info');
        return;
      }
      // Visible confirmation
      const orig = btn.textContent;
      btn.textContent = '✓ ' + t('calDone');
      setTimeout(() => { btn.textContent = orig; }, 2500);
    });
  };

  /* ══════════════════════════════════════════════════════
     INIT ALL
  ══════════════════════════════════════════════════════ */
  const init = () => {
    initSalaryCalc();
    initCostOfLiving();
    initVisaTree();
    initResidencyCalc();
    initDeadlineCalendar();
  };

  return { init, buildICS };
})();
