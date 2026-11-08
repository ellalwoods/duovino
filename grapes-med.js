/* Track B · Part 2: Mediterranean & island whites.
 * Rules quoted here were checked against the texts published by the EU (checked 2026-11-08):
 *  - Santorini PDO (OJ C 143, 31.3.2022): dry white ≥ 85% Assyrtiko (raised from 75%), the rest Aidani and Athiri;
 *    soils 93–97% sand, phylloxera never arrived, vines on their own roots; Vinsanto from raisined grapes, ≥ 51% Assyrtiko.
 *  - Fiano di Avellino DOCG (C/2025/298): province of Avellino, Campania; Riserva and Spumante types.
 *  - Greco di Tufo DOCG (OJ C 61, 23.2.2021): eight villages around Tufo (Avellino); steep slopes, soils of volcanic origin;
 *    Riserva and Spumante Riserva types.
 *  - Vermentino di Gallura DOCG: Sardinia's only DOCG (EU register EUGI00000004943). No minimum percentage is quoted in the app.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const SRC = {
    santorini: 'Santorini PDO, single document: OJ C 143, 31.3.2022',
    fiano: 'Fiano di Avellino DOCG: Communication C/2025/298',
    greco: 'Greco di Tufo DOCG: OJ C 61, 23.2.2021',
    gallura: 'EU register (eAmbrosia): Vermentino di Gallura DOCG',
  };

  const vermentino = {
    id: 'b-g-vermentino', title: 'Vermentino', sub: 'Sardinia, Corsica, Liguria, Provence', sources: [SRC.gallura],
    lesson: [
      { kind: 'label', title: 'Meet Vermentino', body: 'Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Cantina Lunamare', 'producer', { note: 'The producer.' })],
          [s('Vermentino di Gallura', 'app', { big: true, note: 'Vermentino from Gallura, the granite hills of Sardinia\'s north-east. It\'s the island\'s only DOCG.' })],
          [s('Denominazione di Origine Controllata e Garantita', 'docg', { small: true, note: 'DOCG: Italy\'s top tier of wine law.' })],
          [s('2024', 'vintage', { note: 'Drink it young and fresh.' })],
        ] } },
      { kind: 'text', title: 'Sun, sea and herbs', big: 'Dry · fresh · a salty finish',
        body: 'Vermentino loves heat and sea air. It\'s <b>dry</b>, light to medium-bodied, with lemon, green apple and pear, a whiff of <b>wild herbs and fennel</b>, and a <b>salty, slightly bitter almond</b> finish. Usually unoaked; drink it young.' },
      { kind: 'facts', title: 'One grape, many names', rows: [
        { k: 'Sardinia', v: 'Vermentino: Vermentino di Gallura and Vermentino di Sardegna.' },
        { k: 'Corsica', v: 'Vermentinu: the island\'s main white grape.' },
        { k: 'Provence', v: 'Rolle.' },
        { k: 'Liguria & Tuscany', v: 'Vermentino again, along the coast.' },
      ] },
      { kind: 'try', title: 'At the table', body: 'Grilled fish, lemon, and a bowl of pasta with pesto…',
        prompt: 'Why does Vermentino work so well?',
        reveal: 'Its <b>fresh acidity</b> cuts through oil, its <b>herbal</b> notes echo the basil, and its <b>salty</b> finish loves seafood.' },
    ],
    questions: [
      { type: 'chain', wines: ['vermentino'], q: 'Read the label, step by step.',
        label: { style: 'italy', lines: [[s('Tenuta Capo Testa', 'producer')], [s('Vermentino di Gallura', 'app', { big: true })], [s('DOCG', 'docg', { small: true })], [s('2024', 'vintage')]] },
        steps: [
          { q: 'Which island?', options: ['Sardinia', 'Sicily', 'Corsica', 'Santorini'], answer: 0 },
          { q: 'Which grape?', options: ['Vermentino', 'Pinot Grigio', 'Chardonnay', 'Riesling'], answer: 0 },
          { q: 'What style?', options: ['Dry, fresh, salty finish', 'Sweet and golden', 'Oaky and buttery', 'Light red'], answer: 0 },
        ], explain: 'Gallura is in Sardinia\'s north-east; the grape is named on the label.' },
      { type: 'odd', q: 'Which is NOT a name for Vermentino?', options: ['Vermentinu', 'Rolle', 'Vermentino', 'Grauburgunder'], answer: 3,
        explain: 'Grauburgunder is German for Pinot Gris.' },
      { type: 'choice', q: 'In Provence, Vermentino is called…', options: ['Rolle', 'Pinot Gris', 'Vermentinu', 'Grenache'], answer: 0,
        explain: 'Same grape, Provençal name. In Corsica it\'s Vermentinu.' },
      { type: 'sort', wines: ['vermentino'], q: 'Typical of Vermentino?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Lemon', b: 0 }, { t: 'Wild herbs', b: 0 }, { t: 'Salty finish', b: 0 }, { t: 'Vanilla and toast', b: 1 }, { t: 'Blackcurrant', b: 1 }, { t: 'Bitter almond', b: 0 }],
        explain: 'Fresh, herbal and salty; usually no oak, and it\'s a white.' },
      { type: 'slider', wines: ['vermentino'], q: 'Place Vermentino on the body scale.', low: 'Light', high: 'Full', answer: 0.4, tol: 0.2,
        explain: 'Light to medium-bodied.' },
      { type: 'choice', q: 'The best match for Vermentino?', options: ['Grilled fish with herbs', 'Chocolate cake', 'Beef stew', 'A fiery curry'], answer: 0,
        explain: 'Acidity, herbs and a salty finish: made for seafood.' },
    ],
  };

  const assyrtiko = {
    id: 'b-g-assyrtiko', title: 'Assyrtiko', sub: 'Santorini\'s volcanic marvel', sources: [SRC.santorini],
    lesson: [
      { kind: 'label', title: 'Meet Assyrtiko', body: 'Tap the underlined words.',
        label: { style: 'generic', lines: [
          [s('Ktima Kalderas', 'producer', { note: 'The producer ("ktima" means estate).' })],
          [s('Santorini', 'app', { big: true, note: 'A volcanic Greek island. A dry white Santorini must be at least 85% Assyrtiko; the rest can only be Athiri and Aidani.' })],
          [s('Protected Designation of Origin', 'pdo', { small: true, note: 'PDO: the EU\'s top tier. Greek labels may say ΠΟΠ.' })],
          [s('Assyrtiko', 'grape', { note: 'The grape.' }), s('2023', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'A volcano in a glass', big: 'Bone dry · searing acidity · salty',
        body: 'Assyrtiko keeps <b>very high acidity</b> even in fierce sun. Expect lemon and lime, <b>wet stone and smoke</b>, and a <b>salty</b> tang. It\'s fuller and stronger than most crisp whites, and the best age for years.' },
      { kind: 'layers', title: 'Santorini\'s strange vineyards', rows: [
        { h: 'Volcanic sand', t: 'The soil is almost all sand, with hardly any clay.' },
        { h: 'Never grafted', t: 'Phylloxera never reached the island, so the vines grow on their own roots. Some may be around 300 years old.' },
        { h: 'Baskets', t: 'Many vines are woven into low, round baskets (kouloura) on the ground, sheltering the grapes from the fierce wind.' },
      ] },
      { kind: 'facts', title: 'And something sweet', rows: [
        { k: 'Vinsanto', v: 'Santorini\'s sweet wine, from grapes dried in the sun. At least 51% Assyrtiko: rich, velvety and honeyed.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['assyrtiko'], q: 'How much Assyrtiko must a dry white Santorini contain?', options: ['At least 85%', 'At least 51%', '100%', 'Any amount'], answer: 0,
        explain: 'At least 85% (it was 75% until 2021); the rest can only be Athiri and Aidani. 51% is the rule for sweet Vinsanto.' },
      { type: 'odd', q: 'Which grape is NOT allowed in a dry white Santorini?', options: ['Assyrtiko', 'Athiri', 'Aidani', 'Chardonnay'], answer: 3,
        explain: 'Only Assyrtiko, Athiri and Aidani.' },
      { type: 'choice', q: 'Why do Santorini\'s vines grow on their own roots?', options: ['Phylloxera never reached the island', 'Grafting is banned in Greece', 'The vines are too young', 'Rootstocks don\'t grow in sand'], answer: 0,
        explain: 'The pest never arrived, so there was no need to graft.' },
      { type: 'choice', q: 'Why are the vines woven into low baskets?', options: ['To shelter the grapes from the wind', 'To make picking faster', 'To keep birds away', 'For decoration'], answer: 0,
        explain: 'The kouloura baskets protect the bunches from the island\'s fierce winds.' },
      { type: 'blind', wines: ['assyrtiko'], q: 'A crisp white, poured blind.',
        clues: [
          { stage: 'Look', text: 'Pale lemon.' },
          { stage: 'Smell', text: 'Lemon, lime, wet stone, a wisp of smoke.' },
          { stage: 'Sip', text: 'Bone dry, very high acidity, salty. From a volcanic island.' },
        ],
        options: ['Santorini Assyrtiko', 'Alsace Pinot Gris', 'Oaked Chardonnay', 'Sauternes'], answer: 0,
        explain: 'Searing acidity, smoke and salt from a volcano: Santorini.' },
      { type: 'choice', wines: ['vinsanto'], q: 'What is Vinsanto?', options: ['Santorini\'s sweet wine from sun-dried grapes', 'A sparkling wine', 'A red wine', 'A grape variety'], answer: 0,
        explain: 'Grapes dried in the sun concentrate their sugar, giving a rich, honeyed wine.' },
    ],
  };

  const fiano = {
    id: 'b-g-fiano', title: 'Fiano', sub: 'Campania\'s nutty, honeyed white', sources: [SRC.fiano],
    lesson: [
      { kind: 'label', title: 'Meet Fiano', body: 'Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Feudo dei Colli', 'producer', { note: 'The producer.' })],
          [s('Fiano di Avellino', 'app', { big: true, note: 'Fiano from the hills around Avellino, inland from Naples, in Campania.' })],
          [s('DOCG', 'docg', { small: true, note: 'Italy\'s top tier.' })],
          [s('2021', 'vintage', { note: 'A few years old, and better for it.' })],
        ] } },
      { kind: 'text', title: 'Waxy, nutty, built to last', big: 'Pear · honey · hazelnut',
        body: 'Fiano is <b>medium to full-bodied</b> with a soft, <b>waxy</b> texture and fresh acidity. Unusually for an Italian white, it gets <b>better with a few years in bottle</b>.' },
      { kind: 'compare', title: 'Young vs aged', cols: [
        { h: 'Young', items: ['Pear and peach', 'Citrus', 'White flowers'] },
        { h: 'A few years on', items: ['Honey', 'Hazelnut', 'Richer and rounder'] }] },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Campania', v: 'Fiano di Avellino DOCG, including Riserva and sparkling Spumante versions.' },
        { k: 'Elsewhere', v: 'Sicily, Puglia, and Australia.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['fiano'], q: 'Fiano di Avellino comes from which Italian region?', options: ['Campania', 'Piedmont', 'Veneto', 'Tuscany'], answer: 0,
        explain: 'The hills around Avellino, inland from Naples.' },
      { type: 'sort', wines: ['fiano'], q: 'Young Fiano or a few years on?', buckets: ['Young', 'Aged'],
        items: [{ t: 'Pear', b: 0 }, { t: 'Honey', b: 1 }, { t: 'White flowers', b: 0 }, { t: 'Hazelnut', b: 1 }, { t: 'Citrus', b: 0 }],
        explain: 'Fresh fruit and flowers first; honey and nuts with age.' },
      { type: 'slider', wines: ['fiano'], q: 'Place Fiano on the body scale.', low: 'Light', high: 'Full', answer: 0.65, tol: 0.2,
        explain: 'Medium to full-bodied, with a waxy texture.' },
      { type: 'odd', q: 'Which is NOT a typical Fiano note?', options: ['Pear', 'Honey', 'Hazelnut', 'Blackcurrant'], answer: 3,
        explain: 'Blackcurrant belongs to Cabernet Sauvignon.' },
      { type: 'choice', q: 'What\'s unusual about Fiano for an Italian white?', options: ['It improves with a few years in bottle', 'It\'s always sweet', 'It\'s always sparkling', 'It\'s made from black grapes'], answer: 0,
        explain: 'Most Italian whites are best young; Fiano gains honey and nuts with age.' },
    ],
  };

  const greco = {
    id: 'b-g-greco', title: 'Greco', sub: 'Fiano\'s livelier neighbour', sources: [SRC.greco],
    lesson: [
      { kind: 'label', title: 'Meet Greco', body: 'Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Cantine Sabato', 'producer', { note: 'The producer.' })],
          [s('Greco di Tufo', 'app', { big: true, note: 'Greco from eight villages around Tufo, near Avellino in Campania. Steep slopes, soils of volcanic origin.' })],
          [s('DOCG', 'docg', { small: true, note: 'Italy\'s top tier.' })],
          [s('2023', 'vintage', { note: 'Fresh now; a Riserva would be released after extra ageing.' })],
        ] } },
      { kind: 'text', title: 'Bright and mineral', big: 'Peach · lemon · almond',
        body: 'Greco has <b>firmer acidity</b> and a leaner, more mineral feel than its neighbour Fiano. Expect <b>peach, lemon and pear</b> and a <b>bitter-almond</b> finish.' },
      { kind: 'compare', title: 'Two Campania neighbours', cols: [
        { h: 'Fiano', items: ['Rounder, waxy', 'Pear, honey, hazelnut', 'Medium to full body'] },
        { h: 'Greco', items: ['Crisper, firmer acidity', 'Peach, lemon, almond', 'Lighter and more mineral'] }] },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'The name', v: '"Greco" means Greek. Tradition says the grape came with the ancient Greeks who settled southern Italy.' },
        { k: 'Styles', v: 'Still, Riserva, and sparkling Spumante.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['greco'], q: 'Read the label, step by step.',
        label: { style: 'italy', lines: [[s('Cantine Sabato', 'producer')], [s('Greco di Tufo', 'app', { big: true })], [s('DOCG', 'docg', { small: true })], [s('2023', 'vintage')]] },
        steps: [
          { q: 'Which region?', options: ['Campania', 'Piedmont', 'Sardinia', 'Veneto'], answer: 0 },
          { q: 'Which grape?', options: ['Greco', 'Fiano', 'Vermentino', 'Assyrtiko'], answer: 0 },
          { q: 'What style?', options: ['Crisp, peachy, almond finish', 'Waxy and honeyed', 'Sweet and golden', 'Light red'], answer: 0 },
        ], explain: 'Tufo is near Avellino, in Campania; Greco is the crisper of the two neighbours.' },
      { type: 'sort', wines: ['greco', 'fiano'], q: 'Fiano or Greco?', buckets: ['Fiano', 'Greco'],
        items: [{ t: 'Waxy', b: 0 }, { t: 'Firmer acidity', b: 1 }, { t: 'Hazelnut', b: 0 }, { t: 'Bitter almond', b: 1 }, { t: 'Rounder', b: 0 }, { t: 'More mineral', b: 1 }],
        explain: 'Fiano is round and nutty; Greco is crisp and mineral.' },
      { type: 'choice', q: 'What does "Greco" mean?', options: ['Greek', 'Green', 'Great', 'Grey'], answer: 0,
        explain: 'Tradition links it to the ancient Greeks who settled southern Italy.' },
      { type: 'choice', q: 'What are Greco di Tufo\'s soils like?', options: ['Of volcanic origin, on steep slopes', 'Flat river gravel', 'Pure chalk', 'Desert sand'], answer: 0,
        explain: 'Steep hillsides with soils of volcanic origin.' },
      { type: 'slider', wines: ['greco'], q: 'Place Greco on the acidity scale.', low: 'Low', high: 'High', answer: 0.75, tol: 0.2,
        explain: 'Firmer acidity than Fiano: fresh and lively.' },
    ],
  };

  Object.assign(D.grapeLessons, { vermentino, assyrtiko, fiano, greco });
})();
