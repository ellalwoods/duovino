# Duovino 🍷

A daily wine-learning app that feels like wine: seasonal, sensory, and better with age.
See [`CONCEPT.md`](CONCEPT.md) for the full product concept.

## What's in this build

Three tabs:

- **Today:** the seasonal sky (weather and the weekly *Vintage*), your **Up next** unit, a nudge when cellar bottles are ready, and optional **Tasting specials**.
- **Roots:** the syllabus drawn as soil. There are six chapters, one per stratum (Topsoil → Granite), and 37 units. Your root grows down through the units as you finish them. See [`SYLLABUS.md`](SYLLABUS.md).
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

Add `?demo` to the URL (`http://localhost:8000/?demo`) to start with a lived-in cellar, with two units done and a cellar of ageing and corked bottles.

To use it on your phone, enable **GitHub Pages** for this repository (Settings → Pages → deploy from branch), then open the URL in Safari and tap **Share → Add to Home Screen**.

## Files

| File | What it is |
|---|---|
| `index.html` | Shell and shared SVG filters (wine-stain edges, dust) |
| `styles.css` | The whole visual language |
| `data.js` | Seasons, soil strata, concepts, tasting specials |
| `syllabus.js` | Chapters, units, lesson cards and questions |
| `app.js` | Screens, games, swirl gesture, spaced-repetition cellar, sounds |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and home-screen install |

To write a unit, give its entry in `syllabus.js` a `lesson` (card kinds: `text`, `try`, `compare`, `scale`, `layers`) and `questions` (types: `choice`, `sort`, `slider`, `order`, `label`, `blind`), and add its concepts to `D.concepts`.
