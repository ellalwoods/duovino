# Duovino 🍷

A daily wine-learning app that feels like wine: seasonal, sensory, and better with age.
See [`CONCEPT.md`](CONCEPT.md) for the full product concept.

## What's in this build

Four tabs:

- **Today:** the seasonal sky (weather and the weekly *Vintage*), your **Up next** unit, a nudge when cellar bottles are ready, and optional **Tasting specials**.
- **Roots:** the syllabus drawn as soil. There are six chapters, one per stratum (Topsoil → Granite), and 37 units. Your root grows down through the units as you finish them. See [`SYLLABUS.md`](SYLLABUS.md).
- **Wine list:** Track B, *Reading the label*. 91 units set out like a restaurant wine list, by country and region. Every lesson starts from a label. B0 (how labels work) is written; appellation units are written only after their rules have been checked against the official regulations (see `SYLLABUS.md`).
- **Cellar:** every concept you learn becomes a bottle. Due bottles glow, tasting them ages them, and neglected ones get *corked*.

Each unit is a **lesson, then a tasting**:

1. **The Pour:** 5–7 swipeable lesson cards (text, *try it* reveals, scales, side-by-side compares, aroma layers).
2. **The Taste:** 6–7 questions on what the lesson taught. Formats: sort into groups, place on a scale, put in order, label decoder, blind deduction (swirl the glass to reveal clues) and multiple choice.
3. **From your cellar:** one recall question from an earlier unit.

Units 1.1–1.3 are written. The rest of the syllabus appears on the Roots tab as "being poured".

## Run it

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Turn on **Settings → Draft lessons → Preview drafts** (or add `?drafts` to the URL) to preview draft units such as Champagne that are waiting for their rule check. Add `?demo` to the URL (`http://localhost:8000/?demo`) to start with a lived-in cellar, with two units done and a cellar of ageing and corked bottles.

To use it on your phone, enable **GitHub Pages** for this repository (Settings → Pages → deploy from branch), then open the URL in Safari and tap **Share → Add to Home Screen**.

## Files

| File | What it is |
|---|---|
| `index.html` | Shell and shared SVG filters (wine-stain edges, dust) |
| `styles.css` | The whole visual language |
| `data.js` | Seasons, soil strata, concepts, tasting specials |
| `syllabus.js` | Track A: chapters, units, lesson cards and questions |
| `labels.js` | Track B: B0 units and the wine list skeleton |
| `champagne.js` | Track B: Champagne AOC (10 lessons + checkpoint, drafts until rule-checked) |
| `app.js` | Screens, games, swirl gesture, spaced-repetition cellar, sounds |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and home-screen install |

To write a unit, give its entry in `syllabus.js` a `lesson` (card kinds: `text`, `try`, `compare`, `scale`, `layers`, `label`, `facts`) and `questions` (types: `choice`, `odd`, `sort`, `slider`, `order`, `label`, `chain`, `blind`), and add its concepts to `D.concepts`.
