/* Track B · Part 3: the New World.
 * Label rules checked (2026-11-08) against official texts:
 *  - USA, 27 CFR §4.23, §4.25, §4.27 (eCFR): variety ≥ 75%; state/county appellation ≥ 75%; AVA ≥ 85%;
 *    vintage ≥ 95% with an AVA, ≥ 85% otherwise.
 *  - Australia, EU–Australia wine agreement (OJ L 28, 30.1.2009): GI, variety and vintage each ≥ 85%.
 *  - South Africa, EU–South Africa wine agreement (OJ L 28, 30.1.2002): variety ≥ 85%.
 *  - Ontario VQA, O. Reg. 406/00: vintage ≥ 85%; viticultural area ≥ 85%; vinifera only, except Vidal for Icewine;
 *    Niagara sub-appellations incl. Beamsville Bench, Twenty Mile Bench, Short Hills Bench, St. David's Bench.
 * Chile, Argentina and New Zealand texts weren't reachable: no percentages are stated for them.
 * Everything else here is place, grape and history, not law.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const R = (id, title, sub, lesson, questions, sources) => ({ id: 'b-' + id, title, sub, lesson, questions, ...(sources ? { sources } : {}) });
  const q = (type, text, options, answer, explain, extra = {}) => ({ type, q: text, options, answer, explain, ...extra });
  const srt = (text, buckets, items, explain, extra = {}) => ({ type: 'sort', q: text, buckets, items: items.map(([t, b]) => ({ t, b })), explain, ...extra });

  Object.assign(D.regionLessons = D.regionLessons || {}, {

    'nw-rules': R('nw-rules', 'Grape first, place second', 'Percentage rules for variety, vintage and region', [
      { kind: 'label', title: 'A New World label', body: 'Tap the underlined words.',
        label: { style: 'generic', lines: [
          [s('Redwood Ridge', 'producer', { note: 'The producer.' })],
          [s('Cabernet Sauvignon', 'grape', { big: true, note: 'The grape comes first. In the USA it must be at least 75% of the wine.' })],
          [s('Napa Valley', 'ava', { note: 'An AVA (American Viticultural Area): at least 85% of the grapes must come from here.' })],
          [s('2021', 'vintage', { note: 'With an AVA, at least 95% must come from this year.' })],
        ] } },
      { kind: 'text', title: 'Rules about where, not how', big: 'Few rules on grapes or methods',
        body: 'New World place names (AVAs, GIs) mostly just draw a <b>boundary</b>. Unlike an AOC, they rarely dictate which grapes, yields or methods to use. The label rules are about <b>percentages</b>.' },
      { kind: 'layers', title: 'The percentages', rows: [
        { h: 'USA', t: 'Grape ≥ 75%. State or county ≥ 75%. AVA ≥ 85%. Vintage ≥ 95% (with an AVA).' },
        { h: 'Australia', t: 'The 85% rule: grape, region and vintage each at least 85%.' },
        { h: 'South Africa', t: 'Grape at least 85%.' },
        { h: 'Canada (Ontario VQA)', t: 'Vintage and viticultural area at least 85%.' },
      ] },
    ], [
      q('choice', 'A US wine labelled "Merlot" must be at least… Merlot.', ['75%', '85%', '100%', '51%'], 0, 'Australia and South Africa require 85%.', { wines: ['merlot'] }),
      q('choice', 'A US wine labelled with an AVA must be at least… from that AVA.', ['85%', '75%', '50%', '100%'], 0, 'A state or county name needs only 75%.'),
      q('choice', 'Australia\'s "85% rule" covers…', ['Grape, region and vintage', 'Only alcohol', 'Only sweetness', 'Only price'], 0, 'Each at least 85%.'),
      q('choice', 'How do most New World place names differ from an AOC?', ['They draw a boundary but rarely dictate grapes or methods', 'They are stricter about grapes', 'They ban oak', 'They don\'t exist'], 0, 'Freedom to plant and make what you like.'),
    ], ['27 CFR §4.23, §4.25, §4.27', 'EU–Australia wine agreement, OJ L 28, 2009', 'EU–South Africa wine agreement, OJ L 28, 2002', 'Ontario O. Reg. 406/00']),

    /* ---------------- CALIFORNIA ---------------- */
    'us-napa': R('us-napa', 'Napa Valley', 'Cabernet country', [
      { kind: 'text', title: 'A small valley, a big name', big: 'Fog in the south, heat in the north',
        body: 'Napa is a narrow valley north of San Francisco. Cool <b>fog and breezes</b> from San Pablo Bay reach the south (Carneros: Pinot Noir, Chardonnay); the north (Calistoga) is <b>hot</b>. In between, <b>Cabernet Sauvignon</b> rules.' },
      { kind: 'compare', title: 'Valley floor vs mountains', cols: [
        { h: 'Valley floor', items: ['Rutherford, Oakville, Stags Leap District', 'Deeper soils, plush, ripe Cabernet'] },
        { h: 'Mountains', items: ['Howell Mountain, Mount Veeder', 'Above the fog, thin soils', 'Firmer tannin, more structure'] }] },
      { kind: 'try', title: '1976', body: 'In a blind tasting in Paris, French judges tasted top Bordeaux and Burgundy against unknown Californians…',
        prompt: 'What happened?',
        reveal: 'A Napa <b>Cabernet</b> and a Napa <b>Chardonnay</b> came top. The "Judgment of Paris" put California on the world map.' },
    ], [
      q('choice', 'Which end of Napa is cooled by fog from San Pablo Bay?', ['The south (Carneros)', 'The north (Calistoga)', 'Neither', 'Both equally'], 0, 'Carneros grows Pinot Noir and Chardonnay.', { wines: ['napacab'] }),
      srt('Valley floor or mountain?', ['Valley floor', 'Mountain'], [['Rutherford', 0], ['Howell Mountain', 1], ['Above the fog', 1], ['Plush and ripe', 0]], 'Height changes the style.'),
      q('choice', 'The 1976 "Judgment of Paris"…', ['Saw Napa wines beat top French wines blind', 'Banned Napa wine in France', 'Created the AVA system', 'Was a cooking contest'], 0, 'A turning point for California.'),
    ]),

    'us-sonoma': R('us-sonoma', 'Sonoma', 'Napa\'s bigger, cooler neighbour', [
      { kind: 'text', title: 'Many climates in one county', big: 'From foggy coast to warm valleys',
        body: 'Sonoma is bigger and more varied than Napa. Pacific fog pours in through gaps in the coastal hills, so it has some of California\'s <b>coolest</b> and <b>warmest</b> spots side by side.' },
      { kind: 'facts', title: 'Key valleys', rows: [
        { k: 'Russian River Valley', v: 'Foggy mornings: Pinot Noir and Chardonnay.' },
        { k: 'Sonoma Coast', v: 'Cool and windy, near the sea.' },
        { k: 'Dry Creek Valley', v: 'Warm: Zinfandel.' },
        { k: 'Alexander Valley', v: 'Warm: Cabernet Sauvignon.' },
      ] },
    ], [
      srt('Cool or warm Sonoma valley?', ['Cool', 'Warm'], [['Russian River Valley', 0], ['Dry Creek Valley', 1], ['Sonoma Coast', 0], ['Alexander Valley', 1]], 'Fog decides.', { wines: ['pinotnoir'] }),
      q('choice', 'Dry Creek Valley is famous for…', ['Zinfandel', 'Riesling', 'Icewine', 'Sparkling'], 0, 'A warm valley.', { wines: ['zinfandel'] }),
      q('choice', 'What cools parts of Sonoma?', ['Pacific fog through gaps in the hills', 'Snow', 'A big lake', 'Altitude only'], 0, 'Morning fog, sunny afternoons.'),
    ]),

    'us-central': R('us-central', 'Central Coast & Paso Robles', 'Wind, fog and limestone', [
      { kind: 'text', title: 'A long stretch of coast', big: 'Between San Francisco and Santa Barbara',
        body: 'The Central Coast runs for hundreds of miles. Close to the ocean it\'s cool and windy; inland it\'s hot.' },
      { kind: 'facts', title: 'Highlights', rows: [
        { k: 'Monterey', v: 'Cold winds blow up the Salinas Valley: crisp Chardonnay and Pinot Noir.' },
        { k: 'Paso Robles', v: 'Hot days, very cold nights; limestone in the west. Bold Cabernet and Rhône grapes (Syrah, Grenache).' },
        { k: 'Santa Cruz Mountains', v: 'High, cool vineyards above the fog: famous Cabernet and Chardonnay.' },
      ] },
    ], [
      q('choice', 'Paso Robles is known for…', ['Bold Cabernet and Rhône grapes', 'Icewine', 'Sherry', 'Light Pinot only'], 0, 'Hot days, cold nights.', { wines: ['syrah'] }),
      q('choice', 'Why is Monterey cool?', ['Cold winds blow up the Salinas Valley', 'It\'s high in the Andes', 'It snows', 'It\'s a desert'], 0, 'Crisp Chardonnay and Pinot.'),
      srt('Cool or warm?', ['Cool', 'Warm'], [['Monterey', 0], ['Paso Robles days', 1], ['Santa Cruz Mountains', 0]], 'The coast is cool; inland is hot.'),
    ]),

    'us-santabarbara': R('us-santabarbara', 'Santa Barbara & Sta. Rita Hills', 'Valleys that face the sea', [
      { kind: 'text', title: 'Mountains that run sideways', big: 'East–west valleys',
        body: 'Most of America\'s coastal mountains run north–south. Here they run <b>east–west</b>, opening valleys straight to the Pacific. Cold fog and wind <b>funnel</b> inland, making it surprisingly cool so far south.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Sta. Rita Hills', v: 'The coolest end: Pinot Noir and Chardonnay.' },
        { k: 'Further inland', v: 'Warmer: Syrah, and Bordeaux grapes in Happy Canyon.' },
        { k: 'Sideways', v: 'A 2004 film set here made Pinot Noir hugely popular.' },
      ] },
    ], [
      q('choice', 'Why is Santa Barbara cool for somewhere so far south?', ['East–west valleys funnel in Pacific fog', 'High altitude', 'Snow', 'Lakes'], 0, 'The mountains run sideways.', { wines: ['pinotnoir'] }),
      q('choice', 'Sta. Rita Hills is best known for…', ['Pinot Noir and Chardonnay', 'Zinfandel', 'Port', 'Riesling icewine'], 0, 'The coolest end.'),
      q('choice', 'Which film made Pinot Noir hugely popular?', ['Sideways', 'Bottle Shock', 'A Good Year', 'Somm'], 0, 'Set in Santa Barbara County.'),
    ]),

    'us-lodi': R('us-lodi', 'Lodi', 'Old-vine Zinfandel', [
      { kind: 'text', title: 'Delta breezes, ancient vines', big: 'Zinfandel planted over a century ago',
        body: 'Lodi sits inland where cool evening <b>breezes</b> blow in from the river delta. Its <b>sandy</b> soils kept phylloxera away from some plots, so <b>very old, own-rooted</b> vines survive, many of them Zinfandel.' },
      { kind: 'text', title: 'Old vines', body: 'Old vines give <b>fewer, smaller</b> bunches: more concentrated wines (remember yields, Roots 2.4).' },
    ], [
      q('choice', 'Why do very old vines survive in Lodi?', ['Sandy soils kept phylloxera away', 'They\'re grafted', 'It never rains', 'They\'re replanted yearly'], 0, 'Like Santorini and Toro.', { wines: ['zinfandel'] }),
      q('choice', 'Lodi\'s signature grape?', ['Zinfandel', 'Pinot Noir', 'Riesling', 'Chenin Blanc'], 0, 'Old-vine Zin.'),
      q('choice', 'Old vines usually give…', ['Fewer, more concentrated grapes', 'More, lighter grapes', 'Sweeter wine', 'White wine'], 0, 'Low yields, more flavour.'),
    ]),

    /* ---------------- PACIFIC NORTHWEST & EAST ---------------- */
    'us-oregon': R('us-oregon', 'Oregon', 'Willamette Valley Pinot Noir', [
      { kind: 'text', title: 'Pinot country', big: 'Cool, green, rainy',
        body: 'The <b>Willamette Valley</b>, south of Portland, has a cool, maritime climate with wet winters and dry summers: ideal for <b>Pinot Noir</b>, plus Chardonnay and Pinot Gris.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Dundee Hills', v: 'Red volcanic "Jory" soil.' },
        { k: 'Pioneers', v: 'The first Pinot Noir was planted in the 1960s; Oregon soon impressed Burgundians.' },
        { k: 'Style', v: 'Between Burgundy and California: red fruit, earthy, silky.' },
      ] },
    ], [
      q('choice', 'Oregon\'s signature grape?', ['Pinot Noir', 'Cabernet Sauvignon', 'Zinfandel', 'Malbec'], 0, 'In the cool Willamette Valley.', { wines: ['pinotnoir'] }),
      q('choice', 'Jory soil in the Dundee Hills is…', ['Red and volcanic', 'White chalk', 'Black slate', 'Sand'], 0, 'Famous red earth.'),
      q('choice', 'Oregon Pinot\'s style sits between…', ['Burgundy and California', 'Port and Sherry', 'Champagne and Prosecco', 'Mosel and Barossa'], 0, 'Red fruit and earth.'),
    ]),

    'us-washington': R('us-washington', 'Washington', 'Columbia Valley, Walla Walla', [
      { kind: 'text', title: 'Desert behind the mountains', big: 'Rain shadow + irrigation',
        body: 'Seattle is rainy, but most vineyards are <b>east of the Cascade mountains</b>, in a dry, almost desert <b>rain shadow</b>. Rivers supply irrigation. Long, sunny summer days (it\'s far north) and cold nights give ripe, fresh wines.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Columbia Valley', v: 'The huge umbrella region.' },
        { k: 'Walla Walla', v: 'Famous for Cabernet, Merlot and Syrah.' },
        { k: 'Sandy soils', v: 'Left by ancient Ice Age floods: phylloxera struggles, so many vines are own-rooted.' },
        { k: 'Grapes', v: 'Cabernet, Merlot, Syrah, Riesling, Chardonnay.' },
      ] },
    ], [
      q('choice', 'Why are Washington\'s vineyards so dry?', ['They\'re in the Cascades\' rain shadow', 'They\'re on islands', 'Fog never reaches them', 'They\'re very high'], 0, 'Like Alsace and the Vosges.', { wines: ['cabernet'] }),
      q('choice', 'Where does Washington\'s vineyard water come from?', ['Irrigation from rivers', 'Heavy summer rain', 'Snow on the vines', 'Sea fog'], 0, 'It\'s nearly desert.'),
      q('choice', 'Why are many Washington vines own-rooted?', ['Sandy flood soils discourage phylloxera', 'Grafting is banned', 'They\'re all young', 'They\'re hybrids'], 0, 'Left by Ice Age floods.'),
    ]),

    'us-fingerlakes': R('us-fingerlakes', 'New York', 'Finger Lakes Riesling', [
      { kind: 'text', title: 'Deep lakes, cold winters', big: 'Glacial lakes keep frost away',
        body: 'The Finger Lakes are long, <b>very deep</b> lakes carved by glaciers. They store heat, softening the bitter winters and delaying spring budburst past the frosts. <b>Riesling</b> is the star.' },
      { kind: 'text', title: 'A pioneer', body: 'In the 1950s, Dr Konstantin Frank showed that European vinifera grapes <b>could</b> survive here, when most thought only hardy American grapes could.' },
    ], [
      q('choice', 'How do the Finger Lakes help the vines?', ['Their stored heat softens winter and delays budburst past frost', 'They provide irrigation only', 'They create fog that ripens grapes', 'They don\'t'], 0, 'Deep water, slow to cool.', { wines: ['riesling'] }),
      q('choice', 'The Finger Lakes\' star grape?', ['Riesling', 'Zinfandel', 'Cabernet', 'Malbec'], 0, 'Crisp and age-worthy.'),
      q('choice', 'Dr Konstantin Frank proved that…', ['European vinifera could survive New York winters', 'Icewine is illegal', 'Riesling is red', 'Lakes are bad for vines'], 0, 'In the 1950s.'),
    ]),

    /* ---------------- CANADA ---------------- */
    'ca-niagara': R('ca-niagara', 'Niagara', 'Icewine', [
      { kind: 'text', title: 'Between two lakes', big: 'Lake Ontario + the Niagara Escarpment',
        body: 'The Niagara Peninsula lies between Lakes Ontario and Erie. Lake breezes bounce off the <b>Niagara Escarpment</b> and circulate over the vines, softening winter cold.' },
      { kind: 'layers', title: 'VQA Ontario', rows: [
        { h: 'Benches', t: 'Sub-appellations along the escarpment: Beamsville Bench, Twenty Mile Bench, Short Hills Bench, St. David\'s Bench…' },
        { h: '85%', t: 'A vintage or a named area must be at least 85% of the wine.' },
        { h: 'Grapes', t: 'VQA wines must be vinifera, except Vidal for Icewine.' },
      ] },
      { kind: 'text', title: 'Icewine', body: 'Grapes are left on the vine into winter and picked <b>frozen</b>, often at night. Pressed frozen, they give tiny amounts of intensely sweet, high-acid juice. Vidal, Riesling and Cabernet Franc are classics.' },
    ], [
      q('choice', 'Which grape is allowed in VQA Icewine even though it isn\'t vinifera?', ['Vidal', 'Concord', 'Zinfandel', 'Merlot'], 0, 'All other VQA wine is vinifera.', { wines: ['icewine'] }),
      q('choice', 'What circulates mild air over Niagara\'s vines?', ['Lake breezes off the escarpment', 'Ocean fog', 'Desert winds', 'Volcanic heat'], 0, 'Lake Ontario\'s influence.'),
      q('choice', 'A VQA vintage-dated wine must be at least… from that year.', ['85%', '50%', '75%', '100%'], 0, 'Same for a named area.'),
      q('choice', 'A "bench" in Niagara is…', ['A sub-appellation along the escarpment', 'A barrel', 'A sweet wine', 'A grape'], 0, 'Beamsville Bench, Twenty Mile Bench…'),
    ], ['Ontario O. Reg. 406/00']),

    'ca-okanagan': R('ca-okanagan', 'Okanagan Valley', 'Desert vineyards in British Columbia', [
      { kind: 'text', title: 'A long lake in dry hills', big: 'Hot, dry summers, around 49–50° N',
        body: 'In British Columbia\'s interior, the Okanagan Valley follows a long, deep lake. The south, near Osoyoos, is <b>near-desert</b>: hot, dry and sunny. The lake moderates the cold.' },
      { kind: 'compare', title: 'North vs south', cols: [
        { h: 'North', items: ['Cooler', 'Riesling, Pinot Noir, Pinot Gris'] },
        { h: 'South', items: ['Hot and dry', 'Merlot, Cabernet, Syrah'] }] },
    ], [
      srt('Northern or southern Okanagan?', ['North', 'South'], [['Riesling', 0], ['Near-desert', 1], ['Syrah', 1], ['Cooler', 0]], 'A long valley, two climates.', { wines: ['merlot'] }),
      q('choice', 'What moderates Okanagan winters?', ['A long, deep lake', 'The ocean', 'Fog', 'Volcanoes'], 0, 'Like the Finger Lakes.'),
      q('choice', 'The southern Okanagan near Osoyoos is…', ['Hot and near-desert', 'Rainforest', 'Always frozen', 'At sea level by the ocean'], 0, 'Surprising for Canada.'),
    ]),

    /* ---------------- CHILE ---------------- */
    'cl-maipo': R('cl-maipo', 'Maipo', 'Chile\'s Cabernet heartland', [
      { kind: 'text', title: 'Around Santiago', big: 'Andes air at night',
        body: 'The Maipo Valley surrounds Santiago. Cold air sinks from the <b>Andes</b> at night, keeping wines fresh. It\'s Chile\'s classic <b>Cabernet Sauvignon</b> region; Alto Maipo, in the foothills, makes the most structured.' },
      { kind: 'text', title: 'Chile\'s natural walls', body: 'The Andes, the Pacific, the Atacama desert and Patagonia\'s ice have kept <b>phylloxera</b> out: Chile\'s vines grow on their own roots (Roots 2.5).' },
    ], [
      q('choice', 'Maipo\'s classic grape?', ['Cabernet Sauvignon', 'Pinot Noir', 'Riesling', 'Torrontés'], 0, 'Chile\'s classic.', { wines: ['cabernet'] }),
      q('choice', 'What cools Maipo at night?', ['Cold air from the Andes', 'Sea ice', 'Lakes', 'Fog from the Atacama'], 0, 'Mountain air sinks at night.'),
      q('choice', 'Why can Chile\'s vines grow ungrafted?', ['Natural barriers kept phylloxera out', 'Grafting is banned', 'The vines are hybrids', 'It never freezes'], 0, 'Andes, Pacific, desert, ice.'),
    ]),

    'cl-colchagua': R('cl-colchagua', 'Colchagua', 'Rich reds and Carménère', [
      { kind: 'text', title: 'Warm and generous', big: 'Ripe Cabernet, Carménère, Syrah',
        body: 'Colchagua, south of Santiago, is warmer. It makes <b>full, ripe reds</b>: Cabernet, Syrah and Chile\'s own <b>Carménère</b>. The steep, south-facing slopes of Apalta are its most famous corner.' },
      { kind: 'text', title: 'Coast to Andes', body: 'Chilean regions are now also split east–west: <b>Costa</b> (cool, near the sea), <b>Entre Cordilleras</b> (the warm middle) and <b>Andes</b> (foothills).' },
    ], [
      q('choice', 'Colchagua is known for…', ['Full, ripe reds including Carménère', 'Icewine', 'Sparkling only', 'White wine only'], 0, 'Warm and generous.', { wines: ['carmenere'] }),
      q('order', 'Order these Chilean zones from west to east.', null, null, 'Coast, middle, mountains.', { items: ['Costa', 'Entre Cordilleras', 'Andes'] }),
      q('choice', 'Apalta is…', ['A famous slope in Colchagua', 'A grape', 'A desert', 'A sparkling wine'], 0, 'Colchagua\'s most famous corner.'),
    ]),

    'cl-casablanca': R('cl-casablanca', 'Casablanca & San Antonio', 'Chile\'s cool coast', [
      { kind: 'text', title: 'The cold Pacific', big: 'Morning fog from the Humboldt Current',
        body: 'Between Santiago and the sea, the ocean is chilled by the cold <b>Humboldt Current</b>. Morning fog and breezes make Casablanca and San Antonio (including Leyda) cool: perfect for <b>Sauvignon Blanc, Chardonnay and Pinot Noir</b>.' },
    ], [
      q('choice', 'What keeps Casablanca cool?', ['The cold Humboldt Current and fog', 'Altitude', 'Snow', 'A lake'], 0, 'Cold sea, cool coast.', { wines: ['sauvignonblanc'] }),
      q('choice', 'Casablanca\'s typical grapes?', ['Sauvignon Blanc, Chardonnay, Pinot Noir', 'Cabernet and Carménère', 'Malbec', 'Tannat'], 0, 'Cool-climate grapes.'),
      q('choice', 'Leyda is part of…', ['San Antonio', 'Maipo', 'Mendoza', 'Colchagua'], 0, 'Right by the sea.'),
    ]),

    'cl-itata': R('cl-itata', 'Itata & Maule', 'Old vines, País & Cinsault', [
      { kind: 'text', title: 'Chile\'s old south', big: 'Dry-farmed bush vines',
        body: 'Further south, Maule and Itata have <b>very old, unirrigated bush vines</b>: País, Cinsault and Carignan. Once used for cheap wine, they now make fresh, characterful reds.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'País', v: 'Brought by Spanish missionaries centuries ago; the same grape as California\'s "Mission".' },
        { k: 'Old Carignan', v: 'Maule is famous for dry-farmed old Carignan.' },
      ] },
    ], [
      q('choice', 'País arrived in Chile with…', ['Spanish missionaries', 'French monks', 'Italian immigrants', 'Australian winemakers'], 0, 'Centuries ago.', { wines: ['carignan'] }),
      q('choice', 'What does "dry-farmed" mean?', ['No irrigation', 'Grapes dried before pressing', 'No pesticides', 'Picked in drought years'], 0, 'Vines live on rain alone.'),
      q('choice', 'Maule is famous for old…', ['Carignan', 'Riesling', 'Merlot', 'Sauvignon Blanc'], 0, 'Dry-farmed and characterful.'),
    ]),

    'cl-elqui': R('cl-elqui', 'Elqui & Limarí', 'Chile\'s far north', [
      { kind: 'text', title: 'Near the Atacama', big: 'Desert sun, ocean breeze, limestone',
        body: 'In the dry north, close to the Atacama desert, vineyards depend on irrigation. <b>Limarí</b> is cooled by sea fog and has rare <b>limestone</b> soils: crisp Chardonnay. <b>Elqui</b> is high in the Andes with clear skies: vivid Syrah.' },
    ], [
      srt('Limarí or Elqui?', ['Limarí', 'Elqui'], [['Limestone soils', 0], ['High in the Andes', 1], ['Crisp Chardonnay', 0], ['Vivid Syrah', 1]], 'Chile\'s northern pair.', { wines: ['chardonnay'] }),
      q('choice', 'Which desert lies near Elqui and Limarí?', ['The Atacama', 'The Sahara', 'The Gobi', 'The Mojave'], 0, 'One of the driest places on Earth.'),
      q('choice', 'Why do these vineyards need irrigation?', ['Almost no rain falls', 'The soil is frozen', 'Law requires it', 'To make wine sweeter'], 0, 'Desert country.'),
    ]),

    /* ---------------- ARGENTINA ---------------- */
    'ar-mendoza': R('ar-mendoza', 'Mendoza & Luján de Cuyo', 'Malbec\'s capital', [
      { kind: 'text', title: 'A desert made green', big: 'Snowmelt from the Andes',
        body: 'Mendoza is high, sunny and <b>almost rainless</b>. Vines drink <b>Andes snowmelt</b>, carried along old irrigation channels. It makes most of Argentina\'s wine, led by <b>Malbec</b>.' },
      { kind: 'facts', title: 'Luján de Cuyo', rows: [
        { k: 'Where', v: 'Just south of Mendoza city, around 900–1,100 m.' },
        { k: 'Known for', v: 'Old-vine Malbec: plush, plummy and violet-scented.' },
        { k: 'Danger', v: 'Summer hail: many vineyards use nets.' },
      ] },
    ], [
      q('choice', 'Where does Mendoza\'s vineyard water come from?', ['Andes snowmelt through irrigation channels', 'Heavy rain', 'The sea', 'Underground lakes only'], 0, 'It\'s nearly desert.', { wines: ['malbec'] }),
      q('choice', 'Why do many Mendoza vineyards have nets?', ['To protect from hail', 'To keep out birds only', 'For shade', 'To catch fog'], 0, 'Summer hailstorms (Roots 2.5).'),
      q('choice', 'Mendoza\'s leading grape?', ['Malbec', 'Torrontés', 'Pinot Noir', 'Tannat'], 0, 'Plush and violet-scented.'),
    ]),

    'ar-uco': R('ar-uco', 'Uco Valley', 'Higher, cooler, fresher', [
      { kind: 'text', title: 'Up towards the Andes', big: 'Around 900–1,500 m+',
        body: 'The Uco Valley sits higher, right below the Andes. Cooler temperatures and big day–night swings give <b>fresher</b>, more <b>floral</b> Malbec, and fine Chardonnay. Gualtallary and Paraje Altamira are famous names, with stony, chalky soils.' },
    ], [
      q('choice', 'Compared with Luján de Cuyo, Uco Malbec is…', ['Fresher and more floral', 'Sweeter', 'Lighter in colour', 'Fortified'], 0, 'Altitude cools it.', { wines: ['malbec'] }),
      q('choice', 'What makes the Uco Valley cooler?', ['Higher altitude', 'Sea fog', 'Lakes', 'Northern latitude'], 0, 'Roots 2.3.'),
      q('choice', 'Gualtallary and Paraje Altamira are…', ['Famous sites in the Uco Valley', 'Grapes', 'Sweet wines', 'Chilean regions'], 0, 'Stony, chalky soils.'),
    ]),

    'ar-salta': R('ar-salta', 'Salta', 'High-altitude Torrontés', [
      { kind: 'text', title: 'Among the highest vineyards on Earth', big: 'Cafayate and the Calchaquí valleys',
        body: 'In Argentina\'s far north, vineyards climb <b>above 1,700 m</b>, some above 3,000 m. Intense <b>sunlight</b> builds thick skins and colour; <b>cold nights</b> keep acidity.' },
      { kind: 'facts', title: 'Wines', rows: [
        { k: 'Torrontés', v: 'Floral, perfumed, usually dry: Salta\'s signature white.' },
        { k: 'Malbec & Tannat', v: 'Deep, intense reds from thick-skinned grapes.' },
      ] },
    ], [
      q('choice', 'Salta\'s signature white?', ['Torrontés', 'Chardonnay', 'Albariño', 'Riesling'], 0, 'Floral but usually dry.', { wines: ['torrontes'] }),
      q('choice', 'Intense sun at altitude makes grape skins…', ['Thicker, with more colour', 'Thinner and paler', 'Sweeter only', 'Unchanged'], 0, 'Deep, intense reds.'),
      q('choice', 'The highest Salta vineyards reach…', ['Above 3,000 m', 'About 100 m', 'Sea level', 'About 500 m'], 0, 'Among the highest anywhere.'),
    ]),

    'ar-patagonia': R('ar-patagonia', 'Patagonia', 'Argentina\'s cool south', [
      { kind: 'text', title: 'Wind and space', big: 'Neuquén & Río Negro',
        body: 'Patagonia\'s vineyards are further south and much lower than Mendoza\'s, but <b>cooler</b> and very <b>windy</b>. The wind keeps grapes healthy and skins thick. Pinot Noir and elegant Malbec thrive.' },
    ], [
      q('choice', 'What cools Patagonia\'s vineyards?', ['Being far south, plus strong winds', 'High altitude', 'Sea fog', 'Lakes'], 0, 'Latitude, not altitude.', { wines: ['pinotnoir'] }),
      q('choice', 'Patagonia is known for…', ['Pinot Noir and elegant Malbec', 'Torrontés', 'Fortified wine', 'Icewine'], 0, 'Cool and windy.'),
      q('choice', 'How does the wind help?', ['Keeps grapes healthy and skins thick', 'Makes them sweeter', 'Adds bubbles', 'It doesn\'t'], 0, 'Dry air fights rot.'),
    ]),

    /* ---------------- AUSTRALIA ---------------- */
    'au-gi': R('au-gi', 'The GI system', 'Zones, regions, subregions', [
      { kind: 'text', title: 'Boundaries, not rules', big: 'Zone → Region → Subregion',
        body: 'Australia\'s Geographical Indications are <b>maps</b>. They say where grapes came from, not which grapes or methods to use. Big <b>zones</b> contain <b>regions</b> (Barossa Valley), some with <b>subregions</b>.' },
      { kind: 'layers', title: 'The 85% rule', rows: [
        { h: 'Region', t: 'At least 85% from the named GI.' },
        { h: 'Grape', t: 'At least 85% of the named variety.' },
        { h: 'Vintage', t: 'At least 85% from that year.' },
        { h: 'South Eastern Australia', t: 'A giant GI covering several states, used for big-volume blends.' },
      ] },
    ], [
      q('order', 'Order the GI levels, biggest to smallest.', null, null, 'Like Russian dolls.', { items: ['Zone', 'Region', 'Subregion'] }),
      q('choice', 'An Australian wine labelled "Shiraz" must be at least… Shiraz.', ['85%', '75%', '100%', '51%'], 0, 'The 85% rule.', { wines: ['barossashiraz'] }),
      q('choice', 'Australian GIs mostly control…', ['Where the grapes came from', 'Which grapes are allowed', 'Oak ageing', 'Sweetness'], 0, 'Boundaries, not rules.'),
    ], ['EU–Australia wine agreement, OJ L 28, 2009']),

    'au-barossa': R('au-barossa', 'Barossa & Eden Valley', 'Old Shiraz, cool Riesling', [
      { kind: 'text', title: 'Some of the world\'s oldest vines', big: 'Planted from the 1840s',
        body: 'The warm <b>Barossa Valley</b> was settled by German-speaking Lutherans. Phylloxera never arrived, so some <b>Shiraz</b> vines from the 1840s still produce: rich, ripe, chocolatey Shiraz.' },
      { kind: 'compare', title: 'Valley vs hills', cols: [
        { h: 'Barossa Valley', items: ['Warm floor', 'Rich Shiraz, Grenache'] },
        { h: 'Eden Valley', items: ['Higher, cooler hills', 'Lime-scented Riesling, finer Shiraz'] }] },
    ], [
      q('choice', 'Why do 1840s vines still grow in the Barossa?', ['Phylloxera never arrived', 'They\'re grafted every year', 'They\'re hybrids', 'Law protects them from cutting'], 0, 'Among the oldest vines anywhere.', { wines: ['barossashiraz'] }),
      srt('Barossa Valley or Eden Valley?', ['Barossa Valley', 'Eden Valley'], [['Rich Shiraz', 0], ['Lime-scented Riesling', 1], ['Warmer', 0], ['Higher, cooler', 1]], 'Valley floor vs hills.'),
      q('choice', 'Who settled the Barossa?', ['German-speaking Lutherans', 'French monks', 'Italian immigrants', 'Spanish missionaries'], 0, 'In the 1840s.'),
    ]),

    'au-mclaren': R('au-mclaren', 'McLaren Vale', 'Sea breezes and Grenache', [
      { kind: 'text', title: 'Between hills and sea', big: 'Mediterranean, with sea breezes',
        body: 'South of Adelaide, McLaren Vale has a <b>Mediterranean</b> climate, cooled by afternoon breezes off the gulf. Rich <b>Shiraz</b>, old-vine <b>Grenache</b>, and Italian and Spanish grapes (Fiano, Tempranillo) thrive.' },
    ], [
      q('choice', 'What cools McLaren Vale?', ['Afternoon sea breezes', 'Snow', 'Altitude', 'Fog from the desert'], 0, 'By the gulf.', { wines: ['grenache'] }),
      q('choice', 'McLaren Vale is known for…', ['Shiraz and old-vine Grenache', 'Icewine', 'Riesling only', 'Sparkling only'], 0, 'Plus Mediterranean grapes.'),
      q('choice', 'McLaren Vale\'s climate is…', ['Mediterranean', 'Continental', 'Tropical', 'Alpine'], 0, 'Warm, dry summers.'),
    ]),

    'au-clare': R('au-clare', 'Clare Valley', 'Dry Riesling', [
      { kind: 'text', title: 'Lime and toast', big: 'Warm days, cold nights',
        body: 'Clare is warm by day but cold at night, and its <b>Riesling</b> is bone dry: lime and citrus young, turning <b>toasty</b> with age. Watervale and Polish Hill are its famous subregions.' },
      { kind: 'text', title: 'Screwcaps', body: 'In 2000, Clare\'s Riesling makers switched together to <b>screwcaps</b> to keep their wines fresh, helping spread screwcaps around the world.' },
    ], [
      q('choice', 'Clare Valley Riesling is usually…', ['Bone dry', 'Sweet', 'Sparkling', 'Oaked'], 0, 'Lime and toast.', { wines: ['clareriesling'] }),
      q('choice', 'What did Clare\'s Riesling makers switch to in 2000?', ['Screwcaps', 'Oak barrels', 'Plastic bottles', 'Boxes'], 0, 'For freshness.'),
      q('choice', 'Watervale and Polish Hill are…', ['Clare subregions', 'Grapes', 'Producers', 'Barossa villages'], 0, 'Clare\'s famous names.'),
    ]),

    'au-coonawarra': R('au-coonawarra', 'Coonawarra', 'Terra rossa Cabernet', [
      { kind: 'text', title: 'A strip of red earth', big: 'Terra rossa over limestone',
        body: 'Coonawarra is famous for a narrow strip of <b>red soil</b> (terra rossa) over limestone. It\'s fairly <b>cool</b>, and its <b>Cabernet Sauvignon</b> has blackcurrant, mint and a firm, elegant shape.' },
    ], [
      q('choice', 'Coonawarra\'s famous soil?', ['Terra rossa over limestone', 'Volcanic sand', 'Slate', 'Granite'], 0, 'Red earth.', { wines: ['cabernet'] }),
      q('choice', 'Coonawarra\'s star grape?', ['Cabernet Sauvignon', 'Riesling', 'Grenache', 'Chardonnay'], 0, 'Blackcurrant and mint.'),
      q('choice', 'Coonawarra Cabernet often smells of…', ['Mint and blackcurrant', 'Lychee', 'Banana', 'Petrol'], 0, 'A regional signature.'),
    ]),

    'au-margaret': R('au-margaret', 'Margaret River', 'Indian Ocean elegance', [
      { kind: 'text', title: 'Western Australia\'s star', big: 'Maritime, mild, consistent',
        body: 'Surrounded on three sides by ocean, Margaret River has a mild, <b>maritime</b> climate, a bit like Bordeaux. Planted from the late 1960s, it\'s famous for <b>Cabernet</b> and <b>Chardonnay</b>, and Sémillon–Sauvignon blends.' },
    ], [
      q('choice', 'Margaret River\'s climate is most like…', ['Bordeaux', 'The Mosel', 'Mendoza', 'The Sahara'], 0, 'Maritime and mild.', { wines: ['cabernet'] }),
      q('choice', 'Margaret River is famous for…', ['Cabernet and Chardonnay', 'Fortified Muscat', 'Icewine', 'Riesling only'], 0, 'Plus Sémillon–Sauvignon blends.'),
      q('choice', 'Which ocean shapes Margaret River?', ['The Indian Ocean', 'The Atlantic Ocean', 'The Arctic Ocean', 'The Pacific Ocean'], 0, 'On three sides.'),
    ]),

    'au-hunter': R('au-hunter', 'Hunter Valley', 'Semillon', [
      { kind: 'text', title: 'Hot, humid, historic', big: 'Rain at harvest',
        body: 'North of Sydney, the Hunter is one of Australia\'s oldest regions. It\'s hot and <b>humid</b>, and rain often arrives at harvest. Growers pick <b>Semillon early</b>, before the rain: light, low-alcohol wine that turns toasty over years.' },
      { kind: 'text', title: 'Hunter Shiraz', body: 'Medium-bodied, earthy Shiraz, unlike the Barossa\'s richness.' },
    ], [
      q('choice', 'Why is Hunter Semillon picked early?', ['To beat the harvest rains', 'For sweetness', 'Law', 'To make it red'], 0, 'Light and low in alcohol.', { wines: ['semillon'] }),
      q('choice', 'Hunter Shiraz is…', ['Medium-bodied and earthy', 'Rich and jammy', 'Sparkling', 'Sweet'], 0, 'Unlike the Barossa.'),
      q('choice', 'The Hunter\'s climate is…', ['Hot and humid', 'Cold and dry', 'Alpine', 'Desert'], 0, 'Rain at harvest is a risk.'),
    ]),

    'au-yarra': R('au-yarra', 'Yarra Valley', 'Cool Victoria', [
      { kind: 'text', title: 'Near Melbourne', big: 'Pinot, Chardonnay, sparkling',
        body: 'The Yarra Valley, just outside Melbourne, is <b>cool</b>. It makes elegant <b>Chardonnay</b> and <b>Pinot Noir</b>, sparkling wine, and fine, medium-bodied Syrah.' },
    ], [
      q('choice', 'The Yarra Valley is near…', ['Melbourne', 'Perth', 'Sydney', 'Adelaide'], 0, 'In Victoria.', { wines: ['chardonnay'] }),
      q('choice', 'The Yarra\'s climate is…', ['Cool', 'Hot and humid', 'Desert', 'Tropical'], 0, 'Elegant wines.'),
      q('choice', 'Yarra Valley is known for…', ['Chardonnay, Pinot Noir and sparkling', 'Fortified wine', 'Old-vine Grenache only', 'Icewine'], 0, 'Cool-climate classics.'),
    ]),

    'au-tasmania': R('au-tasmania', 'Tasmania', 'Australia\'s coolest', [
      { kind: 'text', title: 'An island in the Southern Ocean', big: 'Cool, crisp, sparkling',
        body: 'Tasmania is Australia\'s <b>coolest</b> wine state. Its high acidity makes some of Australia\'s best <b>sparkling wine</b>, plus fine Pinot Noir, Chardonnay and Riesling. Many mainland producers buy Tasmanian grapes for their sparkling.' },
    ], [
      q('choice', 'Tasmania is best known for…', ['Sparkling wine and Pinot Noir', 'Fortified wine', 'Rich Shiraz', 'Sweet Muscat'], 0, 'Cool and crisp.', { wines: ['pinotnoir'] }),
      q('choice', 'Why is Tasmania good for sparkling wine?', ['Cool climate keeps acidity high', 'It\'s very hot', 'Volcanic soil', 'It\'s a desert'], 0, 'Sparkling bases need acidity.'),
      q('choice', 'Tasmania is Australia\'s… wine state.', ['Coolest', 'Hottest', 'Biggest', 'Oldest'], 0, 'In the Southern Ocean.'),
    ]),

    /* ---------------- NEW ZEALAND ---------------- */
    'nz-marlborough': R('nz-marlborough', 'Marlborough', 'Sauvignon Blanc that shook the world', [
      { kind: 'text', title: 'Sunny days, cold nights', big: 'Wairau & Awatere valleys',
        body: 'At the top of the South Island, Marlborough has long, very sunny days and cold nights. That makes its famous <b>Sauvignon Blanc</b> ripe and green at once. It\'s by far New Zealand\'s biggest region.' },
      { kind: 'compare', title: 'Two valleys', cols: [
        { h: 'Wairau', items: ['The main valley', 'Ripe passion fruit and citrus'] },
        { h: 'Awatere', items: ['Higher, cooler, windier', 'Herbal, salty, tomato leaf'] }] },
    ], [
      srt('Wairau or Awatere?', ['Wairau', 'Awatere'], [['The main valley', 0], ['Higher and windier', 1], ['Passion fruit', 0], ['Herbal, salty', 1]], 'Two valleys, two styles.', { wines: ['marlboroughsb'] }),
      q('choice', 'Marlborough is New Zealand\'s…', ['Biggest region', 'Smallest region', 'Only red region', 'Warmest region'], 0, 'By far.'),
      q('choice', 'Marlborough\'s famous grape?', ['Sauvignon Blanc', 'Shiraz', 'Malbec', 'Tempranillo'], 0, 'Punchy and pungent.'),
    ]),

    'nz-otago': R('nz-otago', 'Central Otago', 'Mountain Pinot Noir', [
      { kind: 'text', title: 'Continental, in the mountains', big: 'Hot days, frosty nights',
        body: 'Central Otago, far south among mountains, is New Zealand\'s only truly <b>continental</b> region: hot, dry summers, frosty nights, cold winters. Its <b>Pinot Noir</b> is ripe, vivid and dark-fruited. Bannockburn and Gibbston are famous subregions.' },
      { kind: 'text', title: 'Frost fighters', body: 'Spring frost is a constant danger: growers use <b>wind machines</b> and sprinklers (Roots 2.5).' },
    ], [
      q('choice', 'Central Otago\'s climate is…', ['Continental', 'Maritime', 'Tropical', 'Mediterranean'], 0, 'Far from the sea, among mountains.', { wines: ['otagopinot'] }),
      q('choice', 'Central Otago\'s star grape?', ['Pinot Noir', 'Sauvignon Blanc', 'Syrah', 'Merlot'], 0, 'Ripe and vivid.'),
      q('choice', 'What do Otago growers use against frost?', ['Wind machines and sprinklers', 'Nets', 'Oak barrels', 'Nothing'], 0, 'Spring frost is a constant danger.'),
    ]),

    'nz-hawkes': R('nz-hawkes', 'Hawke\'s Bay', 'Warm east coast', [
      { kind: 'text', title: 'Sunny North Island', big: 'Gimblett Gravels',
        body: 'Hawke\'s Bay is warm and sunny on the North Island\'s east coast. Its famous <b>Gimblett Gravels</b>, an old riverbed of stones that store heat, ripen <b>Syrah</b> and <b>Bordeaux blends</b> (Merlot, Cabernet). Chardonnay is excellent too.' },
    ], [
      q('choice', 'What are the Gimblett Gravels?', ['An old riverbed of heat-storing stones', 'A grape', 'A cave', 'A sweet wine'], 0, 'Remember warm, free-draining soils (Roots 2.3).', { wines: ['syrah'] }),
      q('choice', 'Hawke\'s Bay is known for…', ['Syrah and Bordeaux blends', 'Icewine', 'Sherry', 'Riesling only'], 0, 'Plus fine Chardonnay.'),
      q('choice', 'Hawke\'s Bay is on…', ['The North Island\'s east coast', 'The South Island\'s west coast', 'Tasmania', 'An island off Chile'], 0, 'Warm and sunny.'),
    ]),

    'nz-martinborough': R('nz-martinborough', 'Martinborough', 'Small, windy, Pinot', [
      { kind: 'text', title: 'Near Wellington', big: 'Dry, windy, free-draining',
        body: 'Martinborough, in the Wairarapa near Wellington, is small and dry, shielded from rain by mountains but battered by <b>wind</b>. Its old river terraces make fragrant, structured <b>Pinot Noir</b>.' },
    ], [
      q('choice', 'Martinborough is famous for…', ['Pinot Noir', 'Malbec', 'Fortified wine', 'Sauvignon Blanc only'], 0, 'Fragrant and structured.', { wines: ['pinotnoir'] }),
      q('choice', 'Martinborough is near…', ['Wellington', 'Auckland', 'Queenstown', 'Christchurch'], 0, 'In the Wairarapa.'),
      q('choice', 'Martinborough\'s challenge?', ['Strong wind', 'Too much rain', 'Snow all summer', 'Volcanoes'], 0, 'Small yields, intense wines.'),
    ]),

    /* ---------------- SOUTH AFRICA ---------------- */
    'za-wo': R('za-wo', 'Wine of Origin', 'South Africa\'s system', [
      { kind: 'text', title: 'Wine of Origin', big: 'Region → District → Ward',
        body: 'South Africa\'s <b>Wine of Origin</b> scheme maps where grapes grow, from big geographical units down to regions, districts and small <b>wards</b>. Like other New World systems, it\'s about place, not grape rules.' },
      { kind: 'layers', title: 'Good to know', rows: [
        { h: 'The grape', t: 'A named variety must be at least 85% of the wine.' },
        { h: 'Chenin Blanc', t: 'South Africa grows more Chenin than any other country.' },
        { h: 'Pinotage', t: 'Its own cross: Pinot Noir × Cinsault.' },
      ] },
    ], [
      q('order', 'Order the Wine of Origin levels, biggest to smallest.', null, null, 'Ever more precise.', { items: ['Region', 'District', 'Ward'] }),
      q('choice', 'A South African "Chenin Blanc" must be at least… Chenin.', ['85%', '75%', '51%', '100%'], 0, 'Same as Australia.', { wines: ['chenin'] }),
      q('choice', 'South Africa grows more of which grape than any other country?', ['Chenin Blanc', 'Malbec', 'Riesling', 'Nebbiolo'], 0, 'Remember Chenin\'s lesson.'),
    ], ['EU–South Africa wine agreement, OJ L 28, 2002']),

    'za-stellenbosch': R('za-stellenbosch', 'Stellenbosch', 'Mountains and Cabernet', [
      { kind: 'text', title: 'Historic and grand', big: 'Mountains, valleys, sea breezes',
        body: 'Stellenbosch, east of Cape Town, was founded in 1679. Mountain slopes (Simonsberg, Helderberg) and breezes from False Bay give many sites. It\'s known for <b>Cabernet Sauvignon</b>, Bordeaux blends, Pinotage and Chenin.' },
      { kind: 'text', title: 'The university', body: 'Stellenbosch University is where <b>Pinotage</b> was created in 1925.' },
    ], [
      q('choice', 'Stellenbosch is especially known for…', ['Cabernet and Bordeaux blends', 'Icewine', 'Sherry', 'Riesling only'], 0, 'Plus Pinotage and Chenin.', { wines: ['cabernet'] }),
      q('choice', 'Which grape was created at Stellenbosch University?', ['Pinotage', 'Chenin Blanc', 'Shiraz', 'Carménère'], 0, 'In 1925.', { wines: ['pinotage'] }),
      q('choice', 'What cools Stellenbosch?', ['Breezes from False Bay', 'Snow', 'A lake', 'Desert air'], 0, 'Plus mountain slopes.'),
    ]),

    'za-swartland': R('za-swartland', 'Swartland', 'The "Swartland revolution"', [
      { kind: 'text', title: 'Warm, dry, wild', big: 'Old bush vines, dry-farmed',
        body: 'North of Cape Town, the Swartland is hot and dry, with old, <b>unirrigated bush vines</b>. From the 2000s, young winemakers here started a "revolution": natural, low-intervention <b>Chenin Blanc</b> and Rhône-style blends.' },
    ], [
      q('choice', 'The Swartland is known for…', ['Old-vine Chenin and Rhône blends', 'Icewine', 'Port', 'Pinot Noir only'], 0, 'The "Swartland revolution".', { wines: ['chenin'] }),
      q('choice', 'Swartland vines are often…', ['Old, unirrigated bush vines', 'Young, irrigated vines', 'Vines trellised high on pergolas', 'Vines grown under glass'], 0, 'Dry-farmed.'),
      q('choice', 'The Swartland\'s climate is…', ['Hot and dry', 'Cool and foggy', 'Alpine', 'Tropical'], 0, 'Tough conditions, intense wines.'),
    ]),

    'za-constantia': R('za-constantia', 'Constantia', 'South Africa\'s oldest wine estate', [
      { kind: 'text', title: 'Cape Town\'s backyard', big: 'Cool sea breezes, since 1685',
        body: 'Constantia, on the slopes behind Cape Town, was founded in <b>1685</b>, South Africa\'s oldest wine estate. Cool breezes from two oceans suit <b>Sauvignon Blanc</b>.' },
      { kind: 'try', title: 'A wine for emperors', body: 'In the 1700s and 1800s, a sweet Constantia wine was famous across Europe…',
        prompt: 'Who loved it?',
        reveal: '<b>Napoleon</b> drank it in exile on St Helena. Today\'s revival, <b>Vin de Constance</b>, is a sweet Muscat from grapes left to shrivel on the vine.' },
    ], [
      q('choice', 'Constantia was founded in…', ['1685', '1985', '1885', '1785'], 0, 'South Africa\'s oldest wine estate.', { wines: ['sauvignonblanc'] }),
      q('choice', 'Which famous exile drank Constantia\'s sweet wine?', ['Napoleon', 'Julius Caesar', 'Queen Victoria', 'Shakespeare'], 0, 'On St Helena.', { wines: ['muscat'] }),
      q('choice', 'Vin de Constance is made from…', ['Muscat grapes left to shrivel on the vine', 'Frozen grapes', 'Nobly rotten Riesling', 'Black grapes'], 0, 'A late-harvest sweet wine.'),
    ]),

    'za-hemel': R('za-hemel', 'Hemel-en-Aarde', 'Heaven and Earth', [
      { kind: 'text', title: 'Cool and close to the sea', big: '"Heaven and Earth"',
        body: 'Hemel-en-Aarde ("Heaven and Earth") lies inland from the seaside town of Hermanus. Cool ocean air makes it one of South Africa\'s best places for <b>Pinot Noir</b> and <b>Chardonnay</b>.' },
    ], [
      q('choice', 'What does "Hemel-en-Aarde" mean?', ['Heaven and Earth', 'Black land', 'Sea and sky', 'Old vines'], 0, 'A poetic name.', { wines: ['pinotnoir'] }),
      q('choice', 'Hemel-en-Aarde is best for…', ['Pinot Noir and Chardonnay', 'Fortified wine', 'Pinotage only', 'Icewine'], 0, 'Cool-climate grapes.'),
      q('choice', 'Hemel-en-Aarde is near…', ['Hermanus', 'Johannesburg', 'Durban', 'Pretoria'], 0, 'By the sea.'),
    ]),
  });
})();
