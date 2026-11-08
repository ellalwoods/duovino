/* Track B · Part 3: Spain, Portugal, Austria, Germany.
 * Rules named here were checked (2026-11-08) against EU-published texts:
 *  - Rioja (OJ C 168, 2021): zones Rioja Alta, Rioja Alavesa, Rioja Oriental; "viñedo singular"; grapes incl. Tempranillo,
 *    Garnacha, Graciano, Mazuelo, Maturana, Viura, white Tempranillo.
 *  - Ribera del Duero (OJ C 268, 2023): reds ≥ 75% Tempranillo (Tinto Fino / Tinta del País); whites ≥ 75% Albillo Mayor.
 *  - Priorat (OJ C 316, 2019): "Denominación de Origen Calificada"; llicorella slate.
 *  - Toro (OJ C 118, 2021): reds ≥ 75% Tinta de Toro (or ≥ 85% Garnacha).
 *  - Bierzo (OJ C 148, 2020): vines ~75 years old on average; reds ≥ 85% Mencía (with Garnacha Tintorera etc.);
 *    Vino de Villa → Vino de Paraje → Viña Clasificada → Gran Viña Clasificada.
 *  - Jumilla (OJ C 74, 2022): Monastrell. Valdeorras, Rías Baixas, Rueda: see grapes files.
 *  - Cava (OJ C 369, 2021): Guarda; Guarda Superior = Reserva (≥ 18 months), Gran Reserva, Paraje Calificado, from organic
 *    vineyards ≥ 10 years old. Penedès (OJ C 199, 2022): Xarel·lo; long-aged traditional-method sparkling.
 *  - Jerez (C/2025/2129) and Manzanilla-Sanlúcar (C/2025/2130).
 *  - Porto (technical file PDO-PT-A1540-AM01): 19–22% (light dry white ≥ 16.5%); grape spirit ~77% stops fermentation;
 *    Vintage, LBV, Colheita (≥ 7 years in wood), age-indicated Tawny, Crusted, Reserva, Ruby, Tawny, White, Rosé;
 *    terraces; only leaves the Douro or the Vila Nova de Gaia entreposto.
 *  - Vinho Verde (C/2024/3412): granite soils, Atlantic winds, Alvarinho & Loureiro, Monção e Melgaço ("Origem do Alvarinho").
 *  - Dão (PDO-PT-A1534-AM01): Encruzado, Jaen, Touriga Nacional. Bairrada (OJ C 224, 2023): Baga, quality sparkling, Atlantic,
 *    between Vouga and Mondego rivers. Alentejo (PDO-PT-A1542-AM01): sub-regions incl. Borba, Évora, Reguengos, Vidigueira, Portalegre.
 *  - Wachau (OJ C 68, 2023), Kamptal (OJ C 295, 2020), Kremstal (OJ C 298, 2020): Grüner Veltliner and Riesling.
 *    Neusiedlersee (OJ C 68, 2023): Zweigelt; 300 km² lake, humidity, autumn fog; sweet wines mainly Welschriesling.
 *  - Mosel (OJ C 252, 2022): helicopter spraying on steep slopes. Pfalz (OJ C 272, 2022): Palatinate Forest/Haardt, Rhine, Alsace.
 *  - German sweetness terms: EU Reg. 2019/33 Annex III B. Feinherb has no legal definition. VDP tiers are a private association's.
 * Madeira's official text wasn't reachable: the lesson covers traditions and grapes only.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const R = (id, title, sub, lesson, questions, sources) => ({ id: 'b-' + id, title, sub, lesson, questions, ...(sources ? { sources } : {}) });

  Object.assign(D.regionLessons = D.regionLessons || {}, {

    /* ---------------- SPAIN ---------------- */
    'es-rioja': R('es-rioja', 'Rioja', 'Grapes, ageing tiers, sub-zones', [
      { kind: 'text', title: 'Three zones, one name', big: 'Alta · Alavesa · Oriental',
        body: 'Rioja follows the Ebro river through northern Spain. Most bottles are <b>blends across its three zones</b>, each adding something different.' },
      { kind: 'layers', title: 'The zones', rows: [
        { h: 'Rioja Alta', t: 'Atlantic influence: moderate alcohol, high acidity, made for barrel-ageing.' },
        { h: 'Rioja Alavesa', t: 'Sheltered by the Sierra de Cantabria, where Atlantic meets Mediterranean.' },
        { h: 'Rioja Oriental', t: 'The warm, sunny, Mediterranean south: riper, higher-alcohol wines.' },
      ] },
      { kind: 'facts', title: 'Grapes & labels', rows: [
        { k: 'Red grapes', v: 'Tempranillo leads; Garnacha, Graciano and Mazuelo (Carignan) add warmth, perfume and acidity.' },
        { k: 'White', v: 'Viura (Macabeo) leads, often oak-aged in the traditional style.' },
        { k: 'Viñedo Singular', v: 'A newer label term for wine from a single classified vineyard.' },
      ] },
    ], [
      { type: 'sort', wines: ['rioja'], q: 'Which Rioja zone?', buckets: ['Alta', 'Oriental'],
        items: [{ t: 'Atlantic influence', b: 0 }, { t: 'Warm Mediterranean south', b: 1 }, { t: 'High acidity', b: 0 }, { t: 'Riper, more alcohol', b: 1 }],
        explain: 'Alavesa sits in between, sheltered by the mountains.' },
      { type: 'choice', q: 'Most Rioja is…', options: ['A blend across zones and grapes', 'Always from one vineyard', 'Always white', 'Sparkling'], answer: 0,
        explain: 'Though Viñedo Singular wines are single-vineyard.' },
      { type: 'odd', q: 'Which is NOT a Rioja red grape?', options: ['Tempranillo', 'Graciano', 'Mazuelo', 'Nebbiolo'], answer: 3,
        explain: 'Nebbiolo is Piedmont\'s.' },
      { type: 'choice', q: 'White Rioja\'s main grape?', options: ['Viura', 'Albariño', 'Chardonnay', 'Godello'], answer: 0,
        explain: 'Also called Macabeo.' },
    ], ['Rioja DOCa: OJ C 168, 2021']),

    'es-ribera': R('es-ribera', 'Ribera del Duero', 'Tempranillo on a high plateau', [
      { kind: 'text', title: 'High, dry and extreme', big: 'Hot days, freezing nights',
        body: 'Ribera sits high on Castilla y León\'s plateau along the Duero river. <b>Sharp day–night temperature swings</b> give deeply coloured, structured reds.' },
      { kind: 'layers', title: 'The rules', rows: [
        { h: 'Reds', t: 'At least 75% Tempranillo, here called Tinto Fino or Tinta del País.' },
        { h: 'Whites', t: 'Ribera now makes whites too: at least 75% Albillo Mayor.' },
      ] },
    ], [
      { type: 'choice', wines: ['ribera'], q: 'A red Ribera del Duero must be at least… Tempranillo.', options: ['75%', '50%', '100%', '10%'], answer: 0,
        explain: 'Called Tinto Fino or Tinta del País here.' },
      { type: 'choice', q: 'Ribera\'s white wines are made mainly from…', options: ['Albillo Mayor', 'Verdejo', 'Viura', 'Chardonnay'], answer: 0,
        explain: 'At least 75%.' },
      { type: 'choice', q: 'What gives Ribera its colour and structure?', options: ['Big day–night temperature swings on a high plateau', 'Sea breezes', 'Volcanic soil', 'Fog'], answer: 0,
        explain: 'Remember the diurnal range (Roots 2.2).' },
    ], ['Ribera del Duero DO: OJ C 268, 2023']),

    'es-priorat': R('es-priorat', 'Priorat', 'Slate and old vines', [
      { kind: 'text', title: 'Dark, steep, stony', big: 'Llicorella',
        body: 'Priorat\'s steep hills in Catalonia are made of ancient, crumbly <b>slate</b> called <b>llicorella</b>. Roots dig deep through cracks for water. Yields are tiny; wines are dark, powerful and mineral.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Status', v: 'One of only two Spanish "Qualified" DOs (DOCa / DOQ), with Rioja.' },
        { k: 'Grapes', v: 'Old-vine Garnacha and Cariñena (Carignan).' },
        { k: 'Revival', v: 'Nearly abandoned after phylloxera; reborn from the 1980s.' },
      ] },
    ], [
      { type: 'choice', wines: ['priorat'], q: 'What is llicorella?', options: ['Priorat\'s crumbly slate', 'A grape', 'A barrel', 'A sweet wine'], answer: 0,
        explain: 'Roots dig deep through its cracks.' },
      { type: 'choice', q: 'Priorat\'s main grapes?', options: ['Garnacha and Cariñena', 'Tempranillo and Graciano', 'Albariño and Godello', 'Palomino'], answer: 0,
        explain: 'Old vines, tiny yields.' },
      { type: 'choice', q: 'Spain\'s two "Qualified" DOs (DOCa)?', options: ['Rioja and Priorat', 'Rioja and Ribera', 'Jerez and Toro', 'Cava and Rueda'], answer: 0,
        explain: 'Spain\'s top classification.' },
    ], ['Priorat DOQ: OJ C 316, 2019']),

    'es-toro': R('es-toro', 'Toro', 'Big and bold', [
      { kind: 'text', title: 'Spain\'s powerhouse', big: 'Tinta de Toro',
        body: 'Toro, on the Duero west of Ribera, is <b>hotter and drier</b>. Its local Tempranillo, <b>Tinta de Toro</b>, gives some of Spain\'s most <b>powerful</b>, deep and high-alcohol reds. Reds are at least 75% Tinta de Toro.' },
      { kind: 'text', title: 'Survivors', body: 'Sandy soils kept phylloxera away from some plots, so <b>very old, ungrafted vines</b> still grow here.' },
    ], [
      { type: 'choice', wines: ['toro'], q: 'Tinta de Toro is a local form of…', options: ['Tempranillo', 'Garnacha', 'Monastrell', 'Mencía'], answer: 0,
        explain: 'At least 75% of Toro\'s reds.' },
      { type: 'choice', q: 'Why do some Toro vines grow ungrafted?', options: ['Sandy soils kept phylloxera away', 'Grafting is banned', 'They\'re new', 'They\'re white grapes'], answer: 0,
        explain: 'Like Santorini\'s sand.' },
      { type: 'sort', q: 'Ribera or Toro?', buckets: ['Ribera', 'Toro'],
        items: [{ t: 'Tinto Fino', b: 0 }, { t: 'Tinta de Toro', b: 1 }, { t: 'Hotter and drier', b: 1 }, { t: 'Whites from Albillo Mayor', b: 0 }],
        explain: 'Neighbours on the Duero.' },
    ], ['Toro DO: OJ C 118, 2021']),

    'es-bierzo': R('es-bierzo', 'Bierzo', 'Mencía', [
      { kind: 'text', title: 'Old vines in a mountain bowl', big: 'Mencía on slate and quartz',
        body: 'Bierzo is a valley ringed by mountains in north-west Castilla y León. Its vineyards are old, about <b>75 years on average</b>. Reds are at least 85% Mencía (with a few local partners).' },
      { kind: 'layers', title: 'A Burgundy-style pyramid', rows: [
        { h: 'Bierzo', t: 'The whole region.' },
        { h: 'Vino de Villa', t: 'From one village.' },
        { h: 'Vino de Paraje', t: 'From a named site.' },
        { h: '(Gran) Viña Clasificada', t: 'The top single vineyards, with the lowest yields.' },
      ] },
    ], [
      { type: 'choice', wines: ['mencia'], q: 'Bierzo\'s red grape?', options: ['Mencía', 'Tempranillo', 'Monastrell', 'Garnacha only'], answer: 0,
        explain: 'At least 85% of the reds, with local partners.' },
      { type: 'order', q: 'Order Bierzo\'s tiers, from broad to most specific.', items: ['Bierzo', 'Vino de Villa', 'Vino de Paraje', 'Viña Clasificada'],
        explain: 'Like Burgundy: region, village, site, top vineyard.' },
      { type: 'choice', q: 'The average age of Bierzo\'s vines?', options: ['About 75 years', 'About 5 years', 'About 15 years', 'About 300 years'], answer: 0,
        explain: 'Old vines, concentrated wines.' },
    ], ['Bierzo DO: OJ C 148, 2020']),

    'es-valdeorras': R('es-valdeorras', 'Valdeorras', 'Godello', [
      { kind: 'text', title: 'Galicia\'s inland valley', big: '"Valley of gold"',
        body: 'Valdeorras follows the Sil river inland in Galicia; the Romans mined gold here. It led <b>Godello</b>\'s comeback. "Valdeorras Godello" on a label means 100% Godello.' },
      { kind: 'compare', title: 'Galicia: coast vs inland', cols: [
        { h: 'Rías Baixas (coast)', items: ['Rainy, Atlantic', 'Albariño: peachy, salty'] },
        { h: 'Valdeorras (inland)', items: ['Drier, warmer summers', 'Godello: rounder, mineral'] }] },
    ], [
      { type: 'choice', wines: ['godello'], q: '"Valdeorras Godello" on a label means…', options: ['100% Godello', 'At least half Godello', 'A Godello–Albariño blend', 'Sparkling'], answer: 0,
        explain: 'Godello only.' },
      { type: 'choice', q: 'Valdeorras means…', options: ['Valley of gold', 'Green valley', 'River of wine', 'High valley'], answer: 0,
        explain: 'The Romans mined gold there.' },
      { type: 'sort', q: 'Rías Baixas or Valdeorras?', buckets: ['Rías Baixas', 'Valdeorras'],
        items: [{ t: 'On the coast', b: 0 }, { t: 'Inland', b: 1 }, { t: 'Albariño', b: 0 }, { t: 'Godello', b: 1 }],
        explain: 'Galicia\'s two great whites.' },
    ], ['Valdeorras DO: C/2025/1383']),

    'es-riasbaixas': R('es-riasbaixas', 'Rías Baixas', 'Albariño', [
      { kind: 'text', title: 'Green Spain', big: 'Rain, granite, sea inlets',
        body: 'Rías Baixas lies on Galicia\'s Atlantic coast, where the sea pushes deep inland through <b>rías</b> (drowned river valleys). It\'s <b>green and rainy</b>, on granite. Vines are often trained high on <b>pergolas</b>, to let air flow under the grapes.' },
      { kind: 'facts', title: 'Sub-zones', rows: [
        { k: 'Val do Salnés', v: 'The coolest, by the sea: the classic, salty Albariño.' },
        { k: 'O Rosal & Condado do Tea', v: 'Along the Miño river, facing Portugal: blends with Loureiro and Treixadura.' },
      ] },
    ], [
      { type: 'choice', wines: ['albarino'], q: 'What is a "ría"?', options: ['A sea inlet: a drowned river valley', 'A grape', 'A hill', 'A barrel'], answer: 0,
        explain: 'The region is named after them.' },
      { type: 'choice', q: 'Why train vines high on pergolas here?', options: ['Air flow in a rainy climate', 'To dodge snow', 'To hide from the sun', 'For decoration'], answer: 0,
        explain: 'Air keeps rot away.' },
      { type: 'choice', q: 'Which sub-zone is coolest and closest to the sea?', options: ['Val do Salnés', 'Condado do Tea', 'O Rosal', 'Priorat'], answer: 0,
        explain: 'The classic Albariño.' },
    ], ['Rías Baixas DO: C/2024/7432']),

    'es-rueda': R('es-rueda', 'Rueda', 'Verdejo', [
      { kind: 'text', title: 'White wine on a high plateau', big: 'Up to 870 m',
        body: 'Rueda lies on the plateau of Castilla y León: long cold winters, late frosts, hot dry summers, and <b>stony</b> soils. It\'s <b>Verdejo</b>\'s home, with Sauvignon Blanc too. Harvest is often at night, to keep grapes cool.' },
      { kind: 'text', title: 'An old tradition', body: 'Rueda once made strong, Sherry-like wines aged in the air. A few are still made: <b>Dorado</b> (golden) and <b>Pálido</b> (pale).' },
    ], [
      { type: 'choice', wines: ['verdejo'], q: 'Rueda\'s signature grape?', options: ['Verdejo', 'Albariño', 'Godello', 'Viura'], answer: 0,
        explain: 'Herbal, citrus and fresh.' },
      { type: 'choice', q: 'Rueda Dorado is…', options: ['A traditional, Sherry-like aged wine', 'A sparkling wine', 'A red', 'A sweet icewine'], answer: 0,
        explain: 'With its sister Pálido.' },
      { type: 'choice', q: 'Why do Rueda\'s grapes stay fresh despite hot summers?', options: ['High altitude and cold nights', 'Sea breezes', 'Irrigation with snow', 'They\'re picked green'], answer: 0,
        explain: 'Up to 870 m on the plateau.' },
    ], ['Rueda DO: OJ C 69, 2020']),

    'es-jumilla': R('es-jumilla', 'Jumilla', 'Monastrell', [
      { kind: 'text', title: 'Hot, dry, south-east Spain', big: 'Monastrell\'s homeland',
        body: 'Jumilla, inland from Murcia, is <b>hot and dry</b>. Hardy <b>Monastrell</b> (Mourvèdre) thrives as low bush vines: dark, ripe, powerful reds, plus rosés and some sweet wines.' },
      { kind: 'text', title: 'Phylloxera came late', body: 'Phylloxera only reached Jumilla in the 1980s, a century after most of Europe, so many very old vines survived until then.' },
    ], [
      { type: 'choice', wines: ['jumilla'], q: 'Jumilla\'s grape?', options: ['Monastrell', 'Tempranillo', 'Albariño', 'Garnacha'], answer: 0,
        explain: 'Mourvèdre in France.' },
      { type: 'choice', q: 'Why bush vines in Jumilla?', options: ['They suit hot, dry, windy places', 'They\'re easier to machine-harvest', 'Tradition only', 'They need less sun'], answer: 0,
        explain: 'Remember Roots 2.4.' },
      { type: 'choice', q: 'When did phylloxera reach Jumilla?', options: ['The 1980s', 'The 1880s', 'Never', 'The 1700s'], answer: 0,
        explain: 'Very late.' },
    ], ['Jumilla DO: OJ C 74, 2022']),

    'es-penedes': R('es-penedes', 'Penedès & Cava', 'Spain\'s bubbles', [
      { kind: 'text', title: 'Cava\'s heartland', big: 'Traditional method',
        body: 'Most <b>Cava</b> is made in Penedès, near Barcelona, by the <b>traditional method</b> (second fermentation in bottle). The classic grapes are <b>Macabeo, Xarel·lo and Parellada</b>.' },
      { kind: 'layers', title: 'Cava\'s tiers', rows: [
        { h: 'Cava de Guarda', t: 'At least 9 months on the lees.' },
        { h: 'Reserva', t: 'At least 18 months.' },
        { h: 'Gran Reserva', t: 'Longer still.' },
        { h: 'Paraje Calificado', t: 'Single, classified sites.' },
      ] },
      { kind: 'text', title: 'Guarda Superior', body: 'Reserva, Gran Reserva and Paraje Calificado (together "Guarda Superior") must come from <b>organic</b> vineyards at least 10 years old.' },
    ], [
      { type: 'order', wines: ['cava'], q: 'Order these Cava tiers, shortest to longest ageing.', items: ['Cava de Guarda', 'Reserva', 'Gran Reserva'],
        explain: 'At least 9, then 18 months, then longer.' },
      { type: 'choice', q: 'Cava Reserva must spend at least… on its lees.', options: ['18 months', '9 months', '3 months', '10 years'], answer: 0,
        explain: 'Cava de Guarda needs 9.' },
      { type: 'odd', q: 'Which is NOT a classic Cava grape?', options: ['Macabeo', 'Xarel·lo', 'Parellada', 'Glera'], answer: 3,
        explain: 'Glera makes Prosecco.' },
      { type: 'choice', q: 'Guarda Superior Cavas must come from…', options: ['Organic vineyards at least 10 years old', 'Any vineyard', 'Only red grapes', 'Imported grapes'], answer: 0,
        explain: 'Reserva, Gran Reserva and Paraje Calificado.' },
    ], ['Cava DO: OJ C 369, 2021', 'Penedès DO: OJ C 199, 2022']),

    'es-jerez': R('es-jerez', 'Jerez / Sherry', 'The style names are the label key', [
      { kind: 'text', title: 'The Sherry triangle', big: 'Jerez · Sanlúcar · El Puerto',
        body: 'Sherry is aged in three towns in Andalucía, on white chalky <b>albariza</b> soil. Atlantic breezes keep the bodegas humid. <b>Manzanilla</b> is Fino aged in seaside Sanlúcar, where the flor grows thickest: extra light and salty.' },
      { kind: 'layers', title: 'Read the style', rows: [
        { h: 'Fino / Manzanilla', t: 'Only under flor: pale, bone dry, salty.' },
        { h: 'Amontillado', t: 'First under flor, then open to air: amber, nutty, dry.' },
        { h: 'Palo Cortado', t: 'Flor dies early; ages in air: rare, between Amontillado and Oloroso.' },
        { h: 'Oloroso', t: 'Only open to air: brown, rich, dry.' },
        { h: 'Pedro Ximénez', t: 'From sun-dried PX grapes: black, syrupy, very sweet.' },
      ] },
    ], [
      { type: 'order', q: 'Order from palest to darkest.', items: ['Fino', 'Amontillado', 'Oloroso', 'Pedro Ximénez'],
        explain: 'More air, darker wine; PX is darkest of all.' },
      { type: 'choice', wines: ['fino'], q: 'Manzanilla is…', options: ['Fino aged in seaside Sanlúcar', 'A sweet Sherry', 'A grape', 'A red wine'], answer: 0,
        explain: 'Extra light and salty.' },
      { type: 'sort', wines: ['oloroso'], q: 'Flor or no flor?', buckets: ['Under flor', 'Open to air'],
        items: [{ t: 'Fino', b: 0 }, { t: 'Oloroso', b: 1 }, { t: 'Manzanilla', b: 0 }],
        explain: 'Amontillado has both.' },
      { type: 'choice', q: 'Amontillado is aged…', options: ['First under flor, then open to air', 'Only under flor', 'Only open to air', 'In steel tanks'], answer: 0,
        explain: 'Pale start, nutty finish.' },
    ], ['Jerez-Xérès-Sherry: C/2025/2129', 'Manzanilla-Sanlúcar de Barrameda: C/2025/2130']),

    /* ---------------- PORTUGAL ---------------- */
    'pt-port': R('pt-port', 'Port', 'Ruby, tawny and vintage', [
      { kind: 'text', title: 'Stopped halfway', big: '19–22% · sweet · from the Douro',
        body: 'Port is fortified with grape spirit (about 77%) partway through fermentation, keeping natural grape sugar. It must be <b>19–22%</b> alcohol (light dry white Port can be lower). It may only leave the Douro, or the lodges of <b>Vila Nova de Gaia</b>, already bottled.' },
      { kind: 'layers', title: 'Two families', rows: [
        { h: 'Ruby family', t: 'Aged mainly in bottle or big vats: deep, fruity. Ruby, Reserva, Late Bottled Vintage (LBV), Vintage.' },
        { h: 'Tawny family', t: 'Aged in small wood: brown, nutty. Tawny, 10/20/30/40-year-old, Colheita.' },
      ] },
      { kind: 'facts', title: 'Single-year Ports', rows: [
        { k: 'Vintage', v: 'One exceptional year, bottled young; ages for decades and throws a crust.' },
        { k: 'LBV', v: 'One year, bottled later; ready sooner.' },
        { k: 'Colheita', v: 'A single-year tawny: at least 7 years in wood.' },
      ] },
    ], [
      { type: 'sort', wines: ['vintageport', 'tawny'], q: 'Ruby family or tawny family?', buckets: ['Ruby', 'Tawny'],
        items: [{ t: 'Vintage', b: 0 }, { t: 'Colheita', b: 1 }, { t: 'LBV', b: 0 }, { t: '20-year-old', b: 1 }],
        explain: 'Bottle or big vat vs small wood.' },
      { type: 'choice', q: 'A Colheita Port is…', options: ['A single-year tawny, at least 7 years in wood', 'A young ruby', 'A white Port', 'Sparkling'], answer: 0,
        explain: 'Tawny style, one vintage.' },
      { type: 'choice', q: 'Port must be between…', options: ['19% and 22% alcohol', '5% and 8%', '12% and 14%', '30% and 40%'], answer: 0,
        explain: 'Light dry white Port is the exception.' },
      { type: 'choice', q: 'Where are Port\'s famous lodges?', options: ['Vila Nova de Gaia', 'Lisbon', 'Madeira', 'Jerez'], answer: 0,
        explain: 'Across the river from Porto.' },
    ], ['Porto PDO: technical file PDO-PT-A1540-AM01']),

    'pt-douro': R('pt-douro', 'Douro', 'Terraces above the river', [
      { kind: 'text', title: 'Carved into the hills', big: 'Schist, heat, terraces',
        body: 'The Douro valley is steep, hot and dry, on <b>schist</b>. Over centuries, growers carved the slopes into <b>terraces</b>: old walled <i>socalcos</i>, and wider modern <i>patamares</i>.' },
      { kind: 'layers', title: 'Up the river', rows: [
        { h: 'Baixo Corgo', t: 'West: the coolest and wettest.' },
        { h: 'Cima Corgo', t: 'The heart: most of the famous quintas (estates).' },
        { h: 'Douro Superior', t: 'East, towards Spain: the hottest and driest.' },
      ] },
      { kind: 'text', title: 'Not just Port', body: 'The same grapes (Touriga Nacional, Touriga Franca, Tinta Roriz) now make powerful <b>dry red</b> Douro DOC wines, often from old field blends.' },
    ], [
      { type: 'choice', wines: ['dourored'], q: 'The Douro\'s soil?', options: ['Schist', 'Chalk', 'Volcanic sand', 'Clay'], answer: 0,
        explain: 'Steep, hard and heat-storing.' },
      { type: 'order', q: 'Order the Douro\'s sub-regions from west to east.', items: ['Baixo Corgo', 'Cima Corgo', 'Douro Superior'],
        explain: 'Hotter and drier as you head east.' },
      { type: 'choice', q: 'A "quinta" is…', options: ['A wine estate', 'A terrace', 'A grape', 'A barrel'], answer: 0,
        explain: 'Most of the famous ones are in Cima Corgo.' },
    ], ['Porto PDO technical file (terraces)']),

    'pt-vinhoverde': R('pt-vinhoverde', 'Vinho Verde', 'Green wine, fresh wine', [
      { kind: 'text', title: '"Green" means young', big: 'Granite, rain, Atlantic winds',
        body: 'Vinho Verde is in Portugal\'s rainy north-west, on <b>granite</b>, with Atlantic winds funnelling up the river valleys. "Verde" means <b>young and fresh</b>, not green in colour: whites, rosés and even reds.' },
      { kind: 'facts', title: 'Grapes', rows: [
        { k: 'Loureiro', v: 'Floral and citrus.' },
        { k: 'Alvarinho', v: 'Fuller and peachy; from Monção e Melgaço, which can use "Origem do Alvarinho" on its labels.' },
        { k: 'Style', v: 'Classic Vinho Verde is light, low in alcohol and often has a slight spritz.' },
      ] },
    ], [
      { type: 'choice', wines: ['vinhoverde'], q: 'What does "verde" mean in Vinho Verde?', options: ['Young and fresh', 'Green in colour', 'Made from green grapes only', 'Organic'], answer: 0,
        explain: 'There are even red Vinhos Verdes.' },
      { type: 'choice', q: 'Which sub-region is home to Alvarinho?', options: ['Monção e Melgaço', 'Douro Superior', 'Dão', 'Alentejo'], answer: 0,
        explain: 'It can say "Origem do Alvarinho".' },
      { type: 'choice', q: 'Vinho Verde\'s main soil?', options: ['Granite', 'Chalk', 'Schist only', 'Sand'], answer: 0,
        explain: 'With narrow strips of schist.' },
    ], ['Vinho Verde DO: C/2024/3412']),

    'pt-dao': R('pt-dao', 'Dão', 'Granite and elegance', [
      { kind: 'text', title: 'Ringed by mountains', big: 'Portugal\'s Burgundy?',
        body: 'The Dão is a granite plateau ringed by mountains that block both Atlantic rain and hot inland winds. It makes some of Portugal\'s most <b>elegant</b> reds and whites.' },
      { kind: 'facts', title: 'Grapes', rows: [
        { k: 'Touriga Nacional', v: 'Thought to come from here: perfumed, violet.' },
        { k: 'Jaen', v: 'Spain\'s Mencía: fresh red fruit.' },
        { k: 'Encruzado', v: 'The star white: textured, citrus, nutty with age.' },
      ] },
    ], [
      { type: 'choice', wines: ['dao'], q: 'The Dão\'s star white grape?', options: ['Encruzado', 'Alvarinho', 'Arinto', 'Loureiro'], answer: 0,
        explain: 'Textured, nutty with age.' },
      { type: 'choice', q: 'In the Dão, Mencía is called…', options: ['Jaen', 'Touriga', 'Baga', 'Castelão'], answer: 0,
        explain: 'Remember Mencía\'s lesson.' },
      { type: 'choice', q: 'What protects the Dão?', options: ['A ring of mountains', 'The sea', 'A lake', 'Forests'], answer: 0,
        explain: 'Blocking rain and hot winds.' },
    ], ['Dão DO: PDO-PT-A1534-AM01']),

    'pt-bairrada': R('pt-bairrada', 'Bairrada', 'Baga and bubbles', [
      { kind: 'text', title: 'Flat, Atlantic, clay', big: 'Between the Vouga and the Mondego',
        body: 'Bairrada is low and gently rolling near the Atlantic, with cool, rainy winters. Its signature red grape <b>Baga</b> gives high acidity and fierce tannin; it also makes much of Portugal\'s <b>quality sparkling wine</b>.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Baga', v: 'Like Nebbiolo: high acid, big tannin, ages for decades.' },
        { k: 'Clássico', v: 'A label term for wines from traditional local grapes and lower yields.' },
        { k: 'Food', v: 'Leitão: roast suckling pig, with sparkling Bairrada.' },
      ] },
    ], [
      { type: 'choice', wines: ['baga'], q: 'Bairrada\'s red grape?', options: ['Baga', 'Touriga Nacional', 'Tempranillo', 'Castelão'], answer: 0,
        explain: 'High acid, big tannin.' },
      { type: 'choice', q: 'Bairrada is also known for…', options: ['Quality sparkling wine', 'Fortified wine', 'Icewine', 'Amber wine'], answer: 0,
        explain: 'Perfect with leitão.' },
      { type: 'choice', q: '"Clássico" on a Bairrada label means…', options: ['Traditional local grapes and lower yields', 'Aged 20 years', 'Sweet', 'Made by a monastery'], answer: 0,
        explain: 'A newer quality term.' },
    ], ['Bairrada DO: OJ C 224, 2023']),

    'pt-alentejo': R('pt-alentejo', 'Alentejo', 'Hot plains and clay pots', [
      { kind: 'text', title: 'Portugal\'s south', big: 'Cork oaks and sunshine',
        body: 'The Alentejo is a vast, <b>hot, dry</b> plain dotted with <b>cork oaks</b> (Portugal supplies much of the world\'s cork). It makes ripe, generous reds and soft whites.' },
      { kind: 'layers', title: 'Good to know', rows: [
        { h: 'Sub-regions', t: 'Borba, Évora, Reguengos, Vidigueira and Portalegre (the cooler, higher north-east) among others.' },
        { h: 'Talha', t: 'Wine fermented in huge clay amphorae, a Roman tradition kept alive here.' },
        { h: 'Grapes', t: 'Aragonez (Tempranillo), Trincadeira, Alicante Bouschet; Antão Vaz for whites.' },
      ] },
    ], [
      { type: 'choice', wines: ['alentejo'], q: 'What is talha wine?', options: ['Wine fermented in big clay amphorae', 'Fortified wine', 'Sparkling wine', 'Icewine'], answer: 0,
        explain: 'A Roman tradition.' },
      { type: 'choice', q: 'The Alentejo\'s landscape is famous for…', options: ['Cork oaks', 'Volcanoes', 'Glaciers', 'Rice fields'], answer: 0,
        explain: 'Portugal supplies much of the world\'s cork.' },
      { type: 'choice', q: 'Aragonez is another name for…', options: ['Tempranillo', 'Grenache', 'Touriga Nacional', 'Baga'], answer: 0,
        explain: 'Also Tinta Roriz in the Douro.' },
    ], ['Alentejo DO: PDO-PT-A1542-AM01']),

    'pt-madeira': R('pt-madeira', 'Madeira', 'Cooked, oxidised, immortal', [
      { kind: 'text', title: 'A wine made by heat', big: 'Heat · air · time',
        body: 'Madeira is fortified, then deliberately <b>heated and exposed to air</b>, a habit born when barrels crossed the tropics on ships. The result barely changes once opened and can last <b>centuries</b>.' },
      { kind: 'compare', title: 'Two ways to heat it', cols: [
        { h: 'Estufagem', items: ['Heated in tanks for months', 'Quicker, for everyday Madeira'] },
        { h: 'Canteiro', items: ['Barrels warmed in lofts by the sun', 'Slow, for the finest'] }] },
      { kind: 'layers', title: 'The grapes, driest to sweetest', rows: [
        { h: 'Sercial', t: 'Dry, razor-sharp.' },
        { h: 'Verdelho', t: 'Medium dry.' },
        { h: 'Boal (Bual)', t: 'Medium rich.' },
        { h: 'Malvasia (Malmsey)', t: 'Rich and sweet.' },
      ] },
    ], [
      { type: 'order', wines: ['sercial', 'malmsey'], q: 'Order the Madeira grapes, driest to sweetest.', items: ['Sercial', 'Verdelho', 'Boal', 'Malmsey'],
        explain: 'All keep a streak of acidity.' },
      { type: 'sort', q: 'Estufagem or canteiro?', buckets: ['Estufagem', 'Canteiro'],
        items: [{ t: 'Heated tanks', b: 0 }, { t: 'Sun-warmed lofts', b: 1 }, { t: 'Quicker', b: 0 }, { t: 'For the finest', b: 1 }],
        explain: 'Fast vs slow heat.' },
      { type: 'choice', q: 'Why did Madeira come to be heated?', options: ['Barrels were "cooked" crossing the tropics by ship, and people liked it', 'To kill phylloxera', 'To make bubbles', 'By law in 1999'], answer: 0,
        explain: 'Now it\'s done on purpose.' },
    ]),

    /* ---------------- AUSTRIA ---------------- */
    'at-wachau': R('at-wachau', 'Wachau', 'Steinfeder, Federspiel, Smaragd', [
      { kind: 'text', title: 'Terraces on the Danube', big: 'Grüner Veltliner & Riesling',
        body: 'The Wachau\'s <b>steep stone terraces</b> line the Danube. Atlantic and warm Pannonian climates meet here; cool night winds from the north keep wines fresh. Its DAC wines are <b>Grüner Veltliner and Riesling</b>.' },
      { kind: 'layers', title: 'The growers\' own ladder', rows: [
        { h: 'Steinfeder', t: 'The lightest: named after a feathery grass on the terraces.' },
        { h: 'Federspiel', t: 'Medium: named after a falconry lure.' },
        { h: 'Smaragd', t: 'The ripest and richest: named after an emerald-green lizard.' },
      ] },
      { kind: 'text', title: 'Whose rule?', body: 'These three names belong to a <b>growers\' association</b> (Vinea Wachau), not to the law.' },
    ], [
      { type: 'order', wines: ['gruner'], q: 'Order the Wachau styles, lightest to richest.', items: ['Steinfeder', 'Federspiel', 'Smaragd'],
        explain: 'Grass, falconry, lizard.' },
      { type: 'choice', q: 'Smaragd is named after…', options: ['An emerald-green lizard', 'A mountain', 'A monk', 'A river'], answer: 0,
        explain: 'Basking on the warm terrace walls.' },
      { type: 'choice', q: 'Wachau DAC wines are made from…', options: ['Grüner Veltliner and Riesling', 'Zweigelt', 'Blaufränkisch', 'Chardonnay'], answer: 0,
        explain: 'Austria\'s great whites.' },
      { type: 'choice', q: 'Who defines Steinfeder, Federspiel and Smaragd?', options: ['A growers\' association', 'EU law', 'The Austrian army', 'Nobody'], answer: 0,
        explain: 'Vinea Wachau.' },
    ], ['Wachau DAC: OJ C 68, 2023']),

    'at-kamptal': R('at-kamptal', 'Kamptal & Kremstal', 'Grüner and Riesling, next door', [
      { kind: 'text', title: 'Two DACs, two grapes', big: 'Only Grüner Veltliner or Riesling',
        body: 'Just east of the Wachau, along the Kamp and Krems rivers. Wines labelled <b>Kamptal DAC</b> or <b>Kremstal DAC</b> must be <b>Grüner Veltliner or Riesling</b>.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Heiligenstein', v: 'Kamptal\'s most famous hill, prized for Riesling.' },
        { k: 'Krems', v: 'A historic wine town on the Danube.' },
        { k: 'Styles', v: 'Fruity and mineral, from light to rich single-vineyard (Ried) wines.' },
      ] },
    ], [
      { type: 'choice', wines: ['gruner'], q: 'A Kamptal DAC wine must be…', options: ['Grüner Veltliner or Riesling', 'Zweigelt', 'Any grape', 'Sweet'], answer: 0,
        explain: 'Same rule in Kremstal.' },
      { type: 'choice', q: '"Ried" on an Austrian label means…', options: ['A single vineyard', 'Sweet', 'Red', 'Reserve'], answer: 0,
        explain: 'Like a cru.' },
      { type: 'choice', q: 'Heiligenstein is famous for…', options: ['Riesling', 'Red wine', 'Icewine', 'Sparkling'], answer: 0,
        explain: 'Kamptal\'s star hill.' },
    ], ['Kamptal DAC: OJ C 295, 2020', 'Kremstal DAC: OJ C 298, 2020']),

    'at-burgenland': R('at-burgenland', 'Burgenland', 'Blaufränkisch & sweet wines', [
      { kind: 'text', title: 'Austria\'s warm east', big: 'Pannonian heat',
        body: 'Burgenland, by the Hungarian border, is Austria\'s <b>red-wine</b> country: hot, dry summers, cold winters.' },
      { kind: 'layers', title: 'Where and what', rows: [
        { h: 'Mittelburgenland', t: 'Blaufränkisch only.' },
        { h: 'Neusiedlersee', t: 'Zweigelt reds, and sweet wines mainly from Welschriesling.' },
        { h: 'Leithaberg', t: 'Limestone and schist hills: elegant whites and Blaufränkisch.' },
      ] },
      { kind: 'try', title: 'The lake effect', body: 'The Neusiedlersee is a vast, shallow lake, about 300 km²…',
        prompt: 'Why does it make great sweet wine?',
        reveal: 'Humidity and <b>autumn fog</b> from the lake bring <b>noble rot</b>, while it also stores summer heat.' },
    ], [
      { type: 'choice', wines: ['zweigelt'], q: 'Neusiedlersee DAC reds are made from…', options: ['Zweigelt', 'Blaufränkisch', 'Pinot Noir', 'Merlot'], answer: 0,
        explain: 'Mittelburgenland is the Blaufränkisch one.' },
      { type: 'choice', q: 'Why is Neusiedlersee great for sweet wine?', options: ['Lake fog brings noble rot', 'It freezes every night', 'Grapes are dried indoors', 'Spirit is added'], answer: 0,
        explain: 'Like Sauternes\'s river mists.' },
      { type: 'sort', q: 'Which Burgenland area?', buckets: ['Mittelburgenland', 'Neusiedlersee'],
        items: [{ t: 'Blaufränkisch only', b: 0 }, { t: 'Zweigelt', b: 1 }, { t: 'Sweet Welschriesling', b: 1 }],
        explain: 'Two DACs, two specialities.' },
    ], ['Neusiedlersee DAC: OJ C 68, 2023', 'Mittelburgenland DAC: OJ C 286, 2020']),

    /* ---------------- GERMANY ---------------- */
    'de-label': R('de-label', 'Reading a German label', 'Prädikat, region, grape', [
      { kind: 'label', title: 'A German label', body: 'Tap the underlined words.',
        label: { style: 'germany', lines: [
          [s('Weingut Kessler', 'producer', { note: 'Weingut: wine estate.' })],
          [s('Riesling', 'grape', { big: true, note: 'The grape.' })],
          [s('Spätlese', 'pradikat', { note: 'A Prädikat: picked riper. Not automatically sweet!' })],
          [s('Mosel', 'region', { note: 'One of Germany\'s 13 wine regions.' })],
          [s('trocken', 'dry', { note: 'Dry. Without it, a Spätlese is often sweet.' })],
        ] } },
      { kind: 'layers', title: 'The Prädikat ladder (ripeness at harvest)', rows: [
        { h: 'Kabinett', t: 'The lightest.' },
        { h: 'Spätlese', t: '"Late harvest": riper.' },
        { h: 'Auslese', t: 'Selected very ripe bunches.' },
        { h: 'Beerenauslese (BA)', t: 'Selected overripe berries, often nobly rotten: sweet.' },
        { h: 'Trockenbeerenauslese (TBA)', t: 'Shrivelled, nobly rotten berries: intensely sweet.' },
        { h: 'Eiswein', t: 'Grapes frozen on the vine.' },
      ] },
      { kind: 'text', title: 'Ripeness, not sweetness', body: 'The Prädikat tells you how <b>ripe</b> the grapes were. A Kabinett or Spätlese can be <b>dry or sweet</b>: look for "trocken".' },
    ], [
      { type: 'order', wines: ['moselriesling'], q: 'Order the Prädikats from least to most ripe.', items: ['Kabinett', 'Spätlese', 'Auslese', 'Beerenauslese', 'Trockenbeerenauslese'],
        explain: 'Eiswein sits apart: frozen grapes.' },
      { type: 'choice', q: 'A Prädikat tells you mainly about…', options: ['Ripeness at harvest', 'Sweetness in the bottle', 'Alcohol', 'Price'], answer: 0,
        explain: 'A Spätlese trocken is dry.' },
      { type: 'label', q: 'Tap the word that tells you this wine is dry.',
        label: { style: 'germany', lines: [[s('Weingut Kessler', 'producer')], [s('Riesling', 'grape', { big: true })], [s('Kabinett', 'pradikat')], [s('trocken', 'dry')]] }, answer: 'dry',
        explain: '"Trocken" means dry.' },
      { type: 'choice', q: 'How many German wine regions are there?', options: ['13', '3', '51', '100'], answer: 0,
        explain: 'Mosel, Rheingau, Pfalz and ten more.' },
    ]),

    'de-mosel': R('de-mosel', 'Mosel', 'Slate, slopes and Riesling', [
      { kind: 'text', title: 'The steepest vineyards', big: 'Slate · rivers · Riesling',
        body: 'The Mosel twists between dramatic <b>slate</b> slopes, some of the steepest vineyards in the world, so steep that some are sprayed by <b>helicopter</b>. The dark slate stores heat; the river reflects light. Riesling rules.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Saar & Ruwer', v: 'Two cooler side valleys, part of the Mosel region: racy, steely Riesling.' },
        { k: 'Style', v: 'Light, low in alcohol, high in acidity: often off-dry or sweet, with apple, peach and slate.' },
        { k: 'Famous villages', v: 'Bernkastel, Piesport, Wehlen, Ürzig.' },
      ] },
    ], [
      { type: 'choice', wines: ['moselriesling'], q: 'The Mosel\'s famous soil?', options: ['Slate', 'Chalk', 'Volcanic sand', 'Granite'], answer: 0,
        explain: 'Dark and heat-storing.' },
      { type: 'choice', q: 'Why are some Mosel vineyards sprayed by helicopter?', options: ['They\'re too steep for tractors', 'Tradition', 'To scare birds', 'For speed only'], answer: 0,
        explain: 'Among the steepest anywhere.' },
      { type: 'choice', q: 'The Saar and Ruwer are…', options: ['Cooler side valleys in the Mosel region', 'Grapes', 'Sweet wines', 'Producers'], answer: 0,
        explain: 'Racy, steely Riesling.' },
    ], ['Mosel PDO: OJ C 252, 2022']),

    'de-rheingau': R('de-rheingau', 'Rheingau & Pfalz', 'Classic and sunny', [
      { kind: 'compare', title: 'Two different regions', cols: [
        { h: 'Rheingau', items: ['Where the Rhine flows west, vines face south', 'Sheltered by the Taunus hills', 'Classic, firm Riesling'] },
        { h: 'Pfalz', items: ['Sheltered by the Palatinate Forest', 'Warm and sunny, next to Alsace', 'Riper Riesling, plus Pinots and reds'] }] },
      { kind: 'try', title: 'A late messenger', body: 'In 1775, the courier bringing permission to start the harvest at Schloss Johannisberg arrived weeks late…',
        prompt: 'What happened to the grapes?',
        reveal: 'They\'d begun to rot, but the wine was a revelation: the legend of <b>Spätlese</b>, "late harvest", was born.' },
    ], [
      { type: 'sort', wines: ['rheingauriesling'], q: 'Rheingau or Pfalz?', buckets: ['Rheingau', 'Pfalz'],
        items: [{ t: 'Taunus hills', b: 0 }, { t: 'Palatinate Forest', b: 1 }, { t: 'Next to Alsace', b: 1 }, { t: 'Rhine flows west', b: 0 }],
        explain: 'Two famous neighbours.' },
      { type: 'choice', q: 'The Spätlese legend began at…', options: ['Schloss Johannisberg, Rheingau', 'Bernkastel', 'Champagne', 'Tokaj'], answer: 0,
        explain: 'A late courier, 1775.' },
      { type: 'choice', q: 'Why do Rheingau vines face south?', options: ['The Rhine turns to flow west there', 'They were replanted', 'Law', 'They don\'t'], answer: 0,
        explain: 'A long, sunny, south-facing slope.' },
    ], ['Pfalz PDO: OJ C 272, 2022']),

    'de-trocken': R('de-trocken', 'Trocken & feinherb', 'How sweet is it?', [
      { kind: 'layers', title: 'Sweetness words', rows: [
        { h: 'Trocken', t: 'Dry (EU definition). Up to 4 g/l of sugar, or up to 9 g/l if the acidity is high enough to balance it.' },
        { h: 'Halbtrocken', t: 'Off-dry (also an EU term).' },
        { h: 'Feinherb', t: 'Off-dry too, but with no legal definition: each producer decides.' },
        { h: 'Lieblich / süß', t: 'Medium-sweet / sweet.' },
      ] },
      { kind: 'try', title: 'Why the acidity rule?', body: 'A Riesling with 9 g/l of sugar can still taste dry…',
        prompt: 'How?',
        reveal: 'Its <b>high acidity</b> balances the sugar, so you hardly notice it (Roots 1.2: balance).' },
    ], [
      { type: 'order', q: 'Order the German sweetness words, driest to sweetest.', items: ['Trocken', 'Halbtrocken', 'Lieblich', 'Süß'],
        explain: 'Feinherb sits around halbtrocken, unofficially.' },
      { type: 'choice', q: 'Which sweetness term has no legal definition?', options: ['Feinherb', 'Trocken', 'Halbtrocken', 'Süß'], answer: 0,
        explain: 'Each producer decides.' },
      { type: 'choice', q: 'Why can a "trocken" wine have up to 9 g/l of sugar?', options: ['High acidity balances it', 'It\'s a mistake', 'Sugar evaporates', 'Only for reds'], answer: 0,
        explain: 'Otherwise the limit is 4 g/l.' },
    ], ['EU Reg. 2019/33, Annex III B']),

    'de-vdp': R('de-vdp', 'VDP tiers & GG', 'Germany\'s top estates', [
      { kind: 'text', title: 'The eagle on the capsule', big: 'VDP: a club of top estates',
        body: 'The <b>VDP</b> is a private association of about 200 leading German estates (look for the eagle on the bottle neck). It ranks vineyards like Burgundy does.' },
      { kind: 'layers', title: 'The VDP pyramid', rows: [
        { h: 'Gutswein', t: 'Estate wine.' },
        { h: 'Ortswein', t: 'Village wine.' },
        { h: 'Erste Lage', t: 'A first-class vineyard.' },
        { h: 'Grosse Lage', t: 'A great vineyard: the top.' },
        { h: 'Grosses Gewächs (GG)', t: 'A dry wine from a Grosse Lage. The finest dry Rieslings and Pinots.' },
      ] },
    ], [
      { type: 'order', wines: ['gg'], q: 'Order the VDP tiers, base to top.', items: ['Gutswein', 'Ortswein', 'Erste Lage', 'Grosse Lage'],
        explain: 'Estate, village, first-class, great.' },
      { type: 'choice', q: 'GG on a label means…', options: ['A dry wine from a Grosse Lage', 'A sweet wine', 'Sparkling', 'Grape juice'], answer: 0,
        explain: 'Grosses Gewächs.' },
      { type: 'choice', q: 'The VDP is…', options: ['A private association of top estates', 'German wine law', 'A grape', 'A region'], answer: 0,
        explain: 'Look for the eagle.' },
    ]),

    'de-spatburgunder': R('de-spatburgunder', 'Spätburgunder', 'German Pinot Noir', [
      { kind: 'text', title: 'Germany\'s red star', big: 'Pinot Noir, German style',
        body: '<b>Spätburgunder</b> is Pinot Noir. Germany is one of the world\'s biggest Pinot Noir growers, and warmer summers have made it excellent: fragrant, silky, red-fruited.' },
      { kind: 'facts', title: 'Where to find it', rows: [
        { k: 'Baden', v: 'Germany\'s warmest, southernmost region.' },
        { k: 'Ahr', v: 'A tiny, steep, northern valley, mostly red.' },
        { k: 'Pfalz', v: 'Warm and sunny: riper styles.' },
        { k: 'Frühburgunder', v: 'An early-ripening Pinot Noir mutation.' },
      ] },
    ], [
      { type: 'choice', wines: ['spatburgunder'], q: 'Spätburgunder is…', options: ['Pinot Noir', 'Riesling', 'Blaufränkisch', 'Merlot'], answer: 0,
        explain: 'Germany\'s red star.' },
      { type: 'choice', q: 'Germany\'s warmest wine region?', options: ['Baden', 'Mosel', 'Ahr', 'Rheingau'], answer: 0,
        explain: 'In the south-west.' },
      { type: 'choice', q: 'Frühburgunder is…', options: ['An early-ripening Pinot Noir mutation', 'A white grape', 'A region', 'A sweet wine'], answer: 0,
        explain: '"Früh" means early.' },
    ]),
  });
})();
