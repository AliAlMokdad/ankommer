#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# ── Chapter 4 inline ───────────────────────────────────────────────────────
r('uk:"Гроші та Банківська Справа" },',
  'uk:"Гроші та Банківська Справа", pl:"Pieniądze i Bankowość" },')
r('uk:"Данський Гаманець" },',
  'uk:"Данський Гаманець", pl:"Duński Portfel" },')
r('uk:"Зрозумійте, як рухаються данські гроші — від зарплати до пенсії та MobilePay — і змусьте кожну крону працювати на вас." },',
  'uk:"Зрозумійте, як рухаються данські гроші — від зарплати до пенсії та MobilePay — і змусьте кожну крону працювати на вас.", pl:"Zrozum, jak przepływają duńskie pieniądze — od pensji przez emeryturę po MobilePay — i spraw, by każda korona pracowała dla Ciebie." },')

# Ch4 S1: NemKonto
r(
'<a href="https://www.nemkonto.dk" target="_blank" rel="noopener">→ Зареєструвати або оновити NemKonto (офіційний сайт)</a>` }',
'<a href="https://www.nemkonto.dk" target="_blank" rel="noopener">→ Зареєструвати або оновити NemKonto (офіційний сайт)</a>`,\n               pl:`<p><strong>NemKonto</strong> (dosłownie "łatwe konto") to nie osobne konto bankowe — to oznaczenie, które nadajesz istniejącemu kontu, by rząd duński wiedział, dokąd wysyłać Ci pieniądze. Zwroty podatkowe, zasiłki na dzieci, świadczenia emerytalne, zasiłki dla bezrobotnych — wszystko trafia na Twoje NemKonto.</p>\n<p class="callout-warning"><strong>To obowiązkowe.</strong> Każda osoba z numerem CPR musi mieć NemKonto. Bez niego rząd dosłownie nie może Ci niczego wypłacić, a zwroty podatkowe mogą się opóźnić o miesiące.</p>\n<p><strong>Jak zarejestrować NemKonto:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Otwórz duńskie konto bankowe (większość banków wymaga numeru CPR)</li>\n  <li><span class="step-num">2</span>Wejdź na <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> i zaloguj się przez MitID</li>\n  <li><span class="step-num">3</span>Wybierz swoje konto z listy i potwierdź</li>\n</ol>\n<p>Możesz też wyznaczyć NemKonto bezpośrednio przez aplikację lub stronę swojego banku. Nordea, Danske Bank i Lunar umożliwiają to w aplikacji.</p>\n<a href="https://www.nemkonto.dk" target="_blank" rel="noopener">→ Zarejestruj lub zaktualizuj NemKonto (oficjalne)</a>` }'
)

# Ch4 S2: Tax card (skattekort)
r(
'<a href="https://skat.dk/en-us/individuals/tax-card-and-withholding-tax/" target="_blank" rel="noopener">→ Податкова картка на skat.dk (офіційний, англійська)</a>` }',
'<a href="https://skat.dk/en-us/individuals/tax-card-and-withholding-tax/" target="_blank" rel="noopener">→ Податкова картка на skat.dk (офіційний, англійська)</a>`,\n               pl:`<p>Twoja <strong>skattekort</strong> (karta podatkowa) mówi pracodawcy dokładnie, ile podatku potrącić z Twojej pensji. Bez niej pracodawca jest prawnie zobowiązany do potrącenia <strong>55%</strong> — maksymalna stawka awaryjna. To nie kara, lecz domyślna wartość systemu przy braku karty. Ale stracisz większość pierwszej wypłaty, jeśli tego nie załatwisz.</p>\n<p><strong>Jak uzyskać kartę podatkową:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Zaloguj się na <a href="https://skat.dk" target="_blank" rel="noopener">skat.dk</a> przez MitID</li>\n  <li><span class="step-num">2</span>Przejdź do "Forskudsopgørelse" (wstępne zeznanie podatkowe)</li>\n  <li><span class="step-num">3</span>Wpisz spodziewany dochód, odliczenia (praca, transport itp.)</li>\n  <li><span class="step-num">4</span>Pracodawca automatycznie otrzymuje Twoją kartę podatkową — nie trzeba jej wysyłać ręcznie</li>\n</ol>\n<p><strong>Dwa rodzaje kart podatkowych:</strong></p>\n<ul>\n  <li><strong>Frikort</strong> — jeśli Twój łączny roczny dochód jest niższy niż 51 600 DKK (ulga osobista 2025). Do tej kwoty nie płacisz podatku.</li>\n  <li><strong>Bikort</strong> — do drugiej pracy. Główny pracodawca używa głównej karty; drugorzędny używa bikort (stała stawka 40% bez ulgi).</li>\n</ul>\n<p class="callout-warning">Zaktualizuj forskudsopgørelse przy zmianie sytuacji — nowa praca, podwyżka, założenie firmy, dochód z najmu. Błąd oznacza duży rachunek lub zwrot na koniec roku. SKAT nie karze za proaktywne korekty.</p>\n<a href="https://skat.dk/en-us/individuals/tax-card-and-withholding-tax/" target="_blank" rel="noopener">→ Karta podatkowa na skat.dk (oficjalne, angielski)</a>` }'
)

# Ch4 S3: årsopgørelse (annual tax statement)
r(
'<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ Посібник з årsopgørelse (SKAT офіційний)</a>` }',
'<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ Посібник з årsopgørelse (SKAT офіційний)</a>`,\n               pl:`<p>Każdego roku w marcu SKAT (duński urząd skarbowy) wysyła Ci <strong>årsopgørelse</strong> — roczne zeznanie podatkowe. Pokazuje Twój całkowity dochód, zapłacony podatek i czy masz nadpłatę, czy niedopłatę.</p>\n<p><strong>Co robić:</strong></p>\n<ul>\n  <li>Zaloguj się na <a href="https://skat.dk" target="_blank" rel="noopener">skat.dk</a> przez MitID i sprawdź zeznanie</li>\n  <li>Jeśli masz <strong>nadpłatę (overskydende skat)</strong>: zwrot trafia automatycznie na Twoje NemKonto — zazwyczaj w ciągu kilku tygodni od wystawienia zeznania</li>\n  <li>Jeśli masz <strong>niedopłatę (restskat)</strong>: możesz zapłacić jednorazowo lub rozłożyć na raty pobierane przez kolejny rok</li>\n</ul>\n<p><strong>Typowe odliczenia, które warto sprawdzić:</strong></p>\n<ul>\n  <li>Koszty dojazdu (befordringsfradrag) — do pracy powyżej 12 km dziennie</li>\n  <li>Składki na związek zawodowy i A-kasę (kasę bezrobotnych)</li>\n  <li>Darowizny na zatwierdzone organizacje charytatywne</li>\n  <li>Odsetki od kredytu</li>\n</ul>\n<p>Wiele osób ma nadpłatę w pierwszym roku — system zakłada wyższy dochód, niż faktycznie zarabiasz jako nowo przybyły.</p>\n<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ Przewodnik po årsopgørelse (SKAT oficjalne)</a>` }'
)

# Ch4 S4: MobilePay
r(
'<a href="https://www.mobilepay.dk/hjaelp" target="_blank" rel="noopener">→ Допомога MobilePay (доступна англійська)</a>` }',
'<a href="https://www.mobilepay.dk/hjaelp" target="_blank" rel="noopener">→ Допомога MobilePay (доступна англійська)</a>`,\n               pl:`<p><strong>MobilePay</strong> to duński odpowiednik Revolut/PayPal — ale używany przez praktycznie wszystkich w Danii. Płacisz przez telefon w kawiarniach, dzielisz rachunek ze znajomymi, oddajesz pieniądze za czynsz. Większość zbiórek, zdarzeń lokalnych i małych firm używa MobilePay zamiast gotówki.</p>\n<p><strong>Jak to działa:</strong></p>\n<ul>\n  <li>Pobierz aplikację MobilePay i zarejestruj się numerem duńskiego telefonu</li>\n  <li>Połącz ze swoim duńskim kontem bankowym</li>\n  <li>Płać przez zeskanowanie kodu QR lub wpisanie numeru telefonu</li>\n  <li>Wysyłaj i odbieraj pieniądze natychmiastowo</li>\n</ul>\n<p class="callout-warning">MobilePay wymaga duńskiego numeru telefonu i duńskiego konta bankowego. Załatw to wcześnie — nowo przybyłym zajmuje to zwykle 2–4 tygodnie.</p>\n<p>Alternatywą jest <strong>Swipp</strong> (używany przez niektóre banki), ale MobilePay jest de facto standardem.</p>\n<a href="https://www.mobilepay.dk/hjaelp" target="_blank" rel="noopener">→ Pomoc MobilePay (dostępna po angielsku)</a>` }'
)

# Ch4 S5: Pensions
r(
'<a href="https://www.pensionsinfo.dk" target="_blank" rel="noopener">pensionsinfo.dk</a>.</p>` }',
'<a href="https://www.pensionsinfo.dk" target="_blank" rel="noopener">pensionsinfo.dk</a>.</p>`,\n               pl:`<p>Duński system emerytalny składa się z trzech filarów:</p>\n<ul>\n  <li><strong>Folkepension</strong> — państwowa emerytura podstawowa dla wszystkich zamieszkałych w Danii. Wysokość zależy od liczby lat zamieszkania (pełna emerytura po 40 latach). Wiek emerytalny: 67 lat (z podwyżką).</li>\n  <li><strong>Arbejdsmarkedspension</strong> — pracownicza emerytura zakładowa. Ustalana w umowie zbiorowej lub przez pracodawcę. Zazwyczaj 12–17% wynagrodzenia brutto (składka pracodawcy + pracownika). Zaczyna się automatycznie przy wielu zatrudnieniach.</li>\n  <li><strong>Privat pension</strong> — prywatna emerytura dobrowolna. Odliczalna podatkowo do określonego limitu.</li>\n</ul>\n<p><strong>Jako nowo przybyły:</strong> sprawdź, czy Twoja umowa o pracę zawiera emeryturę zakładową. Jeśli tak, jest ona automatycznie odprowadzana. Sprawdź swoje składki na <a href="https://www.pensionsinfo.dk" target="_blank" rel="noopener">pensionsinfo.dk</a>.</p>` }'
)

# Ch4 S6: bank comparison
r(
'nemkonto.dk</a> та зареєструйте його як свій NemKonto.</p>` }',
'nemkonto.dk</a> та зареєструйте його як свій NemKonto.</p>`,\n               pl:`<p>Aby otworzyć duńskie konto bankowe, zazwyczaj potrzebujesz: numeru CPR, paszportu/dowodu tożsamości i duńskiego adresu. Opcje dla nowo przybyłych:</p>\n<table class="info-table">\n  <tr><th>Bank</th><th>Konto online</th><th>Angielski</th><th>Opłaty</th><th>Dla nowo przybyłych</th></tr>\n  <tr><td><strong>Lunar</strong></td><td>✅ Tak</td><td>✅ Tak</td><td>Bezpłatne do 69 DKK/mies.</td><td>✅ Otwarcie online</td></tr>\n  <tr><td><strong>Revolut DK</strong></td><td>✅ Tak</td><td>✅ Tak</td><td>Bezpłatne/premium</td><td>✅ Szybki start</td></tr>\n  <tr><td><strong>Danske Bank</strong></td><td>✅ Tak</td><td>Częściowo</td><td>~0–50 DKK/mies.</td><td>⚠️ Może wymagać wizyty</td></tr>\n  <tr><td><strong>Nordea</strong></td><td>✅ Tak</td><td>Częściowo</td><td>~0–50 DKK/mies.</td><td>⚠️ Może wymagać wizyty</td></tr>\n</table>\n<p><strong>Wskazówka:</strong> Otwórz Lunar lub Revolut online natychmiast po otrzymaniu CPR, a następnie otwórz tradycyjne konto bankowe. Zarejestruj tradycyjne konto na <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> jako NemKonto.</p>` }'
)

# ── Chapter 5 inline ───────────────────────────────────────────────────────
r('uk:"Охорона здоров\'я" },',
  'uk:"Охорона здоров\'я", pl:"Opieka Zdrowotna" },')
r('uk:"Система, яка дійсно піклується" },',
  'uk:"Система, яка дійсно піклується", pl:"System, który naprawdę dba" },')
r('uk:"Данська охорона здоров\'я є однією з найкращих у світі — і вона безкоштовна для резидентів. Ось як нею користуватися." },',
  'uk:"Данська охорона здоров\'я є однією з найкращих у світі — і вона безкоштовна для резидентів. Ось як нею користуватися.", pl:"Duńska opieka zdrowotna należy do najlepszych na świecie — i jest bezpłatna dla rezydentów. Oto jak z niej korzystać." },')

# Ch5 S1: sundhedskort
r(
'<a href="https://www.sundhed.dk/borger/patienthaandbogen/sundhedsvaesenets-opbygning/indlaegning-og-behandling/sundhedskortet/" target="_blank" rel="noopener">→ Про sundhedskort (sundhed.dk офіційний)</a>` }',
'<a href="https://www.sundhed.dk/borger/patienthaandbogen/sundhedsvaesenets-opbygning/indlaegning-og-behandling/sundhedskortet/" target="_blank" rel="noopener">→ Про sundhedskort (sundhed.dk офіційний)</a>`,\n               pl:`<p>Twoja <strong>sundhedskort</strong> (żółta karta zdrowia) to klucz do całego systemu opieki zdrowotnej. Wydawana przez gminę po rejestracji pod adresem w Danii (zazwyczaj 2–8 tygodni po rejestracji CPR).</p>\n<p><strong>Co zawiera:</strong></p>\n<ul>\n  <li>Twoje dane osobowe i numer CPR</li>\n  <li>Imię i adres Twojego lekarza pierwszego kontaktu (praktiserende læge)</li>\n  <li>Duński numer identyfikacyjny ubezpieczenia zdrowotnego</li>\n</ul>\n<p><strong>Jak ją uzyskać:</strong> Zarejestruj swój adres w gminie. Karta zostanie automatycznie wysłana pocztą. Możesz też pobrać cyfrową wersję przez sundhed.dk po zalogowaniu MitID.</p>\n<p class="callout-warning">Bez sundhedskort nadal możesz korzystać z opieki zdrowotnej w nagłych przypadkach, ale będziesz płacić pełne koszty za rutynowe wizyty. Zarejestruj się tak szybko, jak to możliwe.</p>\n<a href="https://www.sundhed.dk/borger/patienthaandbogen/sundhedsvaesenets-opbygning/indlaegning-og-behandling/sundhedskortet/" target="_blank" rel="noopener">→ O sundhedskort (sundhed.dk oficjalne)</a>` }'
)

# Ch5 S2: GP (læge)
r(
'ерніться до Borgerservice вашої комуни — вони допоможуть із призначенням.</p>` }',
'ерніться до Borgerservice вашої комуни — вони допоможуть із призначенням.</p>`,\n               pl:`<p>Twój <strong>praktiserende læge</strong> (lekarz pierwszego kontaktu, GP) to Twój punkt wejścia do całego systemu opieki zdrowotnej. Nie możesz udać się bezpośrednio do specjalisty bez skierowania od lekarza — z wyjątkiem nagłych przypadków, okulistów i dentystów.</p>\n<p><strong>Jak wybrać lekarza:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Wejdź na <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a> i wyszukaj lekarzy w swojej okolicy</li>\n  <li><span class="step-num">2</span>Sprawdź, czy przyjmuje nowych pacjentów (niektóre listy są zamknięte)</li>\n  <li><span class="step-num">3</span>Zadzwoń lub zapisz się przez internet</li>\n  <li><span class="step-num">4</span>Lekarz prześle Ci potwierdzenie pocztą</li>\n</ol>\n<p>Możesz zmienić lekarza raz na 3 miesiące. Jeśli nie możesz znaleźć lekarza przyjmującego nowych pacjentów, skontaktuj się z Borgerservice swojej gminy — pomogą Ci z przypisaniem.</p>` }'
)

# Ch5 S3: 1813 emergency
r(
'невідкладної допомоги, але 1813 часто направить вас до швидшого варіанта.</p>` }',
'невідкладної допомоги, але 1813 часто направить вас до швидшого варіанта.</p>`,\n               pl:`<p><strong>Jak uzyskać pomoc medyczną w Danii — kiedy dzwonić:</strong></p>\n<ul>\n  <li><strong>112</strong> — zagrożenie życia (zawał serca, wypadek, pożar). Bezpłatny, priorytetowy.</li>\n  <li><strong>1813</strong> — pilna opieka medyczna nie zagrażająca życiu (w Regionie Stołecznym). W innych regionach zadzwoń do swojego lekarza pierwszego kontaktu po godzinach lub sprawdź lokalny numer dyżurny.</li>\n  <li><strong>Lekarz pierwszego kontaktu</strong> — rutynowe schorzenia w godzinach pracy. Zawsze pierwsza opcja dla spraw niepinych.</li>\n  <li><strong>Szpitalny oddział ratunkowy (skadestue)</strong> — urazy i nagłe przypadki. Udaj się bezpośrednio.</li>\n</ul>\n<p class="callout-warning">Dzwonienie pod 112 w sprawach niepilnych jest źle widziane i może opóźnić pomoc innym.</p>` }'
)

# Ch5 S4: dentist
r(
'адна допомога: дзвоніть <strong>70 11 31 31</strong> (поза робочим часом)</p>` }',
'адна допомога: дзвоніть <strong>70 11 31 31</strong> (поза робочим часом)</p>`,\n               pl:`<p>Opieka dentystyczna w Danii jest <strong>częściowo refundowana</strong> dla dorosłych (zazwyczaj 40–60% zniżki), ale niezbędne jest ubezpieczenie uzupełniające lub posiadanie środków własnych.</p>\n<p><strong>Co jest objęte:</strong></p>\n<ul>\n  <li>Dzieci do 18. roku życia: <strong>bezpłatna</strong> opieka dentystyczna</li>\n  <li>Dorośli: refundacja państwowa obejmuje część kosztów standardowych zabiegów</li>\n  <li>Ortodoncja i leczenie estetyczne: zazwyczaj w całości pokrywane przez pacjenta</li>\n</ul>\n<p><strong>Jak znaleźć dentystę:</strong> Wyszukaj "tandlæge" na <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a> lub w Google Maps. Wiele gabinetów przyjmuje nowych pacjentów — inaczej niż lekarze pierwszego kontaktu.</p>\n<p><strong>Sygeforsikring "denmark"</strong> — prywatne uzupełniające ubezpieczenie zdrowotne za ~130 DKK/miesiąc, które pokrywa znaczną część kosztów dentystycznych. Warto się zarejestrować wcześnie (lista oczekujących może trwać do 6 miesięcy).</p>\n<p>Dentysta dyżurny (tandlægevagt) dla nagłych bólów zębów: dzwoń <strong>70 11 31 31</strong> (poza godzinami pracy)</p>` }'
)

# Ch5 S5: mental health
r(
'<a href="https://www.sundhed.dk/borger/patienthaandbogen/psykiatri-og-psykologi/" target="_blank" rel="noopener">→ Ресурси з психічного здоров\'я (sundhed.dk)</a>` }',
'<a href="https://www.sundhed.dk/borger/patienthaandbogen/psykiatri-og-psykologi/" target="_blank" rel="noopener">→ Ресурси з психічного здоров\'я (sundhed.dk)</a>`,\n               pl:`<p>Usługi zdrowia psychicznego w Danii są dostępne zarówno przez system publiczny, jak i prywatnie. Jako nowo przybyły możesz odczuwać stres adaptacyjny, samotność lub trudności kulturowe — szukanie pomocy jest oznaką siły.</p>\n<p><strong>Opcje publiczne:</strong></p>\n<ul>\n  <li>Skonsultuj się najpierw z lekarzem pierwszego kontaktu — może skierować do psychologa lub psychiatry z refundacją NFZ</li>\n  <li>Centrum zdrowia psychicznego (psykiatrisk center) — poważniejsze stany poprzez skierowanie lekarza</li>\n</ul>\n<p><strong>Opcje prywatne i szybsze:</strong></p>\n<ul>\n  <li>Psycholog prywatny: 800–1200 DKK za sesję (część refundowana przy skierowaniu lekarza)</li>\n  <li>Online: <a href="https://www.mindhelper.dk" target="_blank" rel="noopener">mindhelper.dk</a> — zasoby po duńsku i angielsku</li>\n  <li>Telefon zaufania (Livslinjen): <strong>70 201 201</strong> (24/7, po duńsku)</li>\n</ul>\n<a href="https://www.sundhed.dk/borger/patienthaandbogen/psykiatri-og-psykologi/" target="_blank" rel="noopener">→ Zasoby zdrowia psychicznego (sundhed.dk)</a>` }'
)

# Ch5 S6: supplementary insurance
r(
'<a href="https://www.sygeforsikring.dk/english" target="_blank" rel="noopener">→ Приєднатися до Sygeforsikring "denmark" (сторінка англійською)</a>` }',
'<a href="https://www.sygeforsikring.dk/english" target="_blank" rel="noopener">→ Приєднатися до Sygeforsikring "denmark" (сторінка англійською)</a>`,\n               pl:`<p><strong>Sygeforsikring "denmark"</strong> to dobrowolne uzupełniające ubezpieczenie zdrowotne, z którego korzysta ponad 2 miliony Duńczyków (~35% populacji). Pokrywa ono część kosztów, które publiczny system ochrony zdrowia pozostawia do zapłaty przez pacjenta.</p>\n<p><strong>Co obejmuje (Grupa 1, ~131 DKK/mies.):</strong></p>\n<ul>\n  <li>Opieka dentystyczna: zwrot 40–60% kosztów standardowych zabiegów</li>\n  <li>Okulista i okulary/soczewki kontaktowe: częściowy zwrot</li>\n  <li>Fizjoterapia i chiropraktyka: częściowy zwrot</li>\n  <li>Niektóre leki bez recepty</li>\n</ul>\n<p class="callout-warning">Możesz dołączyć tylko w ciągu 6 miesięcy od zameldowania w Danii lub ukończenia 30 lat. Nie przegap tego okna!</p>\n<a href="https://www.sygeforsikring.dk/english" target="_blank" rel="noopener">→ Dołącz do Sygeforsikring "denmark" (strona po angielsku)</a>` }'
)

# ── Chapter 6 inline ───────────────────────────────────────────────────────
r('uk:"Діти та Сім\'я" },',
  'uk:"Діти та Сім\'я", pl:"Dzieci i Rodzina" },')
r('uk:"Wychowanie Dzieci w Danii" },',
  'uk:"Wychowanie Dzieci w Danii", pl:"Wychowywanie Dzieci w Danii" },')

# Fix: check exact subtitle text for ch6
r('uk:"Вирощування Дітей у Данії" },',
  'uk:"Вирощування Дітей у Данії", pl:"Wychowywanie Dzieci w Danii" },')

r('uk:"Данія є одним із найкращих місць у світі для виховання дітей. Ось що вам потрібно знати." },',
  'uk:"Данія є одним із найкращих місць у світі для виховання дітей. Ось що вам потрібно знати.", pl:"Dania jest jednym z najlepszych miejsc na świecie do wychowania dzieci. Oto co musisz wiedzieć." },')

# Ch6 S1: maternity/paternity leave
r(
'<a href="https://www.borger.dk/familie-og-boern/barsel" target="_blank" rel="noopener">→ Повний посібник з декретної відпустки (borger.dk офіційний)</a>` }',
'<a href="https://www.borger.dk/familie-og-boern/barsel" target="_blank" rel="noopener">→ Повний посібник з декретної відпустки (borger.dk офіційний)</a>`,\n               pl:`<p>Duński urlop rodzicielski jest wśród najbardziej hojnych na świecie. System został zmieniony w 2022 r., by promować równy podział między rodzicami.</p>\n<p><strong>Nowe zasady (od 2022):</strong></p>\n<ul>\n  <li><strong>2 tygodnie przed porodem</strong> dla matki</li>\n  <li><strong>10 tygodni zarezerwowanych dla matki</strong> po porodzie (nieprzenoszalnych)</li>\n  <li><strong>10 tygodni zarezerwowanych dla drugiego rodzica</strong> (nieprzenoszalnych)</li>\n  <li><strong>22 tygodnie wspólne</strong> do podziału według uznania</li>\n  <li>Łącznie: do <strong>52 tygodni urlopu rodzicielskiego</strong> na rodzinę</li>\n</ul>\n<p><strong>Zasiłek urlopowy (barselsdagpenge):</strong> maksymalnie 4 765 DKK/tydz. (2025) wypłacane przez gminę lub pracodawcę. Wiele umów zbiorowych uzupełnia to do pełnej pensji.</p>\n<p class="callout-warning">Jako pracownik migrujący Twoje prawa mogą się różnić w zależności od statusu rezydenta i długości zatrudnienia. Sprawdź z Udbetaling Danmark i działem HR.</p>\n<a href="https://www.borger.dk/familie-og-boern/barsel" target="_blank" rel="noopener">→ Pełny przewodnik po urlopie rodzicielskim (borger.dk oficjalne)</a>` }'
)

# Ch6 S2: childcare/dagtilbud
r(
'<a href="https://www.borger.dk/familie-og-boern/pasning-af-boern" target="_blank" rel="noopener">→ Інформація про догляд за дітьми (borger.dk)</a>` }',
'<a href="https://www.borger.dk/familie-og-boern/pasning-af-boern" target="_blank" rel="noopener">→ Інформація про догляд за дітьми (borger.dk)</a>`,\n               pl:`<p>Duńska opieka nad dziećmi jest dotowana przez państwo i powszechnie dostępna, ze stałymi miejscami od 6. miesiąca życia.</p>\n<p><strong>Rodzaje opieki:</strong></p>\n<ul>\n  <li><strong>Dagpleje</strong> (rodzinna opieka dzienna): 0–2,9 roku życia. Małe grupy u opiekuna w domu.</li>\n  <li><strong>Vuggestue</strong> (żłobek): 0–2,9 roku życia. Formalne placówki.</li>\n  <li><strong>Børnehave</strong> (przedszkole): 3–5,9 roku życia. Bezpłatne od 3 lat w większości gmin.</li>\n  <li><strong>SFO/fritidshjem</strong> (świetlica): 6–9 lat. Opieka poszkolna.</li>\n</ul>\n<p><strong>Koszty:</strong> Maksymalnie 25% rzeczywistych kosztów — rząd pokrywa resztę. Wiele gmin oferuje ulgi dochodowe, które zmniejszają kwotę do nawet 0 DKK.</p>\n<p><strong>Jak się zapisać:</strong> Przez stronę gminy lub bezpośrednio w placówce. W Kopenhadze listy oczekujących mogą być długie — zapisz się jak najwcześniej, nawet w ciąży.</p>\n<a href="https://www.borger.dk/familie-og-boern/pasning-af-boern" target="_blank" rel="noopener">→ Informacje o opiece nad dziećmi (borger.dk)</a>` }'
)

# Ch6 S3: børnecheck / family benefits
r(
'<a href="https://www.borger.dk/familie-og-boern/bornefamilieydelse" target="_blank" rel="noopener">→ Виплати на дітей та молодь (lifeindenmark.borger.dk)</a>` }',
'<a href="https://www.borger.dk/familie-og-boern/bornefamilieydelse" target="_blank" rel="noopener">→ Виплати на дітей та молодь (lifeindenmark.borger.dk)</a>`,\n               pl:`<p>Dania wypłaca automatyczne świadczenia na dzieci (børnefamilieydelse / børnecheck) za pośrednictwem Udbetaling Danmark — nie trzeba składać wniosku.</p>\n<p><strong>Stawki 2025 (kwartalne):</strong></p>\n<ul>\n  <li>0–2 lata: <strong>4 972 DKK/kwartał</strong></li>\n  <li>3–6 lat: <strong>3 939 DKK/kwartał</strong></li>\n  <li>7–14 lat: <strong>3 099 DKK/kwartał</strong></li>\n  <li>15–17 lat: <strong>1 035 DKK/kwartał</strong></li>\n</ul>\n<p>Świadczenia są wypłacane automatycznie na NemKonto po rejestracji dziecka z CPR. Upewnij się, że Twoje dane są aktualne w CPR-registret.</p>\n<a href="https://www.borger.dk/familie-og-boern/bornefamilieydelse" target="_blank" rel="noopener">→ Świadczenia na dzieci i młodzież (lifeindenmark.borger.dk)</a>` }'
)

def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    errors = []
    applied = 0
    for old, new in REPLACEMENTS:
        count = content.count(old)
        if count == 0: errors.append(f"NOT FOUND: {old[:80]}")
        elif count > 1: errors.append(f"AMBIGUOUS ({count}): {old[:80]}")
        else: content = content.replace(old, new, 1); applied += 1
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Applied: {applied}/{len(REPLACEMENTS)}")
    for e in errors: print(e)
    print("Total pl: blocks:", content.count('pl:`'))

if __name__ == '__main__': main()
