#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    c = f.read()

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# Ch9 S5 Startup Denmark (actual URL has www.)
r(
    'rel="noopener">→ Офіційна програма Startup Denmark</a>` }',
    'rel="noopener">→ Офіційна програма Startup Denmark</a>`,\n               pl:`<p><strong>Startup Denmark</strong> to specjalna wiza dla założycieli spoza UE chcących uruchomić firmę w Danii. Plan biznesowy musi zostać zatwierdzony przez panel ekspertów.</p>\n<p><strong>Wymagania:</strong></p>\n<ul>\n  <li>Innowacyjny pomysł z potencjałem wzrostu i internacjonalizacji</li>\n  <li>Wystarczające środki finansowe (zazwyczaj min. 100 000 DKK)</li>\n  <li>Zatwierdzenie przez panel branżowych ekspertów</li>\n</ul>\n<p><strong>Ekosystem Kopenhagi:</strong> top 20 europejskich ekosystemów startupowych. Mocne sektory: cleantech, healthtech, foodtech, fintech, gaming.</p>\n<a href="https://www.startupdenmark.info" target="_blank" rel="noopener">→ Oficjalny program Startup Denmark</a>` }'
)

# Ch9 S2 virk.dk (actual URL different)
r(
    'rel="noopener">→ Зареєструйте свій бізнес на virk.dk</a>` }',
    'rel="noopener">→ Зареєструйте свій бізнес на virk.dk</a>`,\n               pl:`<p>Rejestracja firmy w Danii odbywa się przez <a href="https://virk.dk" target="_blank" rel="noopener">virk.dk</a>.</p>\n<p><strong>Kroki rejestracji (enkeltmand lub ApS):</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Zaloguj się na virk.dk przez MitID</li>\n  <li><span class="step-num">2</span>Wybierz "Registrer ny virksomhed" i typ firmy</li>\n  <li><span class="step-num">3</span>Wpisz nazwę firmy, adres i kod branżowy (branchekode)</li>\n  <li><span class="step-num">4</span>Numer CVR wydawany w ciągu 1–2 dni roboczych</li>\n  <li><span class="step-num">5</span>Zarejestruj VAT (moms) przy przekroczeniu 50 000 DKK obrotu rocznie</li>\n</ol>\n<a href="https://virk.dk" target="_blank" rel="noopener">→ Zarejestruj firmę na virk.dk</a>` }'
)

# Ch13 S2 family reunification (uk: ending)
r(
    "rel=\"noopener\">→ Посібник з возз'єднання сім'ї (nyidanmark.dk, англійська)</a>` }",
    "rel=\"noopener\">→ Посібник з возз'єднання сім'ї (nyidanmark.dk, англійська)</a>`,\n               pl:`<p>Łączenie rodzin w Danii możliwe jest dla małżonków i partnerów zarejestrowanych. Wymagania:</p>\n<ul>\n  <li>Wnioskodawca w Danii musi być obywatelem duńskim lub mieć stały pobyt / pobyt unijny</li>\n  <li>Para musi mieć co najmniej 24 lata</li>\n  <li>Wnioskodawca musi spełniać kryteria samodzielności (własne mieszkanie, stabilne dochody, brak zasiłków itp.)</li>\n  <li>Wymagana kaucja integracyjna (integrationsgaranti) lub spełnienie kryteriów wyjątku</li>\n</ul>\n<p>Czas rozpatrzenia: 3–12 miesięcy. Aplikuj przez <a href=\"https://www.nyidanmark.dk\" target=\"_blank\" rel=\"noopener\">nyidanmark.dk</a>.</p>\n<a href=\"https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family-reunification/Spouse-or-cohabitant\" target=\"_blank\" rel=\"noopener\">→ Przewodnik po łączeniu rodzin (nyidanmark.dk, angielski)</a>` }"
)

# Also need: Ch9 S4 ecosystem (check what actually needs pl:)
# The anchor I tried didn't work -- let me check the ACTUAL uk: ending for that section
# Check for "Vækstfonden" or similar in uk:
# Based on line 4725 region, the ch9 S4 should end around 4806
# Let me use a different search
r(
    '</ul>` }\n      },\n      {\n        icon: "🌍",\n        title: { en:"Startup Denmark',
    '</ul>`,\n               pl:`<ul>\n  <li><strong>Copenhagen Capacity</strong> — bezpłatna pomoc dla firm wchodzących na rynek duński</li>\n  <li><strong>DTU Science Park</strong> — inkubatory i centra innowacji</li>\n  <li><strong>Innovationsfonden (Innobooster)</strong> — granty na innowacje do 2 mln DKK</li>\n  <li><strong>Vækstfonden</strong> — fundusz wzrostu, pożyczki i gwarancje dla startupów</li>\n  <li><strong>Finansiering Danmark</strong> — pożyczki dla małych firm</li>\n</ul>` }\n      },\n      {\n        icon: "🌍",\n        title: { en:"Startup Denmark'
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
