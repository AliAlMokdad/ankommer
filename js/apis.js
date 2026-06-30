/* ═══════════════════════════════════════════════════════
   ANKOMMER — Live API Integrations
   Exchange Rates · DAWA · Weather · Rejseplanen · Jobs
═══════════════════════════════════════════════════════ */

const APIs = (() => {

  // AbortSignal.timeout polyfill — Safari < 16.4, Chrome < 103, Firefox < 100
  // throw TypeError without this. Falls back to AbortController + setTimeout.
  const timeoutSignal = (ms) => {
    if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
      return AbortSignal.timeout(ms);
    }
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(new DOMException('TimeoutError', 'TimeoutError')), ms);
    return ctrl.signal;
  };

  // Show a friendly error in the right result panel instead of failing silently.
  // Users were seeing "nothing happened" when DAWA / weather / journey / jobs
  // hit a 5xx or timeout.
  const showError = (resultElId, message, retryFn) => {
    const el = document.getElementById(resultElId);
    if (!el) return;
    const retryAttr = retryFn ? `data-retry="1"` : '';
    el.classList.remove('hidden');
    el.innerHTML = `
      <div style="padding:14px 16px;border-radius:10px;background:rgba(198,12,48,0.08);border:1px solid rgba(198,12,48,0.25);color:var(--text);">
        <div style="font-size:0.9rem;font-weight:600;margin-bottom:4px;">⚠️ ${esc(message)}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:${retryFn ? '10px' : '0'};">
          The service may be temporarily unavailable. Check your connection and try again.
        </div>
        ${retryFn ? `<button class="btn-secondary" ${retryAttr} style="font-size:0.85rem;padding:6px 14px;">Retry</button>` : ''}
      </div>
    `;
    if (retryFn) {
      el.querySelector('button[data-retry]')?.addEventListener('click', retryFn, { once: true });
    }
  };

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

  // 2025 municipal tax rates (kommuneskat). Source: Skatteministeriet
  // satser 2025 + The Local DK 2025 announcement. Bumped from 2024 set
  // — 8 kommuner raised, 5 cut. Notable: København 23.80 → 23.50,
  // Gentofte 22.80 → 22.50, Frederikssund 25.30 → 25.20, Fredericia
  // 25.50 → 25.40, Høje-Taastrup down. Helsingør, Rudersdal, Greve,
  // Esbjerg, Randers, Lemvig, Vejen, Fanø raised. Most others held.
  const KOMMUNE_RATES = {
    'København': 23.50, 'Frederiksberg': 23.40, 'Bornholm': 26.30,
    'Gentofte': 22.50, 'Lyngby-Taarbæk': 22.50, 'Rudersdal': 22.90,
    'Aarhus': 24.52, 'Odense': 25.30, 'Aalborg': 25.30,
    'Randers': 25.50, 'Kolding': 25.20, 'Vejle': 24.10,
    'Horsens': 25.30, 'Silkeborg': 25.30, 'Herning': 25.20,
    'Helsingør': 24.60, 'Hillerød': 24.90, 'Hørsholm': 22.40,
    'Greve': 24.40, 'Roskilde': 24.10, 'Lejre': 25.70,
    'Esbjerg': 25.70, 'Fredericia': 25.40, 'Viborg': 25.30,
    'Svendborg': 25.30, 'Næstved': 25.90, 'Holbæk': 25.70,
    'Slagelse': 25.80, 'Ringsted': 25.80, 'Faxe': 25.80,
    'Køge': 24.70, 'Ishøj': 24.80, 'Brøndby': 25.00,
    'Glostrup': 24.80, 'Hvidovre': 24.40, 'Rødovre': 24.50,
    'Ballerup': 25.40, 'Gladsaxe': 24.50, 'Herlev': 24.80,
    'Albertslund': 25.50, 'Taarnby': 24.70, 'Dragør': 24.50,
    'Furesø': 23.80, 'Allerød': 23.80, 'Fredensborg': 24.60,
    'Gribskov': 25.00, 'Halsnæs': 26.10, 'Frederikssund': 25.20,
    'Egedal': 25.00, 'Solrød': 24.30, 'Stevns': 25.80,
    'Vordingborg': 26.70, 'Lolland': 26.90, 'Guldborgsund': 26.40,
    'Odsherred': 26.40, 'Kalundborg': 26.40, 'Sorø': 25.80,
    'Middelfart': 25.00, 'Assens': 25.30, 'Faaborg-Midtfyn': 25.50,
    'Kerteminde': 25.70, 'Nyborg': 25.50, 'Nordfyns': 25.80,
    'Langeland': 27.00, 'Ærø': 27.20, 'Haderslev': 25.30,
    'Billund': 24.30, 'Fanø': 24.20, 'Tønder': 26.00,
    'Aabenraa': 25.10, 'Sønderborg': 25.20, 'Varde': 25.40,
    'Vejen': 25.40, 'Frederikshavn': 27.00, 'Vesthimmerlands': 26.50,
    'Rebild': 25.30, 'Mariagerfjord': 26.10, 'Jammerbugt': 26.00,
    'Thisted': 26.80, 'Morsø': 27.00, 'Struer': 26.80,
    'Holstebro': 25.90, 'Lemvig': 26.70, 'Skive': 26.60,
    'Ringkøbing-Skjern': 25.80, 'Ikast-Brande': 25.80, 'Hedensted': 24.60,
    'Skanderborg': 24.00, 'Favrskov': 24.80, 'Norddjurs': 26.40,
    'Syddjurs': 25.70,
  };
  const KOMMUNE_RATES_YEAR = 2025;     // single source of truth, used in UI labels

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

  // DAWA returns kommunekode (4-digit) but NOT always kommunenavn.
  // Without this map, every address with only a kommunekode resolves to
  // "Unknown Kommune" even though we know the rate. All 98 Danish
  // kommuner, code from CPR-kontoret official register.
  const KOMMUNE_BY_CODE = {
    '0101': 'København', '0147': 'Frederiksberg', '0151': 'Ballerup', '0153': 'Brøndby',
    '0155': 'Dragør', '0157': 'Gentofte', '0159': 'Gladsaxe', '0161': 'Glostrup',
    '0163': 'Herlev', '0165': 'Albertslund', '0167': 'Hvidovre', '0169': 'Høje-Taastrup',
    '0173': 'Lyngby-Taarbæk', '0175': 'Rødovre', '0183': 'Ishøj', '0185': 'Taarnby',
    '0187': 'Vallensbæk', '0190': 'Furesø', '0201': 'Allerød', '0210': 'Fredensborg',
    '0217': 'Helsingør', '0219': 'Hillerød', '0223': 'Hørsholm', '0230': 'Rudersdal',
    '0240': 'Egedal', '0250': 'Frederikssund', '0253': 'Greve', '0259': 'Køge',
    '0260': 'Halsnæs', '0265': 'Roskilde', '0269': 'Solrød', '0270': 'Gribskov',
    '0306': 'Odsherred', '0316': 'Holbæk', '0320': 'Faxe', '0326': 'Kalundborg',
    '0329': 'Ringsted', '0330': 'Slagelse', '0336': 'Stevns', '0340': 'Sorø',
    '0350': 'Lejre', '0360': 'Lolland', '0370': 'Næstved', '0376': 'Guldborgsund',
    '0390': 'Vordingborg', '0400': 'Bornholm', '0410': 'Middelfart', '0420': 'Assens',
    '0430': 'Faaborg-Midtfyn', '0440': 'Kerteminde', '0450': 'Nyborg', '0461': 'Odense',
    '0479': 'Svendborg', '0480': 'Nordfyns', '0482': 'Langeland', '0492': 'Ærø',
    '0510': 'Haderslev', '0530': 'Billund', '0540': 'Sønderborg', '0550': 'Tønder',
    '0561': 'Esbjerg', '0563': 'Fanø', '0573': 'Varde', '0575': 'Vejen',
    '0580': 'Aabenraa', '0607': 'Fredericia', '0615': 'Horsens', '0621': 'Kolding',
    '0630': 'Vejle', '0657': 'Herning', '0661': 'Holstebro', '0665': 'Lemvig',
    '0671': 'Struer', '0706': 'Syddjurs', '0707': 'Norddjurs', '0710': 'Favrskov',
    '0727': 'Odder', '0730': 'Randers', '0740': 'Silkeborg', '0741': 'Samsø',
    '0746': 'Skanderborg', '0751': 'Aarhus', '0756': 'Ikast-Brande',
    '0760': 'Ringkøbing-Skjern', '0766': 'Hedensted', '0773': 'Morsø', '0779': 'Skive',
    '0787': 'Thisted', '0791': 'Viborg', '0810': 'Brønderslev', '0813': 'Frederikshavn',
    '0820': 'Vesthimmerlands', '0825': 'Læsø', '0840': 'Rebild', '0846': 'Mariagerfjord',
    '0849': 'Jammerbugt', '0851': 'Aalborg', '0860': 'Hjørring',
  };

  const resolveKommuneName = (adresse) => {
    if (!adresse) return '';
    return adresse.kommunenavn || KOMMUNE_BY_CODE[adresse.kommunekode] || '';
  };

  const createDAWAAutocomplete = (inputId, suggestionsId, onSelect) => {
    const input = document.getElementById(inputId);
    const suggestions = document.getElementById(suggestionsId);
    if (!input || !suggestions) return;

    // WAI-ARIA 1.2 combobox wiring. The input keeps DOM focus; the active
    // suggestion is surfaced to assistive tech via aria-activedescendant.
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', suggestionsId);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-haspopup', 'listbox');
    suggestions.setAttribute('role', 'listbox');

    const collapse = () => {
      suggestions.classList.add('hidden');
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    };
    const setActive = (el) => {
      suggestions.querySelectorAll('.dawa-item').forEach(i => { i.classList.remove('active'); i.setAttribute('aria-selected', 'false'); });
      el.classList.add('active');
      el.setAttribute('aria-selected', 'true');
      if (el.id) input.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    };

    let debounceTimer;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const q = input.value.trim();
      if (q.length < 2) { collapse(); suggestions.innerHTML = ''; return; }
      debounceTimer = setTimeout(() => fetchDAWASuggestions(q, suggestions, input, onSelect), 280);
    });

    input.addEventListener('keydown', (e) => {
      const items = suggestions.querySelectorAll('.dawa-item');
      const active = suggestions.querySelector('.dawa-item.active');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = active ? active.nextElementSibling : items[0];
        if (next) setActive(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = active ? active.previousElementSibling : items[items.length - 1];
        if (prev) setActive(prev);
      } else if (e.key === 'Enter') {
        const activeItem = suggestions.querySelector('.dawa-item.active');
        if (activeItem) { e.preventDefault(); activeItem.click(); }
      } else if (e.key === 'Escape') {
        collapse();
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        collapse();
      }
    });
  };

  const fetchDAWASuggestions = async (query, suggestionsEl, inputEl, onSelect) => {
    try {
      const res = await fetch(
        `https://api.dataforsyningen.dk/adresser/autocomplete?q=${encodeURIComponent(query)}&per_side=7&srid=4326`,
        { signal: timeoutSignal(5000) }
      );
      if (!res.ok) throw new Error(`DAWA HTTP ${res.status}`);
      const data = await res.json();

      if (!data.length) {
        suggestionsEl.innerHTML = '<div class="dawa-no-results">No addresses found — try more of the street name</div>';
        suggestionsEl.classList.remove('hidden');
        inputEl.setAttribute('aria-expanded', 'false');
        inputEl.removeAttribute('aria-activedescendant');
        return;
      }

      suggestionsEl.innerHTML = data.map((item, i) => `
        <div class="dawa-item" role="option" id="${suggestionsEl.id}-opt-${i}" aria-selected="false"
          data-tekst="${esc(item.tekst || '')}"
          data-lat="${esc(item.adresse?.y || '')}"
          data-lon="${esc(item.adresse?.x || '')}"
          data-kommune="${esc(resolveKommuneName(item.adresse))}"
          data-postnr="${esc(item.adresse?.postnr || '')}"
          data-postnrnavn="${esc(item.adresse?.postnrnavn || '')}">
          <span class="dawa-street">${esc(item.tekst || '')}</span>
        </div>
      `).join('');

      suggestionsEl.querySelectorAll('.dawa-item').forEach(item => {
        item.addEventListener('click', () => {
          inputEl.value = item.dataset.tekst;
          suggestionsEl.classList.add('hidden');
          inputEl.setAttribute('aria-expanded', 'false');
          inputEl.removeAttribute('aria-activedescendant');
          if (onSelect) onSelect({
            text:        item.dataset.tekst,
            lat:         parseFloat(item.dataset.lat) || null,
            lon:         parseFloat(item.dataset.lon) || null,
            kommune:     item.dataset.kommune,
            postnr:      item.dataset.postnr,
            postnrnavn:  item.dataset.postnrnavn,
          });
        });
        item.addEventListener('mouseenter', () => {
          suggestionsEl.querySelectorAll('.dawa-item').forEach(i => { i.classList.remove('active'); i.setAttribute('aria-selected', 'false'); });
          item.classList.add('active');
          item.setAttribute('aria-selected', 'true');
          if (item.id) inputEl.setAttribute('aria-activedescendant', item.id);
        });
      });

      suggestionsEl.classList.remove('hidden');
      inputEl.setAttribute('aria-expanded', 'true');
    } catch (e) {
      console.warn('DAWA fetch failed:', e);
      // Show user feedback inside the suggestion dropdown — silent failure
      // looks like nothing happened, which feels worse than a real error.
      suggestionsEl.innerHTML = `
        <div class="dawa-no-results" style="color:var(--brand-red);">
          ⚠️ Address service is temporarily unavailable. Please try again in a moment.
        </div>
      `;
      suggestionsEl.classList.remove('hidden');
      inputEl.setAttribute('aria-expanded', 'false');
      inputEl.removeAttribute('aria-activedescendant');
    }
  };

  const initKommuneFinder = () => {
    if (!document.getElementById('dawa-input')) return;

    createDAWAAutocomplete('dawa-input', 'dawa-suggestions', (addr) => {
      const resultEl = document.getElementById('dawa-result');
      if (!resultEl) return;

      const kommune = addr.kommune;
      const taxRate = KOMMUNE_RATES[kommune] ?? 25.1;       // 2025 national average fallback
      const info    = getKommuneInfo(kommune);
      const cheapest = Object.entries(KOMMUNE_RATES).sort((a,b) => a[1]-b[1]).slice(0,3).map(([k,r]) => `${k} (${r}%)`).join(', ');
      const diff    = (taxRate - 23.50).toFixed(2);          // baseline = København 2025
      const vsLabel = parseFloat(diff) >= 0 ? `+${diff}%` : `${diff}%`;
      const vsColor = parseFloat(diff) > 0 ? '#e55' : '#5a5';

      resultEl.innerHTML = `
        <div class="dawa-result-card">
          <div class="dawa-result-header">
            <div class="dawa-kommune-badge">
              <span class="dawa-flag">📍</span>
              <span class="dawa-kommune-name">${esc(kommune || 'Unknown')} Kommune</span>
            </div>
            <div class="dawa-postnr-badge">${esc(addr.postnr)} ${esc(addr.postnrnavn)}</div>
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

          <button class="dawa-use-rate-btn" data-rate="${taxRate}" data-kommune="${esc(kommune)}">
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

  /* Month commentary + packing tips, indexed [lang][monthIdx].
     Previously these two arrays were English-only and ran for all 10
     supported languages — non-EN users saw English month paragraphs
     and packing bullets inside an otherwise translated weather panel.
     The DEC EN line also previously said "the Danes rescue this month"
     which broke the cultural-sensitivity rule (no "Danes are X" / no
     people-agent framings). Reworded to subject-led "Christmas markets
     rescue this month" — describes the situation, not the people. */
  const MONTH_COMMENTARY = {
    en: [
      "January in Denmark — cold, dark, candle-and-Vitamin-D season. Hygge at peak levels. Lean in.",
      "February is marginally better than January. Marginally. The days are getting longer though — every extra minute of daylight is noticed and celebrated.",
      "March brings the first signs of spring. The country emerges blinking into the pale sunshine. Café terraces open optimistically, usually too early.",
      "April is genuinely lovely. Cherry blossoms, longer evenings, bikes coming out everywhere with remarkable enthusiasm.",
      "May is probably the best month in Denmark. Everything is green, the sun stays up until 9pm, and the mood lifts everywhere.",
      "June in Denmark is magical. Endless daylight, outdoor concerts, cold beers by the harbour. You'll wonder why you ever hesitated.",
      "July is peak Danish summer. Half the country goes on mandatory vacation — that's not an exaggeration. Enjoy it.",
      "August is the second-best month. Summer lingers and there's a golden quality to the light. Locally it's called 'late summer' — savour every day of it.",
      "September is still decent — like a gentle warning that winter is coming. The light turns amber and beautiful. Buy a good jacket soon.",
      "October and the country starts hunkering down. It's actually quite cosy if you lean into it. This is the month to buy candles. Many candles.",
      "November is tough, not going to lie. Grey, wet, dark. Invest in a quality rain jacket. And more candles. Vitamin D supplements help.",
      "December — Christmas markets, æbleskiver, and industrial quantities of hygge rescue this month. It's actually genuinely lovely.",
    ],
    fr: [
      "Janvier au Danemark — froid, sombre, saison des bougies et de la vitamine D. Le hygge à son apogée. Acceptez-le.",
      "Février est à peine meilleur que janvier. À peine. Mais les jours rallongent — chaque minute de lumière en plus est remarquée et fêtée.",
      "Mars apporte les premiers signes du printemps. Le pays émerge en clignant des yeux dans le pâle soleil. Les terrasses de café ouvrent avec optimisme, généralement trop tôt.",
      "Avril est vraiment délicieux. Cerisiers en fleurs, soirées plus longues, vélos qui ressortent partout avec un enthousiasme remarquable.",
      "Mai est probablement le meilleur mois au Danemark. Tout est vert, le soleil reste jusqu'à 21h, et l'humeur s'élève partout.",
      "Juin au Danemark est magique. Lumière infinie, concerts en plein air, bières fraîches sur le port. Vous vous demanderez pourquoi vous avez hésité.",
      "Juillet est le pic de l'été danois. La moitié du pays part en vacances obligatoires — ce n'est pas une exagération. Profitez-en.",
      "Août est le deuxième meilleur mois. L'été s'attarde et la lumière a une qualité dorée. On l'appelle localement « fin d'été » — savourez chaque jour.",
      "Septembre est encore correct — comme un avertissement doux que l'hiver arrive. La lumière vire à l'ambre et devient belle. Achetez vite une bonne veste.",
      "Octobre et le pays se replie. C'est en fait assez douillet si on l'accepte. C'est le mois pour acheter des bougies. Beaucoup de bougies.",
      "Novembre est dur, on ne va pas mentir. Gris, humide, sombre. Investissez dans une bonne veste de pluie. Et plus de bougies. Les compléments de vitamine D aident.",
      "Décembre — les marchés de Noël, les æbleskiver et des quantités industrielles de hygge sauvent ce mois. C'est vraiment adorable.",
    ],
    ar: [
      "يناير في الدنمارك — بارد ومظلم، موسم الشموع وفيتامين د. الـ hygge في ذروته. تقبّله.",
      "فبراير أفضل قليلاً من يناير. قليلاً فقط. لكن الأيام تطول — كل دقيقة ضوء إضافية تُلاحَظ ويُحتفل بها.",
      "مارس يجلب أولى علامات الربيع. تخرج البلاد رامشةً تحت أشعة الشمس الباهتة. تفتح شرفات المقاهي بتفاؤل، عادةً مبكراً جداً.",
      "أبريل لطيف فعلاً. أزهار الكرز، أمسيات أطول، الدراجات تظهر في كل مكان بحماس ملحوظ.",
      "مايو ربما يكون أفضل شهر في الدنمارك. كل شيء أخضر، الشمس تبقى حتى التاسعة مساءً، والمزاج يرتفع في كل مكان.",
      "يونيو في الدنمارك ساحر. ضوء لا ينتهي، حفلات في الهواء الطلق، بيرة باردة على الميناء. ستتساءل لماذا ترددت.",
      "يوليو ذروة الصيف الدنماركي. نصف البلاد يذهب في إجازة إلزامية — وهذا ليس مبالغة. استمتع به.",
      "أغسطس ثاني أفضل شهر. الصيف يبقى وللضوء جودة ذهبية. يُسمى محلياً «أواخر الصيف» — تذوّق كل يوم.",
      "سبتمبر لا يزال جيداً — كتحذير لطيف بقدوم الشتاء. الضوء يصبح كهرمانياً وجميلاً. اشترِ سترة جيدة قريباً.",
      "أكتوبر والبلاد تنطوي. الواقع أنه دافئ إن قبلته. هذا شهر شراء الشموع. الكثير من الشموع.",
      "نوفمبر صعب، لن نكذب. رمادي، رطب، مظلم. استثمر في سترة مطر جيدة. والمزيد من الشموع. مكملات فيتامين د تساعد.",
      "ديسمبر — أسواق الميلاد والـ æbleskiver وكميات صناعية من الـ hygge تنقذ هذا الشهر. إنه لطيف فعلاً.",
    ],
    es: [
      "Enero en Dinamarca — frío, oscuro, temporada de velas y vitamina D. Hygge al máximo. Acéptalo.",
      "Febrero es marginalmente mejor que enero. Marginalmente. Pero los días se alargan — cada minuto extra de luz se nota y se celebra.",
      "Marzo trae las primeras señales de primavera. El país emerge parpadeando bajo el sol pálido. Las terrazas de café abren con optimismo, normalmente demasiado pronto.",
      "Abril es genuinamente encantador. Cerezos en flor, tardes más largas, bicis que salen por todas partes con un entusiasmo notable.",
      "Mayo es probablemente el mejor mes de Dinamarca. Todo está verde, el sol se queda hasta las 21h, y el ánimo sube en todos lados.",
      "Junio en Dinamarca es mágico. Luz infinita, conciertos al aire libre, cervezas frías en el puerto. Te preguntarás por qué dudaste.",
      "Julio es el pico del verano danés. La mitad del país se va de vacaciones obligatorias — no exagero. Disfrútalo.",
      "Agosto es el segundo mejor mes. El verano se queda y la luz tiene una calidad dorada. Localmente se llama «final del verano» — saborea cada día.",
      "Septiembre sigue siendo decente — como un aviso amable de que llega el invierno. La luz se vuelve ámbar y bella. Compra una buena chaqueta pronto.",
      "Octubre y el país empieza a recogerse. La verdad es bastante acogedor si te dejas llevar. Es el mes de comprar velas. Muchas velas.",
      "Noviembre es duro, no vamos a mentir. Gris, húmedo, oscuro. Invierte en una buena gabardina. Y más velas. Los suplementos de vitamina D ayudan.",
      "Diciembre — los mercados de Navidad, las æbleskiver y cantidades industriales de hygge rescatan este mes. Es realmente encantador.",
    ],
    da: [
      "Januar i Danmark — koldt, mørkt, lys- og D-vitamin-sæson. Hygge på topplan. Læn dig ind i det.",
      "Februar er marginalt bedre end januar. Marginalt. Men dagene bliver længere — hvert ekstra minut af dagslys bliver bemærket og fejret.",
      "Marts bringer de første tegn på forår. Landet kommer blinkende frem i det blege solskin. Cafétageterrasser åbner optimistisk, som regel for tidligt.",
      "April er virkelig dejlig. Kirsebærblomster, længere aftener, cykler kommer frem overalt med bemærkelsesværdig begejstring.",
      "Maj er nok den bedste måned i Danmark. Alt er grønt, solen står oppe til kl. 21, og humøret løfter sig alle steder.",
      "Juni i Danmark er magisk. Endeløst dagslys, udendørs koncerter, kolde øl ved havnen. Du vil undre dig over, hvorfor du tøvede.",
      "Juli er højdepunktet af dansk sommer. Halvdelen af landet tager på obligatorisk ferie — det er ikke overdrevet. Nyd det.",
      "August er den næstbedste måned. Sommeren hænger ved, og lyset har en gylden kvalitet. Lokalt kaldes det \"sensommer\" — nyd hver dag.",
      "September er stadig okay — som en blid advarsel om, at vinteren kommer. Lyset bliver ravgult og smukt. Køb en god jakke snart.",
      "Oktober, og landet begynder at trække sig sammen. Det er faktisk ret hyggeligt, hvis du læner dig ind. Det er måneden til at købe stearinlys. Mange stearinlys.",
      "November er hårdt, vi løber ikke fra det. Gråt, vådt, mørkt. Invester i en god regnjakke. Og flere stearinlys. D-vitamintilskud hjælper.",
      "December — julemarkeder, æbleskiver og industrielle mængder hygge redder denne måned. Det er faktisk virkelig dejligt.",
    ],
    de: [
      "Januar in Dänemark — kalt, dunkel, Kerzen- und Vitamin-D-Saison. Hygge auf Höchststand. Lehne dich hinein.",
      "Februar ist marginal besser als Januar. Marginal. Aber die Tage werden länger — jede zusätzliche Minute Tageslicht wird bemerkt und gefeiert.",
      "März bringt die ersten Frühlingszeichen. Das Land tritt blinzelnd in das blasse Sonnenlicht. Café-Terrassen öffnen optimistisch, meistens zu früh.",
      "April ist wirklich schön. Kirschblüten, längere Abende, Fahrräder kommen überall mit bemerkenswertem Enthusiasmus heraus.",
      "Mai ist wahrscheinlich der beste Monat in Dänemark. Alles ist grün, die Sonne bleibt bis 21 Uhr, und die Stimmung hebt sich überall.",
      "Juni in Dänemark ist magisch. Endloses Tageslicht, Open-Air-Konzerte, kaltes Bier am Hafen. Du wirst dich fragen, warum du gezögert hast.",
      "Juli ist der Höhepunkt des dänischen Sommers. Die Hälfte des Landes geht in den obligatorischen Urlaub — das ist keine Übertreibung. Genieße es.",
      "August ist der zweitbeste Monat. Der Sommer bleibt und das Licht hat eine goldene Qualität. Lokal heißt es „Spätsommer\" — koste jeden Tag aus.",
      "September ist noch ordentlich — wie eine sanfte Warnung, dass der Winter kommt. Das Licht wird bernsteinfarben und schön. Kaufe bald eine gute Jacke.",
      "Oktober und das Land zieht sich zurück. Es ist eigentlich ganz gemütlich, wenn man sich darauf einlässt. Das ist der Monat, um Kerzen zu kaufen. Viele Kerzen.",
      "November ist hart, ehrlich gesagt. Grau, nass, dunkel. Investiere in eine gute Regenjacke. Und mehr Kerzen. Vitamin-D-Präparate helfen.",
      "Dezember — Weihnachtsmärkte, æbleskiver und industrielle Mengen Hygge retten diesen Monat. Es ist tatsächlich richtig schön.",
    ],
    uk: [
      "Січень у Данії — холодний, темний, сезон свічок і вітаміну D. Хюґе на піку. Прийміть це.",
      "Лютий лише трохи кращий за січень. Лише трохи. Але дні стають довшими — кожна додаткова хвилина денного світла помічена та святкується.",
      "Березень приносить перші ознаки весни. Країна виходить, мружачись, у бліде сонячне світло. Тераси кафе відкриваються з оптимізмом, зазвичай зарано.",
      "Квітень справді чудовий. Цвітіння вишень, довші вечори, велосипеди з'являються всюди з помітним ентузіазмом.",
      "Травень, мабуть, найкращий місяць у Данії. Все зелене, сонце стоїть до 21:00, і настрій піднімається всюди.",
      "Червень у Данії — магія. Безмежне денне світло, концерти просто неба, холодне пиво в гавані. Ви запитаєте, чому вагалися.",
      "Липень — пік данського літа. Половина країни йде в обов'язкову відпустку — це не перебільшення. Насолоджуйтесь.",
      "Серпень — другий найкращий місяць. Літо тримається, а світло має золотистий відтінок. Локально це називають \"пізнє літо\" — смакуйте кожен день.",
      "Вересень ще пристойний — як м'яке попередження, що зима наближається. Світло стає бурштиновим і красивим. Купіть хорошу куртку незабаром.",
      "Жовтень, і країна починає закриватися. Насправді досить затишно, якщо прийняти це. Це місяць купівлі свічок. Багатьох свічок.",
      "Листопад важкий, не будемо приховувати. Сірий, мокрий, темний. Інвестуйте в якісний дощовик. І ще свічок. Добавки вітаміну D допомагають.",
      "Грудень — різдвяні ярмарки, æbleskiver і промислові кількості хюґе рятують цей місяць. Він справді чудовий.",
    ],
    pl: [
      "Styczeń w Danii — zimno, ciemno, sezon świec i witaminy D. Hygge na szczycie. Daj się wciągnąć.",
      "Luty jest tylko nieco lepszy niż styczeń. Tylko nieco. Ale dni się wydłużają — każda dodatkowa minuta światła dziennego jest zauważana i świętowana.",
      "Marzec przynosi pierwsze oznaki wiosny. Kraj wyłania się mrużąc oczy w bladym słońcu. Tarasy kawiarni otwierają się optymistycznie, zazwyczaj za wcześnie.",
      "Kwiecień jest naprawdę uroczy. Kwitnące wiśnie, dłuższe wieczory, rowery wyjeżdżające wszędzie z godnym uwagi entuzjazmem.",
      "Maj jest prawdopodobnie najlepszym miesiącem w Danii. Wszystko jest zielone, słońce zostaje do 21:00, a nastrój wzrasta wszędzie.",
      "Czerwiec w Danii jest magiczny. Niekończące się światło, koncerty na świeżym powietrzu, zimne piwa w porcie. Zapytasz, dlaczego się wahałeś.",
      "Lipiec to szczyt duńskiego lata. Połowa kraju idzie na obowiązkowe wakacje — to nie przesada. Ciesz się tym.",
      "Sierpień jest drugim najlepszym miesiącem. Lato trwa, a światło ma złoty odcień. Lokalnie nazywane „późnym latem\" — delektuj się każdym dniem.",
      "Wrzesień jest jeszcze przyzwoity — jak delikatne ostrzeżenie, że nadchodzi zima. Światło staje się bursztynowe i piękne. Kup dobrą kurtkę wkrótce.",
      "Październik i kraj zaczyna się zamykać. Tak naprawdę jest dość przytulnie, jeśli się temu poddasz. To miesiąc kupowania świec. Wielu świec.",
      "Listopad jest trudny, nie będziemy ukrywać. Szary, mokry, ciemny. Zainwestuj w dobry płaszcz przeciwdeszczowy. I więcej świec. Suplementy witaminy D pomagają.",
      "Grudzień — jarmarki bożonarodzeniowe, æbleskiver i przemysłowe ilości hygge ratują ten miesiąc. Naprawdę jest cudowny.",
    ],
    ur: [
      "ڈنمارک میں جنوری — سرد، اندھیرا، موم بتیوں اور وٹامن ڈی کا موسم۔ ہیوگے اپنے عروج پر۔ اسے قبول کریں۔",
      "فروری جنوری سے تھوڑا بہتر ہے۔ بس تھوڑا۔ مگر دن طویل ہو رہے ہیں — ہر اضافی منٹ کی روشنی محسوس کی جاتی ہے اور منائی جاتی ہے۔",
      "مارچ بہار کی پہلی علامتیں لاتا ہے۔ ملک ہلکی دھوپ میں آنکھیں مٹکاتے ہوئے نکلتا ہے۔ کیفے کی چھتیں امید سے کھلتی ہیں، عام طور پر بہت جلدی۔",
      "اپریل واقعی خوبصورت ہوتا ہے۔ چیری بلاسم، لمبی شامیں، سائیکلیں ہر جگہ نمایاں جوش کے ساتھ نکلتی ہیں۔",
      "مئی شاید ڈنمارک کا بہترین مہینہ ہے۔ سب کچھ سبز، سورج رات 9 بجے تک ٹھہرتا ہے، اور موڈ ہر جگہ بلند ہوتا ہے۔",
      "ڈنمارک میں جون جادوئی ہے۔ لامحدود روشنی، کھلے میں کنسرٹس، بندرگاہ پر ٹھنڈی بیئر۔ آپ سوچیں گے کہ آپ نے کیوں ہچکچایا تھا۔",
      "جولائی ڈنمارک کی گرمی کا عروج ہے۔ ملک کا نصف لازمی چھٹی پر جاتا ہے — یہ مبالغہ نہیں۔ لطف اٹھائیں۔",
      "اگست دوسرا بہترین مہینہ ہے۔ گرمی ٹھہرتی ہے اور روشنی میں سنہری کیفیت ہے۔ مقامی طور پر «آخر گرما» کہلاتا ہے — ہر دن کا مزہ لیں۔",
      "ستمبر اب بھی قابل قبول ہے — سردیوں کے آنے کی ایک نرم تنبیہ کی طرح۔ روشنی عنبری اور خوبصورت ہو جاتی ہے۔ جلد ایک اچھی جیکٹ خریدیں۔",
      "اکتوبر اور ملک سمٹنا شروع کرتا ہے۔ اگر آپ اسے قبول کر لیں تو دراصل کافی پُرسکون ہے۔ یہ موم بتیاں خریدنے کا مہینہ ہے۔ بہت سی موم بتیاں۔",
      "نومبر مشکل ہے، جھوٹ نہیں بولیں گے۔ سرمئی، گیلا، اندھیرا۔ ایک معیاری بارش کوٹ میں سرمایہ کاری کریں۔ اور مزید موم بتیاں۔ وٹامن ڈی کے سپلیمنٹس مدد کرتے ہیں۔",
      "دسمبر — کرسمس مارکیٹیں، æbleskiver اور صنعتی مقدار میں ہیوگے اس مہینے کو بچا لیتے ہیں۔ یہ واقعی خوبصورت ہے۔",
    ],
    fa: [
      "ژانویه در دانمارک — سرد، تاریک، فصل شمع و ویتامین D. هیوگه در اوج. تن دهید.",
      "فوریه فقط کمی بهتر از ژانویه است. فقط کمی. اما روزها بلندتر می‌شوند — هر دقیقه اضافی روشنایی روز دیده و جشن گرفته می‌شود.",
      "مارس اولین نشانه‌های بهار را می‌آورد. کشور چشم‌چرخانان به نور کم‌رنگ خورشید بیرون می‌آید. تراس‌های کافه با خوش‌بینی باز می‌شوند، معمولاً خیلی زود.",
      "آوریل واقعاً دلپذیر است. شکوفه‌های گیلاس، عصرهای بلندتر، دوچرخه‌هایی که با شوق چشمگیر همه‌جا بیرون می‌آیند.",
      "مه احتمالاً بهترین ماه دانمارک است. همه‌چیز سبز است، خورشید تا ساعت ۹ شب می‌ماند، و حال‌وهوا همه‌جا بلند می‌شود.",
      "ژوئن در دانمارک جادویی است. روشنایی بی‌پایان، کنسرت‌های روباز، آبجوی خنک در بندر. از خود می‌پرسید چرا تردید کردید.",
      "ژوئیه اوج تابستان دانمارکی است. نیمی از کشور به تعطیلات اجباری می‌رود — این اغراق نیست. لذت ببرید.",
      "اوت دومین ماه بهترین است. تابستان می‌ماند و نور کیفیتی طلایی دارد. به‌طور محلی «اواخر تابستان» نامیده می‌شود — هر روز را بچشید.",
      "سپتامبر هنوز خوب است — مانند هشداری ملایم که زمستان در راه است. نور به رنگ کهربایی و زیبا درمی‌آید. به‌زودی یک کاپشن خوب بخرید.",
      "اکتبر و کشور شروع به جمع شدن می‌کند. در واقع اگر بپذیرید، نسبتاً دنج است. این ماه خرید شمع است. شمع‌های زیاد.",
      "نوامبر سخت است، دروغ نمی‌گوییم. خاکستری، خیس، تاریک. روی یک بارانی باکیفیت سرمایه‌گذاری کنید. و شمع بیشتر. مکمل‌های ویتامین D کمک می‌کنند.",
      "دسامبر — بازارهای کریسمس، æbleskiver و مقادیر صنعتی هیوگه این ماه را نجات می‌دهند. واقعاً دلپذیر است.",
    ],
  };

  const PACKING_TIPS = {
    en: [
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
    ],
    fr: [
      ['🧥 Manteau d\'hiver épais', '🧤 Gants et écharpe', '🥾 Bottes imperméables', '💡 Compléments vitamine D', '🕯️ Bougies pour le hygge'],
      ['🧥 Manteau d\'hiver', '🧤 Couches thermiques', '🥾 Bottes imperméables', '💡 Vitamine D', '🕯️ Plus de bougies'],
      ['🧣 Veste légère à mi-saison', '☂️ Parapluie (toujours)', '👟 Chaussures confortables', '🌸 Cerisiers en fleurs', '☕ Profitez des terrasses'],
      ['🌂 Veste de pluie', '👕 Couches (matins froids)', '🚲 Temps idéal pour le vélo !', '🌸 Les parcs sont splendides', '☀️ Lunettes de soleil — vraiment'],
      ['👕 Couches légères', '🌂 Parapluie pliable', '🚲 Vraiment le temps du vélo', '🍦 Goûtez la glace molle', '☀️ Crème solaire nécessaire'],
      ['👕 T-shirts + veste légère', '🌂 Parapluie au cas où', '🚲 Mois idéal pour le vélo', '🍺 Bars du port ouverts', '🎵 Consultez les concerts'],
      ['☀️ Crème solaire (oui, au Danemark !)', '👕 Vêtements d\'été', '🌂 Toujours un parapluie', '🏖️ Journées plage possibles', '🧴 Anti-moustique le soir'],
      ['👕 Tenues d\'été à légères', '🌂 Veste de pluie', '🍂 Observez la lumière dorée', '🚲 Vélo toujours top', '🍎 Saison des pommes commence'],
      ['🧥 Veste légère essentielle', '🌂 Parapluie indispensable', '🍂 Belles couleurs d\'automne', '☕ Pic de la culture café', '🕯️ Commencez la collection de bougies'],
      ['🧥 Veste chaude', '🌂 Équipement pluie', '🕯️ La collection de bougies commence', '🍎 Saison des pommes', '📚 Bon mois de lecture en intérieur'],
      ['🧥 Manteau d\'hiver', '☂️ Veste de pluie + parapluie', '🕯️ Beaucoup de bougies', '📚 Bon mois en intérieur', '💡 Compléments vitamine D'],
      ['🧥 Manteau d\'hiver chaud', '🎄 Esprit de Noël prêt', '🍷 Goûtez le vin chaud / glögg', '🕯️ Nombre maximum de bougies', '🧁 Æbleskiver aux marchés'],
    ],
    ar: [
      ['🧥 معطف شتوي ثقيل', '🧤 قفازات ووشاح', '🥾 جزمة مقاومة للماء', '💡 مكملات فيتامين د', '🕯️ شموع للهيوغه'],
      ['🧥 معطف شتوي', '🧤 طبقات حرارية', '🥾 جزمة مقاومة للماء', '💡 فيتامين د', '🕯️ المزيد من الشموع'],
      ['🧣 سترة خفيفة-متوسطة', '☂️ مظلة (دائماً)', '👟 حذاء مريح', '🌸 ترقّب أزهار الكرز', '☕ استمتع بشرفات المقاهي'],
      ['🌂 سترة مطر', '👕 طبقات (الصباح بارد)', '🚲 طقس مثالي للدراجة!', '🌸 الحدائق رائعة الآن', '☀️ نظارات شمسية — نعم، فعلاً'],
      ['👕 طبقات خفيفة', '🌂 مظلة قابلة للطي', '🚲 طقس مثالي للدراجة', '🍦 جرّب الآيس كريم اللين', '☀️ كريم شمسي ضروري'],
      ['👕 تي شيرت + سترة خفيفة', '🌂 مظلة احتياطية', '🚲 شهر الدراجة المثالي', '🍺 حانات الميناء مفتوحة', '🎵 راجع برامج الحفلات'],
      ['☀️ كريم شمسي (نعم، في الدنمارك!)', '👕 ملابس صيفية', '🌂 دائماً مظلة', '🏖️ أيام شاطئ ممكنة', '🧴 طارد البعوض في المساء'],
      ['👕 ملابس صيفية إلى طبقات خفيفة', '🌂 سترة مطر', '🍂 شاهد الضوء الذهبي', '🚲 الدراجة لا تزال ممتازة', '🍎 موسم التفاح يبدأ'],
      ['🧥 سترة خفيفة ضرورية', '🌂 المظلة لا غنى عنها', '🍂 ألوان خريفية جميلة', '☕ ذروة ثقافة المقاهي', '🕯️ ابدأ مجموعة الشموع'],
      ['🧥 سترة دافئة', '🌂 عُدّة المطر', '🕯️ تبدأ مجموعة الشموع', '🍎 موسم التفاح', '📚 شهر جيد للقراءة في الداخل'],
      ['🧥 معطف شتوي', '☂️ سترة مطر + مظلة', '🕯️ شموع كثيرة', '📚 شهر جيد في الداخل', '💡 مكملات فيتامين د'],
      ['🧥 معطف شتوي دافئ', '🎄 روح الميلاد جاهزة', '🍷 جرّب النبيذ المُدفّأ / glögg', '🕯️ أقصى عدد من الشموع', '🧁 Æbleskiver في الأسواق'],
    ],
    es: [
      ['🧥 Abrigo de invierno grueso', '🧤 Guantes y bufanda', '🥾 Botas impermeables', '💡 Suplementos de vitamina D', '🕯️ Velas para el hygge'],
      ['🧥 Abrigo de invierno', '🧤 Capas térmicas', '🥾 Botas impermeables', '💡 Vitamina D', '🕯️ Más velas'],
      ['🧣 Chaqueta media', '☂️ Paraguas (siempre)', '👟 Zapatos cómodos', '🌸 Cerezos en flor', '☕ Disfruta las terrazas'],
      ['🌂 Impermeable', '👕 Capas (mañanas frías)', '🚲 ¡Tiempo perfecto para bici!', '🌸 Los parques están preciosos', '☀️ Gafas de sol — en serio'],
      ['👕 Capas ligeras', '🌂 Paraguas plegable', '🚲 Definitivamente para bici', '🍦 Prueba el helado blando', '☀️ Crema solar necesaria'],
      ['👕 Camisetas + chaqueta ligera', '🌂 Paraguas por si acaso', '🚲 Mes ideal para bici', '🍺 Bares del puerto abiertos', '🎵 Mira las carteleras de conciertos'],
      ['☀️ Crema solar (¡sí, en Dinamarca!)', '👕 Ropa de verano', '🌂 Siempre un paraguas', '🏖️ Días de playa posibles', '🧴 Repelente de mosquitos por las noches'],
      ['👕 Verano a capas ligeras', '🌂 Impermeable', '🍂 Observa la luz dorada', '🚲 Bici sigue siendo perfecta', '🍎 Empieza la temporada de manzanas'],
      ['🧥 Chaqueta ligera esencial', '🌂 El paraguas es obligatorio', '🍂 Bonitos colores de otoño', '☕ La cultura del café en su mejor momento', '🕯️ Empieza la colección de velas'],
      ['🧥 Chaqueta cálida', '🌂 Equipo de lluvia', '🕯️ Empieza la colección de velas', '🍎 Temporada de manzanas', '📚 Buen mes para leer en casa'],
      ['🧥 Abrigo de invierno', '☂️ Impermeable + paraguas', '🕯️ Muchas velas', '📚 Buen mes en interiores', '💡 Suplementos de vitamina D'],
      ['🧥 Abrigo de invierno cálido', '🎄 Espíritu navideño activado', '🍷 Prueba el vino caliente / glögg', '🕯️ Velas al máximo', '🧁 Æbleskiver en los mercados'],
    ],
    da: [
      ['🧥 Tyk vinterfrakke', '🧤 Handsker og halstørklæde', '🥾 Vandtætte støvler', '💡 D-vitamintilskud', '🕯️ Stearinlys til hygge'],
      ['🧥 Vinterfrakke', '🧤 Termolag', '🥾 Vandtætte støvler', '💡 D-vitamin', '🕯️ Flere stearinlys'],
      ['🧣 Let-mellem jakke', '☂️ Paraply (altid)', '👟 Behagelige sko', '🌸 Hold øje med kirsebærblomster', '☕ Nyd udendørs caféer'],
      ['🌂 Regnjakke', '👕 Lag på lag (kolde morgener)', '🚲 Perfekt cykelvejr!', '🌸 Parkerne er smukke', '☀️ Solbriller — ja, virkelig'],
      ['👕 Lette lag', '🌂 Sammenklappelig paraply', '🚲 Helt klart cykelvejr', '🍦 Prøv softice', '☀️ Solcreme nødvendig'],
      ['👕 T-shirts + let jakke', '🌂 Paraply for en sikkerheds skyld', '🚲 Perfekt cykelmåned', '🍺 Havnebarer er åbne', '🎵 Tjek koncertkalender'],
      ['☀️ Solcreme (ja, i Danmark!)', '👕 Sommertøj', '🌂 Altid en paraply', '🏖️ Stranddage muligt', '🧴 Myggespray om aftenen'],
      ['👕 Sommer til lette lag', '🌂 Regnjakke', '🍂 Hold øje med det gyldne lys', '🚲 Stadig fantastisk cykelvejr', '🍎 Æblesæsonen starter'],
      ['🧥 Let jakke essentiel', '🌂 Paraply er ikke til diskussion', '🍂 Smukke efterårsfarver', '☕ Cafékulturen topper', '🕯️ Begynd stearinlys-samlingen'],
      ['🧥 Varm jakke', '🌂 Regntøj', '🕯️ Stearinlys-samlingen begynder', '🍎 Æblesæson', '📚 God måned at læse indenfor'],
      ['🧥 Vinterfrakke', '☂️ Regnjakke + paraply', '🕯️ Mange stearinlys', '📚 God indendørs måned', '💡 D-vitamintilskud'],
      ['🧥 Varm vinterfrakke', '🎄 Juleånd klar', '🍷 Prøv gløgg', '🕯️ Maksimalt antal stearinlys', '🧁 Æbleskiver på julemarkederne'],
    ],
    de: [
      ['🧥 Dicker Wintermantel', '🧤 Handschuhe und Schal', '🥾 Wasserdichte Stiefel', '💡 Vitamin-D-Präparate', '🕯️ Kerzen für Hygge'],
      ['🧥 Wintermantel', '🧤 Thermo-Schichten', '🥾 Wasserdichte Stiefel', '💡 Vitamin D', '🕯️ Mehr Kerzen'],
      ['🧣 Leichte-bis-mittlere Jacke', '☂️ Regenschirm (immer)', '👟 Bequeme Schuhe', '🌸 Kirschblüten beobachten', '☕ Außenterrassen genießen'],
      ['🌂 Regenjacke', '👕 Zwiebel-Look (kalte Morgen)', '🚲 Perfektes Fahrradwetter!', '🌸 Parks sind wunderschön', '☀️ Sonnenbrille — ja, wirklich'],
      ['👕 Leichte Schichten', '🌂 Faltbarer Regenschirm', '🚲 Definitiv Fahrradwetter', '🍦 Softeis probieren', '☀️ Sonnencreme nötig'],
      ['👕 T-Shirts + leichte Jacke', '🌂 Regenschirm zur Sicherheit', '🚲 Perfekter Fahrradmonat', '🍺 Hafenbars geöffnet', '🎵 Konzertkalender prüfen'],
      ['☀️ Sonnencreme (ja, in Dänemark!)', '👕 Sommerkleidung', '🌂 Immer ein Regenschirm', '🏖️ Strandtage möglich', '🧴 Mückenspray abends'],
      ['👕 Sommer- bis leichte Schichten', '🌂 Regenjacke', '🍂 Goldenes Licht beobachten', '🚲 Immer noch top zum Radeln', '🍎 Apfelsaison beginnt'],
      ['🧥 Leichte Jacke unverzichtbar', '🌂 Regenschirm ist Pflicht', '🍂 Schöne Herbstfarben', '☕ Café-Kultur erreicht Höhepunkt', '🕯️ Kerzensammlung beginnen'],
      ['🧥 Warme Jacke', '🌂 Regenausrüstung', '🕯️ Kerzensammlung beginnt', '🍎 Apfelsaison', '📚 Guter Lesemonat drinnen'],
      ['🧥 Wintermantel', '☂️ Regenjacke + Schirm', '🕯️ Viele Kerzen', '📚 Guter Innenraum-Monat', '💡 Vitamin-D-Präparate'],
      ['🧥 Warmer Wintermantel', '🎄 Weihnachtsstimmung bereit', '🍷 Glühwein / glögg probieren', '🕯️ Maximale Kerzenzahl', '🧁 Æbleskiver auf den Märkten'],
    ],
    uk: [
      ['🧥 Тепле зимове пальто', '🧤 Рукавички та шарф', '🥾 Водостійкі чоботи', '💡 Вітамін D', '🕯️ Свічки для хюґе'],
      ['🧥 Зимове пальто', '🧤 Термошари', '🥾 Водостійкі чоботи', '💡 Вітамін D', '🕯️ Більше свічок'],
      ['🧣 Легка-середня куртка', '☂️ Парасолька (завжди)', '👟 Зручне взуття', '🌸 Слідкуйте за вишнями', '☕ Терасні кафе'],
      ['🌂 Дощовик', '👕 Шари (вранці прохолодно)', '🚲 Ідеальна велопогода!', '🌸 Парки тепер чудові', '☀️ Окуляри — справді'],
      ['👕 Легкі шари', '🌂 Складна парасолька', '🚲 Точно велопогода', '🍦 Спробуйте м\'яке морозиво', '☀️ Сонцезахист потрібен'],
      ['👕 Футболки + легка куртка', '🌂 Парасолька про всяк випадок', '🚲 Ідеальний велосипедний місяць', '🍺 Бари в порту відкриті', '🎵 Перевіряйте афішу концертів'],
      ['☀️ Сонцезахист (так, у Данії!)', '👕 Літній одяг', '🌂 Завжди парасолька', '🏖️ Можливі дні на пляжі', '🧴 Засіб від комарів увечері'],
      ['👕 Літо до легких шарів', '🌂 Дощовик', '🍂 Дивіться на золотисте світло', '🚲 Велосипед ще чудовий', '🍎 Починається сезон яблук'],
      ['🧥 Легка куртка обов\'язкова', '🌂 Парасолька — невід\'ємна', '🍂 Прекрасні осінні барви', '☕ Пік кафе-культури', '🕯️ Починайте колекцію свічок'],
      ['🧥 Тепла куртка', '🌂 Дощовий комплект', '🕯️ Починається колекція свічок', '🍎 Сезон яблук', '📚 Гарний місяць для читання вдома'],
      ['🧥 Зимове пальто', '☂️ Дощовик + парасолька', '🕯️ Багато свічок', '📚 Гарний місяць для дому', '💡 Вітамін D'],
      ['🧥 Тепле зимове пальто', '🎄 Різдвяний настрій готовий', '🍷 Спробуйте глінтвейн / glögg', '🕯️ Максимум свічок', '🧁 Æbleskiver на ярмарках'],
    ],
    pl: [
      ['🧥 Ciepły płaszcz zimowy', '🧤 Rękawiczki i szalik', '🥾 Wodoodporne buty', '💡 Suplementy witaminy D', '🕯️ Świece dla hygge'],
      ['🧥 Płaszcz zimowy', '🧤 Warstwy termiczne', '🥾 Wodoodporne buty', '💡 Witamina D', '🕯️ Więcej świec'],
      ['🧣 Lekka kurtka', '☂️ Parasol (zawsze)', '👟 Wygodne buty', '🌸 Kwitnące wiśnie', '☕ Tarasy kawiarni'],
      ['🌂 Płaszcz przeciwdeszczowy', '👕 Warstwy (zimne poranki)', '🚲 Idealna pogoda rowerowa!', '🌸 Parki są piękne', '☀️ Okulary — tak, naprawdę'],
      ['👕 Lekkie warstwy', '🌂 Składany parasol', '🚲 Zdecydowanie na rower', '🍦 Spróbuj lodów świderków', '☀️ Krem przeciwsłoneczny'],
      ['👕 T-shirty + lekka kurtka', '🌂 Parasol na wszelki wypadek', '🚲 Idealny miesiąc rowerowy', '🍺 Bary nad portem otwarte', '🎵 Sprawdź afisz koncertów'],
      ['☀️ Krem przeciwsłoneczny (tak, w Danii!)', '👕 Letnie ubrania', '🌂 Zawsze parasol', '🏖️ Możliwe dni na plaży', '🧴 Środek na komary wieczorem'],
      ['👕 Lato do lekkich warstw', '🌂 Płaszcz przeciwdeszczowy', '🍂 Patrz na złote światło', '🚲 Rower nadal świetny', '🍎 Zaczyna się sezon jabłek'],
      ['🧥 Lekka kurtka niezbędna', '🌂 Parasol obowiązkowy', '🍂 Piękne barwy jesieni', '☕ Szczyt kultury kawiarnianej', '🕯️ Zacznij kolekcję świec'],
      ['🧥 Ciepła kurtka', '🌂 Akcesoria przeciwdeszczowe', '🕯️ Zaczyna się kolekcja świec', '🍎 Sezon jabłek', '📚 Dobry miesiąc na czytanie w domu'],
      ['🧥 Płaszcz zimowy', '☂️ Płaszcz + parasol', '🕯️ Mnóstwo świec', '📚 Dobry miesiąc w domu', '💡 Suplementy witaminy D'],
      ['🧥 Ciepły płaszcz zimowy', '🎄 Świąteczny nastrój', '🍷 Spróbuj grzanego wina / glögg', '🕯️ Maksimum świec', '🧁 Æbleskiver na jarmarkach'],
    ],
    ur: [
      ['🧥 موٹا سرما کوٹ', '🧤 دستانے اور مفلر', '🥾 پانی روک بوٹ', '💡 وٹامن ڈی سپلیمنٹس', '🕯️ ہیوگے کے لیے موم بتیاں'],
      ['🧥 سرما کوٹ', '🧤 تھرمل تہیں', '🥾 پانی روک بوٹ', '💡 وٹامن ڈی', '🕯️ زیادہ موم بتیاں'],
      ['🧣 ہلکی درمیانی جیکٹ', '☂️ چھتری (ہمیشہ)', '👟 آرام دہ جوتے', '🌸 چیری بلاسم پر نظر', '☕ کھلی کیفے سے لطف اٹھائیں'],
      ['🌂 بارش جیکٹ', '👕 تہیں (صبح ٹھنڈی)', '🚲 سائیکل کا بہترین موسم!', '🌸 پارک خوبصورت ہیں', '☀️ دھوپ کا چشمہ — ہاں، واقعی'],
      ['👕 ہلکی تہیں', '🌂 فولڈ ایبل چھتری', '🚲 یقیناً سائیکل کا موسم', '🍦 نرم آئس کریم آزمائیں', '☀️ سن اسکرین چاہیے'],
      ['👕 ٹی شرٹ + ہلکی جیکٹ', '🌂 چھتری احتیاطاً', '🚲 سائیکل کا بہترین مہینہ', '🍺 بندرگاہی بار کھلے', '🎵 کنسرٹ کی فہرست دیکھیں'],
      ['☀️ سن اسکرین (جی ہاں، ڈنمارک میں!)', '👕 گرمیوں کے کپڑے', '🌂 ہمیشہ ایک چھتری', '🏖️ ساحل کے دن ممکن', '🧴 شام کو مچھر بھگانے والا'],
      ['👕 گرما سے ہلکی تہیں', '🌂 بارش جیکٹ', '🍂 سنہری روشنی دیکھیں', '🚲 ابھی بھی بہترین سائیکل', '🍎 سیب کا موسم شروع'],
      ['🧥 ہلکی جیکٹ ضروری', '🌂 چھتری لازمی', '🍂 خوبصورت خزاں کے رنگ', '☕ کیفے کلچر عروج پر', '🕯️ موم بتیوں کا ذخیرہ شروع کریں'],
      ['🧥 گرم جیکٹ', '🌂 بارش کا سامان', '🕯️ موم بتیوں کا ذخیرہ شروع', '🍎 سیب کا موسم', '📚 اندر بیٹھ کر پڑھنے کا اچھا مہینہ'],
      ['🧥 سرما کوٹ', '☂️ بارش جیکٹ + چھتری', '🕯️ بہت سی موم بتیاں', '📚 اندر کا اچھا مہینہ', '💡 وٹامن ڈی سپلیمنٹس'],
      ['🧥 گرم سرما کوٹ', '🎄 کرسمس کی روح تیار', '🍷 mulled wine / glögg آزمائیں', '🕯️ موم بتیوں کی زیادہ سے زیادہ تعداد', '🧁 بازاروں میں Æbleskiver'],
    ],
    fa: [
      ['🧥 پالتوی زمستانی ضخیم', '🧤 دستکش و شال‌گردن', '🥾 چکمه ضدآب', '💡 مکمل ویتامین D', '🕯️ شمع برای هیوگه'],
      ['🧥 پالتوی زمستانی', '🧤 لایه‌های گرم', '🥾 چکمه ضدآب', '💡 ویتامین D', '🕯️ شمع بیشتر'],
      ['🧣 کاپشن نیمه‌سبک', '☂️ چتر (همیشه)', '👟 کفش راحت', '🌸 منتظر شکوفه‌های گیلاس', '☕ از تراس کافه‌ها لذت ببرید'],
      ['🌂 بارانی', '👕 لایه‌ای (صبح‌ها سرد)', '🚲 هوای عالی برای دوچرخه!', '🌸 پارک‌ها زیبا هستند', '☀️ عینک آفتابی — بله، واقعاً'],
      ['👕 لایه‌های سبک', '🌂 چتر تاشو', '🚲 قطعاً هوای دوچرخه', '🍦 بستنی نرم را امتحان کنید', '☀️ ضدآفتاب لازم'],
      ['👕 تی‌شرت + کاپشن سبک', '🌂 چتر برای احتیاط', '🚲 ماه عالی برای دوچرخه', '🍺 بارهای بندری باز', '🎵 برنامه کنسرت‌ها را ببینید'],
      ['☀️ ضدآفتاب (بله، در دانمارک!)', '👕 لباس تابستانی', '🌂 همیشه یک چتر', '🏖️ روزهای ساحل ممکن', '🧴 دافع پشه عصرها'],
      ['👕 لباس تابستانی تا لایه‌های سبک', '🌂 بارانی', '🍂 نور طلایی را تماشا کنید', '🚲 هنوز برای دوچرخه عالی است', '🍎 فصل سیب شروع می‌شود'],
      ['🧥 کاپشن سبک ضروری', '🌂 چتر اجباری', '🍂 رنگ‌های زیبای پاییز', '☕ اوج فرهنگ کافه‌نشینی', '🕯️ مجموعه شمع را شروع کنید'],
      ['🧥 کاپشن گرم', '🌂 لوازم باران', '🕯️ مجموعه شمع شروع می‌شود', '🍎 فصل سیب', '📚 ماه خوبی برای کتاب‌خوانی در خانه'],
      ['🧥 پالتوی زمستانی', '☂️ بارانی + چتر', '🕯️ شمع‌های زیاد', '📚 ماه خوبی برای خانه', '💡 مکمل ویتامین D'],
      ['🧥 پالتوی زمستانی گرم', '🎄 روح کریسمس آماده', '🍷 شراب گرم / glögg را امتحان کنید', '🕯️ حداکثر تعداد شمع', '🧁 Æbleskiver در بازارها'],
    ],
  };

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

  const DATE_LOCALE_MAP = { en:'en-GB', fr:'fr-FR', ar:'ar', es:'es-ES', da:'da-DK', de:'de-DE', uk:'uk-UA', pl:'pl-PL', ur:'ur', fa:'fa-IR' };
  const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    const locale = DATE_LOCALE_MAP[window.currentLang || 'en'] || 'en-GB';
    return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const WEATHER_I18N = {
    en: { live_badge:'Live Forecast', actual_badge:'Actual Data', avg_badge:'Climate Average', note_forecast:'Real forecast via Open-Meteo. Updates every hour.', note_history:'Real measured weather for this date, via Open-Meteo archive.', note_normals:'Historical climate normals (1991–2020). Forecast not available beyond 16 days.', avg_temp:'Avg temp', monthly_avg:'Monthly avg', precipitation:'Precipitation', monthly_rain:'Monthly rain', rain_chance:'Rain chance', rain_days:'Rain days/mo', max_wind:'Max wind', sunshine:'Sunshine/day', uv_index:'UV index', daylight:'Daylight', snow_chance:'Snow chance', snow_yes:'Possible', snow_no:'None', what_to_pack:'What to pack', ch10_intro:'🚲 Planning life in Denmark year-round?', ch10_btn:'Read Chapter 10 — Transport & Getting Around →' },
    fr: { live_badge:'Prévision en direct', actual_badge:'Données réelles', avg_badge:'Moyenne climatique', note_forecast:'Prévision réelle via Open-Meteo. Mise à jour toutes les heures.', note_history:'Météo réellement mesurée pour cette date, via les archives Open-Meteo.', note_normals:'Normales climatiques historiques (1991–2020). Prévision indisponible au-delà de 16 jours.', avg_temp:'Temp moy.', monthly_avg:'Moy. mensuelle', precipitation:'Précipitations', monthly_rain:'Pluie mensuelle', rain_chance:'Risque de pluie', rain_days:'Jours de pluie/mois', max_wind:'Vent max', sunshine:'Soleil/jour', uv_index:'Indice UV', daylight:'Durée du jour', snow_chance:'Risque de neige', snow_yes:'Possible', snow_no:'Aucune', what_to_pack:'Quoi emporter', ch10_intro:'🚲 Vous planifiez votre vie au Danemark toute l\'année ?', ch10_btn:'Lire le chapitre 10 — Transport & Déplacements →' },
    ar: { live_badge:'توقعات مباشرة', actual_badge:'بيانات حقيقية', avg_badge:'متوسط المناخ', note_forecast:'توقعات حقيقية عبر Open-Meteo. تتحدث كل ساعة.', note_history:'طقس مقاس فعلاً لهذا التاريخ، عبر أرشيف Open-Meteo.', note_normals:'معدلات المناخ التاريخية (1991–2020). التوقعات غير متاحة لما بعد 16 يوماً.', avg_temp:'متوسط الحرارة', monthly_avg:'المتوسط الشهري', precipitation:'هطول الأمطار', monthly_rain:'مطر شهري', rain_chance:'احتمال المطر', rain_days:'أيام مطر/شهر', max_wind:'أقصى رياح', sunshine:'أشعة شمس/يوم', uv_index:'مؤشر UV', daylight:'ساعات النهار', snow_chance:'احتمال الثلج', snow_yes:'محتمل', snow_no:'لا يوجد', what_to_pack:'ماذا تحمل معك', ch10_intro:'🚲 تخطط للحياة في الدنمارك طوال العام؟', ch10_btn:'← اقرأ الفصل 10 — المواصلات والتنقل' },
    es: { live_badge:'Pronóstico en vivo', actual_badge:'Datos reales', avg_badge:'Media climática', note_forecast:'Pronóstico real via Open-Meteo. Se actualiza cada hora.', note_history:'Tiempo realmente medido para esta fecha, via el archivo Open-Meteo.', note_normals:'Normales climáticas históricas (1991–2020). Pronóstico no disponible más allá de 16 días.', avg_temp:'Temp media', monthly_avg:'Media mensual', precipitation:'Precipitación', monthly_rain:'Lluvia mensual', rain_chance:'Prob. lluvia', rain_days:'Días lluvia/mes', max_wind:'Viento máx.', sunshine:'Sol/día', uv_index:'Índice UV', daylight:'Horas de luz', snow_chance:'Prob. nieve', snow_yes:'Posible', snow_no:'Ninguna', what_to_pack:'Qué llevar', ch10_intro:'🚲 ¿Planificando la vida en Dinamarca todo el año?', ch10_btn:'Leer capítulo 10 — Transporte & Movilidad →' },
    da: { live_badge:'Live-prognose', actual_badge:'Faktiske data', avg_badge:'Klimagennemsnit', note_forecast:'Rigtig vejrudsigt via Open-Meteo. Opdateres hver time.', note_history:'Faktisk målt vejr for denne dato, via Open-Meteo-arkiv.', note_normals:'Historiske klimanormaler (1991–2020). Prognose ikke tilgængelig ud over 16 dage.', avg_temp:'Gns. temp.', monthly_avg:'Månedlig gns.', precipitation:'Nedbør', monthly_rain:'Månedlig regn', rain_chance:'Regnchance', rain_days:'Regndage/md', max_wind:'Maks. vind', sunshine:'Sol/dag', uv_index:'UV-indeks', daylight:'Dagslys', snow_chance:'Snechance', snow_yes:'Muligt', snow_no:'Ingen', what_to_pack:'Hvad skal du medtage', ch10_intro:'🚲 Planlægger du livet i Danmark hele året?', ch10_btn:'Læs kapitel 10 — Transport & Mobilitet →' },
    de: { live_badge:'Live-Prognose', actual_badge:'Echte Daten', avg_badge:'Klimadurchschnitt', note_forecast:'Echte Prognose via Open-Meteo. Stündlich aktualisiert.', note_history:'Tatsächlich gemessenes Wetter für dieses Datum, via Open-Meteo-Archiv.', note_normals:'Historische Klimanormale (1991–2020). Prognose über 16 Tage nicht verfügbar.', avg_temp:'Ø Temperatur', monthly_avg:'Monatsdurchschnitt', precipitation:'Niederschlag', monthly_rain:'Monatl. Regen', rain_chance:'Regenwahrsch.', rain_days:'Regentage/Monat', max_wind:'Max. Wind', sunshine:'Sonne/Tag', uv_index:'UV-Index', daylight:'Tageslicht', snow_chance:'Schneechance', snow_yes:'Möglich', snow_no:'Keine', what_to_pack:'Was einpacken', ch10_intro:'🚲 Planen Sie das Leben in Dänemark das ganze Jahr?', ch10_btn:'Kapitel 10 lesen — Transport & Mobilität →' },
    uk: { live_badge:'Прогноз наживо', actual_badge:'Реальні дані', avg_badge:'Кліматична норма', note_forecast:'Реальний прогноз від Open-Meteo. Оновлюється щогодини.', note_history:'Фактично виміряна погода для цієї дати, архів Open-Meteo.', note_normals:'Історичні кліматичні норми (1991–2020). Прогноз недоступний понад 16 днів.', avg_temp:'Сер. темп.', monthly_avg:'Місячна сер.', precipitation:'Опади', monthly_rain:'Дощ на місяць', rain_chance:'Шанс дощу', rain_days:'Дощових днів/міс', max_wind:'Макс. вітер', sunshine:'Сонце/день', uv_index:'УФ-індекс', daylight:'Тривалість дня', snow_chance:'Шанс снігу', snow_yes:'Можливо', snow_no:'Немає', what_to_pack:'Що взяти з собою', ch10_intro:'🚲 Плануєте жити в Данії цілий рік?', ch10_btn:'Читати розділ 10 — Транспорт та пересування →' },
    pl: { live_badge:'Prognoza na żywo', actual_badge:'Rzeczywiste dane', avg_badge:'Średnia klimatyczna', note_forecast:'Prawdziwa prognoza od Open-Meteo. Aktualizacja co godzinę.', note_history:'Rzeczywiście zmierzona pogoda dla tej daty, archiwum Open-Meteo.', note_normals:'Historyczne normy klimatyczne (1991–2020). Prognoza niedostępna powyżej 16 dni.', avg_temp:'Śr. temp.', monthly_avg:'Śr. miesięczna', precipitation:'Opady', monthly_rain:'Deszcz/miesiąc', rain_chance:'Szansa deszczu', rain_days:'Dni deszczowych/mies.', max_wind:'Maks. wiatr', sunshine:'Słońce/dzień', uv_index:'Indeks UV', daylight:'Długość dnia', snow_chance:'Szansa śniegu', snow_yes:'Możliwy', snow_no:'Brak', what_to_pack:'Co spakować', ch10_intro:'🚲 Planujesz życie w Danii przez cały rok?', ch10_btn:'Czytaj rozdział 10 — Transport i mobilność →' },
    ur: { live_badge:'لائیو پیشگوئی', actual_badge:'اصل ڈیٹا', avg_badge:'موسمی اوسط', note_forecast:'Open-Meteo کے ذریعے حقیقی پیشگوئی۔ ہر گھنٹے اپ ڈیٹ ہوتی ہے۔', note_history:'اس تاریخ کا اصل ماپا گیا موسم، Open-Meteo آرکائیو سے۔', note_normals:'تاریخی موسمی اوسط (1991–2020)۔ 16 دن سے آگے کی پیشگوئی دستیاب نہیں۔', avg_temp:'اوسط درجہ حرارت', monthly_avg:'ماہانہ اوسط', precipitation:'بارش', monthly_rain:'ماہانہ بارش', rain_chance:'بارش کا امکان', rain_days:'بارش کے دن/ماہ', max_wind:'زیادہ ہوا', sunshine:'دھوپ/دن', uv_index:'UV انڈیکس', daylight:'دن کی روشنی', snow_chance:'برف کا امکان', snow_yes:'ممکن', snow_no:'نہیں', what_to_pack:'کیا لے کر چلیں', ch10_intro:'🚲 سال بھر ڈنمارک میں زندگی کی منصوبہ بندی؟', ch10_btn:'← باب 10 پڑھیں — ٹرانسپورٹ اور آمدورفت' },
    fa: { live_badge:'پیش‌بینی زنده', actual_badge:'داده‌های واقعی', avg_badge:'میانگین اقلیمی', note_forecast:'پیش‌بینی واقعی از Open-Meteo. هر ساعت به‌روز می‌شود.', note_history:'آب‌وهوای واقعاً اندازه‌گیری‌شده برای این تاریخ، از آرشیو Open-Meteo.', note_normals:'نرمال‌های تاریخی اقلیمی (۱۹۹۱–۲۰۲۰). پیش‌بینی بیش از ۱۶ روز در دسترس نیست.', avg_temp:'میانگین دما', monthly_avg:'میانگین ماهانه', precipitation:'بارندگی', monthly_rain:'باران ماهانه', rain_chance:'احتمال باران', rain_days:'روزهای بارانی/ماه', max_wind:'حداکثر باد', sunshine:'آفتاب/روز', uv_index:'شاخص UV', daylight:'روشنایی روز', snow_chance:'احتمال برف', snow_yes:'ممکن', snow_no:'هیچ', what_to_pack:'چه چیزی ببرید', ch10_intro:'🚲 برای زندگی در سراسر سال در دانمارک برنامه‌ریزی می‌کنید؟', ch10_btn:'← فصل ۱۰ را بخوانید — حمل‌ونقل و جابجایی' },
  };
  const tw = (key) => {
    const lang = window.currentLang || 'en';
    return (WEATHER_I18N[lang] && WEATHER_I18N[lang][key]) || WEATHER_I18N.en[key] || key;
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
        const res  = await fetch(`${base}?${params}`, { signal: timeoutSignal(6000) });
        if (!res.ok) throw new Error(`weather HTTP ${res.status}`);
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
    const wlang      = window.currentLang || 'en';
    const commentary = (MONTH_COMMENTARY[wlang] || MONTH_COMMENTARY.en)[monthIdx];
    const packing    = (PACKING_TIPS[wlang] || PACKING_TIPS.en)[monthIdx];
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
        badgeHtml = `<span class="weather-source-badge weather-badge-live">${tw('live_badge')}</span>`;
        dataNote  = tw('note_forecast');
      } else {
        badgeHtml = `<span class="weather-source-badge weather-badge-history">${tw('actual_badge')}</span>`;
        dataNote  = tw('note_history');
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
      badgeHtml = `<span class="weather-source-badge weather-badge-normals">${tw('avg_badge')}</span>`;
      dataNote  = tw('note_normals');
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
            <div class="weather-metric-lbl">${apiData ? tw('avg_temp') : tw('monthly_avg')}</div>
          </div>
          <div class="weather-metric">
            <div class="weather-metric-icon">🌧️</div>
            <div class="weather-metric-val">${heroRain}${apiData ? 'mm' : 'mm/mo'}</div>
            <div class="weather-metric-lbl">${apiData ? tw('precipitation') : tw('monthly_rain')}</div>
          </div>
          ${heroPrecProb !== null ? `
          <div class="weather-metric">
            <div class="weather-metric-icon">☂️</div>
            <div class="weather-metric-val">${heroPrecProb}%</div>
            <div class="weather-metric-lbl">${tw('rain_chance')}</div>
          </div>` : `
          <div class="weather-metric">
            <div class="weather-metric-icon">🌧️</div>
            <div class="weather-metric-val">${norm.rainDays}</div>
            <div class="weather-metric-lbl">${tw('rain_days')}</div>
          </div>`}
          ${heroWind !== null ? `
          <div class="weather-metric">
            <div class="weather-metric-icon">💨</div>
            <div class="weather-metric-val">${heroWind} km/h</div>
            <div class="weather-metric-lbl">${tw('max_wind')}</div>
          </div>` : `
          <div class="weather-metric">
            <div class="weather-metric-icon">☀️</div>
            <div class="weather-metric-val">${sun}h</div>
            <div class="weather-metric-lbl">${tw('sunshine')}</div>
          </div>`}
          ${heroUV !== null ? `
          <div class="weather-metric">
            <div class="weather-metric-icon">🔆</div>
            <div class="weather-metric-val">${heroUV}</div>
            <div class="weather-metric-lbl">${tw('uv_index')}</div>
          </div>` : `
          <div class="weather-metric">
            <div class="weather-metric-icon">☀️</div>
            <div class="weather-metric-val">${sun}h</div>
            <div class="weather-metric-lbl">${tw('sunshine')}</div>
          </div>`}
          <div class="weather-metric">
            <div class="weather-metric-icon">🌅</div>
            <div class="weather-metric-val">${daylight}h</div>
            <div class="weather-metric-lbl">${tw('daylight')}</div>
          </div>
          <div class="weather-metric">
            <div class="weather-metric-icon">${norm.snow ? '❄️' : '🌿'}</div>
            <div class="weather-metric-val">${norm.snow ? tw('snow_yes') : tw('snow_no')}</div>
            <div class="weather-metric-lbl">${tw('snow_chance')}</div>
          </div>
        </div>

        <div class="weather-bars">
          <div class="weather-bar-row">
            <span>${tw('daylight')}</span>
            <div class="weather-bar-track"><div class="weather-bar-fill weather-bar-daylight" style="width:${daylightPct}%"></div></div>
            <span>${daylight}h</span>
          </div>
          <div class="weather-bar-row">
            <span>${tw('sunshine')}</span>
            <div class="weather-bar-track"><div class="weather-bar-fill weather-bar-sun" style="width:${sunPct}%"></div></div>
            <span>${sun}h/day</span>
          </div>
        </div>

        <div class="weather-bjorn-quote">
          <div class="weather-bjorn-face" aria-hidden="true">🛡️</div>
          <blockquote>${commentary}</blockquote>
        </div>

        <div class="weather-packing-section">
          <div class="weather-packing-title">${tw('what_to_pack')}</div>
          <div class="weather-packing-chips">
            ${packing.map(item => `<div class="weather-pack-chip">${item}</div>`).join('')}
          </div>
        </div>

        <div class="weather-source-note">${dataNote}</div>
        <div class="tool-chapter-link">${tw('ch10_intro')} <button class="tool-chapter-btn" onclick="openChapter(10)">${tw('ch10_btn')}</button></div>
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

    // WAI-ARIA 1.2 combobox wiring (mirrors the address autocomplete).
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', suggestionsId);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-haspopup', 'listbox');
    sugg.setAttribute('role', 'listbox');

    const collapse = () => {
      sugg.classList.add('hidden');
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    };
    const setActive = (el) => {
      sugg.querySelectorAll('.dawa-item').forEach(i => { i.classList.remove('active'); i.setAttribute('aria-selected', 'false'); });
      el.classList.add('active');
      el.setAttribute('aria-selected', 'true');
      if (el.id) input.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    };

    let debounce;
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { collapse(); return; }

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
          const res  = await fetch(proxyUrl, { signal: timeoutSignal(4000) });
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
          input.setAttribute('aria-expanded', 'false');
          input.removeAttribute('aria-activedescendant');
          return;
        }

        sugg.innerHTML = allItems.map((s, i) => `
          <div class="dawa-item" role="option" id="${suggestionsId}-opt-${i}" aria-selected="false" data-stop-id="${esc(s.id)}" data-name="${esc(s.name)}">
            <span class="dawa-street">🚉 ${esc(s.name)}</span>
          </div>
        `).join('');
        sugg.classList.remove('hidden');
        input.setAttribute('aria-expanded', 'true');

        sugg.querySelectorAll('.dawa-item').forEach(item => {
          item.addEventListener('click', () => {
            input.value     = item.dataset.name;
            input.dataset.stopId = item.dataset.stopId;
            collapse();
          });
          item.addEventListener('mouseenter', () => setActive(item));
        });
      }, 300);
    });

    input.addEventListener('keydown', (e) => {
      const items = sugg.querySelectorAll('.dawa-item');
      const active = sugg.querySelector('.dawa-item.active');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = active ? active.nextElementSibling : items[0];
        if (next) setActive(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = active ? active.previousElementSibling : items[items.length - 1];
        if (prev) setActive(prev);
      } else if (e.key === 'Enter') {
        if (active) { e.preventDefault(); active.click(); }
      } else if (e.key === 'Escape') {
        collapse();
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target)) collapse();
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
        { signal: timeoutSignal(5000) }
      );
      if (!res.ok) throw new Error(`today-weather HTTP ${res.status}`);
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
     INIT ALL
  ══════════════════════════════════════════════════════ */
  const init = () => {
    initExchangeRates();
    initKommuneFinder();
    initWeatherPlanner();
    initJourneyPlanner();
    initJobSearch();
    initTodayWeather();
  };

  return { init, fetchRates, formatMultiCurrency, CLIMATE };

})();
