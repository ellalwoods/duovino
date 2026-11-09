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
  const defaults = () => ({ days: {}, units: {}, cellar: {}, settings: { hemi: 'N', sound: true } });
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
  const setWine = c => document.documentElement.style.setProperty('--wine', c);

  /* ---------- syllabus ---------- */
  // Track A: the soil chapters, strictly in order. Track B: the wine list; B0 first, then each region in order.
  const UNITS = [];
  const add = (u, extra) => { const r = { u, n: UNITS.length, ...extra }; UNITS.push(r); return r; };
  let prevA = null;
  D.chapters.forEach((ch, ci) => ch.units.forEach((u, ui) => {
    prevA = add(u, { track: 'A', ch, ci, ui, tag: `${ci + 1}.${ui + 1}`, wine: ch.wine, group: `Chapter ${ci + 1} · ${D.strata[ci].name}`, prev: prevA });
  }));
  // Track B: Part 1 read a label (B0, after Topsoil) → Part 2 meet the grapes (the big international grapes first)
  // → Part 3 travel the regions. Other grape groups and every region open once the written big-grape lessons are done.
  const TB = D.trackB;
  const TOPSOIL = UNITS.filter(r => r.track === 'A' && r.ci === 0);
  const CORE_REQ = [];
  let gate = null;
  TB.intro.units.forEach((u, i) => { gate = add(u, { track: 'B', part: 1, tag: `B0.${i + 1}`, wine: TB.wine, group: 'Read a label', prev: gate, req: i ? null : TOPSOIL }); CORE_REQ.push(gate); });
  let gn = 0;
  TB.grapeGroups.forEach(g => {
    let p = g.core ? gate : null;
    g.units.forEach((u, ui) => {
      const r = add(u, { track: 'B', part: 2, tag: `B1.${++gn}`, wine: TB.wine, group: `Grapes · ${g.name}`, grapeGroup: g, prev: p, req: !g.core && ui === 0 ? CORE_REQ : null });
      if (g.core) CORE_REQ.push(r);
      p = r;
    });
  });
  let rn = 0;
  TB.continents.forEach(ct => ct.countries.forEach(c => c.regions.forEach(rg => {
    let p = null;
    rg.units.forEach((u, ui) => { p = add(u, { track: 'B', part: 3, tag: `B2.${++rn}`, wine: c.wine, group: c.name === rg.name ? c.name : `${c.name} · ${rg.name}`, continent: ct, country: c, region: rg, prev: p, req: ui === 0 ? CORE_REQ : null }); });
  })));
  const UNIT = Object.fromEntries(UNITS.map(r => [r.u.id, r]));
  // Draft units (rules not yet checked against official regulations) are only playable with ?drafts
  const DRAFTS = /[?&]drafts\b/.test(location.search) || !!S.settings.drafts;
  const playable = r => !!(r.u.questions && r.u.questions.length) && (!r.u.draft || DRAFTS);
  const done = r => !!S.units[r.u.id];
  // Gates open once and stay open, so adding new lessons never re-locks what you'd already opened.
  // Earlier versions opened Track B after Roots 1.1–1.3, and the regions after B0 + Chardonnay, Sauvignon, Riesling.
  TOPSOIL.key = 'topsoil'; CORE_REQ.key = 'core';
  const GATE_HISTORY = { topsoil: ['1-1', '1-2', '1-3'], core: ['b0-1', 'b0-2', 'b0-3', 'b-g-chardonnay', 'b-g-sauvignon', 'b-g-riesling'] };
  S.gates ||= {};
  Object.entries(GATE_HISTORY).forEach(([k, ids]) => { if (!S.gates[k] && ids.every(id => S.units[id])) S.gates[k] = true; });
  const reqMet = r => {
    if (!r.req) return true;
    const k = r.req.key;
    if (k && (S.gates ||= {})[k]) return true;
    const ok = r.req.every(x => !playable(x) || done(x));
    if (ok && k) { S.gates[k] = true; save(); }
    return ok;
  };
  // An unwritten draft never blocks what follows it: look past it to the unit before.
  const prevOk = p => !p || done(p) || (p.u.draft && !playable(p) && prevOk(p.prev));
  const unlocked = r => (DRAFTS && r.u.draft) || (prevOk(r.prev) && reqMet(r));
  const reqText = () => { const w = TOPSOIL.filter(playable); return `Topsoil (${w[0].tag}–${w[w.length - 1].tag})`; };
  const unitState = r => done(r) ? 'done' : !playable(r) ? 'soon' : unlocked(r) ? 'current' : 'locked';
  const nextUnit = (track = 'A') => { const left = UNITS.filter(r => r.track === track && !done(r)); return left.find(r => unitState(r) === 'current') || left[0]; };
  const doneCount = (track = 'A') => UNITS.filter(r => r.track === track && done(r)).length;
  const trackCount = track => UNITS.filter(r => r.track === track).length;
  const label = r => r.tag;
  const minutes = u => Math.max(3, Math.round((u.lesson || []).length * 0.4 + u.questions.length * 0.5));
  const draftBanner = () => P && P.r && P.r.u.draft ? '<p class="draft-banner mono">Draft · rules not yet checked against the official regulations</p>' : '';

  // ?demo seeds a lived-in vineyard so you can see progress and the ageing mechanic straight away
  if (/[?&]demo\b/.test(location.search) && !S.demoSeeded) {
    const now = Date.now();
    for (let i = 1; i <= 9; i++) if (i !== 3 && i !== 6) S.days[key(new Date(now - i * DAY))] = 1;
    S.units = { '1-1': { best: 83, plays: 1 }, '1-2': { best: 71, plays: 2 } };
    ['chablis', 'sancerre', 'chardonnay', 'champagneBdB', 'prosecco', 'marlboroughsb', 'moselriesling', 'cava'].forEach((id, n) => {
      const stage = n % 6;
      let due = now + INTERVALS[stage] * DAY;
      if (n % 3 === 1) due = now - DAY;
      if (n === 5) due = now - 30 * DAY;
      S.cellar[id] = { stage, born: now - (20 + n * 5) * DAY, due, reviews: stage };
    });
    S.demoSeeded = true; save();
  }
  // The cellar holds real wines only: drop anything else left from older versions.
  Object.keys(S.cellar).forEach(id => { if (!D.wines[id]) delete S.cellar[id]; });
  delete S.flights; delete S.tests;

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
  // Soft interface sounds: a low wooden "tock" for switching tabs, a light glassy "tick" for buttons.
  function tap(kind = 'btn') {
    if (!S.settings.sound) return;
    try {
      const a = audio(), t = a.currentTime, o = a.createOscillator(), g = a.createGain();
      if (kind === 'tab') { o.type = 'sine'; o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(260, t + 0.08); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12); }
      else { o.type = 'sine'; o.frequency.setValueAtTime(1650, t); o.frequency.exponentialRampToValueAtTime(1250, t + 0.05); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09); }
      o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.14);
    } catch { /* no audio */ }
  }
  const buzz = ms => navigator.vibrate && navigator.vibrate(ms);

  /* ---------- seasons & week ---------- */
  const season = () => {
    let m = new Date().getMonth();
    if (S.settings.hemi === 'S') m = (m + 6) % 12;
    return D.seasons[m];
  };
  const week = () => {
    const d = new Date(), dow = (d.getDay() + 6) % 7, out = [];
    for (let i = 0; i < 7; i++) { const x = new Date(d); x.setDate(d.getDate() - dow + i); out.push({ k: key(x), l: 'MTWTFSS'[i], future: i > dow, today: i === dow }); }
    return out;
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
    const c = D.wines[id], st = e ? bottleState(e) : 'resting', stage = e ? e.stage : 0, n = ++bid;
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

  const wineCat = w => w.shape === 'champagne' ? 'Sparkling' : w.style === 'red' ? 'Red' : w.wine === D.C.pink || w.wine === D.C.salmon ? 'Rosé' : w.style === 'sweet' ? 'Sweet' : 'White';
  const LV = ['', 'Low', 'Medium−', 'Medium', 'Medium+', 'High'], SW = ['', 'Dry', 'Off-dry', 'Medium', 'Sweet', 'Luscious'];
  // A meter: empty = none (Dry / Low), full = High. A range [a, b] fills solid to a, lighter to b. m = the taster's mark.
  const meterPct = x => (x - 1) / 4 * 100;
  function meter(a, b, m) {
    return `<span class="meter"><i class="m-solid" style="width:${meterPct(a)}%"></i>${b > a ? `<i class="m-range" style="left:${meterPct(a)}%;width:${meterPct(b) - meterPct(a)}%"></i>` : ''}${m ? `<em style="left:${meterPct(m)}%"></em>` : ''}</span>`;
  }
  function profileHTML(w) {
    const rows = [['Sweetness', 'sweetness', SW], ['Acidity', 'acidity', LV], ['Tannin', 'tannin', LV], ['Body', 'body', LV], ['Alcohol', 'alcohol', LV]];
    return `<div class="profile">
      <dl class="facts compact"><div><dt class="mono">Grapes</dt><dd>${w.grapes}</dd></div><div><dt class="mono">From</dt><dd>${w.origin}</dd></div></dl>
      <div class="bars">${rows.filter(([, k]) => w.profile[k] != null).map(([n, k, L]) => {
        const v = w.profile[k], [a, b] = Array.isArray(v) ? v : [v, v];
        return `<div class="bar-row"><span class="mono">${n}</span>${meter(a, b)}<span class="lv">${a === b ? L[a] : L[a] + ' to ' + L[b]}</span></div>`;
      }).join('')}</div>
      <p class="mono notes-h">Aromas & flavours</p>
      <div class="chips">${w.notes.map(n => `<span>${n}</span>`).join('')}</div>
      <p class="ages"><span class="mono">With time</span>${w.ages}</p>
    </div>`;
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

  /* ---------- tabs: icons only ---------- */
  const TAB_ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    learn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 9V3.5M12 5.5c-1.8-2-4.2-1.8-5-1 1 .9 3 1.4 5 1M12 5.5c1.8-2 4.2-1.8 5-1-1 .9-3 1.4-5 1"/><path d="M3 9h18"/><path d="M12 9c0 4-1 6-3.5 8.5M12 9c0 4 1.2 6.5 3.8 9M12 12.5c-1.6.4-3.5.1-5.5-1.2M12 14c2 0 3.6-.8 5.5-2.3"/></svg>',
    glass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 2.5h10c.4 5.5-1.2 9-5 9.3-3.8-.3-5.4-3.8-5-9.3z"/><path d="M7.4 6.5c2.2-.7 3.6.6 5.2 0 1.4-.5 2.6-.3 3.9.2" /><path d="M12 11.8V20M8.5 21h7"/></svg>',
    cellar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M10.2 2.5h3.6v4.8c0 1.6 2.7 2.4 2.7 5.2v8.2c0 .5-.4.8-.8.8H8.3c-.4 0-.8-.3-.8-.8v-8.2c0-2.8 2.7-3.6 2.7-5.2z"/><path d="M7.5 13.5h9v4.5h-9z"/></svg>',
    journey: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>',
  };
  const TAB_NAMES = { home: 'Home', learn: 'Learn', glass: "Today's glass", cellar: 'Cellar', journey: 'Journey' };
  function tabbar(active) {
    const href = { home: '#home', learn: '#' + (S.learnView || 'roots'), glass: '#glass', cellar: '#cellar', journey: '#journey' };
    const glassDot = glassStatus() === 'ready';
    return `<nav class="tabbar" aria-label="Main">${Object.keys(TAB_ICONS).map(id =>
      `<a href="${href[id]}" class="tab tab-${id} ${active === id ? 'on' : ''}" aria-label="${TAB_NAMES[id]}" ${active === id ? 'aria-current="page"' : ''}>${TAB_ICONS[id]}${id === 'glass' && glassDot ? '<i class="tab-dot"></i>' : ''}</a>`).join('')}</nav>`;
  }

  /* ---------- HOME: one scene, one action ---------- */
  function continueUnit() {
    for (const t of (S.lastTrack === 'B' ? ['B', 'A'] : ['A', 'B'])) { const r = nextUnit(t); if (r && unitState(r) === 'current') return r; }
    return null;
  }
  const goRing = pct => `<svg class="go-ring" viewBox="0 0 168 168" aria-hidden="true"><g filter="url(#stain)">
      <circle cx="84" cy="84" r="74" fill="none" stroke="#fffaf1" stroke-width="9" opacity=".3"/>
      ${pct > 0 ? `<circle cx="84" cy="84" r="74" fill="none" stroke="#fffaf1" stroke-width="8" opacity=".8" pathLength="100" stroke-dasharray="${pct} 100" transform="rotate(-80 84 84)" stroke-linecap="round"/>
      <circle cx="84" cy="84" r="78.5" fill="none" stroke="#fffaf1" stroke-width="1.6" opacity=".95" pathLength="100" stroke-dasharray="${pct} 100" transform="rotate(-80 84 84)"/>` : ''}
    </g></svg>`;
  const postcardUnlocked = id => {
    const p = D.scenes.POSTCARDS.find(x => x.id === id);
    if (!p) return false;
    const rs = UNITS.filter(r => r.region && r.region.name === p.region && playable(r));
    return rs.length > 0 && rs.every(done);
  };
  function home() {
    const se = season(), time = D.scenes.timeOfDay();
    const pc = S.settings.view && S.settings.view !== 'sky' && postcardUnlocked(S.settings.view) ? S.settings.view : null;
    const r = continueUnit();
    const sib = r ? UNITS.filter(x => x.group === r.group) : [];
    const pct = sib.length ? Math.round(sib.filter(done).length / sib.length * 100) : 0;
    const gl = glassStatus();
    setWine('#a8434e');
    app.innerHTML = `<div class="tabview home">
      <div class="home-scene">${pc ? D.scenes.postcard(pc) : D.scenes.sky(se.stage, time)}${pc ? `<i class="pc-tint t-${time}"></i>` : ''}</div>
      <header class="home-top">
        <span class="wordmark"><img class="logo" src="icon.svg" alt=""><span>Duo<em>vino</em></span></span>
        <button class="icon-btn" data-act="settings" aria-label="Settings">${gearIcon()}</button>
      </header>
      <p class="home-sub">${pc ? D.scenes.POSTCARDS.find(x => x.id === pc).name : `${new Date().toLocaleDateString('en-GB', { month: 'long' })} · ${se.name.toLowerCase()}`}</p>
      ${r ? `<button class="go" data-act="go" data-h="#unit-${r.u.id}">${goRing(pct)}<span class="go-disc"></span>
          <span class="go-t"><small>Continue</small><b>${r.u.title}</b><small>${r.track === 'A' ? 'Roots' : 'Grapes & places'}</small></span></button>`
        : `<button class="go" data-act="go" data-h="#${S.learnView || 'roots'}">${goRing(0)}<span class="go-disc"></span><span class="go-t"><small>More soon</small><b>Explore</b></span></button>`}
      ${gl === 'ready' ? `<button class="home-chip" data-act="go" data-h="#glass">${TAB_ICONS.glass}<span>Today's glass</span></button>` : ''}
    </div>${tabbar('home')}`;
  }

  /* Swirl detection: measures how much the finger's direction of travel turns, so small circles
     anywhere on the glass count (a full circle = 2π of turning), whatever the size or position. */
  function trackSwirl(el, onTurn, onEnd) {
    let prev = null, heading = null, start = null;
    el.addEventListener('pointerdown', e => {
      try { el.setPointerCapture(e.pointerId); } catch (_) { /* fine without capture */ }
      prev = start = { x: e.clientX, y: e.clientY }; heading = null; el.classList.add('swirling'); e.preventDefault();
    });
    el.addEventListener('pointermove', e => {
      if (!prev) return;
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      if (Math.hypot(dx, dy) < 4) return;
      const h = Math.atan2(dy, dx); prev = { x: e.clientX, y: e.clientY };
      if (heading !== null) {
        let d = h - heading; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
        if (Math.abs(d) < 1.3) onTurn(d, e.clientX - start.x, e.clientY - start.y); // ignore sharp reversals: only smooth turning counts
      }
      heading = h;
    });
    const end = () => { prev = null; heading = null; el.classList.remove('swirling'); onEnd && onEnd(); };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  }

  /* ---------- TODAY'S GLASS: one wine a day, tasted from memory ---------- */
  function glassToday() {
    const k = todayKey();
    if (!S.glass || S.glass.day !== k || (S.glass.wine && !S.cellar[S.glass.wine]) || (!S.glass.wine && Object.keys(S.cellar).length)) {
      const es = Object.entries(S.cellar).filter(([id]) => D.wines[id]).sort((a, b) => a[1].due - b[1].due);
      S.glass = { day: k, wine: es.length ? es[0][0] : null, done: false };
      save();
    }
    return S.glass;
  }
  function glassStatus() { const g = glassToday(); return !g.wine ? 'empty' : g.done ? 'done' : 'ready'; }
  /* Glass shapes: the right glass for each style. Bowl paths share one 390×520 frame (stem centre x = 195). */
  const GLASSES = {
    bordeaux: { bowl: 'M128 40C114 180 142 272 195 282C248 272 276 180 262 40', stem: 282, wine: 190 },
    burgundy: { bowl: 'M152 52C86 122 96 268 195 288C294 268 304 122 238 52', stem: 288, wine: 206 },
    white:    { bowl: 'M146 92C136 192 158 262 195 270C232 262 254 192 244 92', stem: 270, wine: 202 },
    flute:    { bowl: 'M170 34C163 150 173 292 195 302C217 292 227 150 220 34', stem: 302, wine: 96 },
    copita:   { bowl: 'M174 150C150 220 158 292 195 296C232 292 240 220 216 150', stem: 296, wine: 240 },
    dessert:  { bowl: 'M158 172C152 250 168 300 195 304C222 300 238 250 232 172', stem: 304, wine: 238 },
  };
  const BURGUNDY_STYLE = /pinot noir|pinot nero|spätburgunder|nebbiolo|gamay|nerello|mencía|barolo|beaujolais/i;
  function glassKind(w) {
    if (!w) return 'bordeaux';
    const id = Object.keys(D.wines).find(k => D.wines[k] === w);
    if (w.shape === 'champagne' || id === 'brazilsparkling') return 'flute';
    if (id === 'fino' || id === 'oloroso') return 'copita';
    if (['port', 'tawny', 'vintageport', 'banyuls', 'malmsey', 'sercial'].includes(id) || (w.style === 'sweet' && id !== 'muscat')) return 'dessert';
    if (w.style === 'red') return BURGUNDY_STYLE.test(w.grapes + ' ' + w.name) ? 'burgundy' : 'bordeaux';
    return 'white';
  }
  let glassUid = 0;
  function glassArt(colour, fill, kind, big) {
    const G = GLASSES[kind] || GLASSES.bordeaux, id = 'gl' + (++glassUid), wy = G.wine;
    const x0 = +G.bowl.match(/^M(\d+)/)[1], top = +G.bowl.match(/^M\d+ (\d+)/)[1];
    const wine = `M90 ${wy} C150 ${wy - 16} 200 ${wy + 14} 240 ${wy - 4} C262 ${wy - 12} 282 ${wy - 8} 300 ${wy - 10} V330 H90Z`;
    const bubbles = kind === 'flute' ? [[186, 260, 3], [200, 225, 2.5], [192, 185, 2], [204, 150, 2.4], [188, 120, 1.8]].map(([x, y, r]) => `<circle class="bubble" cx="${x}" cy="${y}" r="${r}" fill="#fffaf2" opacity=".75"/>`).join('') : '';
    const legs = big && kind !== 'flute' ? [x0 + 22, x0 + 40, 390 - x0 - 40, 390 - x0 - 22].map((x, i) => `<path d="M${x} ${top + 30} q2 ${Math.max(20, wy - top - 60) * .6} -1 ${Math.max(24, wy - top - 40)}" stroke="${mix(colour, '#ffffff', .5)}" stroke-width="2" fill="none" opacity=".75"/>`).join('') : '';
    return `<defs><clipPath id="${id}"><path d="${G.bowl}Z"/></clipPath>
        <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(colour, '#ffffff', .35)}"/><stop offset="1" stop-color="${colour}"/></linearGradient></defs>
      <path d="${G.bowl}Z" fill="#fffaf2" opacity=".55"/>
      <g clip-path="url(#${id})">${fill ? `<path class="bg-wine" d="${wine}" fill="url(#${id}w)" style="transform-origin: 195px ${wy + 40}px"/>${bubbles}${legs}` : ''}</g>
      <path d="${G.bowl}" fill="none" stroke="#3a2a2a" stroke-width="${big ? 2 : 9}" opacity=".5"/>
      ${big ? `<path d="M${x0 + 10} ${top + 22}C${x0 + 4} ${top + 100} ${x0 + 14} ${G.stem - 60} ${x0 + 40} ${G.stem - 24}" fill="none" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/>` : ''}
      <path d="M195 ${G.stem}V440M150 452Q195 438 240 452" fill="none" stroke="#3a2a2a" stroke-width="${big ? 2 : 9}" opacity=".5" stroke-linecap="round"/>`;
  }
  function miniGlass(colour, kind) {
    return `<svg viewBox="90 20 210 450" aria-hidden="true">${glassArt(colour, true, kind, false)}</svg>`;
  }
  function bigGlass(colour, fill, stained, kind) {
    return `<svg class="big-glass" viewBox="0 0 390 520" aria-hidden="true">
      <g filter="url(#stain)" class="glass-stain ${stained ? 'on' : ''}"><ellipse cx="195" cy="462" rx="96" ry="22" fill="none" stroke="${colour}" stroke-width="5" opacity=".5"/><ellipse cx="199" cy="460" rx="100" ry="24" fill="none" stroke="${colour}" stroke-width="1.4" opacity=".7"/></g>
      <g class="glass-body">${glassArt(colour, fill, kind, true)}</g>
    </svg>`;
  }
  /* The tasting: swirl → name → structure sliders → pick the aromas → compare with the real profile */
  const TASTE_DIMS = [['sweetness', 'Sweetness', SW], ['acidity', 'Acidity', LV], ['tannin', 'Tannin', LV], ['body', 'Body', LV], ['alcohol', 'Alcohol', LV]];
  // Notes that describe structure or appearance, not aroma, are left out of the aroma game
  const NOT_AROMA = /(bone dry|still dry|^dry$|colour|tannin|acidity|texture|fizz|spritz|^warmth$|^delicate$|^velvety$|freshness|no new oak|sun-dried grapes|never harshly|bitter finish)/i;
  const AROMA_FAMILIES = {
    fresh: ['lemon', 'lime', 'grapefruit', 'citrus', 'orange peel', 'yuzu', 'apple', 'quince', 'pear', 'gooseberry'],
    stone: ['peach', 'apricot', 'stone fruit', 'nectarine'],
    tropical: ['pineapple', 'mango', 'passion fruit', 'melon', 'lychee', 'banana'],
    red: ['red cherry', 'raspberry', 'strawberry', 'sour cherry', 'red fruit', 'red berries', 'cherry', 'red apple'],
    black: ['blackberry', 'blackcurrant', 'plum', 'black cherry', 'black fruit', 'dark cherry', 'dark fruit', 'cassis'],
    herbal: ['grass', 'herbs', 'green pepper', 'leafy', 'fennel', 'tomato leaf', 'thyme', 'mint', 'garrigue', 'herbal', 'green bean', 'jalapeño', 'maquis', 'tea', 'esteva'],
    spice: ['spice', 'pepper', 'ginger', 'clove', 'liquorice', 'curry'],
    oak: ['vanilla', 'toast', 'coconut', 'mocha', 'cedar', 'butter', 'brioche', 'bread', 'pencil', 'coffee', 'chocolate', 'tobacco'],
    sweet: ['honey', 'marmalade', 'dried fruit', 'raisin', 'fig', 'caramel', 'toffee', 'grapey', 'grapes', 'dried cherry', 'jam'],
    nut: ['almond', 'hazelnut', 'walnut'],
    earth: ['earth', 'mushroom', 'forest floor', 'leather', 'truffle', 'tar', 'game', 'smoked meat', 'olive', 'petrol'],
    floral: ['flower', 'violet', 'rose', 'blossom', 'elderflower', 'chamomile', 'bergamot'],
    mineral: ['flint', 'stone', 'slate', 'chalk', 'mineral', 'smoke', 'salt', 'sea spray', 'saline'],
  };
  const cleanNote = n => n.replace(/\s*\(.*?\)\s*/g, '').trim();
  const familiesOf = n => { const t = n.toLowerCase(); return Object.keys(AROMA_FAMILIES).filter(f => AROMA_FAMILIES[f].some(k => t.includes(k))); };
  const midOf = v => v == null ? null : Array.isArray(v) ? (v[0] + v[1]) / 2 : v;
  function aromaOptions(id) {
    const w = D.wines[id];
    const truths = w.notes.map(cleanNote).filter(n => n && !NOT_AROMA.test(n)).slice(0, 4);
    const fams = new Set(truths.flatMap(familiesOf));
    const seen = new Set(truths.map(t => t.toLowerCase()));
    // Confusables: aromas from the most similar wines (same colour, closest structure) that this wine doesn't have
    const dist = o => TASTE_DIMS.reduce((sum, [k]) => sum + Math.abs((midOf(o.profile[k]) ?? 0) - (midOf(w.profile[k]) ?? 0)), 0);
    // ...but never from a wine made from the same grape (its aromas could well be right for this one too)
    const STOP = new Set(['with', 'and', 'others', 'other', 'blend', 'blends', 'mostly', 'often', 'based', 'black', 'white', 'grapes', 'some', 'least', 'from', 'local', 'douro', 'only', 'mainly', 'whites', 'reds', 'dried', 'led', 'or']);
    const toks = g => new Set((g.toLowerCase().match(/[a-zà-ÿ]{4,}/g) || []).filter(t => !STOP.has(t)));
    const mine = toks(w.grapes), kin = o => [...toks(o.grapes)].some(t => mine.has(t));
    const pool = Object.entries(D.wines).filter(([oid, o]) => oid !== id && !kin(o));
    const near = pool.filter(([, o]) => wineCat(o) === wineCat(w)).sort((a, b) => dist(a[1]) - dist(b[1]));
    const far = pool.filter(([, o]) => wineCat(o) !== wineCat(w));
    const decoys = [], used = new Set();
    for (const [, o] of [...near, ...shuffle(far)]) {
      for (const n of shuffle(o.notes.map(cleanNote))) {
        const key = n.toLowerCase();
        if (!n || NOT_AROMA.test(n) || seen.has(key) || n.length > 22) continue;
        const f = familiesOf(n);
        if (!f.length || f.some(x => fams.has(x) || used.has(x))) continue; // never a near-synonym of a right answer, and varied
        seen.add(key); f.forEach(x => used.add(x)); decoys.push(n); break;
      }
      if (decoys.length >= Math.max(4, truths.length + 1)) break;
    }
    return { truths, options: shuffle([...truths, ...decoys]) };
  }
  let GT = null; // today's tasting in progress
  function glassPage(phase = 'swirl') {
    const g = glassToday(), w = g.wine && D.wines[g.wine];
    setWine(w ? w.wine : '#a8434e');
    if (w && (!GT || GT.id !== g.wine || GT.day !== g.day)) {
      const ao = aromaOptions(g.wine);
      GT = { id: g.wine, day: g.day, marks: {}, picks: new Set(), ...ao };
    }
    const dims = w ? TASTE_DIMS.filter(([k]) => w.profile[k] != null) : [];
    let body;
    const gk = glassKind(w);
    if (!w) body = `${bigGlass('#e2d6b8', false, false, 'bordeaux')}<p class="glass-line">Your first glass arrives with your first wine.</p>
      <button class="primary narrow" data-act="go" data-h="#list">Find a wine</button>`;
    else if (g.done) body = `${bigGlass(w.wine, false, true, gk)}<p class="glass-name">${w.name}</p><p class="glass-line">${g.ok ? 'Tasted. Lovely.' : 'Tasted. It\'ll come round again soon.'}</p><p class="glass-small mono">Next glass tomorrow</p>`;
    else if (phase === 'swirl') body = `<div class="glass-wrap big" data-glass>${bigGlass(w.wine, true, false, gk)}<svg class="swirl-ring" viewBox="0 0 100 100" style="top:${((GLASSES[gk].bowl.match(/^M\d+ (\d+)/)[1] * 1 + GLASSES[gk].stem) / 2 - 144) / 520 * 100}%"><circle cx="50" cy="50" r="47" pathLength="100" stroke-dasharray="0 100"/></svg></div>
      <p class="glass-small mono">Swirl the glass with your finger ↻</p><button class="link-btn" data-act="glass-open">or tap here</button>`;
    else if (phase === 'name') body = `${bigGlass(w.wine, true, false, gk)}<p class="glass-name">${w.name}</p><p class="glass-line">Taste it in your mind.</p>
      <button class="primary narrow" data-act="glass-pour">Start tasting</button>`;
    else if (['taste', 'notes', 'reveal'].includes(phase)) {
      const step = { taste: 1, notes: 2, reveal: 3 }[phase];
      const head = `<header class="gs-head"><span class="gs-glass">${miniGlass(w.wine, gk)}</span>
        <div><h1 class="gs-name">${w.name}</h1><p class="gs-sub">${w.grapes.replace(/\s*\(.*?\)/g, '')} · ${w.origin.split(' · ')[0]}</p></div></header>
        <ol class="gs-steps">${['Structure', 'Aromas', 'Result'].map((t, i) => `<li class="${i + 1 < step ? 'past' : i + 1 === step ? 'now' : ''}">${t}</li>`).join('')}</ol>`;
      let inner, action;
      if (phase === 'taste') {
        inner = `<p class="gs-ask">How does it taste? Drag each slider.</p>
          <div class="taste">${dims.map(([k, n, L]) => { const v = GT.marks[k] || 3; return `<div class="taste-row"><div class="taste-head"><span class="mono">${n}</span><b class="taste-lv" data-lv="${k}">${L[v]}</b></div>
            <input type="range" class="range trange" min="1" max="5" step="1" value="${v}" data-k="${k}" aria-label="${n}"><div class="taste-ends mono"><span>${L[1]}</span><span>${L[5]}</span></div></div>`; }).join('')}</div>`;
        action = `<button class="primary" data-act="glass-notes">Next: aromas</button>`;
      } else if (phase === 'notes') {
        inner = `<p class="gs-ask">Which aromas would you expect? Pick ${GT.truths.length}.</p>
          <div class="aroma-picks">${GT.options.map(n => `<button class="aroma ${GT.picks.has(n) ? 'on' : ''}" data-act="gnote" data-n="${esc(n)}">${n}</button>`).join('')}</div>`;
        action = `<button class="primary" data-act="glass-check" ${GT.picks.size ? '' : 'disabled'}>Check</button>`;
      } else {
        // Compare: structure (in range = 1, one step off = ½) and aromas (hits minus wrong picks)
        const rows = dims.map(([k, n, L]) => {
          const v = w.profile[k], [lo, hi] = Array.isArray(v) ? v : [v, v], m = GT.marks[k] || 3;
          const off = m < lo ? lo - m : m > hi ? m - hi : 0, pts = off === 0 ? 1 : off === 1 ? .5 : 0;
          return { pts, html: `<div class="bar-row cmp-row ${off === 0 ? 'ok' : off === 1 ? 'near' : 'off'}"><span class="mono">${n}</span>${meter(lo, hi, m)}
            <span class="lv">${lo === hi ? L[lo] : L[lo] + ' to ' + L[hi]}</span><span class="cmp-mark">${off === 0 ? '✓' : off === 1 ? '≈' : '✗'}</span></div>` };
        });
        const hits = GT.truths.filter(t => GT.picks.has(t)).length, wrong = [...GT.picks].filter(p => !GT.truths.includes(p)).length;
        const struct = rows.reduce((t, r) => t + r.pts, 0) / rows.length, aroma = Math.max(0, hits - wrong) / GT.truths.length;
        const ok = struct * .5 + aroma * .5 >= .6;
        inner = `<section class="gs-card"><h2 class="gs-h">Structure <span>${rows.filter(r => r.pts === 1).length}/${rows.length}</span></h2>
            <div class="bars cmp">${rows.map(r => r.html).join('')}</div>
            <p class="gs-key"><i class="k-fill"></i>the wine<i class="k-dot"></i>your mark</p></section>
          <section class="gs-card"><h2 class="gs-h">Aromas <span>${hits}/${GT.truths.length}</span></h2>
            <div class="aroma-picks result">${GT.options.map(n => { const t = GT.truths.includes(n), p = GT.picks.has(n);
              return `<span class="aroma ${t && p ? 'hit' : t ? 'miss' : p ? 'wrong' : 'idle'}">${n}</span>`; }).join('')}</div>
            <p class="gs-key"><i class="k-hit"></i>right<i class="k-miss"></i>missed<i class="k-wrong"></i>not in its profile</p></section>
          <div class="gs-act"><button class="primary" data-act="glass-judge" data-ok="${ok ? 1 : 0}">${ok ? 'Lovely. Done' : 'Done. It\'ll come round again'}</button></div>
          <section class="gs-card gs-after"><h2 class="gs-h">With time</h2><p class="gs-text">${w.ages}</p></section>`;
        action = '';
      }
      body = `<div class="glass-sheet" style="--fw:${w.wine}">${head}<div class="gs-body">${inner}</div>${action ? `<div class="gs-act">${action}</div>` : ''}</div>`;
    }
    app.innerHTML = `<div class="tabview glass-page ${['taste', 'notes', 'reveal'].includes(phase) && w && !g.done ? 'noted' : ''}" style="--fw:${w ? w.wine : '#a8434e'}">${body}</div>${tabbar('glass')}`;
    const wrap = app.querySelector('[data-glass]');
    if (wrap) {
      const ringC = wrap.querySelector('.swirl-ring circle'), wine = wrap.querySelector('.bg-wine'), body = wrap.querySelector('.glass-body'), NEED = Math.PI * 2 * 1.5;
      // The glass orbits on a small circle (flattened, like a glass swirled on a table), in the
      // direction you swirl. The circle grows with momentum; let go and it slows to a stop.
      const R = 22, FLAT = .42;
      let acc = 0, done = false, theta = -Math.PI / 2, r = 0, spin = 0, held = false, touched = false, last = performance.now();
      const draw = () => {
        const x = r * Math.cos(theta), y = r * Math.sin(theta) * FLAT;
        body.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${(x * .12).toFixed(2)}deg)`;
        // the wine is thrown outwards: it leans the way the glass is heading, a little behind it
        if (wine) wine.style.transform = `rotate(${(-Math.sin(theta - .6) * r * .55).toFixed(2)}deg)`;
      };
      const frame = now => {
        if (!body.isConnected) return;
        const dt = Math.min(50, now - last); last = now;
        if (!touched) { theta -= dt * .004; r = 9 + 3 * Math.sin(now / 900); }          // idle: a gentle hint circle
        else if (!held) { theta += spin * dt; spin *= .94; r *= .955; }                  // released: coast and settle
        draw(); requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      trackSwirl(wrap, d => {
        if (done) return;
        if (!touched) { touched = true; r = 0; }
        held = true; acc += Math.abs(d);
        theta += d * 1.15; spin = d * 1.15 / 16;                                          // follow your direction
        r = Math.min(R, r + Math.abs(d) * 9);
        ringC.setAttribute('stroke-dasharray', `${Math.min(100, acc / NEED * 100)} 100`);
        if (acc >= NEED) { done = true; held = false; clink(); buzz(12); setTimeout(() => glassPage('name'), 650); }
      }, () => { held = false; });
    }
    app.querySelectorAll('.trange').forEach(r => {
      const upd = () => { const k = r.dataset.k, v = +r.value; GT.marks[k] = v; app.querySelector(`[data-lv="${k}"]`).textContent = TASTE_DIMS.find(x => x[0] === k)[2][v]; };
      r.addEventListener('input', upd); r.addEventListener('change', () => { upd(); buzz(4); });
    });
  }

  /* ---------- JOURNEY: the stain map, a few stains of numbers, and postcards ---------- */
  function journey() {
    const view = S.mapView || 'europe';
    const nextB = nextUnit('B');
    const spots = [];
    TB.continents.forEach(ct => ct.countries.forEach(c => c.regions.forEach(rg => {
      if (!rg.at) return;
      const rs = UNITS.filter(r => r.region === rg), w = rs.filter(playable), d = rs.filter(done);
      const state = w.length && d.length === w.length ? 'done' : d.length ? 'some' : nextB && nextB.region === rg && unitState(nextB) === 'current' ? 'next' : 'todo';
      spots.push({ name: rg.name, at: rg.at, state, colour: c.wine });
    })));
    const regionsDone = spots.filter(s => s.state === 'done' || s.state === 'some').length;
    const stat = (n, label, colour) => `<div class="stat"><svg viewBox="0 0 80 80" aria-hidden="true"><g filter="url(#stain)"><circle cx="40" cy="40" r="31" fill="${colour}" opacity=".1"/><circle cx="40" cy="40" r="31" fill="none" stroke="${colour}" stroke-width="3" opacity=".6"/><circle cx="42" cy="39" r="34" fill="none" stroke="${colour}" stroke-width=".9" opacity=".7"/></g></svg><b>${n}</b><span>${label}</span></div>`;
    const se = season(), time = D.scenes.timeOfDay(), cur = S.settings.view || 'sky';
    const card = (id, name, art, open) => `<button class="pcard ${open ? '' : 'locked'} ${cur === id ? 'sel' : ''}" ${open ? `data-act="setview" data-v="${id}"` : 'disabled'} aria-label="${name}">
      <span class="pcard-art">${open ? art : '<i>?</i>'}</span><span class="pcard-name">${name}</span></button>`;
    app.innerHTML = `<div class="tabview journey">
      <header class="j-head"><h1>Journey</h1></header>
      <div class="j-switch seg"><button class="${view === 'europe' ? 'on' : ''}" data-act="mapview" data-v="europe">Europe</button><button class="${view === 'world' ? 'on' : ''}" data-act="mapview" data-v="world">World</button></div>
      <div class="j-map">${D.scenes.map(view, spots)}</div>
      <div class="stats">${stat(Object.keys(S.days).length, 'days', '#a8434e')}${stat(Object.keys(S.cellar).length, 'wines', '#c4842c')}${stat(regionsDone, 'regions', '#7c9a4e')}</div>
      <h2 class="j-h">Postcards <span class="mono">${D.scenes.POSTCARDS.filter(p => postcardUnlocked(p.id)).length}/${D.scenes.POSTCARDS.length}</span></h2>
      <div class="pcards">
        ${card('sky', 'The vineyard', D.scenes.sky(se.stage, time), true)}
        ${D.scenes.POSTCARDS.map(p => card(p.id, p.name, D.scenes.postcard(p.id, 'thumb'), postcardUnlocked(p.id))).join('')}
      </div>
    </div>${tabbar('journey')}`;
  }

  /* ---------- ROOTS tab: the syllabus as soil ---------- */
  const OFF = [-46, 34, -18, 48, -40, 16, -8, 40];
  const ROW = 96;
  function roots(scroll = true) {
    setWine('#7b2a2a');
    const deepest = UNITS.filter(r => r.track === 'A' && done(r)).pop();
    const chaptersHTML = D.chapters.map((ch, ci) => {
      const st = D.strata[ci], rs = UNITS.filter(r => r.track === 'A' && r.ci === ci);
      const pts = rs.map((r, i) => ({ x: 150 + OFF[i % OFF.length], y: ROW * i + ROW / 2 }));
      pts.push({ x: 150, y: ROW * rs.length + ROW / 2 });
      const H = ROW * (rs.length + 1);
      const pathThrough = arr => arr.reduce((d, p, i) => i ? `${d} Q${(arr[i - 1].x + p.x) / 2 + (i % 2 ? 22 : -22)} ${(arr[i - 1].y + p.y) / 2} ${p.x} ${p.y}` : `M150 0 Q150 ${p.y / 2} ${p.x} ${p.y}`, '');
      const reached = rs.filter(r => ['done', 'current'].includes(unitState(r))).length;
      const fullyDone = rs.every(done);
      const solid = fullyDone ? pathThrough(pts) + ` L150 ${H}` : reached ? pathThrough(pts.slice(0, reached)) : '';
      const rows = rs.map((r, i) => {
        const s = unitState(r), off = OFF[i % OFF.length], rec = S.units[r.u.id];
        const inner = s === 'done' ? `${ring(rec.best, '#f4e7c9', 64)}<span class="nb-num">${label(r)}</span>`
          : s === 'current' ? `<span class="nb-num">${label(r)}</span>` : s === 'soon' ? '<span class="nb-num">···</span>' : `<span class="nb-num">${label(r)}</span>`;
        const lab = off < 0 ? `left:calc(50% + ${off + 40}px)` : `right:calc(50% - ${off - 40}px)`;
        return `<li class="node ${s}" style="top:${ROW * i}px">
          <button class="node-btn" style="left:calc(50% + ${off}px)" data-act="preview" data-id="${r.u.id}" aria-label="${label(r)} ${esc(r.u.title)} (${s})">${inner}</button>
          <div class="node-label ${off < 0 ? 'right' : 'left'}" style="${lab}"><span class="mono">${s === 'current' ? 'You are here' : s === 'soon' ? 'Being poured' : label(r)}</span><strong>${r.u.title}</strong><span>${r.u.sub}</span></div>
        </li>`;
      }).join('');
      return `<section class="ch-band ch${ci} ${rs.some(r => unitState(r) !== 'locked' && unitState(r) !== 'soon') || fullyDone ? 'open' : 'closed'}" style="--sc:${st.colour};--cw:${ch.wine}">
        <header class="ch-head">
          <span class="mono">Chapter ${ci + 1} · ${st.name}</span>
          <h2>${ch.title}</h2>
          <p>${ch.blurb}</p>
        </header>
        <div class="path" style="height:${H}px">
          <svg class="path-svg" viewBox="0 0 300 ${H}" width="300" height="${H}" aria-hidden="true">
            <path class="p-dash" d="${pathThrough(pts)} L150 ${H}"/>
            ${solid ? `<path class="p-solid" d="${solid}" filter="url(#wobble)"/>` : ''}
          </svg>
          <ol>${rows}
            <li class="node checkpoint ${fullyDone ? 'current' : 'locked'}" style="top:${ROW * rs.length}px">
              <button class="node-btn" style="left:50%" data-act="checkpoint" aria-label="Checkpoint tasting"><span class="nb-num">✦</span></button>
              <div class="node-label right" style="left:calc(50% + 40px)"><span class="mono">Checkpoint</span><strong>The ${st.name} Tasting</strong><span>Break through to the next stratum</span></div>
            </li>
          </ol>
        </div>
        <p class="soil-fact"><span class="mono">About ${st.name.toLowerCase()}</span>${st.fact}</p>
      </section>`;
    }).join('');
    app.innerHTML = `<div class="tabview roots-tab">
      <header class="roots-head">
        <nav class="learn-switch seg"><a href="#roots" class="${'roots' === 'roots' ? 'on' : ''}">Roots</a><a href="#list" class="${'roots' === 'list' ? 'on' : ''}">Grapes & places</a></nav>
        <h1>How wine works</h1>
      </header>
      <div class="vine-top">${vineSVG(season().stage)}</div>
      ${chaptersHTML}
      <p class="foot mono">Bedrock · more to come</p>
    </div>${tabbar('learn')}`;
    if (scroll) requestAnimationFrame(() => {
      const cur = app.querySelector('.node.current:not(.checkpoint)');
      if (cur && doneCount()) cur.scrollIntoView({ block: 'center' });
    });
  }

  /* ---------- WINE LIST tab: Track B in three clear parts ---------- */
  function wineList(scroll = true) {
    setWine(TB.wine);
    const B = UNITS.filter(r => r.track === 'B');
    const row = r => {
      const s = unitState(r), rec = S.units[r.u.id];
      const pill = s === 'done' ? `<span class="pill done">✓ ${rec.best}%</span>` : s === 'current' ? '<span class="pill start">Start</span>' : s === 'locked' ? '<span class="pill">Locked</span>' : '<span class="pill soon">Coming soon</span>';
      return `<li><button class="wl-row ${s}" data-act="preview" data-id="${r.u.id}"><span class="wl-name">${r.u.title}${r.u.sub ? `<small>${r.u.sub}</small>` : ''}</span>${pill}</button></li>`;
    };
    const stats = rs => { const w = rs.filter(playable).length, d = rs.filter(done).length, soon = rs.length - w; return w ? `${d} of ${w} done` + (soon ? ` · ${soon} more soon` : '') : `${soon} coming soon`; };
    const p1 = B.filter(r => r.part === 1), p2 = B.filter(r => r.part === 2), p3 = B.filter(r => r.part === 3);
    const p1Open = reqMet(p1[0]), restOpen = reqMet(p3[0]);
    const step = (n, title, state) => `<li class="step ${state}"><span class="step-n">${state === 'done' ? '✓' : n}</span>${title}</li>`;
    const coreDone = CORE_REQ.every(x => !playable(x) || done(x));
    const groupHTML = g => {
      const rs = p2.filter(r => r.grapeGroup === g);
      return `<details class="wl-group" ${g.core || rs.some(r => unitState(r) === 'current') ? 'open' : ''}>
        <summary><span class="wl-gname">${g.name}<small>${g.blurb}</small></span><span class="mono wl-count">${stats(rs)}</span></summary>
        <ul class="wl-rows">${rs.map(row).join('')}</ul>
      </details>`;
    };
    const countryHTML = c => {
      const rs = p3.filter(r => r.country === c);
      const multi = c.regions.length > 1 || c.regions[0].name !== c.name;
      return `<details class="wl-group" ${rs.some(r => unitState(r) === 'current') ? 'open' : ''}>
        <summary><span class="wl-gname">${c.name}</span><span class="mono wl-count">${stats(rs)}</span></summary>
        ${c.regions.map(rg => `${multi ? `<h4 class="wl-region">${rg.name}</h4>` : ''}<ul class="wl-rows">${rs.filter(r => r.region === rg).map(row).join('')}</ul>`).join('')}
      </details>`;
    };
    app.innerHTML = `<div class="tabview winelist">
      <header class="wl-head">
        <nav class="learn-switch seg"><a href="#roots" class="${'list' === 'roots' ? 'on' : ''}">Roots</a><a href="#list" class="${'list' === 'list' ? 'on' : ''}">Grapes & places</a></nav>
        <h1>Grapes & places</h1>
        ${doneB().length ? `<button class="pr-entry" data-act="go" data-h="#practice"><span class="pr-entry-ic">↻</span><span class="pr-entry-txt"><strong>Practice what you\'ve learned</strong><small>Shuffled tastings and rules, any time</small></span><span class="pr-entry-go">›</span></button>` : ''}
        <ol class="steps-row">
          ${step(1, 'Read a label', p1.every(done) ? 'done' : p1Open ? 'now' : 'locked')}
          ${step(2, 'Meet the grapes', coreDone && restOpen ? 'done' : p1.every(done) ? 'now' : 'locked')}
          ${step(3, 'Travel the regions', restOpen ? 'now' : 'locked')}
        </ol>
      </header>

      <section class="wl-part">
        <h2><span class="mono">Part 1</span>Read a label</h2>
        ${p1Open ? '' : `<p class="wl-part-sub">Opens after Roots ${reqText().replace('Topsoil ', '')}</p>`}
        <ul class="wl-rows">${p1.map(row).join('')}</ul>
      </section>

      <section class="wl-part">
        <h2><span class="mono">Part 2</span>Meet the grapes</h2>

        ${TB.grapeGroups.map(groupHTML).join('')}
      </section>

      <section class="wl-part">
        <h2><span class="mono">Part 3</span>Travel the regions</h2>
        ${restOpen ? '' : '<p class="wl-part-sub">Opens after the big international grapes</p>'}
        ${TB.continents.map(ct => `<h3 class="wl-continent">${ct.name}</h3>${ct.countries.map(countryHTML).join('')}`).join('')}
      </section>
    </div>${tabbar('learn')}`;
    if (scroll && doneCount('B')) requestAnimationFrame(() => app.querySelector('.wl-row.current')?.scrollIntoView({ block: 'center' }));
  }

  function preview(id) {
    const r = UNIT[id], s = unitState(r), rec = S.units[id], u = r.u;
    const prev = r.prev;
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="modal-card preview" style="--fw:${r.wine}">
      <button class="icon-btn close" data-act="close" aria-label="Close">${closeIcon()}</button>
      <p class="eyebrow">Unit ${label(r)} · ${r.group}</p>
      <h2>${u.title}</h2>
      <p class="review-q">${u.sub}</p>
      ${playable(r) && !(u.lesson || []).length ? `<ol class="steps"><li><span class="mono">Checkpoint</span>${u.questions.length} mixed questions, no lesson first</li></ol>` : ''}
      ${playable(r) && (u.lesson || []).length ? `<ol class="steps">
        <li><span class="mono">1 · The Pour</span>${r.track === 'B' ? `Starts from a label, then works out to grapes, rules and taste: ${u.lesson.length} cards` : `A short lesson: ${u.lesson.length} cards`}</li>
        <li><span class="mono">2 · The Taste</span>${u.questions.length} questions on what you just learned</li>
        <li><span class="mono">3 · From your cellar</span>If you have wines in your cellar, one to taste from memory</li>
      </ol>` : ''}
      ${rec ? `<p class="mono resting-note">Best ${rec.best}% · poured ${rec.plays}×</p>` : ''}
      ${u.draft ? `<div class="draft-box"><p class="mono">Draft · rules not yet checked</p>${u.toCheck && u.toCheck.length ? `<p>To check against ${esc(u.sources.join(' and '))}:</p><ul>${u.toCheck.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>To check against ${esc(u.sources.join(' and '))}.</p>`}</div>`
        : u.checked ? `<div class="checked-box"><p class="mono">✓ Rules checked ${u.checked}</p><p>Against: ${esc(u.sources.join('; '))}.</p>${u.note ? `<p class="note">${esc(u.note)}</p>` : ''}</div>` : ''}
      ${s === 'current' || s === 'done' ? `<button class="primary" data-act="go" data-h="#unit-${id}">${s === 'done' ? 'Pour it again' : 'Start lesson'}</button>`
        : s === 'locked' && !reqMet(r) ? (r.part === 1 ? `<p class="mono resting-note">Locked · finish ${reqText()} in Track A first</p><button class="primary" data-act="go" data-h="#roots">Go to Track A</button>` : `<p class="mono resting-note">Locked · opens once you've finished the big international grapes</p>`)
        : s === 'locked' ? `<p class="mono resting-note">Locked · finish ${label(prev)} ${prev.u.title} first</p>`
        : u.draft && u.questions ? `<p class="mono resting-note">Written, waiting for the rule check before it's poured</p>`
        : `<p class="mono resting-note">Coming soon · this lesson is planned but not written yet</p>`}
    </div></div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
  }

  const gearIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>`;
  const closeIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

  /* ---------- player: unit (lesson → tasting) ---------- */
  let P = null;
  const scoredCount = () => P.questions.filter(q => q.type !== 'recall').length;
  function recallPick(exclude) {
    const es = Object.entries(S.cellar).filter(([id]) => !exclude.has(id) && D.wines[id]);
    if (!es.length) return null;
    const due = es.filter(([, e]) => bottleState(e) !== 'resting');
    return pick(due.length ? due : es)[0];
  }
  function startUnit(id) {
    const r = UNIT[id];
    if (!r || !playable(r) || !(unlocked(r) || done(r))) { location.hash = r && r.track === 'B' ? '#list' : '#roots'; return; }
    const qs = r.u.questions.slice();
    const rc = recallPick(new Set(qs.flatMap(q => q.wines || [])));
    if (rc) qs.splice(qs.length - 1, 0, { type: 'recall', wine: rc });
    S.lastTrack = r.track;
    P = { kind: 'unit', r, id, title: r.u.title, tag: `Unit ${label(r)}`, wine: r.wine, lesson: r.u.lesson || [], questions: qs, card: 0, i: 0, correct: 0, results: [], phase: 'lesson' };
    setWine(P.wine);
    if (P.lesson.length) renderLesson(); else renderQ();
  }

  function glassFill(frac, colour) {
    const top = 62 - 46 * frac;
    return `<svg class="mini-glass" viewBox="0 0 60 104" width="30" height="52" aria-hidden="true">
      <defs><clipPath id="mg"><path d="M12 6C10 40 16 62 30 64C44 62 50 40 48 6Z"/></clipPath></defs>
      <rect clip-path="url(#mg)" x="0" y="${top}" width="60" height="80" fill="${colour}"/>
      <path d="M12 6C10 40 16 62 30 64C44 62 50 40 48 6" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <path d="M30 64V94M18 99Q30 93 42 99" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  const ART = {
    grape: () => `<svg class="art" viewBox="0 0 260 150" aria-hidden="true">
      <circle cx="90" cy="78" r="58" fill="#4f1637"/><circle cx="90" cy="78" r="50" fill="#d9df9f"/>
      <circle cx="90" cy="78" r="50" fill="url(#pulpg)"/>
      <defs><radialGradient id="pulpg" cx=".4" cy=".35"><stop offset="0" stop-color="#f3f1c9"/><stop offset="1" stop-color="#c7d08a"/></radialGradient></defs>
      <ellipse cx="78" cy="88" rx="7" ry="11" fill="#8a5a2c" transform="rotate(-20 78 88)"/><ellipse cx="102" cy="86" rx="7" ry="11" fill="#8a5a2c" transform="rotate(20 102 86)"/>
      <path d="M90 20 q4 -12 14 -14" stroke="#5a3b28" stroke-width="3" fill="none"/>
      <g font-family="DM Mono, monospace" font-size="11" fill="currentColor" letter-spacing="1">
        <path d="M146 40 H172" stroke="currentColor"/><text x="176" y="44">SKIN</text>
        <path d="M120 70 H172" stroke="currentColor"/><text x="176" y="74">PULP</text>
        <path d="M108 92 L130 108 H172" stroke="currentColor" fill="none"/><text x="176" y="112">SEEDS</text>
      </g></svg>`,
    colours: () => {
      const sw = (cols) => cols.map(([c, n], i) => `<g transform="translate(${i * 62} 0)"><circle cx="26" cy="22" r="20" fill="${c}"/><text x="26" y="58" text-anchor="middle">${n}</text></g>`).join('');
      return `<svg class="art" viewBox="0 0 250 150" aria-hidden="true"><g font-family="DM Mono, monospace" font-size="9" fill="currentColor" letter-spacing=".5">
        <g transform="translate(30 4)">${sw([[D.C.lemon, 'LEMON'], [D.C.gold, 'GOLD'], [D.C.amber, 'AMBER']])}</g>
        <g transform="translate(0 76)">${sw([[D.C.purple, 'PURPLE'], [D.C.ruby, 'RUBY'], [D.C.garnet, 'GARNET'], [D.C.tawny, 'TAWNY']])}</g>
        <path d="M30 70 H230" stroke="currentColor" stroke-dasharray="2 4" opacity=".4"/>
      </g></svg>`;
    },
  };

  function cardHTML(c) {
    let h = '';
    if (c.art) h += ART[c.art]();
    if (c.big) h += `<p class="big">${c.big}</p>`;
    h += `<h2>${c.title}</h2>`;
    if (c.body) h += `<p class="lbody">${c.body}</p>`;
    if (c.kind === 'label') h += `${labelHTML(c.label, 'lnote')}<p class="lnote mono">Tap the underlined words</p>`;
    if (c.kind === 'facts') h += `<dl class="facts">${c.rows.map((r, i) => `<div style="animation-delay:${i * 0.08}s"><dt class="mono">${r.k}</dt><dd>${r.v}</dd></div>`).join('')}</dl>`;
    if (c.kind === 'try') h += `<div class="try"><p class="mono">Try it</p><p class="try-prompt">${c.prompt}</p><button class="reveal-btn" data-act="tryreveal">Tap to find out</button><p class="try-answer" hidden>${c.reveal}</p></div>`;
    if (c.kind === 'compare') h += `<div class="compare">${c.cols.map(col => `<div class="col"><h3>${col.h}</h3><ul>${col.items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`;
    if (c.kind === 'scale') h += `<div class="scale"><div class="scale-bar"></div>${c.marks.map((m, i) => `<div class="mark ${i % 2 ? 'below' : 'above'}" style="left:${m.at * 100}%;animation-delay:${0.2 + i * 0.15}s"><span>${m.t}</span></div>`).join('')}<div class="scale-ends mono"><span>${c.low}</span><span>${c.high}</span></div></div>`;
    if (c.kind === 'layers') h += `<div class="layers">${c.rows.map((r, i) => `<div class="layer l${i}" style="animation-delay:${i * 0.12}s"><span class="mono">${r.h}</span><p>${r.t}</p></div>`).join('')}</div>`;
    return h;
  }

  function renderLesson(dir = 1) {
    const c = P.lesson[P.card], n = P.lesson.length, last = P.card === n - 1;
    P.phase = 'lesson';
    app.innerHTML = `<div class="player lesson-view" style="--fw:${P.wine}"><div class="tint"></div>
      <header class="p-top">
        <button class="icon-btn" data-act="quit" aria-label="Leave">${closeIcon()}</button>
        <div class="p-title"><span class="mono">The Pour · ${P.tag}</span><strong>${P.title}</strong></div>
        ${glassFill((P.card + 1) / n, P.wine)}
      </header>
      ${draftBanner()}<div class="lstage"><article class="lcard k-${c.kind} ${dir < 0 ? 'back' : ''}">${cardHTML(c)}</article></div>
      <div class="lnav">
        <button class="ghost-btn" data-act="lprev" ${P.card ? '' : 'disabled'}>Back</button>
        <div class="ldots">${P.lesson.map((_, i) => `<i class="${i <= P.card ? 'on' : ''}"></i>`).join('')}</div>
        <button class="primary" data-act="lnext">${last ? 'Now taste it' : 'Next'}</button>
      </div>
    </div>`;
    const stage = app.querySelector('.lstage');
    let x0 = null;
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; });
    stage.addEventListener('pointerup', e => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (dx < -50) lessonStep(1); else if (dx > 50 && P.card) lessonStep(-1);
    });
  }
  function lessonStep(d) {
    if (d > 0 && P.card === P.lesson.length - 1) return interlude();
    P.card = Math.max(0, P.card + d);
    buzz(5);
    renderLesson(d);
  }
  function interlude() {
    const n = scoredCount(), rc = P.questions.some(q => q.type === 'recall');
    P.phase = 'interlude';
    clink();
    app.innerHTML = `<div class="player interlude" style="--fw:${P.wine}"><div class="tint"></div>
      <header class="p-top">
        <button class="icon-btn" data-act="quit" aria-label="Leave">${closeIcon()}</button>
        <div class="p-title"><span class="mono">${P.tag}</span><strong>${P.title}</strong></div>
        ${glassFill(1, P.wine)}
      </header>
      <div class="il-body">
        ${BOTTY}
        <p class="eyebrow">Lesson poured</p>
        <h2>Now, taste it.</h2>
        <p>${n} questions on what you just learned${rc ? ', plus one wine from your cellar to taste from memory' : ''}. You'll sort, place things on scales, put things in order and pick answers.</p>
        <button class="primary" data-act="practice">Start tasting</button>
        <button class="link-btn" data-act="relesson">Read the lesson again</button>
      </div>
    </div>`;
  }

  function playerShell(inner) {
    const pct = (P.i / P.questions.length) * 100;
    return `<div class="player" style="--fw:${P.wine}">
      <div class="tint"></div>
      <header class="p-top">
        <button class="icon-btn" data-act="quit" aria-label="Leave">${closeIcon()}</button>
        <div class="p-title"><span class="mono">The Taste · ${P.i + 1} of ${P.questions.length}</span><strong>${P.title}</strong></div>
        ${ring(pct, P.wine, 44)}
      </header>
      ${draftBanner()}<div class="q-body">${inner}</div>
    </div>`;
  }

  const TYPE_LABEL = { odd: 'Odd one out', chain: 'Label → appellation → grape → taste', choice: 'Question', blind: 'Blind · mystery glass', label: 'Label decoder', order: 'Put in order', sort: 'Sort it', slider: 'Place it on the scale', recall: 'From your cellar' };
  function renderQ() {
    const q = P.questions[P.i];
    P.locked = false; P.phase = 'practice';
    const title = q.type === 'recall' ? `What do you remember about ${D.wines[q.wine].name}?` : q.q;
    let body = `<p class="eyebrow">${TYPE_LABEL[q.type]}</p><h2 class="q">${title}</h2>`;
    if (q.type === 'odd') body += `<div class="options grid2">${shuffle(q.options.map((_, i) => i)).map(i => `<button class="opt" data-act="choose" data-i="${i}">${q.options[i]}</button>`).join('')}</div>`;
    if (q.type === 'chain') { P.chain = { k: 0, misses: 0 }; body += chainUI(q); }
    if (q.type === 'choice') body += `<div class="options">${shuffle(q.options.map((_, i) => i)).map(i => `<button class="opt" data-act="choose" data-i="${i}">${q.options[i]}</button>`).join('')}</div>`;
    if (q.type === 'blind') body += blindUI(q);
    if (q.type === 'label') body += labelUI(q);
    if (q.type === 'order') { P.seq = []; P.pool = shuffle(q.items); body += orderUI(q); }
    if (q.type === 'sort') { P.sort = { items: shuffle(q.items), k: 0, placed: [] }; body += sortUI(q); }
    if (q.type === 'slider') body += sliderUI(q);
    if (q.type === 'recall') body += recallUI(q);
    app.innerHTML = playerShell(body);
    window.scrollTo(0, 0);
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
            <path class="wine" d="" fill="${(q.wines && D.wines[q.wines[0]] && D.wines[q.wines[0]].wine) || (q.concept && D.concepts[q.concept] && D.concepts[q.concept].wine) || P.wine}"/>
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
      <p class="blind-score mono">Clues so far: <strong class="pts">1 of ${q.clues.length}</strong> · the earlier you call it, the better</p>
      <div class="options grid2">${P.blindOpts.map(i => `<button class="opt" data-act="guess" data-i="${i}">${q.options[i]}</button>`).join('')}</div>
    </div>`;
  }

  function initSwirl(q) {
    const wrap = app.querySelector('.glass-wrap'), winePath = app.querySelector('.wine'), ringC = app.querySelector('.swirl-ring circle');
    const NEED = Math.PI * 2 * 1.4;
    let phase = 0, amp = 2;
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
    let acc2 = 0;
    trackSwirl(wrap, d => {
      if (P.locked) return;
      acc2 += Math.abs(d); phase += d * 1.6; amp = Math.min(13, amp + Math.abs(d) * 4);
      if (P.clues >= q.clues.length) { ringC.setAttribute('stroke-dasharray', '100 100'); return; }
      ringC.setAttribute('stroke-dasharray', `${Math.min(100, (acc2 / NEED) * 100)} 100`);
      if (acc2 >= NEED) { acc2 = 0; revealClue(q); ringC.setAttribute('stroke-dasharray', '0 100'); }
    });
  }

  function revealClue(q) {
    if (P.clues >= q.clues.length || P.locked) return;
    const li = app.querySelector(`.clue[data-c="${P.clues}"]`);
    li.querySelector('p').textContent = q.clues[P.clues].text;
    li.classList.add('shown');
    P.clues++;
    app.querySelector('.glass-wrap').classList.add('opened');
    setTimeout(() => app.querySelector('.glass-wrap')?.classList.remove('opened'), 2400);
    app.querySelector('.pts').textContent = `${P.clues} of ${q.clues.length}`;
    if (P.clues >= q.clues.length) {
      app.querySelector('.swirl-hint').textContent = 'FULLY OPEN';
      app.querySelector('[data-act="reveal"]').remove();
    }
    clink(); buzz(12);
  }

  /* Label decoder */
  // One label renderer for questions (act=term), lesson cards (act=lnote) and static labels (act=null)
  function labelHTML(label, act) {
    return `<div class="wine-label label-${label.style}">
      <div class="lbl-border">
        ${label.lines.map(line => `<div class="lbl-line">${line.map((s, i) => {
          const a = act === 'lnote' ? (s.note ? `data-act="lnote" data-note="${esc(s.note)}"` : '') : act ? `data-act="${act}" data-k="${s.k}"` : '';
          return `<${a ? 'button' : 'span'} class="term ${s.big ? 'big' : ''} ${s.small ? 'small' : ''} ${act === 'lnote' && s.note ? 'noted' : ''} ${act ? '' : 'static'}" ${a}>${s.t}</${a ? 'button' : 'span'}>`;
        }).join('')}</div>`).join('')}
      </div>
    </div>`;
  }
  function labelUI(q) { return labelHTML(q.label, 'term') + '<p class="hint mono">Tap a word on the label</p>'; }

  /* Chain drill: label → appellation → grape → taste, one step at a time */
  function chainUI(q) {
    const st = q.steps[P.chain.k];
    return `<div class="chain">
      ${labelHTML(q.label, null)}
      <ol class="chain-steps">${q.steps.map((x, i) => `<li class="${i < P.chain.k ? 'past' : i === P.chain.k ? 'now' : ''}"><span class="mono">${i + 1}</span></li>`).join('<i></i>')}</ol>
      <p class="chain-q">${st.q}</p>
      <div class="options">${shuffle(st.options.map((_, i) => i)).map(i => `<button class="opt" data-act="chainpick" data-i="${i}">${st.options[i]}</button>`).join('')}</div>
    </div>`;
  }
  function chainPick(q, btn) {
    if (P.locked || P.chainWait) return;
    const st = q.steps[P.chain.k], i = +btn.dataset.i, ok = i === st.answer;
    app.querySelectorAll('.chain .opt').forEach(o => { if (+o.dataset.i === st.answer) o.classList.add('right'); });
    if (!ok) { btn.classList.add('wrong'); P.chain.misses++; P.chain.firstMiss ??= st.q; thud(); } else { clink(); buzz(8); }
    P.chainWait = true;
    setTimeout(() => {
      P.chainWait = false;
      P.chain.k++;
      if (P.chain.k < q.steps.length) { app.querySelector('.chain').outerHTML = chainUI(q); return; }
      answer(!P.chain.misses, P.chain.misses ? `The chain slipped at "${P.chain.firstMiss}". The correct links are highlighted.` : '');
    }, ok ? 550 : 1300);
  }

  /* Order */
  function orderUI(q) {
    return `<div class="order">
      <ol class="slots">${q.items.map((_, i) => `<li class="slot ${P.seq[i] ? 'filled' : ''}" data-act="unslot" data-i="${i}"><span class="mono">${i + 1}</span>${P.seq[i] ? `<b>${P.seq[i]}</b>` : ''}</li>`).join('')}</ol>
      <div class="pool">${P.pool.map(t => `<button class="chip ${P.seq.includes(t) ? 'used' : ''}" data-act="slot" data-t="${esc(t)}">${t}</button>`).join('')}</div>
    </div>`;
  }
  function refreshOrder() {
    const q = P.questions[P.i];
    app.querySelector('.order').outerHTML = orderUI(q);
    if (P.seq.length === q.items.length) {
      const ok = P.seq.every((t, i) => t === q.items[i]);
      app.querySelectorAll('.slot').forEach((el, i) => el.classList.add(P.seq[i] === q.items[i] ? 'right' : 'wrong'));
      answer(ok, ok ? '' : 'Correct order: ' + q.items.join(' → '));
    }
  }


  /* Sort into buckets */
  function sortUI(q) {
    const s = P.sort, cur = s.items[s.k];
    return `<div class="sort">
      <div class="sort-stage">${cur ? `<div class="sort-card">${cur.t}</div><span class="mono">${s.k + 1} of ${s.items.length} · tap a group</span>` : '<span class="mono">All sorted</span>'}</div>
      <div class="buckets n${q.buckets.length}">${q.buckets.map((b, i) => `<button class="bucket" data-act="bucket" data-b="${i}"><strong>${b}</strong><span class="b-items">${s.placed.filter(p => p.b === i).map(p => `<em class="${p.ok ? 'ok' : 'no'}">${p.t}</em>`).join('')}</span></button>`).join('')}</div>
    </div>`;
  }
  function sortTap(q, b) {
    const s = P.sort, cur = s.items[s.k];
    if (!cur || P.locked) return;
    const ok = b === cur.b;
    s.placed.push({ t: cur.t, b, ok });
    s.k++;
    app.querySelector('.sort').outerHTML = sortUI(q);
    const el = app.querySelector(`.bucket[data-b="${b}"]`);
    el.classList.add(ok ? 'pulse' : 'shake');
    ok ? buzz(8) : buzz([20, 30, 20]);
    if (s.k >= s.items.length) {
      const wrong = s.placed.filter(p => !p.ok);
      answer(!wrong.length, wrong.length ? 'Should be: ' + wrong.map(p => `${p.t} → ${q.buckets[q.items.find(i => i.t === p.t).b]}`).join(' · ') : '');
    }
  }

  /* Place on a scale */
  function sliderUI(q) {
    const lo = Math.max(0, q.answer - q.tol), hi = Math.min(1, q.answer + q.tol);
    return `<div class="slider-q">
      <div class="slider-wrap">
        <div class="target" hidden style="left:${lo * 100}%;width:${(hi - lo) * 100}%"></div>
        <input type="range" class="range" min="0" max="100" value="50" aria-label="${esc(q.q)}">
      </div>
      <div class="ends mono"><span>${q.low}</span><span>${q.high}</span></div>
      <button class="primary" data-act="place">Place it here</button>
    </div>`;
  }
  function place(q) {
    if (P.locked) return;
    const range = app.querySelector('.range'), v = range.value / 100;
    const ok = Math.abs(v - q.answer) <= q.tol;
    range.disabled = true;
    app.querySelector('.target').hidden = false;
    app.querySelector('[data-act="place"]').remove();
    const where = q.answer < 0.34 ? `towards "${q.low}"` : q.answer > 0.66 ? `towards "${q.high}"` : 'in the middle';
    answer(ok, ok ? '' : `It belongs ${where}, inside the highlighted zone.`);
  }

  /* Taste a wine from your cellar, from memory (not scored; ages the bottle) */
  function recallUI(q) {
    const w = D.wines[q.wine], e = S.cellar[q.wine];
    return `<div class="recall" style="--fw:${w.wine}">
      <div class="r-bottle">${bottleSVG(q.wine, e)}</div>
      <p class="mono r-name">${w.kind} · ${w.origin}</p>
      <p class="hint mono">Picture it first: grapes, style, aromas. Then pour.</p>
      <div class="review-a" hidden>${profileHTML(w)}</div>
      <button class="primary" data-act="rpeek">Pour (reveal the tasting note)</button>
      <div class="judge" hidden><button class="opt" data-act="rjudge" data-ok="0">I'd forgotten</button><button class="primary" data-act="rjudge" data-ok="1">I knew it</button></div>
    </div>`;
  }

  /* Answer & feedback */
  function answer(ok, correction) {
    if (P.locked) return;
    P.locked = true;
    const q = P.questions[P.i];
    if (ok) { P.correct++; clink(); buzz(15); } else { thud(); buzz([30, 40, 30]); }
    P.results.push({ wines: q.wines || [], ok });
    const extra = q.type === 'blind' && ok ? `<p class="mono gain">Called it after ${P.clues} of ${q.clues.length} clue${P.clues === 1 ? '' : 's'}</p>` : '';
    const sheet = document.createElement('div');
    sheet.className = `sheet ${ok ? 'ok' : 'bad'}`;
    sheet.innerHTML = `<div class="sheet-in">
      <div class="sheet-head">${BOTTY}<div><h3>${ok ? pick(D.botty.good) : pick(D.botty.bad)}</h3>${extra}</div></div>
      ${correction ? `<p class="correction">${correction}</p>` : ''}
      <p>${q.explain}</p>
      <button class="primary" data-act="next">${P.i + 1 < P.questions.length ? 'Next' : 'Finish'}</button>
    </div>`;
    app.querySelector('.player').appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('up'));
  }

  function next() {
    P.i++;
    if (P.i < P.questions.length) renderQ(); else finish();
  }

  function finish() {
    if (P.kind === 'practice') return finishPractice();
    const n = scoredCount(), pct = Math.round((P.correct / n) * 100), now = Date.now();
    S.days[todayKey()] = (S.days[todayKey()] || 0) + 1;
    const rec = S.units[P.id], first = !rec;
    S.units[P.id] = { best: Math.max(rec ? rec.best : 0, pct), plays: (rec ? rec.plays : 0) + 1 };
    const laid = [], seen = new Set();
    P.results.forEach(({ wines, ok }) => wines.forEach(id => {
      if (!D.wines[id] || seen.has(id)) return; seen.add(id);
      const e = S.cellar[id];
      if (!e) { S.cellar[id] = { stage: 0, born: now, due: ok ? now + INTERVALS[0] * DAY : now, reviews: 0 }; laid.push(id); }
      else if (!ok) e.due = Math.min(e.due, now);
    }));
    save();
    pop(); buzz([20, 60, 20]);
    let unlock = '', nextBtn = '';
    const cand = UNITS[P.r.n + 1], nx = cand && cand.track === P.r.track && cand.part === P.r.part ? cand : null;
    const home = P.r.track === 'A' ? '#roots' : '#list', homeName = P.r.track === 'A' ? 'Back to Track A' : 'Back to Track B';
    if (first && nx) {
      const newStratum = nx.track === 'A' && nx.ci !== P.r.ci;
      unlock = `<div class="unlock"><span class="mono">${newStratum ? 'New stratum reached' : 'Up next'}</span>
        <strong>${newStratum ? D.strata[nx.ci].name + ': ' + nx.ch.title : `${label(nx)} ${nx.u.title}`}</strong>
        <p>${playable(nx) ? (newStratum ? D.strata[nx.ci].fact : nx.u.sub || '') : 'This lesson is planned but not written yet.'}</p></div>`;
    }
    if (nx && playable(nx) && unlocked(nx)) nextBtn = `<button class="primary" data-act="go" data-h="#unit-${nx.u.id}">Next: ${nx.u.title}</button><button class="link-btn" data-act="go" data-h="${home}">${homeName}</button>`;
    else nextBtn = `<button class="primary" data-act="go" data-h="${home}">${homeName}</button>`;
    app.innerHTML = `<div class="player result" style="--fw:${P.wine}">
      <div class="tint"></div>
      <div class="res">
        <p class="eyebrow">${P.tag} complete</p>
        <h2>${P.title}</h2>
        <div class="big-ring">${ring(pct, P.wine, 200)}<div class="big-num"><strong>${pct}%</strong><span class="mono">${P.correct} of ${n} correct</span></div></div>
        <div class="res-stats">
          <div><span class="mono">Correct</span><strong>${P.correct}/${n}</strong></div>
          <div><span class="mono">New wines</span><strong>${laid.length}</strong></div>
          <div><span class="mono">Best</span><strong>${S.units[P.id].best}%</strong></div>
        </div>
        ${unlock}
        ${laid.length ? `<div class="laid"><p class="mono">Laid down in your cellar</p><div class="rack small">${laid.map(id => bottleSVG(id, S.cellar[id])).join('')}</div><p class="laid-names">${laid.map(id => D.wines[id].name).join(' · ')}</p></div>` : ''}
        ${nextBtn}
        <button class="link-btn" data-act="replay">Do this unit again</button>
      </div>
    </div>`;
    window.scrollTo(0, 0);
  }

  /* ---------- cellar: real wines, racked by style ---------- */
  function cellar() {
    setWine('#a8434e');
    const entries = Object.entries(S.cellar).filter(([id]) => D.wines[id]);
    const counts = { ready: 0, corked: 0, resting: 0 };
    entries.forEach(([, e]) => counts[bottleState(e)]++);
    const cats = ['Sparkling', 'White', 'Rosé', 'Red', 'Sweet'];
    const racks = cats.map(cat => {
      const rs = entries.filter(([id]) => wineCat(D.wines[id]) === cat).sort((a, b) => a[1].born - b[1].born);
      if (!rs.length) return '';
      const rows = [];
      for (let i = 0; i < rs.length; i += 4) rows.push(rs.slice(i, i + 4));
      return `<section class="rack-section"><h2 class="rack-plate">${cat}</h2>${rows.map(r => `<div class="shelf">${r.map(([id, e]) => `<button class="slot-b" data-act="bottle" data-id="${id}">${bottleSVG(id, e)}<span class="slot-name">${D.wines[id].name}</span><span class="mono">${bottleState(e) === 'resting' ? restLabel(e) : bottleState(e)}</span></button>`).join('')}</div>`).join('')}</section>`;
    }).join('');
    app.innerHTML = `<div class="tabview cellar">
      <header class="tab-head">
        <p class="eyebrow">${entries.length} wine${entries.length === 1 ? '' : 's'}</p>
        <h1>The Cellar</h1>
        ${entries.length ? `<button class="pr-entry" data-act="prtaste"><span class="pr-entry-ic">↻</span><span class="pr-entry-txt"><strong>Blind-taste your cellar</strong><small>A shuffled round from your wines</small></span><span class="pr-entry-go">›</span></button>` : ''}
      </header>
      ${entries.length ? `<div class="legend mono"><span class="lg ready">${counts.ready} ready</span><span class="lg corked">${counts.corked} corked</span><span class="lg resting">${counts.resting} resting</span></div>${racks}`
        : `<div class="empty-cellar">${BOTTY}<p>No wines yet.</p><button class="primary narrow" data-act="go" data-h="#list">Find your first</button></div>`}
    </div>${tabbar('cellar')}`;
  }
  const restLabel = e => { const d = Math.ceil((e.due - Date.now()) / DAY); return d <= 1 ? 'tomorrow' : `${d} days`; };
  const AGE_NAMES = ['Young', 'Developing', 'Mature', 'Aged', 'Venerable', 'Legendary'];

  function openBottle(id) {
    const w = D.wines[id], e = S.cellar[id], st = bottleState(e);
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <div class="modal-card bottle-card" style="--fw:${w.wine}">
        <button class="icon-btn close" data-act="close" aria-label="Close">${closeIcon()}</button>
        <div class="mb-bottle">${bottleSVG(id, e)}</div>
        <p class="eyebrow mb-eyebrow">${w.kind} · ${AGE_NAMES[e.stage]} · ${e.reviews} tasting${e.reviews === 1 ? '' : 's'}</p>
        <h2>${w.name}</h2>
        <p class="review-q">${st === 'resting' ? 'Resting in the rack.' : 'Taste it from memory: what are its grapes, its style and its aromas?'}</p>
        <div class="review-a" hidden>${profileHTML(w)}</div>
        ${st === 'resting'
          ? `<p class="mono resting-note">Ready to taste again in ${restLabel(e)}</p><button class="link-btn" data-act="peek">Read the tasting note</button>`
          : `<p class="mono resting-note">${st === 'corked' ? 'Corked! Taste it to rescue it.' : 'Ready to taste. Picture it first.'}</p><button class="primary" data-act="peek">Pour (reveal the tasting note)</button>`}
        <div class="judge" hidden>
          <button class="opt" data-act="forgot" data-id="${id}">I'd forgotten</button>
          <button class="primary" data-act="remembered" data-id="${id}">I knew it</button>
        </div>
      </div>
    </div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
  }
  const closeModal = () => {
    overlay.innerHTML = '';
    const h = location.hash.slice(1) || 'today';
    if (h === 'cellar') cellar(); else if (h === 'roots') roots(false); else if (h === 'list') wineList(false); else if (h === 'journey') journey(); else if (h === 'glass') glassPage(); else if (h === 'today' || h === 'home') home();
  };
  function ageBottle(id, ok) {
    const e = S.cellar[id];
    if (!e) return;
    if (ok) { e.stage = Math.min(INTERVALS.length - 1, e.stage + 1); e.reviews++; clink(); buzz(15); }
    else { e.stage = 0; thud(); }
    e.due = Date.now() + INTERVALS[e.stage] * DAY;
    S.days[todayKey()] = S.days[todayKey()] || 1;
    save();
  }

  function judge(id, ok) {
    ageBottle(id, ok);
    const e = S.cellar[id];
    const card = overlay.querySelector('.modal-card');
    card.querySelector('.mb-bottle').innerHTML = bottleSVG(id, e);
    card.querySelector('.mb-bottle').classList.add('aged');
    card.querySelector('.mb-eyebrow').textContent = `${D.wines[id].kind} · ${AGE_NAMES[e.stage]} · ${e.reviews} tasting${e.reviews === 1 ? '' : 's'}`;
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
      <p class="set-note">The vineyard calendar on Today follows your hemisphere.</p>
      <p class="set-label mono">SOUND</p>
      <div class="seg">${[true, false].map(v => `<button class="${S.settings.sound === v ? 'on' : ''}" data-act="sound" data-v="${v}">${v ? 'Clinks on' : 'Silent'}</button>`).join('')}</div>
      <p class="set-label mono">DRAFT LESSONS</p>
      <div class="seg">${[false, true].map(v => `<button class="${!!S.settings.drafts === v ? 'on' : ''}" data-act="drafts" data-v="${v}">${v ? 'Preview drafts' : 'Hide drafts'}</button>`).join('')}</div>
      <p class="set-note">Drafts are written lessons whose rules haven't yet been checked against the official regulations (e.g. Champagne). Previewing unlocks them and shows a draft banner.</p>
      <p class="set-label mono">BACKUP</p>
      <div class="seg"><button data-act="export">Export backup</button><button data-act="import">Import backup</button></div>
      <p class="set-note">Your progress lives only in this browser. Export a backup now and then, and import it on a new phone or after clearing Safari.</p>
      <p class="set-label mono">PROGRESS</p>
      <button class="link-btn danger" data-act="reset">Pour it all away (reset)</button>
    </div></div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
  }

  /* ---------- backup ---------- */
  const backupText = () => JSON.stringify({ app: 'duovino', version: 1, exported: new Date().toISOString(), state: S });
  function exportBackup() {
    const txt = backupText();
    let url = '';
    try { url = URL.createObjectURL(new Blob([txt], { type: 'application/json' })); } catch { /* no blob */ }
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="modal-card backup">
      <button class="icon-btn close" data-act="close" aria-label="Close">${closeIcon()}</button>
      <p class="eyebrow">Backup</p><h2>Export your vineyard</h2>
      <p class="set-note">Copy this text somewhere safe (Notes, an email to yourself) or download it as a file.</p>
      <textarea class="backup-text" readonly>${esc(txt)}</textarea>
      <div class="judge"><button class="opt" data-act="copy-backup">Copy</button>${url ? `<a class="primary dl" href="${url}" download="duovino-backup-${todayKey()}.json">Download file</a>` : ''}</div>
      <p class="mono copy-note" hidden>Copied ✓</p>
    </div></div>`;
  }
  function importBackup() {
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="modal-card backup">
      <button class="icon-btn close" data-act="close" aria-label="Close">${closeIcon()}</button>
      <p class="eyebrow">Backup</p><h2>Import a backup</h2>
      <p class="set-note">Paste the backup text, or choose a backup file. This replaces the progress in this browser.</p>
      <textarea class="backup-text" placeholder='{"app":"duovino", …}'></textarea>
      <input type="file" class="backup-file" accept=".json,application/json">
      <p class="mono import-error" hidden></p>
      <button class="primary" data-act="restore">Restore</button>
    </div></div>`;
    overlay.querySelector('.backup-file').addEventListener('change', async e => {
      const f = e.target.files[0]; if (f) overlay.querySelector('.backup-text').value = await f.text();
    });
  }
  function restoreBackup() {
    const err = overlay.querySelector('.import-error');
    let data;
    try { data = JSON.parse(overlay.querySelector('.backup-text').value.trim()); } catch { data = null; }
    if (!data || data.app !== 'duovino' || !data.state || typeof data.state !== 'object' || typeof data.state.units !== 'object') {
      err.textContent = 'That doesn\'t look like a Duovino backup.'; err.hidden = false; return;
    }
    const st = data.state;
    ask('Replace your progress?', `This restores the backup from ${data.exported ? new Date(data.exported).toLocaleDateString('en-GB') : 'an earlier date'} and replaces everything in this browser.`, 'Restore', () => {
      S = { ...defaults(), ...st, settings: { ...defaults().settings, ...(st.settings || {}) } };
      save(); location.hash = '#today'; location.reload();
    });
  }

  /* in-page confirm dialog (native confirm() is blocked in some frames) */
  let askFn = null;
  function ask(title, text, yes, fn) {
    askFn = fn;
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="modal-card ask">
      ${BOTTY}<h2>${title}</h2><p class="review-q">${text}</p>
      <div class="judge"><button class="opt" data-act="close-ask">Stay</button><button class="primary" data-act="ask-yes">${yes}</button></div>
    </div></div>`;
  }


  /* ---------- events ---------- */
  const go = h => { if (location.hash === h) route(); else location.hash = h; };
  // Actions that already make their own sound (right/wrong answers, tastings, swirls)
  const SELF_SOUNDING = new Set(['choose', 'guess', 'term', 'chainpick', 'bucket', 'place', 'rjudge', 'remembered', 'forgot', 'glass-judge', 'glass-open', 'setview', 'tryreveal', 'reveal', 'sound']);
  document.addEventListener('click', ev => {
    if (ev.target.closest('.tab, .learn-switch a')) tap('tab');
  });
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const act = b.dataset.act;
    if (!SELF_SOUNDING.has(act)) tap('btn');
    const q = P && P.questions && P.questions[P.i];
    switch (act) {
      case 'go': go(b.dataset.h); break;
      case 'preview': preview(b.dataset.id); break;
      case 'checkpoint': ask('Checkpoint tastings', 'At the end of each chapter there will be a longer mixed tasting with a blind finale. Pass it to break through to the next stratum. Coming soon.', 'Lovely', () => {}); break;
      case 'quit': {
        const back = '#' + lastTab;
        const started = P && ((P.phase === 'lesson' && P.card > 0) || P.phase === 'interlude' || (P.phase === 'practice' && P.i > 0));
        if (started) ask(P.kind === 'practice' ? 'Leave this practice?' : 'Leave this unit?', P.kind === 'practice' ? 'This round won\'t be counted.' : 'Your progress in it won\'t be saved.', 'Leave', () => go(back)); else go(back);
        break;
      }
      case 'replay': go(`#unit-${P.id}`); break;
      case 'lnext': lessonStep(1); break;
      case 'lprev': lessonStep(-1); break;
      case 'tryreveal': { const t = b.closest('.try'); t.querySelector('.try-answer').hidden = false; b.remove(); clink(); break; }
      case 'practice': P.i = 0; P.correct = 0; P.results = []; renderQ(); break;
      case 'relesson': P.card = 0; renderLesson(); break;
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
        answer(ok, ok ? '' : `It was ${q.options[q.answer]}.`);
        app.querySelectorAll('.clue').forEach((li, n) => { li.classList.add('shown'); li.querySelector('p').textContent = q.clues[n].text; });
        break;
      }
      case 'reveal': revealClue(q); break;
      case 'lnote': { const n = app.querySelector('.lnote'); n.textContent = b.dataset.note; n.classList.add('on'); app.querySelectorAll('.term.picked').forEach(t => t.classList.remove('picked')); b.classList.add('picked'); buzz(5); break; }
      case 'chainpick': chainPick(q, b); break;
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
      case 'bucket': sortTap(q, +b.dataset.b); break;
      case 'place': place(q); break;
      case 'rpeek': { const r = b.closest('.recall'); r.querySelector('.review-a').hidden = false; r.querySelector('.judge').hidden = false; r.querySelector('.hint').remove(); b.remove(); break; }
      case 'rjudge': ageBottle(q.wine, b.dataset.ok === '1'); next(); break;
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
      case 'close-ask': askFn = null; overlay.innerHTML = ''; break;
      case 'ask-yes': { const fn = askFn; askFn = null; overlay.innerHTML = ''; fn && fn(); break; }
      case 'settings': settings(); break;
      case 'hemi': S.settings.hemi = b.dataset.h; save(); home(); settings(); break;
      case 'drafts': S.settings.drafts = b.dataset.v === 'true'; save(); location.reload(); break;
      case 'sound': S.settings.sound = b.dataset.v === 'true'; save(); settings(); if (S.settings.sound) clink(); break;
      case 'glass-open': clink(); glassPage('name'); break;
      case 'prmode': S.practice.mode = b.dataset.v; save(); practicePage(); break;
      case 'prarea': S.practice.area = b.dataset.v; save(); practicePage(); break;
      case 'prlen': S.practice.n = +b.dataset.v; save(); practicePage(); break;
      case 'prstart': startPractice(); break;
      case 'prtaste': S.practice = { ...(S.practice || { area: 'all', n: 10 }), mode: 'taste' }; save(); go('#practice'); break;
      case 'glass-pour': glassPage('taste'); break;
      case 'glass-notes': glassPage('notes'); break;
      case 'gnote': { const n = b.dataset.n; GT.picks.has(n) ? GT.picks.delete(n) : GT.picks.add(n); b.classList.toggle('on'); buzz(5);
        const c = app.querySelector('[data-act="glass-check"]'); if (c) c.disabled = !GT.picks.size; break; }
      case 'glass-check': glassPage('reveal'); break;
      case 'glass-judge': { const g = glassToday(); ageBottle(g.wine, b.dataset.ok === '1'); g.done = true; g.ok = b.dataset.ok === '1'; save(); GT = null; glassPage(); break; }
      case 'mapview': S.mapView = b.dataset.v; save(); journey(); break;
      case 'setview': S.settings.view = b.dataset.v; save(); clink(); journey(); break;
      case 'export': exportBackup(); break;
      case 'import': importBackup(); break;
      case 'restore': restoreBackup(); break;
      case 'copy-backup': {
        const ta = overlay.querySelector('.backup-text'), note = overlay.querySelector('.copy-note');
        const done = () => { note.hidden = false; };
        try { navigator.clipboard.writeText(ta.value).then(done, () => { ta.select(); note.textContent = 'Select all and copy'; done(); }); }
        catch { ta.select(); note.textContent = 'Select all and copy'; done(); }
        break;
      }
      case 'reset': ask('Pour it all away?', 'Your progress and cellar will be emptied. This can\'t be undone.', 'Reset everything', () => { S = defaults(); save(); go('#today'); }); break;
    }
  });

  let lastTab = 'home';
  /* ---------- PRACTICE: unlimited shuffles of what you've learned in Track B ---------- */
  // Two kinds: blind-tasting questions generated from the wines in your cellar, and the real questions
  // from the Track B lessons you've finished (filterable to appellation rules or an area). Never touches unit progress.
  const COLOUR_WORD = () => ({ [D.C.lemonGreen]: 'Pale lemon, green tints', [D.C.lemon]: 'Lemon', [D.C.gold]: 'Gold', [D.C.amber]: 'Amber',
    [D.C.pink]: 'Pink', [D.C.salmon]: 'Pale salmon', [D.C.purple]: 'Deep purple', [D.C.ruby]: 'Ruby', [D.C.garnet]: 'Garnet', [D.C.tawny]: 'Tawny' });
  const rangeWord = (v, L) => { const [a, b] = Array.isArray(v) ? v : [v, v]; return a === b ? L[a] : `${L[a]} to ${L[b]}`; };
  const learnedWines = () => Object.keys(S.cellar).filter(id => D.wines[id]);
  const doneB = () => UNITS.filter(r => r.track === 'B' && playable(r) && S.units[r.u.id]);
  function practiceAreas() {
    const B = doneB(), areas = [['all', 'Everything', B]];
    const rules = B.filter(r => (r.u.sources && r.u.sources.length) || /^b-fr-ch/.test(r.u.id));
    if (rules.length) areas.push(['rules', 'Appellation rules', rules]);
    const labels = B.filter(r => r.part === 1); if (labels.length) areas.push(['labels', 'Reading labels', labels]);
    const grapes = B.filter(r => r.part === 2); if (grapes.length) areas.push(['grapes', 'Grapes', grapes]);
    const byCountry = {};
    B.filter(r => r.part === 3 && r.country).forEach(r => { const k = /^b-fr-ch/.test(r.u.id) ? 'Champagne' : r.country.name; (byCountry[k] = byCountry[k] || []).push(r); });
    Object.entries(byCountry).forEach(([k, rs]) => areas.push(['c:' + k, k, rs]));
    return areas;
  }
  function wineQuestion(id, pool) {
    const w = D.wines[id], cat = wineCat(w);
    const dist = o => TASTE_DIMS.reduce((sum, [k]) => sum + Math.abs((midOf(o.profile[k]) ?? 0) - (midOf(w.profile[k]) ?? 0)), 0);
    const nearest = (ids, n) => ids.filter(o => o !== id).sort((a, b) => (wineCat(D.wines[b]) === cat) - (wineCat(D.wines[a]) === cat) || dist(D.wines[a]) - dist(D.wines[b])).slice(0, n);
    const others = nearest(pool.length >= 4 ? pool : Object.keys(D.wines), 3).length === 3 ? nearest(pool.length >= 4 ? pool : Object.keys(D.wines), 3) : nearest(Object.keys(D.wines), 3);
    const dims = TASTE_DIMS.filter(([k]) => w.profile[k] != null);
    const ao = aromaOptions(id);
    const kinds = ['blind', 'blind', 'scale', 'aroma'];
    if (w.kind !== 'Grape' && w.kind !== 'Style') kinds.push('grape');
    const kind = pick(kinds);
    const explain = `${w.name}: ${w.grapes}, from ${w.origin.split(' · ')[0]}. ${dims.map(([k, n, L]) => `${n} ${rangeWord(w.profile[k], L).toLowerCase()}`).join(', ')}.`;
    if (kind === 'blind') {
      const opts = shuffle([id, ...others]);
      return { type: 'blind', wines: [id], q: 'Which wine is in the glass?', explain,
        clues: [
          { stage: 'Look', text: `${COLOUR_WORD()[w.wine] || 'Clear'}${w.shape === 'champagne' ? ', with fine bubbles' : ''}.` },
          { stage: 'Smell', text: `${ao.truths.slice(0, 3).join(', ')}.` },
          { stage: 'Sip', text: `${dims.map(([k, n, L]) => k === 'sweetness' ? rangeWord(w.profile[k], L) : `${rangeWord(w.profile[k], L).toLowerCase()} ${n.toLowerCase()}`).join(', ')}.` },
        ],
        options: opts.map(o => D.wines[o].name), answer: opts.indexOf(id) };
    }
    if (kind === 'scale') {
      const [k, n, L] = pick(dims.filter(([k]) => !(k === 'sweetness' && midOf(w.profile[k]) === 1 && Math.random() < .6)));
      const v = w.profile[k], [a, b] = Array.isArray(v) ? v : [v, v];
      return { type: 'slider', wines: [id], q: `${w.name}: where does its ${n.toLowerCase()} sit?`, low: L[1], high: L[5],
        answer: ((a + b) / 2 - 1) / 4, tol: Math.max(.14, (b - a) / 8 + .11), explain: `${n}: ${rangeWord(v, L)}. ${explain}` };
    }
    if (kind === 'aroma') {
      const decoys = shuffle(ao.options.filter(o => !ao.truths.includes(o))).slice(0, 3);
      if (decoys.length === 3 && ao.truths.length) return { type: 'choice', wines: [id], q: `Which aroma is typical of ${w.name}?`,
        options: [pick(ao.truths), ...decoys], answer: 0, explain: `Typical: ${ao.truths.join(', ')}. ${explain}` };
    }
    const grapes = [...new Set(Object.values(D.wines).filter(o => o !== w && wineCat(o) === cat && o.grapes !== w.grapes).map(o => o.grapes))];
    return { type: 'choice', wines: [id], q: `What is ${w.name} made from?`, options: [w.grapes, ...shuffle(grapes).slice(0, 3)], answer: 0, explain };
  }
  function practiceQuestions() {
    const n = S.practice.n;
    if (S.practice.mode === 'taste') {
      const pool = learnedWines(); if (!pool.length) return [];
      // favour wines that are due or corked, but keep it random
      const weighted = pool.flatMap(id => { const e = S.cellar[id], st = bottleState(e); return st === 'corked' ? [id, id, id] : st === 'ready' ? [id, id] : [id]; });
      const qs = []; let guard = 0;
      while (qs.length < n && guard++ < n * 6) { const id = pick(weighted); if (qs.filter(q => q.wines[0] === id).length < 2) qs.push(wineQuestion(id, pool)); }
      return qs;
    }
    const area = practiceAreas().find(a => a[0] === S.practice.area) || practiceAreas()[0];
    const all = area[2].flatMap(r => r.u.questions.filter(q => q.type !== 'recall').map(q => ({ ...q, from: r.u.title })));
    return shuffle(all).slice(0, n);
  }
  function practicePage() {
    S.practice = S.practice || { mode: 'taste', area: 'all', n: 10 };
    setWine('#7c5a8a');
    const wines = learnedWines(), areas = practiceAreas(), cur = S.practice;
    if (!areas.find(a => a[0] === cur.area)) cur.area = 'all';
    const qCount = (areas.find(a => a[0] === cur.area) || [, , []])[2].reduce((t, r) => t + r.u.questions.length, 0);
    const ready = cur.mode === 'taste' ? wines.length > 0 : qCount > 0;
    app.innerHTML = `<div class="tabview practice">
      <header class="tab-head"><p class="eyebrow">Any time · as often as you like</p><h1>Practice</h1></header>
      <div class="pr-modes">
        <button class="pr-mode ${cur.mode === 'taste' ? 'on' : ''}" data-act="prmode" data-v="taste"><span class="pr-ic">${miniGlass('#a8434e', 'bordeaux')}</span>
          <strong>Blind tasting</strong><small>${wines.length ? `${wines.length} wine${wines.length === 1 ? '' : 's'} from your cellar` : 'Learn a wine first'}</small></button>
        <button class="pr-mode ${cur.mode === 'rules' ? 'on' : ''}" data-act="prmode" data-v="rules"><span class="pr-ic pr-book">§</span>
          <strong>Rules & labels</strong><small>${doneB().length ? `From ${doneB().length} Track B lesson${doneB().length === 1 ? '' : 's'}` : 'Finish a Track B lesson first'}</small></button>
      </div>
      ${cur.mode === 'rules' && areas[0][2].length ? `<p class="pr-label mono">Focus</p><div class="pr-areas">${areas.map(([k, t]) => `<button class="aroma ${cur.area === k ? 'on' : ''}" data-act="prarea" data-v="${esc(k)}">${t}</button>`).join('')}</div>` : ''}
      <p class="pr-label mono">Length</p>
      <div class="seg pr-len">${[5, 10, 20].map(n => `<button class="${cur.n === n ? 'on' : ''}" data-act="prlen" data-v="${n}">${n} questions</button>`).join('')}</div>
      <button class="primary pr-go" data-act="prstart" ${ready ? '' : 'disabled'}>Shuffle & start</button>
      ${cur.mode === 'taste' ? `<p class="pr-note">Identify wines from their clues, place them on a scale, pick their aromas. Wines you miss come back sooner in your cellar.</p>` : `<p class="pr-note">Shuffled questions from the lessons you've finished. Appellation rules covers the lessons checked against official texts.</p>`}
    </div>${tabbar('list')}`;
  }
  function startPractice() {
    const qs = practiceQuestions();
    if (!qs.length) { practicePage(); return; }
    const taste = S.practice.mode === 'taste';
    P = { kind: 'practice', id: 'practice', title: taste ? 'Blind tasting' : 'Rules & labels', tag: 'Practice', wine: taste ? '#a8434e' : '#7c5a8a',
      lesson: [], questions: qs, card: 0, i: 0, correct: 0, results: [], phase: 'practice' };
    setWine(P.wine); renderQ();
  }
  function finishPractice() {
    const n = scoredCount(), pct = Math.round((P.correct / n) * 100), now = Date.now();
    S.days[todayKey()] = (S.days[todayKey()] || 0) + 1;
    S.practice.rounds = (S.practice.rounds || 0) + 1;
    const missed = [...new Set(P.results.filter(r => !r.ok).flatMap(r => r.wines).filter(id => S.cellar[id]))];
    missed.forEach(id => { S.cellar[id].due = Math.min(S.cellar[id].due, now); });
    save(); pop(); buzz([20, 60, 20]);
    app.innerHTML = `<div class="player result" style="--fw:${P.wine}"><div class="tint"></div><div class="res">
      <p class="eyebrow">Practice · round ${S.practice.rounds}</p><h2>${P.title}</h2>
      <div class="big-ring">${ring(pct, P.wine, 200)}<div class="big-num"><strong>${pct}%</strong><span class="mono">${P.correct} of ${n} correct</span></div></div>
      ${missed.length ? `<div class="laid"><p class="mono">Coming back sooner in your cellar</p><p class="laid-names">${missed.map(id => D.wines[id].name).join(' · ')}</p></div>` : ''}
      <button class="primary" data-act="prstart">Another round</button>
      <button class="link-btn" data-act="go" data-h="#practice">Change practice</button>
    </div></div>`;
  }

  function route() {
    overlay.innerHTML = '';
    window.scrollTo(0, 0);
    const h = location.hash.slice(1);
    if (h.startsWith('unit-')) return startUnit(h.slice(5));
    P = null;
    if (h === 'roots' || h === 'list') { lastTab = h; S.learnView = h; save(); h === 'roots' ? roots() : wineList(); }
    else if (h === 'cellar') { lastTab = 'cellar'; cellar(); }
    else if (h === 'glass') { lastTab = 'glass'; glassPage(); }
    else if (h === 'journey') { lastTab = 'journey'; journey(); }
    else if (h === 'practice') { lastTab = 'practice'; practicePage(); }
    else { lastTab = 'home'; home(); }
  }
  window.addEventListener('hashchange', route);
  route();

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
