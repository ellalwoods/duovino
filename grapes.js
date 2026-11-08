/* Track B · Part 2: Meet the grapes. Each lesson starts from a label, then works out to style and taste.
 * Grape lessons describe typical styles (no legal rules). Any appellation rule stated was checked against its
 * official text (see SYLLABUS.md): e.g. Chablis = Chardonnay only; white Sancerre = Sauvignon Blanc only.
 */
(() => {
  const D = window.DUOVINO, C = D.C;
  const s = (t, k, o = {}) => ({ t, k, ...o });

  const chardonnay = {
    id: 'b-g-chardonnay', title: 'Chardonnay', sub: 'The blank canvas',
    lesson: [
      { kind: 'label', title: 'Meet Chardonnay', body: 'New World labels name the grape. Tap the underlined words.',
        label: { style: 'generic', lines: [
          [s('Kestrel Ridge', 'producer', { note: 'The producer.' })],
          [s('Chardonnay', 'grape', { big: true, note: 'The grape, front and centre. Outside Europe, labels usually lead with the grape.' })],
          [s('Adelaide Hills', 'region', { note: 'The region: a cool, high part of South Australia, good for fresh Chardonnay.' })],
          [s('2023', 'vintage', { note: 'The vintage.' })],
        ] } },
      { kind: 'try', title: 'The Old World hides it', body: 'French labels rarely say "Chardonnay".',
        prompt: 'Which famous French wines are Chardonnay?',
        reveal: '<b>Chablis</b>, <b>Pouilly-Fuissé</b> and most <b>white Burgundy</b>, plus nearly every <b>Blanc de Blancs Champagne</b>. You learn the place, and the place tells you the grape.' },
      { kind: 'text', title: 'A blank canvas', big: 'Climate + winemaking = style',
        body: 'Chardonnay has a fairly neutral flavour of its own. That makes it a mirror: <b>climate</b> sets the fruit, and the <b>winemaker</b> adds the rest.' },
      { kind: 'scale', title: 'Climate sets the fruit', body: 'The warmer the place, the riper and more tropical the fruit, and the fuller the body.',
        low: 'Cool', high: 'Hot', marks: [{ t: 'Chablis · apple, lemon', at: 0.1 }, { t: 'Mâcon · peach, melon', at: 0.45 }, { t: 'Napa · pineapple', at: 0.88 }] },
      { kind: 'layers', title: 'The winemaker\'s choices', rows: [
        { h: 'Stainless steel', t: 'Pure, crisp fruit. Nothing added.' },
        { h: 'Oak barrels', t: 'Vanilla, toast, smoke and a rounder texture.' },
        { h: 'Malolactic conversion', t: 'Buttery notes and softer acidity.' },
        { h: 'Lees ageing', t: 'Bready, nutty notes and a creamier texture.' },
      ] },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'France', v: 'Burgundy (Chablis, the Côte de Beaune, the Mâconnais) and Champagne.' },
        { k: 'USA', v: 'California (Napa, Sonoma) and Oregon.' },
        { k: 'Australia', v: 'Cooler spots like the Adelaide Hills and Margaret River.' },
        { k: 'Also', v: 'New Zealand, Chile (Casablanca), South Africa, Italy.' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['chablis', 'chardonnay'], q: 'Read this Chablis label from the outside in.',
        label: { style: 'burgundy', lines: [[s('Domaine Pierre-Blanche', 'producer')], [s('Chablis', 'app', { big: true })], [s('Appellation Chablis Contrôlée', 'aoc', { small: true })], [s('2022', 'vintage')]] },
        steps: [
          { q: 'Which grape is in the bottle?', options: ['Sauvignon Blanc', 'Chardonnay', 'Riesling', 'Chenin Blanc'], answer: 1 },
          { q: 'What kind of climate?', options: ['Cool', 'Hot'], answer: 0 },
          { q: 'So what will it taste like?', options: ['Pineapple, vanilla and butter', 'Green apple, lemon and wet stone', 'Passion fruit and jalapeño', 'Blackcurrant and cedar'], answer: 1 },
        ], explain: 'Chablis must be Chardonnay. It\'s cool, northern Burgundy, so expect crisp apple, lemon and a stony feel.' },
      { type: 'sort', wines: ['chardonnay'], q: 'Cool-climate or warm-climate Chardonnay?', buckets: ['Cool', 'Warm'],
        items: [{ t: 'Green apple', b: 0 }, { t: 'Pineapple', b: 1 }, { t: 'Lemon', b: 0 }, { t: 'Mango', b: 1 }, { t: 'High acidity', b: 0 }, { t: 'High alcohol', b: 1 }],
        explain: 'Cool climates keep acidity and tart fruit. Heat brings tropical fruit, more sugar and so more alcohol.' },
      { type: 'sort', q: 'Which winemaking choice creates it?', buckets: ['Oak', 'Malolactic', 'Lees'],
        items: [{ t: 'Vanilla', b: 0 }, { t: 'Butter', b: 1 }, { t: 'Bread & biscuit', b: 2 }, { t: 'Toast', b: 0 }, { t: 'Softer acidity', b: 1 }],
        explain: 'Oak gives vanilla and toast, malolactic gives butter and softer acidity, and lees give bready notes.' },
      { type: 'blind', wines: ['napachard'], q: 'A Chardonnay, poured blind. Where is it from?',
        clues: [
          { stage: 'Look', text: 'Medium gold.' },
          { stage: 'Smell', text: 'Ripe pineapple, peach, vanilla and melted butter.' },
          { stage: 'Sip', text: 'Dry, medium acidity, full body, 14.5% alcohol. From a sunny Californian valley.' },
        ],
        options: ['Napa Valley', 'Chablis', 'Champagne', 'Adelaide Hills'], answer: 0,
        explain: 'Tropical fruit and high alcohol mean heat; vanilla and butter mean oak and malolactic. Classic Napa.' },
      { type: 'odd', q: 'Which of these is NOT made from Chardonnay?', options: ['Chablis', 'Pouilly-Fuissé', 'Sancerre', 'Champagne Blanc de Blancs'], answer: 2,
        explain: 'White Sancerre is Sauvignon Blanc. The other three are Chardonnay country.' },
      { type: 'slider', wines: ['chablis'], q: 'Place Chablis on the body scale.', low: 'Light', high: 'Full', answer: 0.25, tol: 0.2,
        explain: 'Chablis is light to medium-bodied: cool climate, moderate alcohol, little new oak.' },
    ],
  };

  const sauvignon = {
    id: 'b-g-sauvignon', title: 'Sauvignon Blanc', sub: 'Green, zesty, unmistakable',
    lesson: [
      { kind: 'label', title: 'Meet Sauvignon Blanc', body: 'Tap the underlined words.',
        label: { style: 'generic', lines: [
          [s('Tuatara Bay', 'producer', { note: 'The producer.' })],
          [s('Sauvignon Blanc', 'grape', { big: true, note: 'The grape. One of the easiest to recognise blind.' })],
          [s('Marlborough', 'region', { note: 'New Zealand\'s most famous region, on the north-east tip of the South Island. Its Sauvignon Blanc put the country on the map.' })],
          [s('New Zealand · 2024', 'country', { note: 'Country and vintage. Drink it young.' })],
        ] } },
      { kind: 'text', title: 'Loud and proud', big: 'Gooseberry · grass · green pepper',
        body: 'An aromatic grape with <b>high acidity</b>. It\'s usually made in stainless steel, without oak, and drunk young to keep its zing.' },
      { kind: 'compare', title: 'Two homes, two moods', cols: [
        { h: 'Loire (Sancerre)', items: ['Gooseberry, citrus', 'Struck flint, chalk', 'Restrained, elegant'] },
        { h: 'Marlborough', items: ['Passion fruit, grapefruit', 'Cut grass, jalapeño', 'Bursting, intense'] }] },
      { kind: 'try', title: 'Why green pepper?', body: 'Sauvignon Blanc can smell remarkably like a green pepper.',
        prompt: 'What causes it?',
        reveal: 'Aroma compounds called <b>methoxypyrazines</b>, the same family found in green peppers. Cooler climates and shaded grapes keep more of them.' },
      { kind: 'facts', title: 'Where else to find it', rows: [
        { k: 'Bordeaux', v: 'Often blended with Sémillon; some, like Pessac-Léognan, are oaked and age well.' },
        { k: 'Chile', v: 'Cool coastal valleys such as Casablanca and Leyda.' },
        { k: 'South Africa', v: 'Fresh, often with a smoky edge.' },
        { k: 'Austria', v: 'Styria makes taut, mineral versions.' },
        { k: 'California', v: 'Sometimes oaked and labelled "Fumé Blanc".' },
      ] },
    ],
    questions: [
      { type: 'chain', wines: ['marlboroughsb', 'sauvignonblanc'], q: 'Decode this Marlborough bottle.',
        label: { style: 'generic', lines: [[s('Tuatara Bay', 'producer')], [s('Sauvignon Blanc', 'grape', { big: true })], [s('Marlborough', 'region')], [s('New Zealand · 2024', 'country')]] },
        steps: [
          { q: 'Which aromas will jump out?', options: ['Passion fruit, gooseberry, grapefruit', 'Vanilla, toast, butter', 'Blackcurrant, cedar', 'Honey, apricot'], answer: 0 },
          { q: 'Oak or no oak?', options: ['Usually no oak', 'Heavily oaked'], answer: 0 },
          { q: 'When to drink it?', options: ['Within a year or two', 'After 20 years'], answer: 0 },
        ], explain: 'Marlborough Sauvignon is all about vivid, fresh fruit, so drink it young.' },
      { type: 'sort', wines: ['sancerre', 'marlboroughsb'], q: 'Sancerre or Marlborough?', buckets: ['Sancerre', 'Marlborough'],
        items: [{ t: 'Struck flint', b: 0 }, { t: 'Passion fruit', b: 1 }, { t: 'Restrained', b: 0 }, { t: 'Bursting with fruit', b: 1 }, { t: 'Chalky', b: 0 }, { t: 'Jalapeño', b: 1 }],
        explain: 'Same grape, different moods: the Loire is cooler and chalkier; Marlborough is sunnier and louder.' },
      { type: 'slider', wines: ['sauvignonblanc'], q: 'Place Sauvignon Blanc on the acidity scale.', low: 'Low', high: 'High', answer: 0.9, tol: 0.18,
        explain: 'High acidity is a Sauvignon Blanc signature, which is why it\'s so refreshing.' },
      { type: 'blind', wines: ['sancerre'], q: 'Which wine is this?',
        clues: [
          { stage: 'Look', text: 'Pale lemon with a green tinge.' },
          { stage: 'Smell', text: 'Gooseberry, citrus, a whiff of struck flint.' },
          { stage: 'Sip', text: 'Bone-dry, high acidity, light body, no oak. From chalky hills in the Upper Loire.' },
        ],
        options: ['Sancerre', 'Marlborough Sauvignon Blanc', 'Chablis', 'Mosel Riesling'], answer: 0,
        explain: 'Gooseberry and flint with restraint: Loire Sauvignon Blanc, and white Sancerre must be Sauvignon Blanc.' },
      { type: 'choice', q: 'Which grape is Sauvignon Blanc\'s classic blending partner in Bordeaux?',
        options: ['Chardonnay', 'Sémillon', 'Riesling', 'Viognier'], answer: 1,
        explain: 'Sémillon adds body and waxy texture to Sauvignon\'s zip, in dry whites and in sweet Sauternes.' },
      { type: 'odd', q: 'Which is NOT a typical Sauvignon Blanc aroma?', options: ['Gooseberry', 'Cut grass', 'Green pepper', 'Vanilla'], answer: 3,
        explain: 'Vanilla comes from new oak, and most Sauvignon Blanc never sees it.' },
    ],
  };

  const riesling = {
    id: 'b-g-riesling', title: 'Riesling', sub: 'Bone dry to lusciously sweet',
    lesson: [
      { kind: 'label', title: 'Meet Riesling', body: 'A classic German label. Tap the underlined words.',
        label: { style: 'germany', lines: [
          [s('Weingut Hellner', 'producer', { note: 'Weingut means wine estate.' })],
          [s('Graacher Himmelreich', 'site', { big: true, note: 'Village + vineyard: the Himmelreich vineyard in the village of Graach.' })],
          [s('Riesling Kabinett', 'grape', { note: 'The grape (Riesling) and the Prädikat (Kabinett, the lightest ripeness level).' })],
          [s('Mosel · 2022', 'region', { note: 'The region and vintage. The Mosel is famous for light, delicate Riesling, often low in alcohol (around 8–10%).' })],
        ] } },
      { kind: 'text', title: 'A grape built for the cold', big: 'Searing acidity, pure fruit',
        body: 'Riesling ripens late and keeps <b>very high acidity</b>. It\'s intensely aromatic, and winemakers rarely let oak flavour get in the way.' },
      { kind: 'scale', title: 'Every level of sweetness', body: 'The same grape makes bone-dry and lusciously sweet wines. Its acidity keeps even the sweet ones fresh.',
        low: 'Bone dry', high: 'Very sweet', marks: [{ t: 'Clare Valley', at: 0.05 }, { t: 'Alsace', at: 0.2 }, { t: 'Mosel Kabinett', at: 0.45 }, { t: 'Beerenauslese', at: 0.92 }] },
      { kind: 'compare', title: 'Young vs aged', cols: [
        { h: 'Young', items: ['Lime, green apple', 'White flowers, peach', 'Zesty and bright'] },
        { h: 'Aged', items: ['Honey, toast', '"Petrol": a prized note', 'Richer, deeper colour'] }] },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Germany', v: 'Mosel, Rheingau, Pfalz: from feather-light to powerful.' },
        { k: 'France', v: 'Alsace: usually dry and fuller-bodied.' },
        { k: 'Austria', v: 'Wachau, Kamptal: dry, intense, mineral.' },
        { k: 'Australia', v: 'Clare and Eden Valleys: bone dry, lime-scented.' },
        { k: 'USA', v: 'New York\'s Finger Lakes and Washington.' },
      ] },
    ],
    questions: [
      { type: 'label', wines: ['riesling', 'moselriesling'], q: 'Tap the words that name the grape.',
        label: { style: 'germany', lines: [[s('Weingut Hellner', 'producer')], [s('Graacher Himmelreich', 'site', { big: true })], [s('Riesling Kabinett', 'grape')], [s('Mosel · 2022', 'region')]] },
        answer: 'grape', explain: 'Riesling is the grape, Kabinett the ripeness level. Graacher Himmelreich is the place.' },
      { type: 'slider', wines: ['moselriesling'], q: 'Place a Mosel Riesling Kabinett on the alcohol scale.', low: '7%', high: '15%', answer: 0.1, tol: 0.18,
        explain: 'Mosel Kabinett is often only 7.5–10% alcohol: light, delicate, sometimes with a touch of sweetness.' },
      { type: 'sort', wines: ['riesling'], q: 'Young Riesling or aged Riesling?', buckets: ['Young', 'Aged'],
        items: [{ t: 'Lime', b: 0 }, { t: 'Petrol', b: 1 }, { t: 'White flowers', b: 0 }, { t: 'Honey', b: 1 }, { t: 'Green apple', b: 0 }, { t: 'Toast', b: 1 }],
        explain: 'Fresh citrus and flowers when young; honey, toast and petrol with age.' },
      { type: 'blind', wines: ['clareriesling'], q: 'A dry white, poured blind.',
        clues: [
          { stage: 'Look', text: 'Pale lemon-green.' },
          { stage: 'Smell', text: 'Lime, lime zest, a hint of toast.' },
          { stage: 'Sip', text: 'Bone dry, high acidity, medium body. From a warm valley in South Australia.' },
        ],
        options: ['Clare Valley Riesling', 'Mosel Riesling Kabinett', 'Sancerre', 'Chablis'], answer: 0,
        explain: 'Lime above all, bone dry, from South Australia: Clare Valley Riesling.' },
      { type: 'choice', q: 'Why can sweet Riesling age for decades and still taste fresh?',
        options: ['Its very high acidity', 'Its tannin', 'Its high alcohol', 'Oak ageing'], answer: 0,
        explain: 'Acidity is a preservative and balances the sugar. That\'s Riesling\'s secret.' },
      { type: 'odd', q: 'Which region is NOT famous for Riesling?', options: ['Mosel', 'Clare Valley', 'Alsace', 'Rioja'], answer: 3,
        explain: 'Rioja is Tempranillo country. The others are Riesling heartlands.' },
    ],
  };

  D.grapeLessons = { chardonnay, sauvignon, riesling };
})();
