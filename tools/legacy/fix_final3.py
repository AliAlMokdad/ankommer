#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    c = f.read()

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# Ch7 S1: universities -- ends with optagelse.dk anchor
r(
    '<strong>15 травня (індивідуальні заяви)</strong>.</p>` }',
    '<strong>15 травня (індивідуальні заяви)</strong>.</p>`,\n               pl:`<p>Dania ma osiem państwowych uniwersytetów i dziesiątki wyspecjalizowanych uczelni. Wszystkie są dobrze finansowane i stale plasują się wśród najlepszych w Europie.</p>\n<table class="info-table">\n  <tr><th>Uniwersytet</th><th>Miasto</th><th>Znany z</th><th>Ranking (orientacyjny)</th></tr>\n  <tr><td><strong>Uniwersytet Kopenhaski (KU)</strong></td><td>Kopenhaga</td><td>Badania, medycyna, nauki humanistyczne</td><td>Top 100 na świecie</td></tr>\n  <tr><td><strong>DTU</strong></td><td>Kongens Lyngby</td><td>Inżynieria, technologie, zrównoważony rozwój</td><td>Top 150 na świecie</td></tr>\n  <tr><td><strong>CBS</strong></td><td>Kopenhaga</td><td>Biznes, zarządzanie, ekonomia</td><td>Top 50 w Europie (biznes)</td></tr>\n  <tr><td><strong>Uniwersytet w Aarhus (AU)</strong></td><td>Aarhus</td><td>Szeroki profil badawczy</td><td>Top 150 na świecie</td></tr>\n  <tr><td><strong>SDU</strong></td><td>Odense</td><td>Zdrowie, inżynieria, nauki humanistyczne</td><td>Top 400 na świecie</td></tr>\n  <tr><td><strong>AAU</strong></td><td>Aalborg</td><td>Nauka oparta na problemach, inżynieria</td><td>Top 400 na świecie</td></tr>\n</table>\n<p><strong>Aplikacje przez:</strong> <a href="https://www.optagelse.dk" target="_blank" rel="noopener">optagelse.dk</a> (programy po duńsku) lub bezpośrednio do uczelni dla programów magisterskich po angielsku. Główny termin składania: <strong>15 marca (skoordynowany)</strong> lub <strong>15 maja (indywidualne)</strong>.</p>` }'
)

# Ch7 S2: tuition fees / SU -- ends with su.dk/english anchor
r(
    '<a href="https://www.su.dk/english/" target="_blank" rel="noopener">→ Подати заявку на SU (офіційно, англійською)</a>` }',
    '<a href="https://www.su.dk/english/" target="_blank" rel="noopener">→ Подати заявку на SU (офіційно, англійською)</a>`,\n               pl:`<p><strong>Czesne w zależności od obywatelstwa:</strong></p>\n<ul>\n  <li><strong>Obywatele UE/EOG/Skandynawii:</strong> Brak czesnego na uczelniach publicznych. Wszystkie programy licencjackie i magisterskie są w pełni finansowane przez państwo.</li>\n  <li><strong>Obywatele spoza UE:</strong> Czesne obowiązuje — zazwyczaj 50 000–130 000 DKK rocznie w zależności od uczelni i programu.</li>\n</ul>\n<p><strong>SU — Statens Uddannelsesstøtte (Państwowe Stypendium Edukacyjne):</strong></p>\n<p>SU to miesięczna dotacja od duńskiego państwa dla studentów zapisanych na uznane uczelnie. <strong>Brak spłaty</strong> — to dotacja, nie pożyczka.</p>\n<table class="info-table">\n  <tr><th>Sytuacja</th><th>Miesięczne SU (2025)</th></tr>\n  <tr><td>Poniżej 20 lat, mieszka z rodzicami</td><td>822 DKK</td></tr>\n  <tr><td>Poniżej 20 lat, mieszka samodzielnie</td><td>2 936 DKK</td></tr>\n  <tr><td>Powyżej 20 lat, mieszka samodzielnie (większość)</td><td>6 321 DKK</td></tr>\n</table>\n<p>Studenci mogą też ubiegać się o <strong>pożyczkę SU</strong> do 4 204 DKK/mies. ponad dotację, przy niskim oprocentowaniu.</p>\n<p class="callout-warning">Obywatele UE pracujący i płacący podatki w Danii są generalnie uprawnieni do SU. Studenci spoza UE nie są uprawnieni, chyba że mają stały pobyt lub specjalne zezwolenie.</p>\n<a href="https://www.su.dk/english/" target="_blank" rel="noopener">→ Złóż wniosek o SU (oficjalnie, po angielsku)</a>` }'
)

# Ch7 S3: language classes -- actual URL is Permanent-residence-permit, not Family-reunification
r(
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit/Language-requirement" target="_blank" rel="noopener">→ Мовні вимоги для проживання (nyidanmark.dk)</a>` }',
    '<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit/Language-requirement" target="_blank" rel="noopener">→ Мовні вимоги для проживання (nyidanmark.dk)</a>`,\n               pl:`<p>Dania oferuje bezpłatne kursy języka duńskiego wszystkim mieszkańcom z numerem CPR, którzy nie są studentami z UE (ci płacą). To prawo ustawowe — pracodawca lub gmina muszą je zapewnić.</p>\n<p><strong>Trzy poziomy w zależności od wykształcenia:</strong></p>\n<ul>\n  <li><strong>Danskuddannelse 1 (DU1):</strong> Dla osób z niskim wykształceniem formalnym. Prowadzi do Prøve i Dansk 1 (PD1)</li>\n  <li><strong>Danskuddannelse 2 (DU2):</strong> Dla osób ze średnim wykształceniem. Prowadzi do PD2</li>\n  <li><strong>Danskuddannelse 3 (DU3):</strong> Dla osób z wyższym wykształceniem (większość specjalistów). Prowadzi do Studieprøven (poziom wstępu na uczelnię)</li>\n</ul>\n<p><strong>Czas trwania:</strong> Do 3 lat (masz 5 lat od pierwszego uzyskania prawa do kursu).</p>\n<p><strong>Jak zacząć:</strong> Zgłoś się do działu integracji gminy (integrationsafdelingen) lub zapisz bezpośrednio do centrum językowego (sprogcenter) w swoim rejonie.</p>\n<p><strong>Poziomy egzaminów ważne dla pobytu i obywatelstwa:</strong> Stały pobyt wymaga <strong>PD2 (≈ B1)</strong>. Obywatelstwo wymaga <strong>PD3 (≈ B2)</strong>. Studia na programach po duńsku zazwyczaj wymagają <strong>Studieprøven (≈ C1)</strong>.</p>\n<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit/Language-requirement" target="_blank" rel="noopener">→ Wymagania językowe dla pobytu (nyidanmark.dk)</a>` }'
)

# Ch8 S2: work culture -- ends with </ul>` }
# Need unique anchor -- use the specific last li text
r(
    '<li><strong>П\'ятничні вечори влітку:</strong> Багато офісів тихо скорочують роботу приблизно о 14:00 у п\'ятниці з червня по серпень. Ніхто це офіційно не оголошує — ви маєте самі це відчути.</li>\n</ul>` }',
    '<li><strong>П\'ятничні вечори влітку:</strong> Багато офісів тихо скорочують роботу приблизно о 14:00 у п\'ятниці з червня по серпень. Ніхто це офіційно не оголошує — ви маєте самі це відчути.</li>\n</ul>`,\n               pl:`<p>Duńskie miejsca pracy funkcjonują zupełnie inaczej niż w większości kultur. Zrozumienie tych norm sprawi, że będziesz skuteczny od pierwszego dnia:</p>\n<ul>\n  <li><strong>Płaska hierarchia.</strong> Wszyscy — łącznie z dyrektorem — zwracają się do siebie po imieniu. Formalne tytuły prawie nigdy nie są używane.</li>\n  <li><strong>16:00 — koniec dnia pracy.</strong> Duńska kultura pracy nie zachęca do zostawania po godzinach. Wyjście o 16:00 (lub wcześniej dla rodziców) jest normą. Zostawanie, żeby wyglądać na zaangażowanego, często jest odbierane podejrzliwie — jakbyś był nieefektywny.</li>\n  <li><strong>37-godzinny tydzień pracy.</strong> Standard w Danii, zapisany w układach zbiorowych (overenskomster). Bardzo niewiele stanowisk regularnie go przekracza.</li>\n  <li><strong>Bezpośredni feedback.</strong> Duńczycy powiedzą wprost, co myślą — łącznie z krytyką. To nie jest agresja — to szacunek.</li>\n  <li><strong>Decyzje przez konsensus.</strong> Spotkania trwają dłużej, bo zdanie każdego jest brane pod uwagę. Podjęta decyzja jest trwała — bo wszyscy byli zaangażowani.</li>\n  <li><strong>Obiad (frokost) się liczy.</strong> Wspólna przerwa obiadowa 12–13 to instytucja społeczna. Jedzenie samemu przy biurku jest niezwykłe i lekko antyspołeczne.</li>\n  <li><strong>Piątkowe popołudnia latem:</strong> Wiele biur cichnie ok. 14:00 w piątki od czerwca do sierpnia. Nikt tego oficjalnie nie ogłasza — sam to wyczujesz.</li>\n</ul>` }'
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
