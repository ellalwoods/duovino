/* Artwork: the living sky (season × time of day), region postcards, and the Journey maps. Pure SVG strings. */
(() => {
  const D = window.DUOVINO;
  let uid = 0;
  const mix = (a, b, t) => {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const [x, y] = [p(a), p(b)];
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };

  /* ---------- time of day ---------- */
  const timeOfDay = (h = new Date().getHours()) => h >= 5 && h < 9 ? 'dawn' : h >= 9 && h < 17 ? 'day' : h >= 17 && h < 20 ? 'sunset' : 'blue';
  const TIMES = {
    dawn: { sky: ['#f9d9cf', '#fbe6d2', '#fdf1de'], glow: '#ffe7c4', sun: { x: 300, y: 380, r: 30, c: '#fff1d6' }, tint: '#f6c8bd', tintAmt: 0.18 },
    day: { sky: ['#b9d6e8', '#d9e9ef', '#f5f0dd'], glow: '#fff6dc', sun: { x: 290, y: 150, r: 30, c: '#fff8e4' }, tint: '#ffffff', tintAmt: 0 },
    sunset: { sky: ['#f3a07a', '#f8c48d', '#fde0aa'], glow: '#ffd28a', sun: { x: 110, y: 410, r: 36, c: '#fff0c8' }, tint: '#e9a07e', tintAmt: 0.22 },
    blue: { sky: ['#9fa6cc', '#c4bcd8', '#ead3d6'], glow: '#f6e6ef', sun: { x: 290, y: 150, r: 18, c: '#fffaf0' }, moon: true, stars: true, tint: '#9c9ab8', tintAmt: 0.45 },
  };
  /* ---------- season ---------- */
  const SEASON_LOOK = {
    dormant: { hills: ['#d8d0d2', '#c9c3bd', '#b9b1a8', '#a99e93'], leaves: [], grapes: null },
    bud: { hills: ['#d9d6c6', '#cfdcb8', '#bfcf9e', '#abc187'], leaves: ['#c2d98b', '#d4e4a3'], small: true, grapes: null },
    leaf: { hills: ['#d4dcc4', '#c4d5aa', '#b0c78d', '#9cb877'], leaves: ['#9ab960', '#b4cd7c', '#a9c56f', '#8faf58'], grapes: null },
    flower: { hills: ['#d4dcc4', '#c4d5aa', '#b0c78d', '#9cb877'], leaves: ['#9ab960', '#b4cd7c', '#a9c56f', '#8faf58'], grapes: null },
    fruit: { hills: ['#d6dcbf', '#c6d4a2', '#b2c585', '#9db46f'], leaves: ['#8faf58', '#a9c56f', '#9ab960'], grapes: '#a9bf63' },
    veraison: { hills: ['#ddd6bd', '#cdd09e', '#b9c07f', '#a3ae69'], leaves: ['#8faf58', '#a9c56f', '#b8b05a'], grapes: '#7a3a5a' },
    harvest: { hills: ['#e6c9a6', '#d4b88c', '#bea073', '#a6875d'], leaves: ['#d39a2d', '#e0b84b', '#a9b04f', '#c06a34'], grapes: '#5a1d3e' },
    fall: { hills: ['#e2bfa4', '#cfa98a', '#b8906d', '#a07a58'], leaves: ['#d39a2d', '#b9502c', '#e0b84b', '#a8562d'], grapes: null },
  };

  function sky(stage, time) {
    const t = TIMES[time], L = SEASON_LOOK[stage] || SEASON_LOOK.leaf, id = 's' + (++uid);
    const hills = L.hills.map(c => mix(c, t.tint, t.tintAmt));
    const rowCol = mix(hills[3], '#4a3a30', 0.35);
    const stars = t.stars ? Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 97) % 390}" cy="${(i * 53) % 330 + 8}" r="${i % 5 ? .8 : 1.4}" fill="#fff" opacity="${.35 + (i % 4) * .15}"/>`).join('') : '';
    const rows = (cy, n, w) => Array.from({ length: n }, (_, i) => { const k = i - (n - 1) / 2; return `<path d="M${195 + k * 110} 800 Q${195 + k * 40} ${cy + 80} ${195 + k * 12} ${cy}" stroke="${rowCol}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity=".5"/>`; }).join('');
    const leaf = (x, y, r, c, s) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0C-3-2-9-3-10-8-6-8-7-12-4-14-2-11 0-12 0-17 0-12 2-11 4-14 7-12 6-8 10-8 9-3 3-2 0 0Z" fill="${mix(c, t.tint, t.tintAmt * .6)}"/>`;
    const vine = (x, flip) => {
      const d = flip ? -1 : 1, trunk = mix('#7a5a42', t.tint, t.tintAmt * .5);
      let g = `<path d="M${x} 790 C${x + 8 * d} 740 ${x} 700 ${x + 30 * d} 680" stroke="${trunk}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      const n = L.small ? 4 : L.leaves.length ? 7 : 0;
      for (let i = 0; i < n; i++) g += leaf(x + d * (10 + (i * 23) % 70), 690 - (i * 17) % 60, (i * 47) % 360, L.leaves[i % L.leaves.length], L.small ? 1.1 : 2.2);
      if (L.grapes) for (let i = 0; i < 9; i++) g += `<circle cx="${x + 28 * d + (i % 3) * 7 - 7}" cy="${712 + Math.floor(i / 3) * 7}" r="4" fill="${L.grapes}"/>`;
      if (!n) g += `<path d="M${x + 30 * d} 680 l${12 * d} -14 M${x + 30 * d} 680 l${18 * d} -4" stroke="${trunk}" stroke-width="3" stroke-linecap="round"/>`;
      return g;
    };
    return `<svg class="scene" viewBox="0 0 390 780" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="k${id}" x1="0" y1="0" x2="0" y2="1">${t.sky.map((c, i) => `<stop offset="${i / (t.sky.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient>
        <radialGradient id="g${id}"><stop offset="0" stop-color="${t.glow}" stop-opacity=".9"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
        ${[0, 1, 2].map(i => `<linearGradient id="h${i}${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hills[i]}"/><stop offset="1" stop-color="${hills[i + 1]}"/></linearGradient>`).join('')}
      </defs>
      <rect width="390" height="780" fill="url(#k${id})"/>
      ${stars}
      <circle cx="${t.sun.x}" cy="${t.sun.y}" r="170" fill="url(#g${id})"/>
      <circle cx="${t.sun.x}" cy="${t.sun.y}" r="${t.sun.r}" fill="${t.sun.c}"/>
      ${t.moon ? `<circle cx="${t.sun.x + 9}" cy="${t.sun.y - 6}" r="${t.sun.r}" fill="${t.sky[1]}"/>` : ''}
      <path d="M0 470 C70 440 140 452 210 432 C280 412 340 436 390 426 V780 H0Z" fill="url(#h0${id})" opacity=".9"/>
      <path d="M0 515 C110 482 210 506 390 476 V780 H0Z" fill="url(#h1${id})"/>
      ${rows(508, 13, 1.6)}
      <path d="M0 600 C120 568 250 590 390 556 V780 H0Z" fill="url(#h2${id})"/>
      ${rows(585, 9, 4)}
      ${vine(-6, false)}${vine(396, true)}
    </svg>`;
  }

  /* ---------- postcards: unlocked by finishing a region ---------- */
  const POSTCARD_ART = {
    champagne: (id) => `
      <defs><linearGradient id="c${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6efdc"/><stop offset="1" stop-color="#efe3c4"/></linearGradient></defs>
      <rect width="390" height="780" fill="url(#c${id})"/><circle cx="285" cy="250" r="60" fill="#fff3d0" opacity=".7"/><circle cx="285" cy="250" r="24" fill="#fff8e6"/>
      <path d="M0 450 C120 405 240 440 390 395 V780 H0Z" fill="#ece5d1"/>
      <path d="M0 470 C120 430 240 460 390 420 L390 446 C240 486 120 456 0 496Z" fill="#f8f4ea" opacity=".9"/>
      <path d="M0 540 C140 500 260 530 390 486 V780 H0Z" fill="#cfd8a8"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${-80 + i * 48} 780 Q${30 + i * 30} 620 ${110 + i * 16} 520" stroke="#a3b26e" stroke-width="3" fill="none" opacity=".6"/>`).join('')}
      <path d="M300 430 v-36 h8 v36 M296 394 l8 -12 l8 12Z" fill="#d8cdb5"/>`,
    mosel: (id) => `
      <rect width="390" height="780" fill="#e3ebee"/><circle cx="300" cy="170" r="90" fill="#fff8e6" opacity=".8"/>
      <path d="M0 180 L190 110 L230 660 L0 720Z" fill="#7f8b6c"/>
      ${Array.from({ length: 15 }, (_, i) => `<path d="M0 ${210 + i * 34} L${200 + i * 2} ${140 + i * 34}" stroke="#a9b88c" stroke-width="3" opacity=".75"/>`).join('')}
      <path d="M390 330 L260 360 L300 620 L390 600Z" fill="#9aa684" opacity=".8"/>
      <path d="M170 780 C210 600 260 520 390 470 V560 C300 600 270 680 262 780Z" fill="#a9c2cf"/>
      ${[[250, 520], [262, 512], [274, 516]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="10" fill="#f6f0e4"/><path d="M${x - 1} ${y} l6 -6 l6 6Z" fill="#7a5a5a"/>`).join('')}`,
    santorini: (id) => `
      <defs>
        <linearGradient id="s${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4b49e"/><stop offset=".6" stop-color="#fbd3ae"/><stop offset="1" stop-color="#fde6c6"/></linearGradient>
        <linearGradient id="w${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b5cfd9"/><stop offset="1" stop-color="#86aec6"/></linearGradient>
        <linearGradient id="r${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98f78"/><stop offset=".35" stop-color="#e7c7a8"/><stop offset=".5" stop-color="#9b6a5c"/><stop offset=".75" stop-color="#c4927c"/><stop offset="1" stop-color="#8a6458"/></linearGradient>
      </defs>
      <rect width="390" height="780" fill="url(#s${id})"/>
      <circle cx="300" cy="392" r="120" fill="#ffe0b4" opacity=".55"/><circle cx="300" cy="392" r="26" fill="#fff2d8"/>
      <path d="M190 400 C220 384 250 386 280 392 C320 380 360 386 390 394 V402 H190Z" fill="#b9a6b4" opacity=".75"/>
      <rect y="400" width="390" height="380" fill="url(#w${id})"/>
      <path d="M-10 250 C40 246 90 250 130 262 C160 272 175 300 186 340 C198 384 196 430 180 470 L170 780 H-10Z" fill="url(#r${id})"/>
      ${[[0,240],[22,236],[44,238],[66,240],[88,246],[108,252],[126,260],[12,254],[56,254],[98,262],[34,268],[76,266]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="${i % 3 ? 18 : 22}" height="13" rx="2" fill="#fffaf2"/>${i % 5 === 2 ? `<path d="M${x + 3} ${y} a7 7 0 0 1 14 0Z" fill="#5f8fc0"/>` : ''}`).join('')}
      <path d="M150 780 C170 700 250 660 390 650 V780Z" fill="#d9c3a2"/>
      ${[[220,712],[285,690],[350,682],[250,752],[325,742]].map(([x, y]) => `<circle cx="${x}" cy="${y - 4}" r="13" fill="none" stroke="#7c9a4e" stroke-width="5"/><circle cx="${x}" cy="${y - 4}" r="6" fill="none" stroke="#9db86a" stroke-width="4"/>`).join('')}`,
    mendoza: (id) => `
      <defs><linearGradient id="m${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfdcec"/><stop offset="1" stop-color="#f1e6dc"/></linearGradient></defs>
      <rect width="390" height="780" fill="url(#m${id})"/>
      <path d="M0 360 L70 250 L120 300 L200 180 L270 280 L330 220 L390 290 V460 H0Z" fill="#b8aabb"/>
      <path d="M70 250 L92 280 L50 282Z M200 180 L232 226 L170 226Z M330 220 L352 250 L310 250Z" fill="#fffaf2"/>
      <path d="M0 470 C120 450 260 460 390 440 V780 H0Z" fill="#cdb995"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${-80 + i * 48} 780 Q${30 + i * 30} 600 ${110 + i * 16} 465" stroke="#7f8f4e" stroke-width="3" fill="none" opacity=".6"/>`).join('')}
      ${[60, 330].map(x => `<path d="M${x} 470 v-90" stroke="#8c9a6a" stroke-width="5"/><ellipse cx="${x}" cy="370" rx="12" ry="34" fill="#9aa86e"/>`).join('')}`,
  };
  /* ---------- generated postcards: one landscape per region, built from painted pieces ---------- */
  const PAL = {
    soft: ['#f6e3d8', '#f4e2cf', '#fbefdf'], sunny: ['#b9d6e8', '#d9e9ef', '#f6efd8'], warm: ['#f4b49e', '#fbd3ae', '#fde6c6'],
    golden: ['#f2c48f', '#f8dcae', '#fdecce'], cool: ['#cddbe5', '#e2eaee', '#f2efe6'], misty: ['#e2e3e1', '#ecebe6', '#f6f2e9'],
    lavender: ['#c9c3dd', '#e2d3df', '#f4e2d6'], winter: ['#d5dfea', '#e8edf2', '#f7f5f1'],
  };
  const HUE = {
    green: ['#d5ddb4', '#c2d19a', '#adc386', '#98b273'], golden: ['#ecd7a6', '#dfc48e', '#d0b077', '#bf9c62'],
    red: ['#e8c3a2', '#dcab86', '#cc9670', '#b9815c'], brown: ['#e0cbab', '#d0b48f', '#bf9e77', '#ab8a63'],
    grey: ['#e6e3dc', '#d6d1c6', '#c4bdb0', '#b1a999'],
  };
  const P_ = {
    house: (x, y, s, roof = '#c27a5c', wall = '#fbf4e6') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-9" y="-12" width="18" height="12" fill="${wall}"/><path d="M-11 -12 L0 -20 L11 -12Z" fill="${roof}"/></g>`,
    village: (x, y, s, roof) => [[-26, 4, .8], [-10, 0, 1], [8, 3, .9], [24, 6, .75], [-2, 10, .85]].map(([dx, dy, k]) => P_.house(x + dx * s, y + dy * s, s * k, roof === 'grey' ? '#8d8a94' : '#c27a5c')).join(''),
    whitehouses: (x, y, s) => [[-24, 0], [-8, -4], [8, 0], [22, -3], [-14, 8], [4, 8]].map(([dx, dy]) => `<rect x="${x + dx * s}" y="${y + dy * s}" width="${14 * s}" height="${10 * s}" fill="#fffaf2"/>`).join(''),
    spire: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-16" width="20" height="16" fill="#efe6d4"/><rect x="-4" y="-34" width="8" height="18" fill="#e7dcc6"/><path d="M-5 -34 L0 -56 L5 -34Z" fill="#8a7f86"/></g>`,
    campanile: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-60" width="10" height="60" fill="#e9c9a8"/><rect x="-6" y="-66" width="12" height="6" fill="#d7b08c"/><path d="M-6 -66 L0 -76 L6 -66Z" fill="#b9805e"/></g>`,
    tower: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-40" width="12" height="40" fill="#e6dcc8"/>${[-6, -2, 2].map(d => `<rect x="${d}" y="-44" width="3" height="4" fill="#e6dcc8"/>`).join('')}</g>`,
    castle: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-18" y="-18" width="36" height="18" fill="#ddd2bf"/><rect x="-24" y="-30" width="10" height="30" fill="#e6dcc8"/><rect x="14" y="-26" width="10" height="26" fill="#e6dcc8"/>${[-24, -20, -16, 14, 18, 22].map(d => `<rect x="${d}" y="${d < 0 ? -33 : -29}" width="2.5" height="3" fill="#e6dcc8"/>`).join('')}</g>`,
    chateau: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-20" width="44" height="20" fill="#f6efe0"/><path d="M-24 -20 L-14 -30 L14 -30 L24 -20Z" fill="#7d8a9a"/>${[-26, 26].map(d => `<rect x="${d - 6}" y="-28" width="12" height="28" fill="#fbf4e6"/><path d="M${d - 7} -28 L${d} -42 L${d + 7} -28Z" fill="#6f7d8e"/>`).join('')}</g>`,
    farmhouse: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-20" y="-14" width="40" height="14" fill="#efd8b8"/><path d="M-22 -14 L-12 -22 L12 -22 L22 -14Z" fill="#c27a5c"/><rect x="10" y="-26" width="8" height="12" fill="#e7cba6"/></g>`,
    quinta: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-26" y="-12" width="52" height="12" fill="#fffaf2"/><path d="M-28 -12 L-22 -18 L22 -18 L28 -12Z" fill="#c27a5c"/></g>`,
    abbey: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-30" y="-16" width="60" height="16" fill="#f3e6c8"/><rect x="-6" y="-30" width="12" height="14" fill="#f3e6c8"/><path d="M-8 -30 a8 9 0 0 1 16 0Z" fill="#9db08a"/>${[-24, 24].map(d => `<rect x="${d - 3}" y="-34" width="6" height="18" fill="#f3e6c8"/><path d="M${d - 4} -34 a4 6 0 0 1 8 0Z" fill="#9db08a"/>`).join('')}</g>`,
    mission: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-14" width="44" height="14" fill="#fbf2e2"/><path d="M-8 -14 V-26 a8 8 0 0 1 16 0 V-14Z" fill="#fbf2e2"/><rect x="-2" y="-24" width="4" height="5" fill="#c9a36a"/><rect x="-22" y="-16" width="44" height="2" fill="#c27a5c"/></g>`,
    capedutch: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-28" y="-12" width="56" height="12" fill="#fffdf6"/><path d="M-28 -12 H28 L22 -20 H-22Z" fill="#7a6a5c"/><path d="M-8 -12 V-24 Q-8 -30 -4 -30 Q0 -34 4 -30 Q8 -30 8 -24 V-12Z" fill="#fffdf6"/></g>`,
    qvevri: () => [[300, 690, 1], [340, 702, .8], [262, 708, .7]].map(([x, y, k]) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-16 -40 Q-26 -10 -10 10 Q0 18 10 10 Q26 -10 16 -40Z" fill="#c98f67"/><ellipse cx="0" cy="-40" rx="16" ry="4" fill="#b07a56"/></g>`).join(''),
    cypress: (x, y, s = 1) => `<ellipse cx="${x}" cy="${y - 34 * s}" rx="${7 * s}" ry="${36 * s}" fill="#5f7a4a"/>`,
    poplar: (x, y, s = 1) => `<ellipse cx="${x}" cy="${y - 40 * s}" rx="${9 * s}" ry="${42 * s}" fill="#9db46a"/>`,
    olive: (x, y, s = 1) => `<g><rect x="${x - 2}" y="${y - 14 * s}" width="4" height="${14 * s}" fill="#8a7a62"/><ellipse cx="${x}" cy="${y - 22 * s}" rx="${20 * s}" ry="${13 * s}" fill="#a9b39a"/></g>`,
    oak: (x, y, s = 1) => `<g><rect x="${x - 3}" y="${y - 18 * s}" width="6" height="${18 * s}" fill="#7d6a52"/><circle cx="${x}" cy="${y - 32 * s}" r="${20 * s}" fill="#8faa62"/></g>`,
    pine: (x, y, s = 1) => `<g><path d="M${x} ${y} q2 -30 0 -${48 * s}" stroke="#8a6d52" stroke-width="4" fill="none"/><ellipse cx="${x}" cy="${y - 50 * s}" rx="${30 * s}" ry="${10 * s}" fill="#6f8a54"/></g>`,
    fir: (x, y, s = 1) => `<path d="M${x} ${y - 60 * s} L${x + 14 * s} ${y} H${x - 14 * s}Z" fill="#5f7d5a"/>`,
    eucalyptus: (x, y, s = 1) => `<g><path d="M${x} ${y} q-4 -40 4 -${70 * s}" stroke="#f1ebe0" stroke-width="5" fill="none"/><ellipse cx="${x + 4}" cy="${y - 74 * s}" rx="${24 * s}" ry="${14 * s}" fill="#9fb7a4"/><ellipse cx="${x - 10}" cy="${y - 58 * s}" rx="${14 * s}" ry="${8 * s}" fill="#9fb7a4"/></g>`,
    araucaria: (x, y, s = 1) => `<g><rect x="${x - 2}" y="${y - 70 * s}" width="4" height="${70 * s}" fill="#7d6a52"/><path d="M${x - 30 * s} ${y - 66 * s} Q${x} ${y - 90 * s} ${x + 30 * s} ${y - 66 * s} Q${x} ${y - 74 * s} ${x - 30 * s} ${y - 66 * s}Z" fill="#5f7a4a"/></g>`,
    cherry: (x, y, s = 1) => `<g><rect x="${x - 2}" y="${y - 16 * s}" width="4" height="${16 * s}" fill="#7d5a52"/><circle cx="${x}" cy="${y - 28 * s}" r="${18 * s}" fill="#f2c4cf"/></g>`,
  };
  function farLayer(kind, snow) {
    const snowCap = pts => snow ? pts : '';
    if (kind === 'hills') return `<path d="M0 395 C80 370 150 380 220 365 C290 350 350 372 390 362 V420 H0Z" fill="#e4d9d6" opacity=".7"/>`;
    if (kind === 'mountains') return `<path d="M0 380 L60 320 L100 350 L160 290 L220 345 L280 300 L340 340 L390 315 V420 H0Z" fill="#c8bfcf" opacity=".85"/>${snow ? `<path d="M160 290 L174 305 L146 305Z M280 300 L292 313 L268 313Z" fill="#fffaf2"/>` : ''}`;
    if (kind === 'alps') return `<path d="M0 370 L50 300 L90 330 L150 240 L210 320 L260 270 L320 330 L390 280 V420 H0Z" fill="#bcb6cc" opacity=".85"/><path d="M150 240 L172 268 L128 268Z M260 270 L276 290 L244 290Z M50 300 L62 316 L38 316Z M390 280 L376 300 L404 300Z" fill="#fffaf2"/>`;
    if (kind === 'dolomites') return `<path d="M0 380 L40 330 L60 300 L80 330 L120 250 L140 280 L170 240 L200 300 L250 260 L280 310 L330 270 L390 330 V420 H0Z" fill="#e4d2c8" opacity=".95"/>`;
    if (kind === 'volcano') return `<path d="M30 410 L170 250 L210 250 L360 410Z" fill="#9c8f92"/><path d="M170 250 L210 250 L200 270 L180 270Z" fill="#fffaf2" opacity=".8"/>${[0, 1, 2].map(i => `<ellipse cx="${200 + i * 26}" cy="${222 - i * 26}" rx="${18 + i * 8}" ry="${11 + i * 3}" fill="#e9e3e0" opacity="${.75 - i * .2}"/>`).join('')}`;
    if (kind === 'mesa') return `<path d="M0 400 L40 400 L60 350 L180 350 L200 390 L250 390 L270 360 L340 360 L360 400 L390 400 V420 H0Z" fill="#d9a98a" opacity=".85"/>`;
    if (kind === 'table') return `<path d="M20 410 L70 300 L300 296 L350 410Z" fill="#a8a3b6"/><path d="M70 300 L300 296 L296 308 L74 310Z" fill="#fffaf2" opacity=".75"/>`;
    if (kind === 'fuji') return `<path d="M20 410 L160 270 L230 270 L370 410Z" fill="#a9b3c9"/><path d="M160 270 L230 270 L252 292 L232 300 L214 290 L196 302 L178 290 L160 300 L140 290Z" fill="#fffaf2"/>`;
    if (kind === 'cone') return `<path d="M120 400 L240 270 L360 400Z" fill="#a9b3c9" opacity=".8"/><path d="M240 270 L262 294 L218 294Z" fill="#fffaf2"/>`;
    return '';
  }
  function compose(sp, id) {
    const sk = PAL[sp.sky] || PAL.sunny, H = HUE[sp.hue] || HUE.green, hz = sp.water === 'sea' ? 410 : 400;
    let o = `<defs><linearGradient id="k${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sk[0]}"/><stop offset=".6" stop-color="${sk[1]}"/><stop offset="1" stop-color="${sk[2]}"/></linearGradient>
      <linearGradient id="w${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8d0dc"/><stop offset="1" stop-color="#8fb3c8"/></linearGradient></defs>
      <rect width="390" height="780" fill="url(#k${id})"/><rect y="560" width="390" height="220" fill="${(HUE[sp.hue] || HUE.green)[2]}"/><g filter="url(#wobble)">`;
    const sun = sp.sun || [300, 200];
    o += `<circle cx="${sun[0]}" cy="${sun[1]}" r="70" fill="#fff4dc" opacity=".55"/><circle cx="${sun[0]}" cy="${sun[1]}" r="22" fill="#fff8e8"/>`;
    if (sp.clouds) o += [[80, 150], [250, 110], [320, 190]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="46" ry="14" fill="#fffaf4" opacity=".85"/><ellipse cx="${x + 20}" cy="${y - 8}" rx="26" ry="12" fill="#fffaf4" opacity=".85"/>`).join('');
    o += farLayer(sp.far, sp.snowcap !== false);
    if (sp.water === 'sea') o += `<rect y="${hz}" width="390" height="370" fill="url(#w${id})"/><path d="M0 ${hz} H390" stroke="#fff" opacity=".4"/>`;
    if (sp.water === 'lake') o += `<path d="M0 425 C120 410 270 412 390 424 V470 C270 458 120 460 0 474Z" fill="url(#w${id})"/>`;
    // mid ground
    const land = {
      rolling: `<path d="M0 450 C90 420 180 438 270 418 C330 405 370 420 390 414 V780 H0Z" fill="${H[0]}"/><path d="M0 520 C120 485 250 505 390 470 V780 H0Z" fill="${H[1]}"/>`,
      flat: `<path d="M0 452 C130 444 260 446 390 440 V780 H0Z" fill="${H[0]}"/><path d="M0 520 C130 506 260 508 390 498 V780 H0Z" fill="${H[1]}"/>`,
      steep: `<path d="M0 300 C70 300 160 360 230 470 L260 780 H0Z" fill="${H[1]}"/><path d="M180 470 C260 450 330 460 390 446 V780 H160Z" fill="${H[0]}"/>`,
      terraces: `<path d="M0 392 C80 388 160 410 220 470 L240 780 H0Z" fill="${H[1]}"/>${[0, 1, 2, 3, 4].map(i => `<path d="M0 ${408 + i * 34} C70 ${406 + i * 34} 140 ${428 + i * 32} ${190 + i * 6} ${478 + i * 34}" stroke="#efe4cc" stroke-width="2.5" fill="none" opacity=".75"/>`).join('')}<path d="M220 480 C290 466 340 470 390 460 V780 H200Z" fill="${H[0]}"/>`,
      coast: `<path d="M0 420 C60 410 110 420 160 440 C190 455 200 500 190 560 L180 780 H0Z" fill="${H[1]}"/>`,
    }[sp.land || 'rolling'];
    if (sp.water === 'river') o += `<path d="M0 470 C100 450 220 470 390 450 V500 C220 520 100 500 0 520Z" fill="url(#w${id})"/>`;
    o += land;
    if (sp.water === 'river' && (sp.land === 'steep' || sp.land === 'terraces')) o += `<path d="M150 780 C190 640 260 560 390 520 V590 C300 620 260 690 250 780Z" fill="url(#w${id})"/>`;
    (sp.features || []).forEach(([t, x, y, sc = 1, extra]) => { o += P_[t] ? P_[t](x, y, sc, extra) : ''; });
    (sp.trees || []).forEach(([t, x, y, sc = 1]) => { o += P_[t](x, y, sc); });
    if (sp.fog) o += [430, 470, 505].map((y, i) => `<path d="M-20 ${y} C80 ${y - 12} 200 ${y + 10} 410 ${y - 6}" stroke="#ffffff" stroke-width="${18 - i * 3}" opacity=".55" fill="none" stroke-linecap="round"/>`).join('');
    // foreground vines
    const fg = `<path d="M0 600 C130 572 260 590 390 562 V780 H0Z" fill="${H[2]}"/>`;
    const v = sp.vines || 'rows', vc = sp.snow ? '#9a8c80' : '#7c8a4e';
    if (v === 'rows') o += fg + Array.from({ length: 11 }, (_, i) => { const k = i - 5; return `<path d="M${195 + k * 95} 800 Q${195 + k * 36} 660 ${195 + k * 11} 585" stroke="${vc}" stroke-width="3.5" fill="none" opacity=".6" stroke-linecap="round"/>`; }).join('');
    if (v === 'bush') o += fg + Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 + r }, (_, c) => { const y = 610 + r * 34, x = 20 + c * (360 / (6 + r)) + (r % 2) * 14; return `<ellipse cx="${x}" cy="${y}" rx="${7 + r * 2}" ry="${5 + r}" fill="#7c8a4e" opacity=".8"/>`; }).join('')).join('');
    if (v === 'pergola') o += fg + `<g stroke="#8a6d52" stroke-width="3">${[40, 130, 220, 310].map(x => `<path d="M${x} 780 V640"/>`).join('')}<path d="M10 640 H380"/></g><path d="M0 626 C100 610 290 612 390 624 V652 H0Z" fill="#8faa62"/>${[60, 170, 270].map(x => `<ellipse cx="${x}" cy="660" rx="7" ry="10" fill="#6a3a5a" opacity=".7"/>`).join('')}`;
    if (v === 'terraces') o += `<path d="M0 640 C130 618 260 630 390 606 V780 H0Z" fill="${H[2]}"/>` + [0, 1, 2, 3].map(i => `<path d="M0 ${655 + i * 34} C130 ${635 + i * 34} 260 ${645 + i * 34} 390 ${622 + i * 34}" stroke="#efe4cc" stroke-width="3" fill="none"/>${Array.from({ length: 12 }, (_, c) => `<path d="M${16 + c * 32} ${650 + i * 34 - c * 2} v-12" stroke="${vc}" stroke-width="3" stroke-linecap="round"/>`).join('')}`).join('');
    if (sp.snow) o += `<path d="M0 600 C130 572 260 590 390 562 V780 H0Z" fill="#fbfbf8" opacity=".55"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 71) % 390}" cy="${(i * 37) % 560 + 20}" r="1.6" fill="#fff" opacity=".8"/>`).join('')}`;
    if (sp.extras) sp.extras.forEach(t => { o += P_[t](); });
    return o + `</g><rect width="390" height="780" filter="url(#paper)" fill="#fff"/>`;
  }
  // Every region with a place on the map has a postcard. Four are hand-painted; the rest are composed.
  const SPECS = {
    'Burgundy': { sky: 'soft', far: 'hills', land: 'rolling', hue: 'green', features: [['village', 150, 452, 1], ['spire', 215, 448, 1]] },
    'Bordeaux': { sky: 'sunny', land: 'flat', water: 'river', hue: 'green', features: [['chateau', 205, 448, 1.2]], trees: [['poplar', 60, 452], ['poplar', 340, 446]] },
    'Rhône': { sky: 'warm', far: 'hills', land: 'terraces', water: 'river', hue: 'brown', features: [['tower', 60, 400, .9]], trees: [['cypress', 330, 460]], vines: 'terraces' },
    'Loire': { sky: 'soft', land: 'rolling', water: 'river', hue: 'green', features: [['chateau', 230, 440, 1]], trees: [['oak', 70, 450]] },
    'Alsace': { sky: 'sunny', far: 'mountains', land: 'steep', hue: 'green', features: [['castle', 90, 330, 1], ['village', 270, 468, 1]], snowcap: false },
    'Provence & Corsica': { sky: 'lavender', water: 'sea', land: 'coast', hue: 'golden', features: [['village', 90, 440, .9]], trees: [['pine', 150, 440], ['cypress', 40, 470]], vines: 'bush' },
    'South, South-West & mountains': { sky: 'warm', far: 'mountains', land: 'rolling', hue: 'golden', features: [['castle', 230, 430, .9]], trees: [['olive', 70, 476], ['olive', 330, 470]], vines: 'bush' },
    'Piedmont': { sky: 'misty', far: 'alps', land: 'rolling', hue: 'green', fog: true, features: [['village', 220, 418, .9], ['tower', 238, 404, .8]] },
    'Tuscany': { sky: 'golden', land: 'rolling', hue: 'golden', features: [['farmhouse', 240, 432, 1]], trees: [['cypress', 175, 446], ['cypress', 192, 448], ['cypress', 300, 436], ['cypress', 90, 462]] },
    'Veneto': { sky: 'soft', far: 'hills', land: 'rolling', hue: 'green', features: [['campanile', 240, 428, 1], ['village', 190, 440, .8]], vines: 'pergola' },
    'The north': { sky: 'sunny', far: 'dolomites', water: 'lake', land: 'steep', hue: 'green', features: [['spire', 300, 460, .8]], vines: 'pergola' },
    'Centre, south & islands': { sky: 'warm', far: 'volcano', land: 'rolling', hue: 'red', trees: [['olive', 70, 478], ['olive', 320, 470]], vines: 'bush' },
    'Spain': { sky: 'sunny', far: 'mesa', land: 'flat', hue: 'red', features: [['castle', 250, 446, 1]], vines: 'bush' },
    'Portugal': { sky: 'warm', land: 'terraces', water: 'river', hue: 'brown', features: [['quinta', 100, 420, 1]], vines: 'terraces' },
    'Austria': { sky: 'soft', land: 'terraces', water: 'river', hue: 'green', features: [['abbey', 100, 414, .9]], vines: 'terraces' },
    'Switzerland': { sky: 'sunny', far: 'alps', water: 'lake', land: 'terraces', hue: 'green', features: [['village', 90, 424, .8]], vines: 'terraces' },
    'Hungary': { sky: 'misty', land: 'rolling', hue: 'golden', fog: true, features: [['village', 200, 440, .9], ['spire', 232, 432, .8]] },
    'Slovenia & Croatia': { sky: 'sunny', water: 'sea', land: 'coast', hue: 'green', features: [['village', 90, 436, 1]], trees: [['cypress', 170, 470]], vines: 'terraces' },
    'Georgia': { sky: 'cool', far: 'alps', land: 'rolling', hue: 'green', features: [['tower', 250, 424, .9]], extras: ['qvevri'] },
    'Lebanon': { sky: 'warm', far: 'mountains', land: 'flat', hue: 'red', trees: [['poplar', 60, 452], ['poplar', 82, 456], ['poplar', 330, 450]] },
    'England': { sky: 'cool', clouds: true, land: 'rolling', hue: 'green', features: [['spire', 230, 440, .8]], trees: [['oak', 80, 452], ['oak', 320, 440]] },
    'California': { sky: 'golden', land: 'rolling', hue: 'golden', features: [['mission', 230, 438, 1]], trees: [['oak', 80, 456], ['oak', 310, 442]] },
    'Pacific Northwest & East': { sky: 'cool', far: 'cone', land: 'rolling', hue: 'green', fog: true, trees: [['fir', 50, 450], ['fir', 75, 456], ['fir', 340, 446], ['fir', 362, 450]] },
    'Canada': { sky: 'winter', water: 'lake', land: 'flat', hue: 'grey', snow: true, trees: [['fir', 60, 446], ['fir', 330, 446]] },
    'Chile': { sky: 'sunny', far: 'alps', land: 'flat', hue: 'green', trees: [['poplar', 50, 452], ['poplar', 340, 448]] },
    'Uruguay': { sky: 'sunny', water: 'sea', land: 'coast', hue: 'green', features: [['farmhouse', 90, 438, .9]], trees: [['eucalyptus', 160, 470]] },
    'Brazil': { sky: 'soft', land: 'rolling', hue: 'green', trees: [['araucaria', 70, 448], ['araucaria', 320, 438]] },
    'Australia': { sky: 'golden', land: 'rolling', hue: 'red', features: [['farmhouse', 230, 440, .8]], trees: [['eucalyptus', 60, 452], ['eucalyptus', 340, 440]] },
    'New Zealand': { sky: 'sunny', far: 'alps', water: 'lake', land: 'rolling', hue: 'golden' },
    'South Africa': { sky: 'sunny', far: 'table', land: 'rolling', hue: 'green', features: [['capedutch', 230, 446, 1]], trees: [['oak', 90, 456]] },
    'Japan': { sky: 'soft', far: 'fuji', land: 'rolling', hue: 'green', trees: [['cherry', 70, 458], ['cherry', 330, 446]], vines: 'pergola' },
  };
  const HAND = { 'Champagne AOC': 'champagne', 'Germany': 'mosel', 'Greece': 'santorini', 'Argentina': 'mendoza' };
  const NAMES = { 'Champagne AOC': 'Champagne', 'The north': 'Northern Italy', 'Centre, south & islands': 'Southern Italy & islands', 'South, South-West & mountains': 'Southern France', 'Pacific Northwest & East': 'Oregon & beyond', 'Germany': 'The Mosel', 'Greece': 'Santorini', 'Argentina': 'Mendoza' };
  const slug = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const POSTCARDS = [];
  (D.trackB ? D.trackB.continents : []).forEach(ct => ct.countries.forEach(c => c.regions.forEach(rg => {
    if (!rg.at) return;
    const id = HAND[rg.name] || slug(rg.name);
    POSTCARDS.push({ id, name: NAMES[rg.name] || rg.name, region: rg.name, country: c.name });
    if (!POSTCARD_ART[id]) POSTCARD_ART[id] = (uidp) => compose(SPECS[rg.name] || { sky: 'sunny', land: 'rolling', hue: 'green' }, uidp);
  })));
  const postcard = (id, mode = 'full') => `<svg class="scene" viewBox="${mode === 'thumb' ? '0 120 390 520' : '0 0 390 780'}" preserveAspectRatio="${mode === 'thumb' ? 'xMidYMid slice' : 'xMidYMax slice'}" aria-hidden="true">${POSTCARD_ART[id]('p' + (++uid))}</svg>`;

  /* ---------- maps ---------- */
  const EU = {
    EUROPE: [[-9,37],[-9,43],[-2,43.5],[-1.5,46],[-4.5,48],[-1,49.7],[1.5,50.5],[4,51.5],[7,53.5],[9,54],[10,54.5],[14,54],[19,54.4],[21,55.5],[21,57],[24,57.5],[28,60],[46,62],[46,44],[36,45],[33,45],[30,45.5],[29,41],[26,40.5],[23,40],[23.5,38],[22,36.5],[21,38.5],[19.5,41],[18.5,42.5],[15,45],[13.5,45.7],[12.3,45],[13,43.5],[14,42],[16,41],[18.5,40],[16,38],[15.6,38],[16,39.5],[15.7,40],[12.5,41.8],[10.5,43],[8.8,44.4],[7,43.6],[5,43.3],[3,43],[3.2,41.9],[0.5,40.5],[0,38.8],[-2,36.8],[-5.5,36],[-7,37]],
    SCAND: [[5,58],[5,62],[10,64],[14,67],[20,70],[28,71],[30,69.5],[28,66],[25,65.5],[22,63.5],[21,61],[18,60],[19,59.5],[16,56.5],[13,55.5],[12,57.5],[11,59],[8,58]],
    UK: [[-5.7,50],[1.5,51],[1.7,52.8],[0,53.5],[-1.8,55.5],[-2,57.5],[-4,58.6],[-5.5,58.4],[-6,56.5],[-5,55],[-3,54.5],[-4.5,53.5],[-4.8,52],[-3,51.5]],
    IRL: [[-10,51.6],[-6,52],[-6,54],[-7.5,55.3],[-10,54.3]],
    AFRICA_N: [[-17,21],[-13,27.5],[-10,29],[-9.5,32],[-6,35.8],[-1,35.5],[2,36.7],[8,37],[11,37],[10,33.8],[15,32.5],[20,30.5],[25,31.5],[32,31],[34,27],[37,21],[46,21],[46,10],[-17,10]],
    MIDEAST: [[26,40.3],[29,41.2],[36,41.8],[41,41.5],[41,43],[48,42],[50,38],[50,25],[45,21],[37,21],[34,27],[34,31],[35.5,33.5],[36,36.5],[30,36.3],[27,37]],
    SARD: [[8.4,41],[9.8,41],[9.6,39],[8.4,39]], CORS: [[8.6,43],[9.5,42.9],[9.4,41.4],[8.7,41.5]], SIC: [[12.4,38.1],[15.6,38.2],[15.1,36.7],[12.6,37.6]], CRETE: [[23.5,35.6],[26.3,35.3],[26,35],[23.6,35.2]],
  };
  const WORLD = {
    NA: [[-165,65],[-160,71],[-140,70],[-125,73],[-95,72],[-80,73],[-75,62],[-65,60],[-60,52],[-53,47],[-66,44],[-70,41],[-76,35],[-81,31],[-80,25],[-82,29],[-90,30],[-97,26],[-97,21],[-92,18],[-87,21],[-88,16],[-83,10],[-79,9],[-80,8],[-85,11],[-92,15],[-105,20],[-110,24],[-112,31],[-115,30],[-117,33],[-124,40],[-124,48],[-130,55],[-140,60],[-152,58],[-160,58],[-165,62]],
    GREEN: [[-55,60],[-45,60],[-20,70],[-20,80],[-60,82],[-70,77],[-55,70]],
    SA: [[-80,8],[-72,12],[-62,11],[-52,5],[-35,-5],[-38,-13],[-41,-22],[-48,-26],[-53,-34],[-58,-38],[-63,-41],[-65,-46],[-68,-52],[-72,-54],[-75,-48],[-73,-38],[-71,-28],[-70,-18],[-76,-12],[-81,-4],[-80,1]],
    AFRICA: [[-17,21],[-16,14],[-12,7],[-7,4.5],[2,6],[9,4],[9.5,1],[12,-5],[13,-12],[12,-17],[15,-27],[18,-34.5],[22,-34],[27,-33.5],[32,-28],[35,-24],[40.5,-15],[40,-10],[40,-4],[43,0],[51,12],[44,11],[43,13],[39,17],[37,21],[34,27],[32,31],[25,31.5],[20,30.5],[15,32.5],[10,33.8],[11,37],[8,37],[2,36.7],[-1,35.5],[-6,35.8],[-9.5,32],[-10,29],[-13,27.5]],
    EURASIA: [[-9,37],[-9,43],[-1.5,46],[-4.5,48],[2,51],[8,54],[12,56],[5,58],[5,62],[14,67],[28,71],[45,68],[70,73],[100,77],[140,72],[180,68],[180,62],[160,60],[155,50],[142,46],[135,43],[130,42],[127,38],[126,35],[121,31],[122,25],[110,20],[108,11],[104,8.5],[100,13],[98,8],[100,3],[98,16],[92,22],[88,22],[80,15],[77,8],[73,17],[70,22],[66,25],[57,25],[56,26.5],[51,24.5],[48,29.5],[50,30],[56,18],[52,16],[45,13],[43,13],[39,17],[35,28],[34,31],[35.5,33.5],[36,36.5],[30,36.3],[27,37],[23,40],[22,36.5],[19.5,41],[15,45],[12.3,45],[16,41],[18.5,40],[16,38],[12.5,41.8],[8.8,44.4],[3,43],[0,38.8],[-5.5,36]],
    UK: EU.UK, IRL: EU.IRL,
    JAPAN: [[130,31],[131,34],[135,34.5],[140,35],[141,38],[142,41.5],[140,41.5],[139,38],[136,36.5],[132,35]],
    AUS: [[113,-22],[114,-34],[117,-35],[123,-34],[129,-31.5],[135,-34.5],[138,-35.5],[140,-38],[146,-39],[150,-37.5],[153,-31],[153,-25],[146,-19],[142,-10.7],[141,-17],[136,-12],[130,-11.5],[126,-14],[122,-17.5],[117,-20.5]],
    NZN: [[172.7,-34.4],[175,-36.5],[178.5,-37.7],[177,-39.5],[174.8,-41.4],[173.8,-39.2],[174.5,-37]],
    NZS: [[172.7,-40.5],[174.3,-41.7],[173,-43.8],[171,-45.9],[168.5,-46.6],[166.5,-45.5],[170.5,-42.5]],
    TAS: [[144.6,-40.7],[148.3,-40.9],[148,-43.2],[146,-43.6]],
  };
  const VIEWS = {
    europe: { w: 470, h: 400, proj: (lon, lat) => [(lon + 11) * 10.6, (59 - lat) * 13.6], shapes: EU, lats: [35, 40, 45, 50, 55], ring: 1 },
    world: { w: 470, h: 300, proj: (lon, lat) => [(lon + 172) * (470 / 355), (78 - lat) * (300 / 136)], shapes: WORLD, lats: [-30, 0, 30, 60], ring: 0.55 },
  };
  /* spots: [{ name, at: [lon, lat], state: 'done' | 'some' | 'next' | 'todo', colour }] */
  function map(view, spots) {
    const V = VIEWS[view], P = V.proj;
    const path = pts => 'M' + pts.map(([lo, la]) => P(lo, la).map(v => v.toFixed(1)).join(' ')).join(' L') + 'Z';
    const id = 'mp' + (++uid);
    const marks = spots.map((s, i) => {
      const [x, y] = P(...s.at), r = (s.state === 'done' ? 22 : 17) * V.ring;
      if (x < -20 || x > V.w + 20 || y < -20 || y > V.h + 20) return '';
      // a generous invisible hit area, so every region can be tapped
      const hit = `<circle class="spot-hit" cx="${x}" cy="${y}" r="${Math.max(16, 24 * V.ring)}" fill="transparent" data-act="region" data-r="${encodeURIComponent(s.name)}"><title>${s.name}</title></circle>`;
      return mark(s, x, y, r) + hit;
    }).join('');
    function mark(s, x, y, r) {
      if (s.state === 'done' || s.state === 'some') return `<g filter="url(#stain)" opacity="${s.state === 'done' ? 1 : .7}"><circle cx="${x}" cy="${y}" r="${r}" fill="${s.colour}" opacity=".14"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${s.colour}" stroke-width="${3 * V.ring + .4}" opacity=".7"/><circle cx="${x + 2}" cy="${y - 1.5}" r="${r + 2.5 * V.ring}" fill="none" stroke="${s.colour}" stroke-width=".9" opacity=".7"/></g>`;
      if (s.state === 'next') return `<g><circle cx="${x}" cy="${y}" r="${20 * V.ring}" fill="#a8434e" opacity=".14"><animate attributeName="r" values="${14 * V.ring};${24 * V.ring};${14 * V.ring}" dur="2.4s" repeatCount="indefinite"/></circle><circle cx="${x}" cy="${y}" r="${6 * V.ring + 1}" fill="#a8434e"/></g>`;
      return `<circle cx="${x}" cy="${y}" r="${3 * V.ring + 1.5}" fill="#b5a48c" opacity=".55"/>`;
    }
    return `<svg class="map-svg" viewBox="0 0 ${V.w} ${V.h}" role="img" aria-label="Map of the regions you've explored">
      <defs><clipPath id="${id}"><rect x="6" y="6" width="${V.w - 12}" height="${V.h - 12}" rx="10"/></clipPath></defs>
      <rect x="2" y="2" width="${V.w - 4}" height="${V.h - 4}" rx="12" fill="#fbf6ea" stroke="#d8c6a6"/>
      <g clip-path="url(#${id})">
        <rect width="${V.w}" height="${V.h}" fill="#dde6e3"/>
        <g stroke="#c8d5d2" stroke-width=".7">${V.lats.map(la => `<line x1="0" x2="${V.w}" y1="${P(0, la)[1]}" y2="${P(0, la)[1]}" stroke-dasharray="3 6"/>`).join('')}</g>
        <g fill="#f8f1e0" stroke="#b39c7c" stroke-width="1.2" filter="url(#mapwobble)">${Object.values(V.shapes).map(p => `<path d="${path(p)}"/>`).join('')}</g>
        <rect width="${V.w}" height="${V.h}" filter="url(#paper)" fill="#fff"/>
        ${marks}
      </g>
    </svg>`;
  }

  D.scenes = { timeOfDay, sky, postcard, POSTCARDS, map };
})();
