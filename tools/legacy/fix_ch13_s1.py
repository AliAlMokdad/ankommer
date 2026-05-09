#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    c = f.read()

old = '  <li>У спортивних клубах, на музичних заходах та у волонтерській діяльності</li>\n</ul>` }'
new = '  <li>У спортивних клубах, на музичних заходах та у волонтерській діяльності</li>\n</ul>`,\n               pl:`<p>Randkowanie w Danii jest bezpośrednie i egalitarne. Kluczowe cechy:</p>\n<ul>\n  <li><strong>Bezpośredniość:</strong> Jeśli ktoś jest zainteresowany, powie wprost. Nie ma zawoalowanych aluzji.</li>\n  <li><strong>Równość płci:</strong> Dzielenie rachunków jest normalą. Żadna płeć nie oczekuje, że druga zawsze płaci.</li>\n  <li><strong>Wolniejsze tempo:</strong> Duńczycy rzadko spieszą się do związku. Przyjaźń przechodzi w romantykę stopniowo.</li>\n  <li><strong>Aplikacje randkowe:</strong> Tinder, Bumble i Hinge są popularne w Kopenhadze.</li>\n  <li><strong>Spotkania przez aktywności:</strong> W klubach sportowych, na wydarzeniach muzycznych i wolontariacie</li>\n</ul>` }'

cnt = c.count(old)
print(f"Count: {cnt}")
if cnt == 1:
    c = c.replace(old, new, 1)
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Applied successfully")
else:
    print(f"ERROR: found {cnt} times")
print("Total pl: blocks:", c.count('pl:`'))
