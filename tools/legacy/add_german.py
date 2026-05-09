#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to add German (de:) translations to data-chapters.js
Each es:` block gets a de:` block inserted after it, before the closing }
"""

import re
import sys

# German translations indexed by their approximate line position and content key
# Format: match the end of es: block and insert de: block before closing }

TRANSLATIONS = [
    # ===== Chapter 0: Before You Land =====
    # Section 1: Which Visa
    (
        '''<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Solicita en newtodenmark.dk (oficial)</a>` }''',
        '''<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Solicita en newtodenmark.dk (oficial)</a>`,
          de:`<p><strong>EU/EWR/Nordische Staatsbürger:</strong> Du brauchst kein Visum und keine Arbeitserlaubnis. Du hast das Recht, frei in Dänemark zu leben und zu arbeiten. <strong>Zwei separate Anmeldungen sind erforderlich:</strong> (1) Deine <strong>Folkeregister-Adresse</strong> muss <strong>innerhalb von 5 Tagen nach dem Einzug</strong> angemeldet werden (CPR-Gesetz §12 — bei Versäumnis droht eine Geldstrafe). (2) Dein <strong>EU-Aufenthaltsdokument</strong> von SIRI ist erforderlich, wenn du länger als 3 Monate bleiben möchtest.</p>
<p><strong>Nicht-EU-Staatsbürger</strong> benötigen eines der folgenden Dokumente:</p>
<ul>
  <li><strong>Arbeitserlaubnis</strong> — erfordert ein Stellenangebot eines dänischen Arbeitgebers. Häufigste Typen: Positivliste (für gefragte Berufe), Gehaltsgrenzregelung (bei Gehalt &gt; 514.000 DKK/Jahr in 2025, steigt auf 552.000 DKK im Jahr 2026), Fast-track-Regelung (für zertifizierte Unternehmen).</li>
  <li><strong>Studentenvisum</strong> — wenn du an einer dänischen Universität oder Bildungseinrichtung eingeschrieben bist. Beantrage es mindestens 2 Monate vorher auf newtodenmark.dk.</li>
  <li><strong>Familienzusammenführung</strong> — um zu einem dänischen Staatsbürger oder dauerhaft Aufenthaltsberechtigten zu ziehen. Die Anforderungen sind streng: der dänische Sponsor muss Einkommens- und Wohnungsanforderungen erfüllen.</li>
  <li><strong>Startup Denmark Visum</strong> — für Unternehmer mit einem genehmigten Geschäftsplan.</li>
</ul>
<p class="callout-warning">Beantrage so früh wie möglich. Die Bearbeitungszeiten für Nicht-EU-Bürger betragen 1–4 Monate. Buche kein Einwegticket, bis die Genehmigung erteilt wurde.</p>
<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ Antrag auf newtodenmark.dk stellen (offiziell)</a>` }'''
    ),
    # Section 2: Document Folder
    (
        '''<p><strong>Apostilla</strong> = un sello oficial que hace que los documentos extranjeros sean reconocidos legalmente a nivel internacional. Obténla de la autoridad designada en tu país antes de salir.</p>`,
          da:''',
        '''<p><strong>Apostilla</strong> = un sello oficial que hace que los documentos extranjeros sean reconocidos legalmente a nivel internacional. Obténla de la autoridad designada en tu país antes de salir.</p>`,
          de:`<p>Bringe diese physischen Originale UND beglaubigte Kopien von jedem mit:</p>
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
<p><strong>Apostille</strong> = ein offizieller Stempel, der ausländische Dokumente international rechtlich anerkennbar macht. Hole ihn vor der Abreise bei der zuständigen Behörde deines Heimatlandes.</p>`,
          da:'''
    ),
    # Section 3: Housing Before Arrive
    (
        '''<p class="callout-warning">El depósito en Dinamarca está limitado por ley a 3 meses de alquiler. Quien pida más está infringiendo la ley.</p>`,
          da:''',
        '''<p class="callout-warning">El depósito en Dinamarca está limitado por ley a 3 meses de alquiler. Quien pida más está infringiendo la ley.</p>`,
          de:`<p>Der dänische Wohnungsmarkt ist sehr wettbewerbsintensiv — besonders in Kopenhagen. Schon vor deiner Ankunft mit der Suche zu beginnen verschafft dir einen entscheidenden Vorteil.</p>
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
<p class="callout-warning">Die Kaution in Dänemark ist gesetzlich auf 3 Monatsmieten begrenzt. Wer mehr verlangt, verstößt gegen das Gesetz.</p>`,
          da:'''
    ),
    # Section 4: Banking & Money Before Arrive
    (
        '''<p>Trae suficiente dinero en efectivo o fondos accesibles para cubrir al menos <strong>2 meses de gastos</strong> mientras te estableces. Presupuesta un mínimo de 30.000 DKK como colchón.</p>`,
          da:''',
        '''<p>Trae suficiente dinero en efectivo o fondos accesibles para cubrir al menos <strong>2 meses de gastos</strong> mientras te estableces. Presupuesta un mínimo de 30.000 DKK como colchón.</p>`,
          de:`<p>Du kannst schon vor der Ankunft internationale Konten einrichten, die dir überbrücken, bis du ein dänisches Bankkonto hast (das eine CPR-Nummer erfordert).</p>
<p><strong>Empfohlene Konten vor der Ankunft:</strong></p>
<ul>
  <li><strong>Wise (früher TransferWise)</strong> — am besten für internationale Überweisungen, Multiwährungskarte, sofort einsatzbereit</li>
  <li><strong>Revolut</strong> — hervorragend für Ausgaben im Ausland, kostenlose Variante verfügbar</li>
  <li><strong>Lunar</strong> — dänische Digitalbank, die manchmal ohne CPR-Nummer eröffnet werden kann (aktuelle Bedingungen prüfen)</li>
</ul>
<p>Bring genug Bargeld oder zugängliche Mittel für mindestens <strong>2 Monate Ausgaben</strong>, während du dich einrichtest. Kalkuliere mindestens 30.000 DKK als Puffer ein.</p>`,
          da:'''
    ),
    # Section 5: Start Learning Danish
    (
        '''<p>Aprende estas 10 palabras primero: <em>tak (gracias), undskyld (perdón/disculpa), hej (hola), hejhej (adiós), ja/nej (sí/no), tak for mad (gracias por la comida), skål (salud), hvad (qué), og (y), er (es/son)</em></p>`,
          da:''',
        '''<p>Aprende estas 10 palabras primero: <em>tak (gracias), undskyld (perdón/disculpa), hej (hola), hejhej (adiós), ja/nej (sí/no), tak for mad (gracias por la comida), skål (salud), hvad (qué), og (y), er (es/son)</em></p>`,
          de:`<p>Dänische Aussprache ist wirklich eine der schwierigsten für Ausländer — je früher du anfängst, desto besser. Die ehrliche Wahrheit: alle in Dänemark sprechen ausgezeichnetes Englisch. Aber Dänisch lernen öffnet soziale Türen, die für Englischsprachige verschlossen bleiben.</p>
<p><strong>Beste Ressourcen vor der Ankunft:</strong></p>
<ul>
  <li>🎧 <strong>Glossika</strong> — am besten für Aussprache, Spaced Repetition</li>
  <li>📱 <strong>Babbel</strong> — strukturierte Lektionen, besser als Duolingo für Dänisch</li>
  <li>🎬 <strong>YouTube: "Learn Danish with DanishClass101"</strong></li>
  <li>🎙️ <strong>Podcast: "Slow Danish"</strong> — echte Sprache in verlangsamtem Tempo</li>
</ul>
<p>Lerne zuerst diese 10 Wörter: <em>tak (danke), undskyld (entschuldigung/Verzeihung), hej (hallo), hejhej (tschüss), ja/nej (ja/nein), tak for mad (danke fürs Essen), skål (prost), hvad (was), og (und), er (ist/sind)</em></p>`,
          da:'''
    ),
    # ===== Chapter 1: First 72 Hours =====
    # Step 1: Register Address
    (
        '''<p class="callout-warning">NO omitas este paso pensando que lo harás "después". Sin dirección registrada no puedes obtener tu número CPR.</p>` }''',
        '''<p class="callout-warning">NO omitas este paso pensando que lo harás "después". Sin dirección registrada no puedes obtener tu número CPR.</p>`,
          de:`<p>Das ist <strong>das Allerwichtigste</strong>. Alles andere — deine CPR-Nummer, dein MitID, dein Arzt, dein Bankkonto, deine Steuerkarte — all das hängt davon ab, eine angemeldete Adresse zu haben.</p>
<p class="callout-warning">⏰ <strong>Gesetzliche Frist: innerhalb von 5 Tagen nach dem Einzug</strong> (CPR-Gesetz §12). Verspätete Anmeldung ist eine bußgeldbewehrte Ordnungswidrigkeit. Buche deinen Borgerservice-Termin, sobald du die Schlüssel hast.</p>
<p><strong>So geht es:</strong></p>
<ol class="step-list">
  <li><span class="step-num">1</span> Geh auf <a href="https://www.borger.dk" target="_blank" rel="noopener">borger.dk</a> und suche nach "Flytning til Danmark" ODER besuche persönlich dein lokales Borgerservice (Bürgerservice).</li>
  <li><span class="step-num">2</span> Du brauchst: deinen Reisepass + Nachweis deiner Wohnadresse (unterzeichneter Mietvertrag, Untermietvertrag oder ein Schreiben vom Gastgeber).</li>
  <li><span class="step-num">3</span> Wenn du vorübergehend bei einem Freund wohnst: dieser muss ein Schreiben schreiben und unterschreiben, das bestätigt, dass du dort wohnst. Vorlage auf borger.dk verfügbar.</li>
</ol>
<p class="callout-warning">Überspringe diesen Schritt NICHT mit dem Gedanken, du wirst es "später" erledigen. Ohne angemeldete Adresse kannst du keine CPR-Nummer erhalten.</p>` }'''
    ),
    # Step 2: CPR Number
    (
        '''<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Reserva cita ICS en línea</a>` }''',
        '''<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ Reserva cita ICS en línea</a>`,
          de:`<p>Deine CPR-Nummer (Civil Personal Registration) ist <strong>die wichtigste Nummer in deinem dänischen Leben.</strong> Sie wird für absolut alles benötigt: Arztbesuche, Steueranmeldung, Bankwesen, Bibliothekskarte, Fitnessstudio-Mitgliedschaft, Handyverträge — alles.</p>
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
<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ ICS-Termin online buchen</a>` }'''
    ),
    # Step 3: MitID
    (
        '''<p>La app de MitID se instala en tu smartphone y genera códigos de 6 dígitos para iniciar sesión. Cuida tu teléfono — ESA es tu identidad.</p>` }''',
        '''<p>La app de MitID se instala en tu smartphone y genera códigos de 6 dígitos para iniciar sesión. Cuida tu teléfono — ESA es tu identidad.</p>`,
          de:`<p>MitID ist Dänemarks nationales digitales Identitätssystem. Denke daran als den Hauptschlüssel zu deinem gesamten digitalen Leben in Dänemark. Ohne es kannst du nicht auf folgende Dienste zugreifen: borger.dk, SKAT (Steuern), e-Boks (deine offizielle Post), dein Online-Banking, Sundhed.dk und Dutzende weiterer Dienste.</p>
<p><strong>MitID erhältst du auf:</strong> <a href="https://www.mitid.dk" target="_blank" rel="noopener">mitid.dk</a> oder persönlich bei deiner Bank oder beim Borgerservice.</p>
<p>Die MitID-App wird auf deinem Smartphone installiert und generiert 6-stellige Codes zum Einloggen. Halte dein Handy sicher — das IST deine Identität.</p>` }'''
    ),
    # Step 4: e-Boks
    (
        '''<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ Sitio web de e-Boks</a>` }''',
        '''<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ Sitio web de e-Boks</a>`,
          de:`<p>e-Boks ist Dänemarks offizieller digitaler Briefkasten. Jeder Brief von SKAT, Udbetaling Danmark, deiner Gemeinde, deiner Bank und der Regierung landet hier. Nicht in deinem physischen Briefkasten. Nicht in deiner E-Mail. Hier.</p>
<p class="callout-warning"><strong>Das ist entscheidend:</strong> Menschen haben Steuerfristen, Verlängerungsbescheide für Aufenthaltserlaubnisse und Bestätigungen von Leistungszahlungen verpasst, weil sie e-Boks nicht überprüft haben. Stelle jetzt eine wöchentliche Kalender-Erinnerung ein.</p>
<p>Lade die e-Boks-App herunter. Aktiviere Push-Benachrichtigungen. Richte die E-Mail-Weiterleitung in den Einstellungen ein, damit du eine E-Mail erhältst, wenn etwas Neues ankommt.</p>
<a href="https://www.e-boks.com/dk/en/" target="_blank" rel="noopener">→ e-Boks Website</a>` }'''
    ),
    # Step 5: Danish Bank Account
    (
        '''<p>Tras abrir la cuenta, designa tu <strong>NemKonto</strong> en <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>. Es obligatorio.</p>` }''',
        '''<p>Tras abrir la cuenta, designa tu <strong>NemKonto</strong> en <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>. Es obligatorio.</p>`,
          de:`<p>Du benötigst ein dänisches Bankkonto für dein NemKonto (das Konto, auf das die Regierung dir Geld schickt — Steuerrückerstattungen, Sozialleistungen usw.). Die meisten Banken benötigen eine CPR-Nummer.</p>
<table class="info-table">
  <tr><th>Bank</th><th>Englisch?</th><th>CPR erforderlich?</th><th>Beste für</th></tr>
  <tr><td><strong>Lunar</strong></td><td>✅ 100%</td><td>Manchmal nein</td><td>Neuankömmlinge, digital-first</td></tr>
  <tr><td><strong>Nordea</strong></td><td>✅ Gut</td><td>Ja</td><td>Internationale Überweisungen</td></tr>
  <tr><td><strong>Danske Bank</strong></td><td>✅ Gut</td><td>Ja</td><td>Vollservice</td></tr>
  <tr><td><strong>Jyske Bank</strong></td><td>Teilweise</td><td>Ja</td><td>Regional, persönlicher Service</td></tr>
</table>
<p>Nach der Kontoeröffnung bestimmst du es als dein <strong>NemKonto</strong> auf <a href="https://www.nemkonto.dk" target="_blank" rel="noopener">nemkonto.dk</a>. Das ist Pflicht.</p>` }'''
    ),
    # Step 6: Essential Danish Apps
    (
        '''  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Ahorra dinero en comida no vendida. Los daneses adoran esta app.</div><div class="app-card-lang">🇬🇧 English</div></div>
</div>` }''',
        '''  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Ahorra dinero en comida no vendida. Los daneses adoran esta app.</div><div class="app-card-lang">🇬🇧 English</div></div>
</div>`,
          de:`<div class="app-grid">
  <div class="app-card"><div class="app-card-icon">💸</div><div class="app-card-name">MobilePay</div><div class="app-card-desc">Dänemarks Zahlungs-App. Die brauchst du unbedingt zum Aufteilen von Rechnungen, Bezahlen auf Märkten usw.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">📬</div><div class="app-card-name">e-Boks</div><div class="app-card-desc">Dein offizieller dänischer Briefkasten. Wöchentlich checken.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🚌</div><div class="app-card-name">Rejsekort</div><div class="app-card-desc">App für die öffentliche Verkehrskarte. Gilt in ganz Dänemark.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🚂</div><div class="app-card-name">DSB</div><div class="app-card-desc">Dänische Staatsbahn. Zugtickets buchen, Fahrpläne einsehen.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🏥</div><div class="app-card-name">Min Læge</div><div class="app-card-desc">Arzttermine buchen, Rezepte verlängern.</div><div class="app-card-lang">Eingeschränktes EN</div></div>
  <div class="app-card"><div class="app-card-icon">💊</div><div class="app-card-name">Sundhed.dk</div><div class="app-card-desc">Deine Gesundheitsakte, Krankenhausüberweisungen, Arzt finden.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">💰</div><div class="app-card-name">Skat</div><div class="app-card-desc">Dänisches Finanzamt. Steuerkarte ansehen, Abzüge prüfen.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">Spare Geld bei unverkauften Lebensmitteln. Dänen lieben diese App.</div><div class="app-card-lang">🇩🇪 Englisch</div></div>
</div>` }'''
    ),
    # Emergency Numbers
    (
        '''<p class="callout-warning"><strong>Diferencia clave:</strong> En Dinamarca, el 1813 es el número para solicitar orientación médica y atención urgente no crítica. Llamar al 112 para no emergencias está mal visto y puede retrasar la atención de otros.</p>` }''',
        '''<p class="callout-warning"><strong>Diferencia clave:</strong> En Dinamarca, el 1813 es el número para solicitar orientación médica y atención urgente no crítica. Llamar al 112 para no emergencias está mal visto y puede retrasar la atención de otros.</p>`,
          de:`<table class="info-table">
  <tr><th>Nummer</th><th>Für</th><th>Hinweis</th></tr>
  <tr><td><strong>112</strong></td><td>Polizei, Feuerwehr, Krankenwagen</td><td>NUR lebensbedrohliche Notfälle</td></tr>
  <tr><td><strong>1813</strong></td><td>Ärztliche Hilfe (kein Notfall)</td><td>Dringend, aber nicht lebensbedrohlich. 24/7. Region Kopenhagen.</td></tr>
  <tr><td><strong>114</strong></td><td>Polizei (kein Notfall)</td><td>Für Straftaten, verlorene Gegenstände, Meldungen</td></tr>
  <tr><td><strong>70 11 31 31</strong></td><td>Zahnärztlicher Notfall</td><td>Zahnschmerzen außerhalb der Öffnungszeiten</td></tr>
  <tr><td><strong>80 19 13 99</strong></td><td>Giftnotruf</td><td>Kostenlos, 24/7</td></tr>
  <tr><td><strong>70 20 12 60</strong></td><td>Krisentelefon (Livslinien)</td><td>Unterstützung bei psychischen Krisen</td></tr>
</table>
<p class="callout-warning"><strong>Wichtiger Unterschied:</strong> In Dänemark ist 1813 die Nummer für ärztliche Beratung und nicht lebensbedrohliche dringende Hilfe. Den Notruf 112 für Nicht-Notfälle anzurufen gilt als unhöflich und kann die Hilfe für andere verzögern.</p>` }'''
    ),
]

# Read the file
with open(r'C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original file size: {len(content)} chars")
print(f"Original es:` count: {content.count('es:`')}")
print(f"Original de:` count: {content.count('de:`')}")

# Apply translations
for i, (old, new) in enumerate(TRANSLATIONS):
    if old in content:
        content = content.replace(old, new, 1)
        print(f"Translation {i+1}: Applied OK")
    else:
        print(f"Translation {i+1}: NOT FOUND - checking...")
        # Print first 100 chars of old to debug
        print(f"  Looking for: {repr(old[:100])}")

print(f"\nAfter pass 1: de:` count: {content.count('de:`')}")

with open(r'C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js_partial', 'w', encoding='utf-8') as f:
    f.write(content)
print("Partial file written")
PYEOF
