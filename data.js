/* Duovino content: seasons, soil strata, concepts (ideas used in lessons) and Botty's lines.
 *
 * The Tasting specials were retired (2026-11-08). Their rule check, against official texts, for reference:
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

  const botty = {
    good: ['Gorgeous. Long finish on that one.', 'Spot on. Pour yourself a little extra.', 'Now that is balanced.', 'Your roots just went deeper.', 'A sommelier would nod. Slowly.', 'Ooh, complex. Like you.'],
    bad: ['Close! Even Masters of Wine get caught out.', 'A slightly corked answer. Let\'s decant it.', 'Not this time, but now it\'ll stick.', 'Wrong glass, right instinct.', 'Shake it off. Swirl it off, really.'],
  };

  return { C, seasons, strata, concepts, botty };
})();
