#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    c = f.read()

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# ── Chapter 12 inline ─────────────────────────────────────────────────────
r('uk:"Культура та Соціальне Життя" },',
  'uk:"Культура та Соціальне Життя", pl:"Kultura i Życie Społeczne" },')
r('uk:"Ставати Частиною Чогось" },',
  'uk:"Ставати Частиною Чогось", pl:"Stawanie się Częścią Czegoś" },')
r('uk:"Hygge, Janteloven, кінець роботи о 16:00 — данська культура сповнена невидимих правил, які мають величезне значення, щойно ви їх зрозумієте." },',
  'uk:"Hygge, Janteloven, кінець роботи о 16:00 — данська культура сповнена невидимих правил, які мають величезне значення, щойно ви їх зрозумієте.", pl:"Hygge, Janteloven, koniec pracy o 16:00 — duńska kultura pełna jest niewidocznych zasad, które mają ogromne znaczenie, gdy już je zrozumiesz." },')

# Ch12 S1: hygge
r(
    'том на якісному соціальному часі — hygge є інфраструктурою для добробуту.</p>` }',
    'том на якісному соціальному часі — hygge є інфраструктурою для добробуту.</p>`,\n               pl:`<p><strong>Hygge</strong> (wymawiane: "hue-ga") to duńska koncepcja przytulności, komfortu i dobrego samopoczucia w towarzystwie — lub w samotności.</p>\n<p><strong>Co to jest hygge w praktyce:</strong></p>\n<ul>\n  <li>Świeczki (Duńczycy używają więcej świec per capita niż ktokolwiek na świecie)</li>\n  <li>Ciepła kawa/herbata i ciasto z bliskimi</li>\n  <li>Spotkania towarzyskie bez telefonów — pełna obecność</li>\n  <li>Wygodne ubranie, koce, ciche rozmowy</li>\n  <li>Dziękowanie za miłe chwile (tak jak Polacy mówią "dziękuję za gościnność")</li>\n</ul>\n<p><strong>Janteloven</strong> to zbiór niepisanych zasad społecznych: nie wywyższaj się, nie uważaj się za lepszego od innych. Ma to wpływ na sposób, w jaki Duńczycy rozmawiają o sukcesie i statusie.</p>\n<p>Hygge nie jest marketingową koncepcją — to rzeczywista praktyka społeczna. Duńczycy inwestują czas w jakościowe chwile towarzyskie — hygge jest infrastrukturą dobrostanu.</p>` }'
)

# Ch12 S2: Janteloven / work culture
r(
    ', що його вплив значно відрізняється залежно від вікової групи та галузі.</p>` }',
    ', що його вплив значно відрізняється залежно від вікової групи та галузі.</p>`,\n               pl:`<p><strong>Janteloven</strong> ("prawo Jante") to zestaw niepisanych norm egalitarnych. Pochodzi z powieści Aksela Sandemosego z 1933 r. Kluczowa zasada: nie uważaj się za lepszego od innych.</p>\n<p><strong>Jak Janteloven wpływa na codzienne życie:</strong></p>\n<ul>\n  <li>Unikanie chwalenia się osiągnięciami i bogactwem</li>\n  <li>Skromność w rozmowach o własnym sukcesie</li>\n  <li>Równość płci głęboko zakorzeniona w kulturze</li>\n  <li>Szef nie jest "ważniejszy" — wszyscy są traktowani jak równi</li>\n</ul>\n<p><strong>Efekt dla migrantów:</strong> Możesz zinterpretować duński brak entuzjazmu jako odrzucenie — ale to norma kulturowa. Duńczycy są powściągliwi, lecz szczerzy. Jednak wpływ Janteloven znacznie różni się w zależności od grupy wiekowej i branży.</p>` }'
)

# Ch12 S3: making friends
r(
    'ля негайного соціального контакту, поки розвиваються ваші данські дружби.</p>` }',
    'ля негайного соціального контакту, поки розвиваються ваші данські дружби.</p>`,\n               pl:`<p>Zaprzyjaźnianie się z Duńczykami zajmuje czas. Ale jest możliwe. Strategie:</p>\n<ul>\n  <li><strong>Dołącz do stowarzyszenia (forening):</strong> Duńczycy organizują się w stowarzyszeniach — sport, muzyka, hobby, wolontariat. To najlepszy sposób na poznanie ludzi.</li>\n  <li><strong>Idź na kursy językowe:</strong> Szkoła językowa to miejsce pełne podobnie myślących imigrantów i czasem Duńczyków.</li>\n  <li><strong>Bądź proaktywny w pracy:</strong> Zaproś współpracowników na kawę lub "fredagsbar" (piątkowy drink po pracy).</li>\n  <li><strong>Meetup.com:</strong> Liczne grupy angielskojęzyczne w Kopenhadze.</li>\n</ul>\n<p><strong>Ekspat-społeczności</strong> jako natychmiastowy kontakt społeczny, dopóki rozwijają się Twoje duńskie przyjaźnie.</p>` }'
)

# Ch12 S4: foreningsliv
r(
    'днань. Знайдіть його за запитом "[назва муніципалітету] foreningsportal".</p>` }',
    'днань. Знайдіть його за запитом "[назва муніципалітету] foreningsportal".</p>`,\n               pl:`<p><strong>Foreningsliv</strong> (życie stowarzyszeniowe) jest rdzeniem duńskiej kultury obywatelskiej. Dania ma ok. 100 000 zarejestrowanych stowarzyszeń — na 6 milionów mieszkańców.</p>\n<p><strong>Rodzaje stowarzyszeń:</strong></p>\n<ul>\n  <li>Sportowe: piłka nożna, badminton, wioślarstwo, triathlon — dla wszystkich poziomów</li>\n  <li>Kulturalne: chóry, orkiestry, teatry amatorskie</li>\n  <li>Polityczne i obywatelskie</li>\n  <li>Hobbystyczne: ogrodnictwo, gry planszowe, gotowanie</li>\n  <li>Wolontariackie: Røde Kors (Czerwony Krzyż), Kirkens Korshær itp.</li>\n</ul>\n<p>Znajdź stowarzyszenia przez wyszukiwanie "[nazwa gminy] foreningsportal".</p>` }'
)

# Ch12 S5: Danish holidays
r(
    ' Працівники отримали невелике щорічне підвищення зарплати як компенсацію.</p>` }',
    ' Працівники отримали невелике щорічне підвищення зарплати як компенсацію.</p>`,\n               pl:`<p>Duńskie święta i ważne daty kulturalne:</p>\n<ul>\n  <li><strong>Fastelavn</strong> (luty): karnawał dla dzieci — przebieranki i słodycze</li>\n  <li><strong>Påske (Wielkanoc)</strong>: ważne święto rodzinne; wiele sklepów zamkniętych przez tydzień</li>\n  <li><strong>Store Bededag</strong>: zniesione jako dzień wolny w 2023 r. (kontrowersyjne — pracownicy dostali małą podwyżkę jako kompensatę)</li>\n  <li><strong>Grundlovsdag (5 czerwca)</strong>: Dzień Konstytucji — dzień wolny</li>\n  <li><strong>Sankthansaften (23 czerwca)</strong>: noc świętojańska — ogniska i piosenki</li>\n  <li><strong>Jul (Boże Narodzenie)</strong>: centralne święto — julefrokost (świąteczne lunche) w pracy od listopada</li>\n  <li><strong>Nytårsaften (31 grudnia)</strong>: sylwester z fajerwerkami</li>\n</ul>` }'
)

# Ch12 S6: food / Too Good To Go
r(
    'ї), щоб купувати залишкову їжу з пекарень і ресторанів зі знижкою 60–70%.</p>` }',
    'ї), щоб купувати залишкову їжу з пекарень і ресторанів зі знижкою 60–70%.</p>`,\n               pl:`<p>Duńska kuchnia jest skromna, ale smaczna. Kluczowe elementy:</p>\n<ul>\n  <li><strong>Smørrebrød</strong>: kanapka na razowym chlebie (rugbrød) z różnymi dodatkami — codzienne duńskie danie</li>\n  <li><strong>Rugbrød</strong>: ciemny chleb żytni na zakwasie — podstawa diety</li>\n  <li><strong>Frikadeller</strong>: kotlety mielone podawane z ziemniakami i sosem</li>\n  <li><strong>Wieprzowina</strong>: Dania jest jednym z największych producentów wieprzowiny na świecie</li>\n  <li><strong>Nowe duńskie gotowanie</strong>: Noma zrewolucjonizowała gastronomię — restauracje z gwiazdkami Michelin rozsiane po Kopenhadze</li>\n</ul>\n<p>Użyj aplikacji <strong>Too Good To Go</strong> (popularna w Danii), by kupować niesprzedaną żywność z piekarni i restauracji ze zniżką 60–70%.</p>` }'
)

# ── Chapter 13 inline ─────────────────────────────────────────────────────
r('uk:"Знайомства та Стосунки" },',
  'uk:"Знайомства та Стосунки", pl:"Randkowanie i Związki" },')
r('uk:"Кохання під Північним Сяйвом" },',
  'uk:"Кохання під Північним Сяйвом", pl:"Miłość pod Zorzą Polarną" },')
r('uk:"Знайомства в Данії — прямі, рівноправні і освіжаюче чесні. Ось культурна дорожня карта." },',
  'uk:"Знайомства в Данії — прямі, рівноправні і освіжаюче чесні. Ось культурна дорожня карта.", pl:"Randkowanie w Danii jest bezpośrednie, równe i orzeźwiająco uczciwe. Oto kulturowa mapa drogowa." },')

# Ch13 S1: dating culture
r(
    'У спортивних клубах, на музичних заходах та у волонтерській діяльності\n</ul>` }',
    'У спортивних клубах, на музичних заходах та у волонтерській діяльності\n</ul>`,\n               pl:`<p>Randkowanie w Danii jest bezpośrednie i egalitarne. Kluczowe cechy:</p>\n<ul>\n  <li><strong>Bezpośredniość:</strong> Jeśli ktoś jest zainteresowany, powie wprost. Nie ma zawoalowanych aluzji.</li>\n  <li><strong>Równość płci:</strong> Dzielenie rachunków jest normalą. Żadna płeć nie oczekuje, że druga zawsze płaci.</li>\n  <li><strong>Wolniejsze tempo:</strong> Duńczycy rzadko spieszą się do związku. Przyjaźń przechodzi w romantykę stopniowo.</li>\n  <li><strong>Aplikacje randkowe:</strong> Tinder, Bumble i Hinge są popularne w Kopenhadze.</li>\n  <li><strong>Spotkania przez aktywności:</strong> W klubach sportowych, na wydarzeniach muzycznych i wolontariacie</li>\n</ul>` }'
)

# Ch13 S3: LGBTQ+
r(
    'більш консервативними. Утім, правова база є однією з найміцніших у світі.</p>` }',
    'більш консервативними. Утім, правова база є однією з найміцніших у світі.</p>`,\n               pl:`<p>Dania jest jednym z najbardziej przyjaznych LGBTQ+ krajów na świecie. Małżeństwa jednopłciowe legalne od 2012 r. — pierwsze na świecie (1989 r. — związki partnerskie).</p>\n<p><strong>Praw gwarancje:</strong></p>\n<ul>\n  <li>Małżeństwa jednopłciowe: pełne prawa od 2012 r.</li>\n  <li>Adopcja: dozwolona dla par tej samej płci</li>\n  <li>Zmiana płci prawnej: uproszczona (wymaga tylko oświadczenia — od 2014 r.)</li>\n  <li>Ochrona przed dyskryminacją: silna, egzekwowana</li>\n</ul>\n<p>Kopenhaga ma tętniące życiem środowisko LGBTQ+, szczególnie w Vesterbro i Nørrebro. Copenhagen Pride odbywa się w sierpniu. Mniejsze miasta mogą być bardziej konserwatywne, ale ramy prawne należą do najsilniejszych na świecie.</p>` }'
)

# Ch13 S4: parental rights unmarried
r(
    'овні батьківські права (forældremyndighed) незалежно від сімейного стану.</p>` }',
    'овні батьківські права (forældremyndighed) незалежно від сімейного стану.</p>`,\n               pl:`<p>Dania ma silne prawa dla rodziców niebędących w związku małżeńskim:</p>\n<ul>\n  <li><strong>Samotni rodzice:</strong> Pełna ochrona prawna. Alimenty regulowane przez Familieretshuset.</li>\n  <li><strong>Wspólna władza rodzicielska (forældremyndighed):</strong> Domyślna dla par; samotne matki mają wyłączną władzę chyba że ojciec uzna dziecko</li>\n  <li><strong>Prawo do kontaktów:</strong> Sąd może wyznaczyć warunki wizyt</li>\n  <li><strong>Alimenty (børnebidrag):</strong> Ustalane przez Familieretshuset lub sąd</li>\n  <li><strong>Świadczenia na dzieci:</strong> Przysługują niezależnie od stanu cywilnego</li>\n</ul>\n<p>Oboje rodziców zachowuje pełne prawa rodzicielskie (forældremyndighed) niezależnie od stanu cywilnego.</p>` }'
)

# Ch13 S5: Familieretshuset
r(
    'rel="noopener">→ Familieretshuset (англійська)</a>` }',
    'rel="noopener">→ Familieretshuset (англійська)</a>`,\n               pl:`<p><strong>Familieretshuset</strong> to duńska agencja rządowa zajmująca się sprawami rodzinnymi — rozwodem, alimentami, prawem do kontaktów z dziećmi i opieką rodzicielską.</p>\n<p><strong>Co robią:</strong></p>\n<ul>\n  <li>Mediacja w sporach rodzinnych</li>\n  <li>Ustalanie alimentów (børnebidrag)</li>\n  <li>Rejestracja i rozwiązywanie związków partnerskich</li>\n  <li>Doradztwo w sprawach rodzicielstwa po rozstaniu</li>\n</ul>\n<p>Pierwszym krokiem przy problemach rodzinnych jest zazwyczaj kontakt z Familieretshuset — nie sądem.</p>\n<a href="https://www.familieretshuset.dk/english" target="_blank" rel="noopener">→ Familieretshuset (angielski)</a>` }'
)

# ── Chapter 14 inline ─────────────────────────────────────────────────────
r("uk:\"Психічне Здоров'я та Добробут\" },",
  "uk:\"Психічне Здоров'я та Добробут\", pl:\"Zdrowie Psychiczne i Dobrostan\" },")
r('uk:"Внутрішня Подорож" },',
  'uk:"Внутрішня Подорож", pl:"Wewnętrzna Podróż" },')
r('uk:"Переїзд до іншої країни — одна з найважчих речей, яку може зробити людина. Ваші почуття є правомірними. Допомога доступна." },',
  'uk:"Переїзд до іншої країни — одна з найважчих речей, яку може зробити людина. Ваші почуття є правомірними. Допомога доступна.", pl:"Przeprowadzka do innego kraju to jedna z najtrudniejszych rzeczy, jakie może zrobić człowiek. Twoje uczucia są uzasadnione. Pomoc jest dostępna." },')

# Ch14 S1: mental health overview
r(
    'вернутися за професійною підтримкою — яку Данія робить справді доступною.</p>` }',
    'вернутися за професійною підтримкою — яку Данія робить справді доступною.</p>`,\n               pl:`<p>Zdrowie psychiczne jest poważnie traktowane w Danii. Stres adaptacyjny po przeprowadzce jest normalny — szukanie pomocy to oznaka siły, nie słabości.</p>\n<p><strong>Typowe wyzwania migracji:</strong></p>\n<ul>\n  <li>Szok kulturowy i dezorientacja (pierwsze 3–6 miesięcy)</li>\n  <li>Samotność i brak sieci wsparcia</li>\n  <li>Presja zawodowa w nowym środowisku</li>\n  <li>Tęsknota za domem i rodziną</li>\n  <li>Niepewność statusu pobytowego</li>\n</ul>\n<p>Wiele z tych uczuć ustępuje po 6–12 miesiącach. Jeśli się nasilają — zwróć się po profesjonalne wsparcie, które Dania czyni naprawdę dostępnym.</p>` }'
)

# Ch14 S2: light / seasonal depression
r(
    'D дослідження показують, що ви вже тижнями отримували недостатньо світла.</p>` }',
    'D дослідження показують, що ви вже тижнями отримували недостатньо світла.</p>`,\n               pl:`<p>Dania leży daleko na północy — zimą dzień trwa zaledwie 7 godzin w Kopenhadze. To wpływa na nastrój i energię wielu mieszkańców.</p>\n<p><strong>Sezonowe zaburzenia afektywne (SAD):</strong></p>\n<ul>\n  <li>Dotykają szacunkowo 10–20% populacji w Skandynawii</li>\n  <li>Objawy: zmęczenie, obniżony nastrój, zwiększony apetyt, trudności ze wstawaniem</li>\n  <li>Zaczynają się zazwyczaj w październiku/listopadzie</li>\n</ul>\n<p><strong>Co pomaga:</strong></p>\n<ul>\n  <li><strong>Lampy do fototerapii (lysterapilampe)</strong>: 10 000 luksów przez 20–30 min rano — klinicznie udowodnione</li>\n  <li>Regularne ćwiczenia na zewnątrz — nawet przy zachmurzeniu</li>\n  <li>Witamina D: badania pokazują, że już po tygodniach brakuje Ci odpowiedniej ilości światła</li>\n</ul>` }'
)

# Ch14 S3: crisis support
r(
    'rel="noopener">→ Livslinjen — кризова підтримка</a>` }',
    'rel="noopener">→ Livslinjen — кризова підтримка</a>`,\n               pl:`<p>Jeśli przeżywasz kryzys emocjonalny, dostępna jest natychmiastowa pomoc:</p>\n<ul>\n  <li><strong>Livslinjen: 70 201 201</strong> — 24/7, po duńsku. Linia kryzysowa i prewencji samobójstw</li>\n  <li><strong>Kirkens Korshær: 45 45 45 46</strong> — wsparcie dla osób samotnych i w trudnej sytuacji</li>\n  <li><strong>BørneTelefonen (dla dzieci/młodzieży): 116 111</strong></li>\n  <li><strong>112</strong> — w bezpośrednim zagrożeniu życia</li>\n</ul>\n<p><strong>Zasoby po angielsku:</strong></p>\n<ul>\n  <li><a href="https://www.expatcounseling.dk" target="_blank" rel="noopener">expatcounseling.dk</a> — psychologowie mówiący po angielsku</li>\n  <li><a href="https://www.mindhelper.dk" target="_blank" rel="noopener">mindhelper.dk</a> — zasoby po angielsku i duńsku</li>\n</ul>\n<a href="https://www.livslinjen.dk" target="_blank" rel="noopener">→ Livslinjen — wsparcie kryzysowe</a>` }'
)

# Ch14 S4: loneliness
r(
    'раїні. Якщо ви на 3-му місяці й досі самотні — це не невдача, це розклад.</p>` }',
    'раїні. Якщо ви на 3-му місяці й досі самотні — це не невдача, це розклад.</p>`,\n               pl:`<p>Samotność to jeden z największych wyzwań dla nowo przybyłych w Danii. Duńczycy mają już ustalone kręgi towarzyskie od szkoły i rzadko aktywnie poszukują nowych przyjaźni.</p>\n<p><strong>Strategie walki z samotnością:</strong></p>\n<ul>\n  <li>Dołącz do stowarzyszenia (forening) w swojej dziedzinie zainteresowań</li>\n  <li>Zapisz się na kurs duńskiego — naturalnie tworzą się grupy</li>\n  <li>Aktywnie szukaj meetupów angielskojęzycznych (meetup.com)</li>\n  <li>Bądź proaktywny — Duńczycy są mili, ale nie będą sami inicjować kontaktu</li>\n  <li>Nie porównuj pierwszych miesięcy z dojrzałymi przyjaźniami w domu</li>\n</ul>\n<p>Jeśli po 3 miesiącach wciąż czujesz się samotny — to nie jest porażka, to harmonogram.</p>` }'
)

# Ch14 S5: social services
r(
    'ї муніципальної ради може підтримати вас у періоди нездатності до роботи.</p>` }',
    'ї муніципальної ради може підтримати вас у періоди нездатності до роботи.</p>`,\n               pl:`<p>Dania ma rozbudowaną sieć usług społecznych dla osób w trudnej sytuacji:</p>\n<ul>\n  <li><strong>Socialrådgiver (pracownik socjalny):</strong> Dostępny przez gminę — bezpłatne doradztwo w sprawach socjalnych, finansowych i rodzinnych</li>\n  <li><strong>Sygedagpenge (zasiłek chorobowy):</strong> Jeśli jesteś niezdolny do pracy, gmina może wypłacać zasiłek chorobowy po zakończeniu płatności przez pracodawcę</li>\n  <li><strong>Psykolog przez podstawową opiekę:</strong> Skierowanie od lekarza pierwszego kontaktu do psychologa z częściową refundacją</li>\n  <li><strong>Rådgivning (poradnictwo):</strong> Wiele organizacji wolontariackich oferuje bezpłatne porady — Red Barnet, Røde Kors itp.</li>\n</ul>\n<p>Gminna rada społeczna (socialudvalg) może wspierać Cię w okresach niezdolności do pracy.</p>` }'
)

# ── Chapter 15 inline ─────────────────────────────────────────────────────
r('uk:"Права та Захист" },',
  'uk:"Права та Захист", pl:"Prawa i Ochrona" },')
r('uk:"Знайте, На Що Ви Маєте Право" },',
  'uk:"Знайте, На Що Ви Маєте Право", pl:"Znaj Swoje Uprawnienia" },')
r('uk:"Данія має потужний правовий захист для всіх — незалежно від громадянства або типу дозволу. Знайте свої права." },',
  'uk:"Данія має потужний правовий захист для всіх — незалежно від громадянства або типу дозволу. Знайте свої права.", pl:"Dania ma silną ochronę prawną dla wszystkich — niezależnie od obywatelstwa czy rodzaju pozwolenia. Znaj swoje prawa." },')

# Ch15 S1: anti-discrimination
r(
    'rel="noopener">→ Ligebehandlingsnævnet — Рада з рівного поводження (англійська)</a>` }',
    'rel="noopener">→ Ligebehandlingsnævnet — Рада з рівного поводження (англійська)</a>`,\n               pl:`<p>Dania ma silną ochronę przed dyskryminacją. Kluczowe prawa:</p>\n<ul>\n  <li>Zakaz dyskryminacji w pracy ze względu na narodowość, płeć, religię, wiek, niepełnosprawność, orientację seksualną</li>\n  <li>Zakaz dyskryminacji przy dostępie do towarów i usług</li>\n  <li><strong>Ligebehandlingsnævnet</strong> (Rada Równego Traktowania): bezpłatny organ rozpatrujący skargi na dyskryminację</li>\n</ul>\n<p><strong>Jeśli doświadczasz dyskryminacji:</strong></p>\n<ol>\n  <li>Dokumentuj wszystkie incydenty (daty, świadkowie, komunikacja)</li>\n  <li>Skontaktuj się ze związkiem zawodowym (jeśli jesteś członkiem)</li>\n  <li>Złóż skargę do Ligebehandlingsnævnet (bezpłatne, online)</li>\n  <li>Rozważ pomoc prawną — organizacje migranckie i retshjælpskontorer mogą pomóc</li>\n</ol>\n<a href="https://www.ligebehandlingsnaevnet.dk/en" target="_blank" rel="noopener">→ Ligebehandlingsnævnet — Rada Równego Traktowania (angielski)</a>` }'
)

# Ch15 S2: tenant rights
r(
    'rel="noopener">→ Lejernes Landsorganisation — консультації орендарів (данська)</a>` }',
    'rel="noopener">→ Lejernes Landsorganisation — консультації орендарів (данська)</a>`,\n               pl:`<p>Prawa najemców w Danii są silnie chronione. Kluczowe zasady przypomniane:</p>\n<ul>\n  <li><strong>Huslejenævnet</strong>: bezpłatny trybunał czynszowy w każdej gminie — rozpatruje spory o czynsz, kaucję, stan lokalu</li>\n  <li><strong>Lejernes Landsorganisation (LL)</strong>: ogólnokrajowa organizacja najemców — porady prawne za składkę</li>\n  <li>Właściciel ma obowiązek zwrócić kaucję w rozsądnym terminie (zazwyczaj 6 tygodni po protokole zdawczym)</li>\n  <li>Podwyżka czynszu musi być uzasadniona i przestrzegać przepisów Lejeloven</li>\n</ul>\n<a href="https://www.lejerne.dk" target="_blank" rel="noopener">→ Lejernes Landsorganisation — porady dla najemców (duński)</a>` }'
)

# Ch15 S3: police complaints
r(
    'rel="noopener">politiklagemyndigheden.dk</a></p>` }',
    'rel="noopener">politiklagemyndigheden.dk</a></p>`,\n               pl:`<p>W Danii istnieje niezależny organ ds. skarg na policję:</p>\n<ul>\n  <li><strong>Den Uafhængige Politiklagemyndighed</strong> (Niezależny Organ ds. Skarg na Policję): rozpatruje skargi na zachowanie funkcjonariuszy policji</li>\n  <li>Możesz złożyć skargę, jeśli uważasz, że policja naruszyła Twoje prawa — niezależnie od statusu pobytowego</li>\n  <li>Możliwość złożenia skargi online na <a href="https://www.politiklagemyndigheden.dk/english" target="_blank" rel="noopener">politiklagemyndigheden.dk</a></li>\n</ul>\n<p><strong>Prawa podczas kontroli policyjnej:</strong></p>\n<ul>\n  <li>Masz prawo wiedzieć, dlaczego jesteś zatrzymany</li>\n  <li>Masz prawo do tłumacza</li>\n  <li>Masz prawo do adwokata — w przypadku zatrzymania</li>\n</ul>` }'
)

# Ch15 S4: Ombudsman
r(
    'ї омбудсмана, оскільки невиконання публічно повідомляється до Парламенту.</p>` }',
    'ї омбудсмана, оскільки невиконання публічно повідомляється до Парламенту.</p>`,\n               pl:`<p><strong>Ombudsmanden</strong> (Rzecznik Praw Obywatelskich) nadzoruje, czy organy publiczne działają zgodnie z prawem i sprawiedliwością.</p>\n<p><strong>Kiedy skontaktować się z Ombudsmanem:</strong></p>\n<ul>\n  <li>Uważasz, że organ publiczny (urząd, szkoła, szpital) naruszył Twoje prawa</li>\n  <li>Decyzja administracyjna wydaje Ci się niesprawiedliwa lub niezgodna z prawem</li>\n  <li>Nie uzyskałeś odpowiedzi od organu w rozsądnym terminie</li>\n</ul>\n<p>Skarga jest bezpłatna. Musisz najpierw wyczerpać inne środki odwoławcze (np. odwołanie wewnętrzne). Organy publiczne na ogół stosują się do zaleceń Ombudsmana — bo niewykonanie jest publicznie zgłaszane do Parlamentu.</p>` }'
)

# Ch15 S5: free legal aid
r(
    'rel="noopener">→ Знайдіть безкоштовну юридичну допомогу (Advokatsamfundet)</a>` }',
    'rel="noopener">→ Знайдіть безкоштовну юридичну допомогу (Advokatsamfundet)</a>`,\n               pl:`<p>Pomoc prawna w Danii jest dostępna nawet przy ograniczonych dochodach.</p>\n<p><strong>Retshjælp (cywilna pomoc prawna):</strong></p>\n<ul>\n  <li>Sieć niekomercyjnych biur pomocy prawnej (retshjælpskontorer) — bezpłatne lub tanie porady dla osób o niskich dochodach</li>\n  <li>Większość doradza w sprawach najmu, zatrudnienia, prawa rodzinnego i imigracji</li>\n  <li>Znajdź najbliższe biuro na <a href="https://www.advokatsamfundet.dk" target="_blank" rel="noopener">advokatsamfundet.dk</a></li>\n</ul>\n<p><strong>Advokatvagt (dyżur adwokacki):</strong> Wiele gmin i bibliotek organizuje bezpłatne sesje "adwokata dyżurnego" — 30–60 minut bezpłatnej porady od wykwalifikowanego adwokata. Szukaj "[twoja gmina] advokatvagt".</p>\n<p><strong>Obrońca z urzędu (beskikket forsvarsadvokat):</strong> Jeśli postawiono Ci zarzuty karne i nie stać Cię na adwokata, sąd go wyznaczy na koszt państwa. To prawo konstytucyjne.</p>\n<p><strong>Organizacje dla imigrantów:</strong></p>\n<ul>\n  <li><strong>Refugees Welcome Denmark</strong> — porady prawne dla uchodźców</li>\n  <li><strong>Dansk Flygtningehjælp (DRC)</strong>: <a href="https://www.drc.ngo/denmark" target="_blank" rel="noopener">drc.ngo/denmark</a> — porady dla osób z ochroną</li>\n</ul>\n<a href="https://www.advokatsamfundet.dk/find-advokat/fri-proces-og-retshjælp" target="_blank" rel="noopener">→ Znajdź bezpłatną pomoc prawną (Advokatsamfundet)</a>` }'
)

# Ch15 S6: permit renewals
r(
    'rel="noopener">udlaendingenaevnet.dk/en</a></p>` }',
    'rel="noopener">udlaendingenaevnet.dk/en</a></p>`,\n               pl:`<p>Twoje prawo do pobytu w Danii jest fundamentem wszystkiego. Chroń je proaktywnie.</p>\n<p><strong>Przedłużenie pozwolenia — kluczowe zasady:</strong></p>\n<ul>\n  <li><strong>Aplikuj przed wygaśnięciem pozwolenia.</strong> Co najmniej 1 miesiąc wcześniej. Prawo pobytu zachowujesz w trakcie rozpatrywania, jeśli złożyłeś wniosek na czas.</li>\n  <li><strong>Zgłaszaj zmiany niezwłocznie.</strong> Zmiana pracodawcy, adresu lub stanu cywilnego wymaga powiadomienia SIRI w wymaganym terminie.</li>\n  <li><strong>Przechowuj całą dokumentację.</strong> Zeznania podatkowe, odcinki płac, umowy o pracę, umowy najmu — na wypadek ubiegania się o stały pobyt lub obywatelstwo.</li>\n</ul>\n<p><strong>W razie odrzucenia wniosku:</strong></p>\n<ol>\n  <li>Masz prawo do odwołania do Udlændingenævnet w podanym terminie</li>\n  <li>Możesz pozostawać w Danii podczas postępowania odwoławczego, jeśli złożyłeś wniosek przed wygaśnięciem</li>\n  <li>Natychmiast zasięgnij porady prawnej</li>\n</ol>\n<p><strong>SIRI</strong> (<a href="https://www.siri.dk/en" target="_blank" rel="noopener">siri.dk/en</a>): Twój główny organ imigracyjny dla pozwoleń na pracę i pobyt rodzinny.</p>\n<p><strong>Udlændingenævnet</strong>: Niezależny organ odwoławczy. <a href="https://www.udlaendingenaevnet.dk/en" target="_blank" rel="noopener">udlaendingenaevnet.dk/en</a></p>` }'
)

errors = []
applied = 0
for old, new in REPLACEMENTS:
    cnt = c.count(old)
    if cnt == 0: errors.append(f"NOT FOUND: {repr(old[:80])}")
    elif cnt > 1: errors.append(f"AMBIGUOUS ({cnt}): {repr(old[:80])}")
    else: c = c.replace(old, new, 1); applied += 1

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(c)
print(f"Applied: {applied}/{len(REPLACEMENTS)}")
for e in errors: print(e)
print("Total pl: blocks:", c.count('pl:`'))
