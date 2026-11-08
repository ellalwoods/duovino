/* Track B · Part 3: first regions, each written in full so its postcard can be earned.
 * Rules named here were checked (2026-11-08) against EU-published texts:
 *  - Alsace (C/2025/4116): bottled in Alsace, in "Vin du Rhin" (flute) bottles; grapes include Riesling, Gewurztraminer,
 *    Pinot Gris, Muscat, Pinot Blanc, Sylvaner, Pinot Noir. 51 "Alsace grand cru" PDOs in the EU register; grand cru
 *    grapes Riesling, Gewurztraminer, Pinot Gris, Muscat (e.g. Schlossberg, OJ C 390, 2022); VT and SGN traditional terms.
 *  - Tokaj (C/2026/1380): Furmint, Hárslevelű, Sárga Muskotály and others; volcanic soils, Zemplén hills; Eszencia from
 *    juice that runs from aszú berries under their own weight; Dry and Sweet Szamorodni; Aszú may show 3–6 puttonyos
 *    (6 puttonyos ≥ 150 g/l sugar).
 *  - Eger (OJ C 330, 2020): Egri Bikavér, a Kékfrankos-based blend; "Bull's blood" recorded in 1851; Egri Csillag.
 *  - Santorini (OJ C 143, 2022): see grapes-med.js.
 * Non-EU regions (Switzerland, Georgia, Lebanon, England, Brazil, Uruguay, Japan): facts about places, not legal rules.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const R = (id, title, sub, lesson, questions, sources) => ({ id: 'b-' + id, title, sub, lesson, questions, ...(sources ? { sources } : {}) });

  D.regionLessons = Object.assign(D.regionLessons || {}, {

    'fr-alsace': R('fr-alsace', 'Alsace', 'Grape-named labels, Grand Cru, VT/SGN, Crémant', [
      { kind: 'label', title: 'An Alsace label', body: 'Tap the underlined words.',
        label: { style: 'germany', lines: [
          [s('Domaine Haag-Muller', 'producer', { note: 'The producer. German-sounding names are common: Alsace has been both French and German.' })],
          [s('Riesling', 'grape', { big: true, note: 'Unlike most of France, Alsace names the grape on the label.' })],
          [s('Alsace Grand Cru Schlossberg', 'app', { note: 'One of 51 grand cru vineyards, each its own appellation.' })],
          [s('Vendanges Tardives', 'vt', { note: '"Late harvest": riper, often sweet.' })],
        ] } },
      { kind: 'text', title: 'In the rain shadow', big: 'Sunny, dry, between the Vosges and the Rhine',
        body: 'The <b>Vosges mountains</b> block rain from the west, making Alsace one of France\'s <b>driest, sunniest</b> wine regions despite being so far north. Long, slow ripening suits aromatic grapes.' },
      { kind: 'layers', title: 'Reading Alsace', rows: [
        { h: 'The grapes', t: 'Riesling, Gewurztraminer, Pinot Gris and Muscat are the stars; also Pinot Blanc, Sylvaner and a little Pinot Noir.' },
        { h: 'The bottle', t: 'Always the tall, slim "flûte", and always bottled in Alsace.' },
        { h: 'Grand Cru', t: '51 named vineyards, mostly for Riesling, Gewurztraminer, Pinot Gris and Muscat.' },
        { h: 'VT & SGN', t: 'Vendanges Tardives (late harvest) and Sélection de Grains Nobles (nobly rotten berries): rich and often sweet.' },
        { h: 'Crémant d\'Alsace', t: 'Traditional-method sparkling wine.' },
      ] },
    ], [
      { type: 'choice', wines: ['alsacepg'], q: 'What does Alsace put on the label that most of France doesn\'t?', options: ['The grape', 'The price', 'The alcohol', 'The winemaker\'s photo'], answer: 0,
        explain: 'Riesling, Gewurztraminer, Pinot Gris…' },
      { type: 'choice', q: 'Why is Alsace so dry and sunny?', options: ['The Vosges mountains block the rain', 'It\'s near the Mediterranean', 'It\'s on the equator', 'It\'s by the Atlantic'], answer: 0,
        explain: 'A rain shadow.' },
      { type: 'choice', q: 'How many Alsace Grand Cru vineyards are there?', options: ['51', '7', '17', '200'], answer: 0,
        explain: 'Each is its own appellation.' },
      { type: 'sort', q: 'Vendanges Tardives or Sélection de Grains Nobles?', buckets: ['VT', 'SGN'],
        items: [{ t: 'Late harvest', b: 0 }, { t: 'Nobly rotten berries', b: 1 }],
        explain: 'SGN is the richer, rarer step.' },
      { type: 'odd', q: 'Which is NOT one of Alsace\'s star grapes?', options: ['Riesling', 'Gewurztraminer', 'Pinot Gris', 'Tempranillo'], answer: 3,
        explain: 'Tempranillo is Spain\'s.' },
      { type: 'choice', q: 'Alsace wine always comes in…', options: ['A tall, slim flûte bottle', 'A squat clavelin', 'A Bordeaux bottle', 'A box'], answer: 0,
        explain: 'And it must be bottled in Alsace.' },
    ], ['Alsace AOC: C/2025/4116', 'Alsace grand cru Schlossberg: OJ C 390, 2022']),

    'ch-vaud': R('ch-vaud', 'Vaud & Valais', 'Chasselas', [
      { kind: 'text', title: 'Switzerland\'s secret', big: 'Great wine, rarely exported',
        body: 'Switzerland makes excellent wine, but the Swiss drink almost all of it themselves. Its best-known white is <b>Chasselas</b>; its most planted grape is <b>Pinot Noir</b>.' },
      { kind: 'compare', title: 'Two cantons', cols: [
        { h: 'Vaud', items: ['Along Lake Geneva', 'Lavaux\'s terraces: UNESCO World Heritage', 'Chasselas at its finest'] },
        { h: 'Valais', items: ['The sunny, dry upper Rhône valley', 'The biggest wine canton', 'Chasselas called Fendant; Petite Arvine; Cornalin'] }] },
      { kind: 'try', title: 'Three suns', body: 'Lavaux growers talk of "three suns" warming their vines…',
        prompt: 'What could the three be?',
        reveal: 'The <b>sun</b> itself, its <b>reflection off the lake</b>, and the heat stored in the <b>stone walls</b> of the terraces.' },
    ], [
      { type: 'choice', wines: ['chasselas'], q: 'Switzerland\'s most planted grape?', options: ['Pinot Noir', 'Chasselas', 'Merlot', 'Riesling'], answer: 0,
        explain: 'Chasselas is its best-known white.' },
      { type: 'sort', q: 'Vaud or Valais?', buckets: ['Vaud', 'Valais'],
        items: [{ t: 'Lake Geneva', b: 0 }, { t: 'Upper Rhône valley', b: 1 }, { t: 'Lavaux terraces', b: 0 }, { t: 'Fendant', b: 1 }, { t: 'Biggest wine canton', b: 1 }],
        explain: 'Lake vs mountains.' },
      { type: 'choice', q: 'Lavaux\'s "three suns" are…', options: ['The sun, the lake\'s reflection, and warm stone walls', 'Three hot months', 'Three valleys', 'Three grapes'], answer: 0,
        explain: 'Every bit of warmth counts.' },
      { type: 'choice', q: 'Why is Swiss wine hard to find abroad?', options: ['The Swiss drink almost all of it', 'It\'s banned', 'It doesn\'t travel', 'It\'s all sweet'], answer: 0,
        explain: 'Very little is exported.' },
    ]),

    'hu-tokaji': R('hu-tokaji', 'Tokaji', 'Aszú, puttonyos, Szamorodni', [
      { kind: 'text', title: 'Volcanic hills and noble rot', big: 'Furmint · Hárslevelű · Botrytis',
        body: 'Tokaj sits in the <b>Zemplén hills</b> of north-east Hungary, on soils mostly of <b>volcanic</b> origin. Autumn mists from two rivers bring <b>noble rot</b>. The main grapes are <b>Furmint</b> and <b>Hárslevelű</b>, with yellow Muscat.' },
      { kind: 'layers', title: 'The styles', rows: [
        { h: 'Dry wines', t: 'Increasingly, crisp dry Furmint.' },
        { h: 'Szamorodni', t: '"As it comes": whole bunches with some nobly rotten berries. Dry or sweet.' },
        { h: 'Aszú', t: 'Shrivelled, nobly rotten (aszú) berries are picked one by one and soaked in wine or must. Labels may show 3 to 6 puttonyos: 6 means at least 150 g of sugar per litre.' },
        { h: 'Eszencia', t: 'Pure juice that trickles from aszú berries under their own weight. Barely fermented, incredibly sweet, sipped by the spoonful.' },
      ] },
      { kind: 'text', title: 'Puttony?', body: 'A <b>puttony</b> is the traditional basket hod used to carry aszú berries. More puttonyos, sweeter wine.' },
    ], [
      { type: 'choice', wines: ['tokaji'], q: 'Tokaji Aszú is made from…', options: ['Nobly rotten berries picked one by one', 'Frozen grapes', 'Sun-dried grapes', 'Black grapes'], answer: 0,
        explain: 'Aszú berries, shrivelled by Botrytis.' },
      { type: 'choice', q: 'What is a puttony?', options: ['A basket hod for carrying aszú berries', 'A barrel', 'A village', 'A grape'], answer: 0,
        explain: 'More puttonyos means a sweeter wine.' },
      { type: 'order', q: 'Order these Tokaji styles from driest to sweetest.', items: ['Dry Furmint', 'Aszú 5 puttonyos', 'Eszencia'],
        explain: 'Eszencia is the ultimate.' },
      { type: 'choice', q: 'Szamorodni means…', options: ['"As it comes": dry or sweet', 'Always bone dry', 'Sparkling', 'Red'], answer: 0,
        explain: 'Whole bunches, some nobly rotten berries.' },
      { type: 'choice', q: 'How is Eszencia made?', options: ['Juice trickles from aszú berries under their own weight', 'Fortified with spirit', 'Grapes are frozen', 'In a tank with bubbles'], answer: 0,
        explain: 'Barely fermented, intensely sweet.' },
    ], ['Tokaj PDO: C/2026/1380']),

    'hu-eger': R('hu-eger', 'Eger', 'Bull\'s Blood', [
      { kind: 'text', title: 'Bull\'s Blood', big: 'Egri Bikavér',
        body: 'Eger, in northern Hungary below the Bükk mountains, is famous for <b>Egri Bikavér</b>, "Bull\'s Blood": a <b>blended</b> red, based on <b>Kékfrankos</b> (Blaufränkisch). Spicy and fruity, never harshly tannic.' },
      { kind: 'try', title: 'Why "Bull\'s Blood"?', body: 'Legend says that in 1552, Eger\'s defenders held off a far larger Ottoman army…',
        prompt: 'What did the attackers think they were drinking?',
        reveal: 'Seeing the defenders\' red-stained beards, the story goes, they thought the Hungarians were drinking <b>bull\'s blood</b>. The name was in print by 1851.' },
      { kind: 'facts', title: 'Also from Eger', rows: [
        { k: 'Egri Csillag', v: '"Star of Eger": the white blend.' },
      ] },
    ], [
      { type: 'choice', wines: ['bikaver'], q: 'Egri Bikavér is based on…', options: ['Kékfrankos', 'Furmint', 'Pinot Noir', 'Merlot only'], answer: 0,
        explain: 'Blaufränkisch, under its Hungarian name.' },
      { type: 'choice', q: 'Is Bikavér a single grape or a blend?', options: ['A blend', 'Always a single grape', 'A sparkling wine', 'A sweet wine'], answer: 0,
        explain: 'Eger is a region of blends.' },
      { type: 'choice', q: 'Egri Csillag is…', options: ['Eger\'s white blend', 'A red', 'A dessert wine', 'A grape'], answer: 0,
        explain: '"Star of Eger".' },
    ], ['Eger PDO: OJ C 330, 2020']),

    'gr-santorini': R('gr-santorini', 'Santorini', 'Assyrtiko', [
      { kind: 'text', title: 'An island in a crater', big: 'Wind, sun, volcanic sand',
        body: 'Santorini is the rim of a collapsed volcano. Little rain falls; vines survive on <b>sea mist and dew</b>, rooted in volcanic sand.' },
      { kind: 'layers', title: 'What the label means', rows: [
        { h: 'Santorini (dry white)', t: 'At least 85% Assyrtiko; the rest Athiri and Aidani.' },
        { h: 'Nykteri', t: 'Traditionally from grapes picked and pressed at night ("nykta"), often oak-aged: richer.' },
        { h: 'Vinsanto', t: 'Sweet, from sun-dried grapes, at least 51% Assyrtiko.' },
      ] },
      { kind: 'try', title: 'Thirsty vines', body: 'Hardly any rain falls in the growing season…',
        prompt: 'How do the vines drink?',
        reveal: 'Night-time <b>sea mist and dew</b> settle on the sandy soil, and the low <b>basket-shaped</b> vines catch it.' },
    ], [
      { type: 'choice', wines: ['assyrtiko'], q: 'Santorini is the rim of…', options: ['A collapsed volcano', 'A coral reef', 'A glacier valley', 'A chalk cliff'], answer: 0,
        explain: 'Hence the volcanic sand.' },
      { type: 'sort', q: 'Dry Santorini or Vinsanto?', buckets: ['Dry Santorini', 'Vinsanto'],
        items: [{ t: 'At least 85% Assyrtiko', b: 0 }, { t: 'Sun-dried grapes', b: 1 }, { t: 'At least 51% Assyrtiko', b: 1 }, { t: 'Bone dry', b: 0 }],
        explain: 'Same island, two styles.' },
      { type: 'choice', q: 'How do Santorini\'s vines get water?', options: ['Sea mist and dew', 'Heavy summer rain', 'Irrigation from rivers', 'Melting snow'], answer: 0,
        explain: 'Very little rain falls.' },
      { type: 'choice', q: 'Nykteri traditionally comes from grapes…', options: ['Picked and pressed at night', 'Frozen on the vine', 'Grown on the mainland', 'Dried for months'], answer: 0,
        explain: '"Nykta" means night.' },
    ], ['Santorini PDO: OJ C 143, 31.3.2022']),

    'gr-naoussa': R('gr-naoussa', 'Naoussa', 'Xinomavro', [
      { kind: 'text', title: 'Greece\'s mountain red', big: 'Cool slopes of Mount Vermio',
        body: 'Naoussa lies on the slopes of <b>Mount Vermio</b> in Macedonia, northern Greece: <b>cooler</b>, with cold winters. Its red is <b>Xinomavro</b>, structured and long-lived.' },
      { kind: 'compare', title: 'Young vs aged Naoussa', cols: [
        { h: 'Young', items: ['Firm tannin, high acidity', 'Red fruit, tomato, olive'] },
        { h: 'Aged', items: ['Softer', 'Dried fruit, leather, spice', 'Brick colour'] }] },
    ], [
      { type: 'choice', wines: ['xinomavro'], q: 'Naoussa\'s red grape?', options: ['Xinomavro', 'Agiorgitiko', 'Assyrtiko', 'Syrah'], answer: 0,
        explain: '"Acid black".' },
      { type: 'choice', q: 'Naoussa\'s vineyards lie on…', options: ['The slopes of Mount Vermio', 'A volcanic island', 'The Peloponnese coast', 'Crete'], answer: 0,
        explain: 'In Macedonia, northern Greece.' },
      { type: 'sort', q: 'Young or aged Naoussa?', buckets: ['Young', 'Aged'],
        items: [{ t: 'Firm tannin', b: 0 }, { t: 'Leather', b: 1 }, { t: 'Tomato and olive', b: 0 }, { t: 'Brick colour', b: 1 }],
        explain: 'Time softens Xinomavro.' },
    ]),

    'gr-nemea': R('gr-nemea', 'Nemea', 'Agiorgitiko', [
      { kind: 'text', title: 'The Peloponnese\'s red heart', big: 'Agiorgitiko, from valley to hillside',
        body: 'Nemea, in the north-east <b>Peloponnese</b>, is Greece\'s biggest red-wine area, all <b>Agiorgitiko</b>. Its vineyards climb from the warm valley floor up the cooler hills.' },
      { kind: 'compare', title: 'Altitude changes the wine', cols: [
        { h: 'Valley floor', items: ['Warmer', 'Riper, softer', 'Juicy and plummy'] },
        { h: 'Higher slopes', items: ['Cooler', 'Fresher acidity', 'Wines for ageing'] }] },
      { kind: 'facts', title: 'A legend', rows: [
        { k: '"Blood of Hercules"', v: 'Hercules is said to have killed the Nemean lion here; locals nicknamed the wine after him.' },
      ] },
    ], [
      { type: 'choice', wines: ['agiorgitiko'], q: 'Nemea makes red wine from…', options: ['Agiorgitiko', 'Xinomavro', 'Merlot', 'Assyrtiko'], answer: 0,
        explain: 'St George\'s grape.' },
      { type: 'sort', q: 'Valley floor or higher slopes?', buckets: ['Valley floor', 'Higher slopes'],
        items: [{ t: 'Warmer', b: 0 }, { t: 'Fresher acidity', b: 1 }, { t: 'Riper and softer', b: 0 }, { t: 'For ageing', b: 1 }],
        explain: 'Altitude cools things down (Roots 2.3).' },
      { type: 'choice', q: 'Nemea\'s wine nickname?', options: ['Blood of Hercules', 'Bull\'s Blood', 'Black wine', 'Liquid gold'], answer: 0,
        explain: 'After the Nemean lion legend. (Bull\'s Blood is Eger\'s.)' },
    ]),

    'gr-crete': R('gr-crete', 'Crete & the islands', 'Ancient vines, rediscovered grapes', [
      { kind: 'text', title: 'One of Europe\'s oldest wine places', big: 'Wine since the Minoans',
        body: 'People on Crete were making wine over <b>3,500 years ago</b>. Today, growers are reviving <b>local grapes</b> that were nearly lost.' },
      { kind: 'facts', title: 'Crete\'s grapes', rows: [
        { k: 'Vidiano', v: 'The star white, rescued from near-extinction: apricot, peach, herbs, a rich texture.' },
        { k: 'Liatiko', v: 'Pale, perfumed red, often compared to Pinot Noir or Nerello.' },
        { k: 'Kotsifali & Mandilaria', v: 'Often blended: Kotsifali for softness and spice, Mandilaria for deep colour and tannin.' },
      ] },
      { kind: 'text', title: 'Other islands', body: 'Beyond Santorini: <b>Samos</b> for sweet Muscat, <b>Paros</b>, <b>Rhodes</b> and <b>Kefalonia</b> (Robola) for crisp whites.' },
    ], [
      { type: 'choice', wines: ['vidiano'], q: 'Crete\'s star white grape?', options: ['Vidiano', 'Assyrtiko', 'Chardonnay', 'Robola'], answer: 0,
        explain: 'Rescued from near-extinction.' },
      { type: 'sort', q: 'Kotsifali or Mandilaria?', buckets: ['Kotsifali', 'Mandilaria'],
        items: [{ t: 'Softness and spice', b: 0 }, { t: 'Deep colour', b: 1 }, { t: 'Tannin', b: 1 }],
        explain: 'Blended, they balance each other.' },
      { type: 'choice', q: 'Samos is known for…', options: ['Sweet Muscat', 'Red Xinomavro', 'Sparkling wine', 'Vin jaune'], answer: 0,
        explain: 'Muscat, the grapey grape.' },
      { type: 'choice', q: 'How long has Crete been making wine?', options: ['Over 3,500 years', 'About 200 years', 'Since 1950', 'About 50 years'], answer: 0,
        explain: 'Since the Minoans.' },
    ]),

    'ge-qvevri': R('ge-qvevri', 'Qvevri & amber wine', 'Rkatsiteli, Saperavi', [
      { kind: 'text', title: 'Wine in the ground', big: 'Clay jars, buried, sealed',
        body: 'A <b>qvevri</b> is a large egg-shaped clay jar, lined with beeswax and <b>buried</b> up to its neck. The earth keeps the temperature steady while the wine ferments and rests, often for months.' },
      { kind: 'compare', title: 'Two traditions', cols: [
        { h: 'Kakheti (east)', items: ['Juice, skins (and often stems) together for months', 'Bold amber whites with tannin'] },
        { h: 'Imereti (west)', items: ['Only a little skin', 'Lighter, fresher'] }] },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Kakheti', v: 'The heart of Georgian wine, in the east.' },
        { k: 'Grapes', v: 'Saperavi (red-fleshed red), Rkatsiteli and Mtsvane (whites).' },
        { k: 'UNESCO', v: 'Qvevri winemaking is on UNESCO\'s list of intangible heritage.' },
        { k: 'Kindzmarauli', v: 'A famous semi-sweet Saperavi.' },
      ] },
    ], [
      { type: 'choice', wines: ['rkatsiteli'], q: 'Why bury a qvevri?', options: ['The earth keeps the temperature steady', 'To hide it', 'To add minerals', 'To make bubbles'], answer: 0,
        explain: 'Natural temperature control.' },
      { type: 'sort', q: 'Kakheti or Imereti tradition?', buckets: ['Kakheti', 'Imereti'],
        items: [{ t: 'Months on skins and stems', b: 0 }, { t: 'Only a little skin', b: 1 }, { t: 'Bold and tannic', b: 0 }, { t: 'Lighter and fresher', b: 1 }],
        explain: 'East vs west.' },
      { type: 'choice', wines: ['saperavi'], q: 'Kindzmarauli is…', options: ['A semi-sweet Saperavi', 'A dry white', 'A sparkling wine', 'A clay jar'], answer: 0,
        explain: 'Georgia\'s famous semi-sweet red.' },
      { type: 'choice', q: 'What lines a qvevri?', options: ['Beeswax', 'Oak', 'Glass', 'Steel'], answer: 0,
        explain: 'Sealing the porous clay.' },
    ]),

    'lb-bekaa': R('lb-bekaa', 'Bekaa Valley', 'Lebanon\'s high valley', [
      { kind: 'text', title: 'High between two mountain ranges', big: 'About 1,000 m up',
        body: 'The Bekaa Valley lies <b>between Mount Lebanon and the Anti-Lebanon</b> ranges, around <b>1,000 m</b> high. Hot, dry, sunny days and <b>cool nights</b> give ripe but fresh grapes.' },
      { kind: 'facts', title: 'Lebanese wine', rows: [
        { k: 'History', v: 'The Phoenicians traded wine across the Mediterranean thousands of years ago.' },
        { k: 'Château Ksara', v: 'Founded by Jesuit monks in 1857.' },
        { k: 'Château Musar', v: 'Famous for making wine right through the civil war.' },
        { k: 'Grapes', v: 'French grapes (Cabernet, Cinsault, Carignan, Syrah) and native whites Obaideh and Merwah.' },
      ] },
    ], [
      { type: 'choice', wines: ['bekaa'], q: 'Why do Bekaa grapes stay fresh in a hot climate?', options: ['High altitude gives cool nights', 'Heavy rain', 'Sea fog', 'They\'re picked in winter'], answer: 0,
        explain: 'About 1,000 m up.' },
      { type: 'choice', q: 'The Bekaa lies between…', options: ['Mount Lebanon and the Anti-Lebanon', 'Two rivers', 'The sea and a desert', 'Two volcanoes'], answer: 0,
        explain: 'A high valley.' },
      { type: 'choice', q: 'Château Ksara was founded by…', options: ['Jesuit monks, in 1857', 'The Phoenicians', 'A French bank', 'Napoleon'], answer: 0,
        explain: 'Lebanon\'s oldest winery still running.' },
      { type: 'odd', q: 'Which is a native Lebanese white grape?', options: ['Obaideh', 'Cabernet', 'Cinsault', 'Carignan'], answer: 0,
        explain: 'Obaideh and Merwah are local; the others came from France.' },
    ]),

    'uk-sparkling': R('uk-sparkling', 'English sparkling wine', 'Chalk, cool and bubbles', [
      { kind: 'text', title: 'Champagne\'s chalk, across the Channel', big: 'Sussex · Kent · Hampshire',
        body: 'The <b>chalk</b> of southern England\'s downs is part of the same seam that runs under Champagne. With a <b>cool</b> climate and warmer summers than before, England now makes world-class sparkling wine.' },
      { kind: 'layers', title: 'How it\'s made', rows: [
        { h: 'Grapes', t: 'Mostly Chardonnay, Pinot Noir and Meunier, just like Champagne.' },
        { h: 'Method', t: 'The best use the traditional method: second fermentation in the bottle.' },
        { h: 'Style', t: 'Very high acidity, green apple, citrus and toast.' },
      ] },
      { kind: 'facts', title: 'Still wines too', rows: [{ k: 'Bacchus', v: 'England\'s aromatic still white: elderflower and hedgerow.' }] },
    ], [
      { type: 'choice', wines: ['englishsparkling'], q: 'What does southern England share with Champagne?', options: ['A seam of chalk', 'A volcano', 'The same rainfall as Spain', 'Nothing'], answer: 0,
        explain: 'Plus the same grapes and method.' },
      { type: 'choice', q: 'The main grapes of English sparkling wine?', options: ['Chardonnay, Pinot Noir, Meunier', 'Glera', 'Riesling only', 'Tempranillo'], answer: 0,
        explain: 'The Champagne trio.' },
      { type: 'slider', wines: ['englishsparkling'], q: 'Place English sparkling on the acidity scale.', low: 'Low', high: 'High', answer: 0.9, tol: 0.15,
        explain: 'A cool climate keeps it bracing.' },
      { type: 'choice', q: 'Bacchus is England\'s…', options: ['Aromatic still white', 'Sparkling red', 'Sweet wine', 'Rosé'], answer: 0,
        explain: 'Elderflower and hedgerow.' },
    ]),

    'br-serra': R('br-serra', 'Serra Gaúcha', 'Sparkling wine', [
      { kind: 'text', title: 'Brazil\'s wine hills', big: 'Rio Grande do Sul',
        body: 'Most Brazilian wine comes from the <b>Serra Gaúcha</b>, hills in the far south, settled by <b>Italian immigrants</b> from the 1870s. It\'s humid and rainy, so vines are often grown on high <b>pergolas</b> for air.' },
      { kind: 'layers', title: 'Bubbles are the star', rows: [
        { h: 'Traditional method', t: 'Fresh, elegant Chardonnay and Pinot Noir sparkling wines.' },
        { h: 'Moscatel', t: 'Sweet, grapey, low-alcohol sparkling Muscat, made like Asti in a sealed tank.' },
        { h: 'Vale dos Vinhedos', t: 'Brazil\'s first wine region with a protected name.' },
      ] },
      { kind: 'try', title: 'Why sparkling?', body: 'Rain and humidity make it hard to ripen grapes fully…',
        prompt: 'Why is that fine for sparkling wine?',
        reveal: 'Sparkling base wines <b>want</b> grapes picked early, with high acidity and modest sugar (Roots 2.4).' },
    ], [
      { type: 'choice', wines: ['brazilsparkling'], q: 'Brazil\'s best-known wines are…', options: ['Sparkling', 'Fortified', 'Sweet reds', 'Orange wines'], answer: 0,
        explain: 'From the Serra Gaúcha.' },
      { type: 'choice', q: 'Who settled the Serra Gaúcha and planted vines?', options: ['Italian immigrants', 'French monks', 'The Romans', 'Spanish missionaries'], answer: 0,
        explain: 'From the 1870s.' },
      { type: 'choice', q: 'Why grow vines on high pergolas here?', options: ['Airflow in a humid climate', 'To dodge snow', 'To protect from sun', 'Tradition only'], answer: 0,
        explain: 'Air fights rot.' },
      { type: 'choice', q: 'Why does a rainy climate suit sparkling wine?', options: ['Sparkling bases want early-picked, high-acid grapes', 'Rain adds bubbles', 'It doesn\'t', 'Rain makes grapes sweeter'], answer: 0,
        explain: 'Freshness matters more than ripeness.' },
    ]),

    'uy-canelones': R('uy-canelones', 'Canelones & the coast', 'Tannat', [
      { kind: 'text', title: 'An Atlantic climate', big: 'Breezy, humid, temperate',
        body: 'Uruguay\'s vineyards lie mostly in <b>Canelones</b>, around Montevideo. Breezes from the <b>Atlantic</b> and the wide Río de la Plata keep things temperate: more like <b>Bordeaux</b> than Mendoza.' },
      { kind: 'facts', title: 'Uruguayan wine', rows: [
        { k: 'Tannat', v: 'Brought by Basque settlers in the 1870s; now the national grape. Softer and juicier than in Madiran.' },
        { k: 'Maldonado', v: 'Newer vineyards near the coast, on granite hills: fresh whites like Albariño.' },
      ] },
    ], [
      { type: 'choice', wines: ['tannat'], q: 'Uruguay\'s climate is most like…', options: ['Bordeaux', 'Mendoza', 'The Sahara', 'Siberia'], answer: 0,
        explain: 'Atlantic-influenced and humid.' },
      { type: 'choice', q: 'Most Uruguayan wine comes from…', options: ['Canelones, near Montevideo', 'The Andes', 'The Amazon', 'Patagonia'], answer: 0,
        explain: 'Close to the capital.' },
      { type: 'choice', q: 'Maldonado\'s coastal granite hills are known for…', options: ['Fresh whites like Albariño', 'Fortified wine', 'Icewine', 'Sweet reds'], answer: 0,
        explain: 'A newer coastal region.' },
    ]),

    'jp-yamanashi': R('jp-yamanashi', 'Yamanashi', 'Koshu', [
      { kind: 'text', title: 'Japan\'s wine heartland', big: 'In the shadow of Mount Fuji',
        body: '<b>Yamanashi</b>, west of Tokyo, is Japan\'s biggest wine region. Its own grape, <b>Koshu</b>, has grown in Japan for centuries, probably arriving along the <b>Silk Road</b>.' },
      { kind: 'layers', title: 'Challenges and answers', rows: [
        { h: 'Summer rain', t: 'Humid summers and typhoons. High pergolas keep grapes airy; some bunches wear little paper hats.' },
        { h: 'Sur lie', t: 'Many Koshu rest on their lees for extra texture, like Muscadet.' },
        { h: 'Protected name', t: 'Yamanashi became a protected geographical indication in Japan in 2013.' },
      ] },
      { kind: 'facts', title: 'Elsewhere in Japan', rows: [{ k: 'Hokkaido', v: 'The cool north: rising Pinot Noir and crisp whites.' }] },
    ], [
      { type: 'choice', wines: ['koshu'], q: 'How did Koshu probably reach Japan?', options: ['Along the Silk Road', 'With Portuguese sailors', 'From California', 'It was bred in 1990'], answer: 0,
        explain: 'Grown in Japan for centuries.' },
      { type: 'choice', q: 'Why do some Koshu bunches wear little paper hats?', options: ['To shield them from rain', 'For decoration', 'To keep birds off', 'To ripen faster'], answer: 0,
        explain: 'Rain and humidity are the enemy.' },
      { type: 'choice', q: 'Koshu "sur lie" means it rested…', options: ['On its lees', 'In oak', 'In the sun', 'Underground'], answer: 0,
        explain: 'For extra texture.' },
      { type: 'choice', q: 'Japan\'s cool northern island, rising for Pinot Noir?', options: ['Hokkaido', 'Okinawa', 'Kyushu', 'Shikoku'], answer: 0,
        explain: 'Cool and promising.' },
    ]),
  });
})();
