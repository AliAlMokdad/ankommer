#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    c = f.read()

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# Ch7 S3: language requirement -- actual UK ending text
r(
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Language-requirement" target="_blank" rel="noopener">→ Мовні вимоги для проживання (nyidanmark.dk)</a>` }',
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Language-requirement" target="_blank" rel="noopener">→ Мовні вимоги для проживання (nyidanmark.dk)</a>`,\n               pl:`<p>Bezpłatne kursy duńskiego (Danskuddannelse) dostępne są dla uprawnionych rezydentów. Trzy poziomy:</p>\n<ul>\n  <li><strong>DU1</strong>: dla osób z niskim poziomem wykształcenia formalnego</li>\n  <li><strong>DU2</strong>: dla osób ze średnim wykształceniem</li>\n  <li><strong>DU3</strong>: dla osób z wyższym wykształceniem (najczęstsza dla migrantów)</li>\n</ul>\n<p>Kursy przez sprogcenter gminy. Trwają 3–5 lat do egzaminu końcowego (PD3 lub SD). Uczestnictwo zazwyczaj wymagane lub silnie zachęcane dla stałego pobytu.</p>\n<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Language-requirement" target="_blank" rel="noopener">→ Wymagania językowe dla pobytu (nyidanmark.dk)</a>` }'
)

# Ch7 S4: professional recognition -- the actual uk: block ending
r(
    '</ul>` }\n      }\n    ],\n    checklist: [\n      { id:"ch7_',
    '</ul>`,\n               pl:`<ul>\n  <li>Zawody regulowane (lekarze, pielęgniarki, prawnicy, architekci) wymagają uznania kwalifikacji przez duńskie organy regulacyjne</li>\n  <li><strong>SIRI</strong> obsługuje wiele procesów uznawania dla zagranicznych pracowników</li>\n  <li><strong>Styrelsen for Patientsikkerhed</strong> — dla pracowników służby zdrowia</li>\n  <li>Zawody nieregulowane (IT, marketing, finanse): kwalifikacje uznawane przez pracodawców — bez formalnego zatwierdzenia</li>\n  <li>Porównaj dyplomy z duńskimi poziomami na <a href="https://www.ufm.dk" target="_blank" rel="noopener">ufm.dk</a></li>\n</ul>` }\n      }\n    ],\n    checklist: [\n      { id:"ch7_'
)

# Ch8 S2: job search -- need unique anchor from the uk: ending
r(
    '. Проконсультуйтесь у своїй професійній організації перед пошуком роботи.</p>` }',
    '. Проконсультуйтесь у своїй професійній організації перед пошуком роботи.</p>`,\n               pl:`<p>Duńska kultura pracy jest wyjątkowa:</p>\n<ul>\n  <li><strong>Płaska hierarchia:</strong> Przełożeni są dostępni, "szef" nie oznacza dystansu</li>\n  <li><strong>37-godzinny tydzień pracy:</strong> Standard. Nadgodziny to wyjątek</li>\n  <li><strong>Autonomia:</strong> Duża swoboda w zarządzaniu własną pracą</li>\n  <li><strong>Bezpośrednia komunikacja:</strong> Duńczycy mówią wprost</li>\n  <li><strong>Work-life balance:</strong> Wyjście punktualnie jest normą</li>\n  <li><strong>Konsensus:</strong> Decyzje często podejmowane przez zespół</li>\n</ul>\n<p class="callout-warning">Sprawdź wymagania dotyczące pozwolenia na pracę z organizacją zawodową przed poszukiwaniem pracy.</p>` }'
)

# Ch8 S3: employment rights -- different URL ending
r(
    '<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov" target="_blank" rel="noopener">→ Права працівників (borger.dk)</a>` }',
    '<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov" target="_blank" rel="noopener">→ Права працівників (borger.dk)</a>`,\n               pl:`<p>Prawa pracownicze w Danii są silnie chronione — głównie przez umowy zbiorowe (overenskomst).</p>\n<p><strong>Kluczowe prawa:</strong></p>\n<ul>\n  <li><strong>Urlop wypoczynkowy:</strong> 5 tygodni płatnego urlopu rocznie</li>\n  <li><strong>Wypowiedzenie:</strong> 1–6 miesięcy zależnie od stażu i umowy zbiorowej</li>\n  <li><strong>Płatne zwolnienie lekarskie:</strong> Do 30 dni przez pracodawcę, następnie przez gminę</li>\n  <li><strong>Zakaz dyskryminacji:</strong> Ze względu na płeć, narodowość, wyznanie, wiek itd.</li>\n  <li><strong>Składki emerytalne:</strong> Zazwyczaj 12–17% wynagrodzenia brutto</li>\n</ul>\n<a href="https://www.borger.dk/arbejde-dagpenge-og-orlov" target="_blank" rel="noopener">→ Prawa pracownicze (borger.dk)</a>` }'
)

# Ch8 S6 unions: uk: ending -- need exact ending text
r(
    '<strong>3F</strong> (некваліфіковані робітники) — найпоширеніші варіанти.</p>` }',
    '<strong>3F</strong> (некваліфіковані робітники) — найпоширеніші варіанти.</p>`,\n               pl:`<p>Związki zawodowe odgrywają centralną rolę w duńskim rynku pracy. Warunki zatrudnienia negocjowane są zbiorowo.</p>\n<p><strong>Dlaczego warto dołączyć:</strong></p>\n<ul>\n  <li>Ochrona prawna w sporach z pracodawcą</li>\n  <li>Negocjacje płacowe i warunków pracy</li>\n  <li>Dostęp do szkoleń i zasobów zawodowych</li>\n</ul>\n<p><strong>Dla migrantów:</strong> <strong>IDA</strong> (inżynierowie/IT), <strong>Djøf</strong> (prawnicy/ekonomiści), <strong>HK</strong> (pracownicy biurowi), <strong>3F</strong> (bez kwalifikacji) to najczęstsze opcje.</p>` }'
)

# Ch9 S2: virk.dk registration -- uk: section uses different text
r(
    '<a href="https://virk.dk/myndigheder/virksomhed/registrering" target="_blank" rel="noopener">→ Зареєструйте свій бізнес на virk.dk</a>` }',
    '<a href="https://virk.dk/myndigheder/virksomhed/registrering" target="_blank" rel="noopener">→ Зареєструйте свій бізнес на virk.dk</a>`,\n               pl:`<p>Rejestracja firmy w Danii jest prosta — w dużej mierze odbywa się online przez <a href="https://virk.dk" target="_blank" rel="noopener">virk.dk</a>.</p>\n<p><strong>Kroki rejestracji:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Zaloguj się na virk.dk przez MitID</li>\n  <li><span class="step-num">2</span>Wybierz "Registrer ny virksomhed" i typ firmy</li>\n  <li><span class="step-num">3</span>Wpisz nazwę firmy, adres i kod branżowy (branchekode)</li>\n  <li><span class="step-num">4</span>Numer CVR wydawany w ciągu 1–2 dni roboczych</li>\n  <li><span class="step-num">5</span>Zarejestruj VAT (moms) obowiązkowo po przekroczeniu 50 000 DKK obrotu rocznie</li>\n</ol>\n<a href="https://virk.dk/myndigheder/virksomhed/registrering" target="_blank" rel="noopener">→ Zarejestruj firmę na virk.dk</a>` }'
)

# Ch9 S5: Startup Denmark -- different anchor needed (check actual ending)
r(
    '<a href="https://startupdenmark.info" target="_blank" rel="noopener">→ Офіційна програма Startup Denmark</a>` }',
    '<a href="https://startupdenmark.info" target="_blank" rel="noopener">→ Офіційна програма Startup Denmark</a>`,\n               pl:`<p><strong>Startup Denmark</strong> to specjalna wiza dla założycieli spoza UE chcących uruchomić firmę w Danii. Plan biznesowy musi zostać zatwierdzony przez panel ekspertów.</p>\n<p><strong>Wymagania:</strong></p>\n<ul>\n  <li>Innowacyjny pomysł z potencjałem wzrostu i internacjonalizacji</li>\n  <li>Wystarczające środki finansowe (zazwyczaj min. 100 000 DKK)</li>\n  <li>Zatwierdzenie przez panel branżowych ekspertów</li>\n</ul>\n<p><strong>Ekosystem:</strong> Kopenhaga jest w top 20 europejskich ekosystemów startupowych. Mocne sektory: cleantech, healthtech, foodtech, fintech, gaming.</p>\n<a href="https://startupdenmark.info" target="_blank" rel="noopener">→ Oficjalny program Startup Denmark</a>` }'
)

# Ch11 S3: pronunciation tips -- actual ending
r(
    '  <li>Співайте данські пісні — ритм закріплює моделі вимови</li>\n</ul>` }',
    '  <li>Співайте данські пісні — ритм закріплює моделі вимови</li>\n</ul>`,\n               pl:`<p>Duńska wymowa jest wśród najtrudniejszych w Europie. Kluczowe wyzwania:</p>\n<ul>\n  <li><strong>Stød</strong>: charakterystyczne napięcie krtaniowe — bez odpowiednika w polskim</li>\n  <li><strong>Połykanie głosek:</strong> Duńczycy nie wymawiają wielu liter — słowo "hvad" brzmi jak "ve"</li>\n  <li><strong>Miękkie samogłoski:</strong> Wiele dźwięków niejasnych dla Polaków</li>\n</ul>\n<p><strong>Wskazówki praktyczne:</strong></p>\n<ul>\n  <li>Słuchaj duńskiego radia/podcastów — DR.dk ma darmowe treści</li>\n  <li>Ucz się całych fraz, nie pojedynczych słów</li>\n  <li>Podcast: Slow Danish — prawdziwy duński w wolnym tempie. Dostępne transkrypcje</li>\n  <li>Rozmawiaj z Duńczykami po duńsku — delikatnie poprawią i pomogą</li>\n  <li>Śpiewaj duńskie piosenki — rytm utrwala wzorce wymowy</li>\n</ul>` }'
)

# Ch9 S4 ecosystem: need to find the actual uk: ending for this section
# The </ul>` } with icon 🌍 was ch7 international schools
# Let me use a unique anchor for ch9 S4
r(
    '</ul>` }\n      },\n      {\n        icon: "🌍",\n        title: { en:"Startup Denmark — The',
    '</ul>`,\n               pl:`<ul>\n  <li><strong>Copenhagen Capacity</strong> — bezpłatna pomoc dla firm wchodzących na rynek duński</li>\n  <li><strong>DTU Science Park / Copenhagen Science City</strong> — inkubatory i centra innowacji</li>\n  <li><strong>Innovationsfonden (Innobooster)</strong> — granty na innowacje do 2 mln DKK</li>\n  <li><strong>Vækstfonden</strong> — fundusz wzrostu, pożyczki i gwarancje dla startupów</li>\n  <li><strong>Finansiering Danmark</strong> — pożyczki dla małych firm</li>\n</ul>` }\n      },\n      {\n        icon: "🌍",\n        title: { en:"Startup Denmark — The'
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
