/* Track B · Part 2: Aromatic & classic whites.
 * Mostly grape style, which isn't regulated. Where a lesson names a rule, it was checked (2026-11-08) against:
 *  - Vouvray: arrêté of 29 Nov 2023 (Chenin Blanc, with Orbois ≤ 5% of the vineyard; still, sparkling, pétillant).
 *  - Condrieu: single document, C/2025/3459 (Viognier is the emblematic variety; dry, medium-dry and some sweet whites).
 *  - Alsace: single document, C/2025/4116 (Gewurztraminer among the fuller, "more supple" wines).
 *  - Asti / Moscato d'Asti: OJ C 61, 23.2.2021 (made with Moscato Bianco).
 *  - Rías Baixas: C/2024/7432 (Albariño).
 *  - Muscadet Sèvre et Maine: arrêté of 26 Nov 2025 (Melon; "sur lie").
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });

  const chenin = {
    id: 'b-g-chenin', title: 'Chenin Blanc', sub: 'Dry to sweet, still to sparkling', sources: ['Vouvray AOC: arrêté of 29 Nov 2023'],
    lesson: [
      { kind: 'label', title: 'Meet Chenin Blanc', body: 'The Loire rarely names the grape. Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Domaine des Perrières', 'producer', { note: 'The producer.' })],
          [s('Vouvray', 'app', { big: true, note: 'A Loire appellation near Tours, made from Chenin Blanc (with up to 5% of the rare Orbois allowed in the vineyard).' })],
          [s('Demi-Sec', 'sweet', { note: 'Medium-dry. From driest to sweetest, still Vouvray can be sec, demi-sec, moelleux or doux. It can also be sparkling.' })],
          [s('2022', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'The shape-shifter', big: 'Apple · quince · honey',
        body: 'Chenin Blanc has <b>very high acidity</b>, so it can be made in every style: <b>bone dry to lusciously sweet</b>, still or sparkling. Young: green apple, pear, quince. With age: <b>honey</b> and toast. Good ones age for decades.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Loire', v: 'Vouvray, Savennières (dry, intense), and sparkling Crémant de Loire.' },
        { k: 'South Africa', v: 'Has more Chenin than anywhere else: fresh and fruity to rich and oaked.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['chenin'], q: 'Which grape is Vouvray made from?', options: ['Chenin Blanc', 'Sauvignon Blanc', 'Chardonnay', 'Riesling'], answer: 0,
        explain: 'Vouvray is Chenin Blanc country (a little Orbois is also allowed).' },
      { type: 'order', q: 'Order these Vouvray styles from driest to sweetest.', items: ['Sec', 'Demi-Sec', 'Moelleux', 'Doux'],
        explain: 'Sec is dry; doux is the sweetest.' },
      { type: 'choice', q: 'What lets Chenin be made dry, sweet or sparkling?', options: ['Its very high acidity', 'Its thick skins', 'Its low sugar', 'Its tannin'], answer: 0,
        explain: 'Acidity keeps it fresh in any style, and lets it age.' },
      { type: 'sort', wines: ['chenin'], q: 'Young Chenin or aged Chenin?', buckets: ['Young', 'Aged'],
        items: [{ t: 'Green apple', b: 0 }, { t: 'Honey', b: 1 }, { t: 'Quince', b: 0 }, { t: 'Toast', b: 1 }],
        explain: 'Fresh fruit first; honey and toast with age.' },
      { type: 'choice', q: 'Which country grows the most Chenin Blanc?', options: ['South Africa', 'France', 'Italy', 'Chile'], answer: 0,
        explain: 'More than even the Loire.' },
    ],
  };

  const semillon = {
    id: 'b-g-semillon', title: 'Sémillon', sub: 'Waxy, honeyed, built to age',
    lesson: [
      { kind: 'text', title: 'A quiet grape that ages beautifully', big: 'Lemon · wax · honey',
        body: 'Sémillon is low in aroma when young, with lemon and a <b>waxy</b> texture. With age it turns <b>honeyed and toasty</b>. Its thin skin makes it prone to rot, including the <b>noble</b> kind.' },
      { kind: 'compare', title: 'Two famous homes', cols: [
        { h: 'Bordeaux', items: ['Blended with Sauvignon Blanc', 'Dry whites, often oaked', 'Sweet Sauternes, with noble rot'] },
        { h: 'Hunter Valley, Australia', items: ['Picked early: light, low in alcohol', 'Unoaked, sharp lemon when young', 'Toast and honey after years in bottle'] }] },
      { kind: 'try', title: 'Toast without oak?', body: 'An aged Hunter Valley Sémillon smells of toast, yet never saw a barrel…',
        prompt: 'Where did the toast come from?',
        reveal: '<b>Bottle age.</b> Years in the bottle slowly turn its lemony freshness into toast and honey.' },
    ],
    questions: [
      { type: 'choice', q: 'In Bordeaux, Sémillon is usually blended with…', options: ['Sauvignon Blanc', 'Chardonnay', 'Riesling', 'Syrah'], answer: 0,
        explain: 'For both dry whites and sweet Sauternes.' },
      { type: 'choice', wines: ['sauternes'], q: 'Why is Sémillon good for Sauternes?', options: ['Its thin skin welcomes noble rot', 'It\'s very aromatic', 'It\'s black-skinned', 'It ripens very late in winter'], answer: 0,
        explain: 'Botrytis gets in easily and concentrates the sugar.' },
      { type: 'sort', wines: ['semillon'], q: 'Young or aged Hunter Valley Sémillon?', buckets: ['Young', 'Aged'],
        items: [{ t: 'Sharp lemon', b: 0 }, { t: 'Toast', b: 1 }, { t: 'Light and lean', b: 0 }, { t: 'Honey', b: 1 }],
        explain: 'The toast comes from bottle age, not oak.' },
      { type: 'choice', q: 'Hunter Valley Sémillon is picked early, so it\'s…', options: ['Light and low in alcohol', 'Sweet', 'Deep red', 'High in tannin'], answer: 0,
        explain: 'Early picking means less sugar, so less alcohol.' },
      { type: 'odd', q: 'Which is NOT typical of Sémillon?', options: ['Waxy texture', 'Honey with age', 'Lemon', 'Strong lychee perfume'], answer: 3,
        explain: 'Sémillon is quietly aromatic. Lychee belongs to Gewurztraminer.' },
    ],
  };

  const viognier = {
    id: 'b-g-viognier', title: 'Viognier', sub: 'Apricot and blossom', sources: ['Condrieu AOC: single document, C/2025/3459'],
    lesson: [
      { kind: 'label', title: 'Meet Viognier', body: 'Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Domaine du Vernon', 'producer', { note: 'The producer.' })],
          [s('Condrieu', 'app', { big: true, note: 'A small northern Rhône appellation, all white, built on Viognier.' })],
          [s('Appellation Condrieu Contrôlée', 'aoc', { small: true, note: 'The legal line.' })],
          [s('2023', 'vintage', { note: 'Best young, while the perfume is at its height.' })],
        ] } },
      { kind: 'text', title: 'Perfume and weight', big: 'Apricot · peach · blossom',
        body: 'Viognier is <b>intensely perfumed</b>: apricot, peach and white flowers. It\'s <b>full-bodied</b>, often high in alcohol, with <b>low acidity</b>. Most is best <b>young</b>.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Condrieu', v: 'Its most famous home, in the northern Rhône.' },
        { k: 'Côte-Rôtie', v: 'Just next door, a splash is sometimes fermented with Syrah, lifting the red\'s perfume.' },
        { k: 'Also', v: 'Southern France, California, Australia.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['viognier'], q: 'Read the Condrieu label, step by step.',
        label: { style: 'burgundy', lines: [[s('Domaine du Vernon', 'producer')], [s('Condrieu', 'app', { big: true })], [s('Appellation Condrieu Contrôlée', 'aoc', { small: true })]] },
        steps: [
          { q: 'Where is it from?', options: ['Northern Rhône', 'Burgundy', 'Alsace', 'Champagne'], answer: 0 },
          { q: 'Which grape?', options: ['Viognier', 'Chardonnay', 'Riesling', 'Syrah'], answer: 0 },
          { q: 'What style?', options: ['Full, apricot, low acidity', 'Light, sharp, lemony', 'Red and tannic', 'Sparkling'], answer: 0 },
        ], explain: 'Condrieu: Viognier\'s most famous home.' },
      { type: 'slider', wines: ['viognier'], q: 'Place Viognier on the acidity scale.', low: 'Low', high: 'High', answer: 0.25, tol: 0.2,
        explain: 'Low acidity, full body: the opposite of Sauvignon Blanc.' },
      { type: 'odd', q: 'Which is NOT a typical Viognier aroma?', options: ['Apricot', 'Peach', 'White flowers', 'Green pepper'], answer: 3,
        explain: 'Green pepper is a Sauvignon Blanc (or Cabernet) note.' },
      { type: 'choice', q: 'In Côte-Rôtie, a splash of Viognier is fermented with…', options: ['Syrah', 'Pinot Noir', 'Merlot', 'Chardonnay'], answer: 0,
        explain: 'It lifts the red\'s perfume.' },
      { type: 'choice', q: 'Most Viognier is best…', options: ['Young', 'After 20 years', 'Only as a sweet wine', 'Sparkling'], answer: 0,
        explain: 'Drink it while the perfume is fresh.' },
    ],
  };

  const gewurz = {
    id: 'b-g-gewurz', title: 'Gewurztraminer', sub: 'Lychee and rose', sources: ['Alsace AOC: single document, C/2025/4116'],
    lesson: [
      { kind: 'label', title: 'Meet Gewurztraminer', body: 'Alsace names the grape. Tap the underlined words.',
        label: { style: 'germany', lines: [
          [s('Domaine Kessler-Haag', 'producer', { note: 'The producer.' })],
          [s('Gewurztraminer', 'grape', { big: true, note: 'The grape. Alsace is one of the few French regions that puts it on the label.' })],
          [s('Alsace', 'app', { note: 'France\'s north-east, beside the German border.' })],
          [s('2022', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'The most perfumed grape', big: 'Lychee · rose · ginger',
        body: 'Pink-skinned Gewurztraminer is unmistakable: <b>lychee, rose petals</b> and sweet spice like <b>ginger</b>. It\'s deep in colour, <b>full-bodied</b>, often high in alcohol, with <b>low acidity</b>, and frequently <b>off-dry</b>.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Name', v: '"Gewürz" is German for spice.' },
        { k: 'Food', v: 'A favourite with aromatic, gently spiced dishes and strong cheeses like Munster.' },
        { k: 'Also', v: 'Germany, Alto Adige, New Zealand.' },
      ] },
    ],
    questions: [
      { type: 'blind', wines: ['gewurz'], q: 'A perfumed white, poured blind.',
        clues: [
          { stage: 'Look', text: 'Deep lemon, almost gold.' },
          { stage: 'Smell', text: 'Lychee, rose petals, ginger.' },
          { stage: 'Sip', text: 'Off-dry, low acidity, full body. From France\'s north-east.' },
        ],
        options: ['Alsace Gewurztraminer', 'Sancerre', 'Chablis', 'Pinot Grigio'], answer: 0,
        explain: 'Lychee and rose: nothing else smells like it.' },
      { type: 'choice', q: 'What does "Gewürz" mean?', options: ['Spice', 'Rose', 'Sweet', 'Grape'], answer: 0,
        explain: 'German for spice.' },
      { type: 'slider', wines: ['gewurz'], q: 'Place Gewurztraminer on the acidity scale.', low: 'Low', high: 'High', answer: 0.2, tol: 0.2,
        explain: 'Low acidity, full body.' },
      { type: 'choice', q: 'What colour are Gewurztraminer\'s grapes?', options: ['Pink', 'Green', 'Black', 'Yellow'], answer: 0,
        explain: 'Pink skins, white wine, deep golden colour.' },
      { type: 'sort', wines: ['gewurz'], q: 'Typical of Gewurztraminer?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Lychee', b: 0 }, { t: 'High acidity', b: 1 }, { t: 'Rose', b: 0 }, { t: 'Light body', b: 1 }, { t: 'Often off-dry', b: 0 }],
        explain: 'Perfumed, full and soft.' },
    ],
  };

  const muscat = {
    id: 'b-g-muscat', title: 'Muscat / Moscato', sub: 'The grapiest grape', sources: ['Asti / Moscato d\'Asti DOCG: OJ C 61, 23.2.2021'],
    lesson: [
      { kind: 'text', title: 'It smells of grapes', big: 'Grape · orange blossom · peach',
        body: 'Muscat is a family of grapes and one of the oldest. It\'s the rare wine that actually <b>smells of grapes</b>, with orange blossom and peach. It\'s made in every style.' },
      { kind: 'layers', title: 'Three very different Muscats', rows: [
        { h: 'Moscato d\'Asti', t: 'Piedmont, from Moscato Bianco. Lightly sparkling, sweet and low in alcohol.' },
        { h: 'Dry Muscat', t: 'Alsace: smells sweet and grapey, but tastes dry.' },
        { h: 'Fortified Muscat', t: 'Southern France, Spain, Australia: grape spirit is added for a rich, sweet wine.' },
      ] },
      { kind: 'try', title: 'A trick of the nose', body: 'A dry Alsace Muscat smells sweet and grapey…',
        prompt: 'Is it sweet?',
        reveal: '<b>No.</b> Aroma and sweetness are different things. Your nose says "sweet"; your tongue finds it dry.' },
    ],
    questions: [
      { type: 'choice', q: 'What makes Muscat unusual?', options: ['It actually smells of grapes', 'It\'s always red', 'It has no aroma', 'It\'s only sparkling'], answer: 0,
        explain: 'Most wines smell of other fruits; Muscat smells grapey.' },
      { type: 'choice', wines: ['muscat'], q: 'Moscato d\'Asti is…', options: ['Lightly sparkling, sweet and low in alcohol', 'Dry and oaky', 'A strong red', 'Fortified'], answer: 0,
        explain: 'From Moscato Bianco in Piedmont.' },
      { type: 'sort', q: 'Which Muscat?', buckets: ['Moscato d\'Asti', 'Dry Alsace', 'Fortified'],
        items: [{ t: 'Lightly sparkling', b: 0 }, { t: 'Tastes dry', b: 1 }, { t: 'Grape spirit added', b: 2 }, { t: 'Low in alcohol', b: 0 }, { t: 'Rich and strong', b: 2 }],
        explain: 'One grape family, three very different wines.' },
      { type: 'choice', q: 'A wine smells sweet. Is it?', options: ['Not necessarily: aroma isn\'t sweetness', 'Always', 'Never', 'Only if it\'s red'], answer: 0,
        explain: 'Dry Muscat smells sweet but tastes dry.' },
      { type: 'odd', q: 'Which is NOT a Muscat aroma?', options: ['Grape', 'Orange blossom', 'Peach', 'Blackcurrant'], answer: 3,
        explain: 'Blackcurrant belongs to Cabernet.' },
    ],
  };

  const gruner = {
    id: 'b-g-gruner', title: 'Grüner Veltliner', sub: 'White pepper and green bean',
    lesson: [
      { kind: 'label', title: 'Meet Grüner', body: 'Tap the underlined words.',
        label: { style: 'germany', lines: [
          [s('Weingut Steinriegl', 'producer', { note: 'Weingut: wine estate.' })],
          [s('Grüner Veltliner', 'grape', { big: true, note: 'Austria\'s own grape, and its most planted.' })],
          [s('Kamptal', 'region', { note: 'A region of Lower Austria, along the Danube\'s tributaries.' })],
          [s('2024', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'text', title: 'Austria\'s signature', big: 'Green apple · citrus · white pepper',
        body: 'Grüner Veltliner is usually <b>dry</b> with fresh <b>acidity</b>: green apple, citrus, a hint of green bean, and its calling card, a twist of <b>white pepper</b>. Light and zippy, or richer and riper from the best sites.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Austria', v: 'Along the Danube: Wachau, Kamptal, Kremstal. Also Weinviertel, the biggest region.' },
        { k: 'Also', v: 'Slovakia, Czechia, New Zealand.' },
      ] },
    ],
    questions: [
      { type: 'choice', wines: ['gruner'], q: 'Grüner Veltliner is the signature grape of…', options: ['Austria', 'Germany', 'Italy', 'Spain'], answer: 0,
        explain: 'It\'s Austria\'s most planted grape.' },
      { type: 'choice', q: 'Grüner\'s calling-card aroma?', options: ['White pepper', 'Lychee', 'Vanilla', 'Blackcurrant'], answer: 0,
        explain: 'A peppery twist, with green apple and citrus.' },
      { type: 'sort', wines: ['gruner'], q: 'Typical of Grüner Veltliner?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Green apple', b: 0 }, { t: 'White pepper', b: 0 }, { t: 'Rose petals', b: 1 }, { t: 'Fresh acidity', b: 0 }, { t: 'Heavy tannin', b: 1 }],
        explain: 'Fresh, dry and peppery.' },
      { type: 'odd', q: 'Which is NOT an Austrian wine region?', options: ['Wachau', 'Kamptal', 'Kremstal', 'Rioja'], answer: 3,
        explain: 'Rioja is in Spain.' },
      { type: 'choice', q: 'Most Grüner Veltliner is…', options: ['Dry', 'Sweet', 'Sparkling', 'Fortified'], answer: 0,
        explain: 'Dry with fresh acidity.' },
    ],
  };

  const albarino = {
    id: 'b-g-albarino', title: 'Albariño / Alvarinho', sub: 'Saline and peachy', sources: ['Rías Baixas DO: single document, C/2024/7432'],
    lesson: [
      { kind: 'label', title: 'Meet Albariño', body: 'Tap the underlined words.',
        label: { style: 'spain', lines: [
          [s('Bodegas Mar de Fondo', 'producer', { note: 'The producer.' })],
          [s('Albariño', 'grape', { big: true, note: 'The grape. Named on the label.' })],
          [s('Rías Baixas', 'app', { note: 'Galicia, Spain\'s green, rainy Atlantic corner, cut by deep sea inlets (rías).' })],
          [s('Denominación de Origen', 'do', { small: true, note: 'DO: Spain\'s main quality tier.' })],
        ] } },
      { kind: 'text', title: 'Atlantic freshness', big: 'Peach · lemon · a salty tang',
        body: 'Albariño is dry, with <b>high acidity</b>, <b>peach and citrus</b>, white flowers, and a <b>salty</b> edge from the sea air. Usually unoaked and best young. Made for seafood.' },
      { kind: 'compare', title: 'Two sides of a river', cols: [
        { h: 'Spain: Albariño', items: ['Rías Baixas, Galicia', 'Fuller, peachier'] },
        { h: 'Portugal: Alvarinho', items: ['Vinho Verde, just over the Minho river', 'Often lighter and zesty'] }] },
    ],
    questions: [
      { type: 'chain', wines: ['albarino'], q: 'Read the Rías Baixas label, step by step.',
        label: { style: 'spain', lines: [[s('Bodegas Mar de Fondo', 'producer')], [s('Albariño', 'grape', { big: true })], [s('Rías Baixas', 'app')]] },
        steps: [
          { q: 'Which country?', options: ['Spain', 'Portugal', 'Italy', 'France'], answer: 0 },
          { q: 'What\'s the climate like?', options: ['Green, rainy, Atlantic', 'Hot and dry', 'Snowy mountains', 'Desert'], answer: 0 },
          { q: 'What style?', options: ['Dry, peachy, salty, high acidity', 'Sweet and golden', 'Oaky and buttery', 'Red and tannic'], answer: 0 },
        ], explain: 'Rías Baixas: Galicia\'s Atlantic coast.' },
      { type: 'choice', q: 'In Portugal, Albariño is called…', options: ['Alvarinho', 'Assyrtiko', 'Rolle', 'Vermentinu'], answer: 0,
        explain: 'Found in Vinho Verde, just across the river from Galicia.' },
      { type: 'sort', wines: ['albarino'], q: 'Typical of Albariño?', buckets: ['Typical', 'Not typical'],
        items: [{ t: 'Peach', b: 0 }, { t: 'Salty edge', b: 0 }, { t: 'Vanilla oak', b: 1 }, { t: 'High acidity', b: 0 }, { t: 'Sweet', b: 1 }],
        explain: 'Dry, fresh, peachy and saline.' },
      { type: 'choice', q: 'The best match for Albariño?', options: ['Seafood', 'Chocolate', 'Beef stew', 'Blue cheese'], answer: 0,
        explain: 'Acidity and a salty tang love shellfish.' },
    ],
  };

  const melon = {
    id: 'b-g-melon', title: 'Melon de Bourgogne', sub: 'The Muscadet grape', sources: ['Muscadet Sèvre et Maine AOC: arrêté of 26 Nov 2025'],
    lesson: [
      { kind: 'label', title: 'Meet Muscadet', body: 'The grape is never named. Tap the underlined words.',
        label: { style: 'burgundy', lines: [
          [s('Domaine de la Grange', 'producer', { note: 'The producer.' })],
          [s('Muscadet Sèvre et Maine', 'app', { big: true, note: 'The biggest Muscadet appellation, near Nantes where the Loire meets the Atlantic. The grape is Melon (Melon de Bourgogne).' })],
          [s('sur lie', 'lees', { note: 'Aged on its lees through the winter: rounder, bready, sometimes a faint prickle.' })],
          [s('2024', 'vintage', { note: 'Drink it young.' })],
        ] } },
      { kind: 'text', title: 'Light, crisp, salty', big: 'Lemon · green apple · sea spray',
        body: 'Melon is a <b>neutral</b> grape: light-bodied, <b>high in acidity</b>, low in alcohol, with lemon, green apple and a salty tang. Its personality comes from the <b>lees</b>.' },
      { kind: 'try', title: 'At the table', body: 'A platter of oysters…',
        prompt: 'Why is Muscadet the classic match?',
        reveal: 'Light, bracing <b>acidity</b> and a <b>salty</b> tang, like a squeeze of lemon. And it comes from the coast, just like the oysters.' },
    ],
    questions: [
      { type: 'choice', wines: ['muscadet'], q: 'Muscadet is made from…', options: ['Melon de Bourgogne', 'Muscat', 'Chardonnay', 'Sauvignon Blanc'], answer: 0,
        explain: 'Despite the name, it isn\'t Muscat.' },
      { type: 'choice', q: 'What does "sur lie" mean on the label?', options: ['Aged on its lees', 'Made from late-picked grapes', 'Aged in oak', 'Sparkling'], answer: 0,
        explain: 'Resting on the lees adds bread and roundness.' },
      { type: 'slider', wines: ['muscadet'], q: 'Place Muscadet on the body scale.', low: 'Light', high: 'Full', answer: 0.15, tol: 0.18,
        explain: 'Light and crisp.' },
      { type: 'choice', q: 'The classic Muscadet match?', options: ['Oysters', 'Steak', 'Chocolate', 'Curry'], answer: 0,
        explain: 'Acidity and salt, by the sea.' },
      { type: 'odd', q: 'Which is NOT typical of Muscadet?', options: ['High acidity', 'Light body', 'Lemon', 'Rich tropical fruit'], answer: 3,
        explain: 'Melon is neutral and lean.' },
    ],
  };

  const marsanne = {
    id: 'b-g-marsanne', title: 'Marsanne & Roussanne', sub: 'The Rhône\'s white pair',
    lesson: [
      { kind: 'text', title: 'A Rhône double act', big: 'Rich · nutty · built to age',
        body: 'Most Rhône whites blend these two. Together they make <b>full-bodied</b>, textured whites that can age into something <b>nutty and honeyed</b>.' },
      { kind: 'compare', title: 'Who brings what', cols: [
        { h: 'Marsanne', items: ['Weight and richness', 'Pear, almond, honey', 'Lower acidity'] },
        { h: 'Roussanne', items: ['Perfume and freshness', 'Herbal tea, pear, flowers', 'More acidity'] }] },
      { kind: 'facts', title: 'Where to find them', rows: [
        { k: 'Northern Rhône', v: 'White Hermitage, Crozes-Hermitage and Saint-Joseph.' },
        { k: 'Southern Rhône', v: 'In white blends, alongside Grenache Blanc and others.' },
        { k: 'Also', v: 'Australia (Victoria) and California.' },
      ] },
    ],
    questions: [
      { type: 'sort', wines: ['marsanne'], q: 'Marsanne or Roussanne?', buckets: ['Marsanne', 'Roussanne'],
        items: [{ t: 'Weight and richness', b: 0 }, { t: 'More acidity', b: 1 }, { t: 'Almond', b: 0 }, { t: 'Herbal tea', b: 1 }],
        explain: 'Marsanne brings body; Roussanne brings perfume and freshness.' },
      { type: 'choice', q: 'These two grapes are best known from…', options: ['The Rhône', 'Burgundy', 'Champagne', 'The Mosel'], answer: 0,
        explain: 'Hermitage, Crozes-Hermitage, Saint-Joseph and southern Rhône blends.' },
      { type: 'slider', wines: ['marsanne'], q: 'Place a Rhône white blend on the body scale.', low: 'Light', high: 'Full', answer: 0.8, tol: 0.2,
        explain: 'Full-bodied and textured.' },
      { type: 'choice', q: 'With age, Marsanne-based wines turn…', options: ['Nutty and honeyed', 'Fizzy', 'Red', 'Sharper and greener'], answer: 0,
        explain: 'They can age beautifully.' },
    ],
  };

  Object.assign(D.grapeLessons, { chenin, semillon, viognier, gewurz, muscat, gruner, albarino, melon, marsanne });
})();
