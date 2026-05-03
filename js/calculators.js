/* ═══════════════════════════════════════════════════════
   ANKOMMER — Smart Calculators
   Salary · Cost of Living · Visa Tree · Residency
═══════════════════════════════════════════════════════ */

const Calculators = (() => {

  /* ══════════════════════════════════════════════════════
     1. SALARY CALCULATOR — Real Danish Tax Logic
  ══════════════════════════════════════════════════════ */
  const calcSalary = (gross, kommuneSkatPct) => {
    const grossM = parseFloat(gross);
    if (!grossM || grossM <= 0) return null;

    // ── Tax logic (2025 rates) ──
    const amBidrag        = grossM * 0.08;
    const afterAM         = grossM - amBidrag;
    const personfradragM  = 49700 / 12;          // Monthly personal allowance
    const taxableBase     = Math.max(0, afterAM - personfradragM);

    // Municipal + state (bundskat) combined
    const bundskat        = 0.1206;
    const kommuneSkat     = parseFloat(kommuneSkatPct) / 100;
    const baseTaxRate     = bundskat + kommuneSkat;
    const baseTax         = taxableBase * baseTaxRate;

    // Top tax: 15% on afterAM above 49,075 DKK/month (~588,900/yr)
    const topTaxThreshold = 588900 / 12;
    const topTax          = Math.max(0, afterAM - topTaxThreshold) * 0.15;

    // Church tax (optional, avg 0.7%) — included in kommuneskat above
    const totalTax        = amBidrag + baseTax + topTax;
    const netMonthly      = grossM - totalTax;

    // Annual
    const grossAnnual     = grossM * 12;
    const netAnnual       = netMonthly * 12;
    const effectiveRate   = (totalTax / grossM) * 100;

    return {
      gross:          Math.round(grossM),
      amBidrag:       Math.round(amBidrag),
      afterAM:        Math.round(afterAM),
      baseTax:        Math.round(baseTax),
      topTax:         Math.round(topTax),
      totalTax:       Math.round(totalTax),
      net:            Math.round(netMonthly),
      netAnnual:      Math.round(netAnnual),
      grossAnnual:    Math.round(grossAnnual),
      effectiveRate:  effectiveRate.toFixed(1),
    };
  };

  const formatDKK = (n) => {
    if (n >= 1000) return Math.round(n).toLocaleString('da-DK') + ' DKK';
    return Math.round(n) + ' DKK';
  };

  const drawDonut = (canvasId, net, totalTax, gross) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70, lineW = 18;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const netAngle  = (net / gross) * 2 * Math.PI;
    const taxAngle  = (totalTax / gross) * 2 * Math.PI;

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-strong').trim() || '#e0e0e0';
    ctx.stroke();

    // Tax segment (red)
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + taxAngle);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = '#C60C30';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Net segment (green)
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2 + taxAngle, -Math.PI / 2 + taxAngle + netAngle);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = '#6A9E6A';
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const initSalaryCalc = () => {
    const btn = document.getElementById('salary-calc-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const grossInput = document.getElementById('salary-input');
      const muniSelect = document.getElementById('salary-municipality');
      const resultDiv  = document.getElementById('salary-result');
      const breakdown  = document.getElementById('salary-breakdown');
      const contextDiv = document.getElementById('salary-context');
      const netVal     = document.getElementById('donut-net-val');

      if (!grossInput?.value) {
        window.App?.showToast('Enter a salary amount first', 'warning');
        return;
      }

      const r = calcSalary(grossInput.value, muniSelect?.value || '24.97');
      if (!r) return;

      // Draw donut
      drawDonut('salary-donut', r.net, r.totalTax, r.gross);

      // Update center
      if (netVal) netVal.textContent = formatDKK(r.net);

      // Breakdown rows
      if (breakdown) {
        breakdown.innerHTML = `
          <div class="breakdown-row"><span class="breakdown-label">Gross salary</span><span class="breakdown-val">${formatDKK(r.gross)}</span></div>
          <div class="breakdown-row"><span class="breakdown-label">AM-bidrag (8%)</span><span class="breakdown-val red">– ${formatDKK(r.amBidrag)}</span></div>
          <div class="breakdown-row"><span class="breakdown-label">Income tax</span><span class="breakdown-val red">– ${formatDKK(r.baseTax)}</span></div>
          ${r.topTax > 0 ? `<div class="breakdown-row"><span class="breakdown-label">Top tax (15%)</span><span class="breakdown-val red">– ${formatDKK(r.topTax)}</span></div>` : ''}
          <div class="breakdown-row" style="border-top:2px solid var(--border-strong);padding-top:8px;margin-top:4px"><span class="breakdown-label" style="font-weight:700;color:var(--text)">Net monthly pay</span><span class="breakdown-val green" style="font-size:1rem">${formatDKK(r.net)}</span></div>
          <div class="breakdown-row"><span class="breakdown-label" style="color:var(--text-faint)">Effective tax rate</span><span class="breakdown-val" style="color:var(--text-faint)">${r.effectiveRate}%</span></div>
          <div class="breakdown-row"><span class="breakdown-label" style="color:var(--text-faint)">Net annual</span><span class="breakdown-val" style="color:var(--text-faint)">${formatDKK(r.netAnnual)}</span></div>
        `;
      }

      // Context message
      if (contextDiv) {
        const medianSalary = 44500; // DKK/month gross (approx 2025 median)
        const comparison = r.gross > medianSalary
          ? `Your salary is above the Danish median gross salary (~44,500 DKK/month).`
          : `The Danish median gross salary is ~44,500 DKK/month.`;
        const rentContext = r.net >= 12000 ? "You can comfortably afford most Copenhagen apartments." : r.net >= 9000 ? "You can afford average Copenhagen rents, though it will be a significant portion of your income." : "Budget-conscious choices will be important. Consider Aarhus or Odense for more comfortable living costs.";
        contextDiv.innerHTML = `💡 ${comparison} ${rentContext}`;
      }

      resultDiv.classList.remove('hidden');

      // Animate the net value
      animateCounter(netVal, 0, r.net, 1000, (v) => formatDKK(v));

      // Chapter link
      const existingLink = resultDiv.querySelector('.tool-chapter-link');
      if (!existingLink) {
        const link = document.createElement('div');
        link.className = 'tool-chapter-link';
        link.innerHTML = `📖 Want to understand your payslip, pension and skattekort in detail? <button class="tool-chapter-btn" onclick="openChapter(4)">Read Chapter 4 — Money &amp; Banking →</button>`;
        resultDiv.appendChild(link);
      }

      // Copy button
      if (!resultDiv.querySelector('.tool-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'tool-copy-btn';
        copyBtn.textContent = '📋 Copy result';
        copyBtn.onclick = () => window.copyToolResult?.('salary-result');
        resultDiv.appendChild(copyBtn);
      }
    });
  };

  const animateCounter = (el, from, to, duration, formatter) => {
    if (!el) return;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.round(from + (to - from) * ease);
      el.textContent = formatter ? formatter(val) : val.toLocaleString();
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  /* ══════════════════════════════════════════════════════
     2. MONTHLY BUDGET ESTIMATOR
  ══════════════════════════════════════════════════════ */

  // Base costs for Copenhagen — other cities use a multiplier
  const CITY_MULTIPLIER = { cph: 1.0, aar: 0.84, ode: 0.76, aal: 0.73 };
  const CITY_LABELS = { cph: 'Copenhagen', aar: 'Aarhus', ode: 'Odense', aal: 'Aalborg' };

  const APT_COSTS = { // CPH base rent
    room:   4500,
    studio: 8000,
    '1bed': 11000,
    '2bed': 15500,
    '3bed': 22000,
  };
  const APT_LABELS = {
    room: 'Room / flatshare', studio: 'Studio', '1bed': '1-bedroom',
    '2bed': '2-bedroom', '3bed': '3+ bedroom'
  };

  const TRANSPORT_COSTS = { // CPH base
    bike:   200,
    public: 430,
    car:    4800,
  };
  const TRANSPORT_LABELS = {
    bike: '🚲 Bike', public: '🚌 Public transport', car: '🚗 Car'
  };

  const FOOD_COSTS = { // CPH base (groceries only)
    budget: 2100,
    normal: 3000,
    mixed:  3000, // groceries portion; dining added separately
    dine:   1200, // minimal groceries — mostly dining out
  };
  const DINING_OUT_COSTS = {
    budget: 0,
    normal: 400,   // occasional
    mixed:  2400,  // ~8 meals out/mo @ avg 300 kr
    dine:   7500,  // mostly restaurants
  };
  const FOOD_LABELS = {
    budget: '🥦 Budget cooking', normal: '🍳 Home cooking',
    mixed:  '🍝 Mix: home + dining', dine: '🍽️ Mostly restaurants'
  };

  const SUBS_COSTS = { // same across cities
    minimal: 500,   // phone + internet
    normal:  900,   // + Netflix/HBO
    active:  1350,  // + gym
    full:    1750,  // + gym + Spotify + extra
  };
  const SUBS_LABELS = {
    minimal: '📱 Internet & phone',
    normal:  '🎬 + Streaming',
    active:  '🏋️ + Gym',
    full:    '🎧 All subscriptions'
  };

  const FIXED_EXTRAS = 700; // utilities estimate (electricity, heating — varies if not in rent)

  const initCostOfLiving = () => {
    let selectedCity = 'cph';

    // City tab switching
    document.querySelectorAll('.col-city-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.col-city-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCity = btn.dataset.city;
      });
    });

    const calcBtn = document.getElementById('col-calc-btn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
      const mult = CITY_MULTIPLIER[selectedCity];
      const city = CITY_LABELS[selectedCity];

      const aptKey   = document.getElementById('col-apt')?.value || '1bed';
      const transKey = document.getElementById('col-transport')?.value || 'public';
      const foodKey  = document.getElementById('col-food')?.value || 'normal';
      const subsKey  = document.getElementById('col-subs')?.value || 'normal';

      // Calculate each item (apply city multiplier to location-sensitive costs)
      const rent      = Math.round(APT_COSTS[aptKey] * mult);
      const transport = transKey === 'car'
        ? Math.round(TRANSPORT_COSTS.car * mult)   // car costs scale with city
        : Math.round(TRANSPORT_COSTS[transKey]);   // bike/transit: fixed or local rate
      const groceries = Math.round(FOOD_COSTS[foodKey] * mult);
      const dining    = Math.round(DINING_OUT_COSTS[foodKey] * mult);
      const subs      = SUBS_COSTS[subsKey];
      const utilities = Math.round(FIXED_EXTRAS * mult);

      const items = [
        { label: `🏠 Rent (${APT_LABELS[aptKey]})`,             amount: rent,      key: 'rent' },
        { label: `🛒 Groceries`,                                 amount: groceries, key: 'groceries' },
        ...(dining > 0 ? [{ label: `🍽️ Dining out`,             amount: dining,    key: 'dining' }] : []),
        { label: `${TRANSPORT_LABELS[transKey]}`,                amount: transport, key: 'transport' },
        { label: `${SUBS_LABELS[subsKey]}`,                      amount: subs,      key: 'subs' },
        { label: `⚡ Utilities (est.)`,                          amount: utilities, key: 'utilities' },
      ];

      const total = items.reduce((s, i) => s + i.amount, 0);

      // Render breakdown bars
      const breakdownEl = document.getElementById('col-breakdown');
      const totalBarEl  = document.getElementById('col-total-bar');
      const contextEl   = document.getElementById('col-context');
      const resultEl    = document.getElementById('col-result');

      if (!breakdownEl) return;

      breakdownEl.innerHTML = items.map(item => {
        const pct = Math.round((item.amount / total) * 100);
        return `
          <div class="col-item">
            <div class="col-item-header">
              <span class="col-item-label">${item.label}</span>
              <span class="col-item-amount">${item.amount.toLocaleString()} kr</span>
            </div>
            <div class="col-item-bar">
              <div class="col-item-fill col-fill-${item.key}" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join('');

      if (totalBarEl) {
        // Use live rates if available, fallback to fixed
        const rates = window.liveRates || { EUR: 0.1342, USD: 0.1448, GBP: 0.1148 };
        const eurAmt = Math.round(total * rates.EUR).toLocaleString();
        const usdAmt = Math.round(total * rates.USD).toLocaleString();
        const gbpAmt = Math.round(total * rates.GBP).toLocaleString();
        const rateLabel = window.liveRates ? 'Live rates' : 'Approx.';

        totalBarEl.innerHTML = `
          <div class="col-total-row">
            <span>Estimated monthly total</span>
            <span class="col-total-amount">${total.toLocaleString()} <small>kr/mo</small></span>
          </div>
          <div class="col-total-note" id="col-total-note">
            <span class="rate-label">${rateLabel}:</span>
            <span>€${eurAmt}</span><span class="rate-dot">·</span>
            <span>$${usdAmt}</span><span class="rate-dot">·</span>
            <span>£${gbpAmt}</span>
          </div>
        `;
        // Fire event so apis.js can update with fresh rates
        window.dispatchEvent(new CustomEvent('budgetCalculated', { detail: { total } }));
      }

      if (contextEl) {
        // Median salary context
        const medianNet = selectedCity === 'cph' ? 32000 : 28000;
        const diff = medianNet - total;
        const pctLeft = Math.round((diff / medianNet) * 100);
        let tip = '';
        if (transKey === 'car') tip = '💡 Switching to public transport could save ~4,400 kr/month.';
        else if (aptKey === '1bed' && selectedCity === 'cph') tip = '💡 Moving to Aarhus cuts rent by ~25% with similar job opportunities.';
        else if (foodKey === 'dine') tip = '💡 Cooking at home 4× more per week could save ~5,000 kr/month.';

        contextEl.innerHTML = `
          <p class="col-ctx-salary">At median ${city} salary, this budget leaves roughly <strong>${diff > 0 ? diff.toLocaleString() + ' kr' : 'very little'}</strong> for savings${diff > 0 ? ` (${pctLeft}% of take-home)` : ' — tight'}.</p>
          ${tip ? `<p class="col-ctx-tip">${tip}</p>` : ''}
        `;
      }

      resultEl?.classList.remove('hidden');
    });
  };

  /* ══════════════════════════════════════════════════════
     3. VISA DECISION TREE
  ══════════════════════════════════════════════════════ */
  const renderVisaNode = (node, container) => {
    container.innerHTML = '';

    if (node.result) {
      container.innerHTML = `
        <div class="visa-result">
          <h4>✅ ${node.title}</h4>
          <p>${node.description}</p>
          ${node.link ? `<a href="${node.link}" target="_blank" rel="noopener">${node.linkText || 'Learn more →'}</a>` : ''}
        </div>
        <span class="visa-reset" id="visa-reset">← Start over</span>
      `;
      document.getElementById('visa-reset')?.addEventListener('click', () => initVisaTree());
      return;
    }

    const div = document.createElement('div');
    div.className = 'visa-node';

    const q = document.createElement('p');
    q.className = 'visa-question';
    q.textContent = node.question;
    div.appendChild(q);

    const opts = document.createElement('div');
    opts.className = 'visa-options';

    if (node.options) {
      node.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'visa-opt-btn';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
          if (opt.result !== undefined) {
            renderVisaNode(opt, container);
          } else if (opt.next) {
            renderVisaNode(opt.next, container);
          }
        });
        opts.appendChild(btn);
      });
    }

    // Yes/No options (binary)
    if (node.yes && node.no) {
      ['Yes — EU/EEA citizen', 'No — Non-EU citizen'].forEach((label, i) => {
        const btn = document.createElement('button');
        btn.className = 'visa-opt-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => renderVisaNode(i === 0 ? node.yes : node.no, container));
        opts.appendChild(btn);
      });
    }

    div.appendChild(opts);
    container.appendChild(div);
  };

  const initVisaTree = () => {
    const body = document.getElementById('visa-tree-body');
    if (!body) return;
    renderVisaNode(VISA_TREE, body);
  };

  /* ══════════════════════════════════════════════════════
     4. RESIDENCY TIMELINE CALCULATOR
  ══════════════════════════════════════════════════════ */
  const RESIDENCY_RULES = {
    eu:               { permRes: 5,  citizenship: 9,  permLabel:'EU Permanent Residence', euNote:'EU/EEA citizens get a registration certificate, then permanent residence after 5 years.' },
    work_permit:      { permRes: 8,  citizenship: 9,  fastTrack: 4, permLabel:'Permanent Residence Permit' },
    student_visa:     { permRes: 8,  citizenship: 9,  permLabel:'Permanent Residence Permit', note:'Student years count towards residency if you transition to a work permit after.' },
    family_reunification: { permRes: 8, citizenship: 9, permLabel:'Permanent Residence Permit' },
    refugee:          { permRes: 5,  citizenship: 9,  permLabel:'Permanent Residence Permit', note:'Refugee and protection status holders may have a faster path to permanent residence.' },
  };

  const initResidencyCalc = () => {
    const btn = document.getElementById('res-calc-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const dateInput   = document.getElementById('res-arrival-date');
      const permitSel   = document.getElementById('res-permit-type');
      const resultDiv   = document.getElementById('res-result');

      if (!dateInput?.value) {
        window.App?.showToast('Please select your arrival date', 'warning');
        return;
      }

      const arrival  = new Date(dateInput.value);
      const now      = new Date();
      const permit   = permitSel?.value || 'work_permit';
      const rules    = RESIDENCY_RULES[permit] || RESIDENCY_RULES.work_permit;
      const yearsHere = (now - arrival) / (1000 * 60 * 60 * 24 * 365.25);

      const permResDate   = new Date(arrival);
      permResDate.setFullYear(permResDate.getFullYear() + rules.permRes);

      const citizenDate   = new Date(arrival);
      citizenDate.setFullYear(citizenDate.getFullYear() + rules.citizenship);

      const fastTrackDate = rules.fastTrack ? new Date(arrival) : null;
      if (fastTrackDate) fastTrackDate.setFullYear(fastTrackDate.getFullYear() + rules.fastTrack);

      const milestones = [
        {
          label: 'Arrived in Denmark',
          date: arrival,
          reached: true,
          icon: '✈️'
        },
        ...(fastTrackDate ? [{
          label: `Fast-track permanent residency possible`,
          date: fastTrackDate,
          reached: now >= fastTrackDate,
          icon: '⚡',
          note: 'Requires points-based assessment'
        }] : []),
        {
          label: rules.permLabel,
          date: permResDate,
          reached: now >= permResDate,
          icon: '🏠',
          note: `After ${rules.permRes} years of residence`
        },
        {
          label: 'Danish Citizenship eligible',
          date: citizenDate,
          reached: now >= citizenDate,
          icon: '🇩🇰',
          note: `Requires language test (B1), citizenship test, and self-sufficiency`
        }
      ];

      const yearsDisplay = yearsHere < 1
        ? `${Math.round(yearsHere * 12)} months`
        : `${yearsHere.toFixed(1)} years`;

      const nextMilestone = milestones.find(m => !m.reached);
      const yearsToNext   = nextMilestone
        ? ((nextMilestone.date - now) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1)
        : null;

      resultDiv.innerHTML = `
        <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:12px">
          You've been in Denmark for <strong>${yearsDisplay}</strong>.
          ${nextMilestone ? `Next milestone in <strong>${yearsToNext} years</strong> (${nextMilestone.date.toLocaleDateString('en-GB', {month:'long', year:'numeric'})}).` : 'You\'ve reached all major milestones! 🎉'}
        </div>
        ${rules.note ? `<div style="font-size:0.8rem;color:var(--amber);margin-bottom:12px;padding:8px 12px;background:rgba(232,160,32,0.1);border-radius:8px">ℹ️ ${rules.note}</div>` : ''}
        <div class="res-timeline">
          ${milestones.map(m => `
            <div class="res-milestone">
              <div class="res-dot ${m.reached ? 'reached' : (m === nextMilestone ? 'next' : '')}">${m.reached ? '✓' : (m === nextMilestone ? '→' : m.icon)}</div>
              <div class="res-text">
                <strong>${m.label}</strong>
                <span>${m.date.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'})}${m.note ? ' · ' + m.note : ''}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <a href="https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" target="_blank" rel="noopener" style="font-size:0.8rem;color:var(--nordic-blue);margin-top:12px;display:inline-block">→ Official permanent residency requirements</a>
      `;

      resultDiv.classList.remove('hidden');

      // Copy button for residency timeline
      if (!resultDiv.querySelector('.tool-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'tool-copy-btn';
        copyBtn.textContent = '📋 Copy result';
        copyBtn.onclick = () => window.copyToolResult?.('res-result');
        resultDiv.appendChild(copyBtn);
      }
    });
  };

  /* ══════════════════════════════════════════════════════
     INIT ALL
  ══════════════════════════════════════════════════════ */
  const init = () => {
    initSalaryCalc();
    initCostOfLiving();
    initVisaTree();
    initResidencyCalc();
  };

  return { init };
})();
