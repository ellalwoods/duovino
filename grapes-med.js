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
      { type: 'chain', wines: ['vermentino'], q: 'Read the Gallura label, step by step.',
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
      { type: 'chain', wines: ['greco'], q: 'Read the Tufo label, step by step.',
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


  /* Six more. Checked 2026-11-08: Soave (OJ C 72, 2020: Garganega main), Verdicchio dei Castelli di Jesi (OJ C 288, 2022:
   * Esino valley, Ancona province; almond aroma, bitter finish), Rueda (OJ C 69, 2020: Verdejo; continental climate,
   * stony soils, up to 870 m), Valdeorras (C/2025/1383: "Valdeorras Godello" = Godello only), Picpoul de Pinet
   * (OJ C 253, 2017: Piquepoul blanc, beside the Étang de Thau). */
  const garganega = {
    id: 'b-g-garganega', title: 'Garganega', sub: 'The grape behind Soave', sources: ['Soave DOC: OJ C 72, 2020'],
    lesson: [
      { kind: 'label', title: 'Meet Garganega', body: 'The grape is rarely named. Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Tenuta Monteforte', 'producer', { note: 'The producer.' })],
          [s('Soave Classico', 'app', { big: true, note: 'Soave, near Verona in the Veneto. Garganega is the main grape; "Classico" is the historic hilly heart.' })],
          [s('2023', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'Gentle and nutty', big: 'Lemon · pear · almond',
        body: 'Garganega gives <b>light to medium</b>-bodied, dry whites with lemon, pear, white flowers and a soft <b>almond</b> finish. The best, from the volcanic hills of Soave Classico, have more depth and age well.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Recioto di Soave', v: 'A sweet wine from dried Garganega grapes.' },
        { k: 'Food', v: 'Risotto, light fish, spring vegetables.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['soave'], q: 'Soave is made mainly from…', options: ['Garganega', 'Pinot Grigio', 'Chardonnay', 'Glera'], answer: 0,
        explain: 'Near Verona, in the Veneto.' },
      { type: 'choice', q: 'Soave\'s typical finish?', options: ['Almond', 'Vanilla', 'Blackcurrant', 'Smoke'], answer: 0,
        explain: 'Gentle, nutty and dry.' },
      { type: 'choice', q: 'Recioto di Soave is…', options: ['Sweet, from dried grapes', 'Sparkling', 'Red', 'Fortified'], answer: 0,
        explain: 'Drying concentrates the sugar.' },
      { type: 'choice', q: 'What does "Classico" mean on a Soave label?', options: ['The historic hilly heart of the region', 'Aged in oak', 'Sweet', 'Made by a monastery'], answer: 0,
        explain: 'As in Chianti Classico.' },
    ],
  };

  const verdicchio = {
    id: 'b-g-verdicchio', title: 'Verdicchio', sub: 'Almond and lemon from the Marche', sources: ['Verdicchio dei Castelli di Jesi DOC: OJ C 288, 2022'],
    lesson: [
      { kind: 'label', title: 'Meet Verdicchio', body: 'Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Fattoria San Lorenzo', 'producer', { note: 'The producer.' })],
          [s('Verdicchio dei Castelli di Jesi', 'app', { big: true, note: 'From the hills around the Esino valley, near Ancona in the Marche, on Italy\'s Adriatic side.' })],
          [s('2023', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'Crisp, with a bitter twist', big: 'Lemon · green apple · almond',
        body: 'Verdicchio is dry with <b>high acidity</b>, lemon and green apple, a distinctive <b>almond</b> aroma and a pleasant <b>bitter</b> finish. Simple ones are fresh; the best gain weight and age surprisingly well.' },
      { kind: 'facts', title: 'Two homes in the Marche', rows: [
        { k: 'Castelli di Jesi', v: 'The larger, near the coast.' },
        { k: 'Matelica', v: 'Higher and further inland: leaner, sharper.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['verdicchio'], q: 'Verdicchio comes from which region?', options: ['The Marche', 'Piedmont', 'Sicily', 'Tuscany'], answer: 0,
        explain: 'On Italy\'s Adriatic side, near Ancona.' },
      { type: 'sort', wines: ['verdicchio'], q: 'Typical of Verdicchio?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Almond', b: 0 }, { t: 'Bitter finish', b: 0 }, { t: 'High acidity', b: 0 }, { t: 'Sweet and honeyed', b: 1 }, { t: 'Tannic', b: 1 }],
        explain: 'Crisp, almondy and bitter-edged.' },
      { type: 'choice', q: 'Which Verdicchio is higher and further inland?', options: ['Matelica', 'Castelli di Jesi', 'Soave', 'Gallura'], answer: 0,
        explain: 'Leaner and sharper.' },
    ],
  };

  const verdejo = {
    id: 'b-g-verdejo', title: 'Verdejo', sub: 'Rueda\'s herbal white', sources: ['Rueda DO: OJ C 69, 2020'],
    lesson: [
      { kind: 'label', title: 'Meet Verdejo', body: 'Tap the underlined words.',
        label: { style: 'spain', lines: [
          [s('Bodegas Medina Alta', 'producer', { note: 'The producer.' })],
          [s('Verdejo', 'grape', { big: true, note: 'The grape, named on the label.' })],
          [s('Rueda', 'app', { note: 'On a high plateau in Castilla y León, up to 870 m. Long cold winters, late frosts, hot dry summers, stony soils.' })],
          [s('Denominación de Origen', 'do', { small: true, note: 'DO: Spain\'s main quality tier.' })],
        ] } },
      { kind: 'text', title: 'Fresh and herbal', big: 'Lime · fennel · bitter almond',
        body: 'Verdejo is dry and zesty, with <b>citrus, fennel and herbs</b> and a slightly <b>bitter</b> finish. Like Sauvignon Blanc, which also grows in Rueda, but rounder. Grapes are often picked <b>at night</b> to keep them cool and fresh.' },
    ],
    questions: [
      { type: 'chain', wines: ['verdejo'], q: 'Read the Rueda label, step by step.',
        label: { style: 'spain', lines: [[s('Bodegas Medina Alta', 'producer')], [s('Verdejo', 'grape', { big: true })], [s('Rueda', 'app')]] },
        steps: [
          { q: 'Which country?', options: ['Spain', 'Portugal', 'Italy', 'Argentina'], answer: 0 },
          { q: 'What\'s the climate?', options: ['High plateau: cold winters, hot dry summers', 'Wet and Atlantic', 'Tropical', 'Cool and foggy'], answer: 0 },
          { q: 'What style?', options: ['Dry, citrus, herbal', 'Sweet and golden', 'Tannic red', 'Fortified'], answer: 0 },
        ], explain: 'Rueda: Verdejo on Castilla y León\'s high plateau.' },
      { type: 'choice', q: 'Why are Verdejo grapes often picked at night?', options: ['To keep them cool and fresh', 'Tradition only', 'To avoid birds', 'It\'s the law'], answer: 0,
        explain: 'Cool grapes keep their aromas.' },
      { type: 'odd', q: 'Which is NOT a Verdejo note?', options: ['Lime', 'Fennel', 'Herbs', 'Blackberry jam'], answer: 3,
        explain: 'Blackberry jam belongs to Zinfandel.' },
      { type: 'choice', q: 'Which other grape grows in Rueda and tastes a bit similar?', options: ['Sauvignon Blanc', 'Gewurztraminer', 'Viognier', 'Muscat'], answer: 0,
        explain: 'Verdejo is rounder.' },
    ],
  };

  const godello = {
    id: 'b-g-godello', title: 'Godello', sub: 'Spain\'s rising star', sources: ['Valdeorras DO: C/2025/1383'],
    lesson: [
      { kind: 'text', title: 'Saved from extinction', big: 'Pear · apple · mineral',
        body: 'Godello nearly vanished in the 20th century. Now it\'s one of Spain\'s most exciting whites: <b>medium to full body</b>, fresh acidity, <b>pear and apple</b>, a <b>mineral</b> edge, sometimes rounded out with lees or oak.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Valdeorras', v: 'Galicia\'s inland valleys. "Valdeorras Godello" must be 100% Godello.' },
        { k: 'Bierzo', v: 'Next door in Castilla y León.' },
        { k: 'Portugal', v: 'Called Gouveio.' },
      ] },
      { kind: 'compare', title: 'Galicia\'s two whites', cols: [
        { h: 'Albariño', items: ['Coast: Rías Baixas', 'Peachy, salty, lighter'] },
        { h: 'Godello', items: ['Inland: Valdeorras', 'Rounder, pear, mineral'] }] },
    ],
    questions: [
      { type: 'choice', wines: ['godello'], q: 'A "Valdeorras Godello" must be…', options: ['100% Godello', 'At least 50% Godello', 'A blend with Albariño', 'Sparkling'], answer: 0,
        explain: 'Godello only.' },
      { type: 'sort', q: 'Albariño or Godello?', buckets: ['Albariño', 'Godello'],
        items: [{ t: 'Coastal Rías Baixas', b: 0 }, { t: 'Inland Valdeorras', b: 1 }, { t: 'Salty and peachy', b: 0 }, { t: 'Rounder, pear', b: 1 }],
        explain: 'Galicia\'s coast vs its inland valleys.' },
      { type: 'choice', q: 'In Portugal, Godello is called…', options: ['Gouveio', 'Alvarinho', 'Tinta Roriz', 'Aragonez'], answer: 0,
        explain: 'One grape, two names.' },
      { type: 'choice', q: 'What nearly happened to Godello?', options: ['It almost disappeared', 'It was banned', 'It turned red', 'Nothing'], answer: 0,
        explain: 'Now it\'s a rising star.' },
    ],
  };

  const picpoul = {
    id: 'b-g-picpoul', title: 'Picpoul', sub: 'The "lip-stinger" of the Languedoc', sources: ['Picpoul de Pinet AOC: OJ C 253, 2017'],
    lesson: [
      { kind: 'label', title: 'Meet Picpoul', body: 'Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Domaine de l\'Étang', 'producer', { note: 'The producer.' })],
          [s('Picpoul de Pinet', 'app', { big: true, note: 'Languedoc, beside the Étang de Thau lagoon near Sète. Made from Piquepoul Blanc.' })],
          [s('2024', 'vintage', { note: 'Drink it young.' })],
        ] } },
      { kind: 'text', title: 'Stings the lips', big: 'Lemon · green apple · salty',
        body: '"Picpoul" means <b>lip-stinger</b>: a nod to its <b>bright acidity</b>, even in the warm south. Light, dry, lemony and saline, it\'s the local match for the lagoon\'s <b>oysters and mussels</b>.' },
    ],
    questions: [
      { type: 'choice', wines: ['picpoul'], q: 'What does "Picpoul" mean?', options: ['Lip-stinger', 'Little peach', 'Golden', 'Sea breeze'], answer: 0,
        explain: 'A nod to its acidity.' },
      { type: 'choice', q: 'Picpoul de Pinet grows beside…', options: ['The Étang de Thau lagoon', 'The Mosel river', 'Lake Geneva', 'The Atlantic in Galicia'], answer: 0,
        explain: 'Near Sète in the Languedoc.' },
      { type: 'choice', q: 'The local food match?', options: ['Oysters and mussels', 'Lamb stew', 'Chocolate', 'Blue cheese'], answer: 0,
        explain: 'Straight from the lagoon.' },
      { type: 'slider', wines: ['picpoul'], q: 'Place Picpoul on the acidity scale.', low: 'Low', high: 'High', answer: 0.85, tol: 0.18,
        explain: 'Bright, even in the warm south.' },
    ],
  };

  const malvasia = {
    id: 'b-g-malvasia', title: 'Malvasia', sub: 'An ancient family of grapes',
    lesson: [
      { kind: 'text', title: 'A family, not one grape', big: 'Apricot · peach · flowers',
        body: '"Malvasia" is a name shared by <b>many related and unrelated grapes</b> around the Mediterranean, most of them aromatic, with apricot, peach and flowers. The name likely comes from Monemvasia, an old Greek trading port.' },
      { kind: 'facts', title: 'Many styles', rows: [
        { k: 'Madeira', v: 'Malmsey: the richest, sweetest style of fortified Madeira.' },
        { k: 'Italy', v: 'Dry whites in Friuli and Lazio; sweet Malvasia delle Lipari from the Aeolian islands.' },
        { k: 'Croatia', v: 'Malvazija Istarska: fresh, dry and floral, from Istria.' },
        { k: 'Spain', v: 'In white Rioja blends, and sweet wines in the Canaries.' },
      ] },
    ],
    questions: [
      { type: 'choice', q: '"Malvasia" is…', options: ['A family of many different grapes', 'One single grape', 'A region', 'A sparkling style'], answer: 0,
        explain: 'Many grapes share the name.' },
      { type: 'choice', wines: ['malmsey'], q: 'Malmsey is…', options: ['The sweetest style of Madeira, from Malvasia', 'A dry Croatian white', 'A Port grape', 'A Champagne'], answer: 0,
        explain: 'Rich and fortified.' },
      { type: 'choice', q: 'Where does the name likely come from?', options: ['Monemvasia, a Greek port', 'A Roman emperor', 'A Spanish saint', 'A French river'], answer: 0,
        explain: 'Its wines were traded far and wide.' },
      { type: 'sort', q: 'Dry or sweet?', buckets: ['Dry', 'Sweet'],
        items: [{ t: 'Malvazija Istarska', b: 0 }, { t: 'Malmsey Madeira', b: 1 }, { t: 'Malvasia delle Lipari', b: 1 }],
        explain: 'The same family makes both.' },
    ],
  };

  Object.assign(D.grapeLessons, { vermentino, assyrtiko, fiano, greco, garganega, verdicchio, verdejo, godello, picpoul, malvasia });
})();
