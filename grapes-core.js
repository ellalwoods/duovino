/* Track B · Part 2: the rest of the big international grapes.
 * Typical styles only, no legal rules. Wine-law facts are left to the region lessons, where they're checked
 * against the official texts.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });

  const pinotgris = {
    id: 'b-g-pinotgris', title: 'Pinot Grigio / Pinot Gris', sub: 'One grape, two very different styles',
    lesson: [
      { kind: 'label', title: 'Two names, one grape', body: 'Tap the underlined words.',
        label: { style: 'italy', lines: [
          [s('Tenuta Valfiore', 'producer', { note: 'The producer.' })],
          [s('Pinot Grigio', 'grape', { big: true, note: 'The Italian name. In France it\'s Pinot Gris: the same grape, a greyish-pink mutation of Pinot Noir.' })],
          [s('Alto Adige', 'region', { note: 'A cool, mountainous region in Italy\'s far north, known for fresher, more aromatic Pinot Grigio.' })],
          [s('2024', 'vintage', { note: 'Drink it young.' })],
        ] } },
      { kind: 'compare', title: 'The name hints at the style', cols: [
        { h: 'Pinot Grigio (Italy)', items: ['Light, crisp, dry', 'Lemon, green apple, pear', 'Picked early for freshness'] },
        { h: 'Pinot Gris (Alsace)', items: ['Rich, rounder, fuller', 'Ripe peach, honey, spice', 'Sometimes off-dry'] }] },
      { kind: 'scale', title: 'Same grape, different body', body: 'Earlier picking keeps it light; riper grapes give a fuller, richer wine.',
        low: 'Light', high: 'Full', marks: [{ t: 'Italian Grigio', at: 0.15 }, { t: 'Oregon', at: 0.5 }, { t: 'Alsace Gris', at: 0.85 }] },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Italy', v: 'Veneto, Friuli and Alto Adige: mostly light and crisp.' },
        { k: 'France', v: 'Alsace, on the border with Germany: rich, spicy, sometimes sweet.' },
        { k: 'USA', v: 'Oregon: in between, with ripe pear.' },
        { k: 'Also', v: 'Germany (as Grauburgunder), New Zealand, Hungary.' },
      ] },
    ],
    questions: [
      { type: 'odd', q: 'Which of these is a different grape from the others?', options: ['Pinot Grigio', 'Pinot Gris', 'Grauburgunder', 'Pinot Noir'], answer: 3,
        explain: 'Pinot Grigio, Pinot Gris and Grauburgunder are one grape in three languages. Pinot Noir is its black-skinned parent.' },
      { type: 'sort', wines: ['italianpg', 'alsacepg'], q: 'Italian Pinot Grigio or Alsace Pinot Gris?', buckets: ['Italian Grigio', 'Alsace Gris'],
        items: [{ t: 'Light and crisp', b: 0 }, { t: 'Ripe peach and honey', b: 1 }, { t: 'Green apple', b: 0 }, { t: 'Rich and spicy', b: 1 }, { t: 'Picked early', b: 0 }, { t: 'Sometimes off-dry', b: 1 }],
        explain: 'Same grape, different aims: Italy goes for freshness, Alsace for richness.' },
      { type: 'slider', wines: ['italianpg'], q: 'Place a typical Italian Pinot Grigio on the body scale.', low: 'Light', high: 'Full', answer: 0.15, tol: 0.18,
        explain: 'Most Italian Pinot Grigio is light and easy-drinking.' },
      { type: 'blind', wines: ['alsacepg'], q: 'A rich white, poured blind.',
        clues: [
          { stage: 'Look', text: 'Deep lemon, almost gold.' },
          { stage: 'Smell', text: 'Ripe peach, pear, honey, a wisp of smoke.' },
          { stage: 'Sip', text: 'Off-dry, medium acidity, full body. From a sunny region near the German border.' },
        ],
        options: ['Alsace Pinot Gris', 'Italian Pinot Grigio', 'Sancerre', 'Chablis'], answer: 0,
        explain: 'Rich, honeyed and spicy, from near Germany: Alsace Pinot Gris.' },
      { type: 'choice', q: 'Pinot Gris grapes have what colour skin?', options: ['Bright green', 'Greyish pink', 'Deep black', 'Yellow'], answer: 1,
        explain: '"Gris" and "Grigio" mean grey. The skins are pinkish grey, which is why some versions have a coppery tint.' },
    ],
  };

  const pinotnoir = {
    id: 'b-g-pinotnoir', title: 'Pinot Noir', sub: 'Silky, fragrant, fussy',
    lesson: [
      { kind: 'label', title: 'Meet Pinot Noir', body: 'Burgundy never names it. Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Domaine Lévêque', 'producer', { note: 'The producer.' })],
          [s('Gevrey-Chambertin', 'app', { big: true, note: 'A famous village in Burgundy\'s Côte de Nuits. Its red wines are Pinot Noir.' })],
          [s('Appellation Gevrey-Chambertin Contrôlée', 'aoc', { small: true, note: 'The legal line.' })],
          [s('2020', 'vintage', { note: 'The vintage. Good red Burgundy rewards a few years\' patience.' })],
        ] } },
      { kind: 'text', title: 'Thin skin, big personality', big: 'Pale, silky, fragrant',
        body: 'Pinot Noir has <b>thin skins</b>: pale colour, <b>low to medium tannin</b> and <b>high acidity</b>. It needs a cool climate and is famously tricky to grow, but at its best it\'s one of the most seductive wines there is.' },
      { kind: 'compare', title: 'Young vs aged', cols: [
        { h: 'Young', items: ['Red cherry, raspberry', 'Strawberry', 'Bright and juicy'] },
        { h: 'Aged', items: ['Mushroom, forest floor', 'Earthy, savoury', 'Silky and complex'] }] },
      { kind: 'scale', title: 'A light red by nature', body: 'Compared with other reds, Pinot Noir sits at the gentle end for colour and tannin.',
        low: 'Low tannin', high: 'High tannin', marks: [{ t: 'Pinot Noir', at: 0.22 }, { t: 'Merlot', at: 0.5 }, { t: 'Cabernet', at: 0.85 }] },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'France', v: 'Burgundy, and Champagne (as a sparkling base).' },
        { k: 'Germany', v: 'Spätburgunder, increasingly excellent.' },
        { k: 'New Zealand', v: 'Central Otago and Martinborough: ripe and fruity.' },
        { k: 'USA', v: 'Oregon\'s Willamette Valley; California\'s cooler coasts.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['redburgundy', 'pinotnoir'], q: 'Decode this Burgundy label.',
        label: { style: 'burgundy', lines: [[s('Domaine Lévêque', 'producer')], [s('Gevrey-Chambertin', 'app', { big: true })], [s('Appellation Gevrey-Chambertin Contrôlée', 'aoc', { small: true })], [s('2020', 'vintage')]] },
        steps: [
          { q: 'Which grape?', options: ['Cabernet Sauvignon', 'Pinot Noir', 'Merlot', 'Syrah'], answer: 1 },
          { q: 'What colour will it be?', options: ['Pale ruby', 'Inky purple'], answer: 0 },
          { q: 'Expect…', options: ['Red cherry, earth, silky tannin', 'Blackcurrant and heavy tannin', 'Jammy blackberry and chocolate', 'Pineapple and butter'], answer: 0 },
        ], explain: 'Red Burgundy is Pinot Noir: pale, silky, red-fruited and earthy.' },
      { type: 'slider', wines: ['pinotnoir'], q: 'Place Pinot Noir on the colour scale.', low: 'Pale', high: 'Inky', answer: 0.22, tol: 0.18,
        explain: 'Thin skins mean a pale, often translucent red.' },
      { type: 'sort', wines: ['pinotnoir'], q: 'Young Pinot Noir or aged Pinot Noir?', buckets: ['Young', 'Aged'],
        items: [{ t: 'Raspberry', b: 0 }, { t: 'Mushroom', b: 1 }, { t: 'Strawberry', b: 0 }, { t: 'Forest floor', b: 1 }, { t: 'Juicy red cherry', b: 0 }, { t: 'Savoury, earthy', b: 1 }],
        explain: 'Fruit first, then the earthy, savoury notes that Burgundy lovers chase.' },
      { type: 'blind', wines: ['otagopinot'], q: 'A light red from the far south.',
        clues: [
          { stage: 'Look', text: 'Medium ruby, translucent.' },
          { stage: 'Smell', text: 'Ripe cherry, plum, a hint of wild thyme.' },
          { stage: 'Sip', text: 'Dry, fresh acidity, soft tannin, generous fruit. From mountains in New Zealand\'s South Island.' },
        ],
        options: ['Central Otago Pinot Noir', 'Barossa Shiraz', 'Napa Cabernet Sauvignon', 'Pomerol'], answer: 0,
        explain: 'Translucent, soft and fruity, from New Zealand\'s mountains: Central Otago Pinot Noir.' },
      { type: 'choice', q: 'Why is Pinot Noir so pale compared with Cabernet Sauvignon?',
        options: ['It\'s aged less', 'Its skins are thin, so there\'s less colour (and tannin) to extract', 'It\'s mixed with white wine', 'It\'s grown in hot places'], answer: 1,
        explain: 'Colour and tannin live in the skins. Thin skins give a paler, softer wine.' },
    ],
  };

  const merlot = {
    id: 'b-g-merlot', title: 'Merlot', sub: 'Plush and plummy',
    lesson: [
      { kind: 'label', title: 'Meet Merlot', body: 'Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Château Les Ormes', 'producer', { note: 'A château: the usual name for a Bordeaux estate.' })],
          [s('Pomerol', 'app', { big: true, note: 'A small Right Bank appellation, famous for wines made mostly from Merlot.' })],
          [s('Appellation Pomerol Contrôlée', 'aoc', { small: true, note: 'The legal line.' })],
          [s('2018', 'vintage', { note: 'A warm Bordeaux vintage: ripe and plush.' })],
        ] } },
      { kind: 'text', title: 'The friendly one', big: 'Plum · cherry · chocolate',
        body: 'Merlot is <b>softer and rounder</b> than Cabernet Sauvignon: medium to full body, <b>medium tannin</b>, and juicy plum and black cherry. It ripens earlier, so it can thrive where Cabernet struggles.' },
      { kind: 'compare', title: 'Climate changes the fruit', cols: [
        { h: 'Cooler', items: ['Red plum, red cherry', 'Fresher, more structured', 'Hints of herbs'] },
        { h: 'Warmer', items: ['Blackberry, fruitcake', 'Plush, jammy, chocolatey', 'Higher alcohol'] }] },
      { kind: 'layers', title: 'Bordeaux\'s two banks', rows: [
        { h: 'Right Bank', t: 'Pomerol and St-Émilion: Merlot leads, often with Cabernet Franc.' },
        { h: 'Left Bank', t: 'The Médoc: Cabernet Sauvignon leads, and Merlot softens the blend.' },
      ] },
      { kind: 'facts', title: 'Where else', rows: [
        { k: 'Italy', v: 'Tuscany, in Bordeaux-style blends.' },
        { k: 'USA', v: 'Washington and California.' },
        { k: 'Chile', v: 'Generous and fruity.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['pomerol', 'merlot'], q: 'Decode this Right Bank label.',
        label: { style: 'burgundy', lines: [[s('Château Les Ormes', 'producer')], [s('Pomerol', 'app', { big: true })], [s('Appellation Pomerol Contrôlée', 'aoc', { small: true })], [s('2018', 'vintage')]] },
        steps: [
          { q: 'Which grape leads?', options: ['Merlot', 'Pinot Noir', 'Syrah', 'Gamay'], answer: 0 },
          { q: 'Which side of Bordeaux?', options: ['Right Bank', 'Left Bank'], answer: 0 },
          { q: 'Expect…', options: ['Plum, black cherry, chocolate, plush texture', 'Pale, light and tart', 'Grassy and green', 'Very sweet'], answer: 0 },
        ], explain: 'Pomerol is Right Bank Bordeaux, where Merlot leads: plush, plummy and chocolatey.' },
      { type: 'slider', wines: ['merlot'], q: 'Place Merlot on the tannin scale.', low: 'Low', high: 'High', answer: 0.5, tol: 0.18,
        explain: 'Medium tannin: softer than Cabernet Sauvignon, firmer than Pinot Noir.' },
      { type: 'sort', wines: ['merlot'], q: 'Cooler or warmer Merlot?', buckets: ['Cooler', 'Warmer'],
        items: [{ t: 'Red plum', b: 0 }, { t: 'Fruitcake', b: 1 }, { t: 'Fresher', b: 0 }, { t: 'Jammy', b: 1 }, { t: 'Herbal hints', b: 0 }, { t: 'Higher alcohol', b: 1 }],
        explain: 'Warmth turns Merlot riper, jammier and stronger.' },
      { type: 'choice', q: 'On Bordeaux\'s Left Bank, Merlot\'s job in the blend is usually to…',
        options: ['Add sweetness', 'Soften Cabernet Sauvignon\'s firm tannin', 'Make it white', 'Add bubbles'], answer: 1,
        explain: 'Cabernet brings structure; Merlot rounds it out with fleshy fruit.' },
      { type: 'odd', q: 'Which is NOT a typical Merlot flavour?', options: ['Plum', 'Black cherry', 'Chocolate', 'Grapefruit'], answer: 3,
        explain: 'Grapefruit is a white-wine aroma (think Sauvignon Blanc).' },
    ],
  };

  const cabernet = {
    id: 'b-g-cabernet', title: 'Cabernet Sauvignon', sub: 'Blackcurrant, cedar, grip',
    lesson: [
      { kind: 'label', title: 'Meet Cabernet Sauvignon', body: 'Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Château Grand-Pré', 'producer', { note: 'The château.' })],
          [s('Pauillac', 'app', { big: true, note: 'A Left Bank village in the Médoc, home of famous Cabernet-led blends.' })],
          [s('Appellation Pauillac Contrôlée', 'aoc', { small: true, note: 'The legal line.' })],
          [s('2016', 'vintage', { note: 'Wines like this need time: often 10+ years.' })],
        ] } },
      { kind: 'text', title: 'Built to last', big: 'Blackcurrant · cedar · grip',
        body: 'Cabernet Sauvignon has <b>small, thick-skinned berries</b>: deep colour, <b>high tannin</b>, high acidity and intense blackcurrant. It ripens late, so it needs warmth, and it ages for decades.' },
      { kind: 'try', title: 'The green note', body: 'Some Cabernets smell of green pepper or mint.',
        prompt: 'What does green pepper usually tell you?',
        reveal: 'The grapes were <b>not fully ripe</b>: a cool year or site. Riper Cabernet swaps it for pure blackcurrant and black cherry.' },
      { kind: 'compare', title: 'Bordeaux vs Napa', cols: [
        { h: 'Left Bank Bordeaux', items: ['Blackcurrant, cedar, pencil', 'Firm, savoury, restrained', 'Blended with Merlot'] },
        { h: 'Napa Valley (California)', items: ['Ripe blackcurrant, mocha', 'Plush, powerful', 'Often more alcohol'] }] },
      { kind: 'facts', title: 'Where else', rows: [
        { k: 'Australia', v: 'Coonawarra (with a minty edge) and Margaret River.' },
        { k: 'Chile', v: 'Maipo: ripe and approachable.' },
        { k: 'Italy', v: 'Bolgheri\'s "Super Tuscans".' },
        { k: 'South Africa', v: 'Stellenbosch.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['leftbank', 'cabernet'], q: 'Decode this Médoc label.',
        label: { style: 'burgundy', lines: [[s('Château Grand-Pré', 'producer')], [s('Pauillac', 'app', { big: true })], [s('Appellation Pauillac Contrôlée', 'aoc', { small: true })], [s('2016', 'vintage')]] },
        steps: [
          { q: 'Which grape leads the blend?', options: ['Cabernet Sauvignon', 'Pinot Noir', 'Merlot', 'Gamay'], answer: 0 },
          { q: 'How much tannin?', options: ['High', 'Low'], answer: 0 },
          { q: 'Expect…', options: ['Blackcurrant, cedar, firm tannin', 'Strawberry and mushroom', 'Peach and honey', 'Plum and soft tannin'], answer: 0 },
        ], explain: 'Pauillac is Left Bank Bordeaux: Cabernet-led, firm and long-lived.' },
      { type: 'slider', wines: ['cabernet'], q: 'Place Cabernet Sauvignon on the tannin scale.', low: 'Low', high: 'High', answer: 0.88, tol: 0.15,
        explain: 'Thick skins, small berries: high tannin.' },
      { type: 'blind', wines: ['napacab'], q: 'A big red, poured blind.',
        clues: [
          { stage: 'Look', text: 'Deep, inky purple.' },
          { stage: 'Smell', text: 'Ripe blackcurrant, black cherry, vanilla and mocha, a hint of mint.' },
          { stage: 'Sip', text: 'Dry, high tannin, full body, 15% alcohol. From a sunny valley north of San Francisco.' },
        ],
        options: ['Napa Valley Cabernet Sauvignon', 'Red Burgundy', 'Central Otago Pinot Noir', 'Italian Pinot Grigio'], answer: 0,
        explain: 'Inky, blackcurrant and powerful, from California: Napa Cabernet.' },
      { type: 'choice', q: 'A Cabernet smells strongly of green pepper. Most likely…',
        options: ['The grapes weren\'t fully ripe', 'It\'s very old', 'It\'s faulty', 'Pepper was added'], answer: 0,
        explain: 'Green, herbaceous notes point to under-ripeness: a cool site or year.' },
      { type: 'sort', wines: ['leftbank', 'napacab'], q: 'Left Bank Bordeaux or Napa?', buckets: ['Bordeaux', 'Napa'],
        items: [{ t: 'Cedar and pencil', b: 0 }, { t: 'Mocha', b: 1 }, { t: 'Restrained', b: 0 }, { t: 'Plush and powerful', b: 1 }, { t: 'Blended with Merlot', b: 0 }, { t: 'Higher alcohol', b: 1 }],
        explain: 'Same grape: Bordeaux is cooler and more savoury, Napa sunnier and richer.' },
    ],
  };

  const syrah = {
    id: 'b-g-syrah', title: 'Syrah / Shiraz', sub: 'Pepper in the cool, spice in the heat',
    lesson: [
      { kind: 'label', title: 'Meet Shiraz', body: 'Tap the underlined words.',
        label: { style: 'generic', lines: [
          [s('Hollow Gum', 'producer', { note: 'The producer.' })],
          [s('Shiraz', 'grape', { big: true, note: 'Australia\'s name for Syrah. The name on the label often hints at the style: "Shiraz" for rich and ripe, "Syrah" for cooler and peppery.' })],
          [s('Barossa Valley', 'region', { note: 'A warm South Australian valley, famous for old-vine Shiraz.' })],
          [s('2021', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'compare', title: 'Syrah vs Shiraz', cols: [
        { h: 'Syrah (cool, e.g. Northern Rhône)', items: ['Blackberry, violet', 'Black pepper, smoked meat', 'Medium body, firm'] },
        { h: 'Shiraz (warm, e.g. Barossa)', items: ['Blackberry jam, chocolate', 'Liquorice, sweet spice', 'Full body, high alcohol'] }] },
      { kind: 'try', title: 'That peppery smell', body: 'Cool-climate Syrah can smell just like cracked black pepper.',
        prompt: 'Is that from oak?',
        reveal: 'No. It comes from the grape itself, from an aroma compound called <b>rotundone</b>, also found in black peppercorns. It\'s strongest in cooler places.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'France', v: 'Northern Rhône: Hermitage, Côte-Rôtie, Cornas, Crozes-Hermitage, St-Joseph.' },
        { k: 'Australia', v: 'Barossa and McLaren Vale (rich); cooler spots make peppery styles.' },
        { k: 'Blends', v: 'With Grenache and Mourvèdre ("GSM") in the Southern Rhône and Australia.' },
        { k: 'Also', v: 'Washington, South Africa, Chile, New Zealand.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['barossashiraz', 'syrah'], q: 'Decode this Barossa bottle.',
        label: { style: 'generic', lines: [[s('Hollow Gum', 'producer')], [s('Shiraz', 'grape', { big: true })], [s('Barossa Valley', 'region')], [s('2021', 'vintage')]] },
        steps: [
          { q: 'Shiraz is the same grape as…', options: ['Syrah', 'Merlot', 'Pinot Noir', 'Grenache'], answer: 0 },
          { q: 'Warm or cool climate?', options: ['Warm', 'Cool'], answer: 0 },
          { q: 'Expect…', options: ['Blackberry jam, chocolate, full body', 'Pale and tart', 'Black pepper and violets, light body', 'Peach and honey'], answer: 0 },
        ], explain: 'Barossa is hot: ripe, rich, full-bodied Shiraz.' },
      { type: 'sort', wines: ['nrhonesyrah', 'barossashiraz'], q: 'Northern Rhône Syrah or Barossa Shiraz?', buckets: ['Northern Rhône', 'Barossa'],
        items: [{ t: 'Black pepper', b: 0 }, { t: 'Chocolate', b: 1 }, { t: 'Violet', b: 0 }, { t: 'Jammy blackberry', b: 1 }, { t: 'Smoked meat', b: 0 }, { t: 'High alcohol', b: 1 }],
        explain: 'Cooler Rhône: pepper, violets, savoury. Hot Barossa: jam, chocolate, power.' },
      { type: 'blind', wines: ['nrhonesyrah'], q: 'A savoury red, poured blind.',
        clues: [
          { stage: 'Look', text: 'Deep purple.' },
          { stage: 'Smell', text: 'Blackberry, violets, cracked black pepper, smoked meat.' },
          { stage: 'Sip', text: 'Dry, fresh acidity, firm tannin, medium-full body. From steep granite and schist slopes above the Rhône river.' },
        ],
        options: ['Northern Rhône Syrah', 'Barossa Shiraz', 'Red Burgundy', 'Pomerol'], answer: 0,
        explain: 'Pepper, violets and smoked meat from steep Rhône slopes: Northern Rhône Syrah.' },
      { type: 'choice', q: 'Where does Syrah\'s black-pepper aroma come from?',
        options: ['New oak barrels', 'The grape itself (rotundone)', 'Added spice', 'Bottle age'], answer: 1,
        explain: 'Rotundone, the same compound as in peppercorns, strongest in cooler climates.' },
      { type: 'odd', q: 'In a classic "GSM" blend, which grape does NOT belong?', options: ['Grenache', 'Syrah', 'Mourvèdre', 'Merlot'], answer: 3,
        explain: 'GSM = Grenache, Syrah, Mourvèdre: the Southern Rhône trio.' },
    ],
  };

  Object.assign(D.grapeLessons, { pinotgris, pinotnoir, merlot, cabernet, syrah });
})();
