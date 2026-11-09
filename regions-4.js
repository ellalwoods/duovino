/* Track B · Part 3: Italy, Slovenia & Croatia.
 * Rules named here were checked (2026-11-08) against EU-published texts:
 *  - Barbera d'Asti (OJ C 60, 2019), Barbera d'Alba (OJ C 31, 2022): Barbera. Dogliani (PDO-IT-A1330-AM04): Dolcetto.
 *  - Gavi / Cortese di Gavi (OJ C 470, 2021): Cortese; Riserva and Spumante. Asti / Moscato d'Asti (OJ C 61, 2021): Moscato Bianco.
 *  - Chianti DOCG (2019/C 373/04): Sangiovese main, white grapes ≤ 10%, sub-zones; provinces of Arezzo, Florence, Prato,
 *    Pistoia, Pisa, Siena. Chianti Classico (OJ C 100, 2018): Annata, Riserva, Gran Selezione.
 *  - Brunello (PDO-IT-A1199-AM02): Sangiovese only, ≥ 24 months in oak. Rosso di Montalcino (PDO-IT-A1456-AM03): Sangiovese only.
 *  - Vino Nobile di Montepulciano (OJ C 227, 2020): Sangiovese; ≥ 2 years ageing incl. ≥ 1 in wood; Riserva ≥ 3 years incl. 6 months in bottle.
 *  - Bolgheri (OJ C 183, 2022): Cabernet Sauvignon, Cabernet Franc, Merlot, Syrah, Sangiovese; Vermentino, Sauvignon, Viognier;
 *    Rosso Superiore. Bolgheri Sassicaia is its own PDO (EU register).
 *  - Valpolicella family (PDO-IT notices, 2019): Corvina and/or Corvinone 45–95%; Amarone and Recioto from dried grapes (appassimento).
 *  - Soave (OJ C 72, 2020). Prosecco DOC (PDO-IT-A0516-AM05) and Conegliano Valdobbiadene DOCG (PDO-IT-A0515-AM02): Rive,
 *    Superiore di Cartizze. Franciacorta (OJ C/2024/5690). Trento (PDO-IT-A0752-AM02): traditional method only,
 *    ≥ 15 months on lees (Riserva ≥ 36).
 *  - Verdicchio (OJ C 288, 2022); Etna (OJ C 240, 2022); Taurasi (OJ C 64, 2021); Fiano di Avellino (C/2025/298);
 *    Greco di Tufo (OJ C 61, 2021); Montepulciano d'Abruzzo (OJ C 220, 2023); Sicilia DOC (OJ C 416, 2019): Nero d'Avola
 *    (Calabrese), Grillo; Vermentino di Gallura (EU register).
 * Barolo, Barbaresco, Alto Adige, Collio, Cannonau, Primitivo di Manduria, Goriška Brda and Dingač texts weren't
 * downloadable: those lessons describe places and grapes, without grape percentages or ageing minimums.
 */
(() => {
  const D = window.DUOVINO;
  const s = (t, k, o = {}) => ({ t, k, ...o });
  const R = (id, title, sub, lesson, questions, sources) => ({ id: 'b-' + id, title, sub, lesson, questions, ...(sources ? { sources } : {}) });
  const q = (type, text, options, answer, explain, extra = {}) => ({ type, q: text, options, answer, explain, ...extra });
  const srt = (text, buckets, items, explain, extra = {}) => ({ type: 'sort', q: text, buckets, items: items.map(([t, b]) => ({ t, b })), explain, ...extra });
  const ord = (text, items, explain, extra = {}) => ({ type: 'order', q: text, items, explain, ...extra });

  Object.assign(D.regionLessons = D.regionLessons || {}, {

    /* ---------------- PIEDMONT ---------------- */
    'it-barolo': R('it-barolo', 'Barolo & Barbaresco', 'Nebbiolo\'s two great homes', [
      { kind: 'text', title: 'The Langhe hills', big: 'Fog, slopes and Nebbiolo',
        body: 'South of Alba, the <b>Langhe</b> hills hold Nebbiolo\'s two great homes. Autumn fog fills the valleys; the best vineyards sit on sunny, south-facing slopes above it.' },
      { kind: 'compare', title: 'Neighbours', cols: [
        { h: 'Barolo', items: ['South-west of Alba', '"The king": powerful, long-lived', 'Villages: Barolo, La Morra, Serralunga, Monforte'] },
        { h: 'Barbaresco', items: ['North-east of Alba, near the Tanaro river', 'Often a little more elegant, earlier to open', 'Villages: Barbaresco, Neive, Treiso'] }] },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'MGA', v: 'Named vineyard areas (like crus), e.g. Cannubi, Brunate, Asili, increasingly shown on labels.' },
        { k: 'Traditional vs modern', v: 'Traditionalists use long ageing in big old casks; modernists, small new barrels.' },
      ] },
    ], [
      srt('Barolo or Barbaresco village?', ['Barolo', 'Barbaresco'], [['La Morra', 0], ['Neive', 1], ['Serralunga', 0], ['Treiso', 1]], 'Two sides of Alba.', { wines: ['barolo'] }),
      q('choice', 'An MGA on a Barolo label names…', ['A specific vineyard area, like a cru', 'The producer\'s family', 'The barrel type', 'The vintage'], 0, 'Cannubi, Brunate, Asili…'),
      q('choice', 'Traditional Barolo is aged in…', ['Big old casks', 'Steel tanks only', 'Clay jars', 'Glass'], 0, 'Modernists prefer small new barrels.'),
    ]),

    'it-barbera': R('it-barbera', 'Barbera d\'Asti & d\'Alba', 'Juicy everyday Piedmont', [
      { kind: 'text', title: 'Two Barberas', big: 'High acid, low tannin, deep colour',
        body: '<b>Barbera d\'Asti</b> comes from the Monferrato hills around Asti, Barbera\'s heartland. <b>Barbera d\'Alba</b> grows near Alba, often on sites not chosen for Nebbiolo: usually a bit riper and fuller.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Nizza', v: 'A top Barbera area within Asti, now its own DOCG.' },
        { k: 'Food', v: 'Pizza, pasta, salumi: its acidity loves tomato and fat.' },
      ] },
    ], [
      srt('Barbera d\'Asti or d\'Alba?', ['Asti', 'Alba'], [['Monferrato hills', 0], ['Near the Langhe', 1], ['Barbera\'s heartland', 0], ['Often riper, fuller', 1]], 'Two homes.', { wines: ['barbera'] }),
      q('choice', 'Why is Barbera great with tomato sauce?', ['High acidity', 'High tannin', 'Sweetness', 'Bubbles'], 0, 'Acid meets acid.'),
      q('choice', 'Nizza is…', ['A top Barbera area, now its own DOCG', 'A sweet wine', 'A white grape', 'A Barolo village'], 0, 'Within Asti.'),
    ], ['Barbera d\'Asti: OJ C 60, 2019', 'Barbera d\'Alba: OJ C 31, 2022']),

    'it-dolcetto': R('it-dolcetto', 'Dolcetto', '"The little sweet one" that\'s dry', [
      { kind: 'text', title: 'Piedmont\'s weekday red', big: 'Dry, soft, purple',
        body: 'Dolcetto means "little sweet one", but the wine is <b>dry</b>. It\'s deep purple, soft in acidity, with grippy tannin and flavours of black cherry, plum and bitter almond. Drunk young, with everyday meals.' },
      { kind: 'facts', title: 'Where', rows: [
        { k: 'Dogliani', v: 'Dolcetto\'s most serious home, with its own DOCG.' },
        { k: 'Dolcetto d\'Alba', v: 'Around Alba.' },
        { k: 'Ripening', v: 'Ripens early, so it suits cooler, higher sites than Nebbiolo.' },
      ] },
    ], [
      q('choice', 'Despite its name, Dolcetto is…', ['Dry', 'Sweet', 'Sparkling', 'White'], 0, '"Little sweet one" is the grape, not the wine.', { wines: ['dolcetto'] }),
      q('choice', 'Dolcetto\'s most serious home?', ['Dogliani', 'Barbaresco', 'Gavi', 'Asti'], 0, 'With its own DOCG.'),
      srt('Dolcetto or Barbera?', ['Dolcetto', 'Barbera'], [['Low acidity', 0], ['High acidity', 1], ['Bitter almond finish', 0], ['Low tannin', 1]], 'Two everyday reds, opposite structures.'),
    ], ['Dogliani DOCG: PDO-IT-A1330-AM04']),

    'it-gavi': R('it-gavi', 'Gavi', 'Cortese', [
      { kind: 'text', title: 'Piedmont\'s classic white', big: 'Cortese di Gavi',
        body: 'In south-east Piedmont, near Liguria, <b>Gavi</b> (also called Cortese di Gavi) is made from <b>Cortese</b>: crisp, dry, light, with lemon, green apple and almond. Sea breezes from Liguria keep it fresh.' },
      { kind: 'facts', title: 'Styles', rows: [
        { k: 'Gavi di Gavi', v: 'From the village of Gavi itself.' },
        { k: 'Riserva & Spumante', v: 'Longer-aged and sparkling versions also exist.' },
      ] },
    ], [
      q('choice', 'Gavi is made from…', ['Cortese', 'Arneis', 'Moscato', 'Chardonnay'], 0, 'Also called Cortese di Gavi.', { wines: ['gavi'] }),
      q('choice', '"Gavi di Gavi" means…', ['From the village of Gavi itself', 'Gavi aged twice as long', 'Aged 10 years', 'Sparkling'], 0, 'The heart of the zone.'),
      q('choice', 'What keeps Gavi fresh?', ['Breezes from nearby Liguria', 'High altitude in the Alps', 'Glaciers', 'Fog from the Po'], 0, 'Close to the sea.'),
    ], ['Gavi DOCG: OJ C 470, 2021']),

    'it-moscato': R('it-moscato', 'Moscato d\'Asti', 'Sweet, light, frothy', [
      { kind: 'text', title: 'Two Asti wines', big: 'Moscato Bianco',
        body: 'Both are made from <b>Moscato Bianco</b>, fermented in sealed tanks and stopped early, so they stay <b>sweet and low in alcohol</b>.' },
      { kind: 'compare', title: 'Asti vs Moscato d\'Asti', cols: [
        { h: 'Asti (Spumante)', items: ['Fully sparkling', 'Mushroom-cork bottle'] },
        { h: 'Moscato d\'Asti', items: ['Gently frothy (frizzante)', 'Even lower alcohol', 'Normal cork'] }] },
    ], [
      q('choice', 'In Piedmont, Moscato d\'Asti is…', ['Gently frothy, sweet and low in alcohol', 'Fully sparkling and dry', 'A red wine', 'Fortified'], 0, 'Asti Spumante is the fully sparkling one.', { wines: ['muscat'] }),
      srt('Asti or Moscato d\'Asti?', ['Asti', 'Moscato d\'Asti'], [['Fully sparkling', 0], ['Gently frothy', 1], ['Mushroom cork', 0], ['Even lower alcohol', 1]], 'Same grape, different fizz.'),
      q('choice', 'Why are they sweet?', ['Fermentation is stopped early', 'Sugar is added', 'Grapes are frozen', 'Spirit is added'], 0, 'Leaving natural grape sugar.'),
    ], ['Asti DOCG: OJ C 61, 2021']),

    /* ---------------- TUSCANY ---------------- */
    'it-chianti': R('it-chianti', 'Chianti vs Chianti Classico', 'Two different wines', [
      { kind: 'text', title: 'Not the same thing', big: 'Two separate DOCGs',
        body: '<b>Chianti Classico</b> is the historic heart between Florence and Siena (black rooster on the neck). <b>Chianti</b> is a much bigger area around it, across six provinces, with sub-zones like Rufina and Colli Senesi.' },
      { kind: 'compare', title: 'Side by side', cols: [
        { h: 'Chianti Classico', items: ['Historic core', 'Annata → Riserva → Gran Selezione', 'No white grapes'] },
        { h: 'Chianti', items: ['Larger surrounding area', 'Sangiovese-led; up to 10% white grapes allowed', 'Often lighter, simpler'] }] },
    ], [
      q('choice', 'Chianti and Chianti Classico are…', ['Two separate DOCGs', 'The same wine', 'Two grapes', 'Two producers'], 0, 'Classico is the historic core.', { wines: ['chianti'] }),
      q('choice', 'Chianti Classico\'s symbol?', ['A black rooster', 'An eagle', 'A lion', 'A star'], 0, 'On the bottle neck.'),
      q('choice', 'How much white grape can go into Chianti (not Classico)?', ['Up to 10%', 'None', 'Up to 50%', 'Any amount'], 0, 'Classico allows none.'),
    ], ['Chianti DOCG: 2019/C 373/04', 'Chianti Classico DOCG: OJ C 100, 2018']),

    'it-montalcino': R('it-montalcino', 'Brunello & Rosso di Montalcino', 'Big brother, little brother', [
      { kind: 'text', title: 'A hill town south of Siena', big: 'Warmer and drier than Chianti',
        body: 'Montalcino is warmer and drier than Chianti Classico, giving riper, more powerful Sangiovese. Both its wines are <b>Sangiovese only</b>.' },
      { kind: 'compare', title: 'Two wines', cols: [
        { h: 'Brunello', items: ['At least 24 months in oak', 'Long-lived, powerful', 'Released after years'] },
        { h: 'Rosso di Montalcino', items: ['Released young', 'Fresher, cheaper', 'A taste of the style'] }] },
    ], [
      srt('Brunello or Rosso di Montalcino?', ['Brunello', 'Rosso'], [['At least 24 months in oak', 0], ['Released young', 1], ['Long-lived', 0], ['Fresher and cheaper', 1]], 'Same grape, same town.', { wines: ['brunello'] }),
      q('choice', 'Both Montalcino wines are…', ['Sangiovese only', 'Blends with Merlot', 'White', 'Sweet'], 0, 'One grape.'),
      q('choice', 'Compared with Chianti Classico, Montalcino is…', ['Warmer and drier', 'Cooler and wetter', 'Higher in the Alps', 'By the sea'], 0, 'Riper, bigger wines.'),
    ], ['Brunello: PDO-IT-A1199-AM02', 'Rosso di Montalcino: PDO-IT-A1456-AM03']),

    'it-nobile': R('it-nobile', 'Vino Nobile di Montepulciano', 'The noble wine of a hill town', [
      { kind: 'text', title: 'Sangiovese, not Montepulciano!', big: 'Named after the town',
        body: '<b>Vino Nobile</b> comes from the Tuscan town of <b>Montepulciano</b>. It\'s made mainly from <b>Sangiovese</b>, not the Montepulciano grape of Abruzzo.' },
      { kind: 'layers', title: 'The rules', rows: [
        { h: 'Vino Nobile', t: 'At least 2 years\' ageing, at least 1 of them in wood.' },
        { h: 'Riserva', t: 'At least 3 years, including 6 months in bottle.' },
      ] },
    ], [
      q('choice', 'Vino Nobile di Montepulciano is made mainly from…', ['Sangiovese', 'Montepulciano', 'Nebbiolo', 'Merlot'], 0, 'Named after the town.', { wines: ['chianti'] }),
      q('choice', 'Vino Nobile must be aged at least…', ['2 years, 1 in wood', '6 months', '10 years', 'No rule'], 0, 'Riserva: 3 years.'),
      srt('Town or grape?', ['Town', 'Grape'], [['Montepulciano (Tuscany)', 0], ['Montepulciano d\'Abruzzo\'s Montepulciano', 1]], 'The classic Italian trap.'),
    ], ['Vino Nobile di Montepulciano DOCG: OJ C 227, 2020']),

    'it-bolgheri': R('it-bolgheri', 'Bolgheri', 'Tuscany\'s coast, Bordeaux grapes', [
      { kind: 'text', title: 'Where Super Tuscans began', big: 'Cabernet by the sea',
        body: 'On the Tuscan coast near Livorno, <b>Bolgheri</b> grows <b>Bordeaux grapes</b>: Cabernet Sauvignon, Cabernet Franc, Merlot, plus Syrah and Sangiovese. Sea breezes and gravelly soils suit them.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Sassicaia', v: 'The famous Cabernet estate that started it all; it now has its own DOC, Bolgheri Sassicaia.' },
        { k: 'Rosso Superiore', v: 'The top red category.' },
        { k: 'Whites', v: 'Vermentino, Sauvignon, Viognier.' },
      ] },
    ], [
      q('choice', 'Bolgheri\'s reds are based on…', ['Bordeaux grapes like Cabernet and Merlot', 'Nebbiolo', 'Only Sangiovese', 'Grenache'], 0, 'Plus Syrah and Sangiovese.', { wines: ['cabernet'] }),
      q('choice', 'Sassicaia now has…', ['Its own DOC', 'No appellation', 'A DOCG in Piedmont', 'A Champagne label'], 0, 'Bolgheri Sassicaia.'),
      q('choice', 'Bolgheri is…', ['On the Tuscan coast', 'In the Alps', 'In Sicily', 'Near Venice'], 0, 'Near Livorno.'),
    ], ['Bolgheri DOC: OJ C 183, 2022']),

    'it-toscana': R('it-toscana', 'Toscana IGT', 'Super Tuscans', [
      { kind: 'text', title: 'Breaking the rules', big: 'IGT: more freedom',
        body: 'In the 1970s, some Tuscan producers wanted to use French grapes or pure Sangiovese, which the Chianti rules of the time didn\'t allow. They sold their wines with humble labels, and the "<b>Super Tuscans</b>" became some of Italy\'s most famous wines. Today many use <b>Toscana IGT</b>.' },
      { kind: 'layers', title: 'Italy\'s pyramid', rows: [
        { h: 'DOCG', t: 'The top tier, with the strictest rules.' },
        { h: 'DOC', t: 'Controlled designation of origin.' },
        { h: 'IGT', t: 'A regional wine with more freedom: grapes and methods are up to the producer.' },
      ] },
    ], [
      ord('Order Italy\'s tiers, from most freedom to strictest.', ['IGT', 'DOC', 'DOCG'], 'IGT gives the most freedom.'),
      q('choice', 'Why did Super Tuscans use humble labels?', ['They broke the Chianti rules of the time', 'They were cheap wines', 'They were white', 'They were illegal to sell'], 0, 'French grapes or pure Sangiovese.', { wines: ['chianti'] }),
      q('choice', 'Toscana IGT gives producers…', ['More freedom over grapes and methods', 'Stricter rules', 'A sweetness rule', 'A sparkling rule'], 0, 'Regional, flexible.'),
    ]),

    /* ---------------- VENETO ---------------- */
    'it-valpol': R('it-valpol', 'Valpolicella', 'Ripasso, Amarone, Recioto', [
      { kind: 'text', title: 'The Verona hills', big: 'Corvina & Corvinone: 45–95%',
        body: 'Valpolicella, north of Verona, blends <b>Corvina</b> (and Corvinone) with Rondinella and others. One family of grapes makes four very different wines.' },
      { kind: 'layers', title: 'The family', rows: [
        { h: 'Valpolicella', t: 'Light, cherry-fresh, everyday red.' },
        { h: 'Amarone', t: 'From grapes dried for months (appassimento): rich, strong, dry.' },
        { h: 'Recioto', t: 'The same dried grapes, made sweet.' },
        { h: 'Ripasso', t: 'Valpolicella "re-passed" over the leftover skins of Amarone or Recioto: fuller, in between.' },
      ] },
    ], [
      ord('Order from lightest to richest.', ['Valpolicella', 'Ripasso', 'Amarone'], 'More dried-grape character each step.', { wines: ['amarone'] }),
      srt('Amarone or Recioto?', ['Amarone', 'Recioto'], [['Dry', 0], ['Sweet', 1]], 'Same dried grapes, different finish.'),
      q('choice', 'How is Ripasso made?', ['Valpolicella refermented on Amarone skins', 'From frozen grapes', 'With added spirit', 'In a sealed tank for bubbles'], 0, '"Re-passed".'),
      q('choice', 'Valpolicella\'s main grapes?', ['Corvina and Corvinone', 'Sangiovese', 'Nebbiolo', 'Glera'], 0, '45–95% of the blend.'),
    ], ['Valpolicella, Amarone, Ripasso, Recioto: PDO-IT notices, 2019']),

    'it-soave': R('it-soave', 'Soave', 'Garganega on volcanic hills', [
      { kind: 'text', title: 'East of Verona', big: 'Classico on the hills, plain below',
        body: 'Soave is made mainly from <b>Garganega</b>. The <b>Classico</b> zone, on volcanic hills around the town of Soave, gives the deepest wines; the flat plain below gives lighter ones.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Pergola', v: 'Vines are often trained on the traditional Veronese pergola.' },
        { k: 'Recioto di Soave', v: 'Sweet, from dried Garganega.' },
      ] },
    ], [
      q('choice', 'Soave\'s best wines come from…', ['The volcanic Classico hills', 'The flat plain', 'The coast', 'The Alps'], 0, 'Deeper, longer-lived.', { wines: ['soave'] }),
      q('choice', 'How are Soave vines traditionally trained?', ['On the Veronese pergola', 'As bush vines', 'On walls', 'Under glass'], 0, 'High and airy.'),
      q('choice', 'Soave\'s sweet Recioto is…', ['Made from dried grapes', 'Sparkling', 'Red', 'Fortified'], 0, 'Like Recioto della Valpolicella.'),
    ], ['Soave DOC: OJ C 72, 2020']),

    'it-prosecco': R('it-prosecco', 'Prosecco', 'DOC vs DOCG', [
      { kind: 'text', title: 'Two levels', big: 'Glera, made in a tank',
        body: 'Prosecco is made mainly from <b>Glera</b>, usually by the <b>tank method</b>: fresh pear, apple and white flowers. The big <b>Prosecco DOC</b> covers much of Veneto and Friuli; the steep hills of <b>Conegliano Valdobbiadene</b> make the DOCG "Superiore".' },
      { kind: 'layers', title: 'Inside the DOCG', rows: [
        { h: 'Rive', t: 'From a single steep village or hamlet.' },
        { h: 'Superiore di Cartizze', t: 'A tiny, famous hill: the top.' },
      ] },
    ], [
      ord('Order from broadest to most special.', ['Prosecco DOC', 'Conegliano Valdobbiadene DOCG', 'Rive', 'Superiore di Cartizze'], 'From plain to famous hill.', { wines: ['prosecco'] }),
      q('choice', 'Prosecco\'s main grape?', ['Glera', 'Chardonnay', 'Pinot Grigio', 'Moscato'], 0, 'Fresh and fruity.'),
      q('choice', 'Most Prosecco gets its bubbles…', ['In a sealed tank', 'In the bottle', 'From added CO₂ only', 'From freezing'], 0, 'The tank method (Roots 3.5).'),
    ], ['Prosecco DOC: PDO-IT-A0516-AM05', 'Conegliano Valdobbiadene DOCG: PDO-IT-A0515-AM02']),

    /* ---------------- THE NORTH ---------------- */
    'it-franciacorta': R('it-franciacorta', 'Franciacorta', 'Italy\'s Champagne-method star', [
      { kind: 'text', title: 'By Lake Iseo', big: 'Traditional method, Lombardy',
        body: 'Franciacorta, by Lake Iseo in Lombardy, makes sparkling wine by the <b>traditional method</b> from Chardonnay, Pinot Nero, Pinot Bianco and the local Erbamat. Its name alone on the label means sparkling.' },
      { kind: 'facts', title: 'Styles', rows: [
        { k: 'Satèn', v: 'A softer, creamier style with gentler pressure, from white grapes.' },
        { k: 'Rosé, Millesimato', v: 'Pink, and vintage-dated versions.' },
      ] },
    ], [
      q('choice', 'Franciacorta is made by…', ['The traditional method', 'The tank method', 'Adding CO₂', 'Freezing'], 0, 'Like Champagne.', { wines: ['franciacorta'] }),
      q('choice', 'Franciacorta Satèn is…', ['Softer and creamier, from white grapes', 'Red', 'Sweet', 'Still'], 0, 'Gentler bubbles.'),
      q('choice', 'Erbamat is…', ['A local grape in Franciacorta', 'A lake', 'A producer', 'A sweetness level'], 0, 'Joined the blend recently.'),
    ], ['Franciacorta DOCG: OJ C/2024/5690']),

    'it-trento': R('it-trento', 'Trento', 'Mountain bubbles', [
      { kind: 'text', title: 'Sparkling from the Alps', big: 'Trento DOC',
        body: 'In Trentino\'s mountain valleys, <b>Trento DOC</b> is <b>only</b> made by the traditional method, mainly from Chardonnay and Pinot Noir. Altitude gives crisp acidity.' },
      { kind: 'layers', title: 'Lees ageing', rows: [
        { h: 'Trento', t: 'At least 15 months on the lees.' },
        { h: 'Riserva', t: 'At least 36 months.' },
      ] },
    ], [
      q('choice', 'Trento DOC sparkling must spend at least… on its lees.', ['15 months', '3 months', '9 months', '10 years'], 0, 'Riserva: 36 months.', { wines: ['champagneNV'] }),
      q('choice', 'Trento DOC can only be made by…', ['The traditional method', 'The tank method', 'Carbonation', 'Any method'], 0, 'Second fermentation in bottle.'),
      q('choice', 'What gives Trento its crisp acidity?', ['Mountain altitude', 'Sea breezes', 'Desert heat', 'Volcanic soil'], 0, 'Alpine valleys.'),
    ], ['Trento DOC: PDO-IT-A0752-AM02']),

    'it-altoadige': R('it-altoadige', 'Alto Adige', 'Italy, in German', [
      { kind: 'text', title: 'Südtirol', big: 'Two languages, mountain vineyards',
        body: 'Alto Adige (Südtirol) was part of Austria until 1919; labels are often in Italian and German. Vineyards climb steep Alpine slopes, sheltered from the north by the mountains. Many wines come from excellent <b>co-operatives</b>.' },
      { kind: 'facts', title: 'Grapes', rows: [
        { k: 'Whites', v: 'Pinot Grigio, Pinot Bianco, Sauvignon, and Gewürztraminer, named after the village of Tramin.' },
        { k: 'Reds', v: 'Light Schiava (Vernatsch), dark Lagrein, Pinot Nero.' },
      ] },
    ], [
      q('choice', 'Why are Alto Adige labels often in German?', ['It was part of Austria until 1919', 'German law requires it', 'It\'s in Germany', 'For export only'], 0, 'Also called Südtirol.', { wines: ['italianpg'] }),
      q('choice', 'Gewürztraminer is named after which village?', ['Tramin', 'Bolzano', 'Merano', 'Trento'], 0, 'In Alto Adige.', { wines: ['gewurz'] }),
      srt('Light or dark red?', ['Light', 'Dark'], [['Schiava', 0], ['Lagrein', 1]], 'Two local reds.'),
    ]),

    'it-collio': R('it-collio', 'Friuli Collio', 'White wines on the border', [
      { kind: 'text', title: 'Hills by Slovenia', big: 'Ponca soil, great whites',
        body: 'Collio is a band of hills in Friuli on the Slovenian border (across it lies Goriška Brda). Its layered marl and sandstone soil, <b>ponca</b>, gives textured, mineral <b>whites</b>.' },
      { kind: 'facts', title: 'Grapes & styles', rows: [
        { k: 'Friulano', v: 'The local star: almond, pear, herbs.' },
        { k: 'Ribolla Gialla', v: 'Crisp, or made as skin-contact "orange" wine.' },
        { k: 'Also', v: 'Pinot Grigio, Sauvignon, Malvasia.' },
      ] },
    ], [
      q('choice', 'Collio borders…', ['Slovenia', 'France', 'Austria', 'Switzerland'], 0, 'Goriška Brda is just across.', { wines: ['italianpg'] }),
      q('choice', 'What is ponca?', ['Collio\'s layered marl and sandstone soil', 'A grape', 'A sparkling style', 'A barrel'], 0, 'Gives mineral whites.'),
      q('choice', 'Friulano tastes of…', ['Almond, pear and herbs', 'Blackcurrant', 'Lychee', 'Smoke and tar'], 0, 'The local star.'),
    ]),

    'it-liguria': R('it-liguria', 'Liguria', 'Vermentino & Pigato', [
      { kind: 'text', title: 'The Italian Riviera', big: 'Steep terraces above the sea',
        body: 'Liguria is a thin arc of steep coast around Genoa. Tiny terraced vineyards make fresh, herbal, salty <b>whites</b>, perfect with pesto and seafood.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Vermentino', v: 'Bright, herbal, saline.' },
        { k: 'Pigato', v: 'Closely related to Vermentino: a bit richer and more textured.' },
        { k: 'Cinque Terre', v: 'Dramatic cliff terraces; also the sweet Sciacchetrà from dried grapes.' },
      ] },
    ], [
      q('choice', 'Liguria\'s classic food match?', ['Pesto and seafood', 'Steak', 'Chocolate', 'Curry'], 0, 'Herbal, salty whites.', { wines: ['vermentino'] }),
      q('choice', 'Pigato is…', ['Closely related to Vermentino, a bit richer', 'A red grape', 'A sweet wine', 'A town'], 0, 'A Ligurian favourite.'),
      q('choice', 'Sciacchetrà is…', ['A sweet wine from dried grapes, from Cinque Terre', 'A sparkling wine', 'A grape', 'A red'], 0, 'Rare and precious.'),
    ]),

    /* ---------------- CENTRE, SOUTH & ISLANDS ---------------- */
    'it-verdicchio': R('it-verdicchio', 'Verdicchio dei Castelli di Jesi', 'The Marche\'s white', [
      { kind: 'text', title: 'Hills of the Esino valley', big: 'Almond and a bitter twist',
        body: 'Inland from Ancona on the Adriatic, the hills along the Esino river give <b>Verdicchio</b>: pale, dry, with a distinctive <b>almond</b> aroma and a pleasant <b>bitter</b> finish. The best gain weight with age.' },
    ], [
      q('choice', 'Verdicchio dei Castelli di Jesi grows along which river?', ['The Esino', 'The Po', 'The Arno', 'The Tiber'], 0, 'Inland from Ancona.', { wines: ['verdicchio'] }),
      q('choice', 'Its typical aroma?', ['Almond', 'Lychee', 'Blackcurrant', 'Petrol'], 0, 'With a bitter twist.'),
      q('choice', 'Which sea is near the Marche?', ['The Adriatic', 'The Tyrrhenian', 'The Ionian', 'The Atlantic'], 0, 'Italy\'s east coast.'),
    ], ['Verdicchio dei Castelli di Jesi: OJ C 288, 2022']),

    'it-sardinia': R('it-sardinia', 'Sardinia', 'Vermentino di Gallura, Cannonau', [
      { kind: 'text', title: 'An island apart', big: 'Wind, granite, old bush vines',
        body: 'Sardinia\'s wines feel Spanish as much as Italian. In the north-east, granite <b>Gallura</b> makes the island\'s only DOCG: <b>Vermentino di Gallura</b>. Across the island, <b>Cannonau</b>, Sardinia\'s name for Grenache, gives warm, spicy reds.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Cannonau', v: 'The same grape as Grenache/Garnacha.' },
        { k: 'Carignano del Sulcis', v: 'Old, ungrafted Carignan vines in the sandy south-west.' },
      ] },
    ], [
      q('choice', 'Cannonau is Sardinia\'s name for…', ['Grenache', 'Sangiovese', 'Merlot', 'Vermentino'], 0, 'Warm and spicy.', { wines: ['grenache'] }),
      q('choice', 'Sardinia\'s only DOCG?', ['Vermentino di Gallura', 'Cannonau di Sardegna', 'Carignano del Sulcis', 'Etna'], 0, 'On granite, in the north-east.', { wines: ['vermentino'] }),
      q('choice', 'Carignano del Sulcis comes from…', ['Old, ungrafted vines in sandy soil', 'Frozen grapes', 'Dried grapes', 'Imported grapes'], 0, 'Sand kept phylloxera away.'),
    ], ['EU register: Vermentino di Gallura DOCG']),

    'it-etna': R('it-etna', 'Etna', 'Wine on a volcano', [
      { kind: 'text', title: 'Europe\'s highest active volcano', big: 'Sicily\'s first DOC',
        body: 'Vineyards wrap around Etna\'s slopes on <b>volcanic</b> soils, often on <b>terraces</b> of black lava stone. They\'re high up, so the harvest is the <b>latest in Sicily</b>.' },
      { kind: 'layers', title: 'Wines', rows: [
        { h: 'Etna Rosso', t: 'Nerello Mascalese: pale, perfumed, smoky.' },
        { h: 'Etna Bianco', t: 'Carricante: crisp, lemony, saline.' },
        { h: 'Etna sparkling', t: 'Traditional-method sparkling, from Nerello Mascalese.' },
      ] },
      { kind: 'text', title: 'Contrade', body: 'Labels often name a <b>contrada</b>, a traditional named district, a little like a cru.' },
    ], [
      q('choice', 'Etna\'s red grape?', ['Nerello Mascalese', 'Nero d\'Avola', 'Aglianico', 'Primitivo'], 0, 'Pale and perfumed.', { wines: ['etnarosso'] }),
      q('choice', 'A "contrada" on an Etna label is…', ['A named district, like a cru', 'A sweetness level', 'A grape', 'A producer'], 0, 'Traditional names.'),
      q('choice', 'Etna was Sicily\'s first…', ['DOC', 'Vineyard', 'Winery', 'Sparkling wine'], 0, 'A historic appellation.'),
    ], ['Etna DOC: OJ C 240, 2022']),

    'it-sicily': R('it-sicily', 'Sicily beyond Etna', 'Nero d\'Avola, Grillo', [
      { kind: 'text', title: 'The Mediterranean\'s biggest island', big: 'Sun, wind and native grapes',
        body: 'Sunny, windy Sicily has turned from bulk wine to quality. The <b>Sicilia DOC</b> covers the whole island.' },
      { kind: 'facts', title: 'Grapes', rows: [
        { k: 'Nero d\'Avola', v: 'Also called Calabrese: deep, plummy, juicy red.' },
        { k: 'Grillo', v: 'Crisp, citrusy white; also a Marsala grape.' },
        { k: 'Frappato', v: 'Light, floral red; blended with Nero d\'Avola in Cerasuolo di Vittoria, Sicily\'s only DOCG.' },
        { k: 'Marsala', v: 'The island\'s historic fortified wine.' },
      ] },
    ], [
      q('choice', 'Nero d\'Avola\'s other name?', ['Calabrese', 'Cannonau', 'Primitivo', 'Corvina'], 0, 'Deep and plummy.', { wines: ['neroavola'] }),
      q('choice', 'Grillo is…', ['A crisp white, also used for Marsala', 'A red', 'A sweet wine', 'A volcano'], 0, 'Citrusy and fresh.'),
      q('choice', 'Cerasuolo di Vittoria blends Nero d\'Avola with…', ['Frappato', 'Grillo', 'Merlot', 'Syrah'], 0, 'Sicily\'s only DOCG.'),
    ], ['Sicilia DOC: OJ C 416, 2019']),

    'it-taurasi': R('it-taurasi', 'Taurasi', 'The Barolo of the south', [
      { kind: 'text', title: 'Inland Campania', big: 'Aglianico in the hills of Irpinia',
        body: 'Taurasi comes from hills along the Calore river near Avellino. It\'s <b>Aglianico</b>: dark, tannic, high in acid, needing time.' },
      { kind: 'layers', title: 'Ageing rules', rows: [
        { h: 'Taurasi', t: 'At least 3 years, 1 in wood.' },
        { h: 'Riserva', t: 'At least 4 years, 18 months in wood.' },
      ] },
    ], [
      q('choice', 'Taurasi must age at least…', ['3 years, 1 in wood', '6 months', '10 years', 'No rule'], 0, 'Riserva: 4 years.', { wines: ['taurasi'] }),
      q('choice', 'Taurasi\'s nickname?', ['The Barolo of the south', 'Bull\'s Blood', 'The king of Rioja', 'Liquid gold'], 0, 'Tannic and long-lived.'),
      q('choice', 'Taurasi is in…', ['Campania', 'Piedmont', 'Sicily', 'Veneto'], 0, 'Near Avellino.'),
    ], ['Taurasi DOCG: OJ C 64, 2021']),

    'it-fiano': R('it-fiano', 'Fiano di Avellino', 'Irpinia\'s nutty white', [
      { kind: 'text', title: 'Hills of Irpinia', big: 'Between the Calore and Sabato valleys',
        body: 'Fiano di Avellino grows in the hills around Avellino, on varied soils with volcanic traces. Waxy and pear-scented young, it turns <b>honeyed and nutty</b> with age. There are Riserva and sparkling versions too.' },
    ], [
      q('choice', 'Fiano di Avellino turns… with age.', ['Honeyed and nutty', 'Pink', 'Fizzy', 'Sharper'], 0, 'One of Italy\'s best agers.', { wines: ['fiano'] }),
      q('choice', 'Fiano di Avellino\'s area is in…', ['Irpinia, Campania', 'Tuscany', 'Sardinia', 'Lombardy'], 0, 'Around Avellino.'),
      q('choice', 'Which sparkling version now exists?', ['Fiano di Avellino Spumante', 'None', 'Fiano Icewine', 'Fiano Port'], 0, 'Added recently.'),
    ], ['Fiano di Avellino DOCG: C/2025/298']),

    'it-greco': R('it-greco', 'Greco di Tufo', 'Eight villages, volcanic soil', [
      { kind: 'text', title: 'Around Tufo', big: 'Steep slopes, volcanic origin',
        body: 'Greco di Tufo comes from <b>eight villages</b> around Tufo, on steep slopes with soils of volcanic origin and the Sabato river below. Crisp, peachy, mineral, with Riserva and sparkling versions.' },
    ], [
      q('choice', 'How many villages make Greco di Tufo?', ['Eight', 'One', 'Fifty', 'Three hundred'], 0, 'Around Tufo.', { wines: ['greco'] }),
      q('choice', 'Greco di Tufo\'s soils are…', ['Of volcanic origin', 'Chalk', 'Slate', 'Desert sand'], 0, 'With mineral-rich subsoil.'),
      q('choice', 'Which river flows through the Greco di Tufo hills?', ['The Sabato', 'The Po', 'The Arno', 'The Adige'], 0, 'In Irpinia.'),
    ], ['Greco di Tufo DOCG: OJ C 61, 2021']),

    'it-montepulciano': R('it-montepulciano', 'Montepulciano d\'Abruzzo', 'The grape, not the town', [
      { kind: 'text', title: 'Abruzzo\'s red', big: 'Between the mountains and the Adriatic',
        body: 'On Abruzzo\'s coastal hills, the <b>Montepulciano grape</b> gives deep, soft, plummy reds, great value and easy to love. Don\'t mix it up with Tuscany\'s Vino Nobile di Montepulciano, which is Sangiovese.' },
      { kind: 'facts', title: 'Also', rows: [
        { k: 'Cerasuolo d\'Abruzzo', v: 'A deep cherry-pink rosé from Montepulciano.' },
      ] },
    ], [
      q('choice', 'Montepulciano d\'Abruzzo is made from…', ['The Montepulciano grape', 'Sangiovese, as in Vino Nobile di Montepulciano', 'Nebbiolo', 'Primitivo'], 0, 'The grape, not the town.', { wines: ['montepulciano'] }),
      q('choice', 'Cerasuolo d\'Abruzzo is…', ['A deep pink rosé', 'A white', 'A sparkling red', 'A sweet wine'], 0, 'From Montepulciano.'),
      q('choice', 'Montepulciano d\'Abruzzo is usually…', ['Deep, soft and plummy', 'Pale and tannic', 'Sweet', 'Sparkling'], 0, 'Great value.'),
    ], ['Montepulciano d\'Abruzzo DOC: OJ C 220, 2023']),

    'it-primitivo': R('it-primitivo', 'Primitivo di Manduria', 'Puglia\'s powerhouse', [
      { kind: 'text', title: 'The heel of Italy', big: 'Hot, flat, near two seas',
        body: 'Manduria lies in sunny Puglia, near the Ionian Sea. <b>Primitivo</b> (Zinfandel) ripens early here and gets very ripe: rich, jammy, high-alcohol reds. There\'s also a sweet version, Primitivo di Manduria Dolce Naturale.' },
      { kind: 'facts', title: 'Good to know', rows: [
        { k: 'Name', v: '"Primitivo" comes from "primo", first: it ripens early.' },
        { k: 'Bush vines', v: 'Old alberello (bush) vines are traditional here.' },
      ] },
    ], [
      q('choice', 'Why is it called Primitivo?', ['It ripens early ("primo")', 'It\'s very old', 'It\'s simple', 'A saint\'s name'], 0, 'First to ripen.', { wines: ['zinfandel'] }),
      q('choice', 'In Manduria, Primitivo is the same grape as…', ['Zinfandel', 'Nebbiolo', 'Sangiovese', 'Aglianico'], 0, 'Remember the DNA story.'),
      q('choice', 'Alberello means…', ['Bush vine', 'Pergola', 'Barrel', 'Sweet'], 0, 'Traditional in hot, windy places.'),
    ]),

    /* ---------------- SLOVENIA & CROATIA ---------------- */
    'si-brda': R('si-brda', 'Goriška Brda & orange wine', 'Over the border from Collio', [
      { kind: 'text', title: 'One landscape, two countries', big: 'Brda = Collio',
        body: 'Goriška Brda is the Slovenian side of the same hills as Italy\'s Collio, with the same ponca soils. It\'s famous for <b>Rebula</b> (Ribolla Gialla) and for <b>orange wine</b>.' },
      { kind: 'text', title: 'Orange wine', body: 'White grapes fermented <b>with their skins</b> for days to months, like a red. The wine turns amber, gains <b>tannin</b>, and tastes of dried apricot, tea and nuts. It\'s the same idea as Georgia\'s qvevri wines.' },
    ], [
      q('choice', 'Goriška Brda is the Slovenian side of…', ['Collio', 'Alto Adige', 'Prosecco', 'Tokaj'], 0, 'Same hills, same soil.', { wines: ['rkatsiteli'] }),
      q('choice', 'Orange wine is…', ['White grapes fermented with their skins', 'Wine made from oranges', 'A rosé', 'A sweet wine'], 0, 'Amber, with tannin.'),
      q('choice', 'Rebula is the Slovenian name for…', ['Ribolla Gialla', 'Pinot Grigio', 'Friulano', 'Riesling'], 0, 'Brda\'s star grape.'),
    ]),

    'hr-dalmatia': R('hr-dalmatia', 'Dalmatia', 'Plavac Mali', [
      { kind: 'text', title: 'Croatia\'s coast and islands', big: 'Steep slopes above the Adriatic',
        body: 'Along the Dalmatian coast, vines cling to <b>steep, rocky slopes</b> facing the sea. Sun, reflected light from the water and warm stone ripen <b>Plavac Mali</b>, a child of Zinfandel (Crljenak Kaštelanski): powerful, high-alcohol, dark reds.' },
      { kind: 'facts', title: 'Famous names', rows: [
        { k: 'Dingač & Postup', v: 'Steep south-facing slopes on the Pelješac peninsula.' },
        { k: 'Islands', v: 'Hvar and Brač also grow Plavac Mali; whites like Pošip on Korčula.' },
      ] },
    ], [
      q('choice', 'Plavac Mali is a child of…', ['Zinfandel (Crljenak Kaštelanski)', 'Pinot Noir', 'Nebbiolo', 'Merlot'], 0, 'Croatia\'s link to the Zinfandel story.', { wines: ['zinfandel'] }),
      q('choice', 'Dingač is on…', ['The Pelješac peninsula', 'Istria', 'Hvar', 'Zagreb'], 0, 'Steep and sun-baked.'),
      q('choice', 'Pošip is…', ['A white grape from Korčula', 'A red grape', 'A sweet wine', 'A town'], 0, 'Island white.'),
    ]),
  });
})();
