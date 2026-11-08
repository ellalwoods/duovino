/* Track B · Part 2: Classic reds.
 * Grape style isn't regulated. Rules named in a lesson were checked (2026-11-08) against EU-published texts:
 *  - Brunello di Montalcino DOCG (PDO-IT-A1199-AM02): Sangiovese only; at least 24 months in oak.
 *  - Chianti Classico DOCG (OJ C 100, 16.3.2018): main grape Sangiovese; vintage, Riserva and Gran Selezione.
 *  - Rioja DOCa (OJ C 168, 2021): Crianza, Reserva, Gran Reserva described by colour and ageing. No months stated in the app.
 *  - Bandol AOC (C/2025/4233): red ≥ 50% Mourvèdre, 18 months in wood (usually large foudres).
 *  - Barbera d'Asti DOCG (OJ C 60, 15.2.2019): main grape Barbera.
 *  - Montepulciano d'Abruzzo DOC (OJ C 220, 2023): grape Montepulciano.
 *  - Morgon, Fleurie: Beaujolais crus in the EU register.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });

  const grenache = {
    id: 'b-g-grenache', title: 'Grenache / Garnacha', sub: 'Strawberry, spice, warmth',
    lesson: [
      { kind: 'text', title: 'Sun-loving and generous', big: 'Strawberry · raspberry · white pepper',
        body: 'Grenache loves <b>heat</b> and wind. It ripens to <b>high alcohol</b> with soft, ripe <b>red fruit</b> and a hint of spice. It\'s naturally <b>pale</b>, with medium tannin, so it\'s often blended for colour and structure.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Southern Rhône', v: 'The lead grape in most blends, including Châteauneuf-du-Pape and Côtes du Rhône.' },
        { k: 'Spain', v: 'Garnacha: its homeland. Priorat\'s dark slate slopes give intense, powerful versions.' },
        { k: 'Australia', v: 'The "G" in GSM blends: Grenache, Syrah, Mourvèdre.' },
        { k: 'Rosé', v: 'Pale, fruity, dry rosés across southern France.' },
      ] },
      { kind: 'try', title: 'Why blend it?', body: 'Grenache on its own can be pale and soft…',
        prompt: 'What could Syrah and Mourvèdre add?',
        reveal: 'Syrah brings <b>colour</b> and dark fruit; Mourvèdre brings <b>tannin</b> and structure. Grenache brings the <b>juicy red fruit</b> and warmth.' },
    ],
    questions: [
      { type: 'choice', wines: ['grenache'], q: 'What is Grenache called in Spain?', options: ['Garnacha', 'Tempranillo', 'Monastrell', 'Tinto Fino'], answer: 0,
        explain: 'Spain is its homeland.' },
      { type: 'sort', wines: ['grenache'], q: 'Typical of Grenache?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Strawberry', b: 0 }, { t: 'High alcohol', b: 0 }, { t: 'Very deep colour', b: 1 }, { t: 'White pepper', b: 0 }, { t: 'Loves cool climates', b: 1 }],
        explain: 'Warm, red-fruited, high in alcohol and naturally pale.' },
      { type: 'choice', q: 'In a GSM blend, the G is…', options: ['Grenache', 'Gamay', 'Grüner Veltliner', 'Garganega'], answer: 0,
        explain: 'Grenache, Syrah, Mourvèdre.' },
      { type: 'choice', q: 'Grenache is the lead grape of…', options: ['The southern Rhône', 'Burgundy', 'The Mosel', 'Champagne'], answer: 0,
        explain: 'Including Châteauneuf-du-Pape and Côtes du Rhône.' },
      { type: 'choice', q: 'Why is Grenache often blended?', options: ['It\'s naturally pale and soft', 'It\'s too tannic', 'It\'s too acidic', 'It has no fruit'], answer: 0,
        explain: 'Partners add colour and structure.' },
    ],
  };

  const tempranillo = {
    id: 'b-g-tempranillo', title: 'Tempranillo', sub: 'Rioja and Ribera', sources: ['Rioja DOCa: OJ C 168, 2021'],
    lesson: [
      { kind: 'label', title: 'Meet Tempranillo', body: 'Spanish labels name the place and the ageing. Tap the underlined words.',
        label: { style: 'spain', lines: [
          [s('Bodegas Valdesol', 'producer', { note: 'The producer.' })],
          [s('Rioja', 'app', { big: true, note: 'Northern Spain\'s most famous red region. Tempranillo leads the blend.' })],
          [s('Reserva', 'age', { note: 'An ageing term. Each step up the ladder means longer ageing in barrel and bottle before release.' })],
          [s('2019', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'Spain\'s great red grape', big: 'Red cherry · leather · vanilla',
        body: 'Tempranillo has <b>medium acidity and tannin</b> and red fruit. It takes beautifully to <b>oak</b>: traditional Rioja, often aged in American oak, adds <b>vanilla and coconut</b>; with age come leather and dried fruit.' },
      { kind: 'layers', title: 'The Rioja ageing ladder', rows: [
        { h: 'Joven', t: 'Young: little or no oak. Purple, fruity.' },
        { h: 'Crianza', t: 'Some time in barrel. Cherry red, with toasty oak.' },
        { h: 'Reserva', t: 'Longer ageing: more complex and spicy.' },
        { h: 'Gran Reserva', t: 'The longest ageing: ruby turning brick, mellow and complex.' },
      ] },
      { kind: 'facts', title: 'Many names', rows: [
        { k: 'Ribera del Duero', v: 'Tinto Fino or Tinta del País: darker, more powerful.' },
        { k: 'Portugal', v: 'Tinta Roriz (Douro) or Aragonez.' },
      ] },
    ],
    questions: [
      { type: 'order', wines: ['rioja'], q: 'Order the Rioja ageing terms, shortest to longest.', items: ['Joven', 'Crianza', 'Reserva', 'Gran Reserva'],
        explain: 'Each step means longer ageing before release.' },
      { type: 'choice', q: 'Vanilla and coconut in a traditional Rioja come from…', options: ['American oak', 'The grape itself', 'Malolactic', 'Stainless steel'], answer: 0,
        explain: 'American oak is bolder, with vanilla and coconut.' },
      { type: 'odd', q: 'Which is NOT a name for Tempranillo?', options: ['Tinto Fino', 'Tinta del País', 'Tinta Roriz', 'Garnacha'], answer: 3,
        explain: 'Garnacha is Grenache.' },
      { type: 'sort', q: 'Young Rioja or Gran Reserva?', buckets: ['Joven', 'Gran Reserva'],
        items: [{ t: 'Purple', b: 0 }, { t: 'Brick-tinged ruby', b: 1 }, { t: 'Fresh fruit', b: 0 }, { t: 'Leather and dried fruit', b: 1 }],
        explain: 'Time softens and browns the wine.' },
      { type: 'choice', q: 'Ribera del Duero\'s Tempranillo is usually…', options: ['Darker and more powerful', 'Sweet', 'White', 'Sparkling'], answer: 0,
        explain: 'Called Tinto Fino there.' },
    ],
  };

  const sangiovese = {
    id: 'b-g-sangiovese', title: 'Sangiovese', sub: 'Cherry, tea, Tuscany',
    sources: ['Chianti Classico DOCG: OJ C 100, 16.3.2018', 'Brunello di Montalcino DOCG: PDO-IT-A1199-AM02'],
    lesson: [
      { kind: 'label', title: 'Meet Sangiovese', body: 'Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Castello di Poggiolo', 'producer', { note: 'The producer.' })],
          [s('Chianti Classico', 'app', { big: true, note: 'The historic heart of Chianti, in the hills between Florence and Siena. Sangiovese is the main grape.' })],
          [s('Riserva', 'age', { note: 'Aged longer than the basic (annata) wine. Gran Selezione sits above Riserva.' })],
          [s('2020', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'Tuscany in a glass', big: 'Sour cherry · tomato leaf · tea',
        body: 'Sangiovese has <b>high acidity</b> and <b>firm tannin</b>, with <b>sour cherry</b>, herbs and a savoury, tea-like edge. Its acidity makes it brilliant with tomato-based food.' },
      { kind: 'layers', title: 'Three famous Tuscans', rows: [
        { h: 'Chianti Classico', t: 'Annata → Riserva → Gran Selezione, the top tier.' },
        { h: 'Brunello di Montalcino', t: 'Sangiovese only, with at least 24 months in oak: powerful and long-lived.' },
        { h: 'Vino Nobile di Montepulciano', t: 'From the town of Montepulciano. Not to be confused with the Montepulciano grape!' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['chianti'], q: 'The main grape of Chianti Classico?', options: ['Sangiovese', 'Nebbiolo', 'Merlot', 'Montepulciano'], answer: 0,
        explain: 'Sangiovese is Tuscany\'s grape.' },
      { type: 'order', q: 'Order the Chianti Classico tiers, from basic to top.', items: ['Annata', 'Riserva', 'Gran Selezione'],
        explain: 'Gran Selezione is the top of the pyramid.' },
      { type: 'choice', wines: ['brunello'], q: 'Brunello di Montalcino is made from…', options: ['Sangiovese only', 'Mostly Merlot', 'Nebbiolo', 'A blend of white grapes'], answer: 0,
        explain: 'And at least 24 months in oak.' },
      { type: 'sort', q: 'Typical of Sangiovese?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Sour cherry', b: 0 }, { t: 'High acidity', b: 0 }, { t: 'Tea and herbs', b: 0 }, { t: 'Jammy and soft', b: 1 }, { t: 'Lychee', b: 1 }],
        explain: 'Bright, savoury and firm.' },
      { type: 'choice', q: 'Vino Nobile di Montepulciano is named after…', options: ['A town', 'A grape', 'A producer', 'A river'], answer: 0,
        explain: 'The town of Montepulciano, in Tuscany. Its grape is mostly Sangiovese.' },
      { type: 'choice', q: 'Why is Sangiovese good with tomato sauces?', options: ['Its high acidity matches the tomato', 'It\'s sweet', 'It has no tannin', 'It\'s white'], answer: 0,
        explain: 'Acidity in food needs acidity in the wine.' },
    ],
  };

  const nebbiolo = {
    id: 'b-g-nebbiolo', title: 'Nebbiolo', sub: 'Tar and roses',
    lesson: [
      { kind: 'text', title: 'Pale but mighty', big: 'Rose · cherry · tar',
        body: 'Nebbiolo looks <b>pale</b>, garnet even when young, but don\'t be fooled: it has <b>very high tannin</b> and <b>high acidity</b>. Aromas of <b>roses, red cherry and tar</b>; with age, leather and truffle. The best need years to soften.' },
      { kind: 'facts', title: 'Piedmont\'s greats', rows: [
        { k: 'Barolo', v: 'The "king": powerful, long-lived, from the Langhe hills near Alba.' },
        { k: 'Barbaresco', v: 'Its neighbour: often a touch more elegant.' },
        { k: 'Langhe Nebbiolo', v: 'Lighter, earlier-drinking versions.' },
        { k: 'Name', v: 'From "nebbia", fog: autumn fog fills the valleys at harvest.' },
      ] },
      { kind: 'try', title: 'A colour trap', body: 'A pale, brick-edged red, poured blind…',
        prompt: 'Light-bodied and soft?',
        reveal: '<b>Not if it\'s Nebbiolo.</b> Colour comes from the skins\' pigments; tannin is a different thing. Nebbiolo is pale but grips like a vice.' },
    ],
    questions: [
      { type: 'blind', wines: ['barolo'], q: 'A pale red with a mighty grip, poured blind.',
        clues: [
          { stage: 'Look', text: 'Pale garnet, orange at the rim.' },
          { stage: 'Smell', text: 'Roses, cherry, tar.' },
          { stage: 'Sip', text: 'Very high tannin, high acidity. From foggy hills in Piedmont.' },
        ],
        options: ['Barolo', 'Beaujolais', 'Rioja Joven', 'Barossa Shiraz'], answer: 0,
        explain: 'Tar and roses, pale yet tannic: Nebbiolo.' },
      { type: 'choice', q: 'Nebbiolo\'s classic aromas?', options: ['Tar and roses', 'Lychee and ginger', 'Coconut and vanilla', 'Banana and bubblegum'], answer: 0,
        explain: 'Plus red cherry, and leather with age.' },
      { type: 'choice', q: 'Pale colour in Nebbiolo means…', options: ['Nothing about its tannin: it\'s still very tannic', 'It\'s light and soft', 'It\'s sweet', 'It\'s a rosé'], answer: 0,
        explain: 'Colour and tannin are different things.' },
      { type: 'sort', q: 'Barolo or Barbaresco?', buckets: ['Barolo', 'Barbaresco'],
        items: [{ t: 'The "king"', b: 0 }, { t: 'Often more elegant', b: 1 }, { t: 'Powerful and long-lived', b: 0 }],
        explain: 'Neighbours, both Nebbiolo.' },
      { type: 'choice', q: 'Where does Nebbiolo\'s name come from?', options: ['"Nebbia", fog', 'A saint', 'A river', 'A town'], answer: 0,
        explain: 'Autumn fog fills Piedmont\'s valleys.' },
    ],
  };

  const cabfranc = {
    id: 'b-g-cabfranc', title: 'Cabernet Franc', sub: 'Raspberry and pencil shavings',
    lesson: [
      { kind: 'text', title: 'Cabernet\'s lighter parent', big: 'Raspberry · violet · leafy',
        body: 'Cabernet Franc is a <b>parent of Cabernet Sauvignon</b>. It\'s lighter, with <b>medium tannin</b>, fresh acidity, red fruit like <b>raspberry</b>, violets, a <b>leafy, green-pepper</b> note and a whiff of <b>pencil shavings</b>.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Loire', v: 'Chinon, Bourgueil, Saumur-Champigny: fresh, leafy, often lightly chilled.' },
        { k: 'Bordeaux', v: 'A blending partner, important on the Right Bank (Saint-Émilion).' },
        { k: 'Also', v: 'Argentina, Hungary, northern Italy, Canada (even as icewine).' },
      ] },
      { kind: 'compare', title: 'Franc vs Sauvignon', cols: [
        { h: 'Cabernet Franc', items: ['Lighter, softer', 'Raspberry, violet', 'Medium tannin'] },
        { h: 'Cabernet Sauvignon', items: ['Fuller, firmer', 'Blackcurrant, cedar', 'High tannin'] }] },
    ],
    questions: [
      { type: 'choice', q: 'Cabernet Franc is…', options: ['A parent of Cabernet Sauvignon', 'The same grape as Merlot', 'A white grape', 'Another name for Malbec'], answer: 0,
        explain: 'Its offspring is Cabernet Sauvignon.' },
      { type: 'sort', wines: ['cabfranc'], q: 'Cabernet Franc or Cabernet Sauvignon?', buckets: ['Franc', 'Sauvignon'],
        items: [{ t: 'Raspberry', b: 0 }, { t: 'Blackcurrant', b: 1 }, { t: 'Lighter', b: 0 }, { t: 'High tannin', b: 1 }, { t: 'Violet', b: 0 }],
        explain: 'Franc is the lighter, red-fruited one.' },
      { type: 'choice', wines: ['cabfranc'], q: 'Chinon, from the Loire, is made from…', options: ['Cabernet Franc', 'Pinot Noir', 'Gamay', 'Malbec'], answer: 0,
        explain: 'As are Bourgueil and Saumur-Champigny.' },
      { type: 'odd', q: 'Which is NOT a Cabernet Franc note?', options: ['Raspberry', 'Pencil shavings', 'Leafy green pepper', 'Lychee'], answer: 3,
        explain: 'Lychee is Gewurztraminer.' },
      { type: 'choice', q: 'In Bordeaux, Cabernet Franc is especially important…', options: ['On the Right Bank (Saint-Émilion)', 'For sweet wines', 'In white blends', 'Nowhere'], answer: 0,
        explain: 'It blends with Merlot there.' },
    ],
  };

  const gamay = {
    id: 'b-g-gamay', title: 'Gamay', sub: 'Beaujolais\' joyful red',
    lesson: [
      { kind: 'text', title: 'Pure juicy fun', big: 'Red cherry · raspberry · light',
        body: 'Gamay makes <b>light, low-tannin</b>, high-acid reds bursting with <b>red cherry and raspberry</b>. Lovely lightly chilled. Some are made by <b>carbonic maceration</b>, adding banana and bubblegum.' },
      { kind: 'layers', title: 'The Beaujolais ladder', rows: [
        { h: 'Beaujolais', t: 'Light and fruity. Beaujolais Nouveau is released just weeks after harvest.' },
        { h: 'Beaujolais-Villages', t: 'From a group of better villages: a step up in depth.' },
        { h: 'The crus', t: 'Ten named villages, like Fleurie (floral, silky) and Morgon (deeper, can age). The label often shows only the cru name.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['beaujolais'], q: 'Beaujolais is made from…', options: ['Gamay', 'Pinot Noir', 'Syrah', 'Grenache'], answer: 0,
        explain: 'Just south of Burgundy.' },
      { type: 'order', q: 'Order the Beaujolais tiers, from simplest to top.', items: ['Beaujolais', 'Beaujolais-Villages', 'Cru (e.g. Morgon)'],
        explain: 'The ten crus are the top.' },
      { type: 'sort', q: 'Fleurie or Morgon?', buckets: ['Fleurie', 'Morgon'],
        items: [{ t: 'Floral and silky', b: 0 }, { t: 'Deeper, can age', b: 1 }],
        explain: 'Two of the ten crus.' },
      { type: 'slider', wines: ['beaujolais'], q: 'Place Gamay on the tannin scale.', low: 'Low', high: 'High', answer: 0.2, tol: 0.18,
        explain: 'Light and low in tannin.' },
      { type: 'choice', q: 'A label says only "Fleurie". What is it?', options: ['A Beaujolais cru, made from Gamay', 'A white Burgundy', 'A Champagne', 'A rosé from Provence'], answer: 0,
        explain: 'Crus often leave "Beaujolais" off the label.' },
    ],
  };

  const malbec = {
    id: 'b-g-malbec', title: 'Malbec', sub: 'From Cahors to Mendoza',
    lesson: [
      { kind: 'text', title: 'Deep, dark and plush', big: 'Blackberry · plum · violet',
        body: 'Malbec is <b>deeply coloured</b>, with ripe <b>blackberry and plum</b>, violets, and soft but plentiful tannin. Oak adds chocolate and vanilla.' },
      { kind: 'compare', title: 'Two homes', cols: [
        { h: 'Cahors, south-west France', items: ['Its old home: the "black wine"', 'Firmer, more tannic, earthy'] },
        { h: 'Mendoza, Argentina', items: ['Its famous home today', 'High-altitude vineyards', 'Riper, plusher, juicier'] }] },
      { kind: 'try', title: 'High and sunny', body: 'Mendoza\'s vineyards are high in the Andes foothills…',
        prompt: 'What does the altitude do for Malbec?',
        reveal: 'Intense sun ripens the grapes fully, while <b>cold nights</b> keep them fresh. Ripe fruit, but not jammy.' },
    ],
    questions: [
      { type: 'choice', wines: ['malbec'], q: 'Malbec\'s most famous home today?', options: ['Mendoza, Argentina', 'Burgundy', 'Napa', 'Mosel'], answer: 0,
        explain: 'High-altitude vineyards in the Andes foothills.' },
      { type: 'sort', q: 'Cahors or Mendoza?', buckets: ['Cahors', 'Mendoza'],
        items: [{ t: 'The "black wine"', b: 0 }, { t: 'High altitude', b: 1 }, { t: 'Firmer and earthy', b: 0 }, { t: 'Riper and plusher', b: 1 }],
        explain: 'Old home vs new home.' },
      { type: 'choice', q: 'Why do Mendoza\'s cold nights help?', options: ['They keep freshness while the sun ripens the fruit', 'They make it sweet', 'They add bubbles', 'They stop ripening'], answer: 0,
        explain: 'The day–night gap.' },
      { type: 'odd', q: 'Which is NOT typical of Malbec?', options: ['Deep colour', 'Plum', 'Violet', 'Pale and see-through'], answer: 3,
        explain: 'Malbec is inky.' },
    ],
  };

  const zinfandel = {
    id: 'b-g-zinfandel', title: 'Zinfandel / Primitivo', sub: 'Jammy and generous',
    lesson: [
      { kind: 'text', title: 'One grape, three countries', big: 'Jammy blackberry · spice · high alcohol',
        body: 'DNA showed that California\'s <b>Zinfandel</b>, southern Italy\'s <b>Primitivo</b> and a rare Croatian grape are <b>the same vine</b>. It ripens unevenly, so bunches mix raisins with green berries: the wine is <b>ripe, jammy</b>, spicy and often <b>high in alcohol</b>.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'California', v: 'Old-vine Zinfandel, especially in Lodi and Sonoma: rich and peppery.' },
        { k: 'Puglia, Italy', v: 'Primitivo: the "heel" of Italy, warm and generous.' },
        { k: 'Croatia', v: 'Its original home.' },
        { k: 'White Zinfandel', v: 'A sweet, pale pink rosé, made very differently.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['zinfandel'], q: 'Primitivo is the same grape as…', options: ['Zinfandel', 'Pinot Noir', 'Sangiovese', 'Grenache'], answer: 0,
        explain: 'DNA proved it, along with a Croatian grape.' },
      { type: 'choice', q: 'Where did the grape originally come from?', options: ['Croatia', 'California', 'France', 'Spain'], answer: 0,
        explain: 'California and Puglia came later.' },
      { type: 'sort', q: 'Typical of Zinfandel?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Jammy blackberry', b: 0 }, { t: 'High alcohol', b: 0 }, { t: 'Pale and delicate', b: 1 }, { t: 'Spice', b: 0 }, { t: 'Searing acidity', b: 1 }],
        explain: 'Ripe, rich and warm.' },
      { type: 'choice', q: 'Why can Zinfandel be so ripe and jammy?', options: ['It ripens unevenly: raisins mix with green berries', 'Sugar is added', 'It grows in cold places', 'It\'s fortified'], answer: 0,
        explain: 'Some berries shrivel while others catch up.' },
      { type: 'choice', q: 'White Zinfandel is…', options: ['A sweet, pale pink rosé', 'A white grape', 'A dry red', 'A sparkling wine'], answer: 0,
        explain: 'Same black grape, very different wine.' },
    ],
  };

  const mourvedre = {
    id: 'b-g-mourvedre', title: 'Mourvèdre / Monastrell', sub: 'Meaty and dark', sources: ['Bandol AOC: single document, C/2025/4233'],
    lesson: [
      { kind: 'text', title: 'Wild and savoury', big: 'Blackberry · game · herbs',
        body: 'Mourvèdre needs <b>lots of heat</b>. It gives <b>deep colour</b>, <b>high tannin</b>, dark fruit and savoury, <b>meaty, gamey</b> notes with wild herbs. It ages well.' },
      { kind: 'facts', title: 'Three names', rows: [
        { k: 'Bandol', v: 'On Provence\'s coast. Red Bandol must be at least 50% Mourvèdre and spends 18 months in wood, usually big old casks.' },
        { k: 'Spain', v: 'Monastrell: Jumilla and the hot south-east, ripe and powerful.' },
        { k: 'Australia', v: 'Sometimes called Mataro; the "M" in GSM.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['bandol'], q: 'A red Bandol must be at least… Mourvèdre.', options: ['50%', '10%', '85%', '100%'], answer: 0,
        explain: 'And age 18 months in wood.' },
      { type: 'choice', q: 'In Spain, Mourvèdre is called…', options: ['Monastrell', 'Garnacha', 'Tempranillo', 'Godello'], answer: 0,
        explain: 'Found in Jumilla and the hot south-east.' },
      { type: 'sort', q: 'Typical of Mourvèdre?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Meaty, gamey', b: 0 }, { t: 'High tannin', b: 0 }, { t: 'Loves cool weather', b: 1 }, { t: 'Deep colour', b: 0 }, { t: 'Light and pale', b: 1 }],
        explain: 'Dark, savoury and sun-loving.' },
      { type: 'choice', q: 'In a GSM blend, the M is…', options: ['Mourvèdre', 'Merlot', 'Malbec', 'Muscat'], answer: 0,
        explain: 'Grenache, Syrah, Mourvèdre.' },
    ],
  };

  const barbera = {
    id: 'b-g-barbera', title: 'Barbera', sub: 'Juicy and bright', sources: ['Barbera d\'Asti DOCG: OJ C 60, 15.2.2019'],
    lesson: [
      { kind: 'text', title: 'Piedmont\'s everyday red', big: 'Sour cherry · plum · high acid',
        body: 'Barbera is <b>deeply coloured</b> with <b>high acidity</b> but <b>low tannin</b>: juicy, bright, easy to love. Unoaked it\'s all cherry and plum; oak adds spice and softness.' },
      { kind: 'compare', title: 'Piedmont\'s two reds', cols: [
        { h: 'Barbera', items: ['Deep colour', 'Low tannin', 'Drink young to mid-term'] },
        { h: 'Nebbiolo', items: ['Pale colour', 'Very high tannin', 'Needs years'] }] },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Piedmont', v: 'Barbera d\'Asti and Barbera d\'Alba.' },
        { k: 'Food', v: 'Its acidity loves pizza, pasta and tomato.' },
      ] },
    ],
    questions: [
      { type: 'sort', wines: ['barbera'], q: 'Barbera or Nebbiolo?', buckets: ['Barbera', 'Nebbiolo'],
        items: [{ t: 'Deep colour', b: 0 }, { t: 'Pale colour', b: 1 }, { t: 'Low tannin', b: 0 }, { t: 'Very high tannin', b: 1 }, { t: 'Drink younger', b: 0 }],
        explain: 'Opposites from the same region.' },
      { type: 'slider', wines: ['barbera'], q: 'Place Barbera on the acidity scale.', low: 'Low', high: 'High', answer: 0.8, tol: 0.2,
        explain: 'High acidity, low tannin.' },
      { type: 'choice', q: 'Barbera d\'Asti comes from…', options: ['Piedmont', 'Tuscany', 'Sicily', 'Veneto'], answer: 0,
        explain: 'As does Barbera d\'Alba.' },
      { type: 'choice', q: 'The best match for Barbera?', options: ['Pizza or tomato pasta', 'Oysters', 'Chocolate cake', 'Thai curry'], answer: 0,
        explain: 'Acid loves acid.' },
    ],
  };


  const carignan = {
    id: 'b-g-carignan', title: 'Carignan & Cinsault', sub: 'Old vines, new respect',
    lesson: [
      { kind: 'text', title: 'The south\'s workhorses, reborn', big: 'Old vines, real character',
        body: 'Both were once planted for quantity across southern France. Today, <b>old, low-yielding bush vines</b> make some of the Mediterranean\'s most exciting reds.' },
      { kind: 'compare', title: 'Two very different grapes', cols: [
        { h: 'Carignan', items: ['Deep colour', 'High acidity and tannin', 'Dark fruit, rustic spice'] },
        { h: 'Cinsault', items: ['Pale colour', 'Low tannin, perfumed', 'Strawberry, flowers; great for rosé'] }] },
      { kind: 'facts', title: 'Where to find them', rows: [
        { k: 'Languedoc', v: 'Both, in blends with Grenache and Syrah.' },
        { k: 'Spain', v: 'Carignan is Cariñena (or Samsó), key in Priorat with Garnacha.' },
        { k: 'South Africa', v: 'Cinsault is a parent of Pinotage (with Pinot Noir).' },
        { k: 'Chile', v: 'Old dry-farmed Carignan in Maule.' },
      ] },
    ],
    questions: [
      { type: 'sort', wines: ['carignan'], q: 'Carignan or Cinsault?', buckets: ['Carignan', 'Cinsault'],
        items: [{ t: 'Deep colour', b: 0 }, { t: 'Pale and perfumed', b: 1 }, { t: 'High tannin', b: 0 }, { t: 'Great for rosé', b: 1 }],
        explain: 'Structure vs perfume.' },
      { type: 'choice', q: 'Pinotage is a cross of Pinot Noir and…', options: ['Cinsault', 'Carignan', 'Syrah', 'Gamay'], answer: 0,
        explain: 'Bred in South Africa.' },
      { type: 'choice', q: 'In Priorat, Carignan is called…', options: ['Cariñena or Samsó', 'Monastrell', 'Tinto Fino', 'Godello'], answer: 0,
        explain: 'It partners Garnacha there.' },
      { type: 'choice', q: 'What turned these grapes\' reputation around?', options: ['Old, low-yielding bush vines', 'Higher yields', 'Machine harvesting', 'Adding sugar'], answer: 0,
        explain: 'Low yields, more concentration.' },
    ],
  };

  Object.assign(D.grapeLessons, { carignan, grenache, tempranillo, sangiovese, nebbiolo, cabfranc, gamay, malbec, zinfandel, mourvedre, barbera });
})();
