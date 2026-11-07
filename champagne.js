/* Track B · France · Champagne AOC: 10 lessons + a checkpoint.
 *
 * STATUS: DRAFT. Units carry `draft: true` until every rule in `toCheck` has been verified against the
 * official AOC Champagne cahier des charges (INAO) and, for sweetness terms, EU Delegated Regulation
 * 2019/33 Annex III. Drafts are locked in the app; open the app with ?drafts to preview them.
 * Once checked, set `draft: false`, fill `sources` and `checked`, and clear `toCheck`.
 */
(() => {
  const D = window.DUOVINO, C = D.C;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const CDC = 'AOC Champagne cahier des charges (INAO)';
  const EU33 = 'EU Delegated Regulation 2019/33, Annex III Part A';
  const draft = (unit, toCheck, sources = [CDC]) => ({ ...unit, draft: true, sources, checked: null, toCheck });

  Object.assign(D.concepts, {
    chLabel: { name: 'Reading a Champagne label', short: 'Ch. label', kind: 'Label', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'On a Champagne label, where are the appellation, producer, style and sweetness?', a: '"Champagne" is the appellation (no "AOC" needed). The house or grower name and the cuvée name are on the front, along with a style term (Blanc de Blancs, Rosé…) and a sweetness term (Brut, Extra Brut…).' },
    matricule: { name: 'Producer codes', short: 'NM/RM', kind: 'Label', wine: C.gold, style: 'white', shape: 'champagne',
      q: 'What do NM, RM, CM and MA mean on a Champagne label?', a: 'NM: négociant-manipulant (a house that buys grapes). RM: récoltant-manipulant (a grower using their own grapes). CM: coopérative de manipulation (a co-op). MA: marque d\'acheteur (a buyer\'s own brand).' },
    backLabel: { name: 'The back label', short: 'Back lbl', kind: 'Label', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'What useful details can a Champagne back label give?', a: 'Disgorgement date, dosage (g/L), base vintage and the blend. The disgorgement date tells you how long the wine has rested since its final cork.' },
    chPlace: { name: 'Champagne: the place', short: 'Place', kind: 'Place', wine: C.lemonGreen, style: 'white', shape: 'champagne',
      q: 'Why does Champagne\'s climate suit sparkling wine?', a: 'Northern France is cool and marginal. Grapes ripen slowly and keep high acidity: perfect for a sparkling base wine.' },
    chalk: { name: 'Chalk', short: 'Chalk', kind: 'Place', wine: C.lemonGreen, style: 'white', shape: 'champagne',
      q: 'What does Champagne\'s chalk do for the vines and the wine?', a: 'It drains well but holds water like a sponge, feeding the vines steadily and keeping the wines fresh. The cellars are dug into it, giving cool, constant ageing conditions.' },
    chSubregions: { name: 'Champagne sub-regions', short: 'Sub-reg.', kind: 'Place', wine: C.gold, style: 'white', shape: 'champagne',
      q: 'Name Champagne\'s main sub-regions and their signature grape.', a: 'Montagne de Reims: Pinot Noir. Vallée de la Marne: Meunier. Côte des Blancs: Chardonnay. Côte de Sézanne. Côte des Bar: Pinot Noir on Kimmeridgian soils.' },
    echelle: { name: 'Grand & Premier Cru villages', short: 'Cru', kind: 'Label', wine: C.gold, style: 'white', shape: 'champagne',
      q: 'What does "Grand Cru" on a Champagne label guarantee?', a: 'That the grapes come from Champagne\'s top-rated villages (Grand Cru is a village rating here, not a vineyard one). It says nothing about the producer\'s skill, the style or the sweetness.' },
    chGrapes: { name: 'The Champagne grapes', short: 'Grapes', kind: 'Grape', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'What does each of the main Champagne grapes bring?', a: 'Chardonnay: citrus, finesse, ageing. Pinot Noir: body, red fruit, structure. Meunier: fruitiness, roundness, earlier drinking.' },
    chMinor: { name: 'The minor grapes', short: 'Minor', kind: 'Grape', wine: C.lemonGreen, style: 'white', shape: 'champagne',
      q: 'Name Champagne\'s minor permitted grapes.', a: 'Arbane, Petit Meslier, Pinot Blanc and Pinot Gris, plus Voltis, a disease-resistant variety being trialled.' },
    pressing: { name: 'Cuvée & taille', short: 'Pressing', kind: 'Making', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'What are the cuvée and the taille?', a: 'The cuvée is the first, purest juice from the press. The taille comes next and is fruitier and less fine. Both have legal volume limits.' },
    tirage: { name: 'Tirage & second fermentation', short: 'Tirage', kind: 'Making', wine: C.gold, style: 'white', shape: 'champagne',
      q: 'What happens at tirage?', a: 'Yeast and sugar are added to the blended still wine, which is bottled and capped. A second fermentation in the bottle creates the bubbles.' },
    autolysis: { name: 'Lees ageing & autolysis', short: 'Autolysis', kind: 'Making', wine: C.amber, style: 'white', shape: 'champagne',
      q: 'What is autolysis, and what does it taste like?', a: 'The breakdown of dead yeast cells as the wine rests on its lees. It gives brioche, toast and biscuit aromas and a creamier mousse.' },
    disgorge: { name: 'Riddling, disgorgement, dosage', short: 'Disgorge', kind: 'Making', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'Riddling, disgorgement, dosage: what does each do?', a: 'Riddling moves the yeast sediment into the neck. Disgorgement removes it. Dosage tops the bottle up with wine and (usually) sugar to set the final sweetness.' },
    dosageLadder: { name: 'The dosage ladder', short: 'Dosage', kind: 'Label', wine: C.gold, style: 'sweet', shape: 'champagne',
      q: 'Order the sweetness terms from driest to sweetest.', a: 'Brut Nature → Extra Brut → Brut → Extra Dry → Sec → Demi-Sec → Doux. Extra Dry is sweeter than Brut.' },
    chStyles: { name: 'Champagne styles', short: 'Styles', kind: 'Style', wine: C.pink, style: 'white', shape: 'champagne',
      q: 'Blanc de Blancs vs Blanc de Noirs: which grapes, and how do they taste?', a: 'Blanc de Blancs: 100% Chardonnay, linear and citrus. Blanc de Noirs: Pinot Noir and/or Meunier, broader, with a red-fruit edge.' },
    chRose: { name: 'Rosé Champagne', short: 'Rosé', kind: 'Style', wine: C.salmon, style: 'white', shape: 'champagne',
      q: 'Two ways to make rosé Champagne?', a: 'Rosé d\'assemblage: blending a little still red wine into white. Saignée: bleeding off pink juice after a short skin contact, usually deeper and more vinous.' },
    chProducers: { name: 'Houses, growers, co-ops', short: 'Who', kind: 'Label', wine: C.gold, style: 'white', shape: 'champagne',
      q: 'How do houses and growers differ?', a: 'Houses buy grapes widely and blend for a consistent house style. Growers use their own fruit, often showing one village. Co-ops and buyer\'s own brands make up much of the rest.' },
    chAge: { name: 'How Champagne ages', short: 'Ageing', kind: 'Tasting', wine: C.amber, style: 'white', shape: 'champagne',
      q: 'How does Champagne change with age?', a: 'Young: citrus, green apple, chalky feel, high acidity, fine mousse. With lees and bottle age: brioche and toast, then nuts, honey and mushroom, with softer bubbles.' },
    coteaux: { name: 'Coteaux Champenois & Rosé des Riceys', short: 'Still', kind: 'Place', wine: C.pink, style: 'white', shape: 'burgundy',
      q: 'What are Coteaux Champenois and Rosé des Riceys?', a: 'The region\'s still wines, each its own appellation. Coteaux Champenois is still red or white. Rosé des Riceys is a still Pinot Noir rosé.' },
    sparklingFamily: { name: 'Champagne vs other sparkling', short: 'Sparkling', kind: 'Style', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'How does Champagne differ from Cava, Crémant and Prosecco?', a: 'Cava, Crémant and Franciacorta share the traditional method but have different places, grapes and rules. Prosecco is usually tank-method, with fresher fruit and little lees character.' },
  });

  const units = [
    draft({
      id: 'b-fr-ch-1', title: 'Reading a Champagne label', sub: 'Front, back and the small print',
      lesson: [
        { kind: 'label', title: 'A Champagne label', body: 'Tap each underlined word to see what it tells you.',
          label: { style: 'champagne', lines: [
            [s('Maison Delorme-Varin', 'producer', { note: 'The house (producer) name.' })],
            [s('Champagne', 'app', { big: true, note: 'The appellation. Champagne doesn\'t need to write "Appellation Contrôlée" or "AOC" on its labels.' })],
            [s('Blanc de Blancs', 'style', { note: 'A style term: made only from white grapes, which in practice means Chardonnay.' }), s('Grand Cru', 'cru', { note: 'Grapes from Champagne\'s top-rated villages.' })],
            [s('Brut', 'dosage', { note: 'The sweetness term. Brut is dry (less than 12 g/L of sugar).' }), s('2016', 'vintage', { note: 'A vintage year: all the grapes come from 2016. No year means non-vintage.' })],
            [s('NM-27845-01 · Élaboré à Reims', 'matricule', { small: true, note: 'The producer code (matricule). NM means négociant-manipulant: a house.' })],
          ] } },
        { kind: 'facts', title: 'The producer code', body: 'Find it in the small print, often on the front label rim or the back.', rows: [
          { k: 'NM', v: 'Négociant-manipulant: a house that buys grapes and makes the wine.' },
          { k: 'RM', v: 'Récoltant-manipulant: a grower making wine from their own grapes.' },
          { k: 'CM', v: 'Coopérative de manipulation: a co-operative.' },
          { k: 'RC', v: 'Récoltant-coopérateur: a grower selling co-op-made wine under their own label.' },
          { k: 'SR', v: 'Société de récoltants: a company formed by growers.' },
          { k: 'ND', v: 'Négociant-distributeur: buys finished wine and labels it.' },
          { k: 'MA', v: 'Marque d\'acheteur: a buyer\'s own brand (e.g. a supermarket label).' },
        ] },
        { kind: 'try', title: 'No year on the label', body: 'Most Champagne carries no vintage.',
          prompt: 'What does a missing year tell you?',
          reveal: 'It\'s <b>non-vintage</b>: a blend of several years, using reserve wines to keep the house style consistent. A year on the label means all the grapes come from that single harvest.' },
        { kind: 'label', title: 'Turn the bottle round', body: 'Good producers print the details that matter on the back label.',
          label: { style: 'back', lines: [
            [s('Dégorgement : mars 2023', 'disg', { note: 'Disgorgement date: when the yeast sediment was removed and the final cork went in. It tells you how long the wine has rested since.' })],
            [s('Dosage : 4 g/L', 'dos', { note: 'Dosage in grams of sugar per litre. 4 g/L is very dry (within Extra Brut).' })],
            [s('Base 2019', 'base', { note: 'The base vintage: the main year in a non-vintage blend.' })],
            [s('60% Chardonnay · 40% Pinot Noir', 'blend', { note: 'The blend, which is your best clue to the style.' })],
          ] } },
      ],
      questions: [
        { type: 'label', concept: 'chLabel', q: 'Tap the sweetness term.',
          label: { style: 'champagne', lines: [[s('Champagne Arnoult Père & Fils', 'producer')], [s('Champagne', 'app', { big: true })], [s('Rosé', 'style'), s('Extra Brut', 'dosage')], [s('RM-31207-02', 'matricule', { small: true })]] },
          answer: 'dosage', explain: 'Extra Brut is the sweetness term (very dry). Rosé is the style and RM is the producer code.' },
        { type: 'label', concept: 'matricule', q: 'Tap the part that tells you a grower made this.',
          label: { style: 'champagne', lines: [[s('Champagne Arnoult Père & Fils', 'producer')], [s('Champagne', 'app', { big: true })], [s('Premier Cru', 'cru'), s('Brut', 'dosage')], [s('RM-31207-02', 'matricule', { small: true })]] },
          answer: 'matricule', explain: 'RM = récoltant-manipulant: a grower making wine from their own grapes. The name alone doesn\'t tell you that.' },
        { type: 'sort', concept: 'matricule', q: 'Who made the wine?', buckets: ['A house', 'A grower', 'Someone else'],
          items: [{ t: 'NM', b: 0 }, { t: 'RM', b: 1 }, { t: 'CM', b: 2 }, { t: 'MA', b: 2 }, { t: 'ND', b: 2 }],
          explain: 'NM is a house and RM a grower. CM is a co-op, MA a buyer\'s own brand and ND a distributor who labels finished wine.' },
        { type: 'chain', concept: 'chLabel', q: 'Decode what\'s in the bottle.',
          label: { style: 'champagne', lines: [[s('Maison Delorme-Varin', 'producer')], [s('Champagne', 'app', { big: true })], [s('Blanc de Blancs', 'style'), s('Brut', 'dosage')], [s('NM-27845-01', 'matricule', { small: true })]] },
          steps: [
            { q: 'Which grape is in it?', options: ['Chardonnay', 'Pinot Noir', 'Meunier', 'A blend of all three'], answer: 0 },
            { q: 'How sweet is it?', options: ['Very sweet', 'Dry', 'Off-dry', 'Medium-sweet'], answer: 1 },
            { q: 'What will it taste like?', options: ['Broad, red-fruited and vinous', 'Linear, citrus and fine', 'Sweet and grapey', 'Still and tannic'], answer: 1 },
          ], explain: 'Blanc de Blancs means Chardonnay, Brut means dry, and Chardonnay gives a linear, citrus style.' },
        { type: 'choice', concept: 'backLabel', q: 'The back label says "Dégorgement : 2019". It\'s now 2026. What does that suggest?',
          options: ['The wine is faulty', 'It has had about seven years since disgorgement, so expect more developed, toasty or nutty notes', 'It was harvested in 2019', 'It is non-vintage'], answer: 1,
          explain: 'The disgorgement date isn\'t the harvest year. Time after disgorgement adds development, so this bottle will taste more mature than a freshly disgorged one.' },
      ],
    }, ['That Champagne labels may omit "Appellation d\'Origine Contrôlée"', 'The matricule (producer code) categories and their definitions', 'The Brut and Extra Brut g/L bands']),

    draft({
      id: 'b-fr-ch-2', title: 'The place', sub: 'Chalk, cold and the crus',
      lesson: [
        { kind: 'text', title: 'Cool, northern, marginal', big: 'Northern France · about 49°N',
          body: 'Champagne sits near the northern limit for ripening grapes. Grapes ripen slowly and keep <b>high acidity</b>: exactly what a sparkling base wine needs. In cold years they barely ripen at all, which is why blending across years matters so much.' },
        { kind: 'text', title: 'Chalk', body: 'Much of Champagne lies on <b>chalk</b>. It drains freely yet holds water like a sponge, feeding the vines steadily through dry spells and helping keep the wines fresh. Its pale colour reflects light and heat back onto the vines. The cellars of Reims and Épernay are dug deep into it, giving cool, steady temperatures for long ageing.' },
        { kind: 'layers', title: 'The sub-regions', rows: [
          { h: 'Montagne de Reims', t: 'Pinot Noir: structure and body.' },
          { h: 'Vallée de la Marne', t: 'Meunier: fruity and round.' },
          { h: 'Côte des Blancs', t: 'Chardonnay: finesse and citrus.' },
          { h: 'Côte de Sézanne', t: 'South of the Côte des Blancs, mostly Chardonnay.' },
          { h: 'Côte des Bar', t: 'Far to the south-east: Pinot Noir on Kimmeridgian soils, like Chablis.' },
        ] },
        { kind: 'facts', title: 'The village ladder (échelle des crus)', body: 'Champagne rates whole villages, not single vineyards.', rows: [
          { k: 'Grand Cru', v: '17 top-rated villages.' },
          { k: 'Premier Cru', v: '42 villages in the next tier.' },
          { k: 'Guarantees', v: 'The grapes come from villages of that rank.' },
          { k: 'Doesn\'t', v: 'Producer skill, style, sweetness or age. A great non-cru blend can beat a dull Grand Cru.' },
        ] },
      ],
      questions: [
        { type: 'sort', concept: 'chSubregions', q: 'Match each village to its sub-region.', buckets: ['Montagne de Reims', 'Côte des Blancs', 'Côte des Bar'],
          items: [{ t: 'Verzenay', b: 0 }, { t: 'Cramant', b: 1 }, { t: 'Les Riceys', b: 2 }, { t: 'Bouzy', b: 0 }, { t: 'Le Mesnil-sur-Oger', b: 1 }, { t: 'Avize', b: 1 }],
          explain: 'Verzenay and Bouzy are Pinot Noir villages on the Montagne. Cramant, Avize and Le Mesnil are Chardonnay villages on the Côte des Blancs. Les Riceys is in the Côte des Bar.' },
        { type: 'choice', concept: 'chSubregions', q: 'A grower in the Côte des Blancs most likely grows mainly…',
          options: ['Pinot Noir', 'Meunier', 'Chardonnay', 'Pinot Gris'], answer: 2,
          explain: '"Blancs" is the clue: it\'s white grape country, the home of Blanc de Blancs.' },
        { type: 'choice', concept: 'chalk', q: 'Why does Champagne\'s chalk matter?',
          options: ['It adds sugar to the grapes', 'It drains well yet holds water, feeding the vines steadily and keeping wines fresh', 'It makes the wine pink', 'It speeds up ripening in hot years'], answer: 1,
          explain: 'Chalk is a well-drained sponge. It also gave Champagne its cool, deep cellars.' },
        { type: 'slider', concept: 'chPlace', q: 'Where does Champagne sit on the climate scale?', low: 'Cool', high: 'Hot', answer: 0.08, tol: 0.18,
          explain: 'It\'s cool and marginal, which is why base wines are so high in acidity.' },
        { type: 'choice', concept: 'echelle', q: '"Grand Cru" on a Champagne label guarantees…',
          options: ['The best wine the house makes', 'Grapes from top-rated villages', 'At least 10 years of ageing', 'A single top vineyard'], answer: 1,
          explain: 'Champagne rates villages, not vineyards, and the term promises origin, not quality of winemaking.' },
      ],
    }, ['17 Grand Cru villages', '42 Premier Cru villages (secondary sources give 42–44)', 'That Grand Cru/Premier Cru on the label requires 100% of grapes from such villages']),

    draft({
      id: 'b-fr-ch-3', title: 'The grapes', sub: 'Chardonnay, Pinot Noir, Meunier & the minor four',
      lesson: [
        { kind: 'layers', title: 'The main three', rows: [
          { h: 'Chardonnay', t: 'Citrus, finesse, and the backbone for long ageing.' },
          { h: 'Pinot Noir', t: 'Body, red fruit, structure.' },
          { h: 'Meunier', t: 'Fruitiness and roundness. Drinks well young.' },
        ] },
        { kind: 'facts', title: 'The minor permitted grapes', body: 'Rare, but allowed:', rows: [
          { k: 'Arbane', v: 'An old, rare white variety.' },
          { k: 'Petit Meslier', v: 'An old white variety with high acidity.' },
          { k: 'Pinot Blanc', v: 'A white mutation of Pinot.' },
          { k: 'Pinot Gris', v: 'A pink-skinned mutation of Pinot.' },
          { k: 'Voltis', v: 'A new disease-resistant variety, allowed on a limited trial basis.' },
        ] },
        { kind: 'compare', title: 'Blend → taste', body: 'The blend percentages on a back label are your best clue to the style.',
          cols: [{ h: 'Chardonnay-led', items: ['Lemon, green apple', 'Linear and fine', 'Ages slowly'] },
                 { h: 'Pinot / Meunier-led', items: ['Red apple, red berries', 'Broader, rounder', 'More body'] }] },
      ],
      questions: [
        { type: 'sort', concept: 'chGrapes', q: 'Which grape brings it?', buckets: ['Chardonnay', 'Pinot Noir', 'Meunier'],
          items: [{ t: 'Citrus', b: 0 }, { t: 'Red fruit', b: 1 }, { t: 'Roundness', b: 2 }, { t: 'Finesse', b: 0 }, { t: 'Structure', b: 1 }, { t: 'Early drinking', b: 2 }],
          explain: 'Chardonnay gives finesse and citrus, Pinot Noir body and structure, and Meunier fruit and roundness.' },
        { type: 'choice', concept: 'chGrapes', q: 'The back label says "70% Meunier, 30% Pinot Noir". Expect…',
          options: ['Linear, lemony and austere', 'Fruity, round, red-fruited and approachable young', 'Sweet and grapey', 'Still and tannic'], answer: 1,
          explain: 'Meunier-led blends are fruity and round, and Pinot Noir adds red fruit and body.' },
        { type: 'odd', concept: 'chMinor', q: 'Which is NOT permitted in Champagne?', options: ['Arbane', 'Petit Meslier', 'Pinot Gris', 'Sauvignon Blanc'], answer: 3,
          explain: 'Sauvignon Blanc isn\'t allowed. Arbane, Petit Meslier and Pinot Gris are among the minor permitted grapes.' },
        { type: 'choice', concept: 'chGrapes', q: 'Which grape gives a Champagne the most potential for long ageing?',
          options: ['Meunier', 'Chardonnay', 'Arbane', 'Pinot Gris'], answer: 1,
          explain: 'Chardonnay\'s acidity and finesse let it age slowly. Meunier is usually for earlier drinking.' },
      ],
    }, ['Full list of permitted grape varieties', 'Voltis: status and limits (reported as up to 5% of an estate\'s vineyard area and 10% of a blend, on a trial)']),

    draft({
      id: 'b-fr-ch-4', title: 'How it\'s made', sub: 'The traditional method, step by step',
      lesson: [
        { kind: 'text', title: 'Harvest & pressing', body: 'Grapes are <b>picked by hand</b> as whole bunches, and picked early to keep acidity. They\'re pressed gently and quickly so black grapes don\'t colour the juice. The first, purest juice is the <b>cuvée</b>, and the next portion is the <b>taille</b>: fruitier and less fine.' },
        { kind: 'text', title: 'Base wines & blending', body: 'The juice ferments into still, high-acid <b>base wines</b>. Then comes the art: blending across <b>villages, grapes and years</b>, using <b>reserve wines</b> from older harvests. Some producers keep a <b>perpetual reserve</b>: a blend topped up each year and never fully emptied.' },
        { kind: 'text', title: 'Tirage: the second fermentation', big: 'Wine + yeast + sugar → bottle', body: 'The blend is bottled with yeast and sugar and capped. Inside the bottle a <b>second fermentation</b> makes a little more alcohol and traps the CO₂: the bubbles.' },
        { kind: 'text', title: 'Lees ageing', body: 'The wine then rests on the dead yeast (<b>lees</b>). As the yeast breaks down (<b>autolysis</b>) it gives <b>brioche, toast and biscuit</b> aromas and a finer, creamier mousse. Legal minimums: non-vintage at least <b>15 months</b> from tirage before release, vintage at least <b>3 years</b>.' },
        { kind: 'layers', title: 'The finish line', rows: [
          { h: 'Riddling', t: 'Bottles are turned and tilted until the sediment slides into the neck, by hand or by machine (gyropalette).' },
          { h: 'Disgorgement', t: 'The neck is frozen and opened, and the plug of sediment shoots out.' },
          { h: 'Dosage', t: 'The bottle is topped up with wine and (usually) sugar, which sets the sweetness, then corked.' },
        ] },
        { kind: 'compare', title: 'Producer choices', body: 'These shape the house style:',
          cols: [{ h: 'Oak', items: ['Fermenting or ageing in oak', 'Rounder, spicier, nutty'] },
                 { h: 'Malolactic or not', items: ['With MLF: softer, creamier', 'Blocked: sharper, more linear'] }] },
      ],
      questions: [
        { type: 'order', concept: 'tirage', q: 'Put the steps in order.', items: ['Hand harvest', 'Pressing', 'Base wine fermentation', 'Blending', 'Tirage', 'Lees ageing', 'Riddling', 'Disgorgement & dosage'],
          explain: 'Still wine first, then the second fermentation in bottle, time on the lees, and finally removing the sediment and setting the sweetness.' },
        { type: 'sort', concept: 'autolysis', q: 'Which step creates it?', buckets: ['Tirage', 'Lees ageing', 'Malolactic', 'Dosage'],
          items: [{ t: 'Bubbles', b: 0 }, { t: 'Brioche & toast', b: 1 }, { t: 'Softer, creamier acidity', b: 2 }, { t: 'Final sweetness', b: 3 }],
          explain: 'Each step leaves a fingerprint: tirage the bubbles, lees ageing the brioche, MLF the softness and dosage the sweetness.' },
        { type: 'choice', concept: 'pressing', q: 'The cuvée is…',
          options: ['The final blend', 'The first, purest juice from the press', 'The sugar added at dosage', 'A reserve wine'], answer: 1,
          explain: 'The cuvée is the finest juice. The taille that follows is fruitier and less fine. (Confusingly, "cuvée" also means a particular blend.)' },
        { type: 'choice', concept: 'autolysis', q: 'What is autolysis?',
          options: ['Freezing the bottle neck', 'The breakdown of dead yeast cells, giving brioche and toast notes', 'Adding sugar after disgorgement', 'Pressing the grapes'], answer: 1,
          explain: 'Autolysis is why long lees ageing tastes of bakery. It\'s the key to Champagne\'s character.' },
        { type: 'choice', concept: 'autolysis', q: 'Minimum time from tirage before a non-vintage Champagne can be sold?',
          options: ['3 months', '9 months', '15 months', '5 years'], answer: 2,
          explain: 'At least 15 months for non-vintage and 3 years for vintage. Many houses age far longer.' },
      ],
    }, ['Hand harvest of whole bunches required', 'Pressing volumes for cuvée and taille', 'Ageing minimums: non-vintage 15 months from tirage (and any minimum time on lees, often cited as 12 months); vintage 3 years', 'Earliest tirage date (1 January after harvest)']),

    draft({
      id: 'b-fr-ch-5', title: 'The dosage ladder', sub: 'From Brut Nature to Doux',
      lesson: [
        { kind: 'text', title: 'Dosage sets the sweetness', body: 'After disgorgement, a little wine and sugar (the <b>dosage</b>) is added. Champagne\'s acidity is so high that some sugar often just makes it feel balanced rather than sweet.' },
        { kind: 'facts', title: 'The ladder (grams of sugar per litre)', rows: [
          { k: 'Brut Nature', v: '0–3 g/L, with no sugar added at dosage' },
          { k: 'Extra Brut', v: '0–6 g/L' },
          { k: 'Brut', v: 'Under 12 g/L' },
          { k: 'Extra Dry', v: '12–17 g/L' },
          { k: 'Sec', v: '17–32 g/L' },
          { k: 'Demi-Sec', v: '32–50 g/L' },
          { k: 'Doux', v: 'Over 50 g/L' },
        ] },
        { kind: 'try', title: 'The trap', body: '"Extra Dry" sounds like the driest of all.',
          prompt: 'Is Extra Dry drier than Brut?',
          reveal: 'No, it\'s <b>sweeter</b>. Brut is under 12 g/L and Extra Dry is 12–17 g/L. The names come from a time when Champagne was much sweeter.' },
        { kind: 'compare', title: 'What dosage does to taste', cols: [
          { h: 'Low dosage', items: ['Acidity feels sharper', 'More chalky, mineral', 'Shows every flaw'] },
          { h: 'Higher dosage', items: ['Acidity feels softer', 'Fruit seems riper', 'Rounder, more generous'] }] },
      ],
      questions: [
        { type: 'order', concept: 'dosageLadder', q: 'Order from driest to sweetest.', items: ['Brut Nature', 'Extra Brut', 'Brut', 'Extra Dry', 'Demi-Sec'],
          explain: 'The trap is Extra Dry, which sits above Brut on the sweetness ladder.' },
        { type: 'choice', concept: 'dosageLadder', q: 'Which is sweeter?', options: ['Brut', 'Extra Dry'], answer: 1,
          explain: 'Extra Dry (12–17 g/L) is sweeter than Brut (under 12 g/L).' },
        { type: 'slider', concept: 'dosageLadder', q: 'Place Demi-Sec on the sweetness scale.', low: 'Bone dry', high: 'Very sweet', answer: 0.75, tol: 0.18,
          explain: 'Demi-Sec is 32–50 g/L: noticeably sweet, a classic match for fruit desserts.' },
        { type: 'choice', concept: 'dosageLadder', q: '"Brut Nature" tells you…',
          options: ['No sugar was added at dosage', 'It\'s organic', 'It\'s the sweetest style', 'No yeast was used'], answer: 0,
          explain: 'Zero-dosage styles add no sugar after disgorgement, so the wine shows its raw acidity and chalkiness.' },
        { type: 'choice', concept: 'dosageLadder', q: 'Why can a Brut with 9 g/L still taste dry?',
          options: ['The bubbles hide sugar completely', 'Champagne\'s high acidity balances the sugar', 'The sugar ferments away in the bottle', 'Cold serving removes sweetness'], answer: 1,
          explain: 'Acidity and sweetness balance each other, so the same grams taste drier in a high-acid wine.' },
      ],
    }, ['All seven sweetness bands, incl. "Brut Nature" requiring no added sugar'], [EU33, CDC]),

    draft({
      id: 'b-fr-ch-6', title: 'The styles', sub: 'NV, vintage, BdB, BdN, rosé, prestige',
      lesson: [
        { kind: 'facts', title: 'The style words', rows: [
          { k: 'Non-vintage Brut', v: 'The house signature: blended across years with reserve wines for a consistent style.' },
          { k: 'Vintage', v: 'Declared only in good years, from one harvest. Longer ageing, more depth, longer life.' },
          { k: 'Blanc de Blancs', v: '100% Chardonnay: linear, citrus, fine.' },
          { k: 'Blanc de Noirs', v: 'Pinot Noir and/or Meunier: broader, with a red-fruit edge.' },
          { k: 'Prestige cuvée', v: 'The house\'s top blend, usually with the longest ageing.' },
          { k: 'Single village / vineyard', v: 'Shows one place rather than a blend.' },
          { k: 'Late-disgorged', v: 'Left on its lees for extra years before disgorgement.' },
        ] },
        { kind: 'compare', title: 'Two ways to make rosé', cols: [
          { h: 'Rosé d\'assemblage', items: ['Still red wine blended into white', 'Most common', 'Fresh, consistent colour'] },
          { h: 'Saignée', items: ['Juice bled off after brief skin contact', 'Deeper colour', 'More vinous, red-fruited'] }] },
      ],
      questions: [
        { type: 'chain', concept: 'chStyles', q: 'Style term → grapes → taste.',
          label: { style: 'champagne', lines: [[s('Champagne Arnoult Père & Fils', 'producer')], [s('Champagne', 'app', { big: true })], [s('Blanc de Noirs', 'style'), s('Brut', 'dosage')], [s('RM-31207-02', 'matricule', { small: true })]] },
          steps: [
            { q: 'Which grapes can it contain?', options: ['Chardonnay only', 'Pinot Noir and/or Meunier', 'Any white grape', 'Pinot Gris only'], answer: 1 },
            { q: 'What colour is the wine?', options: ['Red', 'Pink', 'White / pale gold', 'Orange'], answer: 2 },
            { q: 'What will it taste like?', options: ['Linear, lemony, very fine', 'Broader, with a red-fruit edge', 'Sweet and floral', 'Tannic'], answer: 1 },
          ], explain: 'A white wine from black grapes: gently pressed, with body and a hint of red fruit.' },
        { type: 'choice', concept: 'chStyles', q: 'Why does non-vintage Brut use reserve wines?',
          options: ['To make it sweeter', 'To keep the house style consistent year after year', 'Because it\'s required for rosé', 'To add colour'], answer: 1,
          explain: 'In a cool, variable climate, older reserve wines smooth out difficult years.' },
        { type: 'sort', concept: 'chRose', q: 'Assemblage or saignée?', buckets: ['Assemblage', 'Saignée'],
          items: [{ t: 'Red wine blended in', b: 0 }, { t: 'Juice bled off the skins', b: 1 }, { t: 'Most common method', b: 0 }, { t: 'Deeper and more vinous', b: 1 }],
          explain: 'Most rosé Champagne is made by blending. Saignée gives a deeper, more vinous style.' },
        { type: 'odd', concept: 'chStyles', q: 'Three of these usually mean longer ageing. Which doesn\'t?', options: ['Vintage', 'Prestige cuvée', 'Late-disgorged', 'Non-vintage Brut'], answer: 3,
          explain: 'Non-vintage Brut is the house\'s everyday style, while the others usually spend longer on the lees.' },
      ],
    }, ['Rosé by blending (assemblage) permitted', 'Labelling conditions for "Blanc de Blancs", "Blanc de Noirs" and vintage (millésime)']),

    draft({
      id: 'b-fr-ch-7', title: 'Who makes it', sub: 'Houses, growers, co-ops',
      lesson: [
        { kind: 'compare', title: 'Houses vs growers', cols: [
          { h: 'Houses (NM)', items: ['Buy grapes from many growers', 'Blend for consistency', 'Range from global brands to small houses'] },
          { h: 'Growers (RM)', items: ['Use their own fruit', 'Often show one village', 'The "grower movement"'] }] },
        { kind: 'text', title: 'Co-ops and buyer\'s own brands', body: 'Many growers sell grapes to <b>co-operatives (CM)</b>, which make wine under their own brands, or bottle it for members (<b>RC</b>). A supermarket\'s own-label Champagne is a <b>buyer\'s own brand (MA)</b>: made by someone else and sold under the buyer\'s name.' },
        { kind: 'try', title: 'Same village, different story', body: 'Two bottles both say "Champagne · Avize · Grand Cru".',
          prompt: 'One reads NM, one reads RM. What\'s the difference?',
          reveal: 'The <b>NM</b> is a house that bought Avize grapes. The <b>RM</b> is a grower who farmed them. Neither is automatically better, but the code tells you whose hands the wine went through.' },
      ],
      questions: [
        { type: 'choice', concept: 'chProducers', q: 'A grower who farms their own vines and makes their own Champagne is…',
          options: ['NM', 'RM', 'MA', 'ND'], answer: 1, explain: 'Récoltant-manipulant: a grower who also makes the wine.' },
        { type: 'choice', concept: 'chProducers', q: 'Why do big houses blend from many growers and villages?',
          options: ['It\'s legally required', 'To make a consistent house style in large volumes', 'To avoid paying for grapes', 'To make every wine single-village'], answer: 1,
          explain: 'Blending across sources lets a house deliver the same style every year, at scale.' },
        { type: 'label', concept: 'matricule', q: 'Tap the part that tells you this is a supermarket\'s own brand.',
          label: { style: 'champagne', lines: [[s('Grande Cuvée Sélection', 'cuvee')], [s('Champagne', 'app', { big: true })], [s('Brut', 'dosage')], [s('MA-90012-77', 'matricule', { small: true })]] },
          answer: 'matricule', explain: 'MA = marque d\'acheteur. The wine is made by someone else and sold under the buyer\'s name.' },
        { type: 'odd', concept: 'chProducers', q: 'Which code means the bottler made the wine from grapes they grew themselves?', options: ['NM', 'MA', 'RM', 'ND'], answer: 2,
          explain: 'Only RM guarantees a grower using their own fruit.' },
      ],
    }, ['Matricule categories (source: the labelling regulations rather than the cahier des charges; to confirm)']),

    draft({
      id: 'b-fr-ch-8', title: 'How it tastes & ages', sub: 'From green apple to brioche to honey',
      lesson: [
        { kind: 'compare', title: 'Young vs aged', cols: [
          { h: 'Young', items: ['Citrus, green apple', 'Chalky, mineral feel', 'High acidity', 'Fine, lively mousse'] },
          { h: 'Aged', items: ['Nuts, honey, mushroom', 'Toast and brioche deepen', 'Softer bubbles', 'Deeper gold'] }] },
        { kind: 'layers', title: 'What shifts the taste', rows: [
          { h: 'Grape mix', t: 'More Chardonnay is finer and more citrus. More Pinot or Meunier is broader and red-fruited.' },
          { h: 'Oak', t: 'Rounder and nuttier, with a little spice.' },
          { h: 'Dosage', t: 'More sugar softens the acidity and ripens the fruit.' },
          { h: 'Time since disgorgement', t: 'Develops toast, nut and honey notes.' },
        ] },
      ],
      questions: [
        { type: 'blind', concept: 'chAge', q: 'Style and age?',
          clues: [{ stage: 'Look', text: 'Pale lemon-green, with very fine, persistent bubbles.' }, { stage: 'Smell', text: 'Lemon, green apple, chalk, a hint of brioche.' }, { stage: 'Sip', text: 'Bone-dry, racy acidity, light body.' }],
          options: ['Young Blanc de Blancs, low dosage', 'Old vintage Blanc de Noirs', 'Demi-Sec rosé', 'Ten-year-old prestige cuvée'], answer: 0,
          explain: 'Pale, citrus and chalky means young Chardonnay. Bone-dry means low dosage.' },
        { type: 'blind', concept: 'chAge', q: 'And this one: style and age?',
          clues: [{ stage: 'Look', text: 'Deep gold, with gentle bubbles.' }, { stage: 'Smell', text: 'Toasted brioche, hazelnut, honey, a hint of mushroom.' }, { stage: 'Sip', text: 'Dry, fresh acidity still, creamy and long.' }],
          options: ['Young non-vintage Brut', 'Mature vintage Champagne', 'Prosecco', 'Still Coteaux Champenois'], answer: 1,
          explain: 'Nuts, honey and mushroom are tertiary notes from age, and the deep gold and soft mousse confirm it.' },
        { type: 'sort', concept: 'chAge', q: 'Young or aged?', buckets: ['Young', 'Aged'],
          items: [{ t: 'Green apple', b: 0 }, { t: 'Hazelnut', b: 1 }, { t: 'Lively mousse', b: 0 }, { t: 'Honey', b: 1 }, { t: 'Mushroom', b: 1 }, { t: 'Chalky feel', b: 0 }],
          explain: 'Primary fruit and energy point to youth. Tertiary nuts, honey and mushroom point to age.' },
      ],
    }, []),

    draft({
      id: 'b-fr-ch-9', title: 'The region\'s other wines', sub: 'Coteaux Champenois & Rosé des Riceys',
      lesson: [
        { kind: 'facts', title: 'Still wines of Champagne', body: 'Two separate appellations from the same region:', rows: [
          { k: 'Coteaux Champenois', v: 'Still red and white wines. Villages such as Bouzy are known for still Pinot Noir.' },
          { k: 'Rosé des Riceys', v: 'A rare still rosé from Pinot Noir, made around Les Riceys in the Côte des Bar.' },
        ] },
        { kind: 'label', title: 'Spot the difference', body: 'The appellation name is the giveaway. Tap the words.',
          label: { style: 'burgundy', lines: [
            [s('Domaine Arnoult', 'producer')],
            [s('Coteaux Champenois', 'app', { big: true, note: 'A different appellation: still wine, no bubbles.' })],
            [s('Bouzy Rouge', 'style', { note: 'A still red from the Grand Cru village of Bouzy.' })],
            [s('Appellation Coteaux Champenois Protégée', 'aoc', { small: true, note: 'The legal line names the still-wine appellation, not "Champagne".' })],
          ] } },
      ],
      questions: [
        { type: 'sort', concept: 'coteaux', q: 'Sparkling or still?', buckets: ['Sparkling', 'Still'],
          items: [{ t: 'Champagne Rosé', b: 0 }, { t: 'Rosé des Riceys', b: 1 }, { t: 'Coteaux Champenois Blanc', b: 1 }, { t: 'Champagne Blanc de Noirs', b: 0 }],
          explain: 'Only wines labelled "Champagne" sparkle. Coteaux Champenois and Rosé des Riceys are still.' },
        { type: 'choice', concept: 'coteaux', q: 'Rosé des Riceys is made from…', options: ['Chardonnay', 'Meunier', 'Pinot Noir', 'Grenache'], answer: 2,
          explain: 'Rosé des Riceys is a still Pinot Noir rosé from the Côte des Bar.' },
        { type: 'label', concept: 'coteaux', q: 'Tap the word that tells you this wine is NOT sparkling Champagne.',
          label: { style: 'burgundy', lines: [[s('Domaine Arnoult', 'producer')], [s('Coteaux Champenois', 'app', { big: true })], [s('Blanc', 'colour')], [s('2022', 'vintage')]] },
          answer: 'app', explain: 'The appellation name says it: Coteaux Champenois is the still-wine appellation.' },
      ],
    }, ['Coteaux Champenois and Rosé des Riceys: separate AOCs, permitted colours and grapes (their own cahiers des charges)'], ['AOC Coteaux Champenois cahier des charges', 'AOC Rosé des Riceys cahier des charges']),

    draft({
      id: 'b-fr-ch-10', title: 'Champagne vs other sparkling', sub: 'Same method, different wine',
      lesson: [
        { kind: 'layers', title: 'The traditional-method family', rows: [
          { h: 'Champagne', t: 'Chardonnay, Pinot Noir, Meunier. Cool, chalky, long lees ageing.' },
          { h: 'Crémant', t: 'French traditional method outside Champagne (Loire, Alsace, Burgundy…). Local grapes and rules.' },
          { h: 'Cava', t: 'Spain. Mostly local grapes such as Macabeo, Xarel·lo and Parellada.' },
          { h: 'Franciacorta, Tasmania, England', t: 'Often Champagne grapes, in different places with different rules.' },
        ] },
        { kind: 'compare', title: 'Bottle vs tank', cols: [
          { h: 'Traditional (bottle)', items: ['Second fermentation in the bottle', 'Lees character: brioche, toast', 'Fine, persistent mousse'] },
          { h: 'Tank (e.g. Prosecco)', items: ['Second fermentation in a sealed tank', 'Fresh pear, apple, blossom', 'Little or no lees character'] }] },
      ],
      questions: [
        { type: 'sort', concept: 'sparklingFamily', q: 'Bottle or tank?', buckets: ['Traditional method', 'Usually tank method'],
          items: [{ t: 'Champagne', b: 0 }, { t: 'Cava', b: 0 }, { t: 'Prosecco', b: 1 }, { t: 'Crémant de Loire', b: 0 }, { t: 'Franciacorta', b: 0 }],
          explain: 'Most famous sparkling wines use the traditional method. Prosecco is the big tank-method exception.' },
        { type: 'blind', concept: 'sparklingFamily', q: 'Which sparkling wine?',
          clues: [{ stage: 'Look', text: 'Pale straw, with big, frothy bubbles.' }, { stage: 'Smell', text: 'Ripe pear, green apple, white blossom. No bready notes.' }, { stage: 'Sip', text: 'Light, off-dry, simple and fresh.' }],
          options: ['Vintage Champagne', 'Prosecco', 'Crémant d\'Alsace', 'Blanc de Noirs'], answer: 1,
          explain: 'Pure fruit with no lees character means the tank method, and that means Prosecco.' },
        { type: 'choice', concept: 'sparklingFamily', q: 'Crémant and Champagne share the same method. What mainly differs?',
          options: ['Nothing, they\'re identical', 'The place, permitted grapes and rules', 'Crémant is always sweet', 'Crémant is made in tanks'], answer: 1,
          explain: 'Same method, different region, grapes and rules, and usually less time on the lees.' },
      ],
    }, ['That Crémant, Cava and Franciacorta must use the traditional method (their own regulations)'], ['Crémant, Cava and Franciacorta regulations']),

    draft({
      id: 'b-fr-ch-check', title: 'Checkpoint: Champagne', sub: 'Labels and tasting notes from lessons 1–9',
      lesson: [],
      questions: [
        { type: 'label', concept: 'chLabel', q: 'Tap the term that tells you this is made only from white grapes.',
          label: { style: 'champagne', lines: [[s('Maison Delorme-Varin', 'producer')], [s('Champagne', 'app', { big: true })], [s('Blanc de Blancs', 'style'), s('Extra Brut', 'dosage')], [s('2015', 'vintage')], [s('NM-27845-01', 'matricule', { small: true })]] },
          answer: 'style', explain: 'Blanc de Blancs means white grapes only, in practice Chardonnay.' },
        { type: 'choice', concept: 'dosageLadder', q: 'Which is the driest?', options: ['Extra Dry', 'Brut', 'Extra Brut', 'Sec'], answer: 2,
          explain: 'Extra Brut is 0–6 g/L. Extra Dry and Sec are sweeter than Brut.' },
        { type: 'chain', concept: 'chStyles', q: 'Decode the bottle.',
          label: { style: 'champagne', lines: [[s('Champagne Arnoult Père & Fils', 'producer')], [s('Champagne', 'app', { big: true })], [s('Verzenay Grand Cru', 'cru'), s('Brut', 'dosage')], [s('RM-31207-02', 'matricule', { small: true })]] },
          steps: [
            { q: 'Who made it?', options: ['A big house', 'A grower, from their own grapes', 'A co-op', 'A supermarket'], answer: 1 },
            { q: 'Which sub-region and likely main grape?', options: ['Côte des Blancs · Chardonnay', 'Montagne de Reims · Pinot Noir', 'Vallée de la Marne · Meunier', 'Côte des Bar · Chardonnay'], answer: 1 },
            { q: 'Expect…', options: ['Linear and citrus', 'Structured, with red fruit', 'Sweet and simple', 'Still and light'], answer: 1 },
          ], explain: 'RM is a grower, Verzenay is a Montagne de Reims Pinot Noir village, so expect structure and red fruit.' },
        { type: 'blind', concept: 'chAge', q: 'Which wine?',
          clues: [{ stage: 'Look', text: 'Deep gold, with soft bubbles.' }, { stage: 'Smell', text: 'Brioche, roasted nuts, honey.' }, { stage: 'Sip', text: 'Dry, still fresh, long.' }],
          options: ['Prosecco', 'Mature vintage Champagne', 'Young non-vintage Brut', 'Rosé des Riceys'], answer: 1,
          explain: 'Toast, nuts and honey with soft bubbles means long lees and bottle age.' },
        { type: 'order', concept: 'disgorge', q: 'Order the final steps.', items: ['Lees ageing', 'Riddling', 'Disgorgement', 'Dosage'],
          explain: 'Age on the lees, gather the sediment, remove it, then set the sweetness.' },
        { type: 'odd', concept: 'coteaux', q: 'Which one is a still wine?', options: ['Champagne Rosé', 'Blanc de Noirs', 'Rosé des Riceys', 'Prestige cuvée'], answer: 2,
          explain: 'Rosé des Riceys is a still Pinot Noir rosé with its own appellation.' },
      ],
    }, ['All figures from lessons 1–9']),
  ];

  D.champagneUnits = units;
})();
