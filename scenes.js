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
  const POSTCARDS = [
    { id: 'champagne', name: 'Champagne', region: 'Champagne AOC' },
    { id: 'mosel', name: 'The Mosel', region: 'Germany', unit: 'b-de-mosel' },
    { id: 'santorini', name: 'Santorini', region: 'Greece', unit: 'b-gr-santorini' },
    { id: 'mendoza', name: 'Mendoza', region: 'Argentina', unit: 'b-ar-mendoza' },
  ];
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
      if (s.state === 'done' || s.state === 'some') return `<g filter="url(#stain)" opacity="${s.state === 'done' ? 1 : .7}"><circle cx="${x}" cy="${y}" r="${r}" fill="${s.colour}" opacity=".14"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${s.colour}" stroke-width="${3 * V.ring + .4}" opacity=".7"/><circle cx="${x + 2}" cy="${y - 1.5}" r="${r + 2.5 * V.ring}" fill="none" stroke="${s.colour}" stroke-width=".9" opacity=".7"/></g>`;
      if (s.state === 'next') return `<g><circle cx="${x}" cy="${y}" r="${20 * V.ring}" fill="#a8434e" opacity=".14"><animate attributeName="r" values="${14 * V.ring};${24 * V.ring};${14 * V.ring}" dur="2.4s" repeatCount="indefinite"/></circle><circle cx="${x}" cy="${y}" r="${6 * V.ring + 1}" fill="#a8434e"/></g>`;
      return `<circle cx="${x}" cy="${y}" r="${3 * V.ring + 1.5}" fill="#b5a48c" opacity=".55"/>`;
    }).join('');
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
