/* Duovino content: seasons, soil strata, concepts (cellar bottles) and flights.
 *
 * Rule check of the Tasting specials (2026-11-08), against official texts:
 *  - Sancerre (cahier des charges, décret 2011-1021): white = Sauvignon Blanc only; red/rosé = Pinot Noir. OK.
 *  - Vouvray (arrêté 29 Nov 2023): Chenin Blanc + Orbois (≤5% of vineyard); still, sparkling, pétillant. FIXED (was "100% Chenin").
 *    Sweetness terms sec/demi-sec/moelleux/doux: EU Reg. 2019/33 Annex III Part B.
 *  - Muscadet Sèvre et Maine (arrêté 26 Nov 2025): Melon only; "sur lie" is a regulated mention. OK.
 *  - Chablis (arrêté 11 Dec 2023) and Chablis Grand Cru (arrêté 24 Oct 2024): Chardonnay only; Premier Cru mention;
 *    Grand Cru = 7 named climats. FIXED wording ("seven named climats").
 *  - Eiswein (German Weingesetz § 20(4) no. 5): grapes frozen at picking and pressing; no statutory temperature. FIXED.
 *  - Barolo 38 / Riserva 62 months: NOT YET CHECKED. The full disciplinare wasn't reachable (the EU register only
 *    holds temporary amendments; the Italian ministry lists documents dynamically). Check before relying on it.
 */
window.DUOVINO = (() => {
  // WSET-style colour spectrum, used to tint the UI and fill bottles
  const C = {
    lemonGreen: '#e4e3a2', lemon: '#efdc7c', gold: '#ddb04a', amber: '#c4842c',
    pink: '#efa3a4', salmon: '#ee9f80', purple: '#4f1637', ruby: '#8b1a2b',
    garnet: '#7b2a2a', tawny: '#a5602d',
  };

  // Vineyard calendar, indexed by Northern-Hemisphere month (0 = January).
  const seasons = [
    { stage: 'dormant', name: 'Deep winter', note: 'The vines are asleep. Out in the frost, growers prune cane by cane.' },
    { stage: 'dormant', name: 'Pruning season', note: 'Every cut now decides how many bunches the vine carries this year.' },
    { stage: 'dormant', name: 'The vines weep', note: 'Sap rises and drips from pruning cuts. Spring is coming.' },
    { stage: 'bud', name: 'Budburst', note: 'Tiny woolly buds crack open. One late frost could ruin them.' },
    { stage: 'leaf', name: 'Shoots & leaves', note: 'Shoots race along the wires. Growers thin and tie them.' },
    { stage: 'flower', name: 'Flowering', note: 'Tiny, nearly invisible flowers. Fair weather now means a good fruit set.' },
    { stage: 'fruit', name: 'Fruit set', note: 'Hard green berries swell in the summer sun.' },
    { stage: 'veraison', name: 'Véraison', note: 'Berries soften and change colour. The ripening sprint begins.' },
    { stage: 'harvest', name: 'Harvest', note: 'Sugar up, acid down. Pick at the perfect moment.' },
    { stage: 'harvest', name: 'Late harvest', note: 'The last bunches come in. Cellars bubble with fermentation.' },
    { stage: 'fall', name: 'Leaf fall', note: 'The leaves turn gold and red, then drop. The vine stores energy for winter.' },
    { stage: 'dormant', name: 'First pruning', note: 'Dormancy sets in. Icewine grapes hang frozen, waiting for −8°C.' },
  ];

  // Root depth thresholds (1 point = 10 cm of root).
  const strata = [
    { name: 'Topsoil', at: 0, colour: '#6b4a34', fact: 'Rich topsoil means easy water and food, so vines get lazy. The magic starts deeper.' },
    { name: 'Clay', at: 12, colour: '#8a5a3c', fact: 'Clay holds water and stays cool. Think of the plush Merlots of Pomerol.' },
    { name: 'Limestone', at: 30, colour: '#c9b994', fact: 'Limestone drains well but holds just enough water, which keeps acidity bright. It is the heart of Burgundy and Chablis.' },
    { name: 'Schist', at: 55, colour: '#5d5a5e', fact: 'Schist splits vertically so roots can dive deep. Think of the Douro\'s Port terraces and Priorat\'s llicorella.' },
    { name: 'Chalk', at: 90, colour: '#ece6d6', fact: 'Chalk is a sponge that also drains. Champagne\'s cellars are carved into it.' },
    { name: 'Granite', at: 140, colour: '#9a8c86', fact: 'Granite warms up and drains fast. It is home to the Beaujolais crus and northern Rhône Syrah.' },
  ];

  // Each concept is a bottle in the cellar. shape: bordeaux | burgundy | flute | half | champagne
  const concepts = {
    // Winter
    dormancy: { name: 'Dormancy', short: 'Dormancy', kind: 'Vineyard', wine: C.amber, style: 'white', shape: 'burgundy',
      q: 'What does a vine do after harvest as winter arrives?', a: 'It drops its leaves and goes dormant, storing energy (carbohydrates) in its trunk and roots for spring.' },
    pruning: { name: 'Winter pruning', short: 'Pruning', kind: 'Vineyard', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'Why does winter pruning matter so much?', a: 'It sets the number of buds, and so the number of bunches. That shapes both yield and quality for the year.' },
    canespur: { name: 'Cane vs spur', short: 'Cane/Spur', kind: 'Vineyard', wine: C.garnet, style: 'red', shape: 'burgundy',
      q: 'Cane pruning vs spur pruning: what\'s kept?', a: 'Cane (e.g. Guyot): one or two long canes are kept. Spur (cordon): many short 2–3-bud spurs along a permanent arm.' },
    cycle: { name: 'The growing year', short: 'Vine year', kind: 'Vineyard', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'Name the vine\'s growing stages in order.', a: 'Budburst → flowering → fruit set → véraison → harvest (then leaf fall and dormancy).' },
    icewine: { name: 'Icewine', short: 'Icewine', kind: 'Style', wine: C.gold, style: 'sweet', shape: 'half',
      q: 'How is Icewine (Eiswein) made, and how does it taste?', a: 'The grapes must be frozen when they are picked and when they are pressed (German law), so the water stays behind as ice. In practice that means about −7 °C or colder. The wine is very sweet, with high acidity, pure fruit and low alcohol.' },
    hemispheres: { name: 'Two hemispheres', short: 'Hemis.', kind: 'Vineyard', wine: C.lemon, style: 'white', shape: 'flute',
      q: 'In November, what\'s happening in Southern Hemisphere vineyards?', a: 'It\'s late spring there: shoots are growing and flowering is close. Their harvest falls around February to April.' },

    // Loire
    sancerre: { name: 'Sancerre', short: 'Sancerre', kind: 'Place', wine: C.lemonGreen, style: 'white', shape: 'burgundy',
      q: 'Sancerre: which grape, and what does it taste like?', a: 'Sauvignon Blanc from the Upper Loire. Dry, high acidity, light body, with gooseberry, grass, green pepper and a flinty note. Usually unoaked.' },
    pouillyfume: { name: 'Pouilly-Fumé', short: 'Pouilly-F.', kind: 'Place', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'Pouilly-Fumé vs Pouilly-Fuissé?', a: 'Pouilly-Fumé is Loire Sauvignon Blanc, across the river from Sancerre. Pouilly-Fuissé is Chardonnay from Burgundy (the Mâconnais).' },
    vouvray: { name: 'Vouvray', short: 'Vouvray', kind: 'Place', wine: C.gold, style: 'white', shape: 'burgundy',
      q: 'Vouvray: which grape, and which sweetness words appear on the label?', a: 'Chenin Blanc from Touraine (a little Orbois, up to 5% of the vineyard, is also allowed). Sec (dry) → Demi-Sec (off-dry) → Moelleux (medium-sweet) → Doux (sweet), plus sparkling styles.' },
    chenin: { name: 'Chenin Blanc', short: 'Chenin', kind: 'Grape', wine: C.lemon, style: 'white', shape: 'flute',
      q: 'What lets Chenin Blanc make dry to sweet wines that age for decades?', a: 'Its naturally high acidity, which keeps even the sweetest styles fresh.' },
    chinon: { name: 'Chinon', short: 'Chinon', kind: 'Place', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'Chinon: which grape, and what does it taste like?', a: 'Cabernet Franc from Touraine. Raspberry, red cherry, green bell pepper and pencil shavings. Light to medium body, fresh acidity.' },
    surlie: { name: 'Sur lie', short: 'Sur Lie', kind: 'Making', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'What does "sur lie" mean?', a: 'The wine rested on its lees (dead yeast cells) before bottling. That adds texture and a subtle bready, yeasty note.' },
    muscadet: { name: 'Muscadet', short: 'Muscadet', kind: 'Place', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'Muscadet: which grape, where is it from, and what do you eat with it?', a: 'Melon de Bourgogne from the Pays Nantais, near the Atlantic. It\'s bone-dry, light and saline, and classic with oysters.' },

    // Barolo
    tannin: { name: 'Tannin', short: 'Tannin', kind: 'Tasting', wine: C.purple, style: 'red', shape: 'bordeaux',
      q: 'What is tannin, and how do you feel it?', a: 'A structural compound that binds to the proteins in your saliva. You feel it as a drying, grippy sensation on your gums and teeth.' },
    tanninsource: { name: 'Where tannin comes from', short: 'Tannin src', kind: 'Making', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'Where does red wine get its tannin?', a: 'Mostly from grape skins, seeds and stems, extracted during fermentation on the skins. Oak barrels add some too.' },
    nebbiolo: { name: 'Barolo / Nebbiolo', short: 'Barolo', kind: 'Grape', wine: C.garnet, style: 'red', shape: 'burgundy',
      q: 'Barolo: which grape, and what does it taste like?', a: 'Nebbiolo from Piedmont. Pale garnet colour, with red cherry, roses, tar and liquorice. High acidity, high tannin, high alcohol and a long finish.' },
    nebbiolocolour: { name: 'The pale paradox', short: 'Pale/grip', kind: 'Grape', wine: C.garnet, style: 'red', shape: 'burgundy',
      q: 'Why does Nebbiolo fool blind tasters?', a: 'It\'s pale in colour (few colour pigments) but has huge tannin and acidity. Colour and tannin are separate things.' },
    riserva: { name: 'Barolo Riserva', short: 'Riserva', kind: 'Label', wine: C.garnet, style: 'red', shape: 'burgundy',
      q: 'Barolo vs Barolo Riserva: minimum ageing?', a: 'Barolo: at least 38 months (18 in wood). Riserva: at least 62 months, so over 5 years.' },
    tanninpair: { name: 'Taming tannin', short: 'Pairing', kind: 'Pairing', wine: C.ruby, style: 'red', shape: 'bordeaux',
      q: 'What food softens a very tannic wine?', a: 'Rich, fatty, protein-heavy food like braised beef. Chilli heat and bitterness make tannin feel harsher.' },
    tanninscale: { name: 'Tannin scale', short: 'Scale', kind: 'Tasting', wine: C.purple, style: 'red', shape: 'bordeaux',
      q: 'Rank: Barolo, Beaujolais, Provence rosé, Chianti Classico by tannin.', a: 'Provence rosé (minimal) < Beaujolais/Gamay (low) < Chianti Classico/Sangiovese (medium+) < Barolo/Nebbiolo (high).' },

    // Cool vs warm
    coolclimate: { name: 'Cool climate', short: 'Cool', kind: 'Vineyard', wine: C.lemonGreen, style: 'white', shape: 'flute',
      q: 'How does a cool climate change a wine?', a: 'Higher acidity, lower alcohol, lighter body, and tart fruit (green apple, citrus). A warm climate gives riper, tropical fruit, more alcohol and more body.' },
    chablis: { name: 'Chablis', short: 'Chablis', kind: 'Place', wine: C.lemon, style: 'white', shape: 'burgundy',
      q: 'Chablis: which grape, soil and style?', a: 'Chardonnay from northern Burgundy, on Kimmeridgian limestone full of fossil oyster shells. Green apple, lemon and wet stone, with high acidity and usually little new oak.' },
    napachard: { name: 'Napa Chardonnay', short: 'Napa', kind: 'Place', wine: C.gold, style: 'white', shape: 'burgundy',
      q: 'Napa Valley Chardonnay: what does it typically taste like?', a: 'Ripe pineapple, peach and tropical fruit. Often oaked (vanilla, toast) and buttery from malolactic. Full body, high alcohol.' },
    oak: { name: 'Oak ageing', short: 'Oak', kind: 'Making', wine: C.amber, style: 'white', shape: 'burgundy',
      q: 'What does new oak add to a wine?', a: 'Vanilla, toast, smoke, clove and coconut aromas, plus a little tannin and a rounder texture.' },
    mlf: { name: 'Malolactic conversion', short: 'MLF', kind: 'Making', wine: C.gold, style: 'white', shape: 'burgundy',
      q: 'What does malolactic conversion do?', a: 'Bacteria turn sharp malic acid (green apple) into softer lactic acid (milk). This lowers acidity and can add a buttery note.' },
    climateorder: { name: 'Latitude & ripeness', short: 'Latitude', kind: 'Vineyard', wine: C.lemon, style: 'white', shape: 'champagne',
      q: 'Champagne, Chablis, Meursault, Napa: coolest to warmest?', a: 'Champagne → Chablis → Meursault → Napa Valley.' },
    chablisclass: { name: 'Chablis ladder', short: '1er Cru', kind: 'Label', wine: C.lemon, style: 'white', shape: 'burgundy',
      q: 'The four Chablis quality levels?', a: 'Petit Chablis → Chablis → Chablis Premier Cru → Chablis Grand Cru (seven named climats, all in the commune of Chablis).' },
  };

  const flights = [
    {
      id: 'winter', title: 'Winter in the Vineyard', sub: 'Dormancy, pruning & frozen grapes', wine: C.gold, seasonal: ['dormant', 'fall'],
      questions: [
        { type: 'choice', concept: 'dormancy', q: 'Harvest is in and the nights turn icy. What does the vine do now?',
          options: ['Drops its leaves and goes dormant, storing energy in its trunk and roots', 'Grows a second, smaller crop', 'Flowers again to use up the last warmth', 'Pulls its roots up closer to the surface'],
          answer: 0, explain: 'The vine shuts down for winter. It saves its carbohydrate reserves in the wood and roots to power budburst in spring.' },
        { type: 'choice', concept: 'pruning', q: 'Why do growers spend freezing winter days pruning?',
          options: ['It protects the vine from frost', 'It sets how many buds, and so bunches, the vine will carry', 'It makes next year\'s grapes darker', 'It\'s mostly for neat-looking rows'],
          answer: 1, explain: 'Every bud left on is a potential shoot with one or two bunches. Prune hard and you get a lower yield with more concentrated fruit.' },
        { type: 'choice', concept: 'canespur', q: 'With cane pruning (e.g. Guyot), the grower keeps one or two long canes. With spur pruning (cordon), they keep…',
          options: ['Only the trunk, nothing else', 'Many short 2–3-bud spurs along a permanent arm', 'Every single shoot from last year', 'One bud per vine'],
          answer: 1, explain: 'A cordon is a permanent woody arm along the wire, dotted with short "spurs". Guyot is classic in Bordeaux and Burgundy. Cordon is common in warmer regions.' },
        { type: 'order', concept: 'cycle', q: 'Put the vine\'s year in order, starting in spring.',
          items: ['Budburst', 'Flowering', 'Fruit set', 'Véraison', 'Harvest'],
          explain: 'Véraison is when berries soften and change colour. Black grapes go from green to purple. From there it\'s a sprint to ripeness.' },
        { type: 'blind', concept: 'icewine', q: 'A tiny glass of something golden…',
          clues: [
            { stage: 'Appearance', text: 'Deep gold. Thick, slow legs cling to the glass.' },
            { stage: 'Nose', text: 'Intense apricot, peach, honey and candied lemon. No mushroomy noble-rot notes, no oak.' },
            { stage: 'Palate', text: 'Very sweet, but racy acidity keeps it fresh. Only 9.5% alcohol. Grapes picked at night in January at −8°C.' },
          ],
          options: ['Icewine', 'Sauternes', 'Tokaji Aszú', 'Tawny Port'], answer: 0,
          explain: 'Icewine is pure, concentrated fruit with no botrytis. Sauternes and Tokaji get their character from noble rot. Port is fortified, so it\'s much higher in alcohol.' },
        { type: 'choice', concept: 'icewine', q: 'For Icewine, frozen grapes are pressed before they thaw. Why?',
          options: ['Frozen grapes are easier to crush', 'The water stays behind as ice, so only intensely sweet juice runs out', 'Cold juice ferments into more alcohol', 'It gives the wine bubbles'],
          answer: 1, explain: 'Ice crystals are mostly water. Pressing them frozen squeezes out a few drops of super-concentrated sugar and acid.' },
        { type: 'choice', concept: 'hemispheres', q: 'It\'s November. What\'s happening in Marlborough or Mendoza right now?',
          options: ['Harvest is in full swing', 'The vines are dormant under snow', 'Late spring: shoots are growing and flowering is close', 'Leaf fall'],
          answer: 2, explain: 'The seasons are flipped. Southern Hemisphere harvests fall around February to April. You can switch hemispheres in settings and the app\'s sky will follow.' },
      ],
    },
    {
      id: 'loire', title: 'The Loire in Three Glasses', sub: 'Sancerre, Vouvray, Chinon & a Muscadet chaser', wine: C.lemonGreen,
      questions: [
        { type: 'blind', concept: 'sancerre', q: 'A crisp white, poured blind.',
          clues: [
            { stage: 'Appearance', text: 'Pale lemon with a green tinge.' },
            { stage: 'Nose', text: 'Gooseberry, freshly cut grass, green pepper and a whiff of struck flint.' },
            { stage: 'Palate', text: 'Bone-dry, high acidity, light body, no oak. Grown around a hilltop town in the Upper Loire.' },
          ],
          options: ['Sancerre', 'Vouvray', 'Chablis', 'Muscadet'], answer: 0,
          explain: 'Gooseberry and grass shout Sauvignon Blanc. In the Loire that means Sancerre or its neighbour Pouilly-Fumé.' },
        { type: 'choice', concept: 'pouillyfume', q: 'Across the river from Sancerre, a village makes very similar Sauvignon Blanc. Which one?',
          options: ['Pouilly-Fuissé', 'Pouilly-Fumé', 'Saumur', 'Savennières'], answer: 1,
          explain: 'This is a classic trap. Pouilly-Fumé is Loire Sauvignon Blanc. Pouilly-Fuissé is Chardonnay from southern Burgundy.' },
        { type: 'label', concept: 'vouvray', q: 'Tap the word that tells you how sweet this wine is.',
          label: { style: 'loire', lines: [
            [{ t: 'Domaine des Coteaux', k: 'producer' }],
            [{ t: 'Vouvray', k: 'app', big: true }],
            [{ t: 'Demi-Sec', k: 'sweet' }],
            [{ t: 'Appellation Vouvray Contrôlée', k: 'aoc', small: true }],
            [{ t: '2023', k: 'vintage' }, { t: 'Mis en bouteille au domaine', k: 'bottled', small: true }],
          ] }, answer: 'sweet',
          explain: '"Demi-Sec" means off-dry. Vouvray (Chenin Blanc, with up to 5% Orbois allowed) runs from Sec to Demi-Sec to Moelleux and Doux, and there are sparkling versions too.' },
        { type: 'choice', concept: 'chenin', q: 'What lets Chenin Blanc make everything from bone-dry to lusciously sweet, and age for decades?',
          options: ['Thick, tannic skins', 'Naturally high acidity', 'Very low natural sugar', 'Always being aged in new oak'], answer: 1,
          explain: 'Acidity is the backbone. It balances sweetness and preserves the wine. Old Vouvray turns honeyed and nutty but stays bright.' },
        { type: 'blind', concept: 'chinon', q: 'A light, fragrant red.',
          clues: [
            { stage: 'Appearance', text: 'Medium ruby.' },
            { stage: 'Nose', text: 'Raspberry, red cherry, green bell pepper and pencil shavings.' },
            { stage: 'Palate', text: 'Dry, fresh acidity, medium tannin, light-medium body. Grown in Touraine, from a grape that is a parent of Cabernet Sauvignon.' },
          ],
          options: ['Barolo', 'Beaujolais', 'Chinon', 'Barossa Shiraz'], answer: 2,
          explain: 'That leafy green-pepper note plus bright red fruit is Cabernet Franc. Crossed with Sauvignon Blanc, it gave us Cabernet Sauvignon.' },
        { type: 'label', concept: 'surlie', q: 'Tap the term that means the wine rested on its dead yeast cells before bottling.',
          label: { style: 'loire', lines: [
            [{ t: 'Château de la Marée', k: 'producer' }],
            [{ t: 'Muscadet Sèvre et Maine', k: 'app', big: true }],
            [{ t: 'Sur Lie', k: 'surlie' }],
            [{ t: 'Appellation Contrôlée', k: 'aoc', small: true }],
            [{ t: 'Vin de Loire', k: 'region', small: true }, { t: '12% vol', k: 'abv', small: true }],
          ] }, answer: 'surlie',
          explain: '"Sur lie" means on the lees. It gives a lean, salty Muscadet extra texture and a faint bready note.' },
        { type: 'choice', concept: 'muscadet', q: 'Someone has brought a dozen oysters. Which Loire wine do you open?',
          options: ['Chinon', 'Vouvray Moelleux', 'Muscadet Sèvre et Maine Sur Lie', 'Rosé d\'Anjou'], answer: 2,
          explain: 'Muscadet is made from Melon de Bourgogne near the Atlantic. It\'s bone-dry and saline, and its high acidity cuts through briny oysters like a squeeze of lemon.' },
      ],
    },
    {
      id: 'barolo', title: 'Why is Barolo so grippy?', sub: 'Tannin, Nebbiolo & patience', wine: C.garnet,
      questions: [
        { type: 'choice', concept: 'tannin', q: 'That drying, grippy feeling on your gums is…',
          options: ['Acidity', 'Tannin', 'Alcohol', 'Sugar'], answer: 1,
          explain: 'Tannin binds to the proteins in your saliva and makes your mouth feel dry and furry. Acidity does the opposite: it makes you salivate.' },
        { type: 'choice', concept: 'tanninsource', q: 'Where does most of a red wine\'s tannin come from?',
          options: ['The yeast', 'Grape skins, seeds and stems, during fermentation', 'Added sugar', 'Cold bottle storage'], answer: 1,
          explain: 'Red wines ferment with their skins, which pulls out colour and tannin. Oak barrels add a little extra tannin. Whites barely touch their skins.' },
        { type: 'blind', concept: 'nebbiolo', q: 'A red that looks gentle…',
          clues: [
            { stage: 'Appearance', text: 'Pale garnet with a brick-orange rim. Surprisingly light.' },
            { stage: 'Nose', text: 'Sour red cherry, dried roses, tar and a hint of liquorice.' },
            { stage: 'Palate', text: 'Dry, high acidity, HIGH tannin, high alcohol, very long. From the hills near Alba in Piedmont.' },
          ],
          options: ['Burgundy Pinot Noir', 'Barolo', 'Napa Cabernet Sauvignon', 'Rioja Gran Reserva'], answer: 1,
          explain: 'Pale colour but massive grip: that\'s Nebbiolo. "Tar and roses" is the classic shorthand for Barolo.' },
        { type: 'choice', concept: 'nebbiolocolour', q: 'Nebbiolo\'s party trick that fools blind tasters?',
          options: ['Deep purple but almost no tannin', 'Pale in colour, yet huge tannin and acidity', 'It always smells of banana', 'It\'s always slightly sweet'], answer: 1,
          explain: 'Colour comes from pigments called anthocyanins, and Nebbiolo has few of them. Tannin is a different compound, and Nebbiolo has loads. Don\'t judge a wine by its colour.' },
        { type: 'label', concept: 'riserva', q: 'Tap the word that tells you this wine was aged for at least 5 years before release.',
          label: { style: 'italy', lines: [
            [{ t: 'Cascina Lupo', k: 'producer' }],
            [{ t: 'Barolo', k: 'app', big: true }],
            [{ t: 'Riserva', k: 'riserva' }],
            [{ t: 'Denominazione di Origine Controllata e Garantita', k: 'docg', small: true }],
            [{ t: '2018', k: 'vintage' }, { t: '14,5% vol', k: 'abv', small: true }],
          ] }, answer: 'riserva',
          explain: 'Barolo needs at least 38 months of ageing (18 in wood). Riserva needs 62 months. DOCG is Italy\'s top quality tier.' },
        { type: 'choice', concept: 'tanninpair', q: 'Which dish will make a young Barolo\'s tannins feel softer?',
          options: ['Spicy Thai green curry', 'A light green salad', 'Slow-braised beef', 'Chocolate fondant'], answer: 2,
          explain: 'Fat and protein coat your mouth and soften tannin. Chilli heat and high alcohol fight each other, and sweet desserts make dry wines taste thin and bitter.' },
        { type: 'order', concept: 'tanninscale', q: 'Rank from least to most tannic.',
          items: ['Provence rosé', 'Beaujolais (Gamay)', 'Chianti Classico (Sangiovese)', 'Barolo (Nebbiolo)'],
          explain: 'Rosé gets only a few hours on the skins. Gamay is soft and fruity. Sangiovese is firm. Nebbiolo is the heavyweight.' },
      ],
    },
    {
      id: 'climate', title: 'Cool vs Warm', sub: 'One grape, two worlds: Chardonnay', wine: C.gold,
      questions: [
        { type: 'choice', concept: 'coolclimate', q: 'Compared with a hot region, grapes ripening in a cool climate keep more…',
          options: ['Sugar', 'Acidity', 'Alcohol potential', 'Tannin'], answer: 1,
          explain: 'Warmth builds sugar and burns off acid. Cool regions give crisper, lighter, lower-alcohol wines with tart fruit.' },
        { type: 'blind', concept: 'chablis', q: 'Chardonnay number one.',
          clues: [
            { stage: 'Appearance', text: 'Pale lemon.' },
            { stage: 'Nose', text: 'Green apple, lemon and wet stone. Barely any oak.' },
            { stage: 'Palate', text: 'Dry, high acidity, medium body, 12.5% alcohol. Grown on limestone full of fossilised oyster shells.' },
          ],
          options: ['Napa Valley Chardonnay', 'Chablis', 'Mosel Riesling', 'Sancerre'], answer: 1,
          explain: 'Kimmeridgian limestone with its fossil oysters is the Chablis signature. It\'s cool-climate Chardonnay at its most precise.' },
        { type: 'blind', concept: 'napachard', q: 'Chardonnay number two.',
          clues: [
            { stage: 'Appearance', text: 'Medium gold.' },
            { stage: 'Nose', text: 'Ripe pineapple, peach, vanilla, toast and melted butter.' },
            { stage: 'Palate', text: 'Dry, medium acidity, full creamy body, 14.5% alcohol. From a sunny Californian valley also famous for Cabernet.' },
          ],
          options: ['Chablis', 'Albariño', 'Napa Valley Chardonnay', 'Sauternes'], answer: 2,
          explain: 'Tropical fruit plus high alcohol means warm climate. Vanilla and toast mean oak. Butter means malolactic conversion.' },
        { type: 'choice', concept: 'oak', q: 'Where do the vanilla and toast notes come from?',
          options: ['The grape skins', 'Ageing in new oak barrels', 'Malolactic conversion', 'The cool climate'], answer: 1,
          explain: 'Toasted new oak adds vanilla, toast, smoke and spice. Older barrels add texture but much less flavour.' },
        { type: 'choice', concept: 'mlf', q: 'And the buttery note comes from malolactic conversion. What happens?',
          options: ['Yeast turns sugar into butter', 'Bacteria turn sharp malic acid into softer lactic acid', 'Oak adds dairy aromas', 'Extra alcohol is added'], answer: 1,
          explain: 'Malic acid tastes like green apple and lactic acid like milk. MLF softens acidity and can produce diacetyl, the "butter" molecule.' },
        { type: 'order', concept: 'climateorder', q: 'Order these Chardonnay homes from coolest to warmest.',
          items: ['Champagne', 'Chablis', 'Meursault', 'Napa Valley'],
          explain: 'As you move south you get riper fruit and fuller body. Champagne is so cool that its grapes are perfect for sparkling wine.' },
        { type: 'label', concept: 'chablisclass', q: 'Tap the term that shows a highly rated vineyard, one step below the very top.',
          label: { style: 'burgundy', lines: [
            [{ t: 'Domaine Pierre-Blanche', k: 'producer' }],
            [{ t: 'Chablis', k: 'app', big: true }],
            [{ t: 'Premier Cru', k: 'premier' }],
            [{ t: 'Montée de Tonnerre', k: 'climat' }],
            [{ t: '2022', k: 'vintage' }, { t: '12,5% vol', k: 'abv', small: true }],
          ] }, answer: 'premier',
          explain: 'The Chablis ladder goes Petit Chablis → Chablis → Premier Cru → Grand Cru. "Montée de Tonnerre" is the name of the Premier Cru vineyard.' },
      ],
    },
  ];

  const botty = {
    good: ['Gorgeous. Long finish on that one.', 'Spot on. Pour yourself a little extra.', 'Now that is balanced.', 'Your roots just went deeper.', 'A sommelier would nod. Slowly.', 'Ooh, complex. Like you.'],
    bad: ['Close! Even Masters of Wine get caught out.', 'A slightly corked answer. Let\'s decant it.', 'Not this time, but now it\'ll stick.', 'Wrong glass, right instinct.', 'Shake it off. Swirl it off, really.'],
  };

  return { C, seasons, strata, concepts, flights, botty };
})();
