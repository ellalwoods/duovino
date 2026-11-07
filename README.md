# Duovino 🍷

A daily wine-learning app that feels like wine: seasonal, sensory, and better with age.
See [`CONCEPT.md`](CONCEPT.md) for the full product concept.

## What's in this first build

- **Home: a vineyard cross-section** you scroll down through
  - **Sky:** follows the real vineyard calendar for your hemisphere. Your daily activity sets the weather, and each week gets a *Vintage* rating.
  - **Vine:** today's *Flights* of short, themed lessons. The flight that fits the current season is highlighted.
  - **Soil:** your level, shown as roots growing down through real soil layers, each with a short note about what it does to wine.
  - **Cellar:** a preview of your bottles.
- **Four flights, 28 glasses:** Winter in the Vineyard · The Loire in Three Glasses · Why is Barolo so grippy? · Cool vs Warm (Chardonnay)
- **Four game types**
  - **Blind:** swirl the glass with your finger to reveal clues in tasting order. The earlier you guess, the deeper your roots grow.
  - **Label Decoder:** tap the right word on a wine label.
  - **Put in order**
  - **Multiple choice**
- **The Cellar:** every concept you learn becomes a bottle. Bottles that are due for review glow. Tasting one ages it (dust, a yellowing label, cobwebs). Neglected bottles get *corked*.
- **Botty:** a speck of noble rot who reacts to your answers.
- Works on your phone, saves progress on the device, and can be added to the home screen.

## Run it

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Add `?demo` to the URL (`http://localhost:8000/?demo`) to start with a lived-in cellar, so you can see bottles ageing and getting corked.

To use it on your phone, enable **GitHub Pages** for this repository (Settings → Pages → deploy from branch), then open the URL in Safari and tap **Share → Add to Home Screen**.

## Files

| File | What it is |
|---|---|
| `index.html` | Shell and shared SVG filters (wine-stain edges, dust) |
| `styles.css` | The whole visual language |
| `data.js` | Content: seasons, soil strata, cellar concepts, flights |
| `app.js` | Screens, games, swirl gesture, spaced-repetition cellar, sounds |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and home-screen install |

To add a flight, add an entry to `flights` in `data.js` (and its concepts to `concepts`). Supported question types are `choice`, `blind`, `label` and `order`.
