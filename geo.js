/* Duovino: detailed maps of the regions where "where" matters most (Left Bank vs Right Bank, Côte de Nuits vs
 * Côte de Beaune, northern vs southern Rhône…). Drawn from real longitudes and latitudes, so places sit where they
 * really are relative to each other and to the rivers. Schematic: rivers and coasts are simplified.
 *
 * place: { n: name, at: [lon, lat], z: zone it belongs to, ref: true for a reference town (always labelled, never asked),
 *          zone: true for a district label rather than a point, side: 'l' to put the label on the left }
 */
(() => {
  const D = window.DUOVINO;
  const MAPS = {
    bordeaux: {
      name: 'Bordeaux', box: [-1.36, 44.4, 0.28, 45.66],
      zones: ['Left Bank', 'Right Bank', 'Entre-Deux-Mers'],
      zoneQ: p => `Is ${p} on the Left Bank or the Right Bank?`,
      sea: [[-1.7, 45.9], [-1.06, 45.6], [-1.12, 45.45], [-1.16, 45.2], [-1.18, 44.95], [-1.2, 44.7], [-1.25, 44.3], [-1.7, 44.2]],
      water: [
        { n: 'Gironde', w: 9, pts: [[-1.08, 45.6], [-0.86, 45.42], [-0.73, 45.27], [-0.69, 45.18], [-0.62, 45.08], [-0.53, 45.03]] },
        { n: 'Garonne', w: 3.4, pts: [[-0.53, 45.03], [-0.55, 44.92], [-0.56, 44.84], [-0.48, 44.74], [-0.32, 44.63], [-0.23, 44.55], [0.0, 44.46], [0.3, 44.38]] },
        { n: 'Dordogne', w: 3.4, lab: [0.02, 44.8], pts: [[-0.53, 45.03], [-0.42, 45.0], [-0.3, 44.94], [-0.24, 44.91], [-0.1, 44.86], [0.05, 44.85], [0.3, 44.85]] },
      ],
      labels: [['LEFT BANK', -0.98, 44.98], ['RIGHT BANK', -0.02, 45.08], ['ATLANTIC', -1.32, 44.45, 1]],
      places: [
        { n: 'Bordeaux', at: [-0.58, 44.84], ref: true, side: 'l' },
        { n: 'Médoc', at: [-0.92, 45.32], z: 'Left Bank', zone: true },
        { n: 'Saint-Estèphe', at: [-0.78, 45.26], z: 'Left Bank', side: 'l' },
        { n: 'Pauillac', at: [-0.75, 45.2], z: 'Left Bank', side: 'l' },
        { n: 'Saint-Julien', at: [-0.74, 45.15], z: 'Left Bank', side: 'l' },
        { n: 'Margaux', at: [-0.67, 45.04], z: 'Left Bank', side: 'l' },
        { n: 'Pessac-Léognan', at: [-0.63, 44.76], z: 'Left Bank', side: 'l' },
        { n: 'Graves', at: [-0.47, 44.63], z: 'Left Bank', zone: true, side: 'l' },
        { n: 'Barsac', at: [-0.32, 44.6], z: 'Left Bank', side: 'l' },
        { n: 'Sauternes', at: [-0.34, 44.53], z: 'Left Bank', side: 'l' },
        { n: 'Entre-Deux-Mers', at: [-0.27, 44.74], z: 'Entre-Deux-Mers', zone: true },
        { n: 'Fronsac', at: [-0.27, 44.97] , z: 'Right Bank' },
        { n: 'Pomerol', at: [-0.2, 44.93], z: 'Right Bank' },
        { n: 'Saint-Émilion', at: [-0.16, 44.89], z: 'Right Bank' },
      ],
    },
    burgundy: {
      name: 'Burgundy', box: [3.55, 46.0, 5.25, 47.95],
      zones: ['Chablis', 'Côte de Nuits', 'Côte de Beaune', 'Côte Chalonnaise', 'Mâconnais'],
      zoneQ: p => `Which part of Burgundy is ${p} in?`,
      water: [{ n: 'Saône', w: 3, pts: [[5.4, 47.12], [5.15, 46.99], [4.86, 46.78], [4.91, 46.56], [4.84, 46.31], [4.74, 46.0]] }],
      labels: [],
      places: [
        { n: 'Chablis', at: [3.8, 47.81], z: 'Chablis' },
        { n: 'Dijon', at: [5.04, 47.32], ref: true },
        { n: 'Gevrey-Chambertin', at: [4.97, 47.23], z: 'Côte de Nuits', side: 'l' },
        { n: 'Vosne-Romanée', at: [4.95, 47.16], z: 'Côte de Nuits', side: 'l' },
        { n: 'Nuits-Saint-Georges', at: [4.95, 47.13], z: 'Côte de Nuits', side: 'l' },
        { n: 'Beaune', at: [4.84, 47.02], ref: true },
        { n: 'Meursault', at: [4.77, 46.98], z: 'Côte de Beaune', side: 'l' },
        { n: 'Puligny-Montrachet', at: [4.75, 46.95], z: 'Côte de Beaune', side: 'l' },
        { n: 'Mercurey', at: [4.72, 46.84], z: 'Côte Chalonnaise', side: 'l' },
        { n: 'Mâcon', at: [4.83, 46.31], ref: true },
        { n: 'Pouilly-Fuissé', at: [4.75, 46.28], z: 'Mâconnais', side: 'l' },
        { n: 'Beaujolais', at: [4.6, 46.08], zone: true, z: 'Beaujolais', side: 'l' },
      ],
    },
    rhone: {
      name: 'the Rhône', box: [4.3, 43.85, 5.45, 45.82],
      zones: ['Northern Rhône', 'Southern Rhône'],
      zoneQ: p => `Is ${p} in the northern or the southern Rhône?`,
      water: [{ n: 'Rhône', w: 3.6, pts: [[4.83, 45.84], [4.85, 45.6], [4.87, 45.52], [4.78, 45.45], [4.8, 45.25], [4.84, 45.07], [4.88, 44.93], [4.77, 44.7], [4.72, 44.4], [4.71, 44.2], [4.75, 44.05], [4.8, 43.95], [4.72, 43.85]] }],
      labels: [['NORTHERN RHÔNE', 5.2, 45.3], ['SOUTHERN RHÔNE', 5.2, 44.32]],
      places: [
        { n: 'Lyon', at: [4.83, 45.76], ref: true },
        { n: 'Côte-Rôtie', at: [4.78, 45.48], z: 'Northern Rhône', side: 'l' },
        { n: 'Condrieu', at: [4.77, 45.43], z: 'Northern Rhône', side: 'l' },
        { n: 'Saint-Joseph', at: [4.77, 45.22], z: 'Northern Rhône', side: 'l' },
        { n: 'Crozes-Hermitage', at: [4.92, 45.13], z: 'Northern Rhône' },
        { n: 'Hermitage', at: [4.85, 45.07], z: 'Northern Rhône' },
        { n: 'Cornas', at: [4.85, 44.96], z: 'Northern Rhône', side: 'l' },
        { n: 'Gigondas', at: [5.0, 44.17], z: 'Southern Rhône' },
        { n: 'Vacqueyras', at: [4.98, 44.12], z: 'Southern Rhône' },
        { n: 'Châteauneuf-du-Pape', at: [4.83, 44.06], z: 'Southern Rhône' },
        { n: 'Tavel', at: [4.7, 44.01], z: 'Southern Rhône', side: 'l' },
        { n: 'Avignon', at: [4.81, 43.95], ref: true },
      ],
    },
    loire: {
      name: 'the Loire', box: [-2.35, 46.95, 3.6, 48.0],
      zones: ['Pays Nantais', 'Anjou-Saumur', 'Touraine', 'Upper Loire'],
      zoneQ: p => `Which part of the Loire is ${p} in?`,
      sea: [[-3, 48.2], [-2.2, 47.5], [-2.15, 47.28], [-2.05, 47.0], [-3, 46.8]],
      water: [{ n: 'Loire', w: 3.6, pts: [[-2.2, 47.28], [-1.55, 47.21], [-1.0, 47.37], [-0.55, 47.42], [-0.08, 47.27], [0.24, 47.22], [0.69, 47.39], [1.33, 47.59], [1.9, 47.9], [2.63, 47.69], [2.86, 47.33], [3.1, 47.0]] }],
      labels: [['ATLANTIC', -2.3, 47.0, 1]],
      places: [
        { n: 'Nantes', at: [-1.55, 47.22], ref: true },
        { n: 'Muscadet', at: [-1.35, 47.08], z: 'Pays Nantais', zone: true },
        { n: 'Savennières', at: [-0.65, 47.39], z: 'Anjou-Saumur', side: 'l' },
        { n: 'Anjou', at: [-0.5, 47.25], z: 'Anjou-Saumur', zone: true },
        { n: 'Saumur', at: [-0.08, 47.26], z: 'Anjou-Saumur' },
        { n: 'Chinon', at: [0.24, 47.17], z: 'Touraine' },
        { n: 'Tours', at: [0.69, 47.39], ref: true, side: 'l' },
        { n: 'Vouvray', at: [0.8, 47.41], z: 'Touraine' },
        { n: 'Sancerre', at: [2.84, 47.33], z: 'Upper Loire', side: 'l' },
        { n: 'Pouilly-Fumé', at: [2.97, 47.25], z: 'Upper Loire' },
      ],
    },
    champagne: {
      name: 'Champagne', box: [3.35, 47.9, 4.85, 49.35],
      zones: ['Montagne de Reims', 'Vallée de la Marne', 'Côte des Blancs', 'Côte des Bar'],
      zoneQ: p => `Which part of Champagne is ${p} in?`,
      water: [
        { n: 'Marne', w: 3, pts: [[3.35, 49.0], [3.64, 49.07], [3.95, 49.05], [4.2, 48.98], [4.37, 48.96], [4.6, 48.85], [4.85, 48.75]] },
        { n: 'Seine', w: 2.6, pts: [[4.33, 47.9], [4.38, 48.11], [4.25, 48.25], [4.05, 48.3]] },
      ],
      labels: [],
      places: [
        { n: 'Reims', at: [4.03, 49.26], ref: true },
        { n: 'Montagne de Reims', at: [4.06, 49.15], zone: true, z: 'Montagne de Reims' },
        { n: 'Épernay', at: [3.95, 49.04], ref: true, side: 'l' },
        { n: 'Vallée de la Marne', at: [3.62, 49.11], zone: true, z: 'Vallée de la Marne' },
        { n: 'Côte des Blancs', at: [4.03, 48.94], zone: true, z: 'Côte des Blancs' },
        { n: 'Côte des Bar', at: [4.55, 48.12], zone: true, z: 'Côte des Bar' },
        { n: 'Les Riceys', at: [4.37, 47.99], z: 'Côte des Bar', side: 'l' },
      ],
    },
  };
  // which Grapes & places regions use which map
  const FOR_REGION = { Bordeaux: 'bordeaux', Burgundy: 'burgundy', 'Rhône': 'rhone', Loire: 'loire', 'Champagne AOC': 'champagne' };

  /* render(id, { hl: [names to highlight], pins: [names] → numbered pins with hidden labels, picked, right }) */
  let uid = 0;
  function render(id, o = {}) {
    const M = MAPS[id], [x0, y0, x1, y1] = M.box, k0 = Math.cos((y0 + y1) / 2 * Math.PI / 180);
    const W = 360, sx = W / ((x1 - x0) * k0), H = Math.round((y1 - y0) * sx);
    const P = (lon, lat) => [(lon - x0) * k0 * sx, (y1 - lat) * sx];
    const line = pts => pts.map((p, i) => (i ? 'L' : 'M') + P(...p).map(v => v.toFixed(1)).join(' ')).join(' ');
    const hl = new Set(o.hl || []), pins = o.pins || [], cid = 'gm' + (++uid);
    const placeHTML = M.places.map(p => {
      const [x, y] = P(...p.at), pin = pins.indexOf(p.n);
      if (pin >= 0) {
        const st = o.right === p.n && o.picked != null ? 'right' : o.picked === p.n ? 'wrong' : '';
        return `<g class="gm-pin ${st}" data-act="mappick" data-n="${encodeURIComponent(p.n)}"><circle cx="${x}" cy="${y}" r="15" fill="transparent"/><circle cx="${x}" cy="${y}" r="9" class="gm-pin-dot"/><text x="${x}" y="${y + 3.6}" text-anchor="middle" class="gm-pin-n">${pin + 1}</text>
          ${st ? `<text x="${p.side === 'l' ? x - 13 : x + 13}" y="${y + 4}" text-anchor="${p.side === 'l' ? 'end' : 'start'}" class="gm-label on">${p.n}</text>` : ''}</g>`;
      }
      if (pins.length && !p.ref && !p.zone) return `<circle cx="${x}" cy="${y}" r="2" class="gm-dot dim"/>`;
      if (pins.length && p.zone) return '';
      const on = hl.has(p.n), tx = p.side === 'l' ? x - 6 : x + 6, anchor = p.side === 'l' ? 'end' : 'start';
      if (p.zone) return `<text x="${x}" y="${y}" text-anchor="middle" class="gm-zone ${on ? 'on' : ''}">${p.n}</text>`;
      return `<circle cx="${x}" cy="${y}" r="${on ? 4.5 : p.ref ? 3 : 2.6}" class="gm-dot ${on ? 'on' : p.ref ? 'ref' : ''}"/><text x="${tx}" y="${y + 3.5}" text-anchor="${anchor}" class="gm-label ${on ? 'on' : p.ref ? 'ref' : ''}">${p.n}</text>`;
    }).join('');
    return `<svg class="geo-map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of ${M.name}">
      <defs><clipPath id="${cid}"><rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="12"/></clipPath></defs>
      <g clip-path="url(#${cid})">
        <rect width="${W}" height="${H}" fill="#f8f1e0"/>
        ${M.sea ? `<path d="${line(M.sea)}Z" fill="#dde6e3"/>` : ''}
        ${M.water.map(r => `<path d="${line(r.pts)}" fill="none" stroke="#a9c4cc" stroke-width="${r.w}" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        ${M.water.map(r => { const [a, b] = [r.pts[Math.floor(r.pts.length / 2) - 1], r.pts[Math.floor(r.pts.length / 2)]], [x, y] = r.lab ? P(...r.lab) : P((a[0] + b[0]) / 2 + .01, (a[1] + b[1]) / 2 + .01); return `<text x="${x + 4}" y="${y - 4}" class="gm-river">${r.n}</text>`; }).join('')}
        ${M.labels.map(([t, lon, lat, sea]) => { const [x, y] = P(lon, lat); return `<text x="${x}" y="${y}" text-anchor="${sea ? 'start' : 'middle'}" class="gm-big ${sea ? 'sea' : ''}" ${sea ? `transform="rotate(-90 ${x} ${y})"` : ''}>${t}</text>`; }).join('')}
        ${placeHTML}
        <rect width="${W}" height="${H}" filter="url(#paper)" fill="#fff" opacity=".5" pointer-events="none"/>
      </g>
      <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="12" fill="none" stroke="#d8c6a6"/>
    </svg>`;
  }

  // places a piece of text mentions, on a given map (whole names only)
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function mentions(id, text) {
    return MAPS[id].places.filter(p => new RegExp(`(^|[^\\p{L}])${esc(p.n)}(?![\\p{L}-])`, 'u').test(text)).map(p => p.n)
      .concat(MAPS[id].zones.filter(z => new RegExp(`(^|[^\\p{L}])${esc(z)}(?![\\p{L}-])`, 'iu').test(text)));
  }
  D.geo = { MAPS, FOR_REGION, render, mentions };
})();
