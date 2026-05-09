#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"

REPLACEMENTS = []
def r(old, new): REPLACEMENTS.append((old, new))

# ── Chapter 3 inline title/subtitle/intro ──────────────────────────────────
r(
    'uk:"Житло" },',
    'uk:"Житло", pl:"Mieszkanie" },'
)
r(
    'uk:"Ваш Домашній Простір" },',
    'uk:"Ваш Domowy Przestrzeń", pl:"Twoja Przestrzeń Domowa" },'
)
r(
    'uk:"Ринок нерухомості Данії жорстко конкурентний — особливо в Копенгагені. Але з правильною стратегією ви знайдете свій дім." },',
    'uk:"Ринок нерухомості Данії жорстко конкурентний — особливо в Копенгагені. Але з правильною стратегією ви знайдете свій дім.", pl:"Duński rynek nieruchomości jest brutalnie konkurencyjny — szczególnie w Kopenhadze. Ale z właściwą strategią znajdziesz swój dom." },'
)

# ── Chapter 3 S1: scam warning ─────────────────────────────────────────────
r(
    '''і попереджайте інших новоприбулих в експат-групах.</p>`,
da:''',
    '''і попереджайте інших новоприбулих в експат-групах.</p>`,
               pl:`<p class="callout-warning" style="background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;"><strong>⚠️ Oszustwa mieszkaniowe to największe zagrożenie finansowe dla nowo przybyłych w Danii.</strong> Fałszywe ogłoszenia na Facebook Marketplace, fałszywi wynajmujący twierdzący, że są za granicą, i żądania kaucji "na rezerwację mieszkania" przed oglądaniem kosztowały nowo przybyłych od <strong>10 000 do 50 000 DKK</strong>.</p>

<p><strong>Żelazne zasady — nigdy ich nie łam:</strong></p>
<ul>
  <li><strong>Nigdy nie przelewaj pieniędzy przed</strong> (a) podpisaniem umowy najmu (Typeformular A) i (b) osobistym obejrzeniem mieszkania w obecności faktycznego właściciela. Bez wyjątków.</li>
  <li><strong>Sprawdź własność nieruchomości</strong> na <a href="https://www.ois.dk" target="_blank" rel="noopener">ois.dk</a> (bezpłatny duński rejestr nieruchomości) lub <a href="https://www.tinglysning.dk" target="_blank" rel="noopener">tinglysning.dk</a> (rejestr aktów notarialnych).</li>
  <li><strong>Właściciel zarejestrowany z CPR</strong> w umowie musi zgadzać się z tym, co pokazuje ois.dk. Jeśli "właściciel" jest "za granicą i nie może się spotkać" — to oszustwo.</li>
  <li><strong>Płać tylko przelewem bankowym na duńskie konto na nazwisko właściciela</strong> — żadnego Western Union, MoneyGram, kryptowalut, kart podarunkowych ani "wpłaty na konto znajomego".</li>
  <li><strong>Wykonaj odwrotne wyszukiwanie obrazem</strong> zdjęć z ogłoszenia (Google Grafika / TinEye). Oszuści ponownie wykorzystują zdjęcia.</li>
  <li><strong>Maksimum prawne z góry:</strong> 3 miesiące kaucji (depositum) + 3 miesiące czynszu z góry = 6 miesięcy. Więcej jest nielegalne na mocy Lejeloven §34.</li>
</ul>
<p><strong>Jeśli coś wzbudza podejrzenia — masz rację.</strong> Odpuść — zawsze pojawi się inne ogłoszenie. Zgłaszaj oszustwa na <a href="https://politi.dk" target="_blank" rel="noopener">politi.dk</a> i ostrzegaj innych nowo przybyłych w grupach dla ekspatów.</p>` }
      },
      {
        icon:"🏘️"''',
)
r(
    '        icon:"🏘️", title:{ en:"Types of Housing in Denmark", da:"Boligtyper i Danmark" },',
    '        icon:"🏘️", title:{ en:"Types of Housing in Denmark", da:"Boligtyper i Danmark" },'
)

# ── Chapter 3 S2: types of housing ────────────────────────────────────────
r(
    '''у на andelsbolig — у довгостроковій перспективі це може значно заощадити.</p>` }
      },
      {
        icon:"✍️"''',
    '''у на andelsbolig — у довгостроковій перспективі це може значно заощадити.</p>`,
               pl:`<p>Dania ma cztery główne rodzaje najmu:</p>
<table class="info-table">
  <tr><th>Typ</th><th>Co to jest</th><th>Dla nowo przybyłych</th></tr>
  <tr><td><strong>Najem prywatny (lejebolig)</strong></td><td>Standardowe mieszkanie/dom od prywatnego właściciela</td><td>✅ Najbardziej dostępny</td></tr>
  <tr><td><strong>Mieszkanie socjalne (almen bolig)</strong></td><td>Mieszkanie dotowane, czynsz uzależniony od dochodu</td><td>⚠️ Kolejka 5–15 lat w Kopenhadze</td></tr>
  <tr><td><strong>Andelsbolig</strong></td><td>Spółdzielnia mieszkaniowa — kupujesz "udział" w budynku</td><td>⚠️ Długa kolejka, wymaga kapitału</td></tr>
  <tr><td><strong>Ejerbolig</strong></td><td>Własność (zakup)</td><td>✅ Jeśli masz oszczędności i zdolność kredytową</td></tr>
</table>
<p><strong>Dla większości nowo przybyłych:</strong> najem prywatny to punkt wyjścia. Gdy już się urządzisz, warto wcześnie zapisać się na listę oczekujących na andelsbolig — długoterminowo może to zaoszczędzić sporo pieniędzy.</p>` }
      },
      {
        icon:"✍️"'''
)

# ── Chapter 3 S3: rental application ─────────────────────────────────────
r(
    '''</ol>` }
      },
      {
        icon:"⚖️"''',
    '''</ol>`,
               pl:`<p>Duńscy właściciele otrzymują dziesiątki podań na każde ogłoszenie. Oto co sprawi, że Twoje się wyróżni:</p>
<ol class="step-list">
  <li><span class="step-num">1</span><strong>Pisz po duńsku lub zaproponuj duńską wersję.</strong> Nawet podstawowy duński świadczy o zaangażowaniu.</li>
  <li><span class="step-num">2</span><strong>Dołącz:</strong> kim jesteś, czym się zajmujesz, dlaczego to mieszkanie, potwierdzenie dochodów, referencje od poprzednich właścicieli.</li>
  <li><span class="step-num">3</span><strong>Bądź osobisty.</strong> Duńczycy reagują na szczere, ciepłe podania — nie na formalne pisma.</li>
  <li><span class="step-num">4</span><strong>Wysyłaj szybko.</strong> Dobre ogłoszenia w Kopenhadze dostają 50+ podań w ciągu 24 godzin. Aplikuj w ciągu kilku godzin od pojawienia się ogłoszenia.</li>
  <li><span class="step-num">5</span><strong>Zrób follow-up.</strong> Uprzejma wiadomość 48 godzin po złożeniu podania jest stosowna i oczekiwana.</li>
</ol>` }
      },
      {
        icon:"⚖️"'''
)

# ── Chapter 3 S4: tenant rights ───────────────────────────────────────────
r(
    '''<a href="https://huslejenaevn.dk" target="_blank" rel="noopener">→ Знайдіть місцевий Huslejenævn</a>` }
      },
      {
        icon:"🗺️"''',
    '''<a href="https://huslejenaevn.dk" target="_blank" rel="noopener">→ Знайдіть місцевий Huslejenævn</a>`,
               pl:`<p>Ochrona najemców w Danii jest silna. Poznaj te prawa:</p>
<ul>
  <li><strong>Limit kaucji:</strong> Maksymalnie 3 miesiące czynszu. Czynsz z góry: maksymalnie 3 miesiące. Łącznie z góry: maksymalnie 6 miesięcy.</li>
  <li><strong>Podwyżki czynszu:</strong> Regulowane. Właściciel nie może arbitralnie podnosić czynszu. Musi być zgodny z indeksem cen netto lub zatwierdzony.</li>
  <li><strong>Okres wypowiedzenia:</strong> Dla mieszkań nieumeblowanych (typowa umowa) właściciel musi dać ci co najmniej <strong>1 rok wypowiedzenia</strong> na mocy Lejeloven §86 — tylko 3 miesiące dla umeblowanych pokoi. Najemcy mają zazwyczaj 3-miesięczne zobowiązanie wypowiedzenia.</li>
  <li><strong>Zwrot kaucji:</strong> Niewykorzystana część musi zostać zwrócona, ale właściciel ma zazwyczaj do ~6 tygodni (a w spornych przypadkach do 2 miesięcy) na sporządzenie protokołu zdawczego (flytteopgørelse) i rozliczenie kosztów napraw. Spory trafiają do Huslejenævnet.</li>
  <li><strong>Ogrzewanie/media:</strong> Muszą być określone w umowie. Nie mogą być zmieniane bez wypowiedzenia.</li>
</ul>
<p>W przypadku sporu z właścicielem skontaktuj się z <strong>Huslejenævnet</strong> (Sąd Czynszowy) w swoim gminie — bezpłatny i skuteczny.</p>
<a href="https://huslejenaevn.dk" target="_blank" rel="noopener">→ Znajdź lokalne Huslejenævn</a>` }
      },
      {
        icon:"🗺️"'''
)

# ── Chapter 3 S5: Copenhagen neighbourhoods ──────────────────────────────
r(
    '''  <tr><td><strong>Valby</strong></td><td>Місцевий колорит, спокійний, доступний, сімейний</td><td>~7 500 DKK</td><td>Сімей, довгострокових мешканців</td></tr>
</table>` }
      }
    ],
    checklist: [
      { id:"ch3_search"''',
    '''  <tr><td><strong>Valby</strong></td><td>Місцевий колорит, спокійний, доступний, сімейний</td><td>~7 500 DKK</td><td>Сімей, довгострокових мешканців</td></tr>
</table>`,
               pl:`<table class="info-table">
  <tr><th>Dzielnica</th><th>Klimat</th><th>Średni czynsz kawalerka</th><th>Najlepsza dla</th></tr>
  <tr><td><strong>Nørrebro</strong></td><td>Młoda, zróżnicowana, tętniąca życiem, lewicowa</td><td>~8 500 DKK</td><td>Młodych specjalistów, cudzoziemców</td></tr>
  <tr><td><strong>Vesterbro</strong></td><td>Hipsterska, scena gastronomiczna, gentryfikacja</td><td>~9 500 DKK</td><td>Miłośników jedzenia, kreatywnych</td></tr>
  <tr><td><strong>Østerbro</strong></td><td>Spokojna, rodzinna, zamożna</td><td>~10 500 DKK</td><td>Rodzin, ugruntowanych specjalistów</td></tr>
  <tr><td><strong>Frederiksberg</strong></td><td>Elegancka, cicha, droga</td><td>~11 000 DKK</td><td>Rodzin, specjalistów</td></tr>
  <tr><td><strong>Amager / Islands Brygge</strong></td><td>Wschodzące, nabrzeże, mieszana</td><td>~8 000 DKK</td><td>Osób z ograniczonym budżetem, młodych</td></tr>
  <tr><td><strong>Valby</strong></td><td>Lokalna atmosfera, spokojna, przystępna, rodzinna</td><td>~7 500 DKK</td><td>Rodzin, długoterminowych mieszkańców</td></tr>
</table>` }
      }
    ],
    checklist: [
      { id:"ch3_search"'''
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

if __name__ == '__main__': main()
