#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# Fix ch4 s3 actual URL
r(
    '<a href="https://skat.dk/en-us/individuals/the-annual-income-assessment/" target="_blank" rel="noopener">→ Посібник з årsopgørelse (SKAT офіційний)</a>` }',
    '<a href="https://skat.dk/en-us/individuals/the-annual-income-assessment/" target="_blank" rel="noopener">→ Посібник з årsopgørelse (SKAT офіційний)</a>`,\n               pl:`<p>Co roku w marcu SKAT wysyła Ci <strong>årsopgørelse</strong> — roczne zeznanie podatkowe. Pokazuje łączny dochód, zapłacony podatek i czy masz nadpłatę, czy niedopłatę.</p>\n<p><strong>Co zrobić:</strong></p>\n<ul>\n  <li>Zaloguj się na <a href="https://skat.dk" target="_blank" rel="noopener">skat.dk</a> przez MitID i sprawdź zeznanie</li>\n  <li><strong>Nadpłata</strong>: zwrot trafia automatycznie na NemKonto w ciągu kilku tygodni</li>\n  <li><strong>Niedopłata</strong>: płać jednorazowo lub rozkładaj na raty w kolejnym roku</li>\n</ul>\n<p><strong>Typowe odliczenia:</strong></p>\n<ul>\n  <li>Koszty dojazdu (befordringsfradrag) — powyżej 24 km dziennie</li>\n  <li>Składki na związek zawodowy i A-kasę</li>\n  <li>Darowizny na zatwierdzone organizacje (do 17 200 DKK/rok)</li>\n  <li>Odsetki od kredytu (rentefradrag)</li>\n</ul>\n<p>Możesz ręcznie dodać pominięte odliczenia za ostatnie 3 lata na skat.dk.</p>\n<a href="https://skat.dk/en-us/individuals/the-annual-income-assessment/" target="_blank" rel="noopener">→ Przewodnik po årsopgørelse (SKAT oficjalne)</a>` }'
)

# Fix ch4 s4 MobilePay actual URL
r(
    '<a href="https://mobilepay.dk/hjaelp/mobilepay-bruger" target="_blank" rel="noopener">→ Допомога MobilePay (доступна англійська)</a>` }',
    '<a href="https://mobilepay.dk/hjaelp/mobilepay-bruger" target="_blank" rel="noopener">→ Допомога MobilePay (доступна англійська)</a>`,\n               pl:`<p><strong>MobilePay</strong> to duński standard płatności mobilnych — używany przez niemal każdego. Płać w kawiarniach, dziel rachunki ze znajomymi, opłacaj czynsz i parkowanie.</p>\n<p><strong>Jak zacząć:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span>Pobierz MobilePay z App Store lub Google Play</li>\n  <li><span class="step-num">2</span>Zarejestruj się duńskim numerem telefonu i kontem bankowym</li>\n  <li><span class="step-num">3</span>Zweryfikuj tożsamość przez MitID</li>\n</ol>\n<p><strong>Opłaty (2025):</strong></p>\n<ul>\n  <li>Przesyłanie pieniędzy: bezpłatnie do 5 000 DKK/mies.; 1,75% powyżej tej kwoty</li>\n  <li>Płatności u przedsiębiorców: zależnie od sklepu</li>\n</ul>\n<a href="https://mobilepay.dk/hjaelp/mobilepay-bruger" target="_blank" rel="noopener">→ Pomoc MobilePay (dostępna po angielsku)</a>` }'
)

# Fix ch5 inline
r(
    'uk:"Охорона Здоров\'я" },',
    'uk:"Охорона Здоров\'я", pl:"Opieka Zdrowotna" },'
)
r(
    'uk:"Ваше Здоров\'я в Данії" },',
    'uk:"Ваше Здоров\'я в Данії", pl:"Twoje Zdrowie w Danii" },'
)
r(
    'uk:"У Данії одна з найкращих систем охорони здоров\'я у світі. Вона безкоштовна. Ось як нею користуватися." },',
    'uk:"У Данії одна з найкращих систем охорони здоров\'я у світі. Вона безкоштовна. Ось як нею користуватися.", pl:"Dania ma jeden z najlepszych systemów opieki zdrowotnej na świecie. Jest bezpłatny. Oto jak z niego korzystać." },'
)

# Fix ch5 s1 sundhedskort -- check actual URL length by using unique text
r(
    'rel="noopener">→ Про sundhedskort (sundhed.dk офіційний)</a>` }',
    'rel="noopener">→ Про sundhedskort (sundhed.dk офіційний)</a>`,\n               pl:`<p>Twoja <strong>sundhedskort</strong> (żółta karta zdrowia) to klucz do duńskiego systemu opieki zdrowotnej. Wydawana przez gminę po rejestracji adresu.</p>\n<p><strong>Co zawiera:</strong> Twoje dane, numer CPR, imię i adres lekarza pierwszego kontaktu.</p>\n<p><strong>Jak ją uzyskać:</strong> Zarejestruj adres w gminie — karta zostanie wysłana pocztą automatycznie. Możesz też pobrać cyfrową wersję przez sundhed.dk (MitID).</p>\n<p class="callout-warning">Bez sundhedskort płacisz pełne koszty za rutynowe wizyty. Zarejestruj się tak szybko, jak to możliwe.</p>\n<a href="https://www.sundhed.dk" target="_blank" rel="noopener">→ O sundhedskort (sundhed.dk oficjalne)</a>` }'
)

# Fix ch5 s5 mental health
r(
    "rel=\"noopener\">→ Ресурси з психічного здоров'я (sundhed.dk)</a>` }",
    "rel=\"noopener\">→ Ресурси з психічного здоров'я (sundhed.dk)</a>`,\n               pl:`<p>Usługi zdrowia psychicznego dostępne są przez system publiczny i prywatnie. Szukanie pomocy przy stresie adaptacyjnym, samotności lub trudnościach kulturowych jest naturalne.</p>\n<p><strong>Opcje publiczne:</strong></p>\n<ul>\n  <li>Lekarz pierwszego kontaktu — może skierować do psychologa/psychiatry z refundacją</li>\n  <li>Centrum zdrowia psychicznego — przy poważniejszych stanach, przez skierowanie</li>\n</ul>\n<p><strong>Opcje prywatne:</strong></p>\n<ul>\n  <li>Prywatny psycholog: 800–1200 DKK/sesja (część refundowana przy skierowaniu)</li>\n  <li>Online: <a href=\"https://www.mindhelper.dk\" target=\"_blank\" rel=\"noopener\">mindhelper.dk</a></li>\n  <li>Telefon zaufania (Livslinjen): <strong>70 201 201</strong> (24/7)</li>\n</ul>\n<a href=\"https://www.sundhed.dk/borger/patienthaandbogen/psykiatri-og-psykologi/\" target=\"_blank\" rel=\"noopener\">→ Zasoby zdrowia psychicznego (sundhed.dk)</a>` }"
)

# Fix ch6 subtitle and intro
r(
    'uk:"Виховуємо Маленьких Вікінгів" },',
    'uk:"Виховуємо Маленьких Вікінгів", pl:"Wychowujemy Małych Wikingów" },'
)
r(
    'uk:"Данія — мабуть, найкраща країна у світі для виховання дітей. Ось усе, що вам потрібно знати." },',
    'uk:"Данія — мабуть, найкраща країна у світі для виховання дітей. Ось усе, що вам потрібно знати.", pl:"Dania jest prawdopodobnie najlepszym krajem na świecie do wychowywania dzieci. Oto wszystko, co musisz wiedzieć." },'
)

# Fix ch6 s1 barsel
r(
    "rel=\"noopener\">→ Повний посібник з декретної відпустки (borger.dk офіційний)</a>` }",
    "rel=\"noopener\">→ Повний посібник з декретної відпустки (borger.dk офіційний)</a>`,\n               pl:`<p>Duński urlop rodzicielski należy do najhojniejszych na świecie. System zmieniono w 2022 r.</p>\n<p><strong>Podział urlopu:</strong></p>\n<ul>\n  <li><strong>2 tygodnie przed porodem</strong> dla matki</li>\n  <li><strong>10 tygodni zarezerwowanych dla matki</strong> po porodzie (nieprzenoszalne)</li>\n  <li><strong>10 tygodni zarezerwowanych dla drugiego rodzica</strong> (nieprzenoszalne)</li>\n  <li><strong>22 tygodnie wspólne</strong> do podziału — łącznie <strong>52 tygodnie</strong></li>\n</ul>\n<p><strong>Zasiłek (barselsdagpenge):</strong> maks. 4 765 DKK/tydz. (2025). Wiele umów zbiorowych uzupełnia do pełnej pensji.</p>\n<p class=\"callout-warning\">Jako pracownik migrujący Twoje prawa mogą się różnić — sprawdź z Udbetaling Danmark i działem HR.</p>\n<a href=\"https://www.borger.dk/familie-og-boern/Barsel\" target=\"_blank\" rel=\"noopener\">→ Pełny przewodnik po urlopie rodzicielskim (borger.dk oficjalne)</a>` }"
)

# Fix ch6 s2 childcare
r(
    "rel=\"noopener\">→ Інформація про догляд за дітьми (borger.dk)</a>` }",
    "rel=\"noopener\">→ Інформація про догляд за дітьми (borger.dk)</a>`,\n               pl:`<p>Duńska opieka nad dziećmi jest dotowana przez państwo i powszechnie dostępna.</p>\n<p><strong>Rodzaje opieki:</strong></p>\n<ul>\n  <li><strong>Dagpleje</strong>: rodzinna opieka dzienna, 0–2,9 roku</li>\n  <li><strong>Vuggestue</strong>: żłobek, 0–2,9 roku</li>\n  <li><strong>Børnehave</strong>: przedszkole, 3–5,9 roku (bezpłatne od 3 lat w większości gmin)</li>\n  <li><strong>SFO/fritidshjem</strong>: świetlica szkolna, 6–9 lat</li>\n</ul>\n<p><strong>Koszty:</strong> Maks. 25% rzeczywistych kosztów — reszta pokrywana przez rząd. Ulgi dochodowe mogą zmniejszyć kwotę do 0 DKK.</p>\n<p><strong>Jak się zapisać:</strong> Przez stronę gminy lub bezpośrednio. W Kopenhadze listy oczekujących bywają długie — zapisz się już w ciąży.</p>\n<a href=\"https://www.borger.dk/familie-og-boern/pasning-af-boern\" target=\"_blank\" rel=\"noopener\">→ Informacje o opiece nad dziećmi (borger.dk)</a>` }"
)

# Fix ch6 s3 børnecheck
r(
    "rel=\"noopener\">→ Виплати на дітей та молодь (lifeindenmark.borger.dk)</a>` }",
    "rel=\"noopener\">→ Виплати на дітей та молодь (lifeindenmark.borger.dk)</a>`,\n               pl:`<p>Dania wypłaca automatyczne świadczenia na dzieci (børnefamilieydelse) za pośrednictwem Udbetaling Danmark — nie trzeba składać wniosku.</p>\n<p><strong>Stawki 2025 (kwartalne):</strong></p>\n<ul>\n  <li>0–2 lata: <strong>4 972 DKK/kwartał</strong></li>\n  <li>3–6 lat: <strong>3 939 DKK/kwartał</strong></li>\n  <li>7–14 lat: <strong>3 099 DKK/kwartał</strong></li>\n  <li>15–17 lat: <strong>1 035 DKK/kwartał</strong></li>\n</ul>\n<p>Świadczenia wypłacane automatycznie na NemKonto po rejestracji dziecka z numerem CPR.</p>\n<a href=\"https://www.borger.dk/familie-og-boern/bornefamilieydelse\" target=\"_blank\" rel=\"noopener\">→ Świadczenia na dzieci (lifeindenmark.borger.dk)</a>` }"
)

errors = []
applied = 0
for old, new in REPLACEMENTS:
    count = content.count(old)
    if count == 0: errors.append(f"NOT FOUND: {repr(old[:80])}")
    elif count > 1: errors.append(f"AMBIGUOUS ({count}): {repr(old[:80])}")
    else: content = content.replace(old, new, 1); applied += 1

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Applied: {applied}/{len(REPLACEMENTS)}")
for e in errors: print(e)
print("Total pl: blocks:", content.count('pl:`'))
