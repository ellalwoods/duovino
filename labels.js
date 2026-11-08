/* Track B: Reading the label. Every lesson starts from a label and works out to grapes, rules and taste.
 *
 * CONTENT RULE: appellation units (everything outside B0) state legal rules such as permitted grapes,
 * minimum percentages and ageing minimums. A unit may only get `lesson`/`questions` once those rules
 * have been checked against the official text (cahier des charges, disciplinare, pliego de condiciones,
 * or the equivalent). Record that check in `sources` and `checked` (YYYY-MM-DD) on the unit.
 */
(() => {
  const D = window.DUOVINO, C = D.C;

  Object.assign(D.concepts, {
    placenotgrape: { name: 'Place, not grape', short: 'Place', kind: 'Label', wine: C.lemonGreen, style: 'white', shape: 'burgundy',
      q: 'Why don\'t most European labels name the grape?', a: 'They name the appellation: a protected place with its own rulebook, including which grapes are allowed. Know the appellation and you know the grapes.' },
    applocation: { name: 'Finding the appellation', short: 'Finding', kind: 'Label', wine: C.lemon, style: 'white', shape: 'flute',
      q: 'Where does the appellation sit on a French and an Italian label?', a: 'France: between "Appellation" and "Contrôlée"/"Protégée". Italy: before "Denominazione di Origine Controllata" (DOC) or "…e Garantita" (DOCG).' },
    grapenamed: { name: 'Where Europe names the grape', short: 'Exceptions', kind: 'Label', wine: C.gold, style: 'white', shape: 'flute',
      q: 'Name the main European exceptions where labels usually name the grape.', a: 'Alsace, IGP Pays d\'Oc, and most of Germany and Austria.' },
    germanlabel: { name: 'German vineyard names', short: 'Lage', kind: 'Label', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'On a German label, what does "Wehlener Sonnenuhr" mean?', a: 'The Sonnenuhr vineyard in the village of Wehlen. Adding "-er" to a village name makes it "from Wehlen".' },

    pdopgi: { name: 'PDO & PGI', short: 'PDO/PGI', kind: 'Label', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'What are the EU\'s two levels of geographical indication?', a: 'PDO (Protected Designation of Origin): smaller areas, tighter rules. PGI (Protected Geographical Indication): broader regions, looser rules.' },
    frladder: { name: 'The French ladder', short: 'France', kind: 'Label', wine: C.garnet, style: 'red', shape: 'burgundy',
      q: 'The French quality ladder, top to bottom?', a: 'AOC/AOP → IGP → Vin de France.' },
    itladder: { name: 'The Italian ladder', short: 'Italy', kind: 'Label', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'The Italian quality ladder, top to bottom? And how do you spot the top tier?', a: 'DOCG → DOC → IGT. DOCG bottles carry a government strip on the neck.' },
    esladder: { name: 'The Spanish ladder', short: 'Spain', kind: 'Label', wine: C.garnet, style: 'red', shape: 'bordeaux',
      q: 'Which two Spanish regions hold DOCa/DOQ status, and what is a Vino de Pago?', a: 'Rioja (DOCa) and Priorat (DOQ). A Vino de Pago is a single estate with its own appellation.' },
    deladder: { name: 'The German ladder', short: 'Germany', kind: 'Label', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'The German quality ladder, top to bottom?', a: 'Prädikatswein → Qualitätswein → Landwein (Germany\'s PGI tier).' },
    praedikat: { name: 'Prädikat ≠ sweetness', short: 'Prädikat', kind: 'Label', wine: C.gold, style: 'sweet', shape: 'flute',
      q: 'Does Spätlese mean sweet?', a: 'Not necessarily. A Prädikat tells you how ripe the grapes were at harvest. Look for "trocken" (dry) to know the style.' },

    regmarketing: { name: 'Law vs marketing', short: 'Law/Mktg', kind: 'Label', wine: C.amber, style: 'white', shape: 'burgundy',
      q: 'Name two French label terms with no legal meaning.', a: 'Vieilles Vignes (old vines) and Réserve. Both are the producer\'s choice of words, not regulated terms.' },
    crutiers: { name: 'Cru words', short: 'Cru', kind: 'Label', wine: C.garnet, style: 'red', shape: 'burgundy',
      q: 'What does "Grand Cru" mean in Burgundy, and in Champagne?', a: 'Burgundy: a top-rated vineyard. Champagne: a top-rated village.' },
    ittiers: { name: 'Classico, Superiore, Riserva', short: 'Classico', kind: 'Label', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'What do Classico, Superiore and Riserva tell you?', a: 'Classico: the historic heart of the zone. Superiore: stricter rules (often more alcohol or ageing). Riserva: extra ageing, with the minimum set by each appellation.' },
  });

  // Small helpers to build sample labels: s(text, key, opts)
  const s = (t, k, o = {}) => ({ t, k, ...o });

  const intro = {
    title: 'Before you order',
    units: [
      {
        id: 'b0-1', title: 'Place, not grape', sub: 'Why Europe names the where',
        lesson: [
          { kind: 'label', title: 'Where\'s the grape?', body: 'This label never says which grape is inside. It doesn\'t need to. Tap the highlighted words.',
            label: { style: 'loire', lines: [
              [s('Domaine des Caillottes', 'producer', { note: 'The producer. A name, not a rule.' })],
              [s('Sancerre', 'app', { big: true, note: 'The appellation: a protected place with its own rulebook. White Sancerre must be Sauvignon Blanc, so expect a dry, crisp white with high acidity and notes of gooseberry and grass.' })],
              [s('Appellation Sancerre Contrôlée', 'aoc', { small: true, note: 'The legal line. The word between "Appellation" and "Contrôlée" is the appellation.' })],
              [s('2023', 'vintage', { note: 'The vintage: the year the grapes were picked.' })],
            ] } },
          { kind: 'text', title: 'The appellation is a recipe', big: 'Label → place → grapes → taste',
            body: 'In Europe an appellation is a protected place with its own rulebook: which grapes, what yields, how long to age. Learn the appellation and the label tells you the grapes, even when it never names them.' },
          { kind: 'facts', title: 'Places and their grapes', body: 'A few famous names to start with. On the label you see the place; the grape is implied.', rows: [
            { k: 'Sancerre', v: 'Sauvignon Blanc (its whites): crisp, gooseberry, grass.' },
            { k: 'Chablis', v: 'Chardonnay: green apple, lemon, stony.' },
            { k: 'Beaujolais', v: 'Gamay: light, juicy red.' },
            { k: 'Barolo', v: 'Nebbiolo: pale but powerful red.' },
            { k: 'Rioja', v: 'Mostly Tempranillo: red.' },
            { k: 'Pomerol', v: 'Mostly Merlot: plush red.' },
          ] },
          { kind: 'facts', title: 'Where to find the appellation', rows: [
            { k: 'France', v: 'Between "Appellation" and "Contrôlée" (or "Protégée").' },
            { k: 'Italy', v: 'Before "Denominazione di Origine Controllata" (DOC) or "…e Garantita" (DOCG).' },
            { k: 'Spain', v: 'With "Denominación de Origen" (DO) or "…Calificada" (DOCa), often repeated on a back-label seal.' },
            { k: 'Portugal', v: 'With "Denominação de Origem Controlada" (DOC) or "DOP".' },
            { k: 'Germany', v: 'The region (e.g. Mosel), often with a village and vineyard. Wehlener Sonnenuhr = the Sonnenuhr vineyard in Wehlen.' },
          ] },
          { kind: 'try', title: 'Germany reads differently', body: 'Here is a typical German label line:',
            prompt: '"Wehlener Sonnenuhr Riesling Spätlese." Which word is the grape?',
            reveal: '<b>Riesling</b>. Germany is one of Europe\'s exceptions: most labels name the grape. Wehlen is the village (the "-er" means "from Wehlen"), Sonnenuhr is the vineyard, and Spätlese is the ripeness level at harvest.' },
          { kind: 'layers', title: 'Where Europe names the grape', rows: [
            { h: 'Alsace', t: 'Labels usually name the grape: Riesling, Gewurztraminer, Pinot Gris.' },
            { h: 'IGP Pays d\'Oc', t: 'Southern France\'s big regional category, with grape-named labels like "Pays d\'Oc Merlot".' },
            { h: 'Germany & Austria', t: 'Most labels name the grape alongside the place.' },
            { h: 'And the New World', t: 'Almost always grape-named, and the place doesn\'t fix the grape (Track B5).' },
          ] },
        ],
        questions: [
          { type: 'label', concept: 'applocation', q: 'Tap the appellation.',
            label: { style: 'burgundy', lines: [
              [s('Domaine Pierre-Blanche', 'producer')], [s('Chablis', 'app', { big: true })],
              [s('Appellation Chablis Contrôlée', 'aoc', { small: true })], [s('2022', 'vintage'), s('Mis en bouteille au domaine', 'bottled', { small: true })],
            ] }, answer: 'app',
            explain: 'Chablis is the appellation: the word sitting inside "Appellation … Contrôlée", and usually the biggest word on the label.' },
          { type: 'chain', concept: 'placenotgrape', wines: ['sancerre'], q: 'Read this label from the outside in.',
            label: { style: 'loire', lines: [
              [s('Domaine du Moulin Bas', 'producer')], [s('Sancerre', 'app', { big: true })],
              [s('Appellation Sancerre Contrôlée', 'aoc', { small: true })], [s('2023', 'vintage')],
            ] },
            steps: [
              { q: 'What is "Sancerre" here?', options: ['The appellation (a place)', 'The producer', 'The grape', 'A brand name'], answer: 0 },
              { q: 'So which grape is in the bottle?', options: ['Chardonnay', 'Sauvignon Blanc', 'Chenin Blanc', 'Melon de Bourgogne'], answer: 1 },
              { q: 'What will it taste like?', options: ['Sweet, honeyed, low acidity', 'Full-bodied with vanilla and toast', 'Dry, high acidity, gooseberry and grass', 'Tannic red with black cherry'], answer: 2 },
            ],
            explain: 'Label → appellation → grape → taste. This is the drill you\'ll run on every label in Track B.' },
          { type: 'sort', concept: 'placenotgrape', q: 'Grape or place?', buckets: ['Place', 'Grape'],
            items: [{ t: 'Pomerol', b: 0 }, { t: 'Gamay', b: 1 }, { t: 'Barolo', b: 0 }, { t: 'Nebbiolo', b: 1 }, { t: 'Rioja', b: 0 }, { t: 'Tempranillo', b: 1 }],
            explain: 'European labels lead with the place: Pomerol, Barolo, Rioja. Your job is to know the grapes behind each one.' },
          { type: 'odd', concept: 'placenotgrape', q: 'Which one is NOT a place?',
            options: ['Sancerre', 'Chablis', 'Merlot', 'Rioja'], answer: 2,
            explain: 'Merlot is a grape. The other three are appellations, and each one tells you its grapes.' },
          { type: 'choice', concept: 'grapenamed', q: 'A French label reads "Pays d\'Oc · Merlot". Why does it name the grape?',
            options: ['It\'s an error', 'It\'s an IGP from southern France, where grape-named labels are the norm', 'All French wines name the grape', 'Merlot is the name of the village'], answer: 1,
            explain: 'IGP Pays d\'Oc is one of Europe\'s big exceptions. Grape-named labels help it sell alongside New World wines.' },
          { type: 'choice', concept: 'germanlabel', q: '"Wehlener Sonnenuhr" on a German label means…',
            options: ['A grape variety', 'The Sonnenuhr vineyard in the village of Wehlen', 'A sweetness level', 'The producer\'s family name'], answer: 1,
            explain: 'Village + "-er", then vineyard: Wehlener Sonnenuhr, Piesporter Goldtröpfchen. It\'s like an address.' },
        ],
      },
      {
        id: 'b0-2', title: 'The quality ladders', sub: 'AOP, DOCG, DOCa, Prädikat',
        lesson: [
          { kind: 'text', title: 'Every country has a ladder', big: 'PDO · PGI · wine without GI',
            body: 'EU law has two levels of geographical indication: <b>PDO</b> (Protected Designation of Origin) for smaller areas with tighter rules, and <b>PGI</b> (Protected Geographical Indication) for broader regions with looser rules. Below those is wine with no geographical indication. Each country has its own words for these levels.' },
          { kind: 'facts', title: 'France', rows: [
            { k: 'AOC / AOP', v: 'The tightest rules. AOC is the French term and AOP the EU one; they mean the same thing.' },
            { k: 'IGP', v: 'Broader regions with more freedom over grapes (formerly Vin de Pays).' },
            { k: 'Vin de France', v: 'No region named, but it may show the grape and vintage (formerly Vin de Table).' },
          ] },
          { kind: 'facts', title: 'Italy', rows: [
            { k: 'DOCG', v: 'The top tier. Look for the government strip around the neck.' },
            { k: 'DOC', v: 'A defined area with its own rules.' },
            { k: 'IGT', v: 'Regional and flexible. Many "Super Tuscans" started here.' },
          ] },
          { kind: 'facts', title: 'Spain', rows: [
            { k: 'DOCa / DOQ', v: 'The top of the standard ladder. Only two: Rioja (DOCa) and Priorat (DOQ, its Catalan name).' },
            { k: 'DO', v: 'The main quality tier: Ribera del Duero, Rías Baixas, Rueda, Cava…' },
            { k: 'Vino de Pago', v: 'A single estate with its own appellation.' },
          ] },
          { kind: 'facts', title: 'Germany', rows: [
            { k: 'Prädikatswein', v: 'Top tier, labelled by ripeness at harvest, from least to most ripe: Kabinett, Spätlese, Auslese, Beerenauslese, Trockenbeerenauslese, plus Eiswein (from frozen grapes).' },
            { k: 'Qualitätswein', v: 'From one of 13 specified wine regions (Anbaugebiete).' },
            { k: 'Landwein', v: 'Germany\'s PGI tier.' },
          ] },
          { kind: 'try', title: 'The Prädikat trap', body: 'German Prädikats are a ripeness scale.',
            prompt: 'So does "Spätlese" mean the wine is sweet?',
            reveal: 'Not necessarily. A Prädikat tells you how ripe the grapes were when picked, not how much sugar is left in the wine. A <b>Spätlese trocken</b> is dry. Look for <b>trocken</b> (dry) or <b>feinherb</b> (off-dry) on the label.' },
        ],
        questions: [
          { type: 'order', concept: 'frladder', q: 'Order the French ladder, top to bottom.', items: ['AOC / AOP', 'IGP', 'Vin de France'],
            explain: 'The tightest rules and smallest areas sit at the top. Vin de France names no region at all.' },
          { type: 'order', concept: 'itladder', q: 'Order the Italian ladder, top to bottom.', items: ['DOCG', 'DOC', 'IGT'],
            explain: 'DOCG adds the "G" for Garantita, and the bottle carries a government strip on the neck.' },
          { type: 'sort', concept: 'pdopgi', q: 'Which country uses each term?', buckets: ['France', 'Italy', 'Spain'],
            items: [{ t: 'IGP', b: 0 }, { t: 'DOCG', b: 1 }, { t: 'DOCa', b: 2 }, { t: 'IGT', b: 1 }, { t: 'Vin de France', b: 0 }, { t: 'Vino de Pago', b: 2 }],
            explain: 'Each country has its own words for the same EU levels, so learning the vocabulary is most of the work.' },
          { type: 'label', concept: 'itladder', q: 'Tap the words that tell you this wine is in Italy\'s top tier.',
            label: { style: 'italy', lines: [
              [s('Fattoria Il Poggio', 'producer')], [s('Chianti Classico', 'app', { big: true })],
              [s('Denominazione di Origine Controllata e Garantita', 'docg', { small: true })], [s('2021', 'vintage'), s('13,5% vol', 'abv', { small: true })],
            ] }, answer: 'docg',
            explain: '"…Controllata e Garantita" means DOCG, the top tier. Chianti Classico is the appellation.' },
          { type: 'choice', concept: 'esladder', q: 'Which two Spanish regions hold the top DOCa / DOQ status?',
            options: ['Rioja and Priorat', 'Rioja and Ribera del Duero', 'Rías Baixas and Rueda', 'Cava and Jerez'], answer: 0,
            explain: 'Rioja became DOCa first, then Priorat (DOQ in Catalan). Ribera del Duero, however famous, is a DO.' },
          { type: 'choice', concept: 'praedikat', q: 'A German label reads "Riesling Spätlese trocken". The wine is…',
            options: ['Sweet, because Spätlese means sweet', 'Dry, from grapes picked riper than Kabinett', 'Sparkling', 'Made from frozen grapes'], answer: 1,
            explain: 'The Prädikat tells you ripeness at harvest, and "trocken" tells you the wine is dry.' },
          { type: 'odd', concept: 'deladder', q: 'Which one is NOT a Prädikat?', options: ['Kabinett', 'Auslese', 'Landwein', 'Eiswein'], answer: 2,
            explain: 'Landwein is Germany\'s PGI tier, below Qualitätswein. The others are ripeness levels within Prädikatswein.' },
        ],
      },
      {
        id: 'b0-3', title: 'Law words & sales words', sub: 'Tier terms, and the ones that mean nothing',
        lesson: [
          { kind: 'text', title: 'Some words are rules. Some are poetry.', big: 'Regulated ≠ marketing',
            body: 'Many label words are defined by law and tell you something real. Others sound grand but mean whatever the producer wants. Knowing which is which is half of label reading.' },
          { kind: 'facts', title: 'Cru words', rows: [
            { k: 'Grand Cru', v: 'In Burgundy and Alsace, a top-rated vineyard. In Champagne, a top-rated village.' },
            { k: 'Premier Cru', v: 'In Burgundy, the vineyard tier just below Grand Cru. In Bordeaux\'s 1855 ranking, a "Premier Cru" is a First Growth château.' },
            { k: 'Cru Classé', v: 'A classified estate. Bordeaux has several classifications (Médoc and Sauternes in 1855, Graves, St-Émilion), and Côtes de Provence has its own.' },
          ] },
          { kind: 'facts', title: 'Italian & Spanish tier words', rows: [
            { k: 'Classico', v: 'The historic heart of a zone: Chianti Classico, Soave Classico, Valpolicella Classico.' },
            { k: 'Superiore', v: 'Stricter rules than the basic wine, often higher minimum alcohol or longer ageing.' },
            { k: 'Riserva', v: 'Extra ageing before release. Each appellation sets its own minimum.' },
            { k: 'Reserva', v: 'Spain\'s ageing tiers (Crianza → Reserva → Gran Reserva) have legal minimums, and each DO can set stricter ones.' },
          ] },
          { kind: 'try', title: 'Vieilles Vignes', body: 'A French label proudly says "Vieilles Vignes": old vines.',
            prompt: 'How old must the vines be?',
            reveal: 'There\'s <b>no legal minimum</b> in France, because the term isn\'t regulated. The vines may be very old, or not. It\'s the producer\'s word, not the law\'s.' },
          { kind: 'compare', title: 'Law words vs sales words', body: 'If it\'s defined in a rulebook, it means something. If not, it\'s the producer\'s voice.',
            cols: [{ h: 'Regulated', items: ['Grand Cru, Premier Cru', 'Classico, Riserva', 'Reserva, Gran Reserva', 'Kabinett, Spätlese'] },
                   { h: 'Not regulated in France', items: ['Vieilles Vignes', 'Réserve, Grande Réserve', 'Cuvée Prestige', 'Tête de Cuvée'] }] },
        ],
        questions: [
          { type: 'sort', concept: 'regmarketing', q: 'Law word or sales word?', buckets: ['Regulated', 'Marketing'],
            items: [{ t: 'Grand Cru', b: 0 }, { t: 'Vieilles Vignes', b: 1 }, { t: 'Riserva', b: 0 }, { t: 'Réserve (France)', b: 1 }, { t: 'Classico', b: 0 }, { t: 'Cuvée Prestige', b: 1 }],
            explain: 'Grand Cru, Riserva and Classico are written into appellation rules. The others are the producer\'s choice.' },
          { type: 'label', concept: 'regmarketing', q: 'Tap the words that have no legal meaning.',
            label: { style: 'burgundy', lines: [
              [s('Domaine Lévêque', 'producer')], [s('Gevrey-Chambertin', 'app', { big: true })], [s('Vieilles Vignes', 'vv')],
              [s('Appellation Gevrey-Chambertin Contrôlée', 'aoc', { small: true })], [s('2020', 'vintage')],
            ] }, answer: 'vv',
            explain: '"Vieilles Vignes" isn\'t regulated in France. Gevrey-Chambertin is the appellation, a village in Burgundy\'s Côte de Nuits.' },
          { type: 'choice', concept: 'ittiers', q: '"Classico" on an Italian label tells you…',
            options: ['The wine is aged for longer', 'It comes from the historic heartland of the zone', 'It\'s made in a traditional style', 'It\'s the producer\'s best wine'], answer: 1,
            explain: 'Classico is about where: the original, historic core of a zone. Ageing is what "Riserva" tells you.' },
          { type: 'odd', concept: 'ittiers', q: 'Three of these rank a place. Which one is about ageing?', options: ['Grand Cru', 'Premier Cru', 'Cru Classé', 'Riserva'], answer: 3,
            explain: 'Cru words rank vineyards, villages or estates. Riserva means extra time before release.' },
          { type: 'choice', concept: 'crutiers', q: 'In Champagne, "Grand Cru" refers to…',
            options: ['A single top vineyard', 'A whole village rated at the top', 'The producer\'s top blend', 'A wine aged for at least 10 years'], answer: 1,
            explain: 'Same words, different meaning: Burgundy rates vineyards, Champagne rates villages.' },
          { type: 'label', concept: 'ittiers', q: 'Tap the tier word on this Spanish label.',
            label: { style: 'spain', lines: [
              [s('Bodegas Valdemonte', 'producer')], [s('Rioja', 'app', { big: true })], [s('Gran Reserva', 'gr')],
              [s('Denominación de Origen Calificada', 'doca', { small: true })], [s('2016', 'vintage')],
            ] }, answer: 'gr',
            explain: 'Gran Reserva is the longest-aged tier. The exact Rioja minimums come in the Rioja unit, once checked against its regulations.' },
        ],
      },
    ],
  };

  // ---- Track B skeleton. Units without `lesson`/`questions` show as "coming soon". ----
  const u = (id, title, sub = '') => ({ id: 'b-' + id, title, sub });
  const G = D.grapeLessons;

  // Part 2: Meet the grapes. The first group is the foundation; the rest open once it's done.
  const grapeGroups = [
    { name: 'The big international grapes', core: true, blurb: 'The grapes you\'ll meet on every wine list in the world. Start here.', units: [
      G.chardonnay, G.sauvignon, G.riesling,
      G.pinotgris, G.pinotnoir, G.merlot, G.cabernet, G.syrah ] },
    { name: 'Aromatic & classic whites', blurb: 'Perfumed, textured and long-lived whites.', units: [
      G.chenin,
      G.semillon,
      G.viognier,
      G.gewurz,
      G.muscat,
      G.gruner,
      G.albarino,
      G.melon,
      G.marsanne ] },
    { name: 'Mediterranean & island whites', blurb: 'Sun, sea air and salty freshness.', units: [
      G.vermentino,
      G.assyrtiko,
      G.fiano,
      G.greco,
      G.garganega,
      G.verdicchio,
      G.verdejo,
      G.godello,
      G.picpoul,
      G.malvasia ] },
    { name: 'Classic reds', blurb: 'The backbone of Europe\'s great red regions.', units: [
      G.grenache,
      G.tempranillo,
      G.sangiovese,
      G.nebbiolo,
      G.cabfranc,
      G.gamay,
      G.malbec,
      G.zinfandel,
      G.mourvedre,
      G.barbera,
      G.carignan ] },
    { name: 'Off the beaten track', blurb: 'Fantastic grapes beyond the usual suspects.', units: [
      G.xinomavro,
      G.agiorgitiko,
      G.aglianico,
      G.nerello,
      G.touriga,
      G.blaufrankisch,
      G.saperavi,
      G.tannat,
      G.carmenere,
      G.pinotage,
      G.mencia,
      G.furmint,
      G.torrontes,
      G.koshu,
      G.chasselas,
      G.savagnin,
      G.rkatsiteli ] },
  ];

  // Part 3: Travel the regions, by continent.
  const RL = D.regionLessons || {};
  const ur = (id, title, sub) => RL[id] || u(id, title, sub);
  const continents = [
    { name: 'France', countries: [
      { name: 'France', wine: C.garnet, regions: [
        { name: 'Champagne AOC', at: [4.0, 49.1], units: D.champagneUnits || [ur('fr-champagne', 'Champagne AOC')] },
        { name: 'Burgundy', at: [4.8, 47.0], units: [
          ur('fr-burg-rule', 'The Burgundy rule', 'Red is Pinot Noir, white is Chardonnay'),
          ur('fr-burg-tiers', 'Bourgogne to Grand Cru', 'Regional → village → Premier Cru → Grand Cru'),
          ur('fr-chablis', 'Chablis', 'The four tiers'),
          ur('fr-cote-dor', 'Côte de Nuits & Côte de Beaune', 'The key village names'),
          ur('fr-macon', 'Mâcon & Pouilly-Fuissé'),
          ur('fr-beaujolais', 'Beaujolais', 'Gamay and the ten crus') ] },
        { name: 'Bordeaux', at: [-0.6, 44.9], units: [
          ur('fr-bdx-grapes', 'The Bordeaux grapes'), ur('fr-bdx-banks', 'Left Bank vs Right Bank'),
          ur('fr-medoc', 'The Médoc villages', 'Pauillac, Margaux, St-Julien, St-Estèphe'), ur('fr-pessac', 'Pessac-Léognan'),
          ur('fr-right', 'St-Émilion & Pomerol'), ur('fr-bdx-white', 'White Bordeaux'), ur('fr-sauternes', 'Sauternes & Barsac'), ur('fr-bdx-sup', 'Bordeaux Supérieur') ] },
        { name: 'Rhône', at: [4.8, 44.6], units: [
          ur('fr-n-rhone', 'Northern Rhône', 'Côte-Rôtie, Hermitage, Crozes, St-Joseph, Cornas'), ur('fr-condrieu', 'Condrieu', 'Viognier'),
          ur('fr-s-rhone', 'Southern Rhône', 'Châteauneuf, Gigondas, Vacqueyras, Tavel'), ur('fr-cdr', 'Côtes du Rhône & Villages') ] },
        { name: 'Loire', at: [0.7, 47.3], units: [
          ur('fr-muscadet', 'Muscadet'), ur('fr-sancerre', 'Sancerre & Pouilly-Fumé'), ur('fr-chenin', 'Vouvray & Savennières'),
          ur('fr-cabfranc', 'Chinon, Bourgueil, Saumur-Champigny'), ur('fr-cremant-loire', 'Crémant de Loire') ] },
        { name: 'Alsace', at: [7.3, 48.2], units: [ur('fr-alsace', 'Alsace', 'Grape-named labels, Grand Cru, VT/SGN, Crémant')] },
        { name: 'Provence & Corsica', at: [6.2, 43.5], units: [
          ur('fr-cdp', 'Côtes de Provence'), ur('fr-aix', 'Coteaux d\'Aix-en-Provence'), ur('fr-bandol', 'Bandol', 'Mourvèdre-led'),
          ur('fr-cassis', 'Cassis'), ur('fr-rose-grapes', 'The rosé grapes'), ur('fr-corsica', 'Corsica', 'Vermentinu, Niellucciu, Sciaccarellu') ] },
        { name: 'South, South-West & mountains', at: [2.6, 43.4], units: [
          ur('fr-languedoc', 'Languedoc'), ur('fr-picpoul', 'Picpoul de Pinet'), ur('fr-roussillon', 'Roussillon'),
          ur('fr-cahors', 'Cahors', 'The original Malbec'), ur('fr-madiran', 'Madiran', 'Tannat'), ur('fr-jurancon', 'Jurançon'),
          ur('fr-jura', 'Jura', 'Vin jaune'), ur('fr-savoie', 'Savoie', 'Alpine whites') ] },
      ] },
    ] },
    { name: 'Italy', countries: [
      { name: 'Italy', wine: C.ruby, regions: [
        { name: 'Piedmont', at: [8.0, 44.7], units: [ur('it-barolo', 'Barolo & Barbaresco'), ur('it-barbera', 'Barbera d\'Asti & d\'Alba'), ur('it-dolcetto', 'Dolcetto'), ur('it-gavi', 'Gavi', 'Cortese'), ur('it-moscato', 'Moscato d\'Asti')] },
        { name: 'Tuscany', at: [11.2, 43.4], units: [ur('it-chianti', 'Chianti vs Chianti Classico'), ur('it-montalcino', 'Brunello & Rosso di Montalcino'), ur('it-nobile', 'Vino Nobile di Montepulciano'), ur('it-bolgheri', 'Bolgheri'), ur('it-toscana', 'Toscana IGT')] },
        { name: 'Veneto', at: [11.4, 45.5], units: [ur('it-valpol', 'Valpolicella', 'Ripasso, Amarone, Recioto'), ur('it-soave', 'Soave'), ur('it-prosecco', 'Prosecco', 'DOC vs DOCG')] },
        { name: 'The north', at: [10.9, 46.3], units: [ur('it-franciacorta', 'Franciacorta'), ur('it-trento', 'Trento'), ur('it-altoadige', 'Alto Adige'), ur('it-collio', 'Friuli Collio'), ur('it-liguria', 'Liguria', 'Vermentino & Pigato')] },
        { name: 'Centre, south & islands', at: [14.8, 40.8], units: [ur('it-verdicchio', 'Verdicchio dei Castelli di Jesi'), ur('it-sardinia', 'Sardinia', 'Vermentino di Gallura, Cannonau'), ur('it-etna', 'Etna'), ur('it-sicily', 'Sicily beyond Etna', 'Nero d\'Avola, Grillo'), ur('it-taurasi', 'Taurasi'), ur('it-fiano', 'Fiano di Avellino'), ur('it-greco', 'Greco di Tufo'), ur('it-montepulciano', 'Montepulciano d\'Abruzzo'), ur('it-primitivo', 'Primitivo di Manduria')] },
      ] },
    ] },
    { name: 'Spain & Portugal', countries: [
      { name: 'Spain', wine: C.garnet, regions: [
        { name: 'Spain', at: [-3.7, 41.6], units: [ur('es-rioja', 'Rioja', 'Grapes, ageing tiers, sub-zones'), ur('es-ribera', 'Ribera del Duero'), ur('es-priorat', 'Priorat'), ur('es-toro', 'Toro'), ur('es-bierzo', 'Bierzo', 'Mencía'), ur('es-valdeorras', 'Valdeorras', 'Godello'), ur('es-riasbaixas', 'Rías Baixas', 'Albariño'), ur('es-rueda', 'Rueda', 'Verdejo'), ur('es-jumilla', 'Jumilla', 'Monastrell'), ur('es-penedes', 'Penedès & Cava'), ur('es-jerez', 'Jerez / Sherry', 'The style names are the label key')] },
      ] },
      { name: 'Portugal', wine: C.ruby, regions: [
        { name: 'Portugal', at: [-8.0, 40.6], units: [ur('pt-port', 'Port'), ur('pt-douro', 'Douro'), ur('pt-vinhoverde', 'Vinho Verde'), ur('pt-dao', 'Dão'), ur('pt-bairrada', 'Bairrada'), ur('pt-alentejo', 'Alentejo'), ur('pt-madeira', 'Madeira')] },
      ] },
    ] },
    { name: 'Central & Eastern Europe', countries: [
      { name: 'Germany', wine: C.lemonGreen, regions: [{ name: 'Germany', at: [7.4, 50.0], units: [ur('de-label', 'Reading a German label'), ur('de-mosel', 'Mosel'), ur('de-rheingau', 'Rheingau & Pfalz'), ur('de-trocken', 'Trocken & feinherb'), ur('de-vdp', 'VDP tiers & GG'), ur('de-spatburgunder', 'Spätburgunder', 'German Pinot Noir')] }] },
      { name: 'Austria', wine: C.lemonGreen, regions: [{ name: 'Austria', at: [15.6, 48.3], units: [ur('at-wachau', 'Wachau', 'Steinfeder, Federspiel, Smaragd'), ur('at-kamptal', 'Kamptal & Kremstal'), ur('at-burgenland', 'Burgenland', 'Blaufränkisch & sweet wines')] }] },
      { name: 'Switzerland', wine: C.lemon, regions: [{ name: 'Switzerland', at: [6.8, 46.4], units: [ur('ch-vaud', 'Vaud & Valais', 'Chasselas')] }] },
      { name: 'Hungary', wine: C.gold, regions: [{ name: 'Hungary', at: [21.4, 48.1], units: [ur('hu-tokaji', 'Tokaji', 'Aszú, puttonyos, Szamorodni'), ur('hu-eger', 'Eger', 'Bull\'s Blood')] }] },
      { name: 'Slovenia & Croatia', wine: C.amber, regions: [{ name: 'Slovenia & Croatia', at: [15.5, 44.5], units: [ur('si-brda', 'Goriška Brda & orange wine'), ur('hr-dalmatia', 'Dalmatia', 'Plavac Mali')] }] },
    ] },
    { name: 'Greece & the Eastern Mediterranean', countries: [
      { name: 'Greece', wine: C.lemonGreen, regions: [{ name: 'Greece', at: [22.6, 38.4], units: [ur('gr-santorini', 'Santorini', 'Assyrtiko'), ur('gr-naoussa', 'Naoussa', 'Xinomavro'), ur('gr-nemea', 'Nemea', 'Agiorgitiko'), ur('gr-crete', 'Crete & the islands')] }] },
      { name: 'Georgia', wine: C.amber, regions: [{ name: 'Georgia', at: [45.4, 41.9], units: [ur('ge-qvevri', 'Qvevri & amber wine', 'Rkatsiteli, Saperavi')] }] },
      { name: 'Lebanon', wine: C.garnet, regions: [{ name: 'Lebanon', at: [36.0, 33.8], units: [ur('lb-bekaa', 'Bekaa Valley')] }] },
    ] },
    { name: 'Britain', countries: [
      { name: 'England', wine: C.lemon, regions: [{ name: 'England', at: [0.2, 51.0], units: [ur('uk-sparkling', 'English sparkling wine')] }] },
    ] },
    { name: 'The Americas', countries: [
      { name: 'New World labels', wine: C.purple, regions: [{ name: 'Before you go', units: [ur('nw-rules', 'Grape first, place second', 'Percentage rules for variety, vintage and region')] }] },
      { name: 'USA', wine: C.ruby, regions: [
        { name: 'California', at: [-122.4, 38.4], units: [ur('us-napa', 'Napa Valley'), ur('us-sonoma', 'Sonoma'), ur('us-central', 'Central Coast & Paso Robles'), ur('us-santabarbara', 'Santa Barbara & Sta. Rita Hills'), ur('us-lodi', 'Lodi', 'Old-vine Zinfandel')] },
        { name: 'Pacific Northwest & East', at: [-123.0, 45.2], units: [ur('us-oregon', 'Oregon', 'Willamette Valley Pinot Noir'), ur('us-washington', 'Washington', 'Columbia Valley, Walla Walla'), ur('us-fingerlakes', 'New York', 'Finger Lakes Riesling')] },
      ] },
      { name: 'Canada', wine: C.gold, regions: [{ name: 'Canada', at: [-79.2, 43.1], units: [ur('ca-niagara', 'Niagara', 'Icewine'), ur('ca-okanagan', 'Okanagan Valley')] }] },
      { name: 'Chile', wine: C.purple, regions: [{ name: 'Chile', at: [-71.0, -34.5], units: [ur('cl-maipo', 'Maipo'), ur('cl-colchagua', 'Colchagua'), ur('cl-casablanca', 'Casablanca & San Antonio'), ur('cl-itata', 'Itata & Maule', 'Old vines, País & Cinsault'), ur('cl-elqui', 'Elqui & Limarí')] }] },
      { name: 'Argentina', wine: C.purple, regions: [{ name: 'Argentina', at: [-68.8, -33.0], units: [ur('ar-mendoza', 'Mendoza & Luján de Cuyo'), ur('ar-uco', 'Uco Valley'), ur('ar-salta', 'Salta', 'High-altitude Torrontés'), ur('ar-patagonia', 'Patagonia')] }] },
      { name: 'Uruguay', wine: C.purple, regions: [{ name: 'Uruguay', at: [-56.0, -34.7], units: [ur('uy-canelones', 'Canelones & the coast', 'Tannat')] }] },
      { name: 'Brazil', wine: C.lemon, regions: [{ name: 'Brazil', at: [-51.5, -29.2], units: [ur('br-serra', 'Serra Gaúcha', 'Sparkling wine')] }] },
    ] },
    { name: 'Southern Hemisphere & Asia', countries: [
      { name: 'Australia', wine: C.ruby, regions: [{ name: 'Australia', at: [138.9, -34.5], units: [ur('au-gi', 'The GI system'), ur('au-barossa', 'Barossa & Eden Valley'), ur('au-mclaren', 'McLaren Vale'), ur('au-clare', 'Clare Valley'), ur('au-coonawarra', 'Coonawarra'), ur('au-margaret', 'Margaret River'), ur('au-hunter', 'Hunter Valley', 'Semillon'), ur('au-yarra', 'Yarra Valley'), ur('au-tasmania', 'Tasmania')] }] },
      { name: 'New Zealand', wine: C.lemonGreen, regions: [{ name: 'New Zealand', at: [173.9, -41.5], units: [ur('nz-marlborough', 'Marlborough'), ur('nz-otago', 'Central Otago'), ur('nz-hawkes', 'Hawke\'s Bay'), ur('nz-martinborough', 'Martinborough')] }] },
      { name: 'South Africa', wine: C.gold, regions: [{ name: 'South Africa', at: [18.9, -33.9], units: [ur('za-wo', 'Wine of Origin'), ur('za-stellenbosch', 'Stellenbosch'), ur('za-swartland', 'Swartland'), ur('za-constantia', 'Constantia'), ur('za-hemel', 'Hemel-en-Aarde')] }] },
      { name: 'Japan', wine: C.lemonGreen, regions: [{ name: 'Japan', at: [138.6, 35.7], units: [ur('jp-yamanashi', 'Yamanashi', 'Koshu')] }] },
    ] },
  ];

  D.trackB = { wine: C.amber, intro, grapeGroups, continents };
})();
