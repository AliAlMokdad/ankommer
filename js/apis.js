/* ═══════════════════════════════════════════════════════
   ANKOMMER — Live API Integrations
   Exchange Rates · DAWA · Weather · Rejseplanen · Jobs
═══════════════════════════════════════════════════════ */

const APIs = (() => {

  // Local XSS guard — app.js loads after apis.js so we can't share the one from there
  const esc = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  /* ══════════════════════════════════════════════════════
     1. EXCHANGE RATES — open.er-api.com (free, no key)
  ══════════════════════════════════════════════════════ */
  let cachedRates = null;
  let ratesLastFetched = 0;

  const fetchRates = async () => {
    if (cachedRates && Date.now() - ratesLastFetched < 3600000) return cachedRates;
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/DKK');
      const data = await res.json();
      if (data.result === 'success') {
        cachedRates = data.rates;
        ratesLastFetched = Date.now();
        window.liveRates = cachedRates;
        return cachedRates;
      }
    } catch (e) {
      console.warn('Exchange rate fetch failed, using fallback rates');
    }
    const fallback = { EUR: 0.1342, USD: 0.1448, GBP: 0.1148, NOK: 1.541, SEK: 1.572, CHF: 0.131 };
    window.liveRates = fallback;
    return fallback;
  };

  const formatMultiCurrency = (dkk, rates) => {
    if (!rates) return '';
    const parts = [];
    if (rates.EUR) parts.push(`<span>€${Math.round(dkk * rates.EUR).toLocaleString()}</span>`);
    if (rates.USD) parts.push(`<span>$${Math.round(dkk * rates.USD).toLocaleString()}</span>`);
    if (rates.GBP) parts.push(`<span>£${Math.round(dkk * rates.GBP).toLocaleString()}</span>`);
    return parts.join('<span class="rate-dot">·</span>');
  };

  const initExchangeRates = async () => {
    const rates = await fetchRates();

    // Update exchange rate card in daily bar
    const rateCard = document.getElementById('daily-exchange-val');
    if (rateCard && rates.EUR) {
      rateCard.innerHTML = `
        <span class="rate-pair">1 DKK = €${rates.EUR.toFixed(4)}</span>
        <span class="rate-pair">= $${rates.USD?.toFixed(4) || '—'}</span>
      `;
    }

    // Patch any already-rendered budget totals
    document.addEventListener('budgetCalculated', (e) => {
      const totalNote = document.getElementById('col-total-note');
      if (totalNote && e.detail?.total) {
        totalNote.innerHTML = formatMultiCurrency(e.detail.total, rates);
      }
    });
  };

  /* ══════════════════════════════════════════════════════
     2. DAWA — Danmarks Adresser Web API (free, no key)
  ══════════════════════════════════════════════════════ */

  // 2024 municipal tax rates
  const KOMMUNE_RATES = {
    'København': 23.80, 'Frederiksberg': 23.40, 'Bornholm': 26.30,
    'Gentofte': 22.80, 'Lyngby-Taarbæk': 22.50, 'Rudersdal': 22.80,
    'Aarhus': 24.52, 'Odense': 25.30, 'Aalborg': 25.30,
    'Randers': 25.40, 'Kolding': 25.20, 'Vejle': 24.10,
    'Horsens': 25.30, 'Silkeborg': 25.30, 'Herning': 25.20,
    'Helsingør': 24.50, 'Hillerød': 24.90, 'Hørsholm': 22.40,
    'Greve': 24.30, 'Roskilde': 24.10, 'Lejre': 25.70,
    'Esbjerg': 25.60, 'Fredericia': 25.50, 'Viborg': 25.30,
    'Svendborg': 25.30, 'Næstved': 25.90, 'Holbæk': 25.70,
    'Slagelse': 25.80, 'Ringsted': 25.80, 'Faxe': 25.80,
    'Køge': 24.70, 'Ishøj': 24.80, 'Brøndby': 25.00,
    'Glostrup': 24.80, 'Hvidovre': 24.40, 'Rødovre': 24.50,
    'Ballerup': 25.40, 'Gladsaxe': 24.50, 'Herlev': 24.80,
    'Albertslund': 25.50, 'Taarnby': 24.70, 'Dragør': 24.50,
    'Furesø': 23.80, 'Allerød': 23.80, 'Fredensborg': 24.60,
    'Gribskov': 25.00, 'Halsnæs': 26.10, 'Frederikssund': 25.30,
    'Egedal': 25.00, 'Solrød': 24.30, 'Stevns': 25.80,
    'Vordingborg': 26.70, 'Lolland': 26.90, 'Guldborgsund': 26.40,
    'Odsherred': 26.40, 'Kalundborg': 26.40, 'Sorø': 25.80,
    'Middelfart': 25.00, 'Assens': 25.30, 'Faaborg-Midtfyn': 25.50,
    'Kerteminde': 25.70, 'Nyborg': 25.50, 'Nordfyns': 25.80,
    'Langeland': 27.00, 'Ærø': 27.20, 'Haderslev': 25.30,
    'Billund': 24.30, 'Fanø': 24.00, 'Tønder': 26.00,
    'Aabenraa': 25.10, 'Sønderborg': 25.20, 'Varde': 25.40,
    'Vejen': 25.30, 'Frederikshavn': 27.00, 'Vesthimmerlands': 26.50,
    'Rebild': 25.30, 'Mariagerfjord': 26.10, 'Jammerbugt': 26.00,
    'Thisted': 26.80, 'Morsø': 27.00, 'Struer': 26.80,
    'Holstebro': 25.90, 'Lemvig': 26.60, 'Skive': 26.60,
    'Ringkøbing-Skjern': 25.80, 'Ikast-Brande': 25.80, 'Hedensted': 24.60,
    'Skanderborg': 24.00, 'Favrskov': 24.80, 'Norddjurs': 26.40,
    'Syddjurs': 25.70,
  };

  const KOMMUNE_INFO = {
    'København':     { region: 'Capital Region',       hospital: 'Rigshospitalet / Bispebjerg',     borgerservice: 'Multiple offices — borger.dk' },
    'Frederiksberg': { region: 'Capital Region',       hospital: 'Frederiksberg Hospital',          borgerservice: 'Rådhuset, Smallegade 1' },
    'Aarhus':        { region: 'Central Denmark',      hospital: 'Aarhus University Hospital (AUH)',borgerservice: 'Store Torv 1, Aarhus C' },
    'Odense':        { region: 'Southern Denmark',     hospital: 'Odense University Hospital (OUH)',borgerservice: 'Odense Rådhus, Flakhaven' },
    'Aalborg':       { region: 'Northern Jutland',     hospital: 'Aalborg University Hospital',     borgerservice: 'Aalborg Rådhus, Gammeltorv' },
    'Esbjerg':       { region: 'Southern Denmark',     hospital: 'Hospital Southwest Jutland',      borgerservice: 'Torvegade 74, Esbjerg' },
    'Roskilde':      { region: 'Zealand Region',       hospital: 'Roskilde Hospital (Sjællands)',   borgerservice: 'Roskilde Rådhus' },
    'Helsingør':     { region: 'Capital Region',       hospital: 'Nordsjællands Hospital',          borgerservice: 'Stengade 72, Helsingør' },
    'Vejle':         { region: 'Southern Denmark',     hospital: 'Vejle Hospital (Lillebælt)',       borgerservice: 'Kirketorvet 22, Vejle' },
    'Viborg':        { region: 'Central Denmark',      hospital: 'Regionshospital Viborg',          borgerservice: 'Rødevej 3, Viborg' },
  };

  const getKommuneInfo = (kommNavn) => {
    return KOMMUNE_INFO[kommNavn] || {
      region: 'Denmark',
      hospital: 'Your regional hospital',
      borgerservice: 'Local Borgerservice office (find at borger.dk)'
    };
  };

  const createDAWAAutocomplete = (inputId, suggestionsId, onSelect) => {
    const input = document.getElementById(inputId);
    const suggestions = document.getElementById(suggestionsId);
    if (!input || !suggestions) return;

    let debounceTimer;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const q = input.value.trim();
      if (q.length < 2) { suggestions.classList.add('hidden'); suggestions.innerHTML = ''; return; }
      debounceTimer = setTimeout(() => fetchDAWASuggestions(q, suggestions, input, onSelect), 280);
    });

    input.addEventListener('keydown', (e) => {
      const items = suggestions.querySelectorAll('.dawa-item');
      const active = suggestions.querySelector('.dawa-item.active');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = active ? active.nextElementSibling : items[0];
        if (next) { active?.classList.remove('active'); next.classList.add('active'); next.scrollIntoView({ block: 'nearest' }); }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = active ? active.previousElementSibling : items[items.length - 1];
        if (prev) { active?.classList.remove('active'); prev.classList.add('active'); prev.scrollIntoView({ block: 'nearest' }); }
      } else if (e.key === 'Enter') {
        const activeItem = suggestions.querySelector('.dawa-item.active');
        if (activeItem) { e.preventDefault(); activeItem.click(); }
      } else if (e.key === 'Escape') {
        suggestions.classList.add('hidden');
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.add('hidden');
      }
    });
  };

  const fetchDAWASuggestions = async (query, suggestionsEl, inputEl, onSelect) => {
    try {
      const res = await fetch(`https://api.dataforsyningen.dk/adresser/autocomplete?q=${encodeURIComponent(query)}&per_side=7&srid=4326`);
      const data = await res.json();

      if (!data.length) {
        suggestionsEl.innerHTML = '<div class="dawa-no-results">No addresses found — try more of the street name</div>';
        suggestionsEl.classList.remove('hidden');
        return;
      }

      suggestionsEl.innerHTML = data.map(item => `
        <div class="dawa-item"
          data-tekst="${esc(item.tekst || '')}"
          data-lat="${esc(item.adresse?.y || '')}"
          data-lon="${esc(item.adresse?.x || '')}"
          data-kommune="${esc(item.adresse?.kommunenavn || '')}"
          data-postnr="${esc(item.adresse?.postnr || '')}"
          data-postnrnavn="${esc(item.adresse?.postnrnavn || '')}">
          <span class="dawa-street">${esc(item.tekst || '')}</span>
        </div>
      `).join('');

      suggestionsEl.querySelectorAll('.dawa-item').forEach(item => {
        item.addEventListener('click', () => {
          inputEl.value = item.dataset.tekst;
          suggestionsEl.classList.add('hidden');
          if (onSelect) onSelect({
            text:        item.dataset.tekst,
            lat:         parseFloat(item.dataset.lat) || null,
            lon:         parseFloat(item.dataset.lon) || null,
            kommune:     item.dataset.kommune,
            postnr:      item.dataset.postnr,
            postnrnavn:  item.dataset.postnrnavn,
          });
        });
      });

      suggestionsEl.classList.remove('hidden');
    } catch (e) {
      console.warn('DAWA fetch failed:', e);
    }
  };

  const initKommuneFinder = () => {
    if (!document.getElementById('dawa-input')) return;

    createDAWAAutocomplete('dawa-input', 'dawa-suggestions', (addr) => {
      const resultEl = document.getElementById('dawa-result');
      if (!resultEl) return;

      const kommune = addr.kommune;
      const taxRate = KOMMUNE_RATES[kommune] ?? 25.0;
      const info    = getKommuneInfo(kommune);
      const cheapest = Object.entries(KOMMUNE_RATES).sort((a,b) => a[1]-b[1]).slice(0,3).map(([k,r]) => `${k} (${r}%)`).join(', ');
      const diff    = (taxRate - 23.80).toFixed(2);
      const vsLabel = parseFloat(diff) >= 0 ? `+${diff}%` : `${diff}%`;
      const vsColor = parseFloat(diff) > 0 ? '#e55' : '#5a5';

      resultEl.innerHTML = `
        <div class="dawa-result-card">
          <div class="dawa-result-header">
            <div class="dawa-kommune-badge">
              <span class="dawa-flag">📍</span>
              <span class="dawa-kommune-name">${kommune || 'Unknown'} Kommune</span>
            </div>
            <div class="dawa-postnr-badge">${addr.postnr} ${addr.postnrnavn}</div>
          </div>

          <div class="dawa-stats-grid">
            <div class="dawa-stat-card dawa-stat-tax">
              <div class="dawa-stat-label">Municipal tax rate</div>
              <div class="dawa-stat-val">${taxRate}%</div>
              <div class="dawa-stat-sub" style="color:${vsColor}">${vsLabel} vs Copenhagen</div>
            </div>
            <div class="dawa-stat-card">
              <div class="dawa-stat-label">Region</div>
              <div class="dawa-stat-val" style="font-size:0.95rem">${info.region}</div>
            </div>
            <div class="dawa-stat-card">
              <div class="dawa-stat-label">Your hospital</div>
              <div class="dawa-stat-val" style="font-size:0.85rem;line-height:1.3">${info.hospital}</div>
            </div>
            <div class="dawa-stat-card">
              <div class="dawa-stat-label">Borgerservice</div>
              <div class="dawa-stat-val" style="font-size:0.82rem;line-height:1.3">${info.borgerservice}</div>
            </div>
          </div>

          <div class="dawa-tip">💡 Lowest tax rates in Denmark: ${cheapest}</div>

          <button class="dawa-use-rate-btn" data-rate="${taxRate}" data-kommune="${kommune}">
            → Use ${taxRate}% in Salary Calculator
          </button>
        </div>
      `;

      resultEl.classList.remove('hidden');

      resultEl.querySelector('.dawa-use-rate-btn')?.addEventListener('click', (e) => {
        const rate = e.currentTarget.dataset.rate;
        const kNavn = e.currentTarget.dataset.kommune;
        const muniSelect = document.getElementById('salary-municipality');
        if (muniSelect) {
          let found = false;
          for (let opt of muniSelect.options) {
            if (parseFloat(opt.value) === parseFloat(rate)) { opt.selected = true; found = true; break; }
          }
          if (!found) {
            const opt = new Option(`${kNavn} (${rate}%)`, rate, true, true);
            muniSelect.add(opt);
          }
          document.getElementById('salary-tool')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          window.App?.showToast?.(`Tax rate set to ${rate}% (${kNavn} Kommune)`, 'success');
        }
      });
    });
  };

  /* ══════════════════════════════════════════════════════
     3. WEATHER PLANNER — DMI Climate Normals 1991–2020
  ══════════════════════════════════════════════════════ */

  const CLIMATE = {
    cph: {
      name: 'Copenhagen',
      months: [
        { name:'January',   avg:1.8,  min:-1.2, max:4.8,  rain:49,  rainDays:17, sun:1.8, daylight:7.5,  snow:true  },
        { name:'February',  avg:1.9,  min:-1.4, max:5.2,  rain:37,  rainDays:13, sun:2.9, daylight:9.2,  snow:true  },
        { name:'March',     avg:4.5,  min:1.0,  max:8.0,  rain:41,  rainDays:14, sun:4.5, daylight:11.9, snow:false },
        { name:'April',     avg:8.9,  min:4.4,  max:13.4, rain:38,  rainDays:11, sun:6.3, daylight:14.1, snow:false },
        { name:'May',       avg:13.8, min:9.1,  max:18.5, rain:42,  rainDays:10, sun:7.8, daylight:16.5, snow:false },
        { name:'June',      avg:17.2, min:12.8, max:21.6, rain:54,  rainDays:11, sun:8.1, daylight:17.5, snow:false },
        { name:'July',      avg:19.4, min:14.9, max:23.9, rain:65,  rainDays:13, sun:7.9, daylight:17.0, snow:false },
        { name:'August',    avg:19.3, min:14.8, max:23.8, rain:66,  rainDays:13, sun:7.1, daylight:15.1, snow:false },
        { name:'September', avg:15.3, min:11.1, max:19.5, rain:62,  rainDays:13, sun:5.4, daylight:12.5, snow:false },
        { name:'October',   avg:10.4, min:6.8,  max:14.0, rain:59,  rainDays:16, sun:3.2, daylight:10.0, snow:false },
        { name:'November',  avg:5.9,  min:3.0,  max:8.8,  rain:56,  rainDays:17, sun:1.8, daylight:8.0,  snow:false },
        { name:'December',  avg:3.0,  min:0.3,  max:5.7,  rain:55,  rainDays:17, sun:1.2, daylight:7.0,  snow:true  },
      ]
    },
    aar: {
      name: 'Aarhus',
      months: [
        { name:'January',   avg:1.2,  min:-1.8, max:4.2,  rain:52,  rainDays:17, sun:1.6, daylight:7.4,  snow:true  },
        { name:'February',  avg:1.4,  min:-2.0, max:4.8,  rain:39,  rainDays:13, sun:2.7, daylight:9.1,  snow:true  },
        { name:'March',     avg:4.0,  min:0.5,  max:7.5,  rain:44,  rainDays:14, sun:4.3, daylight:11.9, snow:false },
        { name:'April',     avg:8.3,  min:3.8,  max:12.8, rain:40,  rainDays:11, sun:6.2, daylight:14.3, snow:false },
        { name:'May',       avg:13.2, min:8.5,  max:17.9, rain:44,  rainDays:10, sun:7.6, daylight:16.7, snow:false },
        { name:'June',      avg:16.5, min:12.2, max:20.8, rain:56,  rainDays:11, sun:7.9, daylight:17.8, snow:false },
        { name:'July',      avg:18.6, min:14.3, max:22.9, rain:68,  rainDays:13, sun:7.7, daylight:17.2, snow:false },
        { name:'August',    avg:18.5, min:14.2, max:22.8, rain:70,  rainDays:13, sun:6.9, daylight:15.3, snow:false },
        { name:'September', avg:14.7, min:10.5, max:18.9, rain:65,  rainDays:13, sun:5.2, daylight:12.6, snow:false },
        { name:'October',   avg:9.8,  min:6.2,  max:13.4, rain:62,  rainDays:16, sun:3.0, daylight:10.1, snow:false },
        { name:'November',  avg:5.4,  min:2.5,  max:8.3,  rain:59,  rainDays:17, sun:1.6, daylight:8.0,  snow:false },
        { name:'December',  avg:2.5,  min:-0.2, max:5.2,  rain:58,  rainDays:17, sun:1.0, daylight:6.9,  snow:true  },
      ]
    },
    ode: {
      name: 'Odense',
      months: [
        { name:'January',   avg:1.5,  min:-1.5, max:4.5,  rain:51,  rainDays:17, sun:1.7, daylight:7.5,  snow:true  },
        { name:'February',  avg:1.7,  min:-1.7, max:5.1,  rain:38,  rainDays:13, sun:2.8, daylight:9.2,  snow:true  },
        { name:'March',     avg:4.3,  min:0.8,  max:7.8,  rain:42,  rainDays:14, sun:4.4, daylight:11.9, snow:false },
        { name:'April',     avg:8.6,  min:4.1,  max:13.1, rain:39,  rainDays:11, sun:6.2, daylight:14.2, snow:false },
        { name:'May',       avg:13.5, min:8.8,  max:18.2, rain:43,  rainDays:10, sun:7.7, daylight:16.6, snow:false },
        { name:'June',      avg:16.8, min:12.5, max:21.1, rain:55,  rainDays:11, sun:8.0, daylight:17.6, snow:false },
        { name:'July',      avg:19.0, min:14.6, max:23.4, rain:67,  rainDays:13, sun:7.8, daylight:17.1, snow:false },
        { name:'August',    avg:18.9, min:14.5, max:23.3, rain:68,  rainDays:13, sun:7.0, daylight:15.2, snow:false },
        { name:'September', avg:15.0, min:10.8, max:19.2, rain:63,  rainDays:13, sun:5.3, daylight:12.5, snow:false },
        { name:'October',   avg:10.1, min:6.5,  max:13.7, rain:60,  rainDays:16, sun:3.1, daylight:10.0, snow:false },
        { name:'November',  avg:5.7,  min:2.8,  max:8.6,  rain:57,  rainDays:17, sun:1.7, daylight:8.0,  snow:false },
        { name:'December',  avg:2.8,  min:0.1,  max:5.5,  rain:56,  rainDays:17, sun:1.1, daylight:7.0,  snow:true  },
      ]
    },
    aal: {
      name: 'Aalborg',
      months: [
        { name:'January',   avg:0.8,  min:-2.2, max:3.8,  rain:55,  rainDays:18, sun:1.5, daylight:7.2,  snow:true  },
        { name:'February',  avg:1.0,  min:-2.4, max:4.4,  rain:42,  rainDays:14, sun:2.6, daylight:9.0,  snow:true  },
        { name:'March',     avg:3.7,  min:0.2,  max:7.2,  rain:46,  rainDays:15, sun:4.1, daylight:11.8, snow:false },
        { name:'April',     avg:8.0,  min:3.5,  max:12.5, rain:41,  rainDays:11, sun:6.0, daylight:14.4, snow:false },
        { name:'May',       avg:12.8, min:8.2,  max:17.4, rain:45,  rainDays:11, sun:7.4, daylight:16.9, snow:false },
        { name:'June',      avg:16.1, min:11.8, max:20.4, rain:58,  rainDays:11, sun:7.7, daylight:18.0, snow:false },
        { name:'July',      avg:18.2, min:13.9, max:22.5, rain:71,  rainDays:14, sun:7.5, daylight:17.4, snow:false },
        { name:'August',    avg:18.1, min:13.8, max:22.4, rain:73,  rainDays:14, sun:6.7, daylight:15.4, snow:false },
        { name:'September', avg:14.3, min:10.1, max:18.5, rain:68,  rainDays:14, sun:5.0, daylight:12.6, snow:false },
        { name:'October',   avg:9.5,  min:5.9,  max:13.1, rain:65,  rainDays:17, sun:2.8, daylight:10.1, snow:false },
        { name:'November',  avg:5.1,  min:2.2,  max:8.0,  rain:62,  rainDays:18, sun:1.4, daylight:7.9,  snow:true  },
        { name:'December',  avg:2.2,  min:-0.5, max:4.9,  rain:61,  rainDays:18, sun:0.9, daylight:6.7,  snow:true  },
      ]
    }
  };

  const MONTH_COMMENTARY = [
    "January in Denmark — brace yourself. Cold, dark, and the Danes are somehow fine with it. The upside: hygge is at absolute peak levels. Candles everywhere.",
    "February is marginally better than January. Marginally. The days are getting longer though — Danes notice and celebrate every extra minute of daylight.",
    "March brings the first signs of spring. Danes emerge blinking into the pale sunshine. Café terraces open optimistically, usually too early.",
    "April is genuinely lovely. Cherry blossoms, longer evenings, Danes rediscovering their bikes with remarkable enthusiasm.",
    "May is probably the best month in Denmark. Everything is green, the sun stays up until 9pm, and people are almost... cheerful.",
    "June in Denmark is magical. Endless daylight, outdoor concerts, cold beers by the harbour. You'll wonder why you ever hesitated.",
    "July is peak Danish summer. Half the country goes on mandatory vacation — that's not an exaggeration. Enjoy it.",
    "August is the second-best month. Summer lingers and there's a golden quality to the light. The Danes call it 'late summer' and savour every day.",
    "September is still decent — like a gentle warning that winter is coming. The light turns amber and beautiful. Buy a good jacket soon.",
    "October and the Danes start hunkering down. It's actually quite cosy if you lean into it. This is the month to buy candles. Many candles.",
    "November is tough, not going to lie. Grey, wet, dark. Invest in a quality rain jacket. And more candles. Vitamin D supplements help.",
    "December — the Danes rescue this month with Christmas markets, æbleskiver, and industrial quantities of hygge. It's actually genuinely lovely.",
  ];

  const PACKING_TIPS = [
    ['🧥 Heavy winter coat', '🧤 Gloves & scarf', '🥾 Waterproof boots', '💡 Vitamin D supplements', '🕯️ Candles for hygge'],
    ['🧥 Winter coat', '🧤 Thermal layers', '🥾 Waterproof boots', '💡 Vitamin D', '🕯️ More candles'],
    ['🧣 Light-medium jacket', '☂️ Umbrella (always)', '👟 Comfortable shoes', '🌸 Watch for cherry blossoms', '☕ Enjoy outdoor cafés'],
    ['🌂 Rain jacket', '👕 Layers (mornings cold)', '🚲 Perfect bike weather!', '🌸 Parks are gorgeous now', '☀️ Sunglasses — yes, really'],
    ['👕 Light layers', '🌂 Foldable umbrella', '🚲 Definitely bike weather', '🍦 Try soft ice', '☀️ Sunscreen needed'],
    ['👕 T-shirts + light jacket', '🌂 Umbrella just in case', '🚲 Perfect biking month', '🍺 Harbour bars open', '🎵 Check concert listings'],
    ['☀️ Sunscreen (yes, in Denmark!)', '👕 Summer clothes', '🌂 Always one umbrella', '🏖️ Beach days possible', '🧴 Mosquito repellent evenings'],
    ['👕 Summer to light layers', '🌂 Rain jacket', '🍂 Watch the golden light', '🚲 Still great biking', '🍎 Apple season starts'],
    ['🧥 Light jacket essential', '🌂 Umbrella is non-negotiable', '🍂 Beautiful autumn colours', '☕ Café culture peaks', '🕯️ Start candle collection'],
    ['🧥 Warm jacket', '🌂 Rain gear', '🕯️ Candle collection begins', '🍎 Apple season', '📚 Good indoor reading month'],
    ['🧥 Winter coat', '☂️ Rain jacket + umbrella', '🕯️ Many candles', '📚 Good indoor month', '💡 Vitamin D supplements'],
    ['🧥 Warm winter coat', '🎄 Christmas spirit ready', '🍷 Try mulled wine / glögg', '🕯️ Maximum candle count', '🧁 Æbleskiver at markets'],
  ];

  // City coordinates for Open-Meteo
  const CITY_COORDS = {
    cph: { lat: 55.676, lon: 12.568 },
    aar: { lat: 56.156, lon: 10.211 },
    ode: { lat: 55.403, lon: 10.402 },
    aal: { lat: 57.048, lon:  9.921 },
  };

  // Helpers
  const toDateStr = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD

  const getTempColor  = (t) => t < 2 ? '#6BA3D6' : t < 8 ? '#7BBCE2' : t < 15 ? '#6CAE75' : t < 20 ? '#F5A623' : '#E05D3A';
  const getTempEmoji  = (t) => t < 0 ? '🥶' : t < 4 ? '🧊' : t < 10 ? '🧥' : t < 16 ? '🌬️' : t < 20 ? '🌤️' : '☀️';

  const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const initWeatherPlanner = () => {
    const dateInput = document.getElementById('weather-date');
    if (!dateInput) return;

    // Set date to today
    const today = new Date();
    dateInput.value = toDateStr(today);

    // Min = 2000-01-01 (archive goes back to 1940s), max = 16 days from now
    dateInput.min = '2000-01-01';
    dateInput.max = toDateStr(new Date(today.getTime() + 16 * 86400000));

    // Quick buttons
    document.querySelectorAll('.weather-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const offset = parseInt(btn.dataset.offset);
        const d = new Date();
        d.setDate(d.getDate() + offset);
        dateInput.value = toDateStr(d);
        document.querySelectorAll('.weather-quick-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWeatherResult();
      });
    });

    // Mark "Today" active on load
    document.querySelector('.weather-quick-btn[data-offset="0"]')?.classList.add('active');

    dateInput.addEventListener('change', () => {
      document.querySelectorAll('.weather-quick-btn').forEach(b => b.classList.remove('active'));
      renderWeatherResult();
    });

    document.getElementById('weather-city')?.addEventListener('change', renderWeatherResult);

    // Auto-render immediately
    renderWeatherResult();
  };

  const renderWeatherResult = async () => {
    const resultEl  = document.getElementById('weather-result');
    const dateInput = document.getElementById('weather-date');
    if (!resultEl || !dateInput) return;

    const dateStr  = dateInput.value;
    if (!dateStr) return;

    const cityKey  = document.getElementById('weather-city')?.value || 'cph';
    const city     = CLIMATE[cityKey];
    const coords   = CITY_COORDS[cityKey];
    const selDate  = new Date(dateStr + 'T12:00:00');
    const today    = new Date(); today.setHours(0, 0, 0, 0);
    const daysDiff = Math.round((selDate - today) / 86400000);
    const monthIdx = selDate.getMonth();
    const norm     = city.months[monthIdx]; // climate normals for fallback

    // Loading state
    resultEl.innerHTML = `<div class="weather-loading"><span class="weather-spinner"></span> Fetching weather data…</div>`;
    resultEl.classList.remove('hidden');

    let mode, apiData = null;
    if (daysDiff >= 0 && daysDiff <= 16) {
      mode = 'forecast';
    } else if (daysDiff < 0 && selDate.getFullYear() >= 2000) {
      mode = 'archive';
    } else {
      mode = 'normals';
    }

    // Fetch real data
    if (mode === 'forecast' || mode === 'archive') {
      try {
        const base = mode === 'forecast'
          ? 'https://api.open-meteo.com/v1/forecast'
          : 'https://archive-api.open-meteo.com/v1/archive';
        const params = new URLSearchParams({
          latitude:  coords.lat,
          longitude: coords.lon,
          start_date: dateStr,
          end_date:   dateStr,
          daily: [
            'temperature_2m_max', 'temperature_2m_min', 'precipitation_sum',
            'windspeed_10m_max', 'weathercode',
            ...(mode === 'forecast' ? ['precipitation_probability_max', 'uv_index_max'] : []),
          ].join(','),
          timezone: 'Europe/Copenhagen',
        });
        const res  = await fetch(`${base}?${params}`, { signal: AbortSignal.timeout(6000) });
        const json = await res.json();
        if (json.daily?.temperature_2m_max?.[0] != null) {
          apiData = {
            max:      Math.round(json.daily.temperature_2m_max[0] * 10) / 10,
            min:      Math.round(json.daily.temperature_2m_min[0] * 10) / 10,
            rain:     Math.round((json.daily.precipitation_sum[0] ?? 0) * 10) / 10,
            wind:     Math.round(json.daily.windspeed_10m_max[0] ?? 0),
            code:     json.daily.weathercode[0] ?? 0,
            precProb: json.daily.precipitation_probability_max?.[0] ?? null,
            uvIndex:  json.daily.uv_index_max?.[0] ?? null,
          };
        }
      } catch {
        mode = 'normals'; // graceful fallback
      }
    }

    // Build display
    const daylight  = norm.daylight;
    const sun       = norm.sun;
    const commentary = MONTH_COMMENTARY[monthIdx];
    const packing    = PACKING_TIPS[monthIdx];
    const daylightPct = Math.round((daylight / 18) * 100);
    const sunPct      = Math.round((sun / 8.5) * 100);

    let heroTemp, heroMin, heroMax, heroRain, heroWind, heroCode, heroPrecProb, heroUV;
    let badgeHtml, dataNote;

    if (apiData) {
      heroMax   = apiData.max;
      heroMin   = apiData.min;
      heroTemp  = Math.round((apiData.max + apiData.min) / 2 * 10) / 10;
      heroRain  = apiData.rain;
      heroWind  = apiData.wind;
      heroCode  = apiData.code;
      heroPrecProb = apiData.precProb;
      heroUV    = apiData.uvIndex;

      if (mode === 'forecast') {
        badgeHtml = `<span class="weather-source-badge weather-badge-live">Live Forecast</span>`;
        dataNote  = `Real forecast via Open-Meteo. Updates every hour.`;
      } else {
        badgeHtml = `<span class="weather-source-badge weather-badge-history">Actual Data</span>`;
        dataNote  = `Real measured weather for this date, via Open-Meteo archive.`;
      }
    } else {
      // Climate normals
      heroTemp  = norm.avg;
      heroMin   = norm.min;
      heroMax   = norm.max;
      heroRain  = norm.rain;   // monthly mm — show as monthly total
      heroWind  = null;
      heroCode  = null;
      heroPrecProb = null;
      heroUV    = null;
      badgeHtml = `<span class="weather-source-badge weather-badge-normals">Climate Average</span>`;
      dataNote  = `Historical climate normals (1991–2020). Forecast not available beyond 16 days.`;
    }

    const tempColor  = getTempColor(heroTemp);
    const tempEmoji  = heroCode != null ? getWmoEmoji(heroCode) : getTempEmoji(heroTemp);
    const wmoLabel   = heroCode != null ? (WMO_LABELS[heroCode] ?? '') : '';

    resultEl.innerHTML = `
      <div class="weather-card">
        <div class="weather-hero-bar">
          <div class="weather-date-header">
            <span class="weather-date-label">${formatDateLabel(dateStr)}</span>
            ${badgeHtml}
          </div>
          <div class="weather-city-sub">${city.name}</div>
          <div class="weather-temp-display" style="color:${tempColor}">${tempEmoji} ${heroTemp}°C</div>
          <div class="weather-range">${heroMin}°C low · ${heroMax}°C high${wmoLabel ? ` · ${wmoLabel}` : ''}</div>
        </div>

        <div class="weather-grid">
          <div class="weather-metric">
            <div class="weather-metric-icon">🌡️</div>
            <div class="weather-metric-val">${heroTemp}°C</div>
            <div class="weather-metric-lbl">${apiData ? 'Avg temp' : 'Monthly avg'}</div>
          </div>
          <div class="weather-metric">
            <div class="weather-metric-icon">🌧️</div>
            <div class="weather-metric-val">${heroRain}${apiData ? 'mm' : 'mm/mo'}</div>
            <div class="weather-metric-lbl">${apiData ? 'Precipitation' : 'Monthly rain'}</div>
          </div>
          ${heroPrecProb !== null ? `
          <div class="weather-metric">
            <div class="weather-metric-icon">☂️</div>
            <div class="weather-metric-val">${heroPrecProb}%</div>
            <div class="weather-metric-lbl">Rain chance</div>
          </div>` : `
          <div class="weather-metric">
            <div class="weather-metric-icon">🌧️</div>
            <div class="weather-metric-val">${norm.rainDays}</div>
            <div class="weather-metric-lbl">Rain days/mo</div>
          </div>`}
          ${heroWind !== null ? `
          <div class="weather-metric">
            <div class="weather-metric-icon">💨</div>
            <div class="weather-metric-val">${heroWind} km/h</div>
            <div class="weather-metric-lbl">Max wind</div>
          </div>` : `
          <div class="weather-metric">
            <div class="weather-metric-icon">☀️</div>
            <div class="weather-metric-val">${sun}h</div>
            <div class="weather-metric-lbl">Sunshine/day</div>
          </div>`}
          ${heroUV !== null ? `
          <div class="weather-metric">
            <div class="weather-metric-icon">🔆</div>
            <div class="weather-metric-val">${heroUV}</div>
            <div class="weather-metric-lbl">UV index</div>
          </div>` : `
          <div class="weather-metric">
            <div class="weather-metric-icon">☀️</div>
            <div class="weather-metric-val">${sun}h</div>
            <div class="weather-metric-lbl">Sunshine/day</div>
          </div>`}
          <div class="weather-metric">
            <div class="weather-metric-icon">🌅</div>
            <div class="weather-metric-val">${daylight}h</div>
            <div class="weather-metric-lbl">Daylight</div>
          </div>
          <div class="weather-metric">
            <div class="weather-metric-icon">${norm.snow ? '❄️' : '🌿'}</div>
            <div class="weather-metric-val">${norm.snow ? 'Possible' : 'None'}</div>
            <div class="weather-metric-lbl">Snow chance</div>
          </div>
        </div>

        <div class="weather-bars">
          <div class="weather-bar-row">
            <span>Daylight</span>
            <div class="weather-bar-track"><div class="weather-bar-fill weather-bar-daylight" style="width:${daylightPct}%"></div></div>
            <span>${daylight}h</span>
          </div>
          <div class="weather-bar-row">
            <span>Sunshine</span>
            <div class="weather-bar-track"><div class="weather-bar-fill weather-bar-sun" style="width:${sunPct}%"></div></div>
            <span>${sun}h/day</span>
          </div>
        </div>

        <div class="weather-bjorn-quote">
          <div class="weather-bjorn-face">🛡️</div>
          <blockquote>${commentary}</blockquote>
        </div>

        <div class="weather-packing-section">
          <div class="weather-packing-title">What to pack</div>
          <div class="weather-packing-chips">
            ${packing.map(item => `<div class="weather-pack-chip">${item}</div>`).join('')}
          </div>
        </div>

        <div class="weather-source-note">${dataNote}</div>
        <div class="tool-chapter-link">🚲 Planning life in Denmark year-round? <button class="tool-chapter-btn" onclick="openChapter(10)">Read Chapter 10 — Transport &amp; Getting Around →</button></div>
      </div>
    `;
  };

  // Human-readable WMO weather code labels
  const WMO_LABELS = {
    0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
    45:'Fog', 48:'Icy fog',
    51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
    61:'Light rain', 63:'Rain', 65:'Heavy rain',
    71:'Light snow', 73:'Snow', 75:'Heavy snow',
    80:'Light showers', 81:'Rain showers', 82:'Heavy showers',
    95:'Thunderstorm', 96:'Thunderstorm + hail', 99:'Thunderstorm + hail',
  };

  /* ══════════════════════════════════════════════════════
     4. REJSEPLANEN — Danish Public Transport Journey Planner
  ══════════════════════════════════════════════════════ */

  const KNOWN_STATIONS = {
    'Copenhagen Central': { id: '8600626', display: 'Copenhagen Central Station (København H)' },
    'København H':        { id: '8600626', display: 'København H (Central Station)' },
    'Nørreport':          { id: '8600858', display: 'Nørreport St.' },
    'Aarhus':             { id: '8600053', display: 'Aarhus H' },
    'Odense':             { id: '8600249', display: 'Odense St.' },
    'Aalborg':            { id: '8600012', display: 'Aalborg St.' },
    'Roskilde':           { id: '8600290', display: 'Roskilde St.' },
    'Helsingør':          { id: '8600628', display: 'Helsingør St.' },
    'Esbjerg':            { id: '8600169', display: 'Esbjerg St.' },
    'Fredericia':         { id: '8600138', display: 'Fredericia St.' },
    'Vejle':              { id: '8600162', display: 'Vejle St.' },
    'Herning':            { id: '8600076', display: 'Herning St.' },
    'Viborg':             { id: '8600084', display: 'Viborg St.' },
    'Silkeborg':          { id: '8600082', display: 'Silkeborg St.' },
    'Kolding':            { id: '8600120', display: 'Kolding St.' },
    'Sønderborg':         { id: '8600048', display: 'Sønderborg St.' },
    'Copenhagen Airport': { id: '8600714', display: 'Copenhagen Airport (Kastrup)' },
    'Kastrup':            { id: '8600714', display: 'Copenhagen Airport (Kastrup)' },
  };

  const setupStationInput = (inputId, suggestionsId) => {
    const input = document.getElementById(inputId);
    const sugg  = document.getElementById(suggestionsId);
    if (!input || !sugg) return;

    let debounce;
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { sugg.classList.add('hidden'); return; }

      debounce = setTimeout(async () => {
        // Local known stations first
        const localMatches = Object.entries(KNOWN_STATIONS)
          .filter(([k]) => k.toLowerCase().includes(q))
          .map(([, s]) => ({ name: s.display, id: s.id }))
          .slice(0, 4);

        let allItems = localMatches;

        // Try Rejseplanen via CORS proxy
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://xmlopen.rejseplanen.dk/bin/rest.exe/location.name/?input=' + encodeURIComponent(q) + '&type=S&format=json')}`;
          const res  = await fetch(proxyUrl, { signal: AbortSignal.timeout(4000) });
          const data = await res.json();
          const stops = data?.LocationList?.StopLocation || [];
          const arr   = Array.isArray(stops) ? stops : [stops];
          arr.slice(0, 5).forEach(s => {
            if (!allItems.find(a => a.id === s.id)) {
              allItems.push({ name: s.name, id: s.id });
            }
          });
        } catch { /* fallback to local only */ }

        if (!allItems.length) {
          sugg.innerHTML = '<div class="dawa-no-results">No stations found</div>';
          sugg.classList.remove('hidden');
          return;
        }

        sugg.innerHTML = allItems.map(s => `
          <div class="dawa-item" data-stop-id="${esc(s.id)}" data-name="${esc(s.name)}">
            <span class="dawa-street">🚉 ${esc(s.name)}</span>
          </div>
        `).join('');
        sugg.classList.remove('hidden');

        sugg.querySelectorAll('.dawa-item').forEach(item => {
          item.addEventListener('click', () => {
            input.value     = item.dataset.name;
            input.dataset.stopId = item.dataset.stopId;
            sugg.classList.add('hidden');
          });
        });
      }, 300);
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target)) sugg.classList.add('hidden');
    });
  };

  const initJourneyPlanner = () => {
    if (!document.getElementById('journey-from')) return;

    // Default datetime = now, rounded to next 5 min
    const journeyWhen = document.getElementById('journey-when');
    if (journeyWhen) {
      const now = new Date();
      now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5, 0, 0);
      journeyWhen.value = now.toISOString().slice(0, 16);
    }

    setupStationInput('journey-from', 'journey-from-sugg');
    setupStationInput('journey-to',   'journey-to-sugg');

    document.getElementById('journey-search-btn')?.addEventListener('click', executeJourneySearch);
  };

  const executeJourneySearch = () => {
    const fromInput = document.getElementById('journey-from');
    const toInput   = document.getElementById('journey-to');
    const whenInput = document.getElementById('journey-when');
    const resultEl  = document.getElementById('journey-result');

    const fromName = fromInput?.value?.trim();
    const toName   = toInput?.value?.trim();

    if (!fromName || !toName) {
      window.App?.showToast?.('Please enter both origin and destination', 'warning');
      return;
    }

    const when    = whenInput?.value ? new Date(whenInput.value) : new Date();
    const dateStr = `${String(when.getDate()).padStart(2,'0')}.${String(when.getMonth()+1).padStart(2,'0')}.${when.getFullYear()}`;
    const timeStr = `${String(when.getHours()).padStart(2,'0')}:${String(when.getMinutes()).padStart(2,'0')}`;

    // Deep link into Rejseplanen web app (English version)
    const rejseUrl = `https://www.rejseplanen.dk/webapp/index.html?language=en_EN#!P|TP!from|${encodeURIComponent(fromName)}!to|${encodeURIComponent(toName)}!date|${dateStr}!time|${timeStr}!isForm|1`;

    if (!resultEl) return;
    resultEl.innerHTML = `
      <div class="journey-card">
        <div class="journey-route-display">
          <div class="journey-stop journey-stop-from">
            <span class="journey-stop-dot journey-dot-from"></span>
            <span class="journey-stop-name">${esc(fromName)}</span>
          </div>
          <div class="journey-line-connector"></div>
          <div class="journey-stop journey-stop-to">
            <span class="journey-stop-dot journey-dot-to"></span>
            <span class="journey-stop-name">${esc(toName)}</span>
          </div>
        </div>
        <div class="journey-time-display">🕐 ${when.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})} at ${timeStr}</div>

        <a href="${rejseUrl}" target="_blank" rel="noopener" class="journey-cta-btn">
          <span>View live departures & routes in Rejseplanen</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>

        <div class="journey-info-grid">
          <div class="journey-info-item">
            <div class="journey-info-icon">💳</div>
            <div>
              <strong>Rejsekort</strong>
              <p>Denmark's travel card — cheaper per trip than buying tickets. Buy at any station.</p>
            </div>
          </div>
          <div class="journey-info-item">
            <div class="journey-info-icon">📱</div>
            <div>
              <strong>DSB App</strong>
              <p>Official train app for tickets, seat reservations, and live departures.</p>
            </div>
          </div>
          <div class="journey-info-item">
            <div class="journey-info-icon">✅</div>
            <div>
              <strong>Check in / out</strong>
              <p>Always tap yellow readers when boarding and leaving. Forgetting is a fine.</p>
            </div>
          </div>
        </div>

        <div class="journey-links">
          <a href="https://www.rejsekort.dk/en/" target="_blank">Get Rejsekort</a>
          <a href="https://www.dsb.dk/en/" target="_blank">DSB Trains</a>
          <a href="https://dinoffentligetransport.dk/en/" target="_blank">Local Transit (DOT)</a>
          <a href="https://www.flixbus.com/" target="_blank">FlixBus (budget)</a>
        </div>
      </div>
    `;
    resultEl.classList.remove('hidden');
  };

  /* ══════════════════════════════════════════════════════
     5. JOB SEARCH — Multi-board Danish Job Finder
  ══════════════════════════════════════════════════════ */

  const JOB_BOARDS = [
    {
      name: 'Jobindex',   icon: '🇩🇰', color: '#003d82',
      url: (q, loc, type) => `https://www.jobindex.dk/jobsoegning${loc ? `/${encodeURIComponent(loc)}` : ''}?q=${encodeURIComponent(q)}${type ? `&jobtypes=${type}` : ''}`,
      desc: "Denmark's largest job board"
    },
    {
      name: 'Jobnet',     icon: '🏛️', color: '#2b5ea7',
      url: (q, loc) => `https://job.jobnet.dk/CV/FindWork?SearchString=${encodeURIComponent(q)}${loc ? `&WorkPlaceCity=${encodeURIComponent(loc)}` : ''}`,
      desc: 'Official Danish gov job portal'
    },
    {
      name: 'LinkedIn',   icon: '💼', color: '#0077b5',
      url: (q, loc) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=${encodeURIComponent(loc ? `${loc}, Denmark` : 'Denmark')}`,
      desc: 'Network + jobs combined'
    },
    {
      name: 'Indeed DK',  icon: '🔍', color: '#2164f3',
      url: (q, loc) => `https://dk.indeed.com/jobs?q=${encodeURIComponent(q)}${loc ? `&l=${encodeURIComponent(loc)}` : '&l=Denmark'}`,
      desc: 'Wide coverage, many listings'
    },
    {
      name: 'The Hub',    icon: '🚀', color: '#7c3aed',
      url: (q) => `https://www.thehub.dk/jobs?search=${encodeURIComponent(q)}`,
      desc: 'Startups & tech roles in DK'
    },
    {
      name: 'WorkInDK',   icon: '🌍', color: '#c60c30',
      url: (q, loc) => `https://workindenmark.dk/looking-for-work/find-a-job#q=${encodeURIComponent(q)}`,
      desc: 'Official expat job service'
    },
  ];

  const JOB_CHIPS = [
    'Software engineer','Data scientist','UX designer','Project manager',
    'Nurse / sygeplejerske','Doctor / læge','Teacher / lærer','Architect',
    'Accountant / revisor','Marketing manager','HR specialist','Researcher',
    'Mechanical engineer','Sales manager','Logistics coordinator',
  ];

  const initJobSearch = () => {
    if (!document.getElementById('jobs-search-btn')) return;

    // Suggestion chips
    const chips = document.getElementById('jobs-suggest-chips');
    if (chips) {
      chips.innerHTML = JOB_CHIPS.slice(0, 8).map(s => `
        <button class="job-chip" data-q="${s}">${s}</button>
      `).join('');
      chips.querySelectorAll('.job-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const q = document.getElementById('jobs-query');
          if (q) { q.value = chip.dataset.q; q.focus(); }
          chips.querySelectorAll('.job-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        });
      });
    }

    // Job type tabs
    let selectedType = '';
    document.querySelectorAll('.job-type-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.job-type-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        selectedType = tab.dataset.type;
      });
    });

    const doSearch = () => {
      const query    = document.getElementById('jobs-query')?.value?.trim();
      const location = document.getElementById('jobs-location')?.value || '';
      if (!query) { window.App?.showToast?.('Enter a job title or field first', 'warning'); return; }
      renderJobResults(query, location, selectedType);
    };

    document.getElementById('jobs-search-btn')?.addEventListener('click', doSearch);
    document.getElementById('jobs-query')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch();
    });
  };

  const renderJobResults = (query, location, type) => {
    const resultEl = document.getElementById('jobs-result');
    if (!resultEl) return;

    const locLabel = location
      ? location.charAt(0).toUpperCase() + location.slice(1)
      : 'All Denmark';

    resultEl.innerHTML = `
      <div class="jobs-result-wrap">
        <div class="jobs-result-header">
          Searching <strong>"${esc(query)}"</strong> in <strong>${esc(locLabel)}</strong>
        </div>

        <div class="jobs-boards-grid">
          ${JOB_BOARDS.map(board => `
            <a href="${board.url(query, location, type)}" target="_blank" rel="noopener"
               class="job-board-card" style="--board-color:${board.color}">
              <div class="job-board-top">
                <span class="job-board-icon">${board.icon}</span>
                <span class="job-board-name">${board.name}</span>
              </div>
              <div class="job-board-desc">${board.desc}</div>
              <div class="job-board-cta">Search →</div>
            </a>
          `).join('')}
        </div>

        <div class="jobs-tips-box">
          <div class="jobs-tips-title">💡 Job hunting in Denmark — what actually works</div>
          <ul>
            <li><strong>Unsolicited applications</strong> (uopfordrede ansøgninger) are very common and well-received here</li>
            <li><strong>Danish CVs</strong> are 1–2 pages, include a photo, short and factual — no long descriptions</li>
            <li><strong>Cover letters matter</strong> more than elsewhere — show you understand Danish work culture and values</li>
            <li><strong>Register at Jobnet.dk</strong> — required if you ever need a-kasse (unemployment insurance) benefits</li>
            <li><strong>Work hours are real</strong> — leaving at 4pm is normal and expected. Don't be the last one in the office</li>
          </ul>
        </div>

        <div class="jobs-resources-row">
          <a href="https://workindenmark.dk" target="_blank" class="jobs-res-link">🇩🇰 Work in Denmark (official)</a>
          <a href="https://www.nyidanmark.dk/en-GB/Words-and-concepts/US/Work" target="_blank" class="jobs-res-link">📋 Work permit guide</a>
          <a href="https://www.ida.dk/karriere/job" target="_blank" class="jobs-res-link">⚙️ IDA (engineers)</a>
          <a href="https://hk.dk/job" target="_blank" class="jobs-res-link">📁 HK (office workers)</a>
        </div>
      </div>
    `;
    resultEl.classList.remove('hidden');
  };

  /* ══════════════════════════════════════════════════════
     6. LIVE TODAY WEATHER — Open-Meteo (Copenhagen)
  ══════════════════════════════════════════════════════ */

  const WMO_EMOJI = {
    0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
    45:'🌫️', 48:'🌫️',
    51:'🌦️', 53:'🌦️', 55:'🌧️',
    61:'🌧️', 63:'🌧️', 65:'🌧️',
    71:'🌨️', 73:'🌨️', 75:'❄️',
    80:'🌦️', 81:'🌧️', 82:'⛈️',
    95:'⛈️', 96:'⛈️', 99:'⛈️',
  };

  const getWmoEmoji = (code) => WMO_EMOJI[code] ?? '🌡️';

  const initTodayWeather = async () => {
    const weatherVal = document.getElementById('daily-weather-val');
    if (!weatherVal) return;

    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57' +
        '&current=temperature_2m,weathercode,windspeed_10m,precipitation&timezone=Europe%2FCopenhagen',
        { signal: AbortSignal.timeout(5000) }
      );
      const data = await res.json();
      const c    = data.current;
      const emoji = getWmoEmoji(c.weathercode);
      const temp  = Math.round(c.temperature_2m);
      const wind  = Math.round(c.windspeed_10m);
      const precip = c.precipitation > 0.1 ? ` · ${c.precipitation.toFixed(1)}mm` : '';

      weatherVal.innerHTML = `${emoji} ${temp}°C &nbsp;·&nbsp; ${wind} km/h${precip ? `<span class="weather-precip">${precip}</span>` : ''}`;
    } catch {
      const month = new Date().getMonth();
      const m     = CLIMATE.cph.months[month];
      weatherVal.textContent = `~${m.avg}°C avg · ${m.rain}mm this month`;
    }
  };

  /* ══════════════════════════════════════════════════════
     7. RENT PRICE CHECKER — DST / Boligsiden market data
        DKK per m² per month (2023-2024 averages)
  ══════════════════════════════════════════════════════ */

  // City-level averages (DKK / m² / month)
  const RENT_CITIES = {
    'cph':           { label: 'Copenhagen',          avg: 110 },
    'frederiksberg': { label: 'Frederiksberg',        avg: 121 },
    'aarhus':        { label: 'Aarhus',               avg:  88 },
    'odense':        { label: 'Odense',               avg:  71 },
    'aalborg':       { label: 'Aalborg',              avg:  65 },
    'roskilde':      { label: 'Roskilde',             avg:  72 },
    'vejle':         { label: 'Vejle',                avg:  68 },
    'kolding':       { label: 'Kolding',              avg:  66 },
    'horsens':       { label: 'Horsens',              avg:  62 },
    'esbjerg':       { label: 'Esbjerg',              avg:  58 },
  };

  // Copenhagen neighbourhood averages (DKK / m² / month)
  const RENT_NEIGHBOURHOODS = {
    'indre-by':       { label: 'Indre By',                   avg: 137 },
    'frederiksberg-nb':{ label: 'Frederiksberg',             avg: 121 },
    'osterbro':       { label: 'Østerbro',                   avg: 115 },
    'vesterbro':      { label: 'Vesterbro / Kgs. Enghave',   avg: 112 },
    'norrebro':       { label: 'Nørrebro',                   avg: 108 },
    'bispebjerg':     { label: 'Bispebjerg',                 avg:  94 },
    'amager-east':    { label: 'Amager East (Øresund)',      avg: 102 },
    'amager-west':    { label: 'Amager West (Sundby)',       avg:  98 },
    'valby':          { label: 'Valby',                      avg:  96 },
    'vanlose':        { label: 'Vanløse',                    avg:  93 },
    'bronshoj':       { label: 'Brønshøj / Husum',           avg:  87 },
  };

  // Contextual tips by verdict
  const RENT_TIPS = {
    great: [
      "You're well below market rate — this is a strong find. Lock it in and don't tell too many people.",
      "Below-market rents in Denmark are rare. If the apartment is decent, this is genuinely good value.",
    ],
    fair: [
      "This is in line with what most people pay in this area. A fair deal.",
      "Market rate — not a bargain, not overpriced. Typical for this location.",
    ],
    above: [
      "You're paying a premium. Worth checking if the extras justify it — new build? Furnished? Great location within the area?",
      "Above average but not extreme. Could be worth negotiating or asking what's included.",
    ],
    over: [
      "This is significantly above market rate. It's worth trying to negotiate, or considering nearby areas.",
      "Quite expensive for this area. Make sure you understand exactly what's included before signing.",
    ],
  };

  const getRentTip = (verdict) => {
    const tips = RENT_TIPS[verdict];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const initRentChecker = () => {
    const citySelect  = document.getElementById('rent-city');
    const nbWrap      = document.getElementById('rent-nb-wrap');
    const checkBtn    = document.getElementById('rent-check-btn');
    if (!citySelect || !checkBtn) return;

    // Show/hide neighbourhood selector
    citySelect.addEventListener('change', () => {
      const isCphNb = citySelect.value === 'cph-nb';
      nbWrap.style.display = isCphNb ? '' : 'none';
    });

    checkBtn.addEventListener('click', () => {
      const cityKey  = citySelect.value;
      const nbKey    = document.getElementById('rent-neighbourhood')?.value;
      const size     = parseFloat(document.getElementById('rent-size')?.value);
      const monthly  = parseFloat(document.getElementById('rent-monthly')?.value);
      const resultEl = document.getElementById('rent-result');
      if (!resultEl) return;

      if (!size || size < 10 || !monthly || monthly < 500) {
        window.App?.showToast?.('Please enter a valid size (m²) and monthly rent', 'warning');
        return;
      }

      // Determine which dataset to use
      let areaData, isNeighbourhood = false;
      if (cityKey === 'cph-nb' && nbKey) {
        areaData = RENT_NEIGHBOURHOODS[nbKey];
        isNeighbourhood = true;
      } else {
        areaData = RENT_CITIES[cityKey];
      }

      if (!areaData) return;

      const avgPerSqm   = areaData.avg;           // DKK / m² / month
      const marketRent  = Math.round(avgPerSqm * size);
      const yourPerSqm  = monthly / size;
      const pctOfMarket = Math.round((monthly / marketRent) * 100);

      // Verdict
      let verdict, verdictLabel, verdictColor, verdictIcon;
      if (pctOfMarket < 80) {
        verdict = 'great'; verdictLabel = 'Great Deal'; verdictColor = '#1a7a4a'; verdictIcon = '✅';
      } else if (pctOfMarket < 100) {
        verdict = 'fair';  verdictLabel = 'Fair Price';  verdictColor = '#1a5f9a'; verdictIcon = '👍';
      } else if (pctOfMarket < 120) {
        verdict = 'above'; verdictLabel = 'Above Average'; verdictColor = '#b06000'; verdictIcon = '⚠️';
      } else {
        verdict = 'over';  verdictLabel = 'Overpriced';  verdictColor = '#c0001e'; verdictIcon = '🔴';
      }

      const diff      = monthly - marketRent;
      const diffLabel = diff >= 0
        ? `+${Math.abs(diff).toLocaleString('da-DK')} DKK above market`
        : `${Math.abs(diff).toLocaleString('da-DK')} DKK below market`;
      const diffColor = diff > 0 ? '#c0001e' : '#1a7a4a';

      // Bar: track represents 0–160% of market price
      // Fill = your rent as fraction of (market × 1.6), capped at 100%
      // Market line always sits at 62.5% of track (100/160)
      const barFillPct   = Math.min(Math.round((monthly / (marketRent * 1.6)) * 100), 100);
      const marketLinePct = 62.5; // 100/160 — where "market avg" line always lands

      const tip = getRentTip(verdict);

      resultEl.innerHTML = `
        <div class="rent-result-card">
          <div class="rent-verdict-header" style="--verdict-color:${verdictColor}">
            <div class="rent-verdict-badge">${verdictIcon} ${verdictLabel}</div>
            <div class="rent-pct-display">${pctOfMarket}% of market</div>
          </div>

          <div class="rent-figures-row">
            <div class="rent-figure">
              <div class="rent-figure-val">${Math.round(yourPerSqm)} DKK</div>
              <div class="rent-figure-lbl">Your price / m²</div>
            </div>
            <div class="rent-figure rent-figure-vs">vs</div>
            <div class="rent-figure">
              <div class="rent-figure-val">${avgPerSqm} DKK</div>
              <div class="rent-figure-lbl">Market avg / m² · ${areaData.label}</div>
            </div>
          </div>

          <div class="rent-bar-section">
            <div class="rent-bar-labels">
              <span>Your rent: <strong>${monthly.toLocaleString('da-DK')} DKK/mo</strong></span>
              <span>Market: <strong>${marketRent.toLocaleString('da-DK')} DKK/mo</strong></span>
            </div>
            <div class="rent-bar-track">
              <div class="rent-bar-fill" style="width:${barFillPct}%;background:${verdictColor}"></div>
              <div class="rent-bar-market-line" style="left:${marketLinePct}%"></div>
            </div>
            <div class="rent-diff-label" style="color:${diffColor}">${diffLabel} · for ${size} m²</div>
          </div>

          <div class="rent-tip-box">
            <span class="rent-tip-icon">🛡️</span>
            <span>${tip}</span>
          </div>

          <div class="rent-data-note">
            Data: Statistics Denmark (DST) + Boligsiden.dk market averages 2023–2024.
            Prices vary by building age, floor, furnishings and condition.
          </div>
          <div class="tool-chapter-link">🏠 Want the full guide to renting in Denmark — deposits, tenant rights, and finding apartments? <button class="tool-chapter-btn" onclick="openChapter(3)">Read Chapter 3 — Housing →</button></div>
          <button class="tool-copy-btn" onclick="window.copyToolResult&&window.copyToolResult('rent-result')">📋 Copy result</button>
        </div>
      `;
      resultEl.classList.remove('hidden');
    });
  };

  /* ══════════════════════════════════════════════════════
     INIT ALL
  ══════════════════════════════════════════════════════ */
  const init = () => {
    initExchangeRates();
    initKommuneFinder();
    initWeatherPlanner();
    initJourneyPlanner();
    initJobSearch();
    initTodayWeather();
    initRentChecker();
  };

  return { init, fetchRates, formatMultiCurrency, CLIMATE };

})();
