/* Track B · Part 2: Off the beaten track.
 * Rules named here were checked (2026-11-08) against EU-published texts:
 *  - Etna DOC (OJ C 240, 2022): Nerello Mascalese and Carricante; volcanic soils, high altitude, dry-stone terraces;
 *    Sicily's first DOC; the latest harvest in Sicily.
 *  - Taurasi DOCG (OJ C 64, 2021): Aglianico; ≥ 3 years' ageing incl. ≥ 1 year in wood; Riserva ≥ 4 years incl. ≥ 18 months.
 *  - Mittelburgenland DAC (OJ C 286, 2020): Blaufränkisch only.
 *  - Tokaj (C/2026/1380): Furmint, Hárslevelű and others. (Puttonyos left out: the 2026 rules changed them again.)
 *  - Côtes du Jura (OJ C 49, 2023): vin jaune from Savagnin, matured for years under a film of yeast; 62 cl clavelin.
 * Greek, New World and Swiss facts are about grapes and places, not legal rules.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const grape = (id, title, sub, lesson, questions, sources) => ({ id: 'b-g-' + id, title, sub, lesson, questions, ...(sources ? { sources } : {}) });

  const xinomavro = grape('xinomavro', 'Xinomavro', 'Greece\'s answer to Nebbiolo', [
    { kind: 'text', title: '"Acid black"', big: 'Red fruit · tomato · olive',
      body: 'Xinomavro means <b>"acid black"</b>. Like Nebbiolo it\'s fairly <b>pale</b> but has <b>high acidity and high tannin</b>, with red fruit, sun-dried <b>tomato</b>, <b>olive</b> and spice. The best age for decades.' },
    { kind: 'facts', title: 'Where to find it', rows: [
      { k: 'Naoussa', v: 'Its classic home, on the slopes of northern Greece.' },
      { k: 'Amyndeon', v: 'Cooler and higher: also lovely rosé and sparkling.' },
    ] },
  ], [
    { type: 'choice', wines: ['xinomavro'], q: 'What does "Xinomavro" mean?', options: ['Acid black', 'Sweet red', 'Old vine', 'Mountain wine'], answer: 0,
      explain: 'A nod to its acidity and dark skins.' },
    { type: 'choice', q: 'Xinomavro is often compared to…', options: ['Nebbiolo', 'Gamay', 'Merlot', 'Zinfandel'], answer: 0,
      explain: 'Pale-ish, with high acidity and tannin, and long-lived.' },
    { type: 'odd', q: 'Which is NOT a typical Xinomavro note?', options: ['Tomato', 'Olive', 'Red fruit', 'Lychee'], answer: 3,
      explain: 'Lychee belongs to Gewurztraminer.' },
    { type: 'choice', q: 'Xinomavro\'s classic home?', options: ['Naoussa, northern Greece', 'Santorini', 'Crete', 'Nemea'], answer: 0,
      explain: 'Nemea is Agiorgitiko country.' },
  ]);

  const agiorgitiko = grape('agiorgitiko', 'Agiorgitiko', 'Nemea\'s silky red', [
    { kind: 'text', title: 'St George\'s grape', big: 'Plum · cherry · sweet spice',
      body: 'Agiorgitiko (ah-yor-YEE-tee-ko) means <b>"St George\'s grape"</b>. It\'s soft and <b>velvety</b>, with ripe <b>plum and red cherry</b>, sweet spice and moderate acidity: easy to love, young or oaked.' },
    { kind: 'facts', title: 'Where to find it', rows: [
      { k: 'Nemea', v: 'In the Peloponnese: its home. Higher vineyards give fresher wines.' },
      { k: 'Styles', v: 'Fresh rosé, juicy young reds, rich oak-aged reds.' },
    ] },
  ], [
    { type: 'choice', wines: ['agiorgitiko'], q: 'Agiorgitiko\'s home?', options: ['Nemea, in the Peloponnese', 'Naoussa', 'Santorini', 'Crete'], answer: 0,
      explain: 'Xinomavro belongs to Naoussa.' },
    { type: 'sort', q: 'Xinomavro or Agiorgitiko?', buckets: ['Xinomavro', 'Agiorgitiko'],
      items: [{ t: 'High tannin and acid', b: 0 }, { t: 'Soft and velvety', b: 1 }, { t: 'Tomato and olive', b: 0 }, { t: 'Ripe plum', b: 1 }],
      explain: 'Greece\'s two great reds are opposites.' },
    { type: 'choice', q: 'What does the name mean?', options: ['St George\'s grape', 'Black acid', 'Little plum', 'Mountain red'], answer: 0,
      explain: 'Agios Georgios: St George.' },
  ]);

  const aglianico = grape('aglianico', 'Aglianico', 'Southern Italy\'s powerhouse', [
    { kind: 'label', title: 'Meet Aglianico', body: 'Tap the underlined words.',
      label: { style: 'italy', lines: [
        [s('Cantine Irpine', 'producer', { note: 'The producer.' })],
        [s('Taurasi', 'app', { big: true, note: 'Campania\'s great red, from hills along the Calore river near Avellino. Made from Aglianico; aged at least 3 years, 1 of them in wood.' })],
        [s('Riserva', 'age', { note: 'At least 4 years\' ageing, 18 months of it in wood.' })],
        [s('2018', 'vintage', { note: 'Taurasi needs time.' })],
      ] } },
    { kind: 'text', title: 'Dark and serious', big: 'Black cherry · smoke · leather',
      body: 'Aglianico is late-ripening, with <b>deep colour</b>, <b>high tannin and high acidity</b>: black fruit, smoke and earth, turning to leather with age.' },
    { kind: 'facts', title: 'Two volcanic homes', rows: [
      { k: 'Taurasi', v: 'Campania: "the Barolo of the south".' },
      { k: 'Aglianico del Vulture', v: 'Basilicata, on the slopes of an extinct volcano, Monte Vulture.' },
    ] },
  ], [
    { type: 'choice', wines: ['taurasi'], q: 'Taurasi is made from…', options: ['Aglianico', 'Sangiovese', 'Nebbiolo', 'Primitivo'], answer: 0,
      explain: 'Campania\'s great red.' },
    { type: 'choice', q: 'A Taurasi Riserva must be aged at least…', options: ['4 years, 18 months in wood', '1 year', '6 months', '10 years'], answer: 0,
      explain: 'The basic Taurasi needs 3 years, 1 in wood.' },
    { type: 'sort', q: 'Typical of Aglianico?', buckets: ['Typical', 'Not typical'],
      items: [{ t: 'High tannin', b: 0 }, { t: 'High acidity', b: 0 }, { t: 'Pale and soft', b: 1 }, { t: 'Black cherry and smoke', b: 0 }, { t: 'Early-ripening', b: 1 }],
      explain: 'Dark, firm and late-ripening.' },
    { type: 'choice', q: 'Aglianico del Vulture grows on…', options: ['An extinct volcano', 'A chalk cliff', 'A river delta', 'A desert plateau'], answer: 0,
      explain: 'Monte Vulture, in Basilicata.' },
  ], ['Taurasi DOCG: OJ C 64, 2021']);

  const nerello = grape('nerello', 'Nerello Mascalese', 'Etna\'s volcanic red', [
    { kind: 'text', title: 'Wine from a volcano', big: 'Red cherry · herbs · smoky',
      body: 'On the slopes of Etna, Nerello Mascalese gives <b>pale</b>, perfumed reds with <b>red cherry</b>, herbs, a <b>smoky, mineral</b> edge, firm tannin and fresh acidity. Often compared to Pinot Noir or Nebbiolo.' },
    { kind: 'layers', title: 'Etna', rows: [
      { h: 'High up', t: 'Vines climb high on the volcano: the harvest is the latest in Sicily, into October.' },
      { h: 'Terraces', t: 'Steep slopes are held up by dry-stone walls of black lava.' },
      { h: 'A first', t: 'Etna was Sicily\'s first DOC.' },
      { h: 'White too', t: 'Etna Bianco comes from Carricante: crisp and lemony.' },
    ] },
  ], [
    { type: 'choice', wines: ['etnarosso'], q: 'Nerello Mascalese is the red grape of…', options: ['Mount Etna, Sicily', 'Santorini', 'Tuscany', 'Mendoza'], answer: 0,
      explain: 'Grown high on the volcano\'s slopes.' },
    { type: 'choice', q: 'Etna\'s white grape?', options: ['Carricante', 'Assyrtiko', 'Fiano', 'Vermentino'], answer: 0,
      explain: 'Crisp and lemony.' },
    { type: 'choice', q: 'Why is Etna\'s harvest the latest in Sicily?', options: ['The vines grow high up, where it\'s cooler', 'Lava keeps it cold', 'The law says so', 'The grapes are dried first'], answer: 0,
      explain: 'Altitude slows ripening.' },
    { type: 'sort', q: 'Typical of Nerello Mascalese?', buckets: ['Typical', 'Not typical'],
      items: [{ t: 'Pale and perfumed', b: 0 }, { t: 'Smoky and mineral', b: 0 }, { t: 'Jammy and soft', b: 1 }, { t: 'Red cherry', b: 0 }],
      explain: 'Elegant rather than heavy.' },
  ], ['Etna DOC: OJ C 240, 2022']);

  const touriga = grape('touriga', 'Touriga Nacional', 'Portugal\'s flagship', [
    { kind: 'text', title: 'Perfume and power', big: 'Blackberry · violet · bergamot',
      body: 'Portugal\'s star black grape: <b>deep colour</b>, <b>high tannin</b>, ripe black fruit and a striking floral perfume of <b>violets</b>. It\'s a key grape in <b>Port</b>, and makes powerful dry reds too.' },
    { kind: 'facts', title: 'Where to find it', rows: [
      { k: 'Douro', v: 'In Port and in dry Douro reds, often in field blends.' },
      { k: 'Dão', v: 'Just south: fresher, more elegant reds.' },
      { k: 'Also', v: 'Spreading to Australia, South Africa and California.' },
    ] },
  ], [
    { type: 'choice', wines: ['touriga'], q: 'Touriga Nacional is a key grape in…', options: ['Port', 'Sherry', 'Champagne', 'Sauternes'], answer: 0,
      explain: 'And in dry Douro and Dão reds.' },
    { type: 'choice', q: 'Touriga\'s signature aroma?', options: ['Violets', 'Lychee', 'Petrol', 'Butter'], answer: 0,
      explain: 'Plus blackberry and bergamot.' },
    { type: 'sort', q: 'Typical of Touriga Nacional?', buckets: ['Typical', 'Not typical'],
      items: [{ t: 'Deep colour', b: 0 }, { t: 'High tannin', b: 0 }, { t: 'Pale and delicate', b: 1 }, { t: 'Floral perfume', b: 0 }],
      explain: 'Powerful and perfumed.' },
  ]);

  const blaufrankisch = grape('blaufrankisch', 'Blaufränkisch', 'Central Europe\'s spicy red', [
    { kind: 'text', title: 'Dark fruit, bright acid, spice', big: 'Dark cherry · blackberry · pepper',
      body: 'Blaufränkisch has <b>deep colour</b>, <b>high acidity</b>, firm tannin, dark cherry and blackberry, and a twist of <b>spice</b>. Fresh and lively, and the best age well.' },
    { kind: 'facts', title: 'Many names', rows: [
      { k: 'Austria', v: 'Burgenland. Mittelburgenland\'s DAC wines must be Blaufränkisch only.' },
      { k: 'Hungary', v: 'Kékfrankos.' },
      { k: 'Germany', v: 'Lemberger.' },
    ] },
  ], [
    { type: 'choice', wines: ['blaufrankisch'], q: 'Wines labelled Mittelburgenland must be…', options: ['Blaufränkisch only', 'Grüner Veltliner', 'A blend of any reds', 'Sweet'], answer: 0,
      explain: 'Austria\'s red flagship.' },
    { type: 'odd', q: 'Which is NOT a name for Blaufränkisch?', options: ['Kékfrankos', 'Lemberger', 'Blaufränkisch', 'Grauburgunder'], answer: 3,
      explain: 'Grauburgunder is Pinot Gris.' },
    { type: 'sort', q: 'Typical of Blaufränkisch?', buckets: ['Typical', 'Not typical'],
      items: [{ t: 'High acidity', b: 0 }, { t: 'Spice', b: 0 }, { t: 'Dark cherry', b: 0 }, { t: 'Low colour', b: 1 }, { t: 'Lychee', b: 1 }],
      explain: 'Dark, fresh and spicy.' },
  ], ['Mittelburgenland DAC: OJ C 286, 2020']);

  const saperavi = grape('saperavi', 'Saperavi', 'Georgia\'s inky red', [
    { kind: 'text', title: 'Red to the core', big: 'Blackberry · plum · liquorice',
      body: 'Saperavi means <b>"dye"</b>. Unlike almost every other black grape, it has <b>red flesh and red juice</b>, so its wines are inky, almost opaque. <b>High acidity</b>, firm tannin, black fruit, and it ages for decades.' },
    { kind: 'facts', title: 'Georgia', rows: [
      { k: 'Kakheti', v: 'In the east: the heart of Georgian wine.' },
      { k: 'Qvevri', v: 'Often fermented and aged in qvevri: big clay jars buried in the ground.' },
    ] },
  ], [
    { type: 'choice', wines: ['saperavi'], q: 'What\'s unusual about Saperavi?', options: ['Its flesh and juice are red', 'It\'s a white grape', 'It has no tannin', 'It only makes sparkling wine'], answer: 0,
      explain: 'Most black grapes have clear juice (remember Topsoil 1.1).' },
    { type: 'choice', q: 'What does "Saperavi" mean?', options: ['Dye', 'Black', 'Sweet', 'King'], answer: 0,
      explain: 'Its wine stains everything.' },
    { type: 'choice', q: 'What is a qvevri?', options: ['A clay jar buried in the ground', 'An oak barrel', 'A steel tank', 'A grape'], answer: 0,
      explain: 'Georgia\'s ancient way of making wine.' },
  ]);

  const rkatsiteli = grape('rkatsiteli', 'Rkatsiteli', 'Georgia\'s amber-wine white', [
    { kind: 'text', title: 'White grapes, amber wine', big: 'Dried apricot · tea · walnut',
      body: 'Rkatsiteli is Georgia\'s most planted white. Fermented the traditional way, <b>with its skins for months in qvevri</b>, it becomes <b>amber</b> (orange) wine: deep gold, with <b>tannin</b>, dried apricot, tea and nuts.' },
    { kind: 'compare', title: 'Two ways to make it', cols: [
      { h: 'European style', items: ['Pressed first', 'Crisp, light, citrus'] },
      { h: 'Qvevri (amber)', items: ['Months on the skins', 'Amber colour, some tannin', 'Dried fruit, tea, nuts'] }] },
    { kind: 'text', title: 'The oldest wine country?', body: 'Clay jars with traces of wine found in Georgia date back about <b>8,000 years</b>. Qvevri winemaking is on UNESCO\'s list of intangible cultural heritage.' },
  ], [
    { type: 'choice', wines: ['rkatsiteli'], q: 'Why is qvevri Rkatsiteli amber and tannic?', options: ['It ferments for months with its skins', 'It\'s blended with red wine', 'It\'s aged in new oak', 'It\'s made from black grapes'], answer: 0,
      explain: 'White wine made like a red.' },
    { type: 'sort', q: 'European style or qvevri amber?', buckets: ['European style', 'Qvevri amber'],
      items: [{ t: 'Pressed first', b: 0 }, { t: 'Months on skins', b: 1 }, { t: 'Crisp citrus', b: 0 }, { t: 'Tea and walnut', b: 1 }],
      explain: 'Skin contact changes everything.' },
    { type: 'choice', q: 'How old is the earliest evidence of wine in Georgia?', options: ['About 8,000 years', 'About 800 years', 'About 200 years', 'About 80,000 years'], answer: 0,
      explain: 'Among the oldest anywhere.' },
  ]);

  const tannat = grape('tannat', 'Tannat', 'Uruguay\'s grippy signature', [
    { kind: 'text', title: 'Tannin by name', big: 'Blackberry · plum · very firm',
      body: 'Tannat is as tannic as its name suggests: <b>very high tannin</b>, deep colour, black fruit. Oak and careful winemaking tame it.' },
    { kind: 'compare', title: 'Two homes', cols: [
      { h: 'Madiran, south-west France', items: ['Its original home', 'Firm, built to age'] },
      { h: 'Uruguay', items: ['Brought by Basque settlers in the 1800s', 'Now the national grape', 'Riper, softer, juicier'] }] },
  ], [
    { type: 'choice', wines: ['tannat'], q: 'Tannat is Uruguay\'s…', options: ['Signature grape', 'Only white grape', 'Sparkling style', 'Dessert wine'], answer: 0,
      explain: 'Brought by Basque settlers in the 1800s.' },
    { type: 'slider', wines: ['tannat'], q: 'Place Tannat on the tannin scale.', low: 'Low', high: 'High', answer: 0.95, tol: 0.15,
      explain: 'One of the most tannic grapes there is.' },
    { type: 'choice', q: 'Tannat\'s original home?', options: ['Madiran, south-west France', 'Burgundy', 'Rioja', 'Piedmont'], answer: 0,
      explain: 'Uruguay\'s versions are softer and riper.' },
  ]);

  const carmenere = grape('carmenere', 'Carménère', 'Chile\'s rediscovered grape', [
    { kind: 'text', title: 'The lost grape', big: 'Blackberry · green pepper · spice',
      body: 'Carménère was an old <b>Bordeaux</b> grape, nearly lost there after phylloxera. In Chile it survived, <b>mistaken for Merlot</b>, until DNA work identified it in <b>1994</b>. Now it\'s Chile\'s own.' },
    { kind: 'text', title: 'The taste', body: 'Deep colour, soft tannin, black fruit and a distinctive <b>green pepper / herbal</b> note, strongest when the grapes aren\'t fully ripe. It needs a long, warm season.' },
  ], [
    { type: 'choice', wines: ['carmenere'], q: 'In Chile, Carménère was long mistaken for…', options: ['Merlot', 'Malbec', 'Syrah', 'Pinot Noir'], answer: 0,
      explain: 'Until 1994.' },
    { type: 'choice', q: 'Where did Carménère originally come from?', options: ['Bordeaux', 'Chile', 'Spain', 'Italy'], answer: 0,
      explain: 'It almost vanished there after phylloxera.' },
    { type: 'choice', q: 'Carménère\'s tell-tale aroma?', options: ['Green pepper', 'Lychee', 'Banana', 'Petrol'], answer: 0,
      explain: 'Strongest in less ripe grapes.' },
  ]);

  const pinotage = grape('pinotage', 'Pinotage', 'South Africa\'s own cross', [
    { kind: 'text', title: 'Made in Stellenbosch', big: 'Pinot Noir × Cinsault',
      body: 'In <b>1925</b>, Professor Abraham Perold at Stellenbosch crossed <b>Pinot Noir</b> with <b>Cinsault</b> (then called Hermitage locally): hence <b>Pino-tage</b>.' },
    { kind: 'text', title: 'The taste', big: 'Plum · blackberry · smoke',
      body: 'Deep colour, ripe dark fruit, often a <b>smoky</b>, earthy note. Styles range from juicy and fruity (some even taste of coffee and chocolate from oak) to serious, age-worthy reds.' },
  ], [
    { type: 'choice', wines: ['pinotage'], q: 'Pinotage is a cross of…', options: ['Pinot Noir and Cinsault', 'Pinot Noir and Syrah', 'Pinot Gris and Merlot', 'Cabernet and Merlot'], answer: 0,
      explain: 'Cinsault was called Hermitage in South Africa: Pino-tage.' },
    { type: 'choice', q: 'Where was Pinotage created?', options: ['Stellenbosch, South Africa', 'Burgundy', 'California', 'Australia'], answer: 0,
      explain: 'By Abraham Perold, in 1925.' },
    { type: 'odd', q: 'Which is NOT typical of Pinotage?', options: ['Dark fruit', 'Smoky notes', 'Deep colour', 'Pale and see-through'], answer: 3,
      explain: 'Pinotage is dark.' },
  ]);

  const mencia = grape('mencia', 'Mencía', 'Fresh reds from Spain\'s north-west', [
    { kind: 'text', title: 'Spain\'s fresh red', big: 'Red cherry · violet · pepper',
      body: 'Mencía is <b>medium-bodied</b> with fresh acidity, red and dark cherry, violets and a peppery, <b>mineral</b> edge. Lighter than most Spanish reds.' },
    { kind: 'facts', title: 'Where to find it', rows: [
      { k: 'Bierzo', v: 'Castilla y León: old vines on slate hillsides.' },
      { k: 'Ribeira Sacra', v: 'Galicia: dizzying terraces above the Sil river.' },
      { k: 'Portugal', v: 'Called Jaen, in the Dão.' },
    ] },
  ], [
    { type: 'choice', wines: ['mencia'], q: 'Mencía\'s homes?', options: ['Bierzo and Ribeira Sacra', 'Rioja and Ribera', 'Jerez', 'Priorat'], answer: 0,
      explain: 'Spain\'s green north-west.' },
    { type: 'choice', q: 'In Portugal, Mencía is called…', options: ['Jaen', 'Touriga', 'Tinta Roriz', 'Alvarinho'], answer: 0,
      explain: 'Grown in the Dão.' },
    { type: 'slider', wines: ['mencia'], q: 'Place Mencía on the body scale.', low: 'Light', high: 'Full', answer: 0.45, tol: 0.2,
      explain: 'Medium-bodied and fresh.' },
  ]);

  const furmint = grape('furmint', 'Furmint', 'Tokaji\'s fiery white', [
    { kind: 'text', title: 'Fire and acid', big: 'Lime · pear · smoke',
      body: 'Furmint has <b>very high acidity</b>, a smoky, <b>mineral</b> edge from Tokaj\'s volcanic soils, and catches <b>noble rot</b> easily. It\'s the main grape of Tokaji, with Hárslevelű.' },
    { kind: 'compare', title: 'Dry or sweet', cols: [
      { h: 'Dry Furmint', items: ['Lime, pear, smoke', 'Increasingly popular', 'Can age for years'] },
      { h: 'Tokaji Aszú', items: ['Nobly rotten berries', 'Apricot, orange, honey', 'Sweet but fresh'] }] },
  ], [
    { type: 'choice', wines: ['furmint'], q: 'Furmint is the main grape of…', options: ['Tokaji', 'Sauternes', 'Champagne', 'Port'], answer: 0,
      explain: 'With Hárslevelű and others.' },
    { type: 'choice', q: 'What keeps sweet Tokaji fresh?', options: ['Furmint\'s very high acidity', 'Oak', 'Bubbles', 'Tannin'], answer: 0,
      explain: 'Acidity balances sugar.' },
    { type: 'sort', q: 'Dry Furmint or Tokaji Aszú?', buckets: ['Dry Furmint', 'Aszú'],
      items: [{ t: 'Lime and smoke', b: 0 }, { t: 'Nobly rotten berries', b: 1 }, { t: 'Apricot and honey', b: 1 }, { t: 'Pear', b: 0 }],
      explain: 'Same grape, two very different wines.' },
  ], ['Tokaj PDO: C/2026/1380']);

  const torrontes = grape('torrontes', 'Torrontés', 'Argentina\'s floral white', [
    { kind: 'text', title: 'Smells sweet, tastes dry', big: 'Rose · peach · orange blossom',
      body: 'Argentina\'s own white, a natural cross of Muscat of Alexandria with a local grape. Hugely <b>perfumed</b> (rose, peach, orange blossom) yet usually <b>dry</b>, with a slightly bitter finish.' },
    { kind: 'facts', title: 'Sky-high vineyards', rows: [
      { k: 'Salta', v: 'Around Cafayate, among the highest vineyards in the world, some well above 2,000 m.' },
      { k: 'Why it works', v: 'Intense sun for perfume; cold nights for freshness.' },
    ] },
  ], [
    { type: 'choice', wines: ['torrontes'], q: 'Torrontés smells sweet. Is it?', options: ['Usually dry', 'Always very sweet', 'Always sparkling', 'Fortified'], answer: 0,
      explain: 'Perfume isn\'t sweetness (remember dry Muscat).' },
    { type: 'choice', q: 'Torrontés is a cross involving…', options: ['Muscat of Alexandria', 'Chardonnay', 'Riesling', 'Malbec'], answer: 0,
      explain: 'That\'s where the perfume comes from.' },
    { type: 'choice', q: 'Salta\'s vineyards are famous for…', options: ['Extreme altitude', 'Being below sea level', 'Being on islands', 'Frozen grapes'], answer: 0,
      explain: 'Some are well above 2,000 m.' },
  ]);

  const koshu = grape('koshu', 'Koshu', 'Japan\'s delicate white', [
    { kind: 'text', title: 'Quiet and pure', big: 'Yuzu · white peach · light',
      body: 'Koshu has <b>pinkish-purple skins</b> but makes a pale, <b>delicate white</b>: light-bodied, low in alcohol, with citrus (think <b>yuzu</b>) and white peach. Made for Japanese food.' },
    { kind: 'facts', title: 'Where it grows', rows: [
      { k: 'Yamanashi', v: 'In the shadow of Mount Fuji: Japan\'s wine heartland.' },
      { k: 'Pergolas', v: 'Vines are trained high overhead, keeping grapes airy in the humid summers.' },
      { k: 'Food', v: 'Sushi, sashimi, tempura.' },
    ] },
  ], [
    { type: 'choice', wines: ['koshu'], q: 'Koshu\'s home region?', options: ['Yamanashi, near Mount Fuji', 'Hokkaido', 'Okinawa', 'Kyoto'], answer: 0,
      explain: 'Japan\'s wine heartland.' },
    { type: 'choice', q: 'Why are Koshu vines trained high on pergolas?', options: ['To keep grapes airy in humid summers', 'To protect from snow', 'To make picking faster', 'Tradition only'], answer: 0,
      explain: 'Air flow fights rot.' },
    { type: 'slider', wines: ['koshu'], q: 'Place Koshu on the body scale.', low: 'Light', high: 'Full', answer: 0.15, tol: 0.18,
      explain: 'Light and delicate.' },
  ]);

  const chasselas = grape('chasselas', 'Chasselas', 'Switzerland\'s lakeside white', [
    { kind: 'text', title: 'A mirror of its place', big: 'Lime blossom · pear · gentle',
      body: 'Chasselas is <b>neutral</b>, soft and <b>low in acidity</b>: pear, lime blossom, a touch of almond. That neutrality lets it <b>reflect its soil</b> like few other grapes.' },
    { kind: 'facts', title: 'Where to find it', rows: [
      { k: 'Lavaux', v: 'Vineyard terraces dropping to Lake Geneva: a UNESCO World Heritage site.' },
      { k: 'Valais', v: 'Called Fendant.' },
      { k: 'Food', v: 'The classic match for cheese fondue and raclette.' },
    ] },
  ], [
    { type: 'choice', wines: ['chasselas'], q: 'Chasselas\'s classic food match?', options: ['Cheese fondue', 'Steak', 'Chocolate', 'Curry'], answer: 0,
      explain: 'And raclette.' },
    { type: 'choice', q: 'Lavaux\'s terraces drop down to…', options: ['Lake Geneva', 'The Rhine', 'The Mediterranean', 'Lake Como'], answer: 0,
      explain: 'A UNESCO World Heritage site.' },
    { type: 'choice', q: 'In the Valais, Chasselas is called…', options: ['Fendant', 'Gutedel', 'Rolle', 'Gouveio'], answer: 0,
      explain: 'Same grape.' },
    { type: 'slider', wines: ['chasselas'], q: 'Place Chasselas on the acidity scale.', low: 'Low', high: 'High', answer: 0.3, tol: 0.2,
      explain: 'Soft and gentle.' },
  ]);

  const savagnin = grape('savagnin', 'Savagnin', 'The Jura\'s vin jaune grape', [
    { kind: 'text', title: 'Vin jaune: "yellow wine"', big: 'Walnut · apple · curry spice',
      body: 'In the Jura, Savagnin is aged in barrels <b>for years without topping up</b>. A film of yeast (the <b>voile</b>, a cousin of Sherry\'s flor) grows on the surface and the wine oxidises slowly. The result: golden, dry, intense <b>walnut, apple and spice</b>.' },
    { kind: 'facts', title: 'Good to know', rows: [
      { k: 'The bottle', v: 'Sold in a squat 62 cl bottle called a clavelin.' },
      { k: 'Château-Chalon', v: 'The Jura\'s most famous vin jaune appellation.' },
      { k: 'Food', v: 'Comté cheese, and chicken with morels and cream.' },
    ] },
  ], [
    { type: 'choice', wines: ['vinjaune'], q: 'Vin jaune is aged under…', options: ['A film of yeast called the voile', 'Ice', 'Nitrogen', 'Glass'], answer: 0,
      explain: 'Like Sherry\'s flor.' },
    { type: 'choice', q: 'Vin jaune\'s bottle is the…', options: ['62 cl clavelin', 'Standard 75 cl', 'Magnum', 'Half bottle'], answer: 0,
      explain: 'Squat and unique to the Jura.' },
    { type: 'sort', q: 'Typical of vin jaune?', buckets: ['Typical', 'Not typical'],
      items: [{ t: 'Walnut', b: 0 }, { t: 'Dry', b: 0 }, { t: 'Fresh and fruity', b: 1 }, { t: 'Spice', b: 0 }, { t: 'Sparkling', b: 1 }],
      explain: 'Golden, dry and nutty.' },
    { type: 'choice', q: 'The perfect cheese with vin jaune?', options: ['Comté', 'Mozzarella', 'Brie', 'Feta'], answer: 0,
      explain: 'A Jura classic.' },
  ], ['Côtes du Jura AOC: OJ C 49, 2023']);

  Object.assign(D.grapeLessons, { xinomavro, agiorgitiko, aglianico, nerello, touriga, blaufrankisch, saperavi, tannat, carmenere, pinotage, mencia, furmint, torrontes, koshu, chasselas, savagnin, rkatsiteli });
})();
