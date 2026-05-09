#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# ── Chapter 7 inline ──────────────────────────────────────────────────────
r('uk:"Освіта та Університет" },',
  'uk:"Освіта та Університет", pl:"Edukacja i Uczelnie" },')
r('uk:"Розумове Життя" },',
  'uk:"Розумове Життя", pl:"Życie Intelektualne" },')
r('uk:"Данські університети — світового класу, безкоштовні для студентів ЄС і культурно несхожі на все, що ви знали раніше." },',
  'uk:"Данські університети — світового класу, безкоштовні для студентів ЄС і культурно несхожі на все, що ви знали раніше.", pl:"Duńskie uczelnie są światowej klasy, bezpłatne dla studentów UE i kulturowo niepodobne do niczego, co znałeś wcześniej." },')

# Ch7 S1: school system
r(
    'дкриті, а школи надають мовну підтримку (modtageklasse) для новоприбулих.</p>` }',
    'дкриті, а школи надають мовну підтримку (modtageklasse) для новоприбулих.</p>`,\n               pl:`<p>Duński system edukacji obejmuje:</p>\n<table class="info-table">\n  <tr><th>Etap</th><th>Wiek</th><th>Szczegóły</th></tr>\n  <tr><td><strong>Børnehaveklasse</strong></td><td>6 lat</td><td>Klasa przygotowawcza — obowiązkowa</td></tr>\n  <tr><td><strong>Folkeskole</strong></td><td>6–16 lat</td><td>Szkoła podstawowa (klasy 1–9), bezpłatna i obowiązkowa</td></tr>\n  <tr><td><strong>Gymnasium (STX/HF/HTX/HHX)</strong></td><td>16–19 lat</td><td>Liceum/szkoła techniczna — kilka profilów</td></tr>\n  <tr><td><strong>Videregående uddannelse</strong></td><td>19+</td><td>Wyższe uczelnie: bezpłatne dla obywateli UE/EOG</td></tr>\n</table>\n<p><strong>Dla nowo przybyłych dzieci:</strong> Skontaktuj się z lokalną gminą — mają obowiązek zapewnić dziecku miejsce w szkole. Szkoły oferują klasy recepcyjne (modtageklasse) dla dzieci nieznających duńskiego.</p>\n<p><strong>Szkoły prywatne i alternatywne:</strong> Dania ma wiele szkół prywatnych i friskoler (wolne szkoły) — częściowo dotowane przez państwo. Czesne to zazwyczaj 1 000–2 500 DKK/mies.</p>` }'
)

# Ch7 S2: university application
r(
    'е свій відділ кадрів, перш ніж вважати, що доведеться платити самостійно.</p>` }',
    'е свій відділ кадрів, перш ніж вважати, що доведеться платити самостійно.</p>`,\n               pl:`<p>Duńskie uczelnie są bezpłatne dla obywateli UE/EOG i wymagają czesnego dla osób spoza UE (zazwyczaj 45 000–150 000 DKK/rok).</p>\n<p><strong>Jak aplikować:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Złóż wniosek przez <a href="https://www.optagelse.dk" target="_blank" rel="noopener">optagelse.dk</a> (centralne przyjęcia) lub bezpośrednio na uczelnię</li>\n  <li><span class="step-num">2</span>Wyniki przyjęć opublikowane w lipcu (główna runda)</li>\n  <li><span class="step-num">3</span>Zarejestruj się przez MitID po przyjęciu</li>\n</ol>\n<p><strong>SU — duńskie stypendium studenckie:</strong> Studenci zarejestrowani w Danii mogą ubiegać się o SU (Statens Uddannelsesstøtte) — ok. 6 321 DKK/mies. (2025) dla samodzielnych studentów. Dostępne dla obywateli UE pracujących w Danii. Sprawdź swój dział kadr zanim założysz, że musisz płacić sam.</p>` }'
)

# Ch7 S3: sprogcenter / danish courses
r(
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Language-requirement" target="_blank" rel="noopener">→ Мовні вимоги для проживання (nyidanmark.dk)</a>` }',
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Language-requirement" target="_blank" rel="noopener">→ Мовні вимоги для проживання (nyidanmark.dk)</a>`,\n               pl:`<p>Bezpłatne kursy duńskiego (Danskuddannelse) są dostępne dla rezydentów z pozwoleniem na pracę lub pobyt. Trzy poziomy odpowiadające różnym potrzebom:</p>\n<ul>\n  <li><strong>Danskuddannelse 1</strong>: dla osób z niskim poziomem wykształcenia formalnego</li>\n  <li><strong>Danskuddannelse 2</strong>: dla osób ze średnim poziomem wykształcenia</li>\n  <li><strong>Danskuddannelse 3</strong>: dla osób z wyższym wykształceniem (najbardziej powszechna dla migrantów)</li>\n</ul>\n<p>Kursy organizowane przez sprogcenter (centrum językowe) w Twojej gminie. Zwykle trwają 3–5 lat do egzaminu Prøve i Dansk 3 (PD3) lub studiebetegnende dansk (SD).</p>\n<p><strong>Ważne:</strong> Uczestnictwo w kursach językowych jest zwykle wymagane lub silnie zachęcane jako warunek stałego pobytu.</p>\n<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Language-requirement" target="_blank" rel="noopener">→ Wymagania językowe dla pobytu (nyidanmark.dk)</a>` }'
)

# Ch7 S4: professional recognition
r(
    '</ul>` }\n      }\n    ],\n    checklist: [\n      { id:"ch7_',
    '</ul>`,\n               pl:`<ul>\n  <li>Niektóre zawody regulowane (lekarze, pielęgniarki, prawnicy, architekci) wymagają uznania kwalifikacji przez duńskie organy regulacyjne</li>\n  <li><strong>SIRI</strong> (Styrelsen for International Rekruttering og Integration) obsługuje wiele procesów uznawania</li>\n  <li><strong>Styrelsen for Patientsikkerhed</strong> — dla pracowników służby zdrowia</li>\n  <li>Zawody nieregulowane (IT, marketing, finanse itp.): kwalifikacje są uznawane przez pracodawców na zasadzie rynkowej — nie wymagają formalnego zatwierdzenia</li>\n  <li>Dyplomy zagraniczne możesz porównać z duńskimi poziomami na <a href="https://www.ufm.dk" target="_blank" rel="noopener">ufm.dk</a></li>\n</ul>` }\n      }\n    ],\n    checklist: [\n      { id:"ch7_'
)

# ── Chapter 8 inline ──────────────────────────────────────────────────────
r('uk:"Працевлаштування" },',
  'uk:"Працевлаштування", pl:"Zatrudnienie" },')
r('uk:"Данський Світ Праці" },',
  'uk:"Данський Світ Праці", pl:"Duński Świat Pracy" },')
r('uk:"Данська робоча культура вас здивує. Горизонтальна ієрархія, 37-годинний робочий тиждень і культура, де піти о 16:00 — не просто прийнятно, а очікувано." },',
  'uk:"Данська робоча культура вас здивує. Горизонтальна ієрархія, 37-годинний робочий тиждень і культура, де піти о 16:00 — не просто прийнятно, а очікувано.", pl:"Duńska kultura pracy Cię zaskoczy. Płaska hierarchia, 37-godzinne tygodnie i kultura, gdzie wyjście o 16:00 jest nie tylko akceptowalne — jest oczekiwane." },')

# Ch8 S1: work culture
r(
    '. Проконсультуйтесь у своїй професійній організації перед пошуком роботи.</p>` }',
    '. Проконсультуйтесь у своїй професійній організації перед пошуком роботи.</p>`,\n               pl:`<p>Duńska kultura pracy jest wyjątkowa. Kluczowe cechy:</p>\n<ul>\n  <li><strong>Płaska hierarchia:</strong> Przełożeni są dostępni i traktują się jak współpracownicy. "Szef" nie oznacza dystansu.</li>\n  <li><strong>37-godzinny tydzień pracy:</strong> Standard we wszystkich sektorach. Nadgodziny istnieją, ale są wyjątkiem.</li>\n  <li><strong>Autonomia:</strong> Pracownicy mają dużą swobodę w zarządzaniu własną pracą.</li>\n  <li><strong>Bezpośrednia komunikacja:</strong> Duńczycy mówią co myślą. Brak pośrednich aluzji.</li>\n  <li><strong>Work-life balance:</strong> Wyjście punktualnie jest normą. Rodzina i czas wolny są priorytetem.</li>\n  <li><strong>Konsensus:</strong> Decyzje często podejmowane są przez zespół, nie narzucane z góry.</li>\n</ul>\n<p class="callout-warning">Jeśli potrzebujesz pozwolenia na pracę, skonsultuj się ze swoją organizacją zawodową przed rozpoczęciem poszukiwań.</p>` }'
)

# Ch8 S2: job search
r(
    '</ul>` }\n      },\n      {\n        icon: "📋"',
    '</ul>`,\n               pl:`<ul>\n  <li><strong>Jobnet.dk</strong> — oficjalny portal pracy, bezpłatny i kompleksowy</li>\n  <li><strong>LinkedIn</strong> — kluczowy dla specjalistów i menedżerów</li>\n  <li><strong>Jobindex.dk</strong> — popularny duński agregator ofert pracy</li>\n  <li><strong>Ofir.dk</strong> — szeroki wybór ofert w różnych branżach</li>\n  <li><strong>The Hub</strong> — oferty pracy w Kopenhadze i startupach</li>\n  <li><strong>Sieć kontaktów:</strong> W Danii większość ofert obsadzana jest przez znajomości i polecenia — aktywna sieć kontaktów jest kluczowa</li>\n</ul>` }\n      },\n      {\n        icon: "📋"'
)

# Ch8 S3: employment rights
r(
    '<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov/Arbejde/Rettigheder-som-loenmodtager-og-orlov" target="_blank" rel="noopener">→ Права працівників (borger.dk)</a>` }',
    '<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov/Arbejde/Rettigheder-som-loenmodtager-og-orlov" target="_blank" rel="noopener">→ Права працівників (borger.dk)</a>`,\n               pl:`<p>Prawa pracownicze w Danii są silnie chronione — głównie przez umowy zbiorowe (overenskomst), a nie ustawowo.</p>\n<p><strong>Kluczowe prawa:</strong></p>\n<ul>\n  <li><strong>Urlop wypoczynkowy:</strong> 5 tygodni płatnego urlopu rocznie (Ferieloven)</li>\n  <li><strong>Wypowiedzenie:</strong> Zależy od stażu i umowy zbiorowej — zazwyczaj 1–6 miesięcy</li>\n  <li><strong>Płatne zwolnienie lekarskie:</strong> Do 30 dni pokrywane przez pracodawcę, następnie przez gminę</li>\n  <li><strong>Zakaz dyskryminacji:</strong> Ochrona przed dyskryminacją ze względu na płeć, narodowość, wyznanie, wiek itd.</li>\n  <li><strong>Składki emerytalne:</strong> Zazwyczaj 12–17% wynagrodzenia brutto</li>\n</ul>\n<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov/Arbejde/Rettigheder-som-loenmodtager-og-orlov" target="_blank" rel="noopener">→ Prawa pracownicze (borger.dk)</a>` }'
)

# Ch8 S4: salary calculator
r(
    'товуйте наш <strong>калькулятор зарплати</strong> для точного розрахунку.</p>` }',
    'товуйте наш <strong>калькулятор зарплати</strong> для точного розрахунку.</p>`,\n               pl:`<p>Rozumienie duńskiej pensji wymaga znajomości kilku pojęć:</p>\n<ul>\n  <li><strong>Bruttoløn</strong>: pensja brutto — kwota przed podatkiem</li>\n  <li><strong>Nettoløn</strong>: pensja netto — kwota po potrąceniu podatku</li>\n  <li><strong>Skat (podatek)</strong>: ok. 37–52% w zależności od dochodu i gminy</li>\n  <li><strong>AM-bidrag</strong>: składka na rynek pracy — 8% od brutto (potrącane przed obliczeniem podatku)</li>\n  <li><strong>ATP</strong>: obowiązkowa emerytura pracownicza — ok. 99 DKK/mies. od pracownika</li>\n  <li><strong>Pension</strong>: zazwyczaj 12–17% (pracodawca + pracownik łącznie)</li>\n</ul>\n<p>Przeciętna duńska pensja: ok. 45 000 DKK brutto/mies. Netto po podatkach: ok. 28 000–32 000 DKK.</p>\n<p>Skorzystaj z naszego <strong>kalkulatora pensji</strong>, by obliczyć dokładną kwotę.</p>` }'
)

# Ch8 S5: A-kasse
r(
    '<a href="https://www.ase.dk/en" target="_blank" rel="noopener">→ ASE a-kasse (англійська)</a>` }',
    '<a href="https://www.ase.dk/en" target="_blank" rel="noopener">→ ASE a-kasse (англійська)</a>`,\n               pl:`<p><strong>A-kasse</strong> (Arbejdsløshedskasse — kasa bezrobotnych) to dobrowolne ubezpieczenie na wypadek bezrobocia w Danii. Jeśli stracisz pracę i jesteś członkiem A-kasse, możesz otrzymać zasiłek — nawet 90% poprzedniego wynagrodzenia przez pierwsze 3 miesiące (do max. 19 728 DKK/mies. brutto, 2025).</p>\n<p><strong>Jak działa:</strong></p>\n<ul>\n  <li>Wstąp do A-kasse odpowiedniej dla swojej branży lub wybierz ogólną (np. ASE, Krifa)</li>\n  <li>Płać miesięczną składkę: ok. 400–600 DKK/mies.</li>\n  <li>Kwalifikujesz się do zasiłku po 12 miesiącach członkostwa i przepracowaniu min. 1 924 godz. w ciągu ostatnich 3 lat</li>\n</ul>\n<p class="callout-warning">Zapisz się od razu po przyjeździe — okres oczekiwania wynosi 1 rok. Większość nowo przybyłych czeka zbyt długo.</p>\n<a href="https://www.ase.dk/en" target="_blank" rel="noopener">→ ASE A-kasse (angielski)</a>` }'
)

# Ch8 S6: unions (fagforeninger)
r(
    '<strong>3F</strong> (некваліфіковані робітники) — найпоширеніші варіанти.</p>` }',
    '<strong>3F</strong> (некваліфіковані робітники) — найпоширеніші варіанти.</p>`,\n               pl:`<p>Związki zawodowe (fagforeninger) odgrywają centralną rolę w duńskim rynku pracy. Warunki zatrudnienia są negocjowane zbiorowo, a nie ustalane ustawowo.</p>\n<p><strong>Dlaczego warto dołączyć:</strong></p>\n<ul>\n  <li>Ochrona prawna w sporach z pracodawcą</li>\n  <li>Negocjacje płacowe i warunków pracy</li>\n  <li>Dostęp do szkoleń i zasobów zawodowych</li>\n  <li>Ubezpieczenie A-kasse często powiązane</li>\n</ul>\n<p><strong>Główne centrale:</strong></p>\n<ul>\n  <li><strong>LO/FH</strong> — federacja związków pracowniczych (zrzesza m.in. 3F, HK)</li>\n  <li><strong>IDA</strong> — inżynierowie i pracownicy techniczni</li>\n  <li><strong>Djøf</strong> — prawnicy, ekonomiści, nauki społeczne</li>\n  <li><strong>DM</strong> — magistrowie różnych kierunków</li>\n  <li><strong>3F</strong> — pracownicy bez kwalifikacji i produkcja</li>\n</ul>` }'
)

# Ch8 S7: work permit
r(
    'nyidanmark.dk</a> перед початком роботи.</p>` }',
    'nyidanmark.dk</a> перед початком роботи.</p>`,\n               pl:`<p>Obywatele spoza UE/EOG zazwyczaj potrzebują pozwolenia na pracę w Danii. Główne ścieżki:</p>\n<ul>\n  <li><strong>Pay Limit Scheme</strong>: dla osób z ofertą pracy powyżej progu wynagrodzenia (~465 000 DKK brutto/rok, 2025)</li>\n  <li><strong>Positive List</strong>: dla zawodów deficytowych — lista aktualizowana co 6 miesięcy</li>\n  <li><strong>Fast-track Certification</strong>: dla pracodawców certyfikowanych przez SIRI — szybsze i prostsze</li>\n  <li><strong>EU Blue Card</strong>: dla wysoko wykwalifikowanych pracowników</li>\n  <li><strong>Researcher</strong>: dla naukowców i akademików</li>\n</ul>\n<p>Złóż wniosek przez <a href="https://www.nyidanmark.dk" target="_blank" rel="noopener">nyidanmark.dk</a> przed rozpoczęciem pracy.</p>` }'
)

# ── Chapter 9 inline ──────────────────────────────────────────────────────
r('uk:"Стартапи та Бізнес" },',
  'uk:"Стартапи та Бізнес", pl:"Startupy i Biznes" },')
r('uk:"Будуємо Тут" },',
  'uk:"Будуємо Тут", pl:"Budujemy Tutaj" },')
r('uk:"Данія — таємно один із найкращих місць в Європі для заснування компанії. Мінімум бюрократії, висока довіра, чудові таланти." },',
  'uk:"Данія — таємно один із найкращих місць в Європі для заснування компанії. Мінімум бюрократії, висока довіра, чудові таланти.", pl:"Dania jest skrycie jednym z najlepszych miejsc w Europie do zakładania firmy. Minimalna biurokracja, wysokie zaufanie, świetne talenty." },')

# Ch9 S1: business entity types
r(
    'піталу (знижено з 40 000 DKK з 27 лют. 2025) плюс ~670 DKK за реєстрацію.</p>` }',
    'піталу (знижено з 40 000 DKK з 27 лют. 2025) плюс ~670 DKK за реєстрацію.</p>`,\n               pl:`<p>Główne formy prawne dla przedsiębiorców w Danii:</p>\n<table class="info-table">\n  <tr><th>Forma</th><th>Opis</th><th>Minimalne wymagania</th></tr>\n  <tr><td><strong>Enkeltmandsvirksomhed</strong></td><td>Jednoosobowa działalność gospodarcza</td><td>Brak min. kapitału; właściciel odpowiada całym majątkiem</td></tr>\n  <tr><td><strong>ApS</strong></td><td>Spółka z o.o. (odpowiednik polskiej sp. z o.o.)</td><td>Min. 40 000 DKK kapitału (od 27 lut. 2025: obniżono z 40 000 DKK) + ok. 670 DKK rejestracji</td></tr>\n  <tr><td><strong>A/S</strong></td><td>Spółka akcyjna</td><td>Min. 400 000 DKK kapitału</td></tr>\n  <tr><td><strong>I/S</strong></td><td>Spółka jawna</td><td>Brak min. kapitału; wspólnicy odpowiadają solidarnie</td></tr>\n</table>\n<p>Dla większości startupów: ApS to najlepsza opcja — ograniczona odpowiedzialność przy rozsądnym koszcie startu.</p>` }'
)

# Ch9 S2: registration on virk.dk
r(
    '<a href="https://virk.dk/myndigheder/virksomhed/registrering" target="_blank" rel="noopener">→ Зареєструйте свій бізнес на virk.dk</a>` }',
    '<a href="https://virk.dk/myndigheder/virksomhed/registrering" target="_blank" rel="noopener">→ Зареєструйте свій бізнес на virk.dk</a>`,\n               pl:`<p>Rejestracja firmy w Danii jest prosta i w dużej mierze odbywa się online przez <a href="https://virk.dk" target="_blank" rel="noopener">virk.dk</a>.</p>\n<p><strong>Kroki rejestracji ApS:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Zaloguj się na virk.dk przez MitID</li>\n  <li><span class="step-num">2</span>Wybierz typ firmy (ApS) i uzupełnij dane</li>\n  <li><span class="step-num">3</span>Wpłać kapitał zakładowy (min. 40 000 DKK) na konto powiernicze</li>\n  <li><span class="step-num">4</span>Złóż wniosek — rejestracja zajmuje 1–3 dni robocze</li>\n  <li><span class="step-num">5</span>Otrzymaj CVR (numer identyfikacyjny firmy) i otwórz konto firmowe</li>\n</ol>\n<a href="https://virk.dk/myndigheder/virksomhed/registrering" target="_blank" rel="noopener">→ Zarejestruj firmę na virk.dk</a>` }'
)

# Ch9 S3: taxes for businesses
r(
    '<a href="https://skat.dk/en-us/business/starting-a-business/" target="_blank" rel="noopener">→ Відкриття бізнесу — посібник SKAT (англійська)</a>` }',
    '<a href="https://skat.dk/en-us/business/starting-a-business/" target="_blank" rel="noopener">→ Відкриття бізнесу — посібник SKAT (англійська)</a>`,\n               pl:`<p>Podatki dla firm w Danii (2025):</p>\n<ul>\n  <li><strong>Podatek od dochodów spółki (selskabsskat):</strong> 22% od zysku netto</li>\n  <li><strong>VAT (moms):</strong> 25% — jeden z najwyższych w Europie. Obowiązkowy przy obrocie powyżej 50 000 DKK rocznie</li>\n  <li><strong>Podatek dywidendowy:</strong> 27% do 61 000 DKK; 42% powyżej tego progu (2025)</li>\n  <li><strong>A-skat i AM-bidrag:</strong> Obowiązek potrącania podatku od wynagrodzeń pracowników</li>\n</ul>\n<p>Jako właściciel ApS: Twoja osobista pensja jako dyrektor jest opodatkowana jak wynagrodzenie pracownicze. Zyski firmy opodatkowane stawką 22%.</p>\n<a href="https://skat.dk/en-us/business/starting-a-business/" target="_blank" rel="noopener">→ Zakładanie firmy — przewodnik SKAT (angielski)</a>` }'
)

# Ch9 S4: ecosystem / funding
r(
    '</ul>` }\n      },\n      {\n        icon: "🌍"',
    '</ul>`,\n               pl:`<ul>\n  <li><strong>Copenhagen Capacity</strong> — agencja ds. inwestycji i zatrudnienia, oferuje bezpłatną pomoc dla firm wchodzących na rynek duński</li>\n  <li><strong>DTU Science Park / Copenhagen Science City</strong> — centra innowacji i inkubatory</li>\n  <li><strong>The Danish Tech Challenge</strong> — program akceleracyjny</li>\n  <li><strong>Finansiering Danmark</strong> — pożyczki i gwarancje dla małych firm</li>\n  <li><strong>Innobooster (Innovationsfonden)</strong> — granty na innowacje do 2 mln DKK</li>\n  <li><strong>Vækstfonden</strong> — fundusz wzrostu oferujący pożyczki i gwarancje dla startupów</li>\n</ul>` }\n      },\n      {\n        icon: "🌍"'
)

# Ch9 S5: Startup Denmark
r(
    '<a href="https://startupdenmark.info" target="_blank" rel="noopener">→ Офіційна програма Startup Denmark</a>` }',
    '<a href="https://startupdenmark.info" target="_blank" rel="noopener">→ Офіційна програма Startup Denmark</a>`,\n               pl:`<p><strong>Startup Denmark</strong> to specjalna wiza umożliwiająca założycielom spoza UE założenie firmy w Danii, jeśli ich plan biznesowy zostanie zatwierdzony przez panel ekspertów.</p>\n<p><strong>Wymagania:</strong></p>\n<ul>\n  <li>Innowacyjny pomysł na biznes z potencjałem wzrostu</li>\n  <li>Wystarczające środki finansowe (zazwyczaj min. 100 000 DKK)</li>\n  <li>Zatwierdzenie przez panel ekspertów branżowych</li>\n</ul>\n<p><strong>Ekosystem startupowy Kopenhagi:</strong> Copenhagen jest w top 20 europejskich ekosystemów startupowych. Silne sektory: cleantech, healthtech, foodtech, fintech i gaming.</p>\n<a href="https://startupdenmark.info" target="_blank" rel="noopener">→ Oficjalny program Startup Denmark</a>` }'
)

# ── Chapter 10 inline ─────────────────────────────────────────────────────
r('uk:"Транспорт" },\n    subtitle',
  'uk:"Транспорт", pl:"Transport" },\n    subtitle')
r('uk:"На Велосипеді чи в Черзі" },',
  'uk:"На Велосипеді чи в Черзі", pl:"Rowerem lub w Kolejce" },')
r('uk:"Данія їздить на велосипедах. Буквально. Ось як орієнтуватися в країні, де велосипед швидший за автомобіль." },',
  'uk:"Данія їздить на велосипедах. Буквально. Ось як орієнтуватися в країні, де велосипед швидший за автомобіль.", pl:"Dania jeździ na rowerach. Dosłownie. Oto jak poruszać się w kraju, gdzie rower jest szybszy od samochodu." },')

# Ch10 S1: cycling
r(
    'тарів: 700 DKK. Датчани серйозно ставляться до правил велосипедного руху.</p>` }',
    'тарів: 700 DKK. Датчани серйозно ставляться до правил велосипедного руху.</p>`,\n               pl:`<p>Rower jest podstawowym środkiem transportu w Danii — szczególnie w Kopenhadze. Miasto ma ponad 400 km dedykowanych ścieżek rowerowych.</p>\n<p><strong>Zasady ruchu rowerowego:</strong></p>\n<ul>\n  <li>Jedź po prawej stronie ścieżki rowerowej</li>\n  <li>Dawaj sygnał ręką przed skrętem</li>\n  <li>Rowerzyści mają pierwszeństwo na ścieżkach rowerowych</li>\n  <li>Kask nie jest obowiązkowy dla dorosłych, ale zalecany</li>\n  <li>Obowiązkowe oświetlenie w nocy i przy złej widoczności</li>\n</ul>\n<p><strong>Zakup roweru:</strong> Dobry używany rower kosztuje 500–2 000 DKK (Den Blå Avis, Facebook Marketplace). Nowy: 1 500–8 000 DKK. Rowery elektryczne: od 8 000 DKK.</p>\n<p><strong>Mandaty za wykroczenia rowerowe:</strong> Korzystanie z telefonu podczas jazdy: 700 DKK. Duńczycy poważnie traktują przepisy ruchu rowerowego.</p>` }'
)

# Ch10 S2: public transport
r(
    'онюйте заздалегідь онлайн для суттєвої економії, особливо квитки Offpeak.</p>` }',
    'онюйте заздалегідь онлайн для суттєвої економії, особливо квитки Offpeak.</p>`,\n               pl:`<p>Duński transport publiczny jest zintegrowany i niezawodny — i drogi jak na europejskie standardy.</p>\n<p><strong>Rejsekort</strong> (karta podróżna, jak Oyster): Kluczowy instrument. Kupujesz online lub na stacjach. Tańszy od biletów papierowych. Melduj się przy wsiadaniu i wysiadaniu.</p>\n<p><strong>Typy biletów:</strong></p>\n<ul>\n  <li><strong>Pendlerkort</strong> (karta miesięczna pendlera): dla codziennych dojazdów jedną trasą — znaczna oszczędność</li>\n  <li><strong>DSB Offpeak</strong>: pociągi dalekobieżne poza godzinami szczytu — do 50% taniej</li>\n  <li><strong>Rejseplan.dk</strong>: oficjalny planer podróży publicznym transportem</li>\n</ul>\n<p>Kupuj z wyprzedzeniem online, by zaoszczędzić — szczególnie bilety Offpeak.</p>` }'
)

# Ch10 S3: driving
r(
    'гах, 110/130 км/год на автострадах. Радари швидкості зустрічаються часто.</p>` }',
    'гах, 110/130 км/год на автострадах. Радари швидкості зустрічаються часто.</p>`,\n               pl:`<p>Jazda samochodem w Danii jest możliwa, ale droga i mniej konieczna niż w innych krajach.</p>\n<p><strong>Prawo jazdy:</strong></p>\n<ul>\n  <li>Obywatele UE/EOG: możesz używać prawa jazdy przez cały pobyt, ale przy stałym zameldowaniu musisz je wymienić na duńskie</li>\n  <li>Spoza UE: musisz wymienić lub zdać egzamin w Danii (kosztowne: 8 000–15 000 DKK)</li>\n</ul>\n<p><strong>Koszty prowadzenia samochodu:</strong></p>\n<ul>\n  <li>Rejestracyjny podatek samochodowy: 85–150% wartości pojazdu (jeden z najwyższych w Europie!)</li>\n  <li>Paliwo: ok. 13–15 DKK/litr</li>\n  <li>Obowiązkowe ubezpieczenie OC</li>\n</ul>\n<p><strong>Ograniczenia prędkości:</strong> 50 km/h w terenie zabudowanym, 80 km/h poza nim, 110/130 km/h na autostradach. Fotoradary spotykane są często.</p>` }'
)

# ── Chapter 11 inline ─────────────────────────────────────────────────────
r('uk:"Мова" },\n    subtitle',
  'uk:"Мова", pl:"Język" },\n    subtitle')
r('uk:"Данська — Неможлива. Вчіть Її Однаково." },',
  'uk:"Данська — Неможлива. Вчіть Її Однаково.", pl:"Duński — Niemożliwy. I tak się go ucz." },')
r('uk:"Вимова данської мови є унікально складною. Кожен датчанин розмовляє англійською. Жоден із цих фактів не змінює того, що вивчення данської перетворить ваше життя тут." },',
  'uk:"Вимова данської мови є унікально складною. Кожен датчанин розмовляє англійською. Жоден із цих фактів не змінює того, що вивчення данської перетворить ваше життя тут.", pl:"Wymowa duńskiego jest wyjątkowo trudna. Każdy Duńczyk mówi po angielsku. Żaden z tych faktów nie zmienia tego, że nauka duńskiego odmieni Twoje życie tutaj." },')

# Ch11 S1: why learn Danish
r(
    ' вам, але помітять зусилля, і це відкриє двері, які ніщо інше не відкриє.</p>` }',
    ' вам, але помітять зусилля, і це відкриє двері, які ніщо інше не відкриє.</p>`,\n               pl:`<p>Praktycznie każdy Duńczyk mówi po angielsku — więc po co się uczyć duńskiego?</p>\n<ul>\n  <li>Rynek pracy: wiele stanowisk wymaga duńskiego, szczególnie w sektorze publicznym</li>\n  <li>Integracja społeczna: głębsze relacje z Duńczykami wymagają ich języka</li>\n  <li>Wymagania pobytowe: stały pobyt wymaga zdania egzaminu Prøve i Dansk 2 lub wyższego</li>\n  <li>Codzienne życie: listy urzędowe, etykiety produktów, ogłoszenia — wszystko po duńsku</li>\n  <li>Szacunek: Duńczycy nie powiedzą Ci tego wprost, ale docenią Twój wysiłek i to otworzy drzwi, których nic innego nie otworzy</li>\n</ul>` }'
)

# Ch11 S2: free language courses
r(
    'агає регулярного навчання поза уроками — пасивна присутність не достатня.</p>` }',
    'агає регулярного навчання поза уроками — пасивна присутність не достатня.</p>`,\n               pl:`<p>Bezpłatne kursy duńskiego są dostępne dla uprawnionych rezydentów:</p>\n<ul>\n  <li><strong>Danskuddannelse (DU1/DU2/DU3)</strong>: bezpłatne kursy państwowe przez sprogcenter Twojej gminy</li>\n  <li><strong>Kto się kwalifikuje:</strong> Osoby z pozwoleniem na pracę lub pobyt, uchodźcy i osoby łączące rodzinę</li>\n  <li><strong>Czas trwania:</strong> 3–5 lat do egzaminu końcowego (PD3 lub SD)</li>\n</ul>\n<p><strong>Płatne alternatywy:</strong></p>\n<ul>\n  <li>Sprogskolen (szkoły językowe): 1 000–3 000 DKK/mies.</li>\n  <li>Online: Duolingo (podstawy), Babbel (pośredni), Dreaming Spanish metodą dla duńskiego</li>\n</ul>\n<p>Pamiętaj: nauka wymaga regularnej pracy poza lekcjami — bierna obecność na zajęciach nie wystarczy.</p>` }'
)

# Ch11 S3: pronunciation tips
r(
    'ритм закріплює моделі вимови\n</li>\n</ul>` }',
    'ритм закріплює моделі вимови\n</li>\n</ul>`,\n               pl:`<p>Duńska wymowa jest znana jako jedna z najtrudniejszych w Europie. Kluczowe wyzwania:</p>\n<ul>\n  <li><strong>Stød</strong>: charakterystyczna "głoś z napięciem krtani" — nie ma odpowiednika w polskim</li>\n  <li><strong>Połykanie głosek:</strong> Duńczycy nie wymawiają wielu liter — "hva\' sker der" brzmi jak "skeh"</li>\n  <li><strong>Samogłoski miękkie:</strong> Wiele dźwięków jest płynnych, trudnych dla Polaków</li>\n</ul>\n<p><strong>Wskazówki:</strong></p>\n<ul>\n  <li>Słuchaj duńskiego radia, podcastów i telewizji — DR.dk ma darmowe treści</li>\n  <li>Ucz się całych fraz, nie pojedynczych słów</li>\n  <li>Naśladuj native speakerów — rytm utrwala wzorce wymowy</li>\n</ul>` }'
)

# Ch11 S4: language apps grid
r(
    '</div>` }\n      }\n    ],\n    checklist: [\n      { id:"ch11_',
    '</div>`,\n               pl:`<div class="app-grid">\n  <div class="app-card"><strong>Duolingo</strong><p>Podstawy gamifikacji — idealne na start. Bezpłatny.</p></div>\n  <div class="app-card"><strong>Babbel</strong><p>Ustrukturyzowane lekcje z wymową. Ok. 70 DKK/mies.</p></div>\n  <div class="app-card"><strong>Clozemaster</strong><p>Nauka przez kontekst dla zaawansowanych. Bezpłatny/premium.</p></div>\n  <div class="app-card"><strong>Ling</strong><p>Aplikacja z naciskiem na mówienie i wymowę duńską.</p></div>\n  <div class="app-card"><strong>DR Sprogprøve</strong><p>Oficjalne ćwiczenia z testem językowym DR — bezpłatne.</p></div>\n  <div class="app-card"><strong>Speechling</strong><p>Korekta wymowy przez native speakerów — polecane dla duńskiego.</p></div>\n</div>` }\n      }\n    ],\n    checklist: [\n      { id:"ch11_'
)

def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        c = f.read()
    errors = []
    applied = 0
    for old, new in REPLACEMENTS:
        cnt = c.count(old)
        if cnt == 0: errors.append(f"NOT FOUND: {old[:80]}")
        elif cnt > 1: errors.append(f"AMBIGUOUS ({cnt}): {old[:80]}")
        else: c = c.replace(old, new, 1); applied += 1
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"Applied: {applied}/{len(REPLACEMENTS)}")
    for e in errors: print(e)
    print("Total pl: blocks:", c.count('pl:`'))

if __name__ == '__main__': main()
