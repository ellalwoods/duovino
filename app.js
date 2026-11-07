/* Duovino: the app. Vanilla JS, no build step. */
(() => {
  'use strict';
  const D = window.DUOVINO;
  const STORE = 'duovino.v1';
  const DAY = 864e5;
  const INTERVALS = [1, 3, 7, 16, 35, 90]; // days between reviews, per cellar age stage
  const app = document.getElementById('app');
  const overlay = document.getElementById('overlay');

  /* ---------- state ---------- */
  const defaults = () => ({ days: {}, depth: 0, cellar: {}, flights: {}, settings: { hemi: 'N', sound: true } });
  const load = () => {
    try { const s = JSON.parse(localStorage.getItem(STORE)); return s ? { ...defaults(), ...s, settings: { ...defaults().settings, ...s.settings } } : defaults(); }
    catch { return defaults(); }
  };
  let S = load();
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch { /* private mode */ } };

  const key = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const todayKey = () => key(new Date());
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ?demo seeds a lived-in cellar so you can see the ageing mechanic straight away
  if (/[?&]demo\b/.test(location.search) && !S.demoSeeded) {
    const now = Date.now();
    for (let i = 1; i <= 9; i++) if (i !== 3 && i !== 6) S.days[key(new Date(now - i * DAY))] = 1;
    S.depth = 64;
    const ids = Object.keys(D.concepts);
    ids.slice(0, 16).forEach((id, n) => {
      const stage = n % 6;
      const born = now - (40 + n * 9) * DAY;
      let due = now + INTERVALS[stage] * DAY;
      if (n % 4 === 1) due = now - DAY;            // ready to drink
      if (n === 6 || n === 13) due = now - 30 * DAY; // corked
      S.cellar[id] = { stage, born, due, reviews: stage };
    });
    S.flights.loire = { best: 86, plays: 2 };
    S.flights.barolo = { best: 57, plays: 1 };
    S.demoSeeded = true; save();
  }

  /* ---------- sound & touch ---------- */
  let actx;
  const audio = () => (actx ||= new (window.AudioContext || window.webkitAudioContext)());
  function clink() {
    if (!S.settings.sound) return;
    try {
      const a = audio(), t = a.currentTime;
      [2637, 3951, 5274].forEach((f, i) => {
        const o = a.createOscillator(), g = a.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12 / (i + 1), t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2 - i * 0.3);
        o.connect(g).connect(a.destination); o.start(t); o.stop(t + 1.3);
      });
    } catch { /* no audio */ }
  }
  function thud() {
    if (!S.settings.sound) return;
    try {
      const a = audio(), t = a.currentTime, o = a.createOscillator(), g = a.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.25);
      g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.32);
    } catch { /* no audio */ }
  }
  function pop() {
    if (!S.settings.sound) return;
    try {
      const a = audio(), t = a.currentTime;
      const len = a.sampleRate * 0.08, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const n = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
      n.buffer = buf; f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.8; g.gain.value = 0.9;
      n.connect(f).connect(g).connect(a.destination); n.start(t);
      const o = a.createOscillator(), og = a.createGain();
      o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(140, t + 0.12);
      og.gain.setValueAtTime(0.3, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      o.connect(og).connect(a.destination); o.start(t); o.stop(t + 0.16);
    } catch { /* no audio */ }
  }
  const buzz = ms => navigator.vibrate && navigator.vibrate(ms);

  /* ---------- seasons, weather, vintage ---------- */
  const season = () => {
    let m = new Date().getMonth();
    if (S.settings.hemi === 'S') m = (m + 6) % 12;
    return D.seasons[m];
  };
  const weather = () => {
    if (S.days[todayKey()]) return 'sun';
    if (S.days[key(new Date(Date.now() - DAY))] || !Object.keys(S.days).length) return 'cloud';
    return 'frost';
  };
  const WEATHER_TEXT = {
    sun: 'Sunshine on the vines. You tasted today.',
    cloud: 'Overcast. One flight today brings the sun out.',
    frost: 'A light frost. The vines have missed you, but nothing a flight can\'t thaw.',
  };
  const week = () => {
    const d = new Date(), dow = (d.getDay() + 6) % 7, out = [];
    for (let i = 0; i < 7; i++) { const x = new Date(d); x.setDate(d.getDate() - dow + i); out.push({ k: key(x), future: i > dow, today: i === dow }); }
    return out;
  };
  const weekNo = () => {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const w1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - w1) / DAY - 3 + ((w1.getDay() + 6) % 7)) / 7);
  };
  const VINTAGE = ['Frost-hit', 'Difficult', 'Mixed', 'Good', 'Very good', 'Excellent', 'Excellent', 'Legendary'];

  /* ---------- soil ---------- */
  const STRATUM_PX = 110;
  const stratumIndex = depth => { let i = 0; D.strata.forEach((s, n) => { if (depth >= s.at) i = n; }); return i; };
  const depthPx = depth => {
    const i = stratumIndex(depth), s = D.strata[i], next = D.strata[i + 1];
    const frac = next ? (depth - s.at) / (next.at - s.at) : Math.min(1, (depth - s.at) / 60);
    return (i + Math.min(frac, 0.95)) * STRATUM_PX + 8;
  };

  /* ---------- cellar ---------- */
  const bottleState = e => {
    const now = Date.now();
    if (now < e.due) return 'resting';
    const grace = Math.max(4, INTERVALS[e.stage]) * DAY;
    return now - e.due > grace ? 'corked' : 'ready';
  };
  const readyCount = () => Object.values(S.cellar).filter(e => bottleState(e) !== 'resting').length;

  const SHAPES = {
    bordeaux: 'M16 4H24V36C24 45 34 45 34 55V112Q34 116 30 116H10Q6 116 6 112V55C6 45 16 45 16 36Z',
    burgundy: 'M16.5 4H23.5V28C23.5 48 35 54 35 70V112Q35 116 31 116H9Q5 116 5 112V70C5 54 16.5 48 16.5 28Z',
    flute: 'M17 4H23V28C23 48 30 54 30 66V112Q30 116 26 116H14Q10 116 10 112V66C10 54 17 48 17 28Z',
    half: 'M17 34H23V52C23 60 31 62 31 72V112Q31 116 27 116H13Q9 116 9 112V72C9 62 17 60 17 52Z',
    champagne: 'M16 4H24V26C24 46 36 52 36 68V112Q36 116 32 116H8Q4 116 4 112V68C4 52 16 46 16 26Z',
  };
  const BODY = { bordeaux: 28, burgundy: 30, flute: 20, half: 22, champagne: 32 }; // body widths, for fitting label text
  const mix = (a, b, t) => {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const [x, y] = [p(a), p(b)];
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  let bid = 0;
  function bottleSVG(id, e) {
    const c = D.concepts[id], st = e ? bottleState(e) : 'resting', stage = e ? e.stage : 0, n = ++bid;
    const glass = c.style === 'red' ? '#1f3127' : mix(c.wine, '#ffffff', 0.15);
    const top = c.shape === 'half' ? 34 : 4;
    const labelY = c.shape === 'half' ? 80 : 74;
    const labelCol = mix('#fbf6ea', '#d9be86', stage / 5);
    const cap = c.style === 'red' ? '#6e1424' : (c.style === 'sweet' ? '#b98a2a' : '#c9c1ae');
    const year = new Date(e ? e.born : Date.now()).getFullYear();
    return `<svg class="bottle ${st}" viewBox="0 0 40 122" aria-label="${esc(c.name)}">
      <defs><clipPath id="bc${n}"><path d="${SHAPES[c.shape]}"/></clipPath></defs>
      ${st === 'corked' ? `<rect x="17.5" y="${top - 7}" width="5" height="9" rx="1" fill="#b58a5a"/>` : ''}
      <path d="${SHAPES[c.shape]}" fill="${glass}"/>
      <g clip-path="url(#bc${n})">
        ${c.style !== 'red' ? `<rect x="0" y="${top + 34}" width="40" height="90" fill="${c.wine}" opacity=".55"/>` : ''}
        <rect x="0" y="${top}" width="40" height="22" fill="${cap}"/>
        <rect x="8" y="${top + 10}" width="3" height="100" fill="#fff" opacity=".18"/>
        <rect x="4" y="${labelY}" width="32" height="28" fill="${labelCol}"/>
        <rect x="4" y="${labelY + 3}" width="32" height=".6" fill="${c.wine}" opacity=".9"/>
        <text x="20" y="${labelY + 13}" text-anchor="middle" class="bl-name"${c.short.length * 3 > BODY[c.shape] - 3 ? ` textLength="${BODY[c.shape] - 3}" lengthAdjust="spacingAndGlyphs"` : ''}>${esc(c.short)}</text>
        <text x="20" y="${labelY + 22}" text-anchor="middle" class="bl-year">${year}</text>
        <rect x="0" y="0" width="40" height="122" fill="url(#dust)" opacity="${(stage / 5) * 0.75}"/>
        ${stage >= 4 ? `<path d="M5 60 Q14 58 18 50 M5 66 Q16 62 22 52 M10 58 L8 67" stroke="#eee" stroke-width=".35" fill="none" opacity=".7"/>` : ''}
      </g>
    </svg>`;
  }

  /* ---------- small graphics ---------- */
  function ring(pct, colour, size = 64, label = '') {
    const r = 38, dash = Math.max(0, Math.min(100, pct));
    return `<svg class="ring" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">
      <g filter="url(#stain)">
        <circle cx="50" cy="50" r="${r}" fill="none" stroke="${colour}" stroke-width="7" opacity=".12"/>
        ${dash > 0 ? `<circle cx="50" cy="50" r="${r}" fill="none" stroke="${colour}" stroke-width="6" opacity=".55" pathLength="100" stroke-dasharray="${dash} 100" transform="rotate(-80 50 50)" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="${r + 3}" fill="none" stroke="${colour}" stroke-width="1.4" opacity=".8" pathLength="100" stroke-dasharray="${dash} 100" transform="rotate(-80 50 50)"/>` : ''}
      </g>${label ? `<text x="50" y="57" text-anchor="middle" class="ring-label">${label}</text>` : ''}
    </svg>`;
  }

  const BOTTY = `<svg class="botty" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="38" r="20" fill="#d9a441"/><circle cx="25" cy="31" r="6" fill="#f1cf7a" opacity=".6"/>
    <path d="M20 46 q4 3 6 0 M42 44 q3 2 4 -1" stroke="#b07c25" stroke-width="1.2" fill="none"/>
    <g fill="#b9b3a8"><circle cx="24" cy="20" r="5"/><circle cx="31" cy="16" r="6"/><circle cx="39" cy="18" r="5"/><circle cx="44" cy="23" r="3.5"/><circle cx="19" cy="25" r="3"/></g>
    <g fill="#d6d1c8"><circle cx="29" cy="14" r="2"/><circle cx="37" cy="15" r="1.6"/><circle cx="23" cy="18" r="1.4"/></g>
    <circle cx="26" cy="37" r="2.4" fill="#2a1a1f"/><circle cx="38" cy="37" r="2.4" fill="#2a1a1f"/>
    <circle cx="26.8" cy="36.2" r=".8" fill="#fff"/><circle cx="38.8" cy="36.2" r=".8" fill="#fff"/>
    <path class="mouth" d="M27 44 q5 4 10 0" stroke="#2a1a1f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </svg>`;

  function vineSVG(stage) {
    const green = '#5f7d3a', leafCols = { fall: ['#d39a2d', '#b9502c', '#e0b84b', '#8d3a2a'] };
    const shoots = { dormant: 0, bud: 1, leaf: 2, flower: 3, fruit: 3, veraison: 3, harvest: 3, fall: 3 }[stage];
    const xs = [42, 70, 98, 196, 224, 252];
    let g = '';
    const leaf = (x, y, r, col) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(1.05)" d="M0 0C-3-2-9-3-10-8-6-8-7-12-4-14-2-11 0-12 0-17 0-12 2-11 4-14 7-12 6-8 10-8 9-3 3-2 0 0Z" fill="${col}"/>`;
    xs.forEach((x, i) => {
      if (shoots === 0) { g += `<path d="M${x} 92 l-2 -7 M${x} 92 l3 -6" stroke="#5a3b28" stroke-width="2.4" stroke-linecap="round"/>`; return; }
      if (shoots === 1) { g += `<circle cx="${x}" cy="88" r="3.4" fill="#a7bf6b"/><circle cx="${x + 3}" cy="86" r="2" fill="#c7d98f"/>`; return; }
      const h = shoots === 2 ? 30 : 50, bend = i % 2 ? 6 : -6;
      g += `<path d="M${x} 92 q${bend} ${-h / 2} ${bend / 2} ${-h}" stroke="#6b7f3a" stroke-width="2" fill="none"/>`;
      const cols = leafCols[stage] || [green, '#6f8f45', '#55743a'];
      for (let k = 0; k < (shoots === 2 ? 2 : 4); k++) g += leaf(x + bend * (k / 4) + (k % 2 ? 6 : -6), 92 - (k + 1) * (h / 4.5), k % 2 ? 35 : -35, cols[(i + k) % cols.length]);
      if (stage === 'flower') g += `<g fill="#efe8c4">${[0, 1, 2, 3, 4].map(j => `<circle cx="${x + 4 + (j % 3) * 2}" cy="${96 + Math.floor(j / 2) * 2}" r="1.2"/>`).join('')}</g>`;
      if (['fruit', 'veraison', 'harvest'].includes(stage)) {
        let b = '';
        const rows = [[0, 1, 2, 3], [0.5, 1.5, 2.5], [1, 2], [1.5]];
        rows.forEach((row, ry) => row.forEach(cx => {
          const col = stage === 'fruit' ? '#9fb65a' : stage === 'harvest' ? '#4a1836' : ((cx + ry) % 2 < 1 ? '#5a1d3e' : '#93a85a');
          b += `<circle cx="${x - 2 + cx * 4.2}" cy="${100 + ry * 4}" r="2.5" fill="${col}"/>`;
        }));
        g += b;
      }
    });
    if (stage === 'fall') g += [60, 150, 240, 120].map((x, i) => leaf(x, 110 + i * 5, i * 70, leafCols.fall[i])).join('');
    const snow = stage === 'dormant' ? `<path d="M10 93 H290" stroke="#f4f1ea" stroke-width="1.5" stroke-dasharray="3 5" opacity=".9"/>` : '';
    return `<svg class="vine-svg" viewBox="0 0 300 140" aria-hidden="true">
      <path d="M0 130 Q150 120 300 130 V140 H0Z" fill="#5b3f2d"/>
      <path d="M22 130 V84 M278 130 V84" stroke="#7a5a3c" stroke-width="4"/>
      <path d="M20 92 H280" stroke="#3b302a" stroke-width=".8"/>
      <path d="M150 131 C147 118 154 108 149 96 C146 92 120 93 30 93 M149 96 C156 92 180 93 270 93" stroke="#5a3b28" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${g}${snow}
    </svg>`;
  }

  function weatherSVG(w) {
    if (w === 'sun') return `<svg class="wx sun" viewBox="0 0 80 80"><g class="rays" stroke="#f3c75a" stroke-width="3" stroke-linecap="round">${[...Array(12)].map((_, i) => `<line x1="40" y1="6" x2="40" y2="14" transform="rotate(${i * 30} 40 40)"/>`).join('')}</g><circle cx="40" cy="40" r="17" fill="#f6d36d"/></svg>`;
    const cloud = `<path d="M18 52 a12 12 0 0 1 4-23 a16 16 0 0 1 30-3 a12 12 0 0 1 10 26Z" fill="#ece7df" opacity=".95"/>`;
    if (w === 'cloud') return `<svg class="wx cloud" viewBox="0 0 80 80"><circle cx="54" cy="28" r="12" fill="#f3d27a" opacity=".55"/>${cloud}</svg>`;
    return `<svg class="wx frost" viewBox="0 0 80 80"><g stroke="#e9f2f7" stroke-width="2" stroke-linecap="round">${[0, 60, 120].map(r => `<g transform="rotate(${r} 40 40)"><line x1="40" y1="14" x2="40" y2="66"/><path d="M34 20 l6 6 6-6 M34 60 l6-6 6 6" fill="none"/></g>`).join('')}</g></svg>`;
  }

  function rootsSVG(depth) {
    const h = depthPx(depth), w = 300;
    let x = 150, y = 0, d = `M${x} 0`, branches = '';
    let seed = 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    while (y < h) {
      const ny = Math.min(h, y + 26), nx = 150 + (rnd() - 0.5) * 34;
      d += ` Q${x + (rnd() - 0.5) * 30} ${y + 13} ${nx} ${ny}`;
      if (ny < h - 10) {
        const dir = rnd() > 0.5 ? 1 : -1, len = 30 + rnd() * 50;
        branches += `<path d="M${nx} ${ny} q${dir * len * 0.5} ${8 + rnd() * 10} ${dir * len} ${18 + rnd() * 20}" />`;
      }
      x = nx; y = ny;
    }
    return `<svg class="roots" viewBox="0 0 ${w} ${D.strata.length * STRATUM_PX}" preserveAspectRatio="xMidYMin meet" style="height:${D.strata.length * STRATUM_PX}px" aria-hidden="true">
      <g fill="none" stroke="#e9d9b8" stroke-linecap="round" filter="url(#wobble)">
        <path class="root-main" d="${d}" stroke-width="3.2" pathLength="1"/>
        <g class="root-branches" stroke-width="1.3" opacity=".8">${branches}</g>
      </g>
      <circle cx="${x}" cy="${h}" r="4" fill="#f4e7c9" class="root-tip"/>
    </svg>`;
  }

  /* ---------- home ---------- */
  function home() {
    const se = season(), w = weather(), wk = week();
    const active = wk.filter(d => S.days[d.k]).length;
    const flights = D.flights.slice().sort((a, b) => (b.seasonal?.includes(se.stage) ? 1 : 0) - (a.seasonal?.includes(se.stage) ? 1 : 0));
    const si = stratumIndex(S.depth);
    const bottles = Object.entries(S.cellar).sort((a, b) => a[1].born - b[1].born);
    const ready = readyCount();
    document.documentElement.style.setProperty('--wine', '#7b2a2a');

    app.innerHTML = `
    <div class="home">
      <section class="sky sky-${se.stage} wx-${w}">
        <header class="top">
          <h1 class="wordmark">Duo<em>vino</em></h1>
          <button class="icon-btn" data-act="settings" aria-label="Settings">${gearIcon()}</button>
        </header>
        <div class="season">
          <div>
            <p class="eyebrow">${new Date().toLocaleDateString('en-GB', { month: 'long' })} · ${S.settings.hemi === 'N' ? 'Northern' : 'Southern'} Hemisphere</p>
            <h2>${se.name}</h2>
            <p class="note">${se.note}</p>
          </div>
          ${weatherSVG(w)}
        </div>
        <div class="vintage">
          <div class="vintage-head">
            <span class="mono">VINTAGE · WK ${weekNo()}</span>
            <span class="vintage-rating">${VINTAGE[active]}</span>
          </div>
          <div class="week">${wk.map(d => `<span class="day ${S.days[d.k] ? 'on' : ''} ${d.future ? 'future' : ''} ${d.today ? 'today' : ''}"></span>`).join('')}</div>
          <p class="wx-text">${WEATHER_TEXT[w]}</p>
        </div>
        ${vineSVG(se.stage)}
      </section>

      <section class="vine-zone">
        <p class="zone-label mono">The Vine · today's flights</p>
        ${flights.map(f => {
          const rec = S.flights[f.id], inSeason = f.seasonal?.includes(se.stage);
          return `<button class="flight-card ${inSeason ? 'in-season' : ''}" data-act="flight" data-id="${f.id}" style="--fw:${f.wine}">
            <span class="fc-ring">${ring(rec ? rec.best : 0, f.wine, 58, rec ? rec.best + '%' : '')}</span>
            <span class="fc-text">
              ${inSeason ? '<span class="badge">In season</span>' : ''}
              <strong>${f.title}</strong>
              <span>${f.sub}</span>
              <span class="mono fc-meta">${f.questions.length} glasses${rec ? ` · poured ${rec.plays}×` : ''}</span>
            </span>
            <span class="swatch"></span>
          </button>`;
        }).join('')}
      </section>

      <section class="soil">
        <div class="soil-head">
          <p class="zone-label mono">The Soil · your roots</p>
          <p class="depth"><span class="mono">ROOT DEPTH</span><strong>${(S.depth / 10).toFixed(1)} m</strong><span class="mono">in ${D.strata[si].name.toLowerCase()}</span></p>
        </div>
        <div class="strata">
          ${rootsSVG(S.depth)}
          ${D.strata.map((s, i) => `<div class="stratum s${i} ${i <= si ? 'reached' : 'locked'} ${i === si ? 'current' : ''}" style="--sc:${s.colour};height:${STRATUM_PX}px">
            <div class="st-text">
              <span class="mono st-name">${i <= si ? s.name : '? ? ?'}</span>
              <span class="st-fact">${i <= si ? s.fact : `Reach ${(s.at / 10).toFixed(1)} m to discover this layer`}</span>
            </div>
          </div>`).join('')}
        </div>
      </section>

      <section class="cellar-zone">
        <p class="zone-label mono">The Cellar · what you know</p>
        <button class="cellar-preview" data-act="cellar">
          <div class="rack">${bottles.length ? bottles.slice(-8).map(([id, e]) => bottleSVG(id, e)).join('') : '<p class="empty">Empty racks. Every flight lays down new bottles.</p>'}</div>
          <div class="cellar-meta">
            <span><strong>${bottles.length}</strong> bottles laid down</span>
            ${ready ? `<span class="ready-pill">${ready} ready to taste</span>` : `<span class="mono">all resting</span>`}
          </div>
        </button>
      </section>
      <footer class="foot mono">Drink less, taste more · Duovino</footer>
    </div>`;
    requestAnimationFrame(() => app.querySelector('.root-main')?.classList.add('grow'));
  }

  const gearIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>`;
  const closeIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

  /* ---------- flight player ---------- */
  let P = null;
  function startFlight(id) {
    const f = D.flights.find(x => x.id === id);
    if (!f) { location.hash = ''; return; }
    P = { f, i: 0, correct: 0, gain: 0, results: [], locked: false };
    document.documentElement.style.setProperty('--wine', f.wine);
    renderQ();
  }

  function playerShell(inner) {
    const pct = (P.i / P.f.questions.length) * 100;
    return `<div class="player" style="--fw:${P.f.wine}">
      <div class="tint"></div>
      <header class="p-top">
        <button class="icon-btn" data-act="quit" aria-label="Leave flight">${closeIcon()}</button>
        <div class="p-title"><span class="mono">GLASS ${P.i + 1} OF ${P.f.questions.length}</span><strong>${P.f.title}</strong></div>
        ${ring(pct, P.f.wine, 44)}
      </header>
      <div class="q-body">${inner}</div>
    </div>`;
  }

  function renderQ() {
    const q = P.f.questions[P.i];
    P.locked = false;
    const typeLabel = { choice: 'Question', blind: 'Blind · mystery glass', label: 'Label decoder', order: 'Put in order' }[q.type];
    let body = `<p class="eyebrow">${typeLabel}</p><h2 class="q">${q.q}</h2>`;
    if (q.type === 'choice') {
      P.order = shuffle(q.options.map((_, i) => i));
      body += `<div class="options">${P.order.map(i => `<button class="opt" data-act="choose" data-i="${i}">${q.options[i]}</button>`).join('')}</div>`;
    }
    if (q.type === 'blind') body += blindUI(q);
    if (q.type === 'label') body += labelUI(q);
    if (q.type === 'order') { P.seq = []; P.pool = shuffle(q.items); body += orderUI(q); }
    app.innerHTML = playerShell(body);
    if (q.type === 'blind') initSwirl(q);
  }

  /* Blind: swirl the glass to reveal clues */
  function blindUI(q) {
    P.clues = 1; P.blindOpts = shuffle(q.options.map((_, i) => i));
    return `<div class="blind">
      <div class="glass-wrap" aria-label="Swirl the glass to reveal the next clue">
        <svg class="swirl-ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" pathLength="100" stroke-dasharray="0 100"/></svg>
        <svg class="glass" viewBox="0 0 120 170">
          <defs><clipPath id="bowl"><path d="M28 8C24 58 32 94 60 98C88 94 96 58 92 8Z"/></clipPath></defs>
          <g clip-path="url(#bowl)">
            <path class="wine" d="" fill="${D.concepts[q.concept].wine}"/>
            <g class="legs">${[38, 52, 70, 82].map((x, i) => `<line x1="${x}" y1="20" x2="${x + (i % 2 ? 1 : -1)}" y2="60" style="animation-delay:${i * 0.35}s"/>`).join('')}</g>
          </g>
          <path d="M28 8C24 58 32 94 60 98C88 94 96 58 92 8" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".7"/>
          <path d="M34 16C32 44 36 72 48 86" fill="none" stroke="#fff" stroke-width="2.5" opacity=".35" stroke-linecap="round"/>
          <path d="M60 98V150M38 156Q60 148 82 156" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".7" stroke-linecap="round"/>
        </svg>
        <p class="swirl-hint mono">SWIRL ME ↻</p>
      </div>
      <ol class="clues">${q.clues.map((c, i) => `<li class="clue ${i < 1 ? 'shown' : ''}" data-c="${i}"><span class="mono">${c.stage}</span><p>${i < 1 ? c.text : 'Swirl the glass to reveal'}</p></li>`).join('')}</ol>
      <button class="link-btn" data-act="reveal">Can't swirl? Tap to reveal the next clue</button>
      <p class="blind-score mono">Guess now for <strong class="pts">+${blindPts(1)}</strong> root depth</p>
      <div class="options grid2">${P.blindOpts.map(i => `<button class="opt" data-act="guess" data-i="${i}">${q.options[i]}</button>`).join('')}</div>
    </div>`;
  }
  const blindPts = clues => (4 - clues) * 2;

  function initSwirl(q) {
    const wrap = app.querySelector('.glass-wrap'), winePath = app.querySelector('.wine'), ringC = app.querySelector('.swirl-ring circle');
    const NEED = Math.PI * 2 * 1.4;
    let last = null, acc = 0, phase = 0, amp = 2;
    const wave = () => {
      let d = '';
      for (let x = 0; x <= 120; x += 4) {
        const y = 62 + amp * Math.sin(phase + x / 13) * 0.5 + amp * ((x - 60) / 60) * Math.cos(phase) * 1.3;
        d += (x ? ' L' : 'M') + x + ' ' + y.toFixed(2);
      }
      winePath.setAttribute('d', d + ' L120 170 L0 170Z');
    };
    const tick = () => {
      if (!winePath.isConnected) return;
      amp = Math.max(1.2, amp * 0.97); phase += 0.02 + amp * 0.012;
      wave(); requestAnimationFrame(tick);
    };
    tick();
    const ang = e => { const r = wrap.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); return { a: Math.atan2(dy, dx), dist: Math.hypot(dx, dy) }; };
    wrap.addEventListener('pointerdown', e => { wrap.setPointerCapture(e.pointerId); last = ang(e).a; wrap.classList.add('swirling'); });
    wrap.addEventListener('pointermove', e => {
      if (last === null || P.locked) return;
      const { a, dist } = ang(e);
      if (dist < 14) return;
      let d = a - last; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
      last = a; acc += Math.abs(d); phase += d * 1.6; amp = Math.min(13, amp + Math.abs(d) * 4);
      if (P.clues >= q.clues.length) { ringC.setAttribute('stroke-dasharray', '100 100'); return; }
      ringC.setAttribute('stroke-dasharray', `${Math.min(100, (acc / NEED) * 100)} 100`);
      if (acc >= NEED) { acc = 0; revealClue(q); ringC.setAttribute('stroke-dasharray', '0 100'); }
    });
    const end = () => { last = null; wrap.classList.remove('swirling'); };
    wrap.addEventListener('pointerup', end); wrap.addEventListener('pointercancel', end);
  }

  function revealClue(q) {
    if (P.clues >= q.clues.length || P.locked) return;
    const li = app.querySelector(`.clue[data-c="${P.clues}"]`);
    li.querySelector('p').textContent = q.clues[P.clues].text;
    li.classList.add('shown');
    P.clues++;
    app.querySelector('.glass-wrap').classList.add('opened');
    setTimeout(() => app.querySelector('.glass-wrap')?.classList.remove('opened'), 2400);
    app.querySelector('.pts').textContent = '+' + blindPts(P.clues);
    if (P.clues >= q.clues.length) {
      app.querySelector('.swirl-hint').textContent = 'FULLY OPEN';
      app.querySelector('[data-act="reveal"]').remove();
    }
    clink(); buzz(12);
  }

  /* Label decoder */
  function labelUI(q) {
    return `<div class="wine-label label-${q.label.style}" style="--lw:${P.f.wine}">
      <div class="lbl-border">
        ${q.label.lines.map(line => `<div class="lbl-line">${line.map(s => `<button class="term ${s.big ? 'big' : ''} ${s.small ? 'small' : ''}" data-act="term" data-k="${s.k}">${s.t}</button>`).join('')}</div>`).join('')}
      </div>
    </div><p class="hint mono">Tap a word on the label</p>`;
  }

  /* Order */
  function orderUI(q) {
    return `<div class="order">
      <ol class="slots">${q.items.map((_, i) => `<li class="slot ${P.seq[i] ? 'filled' : ''}" data-act="unslot" data-i="${i}"><span class="mono">${i + 1}</span>${P.seq[i] ? `<b>${P.seq[i]}</b>` : ''}</li>`).join('')}</ol>
      <div class="pool">${P.pool.map(t => `<button class="chip ${P.seq.includes(t) ? 'used' : ''}" data-act="slot" data-t="${esc(t)}">${t}</button>`).join('')}</div>
    </div>`;
  }
  function refreshOrder() {
    const q = P.f.questions[P.i];
    app.querySelector('.order').outerHTML = orderUI(q);
    if (P.seq.length === q.items.length) {
      const ok = P.seq.every((t, i) => t === q.items[i]);
      app.querySelectorAll('.slot').forEach((el, i) => el.classList.add(P.seq[i] === q.items[i] ? 'right' : 'wrong'));
      answer(ok, ok ? '' : 'Correct order: ' + q.items.join(' → '));
    }
  }

  /* Answer & feedback */
  function answer(ok, correction) {
    if (P.locked) return;
    P.locked = true;
    const q = P.f.questions[P.i];
    let gain = 0;
    if (ok) { gain = q.type === 'blind' ? blindPts(P.clues) : 2; P.correct++; P.gain += gain; clink(); buzz(15); }
    else { thud(); buzz([30, 40, 30]); }
    P.results.push({ concept: q.concept, ok });
    const sheet = document.createElement('div');
    sheet.className = `sheet ${ok ? 'ok' : 'bad'}`;
    sheet.innerHTML = `<div class="sheet-in">
      <div class="sheet-head">${BOTTY}<div><h3>${ok ? pick(D.botty.good) : pick(D.botty.bad)}</h3>${ok && gain ? `<p class="mono gain">+${(gain / 10).toFixed(1)} m roots</p>` : ''}</div></div>
      ${correction ? `<p class="correction">${correction}</p>` : ''}
      <p>${q.explain}</p>
      <button class="primary" data-act="next">${P.i + 1 < P.f.questions.length ? 'Next glass' : 'Finish the flight'}</button>
    </div>`;
    app.querySelector('.player').appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('up'));
  }

  function next() {
    P.i++;
    if (P.i < P.f.questions.length) renderQ(); else finish();
  }

  function finish() {
    const f = P.f, pct = Math.round((P.correct / f.questions.length) * 100), now = Date.now();
    const before = stratumIndex(S.depth);
    S.days[todayKey()] = (S.days[todayKey()] || 0) + 1;
    S.depth += P.gain;
    const rec = S.flights[f.id] || { best: 0, plays: 0 };
    S.flights[f.id] = { best: Math.max(rec.best, pct), plays: rec.plays + 1 };
    // Lay down bottles. Missed concepts are ready to taste again immediately.
    const laid = [], seen = new Set();
    P.results.forEach(({ concept, ok }) => {
      if (seen.has(concept)) return; seen.add(concept);
      const e = S.cellar[concept];
      if (!e) { S.cellar[concept] = { stage: 0, born: now, due: ok ? now + INTERVALS[0] * DAY : now, reviews: 0 }; laid.push(concept); }
      else if (!ok) e.due = Math.min(e.due, now);
    });
    save();
    const after = stratumIndex(S.depth);
    pop(); buzz([20, 60, 20]);
    app.innerHTML = `<div class="player result" style="--fw:${f.wine}">
      <div class="tint"></div>
      <div class="res">
        <p class="eyebrow">Flight complete</p>
        <h2>${f.title}</h2>
        <div class="big-ring">${ring(pct, f.wine, 200)}<div class="big-num"><strong>${pct}%</strong><span class="mono">${P.correct} of ${f.questions.length} glasses</span></div></div>
        <div class="res-stats">
          <div><span class="mono">ROOTS</span><strong>+${(P.gain / 10).toFixed(1)} m</strong></div>
          <div><span class="mono">WEATHER</span><strong>Sunny</strong></div>
          <div><span class="mono">NEW BOTTLES</span><strong>${laid.length}</strong></div>
        </div>
        ${after > before ? `<div class="unlock"><span class="mono">NEW STRATUM REACHED</span><strong>${D.strata[after].name}</strong><p>${D.strata[after].fact}</p></div>` : ''}
        ${laid.length ? `<div class="laid"><p class="mono">LAID DOWN IN YOUR CELLAR</p><div class="rack small">${laid.map(id => bottleSVG(id, S.cellar[id])).join('')}</div></div>` : ''}
        <button class="primary" data-act="home">Back to the vineyard</button>
        <button class="link-btn" data-act="flight" data-id="${f.id}">Pour this flight again</button>
      </div>
    </div>`;
  }

  /* ---------- cellar screen ---------- */
  function cellar() {
    document.documentElement.style.setProperty('--wine', '#7b2a2a');
    const entries = Object.entries(S.cellar).sort((a, b) => {
      const o = { corked: 0, ready: 1, resting: 2 };
      return o[bottleState(a[1])] - o[bottleState(b[1])] || a[1].born - b[1].born;
    });
    const counts = { ready: 0, corked: 0, resting: 0 };
    entries.forEach(([, e]) => counts[bottleState(e)]++);
    const rows = [];
    for (let i = 0; i < entries.length; i += 4) rows.push(entries.slice(i, i + 4));
    app.innerHTML = `<div class="cellar">
      <header class="p-top">
        <button class="icon-btn" data-act="home" aria-label="Back">${closeIcon()}</button>
        <div class="p-title"><span class="mono">${entries.length} BOTTLES</span><strong>The Cellar</strong></div>
        <span></span>
      </header>
      <p class="cellar-intro">Every bottle is something you know. Taste a <em>ready</em> bottle to age it: the more often you remember it, the dustier and older it gets. Leave one too long and it turns <em>corked</em>, but one good tasting brings it back.</p>
      <div class="legend mono"><span class="lg ready">${counts.ready} ready</span><span class="lg corked">${counts.corked} corked</span><span class="lg resting">${counts.resting} resting</span></div>
      ${entries.length ? rows.map(r => `<div class="shelf">${r.map(([id, e]) => `<button class="slot-b" data-act="bottle" data-id="${id}">${bottleSVG(id, e)}<span class="mono">${bottleState(e) === 'resting' ? restLabel(e) : bottleState(e)}</span></button>`).join('')}</div>`).join('')
        : `<div class="empty-cellar">${BOTTY}<p>Nothing laid down yet. Finish a flight and your first bottles will appear here.</p><button class="primary" data-act="home">Find a flight</button></div>`}
    </div>`;
  }
  const restLabel = e => { const d = Math.ceil((e.due - Date.now()) / DAY); return d <= 1 ? 'tomorrow' : `${d} days`; };
  const AGE_NAMES = ['Young', 'Developing', 'Mature', 'Aged', 'Venerable', 'Legendary'];

  function openBottle(id) {
    const c = D.concepts[id], e = S.cellar[id], st = bottleState(e);
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <div class="modal-card" style="--fw:${c.wine}">
        <button class="icon-btn close" data-act="close" aria-label="Close">${closeIcon()}</button>
        <div class="mb-bottle">${bottleSVG(id, e)}</div>
        <p class="eyebrow mb-eyebrow">${c.kind} · ${AGE_NAMES[e.stage]} · ${e.reviews} tasting${e.reviews === 1 ? '' : 's'}</p>
        <h2>${c.name}</h2>
        <p class="review-q">${c.q}</p>
        <div class="review-a" hidden><p>${c.a}</p></div>
        ${st === 'resting'
          ? `<p class="mono resting-note">Resting · ready to taste in ${restLabel(e)}</p><button class="link-btn" data-act="peek">Peek at the answer</button>`
          : `<p class="mono resting-note">${st === 'corked' ? 'Corked! Taste it to rescue it.' : 'Ready to taste. Answer in your head first.'}</p><button class="primary" data-act="peek">Pour (reveal answer)</button>`}
        <div class="judge" hidden>
          <button class="opt" data-act="forgot" data-id="${id}">I'd forgotten</button>
          <button class="primary" data-act="remembered" data-id="${id}">I knew it</button>
        </div>
      </div>
    </div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
  }
  const closeModal = () => { overlay.innerHTML = ''; if (location.hash === '#cellar') cellar(); else route(); };

  function judge(id, ok) {
    const e = S.cellar[id], now = Date.now();
    if (ok) { e.stage = Math.min(INTERVALS.length - 1, e.stage + 1); e.reviews++; clink(); buzz(15); }
    else { e.stage = 0; thud(); }
    e.due = now + INTERVALS[e.stage] * DAY;
    S.days[todayKey()] = S.days[todayKey()] || 1;
    save();
    const card = overlay.querySelector('.modal-card');
    card.querySelector('.mb-bottle').innerHTML = bottleSVG(id, e);
    card.querySelector('.mb-bottle').classList.add('aged');
    card.querySelector('.mb-eyebrow').textContent = `${D.concepts[id].kind} · ${AGE_NAMES[e.stage]} · ${e.reviews} tasting${e.reviews === 1 ? '' : 's'}`;
    card.querySelector('.resting-note')?.remove();
    card.querySelector('.judge').outerHTML = `<p class="mono resting-note">${ok ? `Aged to ${AGE_NAMES[e.stage].toLowerCase()} · back in ${INTERVALS[e.stage]} days` : 'Back to young. Ready again tomorrow.'}</p><button class="primary" data-act="close">Back to the racks</button>`;
  }

  /* ---------- settings ---------- */
  function settings() {
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="modal-card settings">
      <button class="icon-btn close" data-act="close" aria-label="Close">${closeIcon()}</button>
      <p class="eyebrow">Settings</p><h2>Your vineyard</h2>
      <p class="set-label mono">HEMISPHERE</p>
      <div class="seg">${['N', 'S'].map(h => `<button class="${S.settings.hemi === h ? 'on' : ''}" data-act="hemi" data-h="${h}">${h === 'N' ? 'Northern' : 'Southern'}</button>`).join('')}</div>
      <p class="set-note">The sky, vine and seasonal flights follow the vineyard calendar of your hemisphere.</p>
      <p class="set-label mono">SOUND</p>
      <div class="seg">${[true, false].map(v => `<button class="${S.settings.sound === v ? 'on' : ''}" data-act="sound" data-v="${v}">${v ? 'Clinks on' : 'Silent'}</button>`).join('')}</div>
      <p class="set-label mono">PROGRESS</p>
      <button class="link-btn danger" data-act="reset">Pour it all away (reset)</button>
    </div></div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
  }

  /* ---------- events ---------- */
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    const q = P && P.f.questions[P.i];
    switch (act) {
      case 'flight': { const h = '#flight/' + b.dataset.id; if (location.hash === h) { window.scrollTo(0, 0); startFlight(b.dataset.id); } else location.hash = h; break; }
      case 'cellar': location.hash = '#cellar'; break;
      case 'home': location.hash = ''; break;
      case 'quit': if (P && P.i > 0 && !confirm('Leave this flight? Progress in this flight will be lost.')) return; location.hash = ''; break;
      case 'choose': {
        if (P.locked) return;
        const i = +b.dataset.i, ok = i === q.answer;
        app.querySelectorAll('.opt').forEach(o => { if (+o.dataset.i === q.answer) o.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        answer(ok, ok ? '' : `Answer: ${q.options[q.answer]}`);
        break;
      }
      case 'guess': {
        if (P.locked) return;
        const i = +b.dataset.i, ok = i === q.answer;
        app.querySelectorAll('.opt').forEach(o => { if (+o.dataset.i === q.answer) o.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        app.querySelectorAll('.clue').forEach((li, n) => { li.classList.add('shown'); li.querySelector('p').textContent = q.clues[n].text; });
        answer(ok, ok ? '' : `It was ${q.options[q.answer]}.`);
        break;
      }
      case 'reveal': revealClue(q); break;
      case 'term': {
        if (P.locked) return;
        const ok = b.dataset.k === q.answer;
        app.querySelectorAll('.term').forEach(t => { if (t.dataset.k === q.answer) t.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        answer(ok, ok ? '' : `It was "${app.querySelector(`.term[data-k="${q.answer}"]`).textContent}".`);
        break;
      }
      case 'slot': if (!P.locked && !P.seq.includes(b.dataset.t)) { P.seq.push(b.dataset.t); buzz(6); refreshOrder(); } break;
      case 'unslot': if (!P.locked && P.seq[+b.dataset.i]) { P.seq.splice(+b.dataset.i, 1); refreshOrder(); } break;
      case 'next': next(); break;
      case 'bottle': openBottle(b.dataset.id); break;
      case 'peek': {
        const card = overlay.querySelector('.modal-card');
        card.querySelector('.review-a').hidden = false;
        const st = bottleState(S.cellar[card.querySelector('.judge [data-id]').dataset.id]);
        b.remove();
        if (st !== 'resting') card.querySelector('.judge').hidden = false;
        break;
      }
      case 'remembered': judge(b.dataset.id, true); break;
      case 'forgot': judge(b.dataset.id, false); break;
      case 'close': closeModal(); break;
      case 'settings': settings(); break;
      case 'hemi': S.settings.hemi = b.dataset.h; save(); settings(); home(); break;
      case 'sound': S.settings.sound = b.dataset.v === 'true'; save(); settings(); if (S.settings.sound) clink(); break;
      case 'reset': if (confirm('Reset all progress? Your cellar will be emptied.')) { S = defaults(); save(); overlay.innerHTML = ''; home(); } break;
    }
  });

  function route() {
    overlay.innerHTML = '';
    const h = location.hash;
    window.scrollTo(0, 0);
    if (h.startsWith('#flight/')) startFlight(h.slice(8));
    else if (h === '#cellar') cellar();
    else { P = null; home(); }
  }
  window.addEventListener('hashchange', route);
  route();

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
