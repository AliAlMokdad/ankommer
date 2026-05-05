/* ── CHAPTERS DATA ─────────────────────────────────── */
const CHAPTERS = [
  {
    id: 0, icon: "✈️",
    color: "#2E6DA4",
    title: { en:"Before You Land", fr:"Avant d'Atterrir", ar:"قبل وصولك", es:"Antes de Llegar", da:"Før du Lander" },
    subtitle: { en:"The Countdown", fr:"Le Compte à Rebours", ar:"العد التنازلي", es:"La Cuenta Regresiva", da:"Nedtællingen" },
    intro: { en:"Everything you should do before your flight touches down. Starting right now gets you weeks ahead.", fr:"Tout ce que vous devriez faire avant que votre avion atterrisse.", ar:"كل ما يجب عليك فعله قبل أن تصل طائرتك. البداية الآن تضعك أسابيع أمام الآخرين.", es:"Todo lo que deberías hacer antes de que aterrice tu avión.", da:"Alt hvad du bør gøre, inden dit fly lander. At starte nu sætter dig uger foran." },
    readTime: "12 min",
    sections: [
      {
        icon: "🛂",
        title: { en:"Which Visa Do You Actually Need?", fr:"Quel Visa Avez-Vous Réellement Besoin ?", ar:"أي تأشيرة تحتاج فعلاً؟", es:"¿Qué Visa Necesitas Realmente?", da:"Hvilket visum har du faktisk brug for?" },
        content: { en:`<p><strong>EU/EEA/Nordic citizens:</strong> You do not need a visa or work permit. You have the right to live and work in Denmark freely. <strong>Two separate registrations apply:</strong> (1) Your <strong>folkeregister address</strong> must be registered <strong>within 5 days of moving</strong> (CPR Act §12 — this is a fineable offence if you miss it). (2) Your <strong>EU residence document</strong> from SIRI must be obtained if you intend to stay more than 3 months.</p>
<p><strong>Non-EU citizens</strong> need one of these:</p>
<ul>
  <li><strong>Work permit</strong> — requires a job offer from a Danish employer. Most common types: Positive List (for high-demand professions), Pay Limit Scheme (if salary &gt; DKK 514,000/year in 2025, rising to DKK 552,000 in 2026), Fast-track Scheme (for certified companies).</li>
  <li><strong>Student visa</strong> — if enrolled at a Danish university or educational institution. Apply at newtodenmark.dk at least 2 months before.</li>
  <li><strong>Family reunification</strong> — to join a Danish citizen or permanent resident. Requirements are strict: the Danish sponsor must meet income and housing requirements.</li>
  <li><strong>Startup Denmark visa</strong> — for entrepreneurs with an approved business plan.</li>
</ul>
<p class="callout-warning">Apply as early as possible. Non-EU processing times range from 1–4 months. Do not book a one-way ticket until the permit is approved.</p>
<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Apply at newtodenmark.dk (official)</a>`,
          da:`<p><strong>EU/EØS/Nordiske statsborgere:</strong> Du behøver ikke visum eller arbejdstilladelse. Du har ret til frit at bo og arbejde i Danmark. <strong>To separate registreringer gælder:</strong> (1) Din <strong>folkeregisteradresse</strong> skal registreres <strong>inden for 5 dage efter flytning</strong> (CPR-loven §12 — dette er en bødepligtig overtrædelse, hvis du glemmer det). (2) Dit <strong>EU-opholdsbevis</strong> fra SIRI skal indhentes, hvis du agter at blive mere end 3 måneder.</p>
<p><strong>Ikke-EU-borgere</strong> har brug for én af disse:</p>
<ul>
  <li><strong>Arbejdstilladelse</strong> — kræver et jobtilbud fra en dansk arbejdsgiver. Hyppigste typer: Positivlisten (for efterspurgte erhverv), Beløbsordningen (løn &gt; 514.000 DKK/år i 2025, stiger til 552.000 DKK i 2026), Hurtigvejen (for certificerede virksomheder).</li>
  <li><strong>Studievisum</strong> — hvis du er indskrevet på et dansk universitet. Ansøg på nyidanmark.dk mindst 2 måneder i forvejen.</li>
  <li><strong>Familiesammenføring</strong> — for at slutte dig til en dansk statsborger eller fastboende. Kravene er strenge: den danske sponsor skal opfylde indkomst- og boligkrav.</li>
  <li><strong>Startup Denmark-visum</strong> — for iværksættere med en godkendt forretningsplan.</li>
</ul>
<p class="callout-warning">Ansøg så tidligt som muligt. Sagsbehandlingstider for ikke-EU-borgere er 1–4 måneder. Book ikke en enkeltbillet, før tilladelsen er godkendt.</p>
<a href="https://www.nyidanmark.dk/da-DK" target="_blank" rel="noopener">→ Ansøg på nyidanmark.dk (officiel)</a>` }
      },
      {
        icon: "📁",
        title: { en:"The Document Folder — Build It Now", fr:"Le Dossier de Documents — Préparez-le Maintenant", ar:"مجلد الوثائق - ابنِه الآن", es:"La Carpeta de Documentos — Prepárala Ahora", da:"Dokumentmappen — Byg den nu" },
        content: { en:`<p>Bring these physical originals AND certified copies of each:</p>
<ul>
  <li>✅ Valid passport (+ 2 photocopies of the main page)</li>
  <li>✅ Birth certificate (apostilled if non-EU)</li>
  <li>✅ Marriage certificate if applicable (apostilled)</li>
  <li>✅ Children's birth certificates</li>
  <li>✅ Educational diplomas / degree certificates</li>
  <li>✅ Employment contract or university enrollment letter</li>
  <li>✅ 2 passport-size photos</li>
  <li>✅ Proof of accommodation (signed lease or letter from host)</li>
  <li>✅ Health insurance documentation (for the gap before your yellow card)</li>
</ul>
<p><strong>Apostille</strong> = an official stamp that makes foreign documents legally recognised internationally. Get it from your home country's designated authority before you leave.</p>`,
          da:`<p>Medbring disse fysiske originaler OG bekræftede kopier af hvert dokument:</p>
<ul>
  <li>✅ Gyldigt pas (+ 2 fotokopier af hovedsiden)</li>
  <li>✅ Fødselsattest (apostille hvis ikke-EU)</li>
  <li>✅ Vielsesattest hvis relevant (apostille)</li>
  <li>✅ Børns fødselsattester</li>
  <li>✅ Uddannelsesbeviser / eksamensattester</li>
  <li>✅ Ansættelseskontrakt eller universitetsindskrivningsbrev</li>
  <li>✅ 2 pasfotografier</li>
  <li>✅ Dokumentation for bolig (underskrevet lejekontrakt eller brev fra vært)</li>
  <li>✅ Sundhedsforsikringsdokumentation (til perioden inden dit gule sygesikringskort)</li>
</ul>
<p><strong>Apostille</strong> = et officielt stempel, der gør udenlandske dokumenter juridisk anerkendt internationalt. Få det fra din hjemlands udpegede myndighed, inden du rejser.</p>` }
      },
      {
        icon: "🏠",
        title: { en:"Finding Housing Before You Arrive", fr:"Trouver un Logement Avant d'Arriver", ar:"إيجاد السكن قبل وصولك", es:"Encontrar Vivienda Antes de Llegar", da:"Finde bolig inden ankomst" },
        content: { en:`<p>The Danish rental market is competitive — especially Copenhagen. Starting your search before you land gives you a critical advantage.</p>
<p><strong>Best platforms:</strong></p>
<ul>
  <li><a href="https://www.boligportal.dk" target="_blank" rel="noopener">BoligPortal.dk</a> — largest private rental platform</li>
  <li><a href="https://www.lejebolig.dk" target="_blank" rel="noopener">Lejebolig.dk</a> — good selection, English-friendly</li>
  <li>Facebook groups: "Housing in Copenhagen for Expats", "Aarhus Housing International"</li>
  <li><a href="https://www.dba.dk" target="_blank" rel="noopener">DBA.dk</a> — used goods + private rentals</li>
</ul>
<p><strong>Red flags in listings:</strong></p>
<ul>
  <li>🚩 Landlord is abroad and can't meet in person</li>
  <li>🚩 Price significantly below market (Copenhagen 1-bed avg: 8,500–12,000 DKK)</li>
  <li>🚩 Asks for payment before signing a lease</li>
  <li>🚩 No photos, or photos stolen from real estate sites</li>
</ul>
<p class="callout-warning">Deposit in Denmark is capped at 3 months' rent by law. Anyone asking for more is breaking the law.</p>`,
          da:`<p>Det danske lejeboligmarked er konkurrencepræget — særligt i København. At starte din søgning inden du lander giver dig en afgørende fordel.</p>
<p><strong>Bedste platforme:</strong></p>
<ul>
  <li><a href="https://www.boligportal.dk" target="_blank" rel="noopener">BoligPortal.dk</a> — Danmarks største private lejeboligplatform</li>
  <li><a href="https://www.lejebolig.dk" target="_blank" rel="noopener">Lejebolig.dk</a> — godt udvalg, engelsk-venlig</li>
  <li>Facebook-grupper: "Housing in Copenhagen for Expats", "Aarhus Housing International"</li>
  <li><a href="https://www.dba.dk" target="_blank" rel="noopener">DBA.dk</a> — brugte varer + private udlejninger</li>
</ul>
<p><strong>Advarselstegn i boligopslag:</strong></p>
<ul>
  <li>🚩 Udlejer er i udlandet og kan ikke mødes personligt</li>
  <li>🚩 Pris markant under markedet (Københavns gennemsnit for 1-værelses: 8.500–12.000 DKK)</li>
  <li>🚩 Beder om betaling inden underskrivelse af lejekontrakt</li>
  <li>🚩 Ingen fotos, eller fotos stjålet fra ejendomssider</li>
</ul>
<p class="callout-warning">Depositum i Danmark er ved lov begrænset til 3 måneders husleje (Lejeloven §34). Den, der beder om mere, bryder loven.</p>` }
      },
      {
        icon: "💳",
        title: { en:"Banking & Money Before You Land", fr:"Banque et Argent Avant d'Arriver", ar:"البنوك والمال قبل وصولك", es:"Banca y Dinero Antes de Llegar", da:"Bank og penge inden ankomst" },
        content: { en:`<p>You can set up international accounts before arriving that will tide you over until you get a Danish bank account (which requires a CPR number).</p>
<p><strong>Recommended pre-arrival accounts:</strong></p>
<ul>
  <li><strong>Wise (formerly TransferWise)</strong> — best for international transfers, multi-currency card, works immediately</li>
  <li><strong>Revolut</strong> — excellent for spending abroad, free tier available</li>
  <li><strong>Lunar</strong> — Danish digital bank that can sometimes be opened without a CPR number (check current eligibility)</li>
</ul>
<p>Bring enough cash or accessible funds for at least <strong>2 months of expenses</strong> while you get established. Budget at minimum DKK 30,000 as a buffer.</p>`,
          da:`<p>Du kan oprette internationale konti, inden du ankommer, som hjælper dig, til du får en dansk bankkonto (som kræver et CPR-nummer).</p>
<p><strong>Anbefalede konti inden ankomst:</strong></p>
<ul>
  <li><strong>Wise (tidligere TransferWise)</strong> — bedst til internationale overførsler, multivalutakort, virker med det samme</li>
  <li><strong>Revolut</strong> — fremragende til brug i udlandet, gratis niveau tilgængeligt</li>
  <li><strong>Lunar</strong> — dansk digital bank, der sommetider kan åbnes uden CPR-nummer (tjek aktuel berettigelse)</li>
</ul>
<p>Medbring tilstrækkelig kontanter eller tilgængelige midler til mindst <strong>2 måneders udgifter</strong>, mens du etablerer dig. Budgetter med minimum 30.000 DKK som buffer.</p>` }
      },
      {
        icon: "🗣️",
        title: { en:"Start Learning Danish Now", fr:"Commencez à Apprendre le Danois Maintenant", ar:"ابدأ تعلم الدنماركية الآن", es:"Empieza a Aprender Danés Ahora", da:"Begynd at lære dansk nu" },
        content: { en:`<p>Danish pronunciation is genuinely one of the hardest for foreigners — the sooner you start, the better. The honest truth: everyone in Denmark speaks excellent English. But learning Danish opens social doors that stay closed to English speakers.</p>
<p><strong>Best pre-arrival resources:</strong></p>
<ul>
  <li>🎧 <strong>Glossika</strong> — best for pronunciation, spaced repetition</li>
  <li>📱 <strong>Babbel</strong> — structured lessons, better than Duolingo for Danish</li>
  <li>🎬 <strong>YouTube: "Learn Danish with DanishClass101"</strong></li>
  <li>🎙️ <strong>Podcast: "Slow Danish"</strong> — real speech slowed down</li>
</ul>
<p>Learn these 10 words first: <em>tak (thank you), undskyld (sorry/excuse me), hej (hello), hejhej (goodbye), ja/nej (yes/no), tak for mad (thanks for the food), skål (cheers), hvad (what), og (and), er (is/are)</em></p>`,
          da:`<p>Dansk udtale er oprigtigt talt en af de sværeste for udlændinge — jo tidligere du starter, desto bedre. Den ærlige sandhed: alle i Danmark taler fremragende engelsk. Men at lære dansk åbner sociale døre, der forbliver lukkede for engelsktalende.</p>
<p><strong>Bedste ressourcer inden ankomst:</strong></p>
<ul>
  <li>🎧 <strong>Glossika</strong> — bedst til udtale, intervaltræning</li>
  <li>📱 <strong>Babbel</strong> — strukturerede lektioner, bedre end Duolingo til dansk</li>
  <li>🎬 <strong>YouTube: "Learn Danish with DanishClass101"</strong></li>
  <li>🎙️ <strong>Podcast: "Slow Danish"</strong> — rigtig tale nedsat i tempo</li>
</ul>
<p>Lær disse 10 ord først: <em>tak (thank you), undskyld (undskyld/til undskyldning), hej (hello), hejhej (farvel), ja/nej (yes/no), tak for mad (tak for maden), skål (cheers), hvad (what), og (and), er (is/are)</em></p>` }
      }
    ],
    checklist: [
      { id:"ch0_visa", text: { en:"Research and apply for correct visa/permit", da:"Undersøg og ansøg om korrekt visum/tilladelse" }, xp: 30 },
      { id:"ch0_docs", text: { en:"Build your physical document folder", da:"Byg din fysiske dokumentmappe" }, xp: 20 },
      { id:"ch0_housing", text: { en:"Start housing search on BoligPortal/Lejebolig", da:"Start boligsøgning på BoligPortal/Lejebolig" }, xp: 20 },
      { id:"ch0_wise", text: { en:"Set up Wise or Revolut card", da:"Opret Wise eller Revolut-kort" }, xp: 15 },
      { id:"ch0_danish", text: { en:"Download a Danish learning app", da:"Download en dansk lærings-app" }, xp: 15 },
      { id:"ch0_groups", text: { en:"Join expat Facebook groups for your city", da:"Tilslut dig expat Facebook-grupper for din by" }, xp: 10 },
    ]
  },
  {
    id: 1, icon: "⚡",
    color: "#C60C30",
    title: { en:"First 72 Hours", fr:"Les 72 Premières Heures", ar:"أول 72 ساعة", es:"Las Primeras 72 Horas", da:"De Første 72 Timer" },
    subtitle: { en:"The Critical Window", fr:"La Fenêtre Critique", ar:"النافذة الحرجة", es:"La Ventana Crítica", da:"Det Kritiske Vindue" },
    intro: { en:"These are the most important tasks of your entire life in Denmark. Do them in order. Do not skip any.", fr:"Ce sont les tâches les plus importantes de toute votre vie au Danemark. Faites-les dans l'ordre.", ar:"هذه أهم مهام حياتك كلها في الدنمارك. افعلها بالترتيب. لا تتخطى أياً منها.", es:"Estas son las tareas más importantes de toda tu vida en Dinamarca. Hazlas en orden.", da:"Dette er de vigtigste opgaver i hele dit liv i Danmark. Gør dem i rækkefølge." },
    readTime: "20 min",
    bjornTip: { en:"I've been guiding newcomers for 1,200 years and this chapter is the one I care about most. Tick every single box. Your future self will thank you.", fr:"Je guide les nouveaux arrivants depuis 1 200 ans et c'est le chapitre qui m'importe le plus.", ar:"لقد كنت أرشد الوافدين الجدد منذ 1200 عام وهذا الفصل هو الأهم. حدّد كل مربع.", es:"He guiado recién llegados durante 1.200 años y este es el capítulo que más me importa.", da:"Jeg har guidet nyankomne i 1.200 år og dette kapitel er det vigtigste for mig." },
    sections: [
      {
        icon: "📍",
        title: { en:"Step 1: Register Your Address (Folkeregister)", fr:"Étape 1 : Enregistrez votre adresse", ar:"الخطوة 1: سجّل عنوانك", es:"Paso 1: Registra tu Dirección", da:"Trin 1: Registrér din adresse" },
        content: { en:`<p>This is <strong>the very first thing</strong>. Everything else — your CPR number, your MitID, your doctor, your bank account, your tax card — all of it depends on having a registered address.</p>
<p class="callout-warning">⏰ <strong>Legal deadline: within 5 days of moving</strong> (CPR Act §12). Late registration is a fineable offence. Book your Borgerservice appointment as soon as you have keys.</p>
<p><strong>How to do it:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span> Go to <a href="https://www.borger.dk" target="_blank" rel="noopener">borger.dk</a> and search "Flytning til Danmark" OR visit your local Borgerservice (Citizens Service) office in person.</li>
  <li><span class="step-num">2</span> You need: your passport + proof of where you're living (signed lease, sublease agreement, or a host letter).</li>
  <li><span class="step-num">3</span> If staying with a friend temporarily: they must write and sign a letter confirming you're living there. Template available at borger.dk.</li>
</ol>
<p class="callout-warning">Do NOT skip this step thinking you'll do it "later." Without a registered address, you cannot get your CPR number.</p>`,
da:`<p>Dette er <strong>det allerførste du skal gøre</strong>. Alt andet — dit CPR-nummer, dit MitID, din læge, din bankkonto, dit skattekort — alt sammen afhænger af, at du har en registreret adresse.</p>
<p class="callout-warning">⏰ <strong>Juridisk frist: inden for 5 dage efter flytning</strong> (CPR-loven §12). Sen registrering kan give bøde. Book din tid hos Borgerservice, så snart du har nøglerne.</p>
<p><strong>Sådan gør du:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span> Gå til <a href="https://www.borger.dk" target="_blank" rel="noopener">borger.dk</a> og søg på "Flytning til Danmark" ELLER besøg dit lokale Borgerservice personligt.</li>
  <li><span class="step-num">2</span> Du skal bruge: dit pas + dokumentation for din bopæl (underskrevet lejekontrakt, fremleje-aftale eller en værtserklæring).</li>
  <li><span class="step-num">3</span> Hvis du bor midlertidigt hos en ven: de skal skrive og underskrive et brev, der bekræfter, at du bor der. Skabelon findes på borger.dk.</li>
</ol>
<p class="callout-warning">Spring IKKE dette trin over med tanken om, at du gør det "senere." Uden en registreret adresse kan du ikke få dit CPR-nummer.</p>` }
      },
      {
        icon: "🆔",
        title: { en:"Step 2: Get Your CPR Number", fr:"Étape 2 : Obtenez votre numéro CPR", ar:"الخطوة 2: احصل على رقم CPR الخاص بك", es:"Paso 2: Obtén tu Número CPR", da:"Trin 2: Få dit CPR-nummer" },
        content: { en:`<p>Your CPR number (Civil Personal Registration number) is <strong>the single most important number in your Danish life.</strong> It is required for absolutely everything: doctor visits, tax registration, banking, library cards, gym membership, phone contracts — everything.</p>
<p><strong>Format:</strong> DDMMYY-XXXX (your birthdate + 4 digits)</p>
<p><strong>EU citizens:</strong> Register at International Citizen Service (ICS). Often same-day if you have all documents.</p>
<p><strong>Non-EU citizens:</strong> Usually issued automatically after your residence permit is approved. Can take 2–8 weeks.</p>
<p><strong>ICS offices (main locations):</strong></p>
<ul>
  <li>Copenhagen: Gyldenløvesgade 11, 1600 Copenhagen V</li>
  <li>Aarhus: Hack Kampmanns Plads 2</li>
  <li>Odense: Flakhaven 2</li>
  <li>Aalborg: Godthåbsgade 8</li>
</ul>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Book ICS appointment online</a>`,
da:`<p>Dit CPR-nummer (Civil Personal Registration nummer) er <strong>det absolut vigtigste nummer i dit danske liv.</strong> Det kræves til alt: lægebesøg, skatteregistrering, bankkonto, bibliotekskort, fitnesskort, telefonkontrakter — alt.</p>
<p><strong>Format:</strong> DDMMÅÅ-XXXX (din fødselsdato + 4 cifre)</p>
<p><strong>EU-borgere:</strong> Registrer dig hos International Citizen Service (ICS). Ofte samme dag, hvis du har alle dokumenter.</p>
<p><strong>Ikke-EU-borgere:</strong> Udstedes normalt automatisk, når din opholdstilladelse er godkendt. Kan tage 2–8 uger.</p>
<p><strong>ICS-kontorer (primære steder):</strong></p>
<ul>
  <li>København: Gyldenløvesgade 11, 1600 København V</li>
  <li>Aarhus: Hack Kampmanns Plads 2</li>
  <li>Odense: Flakhaven 2</li>
  <li>Aalborg: Godthåbsgade 8</li>
</ul>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Book ICS-tid online</a>` }
      },
      {
        icon: "🔐",
        title: { en:"Step 3: Activate MitID — Your Digital Identity", fr:"Étape 3 : Activez MitID — Votre Identité Numérique", ar:"الخطوة 3: فعّل MitID - هويتك الرقمية", es:"Paso 3: Activa MitID — Tu Identidad Digital", da:"Trin 3: Aktivér MitID — Din digitale identitet" },
        content: { en:`<p>MitID is Denmark's national digital identity system. Think of it as the master key to your entire digital life in Denmark. Without it, you cannot access: borger.dk, SKAT (tax), e-Boks (your official mail), your bank online, Sundhed.dk, and dozens more services.</p>
<p><strong>Get MitID at:</strong> <a href="https://www.mitid.dk" target="_blank" rel="noopener">mitid.dk</a> or in person at your bank or Borgerservice.</p>
<p>The MitID app goes on your smartphone and generates 6-digit codes for login. Keep your phone safe — this IS your identity.</p>`,
da:`<p>MitID er Danmarks nationale digitale identitetssystem. Tænk på det som hovednøglen til hele dit digitale liv i Danmark. Uden det kan du ikke tilgå: borger.dk, SKAT, e-Boks (din officielle post), din netbank, Sundhed.dk og snesevis af andre tjenester.</p>
<p><strong>Få MitID på:</strong> <a href="https://www.mitid.dk" target="_blank" rel="noopener">mitid.dk</a> eller personligt i din bank eller på Borgerservice.</p>
<p>MitID-appen installeres på din smartphone og genererer 6-cifrede koder til login. Hold din telefon sikker — dette ER din identitet.</p>` }
      },
      {
        icon: "📬",
        title: { en:"Step 4: Check e-Boks Every Week", fr:"Étape 4 : Vérifiez e-Boks chaque semaine", ar:"الخطوة 4: تحقق من e-Boks كل أسبوع", es:"Paso 4: Revisa e-Boks Cada Semana", da:"Trin 4: Tjek e-Boks hver uge" },
        content: { en:`<p>e-Boks is Denmark's official digital mailbox. Every letter from SKAT, Udbetaling Danmark, your municipality, your bank, and the government goes here. Not to your physical mailbox. Not to your email. Here.</p>
<p class="callout-warning"><strong>This is critical:</strong> People have missed tax deadlines, permit renewal notices, and benefit payment confirmations because they didn't check e-Boks. Set a weekly calendar reminder right now.</p>
<p>Download the e-Boks app. Enable push notifications. Set email forwarding in settings so you get an email when something new arrives.</p>
<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ e-Boks website</a>`,
da:`<p>e-Boks er Danmarks officielle digitale postkasse. Hvert brev fra SKAT, Udbetaling Danmark, din kommune, din bank og staten ender her. Ikke i din fysiske postkasse. Ikke i din e-mail. Her.</p>
<p class="callout-warning"><strong>Dette er afgørende:</strong> Folk har misset skattefrister, meddelelser om fornyelse af opholdstilladelse og bekræftelser på ydelsesbetalinger, fordi de ikke tjekkede e-Boks. Sæt en ugentlig kalender-påmindelse nu.</p>
<p>Download e-Boks-appen. Aktiver push-notifikationer. Opsæt e-mail-videresendelse i indstillingerne, så du modtager en e-mail, når noget nyt ankommer.</p>
<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ e-Boks hjemmeside</a>` }
      },
      {
        icon: "🏦",
        title: { en:"Step 5: Open a Danish Bank Account", fr:"Étape 5 : Ouvrez un compte bancaire danois", ar:"الخطوة 5: افتح حساباً بنكياً دنماركياً", es:"Paso 5: Abre una Cuenta Bancaria Danesa", da:"Trin 5: Åbn en dansk bankkonto" },
        content: { en:`<p>You need a Danish bank account for your NemKonto (the account the government sends you money — tax refunds, benefits, etc.). Most banks require a CPR number.</p>
<table class="info-table">
  <tr><th>Bank</th><th>English?</th><th>Req. CPR?</th><th>Best for</th></tr>
  <tr><td><strong>Lunar</strong></td><td>✅ 100%</td><td>Sometimes no</td><td>Newcomers, digital-first</td></tr>
  <tr><td><strong>Nordea</strong></td><td>✅ Good</td><td>Yes</td><td>International transfers</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>✅ Good</td><td>Yes</td><td>Full service</td></tr>
  <tr><td><strong>Jyske Bank</strong></td><td>Partial</td><td>Yes</td><td>Regional, personal service</td></tr>
</table>
<p>After opening, designate it as your <strong>NemKonto</strong> at <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>. This is mandatory.</p>`,
da:`<p>Du har brug for en dansk bankkonto til din NemKonto (den konto, som staten sender penge til — skattebetalinger, ydelser osv.). De fleste banker kræver et CPR-nummer.</p>
<table class="info-table">
  <tr><th>Bank</th><th>Engelsk?</th><th>Kræver CPR?</th><th>Bedst til</th></tr>
  <tr><td><strong>Lunar</strong></td><td>✅ 100%</td><td>Sommetider nej</td><td>Nyankomne, digital-first</td></tr>
  <tr><td><strong>Nordea</strong></td><td>✅ God</td><td>Ja</td><td>Internationale overførsler</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>✅ God</td><td>Ja</td><td>Fuld service</td></tr>
  <tr><td><strong>Jyske Bank</strong></td><td>Delvist</td><td>Ja</td><td>Regional, personlig service</td></tr>
</table>
<p>Registrér den som din <strong>NemKonto</strong> på <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>, når du har åbnet den. Det er obligatorisk.</p>` }
      },
      {
        icon: "📱",
        title: { en:"Step 6: The Essential Danish Apps", fr:"Étape 6 : Les Applications Danoises Essentielles", ar:"الخطوة 6: التطبيقات الدنماركية الأساسية", es:"Paso 6: Las Apps Danesas Esenciales", da:"Trin 6: De essentielle danske apps" },
        content: { en:`<div class="app-grid">
  <div class="app-card"><div class="app-card-icon">💸</div><div class="app-card-name">MobilePay</div><div class="app-card-desc">Denmark's payment app. You NEED this for splitting bills, paying at stalls, etc.</div><div class="app-card-lang">🇬🇧 English</div></div>
  <div class="app-card"><div class="app-card-icon">📬</div><div class="app-card-name">e-Boks</div><div class="app-card-desc">Your official Danish mailbox. Check weekly.</div><div class="app-card-lang">🇬🇧 English</div></div>
  <div class="app-card"><div class="app-card-icon">🚌</div><div class="app-card-name">Rejsekort</div><div class="app-card-desc">Public transport card app. Works across all of Denmark.</div><div class="app-card-lang">🇬🇧 English</div></div>
  <div class="app-card"><div class="app-card-icon">🚂</div><div class="app-card-name">DSB</div><div class="app-card-desc">Danish national rail. Book train tickets, see schedules.</div><div class="app-card-lang">🇬🇧 English</div></div>
  <div class="app-card"><div class="app-card-icon">🏥</div><div class="app-card-name">Min Læge</div><div class="app-card-desc">Book GP appointments, get prescriptions renewed.</div><div class="app-card-lang">Limited EN</div></div>
  <div class="app-card"><div class="app-card-icon">💊</div><div class="app-card-name">Sundhed.dk</div><div class="app-card-desc">Your health records, hospital referrals, find a GP.</div><div class="app-card-lang">🇬🇧 English</div></div>
  <div class="app-card"><div class="app-card-icon">💰</div><div class="app-card-name">Skat</div><div class="app-card-desc">Danish tax authority. View your tax card, see deductions.</div><div class="app-card-lang">🇬🇧 English</div></div>
  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Save money on unsold food. Danes love this app.</div><div class="app-card-lang">🇬🇧 English</div></div>
</div>`,
da:`<div class="app-grid">
  <div class="app-card"><div class="app-card-icon">💸</div><div class="app-card-name">MobilePay</div><div class="app-card-desc">Danmarks betalingsapp. Du HAR BRUG FOR denne til at dele regninger, betale på markeder osv.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
  <div class="app-card"><div class="app-card-icon">📬</div><div class="app-card-name">e-Boks</div><div class="app-card-desc">Din officielle danske postkasse. Tjek den ugentligt.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
  <div class="app-card"><div class="app-card-icon">🚌</div><div class="app-card-name">Rejsekort</div><div class="app-card-desc">App til offentlig transport. Fungerer i hele Danmark.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
  <div class="app-card"><div class="app-card-icon">🚂</div><div class="app-card-name">DSB</div><div class="app-card-desc">Danske statsbaner. Book togbilletter, se køreplaner.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
  <div class="app-card"><div class="app-card-icon">🏥</div><div class="app-card-name">Min Læge</div><div class="app-card-desc">Book tider hos din læge, forny recepter.</div><div class="app-card-lang">Begrænset EN</div></div>
  <div class="app-card"><div class="app-card-icon">💊</div><div class="app-card-name">Sundhed.dk</div><div class="app-card-desc">Dine sundhedsoplysninger, hospitalshenvisninger, find en læge.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
  <div class="app-card"><div class="app-card-icon">💰</div><div class="app-card-name">Skat</div><div class="app-card-desc">Dansk skattemyndighed. Se dit skattekort, tjek fradrag.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Spar penge på usolgt mad. Danskerne elsker denne app.</div><div class="app-card-lang">🇬🇧 Engelsk</div></div>
</div>` }
      },
      {
        icon: "🚨",
        title: { en:"Emergency Numbers — Save These Now", fr:"Numéros d'urgence — Enregistrez-les maintenant", ar:"أرقام الطوارئ — احفظها الآن", es:"Números de Emergencia — Guárdalos Ahora", da:"Nødnumre — Gem dem nu" },
        content: { en:`<table class="info-table">
  <tr><th>Number</th><th>For</th><th>Note</th></tr>
  <tr><td><strong>112</strong></td><td>Police, Fire, Ambulance</td><td>Life-threatening emergencies ONLY</td></tr>
  <tr><td><strong>1813</strong></td><td>Medical help (non-emergency)</td><td>Urgent but not life-threatening. 24/7. Copenhagen region.</td></tr>
  <tr><td><strong>114</strong></td><td>Police non-emergency</td><td>For crimes, lost items, reports</td></tr>
  <tr><td><strong>70 11 31 31</strong></td><td>Dental emergency</td><td>Out-of-hours dental pain</td></tr>
  <tr><td><strong>80 19 13 99</strong></td><td>Poison Control</td><td>Free, 24/7</td></tr>
  <tr><td><strong>70 20 12 60</strong></td><td>Crisis Line (Livslinien)</td><td>Mental health crisis support</td></tr>
</table>
<p class="callout-warning"><strong>Key difference:</strong> In Denmark, 1813 is the number to call for medical advice and non-emergency urgent care. Calling 112 for non-emergencies is frowned upon and may delay care for others.</p>`,
da:`<table class="info-table">
  <tr><th>Nummer</th><th>Til</th><th>Bemærkning</th></tr>
  <tr><td><strong>112</strong></td><td>Politi, Brandvæsen, Ambulance</td><td>KUN livstruende nødsituationer</td></tr>
  <tr><td><strong>1813</strong></td><td>Lægehjælp (ikke-akut)</td><td>Akut men ikke livstruende. Døgnet rundt. Region Hovedstaden.</td></tr>
  <tr><td><strong>114</strong></td><td>Politi (ikke-akut)</td><td>Forbrydelser, tabte genstande, anmeldelser</td></tr>
  <tr><td><strong>70 11 31 31</strong></td><td>Tandlæge-nødsituation</td><td>Tandpine uden for åbningstid</td></tr>
  <tr><td><strong>80 19 13 99</strong></td><td>Giftlinjen</td><td>Gratis, døgnet rundt</td></tr>
  <tr><td><strong>70 20 12 60</strong></td><td>Kriselinje (Livslinien)</td><td>Støtte ved psykisk krise</td></tr>
</table>
<p class="callout-warning"><strong>Vigtigt at vide:</strong> I Danmark er 1813 nummeret, du ringer til for lægelig rådgivning og ikke-akut behandling. Det er uhøfligt at ringe til 112 for ikke-akutte situationer og kan forsinke hjælpen til andre.</p>` }
      }
    ],
    checklist: [
      { id:"ch1_address", text:{ en:"Register address at borger.dk or Borgerservice", da:"Registrér adresse på borger.dk" }, xp:40 },
      { id:"ch1_cpr", text:{ en:"Book ICS appointment for CPR number", da:"Book ICS-tid til CPR-nummer" }, xp:40 },
      { id:"ch1_mitid", text:{ en:"Activate MitID (digital identity)", da:"Aktivér MitID" }, xp:35 },
      { id:"ch1_ebox", text:{ en:"Set up e-Boks with notifications", da:"Opsæt e-Boks med notifikationer" }, xp:30 },
      { id:"ch1_bank", text:{ en:"Open Danish bank account", da:"Åbn dansk bankkonto" }, xp:30 },
      { id:"ch1_nemkonto", text:{ en:"Designate account as NemKonto", da:"Registrér konto som NemKonto" }, xp:20 },
      { id:"ch1_apps", text:{ en:"Download MobilePay + essential apps", da:"Download MobilePay + vigtige apps" }, xp:15 },
      { id:"ch1_gp", text:{ en:"Register with a local GP (læge)", da:"Tilmeld dig en lokal læge" }, xp:25 },
      { id:"ch1_tax", text:{ en:"Get tax card (skattekort) from SKAT", da:"Hent skattekort fra SKAT" }, xp:25 },
      { id:"ch1_emergency", text:{ en:"Save emergency numbers (112, 1813)", da:"Gem nødnumre (112, 1813)" }, xp:10 },
    ]
  },
  {
    id: 2, icon: "📋",
    color: "#E8A020",
    title: { en:"Papers & Legal Identity", fr:"Papiers et Identité Légale", ar:"الأوراق والهوية القانونية", es:"Papeles e Identidad Legal", da:"Papirer og Juridisk Identitet" },
    subtitle: { en:"Making It Official", fr:"Officialiser sa Situation", ar:"جعل الأمور رسمية", es:"Hacerlo Oficial", da:"Gør det officielt" },
    intro: { en:"Denmark's bureaucracy is thorough. Understanding the system turns weeks of confusion into days of clarity.", fr:"La bureaucratie danoise est minutieuse. Comprendre le système transforme des semaines de confusion en jours de clarté.", ar:"البيروقراطية الدنماركية شاملة. فهم النظام يحول أسابيع من الارتباك إلى أيام من الوضوح.", es:"La burocracia danesa es minuciosa. Entender el sistema convierte semanas de confusión en días de claridad.", da:"Danmarks bureaukrati er grundigt. At forstå systemet forvandler uger af forvirring til dage med klarhed." },
    readTime: "18 min",
    sections: [
      {
        icon:"🛂", title:{ en:"Residence Permit Types", da:"Typer af opholdstilladelser" },
        content:{ en:`<p>Your residence permit determines your rights in Denmark. Here's a clear overview:</p>
<table class="info-table">
  <tr><th>Permit Type</th><th>For</th><th>Work rights</th><th>Duration</th></tr>
  <tr><td><strong>EU Registration</strong></td><td>EU/EEA citizens</td><td>Unlimited</td><td>5 years (then permanent)</td></tr>
  <tr><td><strong>Positive List</strong></td><td>High-demand professions</td><td>Full</td><td>Up to 4 years</td></tr>
  <tr><td><strong>Pay Limit Scheme</strong></td><td>Salary &gt; DKK 514,000/yr (2025) · DKK 552,000/yr from 2026</td><td>Full</td><td>Up to 4 years</td></tr>
  <tr><td><strong>Student Permit</strong></td><td>Enrolled students</td><td>15 hrs/week</td><td>Duration of study</td></tr>
  <tr><td><strong>Family Reunification</strong></td><td>Joining family member</td><td>Full (usually)</td><td>2 years initially</td></tr>
  <tr><td><strong>Refugee Status</strong></td><td>Asylum seekers</td><td>Varies</td><td>Varies</td></tr>
</table>`,
da:`<p>Din opholdstilladelse bestemmer dine rettigheder i Danmark. Her er et klart overblik:</p>
<table class="info-table">
  <tr><th>Tilladelsestype</th><th>For</th><th>Arbejdsret</th><th>Varighed</th></tr>
  <tr><td><strong>EU-registrering</strong></td><td>EU/EØS-borgere</td><td>Ubegrænset</td><td>5 år (derefter permanent)</td></tr>
  <tr><td><strong>Positivlisten</strong></td><td>Efterspurgte erhverv</td><td>Fuld</td><td>Op til 4 år</td></tr>
  <tr><td><strong>Beløbsordningen</strong></td><td>Løn &gt; 514.000 kr./år (2025) · 552.000 kr./år fra 2026</td><td>Fuld</td><td>Op til 4 år</td></tr>
  <tr><td><strong>Studietilladelse</strong></td><td>Indskrevne studerende</td><td>15 timer/uge</td><td>Studieperioden</td></tr>
  <tr><td><strong>Familiesammenføring</strong></td><td>Genforening med familiemedlem</td><td>Fuld (normalt)</td><td>2 år indledningsvis</td></tr>
  <tr><td><strong>Flygtningestatus</strong></td><td>Asylansøgere</td><td>Varierer</td><td>Varierer</td></tr>
</table>` }
      },
      {
        icon:"⏱️", title:{ en:"Path to Permanent Residency", da:"Vejen til permanent ophold" },
        content:{ en:`<p>The general rule: <strong>8 years of continuous legal residence</strong> in Denmark. However, there are fast-track options:</p>
<ul>
  <li><strong>4 years</strong> if you pass a special active contribution assessment (points-based)</li>
  <li><strong>5 years</strong> for EU citizens with continuous residence</li>
  <li>You must also: have had full-time employment for at least <strong>3.5 of the last 4 years</strong> (or 4 of last 4.5 years for the 4-year fast-track route — Udlændingeloven §11), pass <strong>Prøve i Dansk 2 (PD2 ≈ B1)</strong>, have no criminal record, and be self-supporting (no public assistance in the last 4 years).</li>
</ul>
<p>The points system scores you on: Danish language level, employment history, income, community involvement, children's school performance, and citizenship exam score.</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener">→ Official permanent residency information</a>`,
da:`<p>Hovedreglen: <strong>8 års uafbrudt lovligt ophold</strong> i Danmark. Men der er hurtigspor:</p>
<ul>
  <li><strong>4 år</strong> hvis du består en særlig vurdering af aktivt bidrag (pointbaseret)</li>
  <li><strong>5 år</strong> for EU-borgere med uafbrudt ophold</li>
  <li>Du skal desuden: have haft fuldtidsansættelse i mindst <strong>3,5 af de seneste 4 år</strong> (eller 4 af de seneste 4,5 år for 4-årsvejen — Udlændingeloven §11), bestå <strong>Prøve i Dansk 2 (PD2 ≈ B1)</strong>, have rent straffeattest og være selvforsørgende (ingen offentlig hjælp de seneste 4 år).</li>
</ul>
<p>Pointsystemet bedømmer dig på: dansksprogsniveau, beskæftigelseshistorik, indkomst, samfundsengagement, børns skoleresultater og score på statsborgerskabsprøven.</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener">→ Officielle oplysninger om permanent ophold</a>` }
      },
      {
        icon:"🏛️", title:{ en:"Path to Danish Citizenship", da:"Vejen til dansk statsborgerskab" },
        content:{ en:`<p>One of the more demanding paths in Europe, but worth it:</p>
<ul>
  <li>Must have lived in Denmark for <strong>9 years</strong> (or less with accelerators)</li>
  <li>Pass the <strong>Indfødsretsprøven</strong> (citizenship test) — Danish history, culture, society</li>
  <li>Pass <strong>Prøve i Dansk 3 (PD3, ≈ B2 level)</strong> — the citizenship-track language test</li>
  <li>Pass the <strong>indfødsretsprøven</strong> (citizenship knowledge test, ~40 questions on Danish history, society, and democracy)</li>
  <li>Have lived in Denmark for at least <strong>9 of the last 10 years</strong> with permanent residency</li>
  <li>Be <strong>self-supporting</strong> with no public-assistance benefits in the last 4 years</li>
  <li>Have been self-supporting for the last 4.5 of 5 years</li>
  <li>No criminal convictions</li>
  <li>No outstanding debt to public authorities</li>
</ul>
<p>Denmark allows <strong>dual citizenship</strong> since 2015. You do not have to give up your original nationality.</p>`,
da:`<p>En af de mere krævende veje i Europa, men det er det værd:</p>
<ul>
  <li>Skal have boet i Danmark i <strong>9 år</strong> (eller færre med acceleratorer)</li>
  <li>Bestå <strong>indfødsretsprøven</strong> — dansk historie, kultur og samfund</li>
  <li>Bestå <strong>Prøve i Dansk 3 (PD3, ≈ B2-niveau)</strong> — sprogprøven på statsborgerskabssporet</li>
  <li>Have boet i Danmark i mindst <strong>9 af de seneste 10 år</strong> med permanent opholdstilladelse</li>
  <li>Være <strong>selvforsørgende</strong> — ingen offentlig forsørgelse de seneste 4 år</li>
  <li>Have forsørget sig selv de seneste 4,5 af 5 år</li>
  <li>Ingen straffedomme</li>
  <li>Ingen gæld til det offentlige</li>
</ul>
<p>Danmark tillader <strong>dobbelt statsborgerskab</strong> siden 2015. Du behøver ikke opgive dit oprindelige statsborgerskab.</p>` }
      },
      {
        icon:"💶", title:{ en:"Danish Tax — How It Actually Works", da:"Dansk skat — sådan fungerer det" },
        content:{ en:`<p>Yes, Danish taxes are high. Here's the honest picture of what you actually pay:</p>
<ul>
  <li><strong>AM-bidrag (Labour Market Contribution):</strong> 8% off the top of your gross salary. No deductions against this.</li>
  <li><strong>Municipal tax (kommuneskat):</strong> Varies by municipality, average ~25%. You pay this on income above your personal allowance.</li>
  <li><strong>State tax (bundskat):</strong> 12.01% (2025) on income above the personal allowance (51,600 DKK/year).</li>
  <li><strong>Top tax (topskat):</strong> 15% additional on personal income above ~611,800 DKK/year in 2025 (~50,983/month after AM-bidrag). Combined cap (skatteloft) excluding AM and church tax is 52.07%.</li>
  <li><strong>Personal allowance (personfradrag):</strong> 51,600 DKK/year (2025) — applied as a tax credit, effectively making this slice tax-free.</li>
</ul>
<p>What do you get for it? Free healthcare. Free university. 52 weeks parental leave. 5 weeks vacation. Free school. Unemployment benefits if you lose your job. The math is very different from what most people expect.</p>
<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ SKAT — Danish Tax Authority</a>`,
da:`<p>Ja, de danske skatter er høje. Her er det ærlige billede af, hvad du faktisk betaler:</p>
<ul>
  <li><strong>AM-bidrag (arbejdsmarkedsbidrag):</strong> 8% af din bruttoløn fra toppen. Ingen fradrag herimod.</li>
  <li><strong>Kommuneskat:</strong> Varierer pr. kommune, gennemsnit ~25%. Du betaler dette af indkomst over dit personfradrag.</li>
  <li><strong>Bundskat:</strong> 12,01% (2025) af indkomst over personfradraget (51.600 kr./år).</li>
  <li><strong>Topskat:</strong> 15% ekstra af personlig indkomst over ~611.800 kr./år i 2025. Samlet skatteloft (ekskl. AM og kirkeskat) er 52,07%.</li>
  <li><strong>Personfradrag:</strong> 51.600 kr./år (2025) — gives som skattefradrag, der reelt gør denne del skattefri.</li>
</ul>
<p>Hvad får du for det? Gratis sundhedspleje. Gratis universiteter. 52 ugers barselsorlov. 5 ugers ferie. Gratis skole. Dagpenge, hvis du mister dit job. Regnestykket er meget anderledes end de fleste forventer.</p>
<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ SKAT — Skattestyrelsen</a>` }
      },
      {
        icon:"🚗", title:{ en:"Driving Licence Conversion", da:"Konvertering af kørekort" },
        content:{ en:`<p>If you have an EU/EEA driving licence, you can use it indefinitely in Denmark. No conversion needed.</p>
<p>For non-EU licences:</p>
<ul>
  <li>Some countries have exchange agreements with Denmark (USA, Canada, Australia, Japan, South Korea, and others) — check at <a href="https://www.sikkertrafik.dk" target="_blank" rel="noopener">sikkertrafik.dk</a></li>
  <li>If your country has an agreement: pay a fee (~350 DKK) and exchange at your local Borgerservice</li>
  <li>If no agreement: you must complete Danish driving lessons and pass both theory and practical tests. Budget DKK 10,000–20,000 and 6–12 months.</li>
</ul>`,
da:`<p>Har du et EU/EØS-kørekort, kan du bruge det i Danmark på ubestemt tid. Ingen konvertering nødvendig.</p>
<p>For ikke-EU-kørekort:</p>
<ul>
  <li>Nogle lande har udvekslingsaftaler med Danmark (USA, Canada, Australien, Japan, Sydkorea m.fl.) — tjek på <a href="https://www.sikkertrafik.dk" target="_blank" rel="noopener">sikkertrafik.dk</a></li>
  <li>Har dit land en aftale: betal et gebyr (~350 kr.) og skift på dit lokale Borgerservice</li>
  <li>Ingen aftale: du skal gennemføre dansk køreundervisning og bestå både teori- og praktisk prøve. Budgetter 10.000–20.000 kr. og 6–12 måneder.</li>
</ul>` }
      }
    ],
    checklist: [
      { id:"ch2_permit", text:{ en:"Understand which residence permit applies to you", da:"Forstå hvilken opholdstilladelse der gælder dig" }, xp:20 },
      { id:"ch2_tax", text:{ en:"Get your skattekort (tax card) from SKAT", da:"Hent skattekort fra SKAT" }, xp:30 },
      { id:"ch2_skat", text:{ en:"Set up your SKAT online profile", da:"Opret din SKAT online profil" }, xp:20 },
      { id:"ch2_drive", text:{ en:"Check driving licence conversion requirements", da:"Tjek krav til konvertering af kørekort" }, xp:15 },
      { id:"ch2_perm", text:{ en:"Note your permanent residency eligibility date", da:"Notér din dato for permanent ophold" }, xp:20 },
    ]
  },
  {
    id: 3, icon: "🏠",
    color: "#6A9E6A",
    title: { en:"Housing", fr:"Logement", ar:"السكن", es:"Vivienda", da:"Bolig" },
    subtitle: { en:"Where You'll Breathe", fr:"Là Où Vous Respirerez", ar:"حيث ستتنفس", es:"Donde Respirarás", da:"Hvor du trækker vejret" },
    intro: { en:"The Danish housing market is brutally competitive — especially Copenhagen. But with the right strategy, you'll find your home.", fr:"Le marché immobilier danois est brutalement compétitif. Avec la bonne stratégie, vous trouverez votre maison.", ar:"سوق الإسكان الدنماركي تنافسي بشكل قاسٍ. لكن بالاستراتيجية الصحيحة، ستجد منزلك.", es:"El mercado inmobiliario danés es brutalmente competitivo. Con la estrategia correcta, encontrarás tu hogar.", da:"Det danske boligmarked er brutalt konkurrencepræget. Med den rette strategi finder du dit hjem." },
    readTime: "15 min",
    sections: [
      {
        icon:"🚨", title:{ en:"Read this first — Avoiding rental scams", da:"Læs dette først — Undgå svindel" },
        content:{ en:`<p class="callout-warning" style="background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;"><strong>⚠️ Housing scams are the #1 financial threat to newcomers in Denmark.</strong> Fake listings on Facebook Marketplace, fake landlords claiming to be abroad, and demands for deposit "to hold the apartment" before viewing have cost newcomers <strong>10,000 to 50,000 DKK</strong> each.</p>

<p><strong>Hard rules — never break them:</strong></p>
<ul>
  <li><strong>Never wire money before</strong> (a) you have signed a lease (Typeformular A) and (b) physically viewed the apartment with the actual landlord present. No exceptions.</li>
  <li><strong>Verify the landlord owns the property</strong> via <a href="https://www.ois.dk" target="_blank" rel="noopener">ois.dk</a> (Danish public property register — free) or <a href="https://www.tinglysning.dk" target="_blank" rel="noopener">tinglysning.dk</a> (deed registry).</li>
  <li><strong>The CPR-registered owner</strong> on the lease should match what ois.dk shows. If the "landlord" is "abroad and can't meet" — it's a scam.</li>
  <li><strong>Pay only via bank transfer to a Danish account in the landlord's name</strong> — never Western Union, MoneyGram, crypto, gift cards, or "deposit to a friend's account."</li>
  <li><strong>Reverse-image-search the listing photos</strong> (Google Images / TinEye). Scammers reuse photos.</li>
  <li><strong>Maximum legal upfront</strong>: 3 months deposit (depositum) + 3 months prepaid rent (forudbetalt leje) = 6 months. Anything more is illegal under Lejeloven §34. Many honest leases ask for less.</li>
</ul>
<p><strong>If something feels off, it is.</strong> Walk away — there is always another listing. Report scams to <a href="https://politi.dk" target="_blank" rel="noopener">politi.dk</a> and warn other newcomers in expat groups.</p>`,
da:`<p class="callout-warning" style="background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;"><strong>⚠️ Boligsvindel er den største finansielle trussel mod nyankomne i Danmark.</strong> Falske opslag på Facebook Marketplace, falske udlejere der hævder at befinde sig i udlandet, og krav om depositum "for at reservere lejligheden" inden fremvisning har kostet nyankomne <strong>10.000 til 50.000 kr.</strong> hver.</p>

<p><strong>Ufravigelige regler:</strong></p>
<ul>
  <li><strong>Overfør aldrig penge, før</strong> (a) du har underskrevet en lejekontrakt (Typeformular A) og (b) besigtiget lejligheden med den faktiske udlejer til stede. Ingen undtagelser.</li>
  <li><strong>Bekræft at udlejer ejer ejendommen</strong> via <a href="https://www.ois.dk" target="_blank" rel="noopener">ois.dk</a> (gratis dansk ejendomsregister) eller <a href="https://www.tinglysning.dk" target="_blank" rel="noopener">tinglysning.dk</a> (skøderegister).</li>
  <li><strong>Den CPR-registrerede ejer</strong> i kontrakten skal stemme overens med hvad ois.dk viser. Hvis "udlejeren" er "i udlandet og kan ikke møde op" — det er svindel.</li>
  <li><strong>Betal kun via bankoverførsel til en dansk konto i udlejerens navn</strong> — aldrig Western Union, MoneyGram, krypto, gavekort eller "depositum til en vens konto."</li>
  <li><strong>Lav omvendt billedsøgning på opslags-fotos</strong> (Google Billeder / TinEye). Svindlere genbruger fotos.</li>
  <li><strong>Maksimalt lovligt upfront</strong>: 3 måneders depositum + 3 måneders forudbetalt leje = 6 måneder. Alt mere er ulovligt i henhold til Lejeloven §34.</li>
</ul>
<p><strong>Hvis noget føles forkert, er det det.</strong> Gå videre — der er altid et andet opslag. Anmeld svindel på <a href="https://politi.dk" target="_blank" rel="noopener">politi.dk</a> og advar andre nyankomne i expat-grupper.</p>` }
      },
      {
        icon:"🏘️", title:{ en:"Types of Housing in Denmark", da:"Boligtyper i Danmark" },
        content:{ en:`<p>Denmark has four main types of housing tenure:</p>
<table class="info-table">
  <tr><th>Type</th><th>What is it</th><th>For newcomers</th></tr>
  <tr><td><strong>Private rental (lejebolig)</strong></td><td>Standard rented apartment/house from private landlord</td><td>✅ Most accessible</td></tr>
  <tr><td><strong>Social housing (almen bolig)</strong></td><td>Subsidised housing, income-linked rent</td><td>⚠️ 5–15 year waitlist in CPH</td></tr>
  <tr><td><strong>Andelsbolig</strong></td><td>Housing cooperative — buy a "share" in the building</td><td>⚠️ Long waitlist, requires capital</td></tr>
  <tr><td><strong>Ejerbolig</strong></td><td>Owned property (buying)</td><td>✅ If you have savings and credit</td></tr>
</table>
<p><strong>For most newcomers:</strong> private rental is your starting point. Once you're established, the andelsbolig waitlist is worth joining early — it can save you significant money long-term.</p>`,
da:`<p>Danmark har fire primære boligformer:</p>
<table class="info-table">
  <tr><th>Type</th><th>Hvad er det</th><th>For nyankomne</th></tr>
  <tr><td><strong>Privat leje (lejebolig)</strong></td><td>Standard lejelejlighed/-hus fra privat udlejer</td><td>✅ Mest tilgængelig</td></tr>
  <tr><td><strong>Almen bolig</strong></td><td>Støttet bolig, indkomstbaseret husleje</td><td>⚠️ 5–15 års venteliste i KBH</td></tr>
  <tr><td><strong>Andelsbolig</strong></td><td>Boligforening — køb en "andel" i bygningen</td><td>⚠️ Lang venteliste, kræver kapital</td></tr>
  <tr><td><strong>Ejerbolig</strong></td><td>Ejet ejendom (køb)</td><td>✅ Hvis du har opsparing og kreditvurdering</td></tr>
</table>
<p><strong>For de fleste nyankomne:</strong> privat leje er udgangspunktet. Når du er etableret, er andelsbolig-ventelisten værd at tilmelde sig tidligt — det kan spare dig for mange penge på lang sigt.</p>` }
      },
      {
        icon:"✍️", title:{ en:"Writing a Winning Danish Rental Application", da:"Skriv en vindende lejeansøgning" },
        content:{ en:`<p>Danish landlords receive dozens of applications per listing. Here's what makes yours stand out:</p>
<ol class="step-list">
  <li><span class="step-num">1</span><strong>Write in Danish or offer Danish version.</strong> Even basic Danish shows commitment.</li>
  <li><span class="step-num">2</span><strong>Include:</strong> who you are, what you do, why this apartment, income proof, references from previous landlords.</li>
  <li><span class="step-num">3</span><strong>Be personal.</strong> Danes respond to genuine, warm applications — not formal letters.</li>
  <li><span class="step-num">4</span><strong>Send fast.</strong> Good listings in Copenhagen get 50+ applications in 24 hours. Apply within hours of the listing going up.</li>
  <li><span class="step-num">5</span><strong>Follow up.</strong> A polite message 48 hours after applying is appropriate and expected.</li>
</ol>`,
da:`<p>Danske udlejere modtager snesevis af ansøgninger per opslag. Her er hvad der får din til at skille sig ud:</p>
<ol class="step-list">
  <li><span class="step-num">1</span><strong>Skriv på dansk eller tilbyd en dansk version.</strong> Selv basic dansk viser engagement.</li>
  <li><span class="step-num">2</span><strong>Inkluder:</strong> hvem du er, hvad du laver, hvorfor netop denne lejlighed, indkomstdokumentation, referencer fra tidligere udlejere.</li>
  <li><span class="step-num">3</span><strong>Vær personlig.</strong> Danskere reagerer på ægte, varme ansøgninger — ikke formelle breve.</li>
  <li><span class="step-num">4</span><strong>Send hurtigt.</strong> Gode opslag i København får 50+ ansøgninger på 24 timer. Ansøg inden for timer efter opslaget går live.</li>
  <li><span class="step-num">5</span><strong>Følg op.</strong> En høflig besked 48 timer efter ansøgning er passende og forventet.</li>
</ol>` }
      },
      {
        icon:"⚖️", title:{ en:"Your Legal Rights as a Tenant", da:"Dine juridiske rettigheder som lejer" },
        content:{ en:`<p>Danish tenant protections are strong. Know these:</p>
<ul>
  <li><strong>Deposit cap:</strong> Maximum 3 months' rent. Prepaid rent: maximum 3 months. Total upfront: 6 months max.</li>
  <li><strong>Rent increases:</strong> Regulated. Landlord cannot raise rent arbitrarily. Must follow net price index or be approved.</li>
  <li><strong>Notice period:</strong> For unfurnished housing (the typical lease), the landlord must give you at least <strong>1 year's notice</strong> under Lejeloven §86 — only 3 months for furnished single rooms. Tenants have a 3-month notice obligation in most cases.</li>
  <li><strong>Deposit return:</strong> The unused portion must be returned promptly, but the landlord typically has up to ~6 weeks (and in disputed cases up to 2 months) to settle the move-out report (flytteopgørelse) and repair costs. "Within 2 weeks" is a myth — disputes go to Huslejenævnet.</li>
  <li><strong>Heating/utilities:</strong> Must be specified in lease. Cannot be changed without notice.</li>
</ul>
<p>If you have a dispute with your landlord, contact <strong>Huslejenævnet</strong> (Rent Tribunal) in your municipality — free and effective.</p>
<a href="https://huslejenaevn.dk" target="_blank" rel="noopener">→ Find your local Huslejenævn</a>`,
da:`<p>Dansk lejelovgivning beskytter lejere godt. Kend disse regler:</p>
<ul>
  <li><strong>Depositumsloft:</strong> Maksimalt 3 måneders husleje. Forudbetalt leje: maks. 3 måneder. Samlet upfront: maks. 6 måneder.</li>
  <li><strong>Huslejestigninger:</strong> Reguleret. Udlejer kan ikke hæve huslejen vilkårligt. Skal følge nettoprisindekset eller godkendes.</li>
  <li><strong>Opsigelsesvarsel:</strong> For umøblerede boliger (den typiske lejekontrakt) skal udlejer give dig mindst <strong>1 års varsel</strong> jf. Lejeloven §86 — kun 3 måneder for møblerede enkeltværelser. Lejer har 3 måneders opsigelsesfrist i de fleste tilfælde.</li>
  <li><strong>Tilbagebetaling af depositum:</strong> Den ubrugte del skal tilbagebetales, men udlejer har typisk op til ~6 uger (og i tvistede sager op til 2 måneder) til at opgøre fraflytningsrapporten og reparationsomkostninger. Tvister afgøres af Huslejenævnet.</li>
  <li><strong>Varme/forsyninger:</strong> Skal fremgå af lejekontrakten. Kan ikke ændres uden varsel.</li>
</ul>
<p>Har du en tvist med din udlejer, kan du kontakte <strong>Huslejenævnet</strong> i din kommune — gratis og effektivt.</p>
<a href="https://huslejenaevn.dk" target="_blank" rel="noopener">→ Find dit lokale Huslejenævn</a>` }
      },
      {
        icon:"🗺️", title:{ en:"Copenhagen Neighbourhoods — Honest Guide", da:"Københavns kvarterer — ærlig guide" },
        content:{ en:`<table class="info-table">
  <tr><th>Area</th><th>Vibe</th><th>Avg 1-bed rent</th><th>Best for</th></tr>
  <tr><td><strong>Nørrebro</strong></td><td>Young, diverse, vibrant, left-leaning</td><td>~8,500 DKK</td><td>Young professionals, internationals</td></tr>
  <tr><td><strong>Vesterbro</strong></td><td>Hip, food scene, gentrifying</td><td>~9,500 DKK</td><td>Foodies, creatives</td></tr>
  <tr><td><strong>Østerbro</strong></td><td>Calm, family-oriented, affluent</td><td>~10,500 DKK</td><td>Families, established professionals</td></tr>
  <tr><td><strong>Frederiksberg</strong></td><td>Elegant, quiet, expensive</td><td>~11,000 DKK</td><td>Families, professionals</td></tr>
  <tr><td><strong>Amager / Islands Brygge</strong></td><td>Up-and-coming, waterfront, mixed</td><td>~8,000 DKK</td><td>Budget-conscious, young people</td></tr>
  <tr><td><strong>Valby</strong></td><td>Local, quiet, affordable, family</td><td>~7,500 DKK</td><td>Families, longer-term residents</td></tr>
</table>`,
da:`<table class="info-table">
  <tr><th>Område</th><th>Stemning</th><th>Gns. 1-værelses leje</th><th>Bedst til</th></tr>
  <tr><td><strong>Nørrebro</strong></td><td>Ungt, mangfoldigt, livligt, venstreorienteret</td><td>~8.500 kr.</td><td>Unge fagfolk, internationale</td></tr>
  <tr><td><strong>Vesterbro</strong></td><td>Hipster, madscene, under gentrificering</td><td>~9.500 kr.</td><td>Madentusiaster, kreative</td></tr>
  <tr><td><strong>Østerbro</strong></td><td>Roligt, familieorienteret, velstående</td><td>~10.500 kr.</td><td>Familier, etablerede fagfolk</td></tr>
  <tr><td><strong>Frederiksberg</strong></td><td>Elegant, stille, dyrt</td><td>~11.000 kr.</td><td>Familier, fagfolk</td></tr>
  <tr><td><strong>Amager / Islands Brygge</strong></td><td>Opkommende, havnefront, blandet</td><td>~8.000 kr.</td><td>Budgetbevidste, unge</td></tr>
  <tr><td><strong>Valby</strong></td><td>Lokalt præg, roligt, overkommeligt, familievenligt</td><td>~7.500 kr.</td><td>Familier, langtidsboende</td></tr>
</table>` }
      }
    ],
    checklist: [
      { id:"ch3_search", text:{ en:"Set up search alerts on BoligPortal and Lejebolig", da:"Opret søgealarmer på BoligPortal og Lejebolig" }, xp:20 },
      { id:"ch3_letter", text:{ en:"Write your Danish rental application letter", da:"Skriv din danske lejeansøgning" }, xp:25 },
      { id:"ch3_rights", text:{ en:"Read and understand your lease before signing", da:"Læs og forstå din lejekontrakt inden underskrift" }, xp:30 },
      { id:"ch3_social", text:{ en:"Join social housing waitlist (if planning long-term)", da:"Tilmeld dig venteliste for almen bolig" }, xp:15 },
      { id:"ch3_insurance", text:{ en:"Get indboforsikring (home contents insurance)", da:"Tegn indboforsikring" }, xp:20 },
    ]
  },
  {
    id: 4, icon: "💰", color: "#B87333",
    title: { en:"Money & Banking", fr:"Argent et Banque", ar:"المال والبنوك", es:"Dinero y Banca", da:"Penge og Bank" },
    subtitle: { en:"The Danish Wallet", fr:"Le Portefeuille Danois", ar:"المحفظة الدنماركية", es:"La Cartera Danesa", da:"Den Danske Tegnebog" },
    intro: { en:"Understand how Danish money flows — from salary to pension to MobilePay — and make every krone work for you.", fr:"Comprendre comment l'argent circule au Danemark.", ar:"افهم كيف يتدفق المال الدنماركي.", es:"Entiende cómo fluye el dinero danés.", da:"Forstå hvordan dansk økonomi fungerer." },
    readTime: "14 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🏦",
        title: { en:"NemKonto — Your Mandatory Government Account", da:"NemKonto — din obligatoriske offentlige konto" },
        content: { en:`<p><strong>NemKonto</strong> (literally "Easy Account") is not a separate bank account — it is the designation you give to an existing account so the Danish government knows where to send you money. Tax refunds, child benefits, pension payments, unemployment benefits — all go to your NemKonto.</p>
<p class="callout-warning"><strong>This is mandatory.</strong> Every person with a CPR number must have a NemKonto. Without it, the government literally cannot pay you anything, and tax refunds can be delayed for months.</p>
<p><strong>How to register your NemKonto:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Open your Danish bank account (requires CPR number at most banks)</li>
  <li><span class="step-num">2</span>Go to <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> and log in with MitID</li>
  <li><span class="step-num">3</span>Select your account from the list and confirm</li>
</ol>
<p>You can also designate your NemKonto directly through your bank's app or website. Nordea, Danske Bank, and Lunar all allow this in-app.</p>
<a href="https://www.nemkonto.dk" target="_blank" rel="noopener">→ Register or update your NemKonto (official)</a>`,
da:`<p><strong>NemKonto</strong> (bogstaveligt "nem konto") er ikke en særskilt bankkonto — det er den betegnelse, du giver en eksisterende konto, så den danske stat ved, hvor den skal sende penge til dig. Skattebetalinger, børnebidrag, pensionsudbetalinger, dagpenge — alt sendes til din NemKonto.</p>
<p class="callout-warning"><strong>Det er obligatorisk.</strong> Alle med et CPR-nummer skal have en NemKonto. Uden den kan staten bogstaveligt talt ikke betale dig noget, og skattebetalinger kan forsinkes i måneder.</p>
<p><strong>Sådan registrerer du din NemKonto:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Åbn din danske bankkonto (kræver CPR-nummer i de fleste banker)</li>
  <li><span class="step-num">2</span>Gå til <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> og log ind med MitID</li>
  <li><span class="step-num">3</span>Vælg din konto fra listen og bekræft</li>
</ol>
<p>Du kan også registrere din NemKonto direkte via din banks app eller hjemmeside. Nordea, Danske Bank og Lunar understøtter alle dette i appen.</p>
<a href="https://www.nemkonto.dk" target="_blank" rel="noopener">→ Registrér eller opdater din NemKonto (officiel)</a>` }
      },
      {
        icon: "📊",
        title: { en:"Your Tax Card (Skattekort) — Get This Before Your First Paycheck", da:"Dit skattekort — hent det inden din første løn" },
        content: { en:`<p>Your <strong>skattekort</strong> (tax card) tells your employer exactly how much tax to deduct from your salary. Without it, your employer is legally required to deduct <strong>55% (trækprocent på 55%)</strong> — the maximum emergency rate. This is not a penalty; it is the Danish system's default when no card exists. But you will lose most of your first paycheck if you haven't sorted this.</p>
<p><strong>Get your skattekort immediately after getting your CPR number:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Go to <a href="https://skat.dk/en-us" target="_blank" rel="noopener">skat.dk</a> and log in with MitID</li>
  <li><span class="step-num">2</span>Click "Tax card and withholding tax" (Skattekort og trækprocent)</li>
  <li><span class="step-num">3</span>Review your preliminary income assessment (forskudsopgørelse) — this is SKAT's estimate of what you'll earn and owe</li>
  <li><span class="step-num">4</span>Your employer receives your tax card automatically — you do not need to send it manually</li>
</ol>
<p><strong>Two types of tax card:</strong></p>
<ul>
  <li><strong>Frikort</strong> — if your total annual income will be below DKK 51,600 (2025 personfradrag). You pay zero tax up to this amount.</li>
  <li><strong>Bikort</strong> — for a second job. Your main employer uses your main card; secondary employer uses the bikort (40% flat rate with no allowance).</li>
</ul>
<p class="callout-warning">Update your preliminary income assessment (forskudsopgørelse) if your circumstances change — new job, pay rise, starting a company, earning rental income. Getting it wrong means either a large bill or a refund at year end. SKAT does not penalise you for adjusting proactively.</p>
<a href="https://skat.dk/en-us/individuals/tax-card-and-withholding-tax/" target="_blank" rel="noopener">→ Tax card at skat.dk (official, English)</a>`,
da:`<p>Dit <strong>skattekort</strong> fortæller din arbejdsgiver præcis, hvor meget skat der skal trækkes fra din løn. Uden det er din arbejdsgiver juridisk forpligtet til at trække <strong>55%</strong> — den maksimale nødprocent. Det er ikke en straf; det er systemets standard, når intet kort eksisterer. Men du mister størstedelen af din første løn, hvis du ikke har ordnet det.</p>
<p><strong>Hent dit skattekort, så snart du har dit CPR-nummer:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Gå til <a href="https://skat.dk/en-us" target="_blank" rel="noopener">skat.dk</a> og log ind med MitID</li>
  <li><span class="step-num">2</span>Klik på "Skattekort og trækprocent"</li>
  <li><span class="step-num">3</span>Gennemgå din forskudsopgørelse — SKATs estimat over, hvad du forventes at tjene og betale</li>
  <li><span class="step-num">4</span>Din arbejdsgiver modtager dit skattekort automatisk — du behøver ikke sende det manuelt</li>
</ol>
<p><strong>To typer skattekort:</strong></p>
<ul>
  <li><strong>Frikort</strong> — hvis din samlede årsindkomst er under 51.600 kr. (2025 personfradrag). Du betaler nul skat op til dette beløb.</li>
  <li><strong>Bikort</strong> — til et bijob. Din primære arbejdsgiver bruger dit hovedkort; sekundær arbejdsgiver bruger bikortet (40% fast sats uden fradrag).</li>
</ul>
<p class="callout-warning">Opdater din forskudsopgørelse, hvis dine forhold ændrer sig — nyt job, lønstigning, start af firma, lejeindtægt. Fejl medfører enten en stor regning eller en tilbagebetaling ved årets afslutning. SKAT straffer dig ikke for at justere proaktivt.</p>
<a href="https://skat.dk/en-us/individuals/tax-card-and-withholding-tax/" target="_blank" rel="noopener">→ Skattekort på skat.dk (officiel, engelsk)</a>` }
      },
      {
        icon: "📋",
        title: { en:"The Annual Tax Statement (Årsopgørelse)", da:"Årsopgørelsen" },
        content: { en:`<p>Every year in <strong>March</strong>, SKAT publishes your <strong>årsopgørelse</strong> — the final tax statement for the previous year. It compares what you actually earned and paid against your estimate, and calculates whether you owe money or get a refund.</p>
<p><strong>The good news:</strong> Most people get a refund. Danes receive an average refund of around DKK 5,000–8,000 per year.</p>
<p><strong>Common reasons for a refund:</strong></p>
<ul>
  <li>Transport deduction (befordringsfradrag) — if your commute is over 24 km each way, you can deduct the excess kilometres</li>
  <li>Interest on loans (rentefradrag)</li>
  <li>Union dues (fagforeningskontingent)</li>
  <li>Unemployment insurance / a-kasse contributions</li>
  <li>Charitable donations (up to DKK 17,200/year, 2025)</li>
</ul>
<p><strong>How to read your årsopgørelse:</strong></p>
<ul>
  <li>Green number = refund (returned to NemKonto automatically in April)</li>
  <li>Red number = you owe SKAT money (deducted from NemKonto, or you can pay manually)</li>
</ul>
<p>You can also submit missing deductions manually at skat.dk up to 3 years retroactively. Many newcomers miss deductions in their first year and can claim them back.</p>
<a href="https://skat.dk/en-us/individuals/the-annual-income-assessment/" target="_blank" rel="noopener">→ Guide to årsopgørelsen (SKAT official)</a>`,
da:`<p>Hvert år i <strong>marts</strong> offentliggør SKAT din <strong>årsopgørelse</strong> — den endelige skatteafregning for det foregående år. Den sammenligner, hvad du faktisk tjente og betalte, med dit estimat, og beregner om du skylder penge eller får en tilbagebetaling.</p>
<p><strong>Den gode nyhed:</strong> De fleste får penge tilbage. Danskere modtager i gennemsnit en tilbagebetaling på ca. 5.000–8.000 kr. om året.</p>
<p><strong>Typiske årsager til tilbagebetaling:</strong></p>
<ul>
  <li>Befordringsfradrag — hvis din daglige transport overstiger 24 km hver vej, kan du fratrække de overskydende kilometer</li>
  <li>Rentefradrag (renter på lån)</li>
  <li>Fagforeningskontingent</li>
  <li>A-kassebidrag</li>
  <li>Gaver til velgørende formål (op til 17.200 kr./år, 2025)</li>
</ul>
<p><strong>Sådan læser du din årsopgørelse:</strong></p>
<ul>
  <li>Grønt tal = tilbagebetaling (overføres automatisk til NemKonto i april)</li>
  <li>Rødt tal = du skylder SKAT penge (trækkes fra NemKonto, eller du kan betale manuelt)</li>
</ul>
<p>Du kan også indberette manglende fradrag manuelt på skat.dk op til 3 år tilbage. Mange nyankomne overser fradrag i første år og kan kræve dem tilbage.</p>
<a href="https://skat.dk/en-us/individuals/the-annual-income-assessment/" target="_blank" rel="noopener">→ Guide til årsopgørelsen (SKAT officiel)</a>` }
      },
      {
        icon: "📱",
        title: { en:"MobilePay — Denmark's Cashless Revolution", da:"MobilePay — Danmarks kontantløse revolution" },
        content: { en:`<p><strong>MobilePay</strong> is used by approximately 4.4 million Danes — that's nearly 75% of the entire population. If you don't have it, you cannot split bills at restaurants, pay at market stalls, pay for parking in many cities, or send money to Danish friends. It is not optional.</p>
<p><strong>How to get it:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Download MobilePay from the App Store or Google Play</li>
  <li><span class="step-num">2</span>Link your Danish phone number and Danish bank account</li>
  <li><span class="step-num">3</span>Verify with MitID</li>
</ol>
<p><strong>Costs (2025):</strong></p>
<ul>
  <li>Receiving money: free</li>
  <li>Sending money: free up to DKK 5,000/month; 1.75% above that (minimum DKK 1)</li>
  <li>Business payments: varies by merchant</li>
</ul>
<p><strong>You can also use MobilePay for:</strong> splitting rent with housemates, paying your babysitter, buying from Facebook Marketplace, car parking (MobilePay Parking), and donating to charities.</p>
<a href="https://mobilepay.dk/hjaelp/mobilepay-bruger" target="_blank" rel="noopener">→ MobilePay help (English available)</a>`,
da:`<p><strong>MobilePay</strong> bruges af ca. 4,4 millioner danskere — næsten 75% af hele befolkningen. Har du det ikke, kan du ikke dele regninger på restauranter, betale på markeder, betale parkering i mange byer eller sende penge til danske venner. Det er ikke valgfrit.</p>
<p><strong>Sådan får du det:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Download MobilePay fra App Store eller Google Play</li>
  <li><span class="step-num">2</span>Tilknyt dit danske telefonnummer og din danske bankkonto</li>
  <li><span class="step-num">3</span>Bekræft med MitID</li>
</ol>
<p><strong>Priser (2025):</strong></p>
<ul>
  <li>Modtage penge: gratis</li>
  <li>Sende penge: gratis op til 5.000 kr./måned; 1,75% derover (minimum 1 kr.)</li>
  <li>Betalinger til virksomheder: varierer pr. butik</li>
</ul>
<p><strong>Du kan også bruge MobilePay til:</strong> at dele husleje med bofæller, betale din babysitter, handle på Facebook Marketplace, parkering (MobilePay Parking) og donere til velgørende formål.</p>
<a href="https://mobilepay.dk/hjaelp/mobilepay-bruger" target="_blank" rel="noopener">→ MobilePay hjælp (engelsk tilgængeligt)</a>` }
      },
      {
        icon: "🏛️",
        title: { en:"Danish Pension — Three Pillars You Need to Understand", da:"Dansk pension — tre søjler du skal forstå" },
        content: { en:`<p>Danish pension is built on three distinct systems. Understanding all three affects your retirement significantly.</p>
<table class="info-table">
  <tr><th>Pillar</th><th>What is it</th><th>Who pays</th><th>Amount (2025)</th></tr>
  <tr><td><strong>Folkepension</strong></td><td>State pension, from age 67 (rising to 68 in 2030)</td><td>The state (funded by taxes)</td><td>~DKK 14,328/month (single, full)</td></tr>
  <tr><td><strong>ATP</strong></td><td>Mandatory supplementary pension, deducted automatically</td><td>Employee + employer</td><td>~DKK 94/month employee contribution</td></tr>
  <tr><td><strong>Arbejdsmarkedspension</strong></td><td>Employer occupational pension — the big one</td><td>Employer (typically 2/3) + employee (1/3)</td><td>Typically 12–17% of gross salary total</td></tr>
</table>
<p class="callout-warning"><strong>Important for newcomers:</strong> Your occupational pension belongs to you. If you leave Denmark, you can take it with you or leave it invested. But if you work here without joining a pension scheme (e.g. self-employed), you must arrange your own. Pension contributions are also tax-deductible.</p>
<p>You can see all your pension savings in one place at <a href="https://www.pensionsinfo.dk" target="_blank" rel="noopener">pensionsinfo.dk</a>.</p>`,
da:`<p>Dansk pension er bygget på tre forskellige systemer. At forstå alle tre har stor betydning for din pension.</p>
<table class="info-table">
  <tr><th>Søjle</th><th>Hvad er det</th><th>Hvem betaler</th><th>Beløb (2025)</th></tr>
  <tr><td><strong>Folkepension</strong></td><td>Statspension fra 67 år (stiger til 68 i 2030)</td><td>Staten (finansieret af skatter)</td><td>~14.328 kr./måned (enlig, fuld)</td></tr>
  <tr><td><strong>ATP</strong></td><td>Obligatorisk tillægspension, trækkes automatisk</td><td>Lønmodtager + arbejdsgiver</td><td>~94 kr./måned (lønmodtagerens bidrag)</td></tr>
  <tr><td><strong>Arbejdsmarkedspension</strong></td><td>Arbejdsgiverpension — den store</td><td>Arbejdsgiver (typisk 2/3) + medarbejder (1/3)</td><td>Typisk 12–17% af bruttoløn i alt</td></tr>
</table>
<p class="callout-warning"><strong>Vigtigt for nyankomne:</strong> Din arbejdsmarkedspension tilhører dig. Forlader du Danmark, kan du tage den med eller lade den forblive investeret. Arbejder du her uden at tilmelde dig en pensionsordning (f.eks. selvstændig), skal du selv arrangere det. Pensionsbidrag er fradragsberettigede.</p>
<p>Se alle dine pensionsopsparinger samlet på <a href="https://www.pensionsinfo.dk" target="_blank" rel="noopener">pensionsinfo.dk</a>.</p>` }
      },
      {
        icon: "🏦",
        title: { en:"Choosing a Danish Bank", da:"Valg af dansk bank" },
        content: { en:`<p>Most Danish banks require a CPR number to open a full account. Here's the honest comparison:</p>
<table class="info-table">
  <tr><th>Bank</th><th>English support</th><th>Monthly fee</th><th>Best for</th></tr>
  <tr><td><strong>Lunar</strong></td><td>100% English app</td><td>Free (basic) / 49 DKK (Plus)</td><td>Newcomers, digital-first, sometimes no CPR needed initially</td></tr>
  <tr><td><strong>Nordea</strong></td><td>Good English</td><td>~0–49 DKK</td><td>International transfers, established professionals</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>Good English</td><td>~0–79 DKK</td><td>Full service, widely accepted</td></tr>
  <tr><td><strong>Arbejdernes Landsbank</strong></td><td>Limited English</td><td>~40 DKK</td><td>Workers, union members</td></tr>
  <tr><td><strong>Wise (international)</strong></td><td>Full English</td><td>Free + low fees</td><td>International transfers while waiting for Danish account</td></tr>
</table>
<p>Open your account, then immediately go to <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> and register it as your NemKonto.</p>`,
da:`<p>De fleste danske banker kræver et CPR-nummer for at åbne en fuld konto. Her er den ærlige sammenligning:</p>
<table class="info-table">
  <tr><th>Bank</th><th>Engelsk support</th><th>Månedligt gebyr</th><th>Bedst til</th></tr>
  <tr><td><strong>Lunar</strong></td><td>100% engelsk app</td><td>Gratis (basis) / 49 kr. (Plus)</td><td>Nyankomne, digital-first, sommetider ikke CPR-krav indledningsvis</td></tr>
  <tr><td><strong>Nordea</strong></td><td>Godt engelsk</td><td>~0–49 kr.</td><td>Internationale overførsler, etablerede fagfolk</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>Godt engelsk</td><td>~0–79 kr.</td><td>Fuld service, bredt accepteret</td></tr>
  <tr><td><strong>Arbejdernes Landsbank</strong></td><td>Begrænset engelsk</td><td>~40 kr.</td><td>Arbejdere, fagforeningsmedlemmer</td></tr>
  <tr><td><strong>Wise (international)</strong></td><td>Fuldt engelsk</td><td>Gratis + lave gebyrer</td><td>Internationale overførsler mens du venter på dansk konto</td></tr>
</table>
<p>Åbn din konto, og gå straks til <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> for at registrere den som din NemKonto.</p>` }
      }
    ],
    checklist: [
      { id:"ch4_nemkonto", text:{ en:"Register your NemKonto at nemkonto.dk", da:"Registrér din NemKonto på nemkonto.dk" }, xp:40 },
      { id:"ch4_skattekort", text:{ en:"Get your skattekort from skat.dk (before first paycheck!)", da:"Hent dit skattekort fra skat.dk" }, xp:40 },
      { id:"ch4_mobilepay", text:{ en:"Download and activate MobilePay", da:"Download og aktiver MobilePay" }, xp:20 },
      { id:"ch4_bank", text:{ en:"Open a Danish bank account", da:"Åbn en dansk bankkonto" }, xp:30 },
      { id:"ch4_pension", text:{ en:"Confirm your employer pension scheme is active", da:"Bekræft at din arbejdsgiverpension er aktiv" }, xp:20 },
      { id:"ch4_aarsopg", text:{ en:"Check your årsopgørelse in March (and claim deductions!)", da:"Tjek din årsopgørelse i marts" }, xp:25 },
    ]
  },
  {
    id: 5, icon: "🏥", color: "#2E6DA4",
    title: { en:"Healthcare", fr:"Santé", ar:"الرعاية الصحية", es:"Salud", da:"Sundhed" },
    subtitle: { en:"Your Body in Denmark", fr:"Votre Corps au Danemark", ar:"جسدك في الدنمارك", es:"Tu Cuerpo en Dinamarca", da:"Din krop i Danmark" },
    intro: { en:"Denmark has one of the best healthcare systems in the world. It's free. Here's how to use it.", fr:"Le Danemark possède l'un des meilleurs systèmes de santé au monde. Il est gratuit.", ar:"الدنمارك لديها أحد أفضل أنظمة الرعاية الصحية في العالم. إنها مجانية.", es:"Dinamarca tiene uno de los mejores sistemas de salud del mundo. Es gratuito.", da:"Danmark har et af verdens bedste sundhedssystemer. Det er gratis." },
    readTime: "12 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "💛",
        title: { en:"The Yellow Card (Sundhedskort) — Your Healthcare Passport", da:"Det gule sygesikringskort — dit sundhedspas" },
        content: { en:`<p>Your <strong>sundhedskort</strong> (health insurance card) is the yellow plastic card that proves you're entitled to free Danish healthcare. It comes automatically in the mail, typically 2–4 weeks after your CPR number is issued.</p>
<p>It contains your CPR number, your name, and — critically — the name and address of <strong>your assigned GP (praktiserende læge)</strong>.</p>
<p class="callout-warning">Until you receive your sundhedskort, you are <strong>not covered</strong> by the Danish public health system. If you need a doctor before it arrives: visit an out-of-hours clinic (lægevagten), call 1813 for guidance, or see a private doctor and claim the cost back later via SKAT. Also check if your home country insurance covers the gap period.</p>
<p>If your card is lost or damaged: order a replacement at <a href="https://sundhedskort.dk" target="_blank" rel="noopener">sundhedskort.dk</a> using your MitID. A new one arrives within a week.</p>
<a href="https://www.sundhed.dk/borger/patienthaandbogen/sundhedssystemet/sygesikring/sygesikringsbevis/" target="_blank" rel="noopener">→ About the sundhedskort (sundhed.dk official)</a>`,
da:`<p>Dit <strong>sundhedskort</strong> (sygesikringsbevis) er det gule plastikkort, der beviser din ret til gratis dansk sundhedspleje. Det ankommer automatisk med posten, typisk 2–4 uger efter dit CPR-nummer er udstedt.</p>
<p>Det indeholder dit CPR-nummer, dit navn og — afgørende — navn og adresse på <strong>din praktiserende læge</strong>.</p>
<p class="callout-warning">Indtil du modtager dit sundhedskort, er du <strong>ikke dækket</strong> af det danske offentlige sundhedssystem. Har du brug for en læge, inden det ankommer: besøg en lægevagt, ring til 1813 for vejledning, eller se en privat læge og få udgifterne refunderet senere. Tjek også om dit hjemlands forsikring dækker overgangsperioden.</p>
<p>Er kortet tabt eller beskadiget: bestil et nyt på <a href="https://sundhedskort.dk" target="_blank" rel="noopener">sundhedskort.dk</a> med MitID. Et nyt ankommer inden for en uge.</p>
<a href="https://www.sundhed.dk/borger/patienthaandbogen/sundhedssystemet/sygesikring/sygesikringsbevis/" target="_blank" rel="noopener">→ Om sundhedskortet (sundhed.dk officiel)</a>` }
      },
      {
        icon: "👨‍⚕️",
        title: { en:"Registering with a GP (Din Praktiserende Læge)", da:"Tilmelding til praktiserende læge" },
        content: { en:`<p>Your GP (general practitioner) is the <strong>gatekeeper to the entire Danish health system</strong>. You do not go straight to a specialist — you always go via your GP first. This is not bureaucracy; it's a well-designed system that ensures you get the right care without wasting time.</p>
<p><strong>How to register with a GP:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Go to <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a> and click "Find a doctor"</li>
  <li><span class="step-num">2</span>Search by your postcode — you must register with a GP in your region</li>
  <li><span class="step-num">3</span>Check if the practice is accepting new patients (accepting = green "optaget" means full, "ledig" means available)</li>
  <li><span class="step-num">4</span>Contact the practice to register — either online or by phone</li>
</ol>
<p><strong>What your GP covers (all free with sundhedskort):</strong> consultations, referrals to specialists, prescriptions, blood tests, basic minor surgery, mental health referrals, vaccinations, and preventive care.</p>
<p><strong>Book appointments:</strong> via <strong>Min Læge app</strong>, by phone, or online through the practice website. Many GPs offer telephone/video consultations first. Wait time for a routine appointment: typically same day to 3 days.</p>
<p>If you can't find an available GP in your area, call your municipality's Borgerservice — they can help assign you to one.</p>`,
da:`<p>Din praktiserende læge er <strong>portvogtren til hele det danske sundhedssystem</strong>. Du går ikke direkte til en specialist — du går altid via din læge først. Det er ikke bureaukrati; det er et veldesignet system, der sikrer, at du får den rette behandling uden spildtid.</p>
<p><strong>Sådan tilmelder du dig en praktiserende læge:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Gå til <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a> og klik på "Find en læge"</li>
  <li><span class="step-num">2</span>Søg efter dit postnummer — du skal tilmelde dig en læge i din region</li>
  <li><span class="step-num">3</span>Tjek om klinikken modtager nye patienter ("optaget" = fuld, "ledig" = ledig)</li>
  <li><span class="step-num">4</span>Kontakt klinikken for tilmelding — enten online eller pr. telefon</li>
</ol>
<p><strong>Hvad din læge dækker (alt gratis med sundhedskort):</strong> konsultationer, henvisninger til specialister, recepter, blodprøver, mindre kirurgi, psykologhenvisninger, vaccinationer og forebyggende behandling.</p>
<p><strong>Book tider:</strong> via <strong>Min Læge-appen</strong>, pr. telefon eller online via klinikkens hjemmeside. Mange læger tilbyder telefon-/videokonsultationer. Ventetid ved rutinebesøg: typisk samme dag til 3 dage.</p>
<p>Kan du ikke finde en tilgængelig læge i dit område, skal du ringe til din kommunes Borgerservice — de kan hjælpe med at tildele dig en.</p>` }
      },
      {
        icon: "🚨",
        title: { en:"Urgent Care — 1813 vs 112: Know the Difference", da:"Akut hjælp — 1813 vs 112" },
        content: { en:`<p>This is one of the most important things to know in Denmark. The two numbers serve completely different purposes:</p>
<table class="info-table">
  <tr><th>Number</th><th>For</th><th>Response</th><th>When</th></tr>
  <tr><td><strong style="font-size:1.1rem">112</strong></td><td>Police, Fire Brigade, Ambulance</td><td>Immediate dispatch</td><td>Life-threatening emergencies ONLY</td></tr>
  <tr><td><strong style="font-size:1.1rem">1813</strong></td><td>Medical advice and urgent (non-emergency) care</td><td>Nurse or doctor by phone, then direction</td><td>Ill or injured but not life-threatening</td></tr>
</table>
<p><strong>1813</strong> is run by Region Hovedstaden (Copenhagen region). Outside of Copenhagen, call your local <strong>lægevagt</strong> (out-of-hours GP service). The number varies by region — check at <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a>.</p>
<p class="callout-warning">Calling 112 for a non-emergency wastes emergency resources and is socially strongly disapproved of in Denmark. Call 1813 first for anything that isn't immediately life-threatening. They will send an ambulance if you need one.</p>
<p><strong>Hospital emergency (skadestue):</strong> You can also walk into a hospital emergency department, but 1813 will often redirect you to a faster option.</p>`,
da:`<p>Dette er noget af det vigtigste at vide i Danmark. De to numre tjener helt forskellige formål:</p>
<table class="info-table">
  <tr><th>Nummer</th><th>Til</th><th>Respons</th><th>Hvornår</th></tr>
  <tr><td><strong style="font-size:1.1rem">112</strong></td><td>Politi, Brandvæsen, Ambulance</td><td>Øjeblikkelig udrykning</td><td>KUN livstruende nødsituationer</td></tr>
  <tr><td><strong style="font-size:1.1rem">1813</strong></td><td>Lægelig rådgivning og akut (ikke-livstruende) hjælp</td><td>Sygeplejerske eller læge pr. telefon, derefter vejledning</td><td>Syg eller skadet, men ikke livstruende</td></tr>
</table>
<p><strong>1813</strong> drives af Region Hovedstaden. Uden for København skal du ringe til din lokale <strong>lægevagt</strong>. Nummeret varierer pr. region — tjek på <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a>.</p>
<p class="callout-warning">At ringe til 112 for en ikke-akut situation spilder nødressourcer og er socialt stærkt misbilliget i Danmark. Ring til 1813 først for alt, der ikke er umiddelbart livstruende. De sender en ambulance, hvis du har brug for det.</p>
<p><strong>Skadestue:</strong> Du kan også møde op på en skadestue, men 1813 vil ofte henvise dig til en hurtigere løsning.</p>` }
      },
      {
        icon: "🦷",
        title: { en:"Dental Care — NOT Free (Plan and Budget for This)", da:"Tandpleje — IKKE gratis" },
        content: { en:`<p><strong>This surprises almost every newcomer:</strong> dental care in Denmark is NOT covered by the public health system for adults. You pay out of pocket, and Danish dental prices are high.</p>
<p><strong>Typical costs (2025 estimates):</strong></p>
<ul>
  <li>Routine checkup and cleaning: DKK 600–1,400</li>
  <li>Filling (composite): DKK 600–1,200 per tooth</li>
  <li>Root canal: DKK 3,000–7,000</li>
  <li>Crown: DKK 5,000–12,000</li>
  <li>Tooth extraction: DKK 600–1,500</li>
</ul>
<p><strong>What IS free:</strong> Dental care for children up to age 18. School dental examinations and treatment are included.</p>
<p><strong>How to reduce costs:</strong></p>
<ul>
  <li><strong>Sygeforsikring "danmark"</strong> (Group 1) refunds 40–60% of most dental costs — join at <a href="https://www.sygeforsikring.dk" target="_blank" rel="noopener">sygeforsikring.dk</a> for ~DKK 130–175/month</li>
  <li>Tandlægehøjskolen (dental schools) in Copenhagen and Aarhus offer treatments at ~50% of normal prices, performed by supervised students</li>
  <li>Some employer health insurance packages include dental</li>
</ul>
<p>Emergency dental pain: call <strong>70 11 31 31</strong> (out of hours)</p>`,
da:`<p><strong>Dette overrasker næsten alle nyankomne:</strong> tandpleje i Danmark er IKKE dækket af det offentlige sundhedssystem for voksne. Du betaler selv, og danske tandlægepriser er høje.</p>
<p><strong>Typiske priser (estimater 2025):</strong></p>
<ul>
  <li>Rutinekontrol og tandrensning: 600–1.400 kr.</li>
  <li>Fyldning (komposit): 600–1.200 kr. pr. tand</li>
  <li>Rodbehandling: 3.000–7.000 kr.</li>
  <li>Krone: 5.000–12.000 kr.</li>
  <li>Tandudtrækning: 600–1.500 kr.</li>
</ul>
<p><strong>Hvad er gratis:</strong> Tandpleje til børn op til 18 år. Skoleundersøgelser og -behandlinger er inkluderet.</p>
<p><strong>Sådan reducerer du udgifterne:</strong></p>
<ul>
  <li><strong>Sygeforsikring "danmark"</strong> (Gruppe 1) refunderer 40–60% af de fleste tandudgifter — tilmeld dig på <a href="https://www.sygeforsikring.dk" target="_blank" rel="noopener">sygeforsikring.dk</a> for ~130–175 kr./måned</li>
  <li>Tandlægehøjskoler i København og Aarhus tilbyder behandlinger til ~50% af normalpris, udført af overvågede studerende</li>
  <li>Nogle arbejdsgivers sundhedsforsikringer inkluderer tandpleje</li>
</ul>
<p>Akut tandpine: ring til <strong>70 11 31 31</strong> (uden for åbningstid)</p>` }
      },
      {
        icon: "🧠",
        title: { en:"Mental Health Services", da:"Psykisk sundhed og hjælp" },
        content: { en:`<p>Moving countries is one of the most psychologically challenging things a person can do. Denmark takes mental health seriously. Here's how the system works:</p>
<p><strong>Free via the public system:</strong></p>
<ul>
  <li><strong>Your GP</strong> is the first step — they can refer you to a psychologist (psykolog) if appropriate</li>
  <li>Subsidised psychology (ydernummer): with a GP referral for specified conditions, you pay ~DKK 400 per session; SKAT pays the rest</li>
  <li>Psychiatric treatment: fully free if referred by GP and severity warrants it</li>
</ul>
<p><strong>Crisis support (free, 24/7):</strong></p>
<ul>
  <li><strong>Livslinien:</strong> 70 201 201 — Danish-language mental health crisis line</li>
  <li><strong>Headspace Denmark:</strong> free counselling for young people (12–25)</li>
  <li><strong>Expat Counselling Copenhagen:</strong> English-language therapy, private, ~DKK 900–1,400/session</li>
</ul>
<p>Many expats find the adjustment to Danish social culture (reserved, indirect, hard to penetrate) genuinely difficult. This is normal, not a personal failure. Allow 1–2 years to build a real social network.</p>
<a href="https://www.sundhed.dk/borger/patienthaandbogen/psyke/" target="_blank" rel="noopener">→ Mental health resources (sundhed.dk)</a>`,
da:`<p>At flytte til et nyt land er en af de mest psykologisk udfordrende ting, et menneske kan gøre. Danmark tager psykisk sundhed alvorligt. Sådan fungerer systemet:</p>
<p><strong>Gratis via det offentlige system:</strong></p>
<ul>
  <li><strong>Din praktiserende læge</strong> er det første skridt — de kan henvise til en psykolog, hvis det er relevant</li>
  <li>Støttet psykologhjælp (ydernummer): med en læghenvisning ved bestemte tilstande betaler du ~400 kr. pr. session; SKAT betaler resten</li>
  <li>Psykiatrisk behandling: helt gratis ved læghenvisning, hvis sværhedsgraden berettiger det</li>
</ul>
<p><strong>Krisehjælp (gratis, døgnet rundt):</strong></p>
<ul>
  <li><strong>Livslinien:</strong> 70 201 201 — dansk kriselinje for psykisk sundhed</li>
  <li><strong>Headspace Danmark:</strong> gratis rådgivning til unge (12–25)</li>
  <li><strong>Expat Counselling Copenhagen:</strong> engelsksproget terapi, privat, ~900–1.400 kr./session</li>
</ul>
<p>Mange expats finder tilpasningen til dansk kultur (reserveret, indirekte, svær at trænge ind i) virkelig udfordrende. Det er normalt, ikke et personligt fejlgreb. Forvent 1–2 år på at opbygge et rigtigt socialt netværk.</p>
<a href="https://www.sundhed.dk/borger/patienthaandbogen/psyke/" target="_blank" rel="noopener">→ Ressourcer til psykisk sundhed (sundhed.dk)</a>` }
      },
      {
        icon: "🛡️",
        title: { en:"Sygeforsikring \"denmark\" — The One Insurance Worth Having", da:"Sygeforsikring \"danmark\" — den ene forsikring der er værd at have" },
        content: { en:`<p><strong>Sygeforsikring "denmark"</strong> is a non-profit mutual insurance fund that more than 2.3 million Danes belong to. For a small monthly fee, it refunds a portion of expenses the public system doesn't cover.</p>
<p><strong>What it covers (Group 1, ~DKK 130–175/month, 2025):</strong></p>
<ul>
  <li>Dental treatment: 40–60% refund on most procedures</li>
  <li>Glasses and contact lenses: DKK 400–800/year contribution</li>
  <li>Physiotherapy: partial refund</li>
  <li>Chiropractic treatment: partial refund</li>
  <li>Psychology (without GP referral): partial refund</li>
  <li>Medical aids and orthopaedic devices</li>
</ul>
<p class="callout-warning"><strong>Join within 6 months of arriving in Denmark</strong> — there is a waiting period rule, and joining early gives maximum benefit. The longer you wait, the more dental bills you pay before you're covered.</p>
<a href="https://www.sygeforsikring.dk/english" target="_blank" rel="noopener">→ Join Sygeforsikring "denmark" (English page)</a>`,
da:`<p><strong>Sygeforsikring "danmark"</strong> er en non-profit gensidig forsikringsfond med mere end 2,3 millioner medlemmer. For et lille månedligt beløb refunderer den en del af udgifter, det offentlige system ikke dækker.</p>
<p><strong>Hvad den dækker (Gruppe 1, ~130–175 kr./måned, 2025):</strong></p>
<ul>
  <li>Tandbehandling: 40–60% refusion på de fleste behandlinger</li>
  <li>Briller og kontaktlinser: 400–800 kr./år</li>
  <li>Fysioterapi: delvis refusion</li>
  <li>Kiropraktik: delvis refusion</li>
  <li>Psykologhjælp (uden læghenvisning): delvis refusion</li>
  <li>Hjælpemidler og ortopædiske hjælpemidler</li>
</ul>
<p class="callout-warning"><strong>Tilmeld dig inden for 6 måneder efter ankomst til Danmark</strong> — der er en karensregel, og tidlig tilmelding giver maksimal fordel. Jo længere du venter, jo flere tandlægeregninger betaler du selv.</p>
<a href="https://www.sygeforsikring.dk/english" target="_blank" rel="noopener">→ Tilmeld dig Sygeforsikring "danmark" (engelsk side)</a>` }
      }
    ],
    checklist: [
      { id:"ch5_gp", text:{ en:"Register with a GP at sundhed.dk", da:"Tilmeld dig en praktiserende læge via sundhed.dk" }, xp:40 },
      { id:"ch5_card", text:{ en:"Receive and check your yellow sundhedskort", da:"Modtag og tjek dit gule sygesikringskort" }, xp:25 },
      { id:"ch5_1813", text:{ en:"Save 1813 in your phone (urgent medical help)", da:"Gem 1813 i din telefon (akut lægehjælp)" }, xp:15 },
      { id:"ch5_dental", text:{ en:"Join Sygeforsikring \"denmark\" for dental coverage", da:"Tilmeld dig Sygeforsikring \"danmark\"" }, xp:25 },
      { id:"ch5_minlaege", text:{ en:"Download Min Læge app to book appointments", da:"Download Min Læge-appen" }, xp:15 },
      { id:"ch5_sundhed", text:{ en:"Create profile on sundhed.dk to access health records", da:"Opret profil på sundhed.dk" }, xp:20 },
    ]
  },
  {
    id: 6, icon: "👧", color: "#6A9E6A",
    title: { en:"Children & Family", fr:"Enfants et Famille", ar:"الأطفال والعائلة", es:"Niños y Familia", da:"Børn og Familie" },
    subtitle: { en:"Raising Little Vikings", fr:"Élever de Petits Vikings", ar:"تربية فايكنج صغار", es:"Criando Pequeños Vikingos", da:"At opdrage små vikinger" },
    intro: { en:"Denmark is arguably the best country in the world to raise children. Here's everything you need to know.", fr:"Le Danemark est sans doute le meilleur pays du monde pour élever des enfants.", ar:"الدنمارك هي على الأرجح أفضل دولة في العالم لتربية الأطفال.", es:"Dinamarca es posiblemente el mejor país del mundo para criar niños.", da:"Danmark er sandsynligvis verdens bedste land at opdrage børn i." },
    readTime: "16 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🍼",
        title: { en:"Parental Leave (Barsel) — 52 Weeks, Paid", da:"Barselsorlov — 52 uger, betalt" },
        content: { en:`<p>Denmark's parental leave system is one of the most generous in the world. The Barselslov was reformed on <strong>2 August 2022</strong> to give both parents equal and individual rights, with further updates in 2024.</p>
<p><strong>How leave is divided under the post-2022 model (per parent):</strong></p>
<table class="info-table">
  <tr><th>Block</th><th>Who</th><th>Duration</th><th>Transferable?</th></tr>
  <tr><td>Pregnancy leave</td><td>Birthing parent</td><td>4 weeks before birth</td><td>No</td></tr>
  <tr><td>Maternity leave</td><td>Birthing parent</td><td>2 weeks immediately after birth (mandatory)</td><td>No</td></tr>
  <tr><td>Paternity / co-parent leave</td><td>Other parent</td><td>2 weeks within the first 10 weeks</td><td>No</td></tr>
  <tr><td>Earmarked parental leave (øremærket)</td><td>Each parent</td><td><strong>11 weeks each</strong> — use them or lose them</td><td>No</td></tr>
  <tr><td>Transferable parental leave</td><td>Each parent</td><td><strong>13 weeks each</strong> — flexible</td><td>Yes — between parents</td></tr>
</table>
<p><strong>Payment:</strong> barselsdagpenge at a maximum rate of <strong>DKK 4,865 per week</strong> (2025) from Udbetaling Danmark. Many employers top this up to full salary — check your employment contract or collective agreement.</p>
<p><strong>Eligibility — the gotcha for newcomers:</strong> to receive barselsdagpenge from the state, you must have worked <strong>at least 160 hours in Denmark in the 4 months</strong> immediately before your leave starts. Newcomers who just arrived may not qualify yet — check with your kommune and Udbetaling Danmark before assuming.</p>
<p>Apply for barsel via your employer and through <a href="https://www.borger.dk/familie-og-boern/graviditet-og-foedsel/barsel" target="_blank" rel="noopener">borger.dk</a> at least 8 weeks before the expected birth.</p>
<a href="https://www.borger.dk/familie-og-boern/graviditet-og-foedsel/barsel" target="_blank" rel="noopener">→ Full parental leave guide (borger.dk official)</a>`,
da:`<p>Danmarks barselssystem er et af verdens mest generøse. Barselsloven blev reformeret den <strong>2. august 2022</strong> for at give begge forældre lige og individuelle rettigheder, med yderligere opdateringer i 2024.</p>
<p><strong>Fordeling af orlov under post-2022-modellen (pr. forælder):</strong></p>
<table class="info-table">
  <tr><th>Blok</th><th>Hvem</th><th>Varighed</th><th>Overførbar?</th></tr>
  <tr><td>Graviditetsorlov</td><td>Fødende forælder</td><td>4 uger før fødsel</td><td>Nej</td></tr>
  <tr><td>Barselsorlov</td><td>Fødende forælder</td><td>2 uger umiddelbart efter fødsel (obligatorisk)</td><td>Nej</td></tr>
  <tr><td>Fædreorlov / medforælder-orlov</td><td>Den anden forælder</td><td>2 uger inden for de første 10 uger</td><td>Nej</td></tr>
  <tr><td>Øremærket forældreorlov</td><td>Hver forælder</td><td><strong>11 uger hver</strong> — bruges eller mistes</td><td>Nej</td></tr>
  <tr><td>Overførbar forældreorlov</td><td>Hver forælder</td><td><strong>13 uger hver</strong> — fleksibelt</td><td>Ja — mellem forældre</td></tr>
</table>
<p><strong>Betaling:</strong> barselsdagpenge med en maksimal sats på <strong>4.865 kr. per uge</strong> (2025) fra Udbetaling Danmark. Mange arbejdsgivere topper op til fuld løn — tjek din ansættelseskontrakt.</p>
<p><strong>Berettigelse — fælden for nyankomne:</strong> for at modtage barselsdagpenge fra staten skal du have arbejdet <strong>mindst 160 timer i Danmark i de 4 måneder</strong> umiddelbart inden din orlov starter. Nyankomne er muligvis ikke berettiget endnu — tjek med din kommune og Udbetaling Danmark.</p>
<p>Ansøg om barsel via din arbejdsgiver og på <a href="https://www.borger.dk/familie-og-boern/graviditet-og-foedsel/barsel" target="_blank" rel="noopener">borger.dk</a> mindst 8 uger inden den forventede fødsel.</p>
<a href="https://www.borger.dk/familie-og-boern/graviditet-og-foedsel/barsel" target="_blank" rel="noopener">→ Komplet guide til barselsorlov (borger.dk officiel)</a>` }
      },
      {
        icon: "🏫",
        title: { en:"Childcare — Vuggestue, Børnehave & SFO", da:"Pasning — vuggestue, børnehave og SFO" },
        content: { en:`<p>Denmark's publicly subsidised childcare is world-class. The state covers the majority of costs — you pay a <strong>maximum of 25% of the actual cost</strong>.</p>
<table class="info-table">
  <tr><th>Type</th><th>Age</th><th>Max parental fee (2025)</th><th>Hours</th></tr>
  <tr><td><strong>Vuggestue</strong> (nursery)</td><td>6 months – 3 years</td><td>~DKK 3,756/month</td><td>Full day</td></tr>
  <tr><td><strong>Børnehave</strong> (kindergarten)</td><td>3 – 6 years</td><td>~DKK 2,226/month</td><td>Full day</td></tr>
  <tr><td><strong>SFO</strong> (after-school)</td><td>6 – 10 years</td><td>~DKK 1,400–2,200/month</td><td>After school + holidays</td></tr>
  <tr><td><strong>Dagpleje</strong> (childminder)</td><td>0 – 3 years</td><td>Similar to vuggestue</td><td>Smaller setting, home-based</td></tr>
</table>
<p><strong>Sibling discount:</strong> 50% reduction on the cheapest child's fee when you have two or more children in public care.</p>
<p><strong>Income-based reduction:</strong> Low-income families pay less. The maximum fee is the ceiling — you may qualify for a significantly reduced rate.</p>
<p class="callout-warning">Apply for childcare as soon as you have a CPR number — wait times in Copenhagen can be 3–9 months, particularly for vuggestue. Apply via your municipality's digital self-service portal.</p>
<a href="https://www.borger.dk/familie-og-boern/pasning-og-skole/pasning-og-lege-institutioner" target="_blank" rel="noopener">→ Childcare information (borger.dk)</a>`,
da:`<p>Danmarks offentligt støttede dagtilbud er i verdensklasse. Staten dækker størstedelen af udgifterne — du betaler <strong>maksimalt 25% af den faktiske pris</strong>.</p>
<table class="info-table">
  <tr><th>Type</th><th>Alder</th><th>Maks. forældrebetaling (2025)</th><th>Timer</th></tr>
  <tr><td><strong>Vuggestue</strong></td><td>6 måneder – 3 år</td><td>~3.756 kr./måned</td><td>Heldagspasning</td></tr>
  <tr><td><strong>Børnehave</strong></td><td>3 – 6 år</td><td>~2.226 kr./måned</td><td>Heldagspasning</td></tr>
  <tr><td><strong>SFO</strong></td><td>6 – 10 år</td><td>~1.400–2.200 kr./måned</td><td>Efter skole + ferier</td></tr>
  <tr><td><strong>Dagpleje</strong></td><td>0 – 3 år</td><td>Svarende til vuggestue</td><td>Hjemmebaseret, mindre gruppe</td></tr>
</table>
<p><strong>Søskenderabat:</strong> 50% reduktion på billigste barns takst, når du har to eller flere børn i offentlig pasning.</p>
<p><strong>Indkomstbaseret reduktion:</strong> Familier med lav indkomst betaler mindre. Maksimumtaksten er loftet — du kan kvalificere dig til en væsentligt reduceret sats.</p>
<p class="callout-warning">Søg om pasning, så snart du har et CPR-nummer — ventetider i København kan være 3–9 måneder, særligt for vuggestue. Ansøg via din kommunes selvbetjeningsportal.</p>
<a href="https://www.borger.dk/familie-og-boern/pasning-og-skole/pasning-og-lege-institutioner" target="_blank" rel="noopener">→ Information om pasning (borger.dk)</a>` }
      },
      {
        icon: "💰",
        title: { en:"Børnecheck — Child Benefit (You Don't Have to Apply)", da:"Børnecheck — børnetilskud (du skal ikke søge)" },
        content: { en:`<p><strong>Børnecheck</strong> (formally <em>børne- og ungeydelse</em>) is a tax-free payment from the state for every child under 18. The remarkable thing: <strong>you don't apply for it</strong>. It is paid automatically to your NemKonto once your child is registered with a CPR number — quarterly for under-15, monthly from 15.</p>
<p><strong>Rates (2025), per Skatteministeriet:</strong></p>
<table class="info-table">
  <tr><th>Child's age</th><th>Amount</th><th>Per year</th><th>Frequency</th></tr>
  <tr><td>0 – 2 years</td><td>DKK 5,292</td><td>DKK 21,168</td><td>Quarterly</td></tr>
  <tr><td>3 – 6 years</td><td>DKK 4,191</td><td>DKK 16,764</td><td>Quarterly</td></tr>
  <tr><td>7 – 14 years</td><td>DKK 3,297</td><td>DKK 13,188</td><td>Quarterly</td></tr>
  <tr><td>15 – 17 years</td><td>DKK 1,099</td><td>DKK 13,188</td><td>Monthly</td></tr>
</table>
<p>Quarterly payments arrive on the 20th of January, April, July, October. Monthly payments (15–17 yrs) arrive on the 20th of each month.</p>
<p class="callout-warning" style="background:rgba(232,160,32,0.08);border-left:4px solid var(--amber);padding:12px 14px;border-radius:8px;margin:14px 0;"><strong>⚠️ The 2-year rule that catches newcomers:</strong> Full børnecheck requires <strong>2 years of residence or employment in Denmark/EEA within the last 10 years</strong>. New arrivals receive a phased percentage:</p>
<table class="info-table">
  <tr><th>Time in DK/EEA</th><th>Payment %</th></tr>
  <tr><td>Less than 6 months</td><td>0%</td></tr>
  <tr><td>6 months – 1 year</td><td>25%</td></tr>
  <tr><td>1 – 1.5 years</td><td>50%</td></tr>
  <tr><td>1.5 – 2 years</td><td>75%</td></tr>
  <tr><td>2 years or more</td><td>100% (full amount)</td></tr>
</table>
<p>EU/EEA work counts towards this. Income from employment in Denmark also counts. Don't budget for the full amount until you've crossed the 2-year mark.</p>
<p>Your NemKonto must be set up for this to arrive. If you're new and haven't received it within 3 months of your child registering, check with Udbetaling Danmark.</p>
<a href="https://lifeindenmark.borger.dk/family-and-children/family-benefits/child-and-youth-benefits" target="_blank" rel="noopener">→ Child &amp; Youth benefits (lifeindenmark.borger.dk)</a>`,
da:`<p><strong>Børnecheck</strong> (formelt børne- og ungeydelse) er en skattefri betaling fra staten for hvert barn under 18 år. Det bemærkelsesværdige: <strong>du skal ikke søge om den</strong>. Den udbetales automatisk til din NemKonto, når dit barn er registreret med et CPR-nummer — kvartalsvis for under-15, månedligt fra 15 år.</p>
<p><strong>Satser (2025), pr. Skatteministeriet:</strong></p>
<table class="info-table">
  <tr><th>Barnets alder</th><th>Beløb</th><th>Per år</th><th>Hyppighed</th></tr>
  <tr><td>0 – 2 år</td><td>5.292 kr.</td><td>21.168 kr.</td><td>Kvartalsvis</td></tr>
  <tr><td>3 – 6 år</td><td>4.191 kr.</td><td>16.764 kr.</td><td>Kvartalsvis</td></tr>
  <tr><td>7 – 14 år</td><td>3.297 kr.</td><td>13.188 kr.</td><td>Kvartalsvis</td></tr>
  <tr><td>15 – 17 år</td><td>1.099 kr.</td><td>13.188 kr.</td><td>Månedligt</td></tr>
</table>
<p>Kvartalsvise udbetalinger ankommer den 20. januar, april, juli, oktober. Månedlige udbetalinger (15–17 år) ankommer den 20. i hver måned.</p>
<p class="callout-warning" style="background:rgba(232,160,32,0.08);border-left:4px solid var(--amber);padding:12px 14px;border-radius:8px;margin:14px 0;"><strong>⚠️ 2-årsreglen der fanger nyankomne:</strong> Fuld børnecheck kræver <strong>2 års bopæl eller beskæftigelse i Danmark/EØS inden for de seneste 10 år</strong>. Nyankomne modtager en trinvis procentdel:</p>
<table class="info-table">
  <tr><th>Tid i DK/EØS</th><th>Udbetaling %</th></tr>
  <tr><td>Under 6 måneder</td><td>0%</td></tr>
  <tr><td>6 måneder – 1 år</td><td>25%</td></tr>
  <tr><td>1 – 1,5 år</td><td>50%</td></tr>
  <tr><td>1,5 – 2 år</td><td>75%</td></tr>
  <tr><td>2 år eller mere</td><td>100% (fuldt beløb)</td></tr>
</table>
<p>EU/EØS-arbejde tæller med. Hav din NemKonto klar. Har du ikke modtaget det inden for 3 måneder efter dit barns registrering, kontakt Udbetaling Danmark.</p>
<a href="https://lifeindenmark.borger.dk/family-and-children/family-benefits/child-and-youth-benefits" target="_blank" rel="noopener">→ Børne- og ungeydelse (lifeindenmark.borger.dk)</a>` }
      },
      {
        icon: "🏫",
        title: { en:"The Folkeskole — Danish Public School System", da:"Folkeskolen — det danske skolesystem" },
        content: { en:`<p>The <strong>folkeskole</strong> is Denmark's public school system. It is free, includes school materials, and runs from class 0 (børnehaveklasse, age 6) through class 9 (age 15/16), with an optional 10th grade.</p>
<p><strong>Key facts about the folkeskole:</strong></p>
<ul>
  <li><strong>English</strong> is taught from 1st grade. Most children speak excellent English by class 5.</li>
  <li><strong>No uniforms.</strong> Danish schools emphasise wellbeing, creativity, and independent thinking over academic competition.</li>
  <li>Food is <strong>not provided</strong> at most schools — children bring packed lunches (madpakke).</li>
  <li><strong>Grading</strong> starts in class 8. Before that, learning is assessed through written feedback, not grades.</li>
  <li><strong>Class size:</strong> average 22–24 students</li>
</ul>
<p><strong>Enrol your child:</strong> Contact your local municipality's Børne- og Ungeforvaltning (Children and Youth Administration). EU children have the right to enrol in the local folkeskole. Enrolment is by address.</p>
<p>Many international children integrate well even with no Danish — Danish children are generally welcoming, and schools provide language support (modtageklasse) for newcomer children.</p>`,
da:`<p><strong>Folkeskolen</strong> er Danmarks offentlige skolesystem. Det er gratis, inkluderer undervisningsmaterialer og løber fra klasse 0 (børnehaveklasse, 6 år) til klasse 9 (15/16 år) med et valgfrit 10. skoleår.</p>
<p><strong>Vigtige fakta om folkeskolen:</strong></p>
<ul>
  <li><strong>Engelsk</strong> undervises fra 1. klasse. De fleste børn taler fremragende engelsk i 5. klasse.</li>
  <li><strong>Ingen uniformer.</strong> Danske skoler vægter trivsel, kreativitet og selvstændig tænkning over faglig konkurrence.</li>
  <li>Mad gives <strong>ikke</strong> på de fleste skoler — børn medbringer madpakke.</li>
  <li><strong>Karakterer</strong> starter i 8. klasse. Inden da bedømmes læring gennem skriftlig feedback.</li>
  <li><strong>Klassestørrelse:</strong> gennemsnitligt 22–24 elever</li>
</ul>
<p><strong>Indmeld dit barn:</strong> Kontakt din kommunes Børne- og Ungeforvaltning. EU-børn har ret til at indmeldes i den lokale folkeskole. Indmeldelse sker efter bopæl.</p>
<p>Mange internationale børn integrerer sig godt, selv uden dansk — danske børn er generelt imødekommende, og skolerne tilbyder sprogstøtte (modtageklasse) til nyankommende børn.</p>` }
      },
      {
        icon: "🌍",
        title: { en:"International Schools in Denmark", da:"Internationale skoler i Danmark" },
        content: { en:`<p>If you plan to leave Denmark within a few years, or prefer an English-curriculum education, international schools are a good option. They are private and fees apply.</p>
<table class="info-table">
  <tr><th>School</th><th>City</th><th>Curriculum</th><th>Annual fee (approx.)</th></tr>
  <tr><td><strong>Copenhagen International School (CIS)</strong></td><td>Copenhagen</td><td>IB (International Baccalaureate)</td><td>DKK 105,000–135,000</td></tr>
  <tr><td><strong>Rygaards School</strong></td><td>Hellerup, CPH</td><td>British / IB</td><td>DKK 85,000–105,000</td></tr>
  <tr><td><strong>Skals Efterskole</strong></td><td>Skals</td><td>Danish + English</td><td>DKK 30,000–60,000</td></tr>
  <tr><td><strong>Aarhus International School</strong></td><td>Aarhus</td><td>IB/Danish bilingual</td><td>DKK 80,000–110,000</td></tr>
</table>
<p>Many employers with international staff offer school fee assistance as part of relocation packages — ask your HR department before assuming you must pay alone.</p>`,
da:`<p>Planlægger du at forlade Danmark inden for få år, eller foretrækker du engelsksproget undervisning, er internationale skoler en god mulighed. De er private og opkræver skolepenge.</p>
<table class="info-table">
  <tr><th>Skole</th><th>By</th><th>Læseplan</th><th>Årlig skolepenge (ca.)</th></tr>
  <tr><td><strong>Copenhagen International School (CIS)</strong></td><td>København</td><td>IB (International Baccalaureate)</td><td>105.000–135.000 kr.</td></tr>
  <tr><td><strong>Rygaards School</strong></td><td>Hellerup, KBH</td><td>Britisk / IB</td><td>85.000–105.000 kr.</td></tr>
  <tr><td><strong>Skals Efterskole</strong></td><td>Skals</td><td>Dansk + engelsk</td><td>30.000–60.000 kr.</td></tr>
  <tr><td><strong>Aarhus International School</strong></td><td>Aarhus</td><td>IB/dansk tosproget</td><td>80.000–110.000 kr.</td></tr>
</table>
<p>Mange arbejdsgivere med internationalt personale tilbyder skolepenge som en del af relocation-pakken — spørg din HR-afdeling, inden du antager, at du skal betale alene.</p>` }
      }
    ],
    checklist: [
      { id:"ch6_barsel", text:{ en:"Apply for parental leave through employer and borger.dk", da:"Ansøg om barselsorlov via arbejdsgiver og borger.dk" }, xp:30 },
      { id:"ch6_childcare", text:{ en:"Apply for vuggestue / børnehave (do this early!)", da:"Søg om vuggestue / børnehave (gør dette tidligt!)" }, xp:35 },
      { id:"ch6_bornecheck", text:{ en:"Confirm børnecheck payments are reaching your NemKonto", da:"Bekræft at børnecheck udbetales til NemKonto" }, xp:20 },
      { id:"ch6_school", text:{ en:"Enrol children in local folkeskole or international school", da:"Indmeld børn i folkeskole eller international skole" }, xp:30 },
      { id:"ch6_sfo", text:{ en:"Register for SFO (after-school care) if needed", da:"Tilmeld til SFO hvis relevant" }, xp:15 },
    ]
  },
  {
    id: 7, icon: "🎓", color: "#2E6DA4",
    title: { en:"Education & University", fr:"Éducation et Université", ar:"التعليم والجامعة", es:"Educación y Universidad", da:"Uddannelse og Universitet" },
    subtitle: { en:"The Life of the Mind", fr:"La Vie de l'Esprit", ar:"حياة العقل", es:"La Vida Intelectual", da:"Åndens liv" },
    intro: { en:"Danish universities are world-class, tuition-free for EU students, and culturally unlike anything you've experienced.", fr:"Les universités danoises sont de classe mondiale et gratuites pour les étudiants UE.", ar:"الجامعات الدنماركية ذات مستوى عالمي ومجانية لطلاب الاتحاد الأوروبي.", es:"Las universidades danesas son de clase mundial y gratuitas para estudiantes UE.", da:"Danske universiteter er verdensklasse og gratis for EU-studerende." },
    readTime: "14 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🏛️",
        title: { en:"Danish Universities — Overview & Admission", da:"Danske universiteter — overblik og optagelse" },
        content: { en:`<p>Denmark has eight public universities and dozens of specialised institutions. All are well-funded and consistently rank among Europe's best.</p>
<table class="info-table">
  <tr><th>University</th><th>City</th><th>Known for</th><th>International ranking (approx.)</th></tr>
  <tr><td><strong>University of Copenhagen (KU)</strong></td><td>Copenhagen</td><td>Research, medicine, humanities, science</td><td>Top 100 globally</td></tr>
  <tr><td><strong>DTU</strong></td><td>Kongens Lyngby</td><td>Engineering, technology, sustainability</td><td>Top 150 globally</td></tr>
  <tr><td><strong>CBS</strong></td><td>Copenhagen</td><td>Business, management, economics</td><td>Top 50 in Europe for business</td></tr>
  <tr><td><strong>Aarhus University (AU)</strong></td><td>Aarhus</td><td>Research university, broad programs</td><td>Top 150 globally</td></tr>
  <tr><td><strong>SDU</strong></td><td>Odense (+ branches)</td><td>Health, engineering, humanities</td><td>Top 400 globally</td></tr>
  <tr><td><strong>AAU</strong></td><td>Aalborg</td><td>Problem-based learning, engineering</td><td>Top 400 globally</td></tr>
</table>
<p><strong>Apply via:</strong> <a href="https://www.optagelse.dk" target="_blank" rel="noopener">optagelse.dk</a> (for Danish programmes) or directly to universities for English-language master's programmes. Main application deadline for autumn intake is typically <strong>March 15 (coordinated)</strong> or <strong>May 15 (individual applications)</strong>.</p>`,
da:`<p>Danmark har otte offentlige universiteter og snesevis af specialiserede institutioner. Alle er velfinansierede og rangerer konsekvent blandt Europas bedste.</p>
<table class="info-table">
  <tr><th>Universitet</th><th>By</th><th>Kendt for</th><th>International rangering (ca.)</th></tr>
  <tr><td><strong>Københavns Universitet (KU)</strong></td><td>København</td><td>Forskning, medicin, humaniora, naturvidenskab</td><td>Top 100 globalt</td></tr>
  <tr><td><strong>DTU</strong></td><td>Kongens Lyngby</td><td>Ingeniørvidenskab, teknologi, bæredygtighed</td><td>Top 150 globalt</td></tr>
  <tr><td><strong>CBS</strong></td><td>København</td><td>Business, ledelse, økonomi</td><td>Top 50 i Europa for business</td></tr>
  <tr><td><strong>Aarhus Universitet (AU)</strong></td><td>Aarhus</td><td>Forskningsuniversitet, brede programmer</td><td>Top 150 globalt</td></tr>
  <tr><td><strong>SDU</strong></td><td>Odense (+ afdelinger)</td><td>Sundhed, ingeniørvidenskab, humaniora</td><td>Top 400 globalt</td></tr>
  <tr><td><strong>AAU</strong></td><td>Aalborg</td><td>Problembaseret læring, ingeniørvidenskab</td><td>Top 400 globalt</td></tr>
</table>
<p><strong>Ansøg via:</strong> <a href="https://www.optagelse.dk" target="_blank" rel="noopener">optagelse.dk</a> (til danske programmer) eller direkte til universiteterne for engelsksprogede kandidatprogrammer. Hovedansøgningsfrist for efterårsoptag er typisk <strong>15. marts (koordineret)</strong> eller <strong>15. maj (individuelle ansøgninger)</strong>.</p>` }
      },
      {
        icon: "💵",
        title: { en:"Tuition Fees & SU (State Education Support)", da:"Studieafgift og SU (statens uddannelsesstøtte)" },
        content: { en:`<p><strong>Tuition fees by citizenship:</strong></p>
<ul>
  <li><strong>EU/EEA/Nordic citizens:</strong> No tuition fees at public universities. All bachelor's and master's programmes are fully funded by the state.</li>
  <li><strong>Non-EU citizens:</strong> Tuition fees apply, typically DKK 50,000–130,000 per year depending on the institution and programme.</li>
</ul>
<p><strong>SU — Statens Uddannelsesstøtte (State Education Grant):</strong></p>
<p>SU is a monthly grant from the Danish state for students enrolled in recognised education. <strong>No repayment required</strong> (it's a grant, not a loan).</p>
<table class="info-table">
  <tr><th>Situation</th><th>Monthly SU (2025)</th></tr>
  <tr><td>Under 20, living at home</td><td>DKK 822</td></tr>
  <tr><td>Under 20, living independently</td><td>DKK 2,936</td></tr>
  <tr><td>Over 20, living independently (most students)</td><td>DKK 6,321</td></tr>
</table>
<p>Students can also apply for an <strong>SU loan</strong> of up to DKK 4,204/month on top of the grant, at a low interest rate.</p>
<p class="callout-warning">EU citizens working and paying taxes in Denmark are generally eligible for SU. Non-EU students are not eligible unless they have permanent residency or a special permit.</p>
<a href="https://www.su.dk/english/" target="_blank" rel="noopener">→ Apply for SU (official, English)</a>`,
da:`<p><strong>Studieafgift efter statsborgerskab:</strong></p>
<ul>
  <li><strong>EU/EØS/nordiske borgere:</strong> Ingen studieafgift på offentlige universiteter. Alle bachelor- og kandidatprogrammer er fuldt finansieret af staten.</li>
  <li><strong>Ikke-EU-borgere:</strong> Studieafgift gælder, typisk 50.000–130.000 kr./år afhængigt af institution og program.</li>
</ul>
<p><strong>SU — Statens Uddannelsesstøtte:</strong></p>
<p>SU er et månedligt tilskud fra den danske stat til studerende indskrevet på anerkendt uddannelse. <strong>Ingen tilbagebetaling kræves</strong> (det er et tilskud, ikke et lån).</p>
<table class="info-table">
  <tr><th>Situation</th><th>Månedlig SU (2025)</th></tr>
  <tr><td>Under 20, hjemmeboende</td><td>822 kr.</td></tr>
  <tr><td>Under 20, udeboende</td><td>2.936 kr.</td></tr>
  <tr><td>Over 20, udeboende (de fleste studerende)</td><td>6.321 kr.</td></tr>
</table>
<p>Studerende kan også søge om et <strong>SU-lån</strong> på op til 4.204 kr./måned oven i tilskuddet til lav rente.</p>
<p class="callout-warning">EU-borgere der arbejder og betaler skat i Danmark er generelt berettiget til SU. Ikke-EU-studerende er ikke berettiget, medmindre de har permanent opholdstilladelse eller en særlig tilladelse.</p>
<a href="https://www.su.dk/english/" target="_blank" rel="noopener">→ Ansøg om SU (officiel, engelsk)</a>` }
      },
      {
        icon: "🗣️",
        title: { en:"Free Danish Language Classes (Danskuddannelse)", da:"Gratis danskundervisning (Danskuddannelse)" },
        content: { en:`<p>Denmark offers free Danish language education to all residents with a CPR number who are not EU students (who must pay). This is a legal right — your employer or municipality must facilitate it.</p>
<p><strong>Three tracks based on educational background:</strong></p>
<ul>
  <li><strong>Danskuddannelse 1 (DU1):</strong> For people with little formal education. Leads to Prøve i Dansk 1 (PD1)</li>
  <li><strong>Danskuddannelse 2 (DU2):</strong> For people with some secondary education. Leads to PD2</li>
  <li><strong>Danskuddannelse 3 (DU3):</strong> For people with higher education (most professionals). Leads to Studieprøven (university entry level)</li>
</ul>
<p><strong>Duration:</strong> Up to 3 years (you have 5 years from when you first became eligible to use the right).</p>
<p><strong>How to start:</strong> Contact your municipality's integration department (integrationsafdelingen) or apply directly at a language school (sprogcenter) in your area.</p>
<p><strong>Test levels that matter for residency and citizenship:</strong> Permanent residency requires <strong>Prøve i Dansk 2 (PD2 ≈ B1)</strong>. Citizenship requires <strong>Prøve i Dansk 3 (PD3 ≈ B2)</strong>. University admission to Danish-language programmes typically requires <strong>Studieprøven (≈ C1)</strong>. (PD2 is officially mapped to B1 by the Ministry of Children and Education.)</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit/Language-requirement" target="_blank" rel="noopener">→ Language requirements for residency (nyidanmark.dk)</a>`,
da:`<p>Danmark tilbyder gratis danskundervisning til alle beboere med et CPR-nummer, der ikke er EU-studerende (som skal betale). Det er en juridisk rettighed — din arbejdsgiver eller kommune skal facilitere det.</p>
<p><strong>Tre spor baseret på uddannelsesbaggrund:</strong></p>
<ul>
  <li><strong>Danskuddannelse 1 (DU1):</strong> For mennesker med begrænset formel uddannelse. Fører til Prøve i Dansk 1 (PD1)</li>
  <li><strong>Danskuddannelse 2 (DU2):</strong> For mennesker med nogen gymnasial uddannelse. Fører til PD2</li>
  <li><strong>Danskuddannelse 3 (DU3):</strong> For mennesker med videregående uddannelse (de fleste fagfolk). Fører til Studieprøven (universitetsniveau)</li>
</ul>
<p><strong>Varighed:</strong> Op til 3 år (du har 5 år fra du første gang blev berettiget til at bruge retten).</p>
<p><strong>Sådan starter du:</strong> Kontakt din kommunes integrationsafdeling eller ansøg direkte på et sprogcenter i dit område.</p>
<p><strong>Testniveauer der tæller for ophold og statsborgerskab:</strong> Permanent ophold kræver <strong>Prøve i Dansk 2 (PD2 ≈ B1)</strong>. Statsborgerskab kræver <strong>Prøve i Dansk 3 (PD3 ≈ B2)</strong>. Universitetsoptagelse på dansksprogede programmer kræver typisk <strong>Studieprøven (≈ C1)</strong>.</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit/Language-requirement" target="_blank" rel="noopener">→ Sprogkrav til ophold (nyidanmark.dk)</a>` }
      },
      {
        icon: "🎒",
        title: { en:"Student Life — What's Different in Denmark", da:"Studieliv — hvad der er anderledes i Danmark" },
        content: { en:`<p>Danish university culture will feel different from most countries. Here's what to expect:</p>
<ul>
  <li><strong>No lectures without dialogue.</strong> Danish teaching culture is deeply Socratic. Professors expect questions, challenge, and debate. Sitting silently is odd — participation is part of the grade.</li>
  <li><strong>First-name basis.</strong> You address professors by first name. This is not rude — it's the norm.</li>
  <li><strong>Group work is dominant.</strong> Most courses involve substantial group projects. Danes are direct and constructive in groups.</li>
  <li><strong>Rustur / studenterhus:</strong> Every university has a student house and an intro camp (rustur) — go to both. This is how you make friends in Denmark.</li>
  <li><strong>Studiekort</strong> gives ~50% discount on all Danish public transport. Essential.</li>
  <li><strong>Kollegium (student housing):</strong> Apply as early as possible. Waiting lists can be 6–12 months. Apply at <a href="https://www.kollegierneskontor.dk" target="_blank" rel="noopener">kollegierneskontor.dk</a></li>
</ul>`,
da:`<p>Dansk universitetsliv vil føles anderledes end i de fleste lande. Det kan du forvente:</p>
<ul>
  <li><strong>Ingen forelæsninger uden dialog.</strong> Dansk undervisningskultur er dybt sokratisk. Professorer forventer spørgsmål, udfordringer og debat. At sidde tavst er mærkeligt — deltagelse tæller i karakteren.</li>
  <li><strong>Fornavn.</strong> Du tiltaler professorer ved fornavn. Det er ikke uhøfligt — det er normen.</li>
  <li><strong>Gruppearbejde dominerer.</strong> De fleste kurser indebærer store gruppeprojekter. Danskere er direkte og konstruktive i grupper.</li>
  <li><strong>Rustur / studenterhus:</strong> Hvert universitet har et studenterhus og et introlejr (rustur) — deltag i begge. Sådan får du venner i Danmark.</li>
  <li><strong>Studiekort</strong> giver ~50% rabat på al dansk offentlig transport. Uundværligt.</li>
  <li><strong>Kollegium:</strong> Ansøg så tidligt som muligt. Ventelister kan være 6–12 måneder. Ansøg på <a href="https://www.kollegierneskontor.dk" target="_blank" rel="noopener">kollegierneskontor.dk</a></li>
</ul>` }
      }
    ],
    checklist: [
      { id:"ch7_apply", text:{ en:"Submit university application at optagelse.dk", da:"Send ansøgning via optagelse.dk" }, xp:30 },
      { id:"ch7_su", text:{ en:"Apply for SU at su.dk (EU students eligible)", da:"Søg SU på su.dk" }, xp:35 },
      { id:"ch7_danish", text:{ en:"Enrol in free Danskuddannelse language classes", da:"Tilmeld dig gratis Danskuddannelse" }, xp:30 },
      { id:"ch7_kollegium", text:{ en:"Apply for student housing (kollegium) — do this early!", da:"Søg kollegium — gør dette tidligt!" }, xp:20 },
      { id:"ch7_studiekort", text:{ en:"Get student transport card (studiekort)", da:"Få studiekort til transport" }, xp:15 },
    ]
  },
  {
    id: 8, icon: "💼", color: "#C60C30",
    title: { en:"Employment", fr:"Emploi", ar:"التوظيف", es:"Empleo", da:"Beskæftigelse" },
    subtitle: { en:"The Danish Work World", fr:"Le Monde du Travail Danois", ar:"عالم العمل الدنماركي", es:"El Mundo Laboral Danés", da:"Den Danske Arbejdsverden" },
    intro: { en:"Danish work culture will surprise you. Flat hierarchy, 37-hour weeks, and a culture where leaving at 4pm is not just acceptable — it's expected.", fr:"La culture de travail danoise vous surprendra.", ar:"ثقافة العمل الدنماركية ستفاجئك.", es:"La cultura de trabajo danesa te sorprenderá.", da:"Dansk arbejdskultur vil overraske dig." },
    readTime: "18 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🛂",
        title: { en:"For non-EU readers — Which work-permit scheme applies to you?", da:"For ikke-EU-læsere — Hvilken arbejdstilladelse?" },
        content: { en:`<p>If you're a non-EU/EEA citizen, you can only work in Denmark with a residence-and-work permit. The five main routes:</p>
<table class="info-table">
  <tr><th>Scheme</th><th>Eligibility</th><th>Apply via</th></tr>
  <tr><td><strong>Pay Limit Scheme (Beløbsordningen)</strong></td><td>Job offer with salary above DKK <strong>514,000/yr (2025)</strong> · DKK 552,000/yr from 2026. Most flexible. Allows job-switching after 6 months.</td><td>Your employer applies via SIRI</td></tr>
  <tr><td><strong>Supplementary Pay Limit Scheme</strong></td><td>Lower threshold (DKK 415,000/yr in 2025; DKK 446,000 from 2026) but only for nationals of selected high-income countries with a labour-market need.</td><td>SIRI</td></tr>
  <tr><td><strong>Positive List (high education / labour shortage)</strong></td><td>Your profession appears on the <a href="https://www.nyidanmark.dk/en-GB/Words-and-concepts/SIRI/Positive-Lists/Positive-List-for-People-with-a-Higher-Education" target="_blank" rel="noopener">Positive List</a> (engineers, doctors, certain IT, nurses, etc.). No salary threshold beyond market wage.</td><td>SIRI</td></tr>
  <tr><td><strong>Fast-track Scheme</strong></td><td>Your employer is a SIRI-certified company. Approval in ~1 month vs 1–4 months. 4 sub-tracks: Pay Limit, Educational, Researcher, Short-term.</td><td>Certified employer applies</td></tr>
  <tr><td><strong>Researcher / Establishment Card</strong></td><td>For researchers and recent graduates from approved Danish universities seeking work after studies.</td><td>SIRI / your university</td></tr>
</table>
<p><strong>The single most useful site:</strong> <a href="https://www.workindenmark.dk" target="_blank" rel="noopener">workindenmark.dk</a> — Denmark's official portal for foreign job seekers, with vacancies, scheme details, and CV templates aligned to Danish norms.</p>
<p><strong>Watch out for authorisation-required roles.</strong> Several professions require Danish authorisation/registration before you can work in them legally — these include nurses (DR-godkendelse), doctors (Sundhedsstyrelsen), psychologists, social workers (socialrådgiver), kindergarten teachers (pædagog), schoolteachers, and some legal roles. Check with your professional body before applying for jobs.</p>`,
da:`<p>Er du ikke EU/EØS-borger, kan du kun arbejde i Danmark med en opholds- og arbejdstilladelse. De fem hovedveje:</p>
<table class="info-table">
  <tr><th>Ordning</th><th>Berettigelse</th><th>Ansøg via</th></tr>
  <tr><td><strong>Beløbsordningen</strong></td><td>Jobtilbud med løn over <strong>514.000 kr./år (2025)</strong> · 552.000 kr./år fra 2026. Mest fleksibel. Tillader jobskifte efter 6 måneder.</td><td>Din arbejdsgiver ansøger via SIRI</td></tr>
  <tr><td><strong>Supplerende beløbsordning</strong></td><td>Lavere tærskel (415.000 kr./år i 2025; 446.000 kr. fra 2026), men kun for statsborgere i udvalgte høj-indkomstlande med arbejdsmarkedsbehov.</td><td>SIRI</td></tr>
  <tr><td><strong>Positivlisten</strong></td><td>Dit erhverv fremgår af <a href="https://www.nyidanmark.dk/en-GB/Words-and-concepts/SIRI/Positive-Lists/Positive-List-for-People-with-a-Higher-Education" target="_blank" rel="noopener">Positivlisten</a> (ingeniører, læger, visse IT-profiler, sygeplejersker osv.). Ingen løngrænse ud over markedsløn.</td><td>SIRI</td></tr>
  <tr><td><strong>Greencard-ordningen (Fast-track)</strong></td><td>Din arbejdsgiver er SIRI-certificeret. Godkendelse på ~1 måned vs. 1–4 måneder. 4 spor: Beløb, Uddannelse, Forsker, Kortvarigt.</td><td>Certificeret arbejdsgiver ansøger</td></tr>
  <tr><td><strong>Forsker / Etableringsbevis</strong></td><td>For forskere og nyuddannede fra godkendte danske universiteter der søger arbejde efter studierne.</td><td>SIRI / dit universitet</td></tr>
</table>
<p><strong>Den mest nyttige side:</strong> <a href="https://www.workindenmark.dk" target="_blank" rel="noopener">workindenmark.dk</a> — Danmarks officielle portal for udenlandske jobsøgere, med stillingsopslag, ordningsdetaljer og CV-skabeloner.</p>
<p><strong>Pas på erhverv der kræver godkendelse.</strong> Flere erhverv kræver dansk autorisation/registrering, inden du lovligt kan arbejde — herunder sygeplejersker, læger, psykologer, socialrådgivere, pædagoger, lærere og visse juridiske roller. Tjek med dit faglige organ, inden du søger jobs.</p>` }
      },
      {
        icon: "🏢",
        title: { en:"Danish Work Culture — What No One Tells You", da:"Dansk arbejdskultur — hvad ingen fortæller dig" },
        content: { en:`<p>Danish workplaces operate very differently from most cultures. Understanding these norms will make you effective from day one:</p>
<ul>
  <li><strong>Flat hierarchy.</strong> Everyone — including the CEO — goes by first name. Formal titles are almost never used in conversation.</li>
  <li><strong>4pm is the end of the day.</strong> Danish work culture does not reward presenteeism. Leaving at 4pm (or earlier for parents) is normal and expected. Staying late to look dedicated is often viewed with suspicion — as if you're inefficient.</li>
  <li><strong>37-hour work week.</strong> This is the standard working week in Denmark, enforced by collective agreements (overenskomster). Very few professional jobs routinely exceed this.</li>
  <li><strong>Feedback is direct.</strong> Danes will tell you clearly what they think, including criticism. This is not aggression — it is respect. They assume you can handle honest feedback.</li>
  <li><strong>Consensus-based decisions.</strong> Meetings take longer in Denmark because everyone's input is genuinely considered. Once a decision is made, it sticks — because everyone was involved.</li>
  <li><strong>Frokost (lunch) matters.</strong> The shared lunch break at 12–1pm is a social institution. Eating alone at your desk is unusual and slightly antisocial.</li>
  <li><strong>Friday afternoons in summer:</strong> Many offices quietly wind down around 2pm on Fridays between June–August. No one announces this formally — you're expected to pick it up.</li>
</ul>`,
da:`<p>Danske arbejdspladser fungerer meget anderledes end i de fleste kulturer. At forstå disse normer gør dig effektiv fra dag ét:</p>
<ul>
  <li><strong>Flad hierarki.</strong> Alle — inklusive direktøren — er på fornavn. Formelle titler bruges næsten aldrig i samtaler.</li>
  <li><strong>16:00 er slutningen af dagen.</strong> Dansk arbejdskultur belønner ikke præsentisme. At gå kl. 16 (eller tidligere for forældre) er normalt og forventet. At blive sent for at virke dedikeret ses ofte med skepsis — som om du er ineffektiv.</li>
  <li><strong>37-timers arbejdsuge.</strong> Det er standardarbejdsugen i Danmark, håndhævet af overenskomster. Meget få faglige job overskrider jævnligt dette.</li>
  <li><strong>Feedback er direkte.</strong> Danskere fortæller dig klart, hvad de mener, inklusive kritik. Det er ikke aggression — det er respekt. De antager, at du kan håndtere ærlig feedback.</li>
  <li><strong>Konsensusbaserede beslutninger.</strong> Møder tager længere tid i Danmark, fordi alles input reelt overvejes. Når en beslutning er truffet, holder den — fordi alle var involveret.</li>
  <li><strong>Frokost betyder noget.</strong> Den fælles frokostpause kl. 12–13 er en social institution. At spise alene ved skrivebordet er usædvanligt og let asocialt.</li>
  <li><strong>Fredagseftermiddage om sommeren:</strong> Mange kontorer stilfærdigt skruer ned omkring kl. 14 om fredagen fra juni–august. Ingen annoncerer det formelt — du forventes at opfange det.</li>
</ul>` }
      },
      {
        icon: "⚖️",
        title: { en:"Your Rights as an Employee — What the Law Guarantees", da:"Dine rettigheder som lønmodtager" },
        content: { en:`<p>Denmark has no statutory minimum wage — wages are instead set by <strong>collective agreements (overenskomster)</strong> between unions and employer organisations. These cover approximately 84% of the workforce and are legally binding.</p>
<table class="info-table">
  <tr><th>Right</th><th>What you get</th><th>Source</th></tr>
  <tr><td><strong>Annual leave</strong></td><td>25 days (5 weeks) paid holiday per year</td><td>Ferieloven (Holiday Act)</td></tr>
  <tr><td><strong>Special days off (feriefridage)</strong></td><td>5–6 extra paid days (many agreements)</td><td>Collective agreements</td></tr>
  <tr><td><strong>Notice period</strong></td><td>1–6 months depending on seniority</td><td>Funktionærloven (for salaried employees)</td></tr>
  <tr><td><strong>Sick pay (sygedagpenge)</strong></td><td>Full pay during illness (employers pay first 30 days, state after)</td><td>Sygedagpengeloven</td></tr>
  <tr><td><strong>Pension</strong></td><td>Employer contributes ~8–12%, you contribute ~4–6%</td><td>Collective agreement / contract</td></tr>
  <tr><td><strong>Parental leave</strong></td><td>52 weeks with dagpenge</td><td>Barselloven</td></tr>
</table>
<p>If you have a dispute with your employer: contact your union (fagforening) first. If you're not in a union, contact <strong>Arbejdstilsynet</strong> (Danish Working Environment Authority) or a legal adviser.</p>
<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov" target="_blank" rel="noopener">→ Employment rights (borger.dk)</a>`,
da:`<p>Danmark har ingen lovbestemt mindsteløn — lønninger fastsættes i stedet af <strong>overenskomster</strong> mellem fagforeninger og arbejdsgiverorganisationer. Disse dækker ca. 84% af arbejdsstyrken og er juridisk bindende.</p>
<table class="info-table">
  <tr><th>Rettighed</th><th>Hvad du får</th><th>Kilde</th></tr>
  <tr><td><strong>Ferie</strong></td><td>25 dages (5 uger) betalt ferie pr. år</td><td>Ferieloven</td></tr>
  <tr><td><strong>Feriefridage</strong></td><td>5–6 ekstra betalte dage (mange overenskomster)</td><td>Overenskomster</td></tr>
  <tr><td><strong>Opsigelsesfrist</strong></td><td>1–6 måneder afhængigt af anciennitet</td><td>Funktionærloven</td></tr>
  <tr><td><strong>Sygedagpenge</strong></td><td>Fuld løn under sygdom (arbejdsgiver betaler de første 30 dage, derefter staten)</td><td>Sygedagpengeloven</td></tr>
  <tr><td><strong>Pension</strong></td><td>Arbejdsgiver bidrager ~8–12%, du bidrager ~4–6%</td><td>Overenskomst / kontrakt</td></tr>
  <tr><td><strong>Barselsorlov</strong></td><td>52 uger med barselsdagpenge</td><td>Barselsloven</td></tr>
</table>
<p>Har du en tvist med din arbejdsgiver: kontakt din fagforening først. Er du ikke i en fagforening, kontakt <strong>Arbejdstilsynet</strong> eller en juridisk rådgiver.</p>
<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov" target="_blank" rel="noopener">→ Lønmodtagerrettigheder (borger.dk)</a>` }
      },
      {
        icon: "💸",
        title: { en:"Understanding Your Danish Payslip (Lønseddel)", da:"Forstå din lønseddel" },
        content: { en:`<p>Your Danish payslip can be confusing at first. Here's what every line means:</p>
<table class="info-table">
  <tr><th>Line</th><th>What it is</th></tr>
  <tr><td><strong>Bruttoløn</strong></td><td>Your gross monthly salary — what you agreed in your contract</td></tr>
  <tr><td><strong>AM-bidrag (8%)</strong></td><td>Labour market contribution — deducted from gross before income tax is calculated</td></tr>
  <tr><td><strong>A-indkomst</strong></td><td>Gross after AM-bidrag — this is what income tax is calculated on</td></tr>
  <tr><td><strong>A-skat</strong></td><td>The actual income tax deducted (based on your trækprocent from skattekort)</td></tr>
  <tr><td><strong>Pension</strong></td><td>Your contribution to your occupational pension (typically 4–8% of gross)</td></tr>
  <tr><td><strong>ATP</strong></td><td>Mandatory small pension contribution, ~DKK 94/month</td></tr>
  <tr><td><strong>Nettoløn / Udbetalt</strong></td><td>What actually lands in your bank account</td></tr>
</table>
<p><strong>Quick check:</strong> On a DKK 40,000/month gross salary in Copenhagen, you should take home approximately DKK 26,000–28,000 net, depending on deductions. Use our <strong>Salary Calculator tool</strong> to model your exact situation.</p>`,
da:`<p>Din danske lønseddel kan være forvirrende i starten. Her er hvad hver linje betyder:</p>
<table class="info-table">
  <tr><th>Linje</th><th>Hvad det er</th></tr>
  <tr><td><strong>Bruttoløn</strong></td><td>Din månedlige bruttoløn — hvad du aftalte i din kontrakt</td></tr>
  <tr><td><strong>AM-bidrag (8%)</strong></td><td>Arbejdsmarkedsbidrag — trækkes fra bruttoløn inden indkomstskat beregnes</td></tr>
  <tr><td><strong>A-indkomst</strong></td><td>Bruttoløn efter AM-bidrag — det er dette, indkomstskatten beregnes af</td></tr>
  <tr><td><strong>A-skat</strong></td><td>Den faktiske indkomstskat (baseret på din trækprocent fra skattekort)</td></tr>
  <tr><td><strong>Pension</strong></td><td>Dit bidrag til din arbejdsmarkedspension (typisk 4–8% af bruttoløn)</td></tr>
  <tr><td><strong>ATP</strong></td><td>Obligatorisk lille pensionsbidrag, ~94 kr./måned</td></tr>
  <tr><td><strong>Nettoløn / Udbetalt</strong></td><td>Hvad der faktisk lander på din bankkonto</td></tr>
</table>
<p><strong>Hurtig kontrol:</strong> Med en bruttoløn på 40.000 kr./måned i København bør du netto modtage ca. 26.000–28.000 kr., afhængigt af fradrag. Brug vores <strong>Lommeregner</strong> til at beregne din præcise situation.</p>` }
      },
      {
        icon: "🛡️",
        title: { en:"A-kasse — Unemployment Insurance (Join Before You Need It)", da:"A-kasse — dagpengeforsikring (tilmeld dig inden du har brug for det)" },
        content: { en:`<p><strong>A-kasse</strong> (arbejdsløshedskasse) is Denmark's unemployment insurance system. It is <strong>voluntary, not automatic</strong> — you must join and pay contributions to receive benefits if you lose your job.</p>
<p><strong>Key facts (2025):</strong></p>
<ul>
  <li><strong>Maximum benefit:</strong> DKK 21,091/month (2025) — that's the cap. The "90% of salary" rule only applies up to this ceiling, so most full-time earners receive 50–60% of their previous pay, not 90%.</li>
  <li><strong>Duration:</strong> Up to 2 years of benefits within a 3-year period</li>
  <li><strong>Membership cost:</strong> Typically DKK 400–600/month depending on the a-kasse</li>
  <li><strong>Waiting period:</strong> You must be a member for at least 12 months AND have worked at least 1,924 hours in the last 3 years before you can claim</li>
  <li><strong>Tax deductible:</strong> Yes — a-kasse contributions are fully deductible from your taxable income</li>
</ul>
<p class="callout-warning"><strong>Join an a-kasse within your first month of employment.</strong> The 12-month waiting period means joining late is costly — if you lose your job after 11 months without a-kasse, you receive nothing from the system.</p>
<p>There are approximately 25 a-kasser. Most are sector-specific. Common ones for international professionals:</p>
<ul>
  <li><strong>CA a-kasse</strong> — for academics and graduates (ca.dk)</li>
  <li><strong>MA</strong> — for engineers and IT professionals</li>
  <li><strong>Krifa</strong> — non-sector-specific, English support</li>
  <li><strong>ASE</strong> — for self-employed and flexible workers</li>
</ul>
<a href="https://www.ase.dk/en" target="_blank" rel="noopener">→ ASE a-kasse (English)</a>`,
da:`<p><strong>A-kasse</strong> (arbejdsløshedskasse) er Danmarks dagpengesystem. Det er <strong>frivilligt, ikke automatisk</strong> — du skal tilmelde dig og betale bidrag for at modtage dagpenge, hvis du mister dit job.</p>
<p><strong>Nøglefakta (2025):</strong></p>
<ul>
  <li><strong>Maksimal ydelse:</strong> 21.091 kr./måned (2025) — det er loftet. "90%-reglen" gælder kun op til dette loft, så de fleste fuldtidsansatte modtager 50–60% af deres tidligere løn, ikke 90%.</li>
  <li><strong>Varighed:</strong> Op til 2 års dagpenge inden for en 3-årig periode</li>
  <li><strong>Medlemskabsomkostning:</strong> Typisk 400–600 kr./måned afhængigt af a-kassen</li>
  <li><strong>Karenstid:</strong> Du skal være medlem i mindst 12 måneder OG have arbejdet mindst 1.924 timer i de seneste 3 år, inden du kan søge dagpenge</li>
  <li><strong>Skattefradrag:</strong> Ja — a-kassebidrag er fuldt fradragsberettigede</li>
</ul>
<p class="callout-warning"><strong>Tilmeld dig en a-kasse inden for din første måned.</strong> Den 12-måneders karenstid betyder, at sen tilmelding er kostbar — mister du jobbet efter 11 måneder uden a-kasse, modtager du ingenting.</p>
<p>Der er ca. 25 a-kasser. De fleste er sektorspecifikke. Almindelige for internationale fagfolk:</p>
<ul>
  <li><strong>CA a-kasse</strong> — for akademikere og kandidater (ca.dk)</li>
  <li><strong>MA</strong> — for ingeniører og IT-fagfolk</li>
  <li><strong>Krifa</strong> — ikke-sektorspecifik, engelsk support</li>
  <li><strong>ASE</strong> — for selvstændige og fleksible arbejdere</li>
</ul>
<a href="https://www.ase.dk/en" target="_blank" rel="noopener">→ ASE a-kasse (engelsk)</a>` }
      },
      {
        icon: "🤝",
        title: { en:"Unions (Fagforeninger) — Worth the Dues", da:"Fagforeninger — pengene værd" },
        content: { en:`<p>Denmark has one of the world's highest union membership rates at approximately 67% of the workforce. Unions here are not primarily about strikes — they are about contract security, legal protection, and professional development.</p>
<p><strong>What a union gives you:</strong></p>
<ul>
  <li>Review of your employment contract before you sign</li>
  <li>Legal advice if you have a dispute with your employer</li>
  <li>Representation in salary negotiations</li>
  <li>Professional development opportunities</li>
  <li>Network within your sector</li>
</ul>
<p><strong>Cost:</strong> DKK 300–600/month (fully tax deductible)</p>
<p>Note: An a-kasse and a union are <strong>separate memberships</strong>. You should ideally have both. Many unions have agreements with specific a-kasser but they are independent organisations.</p>
<p>For international professionals: <strong>IDA</strong> (engineers/IT), <strong>Djøf</strong> (lawyers/economists/social scientists), <strong>HK</strong> (office workers), <strong>3F</strong> (unskilled workers) are the most common.</p>`,
da:`<p>Danmark har en af verdens højeste fagforeningsgrader med ca. 67% af arbejdsstyrken som membre. Fagforeninger handler her ikke primært om strejker — de handler om kontraktsikkerhed, juridisk beskyttelse og faglig udvikling.</p>
<p><strong>Hvad en fagforening giver dig:</strong></p>
<ul>
  <li>Gennemgang af din ansættelseskontrakt inden underskrift</li>
  <li>Juridisk rådgivning ved tvist med din arbejdsgiver</li>
  <li>Repræsentation i lønforhandlinger</li>
  <li>Muligheder for faglig udvikling</li>
  <li>Netværk inden for dit felt</li>
</ul>
<p><strong>Pris:</strong> 300–600 kr./måned (fuldt skattefradragsberettiget)</p>
<p>Bemærk: En a-kasse og en fagforening er <strong>separate medlemskaber</strong>. Du bør ideelt have begge. Mange fagforeninger har aftaler med specifikke a-kasser, men de er uafhængige organisationer.</p>
<p>For internationale fagfolk: <strong>IDA</strong> (ingeniører/IT), <strong>Djøf</strong> (jurister/økonomer/socialvidenskabsfolk), <strong>HK</strong> (kontormedarbejdere), <strong>3F</strong> (ufaglærte) er de mest almindelige.</p>` }
      },
      {
        icon: "🔍",
        title: { en:"Can You Work Before Your CPR Number Arrives?", da:"Kan du arbejde inden dit CPR-nummer ankommer?" },
        content: { en:`<p>This is one of the most common questions — and the answer depends on your citizenship:</p>
<p><strong>EU/EEA citizens:</strong> Yes. You have the right to work in Denmark immediately. You can start a job while your CPR registration is being processed. Your employer can file an emergency tax deduction. However, without a CPR number, your employer may default to the 55% emergency tax rate temporarily.</p>
<p><strong>Non-EU citizens with a work permit:</strong> You can work once your permit is approved and active. Some permit types allow work during processing — check your specific permit conditions at <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a>.</p>
<p><strong>Students:</strong> Student permit holders can work up to <strong>15 hours per week</strong> during term time, and full-time during June/July/August.</p>
<p class="callout-warning">Working without the right to work in Denmark is a serious violation that can result in deportation and a ban on future entry. If you're unsure about your status, contact <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a> before starting work.</p>`,
da:`<p>Det er et af de mest almindelige spørgsmål — og svaret afhænger af dit statsborgerskab:</p>
<p><strong>EU/EØS-borgere:</strong> Ja. Du har ret til at arbejde i Danmark med det samme. Du kan starte et job, mens din CPR-registrering behandles. Din arbejdsgiver kan indgive en nødskattenedsættelse. Uden CPR-nummer kan din arbejdsgiver dog midlertidigt bruge den 55% nødsatsats.</p>
<p><strong>Ikke-EU-borgere med arbejdstilladelse:</strong> Du kan arbejde, når din tilladelse er godkendt og aktiv. Nogle tilladelsestyper tillader arbejde under behandling — tjek dine specifikke betingelser på <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a>.</p>
<p><strong>Studerende:</strong> Indehavere af studietilladelse kan arbejde op til <strong>15 timer per uge</strong> i semestret og på fuld tid i juni/juli/august.</p>
<p class="callout-warning">At arbejde uden ret til at arbejde i Danmark er en alvorlig overtrædelse, der kan resultere i udvisning og indrejseforbud. Er du usikker på din status, kontakt <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a> inden du begynder at arbejde.</p>` }
      }
    ],
    checklist: [
      { id:"ch8_akasse", text:{ en:"Join an a-kasse within your first month (don't wait!)", da:"Tilmeld dig en a-kasse inden for din første måned!" }, xp:40 },
      { id:"ch8_union", text:{ en:"Consider joining a relevant union (fagforening)", da:"Overvej at melde dig ind i en relevant fagforening" }, xp:25 },
      { id:"ch8_contract", text:{ en:"Have your employment contract reviewed before signing", da:"Få din ansættelseskontrakt gennemgået inden underskrift" }, xp:30 },
      { id:"ch8_jobnet", text:{ en:"Register on Jobnet.dk (required for a-kasse benefits)", da:"Registrér dig på Jobnet.dk" }, xp:20 },
      { id:"ch8_payslip", text:{ en:"Understand your first payslip — check every line", da:"Forstå din første lønseddel" }, xp:15 },
      { id:"ch8_tax", text:{ en:"Confirm your skattekort is active with your employer", da:"Bekræft at dit skattekort er aktivt hos din arbejdsgiver" }, xp:30 },
    ]
  },
  {
    id: 9, icon: "🚀", color: "#E8A020",
    title: { en:"Startups & Business", fr:"Startups et Affaires", ar:"الشركات الناشئة والأعمال", es:"Startups y Negocios", da:"Startups og Erhverv" },
    subtitle: { en:"Building Something Here", fr:"Construire Quelque Chose Ici", ar:"بناء شيء هنا", es:"Construyendo Algo Aquí", da:"At bygge noget her" },
    intro: { en:"Denmark is secretly one of Europe's best places to start a company. Low bureaucracy, high trust, excellent talent.", fr:"Le Danemark est l'un des meilleurs endroits en Europe pour créer une entreprise.", ar:"الدنمارك سراً من أفضل الأماكن في أوروبا لبدء شركة.", es:"Dinamarca es en secreto uno de los mejores lugares de Europa para emprender.", da:"Danmark er hemmeligt et af Europas bedste steder at starte virksomhed." },
    readTime: "15 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🏢",
        title: { en:"Choosing Your Business Structure", da:"Valg af virksomhedsform" },
        content: { en:`<p>Denmark offers several business structures. The right choice depends on your liability tolerance and growth plans:</p>
<table class="info-table">
  <tr><th>Structure</th><th>Danish name</th><th>Min. capital</th><th>Liability</th><th>Best for</th></tr>
  <tr><td><strong>Sole proprietorship</strong></td><td>Enkeltmandsvirksomhed</td><td>None</td><td>Personal (unlimited)</td><td>Freelancers, consultants, sole traders</td></tr>
  <tr><td><strong>Private limited company</strong></td><td>Anpartsselskab (ApS)</td><td>DKK 20,000 (since 27 Feb 2025)</td><td>Limited to capital</td><td>Small companies, startups</td></tr>
  <tr><td><strong>Public limited company</strong></td><td>Aktieselskab (A/S)</td><td>DKK 400,000</td><td>Limited to capital</td><td>Larger companies, external investment</td></tr>
  <tr><td><strong>Partnership</strong></td><td>Interessentskab (I/S)</td><td>None</td><td>Joint personal</td><td>Two+ people, simple structures</td></tr>
</table>
<p>For most newcomers starting a business: an <strong>Enkeltmandsvirksomhed</strong> is free to register and can be set up in 10 minutes. An <strong>ApS</strong> gives liability protection and now requires only DKK 20,000 capital (reduced from DKK 40,000 on 27 Feb 2025) plus ~DKK 670 to register.</p>`,
da:`<p>Danmark tilbyder flere virksomhedsformer. Det rette valg afhænger af din risikovillighed og vækstplaner:</p>
<table class="info-table">
  <tr><th>Form</th><th>Dansk navn</th><th>Min. kapital</th><th>Hæftelse</th><th>Bedst til</th></tr>
  <tr><td><strong>Enkeltmandsvirksomhed</strong></td><td>Enkeltmandsvirksomhed</td><td>Ingen</td><td>Personlig (ubegrænset)</td><td>Freelancere, konsulenter, solohandlende</td></tr>
  <tr><td><strong>Anpartsselskab</strong></td><td>ApS</td><td>20.000 kr. (siden 27. feb. 2025)</td><td>Begrænset til kapital</td><td>Små virksomheder, startups</td></tr>
  <tr><td><strong>Aktieselskab</strong></td><td>A/S</td><td>400.000 kr.</td><td>Begrænset til kapital</td><td>Større virksomheder, ekstern investering</td></tr>
  <tr><td><strong>Interessentskab</strong></td><td>I/S</td><td>Ingen</td><td>Fælles personlig</td><td>To+ personer, enkle strukturer</td></tr>
</table>
<p>For de fleste nyankomne der starter virksomhed: en <strong>Enkeltmandsvirksomhed</strong> er gratis at registrere og kan oprettes på 10 minutter. Et <strong>ApS</strong> giver ansvarsbegrænsning og kræver nu kun 20.000 kr. kapital (reduceret fra 40.000 kr. pr. 27. feb. 2025) plus ~670 kr. at registrere.</p>` }
      },
      {
        icon: "📋",
        title: { en:"Registering Your Business — CVR Number", da:"Registrering af virksomhed — CVR-nummer" },
        content: { en:`<p>Every business in Denmark is registered with a unique <strong>CVR number</strong> (Central Business Register). This is your business's identity number — equivalent to a personal CPR number.</p>
<p><strong>Register at virk.dk (10 minutes, mostly free):</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Go to <a href="https://www.virk.dk" target="_blank" rel="noopener">virk.dk</a> and log in with MitID</li>
  <li><span class="step-num">2</span>Choose "Register ny virksomhed"</li>
  <li><span class="step-num">3</span>Select your business structure (enkeltmandsvirksomhed is free; ApS costs ~DKK 670)</li>
  <li><span class="step-num">4</span>Enter your business name, address, and industry code (branchekode)</li>
  <li><span class="step-num">5</span>Your CVR number is issued within 1–2 working days</li>
</ol>
<p><strong>VAT registration (momsregistrering):</strong> Mandatory once your annual turnover exceeds <strong>DKK 50,000</strong>. Danish VAT (moms) is 25% — one of the highest in the world, but largely passed on to consumers. Register at virk.dk at the same time or when you cross the threshold.</p>
<p class="callout-warning">You must be a legal resident in Denmark (have a CPR number and valid residence status) to register a Danish business. Non-EU founders on a tourist visa cannot legally operate a Danish company.</p>
<a href="https://virk.dk/myndigheder/erhvervsstyrelsen/selvbetjening" target="_blank" rel="noopener">→ Register your business at virk.dk</a>`,
da:`<p>Enhver virksomhed i Danmark registreres med et unikt <strong>CVR-nummer</strong> (Det Centrale Virksomhedsregister). Det er din virksomheds identitetsnummer — svarende til et personligt CPR-nummer.</p>
<p><strong>Registrér på virk.dk (10 minutter, næsten gratis):</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Gå til <a href="https://www.virk.dk" target="_blank" rel="noopener">virk.dk</a> og log ind med MitID</li>
  <li><span class="step-num">2</span>Vælg "Registrer ny virksomhed"</li>
  <li><span class="step-num">3</span>Vælg din virksomhedsform (enkeltmandsvirksomhed er gratis; ApS koster ~670 kr.)</li>
  <li><span class="step-num">4</span>Indtast virksomhedsnavn, adresse og branchekode</li>
  <li><span class="step-num">5</span>Dit CVR-nummer udstedes inden for 1–2 arbejdsdage</li>
</ol>
<p><strong>Momsregistrering:</strong> Obligatorisk, når din årlige omsætning overstiger <strong>50.000 kr.</strong>. Dansk moms er 25% — en af de højeste i verden, men overvæltes stort set på forbrugerne. Registrér på virk.dk samtidigt eller når du krydser tærsklen.</p>
<p class="callout-warning">Du skal være lovlig beboer i Danmark (have CPR-nummer og gyldig opholdsstatus) for at registrere en dansk virksomhed. Ikke-EU-grundlæggere på turistvisa kan ikke lovligt drive et dansk selskab.</p>
<a href="https://virk.dk/myndigheder/erhvervsstyrelsen/selvbetjening" target="_blank" rel="noopener">→ Registrér din virksomhed på virk.dk</a>` }
      },
      {
        icon: "💰",
        title: { en:"Tax for Self-Employed & Freelancers", da:"Skat for selvstændige og freelancere" },
        content: { en:`<p>As a self-employed person in Denmark, your tax situation is more complex than being an employee. Here's the essentials:</p>
<p><strong>Key taxes for self-employed (2025):</strong></p>
<ul>
  <li><strong>AM-bidrag:</strong> 8% on gross business income (deducted before income tax)</li>
  <li><strong>Income tax:</strong> Same rates as employees — personal allowance of DKK 51,600 (2025), then municipal + state tax</li>
  <li><strong>B-skat:</strong> Self-employed people pay tax in advance via <strong>B-skat</strong> — 10 monthly instalments through the year. Update your forskudsopgørelse at skat.dk to set the right amount.</li>
  <li><strong>Moms (VAT):</strong> 25% on all sales above DKK 50,000/year. File and pay quarterly via virk.dk.</li>
</ul>
<p><strong>Deductible business expenses:</strong> Equipment, software, home office (if used primarily for business), professional development, accounting fees, business travel, and more. Keep receipts for everything.</p>
<p>Consider using an accountant (revisor) for your first year — fees typically DKK 3,000–8,000/year but save you significantly in avoided mistakes and maximised deductions.</p>
<a href="https://skat.dk/en-us/business/starting-a-business/" target="_blank" rel="noopener">→ Starting a business — SKAT guide (English)</a>`,
da:`<p>Som selvstændig i Danmark er din skattesituation mere kompleks end som lønmodtager. Her er det væsentligste:</p>
<p><strong>Vigtigste skatter for selvstændige (2025):</strong></p>
<ul>
  <li><strong>AM-bidrag:</strong> 8% af bruttoindkomst fra virksomheden (trækkes inden indkomstskat)</li>
  <li><strong>Indkomstskat:</strong> Samme satser som lønmodtagere — personfradrag på 51.600 kr. (2025), derefter kommunal + statsskat</li>
  <li><strong>B-skat:</strong> Selvstændige betaler skat forud via <strong>B-skat</strong> — 10 månedlige rater over året. Opdater din forskudsopgørelse på skat.dk for at sætte det rette beløb.</li>
  <li><strong>Moms:</strong> 25% på alle salg over 50.000 kr./år. Indber og betal kvartalsvis via virk.dk.</li>
</ul>
<p><strong>Fradragsberettigede forretningsudgifter:</strong> Udstyr, software, hjemmekontor (hvis primært til erhverv), faglig udvikling, revisionsgebyrer, forretningsrejser m.m. Gem kvitteringer på alt.</p>
<p>Overvej at bruge en revisor i dit første år — gebyrer typisk 3.000–8.000 kr./år, men sparer dig for betydelige fejl og maksimerer fradrag.</p>
<a href="https://skat.dk/en-us/business/starting-a-business/" target="_blank" rel="noopener">→ Start af virksomhed — SKAT guide (engelsk)</a>` }
      },
      {
        icon: "🌐",
        title: { en:"Denmark's Startup Ecosystem", da:"Danmarks startup-økosystem" },
        content: { en:`<p>Copenhagen has quietly become one of Europe's strongest startup hubs, consistently ranking in the top 10 European startup cities.</p>
<p><strong>Key hubs and organisations:</strong></p>
<ul>
  <li><strong>The Hub Copenhagen</strong> — Denmark's largest tech startup community. Events, coworking, introductions. <a href="https://www.thehub.dk" target="_blank" rel="noopener">thehub.dk</a></li>
  <li><strong>Copenhagen Fintech</strong> — focus on financial technology</li>
  <li><strong>DTU Science Park</strong> — deep tech, research-based startups near Copenhagen</li>
  <li><strong>Symbion</strong> — Copenhagen startup incubator and coworking space</li>
  <li><strong>Accelerace</strong> — leading Nordic accelerator programme</li>
  <li><strong>Innovation Fund Denmark</strong> — public funding for R&D and innovation projects</li>
</ul>
<p><strong>Why Denmark is genuinely good for startups:</strong></p>
<ul>
  <li>High trust between businesses and government</li>
  <li>Well-educated, English-speaking talent pool</li>
  <li>Strong IP protection and rule of law</li>
  <li>Reasonable corporate tax rate (22% corporation tax)</li>
  <li>EU market access</li>
  <li>Work-life balance makes it easier to attract talent vs. burnout cultures</li>
</ul>`,
da:`<p>København er stille og roligt blevet et af Europas stærkeste startup-centre og rangerer konsekvent blandt de top 10 europæiske startup-byer.</p>
<p><strong>Centrale hubs og organisationer:</strong></p>
<ul>
  <li><strong>The Hub Copenhagen</strong> — Danmarks største tech-startup-community. Events, coworking, netværk. <a href="https://www.thehub.dk" target="_blank" rel="noopener">thehub.dk</a></li>
  <li><strong>Copenhagen Fintech</strong> — fokus på finansiel teknologi</li>
  <li><strong>DTU Science Park</strong> — deep tech og forskningsbaserede startups nær København</li>
  <li><strong>Symbion</strong> — Københavns startup-inkubator og coworking-space</li>
  <li><strong>Accelerace</strong> — ledende nordisk acceleratorprogram</li>
  <li><strong>Innovationsfonden</strong> — offentlig finansiering til R&D og innovationsprojekter</li>
</ul>
<p><strong>Derfor er Danmark reelt godt for startups:</strong></p>
<ul>
  <li>Høj tillid mellem virksomheder og myndigheder</li>
  <li>Veluddannet, engelsktalende talentpulje</li>
  <li>Stærk IP-beskyttelse og retsstat</li>
  <li>Rimelig selskabsskattesats (22% selskabsskat)</li>
  <li>Adgang til EU-markedet</li>
  <li>Work-life balance gør det lettere at tiltrække talenter frem for udbrændthedskulturer</li>
</ul>` }
      },
      {
        icon: "🛂",
        title: { en:"Startup Denmark Visa (Non-EU Founders)", da:"Startup Denmark-visa (ikke-EU-grundlæggere)" },
        content: { en:`<p>The <strong>Startup Denmark visa</strong> allows non-EU/EEA citizens to come to Denmark specifically to start a company. It requires a business plan assessment by a panel of experts.</p>
<p><strong>Requirements:</strong></p>
<ul>
  <li>An approved, innovative, and scalable business idea</li>
  <li>Sufficient funds to support yourself (typically DKK 130,000+ for the first year)</li>
  <li>Business plan submitted to Danish Business Authority (Erhvervsstyrelsen)</li>
</ul>
<p><strong>Duration:</strong> Initially 2 years, extendable.</p>
<p><strong>Processing time:</strong> Approximately 1–3 months after business plan approval.</p>
<p class="callout-warning">The visa requires genuine innovation — applications for standard retail, restaurants, or service businesses are typically rejected. The panel looks for scalable, international-potential businesses.</p>
<a href="https://www.startupdenmark.info" target="_blank" rel="noopener">→ Startup Denmark official programme</a>`,
da:`<p><strong>Startup Denmark-visum</strong> giver ikke-EU/EØS-borgere mulighed for at komme til Danmark specifikt for at starte en virksomhed. Det kræver en forretningsplansgennemgang af et ekspertpanel.</p>
<p><strong>Krav:</strong></p>
<ul>
  <li>En godkendt, innovativ og skalerbar forretningsidé</li>
  <li>Tilstrækkelige midler til at forsørge sig selv (typisk 130.000 kr.+ for det første år)</li>
  <li>Forretningsplan indsendt til Erhvervsstyrelsen</li>
</ul>
<p><strong>Varighed:</strong> Oprindeligt 2 år, kan forlænges.</p>
<p><strong>Behandlingstid:</strong> Ca. 1–3 måneder efter godkendelse af forretningsplan.</p>
<p class="callout-warning">Visumet kræver reel innovation — ansøgninger om standard detail, restauranter eller servicevirksomheder afvises typisk. Panelet søger skalerbare virksomheder med internationalt potentiale.</p>
<a href="https://www.startupdenmark.info" target="_blank" rel="noopener">→ Startup Denmark officielle program</a>` }
      }
    ],
    checklist: [
      { id:"ch9_structure", text:{ en:"Decide on business structure (enkeltmand vs ApS)", da:"Beslut virksomhedsform (enkeltmand vs ApS)" }, xp:20 },
      { id:"ch9_cvr", text:{ en:"Register at virk.dk and get CVR number", da:"Registrér på virk.dk og få CVR-nummer" }, xp:35 },
      { id:"ch9_moms", text:{ en:"Register for VAT (moms) when turnover exceeds 50,000 DKK", da:"Registrér til moms når omsætning overstiger 50.000 kr." }, xp:25 },
      { id:"ch9_bskat", text:{ en:"Set up B-skat payments at skat.dk", da:"Opsæt B-skat betalinger på skat.dk" }, xp:25 },
      { id:"ch9_hub", text:{ en:"Visit The Hub Copenhagen or local startup community", da:"Besøg The Hub Copenhagen eller lokalt startup-miljø" }, xp:15 },
    ]
  },
  {
    id: 10, icon: "🚲", color: "#6A9E6A",
    title: { en:"Transport", fr:"Transport", ar:"المواصلات", es:"Transporte", da:"Transport" },
    subtitle: { en:"Cycling or Standing in Line", fr:"Vélo ou File d'Attente", ar:"ركوب الدراجة أو الانتظار", es:"Bicicleta o Cola", da:"Cyklende eller i kø" },
    intro: { en:"Denmark runs on bicycles. Literally. Here's how to navigate a country where cycling is faster than driving.", fr:"Le Danemark fonctionne à vélo.", ar:"الدنمارك تعمل بالدراجات الهوائية.", es:"Dinamarca funciona en bicicleta.", da:"Danmark kører på cykel." },
    readTime: "10 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🚲",
        title: { en:"Cycling — The Danish Way to Get Around", da:"Cykling — den danske måde at komme rundt på" },
        content: { en:`<p>Denmark has more bicycles than people (approximately 4.2 million bikes for 5.9 million people). In Copenhagen, <strong>62% of residents cycle to work or education every day</strong> — including in winter, including in rain. This is not a hobby. It is infrastructure.</p>
<p><strong>Buying a bike:</strong></p>
<ul>
  <li><strong>New bike (cykelbutik):</strong> DKK 1,500–5,000 for a reliable commuter bike</li>
  <li><strong>Second-hand:</strong> Facebook Marketplace, DBA.dk, Loppemarked (flea markets) — DKK 300–1,500. Inspect carefully; stolen bikes are common.</li>
  <li><strong>Bike shops:</strong> Cykelexperten, Bike Brothers, Christiania Cykler for cargo bikes</li>
</ul>
<p><strong>Rules of the road (cyklister):</strong></p>
<ul>
  <li>Always ride in the cycle lane (cykelsti) where available — riding on the pavement is illegal</li>
  <li>Signal your turns with your arm</li>
  <li>Lights are legally mandatory after dark</li>
  <li>A bell (ringeklokke) is legally required</li>
  <li>Helmet is NOT legally required (but recommended for children)</li>
</ul>
<p>Fine for cycling without lights: DKK 700. Danes take cycling rules seriously.</p>`,
da:`<p>Danmark har flere cykler end mennesker (ca. 4,2 millioner cykler til 5,9 millioner mennesker). I København <strong>cykler 62% af beboerne til arbejde eller uddannelse hver dag</strong> — også om vinteren, også i regn. Det er ikke en hobby. Det er infrastruktur.</p>
<p><strong>Køb en cykel:</strong></p>
<ul>
  <li><strong>Ny cykel (cykelbutik):</strong> 1.500–5.000 kr. for en pålidelig pendlercykel</li>
  <li><strong>Brugt:</strong> Facebook Marketplace, DBA.dk, loppemarked — 300–1.500 kr. Undersøg grundigt; stjålne cykler er hyppige.</li>
  <li><strong>Cykelforhandlere:</strong> Cykelexperten, Bike Brothers, Christiania Cykler for ladcykler</li>
</ul>
<p><strong>Færdselsregler for cyklister:</strong></p>
<ul>
  <li>Kør altid i cykelstien, hvor den findes — det er ulovligt at cykle på fortovet</li>
  <li>Giv tegn med armen, når du drejer</li>
  <li>Lys er lovpligtigt efter mørkets frembrud</li>
  <li>En ringeklokke er lovpligtig</li>
  <li>Hjelm er IKKE lovpligtig (men anbefales til børn)</li>
</ul>
<p>Bøde for cykling uden lys: 700 kr. Danskerne tager cykelsikkerhed alvorligt.</p>` }
      },
      {
        icon: "🚌",
        title: { en:"Public Transport — Rejsekort and Zones", da:"Offentlig transport — Rejsekort og zoner" },
        content: { en:`<p>Danish public transport is excellent in cities and very good on intercity routes. It runs on a <strong>zone system</strong> — the more zones you cross, the more you pay.</p>
<p><strong>Rejsekort (travel card) — essential:</strong></p>
<ul>
  <li>Works on all buses, metro, S-tog (city trains), and regional trains</li>
  <li>Costs ~15–20% less per trip than buying single tickets</li>
  <li>Deposit: DKK 80 for the card + minimum DKK 70 to top up</li>
  <li>Buy at stations, 7-Eleven, or <a href="https://www.rejsekort.dk/en" target="_blank" rel="noopener">rejsekort.dk</a></li>
  <li>Always check in AND check out — failure to check out causes an overcharge</li>
</ul>
<p><strong>Monthly passes:</strong> If you commute the same route every day, a period card (periodekort) for specific zones is usually cheaper than using Rejsekort. Calculate at rejseplanen.dk.</p>
<p><strong>Copenhagen Metro:</strong> Runs 24/7, 365 days a year. Frequency: every 2–4 minutes in rush hour. Currently 4 lines (M1–M4).</p>
<p><strong>DSB trains:</strong> Intercity trains between Copenhagen, Odense, Aarhus, Aalborg. Book ahead online for significant savings, especially Offpeak tickets.</p>`,
da:`<p>Den offentlige transport i Danmark er fremragende i byerne og meget god på interbyforbindelserne. Den fungerer efter et <strong>zonesystem</strong> — jo flere zoner du krydser, jo mere betaler du.</p>
<p><strong>Rejsekort — uundværligt:</strong></p>
<ul>
  <li>Virker i alle busser, metro, S-tog og regionaltog</li>
  <li>Koster ca. 15–20% mindre pr. tur end enkelttbrilletter</li>
  <li>Depositum: 80 kr. for kortet + mindst 70 kr. til optankning</li>
  <li>Køb på stationer, 7-Eleven eller <a href="https://www.rejsekort.dk" target="_blank" rel="noopener">rejsekort.dk</a></li>
  <li>Tjek altid ind OG ud — glemmer du at tjekke ud, opkræves du for meget</li>
</ul>
<p><strong>Periodekort:</strong> Pendler du den samme rute hver dag, er et periodekort til bestemte zoner typisk billigere end Rejsekort. Beregn på rejseplanen.dk.</p>
<p><strong>Københavns Metro:</strong> Kører 24/7, 365 dage om året. Frekvens: hvert 2–4 minut i myldretiden. I øjeblikket 4 linjer (M1–M4).</p>
<p><strong>DSB-tog:</strong> Fjerntog mellem København, Odense, Aarhus og Aalborg. Book forud online for store besparelser, særligt Offpeak-billetter.</p>` }
      },
      {
        icon: "🚗",
        title: { en:"Cars and Driving in Denmark", da:"Biler og kørsel i Danmark" },
        content: { en:`<p>Denmark has some of the highest car purchase taxes in the world — <strong>registreringsafgift</strong> (registration tax) is up to 150% of the car's value. A car worth DKK 200,000 can easily cost DKK 400,000+ after tax. This is intentional policy to promote cycling and public transport.</p>
<p><strong>If you bring your own car from abroad:</strong></p>
<ul>
  <li>You must pay Danish registration tax if you become a permanent resident</li>
  <li>EU citizens: within 30 days of registering address</li>
  <li>Apply for registration at <a href="https://motorst.dk" target="_blank" rel="noopener">motorst.dk</a></li>
</ul>
<p><strong>Alternatives to owning a car:</strong></p>
<ul>
  <li><strong>GoMore</strong> — car sharing community (like Airbnb for cars)</li>
  <li><strong>Hertz DriveNow / Flinkster</strong> — minute-by-minute car rental in cities</li>
  <li><strong>DriveNow</strong> — electric car sharing in Copenhagen</li>
</ul>
<p>Speed limits: 50 km/h in built-up areas, 80 km/h on rural roads, 110/130 km/h on motorways. Speed cameras are frequent.</p>`,
da:`<p>Danmark har nogle af verdens højeste bilkøbsskatter — <strong>registreringsafgiften</strong> er op til 150% af bilens værdi. En bil til 200.000 kr. kan nemt koste 400.000 kr.+ efter afgift. Det er bevidst politik for at fremme cykling og offentlig transport.</p>
<p><strong>Hvis du tager din bil med fra udlandet:</strong></p>
<ul>
  <li>Du skal betale dansk registreringsafgift, hvis du bliver fastboende</li>
  <li>EU-borgere: inden for 30 dage efter adresseregistrering</li>
  <li>Ansøg om indregistrering på <a href="https://motorst.dk" target="_blank" rel="noopener">motorst.dk</a></li>
</ul>
<p><strong>Alternativer til at eje bil:</strong></p>
<ul>
  <li><strong>GoMore</strong> — bildelesfællesskab (ligesom Airbnb for biler)</li>
  <li><strong>Hertz DriveNow / Flinkster</strong> — minutbaseret biludlejning i byerne</li>
  <li><strong>DriveNow</strong> — elektrisk bildeling i København</li>
</ul>
<p>Hastighedsgrænser: 50 km/t i bymæssig bebyggelse, 80 km/t på landeveje, 110/130 km/t på motorveje. Der er mange fartkameraer.</p>` }
      }
    ],
    checklist: [
      { id:"ch10_bike", text:{ en:"Buy or borrow a bike (seriously, you need one)", da:"Køb eller lån en cykel (du har brug for en)" }, xp:25 },
      { id:"ch10_rejsekort", text:{ en:"Buy a Rejsekort for public transport", da:"Køb et Rejsekort til offentlig transport" }, xp:20 },
      { id:"ch10_lights", text:{ en:"Get front and rear bike lights (legally required)", da:"Sæt for- og baglys på cyklen (lovpligtigt)" }, xp:15 },
      { id:"ch10_driving", text:{ en:"Check driving licence conversion rules if applicable", da:"Tjek regler for konvertering af kørekort" }, xp:15 },
    ]
  },
  {
    id: 11, icon: "🗣️", color: "#B87333",
    title: { en:"Language", fr:"Langue", ar:"اللغة", es:"Idioma", da:"Sprog" },
    subtitle: { en:"Danish Is Impossible. Do It Anyway.", fr:"Le Danois Est Impossible. Faites-le Quand Même.", ar:"الدنماركية مستحيلة. افعلها على أي حال.", es:"El Danés Es Imposible. Hazlo de Todos Modos.", da:"Dansk er umuligt. Gør det alligevel." },
    intro: { en:"Danish pronunciation is uniquely difficult. Every Dane speaks English. Neither of these facts changes that learning Danish will transform your life here.", fr:"La prononciation danoise est particulièrement difficile. Chaque Danois parle anglais.", ar:"النطق الدنماركي صعب بشكل فريد. كل دنماركي يتكلم الإنجليزية.", es:"La pronunciación danesa es excepcionalmente difícil. Cada danés habla inglés.", da:"Dansk udtale er unikt svær. Alle danskere taler engelsk." },
    readTime: "12 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🎯",
        title: { en:"Why Learning Danish Matters (Even Though Everyone Speaks English)", da:"Hvorfor dansk er vigtigt (selvom alle taler engelsk)" },
        content: { en:`<p>The honest truth: you can live in Denmark for years speaking only English and be functionally fine. Most workplaces, especially in tech and international companies, operate in English. Doctors, banks, and government services often have English support.</p>
<p>But here's what happens when you don't learn Danish:</p>
<ul>
  <li>Danish colleagues switch to English for you — which subtly excludes you from casual conversation</li>
  <li>Social groups that form naturally (at frokost, after work, in sports clubs) stay partly closed</li>
  <li>You miss the quiet, important moments where belonging happens</li>
  <li>After 3–4 years, you may feel more like a visitor than a resident</li>
</ul>
<p>Learning Danish — even badly — signals something Danes deeply respect: that you're <em>trying</em> to become part of something. They will switch to English to help you, but they notice the effort and it opens doors nothing else does.</p>`,
da:`<p>Den ærlige sandhed: du kan bo i Danmark i årevis og kun tale engelsk og klare dig fint. De fleste arbejdspladser — særligt inden for tech og internationale virksomheder — fungerer på engelsk. Læger, banker og offentlige myndigheder har ofte engelsksprogede tilbud.</p>
<p>Men her er, hvad der sker, hvis du ikke lærer dansk:</p>
<ul>
  <li>Danske kolleger skifter til engelsk for din skyld — det udelukker dig stille fra dagligdags snak</li>
  <li>Sociale grupper, der dannes naturligt (til frokost, efter arbejde, i sportsklubber), forbliver delvist lukkede</li>
  <li>Du går glip af de stille, vigtige øjeblikke, hvor tilhørsforholdet opstår</li>
  <li>Efter 3–4 år kan du føle dig mere som gæst end som beboer</li>
</ul>
<p>At lære dansk — selv dårligt — signalerer noget, danskerne respekterer dybt: at du <em>prøver</em> at blive en del af noget. De skifter til engelsk for at hjælpe dig, men de lægger mærke til indsatsen, og det åbner døre, som intet andet kan.</p>` }
      },
      {
        icon: "📚",
        title: { en:"Free Danish Classes — Your Right as a Resident", da:"Gratis danskundervisning — din ret som beboer" },
        content: { en:`<p>If you are a non-EU resident with a CPR number, you have the legal right to free Danish language education (Danskuddannelse) for up to 3 years. EU citizens can access it at a subsidised cost.</p>
<p>The programme is managed by your municipality. Contact the <strong>International Community</strong> (ICS) office or your municipality's integration department to enrol.</p>
<p><strong>Language levels and what they unlock:</strong></p>
<table class="info-table">
  <tr><th>CEFR level</th><th>Danish test</th><th>Required for</th></tr>
  <tr><td>A1</td><td>PD1 (Prøve i Dansk 1)</td><td>—</td></tr>
  <tr><td>B1</td><td>PD2 (Prøve i Dansk 2)</td><td>Permanent residency</td></tr>
  <tr><td>B2</td><td>PD3 (Prøve i Dansk 3)</td><td>Citizenship + indfødsretsprøven</td></tr>
  <tr><td>C1</td><td>Studieprøven</td><td>University admission to Danish-language programmes</td></tr>
</table>
<p>Timeline reality: with 2–3 hours of class per day, most people reach A2 in 6–9 months, B2 in 2–3 years. It requires regular study outside class — passive attendance is not enough.</p>`,
da:`<p>Hvis du er ikke-EU-beboer med CPR-nummer, har du lovmæssig ret til gratis danskuddannelse i op til 3 år. EU-borgere kan deltage til en subsidieret pris.</p>
<p>Programmet administreres af din kommune. Kontakt <strong>International Community</strong> (ICS) eller kommunens integrationsafdeling for at tilmelde dig.</p>
<p><strong>Sproglige niveauer og hvad de giver adgang til:</strong></p>
<table class="info-table">
  <tr><th>CEFR-niveau</th><th>Dansk prøve</th><th>Krævet til</th></tr>
  <tr><td>A1</td><td>PD1 (Prøve i Dansk 1)</td><td>—</td></tr>
  <tr><td>B1</td><td>PD2 (Prøve i Dansk 2)</td><td>Permanent opholdstilladelse</td></tr>
  <tr><td>B2</td><td>PD3 (Prøve i Dansk 3)</td><td>Statsborgerskab + indfødsretsprøven</td></tr>
  <tr><td>C1</td><td>Studieprøven</td><td>Universitetsoptagelse til dansksprogede uddannelser</td></tr>
</table>
<p>Realistisk tidslinje: med 2–3 timers undervisning om dagen når de fleste A2 på 6–9 måneder, B2 på 2–3 år. Det kræver regelmæssig selvstudium uden for klassen — passiv deltagelse er ikke nok.</p>` }
      },
      {
        icon: "🔊",
        title: { en:"The Honest Guide to Danish Pronunciation", da:"Den ærlige guide til dansk udtale" },
        content: { en:`<p>Danish has earned its reputation for difficulty. Here's what makes it genuinely hard:</p>
<ul>
  <li><strong>Stød (glottal stop):</strong> A subtle throat-catch that changes word meaning. There's no equivalent in most languages. You can hear it; producing it takes months.</li>
  <li><strong>Swallowed syllables:</strong> Danes drop the ends of many words in natural speech. "Hvad hedder du?" sounds approximately like "va hehh du?" to untrained ears.</li>
  <li><strong>Soft D (blødt D):</strong> Sounds somewhere between an English "l" and "th" — like the sound in "the" but with your tongue further back. Completely foreign to most learners.</li>
  <li><strong>Long/short vowel distinction:</strong> The same word spelt differently in length can mean completely different things.</li>
</ul>
<p><strong>Fastest path to real pronunciation:</strong></p>
<ul>
  <li>Watch Danish TV with Danish subtitles (not English) — <strong>DR.dk</strong> and <strong>TV2 Play</strong> have free content</li>
  <li><strong>Podcast: Slow Danish</strong> — real speech at learner speed</li>
  <li>Talk to Danes in Danish — they will correct you gently and help</li>
  <li>Sing along to Danish songs — the rhythm embeds pronunciation patterns</li>
</ul>`,
da:`<p>Dansk har fortjent sit ry for vanskelighed. Her er, hvad der gør det genuint svært:</p>
<ul>
  <li><strong>Stød (glottalt stop):</strong> Et subtilt strubeknæk, der ændrer ordets betydning. Der findes ikke noget tilsvarende i de fleste sprog. Du kan høre det; at producere det tager måneder.</li>
  <li><strong>Slugte stavelser:</strong> Danskere udelader endelserne på mange ord i naturlig tale. "Hvad hedder du?" lyder ca. som "va hehh du?" for utrænede ører.</li>
  <li><strong>Blødt D:</strong> Lyder et sted mellem et engelsk "l" og "th" — som lyden i "the", men med tungen lidt længere tilbage. Fuldstændig fremmed for de fleste elever.</li>
  <li><strong>Lang/kort vokalforkel:</strong> Det samme ord stavet med forskellig vokalllængde kan betyde noget helt andet.</li>
</ul>
<p><strong>Hurtigste vej til ægte udtale:</strong></p>
<ul>
  <li>Se dansk TV med danske undertekster (ikke engelske) — <strong>DR.dk</strong> og <strong>TV2 Play</strong> har gratis indhold</li>
  <li><strong>Podcast: Slow Danish</strong> — ægte tale i lærerhastighed</li>
  <li>Tal med danskere på dansk — de retter dig venligt og hjælper</li>
  <li>Syng med på danske sange — rytmen indlejrer udtalemønstre</li>
</ul>` }
      },
      {
        icon: "📱",
        title: { en:"Best Apps and Resources for Learning Danish", da:"Bedste apps og ressourcer til at lære dansk" },
        content: { en:`<div class="app-grid">
  <div class="app-card"><div class="app-card-icon">🎧</div><div class="app-card-name">Glossika</div><div class="app-card-desc">Best for pronunciation and sentence patterns. Spaced repetition. Worth paying for.</div><div class="app-card-lang">Paid</div></div>
  <div class="app-card"><div class="app-card-icon">📱</div><div class="app-card-name">Babbel</div><div class="app-card-desc">Structured lessons, better than Duolingo for Danish grammar depth.</div><div class="app-card-lang">Paid</div></div>
  <div class="app-card"><div class="app-card-icon">🦉</div><div class="app-card-name">Duolingo</div><div class="app-card-desc">Good for beginner vocabulary and building habits. Not sufficient alone.</div><div class="app-card-lang">Free/Paid</div></div>
  <div class="app-card"><div class="app-card-icon">📖</div><div class="app-card-name">Ordbogen</div><div class="app-card-desc">Best Danish dictionary app. Also has phrases and grammar explanations.</div><div class="app-card-lang">Free</div></div>
  <div class="app-card"><div class="app-card-icon">🎬</div><div class="app-card-name">DR.dk</div><div class="app-card-desc">Free Danish TV with Danish subtitles. Watch the news, watch dramas.</div><div class="app-card-lang">Free</div></div>
  <div class="app-card"><div class="app-card-icon">🎙️</div><div class="app-card-name">Slow Danish Podcast</div><div class="app-card-desc">Real Danish slowed down. Transcripts included. Perfect for intermediates.</div><div class="app-card-lang">Free</div></div>
</div>`,
da:`<div class="app-grid">
  <div class="app-card"><div class="app-card-icon">🎧</div><div class="app-card-name">Glossika</div><div class="app-card-desc">Bedst til udtale og sætningsstrukturer. Afstandsgentagelse. Pengene værd.</div><div class="app-card-lang">Betalt</div></div>
  <div class="app-card"><div class="app-card-icon">📱</div><div class="app-card-name">Babbel</div><div class="app-card-desc">Strukturerede lektioner, bedre end Duolingo til dansk grammatik.</div><div class="app-card-lang">Betalt</div></div>
  <div class="app-card"><div class="app-card-icon">🦉</div><div class="app-card-name">Duolingo</div><div class="app-card-desc">God til begyndervokabular og at opbygge vaner. Ikke tilstrækkeligt alene.</div><div class="app-card-lang">Gratis/Betalt</div></div>
  <div class="app-card"><div class="app-card-icon">📖</div><div class="app-card-name">Ordbogen</div><div class="app-card-desc">Bedste danske ordbogs-app. Har også fraser og grammatikforklaringer.</div><div class="app-card-lang">Gratis</div></div>
  <div class="app-card"><div class="app-card-icon">🎬</div><div class="app-card-name">DR.dk</div><div class="app-card-desc">Gratis dansk TV med danske undertekster. Se nyheder og dramaserier.</div><div class="app-card-lang">Gratis</div></div>
  <div class="app-card"><div class="app-card-icon">🎙️</div><div class="app-card-name">Slow Danish Podcast</div><div class="app-card-desc">Ægte dansk i nedsat tempo. Inkl. transskriptioner. Perfekt til øvede begyndere.</div><div class="app-card-lang">Gratis</div></div>
</div>` }
      }
    ],
    checklist: [
      { id:"ch11_enrol", text:{ en:"Enrol in Danskuddannelse at your municipality", da:"Tilmeld dig Danskuddannelse i din kommune" }, xp:30 },
      { id:"ch11_app", text:{ en:"Download Babbel or Glossika and start daily practice", da:"Download Babbel eller Glossika og start daglig øvelse" }, xp:20 },
      { id:"ch11_dr", text:{ en:"Watch one Danish TV show on DR.dk with Danish subtitles", da:"Se et dansk TV-program på DR.dk med danske undertekster" }, xp:15 },
      { id:"ch11_pd1", text:{ en:"Book your first Danish language test (PD1 or PD2)", da:"Book din første danskprøve (PD1 eller PD2)" }, xp:25 },
    ]
  },
  {
    id: 12, icon: "🧊", color: "#2E6DA4",
    title: { en:"Culture & Social Life", fr:"Culture et Vie Sociale", ar:"الثقافة والحياة الاجتماعية", es:"Cultura y Vida Social", da:"Kultur og Socialt Liv" },
    subtitle: { en:"Becoming Part of Something", fr:"Devenir Partie de Quelque Chose", ar:"أن تصبح جزءاً من شيء ما", es:"Ser Parte de Algo", da:"At blive en del af noget" },
    intro: { en:"Hygge, Janteloven, the 4pm finish — Danish culture is full of invisible rules that make all the difference once you understand them.", fr:"Hygge, Janteloven, la fin à 16h — la culture danoise est pleine de règles invisibles.", ar:"هيغا وقانون يانتيلوفن ونهاية العمل الساعة 4 — الثقافة الدنماركية مليئة بقواعد غير مرئية تحدث فرقاً كبيراً.", es:"Hygge, Janteloven, el fin a las 4pm — la cultura danesa está llena de reglas invisibles que marcan la diferencia.", da:"Hygge, Janteloven, fyraften kl. 16 — dansk kultur er fuld af usynlige regler, der gør hele forskellen." },
    readTime: "16 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🕯️",
        title: { en:"Hygge — What It Actually Means (It's Not Just Candles)", fr:"Hygge — Ce que ça signifie vraiment (pas seulement des bougies)", ar:"هيغا — ما يعنيه حقاً (ليس مجرد شمع)", es:"Hygge — Lo que realmente significa (no son solo velas)", da:"Hygge — hvad det egentlig betyder (det handler ikke kun om lys)" },
        content: { en:`<p><strong>Hygge</strong> (pronounced roughly "hoo-ga") is a Danish concept with no direct English translation. It describes a quality of presence — a cosy, convivial atmosphere where people feel safe, relaxed, and connected. It is both a noun and an adjective: you can have hygge, or something can be hyggeligt.</p>
<p><strong>What hygge looks like in practice:</strong></p>
<ul>
  <li>A dinner party where phones stay on silent and no one rushes to leave</li>
  <li>Friday afternoon at the office with cake and coffee (fredagskage)</li>
  <li>A rainy Sunday with thick socks, candles lit, and nowhere to be</li>
  <li>Playing board games with neighbours you've known for three years</li>
</ul>
<p><strong>What hygge is not:</strong></p>
<ul>
  <li>It is not performative. Danes will immediately notice if you are trying too hard to create it.</li>
  <li>It is not expensive. The Danes with the most hygge in their lives are often the ones doing the simplest things.</li>
  <li>It is not passive — it requires presence and genuine engagement with the people around you.</li>
</ul>
<p class="callout-info"><strong>For newcomers:</strong> The fastest way to understand hygge is to be invited to a Danish home for dinner and arrive on time, put your phone away, and stay until the host signals the evening is ending. You will feel it.</p>
<p>Denmark consistently ranks among the world's happiest countries (World Happiness Report). Researchers partly attribute this to the strong cultural emphasis on quality social time — hygge is infrastructure for wellbeing.</p>`,
da:`<p><strong>Hygge</strong> (udtales ca. "hoo-ga") er et dansk begreb uden direkte oversættelse til andre sprog. Det beskriver en tilstedeværelseskvalitet — en hyggelig, samværsfyldt atmosfære, hvor folk føler sig trygge, afslappede og forbundne. Det er både substantiv og adjektiv: man kan have hygge, eller noget kan være hyggeligt.</p>
<p><strong>Sådan ser hygge ud i praksis:</strong></p>
<ul>
  <li>En middagsselskab, hvor telefonerne er sat på lydløs, og ingen skynder sig hjem</li>
  <li>Fredag eftermiddag på kontoret med kage og kaffe (fredagskage)</li>
  <li>En regnfuld søndag med tykke sokker, stearinlys og ingen aftaler</li>
  <li>Brætspil med naboer, man har kendt i tre år</li>
</ul>
<p><strong>Hvad hygge ikke er:</strong></p>
<ul>
  <li>Det er ikke performativt. Danskerne vil straks opdage, hvis du prøver for hårdt.</li>
  <li>Det er ikke dyrt. Dem med mest hygge er tit dem, der gør de enkleste ting.</li>
  <li>Det er ikke passivt — det kræver nærvær og ægte engagement med menneskene omkring dig.</li>
</ul>
<p class="callout-info"><strong>For nytilkomne:</strong> Den hurtigste måde at forstå hygge på er at blive inviteret hjem til danskere til middag: kom til tiden, læg telefonen væk, og bliv, til værten signalerer, at aftenen er ved at slut. Du vil mærke det.</p>
<p>Danmark rangerer konsekvent blandt verdens lykkeligste lande (World Happiness Report). Forskere tilskriver det delvist den stærke kulturelle vægtlægning på sociale stunder af høj kvalitet — hygge er infrastruktur for trivsel.</p>` }
      },
      {
        icon: "⚖️",
        title: { en:"Janteloven — The Unwritten Law of Danish Equality", fr:"Janteloven — La loi non écrite de l'égalité danoise", ar:"قانون يانتيلوفن — القانون غير المكتوب للمساواة الدنماركية", es:"Janteloven — La ley no escrita de la igualdad danesa", da:"Janteloven — danskernes uudtalte lov om lighed" },
        content: { en:`<p><strong>Janteloven</strong> (the Law of Jante) is a cultural concept described by Danish-Norwegian author Aksel Sandemose in his 1933 novel. It describes a set of unwritten social norms that emphasise collective equality over individual achievement.</p>
<p><strong>The ten rules of Janteloven (summarised):</strong></p>
<ol>
  <li>You shall not think you are anything special.</li>
  <li>You shall not think you are as good as us.</li>
  <li>You shall not think you are smarter than us.</li>
  <li>You shall not convince yourself that you are better than us.</li>
  <li>You shall not think you know more than us.</li>
  <li>You shall not think you are greater than us.</li>
  <li>You shall not think you are good for anything.</li>
  <li>You shall not laugh at us.</li>
  <li>You shall not think that anyone cares about you.</li>
  <li>You shall not think that you can teach us anything.</li>
</ol>
<p><strong>In practice, this means:</strong></p>
<ul>
  <li>Bragging about your salary, car, or achievements is considered very bad taste</li>
  <li>Danes rarely introduce themselves with their titles ("I'm a doctor / director / professor")</li>
  <li>Status displays (luxury goods, name-dropping) are met with quiet social disapproval</li>
  <li>This is also why Danes can seem reserved when you first meet them — effusive self-promotion is culturally uncomfortable</li>
</ul>
<p class="callout-info"><strong>For newcomers:</strong> Don't confuse Janteloven with low confidence. Danes are assertive, direct, and proud — they just express it collectively rather than individually. Lead with curiosity about others, not your own CV.</p>
<p>Younger Danes increasingly critique Janteloven as an obstacle to ambition and entrepreneurship. You'll find its influence varies significantly by age group and industry.</p>`,
da:`<p><strong>Janteloven</strong> er et kulturelt begreb beskrevet af den dansk-norske forfatter Aksel Sandemose i sin roman fra 1933. Det beskriver en række uskrevne sociale normer, der betoner kollektiv lighed frem for individuelle præstationer.</p>
<p><strong>Jantelovens ti regler (i kortform):</strong></p>
<ol>
  <li>Du skal ikke tro, du er noget.</li>
  <li>Du skal ikke tro, du er lige så meget som os.</li>
  <li>Du skal ikke tro, du er klogere end os.</li>
  <li>Du skal ikke bilde dig ind, du er bedre end os.</li>
  <li>Du skal ikke tro, du ved mere end os.</li>
  <li>Du skal ikke tro, du er mere end os.</li>
  <li>Du skal ikke tro, du duer til noget.</li>
  <li>Du skal ikke le af os.</li>
  <li>Du skal ikke tro, nogen bryder sig om dig.</li>
  <li>Du skal ikke tro, du kan lære os noget.</li>
</ol>
<p><strong>I praksis betyder det:</strong></p>
<ul>
  <li>At prale af sin løn, bil eller præstationer betragtes som meget dårlig stil</li>
  <li>Danskere præsenterer sig sjældent med titler ("Jeg er læge / direktør / professor")</li>
  <li>Statussignalering (luksusvarer, navnedropning) mødes med stille social misbilligelse</li>
  <li>Det er også derfor, danskere kan virke reserverede, når man møder dem første gang — overdreven selvpromovering er kulturelt ubehageligt</li>
</ul>
<p class="callout-info"><strong>For nytilkomne:</strong> Forveksl ikke Janteloven med lav selvtillid. Danskere er direkte, handlekraftige og stolte — de udtrykker det blot kollektivt frem for individuelt. Vis nysgerrighed over for andre, ikke dit eget CV.</p>
<p>Yngre danskere kritiserer i stigende grad Janteloven som en hindring for ambitioner og iværksætteri. Dens indflydelse varierer betydeligt med alder og branche.</p>` }
      },
      {
        icon: "🏡",
        title: { en:"How to Make Danish Friends — The Real Guide", fr:"Comment se faire des amis danois — Le vrai guide", ar:"كيف تكتسب أصدقاء دنماركيين — الدليل الحقيقي", es:"Cómo hacer amigos daneses — La guía real", da:"Sådan får du danske venner — den ærlige guide" },
        content: { en:`<p>Many expats in Denmark describe Danes as friendly but hard to befriend. This is accurate — and it has nothing to do with you personally.</p>
<p><strong>Understanding Danish friendship dynamics:</strong></p>
<ul>
  <li><strong>Danes already have their friends.</strong> Most Danes have known their closest friends since school or university. Their social calendar is often full. This is not exclusion — it's just a different social structure.</li>
  <li><strong>Danes warm slowly, but deeply.</strong> A Danish friendship that takes a year to form will last for decades. They are not interested in superficial connections.</li>
  <li><strong>Shared activity is the entry point.</strong> Danes find it easier to befriend people through doing things together — sport, volunteering, course work — than through pure socialising.</li>
</ul>
<p><strong>Proven strategies for building a social life in Denmark:</strong></p>
<ul>
  <li><strong>Join a forening (association).</strong> Denmark has approximately 100,000 voluntary associations — sports clubs, music ensembles, debating societies, gardening clubs. This is the single most effective way to meet Danes as a peer. Find clubs at <a href="https://www.dgi.dk" target="_blank" rel="noopener">dgi.dk</a> or your municipality's website.</li>
  <li><strong>Take the free Danish classes.</strong> You'll meet other newcomers AND start being able to interact with Danes on their own terms.</li>
  <li><strong>Attend frivillighedsmesser (volunteer fairs).</strong> Volunteering is highly valued in Danish culture. Showing up to volunteer places you on equal social footing.</li>
  <li><strong>Accept every invitation for the first year.</strong> Danes invite rarely but sincerely. Say yes to everything in the first 12 months — even if it sounds dull.</li>
  <li><strong>Bring food to the workplace.</strong> Bringing home-baked goods or food from your culture to share at work is one of the fastest social shortcuts in Danish office culture.</li>
</ul>
<p class="callout-info"><strong>Internations.org and meetup.com</strong> have active expat communities in Copenhagen, Aarhus, and Odense. These are excellent for immediate social connection while your Danish friendships develop.</p>`,
da:`<p>Mange udlændinge i Danmark beskriver danskerne som venlige, men svære at blive venner med. Det er præcist — og det handler ikke om dig personligt.</p>
<p><strong>Forstå dansk venskabsdynamik:</strong></p>
<ul>
  <li><strong>Danskere har allerede deres venner.</strong> De fleste danskere har kendt deres nærmeste venner siden skolen eller universitetet. Deres sociale kalender er ofte fyldt. Det er ikke udelukkelse — det er bare en anden social struktur.</li>
  <li><strong>Danskere varmer langsomt, men dybt.</strong> Et dansk venskab, der tager et år at forme, holder i årtier. De er ikke interesserede i overfladiske forbindelser.</li>
  <li><strong>Fælles aktivitet er indgangen.</strong> Danskere finder det lettere at blive venner med folk ved at gøre ting sammen — sport, frivilligt arbejde, kursusdeltagelse — frem for ren socialering.</li>
</ul>
<p><strong>Afprøvede strategier for at opbygge et socialt liv i Danmark:</strong></p>
<ul>
  <li><strong>Meld dig ind i en forening.</strong> Danmark har ca. 100.000 frivillige foreninger — sportsklubber, musikensembler, debatklubber, haveforeninger. Det er den mest effektive måde at møde danskere som ligemænd. Find klubber på <a href="https://www.dgi.dk" target="_blank" rel="noopener">dgi.dk</a> eller din kommunes hjemmeside.</li>
  <li><strong>Tag de gratis danskhold.</strong> Du møder andre nytilkomne OG begynder at kunne interagere med danskere på deres egne præmisser.</li>
  <li><strong>Deltag i frivillighedsmesser.</strong> Frivilligt arbejde værdsættes højt i dansk kultur. At melde sig som frivillig stiller dig på lige fod socialt.</li>
  <li><strong>Accepter alle invitationer i det første år.</strong> Danskere inviterer sjældent, men oprigtigt. Sig ja til alt i de første 12 måneder — selv hvis det lyder kedeligt.</li>
  <li><strong>Tag mad med på arbejdet.</strong> At medbringe hjemmebagt eller mad fra din kultur til kollegerne er en af de hurtigste sociale genveje i dansk arbejdskultur.</li>
</ul>
<p class="callout-info"><strong>Internations.org og meetup.com</strong> har aktive ekspat-fællesskaber i København, Aarhus og Odense. De er fremragende til umiddelbar social kontakt, mens dine danske venskaber udvikles.</p>` }
      },
      {
        icon: "🎪",
        title: { en:"Foreningsliv — Denmark's Hidden Social Infrastructure", fr:"Foreningsliv — L'infrastructure sociale cachée du Danemark", ar:"حياة الجمعيات — البنية الاجتماعية الخفية في الدنمارك", es:"Foreningsliv — La infraestructura social oculta de Dinamarca", da:"Foreningsliv — Danmarks skjulte sociale infrastruktur" },
        content: { en:`<p>Denmark has approximately <strong>100,000 voluntary associations (foreninger)</strong> — more per capita than almost any country on earth. Sport clubs, choirs, political parties, parent associations, model train clubs, chess societies. If something can be done collectively in Denmark, there is almost certainly an association for it.</p>
<p><strong>Why this matters to you:</strong> The forening is how Danish society organises community life. It is also the primary social ladder for newcomers — joining one immediately gives you a structured reason to see the same people regularly, which is the foundation of Danish friendship.</p>
<p><strong>Types of foreninger worth knowing:</strong></p>
<ul>
  <li><strong>Idrætsforeninger</strong> — sports clubs. Football, handball, swimming, running, cycling, badminton. Most are family-friendly and affordable (DKK 500–2,000/year membership). <a href="https://www.dgi.dk" target="_blank" rel="noopener">Find clubs via DGI</a></li>
  <li><strong>Musikforeninger / Kor</strong> — choirs and music groups. Extremely common. Singing together is one of Denmark's great social traditions.</li>
  <li><strong>Grundejerforeninger / Beboerforeninger</strong> — homeowner and tenant associations. If you live in a neighbourhood, you may automatically be a member and have a voice in local decisions.</li>
  <li><strong>Frivilligforeninger</strong> — volunteer organisations. The Red Cross Denmark (<a href="https://www.rodekors.dk" target="_blank" rel="noopener">rodekors.dk</a>) and many local organisations always need volunteers.</li>
</ul>
<p><strong>ForeningsPortalen:</strong> Your municipality likely has a portal listing all local associations. Search "[municipality name] foreningsportal" to find yours.</p>`,
da:`<p>Danmark har ca. <strong>100.000 frivillige foreninger</strong> — flere per indbygger end næsten noget andet land. Sportsklubber, kor, politiske partier, forældreforeninger, modeltogklubber, skakklubber. Hvis noget kan gøres kollektivt i Danmark, er der næsten helt sikkert en forening for det.</p>
<p><strong>Hvorfor det er relevant for dig:</strong> Foreningen er den måde, det danske samfund organiserer fælleslivet på. Det er også den primære sociale stige for nytilkomne — når du melder dig ind, får du med det samme en struktureret grund til at se de samme mennesker regelmæssigt, hvilket er grundlaget for dansk venskab.</p>
<p><strong>Typer af foreninger, det er værd at kende:</strong></p>
<ul>
  <li><strong>Idrætsforeninger</strong> — sportsklubber. Fodbold, håndbold, svømning, løb, cykling, badminton. De fleste er familievenlige og overkommelige (500–2.000 kr./år). <a href="https://www.dgi.dk" target="_blank" rel="noopener">Find klubber via DGI</a></li>
  <li><strong>Musikforeninger / Kor</strong> — kor og musikgrupper. Ekstremt udbredte. At synge sammen er en af Danmarks store sociale traditioner.</li>
  <li><strong>Grundejerforeninger / Beboerforeninger</strong> — grundejer- og lejerforeninger. Bor du i et kvarter, er du muligvis automatisk medlem og har indflydelse på lokale beslutninger.</li>
  <li><strong>Frivilligforeninger</strong> — frivillighedsorganisationer. Røde Kors Danmark (<a href="https://www.rodekors.dk" target="_blank" rel="noopener">rodekors.dk</a>) og mange lokale organisationer har altid brug for frivillige.</li>
</ul>
<p><strong>ForeningsPortalen:</strong> Din kommune har sandsynligvis en portal med alle lokale foreninger. Søg på "[kommunenavn] foreningsportal" for at finde din.</p>` }
      },
      {
        icon: "🎉",
        title: { en:"Danish Holidays, Traditions & Cultural Calendar", fr:"Fêtes, Traditions et Calendrier Culturel Danois", ar:"الأعياد والتقاليد والتقويم الثقافي الدنماركي", es:"Fiestas, Tradiciones y Calendario Cultural Danés", da:"Danske helligdage, traditioner og kulturkalender" },
        content: { en:`<p>Understanding Danish cultural moments will help you participate — and avoid being the colleague who booked a meeting on a major holiday.</p>
<table class="info-table">
  <tr><th>Date / Period</th><th>Holiday / Tradition</th><th>What actually happens</th></tr>
  <tr><td><strong>January</strong></td><td>Nytårsforsæt</td><td>New Year's resolutions taken seriously. Gyms peak.</td></tr>
  <tr><td><strong>February/March</strong></td><td>Fastelavn</td><td>Danish carnival. Children dress up and beat a barrel (slå katten af tønden). Fastelavn buns (fastelavnsboller) everywhere.</td></tr>
  <tr><td><strong>April</strong></td><td>Påske (Easter)</td><td>4-day weekend (Thu–Mon). Danes go to summer houses. Chocolate eggs, daffodils, yellow decorations.</td></tr>
  <tr><td><strong>May 4–5</strong></td><td>Liberation Day</td><td>Candles in windows at 10pm on May 4 — commemorating the end of WWII occupation in 1945. Deeply meaningful to Danes.</td></tr>
  <tr><td><strong>June 5</strong></td><td>Grundlovsdag</td><td>Danish Constitution Day — public holiday. Political speeches in parks.</td></tr>
  <tr><td><strong>June 23</strong></td><td>Sankt Hans Aften</td><td>Midsummer. Bonfires on beaches across Denmark. Effigy of a witch burned (witch goes to Bloksbjerg). One of the most beautiful Danish traditions.</td></tr>
  <tr><td><strong>July–Aug</strong></td><td>Sommerferie</td><td>Denmark essentially pauses. Offices empty. Danes go to their sommerhus (summer house). Plan no important meetings in July.</td></tr>
  <tr><td><strong>November</strong></td><td>Mortensaften (Nov 10)</td><td>Feast of Saint Martin. Danes eat roast duck. One of Denmark's most beloved unofficial food holidays.</td></tr>
  <tr><td><strong>December</strong></td><td>Jul (Christmas)</td><td>Celebrated on December 24 (Juleaften), not the 25th. Families hold hands and walk around the Christmas tree. Æbleskiver, gløgg, risalamande with hidden almond.</td></tr>
</table>
<p><strong>Public holidays (helligdage) where everything closes:</strong> New Year's Day, Maundy Thursday, Good Friday, Easter Monday, Ascension Day, Whit Monday, Constitution Day (June 5, partial), Christmas Dec 24 (early close), Dec 25 and Dec 26. Note: <strong>Store Bededag (Great Prayer Day) was abolished on 1 January 2024</strong> — it is no longer a public holiday. Workers received a small annual salary increase as compensation.</p>`,
da:`<p>At forstå danske kulturelle begivenheder hjælper dig til at deltage — og undgå at blive den kollega, der bookede et møde på en stor helligdag.</p>
<table class="info-table">
  <tr><th>Dato / Periode</th><th>Helligdag / Tradition</th><th>Hvad sker der</th></tr>
  <tr><td><strong>Januar</strong></td><td>Nytårsforsæt</td><td>Nytårsforsæt tages alvorligt. Fitnesscentre er proppede.</td></tr>
  <tr><td><strong>Februar/marts</strong></td><td>Fastelavn</td><td>Dansk karneval. Børn klæder sig ud og slår katten af tønden. Fastelavnsboller overalt.</td></tr>
  <tr><td><strong>April</strong></td><td>Påske</td><td>4-dages weekend (tor–man). Danskere tager på sommerhus. Chokoladeæg, påskeliljer, gule dekorationer.</td></tr>
  <tr><td><strong>4.–5. maj</strong></td><td>Befrielsesdagen</td><td>Stearinlys i vinduer kl. 22 den 4. maj — til minde om afslutningen på WWII-besættelsen i 1945. Dybt meningsfuldt for danskere.</td></tr>
  <tr><td><strong>5. juni</strong></td><td>Grundlovsdag</td><td>Dansk grundlovsdag — officiel helligdag. Politiske taler i parker.</td></tr>
  <tr><td><strong>23. juni</strong></td><td>Sankt Hans Aften</td><td>Midsommer. Bål på strande over hele Danmark. Heksefigur brændes (heksen flyver til Bloksbjerg). En af Danmarks smukkeste traditioner.</td></tr>
  <tr><td><strong>Juli–aug</strong></td><td>Sommerferie</td><td>Danmark holder i praksis pause. Kontorer tømmes. Danskere tager på sommerhus. Planlæg ingen vigtige møder i juli.</td></tr>
  <tr><td><strong>November</strong></td><td>Mortensaften (10. nov.)</td><td>Sankthans for anden årsdag. Danskere spiser andesteg. En af Danmarks mest elskede uofficielle madhelligdage.</td></tr>
  <tr><td><strong>December</strong></td><td>Jul</td><td>Fejres juleaften den 24. december, ikke den 25. Familier holder hinanden i hånden og går rundt om juletræet. Æbleskiver, gløgg, risalamande med den skjulte mandel.</td></tr>
</table>
<p><strong>Officielle helligdage, hvor alting lukker:</strong> Nytårsdag, Skærtorsdag, Langfredag, 2. påskedag, Kristi Himmelfartsdag, 2. pinsedag, Grundlovsdag (5. juni, delvist), Juleaften den 24. dec. (tidlig lukketid), 1. og 2. juledag. Bemærk: <strong>Store Bededag blev afskaffet den 1. januar 2024</strong> — det er ikke længere helligdag. Arbejdere fik en lille lønstigning som kompensation.</p>` }
      },
      {
        icon: "🍞",
        title: { en:"Danish Food Culture — What to Know and What to Try", fr:"La Culture Alimentaire Danoise — Ce qu'il faut savoir et goûter", ar:"الثقافة الغذائية الدنماركية — ما يجب معرفته وتجربته", es:"Cultura Gastronómica Danesa — Qué saber y qué probar", da:"Dansk madkultur — hvad du bør vide og smage" },
        content: { en:`<p>Danish food culture has undergone a revolution since Noma put Copenhagen on the global culinary map. But everyday Danish food life is distinct from fine dining.</p>
<p><strong>The daily food rhythm:</strong></p>
<ul>
  <li><strong>Morgenmad (breakfast):</strong> Typically light — rugbrød (dark rye bread) with cheese or leverpostej (liver pâté), or yogurt with müsli. Danes eat breakfast at home, rarely in cafes.</li>
  <li><strong>Frokost (lunch):</strong> The main working-day meal. Often smørrebrød — open-faced rye bread with toppings (sild/herring, roast beef, egg, shrimp). Many workplaces have a shared lunch arrangement (kantineordning).</li>
  <li><strong>Aftensmad (dinner):</strong> Usually 6–7pm. The main hot meal. Often involves potatoes (kartofler) — Danes consume more potatoes per capita than almost any EU country.</li>
</ul>
<p><strong>Things to try:</strong></p>
<ul>
  <li><strong>Smørrebrød</strong> — the open sandwich. Essential Danish cultural experience.</li>
  <li><strong>Rugbrød</strong> — dense, dark, sour rye bread. Surprisingly filling and nutritious.</li>
  <li><strong>Flæskesteg</strong> — roast pork with crackling. The national dish.</li>
  <li><strong>Æbleskiver</strong> — small spherical pancake-balls eaten with powdered sugar and jam, Christmas season.</li>
  <li><strong>Wienerbrød</strong> — what the rest of the world calls a "Danish pastry." Get one from a local baker, not a supermarket.</li>
</ul>
<p><strong>Supermarkets:</strong> Netto and Rema 1000 are the cheapest. Lidl and Aldi are also very good value. Meny is mid-range with better quality produce. (Note: Irma, the historic premium chain, was discontinued by Coop in 2024 — its stores rebranded mostly to Brugsen.) <strong>Discount tip:</strong> Use the <strong>Too Good To Go</strong> app (widely used in Denmark) to buy surplus food from bakeries and restaurants at 60–70% discount.</p>`,
da:`<p>Dansk madkultur har gennemgået en revolution, siden Noma satte København på det globale gastronomiske kort. Men hverdagens danske madliv er noget anderledes end finere restaurant.</p>
<p><strong>Dagens måltidsrytme:</strong></p>
<ul>
  <li><strong>Morgenmad:</strong> Typisk let — rugbrød med ost eller leverpostej, eller yoghurt med müsli. Danskere spiser morgenmad hjemme, sjældent på café.</li>
  <li><strong>Frokost:</strong> Dagens vigtigste arbejdsmåltid. Ofte smørrebrød — åbne rugbrødsmadr med pålæg (sild, roastbeef, æg, rejer). Mange arbejdspladser har en fælles frokostordning (kantineordning).</li>
  <li><strong>Aftensmad:</strong> Normalt kl. 18–19. Det varme hovedmåltid. Involverer ofte kartofler — danskere spiser flere kartofler per person end næsten noget andet EU-land.</li>
</ul>
<p><strong>Ting du bør prøve:</strong></p>
<ul>
  <li><strong>Smørrebrød</strong> — den åbne mad. En essentiel dansk kulturoplevelse.</li>
  <li><strong>Rugbrød</strong> — tæt, mørkt, syrligt rugbrød. Overraskende mættende og næringsrigt.</li>
  <li><strong>Flæskesteg</strong> — stegt svinekød med sprød svær. Den nationale ret.</li>
  <li><strong>Æbleskiver</strong> — små runde pandekagekugler spist med flormelis og syltetøj, i julesæsonen.</li>
  <li><strong>Wienerbrød</strong> — det resten af verden kalder "Danish pastry." Køb hos en lokal bager, ikke i supermarkedet.</li>
</ul>
<p><strong>Supermarkeder:</strong> Netto og Rema 1000 er billigst. Lidl og Aldi er også meget gode i pris. Meny er mellemklasse med bedre råvarer. (Bemærk: Irma, den historiske premiumkæde, blev lukket af Coop i 2024 — butikkerne skiftede navn til bl.a. Brugsen.) <strong>Sparetip:</strong> Brug <strong>Too Good To Go</strong>-appen (meget udbredt i Danmark) til at købe overskudsmad fra bagerier og restauranter til 60–70% rabat.</p>` }
      }
    ],
    checklist: [
      { id:"ch12_forening", text:{ en:"Join a local forening (sports club, choir, or volunteer group)", fr:"Rejoindre une forening locale (club sportif, chœur ou bénévoles)", ar:"الانضمام إلى جمعية محلية (نادي رياضي أو جوقة أو متطوعين)", es:"Unirse a una forening local (club deportivo, coro o voluntarios)", da:"Tilmeld dig en lokal forening (sportsklub, kor eller frivilliggruppe)" }, xp:35 },
      { id:"ch12_santkhans", text:{ en:"Attend a Sankt Hans bonfire on June 23rd", fr:"Assister à un feu de joie de Sankt Hans le 23 juin", ar:"حضور نار مهرجان سانكت هانز في 23 يونيو", es:"Asistir a una hoguera de Sankt Hans el 23 de junio", da:"Deltag i et Sankt Hans bål den 23. juni" }, xp:20 },
      { id:"ch12_smorrebrod", text:{ en:"Eat a proper smørrebrød lunch at a Danish café", fr:"Manger un vrai déjeuner smørrebrød dans un café danois", ar:"تناول غداء سمورسبرود حقيقي في مقهى دنماركي", es:"Comer un almuerzo smørrebrød auténtico en un café danés", da:"Spis en ordentlig smørrebrødsfrokost på en dansk café" }, xp:10 },
      { id:"ch12_invite", text:{ en:"Accept a dinner invitation from a Danish colleague or neighbour", fr:"Accepter une invitation à dîner d'un collègue ou voisin danois", ar:"قبول دعوة عشاء من زميل أو جار دنماركي", es:"Aceptar una invitación a cenar de un colega o vecino danés", da:"Accepter en middagsinvitation fra en dansk kollega eller nabo" }, xp:25 },
      { id:"ch12_toogoodtogo", text:{ en:"Download Too Good To Go and use it at least once", fr:"Télécharger Too Good To Go et l'utiliser au moins une fois", ar:"تنزيل تطبيق Too Good To Go واستخدامه مرة واحدة على الأقل", es:"Descargar Too Good To Go y usarlo al menos una vez", da:"Download Too Good To Go og brug det mindst én gang" }, xp:10 },
      { id:"ch12_xmas", text:{ en:"Experience a Danish Jul — risengrød, æbleskiver, and all", fr:"Vivre un Jul danois — risengrød, æbleskiver, et tout le reste", ar:"تجربة عيد الميلاد الدنماركي يول — ريسنغرود وأبلسكيفر وكل شيء", es:"Vivir un Jul danés — risengrød, æbleskiver, y todo lo demás", da:"Oplev en dansk jul — risengrød, æbleskiver og det hele" }, xp:20 },
    ]
  },
  {
    id: 13, icon: "💕", color: "#C60C30",
    title: { en:"Dating & Relationships", fr:"Rencontres et Relations", ar:"المواعدة والعلاقات", es:"Citas y Relaciones", da:"Dating og Forhold" },
    subtitle: { en:"Love Under Northern Lights", fr:"L'Amour Sous les Lumières du Nord", ar:"الحب تحت أضواء الشمال", es:"Amor Bajo las Auroras Boreales", da:"Kærlighed under nordlyset" },
    intro: { en:"Dating in Denmark is direct, equal, and refreshingly honest. Here's the cultural roadmap.", fr:"Les rencontres au Danemark sont directes, égales et sincères.", ar:"المواعدة في الدنمارك مباشرة ومتساوية وصادقة بشكل منعش.", es:"Las citas en Dinamarca son directas, igualitarias y honestas.", da:"Dating i Danmark er direkte, ligeværdigt og opfriskende ærligt." },
    readTime: "12 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "💬",
        title: { en:"How Dating Works in Denmark — The Cultural Code", fr:"Comment fonctionne le dating au Danemark — Le code culturel", ar:"كيف تعمل المواعدة في الدنمارك — الكود الثقافي", es:"Cómo funciona el dating en Dinamarca — El código cultural", da:"Sådan fungerer dating i Danmark — den kulturelle kode" },
        content: { en:`<p>Dating in Denmark operates by norms that are distinctly different from most other cultures. Understanding them will save you significant confusion.</p>
<p><strong>The big differences:</strong></p>
<ul>
  <li><strong>Radical equality.</strong> Danish dating is genuinely egalitarian. Anyone can ask anyone out. Paying for the other person is not expected — splitting the bill is standard from the first date. Don't read anything into who pays; it's neutral territory.</li>
  <li><strong>Directness over games.</strong> Danes do not play hard-to-get in the way common in other cultures. If someone is interested, they will usually say so relatively quickly. If they're not interested, they'll say that too — or simply stop replying, which is also understood to mean no.</li>
  <li><strong>Alcohol as social lubricant.</strong> Many Danes find it easier to make the first move after some drinks. Danish bar culture is a genuine dating environment, especially Thursday–Saturday evenings.</li>
  <li><strong>Slow escalation into exclusivity.</strong> There is often no formal "defining the relationship" moment in Denmark. You may date someone for several months before either person brings up exclusivity. Don't interpret slow commitment as disinterest.</li>
  <li><strong>Gender roles are very flat.</strong> Assumptions about who drives, who plans, who earns more — all irrelevant. Expect full equality in how dates are organised, paid, and planned.</li>
</ul>
<p><strong>Where Danes actually meet people:</strong></p>
<ul>
  <li>Through existing social circles (friends of friends is the most common route)</li>
  <li>At work — workplace romances are more accepted in Denmark than in many countries</li>
  <li>Apps: <strong>Tinder</strong> and <strong>Bumble</strong> are the dominant apps in Denmark. Dating.dk is a popular Danish-language platform.</li>
  <li>At sports clubs, music events, and volunteer activities</li>
</ul>`,
da:`<p>Dating i Danmark foregår efter normer, der adskiller sig tydeligt fra de fleste andre kulturer. At forstå dem vil spare dig for megen forvirring.</p>
<p><strong>De store forskelle:</strong></p>
<ul>
  <li><strong>Radikal lighed.</strong> Dansk dating er genuint ligestillet. Alle kan bede alle ud. Det forventes ikke, at man betaler for den anden — regningen deles fra første date. Tillæg ingen betydning til hvem der betaler; det er neutralt territorium.</li>
  <li><strong>Direkthed frem for spil.</strong> Danskere spiller ikke svær at få på den måde, der er almindelig i andre kulturer. Hvis nogen er interesseret, siger de det typisk relativt hurtigt. Hvis de ikke er interesserede, siger de det også — eller holder simpelthen op med at svare, hvilket også forstås som nej.</li>
  <li><strong>Alkohol som social smøremiddel.</strong> Mange danskere finder det lettere at tage det første skridt efter et par drinks. Dansk barbyliv er et reelt datingmiljø, særligt torsdag–lørdag aften.</li>
  <li><strong>Langsom optrapning til eksklusivitet.</strong> Der er ofte ikke noget formelt "define the relationship"-øjeblik i Danmark. Man kan date nogen i flere måneder, før nogen bringer eksklusivitet op. Fortolk ikke langsom forpligtelse som uinteresse.</li>
  <li><strong>Kønsroller er meget flade.</strong> Antagelser om hvem der kører, planlægger, tjener mest — alt irrelevant. Forvent fuld lighed i, hvordan dates organiseres, betales og planlægges.</li>
</ul>
<p><strong>Hvor danskere faktisk møder folk:</strong></p>
<ul>
  <li>Via eksisterende sociale kredse (venners venner er den mest almindelige vej)</li>
  <li>På arbejdet — kontorromancer accepteres mere i Danmark end i mange lande</li>
  <li>Apps: <strong>Tinder</strong> og <strong>Bumble</strong> er de dominerende apps i Danmark. Dating.dk er en populær dansksproglig platform.</li>
  <li>I sportsklubber, ved musikarrangementer og frivilligaktiviteter</li>
</ul>` }
      },
      {
        icon: "🏛️",
        title: { en:"Family Reunification — Bringing Your Partner to Denmark", fr:"Regroupement Familial — Amener votre partenaire au Danemark", ar:"لم شمل الأسرة — إحضار شريكك إلى الدنمارك", es:"Reagrupación Familiar — Traer a tu pareja a Dinamarca", da:"Familiesammenføring — at hente din partner til Danmark" },
        content: { en:`<p>If you are in Denmark and want to bring a foreign partner or spouse, the process is called <strong>familiesammenføring</strong> (family reunification). The rules are strict and should be understood early.</p>
<p><strong>Key requirements (2025):</strong></p>
<ul>
  <li><strong>You must be at least 24 years old</strong> (both you and your partner)</li>
  <li><strong>You must be able to support your partner financially</strong> — specifically, you must not have received certain social benefits in the 3 years before the application</li>
  <li><strong>You must have an attachment to Denmark</strong> that is at least as strong as your combined attachment to any other country (the "tilknytningskrav" — attachment requirement). This is assessed holistically.</li>
  <li><strong>You must have accommodation</strong> of at least 20m² per person living in the dwelling</li>
  <li><strong>You must post a financial guarantee (sikkerhedsstillelse)</strong> of approx. DKK 57,000 (2025) — halved by the July 2024 reform from the previous DKK ~113,000. Released in stages if your partner does not draw on certain public benefits. <a href="https://www.nyidanmark.dk/en-GB/Words-and-concepts/US/Familie/Collateral-guarantee---Reduction-and-release" target="_blank" rel="noopener">Source: nyidanmark.dk →</a></li>
</ul>
<p><strong>EU/EEA citizens:</strong> If you are an EU citizen exercising treaty rights in Denmark (working, studying, or being self-employed), you have the right to bring your partner under EU free movement rules. The process is simpler — apply for an EU residence document at <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a>.</p>
<p><strong>Processing time:</strong> Typically 6–12 months from application. Your partner can apply for permission to work while the application is being processed.</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family/Spouse-or-cohabitant" target="_blank" rel="noopener">→ Family reunification guide (nyidanmark.dk, English)</a>`,
da:`<p>Ønsker du at hente en udenlandsk partner eller ægtefælle til Danmark, hedder processen <strong>familiesammenføring</strong>. Reglerne er strenge og bør forstås tidligt.</p>
<p><strong>Vigtigste krav (2025):</strong></p>
<ul>
  <li><strong>Du skal være mindst 24 år</strong> (begge parter)</li>
  <li><strong>Du skal kunne forsørge din partner</strong> — konkret: du må ikke have modtaget visse sociale ydelser i de 3 år før ansøgningen</li>
  <li><strong>Du skal have tilknytning til Danmark</strong>, der mindst er lige så stærk som din samlede tilknytning til et andet land (tilknytningskravet). Det vurderes helhedsorienteret.</li>
  <li><strong>Du skal have bolig</strong> på mindst 20 m² per person i husstanden</li>
  <li><strong>Du skal stille en sikkerhedsstillelse</strong> på ca. 57.000 kr. (2025) — halveret i juli 2024-reformen fra de tidligere ~113.000 kr. Frigives gradvist, hvis din partner ikke trækker på visse offentlige ydelser. <a href="https://www.nyidanmark.dk/en-GB/Words-and-concepts/US/Familie/Collateral-guarantee---Reduction-and-release" target="_blank" rel="noopener">Kilde: nyidanmark.dk →</a></li>
</ul>
<p><strong>EU/EØS-borgere:</strong> Udøver du traktatrettigheder i Danmark (arbejder, studerer eller er selvstændig), har du ret til at medbringe din partner efter EU's regler om fri bevægelighed. Processen er enklere — ansøg om EU-opholdsdokument på <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a>.</p>
<p><strong>Behandlingstid:</strong> Typisk 6–12 måneder fra ansøgning. Din partner kan søge om arbejdstilladelse mens sagen behandles.</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family/Spouse-or-cohabitant" target="_blank" rel="noopener">→ Guide til familiesammenføring (nyidanmark.dk, engelsk)</a>` }
      },
      {
        icon: "🌈",
        title: { en:"LGBTQ+ Life in Denmark — One of the World's Most Equal Countries", fr:"Vie LGBTQ+ au Danemark — Un des pays les plus égaux du monde", ar:"حياة مجتمع الميم في الدنمارك — من أكثر دول العالم مساواة", es:"Vida LGBTQ+ en Dinamarca — Uno de los países más igualitarios del mundo", da:"LGBTQ+-liv i Danmark — et af verdens mest ligestillede lande" },
        content: { en:`<p>Denmark was the first country in the world to legally recognise same-sex partnerships, in 1989. Same-sex marriage has been legal since 2012. Denmark consistently ranks among the world's top 3 countries for LGBTQ+ legal equality and social acceptance.</p>
<p><strong>Legal protections:</strong></p>
<ul>
  <li>Same-sex marriage is fully equal to heterosexual marriage in all legal respects</li>
  <li>Same-sex couples have full adoption rights</li>
  <li>Gender recognition is self-declared (since 2014 for adults, 2017 for minors with parental consent) — no surgical requirement, no psychiatric diagnosis needed</li>
  <li>Discrimination on the basis of sexual orientation or gender identity is illegal in employment, housing, and services</li>
  <li>Hate crimes based on sexual orientation are subject to enhanced penalties</li>
</ul>
<p><strong>Social landscape:</strong></p>
<ul>
  <li><strong>Copenhagen Pride</strong> is held annually in August and draws approximately 300,000 participants</li>
  <li><strong>LGBT+ Danmark</strong> (<a href="https://www.lgbt.dk" target="_blank" rel="noopener">lgbt.dk</a>) is the main national organisation and a valuable resource for newcomers</li>
  <li>LGBT+ community spaces are concentrated in Copenhagen's Vesterbro and Nørrebro neighbourhoods, but acceptance is generally high across the country</li>
</ul>
<p class="callout-info">While Denmark is highly accepting, individual experiences may vary by region and community. Rural areas and some religious communities may be more conservative. The legal framework, however, is among the strongest in the world.</p>`,
da:`<p>Danmark var det første land i verden, der lovligt anerkendte homoseksuelle partnerskaber i 1989. Homoseksuelt ægteskab har været lovligt siden 2012. Danmark rangerer konsekvent blandt verdens top 3 lande for LGBTQ+-retslig ligestilling og social accept.</p>
<p><strong>Juridisk beskyttelse:</strong></p>
<ul>
  <li>Homoseksuelt ægteskab er fuldt ligestillet med heteroseksuelt ægteskab i alle juridiske henseender</li>
  <li>Homoseksuelle par har fuld adoptionsret</li>
  <li>Kønsskifte er selverklæret (siden 2014 for voksne, 2017 for mindreårige med forældresamtykke) — intet kirurgisk krav, ingen psykiatrisk diagnose nødvendig</li>
  <li>Diskrimination på grund af seksuel orientering eller kønsidentitet er ulovlig i ansættelse, bolig og serviceydelser</li>
  <li>Had baseret på seksuel orientering giver skærpede straffe</li>
</ul>
<p><strong>Social situation:</strong></p>
<ul>
  <li><strong>Copenhagen Pride</strong> afholdes hvert år i august og tiltrækker ca. 300.000 deltagere</li>
  <li><strong>LGBT+ Danmark</strong> (<a href="https://www.lgbt.dk" target="_blank" rel="noopener">lgbt.dk</a>) er den vigtigste nationale organisation og en værdifuld ressource for nytilkomne</li>
  <li>LGBT+-miljøer er koncentreret i Vesterbro og Nørrebro i København, men accept er generelt høj i hele landet</li>
</ul>
<p class="callout-info">Selv om Danmark er meget accepterende, kan individuelle oplevelser variere efter region og miljø. Landdistrikter og visse religiøse fællesskaber kan være mere konservative. Den juridiske ramme er dog blandt de stærkeste i verden.</p>` }
      },
      {
        icon: "📋",
        title: { en:"Living Together — Cohabitation, Samlevende Status & Legal Rights", fr:"Vivre Ensemble — Cohabitation, statut samlevende et droits légaux", ar:"العيش معاً — التعايش والوضع القانوني لغير المتزوجين", es:"Vivir Juntos — Cohabitación, estado samlevende y derechos legales", da:"At bo sammen — samlevendes rettigheder og juridisk status" },
        content: { en:`<p>Moving in together in Denmark has legal implications worth understanding — especially for unmarried couples.</p>
<p><strong>Samlevende (cohabiting) status:</strong></p>
<ul>
  <li>There is no automatic legal recognition of cohabiting relationships in Denmark — unlike marriage or registered partnership</li>
  <li>This means: if one partner dies without a will, the other has <strong>no automatic inheritance rights</strong> under Danish law</li>
  <li>This also means: if you separate, property you've purchased jointly may require legal intervention to divide</li>
</ul>
<p><strong>How to protect yourself as an unmarried couple:</strong></p>
<ul>
  <li><strong>Samlevende-erklæring (cohabitation agreement):</strong> A notarised document stating that you are life partners. Allows some tax benefits and rights similar to married couples in specific areas.</li>
  <li><strong>Testament (will):</strong> Essential if you want your partner to inherit. Without it, your estate goes to blood relatives.</li>
  <li><strong>Udvidet samlevendepension:</strong> Ask your pension provider to add your partner — most workplace pension schemes allow it for a small fee.</li>
</ul>
<p><strong>Registered partnership vs. marriage:</strong> Registered partnership (registreret partnerskab) was the pre-2012 equivalent of marriage for same-sex couples. New registrations are rarely done now — marriage is fully open and equal for all couples.</p>
<p><strong>Children in unmarried relationships:</strong> The father must acknowledge paternity (faderskabserklæring) — this happens automatically at the hospital at birth if both parents are present. Both parents have full parental rights (forældremyndighed) regardless of marital status.</p>`,
da:`<p>At flytte sammen i Danmark har juridiske konsekvenser, der er værd at kende — særligt for ugifte par.</p>
<p><strong>Samlevendes status:</strong></p>
<ul>
  <li>Der er ingen automatisk juridisk anerkendelse af samlevende forhold i Danmark — i modsætning til ægteskab eller registreret partnerskab</li>
  <li>Det betyder: hvis den ene partner dør uden testamente, har den anden <strong>ingen automatisk arveret</strong> efter dansk lovgivning</li>
  <li>Det betyder også: hvis I går fra hinanden, kan fælles ejendom kræve juridisk indgriben for at fordele</li>
</ul>
<p><strong>Sådan beskytter du dig selv som ugift par:</strong></p>
<ul>
  <li><strong>Samlevende-erklæring:</strong> Et notarbekræftet dokument, der fastslår, at I er livspartnere. Giver visse skattefordele og rettigheder svarende til gifte på specifikke områder.</li>
  <li><strong>Testamente:</strong> Nødvendigt, hvis du vil have din partner til at arve. Uden det går boet til blodslægtninge.</li>
  <li><strong>Udvidet samlevendepension:</strong> Bed din pensionsudbyder om at tilføje din partner — de fleste arbejdsmarkedspensioner tillader det mod et lille gebyr.</li>
</ul>
<p><strong>Registreret partnerskab vs. ægteskab:</strong> Registreret partnerskab var fra før 2012 ækvivalenten til ægteskab for homoseksuelle par. Nye registreringer er nu sjældne — ægteskab er fuldt åbent og ligestillet for alle par.</p>
<p><strong>Børn i ugifte forhold:</strong> Faderen skal anerkende faderskabet (faderskabserklæring) — det sker automatisk på hospitalet ved fødslen, hvis begge forældre er til stede. Begge forældre har fuld forældremyndighed uanset civilstand.</p>` }
      },
      {
        icon: "🏠",
        title: { en:"Divorce & Separation in Denmark — How It Works", fr:"Divorce et Séparation au Danemark — Comment ça marche", ar:"الطلاق والانفصال في الدنمارك — كيف يعمل", es:"Divorcio y Separación en Dinamarca — Cómo funciona", da:"Skilsmisse og separation i Danmark — sådan fungerer det" },
        content: { en:`<p>Denmark has one of the world's simplest and most civilised divorce processes.</p>
<p><strong>The process:</strong></p>
<ul>
  <li><strong>Immediate divorce (øjeblikkelig skilsmisse):</strong> If both spouses agree and there are no children under 18, you can apply for immediate divorce online at <a href="https://www.familieretshuset.dk" target="_blank" rel="noopener">familieretshuset.dk</a>. Processing takes a few weeks.</li>
  <li><strong>Separation first:</strong> If you have children or can't agree on terms, you typically separate (separation) for 6 months before divorce is granted.</li>
  <li><strong>Property:</strong> Denmark operates a joint property system by default (formuefællesskab). Assets acquired during marriage are split equally unless you have a prenuptial agreement (ægtepagt) or there were gifts/inheritances.</li>
  <li><strong>Children:</strong> Denmark prioritises shared parental authority (fælles forældremyndighed). The default is shared custody.</li>
</ul>
<p><strong>Familieretshuset</strong> is the Danish Family Law Agency — they handle divorce, separation, custody, and child support. Their website has English guidance.</p>
<a href="https://www.familieretshuset.dk/english" target="_blank" rel="noopener">→ Familieretshuset (English)</a>`,
da:`<p>Danmark har en af verdens enkleste og mest civiliserede skilsmisseprocesser.</p>
<p><strong>Processen:</strong></p>
<ul>
  <li><strong>Øjeblikkelig skilsmisse:</strong> Hvis begge ægtefæller er enige og der ikke er børn under 18, kan I ansøge om øjeblikkelig skilsmisse online på <a href="https://www.familieretshuset.dk" target="_blank" rel="noopener">familieretshuset.dk</a>. Behandlingstiden er et par uger.</li>
  <li><strong>Separation først:</strong> Har I børn eller kan ikke blive enige om vilkårene, separerer I typisk i 6 måneder, inden skilsmissen bevilges.</li>
  <li><strong>Ejendom:</strong> Danmark opererer som udgangspunkt med formuefællesskab. Aktiver erhvervet under ægteskabet deles ligeligt, medmindre I har en ægtepagt, eller der er tale om gaver/arv.</li>
  <li><strong>Børn:</strong> Danmark prioriterer fælles forældremyndighed. Standard er delt forældremyndighed.</li>
</ul>
<p><strong>Familieretshuset</strong> er den danske myndighed for familieretlige sager — de håndterer skilsmisse, separation, forældremyndighed og børnebidrag. Deres hjemmeside har engelsksprogede vejledninger.</p>
<a href="https://www.familieretshuset.dk/english" target="_blank" rel="noopener">→ Familieretshuset (engelsk)</a>` }
      }
    ],
    checklist: [
      { id:"ch13_apps", text:{ en:"Download Danish dating apps (Tinder / Bumble / Dating.dk) if relevant", fr:"Télécharger des apps de rencontres danoises si pertinent", ar:"تنزيل تطبيقات المواعدة الدنماركية إذا كان ذلك مناسباً", es:"Descargar apps de citas danesas si es relevante", da:"Download danske dating-apps (Tinder / Bumble / Dating.dk) hvis relevant" }, xp:10 },
      { id:"ch13_will", text:{ en:"Write a will (testament) if unmarried and living with a partner", fr:"Rédiger un testament si non marié(e) et vivant avec un partenaire", ar:"كتابة وصية إذا كنت غير متزوج وتعيش مع شريك", es:"Redactar un testamento si no estás casado/a y vives con una pareja", da:"Skriv et testamente hvis du er ugift og bor med en partner" }, xp:40 },
      { id:"ch13_family_reun", text:{ en:"Check family reunification eligibility if your partner is abroad", fr:"Vérifier l'éligibilité au regroupement familial si votre partenaire est à l'étranger", ar:"التحقق من أهلية لم شمل الأسرة إذا كان شريكك في الخارج", es:"Comprobar elegibilidad para reagrupación familiar si tu pareja está en el extranjero", da:"Tjek familiesammenføring hvis din partner er i udlandet" }, xp:30 },
      { id:"ch13_pension_partner", text:{ en:"Add your partner to your pension scheme (udvidet samlevendepension)", fr:"Ajouter votre partenaire à votre régime de retraite", ar:"إضافة شريكك إلى مخطط التقاعد الخاص بك", es:"Añadir a tu pareja a tu plan de pensiones", da:"Tilføj din partner til din pensionsordning" }, xp:20 },
    ]
  },
  {
    id: 14, icon: "🧠", color: "#6A9E6A",
    title: { en:"Mental Health & Wellbeing", fr:"Santé Mentale et Bien-être", ar:"الصحة النفسية والرفاهية", es:"Salud Mental y Bienestar", da:"Mental Sundhed og Velvære" },
    subtitle: { en:"The Inner Journey", fr:"Le Voyage Intérieur", ar:"الرحلة الداخلية", es:"El Viaje Interior", da:"Den Indre Rejse" },
    intro: { en:"Moving countries is one of the hardest things a human being can do. Your feelings are valid. Help is available.", fr:"Déménager dans un autre pays est l'une des choses les plus difficiles qu'un être humain puisse faire.", ar:"الانتقال إلى بلد آخر هو أحد أصعب الأشياء التي يمكن للإنسان أن يفعلها. مشاعرك صحيحة. المساعدة متاحة.", es:"Mudarse a otro país es una de las cosas más difíciles que puede hacer un ser humano.", da:"At flytte til et nyt land er noget af det sværeste, et menneske kan gøre. Dine følelser er gyldige. Hjælp er tilgængelig." },
    readTime: "14 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🌊",
        title: { en:"The Immigrant Experience — What No One Warns You About", fr:"L'expérience de l'immigrant — Ce dont personne ne vous avertit", ar:"تجربة المهاجر — ما لا يحذرك منه أحد", es:"La experiencia del inmigrante — Lo que nadie te advierte", da:"Indvandrerens oplevelse — hvad ingen advarer dig om" },
        content: { en:`<p>Immigration is sold as adventure, opportunity, and new beginnings. All of those things are true. But it is also, consistently, one of the most psychologically demanding experiences a person can go through — and that part is rarely acknowledged.</p>
<p><strong>The stages most immigrants experience:</strong></p>
<ul>
  <li><strong>The honeymoon phase (0–3 months):</strong> Everything is new and exciting. Denmark is charming, people seem friendly, you feel energised. This phase can mask underlying stress.</li>
  <li><strong>Culture shock (3–12 months):</strong> The novelty fades. You realise you don't understand the social rules. You're lonely. Simple tasks feel exhausting. You miss home in ways you didn't expect — not just people, but sounds, smells, the feeling of being understood without effort.</li>
  <li><strong>Adjustment (1–2 years):</strong> You start to develop routines, friendships, competence in the language. Life starts to feel normal again.</li>
  <li><strong>Integration (2+ years):</strong> You begin to feel genuinely comfortable — but also sometimes caught between two cultures, not fully belonging anywhere.</li>
</ul>
<p class="callout-info"><strong>This is normal.</strong> Researchers call it the U-curve of adjustment. The dip in the middle is expected and does not mean you made the wrong decision. It means you are doing something hard.</p>
<p><strong>Signs you may need more support than normalising:</strong> Persistent sleep problems, loss of appetite, inability to find pleasure in things you used to enjoy, frequent crying, thoughts of self-harm. These are signals to reach out for professional support — which Denmark makes genuinely accessible.</p>`,
da:`<p>Immigration sælges som eventyr, muligheder og ny begyndelse. Alt det er sandt. Men det er også konsekvent en af de psykologisk mest krævende oplevelser, et menneske kan gennemgå — og den del anerkendes sjældent.</p>
<p><strong>De faser de fleste indvandrere gennemgår:</strong></p>
<ul>
  <li><strong>Honeymoonfasen (0–3 måneder):</strong> Alt er nyt og spændende. Danmark er charmerende, folk virker venlige, du føler dig energisk. Denne fase kan maskere underliggende stress.</li>
  <li><strong>Kulturchok (3–12 måneder):</strong> Nyheden aftager. Du indser, at du ikke forstår de sociale spilleregler. Du er ensom. Simple opgaver føles udmattende. Du savner hjemmet på måder, du ikke forventede — ikke kun folk, men lyde, dufte, følelsen af at blive forstået uden anstrengelse.</li>
  <li><strong>Tilpasning (1–2 år):</strong> Du begynder at udvikle rutiner, venskaber og kompetencer i sproget. Livet begynder at føles normalt igen.</li>
  <li><strong>Integration (2+ år):</strong> Du begynder at føle dig genuint tilpas — men oplever også nogle gange at stå mellem to kulturer uden helt at høre til noget sted.</li>
</ul>
<p class="callout-info"><strong>Dette er normalt.</strong> Forskere kalder det U-kurven for tilpasning. Dykket i midten er forventet og betyder ikke, at du har truffet den forkerte beslutning. Det betyder, at du gør noget svært.</p>
<p><strong>Tegn på at du måske behøver mere end normalisering:</strong> Vedvarende søvnproblemer, appetitløshed, manglende evne til at finde glæde i ting, du plejede at nyde, hyppig gråd, tanker om selvskade. Det er signaler om at søge professionel hjælp — som Danmark gør genuint tilgængeligt.</p>` }
      },
      {
        icon: "☀️",
        title: { en:"The Danish Winter — SAD, Darkness & How Danes Cope", fr:"L'hiver danois — TAS, obscurité et comment les Danois font face", ar:"الشتاء الدنماركي — اضطراب الاكتئاب الموسمي والظلام وكيف يتعامل الدنماركيون معه", es:"El invierno danés — TAE, oscuridad y cómo lo afrontan los daneses", da:"Den danske vinter — SAD, mørke og hvordan danskere klarer det" },
        content: { en:`<p>Denmark's winter is a genuine psychological challenge for most people who arrive from sunnier climates. Copenhagen receives only <strong>1.7 hours of daylight on the winter solstice</strong> — compared to 17+ hours in summer. By November, it's dark by 4pm.</p>
<p><strong>Seasonal Affective Disorder (SAD):</strong></p>
<p>SAD is a form of depression triggered by reduced light exposure. It affects an estimated 3–6% of the Danish population clinically, with many more experiencing sub-clinical "winter blues." Symptoms include low energy, increased sleep, carbohydrate cravings, difficulty concentrating, and low mood from October to March.</p>
<p><strong>How Danes cope (evidence-based strategies):</strong></p>
<ul>
  <li><strong>Light therapy (lysterapi):</strong> A bright light lamp (lysbehandlingslampe) of 10,000 lux used for 20–30 minutes each morning is clinically proven to reduce SAD symptoms. Available at pharmacies (apotek) and online for DKK 500–1,500. This is genuinely one of the most effective interventions available.</li>
  <li><strong>Hygge as mental health tool:</strong> The Danish emphasis on cosy social gatherings is partly a cultural adaptation to dark winters. Deliberately creating warm social environments counters isolation.</li>
  <li><strong>Exercise outdoors regardless of weather:</strong> Danes cycle and walk in rain and cold. This is not stubbornness — it's a mental health strategy. Even 20 minutes of outdoor light during daylight hours improves mood.</li>
  <li><strong>Vitamin D supplementation:</strong> Denmark's latitude means most people become Vitamin D deficient by October. The Danish Health Authority recommends Vitamin D supplements (10 micrograms/day) for all Danes from October to April. Widely available at pharmacies and supermarkets.</li>
</ul>
<p class="callout-info"><strong>Practical tip:</strong> Buy a daylight lamp in September before you feel you need it. By the time SAD symptoms arrive, the research shows you've already been exposed to weeks of insufficient light.</p>`,
da:`<p>Danmarks vinter er en reel psykologisk udfordring for de fleste, der ankommer fra solrigere klimaer. København modtager kun <strong>1,7 timers dagslys ved vintersolhverv</strong> — mod 17+ timer om sommeren. I november er det mørkt kl. 16.</p>
<p><strong>Sæsonbetinget affektiv lidelse (SAD):</strong></p>
<p>SAD er en form for depression udløst af nedsat lyseksponering. Det rammer anslået 3–6% af den danske befolkning klinisk, og mange flere oplever sub-klinisk "vinterdepression". Symptomer inkluderer lavt energiniveau, øget søvn, kulhydrattrang, koncentrationsbesvær og nedtrykthed fra oktober til marts.</p>
<p><strong>Sådan klarer danskere det (evidensbaserede strategier):</strong></p>
<ul>
  <li><strong>Lysterapi:</strong> En kraftig lysbehandlingslampe på 10.000 lux brugt i 20–30 minutter hver morgen er klinisk bevist til at reducere SAD-symptomer. Fås på apoteker og online for 500–1.500 kr. Det er reelt et af de mest effektive tilgængelige indgreb.</li>
  <li><strong>Hygge som mental sundhedsværktøj:</strong> Den danske betoning af hyggelige sociale sammenkomster er delvist en kulturel tilpasning til mørke vintre. Bevidst at skabe varme sociale omgivelser modvirker isolation.</li>
  <li><strong>Motion udendørs uanset vejr:</strong> Danskere cykler og går i regn og kulde. Det er ikke stædighed — det er en mental sundhedsstrategi. Selv 20 minutters udendørslys i dagtimerne forbedrer humøret.</li>
  <li><strong>D-vitamintilskud:</strong> Danmarks breddegrad betyder, at de fleste bliver D-vitaminmangelfulde i oktober. Sundhedsstyrelsen anbefaler D-vitamintilskud (10 mikrogram/dag) til alle danskere fra oktober til april. Fås bredt på apoteker og supermarkeder.</li>
</ul>
<p class="callout-info"><strong>Praktisk tip:</strong> Køb en dagslyslampe i september, inden du føler behov. Når SAD-symptomerne ankommer, viser forskningen, at du allerede har fået uger med utilstrækkeligt lys.</p>` }
      },
      {
        icon: "🏥",
        title: { en:"Free Mental Health Support in Denmark — What's Available", fr:"Soutien gratuit en santé mentale au Danemark — Ce qui est disponible", ar:"دعم الصحة النفسية المجاني في الدنمارك — ما هو متاح", es:"Apoyo gratuito de salud mental en Dinamarca — Qué está disponible", da:"Gratis psykisk sundhedsstøtte i Danmark — hvad er tilgængeligt" },
        content: { en:`<p>Denmark's healthcare system includes substantial mental health support, much of it free or heavily subsidised.</p>
<p><strong>Your GP (praktiserende læge) is the entry point:</strong></p>
<p>For most mental health concerns, you start with your GP. They can:</p>
<ul>
  <li>Prescribe medication for depression, anxiety, and other conditions</li>
  <li>Refer you to a psychologist with a blue referral card (<strong>psykologhenvisning</strong>), which entitles you to subsidised sessions</li>
  <li>Refer you to the psychiatric outpatient system (psykiatrisk ambulatorium) for more complex needs</li>
</ul>
<p><strong>If you're 18–24: free psychologist sessions (no co-pay).</strong></p>
<p>Since 1 July 2021, all Danes and residents <strong>aged 18–24</strong> can get up to <strong>12 free psychologist sessions per referral</strong> for mild to moderate anxiety or depression — with no out-of-pocket cost. Get a GP referral, then book through any psykolog with an ydernummer. This is one of the best free mental-health programmes in Europe; many young newcomers don't know it exists.</p>
<p><strong>If you're 25 or older: subsidised psychologist sessions (ydernummer):</strong></p>
<p>With a GP referral, you pay approximately <strong>DKK 385–530 per session</strong> (you pay ~50% of the full fee, the state covers the rest). This applies to a limited set of conditions including mild to moderate depression, anxiety, post-traumatic stress, and adjustment disorders — which covers most immigration-related mental health challenges.</p>
<p><strong>Reality check on waiting times:</strong> public psychiatric care can have waits of 6–18 months. For urgent needs, private (paid) sessions through Mindler, Kry, or Doctolib-listed psychologists are typically available within a few days.</p>
<p><strong>Crisis lines (available 24/7):</strong></p>
<ul>
  <li><strong>Livslinjen:</strong> 70 201 201 — Danish-language crisis support line, anonymous and free</li>
  <li><strong>Snak om det:</strong> 0045 9042 6555 — Danish mental health chat</li>
  <li><strong>The Emergency:</strong> 112 (medical emergency) or go to the nearest akutmodtagelse (emergency department) if in immediate crisis</li>
</ul>
<p><strong>English-language therapy:</strong></p>
<ul>
  <li>Many private psychologists in Copenhagen and other larger cities offer English sessions</li>
  <li><strong>Expat Mental Health Denmark</strong> — specialist support for international residents</li>
  <li>Online therapy platforms (BetterHelp, Nuna) are available and widely used</li>
</ul>
<a href="https://www.livslinjen.dk" target="_blank" rel="noopener">→ Livslinjen — crisis support</a>`,
da:`<p>Danmarks sundhedssystem inkluderer betydelig psykisk sundhedsstøtte, meget af det gratis eller kraftigt subsidieret.</p>
<p><strong>Din praktiserende læge er indgangspunktet:</strong></p>
<p>For de fleste psykiske problemer starter du hos din læge. De kan:</p>
<ul>
  <li>Udskrive medicin mod depression, angst og andre tilstande</li>
  <li>Henvise dig til en psykolog med en blå henvist (<strong>psykologhenvisning</strong>), som giver ret til subsidierede sessioner</li>
  <li>Henvise til det psykiatriske ambulatorium ved mere komplekse behov</li>
</ul>
<p><strong>Hvis du er 18–24: gratis psykologsessioner (ingen egenbetaling).</strong></p>
<p>Siden 1. juli 2021 kan alle danskere og beboere <strong>i alderen 18–24</strong> få op til <strong>12 gratis psykologsessioner pr. henvisning</strong> ved let til moderat angst eller depression — uden egenbetaling. Få en lægerhenvising og book hos en psykolog med ydernummer. Det er et af de bedste gratis programmer for psykisk sundhed i Europa; mange unge nytilkomne ved ikke, det eksisterer.</p>
<p><strong>Hvis du er 25 eller ældre: subsidierede psykologsessioner (ydernummer):</strong></p>
<p>Med en lægerhenvising betaler du ca. <strong>385–530 kr. per session</strong> (du betaler ~50% af fuld pris, staten dækker resten). Det gælder for et begrænset sæt tilstande, herunder let til moderat depression, angst, posttraumatisk stress og tilpasningsforstyrrelser — som dækker de fleste indvandringsrelaterede psykiske udfordringer.</p>
<p><strong>Virkelighed om ventetider:</strong> Offentlig psykiatrisk behandling kan have ventetider på 6–18 måneder. Ved akutte behov er private sessioner via Mindler, Kry eller psykologer listet på Doctolib typisk tilgængelige inden for få dage.</p>
<p><strong>Krisetjenester (tilgængelige 24/7):</strong></p>
<ul>
  <li><strong>Livslinjen:</strong> 70 201 201 — dansk krisetelefon, anonym og gratis</li>
  <li><strong>Snak om det:</strong> 0045 9042 6555 — dansk mental sundhedschat</li>
  <li><strong>Akut:</strong> 112 (medicinsk nødsituation) eller nærmeste akutmodtagelse ved umiddelbar krise</li>
</ul>
<p><strong>Engelsksprogede terapeuter:</strong></p>
<ul>
  <li>Mange private psykologer i København og andre større byer tilbyder englesksprogede sessioner</li>
  <li><strong>Expat Mental Health Denmark</strong> — specialiststøtte til internationale beboere</li>
  <li>Online terapiplatforme (BetterHelp, Nuna) er tilgængelige og bredt brugt</li>
</ul>
<a href="https://www.livslinjen.dk" target="_blank" rel="noopener">→ Livslinjen — krisetjeneste</a>` }
      },
      {
        icon: "🤝",
        title: { en:"Finding Your Community — The Loneliness Antidote", fr:"Trouver votre communauté — L'antidote à la solitude", ar:"إيجاد مجتمعك — مضاد الوحدة", es:"Encontrar tu comunidad — El antídoto contra la soledad", da:"Find dit fællesskab — ensomhedens modgift" },
        content: { en:`<p>Loneliness is one of the most common mental health challenges for newcomers to Denmark. It is not a personal failing — it is a structural consequence of leaving your existing social network behind and entering a society with a different social calendar.</p>
<p><strong>Active strategies that work:</strong></p>
<ul>
  <li><strong>International House Copenhagen</strong> (<a href="https://ihcph.kk.dk" target="_blank" rel="noopener">ihcph.kk.dk</a>) runs free social events, counselling, and networking specifically for newcomers. If you're in Copenhagen, visit in your first month.</li>
  <li><strong>InterNations</strong> (<a href="https://www.internations.org/denmark-expats" target="_blank" rel="noopener">internations.org</a>) has active communities in Copenhagen, Aarhus, and Odense. Paid membership unlocks all events, but free access to some is available.</li>
  <li><strong>Meetup.com</strong> has active groups for hiking, language exchange, board games, tech, and more.</li>
  <li><strong>Reddit r/Denmark and r/Copenhagen</strong> are surprisingly helpful communities — especially for "is this normal?" questions about Danish culture.</li>
  <li><strong>Facebook groups:</strong> "Expats in Copenhagen", "Foreigners in Aarhus" and equivalent city groups are active and welcoming.</li>
</ul>
<p><strong>Volunteering as a loneliness solution:</strong> Volunteering creates structured contact with consistent people over time — the precise formula for friendship formation. The Red Cross (<a href="https://www.rodekors.dk/bliv-frivillig" target="_blank" rel="noopener">rodekors.dk</a>) and FrivilligDanmark (<a href="https://www.frivilligdanmark.dk" target="_blank" rel="noopener">frivilligdanmark.dk</a>) have placement services.</p>
<p class="callout-info"><strong>Set a 12-month expectation.</strong> Research on immigrant social integration suggests it typically takes 12–18 months to build a genuine social network in a new country. If you're at month 3 and still lonely — that's not failure, that's schedule.</p>`,
da:`<p>Ensomhed er en af de mest udbredte psykiske udfordringer for nytilkomne til Danmark. Det er ikke en personlig svaghed — det er en strukturel konsekvens af at forlade sit eksisterende sociale netværk og træde ind i et samfund med en anden social kalender.</p>
<p><strong>Aktive strategier der virker:</strong></p>
<ul>
  <li><strong>International House Copenhagen</strong> (<a href="https://ihcph.kk.dk" target="_blank" rel="noopener">ihcph.kk.dk</a>) afholder gratis sociale arrangementer, rådgivning og netværk specifikt for nytilkomne. Er du i København, så besøg dem i din første måned.</li>
  <li><strong>InterNations</strong> (<a href="https://www.internations.org/denmark-expats" target="_blank" rel="noopener">internations.org</a>) har aktive fællesskaber i København, Aarhus og Odense. Betalt medlemskab giver adgang til alle arrangementer, men gratis adgang til nogle er mulig.</li>
  <li><strong>Meetup.com</strong> har aktive grupper for vandreture, sprogudveksling, brætspil, tech m.m.</li>
  <li><strong>Reddit r/Denmark og r/Copenhagen</strong> er overraskende hjælpsomme fællesskaber — særligt til "er dette normalt?"-spørgsmål om dansk kultur.</li>
  <li><strong>Facebook-grupper:</strong> "Expats in Copenhagen", "Foreigners in Aarhus" og tilsvarende bygrupper er aktive og imødekommende.</li>
</ul>
<p><strong>Frivilligt arbejde som løsning på ensomhed:</strong> Frivilligt arbejde skaber struktureret kontakt med de samme mennesker over tid — præcis formlen for venskabsdannelse. Røde Kors (<a href="https://www.rodekors.dk/bliv-frivillig" target="_blank" rel="noopener">rodekors.dk</a>) og FrivilligDanmark (<a href="https://www.frivilligdanmark.dk" target="_blank" rel="noopener">frivilligdanmark.dk</a>) har formidlingstjenester.</p>
<p class="callout-info"><strong>Sæt en 12-månedershorisont.</strong> Forskning i indvandreres sociale integration viser, at det typisk tager 12–18 måneder at opbygge et genuint socialt netværk i et nyt land. Er du ved måned 3 og stadig ensom — det er ikke fiasko, det er tidsplanen.</p>` }
      },
      {
        icon: "💼",
        title: { en:"Work Stress, Burnout & Your Rights Under Danish Law", fr:"Stress au travail, épuisement et vos droits selon la loi danoise", ar:"ضغوط العمل والإرهاق وحقوقك بموجب القانون الدنماركي", es:"Estrés laboral, agotamiento y tus derechos según la ley danesa", da:"Arbejdsstress, udbrændthed og dine rettigheder under dansk lov" },
        content: { en:`<p>Denmark's work culture is designed to protect wellbeing — but burnout is still a significant problem, particularly among high-achieving immigrants trying to prove themselves.</p>
<p><strong>Your rights when work affects your health:</strong></p>
<ul>
  <li><strong>Sick leave (sygedagpenge):</strong> If work stress makes you clinically unwell, you can take sick leave. Your employer pays full salary for the first 30 days. The state (via your municipality) pays sygedagpenge thereafter (up to DKK 4,865/week, 2025).</li>
  <li><strong>Arbejdstilsynet (the Danish Working Environment Authority):</strong> If your workplace creates an unhealthy environment — excessive pressure, harassment, lack of breaks — you can file a complaint. Anonymous reports are accepted. They conduct inspections and have authority to fine employers. <a href="https://at.dk" target="_blank" rel="noopener">at.dk</a></li>
  <li><strong>Occupational psychology support:</strong> Some larger employers have an employee assistance programme (EAP) with free counselling sessions. Check with your HR department.</li>
</ul>
<p><strong>Burnout is recognised medically in Denmark:</strong> Unlike in some countries, Danish GPs take stress-related illness seriously. A burnout diagnosis typically leads to a structured sick-leave plan, a gradual return-to-work programme, and referral to a psychologist. You will not be judged for this.</p>
<p><strong>If you're struggling with work:</strong> Your union (if you're a member) has free legal and welfare support. Your local municipality has a "jobcenter" that can support you through periods of inability to work.</p>`,
da:`<p>Danmarks arbejdskultur er designet til at beskytte trivsel — men udbrændthed er stadig et betydeligt problem, særligt blandt højtpresterende indvandrere, der forsøger at bevise sig selv.</p>
<p><strong>Dine rettigheder når arbejdet påvirker dit helbred:</strong></p>
<ul>
  <li><strong>Sygedagpenge:</strong> Hvis arbejdsstress gør dig klinisk syg, kan du tage sygeorlov. Din arbejdsgiver betaler fuld løn de første 30 dage. Derefter betaler staten (via din kommune) sygedagpenge (op til 4.865 kr./uge, 2025).</li>
  <li><strong>Arbejdstilsynet:</strong> Skaber din arbejdsplads et usundt miljø — overdrevent pres, chikane, manglende pauser — kan du indgive en klage. Anonyme anmeldelser accepteres. De fører tilsyn og kan bøde arbejdsgivere. <a href="https://at.dk" target="_blank" rel="noopener">at.dk</a></li>
  <li><strong>Erhvervspsykologisk støtte:</strong> Nogle større arbejdsgivere har et medarbejderhjælpsprogram (EAP) med gratis rådgivningssessioner. Spørg din HR-afdeling.</li>
</ul>
<p><strong>Udbrændthed er anerkendt medicinsk i Danmark:</strong> I modsætning til i visse andre lande tager danske læger stressrelateret sygdom alvorligt. En udbrændthedsdiagnose fører typisk til en struktureret sygemeldingsplan, et gradvist tilbagevenden-til-arbejde-program og henvisning til psykolog. Du vil ikke blive bedømt for dette.</p>
<p><strong>Hvis du kæmper med arbejde:</strong> Din fagforening (hvis du er medlem) har gratis juridisk og social støtte. Din lokale kommunes jobcenter kan støtte dig i perioder med arbejdsudygtighed.</p>` }
      }
    ],
    checklist: [
      { id:"ch14_gp", text:{ en:"Register with a GP and know you can discuss mental health openly", fr:"S'inscrire chez un médecin généraliste et savoir qu'on peut parler de santé mentale", ar:"التسجيل لدى طبيب عام ومعرفة أنك تستطيع مناقشة الصحة النفسية بصراحة", es:"Registrarse con un médico de cabecera y saber que puedes hablar de salud mental abiertamente", da:"Tilmeld dig en læge og vid at du kan tale åbent om mental sundhed" }, xp:20 },
      { id:"ch14_lamp", text:{ en:"Buy a 10,000 lux daylight lamp before October", fr:"Acheter une lampe de luminothérapie 10 000 lux avant octobre", ar:"شراء مصباح ضوء النهار 10,000 لوكس قبل أكتوبر", es:"Comprar una lámpara de luz diurna de 10.000 lux antes de octubre", da:"Køb en 10.000 lux dagslyslampe inden oktober" }, xp:15 },
      { id:"ch14_vitamind", text:{ en:"Start Vitamin D supplements (Oct–Apr)", fr:"Commencer les compléments de vitamine D (oct–avr)", ar:"البدء في تناول مكملات فيتامين د (أكتوبر–أبريل)", es:"Empezar suplementos de Vitamina D (oct–abr)", da:"Start med D-vitaminpræparater (okt–apr)" }, xp:10 },
      { id:"ch14_community", text:{ en:"Join one expat or newcomer community group", fr:"Rejoindre un groupe communautaire d'expatriés ou de nouveaux arrivants", ar:"الانضمام إلى مجموعة مجتمع المغتربين أو الوافدين الجدد", es:"Unirse a un grupo comunitario de expatriados o recién llegados", da:"Bliv medlem af en expat- eller nyankommergruppe" }, xp:25 },
      { id:"ch14_livslinjen", text:{ en:"Save Livslinjen (70 201 201) in your phone — just in case", fr:"Enregistrer Livslinjen (70 201 201) dans votre téléphone — au cas où", ar:"احفظ رقم Livslinjen (70 201 201) في هاتفك — لمجرد الاحتياط", es:"Guardar Livslinjen (70 201 201) en tu teléfono — por si acaso", da:"Gem Livslinjen (70 201 201) i din telefon — bare for en sikkerheds skyld" }, xp:10 },
    ]
  },
  {
    id: 15, icon: "⚖️", color: "#E8A020",
    title: { en:"Rights & Advocacy", fr:"Droits et Défense", ar:"الحقوق والمناصرة", es:"Derechos y Defensa", da:"Rettigheder og Fortalervirksomhed" },
    subtitle: { en:"Know What You're Entitled To", fr:"Connaissez Vos Droits", ar:"اعرف ما تستحق", es:"Conoce Tus Derechos", da:"Kend dine rettigheder" },
    intro: { en:"Denmark has strong legal protections for everyone — regardless of nationality or permit type. Know your rights.", fr:"Le Danemark a de solides protections juridiques pour tous, quelle que soit la nationalité.", ar:"تتمتع الدنمارك بحماية قانونية قوية للجميع — بغض النظر عن الجنسية أو نوع التصريح.", es:"Dinamarca tiene fuertes protecciones legales para todos, independientemente de la nacionalidad.", da:"Danmark har stærke juridiske rettigheder for alle — uanset nationalitet eller opholdsstatus." },
    readTime: "13 min",
    lastUpdated: "2025-01",
    sections: [
      {
        icon: "🛡️",
        title: { en:"Anti-Discrimination Law in Denmark — What's Illegal", fr:"Loi anti-discrimination au Danemark — Ce qui est illégal", ar:"قانون مكافحة التمييز في الدنمارك — ما هو غير قانوني", es:"Ley antidiscriminación en Dinamarca — Qué es ilegal", da:"Antidiskriminationslovgivning i Danmark — hvad der er ulovligt" },
        content: { en:`<p>Denmark has several overlapping laws that prohibit discrimination. Together, they cover most situations a newcomer might encounter.</p>
<table class="info-table">
  <tr><th>Law</th><th>What it covers</th><th>Protected characteristics</th></tr>
  <tr><td><strong>Ligebehandlingsloven</strong><br>(Equal Treatment Act)</td><td>Employment</td><td>Race, ethnicity, religion, belief, disability, age, sexual orientation</td></tr>
  <tr><td><strong>Forskelsbehandlingsloven</strong><br>(Anti-Discrimination Act)</td><td>Employment (broader)</td><td>Race, colour, religion, political opinion, sexual orientation, age, disability, national/social origin</td></tr>
  <tr><td><strong>Straffeloven § 266b</strong><br>(Penal Code)</td><td>Public statements</td><td>Criminalises public incitement to hatred based on race, colour, national origin, religion, sexual orientation</td></tr>
  <tr><td><strong>Lov om etnisk ligebehandling</strong></td><td>Goods, services, housing, social protection</td><td>Race and ethnic origin</td></tr>
</table>
<p><strong>If you face discrimination:</strong></p>
<ol>
  <li><strong>Document everything</strong> — save messages, emails, take notes with dates and witnesses</li>
  <li><strong>Contact Ligebehandlingsnævnet</strong> (the Equal Treatment Board) — free, independent complaints body. You can file a complaint within 1 year of the incident.</li>
  <li><strong>Contact your union</strong> if the discrimination is employment-related</li>
  <li><strong>Contact a legal aid office (retshjælp)</strong> for advice before taking further action</li>
</ol>
<a href="https://www.ligebehandlingsnaevnet.dk/english" target="_blank" rel="noopener">→ Ligebehandlingsnævnet — Equal Treatment Board (English)</a>`,
da:`<p>Danmark har flere overlappende love, der forbyder diskrimination. Tilsammen dækker de de fleste situationer, en nytilkommen kan møde.</p>
<table class="info-table">
  <tr><th>Lov</th><th>Hvad den dækker</th><th>Beskyttede karakteristika</th></tr>
  <tr><td><strong>Ligebehandlingsloven</strong></td><td>Ansættelse</td><td>Race, etnicitet, religion, tro, handicap, alder, seksuel orientering</td></tr>
  <tr><td><strong>Forskelsbehandlingsloven</strong></td><td>Ansættelse (bredere)</td><td>Race, farve, religion, politisk overbevisning, seksuel orientering, alder, handicap, national/social oprindelse</td></tr>
  <tr><td><strong>Straffeloven § 266b</strong></td><td>Offentlige udtalelser</td><td>Kriminaliserer offentlig ophidselse til had på grundlag af race, farve, national oprindelse, religion, seksuel orientering</td></tr>
  <tr><td><strong>Lov om etnisk ligebehandling</strong></td><td>Varer, tjenester, bolig, social beskyttelse</td><td>Race og etnisk oprindelse</td></tr>
</table>
<p><strong>Hvis du oplever diskrimination:</strong></p>
<ol>
  <li><strong>Dokumentér alt</strong> — gem beskeder, e-mails, tag noter med datoer og vidner</li>
  <li><strong>Kontakt Ligebehandlingsnævnet</strong> — gratis, uafhængigt klagenævn. Du kan indgive klage inden for 1 år efter hændelsen.</li>
  <li><strong>Kontakt din fagforening</strong> hvis diskriminationen er ansættelsesrelateret</li>
  <li><strong>Kontakt et retshjælpskontor</strong> for rådgivning inden yderligere skridt</li>
</ol>
<a href="https://www.ligebehandlingsnaevnet.dk/english" target="_blank" rel="noopener">→ Ligebehandlingsnævnet (engelsk)</a>` }
      },
      {
        icon: "🏠",
        title: { en:"Tenant Rights — Your Housing is Protected by Law", fr:"Droits des locataires — Votre logement est protégé par la loi", ar:"حقوق المستأجرين — مسكنك محمي بموجب القانون", es:"Derechos del inquilino — Tu vivienda está protegida por la ley", da:"Lejerrettigheder — din bolig er beskyttet af loven" },
        content: { en:`<p>Denmark has some of Europe's strongest tenant protections. Understanding them can save you significant money and stress.</p>
<p><strong>Key rights as a tenant:</strong></p>
<ul>
  <li><strong>Rent control:</strong> In most older properties (built before 1992), rent increases are regulated and must be approved by the local rent tribunal (huslejenævn). Your landlord cannot simply raise rent whenever they like.</li>
  <li><strong>Notice periods:</strong> Your landlord must give you at least 3 months' notice to terminate a tenancy — often longer, depending on the type of property and how long you've lived there. Your notice to leave is typically 1 month.</li>
  <li><strong>Deposit (depositum) limits:</strong> Landlords can charge a maximum of 3 months' rent as deposit, and maximum 3 months' advance rent. The total cannot exceed 6 months' combined rent.</li>
  <li><strong>Condition on move-in:</strong> The landlord must provide a move-in report (indflytningsrapport) within 2 weeks of your move-in. If they don't, they cannot charge you for damages when you leave.</li>
  <li><strong>Maintenance:</strong> The landlord is responsible for major maintenance. You are responsible for interior maintenance (painting, minor repairs) unless your contract says otherwise.</li>
</ul>
<p><strong>If you have a dispute with your landlord:</strong></p>
<ul>
  <li>Contact <strong>Huslejenævnet</strong> (Rent Tribunal) in your municipality — free to use, legally binding decisions. This is the first step for any rent dispute.</li>
  <li>Contact <strong>Lejerbo</strong> or <strong>Lejernes Landsorganisation (LLO)</strong> — national tenant organisations that provide legal advice and representation.</li>
</ul>
<a href="https://www.lejernet.dk" target="_blank" rel="noopener">→ Lejernes Landsorganisation — tenant advice (Danish)</a>`,
da:`<p>Danmark har nogle af Europas stærkeste lejerrettigheder. At kende dem kan spare dig for betydelige penge og besvær.</p>
<p><strong>Vigtigste rettigheder som lejer:</strong></p>
<ul>
  <li><strong>Huslejeregulering:</strong> I de fleste ældre ejendomme (opført før 1992) er huslejestigninger reguleret og skal godkendes af huslejenævnet. Din udlejer kan ikke bare sætte huslejen op, når vedkommende ønsker det.</li>
  <li><strong>Opsigelsesvarsel:</strong> Din udlejer skal give dig mindst 3 måneders varsel for at opsige lejemålet — ofte længere afhængigt af ejendomstype og botid. Dit varsel er typisk 1 måned.</li>
  <li><strong>Depositumgrænser:</strong> Udlejere kan maksimalt kræve 3 måneders husleje i depositum og maksimalt 3 måneders forudbetalt leje. Tilsammen kan det ikke overstige 6 måneders samlet husleje.</li>
  <li><strong>Stand ved indflytning:</strong> Udlejeren skal udlevere en indflytningsrapport inden for 2 uger efter din indflytning. Gør vedkommende det ikke, kan der ikke opkræves for skader ved fraflytning.</li>
  <li><strong>Vedligeholdelse:</strong> Udlejeren er ansvarlig for større vedligeholdelse. Du er ansvarlig for indvendig vedligeholdelse (maling, mindre reparationer) medmindre din kontrakt siger andet.</li>
</ul>
<p><strong>Hvis du har en tvist med din udlejer:</strong></p>
<ul>
  <li>Kontakt <strong>Huslejenævnet</strong> i din kommune — gratis at bruge, juridisk bindende afgørelser. Det er første skridt ved enhver huslejetvist.</li>
  <li>Kontakt <strong>Lejerbo</strong> eller <strong>Lejernes Landsorganisation (LLO)</strong> — nationale lejerorganisationer der yder juridisk rådgivning og repræsentation.</li>
</ul>
<a href="https://www.lejernet.dk" target="_blank" rel="noopener">→ Lejernes Landsorganisation — lejerrådgivning (dansk)</a>` }
      },
      {
        icon: "👮",
        title: { en:"Your Rights When Dealing with Danish Police", fr:"Vos droits face à la police danoise", ar:"حقوقك عند التعامل مع الشرطة الدنماركية", es:"Tus derechos al tratar con la policía danesa", da:"Dine rettigheder i kontakt med dansk politi" },
        content: { en:`<p>Denmark's police (Politiet) generally have a good reputation for professionalism and restraint. But knowing your rights matters regardless.</p>
<p><strong>If you are stopped by police:</strong></p>
<ul>
  <li><strong>You must identify yourself</strong> — you are legally required to provide your name and address when asked by police. Carry your ID or residence permit.</li>
  <li><strong>You have the right to remain silent</strong> beyond identification — you do not have to answer any other questions.</li>
  <li><strong>Police can search you</strong> without specific cause in designated "search zones" (visitationszoner) in certain high-crime areas — a controversial Danish law. They must be polite and non-discriminatory in doing so.</li>
  <li><strong>If you are arrested:</strong> You have the right to have a lawyer present within 24 hours. You have the right to notify your embassy or a family member. Ask explicitly for both.</li>
  <li><strong>If you do not speak Danish:</strong> You have the right to an interpreter. Request one.</li>
</ul>
<p><strong>Complaints against police:</strong> File with the <strong>Den Uafhængige Politiklagemyndighed (DUP)</strong> — the independent Police Complaints Authority. They are genuinely independent and investigate all complaints. <a href="https://www.politiklagemyndigheden.dk/english" target="_blank" rel="noopener">politiklagemyndigheden.dk</a></p>`,
da:`<p>Dansk politi (Politiet) har generelt et godt ry for professionalisme og tilbageholdenhed. Men det er vigtigt at kende sine rettigheder uanset.</p>
<p><strong>Hvis du bliver standset af politiet:</strong></p>
<ul>
  <li><strong>Du skal identificere dig</strong> — du er lovmæssigt forpligtet til at opgive navn og adresse på politiets anmodning. Medbring dit ID eller opholdstilladelse.</li>
  <li><strong>Du har ret til at forholde dig tavs</strong> ud over identifikation — du behøver ikke besvare andre spørgsmål.</li>
  <li><strong>Politiet kan visitere dig</strong> uden specifik begrundelse i udpegede "visitationszoner" i visse kriminalitetsramte områder — en omdiskuteret dansk lov. De skal optræde høfligt og ikke-diskriminerende.</li>
  <li><strong>Hvis du bliver anholdt:</strong> Du har ret til en advokat inden for 24 timer. Du har ret til at underrette din ambassade eller et familiemedlem. Bed eksplicit om begge dele.</li>
  <li><strong>Hvis du ikke taler dansk:</strong> Du har ret til en tolk. Anmod om en.</li>
</ul>
<p><strong>Klager mod politiet:</strong> Indgives til <strong>Den Uafhængige Politiklagemyndighed (DUP)</strong> — det uafhængige politiklagenævn. De er genuint uafhængige og undersøger alle klager. <a href="https://www.politiklagemyndigheden.dk/english" target="_blank" rel="noopener">politiklagemyndigheden.dk</a></p>` }
      },
      {
        icon: "📜",
        title: { en:"The Danish Ombudsman — When Government Gets It Wrong", fr:"L'Ombudsman danois — Quand le gouvernement se trompe", ar:"أمين المظالم الدنماركي — عندما تخطئ الحكومة", es:"El Defensor del Pueblo danés — Cuando el gobierno se equivoca", da:"Ombudsmanden — når myndighederne fejler" },
        content: { en:`<p>The <strong>Folketingets Ombudsmand</strong> (Parliamentary Ombudsman) is an independent institution that investigates complaints about Danish public authorities — including immigration authorities, municipalities, hospitals, and police.</p>
<p><strong>When to contact the Ombudsman:</strong></p>
<ul>
  <li>A government authority has treated you unfairly or illegally</li>
  <li>A decision was made without proper process</li>
  <li>You have not received an answer within a reasonable time</li>
  <li>You believe a public employee behaved improperly</li>
</ul>
<p><strong>The process:</strong></p>
<ol>
  <li>You must first have exhausted all internal complaint mechanisms (complained to the authority itself, then to any superior authority)</li>
  <li>Submit your complaint at <a href="https://www.ombudsmanden.dk" target="_blank" rel="noopener">ombudsmanden.dk</a> — there is an English section</li>
  <li>The Ombudsman investigates independently and can recommend that an authority reconsider its decision</li>
</ol>
<p class="callout-info">The Ombudsman cannot overturn decisions — but authorities almost always follow the Ombudsman's recommendations in practice, because non-compliance is publicly reported to Parliament.</p>`,
da:`<p><strong>Folketingets Ombudsmand</strong> er en uafhængig institution, der undersøger klager over danske offentlige myndigheder — herunder udlændingemyndigheder, kommuner, hospitaler og politi.</p>
<p><strong>Hvornår du bør kontakte Ombudsmanden:</strong></p>
<ul>
  <li>En offentlig myndighed har behandlet dig urimeligt eller ulovligt</li>
  <li>En afgørelse er truffet uden korrekt proces</li>
  <li>Du ikke har modtaget svar inden for rimelig tid</li>
  <li>Du mener, at en offentlig ansat har opført sig upassende</li>
</ul>
<p><strong>Processen:</strong></p>
<ol>
  <li>Du skal først have udtømt alle interne klagemekanismer (klaget til myndigheden selv, derefter til overordnet myndighed)</li>
  <li>Indsend din klage på <a href="https://www.ombudsmanden.dk" target="_blank" rel="noopener">ombudsmanden.dk</a> — der er en engelsksproglig sektion</li>
  <li>Ombudsmanden undersøger uafhængigt og kan anbefale, at en myndighed genoverveje sin afgørelse</li>
</ol>
<p class="callout-info">Ombudsmanden kan ikke omgøre afgørelser — men myndigheder følger næsten altid Ombudsmandens anbefalinger i praksis, fordi manglende efterlevelse offentligt rapporteres til Folketing.</p>` }
      },
      {
        icon: "⚖️",
        title: { en:"Free Legal Aid in Denmark — Getting Help You Can Afford", fr:"Aide juridique gratuite au Danemark — Obtenir une aide abordable", ar:"المساعدة القانونية المجانية في الدنمارك — الحصول على مساعدة يمكنك تحملها", es:"Asistencia jurídica gratuita en Dinamarca — Obtener ayuda que puedes permitirte", da:"Gratis retshjælp i Danmark — hjælp du har råd til" },
        content: { en:`<p>Legal help in Denmark is accessible even if you have a limited income, through several routes.</p>
<p><strong>Retshjælp (civil legal aid):</strong></p>
<ul>
  <li>Denmark has a network of nonprofit legal aid offices (retshjælpskontorer) offering free or low-cost legal advice to people on low incomes</li>
  <li>Most provide advice on tenancy, employment, family law, and immigration</li>
  <li>Find your nearest office at <a href="https://www.advokatsamfundet.dk" target="_blank" rel="noopener">advokatsamfundet.dk</a> (Danish Bar Association)</li>
</ul>
<p><strong>Free legal advice from lawyers (advokatvagt):</strong></p>
<p>Many municipalities and libraries host free "lawyer on duty" sessions (advokatvagt) where you can get 30–60 minutes of free legal advice from a qualified lawyer. Search "[your municipality] advokatvagt" for schedules.</p>
<p><strong>Court-appointed lawyer (beskikket forsvarsadvokat):</strong></p>
<p>If you are charged with a crime and cannot afford a lawyer, the court will appoint one for you at state expense. This is a constitutional right.</p>
<p><strong>Specific organisations for immigrants:</strong></p>
<ul>
  <li><strong>Refugees Welcome Denmark</strong> — legal advice for refugees and asylum seekers</li>
  <li><strong>Dansk Flygtningehjælp (DRC — Danish Refugee Council):</strong> <a href="https://www.drc.ngo/denmark" target="_blank" rel="noopener">drc.ngo/denmark</a> — provides legal counselling for people with protection status</li>
  <li><strong>Indvandrer Kvindecentret (LOKK):</strong> Legal support for immigrant women in vulnerable situations</li>
</ul>
<a href="https://www.advokatsamfundet.dk/find-advokat/fri-proces-og-retshjælp" target="_blank" rel="noopener">→ Find free legal aid (Advokatsamfundet)</a>`,
da:`<p>Juridisk hjælp i Danmark er tilgængelig selv ved begrænset indkomst, via flere veje.</p>
<p><strong>Retshjælp:</strong></p>
<ul>
  <li>Danmark har et netværk af nonprofit retshjælpskontorer, der tilbyder gratis eller billig juridisk rådgivning til folk med lav indkomst</li>
  <li>De fleste yder rådgivning om lejeforhold, ansættelse, familieret og udlændingeforhold</li>
  <li>Find dit nærmeste kontor på <a href="https://www.advokatsamfundet.dk" target="_blank" rel="noopener">advokatsamfundet.dk</a> (Advokatsamfundet)</li>
</ul>
<p><strong>Gratis advokatrådgivning (advokatvagt):</strong></p>
<p>Mange kommuner og biblioteker afholder gratis "advokatvagt"-sessioner, hvor du kan få 30–60 minutters gratis juridisk rådgivning af en kvalificeret advokat. Søg på "[din kommune] advokatvagt" for tidspunkter.</p>
<p><strong>Beskikket forsvarsadvokat:</strong></p>
<p>Tiltales du for en forbrydelse og ikke har råd til advokat, beskikker retten en for dig på statens regning. Det er en grundlovssikret rettighed.</p>
<p><strong>Specifikke organisationer for indvandrere:</strong></p>
<ul>
  <li><strong>Refugees Welcome Denmark</strong> — juridisk rådgivning til flygtninge og asylansøgere</li>
  <li><strong>Dansk Flygtningehjælp (DRC):</strong> <a href="https://www.drc.ngo/denmark" target="_blank" rel="noopener">drc.ngo/denmark</a> — juridisk rådgivning til folk med beskyttelsesstatus</li>
  <li><strong>Indvandrer Kvindecentret (LOKK):</strong> Juridisk støtte til indvandrende kvinder i sårbare situationer</li>
</ul>
<a href="https://www.advokatsamfundet.dk/find-advokat/fri-proces-og-retshjælp" target="_blank" rel="noopener">→ Find gratis retshjælp (Advokatsamfundet)</a>` }
      },
      {
        icon: "🌍",
        title: { en:"Permit Renewals, Appeals & Protecting Your Status", fr:"Renouvellements de permis, recours et protection de votre statut", ar:"تجديد التصاريح والطعون وحماية وضعك", es:"Renovaciones de permisos, recursos y protección de tu estatus", da:"Fornyelse af opholdstilladelse, klager og beskyttelse af din status" },
        content: { en:`<p>Your right to stay in Denmark is the foundation of everything else. Protecting it proactively is essential.</p>
<p><strong>Permit renewals — critical rules:</strong></p>
<ul>
  <li><strong>Apply before your permit expires.</strong> Apply at least 1 month before expiry. Your right to stay is maintained during processing if you applied in time. If you miss the deadline, you are technically in violation and your employer may need to stop paying you.</li>
  <li><strong>Notify changes promptly.</strong> If you change employer, address, or civil status, notify the immigration authorities (Styrelsen for International Rekruttering og Integration — SIRI) within the required timeframe. Failure to do so can trigger permit problems.</li>
  <li><strong>Keep all documentation.</strong> Tax returns, payslips, employment contracts, tenancy agreements — keep organised files of everything. You may need to prove continuous legal residence for permanent residency or citizenship.</li>
</ul>
<p><strong>If your application is rejected:</strong></p>
<ol>
  <li>You have the right to appeal to the Immigration Appeals Board (Udlændingenævnet) within the specified deadline (usually stated in the decision letter)</li>
  <li>You may continue to stay in Denmark during the appeal process if you applied before your permit expired</li>
  <li>Seek legal advice immediately — the Danish Refugee Council and legal aid offices can advise on appeal prospects</li>
</ol>
<p><strong>SIRI — the Danish Agency for International Recruitment and Integration:</strong> Your main immigration authority for work and family permits. Their website has English guidance. <a href="https://www.siri.dk/en" target="_blank" rel="noopener">siri.dk/en</a></p>
<p><strong>Udlændingenævnet — the Immigration Appeals Board:</strong> Independent body for appeals on immigration decisions. <a href="https://www.udlaendingenaevnet.dk/en" target="_blank" rel="noopener">udlaendingenaevnet.dk/en</a></p>`,
da:`<p>Din ret til at opholde dig i Danmark er fundamentet for alt andet. At beskytte den proaktivt er afgørende.</p>
<p><strong>Fornyelse af opholdstilladelse — kritiske regler:</strong></p>
<ul>
  <li><strong>Ansøg inden din tilladelse udløber.</strong> Ansøg mindst 1 måned inden udløb. Din opholdsstatus opretholdes under sagsbehandlingen, hvis du ansøgte til tiden. Overskrider du fristen, er du teknisk set i strid med reglerne, og din arbejdsgiver kan muligvis ikke fortsætte med at udbetale løn.</li>
  <li><strong>Giv besked om ændringer hurtigt.</strong> Skifter du arbejdsgiver, adresse eller civilstand, skal du underrette udlændingemyndighederne (Styrelsen for International Rekruttering og Integration — SIRI) inden for den krævede frist. Undladelse kan udløse problemer med tilladelsen.</li>
  <li><strong>Gem al dokumentation.</strong> Årsopgørelser, lønsedler, ansættelseskontrakter, lejekontrakter — hold organiserede mapper med alt. Du skal muligvis bevise ubrudt lovligt ophold til permanent opholdstilladelse eller statsborgerskab.</li>
</ul>
<p><strong>Hvis din ansøgning afvises:</strong></p>
<ol>
  <li>Du har ret til at klage til Udlændingenævnet inden den angivne frist (normalt angivet i afgørelsesbrevet)</li>
  <li>Du kan fortsat opholde dig i Danmark under klageprocessen, hvis du ansøgte inden tilladelsen udløb</li>
  <li>Søg juridisk rådgivning straks — Dansk Flygtningehjælp og retshjælpskontorer kan rådgive om klagemulighederne</li>
</ol>
<p><strong>SIRI — Styrelsen for International Rekruttering og Integration:</strong> Din primære udlændingemyndighed for arbejds- og familietilladelser. Deres hjemmeside har engelsksprogede vejledninger. <a href="https://www.siri.dk/en" target="_blank" rel="noopener">siri.dk/en</a></p>
<p><strong>Udlændingenævnet — Klagenævnet for udlændingesager:</strong> Uafhængigt organ for klager over udlændingeafgørelser. <a href="https://www.udlaendingenaevnet.dk/en" target="_blank" rel="noopener">udlaendingenaevnet.dk/en</a></p>` }
      }
    ],
    checklist: [
      { id:"ch15_permit_date", text:{ en:"Set a calendar reminder to renew your permit 2 months before expiry", fr:"Définir un rappel calendrier pour renouveler votre permis 2 mois avant expiration", ar:"تعيين تذكير في التقويم لتجديد تصريحك قبل شهرين من انتهاء صلاحيته", es:"Establecer un recordatorio de calendario para renovar tu permiso 2 meses antes de su vencimiento", da:"Sæt en kalender-reminder til at forny dit opholdstilladelse 2 måneder inden udløb" }, xp:40 },
      { id:"ch15_landlord", text:{ en:"Know your local Huslejenævnet contact in case of rental disputes", fr:"Connaître les coordonnées de votre Huslejenævnet local en cas de litiges locatifs", ar:"معرفة جهة اتصال Huslejenævnet المحلي في حالة نزاعات الإيجار", es:"Conocer el contacto de tu Huslejenævnet local en caso de disputas de alquiler", da:"Kend din lokale huslejenævnet i tilfælde af lejetvister" }, xp:15 },
      { id:"ch15_discrimination", text:{ en:"Save Ligebehandlingsnævnet contact (ligebehandlingsnaevnet.dk)", fr:"Enregistrer le contact de Ligebehandlingsnævnet", ar:"حفظ معلومات الاتصال بـ Ligebehandlingsnævnet", es:"Guardar el contacto de Ligebehandlingsnævnet", da:"Gem Ligebehandlingsnævnets kontaktoplysninger" }, xp:10 },
      { id:"ch15_legal_aid", text:{ en:"Find your nearest free legal aid office (retshjælp)", fr:"Trouver le bureau d'aide juridique gratuit le plus proche", ar:"إيجاد أقرب مكتب مساعدة قانونية مجانية", es:"Encontrar la oficina de asistencia jurídica gratuita más cercana", da:"Find din nærmeste gratis retshjælpskontor" }, xp:15 },
      { id:"ch15_docs", text:{ en:"Organise all your legal documents: permit, contracts, payslips, tax returns", fr:"Organiser tous vos documents légaux: permis, contrats, fiches de paie, déclarations d'impôts", ar:"تنظيم جميع مستنداتك القانونية: التصريح والعقود وكشوف الرواتب والإقرارات الضريبية", es:"Organizar todos tus documentos legales: permiso, contratos, nóminas, declaraciones de impuestos", da:"Organiser alle dine juridiske dokumenter: tilladelse, kontrakter, lønsedler, årsopgørelser" }, xp:30 },
    ]
  }
];
