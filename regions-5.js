/* Track B · Part 3: France (all regions except Champagne and Alsace).
 * Rules named here were checked (2026-11-08) against EU-published texts (EUR-Lex notices and eAmbrosia attachments):
 *  - Bourgogne (C/2024/2984): Chardonnay, Pinot Noir, Gamay, César, Pinot Blanc, Pinot Gris; Yonne to the south.
 *  - Chablis (C/2025/2447), Petit Chablis (C/2024/4131): Chardonnay only. Chablis Grand Cru: 7 climats (arrêté 24 Oct 2024, checked earlier).
 *  - Mâcon (C/2026/1751): Chardonnay, Gamay, Pinot Noir. Pouilly-Fuissé (OJ C 258, 2021): Chardonnay; "premier cru" with named climats.
 *  - Bordeaux, Bordeaux Supérieur, Margaux, Pauillac, Saint-Estèphe, Pomerol, Pessac-Léognan, Graves, Entre-deux-Mers:
 *    grape lists (Cabernet Sauvignon, Cabernet Franc, Merlot, Petit Verdot, Malbec, Carménère; whites Sémillon, Sauvignon,
 *    Muscadelle); Médoc gravel terraces along the Gironde; Pessac-Léognan inside Bordeaux's city boundary.
 *  - Sauternes & Barsac (OJ C 520, 2021): five communes (Barsac, Bommes, Fargues, Preignac, Sauternes); Sémillon, Sauvignon
 *    Blanc/Gris, Muscadelle; nobly rotten grapes picked by hand in successive passes (tries).
 *  - Crozes-Hermitage (OJ C 83, 2021), Saint-Joseph (C/2024/5920): Syrah; Marsanne & Roussanne. Cornas (OJ C 73, 2020): red only,
 *    the only northern Rhône PDO made exclusively from Syrah. Condrieu (C/2025/3459).
 *  - Gigondas (OJ C 83, 2021): Grenache, Mourvèdre, Syrah. Tavel (PDO-FR-A0328-AM01): still rosé only. Côtes du Rhône Villages
 *    (OJ C 21, 2021): reds ≥ 40% Grenache with ≥ 25% Syrah and/or Mourvèdre; reds ~98% of output.
 *  - Pouilly-Fumé (OJ C 466, 2022): Sauvignon Blanc. Savennières (OJ C 88, 2020): Chenin, right bank near Angers.
 *    Vouvray (OJ C 87, 2021). Sancerre, Muscadet, Crémant de Loire: checked earlier.
 *  - Côtes de Provence, Coteaux d'Aix (OJ C 62/83, 2020), Cassis (C/2026/2476), Bandol (C/2025/4233), Patrimonio (OJ C 401, 2022:
 *    reds ≥ 90% Nielluccio), Vin de Corse (Grenache, Sciaccarello, Vermentino, Nielluccio).
 *  - Languedoc (OJ C 98, 2020), Côtes du Roussillon (OJ C 224, 2023), Banyuls (C/2024/6184: vin doux naturel), Madiran (C/2025/321:
 *    Tannat, Cabernets, Fer), Jurançon (C/2025/5378: Gros & Petit Manseng; dry and sweet), Côtes du Jura (OJ C 49, 2023).
 * Châteauneuf-du-Pape, Côte-Rôtie, Saint-Émilion, Saint-Julien, Cahors and Maury texts weren't reachable: places, history
 * and grapes only, with no percentages.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const R = (id, title, sub, lesson, questions, sources) => ({ id: 'b-' + id, title, sub, lesson, questions, ...(sources ? { sources } : {}) });
  const q = (type, text, options, answer, explain, extra = {}) => ({ type, q: text, options, answer, explain, ...extra });
  const srt = (text, buckets, items, explain, extra = {}) => ({ type: 'sort', q: text, buckets, items: items.map(([t, b]) => ({ t, b })), explain, ...extra });
  const ord = (text, items, explain, extra = {}) => ({ type: 'order', q: text, items, explain, ...extra });

  Object.assign(D.regionLessons = D.regionLessons || {}, {

    /* ---------------- BURGUNDY ---------------- */
    'fr-burg-rule': R('fr-burg-rule', 'The Burgundy rule', 'Red is Pinot Noir, white is Chardonnay', [
      { kind: 'text', title: 'Two grapes, endless places', big: 'Red = Pinot Noir · White = Chardonnay',
        body: 'Almost all great Burgundy is <b>Pinot Noir</b> (red) or <b>Chardonnay</b> (white). Labels name the <b>place</b>, not the grape: the place is the point.' },
      { kind: 'layers', title: 'North to south', rows: [
        { h: 'Chablis (Yonne)', t: 'Cool, isolated, Chardonnay only.' },
        { h: 'Côte d\'Or', t: 'The famous slope: Côte de Nuits, then Côte de Beaune.' },
        { h: 'Côte Chalonnaise', t: 'Good-value reds and whites.' },
        { h: 'Mâconnais', t: 'Warmer: generous Chardonnay.' },
      ] },
      { kind: 'facts', title: 'Small print', rows: [
        { k: 'Also allowed', v: 'Gamay, Aligoté (its own appellation), and rarities like César, Pinot Blanc and Pinot Gris.' },
      ] },
    ], [
      srt('Red or white Burgundy grape?', ['Red', 'White'], [['Pinot Noir', 0], ['Chardonnay', 1], ['Gamay', 0], ['Aligoté', 1]], 'Pinot and Chardonnay lead.', { wines: ['redburgundy'] }),
      q('choice', 'What do Burgundy labels usually name?', ['The place', 'The grape', 'The winemaker\'s style', 'The alcohol'], 0, 'The place is the point.'),
      ord('Order Burgundy\'s areas from north to south.', ['Chablis', 'Côte d\'Or', 'Côte Chalonnaise', 'Mâconnais'], 'Warmer as you go south.'),
    ], ['Bourgogne AOC: C/2024/2984']),

    'fr-burg-tiers': R('fr-burg-tiers', 'Bourgogne to Grand Cru', 'Regional → village → Premier Cru → Grand Cru', [
      { kind: 'layers', title: 'The pyramid', rows: [
        { h: 'Regional', t: '"Bourgogne": grapes from across the region.' },
        { h: 'Village', t: 'One village: e.g. Gevrey-Chambertin, Meursault.' },
        { h: 'Premier Cru', t: 'A named vineyard within a village: e.g. Meursault 1er Cru Charmes.' },
        { h: 'Grand Cru', t: 'The very best vineyards. Each is its own appellation; the label shows just the vineyard, e.g. "Chambertin".' },
      ] },
      { kind: 'try', title: 'A borrowed name', body: 'The village of Gevrey added "Chambertin" to its name in the 1800s…',
        prompt: 'Why would a village do that?',
        reveal: 'To borrow the fame of its <b>Grand Cru</b>, Chambertin. Many Côte d\'Or villages did the same: Puligny-<b>Montrachet</b>, Chambolle-<b>Musigny</b>…' },
      { kind: 'text', title: 'Climats', body: 'Burgundy\'s named vineyard plots are called <b>climats</b>; they\'re on UNESCO\'s World Heritage list.' },
    ], [
      ord('Order the Burgundy tiers, base to top.', ['Bourgogne', 'Village', 'Premier Cru', 'Grand Cru'], 'Ever smaller, ever more specific.', { wines: ['redburgundy'] }),
      q('choice', 'A label saying just "Chambertin" is…', ['A Grand Cru', 'A regional wine', 'A grape', 'A producer'], 0, 'Grand Crus show just the vineyard name.'),
      q('choice', 'Why is the village called Gevrey-Chambertin?', ['It added its famous Grand Cru\'s name', 'Two villages merged', 'A family name', 'A grape name'], 0, 'Borrowed fame.'),
      q('choice', 'Burgundy\'s named vineyard plots are called…', ['Climats', 'Quintas', 'Ried', 'Contrade'], 0, 'UNESCO-listed.'),
    ]),

    'fr-chablis': R('fr-chablis', 'Chablis', 'The four tiers', [
      { kind: 'text', title: 'Cool, northern, Chardonnay', big: 'Limestone full of tiny fossil shells',
        body: 'Chablis sits far north of the rest of Burgundy, in the Yonne. Only <b>Chardonnay</b>. Cool, often unoaked: lemon, green apple, a flinty, salty edge.' },
      { kind: 'layers', title: 'The four tiers', rows: [
        { h: 'Petit Chablis', t: 'The lightest, from the outer, plateau sites.' },
        { h: 'Chablis', t: 'The main appellation.' },
        { h: 'Chablis Premier Cru', t: 'Named vineyards on better slopes.' },
        { h: 'Chablis Grand Cru', t: 'Seven named climats on one south-west-facing hill above the Serein river.' },
      ] },
      { kind: 'text', title: 'Frost', body: 'Spring frost is Chablis\'s great danger: growers use heaters and water sprinklers (Roots 2.5).' },
    ], [
      ord('Order the Chablis tiers, base to top.', ['Petit Chablis', 'Chablis', 'Chablis Premier Cru', 'Chablis Grand Cru'], 'Four steps.', { wines: ['chablis'] }),
      q('choice', 'How many Chablis Grand Cru climats are there?', ['Seven', 'Seventeen', 'Fifty-one', 'Three'], 0, 'On one hill above the Serein.'),
      q('choice', 'Chablis is made from…', ['Chardonnay only', 'Sauvignon Blanc', 'Pinot Noir', 'Chenin Blanc'], 0, 'No exceptions.'),
    ], ['Chablis AOC: C/2025/2447', 'Petit Chablis AOC: C/2024/4131']),

    'fr-cote-dor': R('fr-cote-dor', 'Côte de Nuits & Côte de Beaune', 'The key village names', [
      { kind: 'text', title: 'The golden slope', big: 'Côte d\'Or',
        body: 'A narrow, east-facing limestone slope from Dijon south. The best vineyards are in the <b>middle</b> of the slope.' },
      { kind: 'compare', title: 'Two halves', cols: [
        { h: 'Côte de Nuits (north)', items: ['Mostly red: Pinot Noir', 'Gevrey-Chambertin, Chambolle-Musigny, Vosne-Romanée, Nuits-Saint-Georges'] },
        { h: 'Côte de Beaune (south)', items: ['Great whites, plus reds', 'Meursault, Puligny- & Chassagne-Montrachet (white)', 'Pommard, Volnay (red)'] }] },
    ], [
      srt('Côte de Nuits or Côte de Beaune?', ['Nuits', 'Beaune'], [['Vosne-Romanée', 0], ['Meursault', 1], ['Gevrey-Chambertin', 0], ['Puligny-Montrachet', 1], ['Volnay', 1]], 'North for red, south for white (and some reds).', { wines: ['whiteburgundy'] }),
      q('choice', 'Which way does the Côte d\'Or face?', ['East', 'North', 'West', 'It\'s flat'], 0, 'Catching the morning sun.'),
      q('choice', 'Where on the slope are the best vineyards?', ['In the middle', 'At the very top', 'On the flat bottom', 'Anywhere'], 0, 'Best drainage and sun.'),
    ]),

    'fr-macon': R('fr-macon', 'Mâcon & Pouilly-Fuissé', 'Southern Burgundy\'s whites', [
      { kind: 'text', title: 'Warmer and sunnier', big: 'Generous Chardonnay',
        body: 'The Mâconnais, in southern Burgundy, is warmer: riper, rounder Chardonnay with peach and melon, great value. Mâcon can also be red (Gamay, Pinot Noir).' },
      { kind: 'facts', title: 'Pouilly-Fuissé', rows: [
        { k: 'Where', v: 'Beneath the dramatic limestone rocks of Solutré and Vergisson.' },
        { k: 'Grape', v: 'Chardonnay: fuller, richer, often oaked.' },
        { k: 'New', v: 'Since 2020 it can name Premier Cru climats.' },
        { k: 'Not to be confused', v: 'With Pouilly-Fumé (Loire Sauvignon Blanc)!' },
      ] },
    ], [
      q('choice', 'Pouilly-Fuissé is made from…', ['Chardonnay', 'Sauvignon Blanc', 'Chenin', 'Gamay'], 0, 'Pouilly-Fumé is the Sauvignon one.', { wines: ['pouillyfuisse'] }),
      srt('Pouilly-Fuissé or Pouilly-Fumé?', ['Fuissé', 'Fumé'], [['Burgundy', 0], ['Loire', 1], ['Chardonnay', 0], ['Sauvignon Blanc', 1]], 'The classic lookalike trap.'),
      q('choice', 'What can Pouilly-Fuissé labels now show?', ['Premier Cru climats', 'Grand Cru', 'Prädikat', 'Puttonyos'], 0, 'Since 2020.'),
    ], ['Mâcon AOC: C/2026/1751', 'Pouilly-Fuissé AOC: OJ C 258, 2021']),

    'fr-beaujolais': R('fr-beaujolais', 'Beaujolais', 'Gamay and the ten crus', [
      { kind: 'text', title: 'Granite hills, Gamay', big: 'South of Mâcon',
        body: 'Beaujolais is <b>Gamay</b> country. The northern hills are <b>granite</b>: home of the ten crus. The south is flatter, with clay and limestone: lighter, fruitier wines.' },
      { kind: 'facts', title: 'The ten crus (north to south)', rows: [
        { k: 'Saint-Amour, Juliénas, Chénas, Moulin-à-Vent, Fleurie', v: 'Moulin-à-Vent is the most powerful; Fleurie floral.' },
        { k: 'Chiroubles, Morgon, Régnié, Brouilly, Côte de Brouilly', v: 'Morgon is deep and ages well.' },
      ] },
      { kind: 'text', title: 'Nouveau', body: 'Beaujolais Nouveau is released just weeks after harvest, in November: pure fruit, drink now.' },
    ], [
      q('choice', 'Beaujolais\'s crus grow on…', ['Granite hills in the north', 'Chalk cliffs', 'Volcanic sand', 'River gravel'], 0, 'The south is clay and limestone.', { wines: ['beaujolais'] }),
      q('choice', 'Which cru is the most powerful?', ['Moulin-à-Vent', 'Chiroubles', 'Saint-Amour', 'Régnié'], 0, 'Built to age.'),
      q('choice', 'Beaujolais Nouveau is released…', ['Weeks after harvest, in November', 'After 10 years', 'Only in spring', 'Never'], 0, 'Drink it young.'),
    ], ['Beaujolais AOC: OJ C 473, 2022']),

    /* ---------------- BORDEAUX ---------------- */
    'fr-bdx-grapes': R('fr-bdx-grapes', 'The Bordeaux grapes', 'Blends, by design', [
      { kind: 'text', title: 'The art of blending', big: 'Merlot · Cabernet Sauvignon · Cabernet Franc',
        body: 'Bordeaux is a <b>blend</b>. Each grape ripens at a different time and adds something different, and blending is an insurance policy in a rainy, maritime climate.' },
      { kind: 'layers', title: 'Who does what', rows: [
        { h: 'Merlot', t: 'The most planted: soft, plummy, early-ripening.' },
        { h: 'Cabernet Sauvignon', t: 'Structure, blackcurrant, long life.' },
        { h: 'Cabernet Franc', t: 'Perfume and freshness.' },
        { h: 'Petit Verdot, Malbec, Carménère', t: 'Small seasoning grapes.' },
        { h: 'Whites', t: 'Sémillon, Sauvignon Blanc, Muscadelle.' },
      ] },
    ], [
      q('choice', 'Why blend in Bordeaux?', ['Grapes ripen at different times, insurance against weather', 'Law bans single grapes', 'To make it sweeter', 'Tradition only'], 0, 'A maritime, rainy climate.', { wines: ['leftbank'] }),
      q('choice', 'Bordeaux\'s most planted grape?', ['Merlot', 'Cabernet Sauvignon', 'Malbec', 'Sémillon'], 0, 'Soft and early-ripening.'),
      srt('Red or white Bordeaux grape?', ['Red', 'White'], [['Petit Verdot', 0], ['Sémillon', 1], ['Carménère', 0], ['Muscadelle', 1]], 'Know the full cast.'),
    ], ['Bordeaux AOC & sub-appellations: EU notices']),

    'fr-bdx-banks': R('fr-bdx-banks', 'Left Bank vs Right Bank', 'Gravel vs clay', [
      { kind: 'text', title: 'Two rivers, one estuary', big: 'Garonne + Dordogne = Gironde',
        body: 'The Garonne and Dordogne rivers join to form the <b>Gironde</b> estuary. West of them is the <b>Left Bank</b>; east is the <b>Right Bank</b>. Between the two rivers lies Entre-Deux-Mers ("between two seas").' },
      { kind: 'compare', title: 'Two banks', cols: [
        { h: 'Left Bank', items: ['Gravel terraces: warm, free-draining', 'Cabernet Sauvignon-led', 'Médoc, Pessac-Léognan'] },
        { h: 'Right Bank', items: ['Clay and limestone: cool, water-holding', 'Merlot-led', 'Saint-Émilion, Pomerol'] }] },
    ], [
      srt('Which bank of Bordeaux?', ['Left', 'Right'], [['Gravel', 0], ['Clay', 1], ['Médoc', 0], ['Saint-Émilion', 1]], 'Soil decides the grape.', { wines: ['pomerol'] }),
      q('choice', 'Entre-Deux-Mers lies…', ['Between the Garonne and Dordogne', 'On the Atlantic coast', 'In the Médoc', 'Across the Gironde'], 0, '"Between two seas".'),
      q('choice', 'The Gironde is formed by…', ['The Garonne and Dordogne', 'The Loire and Rhône', 'The Seine', 'The Lot'], 0, 'An estuary.'),
    ]),

    'fr-medoc': R('fr-medoc', 'The Médoc villages', 'Pauillac, Margaux, St-Julien, St-Estèphe', [
      { kind: 'text', title: 'Gravel by the estuary', big: 'The 1855 classification',
        body: 'The Médoc\'s great châteaux sit on <b>gravel terraces</b> running along the Gironde. In <b>1855</b>, Bordeaux\'s top red châteaux were ranked into five growths ("crus"); it\'s barely changed since.' },
      { kind: 'compare', title: 'Four villages, south to north', cols: [
        { h: 'Margaux · Saint-Julien', items: ['Margaux: perfumed, elegant', 'Saint-Julien: balanced, classic'] },
        { h: 'Pauillac · Saint-Estèphe', items: ['Pauillac: powerful, cassis and cedar', 'Saint-Estèphe: firmer, more clay'] }] },
      { kind: 'try', title: 'One change', body: 'The 1855 classification has changed only once…',
        prompt: 'What happened?',
        reveal: 'In <b>1973</b>, Château Mouton Rothschild in Pauillac was promoted from second to <b>first growth</b>.' },
    ], [
      ord('Order the Médoc villages from south to north.', ['Margaux', 'Saint-Julien', 'Pauillac', 'Saint-Estèphe'], 'Along the Gironde.', { wines: ['leftbank'] }),
      q('choice', 'The 1855 classification ranked châteaux into…', ['Five growths', 'Three tiers', 'Seven climats', 'Ten crus'], 0, 'First to fifth growths.'),
      srt('Which village style?', ['Margaux', 'Pauillac'], [['Perfumed and elegant', 0], ['Powerful, cassis and cedar', 1]], 'Neighbours with different personalities.'),
    ], ['Margaux: OJ C 254, 2023', 'Pauillac: 2019/C 368', 'Saint-Estèphe: OJ C 88, 2022']),

    'fr-pessac': R('fr-pessac', 'Pessac-Léognan', 'Bordeaux\'s city vineyards', [
      { kind: 'text', title: 'Inside the city', big: 'The northern Graves',
        body: 'Pessac-Léognan is the northern part of the <b>Graves</b>, named for its gravel. Some vineyards sit inside Bordeaux\'s city boundary. It makes great <b>reds and dry whites</b>.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Château Haut-Brion', v: 'The only non-Médoc château ranked in 1855 (as a first growth).' },
        { k: 'Whites', v: 'Sauvignon Blanc and Sémillon, often barrel-fermented: among Bordeaux\'s finest.' },
      ] },
    ], [
      q('choice', 'Pessac-Léognan is famous for…', ['Reds and dry whites', 'Sweet wines only', 'Rosé only', 'Sparkling'], 0, 'Both colours.', { wines: ['bdxblanc'] }),
      q('choice', 'Which château was the only non-Médoc wine ranked in 1855?', ['Haut-Brion', 'Mouton Rothschild', 'Pétrus', 'Yquem'], 0, 'A first growth.'),
      q('choice', '"Graves" is named after…', ['Its gravel', 'A family', 'A river', 'A grape'], 0, 'Warm, stony soil.'),
    ], ['Pessac-Léognan: OJ C 284, 2021']),

    'fr-right': R('fr-right', 'St-Émilion & Pomerol', 'Merlot\'s kingdom', [
      { kind: 'text', title: 'The Right Bank', big: 'Clay, limestone, Merlot',
        body: 'Around the town of Libourne, Merlot (with Cabernet Franc) thrives on cooler <b>clay and limestone</b>. The wines are plush and generous.' },
      { kind: 'compare', title: 'Two neighbours', cols: [
        { h: 'Saint-Émilion', items: ['A hilltop medieval town (UNESCO)', 'Limestone plateau and slopes', 'Its own classification, revised regularly'] },
        { h: 'Pomerol', items: ['Small, flat, clay', 'No classification at all', 'Some of the world\'s most expensive wines'] }] },
    ], [
      srt('Saint-Émilion or Pomerol?', ['Saint-Émilion', 'Pomerol'], [['Medieval hilltop town', 0], ['No classification', 1], ['Limestone plateau', 0], ['Small and flat', 1]], 'Right Bank neighbours.', { wines: ['pomerol'] }),
      q('choice', 'The Right Bank\'s main grape?', ['Merlot', 'Cabernet Sauvignon', 'Syrah', 'Malbec'], 0, 'With Cabernet Franc.'),
      q('choice', 'Pomerol\'s classification?', ['There isn\'t one', 'Five growths', 'Grand Cru Classé', 'Seven climats'], 0, 'Fame without ranking.'),
    ], ['Pomerol: OJ C 520, 2021']),

    'fr-bdx-white': R('fr-bdx-white', 'White Bordeaux', 'Sauvignon, Sémillon and friends', [
      { kind: 'text', title: 'Dry whites', big: 'Sauvignon Blanc + Sémillon',
        body: 'Dry white Bordeaux blends <b>Sauvignon Blanc</b> (zesty, grassy) with <b>Sémillon</b> (waxy, rounder), sometimes with Muscadelle. Simple ones are fresh and unoaked; the best are barrel-fermented and age well.' },
      { kind: 'facts', title: 'Where', rows: [
        { k: 'Entre-Deux-Mers', v: 'Fresh, everyday dry whites.' },
        { k: 'Graves & Pessac-Léognan', v: 'The finest, often oaked.' },
      ] },
    ], [
      q('choice', 'In white Bordeaux, Sémillon adds…', ['Waxy roundness', 'Tannin', 'Bubbles', 'Sweetness always'], 0, 'Sauvignon adds zest.', { wines: ['bdxblanc'] }),
      q('choice', 'Entre-Deux-Mers is known for…', ['Fresh, everyday dry whites', 'Sweet wines', 'Tannic reds', 'Sparkling'], 0, 'Between the rivers.'),
      srt('Sauvignon or Sémillon?', ['Sauvignon', 'Sémillon'], [['Grassy and zesty', 0], ['Waxy and round', 1]], 'A perfect pair.'),
    ], ['Entre-deux-Mers: C/2025/201', 'Graves: OJ C 421, 2017']),

    'fr-sauternes': R('fr-sauternes', 'Sauternes & Barsac', 'Noble rot by the Ciron', [
      { kind: 'text', title: 'Five villages, one miracle', big: 'Barsac, Bommes, Fargues, Preignac, Sauternes',
        body: 'Where the cold Ciron meets the warmer Garonne, autumn mists bring <b>noble rot</b>. Grapes (Sémillon, Sauvignon, Muscadelle) are picked <b>by hand, in several passes</b> through the vineyard, taking only nobly rotten berries each time.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Yield', v: 'Tiny: famously "one glass per vine" at the top estates.' },
        { k: 'Barsac', v: 'One of the five villages, with its own appellation too.' },
        { k: 'Château d\'Yquem', v: 'The only "Premier Cru Supérieur" in 1855.' },
      ] },
    ], [
      q('choice', 'Why pick Sauternes in several passes?', ['To take only nobly rotten berries each time', 'Tradition', 'To make it sparkling', 'To freeze them'], 0, 'Hand-picked, berry by berry.', { wines: ['sauternes'] }),
      q('choice', 'Which river\'s mists bring noble rot to Sauternes?', ['The Ciron', 'The Loire', 'The Rhône', 'The Dordogne'], 0, 'Cold Ciron, warm Garonne.'),
      q('choice', 'Château d\'Yquem\'s 1855 rank?', ['Premier Cru Supérieur', 'Fifth growth', 'Unranked', 'Grand Cru'], 0, 'Unique.'),
    ], ['Sauternes: OJ C 520, 2021', 'Barsac: OJ C 520, 2021']),

    'fr-bdx-sup': R('fr-bdx-sup', 'Bordeaux Supérieur', 'Everyday Bordeaux, a step up', [
      { kind: 'text', title: 'Value Bordeaux', big: 'Merlot & Cabernet, round and generous',
        body: 'Most Bordeaux isn\'t a famous château: it\'s good-value <b>Bordeaux</b> and <b>Bordeaux Supérieur</b> from across the region. Supérieur reds have stricter rules than basic Bordeaux and are rounder and more structured: red fruit turning to spice.' },
      { kind: 'text', title: 'Petits châteaux', body: 'Thousands of small family "châteaux" make these wines. "Château" on a label just means a wine estate.' },
    ], [
      q('choice', 'Bordeaux Supérieur is…', ['A step up from basic Bordeaux', 'Sweet', 'White only', 'Bordeaux\'s Grand Cru level'], 0, 'Value with more structure.', { wines: ['merlot'] }),
      q('choice', '"Château" on a Bordeaux label means…', ['A wine estate', 'A castle must exist', 'A first growth', 'Organic'], 0, 'Often a farmhouse.'),
      q('choice', 'Bordeaux Supérieur\'s main grapes?', ['Merlot and Cabernet', 'Pinot Noir', 'Syrah', 'Gamay'], 0, 'Round and generous.'),
    ], ['Bordeaux Supérieur: OJ C 88, 2022']),

    /* ---------------- RHÔNE ---------------- */
    'fr-n-rhone': R('fr-n-rhone', 'Northern Rhône', 'Côte-Rôtie, Hermitage, Crozes, St-Joseph, Cornas', [
      { kind: 'text', title: 'Steep granite, Syrah', big: 'Syrah for reds; Marsanne & Roussanne for whites',
        body: 'From Vienne to Valence, vines cling to <b>steep granite</b> slopes above the Rhône. Reds are <b>Syrah</b>: pepper, olive, violet.' },
      { kind: 'layers', title: 'The crus', rows: [
        { h: 'Côte-Rôtie', t: '"Roasted slope": perfumed Syrah, sometimes with a little Viognier.' },
        { h: 'Hermitage', t: 'A single great hill above Tain: powerful red and rich white.' },
        { h: 'Crozes-Hermitage', t: 'Around the hill: bigger, better value.' },
        { h: 'Saint-Joseph', t: 'A long strip on the west bank.' },
        { h: 'Cornas', t: 'Red only, and the only one made exclusively from Syrah.' },
      ] },
    ], [
      q('choice', 'Which northern Rhône cru is made only from Syrah, red only?', ['Cornas', 'Côte-Rôtie', 'Crozes-Hermitage', 'Saint-Joseph'], 0, 'The others allow white grapes too.', { wines: ['nrhonesyrah'] }),
      q('choice', 'Côte-Rôtie means…', ['Roasted slope', 'Rocky hill', 'Red river', 'Old vineyard'], 0, 'Steep and sun-baked.'),
      srt('Hermitage or Crozes-Hermitage?', ['Hermitage', 'Crozes'], [['A single great hill', 0], ['Around the hill, bigger', 1], ['Powerful, long-lived', 0], ['Better value', 1]], 'The hill and its surroundings.'),
    ], ['Cornas: OJ C 73, 2020', 'Crozes-Hermitage: OJ C 83, 2021', 'Saint-Joseph: C/2024/5920']),

    'fr-condrieu': R('fr-condrieu', 'Condrieu', 'Viognier', [
      { kind: 'text', title: 'Viognier\'s home', big: 'Steep granite terraces',
        body: 'Just south of Côte-Rôtie, Condrieu is all white, built on <b>Viognier</b>: apricot, peach, blossom, full body. Mostly dry, with occasional sweet versions from overripe grapes.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Château-Grillet', v: 'A tiny Viognier appellation inside Condrieu, owned by a single estate.' },
        { k: 'Rescue', v: 'In the 1960s only a few hectares of Viognier were left in the world.' },
      ] },
    ], [
      q('choice', 'Condrieu is made from…', ['Viognier', 'Marsanne', 'Chardonnay', 'Syrah'], 0, 'All white.', { wines: ['viognier'] }),
      q('choice', 'Château-Grillet is…', ['A tiny single-estate Viognier appellation', 'A red wine', 'A village in Burgundy', 'A sparkling wine'], 0, 'Inside Condrieu.'),
      q('choice', 'Can Condrieu be sweet?', ['Occasionally, from overripe grapes', 'Never', 'Always', 'Only sparkling'], 0, 'Mostly dry.'),
    ], ['Condrieu: C/2025/3459']),

    'fr-s-rhone': R('fr-s-rhone', 'Southern Rhône', 'Châteauneuf, Gigondas, Vacqueyras, Tavel', [
      { kind: 'text', title: 'Wide, warm, windy', big: 'Grenache-led blends',
        body: 'South of Montélimar the valley opens out: <b>Mediterranean</b>, sunny, swept by the cold <b>Mistral</b> wind. Wines are <b>blends</b>, led by Grenache with Syrah and Mourvèdre.' },
      { kind: 'layers', title: 'The crus', rows: [
        { h: 'Châteauneuf-du-Pape', t: 'Named after the popes\' summer castle (14th century). Many grapes allowed; famous round stones (galets) store heat.' },
        { h: 'Gigondas & Vacqueyras', t: 'Below the jagged Dentelles de Montmirail: Grenache, Syrah, Mourvèdre.' },
        { h: 'Tavel', t: 'Rosé only: deep-coloured, dry, food-friendly.' },
      ] },
    ], [
      q('choice', 'Tavel makes…', ['Only rosé', 'Only red', 'Only white', 'Sparkling'], 0, 'Deep, dry rosé.', { wines: ['tavel'] }),
      q('choice', 'The Mistral is…', ['A cold wind', 'A grape', 'A river', 'A château'], 0, 'It keeps vines healthy.'),
      q('choice', 'Châteauneuf-du-Pape is named after…', ['The popes\' summer castle', 'A grape', 'A river', 'A king'], 0, 'From the Avignon popes.', { wines: ['chateauneuf'] }),
      q('choice', 'What do the round stones (galets) do?', ['Store heat and help ripening', 'Add flavour', 'Keep water out', 'Nothing'], 0, 'Warm by night.'),
    ], ['Gigondas: OJ C 83, 2021', 'Tavel: PDO-FR-A0328-AM01']),

    'fr-cdr': R('fr-cdr', 'Côtes du Rhône & Villages', 'The Rhône\'s everyday pyramid', [
      { kind: 'layers', title: 'Three steps', rows: [
        { h: 'Côtes du Rhône', t: 'The broad base, across the valley.' },
        { h: 'Côtes du Rhône Villages', t: 'Better sites. Reds are at least 40% Grenache, with at least 25% Syrah and/or Mourvèdre.' },
        { h: 'Villages + name', t: 'Some villages can add their own name, e.g. Cairanne or Séguret (some later became crus).' },
      ] },
      { kind: 'text', title: 'Mostly red', body: 'Almost all Côtes du Rhône Villages is <b>red</b>: round, generous, spicy.' },
    ], [
      ord('Order the Côtes du Rhône pyramid, base to top.', ['Côtes du Rhône', 'Côtes du Rhône Villages', 'Villages + village name'], 'Then come the crus.', { wines: ['cdr'] }),
      q('choice', 'A Côtes du Rhône Villages red must be at least… Grenache.', ['40%', '10%', '85%', '100%'], 0, 'Plus at least 25% Syrah and/or Mourvèdre.'),
      q('choice', 'Most Côtes du Rhône Villages is…', ['Red', 'White', 'Rosé', 'Sparkling'], 0, 'Round and spicy.'),
    ], ['Côtes du Rhône: OJ C 65, 2020', 'Côtes du Rhône Villages: OJ C 21, 2021']),

    /* ---------------- LOIRE ---------------- */
    'fr-muscadet': R('fr-muscadet', 'Muscadet', 'Melon by the sea', [
      { kind: 'text', title: 'Where the Loire meets the Atlantic', big: 'Around Nantes',
        body: 'Muscadet is the Loire\'s western end, near the Atlantic. It\'s <b>Melon</b> (Melon de Bourgogne): light, crisp, lemony, salty. Sèvre et Maine is the biggest zone.' },
      { kind: 'text', title: 'Sur lie', body: 'Wines aged on their lees through the winter can say "<b>sur lie</b>": more texture, a bready note, sometimes a faint prickle.' },
    ], [
      q('choice', 'Muscadet\'s grape?', ['Melon de Bourgogne', 'Muscat', 'Chenin', 'Sauvignon'], 0, 'Not Muscat!', { wines: ['muscadet'] }),
      q('choice', 'Muscadet comes from near…', ['Nantes and the Atlantic', 'Paris', 'Lyon', 'Bordeaux'], 0, 'The Loire\'s western end.'),
      q('choice', 'On a Muscadet label, "sur lie" adds…', ['Texture and a bready note', 'Sweetness', 'Red colour', 'Oak'], 0, 'Lees ageing.'),
    ], ['Muscadet Sèvre et Maine: arrêté 26 Nov 2025']),

    'fr-sancerre': R('fr-sancerre', 'Sancerre & Pouilly-Fumé', 'Sauvignon Blanc\'s home', [
      { kind: 'text', title: 'Facing each other across the Loire', big: 'Sauvignon Blanc on flint and limestone',
        body: '<b>Sancerre</b> (west bank) and <b>Pouilly-Fumé</b> (east bank) face each other across the upper Loire. Both make crisp, mineral <b>Sauvignon Blanc</b>. Sancerre also makes red and rosé from <b>Pinot Noir</b>.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: '"Fumé"', v: 'Smoky: from the gunflint (silex) soils.' },
        { k: 'Soils', v: 'Flint, chalky marl and limestone: each gives a slightly different style.' },
      ] },
    ], [
      srt('Sancerre or Pouilly-Fumé?', ['Sancerre', 'Pouilly-Fumé'], [['West bank', 0], ['East bank', 1], ['Also red Pinot Noir', 0], ['Sauvignon Blanc only', 1]], 'Neighbours across the river.', { wines: ['sancerre'] }),
      q('choice', 'Why "Fumé"?', ['A smoky note from flinty soils', 'It\'s smoked', 'It\'s aged in smoke', 'A family name'], 0, 'Gunflint, silex.'),
      q('choice', 'Red Sancerre is made from…', ['Pinot Noir', 'Gamay', 'Cabernet Franc', 'Syrah'], 0, 'Light and fresh.'),
    ], ['Pouilly-Fumé: OJ C 466, 2022', 'Sancerre: décret 2011-1021 (checked earlier)']),

    'fr-chenin': R('fr-chenin', 'Vouvray & Savennières', 'Chenin\'s two faces', [
      { kind: 'compare', title: 'Two homes', cols: [
        { h: 'Vouvray (near Tours)', items: ['Chenin (with a little Orbois)', 'Dry to sweet, still or sparkling', 'Tuffeau limestone caves'] },
        { h: 'Savennières (near Angers)', items: ['Chenin only', 'Usually dry, intense, long-lived', 'On the right bank of the Loire'] }] },
      { kind: 'text', title: 'Tuffeau', body: 'Soft white <b>tuffeau</b> limestone was quarried to build Loire châteaux; the tunnels left behind became cool <b>wine cellars</b>.' },
    ], [
      srt('Vouvray or Savennières?', ['Vouvray', 'Savennières'], [['Near Tours', 0], ['Near Angers', 1], ['Dry to sweet, even sparkling', 0], ['Usually dry and intense', 1]], 'Two faces of Chenin.', { wines: ['savennieres'] }),
      q('choice', 'What is tuffeau?', ['Soft white limestone, now cellars', 'A grape', 'A sweet wine', 'A river'], 0, 'Châteaux were built from it.'),
      q('choice', 'Savennières is made from…', ['Chenin only', 'Sauvignon Blanc', 'Melon', 'Chardonnay'], 0, 'Intense and long-lived.'),
    ], ['Vouvray: OJ C 87, 2021', 'Savennières: OJ C 88, 2020']),

    'fr-cabfranc': R('fr-cabfranc', 'Chinon, Bourgueil, Saumur-Champigny', 'Loire reds', [
      { kind: 'text', title: 'Cabernet Franc country', big: 'Fresh, leafy, raspberry',
        body: 'In the middle Loire, <b>Cabernet Franc</b> makes fresh, red-fruited, leafy reds, often served lightly chilled. Wines from sand and gravel are lighter; from limestone (tuffeau) slopes, firmer and longer-lived.' },
      { kind: 'facts', title: 'Three names', rows: [
        { k: 'Chinon', v: 'On the Vienne river: the most famous.' },
        { k: 'Bourgueil', v: 'Just north of the Loire: firmer.' },
        { k: 'Saumur-Champigny', v: 'Near Saumur: juicy and bright.' },
      ] },
    ], [
      q('choice', 'Chinon is made mostly from…', ['Cabernet Franc', 'Pinot Noir', 'Gamay', 'Merlot'], 0, 'Fresh and leafy.', { wines: ['cabfranc'] }),
      srt('Sand and gravel or limestone slopes?', ['Sand & gravel', 'Limestone'], [['Lighter, for drinking young', 0], ['Firmer, longer-lived', 1]], 'Soil shapes the style (Roots 2.3).'),
      q('choice', 'Loire Cabernet Franc is often served…', ['Lightly chilled', 'Hot', 'With ice', 'Warm'], 0, 'Fresh and fruity.'),
    ]),

    'fr-cremant-loire': R('fr-cremant-loire', 'Crémant de Loire', 'Traditional-method bubbles', [
      { kind: 'text', title: 'Loire sparkling', big: 'Second fermentation in the bottle',
        body: 'Crémant de Loire uses the <b>traditional method</b>, like Champagne. Chenin Blanc, Chardonnay and Cabernet Franc are key grapes. The Saumur area, with its tuffeau cellars, is the heart of Loire sparkling.' },
      { kind: 'layers', title: 'What makes a Crémant', rows: [
        { h: 'Hand-picked', t: 'Whole bunches, gently pressed.' },
        { h: 'Lees', t: 'At least 9 months on the lees.' },
        { h: 'Other Crémants', t: 'Alsace, Burgundy, Jura, Bordeaux, Limoux…' },
      ] },
    ], [
      q('choice', 'Crémant must spend at least… on its lees.', ['9 months', '1 month', '3 years', 'No rule'], 0, 'Champagne needs longer.', { wines: ['cremantdeloire'] }),
      q('choice', 'Crémant de Loire is made by…', ['The traditional method', 'The tank method', 'Adding CO₂', 'Freezing'], 0, 'Like Champagne.'),
      q('choice', 'The heart of Loire sparkling is around…', ['Saumur', 'Nantes', 'Sancerre', 'Orléans'], 0, 'Tuffeau cellars.'),
    ], ['EU Reg. 2019/33, Art. 53', 'Crémant de Loire: arrêté 12 Jan 2024']),

    /* ---------------- PROVENCE & CORSICA ---------------- */
    'fr-cdp': R('fr-cdp', 'Côtes de Provence', 'The home of pale rosé', [
      { kind: 'text', title: 'Pale, dry, Mediterranean', big: 'Mostly rosé',
        body: 'Côtes de Provence, between Marseille and Nice, makes mostly <b>pale, dry rosé</b>: strawberry, citrus, herbs. Sunshine, the Mistral and the sea set the scene.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Grapes', v: 'Grenache, Cinsault, Syrah, Mourvèdre, Tibouren; whites Rolle (Vermentino) and others.' },
        { k: 'Sub-zones', v: 'Some can add a name, like Sainte-Victoire or La Londe.' },
      ] },
    ], [
      q('choice', 'Côtes de Provence makes mostly…', ['Pale, dry rosé', 'Sweet whites', 'Tannic reds', 'Sparkling'], 0, 'The world\'s rosé benchmark.', { wines: ['provencerose'] }),
      q('choice', 'Rolle is Provence\'s name for…', ['Vermentino', 'Grenache', 'Ugni Blanc', 'Syrah'], 0, 'Remember Vermentino\'s lesson.'),
      q('choice', 'Sainte-Victoire on a label is…', ['A Côtes de Provence sub-zone', 'A grape', 'A château', 'A sweetness level'], 0, 'Named after the mountain Cézanne painted.'),
    ], ['Côtes de Provence: OJ C 62, 2020']),

    'fr-aix': R('fr-aix', 'Coteaux d\'Aix-en-Provence', 'Western Provence', [
      { kind: 'text', title: 'Around Aix', big: 'Rosé first, reds too',
        body: 'West of Côtes de Provence, around Aix, this appellation also leads with <b>rosé</b>, plus reds and whites. Mediterranean grapes dominate, with some Cabernet Sauvignon allowed, a nod to the region\'s history.' },
      { kind: 'text', title: 'Les Baux-de-Provence', body: 'A neighbouring appellation known for <b>organic</b> farming, among dramatic limestone outcrops.' },
    ], [
      q('choice', 'Coteaux d\'Aix leads with…', ['Rosé', 'Sweet wine', 'Sparkling', 'Fortified wine'], 0, 'Plus reds and whites.', { wines: ['provencerose'] }),
      q('choice', 'Les Baux-de-Provence is known for…', ['Organic farming', 'Icewine', 'Port', 'Riesling'], 0, 'Dramatic limestone landscape.'),
      q('choice', 'Which non-Mediterranean grape is allowed in Coteaux d\'Aix?', ['Cabernet Sauvignon', 'Riesling', 'Nebbiolo', 'Pinot Noir'], 0, 'A historical nod.'),
    ], ['Coteaux d\'Aix-en-Provence: OJ C 83, 2020']),

    'fr-bandol': R('fr-bandol', 'Bandol', 'Mourvèdre-led', [
      { kind: 'text', title: 'Terraces above the sea', big: 'Red: at least 50% Mourvèdre',
        body: 'Bandol\'s terraced hills face the Mediterranean. Late-ripening <b>Mourvèdre</b> needs this heat. Reds spend <b>18 months in wood</b> (usually big casks): powerful, tannic, long-lived. Rosés contain at least 20% Mourvèdre and are firmer than most.' },
    ], [
      q('choice', 'A red Bandol must contain at least… Mourvèdre.', ['50%', '20%', '10%', '100%'], 0, 'Rosé needs at least 20%.', { wines: ['bandol'] }),
      q('choice', 'Red Bandol spends how long in wood?', ['18 months', '1 month', '5 years', 'None'], 0, 'Usually in big casks.'),
      q('choice', 'Bandol rosé is…', ['Firmer, with some Mourvèdre', 'Sweet', 'Sparkling', 'Made from white grapes'], 0, 'Keeps longer than most.'),
    ], ['Bandol: C/2025/4233']),

    'fr-cassis': R('fr-cassis', 'Cassis', 'White wine under the cliffs', [
      { kind: 'text', title: 'A fishing port near Marseille', big: 'Mostly white',
        body: 'Cassis, beneath some of Europe\'s highest sea cliffs, is unusual in Provence: it\'s best known for <b>white</b> wine, mainly <b>Marsanne and Clairette</b>: fresh, herbal, salty. Perfect with bouillabaisse.' },
    ], [
      q('choice', 'Cassis is best known for…', ['White wine', 'Rosé', 'Red', 'Sweet wine'], 0, 'Unusual in Provence.', { wines: ['cassisblanc'] }),
      q('choice', 'Cassis whites are mainly…', ['Marsanne and Clairette', 'Chardonnay', 'Riesling', 'Sauvignon'], 0, 'Herbal and salty.'),
      q('choice', 'The classic Cassis food match?', ['Bouillabaisse', 'Steak', 'Chocolate', 'Curry'], 0, 'Marseille\'s fish stew.'),
    ], ['Cassis: C/2026/2476']),

    'fr-rose-grapes': R('fr-rose-grapes', 'The rosé grapes', 'How pale pink is made', [
      { kind: 'layers', title: 'The grapes', rows: [
        { h: 'Grenache', t: 'Red fruit, body, warmth.' },
        { h: 'Cinsault', t: 'Delicate, floral, pale.' },
        { h: 'Syrah & Mourvèdre', t: 'Colour and structure.' },
        { h: 'Tibouren', t: 'A local Provençal speciality: herbal, earthy.' },
      ] },
      { kind: 'compare', title: 'Two methods', cols: [
        { h: 'Direct press', items: ['Press black grapes straight away', 'Very pale, delicate'] },
        { h: 'Short maceration / saignée', items: ['A few hours on the skins, or bleed juice off a red tank', 'Deeper colour, more body'] }] },
    ], [
      srt('Direct press or saignée?', ['Direct press', 'Saignée'], [['Very pale', 0], ['Juice bled from a red tank', 1], ['Pressed straight away', 0], ['Deeper colour', 1]], 'Time on skins = colour.', { wines: ['provencerose'] }),
      q('choice', 'Which grape is a Provençal rosé speciality?', ['Tibouren', 'Riesling', 'Nebbiolo', 'Malbec'], 0, 'Herbal and earthy.'),
      q('choice', 'Cinsault brings…', ['Delicacy and pale, floral notes', 'Deep colour', 'Tannin', 'Sweetness'], 0, 'A classic rosé grape.'),
    ], ['Bandol (rosé methods): C/2025/4233']),

    'fr-corsica': R('fr-corsica', 'Corsica', 'Vermentinu, Niellucciu, Sciaccarellu', [
      { kind: 'text', title: 'A mountain in the sea', big: 'French island, Italian grapes',
        body: 'Corsica is closer to Italy than to France, and its grapes show it: <b>Vermentinu</b> (Vermentino) for whites, <b>Niellucciu</b> (related to Sangiovese) and <b>Sciaccarellu</b> for reds.' },
      { kind: 'compare', title: 'Two red homes', cols: [
        { h: 'Patrimonio (north)', items: ['Limestone near Cap Corse', 'Reds at least 90% Niellucciu: firm, structured'] },
        { h: 'Ajaccio (west)', items: ['Granite', 'Sciaccarellu: pale, peppery, perfumed'] }] },
    ], [
      q('choice', 'Patrimonio reds must be at least… Niellucciu.', ['90%', '10%', '50%', '75%'], 0, 'Firm and structured.', { wines: ['corsica'] }),
      srt('Patrimonio or Ajaccio?', ['Patrimonio', 'Ajaccio'], [['Limestone, north', 0], ['Granite, west', 1], ['Niellucciu', 0], ['Sciaccarellu', 1]], 'Two Corsican homes.'),
      q('choice', 'Niellucciu is related to…', ['Sangiovese', 'Pinot Noir', 'Syrah', 'Merlot'], 0, 'Italy\'s influence.'),
    ], ['Patrimonio: OJ C 401, 2022', 'Vin de Corse: PDO notice']),

    /* ---------------- SOUTH, SOUTH-WEST & MOUNTAINS ---------------- */
    'fr-languedoc': R('fr-languedoc', 'Languedoc', 'France\'s biggest vineyard', [
      { kind: 'text', title: 'Hot, dry, windy', big: 'Garrigue and old vines',
        body: 'The Languedoc arcs along the Mediterranean from the Rhône to Spain. Hot, dry, windy: wild herbs (<b>garrigue</b>) scent the hills. Once famous for bulk wine, it now makes characterful reds from <b>Grenache, Syrah, Mourvèdre, Carignan and Cinsault</b>.' },
      { kind: 'facts', title: 'Names to know', rows: [
        { k: 'Pic Saint-Loup, Faugères, Minervois, Corbières', v: 'Distinct hill zones with their own styles.' },
        { k: 'Limoux', v: 'Sparkling wine with a long history.' },
      ] },
    ], [
      q('choice', 'What is garrigue?', ['Wild herbs that scent the hills', 'A grape', 'A wind', 'A barrel'], 0, 'Thyme, rosemary, lavender.', { wines: ['languedoc'] }),
      q('choice', 'Limoux is known for…', ['Sparkling wine', 'Sweet wine', 'Icewine', 'Rosé only'], 0, 'With a long history.'),
      q('choice', 'The Languedoc\'s climate?', ['Hot, dry, Mediterranean', 'Cool and rainy', 'Continental and snowy', 'Tropical'], 0, 'Wind keeps vines healthy.'),
    ], ['Languedoc: OJ C 98, 2020']),

    'fr-picpoul': R('fr-picpoul', 'Picpoul de Pinet', 'The lip-stinger by the lagoon', [
      { kind: 'text', title: 'Beside the Étang de Thau', big: 'Piquepoul Blanc',
        body: 'Near Sète, by a big saltwater lagoon, <b>Piquepoul Blanc</b> makes crisp, lemony, salty whites. The lagoon and sea breeze keep temperatures even. It\'s the local match for oysters from the lagoon.' },
    ], [
      q('choice', 'In the Languedoc, Picpoul de Pinet grows beside…', ['A saltwater lagoon near Sète', 'The Atlantic', 'A mountain lake', 'The Rhine'], 0, 'The Étang de Thau.', { wines: ['picpoul'] }),
      q('choice', 'What do the lagoon and sea breeze do?', ['Keep temperatures even', 'Add sugar', 'Make bubbles', 'Bring frost'], 0, 'Warm maritime climate.'),
      q('choice', 'The local pairing for Picpoul?', ['Oysters', 'Lamb', 'Cheese fondue', 'Chocolate'], 0, 'From the same lagoon.'),
    ], ['Picpoul de Pinet: OJ C 253, 2017']),

    'fr-roussillon': R('fr-roussillon', 'Roussillon', 'Catalan France', [
      { kind: 'text', title: 'Sun, schist, Pyrenees', big: 'Bold reds and sweet wines',
        body: 'Roussillon, by the Spanish border, is France\'s sunniest wine region. Old Grenache and Carignan vines on schist give powerful reds (Côtes du Roussillon).' },
      { kind: 'layers', title: 'Vins doux naturels', rows: [
        { h: 'What', t: 'Grape spirit is added during fermentation, keeping natural sugar: like Port.' },
        { h: 'Banyuls', t: 'Grenache-based, from steep terraces above the sea.' },
        { h: 'Maury & Rivesaltes', t: 'Red, tawny, and Muscat versions.' },
      ] },
    ], [
      q('choice', 'A vin doux naturel is made by…', ['Adding spirit during fermentation', 'Freezing grapes', 'Noble rot', 'A second fermentation'], 0, 'Like Port.', { wines: ['banyuls'] }),
      q('choice', 'Banyuls is based on…', ['Grenache', 'Riesling', 'Pinot Noir', 'Chardonnay'], 0, 'Terraces above the sea.'),
      q('choice', 'Roussillon borders…', ['Spain', 'Italy', 'Germany', 'Switzerland'], 0, 'Catalan culture.'),
    ], ['Banyuls: C/2024/6184', 'Côtes du Roussillon: OJ C 224, 2023']),

    'fr-cahors': R('fr-cahors', 'Cahors', 'The original Malbec', [
      { kind: 'text', title: 'The "black wine"', big: 'Malbec on the Lot river',
        body: 'Long before Argentina, Malbec, known here as <b>Côt</b> or Auxerrois, made Cahors\'s famous "<b>black wine</b>", traded to England in the Middle Ages. Cahors is firmer and earthier than Mendoza.' },
      { kind: 'compare', title: 'Two landscapes', cols: [
        { h: 'River terraces', items: ['Along the winding Lot', 'Rounder, fruitier'] },
        { h: 'Limestone plateau (causse)', items: ['Higher, stony', 'Firmer, longer-lived'] }] },
    ], [
      q('choice', 'In Cahors, Malbec is also called…', ['Côt', 'Tannat', 'Fer', 'Négrette'], 0, 'Or Auxerrois.', { wines: ['cahors'] }),
      q('choice', 'Cahors\'s historic nickname?', ['The black wine', 'Liquid gold', 'Bull\'s Blood', 'Blood of Hercules'], 0, 'Deep, dark and famous.'),
      q('choice', 'Cahors grows along which river?', ['The Lot', 'The Loire', 'The Rhône', 'The Garonne'], 0, 'With a limestone plateau above.'),
    ]),

    'fr-madiran': R('fr-madiran', 'Madiran', 'Tannat', [
      { kind: 'text', title: 'Pyrenean foothills', big: 'Tannat, tamed',
        body: 'Madiran, south of the Adour river, makes powerful reds led by <b>Tannat</b>, with Cabernets and the local Fer. Tannat is so tannic that Madiran pioneered <b>micro-oxygenation</b> in the 1990s: feeding tiny amounts of oxygen to soften it.' },
      { kind: 'facts', title: 'Food', rows: [{ k: 'Duck', v: 'Confit and cassoulet: fat tames tannin (Topsoil 1.5).' }] },
    ], [
      q('choice', 'Madiran\'s main grape?', ['Tannat', 'Malbec', 'Merlot', 'Syrah'], 0, 'Uruguay\'s favourite, originally from here.', { wines: ['madiran'] }),
      q('choice', 'Micro-oxygenation was pioneered in Madiran to…', ['Soften Tannat\'s tannins', 'Make it sparkle', 'Make it sweet', 'Add colour'], 0, 'Tiny amounts of oxygen.'),
      q('choice', 'Why does duck confit suit Madiran?', ['Fat tames tannin', 'It\'s sweet', 'It\'s spicy', 'It\'s acidic'], 0, 'Topsoil 1.5.'),
    ], ['Madiran: C/2025/321']),

    'fr-jurancon': R('fr-jurancon', 'Jurançon', 'Pyrenean whites, dry and sweet', [
      { kind: 'text', title: 'Hilltop vines below the Pyrenees', big: 'Gros & Petit Manseng',
        body: 'Jurançon, near Pau, grows <b>Gros Manseng</b> and <b>Petit Manseng</b>, with thrilling acidity. Dry Jurançon is lively; sweet Jurançon comes from grapes left to shrivel on the vine into late autumn: tropical, spicy and fresh.' },
      { kind: 'try', title: 'A royal baptism', body: 'Legend says the future King Henri IV was born nearby in 1553…',
        prompt: 'What touched his lips first?',
        reveal: 'A drop of <b>Jurançon</b> and a rub of garlic, as was the local custom.' },
    ], [
      q('choice', 'Jurançon\'s grapes?', ['Gros and Petit Manseng', 'Chardonnay', 'Sauvignon', 'Chenin'], 0, 'Thrilling acidity.', { wines: ['jurancon'] }),
      q('choice', 'Sweet Jurançon is made from grapes that are…', ['Left to shrivel on the vine', 'Frozen', 'Fortified', 'Nobly rotten only'], 0, 'Late harvest.'),
      q('choice', 'Which future king was "baptised" with Jurançon?', ['Henri IV', 'Louis XIV', 'Napoleon', 'Charlemagne'], 0, 'Legend has it.'),
    ], ['Jurançon: C/2025/5378']),

    'fr-jura': R('fr-jura', 'Jura', 'Vin jaune', [
      { kind: 'text', title: 'Between Burgundy and Switzerland', big: 'Quirky, old-fashioned, brilliant',
        body: 'The Jura\'s local grapes are <b>Savagnin</b> (white), and <b>Poulsard</b> and <b>Trousseau</b> (light reds), with Chardonnay and Pinot Noir from neighbouring Burgundy.' },
      { kind: 'layers', title: 'Specialities', rows: [
        { h: 'Vin jaune', t: 'Savagnin aged for years under a film of yeast; sold in a 62 cl clavelin. Château-Chalon is its most famous home.' },
        { h: 'Vin de paille', t: '"Straw wine": sweet, from grapes dried for at least 6 weeks.' },
        { h: 'Crémant du Jura', t: 'Traditional-method sparkling.' },
      ] },
    ], [
      q('choice', 'Vin de paille is made from grapes…', ['Dried for at least 6 weeks', 'Frozen on the vine', 'Fortified', 'Picked green'], 0, '"Straw wine".', { wines: ['vinjaune'] }),
      q('choice', 'Poulsard and Trousseau are…', ['Light Jura reds', 'Whites', 'Sweet wines', 'Villages'], 0, 'Jura\'s local reds.'),
      q('choice', 'Vin jaune\'s most famous home?', ['Château-Chalon', 'Arbois', 'Beaune', 'Sancerre'], 0, 'Only vin jaune is made there.'),
    ], ['Côtes du Jura: OJ C 49, 2023']),

    'fr-savoie': R('fr-savoie', 'Savoie', 'Alpine whites', [
      { kind: 'text', title: 'Vineyards below the Alps', big: 'Crisp, light, ski-chalet wines',
        body: 'Savoie\'s vineyards sit on steep, sunny slopes between lakes and mountains. Its wines are mostly light, crisp <b>whites</b>.' },
      { kind: 'facts', title: 'Grapes', rows: [
        { k: 'Jacquère', v: 'The main white: light, floral, crisp.' },
        { k: 'Altesse (Roussette)', v: 'Richer, can age.' },
        { k: 'Mondeuse', v: 'Peppery, deep-coloured red.' },
      ] },
    ], [
      q('choice', 'Savoie\'s main white grape?', ['Jacquère', 'Chardonnay', 'Sauvignon', 'Riesling'], 0, 'Light and crisp.', { wines: ['savoie'] }),
      q('choice', 'Mondeuse is…', ['A peppery red', 'A white', 'A cheese', 'A lake'], 0, 'Savoie\'s red.'),
      q('choice', 'Altesse is also called…', ['Roussette', 'Rolle', 'Fendant', 'Côt'], 0, 'Richer, can age.'),
    ], ['Vin de Savoie: Reg. (EU) 2026/2016']),
  });
})();
