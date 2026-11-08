# Duovino 🍷

A daily wine-learning app that feels like wine: seasonal, sensory, and better with age.
See [`CONCEPT.md`](CONCEPT.md) for the full product concept.

## What's in this build

Five tabs (icons only):

- **Home:** one living scene (the vineyard by season and time of day: dawn, day, sunset, blue hour, or a postcard you've earned) and one **Continue** button.
- **Learn:** *Roots* (how wine works, drawn as soil layers) and *Grapes & places* (read a label → meet the grapes → travel the regions), behind one switch. See [`SYLLABUS.md`](SYLLABUS.md).
- **Today's glass:** one wine from your cellar a day. Swirl the glass, picture the wine, pour to see its tasting note, and say whether you knew it.
- **Cellar:** the real wines you've learned, racked by style, each with a tasting profile.
- **Journey:** a stain map of the regions you've explored (Europe / World), your days, wines and regions as ring stains, and your postcards. Every region on the map has its own postcard (35 in all). Finishing a region unlocks it, and you can set it as your home view.

Each unit is a short lesson, then a tasting: sort, place on a scale, order, label decoder, label → grape → taste chain, blind deduction (swirl the glass), odd one out, multiple choice, and a wine from your cellar to recall.

## Run it

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Add `?demo` to the URL to start with a lived-in vineyard (two units done, a cellar of wines at different ages). Turn on **Settings → Draft lessons → Preview drafts** (or add `?drafts`) to preview units still waiting for their rule check.

## Put it on your phone (GitHub Pages)

1. Merge the pull request into `main`.
2. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
3. After a minute or two the app is live at `https://ellalwoods.github.io/duovino/`.
4. On iPhone, open it in **Safari → Share → Add to Home Screen**. It then opens full-screen and works offline.

## Your progress

Progress is stored only in the browser on that device. Use **Settings → Backup → Export backup** now and then (copy the text into Notes or download the file), and **Import backup** to restore it on a new phone or after clearing Safari.

## Files

| File | What it is |
|---|---|
| `index.html` | Shell and shared SVG filters (wine-stain edges, dust) |
| `styles.css` | The whole visual language |
| `data.js` | Seasons, soil strata, concepts used in lessons |
| `syllabus.js` | Track A: chapters, units, lesson cards and questions |
| `labels.js` | Track B: B0 units and the full grapes & regions list |
| `grapes.js`, `grapes-core.js` | Track B: the eight big international grape lessons |
| `grapes-aromatic.js` | Track B: the nine aromatic & classic whites |
| `grapes-med.js` | Track B: the ten Mediterranean & island whites |
| `grapes-reds.js` | Track B: the eleven classic reds |
| `grapes-beaten.js` | Track B: seventeen grapes off the beaten track |
| `regions-3.js` | Track B: the New World (USA, Canada, Chile, Argentina, Australia, New Zealand, South Africa) |
| `regions-4.js` | Track B: Italy, Slovenia & Croatia |
| `regions-2.js` | Track B: Spain, Portugal, Austria and Germany |
| `regions-1.js` | Track B: region lessons (Alsace, Switzerland, Hungary, Greece, Georgia, Lebanon, England, Uruguay, Brazil, Japan) |
| `wines.js` | The cellar's wines and their tasting profiles |
| `scenes.js` | Artwork: the living sky, region postcards, Journey maps |
| `champagne.js` | Track B: Champagne AOC (10 lessons + checkpoint; 1–9 and checkpoint checked against the 2025 cahier des charges, lesson 10 still a draft) |
| `app.js` | Screens, games, swirl gesture, spaced-repetition cellar, sounds |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and home-screen install |

To write a unit, give its entry in `syllabus.js` a `lesson` (card kinds: `text`, `try`, `compare`, `scale`, `layers`, `label`, `facts`) and `questions` (types: `choice`, `odd`, `sort`, `slider`, `order`, `label`, `chain`, `blind`), and add its concepts to `D.concepts`.
