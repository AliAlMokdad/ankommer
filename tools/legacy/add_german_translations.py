#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to add German (de:) translations to data-chapters.js
Processes the file sequentially, finding each es:` block ending
and inserting a German translation after it.
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')

# All 84 German translations in order of appearance in the file
# Each entry is the German content to insert after the corresponding es: block
GERMAN_TRANSLATIONS = [
    # ===== Chapter 0: Before You Land =====
    # 1. Which Visa Do You Actually Need
    """<p><strong>EU/EWR/Nordische Staatsbürger:</strong> Du brauchst kein Visum und keine Arbeitserlaubnis. Du hast das Recht, frei in Dänemark zu leben und zu arbeiten. <strong>Zwei separate Anmeldungen sind erforderlich:</strong> (1) Deine <strong>Folkeregister-Adresse</strong> muss <strong>innerhalb von 5 Tagen nach dem Einzug</strong> angemeldet werden (CPR-Gesetz §12 — bei Versäumnis droht eine Geldstrafe). (2) Dein <strong>EU-Aufenthaltsdokument</strong> von SIRI ist erforderlich, wenn du länger als 3 Monate bleiben möchtest.</p>
<p><strong>Nicht-EU-Staatsbürger</strong> benötigen eines der folgenden Dokumente:</p>
<ul>
  <li><strong>Arbeitserlaubnis</strong> — erfordert ein Stellenangebot eines dänischen Arbeitgebers. Häufigste Typen: Positivliste (für gefragte Berufe), Gehaltsgrenzregelung (bei Gehalt &gt; 514.000 DKK/Jahr in 2025, steigt auf 552.000 DKK im Jahr 2026), Fast-track-Regelung (für zertifizierte Unternehmen).</li>
  <li><strong>Studentenvisum</strong> — wenn du an einer dänischen Universität oder Bildungseinrichtung eingeschrieben bist. Beantrage es mindestens 2 Monate vorher auf newtodenmark.dk.</li>
  <li><strong>Familienzusammenführung</strong> — um zu einem dänischen Staatsbürger oder dauerhaft Aufenthaltsberechtigten zu ziehen. Die Anforderungen sind streng: der dänische Sponsor muss Einkommens- und Wohnungsanforderungen erfüllen.</li>
  <li><strong>Startup Denmark Visum</strong> — für Unternehmer mit einem genehmigten Geschäftsplan.</li>
</ul>
<p class="callout-warning">Beantrage so früh wie möglich. Die Bearbeitungszeiten für Nicht-EU-Bürger betragen 1–4 Monate. Buche kein Einwegticket, bis die Genehmigung erteilt wurde.</p>
<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Antrag auf newtodenmark.dk stellen (offiziell)</a>""",

    # 2. The Document Folder
    """<p>Bringe diese physischen Originale UND beglaubigte Kopien von jedem mit:</p>
<ul>
  <li>✅ Gültiger Reisepass (+ 2 Fotokopien der Hauptseite)</li>
  <li>✅ Geburtsurkunde (mit Apostille, falls außerhalb der EU)</li>
  <li>✅ Heiratsurkunde falls zutreffend (mit Apostille)</li>
  <li>✅ Geburtsurkunden der Kinder</li>
  <li>✅ Bildungsabschlüsse / Abschlusszeugnisse</li>
  <li>✅ Arbeitsvertrag oder Universitätsimmatrikulationsschreiben</li>
  <li>✅ 2 Passfotos</li>
  <li>✅ Unterkunftsnachweis (unterzeichneter Mietvertrag oder Schreiben vom Gastgeber)</li>
  <li>✅ Krankenversicherungsunterlagen (für die Zeit vor deinem gelben Gesundheitskärtchen)</li>
</ul>
<p><strong>Apostille</strong> = ein offizieller Stempel, der ausländische Dokumente international rechtlich anerkennbar macht. Hole ihn vor der Abreise bei der zuständigen Behörde deines Heimatlandes.</p>""",

    # 3. Finding Housing Before You Arrive
    """<p>Der dänische Wohnungsmarkt ist sehr wettbewerbsintensiv — besonders in Kopenhagen. Schon vor deiner Ankunft mit der Suche zu beginnen verschafft dir einen entscheidenden Vorteil.</p>
<p><strong>Beste Plattformen:</strong></p>
<ul>
  <li><a href="https://www.boligportal.dk" target="_blank" rel="noopener">BoligPortal.dk</a> — größte private Mietplattform</li>
  <li><a href="https://www.lejebolig.dk" target="_blank" rel="noopener">Lejebolig.dk</a> — gute Auswahl, englischfreundlich</li>
  <li>Facebook-Gruppen: "Housing in Copenhagen for Expats", "Aarhus Housing International"</li>
  <li><a href="https://www.dba.dk" target="_blank" rel="noopener">DBA.dk</a> — Gebrauchtwaren + private Vermietungen</li>
</ul>
<p><strong>Warnsignale in Anzeigen:</strong></p>
<ul>
  <li>🚩 Vermieter ist im Ausland und kann sich nicht persönlich treffen</li>
  <li>🚩 Preis deutlich unter Marktniveau (Kopenhagener Durchschnitt für 1 Zimmer: 8.500–12.000 DKK)</li>
  <li>🚩 Zahlung vor Unterzeichnung eines Mietvertrags verlangt</li>
  <li>🚩 Keine Fotos, oder Fotos von Immobilienwebsites gestohlen</li>
</ul>
<p class="callout-warning">Die Kaution in Dänemark ist gesetzlich auf 3 Monatsmieten begrenzt. Wer mehr verlangt, verstößt gegen das Gesetz.</p>""",

    # 4. Banking & Money Before You Land
    """<p>Du kannst schon vor der Ankunft internationale Konten einrichten, die dir überbrücken, bis du ein dänisches Bankkonto hast (das eine CPR-Nummer erfordert).</p>
<p><strong>Empfohlene Konten vor der Ankunft:</strong></p>
<ul>
  <li><strong>Wise (früher TransferWise)</strong> — am besten für internationale Überweisungen, Multiwährungskarte, sofort einsatzbereit</li>
  <li><strong>Revolut</strong> — hervorragend für Ausgaben im Ausland, kostenlose Variante verfügbar</li>
  <li><strong>Lunar</strong> — dänische Digitalbank, die manchmal ohne CPR-Nummer eröffnet werden kann (aktuelle Bedingungen prüfen)</li>
</ul>
<p>Bring genug Bargeld oder zugängliche Mittel für mindestens <strong>2 Monate Ausgaben</strong>, während du dich einrichtest. Kalkuliere mindestens 30.000 DKK als Puffer ein.</p>""",

    # 5. Start Learning Danish Now
    """<p>Dänische Aussprache ist wirklich eine der schwierigsten für Ausländer — je früher du anfängst, desto besser. Die ehrliche Wahrheit: alle in Dänemark sprechen ausgezeichnetes Englisch. Aber Dänisch lernen öffnet soziale Türen, die für Englischsprachige verschlossen bleiben.</p>
<p><strong>Beste Ressourcen vor der Ankunft:</strong></p>
<ul>
  <li>🎧 <strong>Glossika</strong> — am besten für Aussprache, Spaced Repetition</li>
  <li>📱 <strong>Babbel</strong> — strukturierte Lektionen, besser als Duolingo für Dänisch</li>
  <li>🎬 <strong>YouTube: "Learn Danish with DanishClass101"</strong></li>
  <li>🎙️ <strong>Podcast: "Slow Danish"</strong> — echte Sprache in verlangsamtem Tempo</li>
</ul>
<p>Lerne zuerst diese 10 Wörter: <em>tak (danke), undskyld (Entschuldigung/Verzeihung), hej (hallo), hejhej (tschüss), ja/nej (ja/nein), tak for mad (danke fürs Essen), skål (prost), hvad (was), og (und), er (ist/sind)</em></p>""",

    # ===== Chapter 1: First 72 Hours =====
    # 6. Step 1: Register Your Address
    """<p>Das ist <strong>das Allerwichtigste</strong>. Alles andere — deine CPR-Nummer, dein MitID, dein Arzt, dein Bankkonto, deine Steuerkarte — all das hängt davon ab, eine angemeldete Adresse zu haben.</p>
<p class="callout-warning">⏰ <strong>Gesetzliche Frist: innerhalb von 5 Tagen nach dem Einzug</strong> (CPR-Gesetz §12). Verspätete Anmeldung ist eine bußgeldbewehrte Ordnungswidrigkeit. Buche deinen Borgerservice-Termin, sobald du die Schlüssel hast.</p>
<p><strong>So geht es:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span> Geh auf <a href="https://www.borger.dk" target="_blank" rel="noopener">borger.dk</a> und suche nach "Flytning til Danmark" ODER besuche persönlich dein lokales Borgerservice (Bürgerservice).</li>
  <li><span class="step-num">2</span> Du brauchst: deinen Reisepass + Nachweis deiner Wohnadresse (unterzeichneter Mietvertrag, Untermietvertrag oder ein Schreiben vom Gastgeber).</li>
  <li><span class="step-num">3</span> Wenn du vorübergehend bei einem Freund wohnst: dieser muss ein Schreiben schreiben und unterschreiben, das bestätigt, dass du dort wohnst. Vorlage auf borger.dk verfügbar.</li>
</ol>
<p class="callout-warning">Überspringe diesen Schritt NICHT mit dem Gedanken, du wirst es "später" erledigen. Ohne angemeldete Adresse kannst du keine CPR-Nummer erhalten.</p>""",

    # 7. Step 2: Get Your CPR Number
    """<p>Deine CPR-Nummer (Civil Personal Registration) ist <strong>die wichtigste Nummer in deinem dänischen Leben.</strong> Sie wird für absolut alles benötigt: Arztbesuche, Steueranmeldung, Bankwesen, Bibliothekskarte, Fitnessstudio-Mitgliedschaft, Handyverträge — alles.</p>
<p><strong>Format:</strong> TTMMJJ-XXXX (dein Geburtsdatum + 4 Ziffern)</p>
<p><strong>EU-Bürger:</strong> Registrierung beim International Citizen Service (ICS). Oft noch am selben Tag, wenn alle Dokumente vorliegen.</p>
<p><strong>Nicht-EU-Bürger:</strong> Wird normalerweise automatisch nach Genehmigung der Aufenthaltserlaubnis ausgestellt. Kann 2–8 Wochen dauern.</p>
<p><strong>ICS-Büros (wichtigste Standorte):</strong></p>
<ul>
  <li>Kopenhagen: Gyldenløvesgade 11, 1600 Copenhagen V</li>
  <li>Aarhus: Hack Kampmanns Plads 2</li>
  <li>Odense: Flakhaven 2</li>
  <li>Aalborg: Godthåbsgade 8</li>
</ul>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ ICS-Termin online buchen</a>""",

    # 8. Step 3: Activate MitID
    """<p>MitID ist Dänemarks nationales digitales Identitätssystem. Denk es als den Hauptschlüssel zu deinem gesamten digitalen Leben in Dänemark. Ohne es kannst du nicht auf folgende Dienste zugreifen: borger.dk, SKAT (Steuern), e-Boks (deine offizielle Post), dein Online-Banking, Sundhed.dk und Dutzende weiterer Dienste.</p>
<p><strong>MitID erhältst du auf:</strong> <a href="https://www.mitid.dk" target="_blank" rel="noopener">mitid.dk</a> oder persönlich bei deiner Bank oder beim Borgerservice.</p>
<p>Die MitID-App wird auf deinem Smartphone installiert und generiert 6-stellige Codes zum Einloggen. Halte dein Handy sicher — das IST deine Identität.</p>""",

    # 9. Step 4: Check e-Boks
    """<p>e-Boks ist Dänemarks offizieller digitaler Briefkasten. Jeder Brief von SKAT, Udbetaling Danmark, deiner Gemeinde, deiner Bank und der Regierung landet hier. Nicht in deinem physischen Briefkasten. Nicht in deiner E-Mail. Hier.</p>
<p class="callout-warning"><strong>Das ist entscheidend:</strong> Menschen haben Steuerfristen, Verlängerungsbescheide für Aufenthaltserlaubnisse und Bestätigungen von Leistungszahlungen verpasst, weil sie e-Boks nicht überprüft haben. Stelle jetzt eine wöchentliche Kalender-Erinnerung ein.</p>
<p>Lade die e-Boks-App herunter. Aktiviere Push-Benachrichtigungen. Richte die E-Mail-Weiterleitung in den Einstellungen ein, damit du eine E-Mail erhältst, wenn etwas Neues ankommt.</p>
<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ e-Boks Website</a>""",

    # 10. Step 5: Open a Danish Bank Account
    """<p>Du benötigst ein dänisches Bankkonto für dein NemKonto (das Konto, auf das die Regierung dir Geld schickt — Steuerrückerstattungen, Sozialleistungen usw.). Die meisten Banken benötigen eine CPR-Nummer.</p>
<table class="info-table">
  <tr><th>Bank</th><th>Englisch?</th><th>CPR erforderlich?</th><th>Beste für</th></tr>
  <tr><td><strong>Lunar</strong></td><td>✅ 100%</td><td>Manchmal nein</td><td>Neuankömmlinge, digital-first</td></tr>
  <tr><td><strong>Nordea</strong></td><td>✅ Gut</td><td>Ja</td><td>Internationale Überweisungen</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>✅ Gut</td><td>Ja</td><td>Vollservice</td></tr>
  <tr><td><strong>Jyske Bank</strong></td><td>Teilweise</td><td>Ja</td><td>Regional, persönlicher Service</td></tr>
</table>
<p>Nach der Kontoeröffnung bestimmst du es als dein <strong>NemKonto</strong> auf <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>. Das ist Pflicht.</p>""",

    # 11. Step 6: Essential Danish Apps
    """<div class="app-grid">
  <div class="app-card"><div class="app-card-icon">💸</div><div class="app-card-name">MobilePay</div><div class="app-card-desc">Dänemarks Zahlungs-App. Die brauchst du zum Aufteilen von Rechnungen, Bezahlen auf Märkten usw.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">📬</div><div class="app-card-name">e-Boks</div><div class="app-card-desc">Dein offizieller dänischer Briefkasten. Wöchentlich checken.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🚌</div><div class="app-card-name">Rejsekort</div><div class="app-card-desc">App für die öffentliche Verkehrskarte. Gilt in ganz Dänemark.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🚂</div><div class="app-card-name">DSB</div><div class="app-card-desc">Dänische Staatsbahn. Zugtickets buchen, Fahrpläne einsehen.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🏥</div><div class="app-card-name">Min Læge</div><div class="app-card-desc">Arzttermine buchen, Rezepte verlängern.</div><div class="app-card-lang">Eingeschränktes EN</div></div>
  <div class="app-card"><div class="app-card-icon">💊</div><div class="app-card-name">Sundhed.dk</div><div class="app-card-desc">Deine Gesundheitsakte, Krankenhausüberweisungen, Arzt finden.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">💰</div><div class="app-card-name">Skat</div><div class="app-card-desc">Dänisches Finanzamt. Steuerkarte ansehen, Abzüge prüfen.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Spare Geld bei unverkauften Lebensmitteln. Dänen lieben diese App.</div><div class="app-card-lang">🇬🇧 Englisch</div></div>
</div>""",

    # 12. Emergency Numbers
    """<table class="info-table">
  <tr><th>Nummer</th><th>Für</th><th>Hinweis</th></tr>
  <tr><td><strong>112</strong></td><td>Polizei, Feuerwehr, Krankenwagen</td><td>NUR lebensbedrohliche Notfälle</td></tr>
  <tr><td><strong>1813</strong></td><td>Ärztliche Hilfe (kein Notfall)</td><td>Dringend, aber nicht lebensbedrohlich. 24/7. Region Kopenhagen.</td></tr>
  <tr><td><strong>114</strong></td><td>Polizei (kein Notfall)</td><td>Für Straftaten, verlorene Gegenstände, Meldungen</td></tr>
  <tr><td><strong>70 11 31 31</strong></td><td>Zahnärztlicher Notfall</td><td>Zahnschmerzen außerhalb der Öffnungszeiten</td></tr>
  <tr><td><strong>80 19 13 99</strong></td><td>Giftnotruf</td><td>Kostenlos, 24/7</td></tr>
  <tr><td><strong>70 20 12 60</strong></td><td>Krisentelefon (Livslinien)</td><td>Unterstützung bei psychischen Krisen</td></tr>
</table>
<p class="callout-warning"><strong>Wichtiger Unterschied:</strong> In Dänemark ist 1813 die Nummer für ärztliche Beratung und nicht lebensbedrohliche dringende Hilfe. Den Notruf 112 für Nicht-Notfälle anzurufen gilt als unhöflich und kann die Hilfe für andere verzögern.</p>""",

    # ===== Chapter 2: Papers & Legal Identity =====
    # 13. Residence Permit Types
    """<p>Deine Aufenthaltserlaubnis bestimmt deine Rechte in Dänemark. Hier ist ein klarer Überblick:</p>
<table class="info-table">
  <tr><th>Erlaubnistyp</th><th>Für</th><th>Arbeitsrecht</th><th>Dauer</th></tr>
  <tr><td><strong>EU-Registrierung</strong></td><td>EU/EWR-Bürger</td><td>Unbegrenzt</td><td>5 Jahre (dann dauerhaft)</td></tr>
  <tr><td><strong>Positivliste</strong></td><td>Gefragte Berufe</td><td>Voll</td><td>Bis zu 4 Jahre</td></tr>
  <tr><td><strong>Gehaltsgrenzregelung</strong></td><td>Gehalt &gt; 514.000 DKK/Jahr (2025) · 552.000 DKK/Jahr ab 2026</td><td>Voll</td><td>Bis zu 4 Jahre</td></tr>
  <tr><td><strong>Studentenerlaubnis</strong></td><td>Eingeschriebene Studierende</td><td>15 Std./Woche</td><td>Studiendauer</td></tr>
  <tr><td><strong>Familienzusammenführung</strong></td><td>Familienangehörige zusammenführen</td><td>Voll (normalerweise)</td><td>Anfangs 2 Jahre</td></tr>
  <tr><td><strong>Flüchtlingsstatus</strong></td><td>Asylbewerber</td><td>Variiert</td><td>Variiert</td></tr>
</table>""",

    # 14. Path to Permanent Residency
    """<p>Die allgemeine Regel: <strong>8 Jahre ununterbrochener rechtmäßiger Aufenthalt</strong> in Dänemark. Es gibt jedoch Schnellwege:</p>
<ul>
  <li><strong>4 Jahre</strong>, wenn du eine besondere Bewertung des aktiven Beitrags bestehst (Punktesystem)</li>
  <li><strong>5 Jahre</strong> für EU-Bürger mit kontinuierlichem Aufenthalt</li>
  <li>Außerdem musst du: mindestens <strong>3,5 der letzten 4 Jahre</strong> in Vollzeit gearbeitet haben, den <strong>Prøve i Dansk 2 (PD2 ≈ B1)</strong> bestehen, kein Vorstrafenregister haben und finanziell selbstständig sein (keine öffentlichen Hilfen in den letzten 4 Jahren).</li>
</ul>
<p>Das Punktesystem bewertet dich nach: dänischem Sprachniveau, Beschäftigungshistorie, Einkommen, gesellschaftlichem Engagement, schulischen Leistungen der Kinder und Ergebnis der Staatsbürgerschaftsprüfung.</p>
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener">→ Offizielle Informationen zur dauerhaften Aufenthaltserlaubnis</a>""",

    # 15. Path to Danish Citizenship
    """<p>Einer der anspruchsvollsten Wege in Europa, aber es lohnt sich:</p>
<ul>
  <li>Muss <strong>9 Jahre</strong> in Dänemark gelebt haben (oder weniger mit Beschleunigern)</li>
  <li>Den <strong>indfødsretsprøven</strong> (Staatsbürgerschaftstest) bestehen — dänische Geschichte, Kultur, Gesellschaft</li>
  <li>Den <strong>Prøve i Dansk 3 (PD3, ≈ B2-Niveau)</strong> bestehen — der Sprachtest für den Staatsbürgerschaftsweg</li>
  <li>Mindestens <strong>9 der letzten 10 Jahre</strong> mit dauerhafter Aufenthaltserlaubnis in Dänemark gelebt haben</li>
  <li><strong>Finanziell selbstständig</strong> sein — keine öffentlichen Sozialleistungen in den letzten 4 Jahren</li>
  <li>In den letzten 4,5 von 5 Jahren selbst für sich gesorgt haben</li>
  <li>Keine Strafurteile</li>
  <li>Keine ausstehenden Schulden gegenüber Behörden</li>
</ul>
<p>Dänemark erlaubt seit 2015 die <strong>doppelte Staatsbürgerschaft</strong>. Du musst deine ursprüngliche Nationalität nicht aufgeben.</p>""",

    # 16. Danish Tax — How It Actually Works
    """<p>Ja, die dänischen Steuern sind hoch. Hier ist das ehrliche Bild dessen, was du tatsächlich zahlst:</p>
<ul>
  <li><strong>AM-bidrag (Arbeitsmarktbeitrag):</strong> 8% direkt von deinem Bruttogehalt. Keine Abzüge dagegen.</li>
  <li><strong>Kommunalsteuer (kommuneskat):</strong> Variiert je nach Gemeinde, Durchschnitt ~25%. Du zahlst dies auf Einkommen über deinem persönlichen Freibetrag.</li>
  <li><strong>Staatssteuer (bundskat):</strong> 12,01% (2025) auf Einkommen über dem persönlichen Freibetrag (51.600 DKK/Jahr).</li>
  <li><strong>Spitzensteuer (topskat):</strong> 15% zusätzlich auf persönliches Einkommen über ~611.800 DKK/Jahr in 2025. Gesamtsteuerdeckel (skatteloft) ohne AM und Kirchensteuer: 52,07%.</li>
  <li><strong>Persönlicher Freibetrag (personfradrag):</strong> 51.600 DKK/Jahr (2025) — wird als Steuergutschrift gewährt, macht diesen Betrag effektiv steuerfrei.</li>
</ul>
<p>Was bekommst du dafür? Kostenlose Gesundheitsversorgung. Kostenloses Studium. 52 Wochen Elternzeit. 5 Wochen Urlaub. Kostenlose Schule. Arbeitslosengeld wenn du deinen Job verlierst. Die Rechnung sieht ganz anders aus als die meisten erwarten.</p>
<a href="https://skat.dk/en-us" target="_blank" rel="noopener">→ SKAT — Dänische Steuerbehörde</a>""",

    # 17. Driving Licence Conversion
    """<p>Wenn du einen EU/EWR-Führerschein hast, kannst du ihn in Dänemark unbegrenzt verwenden. Keine Umschreibung nötig.</p>
<p>Für Nicht-EU-Führerscheine:</p>
<ul>
  <li>Einige Länder haben Austauschvereinbarungen mit Dänemark (USA, Kanada, Australien, Japan, Südkorea und andere) — prüfe auf <a href="https://www.sikkertrafik.dk" target="_blank" rel="noopener">sikkertrafik.dk</a></li>
  <li>Wenn dein Land ein Abkommen hat: zahle eine Gebühr (~350 DKK) und tausche beim lokalen Borgerservice</li>
  <li>Ohne Abkommen: Du musst dänischen Fahruntericht absolvieren und sowohl Theorie- als auch Praxisprüfung bestehen. Kalkuliere 10.000–20.000 DKK und 6–12 Monate ein.</li>
</ul>""",

    # ===== Chapter 3: Housing =====
    # 18. Avoiding rental scams
    """<p class="callout-warning" style="background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;"><strong>⚠️ Wohnungsbetrug ist die größte finanzielle Bedrohung für Neuankömmlinge in Dänemark.</strong> Gefälschte Anzeigen auf Facebook Marketplace, gefälschte Vermieter die angeben im Ausland zu sein, und Forderungen nach einer Kaution "zur Reservierung der Wohnung" vor einer Besichtigung haben Neuankömmlinge jeweils <strong>10.000 bis 50.000 DKK</strong> gekostet.</p>

<p><strong>Absolute Regeln — niemals brechen:</strong></p>
<ul>
  <li><strong>Überweise niemals Geld, bevor</strong> (a) du einen Mietvertrag (Typeformular A) unterschrieben hast und (b) die Wohnung persönlich mit dem tatsächlichen Vermieter besichtigt hast. Keine Ausnahmen.</li>
  <li><strong>Überprüfe, dass der Vermieter das Objekt besitzt</strong> über <a href="https://www.ois.dk" target="_blank" rel="noopener">ois.dk</a> (dänisches öffentliches Grundstücksregister — kostenlos) oder <a href="https://www.tinglysning.dk" target="_blank" rel="noopener">tinglysning.dk</a> (Grundbuch).</li>
  <li><strong>Der im CPR eingetragene Eigentümer</strong> im Mietvertrag muss mit dem übereinstimmen, was ois.dk anzeigt. Wenn der "Vermieter" "im Ausland ist und sich nicht treffen kann" — es ist Betrug.</li>
  <li><strong>Zahle nur per Banküberweisung auf ein dänisches Konto im Namen des Vermieters</strong> — niemals Western Union, MoneyGram, Krypto, Geschenkkarten oder "Kaution auf das Konto eines Freundes".</li>
  <li><strong>Führe eine umgekehrte Bildersuche der Anzeigenfotos durch</strong> (Google Bilder / TinEye). Betrüger verwenden Fotos wieder.</li>
  <li><strong>Gesetzliches Maximum im Voraus:</strong> 3 Monate Kaution (depositum) + 3 Monate vorausbezahlte Miete = 6 Monate. Mehr ist illegal nach Lejeloven §34.</li>
</ul>
<p><strong>Wenn etwas merkwürdig erscheint, ist es das auch.</strong> Geh weiter — es gibt immer eine weitere Anzeige. Melde Betrug auf <a href="https://politi.dk" target="_blank" rel="noopener">politi.dk</a> und warne andere Neuankömmlinge in Expat-Gruppen.</p>""",

    # 19. Types of Housing in Denmark
    """<p>Dänemark hat vier Haupttypen von Wohnverhältnissen:</p>
<table class="info-table">
  <tr><th>Typ</th><th>Was ist das</th><th>Für Neuankömmlinge</th></tr>
  <tr><td><strong>Privatvermietung (lejebolig)</strong></td><td>Standard-Mietwohnung/-haus vom privaten Vermieter</td><td>✅ Am zugänglichsten</td></tr>
  <tr><td><strong>Sozialwohnung (almen bolig)</strong></td><td>Subventionierte Wohnung, einkommensabhängige Miete</td><td>⚠️ 5–15 Jahre Warteliste in KBH</td></tr>
  <tr><td><strong>Andelsbolig</strong></td><td>Wohnungsgenossenschaft — Kauf eines "Anteils" am Gebäude</td><td>⚠️ Lange Warteliste, erfordert Kapital</td></tr>
  <tr><td><strong>Ejerbolig</strong></td><td>Eigentumswohnung/-haus (Kauf)</td><td>✅ Wenn du Ersparnisse und Bonität hast</td></tr>
</table>
<p><strong>Für die meisten Neuankömmlinge:</strong> Privatvermietung ist der Ausgangspunkt. Wenn du dich eingelebt hast, lohnt es sich, frühzeitig auf die Andelsbolig-Warteliste zu kommen — das kann dir langfristig viel Geld sparen.</p>""",

    # 20. Writing a Winning Danish Rental Application
    """<p>Dänische Vermieter erhalten Dutzende Bewerbungen pro Anzeige. Das macht deine herausragend:</p>
<ol class="step-list">
  <li><span class="step-num">1</span><strong>Schreibe auf Dänisch oder biete eine dänische Version an.</strong> Auch einfaches Dänisch zeigt Engagement.</li>
  <li><span class="step-num">2</span><strong>Füge hinzu:</strong> wer du bist, was du machst, warum diese Wohnung, Einkommensnachweis, Referenzen früherer Vermieter.</li>
  <li><span class="step-num">3</span><strong>Sei persönlich.</strong> Dänen reagieren auf echte, herzliche Bewerbungen — nicht auf formelle Schreiben.</li>
  <li><span class="step-num">4</span><strong>Schick schnell ab.</strong> Gute Anzeigen in Kopenhagen erhalten innerhalb von 24 Stunden mehr als 50 Bewerbungen. Bewirb dich innerhalb von Stunden nach dem Erscheinen.</li>
  <li><span class="step-num">5</span><strong>Folge nach.</strong> Eine höfliche Nachricht 48 Stunden nach der Bewerbung ist angemessen und erwartet.</li>
</ol>""",

    # 21. Your Legal Rights as a Tenant
    """<p>Die dänischen Mieterschutzrechte sind stark. Kenne diese Regeln:</p>
<ul>
  <li><strong>Kautionsdeckel:</strong> Maximal 3 Monatsmieten. Vorausbezahlte Miete: maximal 3 Monate. Gesamtes Vorauszahlung: maximal 6 Monate.</li>
  <li><strong>Mieterhöhungen:</strong> Reguliert. Vermieter kann die Miete nicht willkürlich erhöhen. Muss dem Nettpreisindex folgen oder genehmigt werden.</li>
  <li><strong>Kündigungsfrist:</strong> Für unmöblierte Wohnungen (typischer Mietvertrag) muss der Vermieter dir mindestens <strong>1 Jahr Kündigungsfrist</strong> gemäß Lejeloven §86 geben — nur 3 Monate für möblierte Einzelzimmer. Mieter haben in den meisten Fällen eine 3-monatige Kündigungspflicht.</li>
  <li><strong>Rückgabe der Kaution:</strong> Der ungenutzte Teil muss zurückgezahlt werden, aber der Vermieter hat typischerweise bis zu ~6 Wochen (und in Streitfällen bis zu 2 Monate), um den Auszugsbericht (flytteopgørelse) und Reparaturkosten zu regeln. Streitigkeiten gehen an das Huslejenævnet.</li>
  <li><strong>Heizung/Nebenkosten:</strong> Müssen im Mietvertrag angegeben sein. Können nicht ohne Ankündigung geändert werden.</li>
</ul>
<p>Bei einem Streit mit deinem Vermieter wende dich an das <strong>Huslejenævnet</strong> (Mietgericht) in deiner Gemeinde — kostenlos und effektiv.</p>
<a href="https://huslejenaevn.dk" target="_blank" rel="noopener">→ Dein lokales Huslejenævn finden</a>""",

    # 22. Copenhagen Neighbourhoods
    """<table class="info-table">
  <tr><th>Viertel</th><th>Atmosphäre</th><th>Durchschn. 1-Zimmer-Miete</th><th>Beste für</th></tr>
  <tr><td><strong>Nørrebro</strong></td><td>Jung, vielfältig, lebendig, linksorientiert</td><td>~8.500 DKK</td><td>Junge Berufstätige, Internationale</td></tr>
  <tr><td><strong>Vesterbro</strong></td><td>Hip, Gastroszene, Gentrifizierung</td><td>~9.500 DKK</td><td>Foodliebhaber, Kreative</td></tr>
  <tr><td><strong>Østerbro</strong></td><td>Ruhig, familienorientiert, wohlhabend</td><td>~10.500 DKK</td><td>Familien, etablierte Berufstätige</td></tr>
  <tr><td><strong>Frederiksberg</strong></td><td>Elegant, ruhig, teuer</td><td>~11.000 DKK</td><td>Familien, Berufstätige</td></tr>
  <tr><td><strong>Amager / Islands Brygge</strong></td><td>Aufstrebend, Wasserfront, gemischt</td><td>~8.000 DKK</td><td>Budgetbewusste, Junge</td></tr>
  <tr><td><strong>Valby</strong></td><td>Lokal, ruhig, erschwinglich, familienfreundlich</td><td>~7.500 DKK</td><td>Familien, Langzeitbewohner</td></tr>
</table>""",

    # ===== Chapter 4: Money & Banking =====
    # 23. NemKonto
    """<p><strong>NemKonto</strong> (wörtlich "einfaches Konto") ist kein separates Bankkonto — es ist die Bezeichnung, die du einem bestehenden Konto gibst, damit die dänische Regierung weiß, wohin sie dir Geld schicken soll. Steuerrückerstattungen, Kindergeld, Rentenzahlungen, Arbeitslosengeld — alles geht auf dein NemKonto.</p>
<p class="callout-warning"><strong>Das ist Pflicht.</strong> Jede Person mit einer CPR-Nummer muss ein NemKonto haben. Ohne es kann die Regierung dir buchstäblich nichts zahlen, und Steuerrückerstattungen können sich monatelang verzögern.</p>
<p><strong>So registrierst du dein NemKonto:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Eröffne dein dänisches Bankkonto (erfordert CPR-Nummer bei den meisten Banken)</li>
  <li><span class="step-num">2</span>Gehe auf <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a> und melde dich mit MitID an</li>
  <li><span class="step-num">3</span>Wähle dein Konto aus der Liste und bestätige</li>
</ol>
<p>Du kannst dein NemKonto auch direkt über die App oder Website deiner Bank bestimmen. Nordea, Danske Bank und Lunar unterstützen das alle in der App.</p>
<a href="https://www.nemkonto.dk" target="_blank" rel="noopener">→ NemKonto registrieren oder aktualisieren (offiziell)</a>""",

    # 24. Tax Card (Skattekort)
    """<p>Dein <strong>Skattekort</strong> (Steuerkarte) teilt deinem Arbeitgeber genau mit, wie viel Steuer von deinem Gehalt abgezogen werden soll. Ohne sie ist dein Arbeitgeber gesetzlich verpflichtet, <strong>55%</strong> abzuziehen — den maximalen Notfallsatz. Das ist keine Strafe; es ist der Standardwert des dänischen Systems. Aber du verlierst den Großteil deines ersten Gehalts, wenn du das nicht geregelt hast.</p>
<p><strong>Hole dein Skattekort sofort nach Erhalt deiner CPR-Nummer:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Gehe auf <a href="https://skat.dk/en-us" target="_blank" rel="noopener">skat.dk</a> und melde dich mit MitID an</li>
  <li><span class="step-num">2</span>Klicke auf "Steuerkarte und Einbehaltungssatz" (Skattekort og trækprocent)</li>
  <li><span class="step-num">3</span>Überprüfe deine vorläufige Einkommensbewertung (forskudsopgørelse) — SKATs Schätzung dessen, was du verdienen und schulden wirst</li>
  <li><span class="step-num">4</span>Dein Arbeitgeber erhält deine Steuerkarte automatisch — du musst sie nicht manuell senden</li>
</ol>
<p><strong>Zwei Arten von Steuerkarten:</strong></p>
<ul>
  <li><strong>Frikort</strong> — wenn dein Gesamtjahreseinkommen unter 51.600 DKK liegt (personfradrag 2025). Du zahlst bis zu diesem Betrag null Steuern.</li>
  <li><strong>Bikort</strong> — für einen Nebenjob. Dein Hauptarbeitgeber nutzt deine Hauptkarte; der Nebenarbeitgeber nutzt das Bikort (40% Pauschalsatz ohne Freibetrag).</li>
</ul>
<p class="callout-warning">Aktualisiere deine forskudsopgørelse, wenn sich deine Umstände ändern — neuer Job, Gehaltserhöhung, Unternehmensgründung, Mieteinnahmen. Fehler bedeuten entweder eine große Nachzahlung oder eine Rückerstattung am Jahresende. SKAT bestraft dich nicht für proaktive Anpassungen.</p>
<a href="https://skat.dk/en-us/individuals/tax-card-and-withholding-tax/" target="_blank" rel="noopener">→ Steuerkarte auf skat.dk (offiziell, Englisch)</a>""",

    # 25. Annual Tax Statement (Årsopgørelse)
    """<p>Jeden <strong>März</strong> veröffentlicht SKAT deine <strong>årsopgørelse</strong> — die endgültige Steuererklärung für das Vorjahr. Sie vergleicht, was du tatsächlich verdient und gezahlt hast, mit deiner Schätzung, und berechnet, ob du Geld schuldest oder eine Rückerstattung erhältst.</p>
<p><strong>Die gute Nachricht:</strong> Die meisten Menschen erhalten eine Rückerstattung. Dänen erhalten durchschnittlich rund 5.000–8.000 DKK pro Jahr zurück.</p>
<p><strong>Häufige Gründe für eine Rückerstattung:</strong></p>
<ul>
  <li>Fahrkostenabzug (befordringsfradrag) — wenn dein Weg zur Arbeit mehr als 24 km in jede Richtung beträgt, kannst du die Extrakilometer abziehen</li>
  <li>Zinsen für Darlehen (rentefradrag)</li>
  <li>Gewerkschaftsbeiträge (fagforeningskontingent)</li>
  <li>A-Kassen-Beiträge (Arbeitslosenkasse)</li>
  <li>Spenden an gemeinnützige Organisationen (bis 17.200 DKK/Jahr, 2025)</li>
</ul>
<p><strong>So liest du deine årsopgørelse:</strong></p>
<ul>
  <li>Grüne Zahl = Rückerstattung (wird automatisch im April auf NemKonto überwiesen)</li>
  <li>Rote Zahl = du schuldest SKAT Geld (wird von NemKonto abgezogen oder du zahlst manuell)</li>
</ul>
<p>Du kannst fehlende Abzüge auf skat.dk bis zu 3 Jahre rückwirkend manuell einreichen. Viele Neuankömmlinge verpassen Abzüge in ihrem ersten Jahr und können sie später geltend machen.</p>
<a href="https://skat.dk/en-us/individuals/the-annual-income-assessment/" target="_blank" rel="noopener">→ Leitfaden zur årsopgørelse (SKAT offiziell)</a>""",

    # 26. MobilePay
    """<p><strong>MobilePay</strong> wird von rund 4,4 Millionen Dänen genutzt — das sind fast 75% der Gesamtbevölkerung. Ohne es kannst du keine Rechnungen in Restaurants aufteilen, auf Märkten bezahlen, in vielen Städten parken oder Geld an dänische Freunde senden. Es ist nicht optional.</p>
<p><strong>So erhältst du es:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Lade MobilePay aus dem App Store oder Google Play herunter</li>
  <li><span class="step-num">2</span>Verknüpfe deine dänische Telefonnummer und dein dänisches Bankkonto</li>
  <li><span class="step-num">3</span>Verifiziere mit MitID</li>
</ol>
<p><strong>Kosten (2025):</strong></p>
<ul>
  <li>Geld empfangen: kostenlos</li>
  <li>Geld senden: kostenlos bis 5.000 DKK/Monat; 1,75% darüber (Mindestbetrag 1 DKK)</li>
  <li>Geschäftszahlungen: variiert je nach Händler</li>
</ul>
<p><strong>Du kannst MobilePay auch verwenden für:</strong> Miete mit Mitbewohnern aufteilen, Babysitter bezahlen, auf Facebook Marketplace einkaufen, Parkgebühren (MobilePay Parking) und an gemeinnützige Organisationen spenden.</p>
<a href="https://mobilepay.dk/hjaelp/mobilepay-bruger" target="_blank" rel="noopener">→ MobilePay Hilfe (Englisch verfügbar)</a>""",

    # 27. Danish Pension — Three Pillars
    """<p>Das dänische Rentensystem basiert auf drei unterschiedlichen Systemen. Alle drei zu verstehen beeinflusst deine Rente erheblich.</p>
<table class="info-table">
  <tr><th>Säule</th><th>Was ist das</th><th>Wer zahlt</th><th>Betrag (2025)</th></tr>
  <tr><td><strong>Folkepension</strong></td><td>Staatspension ab 67 Jahren (steigt auf 68 im Jahr 2030)</td><td>Der Staat (steuerfinanziert)</td><td>~14.328 DKK/Monat (alleinlebend, voll)</td></tr>
  <tr><td><strong>ATP</strong></td><td>Obligatorische Zusatzrente, automatisch abgezogen</td><td>Arbeitnehmer + Arbeitgeber</td><td>~94 DKK/Monat Arbeitnehmeranteil</td></tr>
  <tr><td><strong>Arbejdsmarkedspension</strong></td><td>Betriebliche Altersvorsorge — die wichtigste</td><td>Arbeitgeber (typisch 2/3) + Arbeitnehmer (1/3)</td><td>Typisch 12–17% des Bruttogehalts insgesamt</td></tr>
</table>
<p class="callout-warning"><strong>Wichtig für Neuankömmlinge:</strong> Deine betriebliche Altersvorsorge gehört dir. Wenn du Dänemark verlässt, kannst du sie mitnehmen oder investiert lassen. Aber wenn du hier arbeitest ohne einem Rentenplan beizutreten (z.B. Selbstständige), musst du selbst vorsorgen. Rentenbeiträge sind auch steuerlich absetzbar.</p>
<p>Du kannst alle deine Rentenersparnisse an einem Ort auf <a href="https://www.pensionsinfo.dk" target="_blank" rel="noopener">pensionsinfo.dk</a> einsehen.</p>""",

    # 28. Choosing a Danish Bank
    """<p>Die meisten dänischen Banken benötigen eine CPR-Nummer, um ein vollständiges Konto zu eröffnen. Hier ist der ehrliche Vergleich:</p>
<table class="info-table">
  <tr><th>Bank</th><th>Englischer Support</th><th>Monatsgebühr</th><th>Beste für</th></tr>
  <tr><td><strong>Lunar</strong></td><td>100% englische App</td><td>Kostenlos (Basis) / 49 DKK (Plus)</td><td>Neuankömmlinge, digital-first, manchmal kein CPR anfangs nötig</td></tr>
  <tr><td><strong>Nordea</strong></td><td>Gutes Englisch</td><td>~0–49 DKK</td><td>Internationale Überweisungen, etablierte Berufstätige</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>Gutes Englisch</td><td>~0–79 DKK</td><td>Vollservice, weit verbreitet akzeptiert</td></tr>
  <tr><td><strong>Arbejdernes Landsbank</strong></td><td>Eingeschränktes Englisch</td><td>~40 DKK</td><td>Arbeitnehmer, Gewerkschaftsmitglieder</td></tr>
  <tr><td><strong>Wise (international)</strong></td><td>Volles Englisch</td><td>Kostenlos + niedrige Gebühren</td><td>Internationale Überweisungen während du auf dänisches Konto wartest</td></tr>
</table>
<p>Eröffne dein Konto und gehe dann sofort zu <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>, um es als NemKonto zu registrieren.</p>""",

    # ===== Chapter 5: Healthcare =====
    # 29. Yellow Card (Sundhedskort)
    """<p>Dein <strong>Sundhedskort</strong> (Krankenversicherungskarte) ist die gelbe Plastikkarte, die beweist, dass du Anspruch auf die kostenlose dänische Gesundheitsversorgung hast. Sie kommt automatisch per Post, typischerweise 2–4 Wochen nach Ausstellung deiner CPR-Nummer.</p>
<p>Sie enthält deine CPR-Nummer, deinen Namen und — entscheidend — den Namen und die Adresse deines <strong>zugewiesenen Hausarztes (praktiserende læge)</strong>.</p>
<p class="callout-warning">Bis du dein Sundhedskort erhältst, bist du <strong>nicht versichert</strong> durch das dänische öffentliche Gesundheitssystem. Wenn du vor seiner Ankunft einen Arzt brauchst: besuche eine Notfallklinik (lægevagten), ruf 1813 für Beratung an, oder geh zu einem Privatarzt und erstatte die Kosten später über SKAT. Prüfe auch, ob deine Heimatlandversicherung die Übergangszeit abdeckt.</p>
<p>Wenn deine Karte verloren geht oder beschädigt ist: bestelle einen Ersatz auf <a href="https://sundhedskort.dk" target="_blank" rel="noopener">sundhedskort.dk</a> mit deinem MitID. Eine neue Karte kommt innerhalb einer Woche.</p>
<a href="https://www.sundhed.dk/borger/patienthaandbogen/sundhedssystemet/sygesikring/sygesikringsbevis/" target="_blank" rel="noopener">→ Über das Sundhedskort (sundhed.dk offiziell)</a>""",

    # 30. Registering with a GP
    """<p>Dein Hausarzt (GP) ist der <strong>Schlüsselwächter des gesamten dänischen Gesundheitssystems</strong>. Du gehst nicht direkt zu einem Spezialisten — du gehst immer zuerst über deinen Hausarzt. Das ist keine Bürokratie; es ist ein gut konzipiertes System, das sicherstellt, dass du die richtige Versorgung erhältst ohne Zeit zu verschwenden.</p>
<p><strong>So meldest du dich bei einem Hausarzt an:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span>Gehe auf <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a> und klicke auf "Arzt finden"</li>
  <li><span class="step-num">2</span>Suche nach deiner Postleitzahl — du musst dich bei einem Arzt in deiner Region anmelden</li>
  <li><span class="step-num">3</span>Prüfe, ob die Praxis neue Patienten aufnimmt ("optaget" = voll, "ledig" = verfügbar)</li>
  <li><span class="step-num">4</span>Kontaktiere die Praxis zur Anmeldung — online oder telefonisch</li>
</ol>
<p><strong>Was dein Hausarzt abdeckt (alles kostenlos mit Sundhedskort):</strong> Konsultationen, Überweisungen zu Spezialisten, Rezepte, Bluttests, kleinere Operationen, Überweisungen für psychische Gesundheit, Impfungen und Vorsorge.</p>
<p><strong>Termine buchen:</strong> über die <strong>Min Læge App</strong>, telefonisch oder online über die Praxiswebsite. Viele Hausärzte bieten zunächst Telefon-/Videokonsultationen an. Wartezeit für einen Routinetermin: typischerweise am selben Tag bis 3 Tage.</p>
<p>Wenn du in deiner Gegend keinen verfügbaren Hausarzt findest, ruf den Borgerservice deiner Gemeinde an — sie können dir helfen, einen zuzuweisen.</p>""",

    # 31. Urgent Care — 1813 vs 112
    """<p>Das ist eines der wichtigsten Dinge, die du in Dänemark wissen musst. Die beiden Nummern haben völlig unterschiedliche Zwecke:</p>
<table class="info-table">
  <tr><th>Nummer</th><th>Für</th><th>Reaktion</th><th>Wann</th></tr>
  <tr><td><strong style="font-size:1.1rem">112</strong></td><td>Polizei, Feuerwehr, Krankenwagen</td><td>Sofortiger Einsatz</td><td>NUR lebensbedrohliche Notfälle</td></tr>
  <tr><td><strong style="font-size:1.1rem">1813</strong></td><td>Ärztliche Beratung und dringende (Nicht-Notfall-)Versorgung</td><td>Pfleger oder Arzt telefonisch, dann Weiterleitung</td><td>Krank oder verletzt, aber nicht lebensbedrohlich</td></tr>
</table>
<p><strong>1813</strong> wird von Region Hovedstaden (Region Kopenhagen) betrieben. Außerhalb Kopenhagens ruf deinen lokalen <strong>Lægevagt</strong> (ärztlicher Bereitschaftsdienst) an. Die Nummer variiert je nach Region — prüfe auf <a href="https://www.sundhed.dk" target="_blank" rel="noopener">sundhed.dk</a>.</p>
<p class="callout-warning">Den Notruf 112 für Nicht-Notfälle anzurufen verschwendet Notfallressourcen und ist in Dänemark gesellschaftlich stark verpönt. Ruf zuerst 1813 an für alles, was nicht unmittelbar lebensbedrohlich ist. Sie schicken einen Krankenwagen, wenn du einen brauchst.</p>
<p><strong>Krankenhausnotaufnahme (skadestue):</strong> Du kannst auch direkt in eine Krankenhausnotaufnahme gehen, aber 1813 leitet dich oft zu einer schnelleren Option weiter.</p>""",

    # 32. Dental Care
    """<p><strong>Das überrascht fast jeden Neuankömmling:</strong> Zahnpflege in Dänemark ist für Erwachsene NICHT durch das öffentliche Gesundheitssystem abgedeckt. Du zahlst aus eigener Tasche, und die dänischen Zahnarztpreise sind hoch.</p>
<p><strong>Typische Kosten (Schätzungen 2025):</strong></p>
<ul>
  <li>Routinekontrolle und Reinigung: 600–1.400 DKK</li>
  <li>Füllung (Komposit): 600–1.200 DKK pro Zahn</li>
  <li>Wurzelkanalbehandlung: 3.000–7.000 DKK</li>
  <li>Zahnkrone: 5.000–12.000 DKK</li>
  <li>Zahnextraktion: 600–1.500 DKK</li>
</ul>
<p><strong>Was KOSTENLOS ist:</strong> Zahnpflege für Kinder bis 18 Jahre. Schulzahnkontrollen und -behandlungen sind eingeschlossen.</p>
<p><strong>So reduzierst du die Kosten:</strong></p>
<ul>
  <li><strong>Sygeforsikring "denmark"</strong> (Gruppe 1) erstattet 40–60% der meisten Zahnarztkosten — tritt bei auf <a href="https://www.sygeforsikring.dk" target="_blank" rel="noopener">sygeforsikring.dk</a> für ~130–175 DKK/Monat</li>
  <li>Tandlægehøjskolen (Zahnarzthochschulen) in Kopenhagen und Aarhus bieten Behandlungen zu ~50% des normalen Preises an, durchgeführt von beaufsichtigten Studierenden</li>
  <li>Einige Arbeitgeber-Krankenversicherungspakete umfassen Zahnpflege</li>
</ul>
<p>Zahnärztlicher Notfall: ruf <strong>70 11 31 31</strong> an (außerhalb der Öffnungszeiten)</p>""",

    # 33. Mental Health Services
    """<p>In ein anderes Land zu ziehen ist eine der psychologisch anspruchsvollsten Dinge, die ein Mensch tun kann. Dänemark nimmt psychische Gesundheit ernst. So funktioniert das System:</p>
<p><strong>Kostenlos über das öffentliche System:</strong></p>
<ul>
  <li><strong>Dein Hausarzt</strong> ist der erste Schritt — er kann dich bei Bedarf an einen Psychologen (psykolog) überweisen</li>
  <li>Subventionierte Psychologie (ydernummer): mit einer Hausarztüberweisung für bestimmte Zustände zahlst du ~400 DKK pro Sitzung; SKAT zahlt den Rest</li>
  <li>Psychiatrische Behandlung: vollständig kostenlos bei Hausarztüberweisung und entsprechendem Schweregrad</li>
</ul>
<p><strong>Krisenunterstützung (kostenlos, 24/7):</strong></p>
<ul>
  <li><strong>Livslinien:</strong> 70 201 201 — dänischsprachige Krisenhotline für psychische Gesundheit</li>
  <li><strong>Headspace Dänemark:</strong> kostenlose Beratung für junge Menschen (12–25)</li>
  <li><strong>Expat Counselling Copenhagen:</strong> englischsprachige Therapie, privat, ~900–1.400 DKK/Sitzung</li>
</ul>
<p>Viele Expats finden die Anpassung an die dänische Sozialkultur (reserviert, indirekt, schwer zu durchdringen) wirklich herausfordernd. Das ist normal, kein persönliches Versagen. Rechne mit 1–2 Jahren, um ein echtes soziales Netzwerk aufzubauen.</p>
<a href="https://www.sundhed.dk/borger/patienthaandbogen/psyke/" target="_blank" rel="noopener">→ Ressourcen für psychische Gesundheit (sundhed.dk)</a>""",

    # 34. Sygeforsikring "denmark"
    """<p><strong>Sygeforsikring "denmark"</strong> ist ein gemeinnütziger gegenseitiger Versicherungsfonds, dem mehr als 2,3 Millionen Dänen angehören. Für eine kleine monatliche Gebühr erstattet er einen Teil der Ausgaben, die das öffentliche System nicht abdeckt.</p>
<p><strong>Was abgedeckt ist (Gruppe 1, ~130–175 DKK/Monat, 2025):</strong></p>
<ul>
  <li>Zahnbehandlung: 40–60% Erstattung bei den meisten Eingriffen</li>
  <li>Brillen und Kontaktlinsen: 400–800 DKK/Jahr Beitrag</li>
  <li>Physiotherapie: Teilerstattung</li>
  <li>Chiropraktik: Teilerstattung</li>
  <li>Psychologie (ohne Hausarztüberweisung): Teilerstattung</li>
  <li>Medizinische Hilfsmittel und orthopädische Geräte</li>
</ul>
<p class="callout-warning"><strong>Trete innerhalb von 6 Monaten nach deiner Ankunft in Dänemark bei</strong> — es gibt eine Wartezeit, und früher Beitritt gibt den maximalen Nutzen. Je länger du wartest, desto mehr Zahnarztrechungen zahlst du selbst.</p>
<a href="https://www.sygeforsikring.dk/english" target="_blank" rel="noopener">→ Sygeforsikring "denmark" beitreten (englische Seite)</a>""",

    # ===== Chapter 6: Children & Family =====
    # 35. Parental Leave (Barsel)
    """<p>Das dänische Elternzeitsystem ist eines der großzügigsten der Welt. Die Barselslov wurde am <strong>2. August 2022</strong> reformiert, um beiden Elternteilen gleiche und individuelle Rechte zu geben, mit weiteren Updates im Jahr 2024.</p>
<p><strong>Aufteilung der Elternzeit unter dem Modell nach 2022 (pro Elternteil):</strong></p>
<table class="info-table">
  <tr><th>Block</th><th>Wer</th><th>Dauer</th><th>Übertragbar?</th></tr>
  <tr><td>Schwangerschaftsurlaub</td><td>Gebärender Elternteil</td><td>4 Wochen vor der Geburt</td><td>Nein</td></tr>
  <tr><td>Mutterschaftsurlaub</td><td>Gebärender Elternteil</td><td>2 Wochen unmittelbar nach der Geburt (Pflicht)</td><td>Nein</td></tr>
  <tr><td>Vaterschafts-/Mitelternzeit</td><td>Anderer Elternteil</td><td>2 Wochen innerhalb der ersten 10 Wochen</td><td>Nein</td></tr>
  <tr><td>Reservierte Elternzeit (øremærket)</td><td>Jeder Elternteil</td><td><strong>11 Wochen jeweils</strong> — nutzen oder verlieren</td><td>Nein</td></tr>
  <tr><td>Übertragbare Elternzeit</td><td>Jeder Elternteil</td><td><strong>13 Wochen jeweils</strong> — flexibel</td><td>Ja — zwischen Elternteilen</td></tr>
</table>
<p><strong>Vergütung:</strong> Barselsdagpenge mit einem Höchstsatz von <strong>4.865 DKK pro Woche</strong> (2025) von Udbetaling Danmark. Viele Arbeitgeber stocken dies auf das volle Gehalt auf — prüfe deinen Arbeitsvertrag oder Tarifvertrag.</p>
<p><strong>Anspruchsberechtigung — die Falle für Neuankömmlinge:</strong> Um Barselsdagpenge vom Staat zu erhalten, musst du <strong>mindestens 160 Stunden in Dänemark in den 4 Monaten</strong> unmittelbar vor Beginn deiner Elternzeit gearbeitet haben. Neuankömmlinge sind möglicherweise noch nicht berechtigt — prüfe dies mit deiner Kommune und Udbetaling Danmark.</p>
<p>Beantrage Elternzeit über deinen Arbeitgeber und über <a href="https://www.borger.dk/familie-og-boern/graviditet-og-foedsel/barsel" target="_blank" rel="noopener">borger.dk</a> mindestens 8 Wochen vor dem erwarteten Geburtstermin.</p>
<a href="https://www.borger.dk/familie-og-boern/graviditet-og-foedsel/barsel" target="_blank" rel="noopener">→ Vollständiger Leitfaden zur Elternzeit (borger.dk offiziell)</a>""",

    # 36. Childcare — Vuggestue, Børnehave & SFO
    """<p>Dänemarks öffentlich subventionierte Kinderbetreuung ist weltklasse. Der Staat trägt den Großteil der Kosten — du zahlst <strong>maximal 25% der tatsächlichen Kosten</strong>.</p>
<table class="info-table">
  <tr><th>Typ</th><th>Alter</th><th>Max. Elternbeitrag (2025)</th><th>Stunden</th></tr>
  <tr><td><strong>Vuggestue</strong> (Krippe)</td><td>6 Monate – 3 Jahre</td><td>~3.756 DKK/Monat</td><td>Ganztag</td></tr>
  <tr><td><strong>Børnehave</strong> (Kindergarten)</td><td>3 – 6 Jahre</td><td>~2.226 DKK/Monat</td><td>Ganztag</td></tr>
  <tr><td><strong>SFO</strong> (Hort)</td><td>6 – 10 Jahre</td><td>~1.400–2.200 DKK/Monat</td><td>Nach der Schule + Ferien</td></tr>
  <tr><td><strong>Dagpleje</strong> (Tagesmutter)</td><td>0 – 3 Jahre</td><td>Ähnlich wie Vuggestue</td><td>Kleinere Gruppe, häuslich</td></tr>
</table>
<p><strong>Geschwisterrabatt:</strong> 50% Reduzierung auf den Beitrag des günstigsten Kindes, wenn du zwei oder mehr Kinder in öffentlicher Betreuung hast.</p>
<p><strong>Einkommensabhängige Reduzierung:</strong> Familien mit niedrigem Einkommen zahlen weniger. Der Höchstbeitrag ist die Obergrenze — du kannst dich für einen deutlich ermäßigten Satz qualifizieren.</p>
<p class="callout-warning">Beantrage Kinderbetreuung sobald du eine CPR-Nummer hast — Wartezeiten in Kopenhagen können 3–9 Monate betragen, besonders für die Vuggestue. Beantrage es über das digitale Selbstbedienungsportal deiner Gemeinde.</p>""",

    # 37. Børnecheck
    """<p>Der <strong>Børnecheck</strong> (formal <em>børne- og ungeydelse</em>) ist eine steuerfreie Zahlung des Staates für jedes Kind unter 18 Jahren. Das Bemerkenswerte: <strong>du musst ihn nicht beantragen</strong>. Er wird automatisch auf dein NemKonto ausgezahlt, sobald dein Kind mit einer CPR-Nummer registriert ist — vierteljährlich für Kinder unter 15, monatlich ab 15 Jahren.</p>
<p><strong>Beträge (2025), laut Skatteministeriet:</strong></p>
<table class="info-table">
  <tr><th>Alter des Kindes</th><th>Betrag</th><th>Pro Jahr</th><th>Häufigkeit</th></tr>
  <tr><td>0 – 2 Jahre</td><td>5.292 DKK</td><td>21.168 DKK</td><td>Vierteljährlich</td></tr>
  <tr><td>3 – 6 Jahre</td><td>4.191 DKK</td><td>16.764 DKK</td><td>Vierteljährlich</td></tr>
  <tr><td>7 – 14 Jahre</td><td>3.297 DKK</td><td>13.188 DKK</td><td>Vierteljährlich</td></tr>
  <tr><td>15 – 17 Jahre</td><td>1.099 DKK</td><td>13.188 DKK</td><td>Monatlich</td></tr>
</table>
<p>Vierteljährliche Zahlungen kommen am 20. Januar, April, Juli, Oktober. Monatliche Zahlungen (15–17 Jahre) kommen am 20. jedes Monats.</p>
<p class="callout-warning" style="background:rgba(232,160,32,0.08);border-left:4px solid var(--amber);padding:12px 14px;border-radius:8px;margin:14px 0;"><strong>⚠️ Die 2-Jahres-Regel, die Neuankömmlinge überrascht:</strong> Der volle Børnecheck erfordert <strong>2 Jahre Aufenthalt oder Beschäftigung in Dänemark/EWR innerhalb der letzten 10 Jahre</strong>. Neuankömmlinge erhalten einen gestaffelten Prozentsatz:</p>
<table class="info-table">
  <tr><th>Zeit in DK/EWR</th><th>Zahlung %</th></tr>
  <tr><td>Weniger als 6 Monate</td><td>0%</td></tr>
  <tr><td>6 Monate – 1 Jahr</td><td>25%</td></tr>
  <tr><td>1 – 1,5 Jahre</td><td>50%</td></tr>
  <tr><td>1,5 – 2 Jahre</td><td>75%</td></tr>
  <tr><td>2 Jahre oder mehr</td><td>100% (voller Betrag)</td></tr>
</table>
<p>EU/EWR-Arbeit zählt dazu. Dein NemKonto muss eingerichtet sein. Wenn du neu bist und es innerhalb von 3 Monaten nach der Registrierung deines Kindes nicht erhalten hast, wende dich an Udbetaling Danmark.</p>
<a href="https://lifeindenmark.borger.dk/family-and-children/family-benefits/child-and-youth-benefits" target="_blank" rel="noopener">→ Kinder- und Jugendleistungen (lifeindenmark.borger.dk)</a>""",

    # 38. Folkeskole
    """<p>Die <strong>Folkeskole</strong> ist das dänische öffentliche Schulsystem. Es ist kostenlos, umfasst Schulmaterialien und geht von Klasse 0 (Børnehaveklasse, 6 Jahre) bis Klasse 9 (15/16 Jahre), mit einem optionalen 10. Schuljahr.</p>
<p><strong>Wichtige Fakten über die Folkeskole:</strong></p>
<ul>
  <li><strong>Englisch</strong> wird ab der 1. Klasse unterrichtet. Die meisten Kinder sprechen bis zur 5. Klasse ausgezeichnetes Englisch.</li>
  <li><strong>Keine Uniformen.</strong> Dänische Schulen betonen Wohlbefinden, Kreativität und selbstständiges Denken statt akademischen Wettbewerb.</li>
  <li>Essen wird in den meisten Schulen <strong>nicht bereitgestellt</strong> — Kinder bringen ihr Mittagessen mit (Madpakke).</li>
  <li><strong>Noten</strong> beginnen in Klasse 8. Davor wird das Lernen durch schriftliches Feedback bewertet, nicht durch Noten.</li>
  <li><strong>Klassengröße:</strong> Durchschnittlich 22–24 Schüler</li>
</ul>
<p><strong>Melde dein Kind an:</strong> Kontaktiere die Børne- og Ungeforvaltning (Kinder- und Jugendbehörde) deiner Gemeinde. Kinder aus der EU haben das Recht, sich an der lokalen Folkeskole anzumelden. Die Anmeldung erfolgt nach Adresse.</p>
<p>Viele internationale Kinder integrieren sich gut, auch ohne Dänischkenntnisse — dänische Kinder sind generell aufgeschlossen, und Schulen bieten Sprachunterstützung (Modtageklasse) für Neuankömmlinge.</p>""",

    # 39. International Schools
    """<p>Wenn du planst, Dänemark in einigen Jahren zu verlassen, oder eine englischsprachige Ausbildung bevorzugst, sind internationale Schulen eine gute Option. Sie sind privat und erheben Schulgebühren.</p>
<table class="info-table">
  <tr><th>Schule</th><th>Stadt</th><th>Lehrplan</th><th>Jahresgebühr (ca.)</th></tr>
  <tr><td><strong>Copenhagen International School (CIS)</strong></td><td>Kopenhagen</td><td>IB (International Baccalaureate)</td><td>105.000–135.000 DKK</td></tr>
  <tr><td><strong>Rygaards School</strong></td><td>Hellerup, KPH</td><td>Britisch / IB</td><td>85.000–105.000 DKK</td></tr>
  <tr><td><strong>Skals Efterskole</strong></td><td>Skals</td><td>Dänisch + Englisch</td><td>30.000–60.000 DKK</td></tr>
  <tr><td><strong>Aarhus International School</strong></td><td>Aarhus</td><td>IB/Dänisch zweisprachig</td><td>80.000–110.000 DKK</td></tr>
</table>
<p>Viele Arbeitgeber mit internationalem Personal bieten Schulgebührenunterstützung als Teil des Umzugspakets an — frage deine HR-Abteilung, bevor du davon ausgehst, allein zahlen zu müssen.</p>""",
]

print(f"Prepared {len(GERMAN_TRANSLATIONS)} translations so far (first 39)")
print("Saving partial script...")
PYEOF
