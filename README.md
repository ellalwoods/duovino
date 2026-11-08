# Duovino 🍷

A daily wine-learning app that feels like wine: seasonal, sensory, and better with age.
See [`CONCEPT.md`](CONCEPT.md) for the full product concept.

## What's in this build

Four tabs:

- **Today:** what to learn next in each track, your cellar, your week, and what's happening in the vineyard this month.
- **Roots:** Track A, *How wine works*, drawn as soil layers (six chapters, Topsoil → Granite).
- **Wine list:** Track B, *Grapes & places*, in three parts: read a label → meet the grapes (the big international grapes first) → travel the regions (Europe in depth, plus Greece, Georgia, Lebanon, England, the Americas, Australia, New Zealand, South Africa, Japan). See [`SYLLABUS.md`](SYLLABUS.md).
- **Cellar:** real wines you've learned (grapes, appellations, styles), each with a tasting profile. Taste them from memory to age them.

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
| `grapes.js` | Track B: grape lessons (Chardonnay, Sauvignon Blanc, Riesling) |
| `wines.js` | The cellar's wines and their tasting profiles |
| `champagne.js` | Track B: Champagne AOC (10 lessons + checkpoint; 1–9 and checkpoint checked against the 2025 cahier des charges, lesson 10 still a draft) |
| `app.js` | Screens, games, swirl gesture, spaced-repetition cellar, sounds |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and home-screen install |

To write a unit, give its entry in `syllabus.js` a `lesson` (card kinds: `text`, `try`, `compare`, `scale`, `layers`, `label`, `facts`) and `questions` (types: `choice`, `odd`, `sort`, `slider`, `order`, `label`, `chain`, `blind`), and add its concepts to `D.concepts`.
