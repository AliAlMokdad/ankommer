#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

with open('add_fa_final.py', 'r', encoding='utf-8') as f:
    script = f.read()

# Fix Ch1 S6: replace the wrong snippet with the correct one from the file
old_ch1_snippet = '"یہ <strong>آپ کے پانچ</strong> ضروری ڈیجیٹل ٹولز": """\\\n<p>این <strong>پنج ابزار دیجیتال ضروری</strong> شما برای زندگی در دانمارک هستند:</p>""",'

new_ch1_snippet = '''"ڈنمارک کی ادائیگی ایپ۔ بل تقسیم کرنے": \"\"\"\\\n<div class="app-grid">\\n  <div class="app-card"><div class="app-card-icon">💸</div><div class="app-card-name">MobilePay</div><div class="app-card-desc">اپلیکیشن پرداخت دانمارک. برای تقسیم صورت‌حساب، پرداخت در غرفه‌ها ضروری است.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n  <div class="app-card"><div class="app-card-icon">📬</div><div class="app-card-name">e-Boks</div><div class="app-card-desc">صندوق پستی رسمی دانمارکی شما. هر هفته بررسی کنید.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n  <div class="app-card"><div class="app-card-icon">🚌</div><div class="app-card-name">Rejsekort</div><div class="app-card-desc">اپلیکیشن کارت حمل‌ونقل عمومی. در سرتاسر دانمارک کار می‌کند.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n  <div class="app-card"><div class="app-card-icon">🚂</div><div class="app-card-name">DSB</div><div class="app-card-desc">قطار ملی دانمارک. بلیط قطار بخرید، برنامه را ببینید.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n  <div class="app-card"><div class="app-card-icon">🏥</div><div class="app-card-name">Min Læge</div><div class="app-card-desc">وقت پزشک عمومی بگیرید، نسخه تمدید کنید.</div><div class="app-card-lang">EN محدود</div></div>\\n  <div class="app-card"><div class="app-card-icon">💊</div><div class="app-card-name">Sundhed.dk</div><div class="app-card-desc">سوابق پزشکی، ارجاع بیمارستانی، جستجوی پزشک.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n  <div class="app-card"><div class="app-card-icon">💰</div><div class="app-card-name">Skat</div><div class="app-card-desc">اداره مالیات دانمارک. کارت مالیاتی ببینید، کسورات را بررسی کنید.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n  <div class="app-card"><div class="app-card-icon">🛒</div><div class="app-card-name">Too Good To Go</div><div class="app-card-desc">در غذای نفروخته شده صرفه‌جویی کنید. دانمارکی‌ها این اپ را دوست دارند.</div><div class="app-card-lang">🇬🇧 انگلیسی</div></div>\\n</div>""",'''

# Fix Ch11 S4: replace the wrong snippet with the correct one
old_ch11_snippet = '"یہ ایپس ڈنمارک میں": """\\\n<p>این اپلیکیشن‌ها برای یادگیری زبان دانمارکی توصیه می‌شوند:</p>""",'

new_ch11_snippet = '''"حقیقی ڈینش آہستہ رفتار سے۔ ٹرانسکرپٹس شامل۔": \"\"\"\\\n<div class="app-grid">\\n  <div class="app-card"><div class="app-card-icon">🎧</div><div class="app-card-name">Glossika</div><div class="app-card-desc">بهترین برای تلفظ و الگوهای جمله. تکرار فاصله‌دار. ارزش پول را دارد.</div><div class="app-card-lang">پولی</div></div>\\n  <div class="app-card"><div class="app-card-icon">📱</div><div class="app-card-name">Babbel</div><div class="app-card-desc">درس‌های ساختارمند، برای عمق دستور زبان دانمارکی بهتر از Duolingo.</div><div class="app-card-lang">پولی</div></div>\\n  <div class="app-card"><div class="app-card-icon">🦉</div><div class="app-card-name">Duolingo</div><div class="app-card-desc">برای واژگان اولیه و ایجاد عادت خوب است. تنها کافی نیست.</div><div class="app-card-lang">رایگان/پولی</div></div>\\n  <div class="app-card"><div class="app-card-icon">📖</div><div class="app-card-name">Ordbogen</div><div class="app-card-desc">بهترین اپ دیکشنری دانمارکی. جملات و توضیحات دستوری هم دارد.</div><div class="app-card-lang">رایگان</div></div>\\n  <div class="app-card"><div class="app-card-icon">🎬</div><div class="app-card-name">DR.dk</div><div class="app-card-desc">تلویزیون دانمارکی رایگان با زیرنویس دانمارکی. اخبار و سریال تماشا کنید.</div><div class="app-card-lang">رایگان</div></div>\\n  <div class="app-card"><div class="app-card-icon">🎙️</div><div class="app-card-name">Slow Danish Podcast</div><div class="app-card-desc">دانمارکی واقعی با سرعت کم. رونویسی شامل است. بهترین برای سطح متوسط.</div><div class="app-card-lang">رایگان</div></div>\\n</div>""",'''

if old_ch1_snippet in script:
    script = script.replace(old_ch1_snippet, new_ch1_snippet)
    print('Fixed Ch1 S6 snippet')
else:
    print('ERROR: Ch1 S6 old snippet not found!')
    # Try to find it with a partial match
    idx = script.find('یہ <strong>آپ کے پانچ</strong>')
    print('  Partial search result:', repr(script[max(0,idx-2):idx+50]) if idx != -1 else 'NOT FOUND')

if old_ch11_snippet in script:
    script = script.replace(old_ch11_snippet, new_ch11_snippet)
    print('Fixed Ch11 S4 snippet')
else:
    print('ERROR: Ch11 S4 old snippet not found!')

with open('add_fa_final.py', 'w', encoding='utf-8') as f:
    f.write(script)
print('Done fixing snippets')
