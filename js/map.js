/* ═══════════════════════════════════════════════════════
   ANKOMMER — Interactive Denmark Map
   Leaflet.js with custom layers
═══════════════════════════════════════════════════════ */

const AnkommerMap = (() => {

  let map = null;
  let layerGroups = {};
  let activeLayerIds = new Set(['ics', 'health']);

  /* ── MAP DATA ───────────────────────────────────────── */
  const LOCATIONS = {
    ics: [
      { lat:55.6831, lng:12.5627, name:"International Citizen Service Copenhagen", addr:"Gyldenløvesgade 11, 1600 CPH V", hours:"Mon–Fri 9:00–14:00", lang:"English, Danish", url:"https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-and-work/International-Citizen-Service/ICS-Copenhagen", note:"Book appointment online. Bring all original documents." },
      { lat:56.1629, lng:10.2039, name:"International Citizen Service Aarhus", addr:"Hack Kampmanns Plads 2, 8000 Aarhus C", hours:"Mon–Fri 9:00–13:00", lang:"English, Danish", url:"https://www.nyidanmark.dk", note:"Separate queues for EU and non-EU citizens." },
      { lat:55.3959, lng:10.3883, name:"International Citizen Service Odense", addr:"Flakhaven 2, 5000 Odense C", hours:"Mon–Fri 9:00–13:00", lang:"English, Danish", url:"https://www.nyidanmark.dk" },
      { lat:57.0480, lng:9.9187, name:"International Citizen Service Aalborg", addr:"Godthåbsgade 8, 9400 Nørresundby", hours:"Mon–Fri 9:00–13:00", lang:"English, Danish", url:"https://www.nyidanmark.dk" },
      { lat:55.4038, lng:10.3626, name:"Borgerservice Odense", addr:"Ørbækvej 100, 5220 Odense SØ", hours:"Mon–Fri 8:00–16:00", lang:"English, Danish", url:"https://www.odense.dk" },
    ],
    health: [
      { lat:55.6942, lng:12.5700, name:"Rigshospitalet (National Hospital)", addr:"Blegdamsvej 9, 2100 Copenhagen Ø", hours:"24/7 Emergency", lang:"English, Danish, Many", url:"https://www.rigshospitalet.dk/english", note:"Denmark's main university hospital. International patients unit available." },
      { lat:55.6784, lng:12.5009, name:"Frederiksberg Hospital", addr:"Nordre Fasanvej 57, 2000 Frederiksberg", hours:"24/7 Emergency", lang:"English, Danish", url:"https://www.frederiksberg-hospital.dk" },
      { lat:55.6581, lng:12.5795, name:"Amager Hospital", addr:"Italiensvej 1, 2300 Copenhagen S", hours:"24/7", lang:"English, Danish", url:"https://www.regionh.dk" },
      { lat:56.1405, lng:10.1820, name:"Aarhus University Hospital (AUH)", addr:"Palle Juul-Jensens Boulevard 99, 8200 Aarhus N", hours:"24/7", lang:"English, Danish", url:"https://www.auh.dk/international", note:"Major Jutland hospital with international patient services." },
      { lat:55.4204, lng:10.3786, name:"Odense University Hospital (OUH)", addr:"J.B. Winsløws Vej 4, 5000 Odense C", hours:"24/7", lang:"English, Danish", url:"https://www.ouh.dk" },
      { lat:55.6858, lng:12.5702, name:"International Medical Clinic Copenhagen", addr:"Fredericiagade 6, 1310 CPH K", hours:"Mon–Fri 8:00–17:00", lang:"English, 20+ languages", url:"https://www.imc.dk", note:"Specialist clinic for internationals. English-first, many languages." },
    ],
    schools: [
      { lat:55.7072, lng:12.5561, name:"Copenhagen International School (COIS)", addr:"Hellerupvej 22, 2900 Hellerup", hours:"School hours", lang:"English (IB)", url:"https://www.cois.dk", note:"IB curriculum. One of Denmark's top international schools." },
      { lat:55.6738, lng:12.5594, name:"International School of Copenhagen", addr:"Gamle Carlsberg Vej 16, 1799 Copenhagen V", hours:"School hours", lang:"English (IB)", url:"https://www.isc.dk" },
      { lat:56.1843, lng:10.2025, name:"Aarhus International School", addr:"Hjortshøj Centervej 3, 8520 Lystrup", hours:"School hours", lang:"English", url:"https://www.aarhus-international-school.dk" },
      { lat:55.3835, lng:10.3780, name:"Odense International School", addr:"Abildgårdsvej 2, 5230 Odense M", hours:"School hours", lang:"English", url:"https://www.ois.dk" },
      { lat:55.6802, lng:12.5703, name:"Bernadotteskolen", addr:"Hellerupvej 11, 2900 Hellerup", hours:"School hours", lang:"Danish+French bilingual", url:"https://bernadotteskolen.dk" },
    ],
    uni: [
      { lat:55.6979, lng:12.5724, name:"University of Copenhagen (KU)", addr:"Nørregade 10, 1165 Copenhagen K", hours:"Campus open", lang:"English, Danish", url:"https://www.ku.dk/english", note:"Denmark's largest and oldest university. 350+ English-taught programmes." },
      { lat:55.7861, lng:12.5231, name:"Technical University of Denmark (DTU)", addr:"Anker Engelunds Vej 1, 2800 Kongens Lyngby", hours:"Campus open", lang:"English, Danish", url:"https://www.dtu.dk/english", note:"Top technical university in Scandinavia." },
      { lat:55.6869, lng:12.5748, name:"Copenhagen Business School (CBS)", addr:"Solbjerg Plads 3, 2000 Frederiksberg", hours:"Campus open", lang:"English, Danish", url:"https://www.cbs.dk/en", note:"Europe's largest business school." },
      { lat:56.1725, lng:10.1890, name:"Aarhus University (AU)", addr:"Nordre Ringgade 1, 8000 Aarhus C", hours:"Campus open", lang:"English, Danish", url:"https://www.au.dk/en", note:"Denmark's second largest. Strong research reputation." },
      { lat:55.3700, lng:10.4298, name:"University of Southern Denmark (SDU)", addr:"Campusvej 55, 5230 Odense M", hours:"Campus open", lang:"English, Danish", url:"https://www.sdu.dk/en" },
      { lat:57.0127, lng:9.9879, name:"Aalborg University (AAU)", addr:"Fredrik Bajers Vej 5, 9220 Aalborg Ø", hours:"Campus open", lang:"English, Danish", url:"https://www.en.aau.dk" },
    ],
    worship: [
      { lat:55.6890, lng:12.5592, name:"Mosque — Islamic Cultural Centre", addr:"Dortheavej 54, 2400 Copenhagen NV", hours:"Prayer times", lang:"Arabic, Danish, English", url:"https://www.islamiskkulturcenter.dk", note:"Largest mosque in Copenhagen." },
      { lat:55.6820, lng:12.5712, name:"St. Alban's Anglican Church", addr:"Churchill Parken, 1263 Copenhagen K", hours:"Sun service 10:30", lang:"English", url:"https://www.st-albans.dk", note:"English-language Anglican church, welcoming to internationals." },
      { lat:55.6783, lng:12.5657, name:"Great Synagogue Copenhagen", addr:"Krystalgade 12, 1172 Copenhagen K", hours:"Services Fri eve, Sat morning", lang:"Danish, Hebrew", url:"https://www.mosaiske.dk" },
      { lat:55.6867, lng:12.5595, name:"Russian Orthodox Cathedral", addr:"Bred Gade 21, 1260 Copenhagen K", hours:"Services Sun 10:00", lang:"Russian, Danish", url:"" },
      { lat:56.1569, lng:10.2107, name:"Aarhus Mosque", addr:"Grimhøjvej 10, 8220 Brabrand", hours:"Prayer times", lang:"Arabic, Urdu, Danish", url:"" },
      { lat:55.6711, lng:12.5565, name:"St. Peter's Catholic Church", addr:"Sankt Peders Stræde 1, 1453 Copenhagen K", hours:"Daily Mass", lang:"Danish, English, Polish", url:"https://www.katolsk.dk" },
      { lat:55.6845, lng:12.5709, name:"Buddhist Meditation Center Copenhagen", addr:"Nørre Farimagsgade 79, 2200 CPH N", hours:"See website", lang:"Danish, English", url:"https://www.buddhisme.dk" },
    ],
    embassy: [
      { lat:55.6883, lng:12.5778, name:"US Embassy Copenhagen", addr:"Dag Hammarskjölds Allé 24, 2100 CPH Ø", hours:"Mon–Fri, appointment only", lang:"English, Danish", url:"https://dk.usembassy.gov" },
      { lat:55.6894, lng:12.5648, name:"UK Embassy Copenhagen", addr:"Kastelsvej 36–40, 2100 CPH Ø", hours:"Mon–Fri 9:00–16:00", lang:"English, Danish", url:"https://www.gov.uk/world/organisations/british-embassy-copenhagen" },
      { lat:55.6870, lng:12.5720, name:"French Embassy Copenhagen", addr:"Kongens Nytorv 4, 1050 CPH K", hours:"Mon–Fri", lang:"French, Danish, English", url:"https://dk.ambafrance.org" },
      { lat:55.6875, lng:12.5680, name:"German Embassy Copenhagen", addr:"Stockholmsgade 57, 2100 CPH Ø", hours:"Mon–Fri 8:30–11:30", lang:"German, Danish, English", url:"https://kopenhagen.diplo.de" },
      { lat:55.6792, lng:12.5783, name:"Indian Embassy Copenhagen", addr:"Vangehusvej 15, 2100 CPH Ø", hours:"Mon–Fri 9:00–17:00", lang:"Hindi, English, Danish", url:"https://www.indembassy.dk" },
      { lat:55.6830, lng:12.5741, name:"Pakistani Embassy Copenhagen", addr:"Valby Langgade 91-93, 2500 Valby", hours:"Mon–Fri 9:00–13:00", lang:"Urdu, English, Danish", url:"" },
    ],
    employer: [
      { lat:55.7730, lng:12.5020, name:"Novo Nordisk HQ", addr:"Novo Allé 1, 2880 Bagsværd", hours:"Office hours", lang:"English-speaking", url:"https://www.novonordisk.com/careers", note:"One of Denmark's largest employers, very international." },
      { lat:55.6833, lng:12.5783, name:"Maersk Global HQ", addr:"Esplanaden 50, 1263 CPH K", hours:"Office hours", lang:"English-speaking", url:"https://www.maersk.com/careers", note:"World's largest container shipping company." },
      { lat:55.7034, lng:12.5622, name:"Carlsberg Group", addr:"J.C. Jacobsens Gade 1, 1799 CPH V", hours:"Office hours", lang:"English-speaking", url:"https://www.carlsberg.com/careers" },
      { lat:56.1400, lng:10.0834, name:"LEGO Group HQ", addr:"Aastvej 1, 7190 Billund", hours:"Office hours", lang:"English-speaking", url:"https://www.lego.com/careers", note:"Headquartered in Billund. Major global employer." },
      { lat:55.6760, lng:12.5750, name:"Ørsted (Wind Energy)", addr:"Kraftværksvej 53, 7000 Fredericia", hours:"Office hours", lang:"English-speaking", url:"https://orsted.com/careers" },
      { lat:55.6960, lng:12.5488, name:"Copenhagen Tech Hub / BLOX", addr:"Otto Busses Vej 5, 1359 CPH K", hours:"Varies", lang:"English, Danish", url:"https://www.blox.dk", note:"Copenhagen's main innovation hub. Many tech companies and startups." },
    ]
  };

  /* ── LAYER CONFIG ────────────────────────────────────── */
  const LAYER_CONFIG = {
    ics:      { color: '#C60C30', emoji: '🏛️', label: 'ICS Office' },
    health:   { color: '#2E6DA4', emoji: '🏥', label: 'Clinic/Hospital' },
    schools:  { color: '#6A9E6A', emoji: '🏫', label: 'Int\'l School' },
    uni:      { color: '#E8A020', emoji: '🎓', label: 'University' },
    worship:  { color: '#B87333', emoji: '🕌', label: 'Place of Worship' },
    embassy:  { color: '#1B3A5C', emoji: '🌍', label: 'Embassy' },
    employer: { color: '#6a3a8a', emoji: '💼', label: 'Employer' },
  };

  /* ── CREATE CUSTOM MARKER ────────────────────────────── */
  const createIcon = (layerId) => {
    const cfg = LAYER_CONFIG[layerId];
    return L.divIcon({
      className: '',
      html: `<div style="
        background:${cfg.color};
        width:36px;height:36px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 14px rgba(0,0,0,0.4);
        border:3px solid white;
        cursor:pointer;
      "><span style="transform:rotate(45deg);font-size:14px">${cfg.emoji}</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40]
    });
  };

  /* ── CREATE POPUP CONTENT ────────────────────────────── */
  const createPopup = (loc, layerId) => {
    const cfg = LAYER_CONFIG[layerId];
    return `<div class="map-popup" style="min-width:200px;max-width:280px">
      <span class="map-popup-tag" style="background:${cfg.color}1a;color:${cfg.color}">${cfg.emoji} ${cfg.label}</span>
      <h4>${loc.name}</h4>
      <p>📍 ${loc.addr}</p>
      ${loc.hours ? `<p>🕐 ${loc.hours}</p>` : ''}
      ${loc.lang ? `<p>🗣️ ${loc.lang}</p>` : ''}
      ${loc.note ? `<p style="font-style:italic;color:#888;font-size:0.78rem;margin-top:6px">${loc.note}</p>` : ''}
      ${loc.url ? `<a href="${loc.url}" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px">Visit website ↗</a>` : ''}
    </div>`;
  };

  /* ── BUILD LAYER ─────────────────────────────────────── */
  const buildLayer = (layerId) => {
    const locations = LOCATIONS[layerId] || [];
    const group = L.layerGroup();

    locations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(layerId),
        title: loc.name
      });
      marker.bindPopup(createPopup(loc, layerId), {
        maxWidth: 300,
        className: 'ankommer-popup'
      });
      group.addLayer(marker);
    });

    return group;
  };

  /* ── TOGGLE LAYER ────────────────────────────────────── */
  const toggleLayer = (layerId) => {
    if (!map) return;
    if (activeLayerIds.has(layerId)) {
      map.removeLayer(layerGroups[layerId]);
      activeLayerIds.delete(layerId);
    } else {
      map.addLayer(layerGroups[layerId]);
      activeLayerIds.add(layerId);
    }
  };

  /* ── INIT MAP ────────────────────────────────────────── */
  const init = () => {
    const container = document.getElementById('denmark-map');
    if (!container || typeof L === 'undefined') return;

    // Center on Denmark
    map = L.map('denmark-map', {
      center: [56.2639, 9.5018],
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // Tile layer (CartoDB Voyager — clean and beautiful)
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Build all layers
    Object.keys(LOCATIONS).forEach(layerId => {
      layerGroups[layerId] = buildLayer(layerId);
      if (activeLayerIds.has(layerId)) {
        map.addLayer(layerGroups[layerId]);
      }
    });

    // Layer toggle buttons
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const layerId = btn.dataset.layer;
        toggleLayer(layerId);
        btn.classList.toggle('active');
      });
    });

    // Popup CSS injection
    injectPopupStyles();

    // Update tiles on theme change
    window.addEventListener('themeChange', (e) => {
      const url = e.detail === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      // Remove tile layers only (use instanceof instead of private _url property)
      // Also remove active marker groups to prevent duplication on re-add
      map.eachLayer(l => {
        if (l instanceof L.TileLayer) map.removeLayer(l);
      });
      activeLayerIds.forEach(id => {
        if (layerGroups[id]) map.removeLayer(layerGroups[id]);
      });
      L.tileLayer(url, {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);
      // Re-add active marker layers after tile swap
      activeLayerIds.forEach(id => {
        if (layerGroups[id]) map.addLayer(layerGroups[id]);
      });
    });

    // Resize handler
    window.addEventListener('resize', () => map.invalidateSize());

    // Fly to city based on user profile
    window.addEventListener('profileSet', (e) => {
      const city = e.detail?.location;
      const cities = {
        cph:     [55.6761, 12.5683, 12],
        aarhus:  [56.1629, 10.2039, 12],
        odense:  [55.3959, 10.3883, 12],
        aalborg: [57.0480, 9.9187,  12],
      };
      if (cities[city]) {
        map.flyTo([cities[city][0], cities[city][1]], cities[city][2], { duration: 2 });
      }
    });
  };

  /* ── POPUP STYLE INJECTION ───────────────────────────── */
  const injectPopupStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .ankommer-popup .leaflet-popup-content-wrapper {
        background: var(--bg-card, #fff);
        color: var(--text, #1a1a2e);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        border: 1px solid var(--border, rgba(0,0,0,0.08));
        padding: 0;
      }
      .ankommer-popup .leaflet-popup-content {
        margin: 14px 16px;
      }
      .ankommer-popup .leaflet-popup-tip {
        background: var(--bg-card, #fff);
      }
      .ankommer-popup .leaflet-popup-close-button {
        color: var(--text-muted, #888);
      }
      .map-popup h4 {
        font-family: 'Playfair Display', serif;
        font-size: 0.95rem;
        margin: 6px 0 6px;
        color: var(--text, #1a1a2e);
      }
      .map-popup p {
        font-size: 0.78rem;
        margin: 3px 0;
        color: var(--text-muted, #666);
      }
      .map-popup-tag {
        font-size: 0.65rem;
        padding: 2px 8px;
        border-radius: 10px;
        font-weight: 700;
        display: inline-block;
        margin-bottom: 4px;
      }
      /* Attribution legibility fix for dark theme */
      [data-theme="dark"] .leaflet-control-attribution,
      [data-theme="dark"] .leaflet-control-attribution a {
        background: rgba(15,27,45,0.85) !important;
        color: rgba(255,255,255,0.7) !important;
      }
      [data-theme="dark"] .leaflet-control-zoom a {
        background: var(--bg-card, #1a2740) !important;
        color: var(--text, #e8edf5) !important;
        border-color: var(--border, rgba(255,255,255,0.15)) !important;
      }
      [data-theme="dark"] .leaflet-control-zoom a:hover {
        background: var(--bg-secondary, #243350) !important;
      }
    `;
    document.head.appendChild(style);
  };

  return { init };
})();
