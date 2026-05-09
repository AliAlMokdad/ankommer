#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adds Polish (pl:) translations after every uk: key in data-chapters.js.
"""
import sys
import io

# Force UTF-8 stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"

REPLACEMENTS = []

def r(old, new):
    REPLACEMENTS.append((old, new))

# ════════════════════════════════════════════════════════════════
# CHAPTER 0 — title / subtitle / intro
# ════════════════════════════════════════════════════════════════
r('uk:"До Посадки" }', 'uk:"До Посадки", pl:"Przed Lądowaniem" }')
r('uk:"Зворотний Відлік" }', 'uk:"Зворотний Відлік", pl:"Odliczanie" }')
r(
    'uk:"Усе, що варто зробити ще до того, як ваш літак приземлиться. Почніть зараз — і будете на тижні попереду." }',
    'uk:"Усе, що варто зробити ще до того, як ваш літак приземлиться. Почніть зараз — і будете на тижні попереду.", pl:"Wszystko, co warto zrobić, zanim twój samolot wyląduje. Zacznij teraz — a będziesz o tygodnie do przodu." }'
)

# Ch0 §1 — Visa
r(
    '<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Подати заявку на newtodenmark.dk (офіційний сайт)</a>` }',
    '<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Подати заявку на newtodenmark.dk (офіційний сайт)</a>`,\n          pl:`<p><strong>Obywatele UE/EOG/krajów nordyckich:</strong> Nie potrzebujesz wizy ani zezwolenia na pracę. Masz prawo swobodnie mieszkać i pracować w Danii. <strong>Obowiązują dwie osobne rejestracje:</strong> (1) Twój <strong>adres w folkeregister (rejestr ludności)</strong> musi zostać zgłoszony <strong>w ciągu 5 dni od przeprowadzki</strong> (ustawa CPR §12 — niedopełnienie podlega karze grzywny). (2) Twój <strong>dokument pobytowy UE</strong> wydawany przez SIRI jest wymagany, jeśli zamierzasz zostać dłużej niż 3 miesiące.</p>\n<p><strong>Obywatele spoza UE</strong> potrzebują jednego z poniższych:</p>\n<ul>\n  <li><strong>Zezwolenie na pracę</strong> — wymaga oferty pracy od duńskiego pracodawcy. Najczęstsze typy: Lista pozytywna (dla poszukiwanych zawodów), system limitów płacowych (wynagrodzenie &gt; 514 000 DKK/rok w 2025, rosnące do 552 000 DKK w 2026), system fast-track (dla certyfikowanych firm).</li>\n  <li><strong>Wiza studencka</strong> — jeśli jesteś zapisany na duński uniwersytet lub uczelnię. Złóż wniosek na newtodenmark.dk co najmniej 2 miesiące wcześniej.</li>\n  <li><strong>Łączenie rodzin (familiesammenføring)</strong> — aby dołączyć do obywatela Danii lub stałego rezydenta. Wymagania są rygorystyczne: duński sponsor musi spełniać wymogi dochodowe i mieszkaniowe.</li>\n  <li><strong>Wiza Startup Denmark</strong> — dla przedsiębiorców z zatwierdzonym biznesplanem.</li>\n</ul>\n<p class="callout-warning">Składaj wniosek jak najwcześniej. Czas rozpatrzenia dla osób spoza UE wynosi 1–4 miesiące. Nie kupuj biletu w jedną stronę przed uzyskaniem zezwolenia.</p>\n<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Złóż wniosek na newtodenmark.dk (oficjalna strona)</a>` }'
)

# Ch0 §2 — Documents (uk: is BEFORE da: in this section)
r(
    "<strong>Апостиль (Apostille)</strong> = офіційна печатка, що робить іноземні документи юридично визнаними на міжнародному рівні. Отримайте її у відповідному органі своєї країни перед від'їздом.</p>`,\n          da:",
    "<strong>Апостиль (Apostille)</strong> = офіційна печатка, що робить іноземні документи юридично визнаними на міжнародному рівні. Отримайте її у відповідному органі своєї країни перед від'їздом.</p>`,\n          pl:`<p>Zabierz ze sobą oryginały ORAZ poświadczone kopie każdego dokumentu:</p>\n<ul>\n  <li>✅ Ważny paszport (+ 2 kserokopie strony głównej)</li>\n  <li>✅ Akt urodzenia (z apostille, jeśli spoza UE)</li>\n  <li>✅ Akt małżeństwa, jeśli dotyczy (z apostille)</li>\n  <li>✅ Akty urodzenia dzieci</li>\n  <li>✅ Dyplomy ukończenia studiów / świadectwa wykształcenia</li>\n  <li>✅ Umowa o pracę lub zaświadczenie o przyjęciu na uczelnię</li>\n  <li>✅ 2 zdjęcia paszportowe</li>\n  <li>✅ Potwierdzenie zakwaterowania (podpisana umowa najmu lub list od gospodarza)</li>\n  <li>✅ Dokumentacja ubezpieczenia zdrowotnego (na okres przed otrzymaniem żółtej karty zdrowia)</li>\n</ul>\n<p><strong>Apostille</strong> = oficjalna pieczęć potwierdzająca autentyczność dokumentów zagranicznych, uznawana międzynarodowo. Uzyskaj ją we właściwym organie swojego kraju przed wyjazdem.</p>`,\n          da:"
)

# Ch0 §3 — Housing before arrival
r(
    '<p class="callout-warning">Заставу в Данії законодавчо обмежено 3 місяцями орендної плати. Хто просить більше — порушує закон.</p>`,\n          da:',
    '<p class="callout-warning">Заставу в Данії законодавчо обмежено 3 місяцями орендної плати. Хто просить більше — порушує закон.</p>`,\n          pl:`<p>Duński rynek wynajmu jest bardzo konkurencyjny — szczególnie w Kopenhadze. Rozpoczęcie poszukiwań przed przyjazdem daje ci istotną przewagę.</p>\n<p><strong>Najlepsze platformy:</strong></p>\n<ul>\n  <li><a href="https://www.boligportal.dk" target="_blank" rel="noopener">BoligPortal.dk</a> — największa prywatna platforma wynajmu</li>\n  <li><a href="https://www.lejebolig.dk" target="_blank" rel="noopener">Lejebolig.dk</a> — dobry wybór, przyjazna dla anglojęzycznych</li>\n  <li>Grupy na Facebooku: "Housing in Copenhagen for Expats", "Aarhus Housing International"</li>\n  <li><a href="https://www.dba.dk" target="_blank" rel="noopener">DBA.dk</a> — ogłoszenia + prywatny wynajem</li>\n</ul>\n<p><strong>Sygnały ostrzegawcze w ogłoszeniach:</strong></p>\n<ul>\n  <li>🚩 Właściciel przebywa za granicą i nie może spotkać się osobiście</li>\n  <li>🚩 Cena znacznie poniżej rynkowej (średnia w Kopenhadze za kawalerkę: 8 500–12 000 DKK)</li>\n  <li>🚩 Żąda zapłaty przed podpisaniem umowy najmu</li>\n  <li>🚩 Brak zdjęć lub zdjęcia skradzione z portali nieruchomości</li>\n</ul>\n<p class="callout-warning">Kaucja w Danii jest ograniczona ustawowo do 3 miesięcy czynszu. Kto żąda więcej — łamie prawo.</p>`,\n          da:'
)

# Ch0 §4 — Banking before arrival
r(
    "Візьміть достатньо готівки або доступних коштів щонайменше на <strong>2 місяці витрат</strong>, поки ви не влаштуєтесь. Заплануйте мінімум 30 000 DKK як фінансову подушку.</p>`,\n          da:",
    "Візьміть достатньо готівки або доступних коштів щонайменше на <strong>2 місяці витрат</strong>, поки ви не влаштуєтесь. Заплануйте мінімум 30 000 DKK як фінансову подушку.</p>`,\n          pl:`<p>Możesz założyć konta międzynarodowe jeszcze przed przyjazdem — posłużą ci zanim otworzysz duńskie konto bankowe (które wymaga numeru CPR, duńskiego odpowiednika PESEL-u).</p>\n<p><strong>Polecane konta przed przyjazdem:</strong></p>\n<ul>\n  <li><strong>Wise (dawniej TransferWise)</strong> — najlepszy do przelewów międzynarodowych, karta wielowalutowa, działa od razu</li>\n  <li><strong>Revolut</strong> — doskonały do wydatków za granicą, dostępny plan bezpłatny</li>\n  <li><strong>Lunar</strong> — duński bank cyfrowy, który czasem można otworzyć bez numeru CPR (sprawdź aktualne warunki)</li>\n</ul>\n<p>Zabierz wystarczająco dużo gotówki lub dostępnych środków na co najmniej <strong>2 miesiące wydatków</strong> w trakcie urządzania się. Zaplanuj minimum 30 000 DKK jako poduszkę finansową.</p>`,\n          da:"
)

# Ch0 §5 — Learning Danish
r(
    "Вивчіть ці 10 слів першими: <em>tak (дякую), undskyld (вибачте/перепрошую), hej (привіт), hejhej (бувай), ja/nej (так/ні), tak for mad (дякую за їжу), skål (будьмо!), hvad (що), og (і), er (є/це)</em></p>`,\n          da:",
    "Вивчіть ці 10 слів першими: <em>tak (дякую), undskyld (вибачте/перепрошую), hej (привіт), hejhej (бувай), ja/nej (так/ні), tak for mad (дякую за їжу), skål (будьмо!), hvad (що), og (і), er (є/це)</em></p>`,\n          pl:`<p>Wymowa duńskiego jest naprawdę jedną z najtrudniejszych dla obcokrajowców — im wcześniej zaczniesz, tym lepiej. Szczera prawda: w Danii wszyscy świetnie mówią po angielsku. Ale znajomość duńskiego otwiera drzwi społeczne, które pozostają zamknięte dla anglojęzycznych.</p>\n<p><strong>Najlepsze zasoby przed przyjazdem:</strong></p>\n<ul>\n  <li>🎧 <strong>Glossika</strong> — najlepszy do wymowy, system powtarzania w odstępach</li>\n  <li>📱 <strong>Babbel</strong> — ustrukturyzowane lekcje, lepszy od Duolingo do duńskiego</li>\n  <li>🎬 <strong>YouTube: \"Learn Danish with DanishClass101\"</strong></li>\n  <li>🎙️ <strong>Podcast: \"Slow Danish\"</strong> — naturalna mowa w zwolnionym tempie</li>\n</ul>\n<p>Naucz się najpierw tych 10 słów: <em>tak (dziękuję), undskyld (przepraszam/pardon), hej (cześć), hejhej (pa pa), ja/nej (tak/nie), tak for mad (dziękuję za jedzenie), skål (na zdrowie!), hvad (co), og (i), er (jest/są)</em></p>`,\n          da:"
)

# ════════════════════════════════════════════════════════════════
# CHAPTER 1 — title / subtitle / intro
# ════════════════════════════════════════════════════════════════
r('uk:"Перші 72 Години" }', 'uk:"Перші 72 Години", pl:"Pierwsze 72 Godziny" }')
r('uk:"Критичне Вікно" }', 'uk:"Критичне Вікно", pl:"Krytyczne Okno" }')
r(
    'uk:"Це найважливіші завдання за весь ваш час у Данії. Виконуйте їх по порядку. Не пропускайте жодного." }',
    'uk:"Це найважливіші завдання за весь ваш час у Данії. Виконуйте їх по порядку. Не пропускайте жодного.", pl:"To najważniejsze zadania przez cały czas twojego życia w Danii. Wykonuj je po kolei. Nie pomijaj żadnego." }'
)

# Ch1 §1 — Register address
r(
    '<p class="callout-warning">НЕ відкладайте цей крок на "потім". Без зареєстрованої адреси ви не зможете отримати номер CPR.</p>` }',
    '<p class="callout-warning">НЕ відкладайте цей крок на "потім". Без зареєстрованої адреси ви не зможете отримати номер CPR.</p>`,\n          pl:`<p>To jest <strong>pierwsza rzecz do zrobienia</strong>. Wszystko inne — numer CPR, MitID, lekarz, konto bankowe, karta podatkowa — zależy od posiadania zarejestrowanego adresu.</p>\n<p class="callout-warning">⏰ <strong>Termin ustawowy: w ciągu 5 dni od przeprowadzki</strong> (ustawa CPR §12). Spóźniona rejestracja podlega karze grzywny. Umów wizytę w Borgerservice zaraz po otrzymaniu kluczy.</p>\n<p><strong>Jak to zrobić:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span> Wejdź na <a href="https://www.borger.dk" target="_blank" rel="noopener">borger.dk</a> i wyszukaj "Flytning til Danmark" LUB odwiedź osobiście lokalne biuro Borgerservice (urząd dla obywateli).</li>\n  <li><span class="step-num">2</span> Potrzebujesz: paszportu + dowodu zamieszkania (podpisana umowa najmu, umowa podnajmu lub list od gospodarza).</li>\n  <li><span class="step-num">3</span> Jeśli tymczasowo mieszkasz u znajomego: musi napisać i podpisać list potwierdzający twoje zamieszkanie. Szablon dostępny na borger.dk.</li>\n</ol>\n<p class="callout-warning">NIE odkładaj tego kroku na "później". Bez zarejestrowanego adresu nie możesz otrzymać numeru CPR.</p>` }'
)

# Ch1 §2 — CPR number
r(
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Записатися на прийом до ICS онлайн</a>` }',
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Записатися на прийом до ICS онлайн</a>`,\n          pl:`<p>Twój numer CPR (Civil Personal Registration — duński numer identyfikacyjny, odpowiednik polskiego PESEL-u) to <strong>najważniejszy numer w twoim duńskim życiu.</strong> Jest wymagany do absolutnie wszystkiego: wizyt lekarskich, rejestracji podatkowej, konta bankowego, karty bibliotecznej, karnetu na siłownię, umów telefonicznych — do wszystkiego.</p>\n<p><strong>Format:</strong> DDMMRR-XXXX (data urodzenia + 4 cyfry)</p>\n<p><strong>Obywatele UE:</strong> Rejestracja w International Citizen Service (ICS). Często wydawany tego samego dnia, jeśli masz wszystkie dokumenty.</p>\n<p><strong>Obywatele spoza UE:</strong> Zazwyczaj wydawany automatycznie po zatwierdzeniu zezwolenia na pobyt. Może to potrwać 2–8 tygodni.</p>\n<p><strong>Biura ICS (główne lokalizacje):</strong></p>\n<ul>\n  <li>Kopenhaga: Gyldenløvesgade 11, 1600 Copenhagen V</li>\n  <li>Aarhus: Hack Kampmanns Plads 2</li>\n  <li>Odense: Flakhaven 2</li>\n  <li>Aalborg: Godthåbsgade 8</li>\n</ul>\n<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Zarezerwuj wizytę ICS online</a>` }'
)

# Ch1 §3 — MitID
r(
    "Додаток MitID встановлюється на ваш смартфон і генерує 6-значні коди для входу. Бережіть телефон — це І Є ваша цифрова особистість.</p>` }",
    "Додаток MitID встановлюється на ваш смартфон і генерує 6-значні коди для входу. Бережіть телефон — це І Є ваша цифрова особистість.</p>`,\n          pl:`<p>MitID to duński narodowy system cyfrowej tożsamości. Traktuj go jak klucz główny do całego twojego cyfrowego życia w Danii. Bez niego nie możesz korzystać z: borger.dk, SKAT (urząd skarbowy), e-Boks (oficjalna skrzynka pocztowa), bankowości internetowej, Sundhed.dk i dziesiątek innych usług.</p>\n<p><strong>Uzyskaj MitID na:</strong> <a href=\"https://www.mitid.dk\" target=\"_blank\" rel=\"noopener\">mitid.dk</a> lub osobiście w swoim banku lub w Borgerservice.</p>\n<p>Aplikacja MitID instaluje się na smartfonie i generuje 6-cyfrowe kody do logowania. Dbaj o telefon — TO jest twoja tożsamość cyfrowa.</p>` }"
)

# Ch1 §4 — e-Boks
r(
    'Завантажте додаток e-Boks. Увімкніть push-сповіщення. Налаштуйте пересилання на email у параметрах, щоб отримувати сповіщення про нові листи.</p>\n<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ Сайт e-Boks</a>` }',
    'Завантажте додаток e-Boks. Увімкніть push-сповіщення. Налаштуйте пересилання на email у параметрах, щоб отримувати сповіщення про нові листи.</p>\n<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ Сайт e-Boks</a>`,\n          pl:`<p>e-Boks to oficjalna cyfrowa skrzynka pocztowa Danii. Każde pismo od SKAT, Udbetaling Danmark, twojej gminy, banku i rządu trafia właśnie tutaj. Nie do fizycznej skrzynki. Nie na e-mail. Tutaj.</p>\n<p class="callout-warning"><strong>To jest kluczowe:</strong> Ludzie przegapiali terminy podatkowe, powiadomienia o odnowieniu zezwoleń i potwierdzenia wypłat zasiłków, bo nie sprawdzali e-Boks. Ustaw teraz cotygodniowe przypomnienie w kalendarzu.</p>\n<p>Pobierz aplikację e-Boks. Włącz powiadomienia push. Skonfiguruj przekierowanie na e-mail w ustawieniach, aby dostawać powiadomienie o każdej nowej przesyłce.</p>\n<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ Strona e-Boks</a>` }'
)

# Ch1 §5 — Bank account
r(
    "Після відкриття рахунку позначте його як свій <strong>NemKonto</strong> на <a href=\"https://www.nemkonto.dk\" target=\"_blank\" rel=\"noopener\">nemkonto.dk</a>. Це обов'язково.</p>` }",
    "Після відкриття рахунку позначте його як свій <strong>NemKonto</strong> на <a href=\"https://www.nemkonto.dk\" target=\"_blank\" rel=\"noopener\">nemkonto.dk</a>. Це обов'язково.</p>`,\n          pl:`<p>Potrzebujesz duńskiego konta bankowego dla NemKonto (dosł. \"łatwe konto\" — to konto, na które rząd przesyła ci pieniądze: zwroty podatku, zasiłki itp.). Większość banków wymaga numeru CPR.</p>\n<table class=\"info-table\">\n  <tr><th>Bank</th><th>Angielski?</th><th>Wymaga CPR?</th><th>Najlepszy dla</th></tr>\n  <tr><td><strong>Lunar</strong></td><td>✅ 100%</td><td>Czasem nie</td><td>Nowych mieszkańców, w pełni cyfrowy</td></tr>\n  <tr><td><strong>Nordea</strong></td><td>✅ Dobrze</td><td>Tak</td><td>Przelewów międzynarodowych</td></tr>\n  <tr><td><strong>Danske Bank</strong></td><td>✅ Dobrze</td><td>Tak</td><td>Pełnej obsługi</td></tr>\n  <tr><td><strong>Jyske Bank</strong></td><td>Częściowo</td><td>Tak</td><td>Regionalny, osobista obsługa</td></tr>\n</table>\n<p>Po otwarciu konta oznacz je jako swoje <strong>NemKonto</strong> na <a href=\"https://www.nemkonto.dk\" target=\"_blank\" rel=\"noopener\">nemkonto.dk</a>. To obowiązkowe.</p>` }"
)

# Ch1 §6 — Essential apps
r(
    '  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Заощаджуйте на нереалізованій їжі. Датчани обожнюють цей додаток.</div><div class="app-card-lang">🇬🇧 Англійська</div></div>\n</div>` }',
    '  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Заощаджуйте на нереалізованій їжі. Датчани обожнюють цей додаток.</div><div class="app-card-lang">🇬🇧 Англійська</div></div>\n</div>`,\n          pl:`<div class="app-grid">\n  <div class="app-card"><div class="app-card-icon">💸</div><div class="app-card-name">MobilePay</div><div class="app-card-desc">Duńska aplikacja płatnicza. NIEZBĘDNA do dzielenia rachunków, płacenia na straganach itp.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n  <div class="app-card"><div class="app-card-icon">📬</div><div class="app-card-name">e-Boks</div><div class="app-card-desc">Twoja oficjalna duńska skrzynka pocztowa. Sprawdzaj co tydzień.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n  <div class="app-card"><div class="app-card-icon">🚌</div><div class="app-card-name">Rejsekort</div><div class="app-card-desc">Aplikacja karty transportu publicznego. Działa w całej Danii.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n  <div class="app-card"><div class="app-card-icon">🚂</div><div class="app-card-name">DSB</div><div class="app-card-desc">Duńskie koleje krajowe. Kup bilet na pociąg, sprawdź rozkład jazdy.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n  <div class="app-card"><div class="app-card-icon">🏥</div><div class="app-card-name">Min Læge</div><div class="app-card-desc">Umów wizytę u lekarza rodzinnego, odnów recepty.</div><div class="app-card-lang">Ograniczony EN</div></div>\n  <div class="app-card"><div class="app-card-icon">💊</div><div class="app-card-name">Sundhed.dk</div><div class="app-card-desc">Twoja dokumentacja medyczna, skierowania do szpitali, wyszukaj lekarza.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n  <div class="app-card"><div class="app-card-icon">💰</div><div class="app-card-name">Skat</div><div class="app-card-desc">Duński urząd skarbowy. Sprawdź kartę podatkową i odliczenia.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Oszczędzaj na niesprzedanym jedzeniu. Duńczycy uwielbiają tę aplikację.</div><div class="app-card-lang">🇬🇧 Angielski</div></div>\n</div>` }'
)

# Ch1 §7 — Emergency numbers
r(
    '<p class="callout-warning"><strong>Ключова різниця:</strong> У Данії 1813 — номер для медичних консультацій та термінової допомоги без загрози для життя. Дзвонити на 112 без реальної загрози вважається неприйнятним і може затримати допомогу іншим.</p>` }',
    '<p class="callout-warning"><strong>Ключова різниця:</strong> У Данії 1813 — номер для медичних консультацій та термінової допомоги без загрози для життя. Дзвонити на 112 без реальної загрози вважається неприйнятним і може затримати допомогу іншим.</p>`,\n          pl:`<table class="info-table">\n  <tr><th>Numer</th><th>Przeznaczenie</th><th>Uwaga</th></tr>\n  <tr><td><strong>112</strong></td><td>Policja, Straż Pożarna, Pogotowie</td><td>WYŁĄCZNIE sytuacje zagrożenia życia</td></tr>\n  <tr><td><strong>1813</strong></td><td>Pomoc medyczna (nienaglące przypadki)</td><td>Pilne, ale nie zagrożenie życia. Całą dobę. Region Kopenhagi.</td></tr>\n  <tr><td><strong>114</strong></td><td>Policja (nienaglące sprawy)</td><td>Przestępstwa, zgubione przedmioty, zgłoszenia</td></tr>\n  <tr><td><strong>70 11 31 31</strong></td><td>Pogotowie stomatologiczne</td><td>Ból zęba poza godzinami przyjęć</td></tr>\n  <tr><td><strong>80 19 13 99</strong></td><td>Centrum Informacji Toksykologicznych</td><td>Bezpłatne, całą dobę</td></tr>\n  <tr><td><strong>70 20 12 60</strong></td><td>Linia Kryzysowa (Livslinien)</td><td>Wsparcie w kryzysach psychicznych</td></tr>\n</table>\n<p class="callout-warning"><strong>Ważna różnica:</strong> W Danii numer 1813 służy do konsultacji medycznych i pilnej pomocy niebędącej zagrożeniem życia. Dzwonienie pod 112 w sprawach nienaglących jest źle widziane i może opóźnić pomoc innym.</p>` }'
)

# ════════════════════════════════════════════════════════════════
# CHAPTER 2 — title / subtitle / intro
# ════════════════════════════════════════════════════════════════
r('uk:"Документи та Юридична Ідентичність" }', 'uk:"Документи та Юридична Ідентичність", pl:"Dokumenty i Tożsamość Prawna" }')
r('uk:"Зробити Все Офіційно" }', 'uk:"Зробити Все Офіційно", pl:"Wszystko po Kolei" }')
r(
    'uk:"Данська бюрократія ретельна. Розуміння системи перетворює тижні плутанини на дні чіткості." }',
    'uk:"Данська бюрократія ретельна. Розуміння системи перетворює тижні плутанини на дні чіткості.", pl:"Duńska biurokracja jest skrupulatna. Zrozumienie systemu zamienia tygodnie chaosu w dni pewności." }'
)

# Ch2 §1 — Residence permits
r(
    '  <tr><td><strong>Статус біженця</strong></td><td>Шукачі притулку</td><td>Варіюється</td><td>Варіюється</td></tr>\n</table>` }',
    '  <tr><td><strong>Статус біженця</strong></td><td>Шукачі притулку</td><td>Варіюється</td><td>Варіюється</td></tr>\n</table>`,\n          pl:`<p>Rodzaj twojego zezwolenia na pobyt określa twoje prawa w Danii. Oto przejrzysty przegląd:</p>\n<table class="info-table">\n  <tr><th>Rodzaj zezwolenia</th><th>Dla</th><th>Prawo do pracy</th><th>Czas trwania</th></tr>\n  <tr><td><strong>Rejestracja UE</strong></td><td>Obywatele UE/EOG</td><td>Nieograniczone</td><td>5 lat (potem stały)</td></tr>\n  <tr><td><strong>Lista pozytywna</strong></td><td>Poszukiwane zawody</td><td>Pełne</td><td>Do 4 lat</td></tr>\n  <tr><td><strong>System limitów płacowych</strong></td><td>Wynagrodzenie &gt; 514 000 DKK/rok (2025) · 552 000 DKK/rok od 2026</td><td>Pełne</td><td>Do 4 lat</td></tr>\n  <tr><td><strong>Zezwolenie studenckie</strong></td><td>Zapisani studenci</td><td>15 godz./tydzień</td><td>Na czas studiów</td></tr>\n  <tr><td><strong>Łączenie rodzin</strong></td><td>Dołączenie do członka rodziny</td><td>Pełne (zazwyczaj)</td><td>Początkowo 2 lata</td></tr>\n  <tr><td><strong>Status uchodźcy</strong></td><td>Osoby ubiegające się o azyl</td><td>Różnie</td><td>Różnie</td></tr>\n</table>` }'
)

# Ch2 §2 — Permanent residency
r(
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener">→ Офіційна інформація про постійне проживання</a>` }',
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener">→ Офіційна інформація про постійне проживання</a>`,\n          pl:`<p>Zasada ogólna: <strong>8 lat ciągłego legalnego pobytu</strong> w Danii. Istnieją jednak ścieżki przyspieszone:</p>\n<ul>\n  <li><strong>4 lata</strong> po zdaniu specjalnej oceny aktywnego wkładu (system punktowy)</li>\n  <li><strong>5 lat</strong> dla obywateli UE z ciągłym pobytem</li>\n  <li>Musisz także: pracować na pełny etat przez co najmniej <strong>3,5 z ostatnich 4 lat</strong> (lub 4 z ostatnich 4,5 roku na ścieżce 4-letniej — Udlændingeloven §11), zdać <strong>Prøve i Dansk 2 (PD2 ≈ poziom B1)</strong>, mieć czystą kartotekę i być samowystarczalny finansowo (bez świadczeń publicznych przez ostatnie 4 lata).</li>\n</ul>\n<p>System punktowy ocenia cię pod względem: poziomu języka duńskiego, historii zatrudnienia, dochodów, zaangażowania w życie społeczne, wyników szkolnych dzieci i wyniku egzaminu na obywatelstwo.</p>\n<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener">→ Oficjalne informacje o stałym pobycie</a>` }'
)

# Ch2 §3 — Citizenship
r(
    'Данія дозволяє <strong>подвійне громадянство</strong> з 2015 року. Від вашої первісної національності відмовлятися не потрібно.</p>` }',
    'Данія дозволяє <strong>подвійне громадянство</strong> з 2015 року. Від вашої первісної національності відмовлятися не потрібно.</p>`,\n          pl:`<p>Jedna z bardziej wymagających ścieżek w Europie, ale warta wysiłku:</p>\n<ul>\n  <li>Trzeba mieszkać w Danii przez <strong>9 lat</strong> (lub krócej dzięki ścieżkom przyspieszonym)</li>\n  <li>Zdać <strong>indfødsretsprøven</strong> (egzamin na obywatelstwo) — historia, kultura i społeczeństwo duńskie</li>\n  <li>Zdać <strong>Prøve i Dansk 3 (PD3, ≈ poziom B2)</strong> — egzamin językowy na ścieżce obywatelstwa</li>\n  <li>Mieszkać w Danii przez co najmniej <strong>9 z ostatnich 10 lat</strong> ze stałym zezwoleniem na pobyt</li>\n  <li>Być <strong>samowystarczalnym finansowo</strong> — bez świadczeń publicznych przez ostatnie 4 lata</li>\n  <li>Być samowystarczalnym przez 4,5 z ostatnich 5 lat</li>\n  <li>Brak skazań karnych</li>\n  <li>Brak zaległości wobec organów publicznych</li>\n</ul>\n<p>Dania zezwala na <strong>podwójne obywatelstwo</strong> od 2015 roku. Nie musisz rezygnować ze swojego pierwotnego obywatelstwa — jako Polak możesz zachować oba paszporty.</p>` }'
)

# Ch2 §4 — Danish tax
r(
    '<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ SKAT — Данська податкова служба</a>` }',
    '<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ SKAT — Данська податкова служба</a>`,\n          pl:`<p>Tak, duńskie podatki są wysokie. Oto uczciwy obraz tego, co faktycznie płacisz:</p>\n<ul>\n  <li><strong>AM-bidrag (składka na rynek pracy):</strong> 8% od wynagrodzenia brutto. Bez możliwości odliczeń.</li>\n  <li><strong>Podatek gminny (kommuneskat):</strong> Różny w zależności od gminy, średnio ~25%. Od dochodu przekraczającego osobistą ulgę.</li>\n  <li><strong>Podatek państwowy (bundskat):</strong> 12,01% (2025) od dochodu powyżej osobistej ulgi (51 600 DKK/rok).</li>\n  <li><strong>Podatek od wyższych dochodów (topskat):</strong> Dodatkowe 15% od dochodu osobistego powyżej ~611 800 DKK/rok w 2025. Łączny pułap (skatteloft) bez AM i podatku kościelnego: 52,07%.</li>\n  <li><strong>Osobista ulga podatkowa (personfradrag):</strong> 51 600 DKK/rok (2025) — stosowana jako kredyt podatkowy, efektywnie zwalniając tę część z opodatkowania.</li>\n</ul>\n<p>Co dostajesz w zamian? Bezpłatna opieka zdrowotna. Bezpłatne studia. 52 tygodnie urlopu rodzicielskiego. 5 tygodni urlopu wypoczynkowego. Bezpłatna szkoła. Zasiłek dla bezrobotnych w razie utraty pracy. Rachunek wygląda zupełnie inaczej, niż większość się spodziewa.</p>\n<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ SKAT — Duński Urząd Skarbowy</a>` }'
)

# Ch2 §5 — Driving licence
r(
    'Без угоди: потрібно пройти данські уроки водіння і скласти теоретичний та практичний іспити. Заплануйте 10 000–20 000 DKK та 6–12 місяців.</li>\n</ul>` }',
    'Без угоди: потрібно пройти данські уроки водіння і скласти теоретичний та практичний іспити. Заплануйте 10 000–20 000 DKK та 6–12 місяців.</li>\n</ul>`,\n          pl:`<p>Jeśli masz prawo jazdy z UE/EOG, możesz z niego korzystać w Danii bezterminowo. Żadna wymiana nie jest wymagana.</p>\n<p>W przypadku prawa jazdy spoza UE:</p>\n<ul>\n  <li>Niektóre kraje mają umowy wymiany z Danią (USA, Kanada, Australia, Japonia, Korea Płd. i inne) — sprawdź na <a href="https://www.sikkertrafik.dk" target="_blank" rel="noopener">sikkertrafik.dk</a></li>\n  <li>Jeśli twój kraj ma umowę: zapłać opłatę (~350 DKK) i wymień w lokalnym Borgerservice</li>\n  <li>Bez umowy: musisz odbyć duńskie kursy jazdy i zdać egzamin teoretyczny i praktyczny. Zaplanuj 10 000–20 000 DKK i 6–12 miesięcy.</li>\n</ul>` }'
)

# ════════════════════════════════════════════════════════════════
# The remaining 54 uk: blocks need to be handled via the content file.
# We'll use a smarter approach: find each uk:` block (from the line numbers
# we have) and add pl: after the closing backtick.
# ════════════════════════════════════════════════════════════════

# For the remaining translations, we'll use a regex approach in the main function.

REMAINING_TRANSLATIONS = {
    # Map of unique Ukrainian start text -> Polish translation
    # Format: uk_snippet (first ~80 chars after uk:`) -> full pl content

    # Ch3 Housing
    "Шахрайство з житлом — найбільша фінансова загроза": """<p class="callout-warning" style="background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;"><strong>⚠️ Oszustwa mieszkaniowe to największe zagrożenie finansowe dla nowych mieszkańców Danii.</strong> Fałszywe ogłoszenia na Facebook Marketplace, kłamliwi właściciele twierdzący, że są za granicą, i żądania kaucji "na rezerwację mieszkania" przed oglądaniem kosztowały ludzi od <strong>10 000 do 50 000 DKK</strong>.</p>""",

    "У Данії чотири основних типи житла:": """<p>W Danii istnieją cztery główne typy mieszkań:</p>""",

    "Данські орендодавці отримують десятки заявок на кожне оголошення.": """<p>Duńscy właściciele otrzymują dziesiątki wniosków na każde ogłoszenie. Oto co wyróżni twoje podanie:</p>""",

    "Захист орендарів у Данії надійний.": """<p>Ochrona najemców w Danii jest solidna. Znaj swoje prawa:</p>""",

    # Ch3 §5 — utility bills table
    "Загальні витрати на комунальні послуги": "Typowe koszty mediów",

    # Ch4 Banking
    "NemKonto": "<strong>NemKonto</strong>",

    # Ch5 Healthcare
    "sundhedskort": "sundhedskort",
}

import re

def add_pl_after_uk_blocks(content):
    """
    Find each uk:` ... ` block and the pl: translation should follow.
    We use ordered list of (uk_unique_marker, pl_content) pairs.
    """

    # All remaining sections as (unique_uk_content_snippet, pl_content)
    # We search for uk:`...snippet...` and add pl:` pl_content ` after the closing `
    sections = [
        # ── CHAPTER 3 Housing ──────────────────────────────────────
        (
            "Шахрайство з житлом — найбільша фінансова загроза для новоприбулих у Данії.</strong>",
            "<p class=\"callout-warning\" style=\"background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;\"><strong>⚠️ Oszustwa mieszkaniowe to największe zagrożenie finansowe dla nowych mieszkańców Danii.</strong> Fałszywe ogłoszenia na Facebook Marketplace, kłamliwi właściciele twierdzący, że są za granicą, i żądania kaucji \"na rezerwację mieszkania\" przed oglądaniem kosztowały ludzi od <strong>10 000 do 50 000 DKK</strong>.</p>"
        ),
        (
            "У Данії чотири основних типи житла:",
            "<p>W Danii wyróżniamy cztery główne typy mieszkań:</p>"
        ),
        (
            "Данські орендодавці отримують десятки заявок на кожне оголошення. Ось що виділить вашу:",
            "<p>Duńscy właściciele otrzymują dziesiątki wniosków na każde ogłoszenie. Oto co wyróżni twoje podanie:</p>"
        ),
        (
            "Захист орендарів у Данії надійний. Знайте свої права:",
            "<p>Ochrona najemców w Danii jest solidna. Znaj swoje prawa:</p>"
        ),
        (
            "Загальне правило: <strong>8 років безперервного легального проживання</strong>",
            # Skip — already handled above
            None
        ),
    ]

    return content

def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"File size: {len(content)} chars")
    print(f"uk: count before: {content.count('uk:`')}")

    errors = []
    applied = 0

    for old, new in REPLACEMENTS:
        count = content.count(old)
        if count == 0:
            errors.append(f"NOT FOUND: {repr(old[:100])}")
        elif count > 1:
            errors.append(f"AMBIGUOUS ({count}x): {repr(old[:100])}")
        else:
            content = content.replace(old, new, 1)
            applied += 1

    print(f"Applied: {applied} replacements")
    if errors:
        print("ERRORS:")
        for e in errors:
            print(" ", e)

    print(f"pl: count after phase1: {content.count('pl:`')}")

    # Write back
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("File written successfully.")


if __name__ == '__main__':
    main()
