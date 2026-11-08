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
  const defaults = () => ({ days: {}, units: {}, cellar: {}, flights: {}, settings: { hemi: 'N', sound: true } });
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
  const TB = D.trackB;
  let gate = null;
  // Track B requires Topsoil (Track A, chapter 1). Only written units count, so the gate grows as Topsoil does.
  const TOPSOIL = UNITS.filter(r => r.track === 'A' && r.ci === 0);
  TB.intro.units.forEach((u, i) => { gate = add(u, { track: 'B', tag: `B0.${i + 1}`, wine: TB.wine, group: TB.intro.title, prev: gate, req: i ? null : TOPSOIL }); });
  TB.countries.forEach((c, k) => {
    let n = 0;
    c.regions.forEach(rg => {
      let p = gate;
      rg.units.forEach(u => { p = add(u, { track: 'B', tag: `B${k + 1}.${++n}`, wine: c.wine, group: `${c.name} · ${rg.name}`, country: c, region: rg, prev: p }); });
    });
  });
  const UNIT = Object.fromEntries(UNITS.map(r => [r.u.id, r]));
  // Draft units (rules not yet checked against official regulations) are only playable with ?drafts
  const DRAFTS = /[?&]drafts\b/.test(location.search) || !!S.settings.drafts;
  const playable = r => !!(r.u.questions && r.u.questions.length) && (!r.u.draft || DRAFTS);
  const done = r => !!S.units[r.u.id];
  const reqMet = r => !r.req || r.req.every(x => !playable(x) || done(x));
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
    const ids = [...new Set([...UNITS[0].u.questions, ...UNITS[1].u.questions].map(q => q.concept)), 'chablis', 'sancerre', 'nebbiolo', 'icewine'];
    ids.forEach((id, n) => {
      const stage = n % 6;
      let due = now + INTERVALS[stage] * DAY;
      if (n % 4 === 1) due = now - DAY;
      if (n === 6) due = now - 30 * DAY;
      S.cellar[id] = { stage, born: now - (20 + n * 5) * DAY, due, reviews: stage };
    });
    S.flights.loire = { best: 86, plays: 2 };
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


  /* ---------- tabs ---------- */
  const TAB_ICONS = {
    today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    roots: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 9V3.5M12 5.5c-1.8-2-4.2-1.8-5-1 1 .9 3 1.4 5 1M12 5.5c1.8-2 4.2-1.8 5-1-1 .9-3 1.4-5 1"/><path d="M3 9h18"/><path d="M12 9c0 4-1 6-3.5 8.5M12 9c0 4 1.2 6.5 3.8 9M12 12.5c-1.6.4-3.5.1-5.5-1.2M12 14c2 0 3.6-.8 5.5-2.3M8.5 17.5l-1.5 3M15.8 18l.8 2.6"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M8.5 6.5h7M8.5 10h4.5M8.5 13h5.5M8.5 16h3.5"/><path d="M15.5 10h.01M15.5 13h.01M15.5 16h.01" stroke-width="2.2"/></svg>',
    cellar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M10.2 2.5h3.6v4.8c0 1.6 2.7 2.4 2.7 5.2v8.2c0 .5-.4.8-.8.8H8.3c-.4 0-.8-.3-.8-.8v-8.2c0-2.8 2.7-3.6 2.7-5.2z"/><path d="M7.5 13.5h9v4.5h-9z"/></svg>',
  };
  function tabbar(active) {
    const ready = readyCount();
    return `<nav class="tabbar" aria-label="Main">${[['today', 'Today'], ['roots', 'Roots'], ['list', 'Wine list'], ['cellar', 'Cellar']].map(([id, l]) =>
      `<a href="#${id}" class="tab ${active === id ? 'on' : ''}" ${active === id ? 'aria-current="page"' : ''}>${TAB_ICONS[id]}<span>${l}</span>${id === 'cellar' && ready ? `<i class="badge-dot">${ready}</i>` : ''}</a>`).join('')}</nav>`;
  }

  /* ---------- TODAY tab ---------- */
  function today() {
    const se = season(), w = weather(), wk = week();
    const active = wk.filter(d => S.days[d.k]).length;
    const nx = nextUnit('A'), nb = nextUnit('B'), ready = readyCount();
    const flights = D.flights.slice().sort((a, b) => (b.seasonal?.includes(se.stage) ? 1 : 0) - (a.seasonal?.includes(se.stage) ? 1 : 0));
    const readyBottles = Object.entries(S.cellar).filter(([, e]) => bottleState(e) !== 'resting').slice(0, 3);
    setWine('#7b2a2a');
    app.innerHTML = `<div class="tabview today">
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
          <div class="vintage-head"><span class="mono">VINTAGE · WK ${weekNo()}</span><span class="vintage-rating">${VINTAGE[active]}</span></div>
          <div class="week">${wk.map(d => `<span class="day ${S.days[d.k] ? 'on' : ''} ${d.future ? 'future' : ''} ${d.today ? 'today' : ''}"></span>`).join('')}</div>
          <p class="wx-text">${WEATHER_TEXT[w]}</p>
        </div>
        ${vineSVG(se.stage)}
      </section>
      <section class="today-body">
        ${nextCard(nx)}
        ${chapterStrip(nx)}
        ${nb ? `<p class="zone-label mono">Track B · The wine list</p>${nextCard(nb)}` : ''}
        ${ready ? `<button class="cellar-nudge" data-act="go" data-h="#cellar">
          <span class="cn-bottles">${readyBottles.map(([id, e]) => bottleSVG(id, e)).join('')}</span>
          <span class="cn-text"><strong>${ready} bottle${ready === 1 ? '' : 's'} ready to taste</strong><span>Two minutes in the cellar keeps what you've learned from fading.</span></span>
        </button>` : ''}
        <p class="zone-label mono">Tasting specials</p>
        ${flights.map(f => {
          const rec = S.flights[f.id], inSeason = f.seasonal?.includes(se.stage);
          return `<button class="flight-card ${inSeason ? 'in-season' : ''}" data-act="go" data-h="#flight-${f.id}" style="--fw:${f.wine}">
            <span class="fc-ring">${ring(rec ? rec.best : 0, f.wine, 52, rec ? rec.best + '%' : '')}</span>
            <span class="fc-text">${inSeason ? '<span class="badge">In season</span>' : ''}<strong>${f.title}</strong><span>${f.sub}</span></span>
            <span class="swatch"></span>
          </button>`;
        }).join('')}
      </section>
    </div>${tabbar('today')}`;
  }

  function nextCard(r) {
    if (!r) return `<div class="next-card soon"><span class="mono nc-eyebrow">Grand Cru</span><span class="nc-title">You've finished the syllabus.</span></div>`;
    const st = unitState(r), u = r.u, home = r.track === 'A' ? '#roots' : '#list';
    const small = r.track === 'B' ? ' small' : '';
    if (st === 'locked' && !reqMet(r)) return `<button class="next-card soon${small}" data-act="go" data-h="#roots" style="--cw:${r.wine}">
      <span class="mono nc-eyebrow">Opens after ${reqText()} · ${r.group}</span>
      <span class="nc-title"><em>${label(r)}</em> ${u.title}</span>
      <span class="nc-sub">Label reading builds on tasting words like "high acidity" and "full body". Finish Topsoil in Track A and the Wine List opens.</span>
    </button>`;
    if (st !== 'current') return `<button class="next-card soon${small}" data-act="go" data-h="${home}" style="--cw:${r.wine}">
      <span class="mono nc-eyebrow">Coming soon · ${r.group}</span>
      <span class="nc-title"><em>${label(r)}</em> ${u.title}</span>
      <span class="nc-sub">This unit is still being poured. In the meantime, try a tasting special or rescue a few bottles in your cellar.</span>
    </button>`;
    return `<button class="next-card${small}" data-act="go" data-h="#unit-${u.id}" style="--cw:${r.wine}">
      <span class="mono nc-eyebrow">${doneCount(r.track) ? 'Up next' : 'Start here'} · ${r.group}</span>
      <span class="nc-title"><em>${label(r)}</em> ${u.title}</span>
      <span class="nc-sub">${u.sub}</span>
      <span class="mono nc-meta">${(u.lesson || []).length ? `Lesson ${u.lesson.length} cards · ` : ''}Tasting ${u.questions.length} questions · ~${minutes(u)} min</span>
      <span class="nc-cta">Start lesson <span aria-hidden="true">→</span></span>
    </button>`;
  }

  function chapterStrip(r) {
    const ref = r || UNITS.filter(x => x.track === 'A').pop(), us = UNITS.filter(x => x.track === 'A' && x.ci === ref.ci);
    return `<button class="ch-strip" data-act="go" data-h="#roots">
      <span class="mono">Chapter ${ref.ci + 1} · ${ref.ch.title}</span>
      <span class="ch-dots">${us.map(x => `<i class="${unitState(x)}"></i>`).join('')}</span>
      <span class="mono">${us.filter(done).length}/${us.length}</span>
    </button>`;
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
        <p class="eyebrow">Track A · How wine works</p>
        <h1>Six strata, ${trackCount('A')} units</h1>
        <p>Each chapter sits on the one before it. Every unit is a short lesson followed by a tasting. Your root grows down through the soil as you finish them.</p>
        <div class="roots-stats mono"><span><strong>${doneCount()}</strong> units done</span><span>Deepest: <strong>${deepest ? label(deepest) : '—'}</strong></span><span>In: <strong>${D.strata[(nextUnit('A') || UNITS.filter(x => x.track === 'A').pop()).ci].name}</strong></span></div>
      </header>
      <div class="vine-top">${vineSVG(season().stage)}</div>
      ${chaptersHTML}
      <p class="foot mono">Bedrock · more to come</p>
    </div>${tabbar('roots')}`;
    if (scroll) requestAnimationFrame(() => {
      const cur = app.querySelector('.node.current:not(.checkpoint)');
      if (cur && doneCount()) cur.scrollIntoView({ block: 'center' });
    });
  }

  /* ---------- WINE LIST tab: Track B, set like a restaurant list ---------- */
  function wineList(scroll = true) {
    setWine(TB.wine);
    const entry = r => {
      const s = unitState(r), rec = S.units[r.u.id];
      const status = s === 'done' ? ring(rec.best, r.wine, 34, '✓') : s === 'current' ? '<span class="wl-pour">Pour</span>' : s === 'soon' ? `<span class="mono wl-soon">${r.u.draft ? 'draft' : 'soon'}</span>` : '<span class="mono wl-soon">—</span>';
      return `<li><button class="wl-entry ${s}" data-act="preview" data-id="${r.u.id}">
        <span class="wl-tag mono">${label(r)}</span>
        <span class="wl-name">${r.u.title}${r.u.sub ? `<small>${r.u.sub}</small>` : ''}</span>
        <span class="wl-leader"></span>
        <span class="wl-status">${status}</span>
      </button></li>`;
    };
    const B = UNITS.filter(r => r.track === 'B');
    const section = (title, rs, sub) => `<section class="wl-card">
      <h2 class="wl-country">${title}</h2>${sub ? `<p class="wl-sub">${sub}</p>` : ''}
      ${rs}
    </section>`;
    const introRs = `<ul class="wl-entries">${B.filter(r => r.group === TB.intro.title).map(entry).join('')}</ul>`;
    const countries = TB.countries.map(c => section(c.name, c.regions.map(rg => `<h3 class="wl-region">${rg.name}</h3><ul class="wl-entries">${B.filter(r => r.region === rg).map(entry).join('')}</ul>`).join(''))).join('');
    app.innerHTML = `<div class="tabview winelist">
      <header class="wl-head">
        <p class="eyebrow">Track B · Reading the label</p>
        <h1>The Wine List</h1>
        <p>Every lesson starts from a label and works outwards: appellation, then grapes, then the rules, then the taste.</p>
        <div class="roots-stats mono"><span><strong>${doneCount('B')}</strong> of ${trackCount('B')} poured</span><span>Start with <strong>B0</strong>, then any region</span></div>
      </header>
      ${section('Before you order', introRs, reqMet(UNIT['b0-1']) ? 'How labels work. Finish these three to open the whole list.' : `Opens once you've finished ${reqText()} in Track A. Then finish these three to open the whole list.`)}
      ${countries}
      <p class="foot mono">Rules are checked against each region's official regulations before a unit is poured</p>
    </div>${tabbar('list')}`;
    if (scroll && doneCount('B')) requestAnimationFrame(() => app.querySelector('.wl-entry.current')?.scrollIntoView({ block: 'center' }));
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
        <li><span class="mono">3 · From your cellar</span>One bottle from an earlier unit, to keep it fresh</li>
      </ol>` : ''}
      ${rec ? `<p class="mono resting-note">Best ${rec.best}% · poured ${rec.plays}×</p>` : ''}
      ${u.draft ? `<div class="draft-box"><p class="mono">Draft · rules not yet checked</p>${u.toCheck && u.toCheck.length ? `<p>To check against ${esc(u.sources.join(' and '))}:</p><ul>${u.toCheck.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>To check against ${esc(u.sources.join(' and '))}.</p>`}</div>`
        : u.checked ? `<div class="checked-box"><p class="mono">✓ Rules checked ${u.checked}</p><p>Against: ${esc(u.sources.join('; '))}.</p>${u.note ? `<p class="note">${esc(u.note)}</p>` : ''}</div>` : ''}
      ${s === 'current' || s === 'done' ? `<button class="primary" data-act="go" data-h="#unit-${id}">${s === 'done' ? 'Pour it again' : 'Start lesson'}</button>`
        : s === 'locked' && !reqMet(r) ? `<p class="mono resting-note">Locked · finish ${reqText()} in Track A first</p><button class="primary" data-act="go" data-h="#roots">Go to Topsoil</button>`
        : s === 'locked' ? `<p class="mono resting-note">Locked · finish ${label(prev)} ${prev.u.title} first</p>`
        : u.draft && u.questions ? `<p class="mono resting-note">Written, waiting for the rule check before it's poured</p>`
        : `<p class="mono resting-note">${r.track === 'B' ? 'Still being poured · written once its rules are checked against the official regulations' : 'Still being poured · this unit is planned but not written yet'}</p>`}
    </div></div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
  }

  const gearIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>`;
  const closeIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

  /* ---------- player: unit (lesson → tasting) or special flight ---------- */
  let P = null;
  const scoredCount = () => P.questions.filter(q => q.type !== 'recall').length;
  function recallPick(exclude) {
    const es = Object.entries(S.cellar).filter(([id]) => !exclude.has(id));
    if (!es.length) return null;
    const due = es.filter(([, e]) => bottleState(e) !== 'resting');
    return pick(due.length ? due : es)[0];
  }
  function startUnit(id) {
    const r = UNIT[id];
    if (!r || !playable(r) || !(unlocked(r) || done(r))) { location.hash = r && r.track === 'B' ? '#list' : '#roots'; return; }
    const qs = r.u.questions.slice();
    const rc = recallPick(new Set(qs.map(q => q.concept)));
    if (rc) qs.splice(qs.length - 1, 0, { type: 'recall', concept: rc });
    P = { kind: 'unit', r, id, title: r.u.title, tag: `Unit ${label(r)}`, wine: r.wine, lesson: r.u.lesson || [], questions: qs, card: 0, i: 0, correct: 0, results: [], phase: 'lesson' };
    setWine(P.wine);
    if (P.lesson.length) renderLesson(); else renderQ();
  }
  function startFlight(id) {
    const f = D.flights.find(x => x.id === id);
    if (!f) { location.hash = '#today'; return; }
    P = { kind: 'flight', f, id, title: f.title, tag: 'Tasting special', wine: f.wine, questions: f.questions, i: 0, correct: 0, results: [], phase: 'practice' };
    setWine(P.wine);
    renderQ();
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
        <p>${n} questions on what you just learned${rc ? ', plus one bottle from your cellar to keep it fresh' : ''}. You'll sort, place things on scales, put things in order and pick answers.</p>
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
        <div class="p-title"><span class="mono">${P.kind === 'unit' ? 'The Taste' : P.tag} · ${P.i + 1} of ${P.questions.length}</span><strong>${P.title}</strong></div>
        ${ring(pct, P.wine, 44)}
      </header>
      ${draftBanner()}<div class="q-body">${inner}</div>
    </div>`;
  }

  const TYPE_LABEL = { odd: 'Odd one out', chain: 'Label → appellation → grape → taste', choice: 'Question', blind: 'Blind · mystery glass', label: 'Label decoder', order: 'Put in order', sort: 'Sort it', slider: 'Place it on the scale', recall: 'From your cellar' };
  function renderQ() {
    const q = P.questions[P.i];
    P.locked = false; P.phase = 'practice';
    const title = q.type === 'recall' ? D.concepts[q.concept].q : q.q;
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
      <p class="blind-score mono">Clues so far: <strong class="pts">1 of ${q.clues.length}</strong> · the earlier you call it, the better</p>
      <div class="options grid2">${P.blindOpts.map(i => `<button class="opt" data-act="guess" data-i="${i}">${q.options[i]}</button>`).join('')}</div>
    </div>`;
  }

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

  /* Recall a bottle from the cellar (not scored; ages the bottle) */
  function recallUI(q) {
    const c = D.concepts[q.concept], e = S.cellar[q.concept];
    return `<div class="recall" style="--fw:${c.wine}">
      <div class="r-bottle">${bottleSVG(q.concept, e)}</div>
      <p class="mono r-name">${c.name} · ${c.kind}</p>
      <p class="hint mono">Answer in your head, then pour.</p>
      <div class="review-a" hidden><p>${c.a}</p></div>
      <button class="primary" data-act="rpeek">Pour (reveal answer)</button>
      <div class="judge" hidden><button class="opt" data-act="rjudge" data-ok="0">I'd forgotten</button><button class="primary" data-act="rjudge" data-ok="1">I knew it</button></div>
    </div>`;
  }

  /* Answer & feedback */
  function answer(ok, correction) {
    if (P.locked) return;
    P.locked = true;
    const q = P.questions[P.i];
    if (ok) { P.correct++; clink(); buzz(15); } else { thud(); buzz([30, 40, 30]); }
    P.results.push({ concept: q.concept, ok });
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
    const n = scoredCount(), pct = Math.round((P.correct / n) * 100), now = Date.now();
    S.days[todayKey()] = (S.days[todayKey()] || 0) + 1;
    let first = false;
    const store = P.kind === 'unit' ? S.units : S.flights;
    const rec = store[P.id];
    first = !rec;
    store[P.id] = { best: Math.max(rec ? rec.best : 0, pct), plays: (rec ? rec.plays : 0) + 1 };
    const laid = [], seen = new Set();
    P.results.forEach(({ concept, ok }) => {
      if (seen.has(concept)) return; seen.add(concept);
      const e = S.cellar[concept];
      if (!e) { S.cellar[concept] = { stage: 0, born: now, due: ok ? now + INTERVALS[0] * DAY : now, reviews: 0 }; laid.push(concept); }
      else if (!ok) e.due = Math.min(e.due, now);
    });
    save();
    pop(); buzz([20, 60, 20]);
    let unlock = '', nextBtn = '';
    if (P.kind === 'unit') {
      const cand = UNITS[P.r.n + 1], nx = cand && cand.track === P.r.track ? cand : null;
      const home = P.r.track === 'A' ? '#roots' : '#list', homeName = P.r.track === 'A' ? 'Back to your roots' : 'Back to the wine list';
      if (first && nx) {
        const newStratum = nx.track === 'A' && nx.ci !== P.r.ci;
        unlock = `<div class="unlock"><span class="mono">${newStratum ? 'New stratum reached' : 'Your roots grew'}</span>
          <strong>${newStratum ? D.strata[nx.ci].name + ': ' + nx.ch.title : `${label(nx)} ${nx.u.title}`}</strong>
          <p>${playable(nx) ? (newStratum ? D.strata[nx.ci].fact : nx.u.sub) : 'The next unit is still being poured. It\'s planned in the syllabus but not written yet.'}</p></div>`;
      }
      if (nx && playable(nx) && unlocked(nx)) nextBtn = `<button class="primary" data-act="go" data-h="#unit-${nx.u.id}">Next: ${label(nx)} ${nx.u.title}</button><button class="link-btn" data-act="go" data-h="${home}">${homeName}</button>`;
      else nextBtn = `<button class="primary" data-act="go" data-h="${home}">${homeName}</button>`;
    }
    if (!nextBtn) nextBtn = `<button class="primary" data-act="go" data-h="#today">Back to the vineyard</button>`;
    app.innerHTML = `<div class="player result" style="--fw:${P.wine}">
      <div class="tint"></div>
      <div class="res">
        <p class="eyebrow">${P.kind === 'unit' ? P.tag + ' complete' : 'Flight complete'}</p>
        <h2>${P.title}</h2>
        <div class="big-ring">${ring(pct, P.wine, 200)}<div class="big-num"><strong>${pct}%</strong><span class="mono">${P.correct} of ${n} correct</span></div></div>
        <div class="res-stats">
          <div><span class="mono">Weather</span><strong>Sunny</strong></div>
          <div><span class="mono">New bottles</span><strong>${laid.length}</strong></div>
          <div><span class="mono">Best</span><strong>${store[P.id].best}%</strong></div>
        </div>
        ${unlock}
        ${laid.length ? `<div class="laid"><p class="mono">Laid down in your cellar</p><div class="rack small">${laid.map(id => bottleSVG(id, S.cellar[id])).join('')}</div></div>` : ''}
        ${nextBtn}
        <button class="link-btn" data-act="replay">Pour this again</button>
      </div>
    </div>`;
    window.scrollTo(0, 0);
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
      <header class="tab-head">
        <p class="eyebrow">${entries.length} bottles laid down</p>
        <h1>The Cellar</h1>
      </header>
      <p class="cellar-intro">Every bottle is something you know. Taste a <em>ready</em> bottle to age it: the more often you remember it, the dustier and older it gets. Leave one too long and it turns <em>corked</em>, but one good tasting brings it back.</p>
      <div class="legend mono"><span class="lg ready">${counts.ready} ready</span><span class="lg corked">${counts.corked} corked</span><span class="lg resting">${counts.resting} resting</span></div>
      ${entries.length ? rows.map(r => `<div class="shelf">${r.map(([id, e]) => `<button class="slot-b" data-act="bottle" data-id="${id}">${bottleSVG(id, e)}<span class="mono">${bottleState(e) === 'resting' ? restLabel(e) : bottleState(e)}</span></button>`).join('')}</div>`).join('')
        : `<div class="empty-cellar">${BOTTY}<p>Nothing laid down yet. Finish your first unit and its ideas will appear here as bottles.</p><button class="primary" data-act="go" data-h="#today">Start learning</button></div>`}
    </div>${tabbar('cellar')}`;
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
  const closeModal = () => {
    overlay.innerHTML = '';
    const h = location.hash.slice(1) || 'today';
    if (h === 'cellar') cellar(); else if (h === 'roots') roots(false); else if (h === 'list') wineList(false); else if (h === 'today') today();
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
      <p class="set-note">The sky, vine and seasonal specials follow the vineyard calendar of your hemisphere.</p>
      <p class="set-label mono">SOUND</p>
      <div class="seg">${[true, false].map(v => `<button class="${S.settings.sound === v ? 'on' : ''}" data-act="sound" data-v="${v}">${v ? 'Clinks on' : 'Silent'}</button>`).join('')}</div>
      <p class="set-label mono">DRAFT LESSONS</p>
      <div class="seg">${[false, true].map(v => `<button class="${!!S.settings.drafts === v ? 'on' : ''}" data-act="drafts" data-v="${v}">${v ? 'Preview drafts' : 'Hide drafts'}</button>`).join('')}</div>
      <p class="set-note">Drafts are written lessons whose rules haven't yet been checked against the official regulations (e.g. Champagne). Previewing unlocks them and shows a draft banner.</p>
      <p class="set-label mono">PROGRESS</p>
      <button class="link-btn danger" data-act="reset">Pour it all away (reset)</button>
    </div></div>`;
    overlay.querySelector('.modal').addEventListener('click', ev => { if (ev.target.classList.contains('modal')) closeModal(); });
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
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const act = b.dataset.act;
    const q = P && P.questions && P.questions[P.i];
    switch (act) {
      case 'go': go(b.dataset.h); break;
      case 'preview': preview(b.dataset.id); break;
      case 'checkpoint': ask('Checkpoint tastings', 'At the end of each chapter there will be a longer mixed tasting with a blind finale. Pass it to break through to the next stratum. Coming soon.', 'Lovely', () => {}); break;
      case 'quit': {
        const back = P && P.kind === 'flight' ? '#today' : '#' + lastTab;
        const started = P && ((P.phase === 'lesson' && P.card > 0) || P.phase === 'interlude' || (P.phase === 'practice' && P.i > 0));
        if (started) ask('Leave this unit?', 'Your progress in it won\'t be saved.', 'Leave', () => go(back)); else go(back);
        break;
      }
      case 'replay': go(`#${P.kind}-${P.id}`); break;
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
      case 'rjudge': ageBottle(q.concept, b.dataset.ok === '1'); next(); break;
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
      case 'hemi': S.settings.hemi = b.dataset.h; save(); today(); settings(); break;
      case 'drafts': S.settings.drafts = b.dataset.v === 'true'; save(); location.reload(); break;
      case 'sound': S.settings.sound = b.dataset.v === 'true'; save(); settings(); if (S.settings.sound) clink(); break;
      case 'reset': ask('Pour it all away?', 'Your cellar, roots and vintages will be emptied. This can\'t be undone.', 'Reset everything', () => { S = defaults(); save(); go('#today'); }); break;
    }
  });

  let lastTab = 'today';
  function route() {
    overlay.innerHTML = '';
    window.scrollTo(0, 0);
    const h = location.hash.slice(1);
    if (h.startsWith('unit-')) return startUnit(h.slice(5));
    if (h.startsWith('flight-')) return startFlight(h.slice(7));
    P = null;
    if (h === 'roots') { lastTab = 'roots'; roots(); }
    else if (h === 'cellar') { lastTab = 'cellar'; cellar(); }
    else if (h === 'list') { lastTab = 'list'; wineList(); }
    else { lastTab = 'today'; today(); }
  }
  window.addEventListener('hashchange', route);
  route();

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
