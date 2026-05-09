#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to add Persian (fa:) translations to data-chapters.js
"""

import re

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"

def read_file():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(content):
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

# All translations: (ur_content_end_snippet, fa_translation)
# Each entry is a unique end of the ur: content, and the fa: to insert after it.

TRANSLATIONS = []

# ============================================================
# CHAPTER 0 - Before You Land
# ============================================================

# Section 1: Visa
TRANSLATIONS.append((
    'ur:`<p><strong>یورپی یونین/EEA/نورڈک ممالک کے شہری:</strong>',
    'ur:`<p><strong>شهروندان اتحادیه اروپا/EEA/کشورهای نوردیک:</strong> شما نیازی به ویزا یا مجوز کار ندارید. حق دارید آزادانه در دانمارک زندگی و کار کنید. <strong>دو ثبت‌نام جداگانه لازم است:</strong> (1) <strong>آدرس شما در folkeregister</strong> (دفتر ثبت جمعیت دانمارک) باید <strong>ظرف ۵ روز از تاریخ اسکان</strong> ثبت شود (قانون CPR §۱۲ — تأخیر جریمه دارد). (2) <strong>مدرک اقامت اتحادیه اروپا</strong> از SIRI در صورت قصد اقامت بیش از ۳ ماه الزامی است.</p>\n<p><strong>شهروندان غیر اتحادیه اروپا</strong> به یکی از موارد زیر نیاز دارند:</p>\n<ul>\n  <li><strong>مجوز کار</strong> — مستلزم پیشنهاد شغلی از یک کارفرمای دانمارکی است. رایج‌ترین انواع: Positive List (برای مشاغل پرتقاضا)، Pay Limit Scheme (در صورتی که حقوق &gt; ۵۱۴٬۰۰۰ DKK/سال در ۲۰۲۵، که در ۲۰۲۶ به ۵۵۲٬۰۰۰ DKK افزایش می‌یابد)، Fast-track Scheme (برای شرکت‌های دارای گواهینامه).</li>\n  <li><strong>ویزای دانشجویی</strong> — در صورت ثبت‌نام در دانشگاه یا مؤسسه آموزشی دانمارکی. حداقل ۲ ماه قبل از طریق newtodenmark.dk درخواست دهید.</li>\n  <li><strong>اجتماع مجدد خانوادگی</strong> — برای پیوستن به شهروند دانمارکی یا مقیم دائم. شرایط سختگیرانه است: حامی دانمارکی باید الزامات درآمدی و مسکن را برآورده کند.</li>\n  <li><strong>ویزای Startup Denmark</strong> — برای کارآفرینان دارای طرح کسب‌وکار تأیید شده.</li>\n</ul>\n<p class="callout-warning">هرچه زودتر درخواست دهید. زمان پردازش برای غیر اتحادیه اروپا ۱ تا ۴ ماه است. قبل از تأیید مجوز، بلیط یک‌طرفه رزرو نکنید.</p>\n<a href="https://www.nyidanmark.dk/en-GB" target="_blank" rel="noopener">→ درخواست در newtodenmark.dk (رسمی)</a>`'
))

# Section 2: Document Folder
TRANSLATIONS.append((
    'ur:`<p>یہ اصل دستاویزات اور ان کی تصدیق شدہ نقول ساتھ لائیں:</p>',
    'ur:`<p>این اسناد اصلی و کپی‌های تأیید شده هر یک را همراه بیاورید:</p>\n<ul>\n  <li>✅ پاسپورت معتبر (+ ۲ فتوکپی از صفحه اصلی)</li>\n  <li>✅ شناسنامه/گواهی تولد (در صورت غیر اتحادیه اروپا، با تأییدیه آپوستیل)</li>\n  <li>✅ سند ازدواج در صورت وجود (با آپوستیل)</li>\n  <li>✅ شناسنامه فرزندان</li>\n  <li>✅ مدارک تحصیلی / گواهینامه‌های دانشگاهی</li>\n  <li>✅ قرارداد کاری یا نامه پذیرش دانشگاه</li>\n  <li>✅ ۲ عکس پاسپورتی</li>\n  <li>✅ مدرک سکونت (قرارداد اجاره امضاشده یا نامه از میزبان)</li>\n  <li>✅ مدارک بیمه درمانی (برای دوره قبل از دریافت کارت زرد)</li>\n</ul>\n<p><strong>آپوستیل (Apostille)</strong> = مهر رسمی که اسناد خارجی را در سطح بین‌المللی به رسمیت می‌شناساند. قبل از خروج از کشور، از مرجع ذی‌صلاح کشورتان دریافت کنید.</p>`'
))

# Section 3: Housing Search
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک کی کرایہ مارکیٹ انتہائی مسابقتی ہے',
    'ur:`<p>بازار اجاره دانمارک بسیار رقابتی است — به‌ویژه در کپنهاگ. شروع جستجو قبل از رسیدن، برتری مهمی به شما می‌دهد.</p>\n<p><strong>بهترین پلتفرم‌ها:</strong></p>\n<ul>\n  <li><a href="https://www.boligportal.dk" target="_blank" rel="noopener">BoligPortal.dk</a> — بزرگ‌ترین پلتفرم اجاره خصوصی</li>\n  <li><a href="https://www.lejebolig.dk" target="_blank" rel="noopener">Lejebolig.dk</a> — انتخاب خوب، مناسب انگلیسی‌زبانان</li>\n  <li>گروه‌های فیسبوک: "Housing in Copenhagen for Expats"، "Aarhus Housing International"</li>\n  <li><a href="https://www.dba.dk" target="_blank" rel="noopener">DBA.dk</a> — کالای دست‌دوم + اجاره خصوصی</li>\n</ul>\n<p><strong>نشانه‌های هشداردهنده در آگهی‌ها:</strong></p>\n<ul>\n  <li>🚩 موجر در خارج از کشور است و نمی‌تواند حضوری ملاقات کند</li>\n  <li>🚩 قیمت به‌طور قابل توجهی پایین‌تر از بازار است (میانگین کپنهاگ برای یک خوابه: ۸٬۵۰۰–۱۲٬۰۰۰ DKK)</li>\n  <li>🚩 قبل از امضای قرارداد اجاره درخواست پرداخت می‌کند</li>\n  <li>🚩 عکسی ندارد یا عکس‌ها از سایت‌های املاک دزدیده شده‌اند</li>\n</ul>\n<p class="callout-warning">ودیعه در دانمارک طبق قانون به ۳ ماه اجاره محدود است. هر کس بیشتر بخواهد، قانون را نقض می‌کند.</p>`'
))

# Section 4: Banking before landing
TRANSLATIONS.append((
    'ur:`<p>آپ پہنچنے سے پہلے بین الاقوامی اکاؤنٹ کھول سکتے ہیں',
    'ur:`<p>می‌توانید قبل از رسیدن، حساب‌های بین‌المللی باز کنید که تا زمان دریافت حساب بانکی دانمارکی (که به شماره CPR نیاز دارد) کارآمد باشند.</p>\n<p><strong>حساب‌های توصیه‌شده پیش از ورود:</strong></p>\n<ul>\n  <li><strong>Wise (سابقاً TransferWise)</strong> — بهترین برای حواله‌های بین‌المللی، کارت چندارزی، فوری کار می‌کند</li>\n  <li><strong>Revolut</strong> — عالی برای خرج کردن در خارج، طرح رایگان موجود است</li>\n  <li><strong>Lunar</strong> — بانک دیجیتال دانمارکی که گاهی بدون شماره CPR قابل افتتاح است (شرایط فعلی را بررسی کنید)</li>\n</ul>\n<p>حداقل برای <strong>۲ ماه هزینه</strong> پول نقد یا وجوه قابل دسترس همراه بیاورید. حداقل ۳۰٬۰۰۰ DKK به‌عنوان ذخیره در نظر بگیرید.</p>`'
))

# Section 5: Language basics
TRANSLATIONS.append((
    'ur:`<p>ڈینش تلفظ غیر ملکیوں کے لیے واقعی مشکل ترین زبانوں میں سے ایک ہے',
    'ur:`<p>تلفظ دانمارکی واقعاً یکی از سخت‌ترین زبان‌ها برای خارجی‌هاست — هرچه زودتر شروع کنید، بهتر است. حقیقت این است: در دانمارک همه انگلیسی عالی صحبت می‌کنند. اما یادگیری دانمارکی درهای اجتماعی را باز می‌کند که برای انگلیسی‌زبانان بسته می‌ماند.</p>\n<p><strong>بهترین منابع پیش از ورود:</strong></p>\n<ul>\n  <li>🎧 <strong>Glossika</strong> — بهترین برای تلفظ، سیستم تکرار فاصله‌دار</li>\n  <li>📱 <strong>Babbel</strong> — درس‌های ساختارمند، برای دانمارکی بهتر از Duolingo</li>\n  <li>🎬 <strong>YouTube: "Learn Danish with DanishClass101"</strong></li>\n  <li>🎙️ <strong>پادکست: "Slow Danish"</strong> — گفتار واقعی با سرعت کم</li>\n</ul>\n<p>ابتدا این ۱۰ کلمه را بیاموزید: <em>tak (متشکرم)، undskyld (ببخشید/معذرت)، hej (سلام)، hejhej (خداحافظ)، ja/nej (بله/نه)، tak for mad (ممنون از غذا)، skål (به سلامتی!)، hvad (چه)، og (و)، er (است/هستند)</em></p>`'
))

# ============================================================
# CHAPTER 1 - First 72 Hours (sections are in chapter 1)
# ============================================================

# Section: Register Address
TRANSLATIONS.append((
    'ur:`<p>یہ <strong>سب سے پہلا کام</strong> ہے۔ باقی سب کچھ',
    'ur:`<p>این <strong>اولین کاری</strong> است که باید انجام دهید. همه چیز دیگر — شماره CPR (شناسه ملی دانمارک)، MitID (سیستم هویت دیجیتال دانمارک)، پزشک، حساب بانکی، کارت مالیاتی — همگی به داشتن آدرس ثبت‌شده بستگی دارد.</p>\n<p class="callout-warning">⏰ <strong>مهلت قانونی: ظرف ۵ روز از تاریخ اسکان</strong> (قانون CPR §۱۲). ثبت‌نام دیرهنگام جریمه دارد. همان لحظه که کلیدها را دریافت کردید، وقت Borgerservice را رزرو کنید.</p>\n<p><strong>چگونه این کار را انجام دهید:</strong></p>\n<ol class="step-list">\n  <li><span class="step-num">1</span> به <a href="https://www.borger.dk" target="_blank" rel="noopener">borger.dk</a> بروید و "Flytning til Danmark" را جستجو کنید یا شخصاً به دفتر Borgerservice (خدمات شهروندی) محلی مراجعه کنید.</li>\n  <li><span class="step-num">2</span> نیاز دارید به: پاسپورت + مدرک سکونت (قرارداد اجاره امضاشده، قرارداد اجاره فرعی، یا نامه میزبان).</li>\n  <li><span class="step-num">3</span> اگر موقتاً پیش دوست هستید: او باید نامه‌ای بنویسد و امضا کند که تأیید کند شما آنجا ساکن هستید. قالب آماده در borger.dk موجود است.</li>\n</ol>\n<p class="callout-warning">این مرحله را به "بعداً" موکول نکنید. بدون آدرس ثبت‌شده نمی‌توانید شماره CPR دریافت کنید.</p>`'
))

# Section: Get CPR Number
TRANSLATIONS.append((
    'ur:`<p>آپ کا CPR (ڈنمارک کا قومی شناختی نمبر) <strong>آپ کی ڈینش زندگی کا سب سے اہم نمبر ہے۔</strong>',
    'ur:`<p>شماره CPR شما (Civil Personal Registration — شماره ثبت شخصی مدنی) <strong>مهم‌ترین عدد در زندگی دانمارکی شماست.</strong> برای همه چیز لازم است: ویزیت پزشک، ثبت مالیاتی، بانکداری، کارت کتابخانه، عضویت در باشگاه، قرارداد تلفن — همه چیز.</p>\n<p><strong>فرمت:</strong> DDMMYY-XXXX (تاریخ تولد + ۴ رقم)</p>\n<p><strong>شهروندان اتحادیه اروپا:</strong> در International Citizen Service (ICS) ثبت‌نام کنید. اغلب همان روز اگر همه مدارک را داشته باشید.</p>\n<p><strong>شهروندان غیر اتحادیه اروپا:</strong> معمولاً بعد از تأیید مجوز اقامت به‌صورت خودکار صادر می‌شود. ممکن است ۲ تا ۸ هفته طول بکشد.</p>\n<p><strong>دفاتر ICS (مکان‌های اصلی):</strong></p>\n<ul>\n  <li>کپنهاگ: Gyldenløvesgade 11, 1600 Copenhagen V</li>\n  <li>آرهوس: Hack Kampmanns Plads 2</li>\n  <li>اودنسه: Flakhaven 2</li>\n  <li>آلبورگ: Godthåbsgade 8</li>\n</ul>\n<a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service" target="_blank" rel="noopener">→ رزرو وقت ICS آنلاین</a>`'
))

# Section: MitID
TRANSLATIONS.append((
    'ur:`<p>MitID (ڈنمارک کی ڈیجیٹل شناختی نظام) ڈنمارک کا قومی ڈیجیٹل شناختی نظام ہے',
    'ur:`<p>MitID (سیستم هویت دیجیتال دانمارک) سیستم هویت دیجیتال ملی دانمارک است. آن را به‌عنوان کلید اصلی تمام زندگی دیجیتال خود در دانمارک بدانید. بدون آن نمی‌توانید از اینها استفاده کنید: borger.dk، SKAT (اداره مالیات دانمارک)، e-Boks (نامه رسمی دولتی)، بانکداری آنلاین، Sundhed.dk، و ده‌ها سرویس دیگر.</p>`'
))

# Section: e-Boks
TRANSLATIONS.append((
    'ur:`<p>e-Boks ڈنمارک کا سرکاری ڈیجیٹل میل باکس ہے',
    'ur:`<p>e-Boks صندوق پستی دیجیتال رسمی دانمارک است. همه نامه‌ها از SKAT (اداره مالیات دانمارک)، Udbetaling Danmark، شهرداری شما، بانک شما و هر نهاد دولتی اینجا می‌آید. نه در صندوق پستی فیزیکی شما. نه در ایمیلتان. اینجا.</p>`'
))

# Section: NemKonto/Bank
TRANSLATIONS.append((
    'ur:`<p>آپ کو NemKonto (ڈنمارک میں سرکاری ادائیگیوں کے لیے بنیادی بینک اکاؤنٹ) کے لیے ڈینش بینک اکاؤنٹ کی ضرورت ہے',
    'ur:`<p>برای NemKonto (حساب بانکی اصلی برای پرداخت‌های دولتی — حسابی که دولت پول را به آن واریز می‌کند، از جمله استرداد مالیات و مزایا) به حساب بانکی دانمارکی نیاز دارید. اکثر بانک‌ها به شماره CPR نیاز دارند.</p>`'
))

# ============================================================
# CHAPTER 1 apps/digital section
# ============================================================

# Section: Apps grid (digital life)
TRANSLATIONS.append((
    'ur:`<div class="app-grid">',
    'ur:`<div class="app-grid">'
))

# ============================================================
# CHAPTER 2 - Papers & Legal Identity
# ============================================================

# Section: Residence permit types
TRANSLATIONS.append((
    'ur:`<table class="info-table">',
    'ur:`<table class="info-table">'
))

# Section: Residency permit overview
TRANSLATIONS.append((
    'ur:`<p>آپ کے رہائشی پرمٹ کی قسم ڈنمارک میں آپ کے حقوق کا تعین کرتی ہے',
    'ur:`<p>نوع مجوز اقامت شما حقوق شما را در دانمارک تعیین می‌کند. در اینجا یک مرور واضح آمده است:</p>`'
))

# Section: Permanent residency
TRANSLATIONS.append((
    'ur:`<p>عمومی اصول: ڈنمارک میں <strong>8 سال کا مسلسل قانونی قیام</strong>',
    'ur:`<p>قانون کلی: <strong>۸ سال اقامت قانونی مستمر</strong> در دانمارک. اما مسیرهای سریع‌تر هم وجود دارد:</p>`'
))

# Section: Citizenship
TRANSLATIONS.append((
    'ur:`<p>یورپ کی زیادہ مطالبے والی راہوں میں سے ایک، لیکن قابل قدر',
    'ur:`<p>یکی از مسیرهای پرتقاضاتر اروپا، اما ارزشمند:</p>`'
))

# Section: Tax overview
TRANSLATIONS.append((
    'ur:`<p>ہاں، ڈینش ٹیکس بہت زیادہ ہیں',
    'ur:`<p>بله، مالیات دانمارک بالا است. اینجا تصویری صادقانه از آنچه واقعاً می‌پردازید آمده است:</p>`'
))

# Section: Driving license
TRANSLATIONS.append((
    'ur:`<p>اگر آپ کے پاس EU/EEA ڈرائیونگ لائسنس ہے',
    'ur:`<p>اگر گواهینامه رانندگی اتحادیه اروپا/EEA دارید، می‌توانید آن را در دانمارک به‌صورت نامحدود استفاده کنید. تبدیل لازم نیست.</p>`'
))

# ============================================================
# CHAPTER 3 - Housing
# ============================================================

# Section: Housing fraud warning
TRANSLATIONS.append((
    'ur:`<p class="callout-warning" style="background:rgba(198,12,48,0.08)',
    'ur:`<p class="callout-warning" style="background:rgba(198,12,48,0.08);border-left:4px solid var(--brand-red);padding:14px 16px;border-radius:8px;margin-bottom:14px;"><strong>⚠️ کلاهبرداری مسکن بزرگ‌ترین خطر مالی برای تازه‌واردان به دانمارک است.</strong> آگهی‌های جعلی در Facebook Marketplace، موجران دروغین که ادعا می‌کنند در خارج هستند، و درخواست ودیعه برای "رزرو آپارتمان" قبل از بازدید، تازه‌واردان را تا <strong>۱۰٬۰۰۰ تا ۵۰٬۰۰۰ DKK</strong> متضرر کرده است.</p>`'
))

# Section: Types of housing
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں رہائش کی چار اہم اقسام ہیں',
    'ur:`<p>چهار نوع اصلی مسکن در دانمارک وجود دارد:</p>`'
))

# Section: Rental application tips
TRANSLATIONS.append((
    'ur:`<p>ڈینش مکان مالکان ہر اشتہار پر درجنوں درخواستیں وصول کرتے ہیں',
    'ur:`<p>موجران دانمارکی برای هر آگهی ده‌ها درخواست دریافت می‌کنند. اینجاست که درخواست شما متمایز می‌شود:</p>`'
))

# Section: Tenant rights
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں کرایہ داروں کا تحفظ مضبوط ہے',
    'ur:`<p>در دانمارک حمایت از مستأجران قوی است. این حقوق را بشناسید:</p>`'
))

# ============================================================
# CHAPTER 4 - Money & Banking
# ============================================================

# Section: NemKonto detailed
TRANSLATIONS.append((
    'ur:`<p><strong>NemKonto</strong> (ڈنمارک میں سرکاری ادائیگیوں کے لیے بنیادی بینک اکاؤنٹ) الگ بینک اکاؤنٹ نہیں ہے',
    'ur:`<p><strong>NemKonto</strong> (حساب بانکی اصلی برای پرداخت‌های دولتی) یک حساب بانکی جداگانه نیست — این نامی است که به حساب موجود می‌دهید تا دولت دانمارک بداند پول را کجا ارسال کند. استرداد مالیاتی، کمک هزینه کودک، پرداخت‌های بازنشستگی، مزایای بیکاری — همه به NemKonto شما می‌روند.</p>`'
))

# Section: Tax card (skattekort)
TRANSLATIONS.append((
    'ur:`<p>آپ کی <strong>skattekort</strong> (ٹیکس کارڈ) آجر کو بتاتی ہے',
    'ur:`<p><strong>skattekort</strong> (کارت مالیاتی) به کارفرما می‌گوید چه مقدار از حقوق شما کسر شود. بدون آن، کارفرما طبق قانون ملزم به کسر <strong>۵۵٪</strong> است — بالاترین نرخ اضطراری. این جریمه نیست، بلکه پیش‌فرض سیستم در غیاب کارت است. اما اگر ترتیب آن را ندهید، بیشتر اولین حقوق از دست می‌رود.</p>`'
))

# Section: Annual tax statement
TRANSLATIONS.append((
    'ur:`<p>ہر سال <strong>مارچ</strong> میں، SKAT آپ کی <strong>årsopgørelse</strong>',
    'ur:`<p>هر سال در <strong>مارس</strong>، SKAT (اداره مالیات دانمارک) <strong>årsopgørelse</strong> (اظهارنامه مالیاتی سالانه) شما را منتشر می‌کند. این میزان واقعی درآمد و مالیات پرداختی را با تخمین مقایسه می‌کند و محاسبه می‌کند که آیا بدهکارید یا مستحق استرداد هستید.</p>`'
))

# Section: MobilePay
TRANSLATIONS.append((
    'ur:`<p><strong>MobilePay</strong> تقریباً 44 لاکھ ڈینش لوگ استعمال کرتے ہیں',
    'ur:`<p><strong>MobilePay</strong> را تقریباً ۴٫۴ میلیون نفر دانمارکی — حدود ۷۵٪ جمعیت — استفاده می‌کنند. بدون آن نمی‌توانید در رستوران‌ها قبض تقسیم کنید، در غرفه‌های بازار بپردازید، در بسیاری از شهرها پارک کنید یا به دوستان دانمارکی پول بفرستید. این اختیاری نیست.</p>`'
))

# Section: Pension system
TRANSLATIONS.append((
    'ur:`<p>ڈینش پنشن سسٹم تین الگ ستونوں پر بنا ہے',
    'ur:`<p>سیستم بازنشستگی دانمارک بر سه رکن جداگانه بنا شده است:</p>`'
))

# Section: Bank comparison
TRANSLATIONS.append((
    'ur:`<p>زیادہ تر ڈینش بینکوں کو مکمل اکاؤنٹ کھولنے کے لیے CPR نمبر درکار ہے',
    'ur:`<p>اکثر بانک‌های دانمارکی برای افتتاح حساب کامل به شماره CPR نیاز دارند. اینجا مقایسه‌ای صادقانه آمده است:</p>`'
))

# ============================================================
# CHAPTER 5 - Healthcare
# ============================================================

# Section: Health card (sundhedskort)
TRANSLATIONS.append((
    'ur:`<p>آپ کا <strong>sundhedskort</strong> (صحت انشورنس کارڈ)',
    'ur:`<p><strong>sundhedskort</strong> (کارت بیمه درمانی) شما کارت پلاستیکی زرد رنگی است که حق شما برای مراقبت‌های بهداشتی رایگان دانمارک را اثبات می‌کند. به‌طور خودکار با پست می‌آید، معمولاً ۲ تا ۴ هفته پس از صدور شماره CPR.</p>`'
))

# Section: GP (praktiserende læge)
TRANSLATIONS.append((
    'ur:`<p>آپ کا GP (praktiserende læge — عمومی طبیب)',
    'ur:`<p>پزشک عمومی شما (praktiserende læge) <strong>دروازه ورودی کل سیستم بهداشتی دانمارک است.</strong> نمی‌توانید مستقیم به متخصص مراجعه کنید — همیشه ابتدا باید به پزشک عمومی بروید.</p>`'
))

# Section: Emergency numbers
TRANSLATIONS.append((
    'ur:`<p>یہ ڈنمارک میں جاننے والی سب سے اہم باتوں میں سے ایک ہے',
    'ur:`<p>این یکی از مهم‌ترین چیزهایی است که باید در دانمارک بدانید. هر دو شماره هدف کاملاً متفاوتی دارند:</p>`'
))

# Section: Dental care
TRANSLATIONS.append((
    'ur:`<p><strong>یہ تقریباً ہر نئے آنے والے کو حیران کرتا ہے:</strong> ڈنمارک میں بالغوں کے لیے دانتوں کی دیکھ بھال',
    'ur:`<p><strong>این تقریباً همه تازه‌واردان را شگفت‌زده می‌کند:</strong> مراقبت از دندان برای بزرگسالان در دانمارک در سیستم بهداشتی دولتی <strong>گنجانده نشده</strong> است. هزینه‌ها از جیب خودتان پرداخت می‌شود و هزینه‌های دندانپزشکی در دانمارک قابل توجه است.</p>`'
))

# Section: Mental health
TRANSLATIONS.append((
    'ur:`<p>کسی نئے ملک میں منتقل ہونا نفسیاتی طور پر سب سے مشکل تجربات میں سے ایک ہے',
    'ur:`<p>نقل مکان به کشوری جدید از نظر روانی یکی از سخت‌ترین تجربیات است. دانمارک سلامت روان را جدی می‌گیرد. سیستم اینگونه کار می‌کند:</p>`'
))

# Section: Sygeforsikring "denmark"
TRANSLATIONS.append((
    'ur:`<p><strong>Sygeforsikring "denmark"</strong> ایک غیر منافع بخش باہمی انشورنس فنڈ ہے',
    'ur:`<p><strong>Sygeforsikring "denmark"</strong> یک صندوق بیمه متقابل غیرانتفاعی است که بیش از ۲٫۳ میلیون دانمارکی به آن پیوسته‌اند. در ازای حق عضویت ماهانه اندک، بخشی از هزینه‌هایی که سیستم دولتی پوشش نمی‌دهد را بازمی‌گرداند.</p>`'
))

# ============================================================
# CHAPTER 6 - Children & Family
# ============================================================

# Section: Parental leave
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک کا والدین کی چھٹی (barsel) کا نظام دنیا کے سب سے فراخدلانہ نظاموں میں سے ایک ہے',
    'ur:`<p>سیستم مرخصی والدین در دانمارک (barsel) یکی از سخاوتمندانه‌ترین سیستم‌های جهان است. این سیستم در <strong>۲ اوت ۲۰۲۲</strong> اصلاح شد تا هر دو والدین از حقوق برابر و فردی برخوردار شوند.</p>`'
))

# Section: Childcare
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک کی سرکاری طور پر سبسڈی یافتہ بچوں کی نگہداشت عالمی معیار کی ہے',
    'ur:`<p>مراقبت از کودک یارانه‌ای دانمارک در سطح جهانی است. دولت بخش اعظم هزینه واقعی را می‌پردازد — شما <strong>حداکثر ۲۵٪ هزینه واقعی</strong> را پرداخت می‌کنید.</p>`'
))

# Section: Børnecheck (child benefit)
TRANSLATIONS.append((
    'ur:`<p><strong>Børnecheck</strong> (باضابطہ نام: børne- og ungeydelse)',
    'ur:`<p><strong>Børnecheck</strong> (نام رسمی: børne- og ungeydelse — børnetilskud یا کمک هزینه کودک) پرداخت معاف از مالیات دولتی برای هر کودک زیر ۱۸ سال است. نکته قابل توجه: <strong>نیازی به درخواست ندارید.</strong> به‌طور خودکار به NemKonto شما واریز می‌شود وقتی فرزندتان با شماره CPR ثبت شود.</p>`'
))

# Section: folkeskole
TRANSLATIONS.append((
    'ur:`<p><strong>folkeskole</strong> ڈنمارک کا سرکاری اسکول نظام ہے',
    'ur:`<p><strong>folkeskole</strong> (مدرسه دولتی دانمارک) سیستم مدرسه دولتی دانمارک است. رایگان است، شامل کتاب‌ها می‌شود، و از کلاس ۰ (سن ۶ سال) تا کلاس ۹ (سن ۱۵/۱۶ سال) با یک کلاس دهم اختیاری ادامه دارد.</p>`'
))

# Section: International schools
TRANSLATIONS.append((
    'ur:`<p>اگر آپ چند سالوں میں ڈنمارک چھوڑنے کا ارادہ رکھتے ہیں',
    'ur:`<p>اگر قصد دارید در عرض چند سال دانمارک را ترک کنید، یا آموزش با برنامه درسی انگلیسی را ترجیح می‌دهید، مدارس بین‌المللی گزینه خوبی هستند. این مدارس خصوصی هستند و شهریه دارند.</p>`'
))

# ============================================================
# CHAPTER 7 - Education & University
# ============================================================

# Section: Universities overview
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں آٹھ سرکاری یونیورسٹیاں اور درجنوں خصوصی ادارے ہیں',
    'ur:`<p>دانمارک هشت دانشگاه دولتی و ده‌ها مؤسسه تخصصی دارد، همگی به‌خوبی تأمین مالی شده و به‌طور مداوم در صدر دانشگاه‌های برتر اروپا قرار دارند.</p>`'
))

# Section: Tuition fees table
TRANSLATIONS.append((
    'ur:`<p><strong>شہریت کے مطابق ٹیوشن فیس:</strong></p>',
    'ur:`<p><strong>شهریه بر اساس تابعیت:</strong></p>`'
))

# Section: Free language courses
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک CPR نمبر والے تمام باشندوں کو مفت ڈنمارکی زبان کی تعلیم فراہم کرتا ہے',
    'ur:`<p>دانمارک برای همه ساکنان دارای شماره CPR آموزش رایگان زبان دانمارکی فراهم می‌کند. این یک حق قانونی است — کارفرما یا شهرداری موظف به تضمین آن است.</p>`'
))

# Section: University culture
TRANSLATIONS.append((
    'ur:`<p>ڈنمارکی یونیورسٹی ثقافت زیادہ تر ممالک سے مختلف ہوگی',
    'ur:`<p>فرهنگ دانشگاهی دانمارک با اکثر کشورها متفاوت خواهد بود. انتظار داشته باشید:</p>`'
))

# ============================================================
# CHAPTER 8 - Employment
# ============================================================

# Section: Work permit types
TRANSLATIONS.append((
    'ur:`<p>اگر آپ غیر EU/EEA شہری ہیں تو آپ کو کام کرنے کے لیے اقامت اور ورک پرمٹ کی ضرورت ہے',
    'ur:`<p>اگر شهروند غیر اتحادیه اروپا/EEA هستید، برای کار کردن به مجوز اقامت و کار نیاز دارید. پنج مسیر اصلی:</p>`'
))

# Section: Danish work culture
TRANSLATIONS.append((
    'ur:`<p>ڈنمارکی کام کی جگہیں زیادہ تر ثقافتوں سے بالکل مختلف طریقے سے کام کرتی ہیں',
    'ur:`<p>محیط کار دانمارکی به روشی کاملاً متفاوت از اکثر فرهنگ‌ها عمل می‌کند. درک این اصول از همان روز اول شما را مؤثر می‌کند:</p>`'
))

# Section: Minimum wage
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں کوئی قانونی کم از کم اجرت نہیں',
    'ur:`<p>در دانمارک حداقل دستمزد قانونی وجود ندارد — دستمزدها از طریق <strong>قراردادهای جمعی (overenskomster)</strong> تعیین می‌شود.</p>`'
))

# Section: Lønseddel (payslip)
TRANSLATIONS.append((
    'ur:`<p>آپ کا ڈنمارکی تنخواہ کا پرچہ (lønseddel) پہلے پہل الجھا دینے والا ہو سکتا ہے',
    'ur:`<p>فیش حقوق دانمارکی شما (lønseddel) در ابتدا ممکن است گیج‌کننده باشد. معنای هر ردیف:</p>`'
))

# Section: A-kasse
TRANSLATIONS.append((
    'ur:`<p><strong>A-kasse</strong> (arbejdsløshedskasse) ڈنمارک کا بے روزگاری انشورنس نظام ہے',
    'ur:`<p><strong>A-kasse</strong> (صندوق بیمه بیکاری) سیستم بیمه بیکاری دانمارک است. <strong>داوطلبانه است، نه خودکار</strong> — باید عضو شوید و حق عضویت بپردازید.</p>`'
))

# Section: Trade unions (Fagforeninger)
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں یونین رکنیت کی شرح دنیا کی بلند ترین میں سے ہے',
    'ur:`<p>نرخ عضویت اتحادیه در دانمارک از بالاترین‌های جهان است — حدود ۶۷٪. اینجا اتحادیه‌ها کمتر درباره اعتصاب و بیشتر درباره امنیت قرارداد و حمایت قانونی هستند.</p>`'
))

# Section: Working before CPR
TRANSLATIONS.append((
    'ur:`<p>یہ سب سے عام سوالوں میں سے ایک ہے — اور جواب آپ کی شہریت پر منحصر ہے',
    'ur:`<p>این یکی از رایج‌ترین سؤالات است — و پاسخ به تابعیت شما بستگی دارد:</p>`'
))

# ============================================================
# CHAPTER 9 - Startups & Business
# ============================================================

# Section: Business structures
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک کاروبار کے لیے کئی قانونی ڈھانچے پیش کرتا ہے',
    'ur:`<p>دانمارک چندین ساختار حقوقی برای کسب‌وکار ارائه می‌دهد. انتخاب درست به تحمل ریسک و برنامه‌های رشد شما بستگی دارد:</p>`'
))

# Section: CVR number
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں ہر کاروبار ایک منفرد <strong>CVR نمبر</strong>',
    'ur:`<p>هر کسب‌وکاری در دانمارک با یک <strong>شماره CVR</strong> منحصربه‌فرد (Centralt Virksomhedsregister — ثبت مرکزی شرکت‌ها) ثبت می‌شود. این شناسه کسب‌وکار شماست — معادل شماره CPR شخصی.</p>`'
))

# Section: Self-employed tax
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں خود روزگار کے طور پر، آپ کی ٹیکس صورتحال ملازم سے زیادہ پیچیدہ ہے',
    'ur:`<p>به‌عنوان خوداشتغال در دانمارک، وضعیت مالیاتی شما پیچیده‌تر از یک کارمند است. اینجا موارد ضروری آمده است:</p>`'
))

# Section: Startup ecosystem
TRANSLATIONS.append((
    'ur:`<p>کوپن ہیگن خاموشی سے یورپ کے مضبوط ترین اسٹارٹ اپ مراکز میں سے ایک بن گئی ہے',
    'ur:`<p>کپنهاگ آرام‌آرام به یکی از قوی‌ترین مراکز استارتاپی اروپا تبدیل شده و به‌طور مداوم در ۱۰ شهر برتر استارتاپی اروپا قرار دارد.</p>`'
))

# Section: Startup Denmark Visa
TRANSLATIONS.append((
    'ur:`<p><strong>Startup Denmark ویزا</strong> غیر EU/EEA شہریوں کو ڈنمارک میں خاص طور پر کمپنی شروع کرنے کے لیے آنے کی اجازت دیتا ہے',
    'ur:`<p><strong>ویزای Startup Denmark</strong> به شهروندان غیر اتحادیه اروپا/EEA اجازه می‌دهد به دانمارک بیایند تا به‌طور خاص شرکت تأسیس کنند. این مستلزم ارزیابی طرح کسب‌وکار توسط هیئتی از کارشناسان است.</p>`'
))

# ============================================================
# CHAPTER 10 - Transport
# ============================================================

# Section: Cycling culture
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں لوگوں سے زیادہ سائیکلیں ہیں',
    'ur:`<p>دانمارک دوچرخه بیشتر از انسان دارد (حدود ۴٫۲ میلیون دوچرخه برای ۵٫۹ میلیون نفر). در کپنهاگ <strong>۶۲٪ ساکنان روزانه برای کار یا تحصیل دوچرخه می‌رانند</strong> — حتی در زمستان، حتی در باران. این سرگرمی نیست، بلکه زیرساخت است.</p>`'
))

# Section: Public transport (Rejsekort)
TRANSLATIONS.append((
    'ur:`<p>ڈینش پبلک ٹرانسپورٹ شہروں میں بہترین اور شہروں کے درمیان بہت اچھا ہے',
    'ur:`<p>حمل‌ونقل عمومی دانمارکی در شهرها عالی و بین شهرها بسیار خوب است. بر اساس <strong>سیستم منطقه‌ای</strong> کار می‌کند — هرچه مناطق بیشتری رد کنید، بیشتر می‌پردازید.</p>`'
))

# Section: Cars and registreringsafgift
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں کار کی خریداری کے ٹیکس دنیا میں سب سے زیادہ ہیں',
    'ur:`<p>مالیات خرید خودرو در دانمارک از بالاترین‌های جهان است — <strong>registreringsafgift</strong> (مالیات ثبت) می‌تواند تا ۱۵۰٪ قیمت خودرو برسد. این سیاستی عمدی برای ترویج دوچرخه‌سواری و حمل‌ونقل عمومی است.</p>`'
))

# ============================================================
# CHAPTER 11 - Language
# ============================================================

# Section: Why learn Danish
TRANSLATIONS.append((
    'ur:`<p>تقریباً ہر ڈینش شہری انگریزی بولتا ہے — تو ڈینش کیوں سیکھیں',
    'ur:`<p>تقریباً هر شهروند دانمارکی انگلیسی صحبت می‌کند — پس چرا دانمارکی یاد بگیریم؟</p>`'
))

# Section: Free language classes (Danskuddannelse)
TRANSLATIONS.append((
    'ur:`<p>اگر آپ CPR نمبر کے ساتھ غیر EU رہائشی ہیں',
    'ur:`<p>اگر مقیم غیر اتحادیه اروپا با شماره CPR هستید، تا ۳ سال حق قانونی برای آموزش رایگان زبان دانمارکی (Danskuddannelse) دارید. شهروندان اتحادیه اروپا می‌توانند با قیمت یارانه‌ای دسترسی داشته باشند.</p>`'
))

# Section: Danish pronunciation challenges
TRANSLATIONS.append((
    'ur:`<p>ڈینش زبان نے مشکل ہونے کی اپنی شہرت درست طور پر کمائی ہے',
    'ur:`<p>زبان دانمارکی شهرت دشواری خود را به‌حق کسب کرده است. اینجاست که واقعاً سخت می‌شود:</p>`'
))

# Section: Language apps
TRANSLATIONS.append((
    'ur:`<div class="app-grid">',
    'ur:`<div class="app-grid">'
))

# ============================================================
# CHAPTER 12 - Culture & Social Life
# ============================================================

# Section: Hygge
TRANSLATIONS.append((
    'ur:`<p><strong>Hygge</strong> (تلفظ: "ہو-گا") ایک ڈینش تصور ہے',
    'ur:`<p><strong>هیگه (Hygge)</strong> (مفهوم دانمارکی آرامش و صمیمیت) (تلفظ: "هوگا") مفهومی دانمارکی است که هیچ معادل مستقیم فارسی ندارد. یک کیفیت حضور را توصیف می‌کند — فضایی آرام و دلپذیر که در آن افراد احساس امنیت، آرامش و پیوند می‌کنند.</p>`'
))

# Section: Janteloven
TRANSLATIONS.append((
    'ur:`<p><strong>Janteloven</strong> ("قانون یانتے") غیر تحریری مساواتی اصولوں کا ایک مجموعہ ہے',
    'ur:`<p><strong>Janteloven</strong> (قانون یانته — اصل فرهنگی برابری) مجموعه‌ای از اصول برابری‌طلبانه نانوشته است. از رمان Aksel Sandemose در سال ۱۹۳۳ ریشه می‌گیرد. اصل اساسی: خود را بهتر از دیگران ندانید.</p>`'
))

# Section: Danish friendships
TRANSLATIONS.append((
    'ur:`<p>بہت سے تارکین وطن ڈنمارک میں ڈینش لوگوں کو دوستانہ لیکن دوست بنانا مشکل بتاتے ہیں',
    'ur:`<p>بسیاری از مهاجران می‌گویند دانمارکی‌ها دوستانه اما سخت برای دوستی هستند. این واقعی است — و هیچ ربطی به شخص شما ندارد.</p>`'
))

# Section: Foreningsliv (associations)
TRANSLATIONS.append((
    'ur:`<p><strong>Foreningsliv</strong> (اجتمائی زندگی) ڈینش شہری ثقافت کا مرکز ہے',
    'ur:`<p><strong>Foreningsliv</strong> (زندگی انجمنی) در مرکز فرهنگ مدنی دانمارکی قرار دارد. دانمارک حدود ۱۰۰٬۰۰۰ انجمن ثبت‌شده برای ۶ میلیون ساکن دارد.</p>`'
))

# Section: Danish holidays
TRANSLATIONS.append((
    'ur:`<p>ڈینش تہوار اور اہم ثقافتی تاریخیں',
    'ur:`<p>تعطیلات و تاریخ‌های مهم فرهنگی دانمارک:</p>`'
))

# Section: Danish food culture
TRANSLATIONS.append((
    'ur:`<p>ڈینش کھانے کی ثقافت ایک انقلاب سے گزری ہے',
    'ur:`<p>فرهنگ غذایی دانمارکی دستخوش انقلابی شده است. غذای روزمره دانمارکی:</p>`'
))

# ============================================================
# CHAPTER 13 - Dating & Relationships
# ============================================================

# Section: Danish dating norms
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں ڈیٹنگ براہ راست اور مساواتی ہے',
    'ur:`<p>قرار ملاقات در دانمارک مستقیم و برابری‌طلب است. ویژگی‌های اصلی:</p>`'
))

# Section: Family reunification (familiesammenføring)
TRANSLATIONS.append((
    'ur:`<p>اگر آپ ڈنمارک میں ہیں اور غیر ملکی پارٹنر یا شریک حیات کو لانا چاہتے ہیں',
    'ur:`<p>اگر در دانمارک هستید و می‌خواهید شریک زندگی خارجی خود را بیاورید، این فرآیند <strong>familiesammenføring</strong> (اجتماع خانوادگی) نامیده می‌شود. قوانین سختگیرانه هستند.</p>`'
))

# Section: LGBTQ+ rights
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک دنیا کے سب سے LGBTQ+ دوستانہ ممالک میں سے ایک ہے',
    'ur:`<p>دانمارک یکی از دوست‌دارترین کشورهای جهان برای LGBTQ+ است. ازدواج همجنس از سال ۲۰۱۲ قانونی است — اولین در جهان (۱۹۸۹ — مشارکت).</p>`'
))

# Section: Unmarried parents rights
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں غیر شادی شدہ والدین کے لیے مضبوط حقوق ہیں',
    'ur:`<p>در دانمارک حقوق قوی برای والدین غیرمتأهل وجود دارد:</p>`'
))

# Section: Divorce (Familieretshuset)
TRANSLATIONS.append((
    'ur:`<p><strong>Familieretshuset</strong> ڈینش سرکاری ایجنسی ہے جو خاندانی معاملات سنبھالتی ہے',
    'ur:`<p><strong>Familieretshuset</strong> آژانس دولتی دانمارکی است که امور خانوادگی را مدیریت می‌کند — طلاق، نفقه، حق ملاقات با فرزند و حضانت.</p>`'
))

# ============================================================
# CHAPTER 14 - Mental Health & Wellbeing
# ============================================================

# Section: Immigrant mental health
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں ذہنی صحت کو سنجیدگی سے لیا جاتا ہے',
    'ur:`<p>در دانمارک سلامت روان جدی گرفته می‌شود. استرس انطباق پس از نقل مکان طبیعی است — کمک خواستن نشانه ضعف نیست، بلکه نشانه قدرت است.</p>`'
))

# Section: SAD/Light therapy
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک شمال میں واقع ہے — سردیوں میں کوپن ہیگن میں دن صرف 7 گھنٹے کا ہوتا ہے',
    'ur:`<p>دانمارک در شمال قرار دارد — در زمستان روز در کپنهاگ فقط ۷ ساعت است. این روی خلق‌وخو و انرژی بسیاری از ساکنان تأثیر می‌گذارد.</p>`'
))

# Section: Crisis support
TRANSLATIONS.append((
    'ur:`<p>اگر آپ جذباتی بحران سے گزر رہے ہیں تو فوری مدد دستیاب ہے',
    'ur:`<p>اگر در بحران عاطفی هستید، کمک فوری در دسترس است:</p>`'
))

# Section: Community/loneliness
TRANSLATIONS.append((
    'ur:`<p>تنہائی ڈنمارک میں نئے آنے والوں کے لیے سب سے بڑے چیلنجوں میں سے ایک ہے',
    'ur:`<p>تنهایی یکی از بزرگ‌ترین چالش‌ها برای تازه‌واردان به دانمارک است. دانمارکی‌ها دایره‌های اجتماعی از دوران مدرسه دارند.</p>`'
))

# Section: Burnout/sygedagpenge
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک کی کام کی ثقافت بہبود کی حفاظت کے لیے ڈیزائن کی گئی ہے',
    'ur:`<p>فرهنگ کاری دانمارک برای حفاظت از رفاه طراحی شده است — اما فرسودگی شغلی همچنان یک مسئله مهم است.</p>`'
))

# ============================================================
# CHAPTER 15 - Rights & Advocacy
# ============================================================

# Section: Anti-discrimination (Ligebehandlingsloven)
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں امتیازی سلوک کے خلاف مضبوط قانونی تحفظ موجود ہے',
    'ur:`<p>در دانمارک حمایت قانونی قوی در برابر تبعیض وجود دارد. حقوق اصلی:</p>`'
))

# Section: Housing tribunal (huslejenævn)
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں کرایہ داروں کے حقوق کا مضبوط تحفظ ہے',
    'ur:`<p>در دانمارک حمایت قوی از حقوق مستأجران وجود دارد. اصول اصلی:</p>`'
))

# Section: Police complaints
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں پولیس کی شکایات کے لیے آزاد ادارہ موجود ہے',
    'ur:`<p>در دانمارک یک نهاد مستقل برای شکایات از پلیس وجود دارد:</p>`'
))

# Section: Ombudsman
TRANSLATIONS.append((
    'ur:`<p><strong>Ombudsmanden</strong> (پارلیمانی محتسب)',
    'ur:`<p><strong>Ombudsmanden</strong> (بازرس پارلمانی) نظارت می‌کند که آیا نهادهای دولتی مطابق قانون و عدالت عمل می‌کنند.</p>`'
))

# Section: Legal aid (retshjælp)
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں قانونی مدد محدود آمدنی کے باوجود بھی دستیاب ہے',
    'ur:`<p>در دانمارک کمک حقوقی حتی با درآمد محدود هم در دسترس است.</p>`'
))

# Section: SIRI/Udlændingenævnet
TRANSLATIONS.append((
    'ur:`<p>ڈنمارک میں رہنے کا آپ کا حق سب سے بنیادی ہے',
    'ur:`<p>حق اقامت شما در دانمارک اساسی‌ترین چیز است. آن را به‌صورت فعالانه حفاظت کنید.</p>`'
))

# Now let's apply all translations
content = read_file()
print(f"File length: {len(content)} chars")

# Count ur: backtick occurrences
ur_count = content.count('ur:`')
print(f"ur: backtick count: {ur_count}")

# We need a smarter approach - find each ur: block and add fa: after it
# Each ur: block ends with a backtick followed by either } or ,
# Pattern: ur:`...content...` followed by }  or  ` }  or  ` }\n

import re

# Count replacements
replaced = 0

for ur_snippet, replacement in TRANSLATIONS:
    if ur_snippet in content:
        content = content.replace(ur_snippet, replacement, 1)
        replaced += 1
    else:
        print(f"NOT FOUND: {ur_snippet[:80]}")

print(f"Replacements made: {replaced}")
fa_count = content.count('fa:`')
print(f"fa: backtick count after: {fa_count}")

write_file(content)
print("Done!")
