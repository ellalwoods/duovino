# Duovino 🍷

A daily wine-learning app that feels like wine: seasonal, sensory, and better with age.
See [`CONCEPT.md`](CONCEPT.md) for the full product concept.

## What's in this build

Five tabs (icons only):

- **Practice:** unlimited shuffled rounds, any time. *Blind tasting* generates questions from the wines in your cellar (identify from clues, place on a scale, pick the aroma, name the grape); wines you miss come back sooner. *Lessons & rules* shuffles questions from the lessons you've finished in both tracks, filterable to a Roots chapter, appellation rules, labels, grapes, a country, or a region from the map. Open it from Roots, Grapes & places or the Cellar.
- **Checkpoints:** one per Roots chapter and per country (with two or more lessons). Once every lesson in it is done: a mixed tasting of up to 11 shuffled questions plus a blind finale. Pass at 80% for a stain-ring badge on Journey. Retake any time.
- **Journey map:** tap any region for its postcard, progress, lessons, a focused practice, and its country's checkpoint.
- **Today's glass:** one wine from your cellar a day. Swirl the glass, drag sliders for sweetness, acidity, tannin, body and alcohol, pick the aromas from a shuffled list with deliberate lookalikes, then compare with the real profile.
- **Home:** one living scene (the vineyard by season and time of day: dawn, day, sunset, blue hour, or a postcard you've earned) and one **Continue** button.
- **Learn:** *Roots* (how wine works, drawn as soil layers) and *Grapes & places* (read a label → meet the grapes → travel the regions), behind one switch. See [`SYLLABUS.md`](SYLLABUS.md).
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
| `regions-5.js` | Track B: France (Burgundy, Bordeaux, Rhône, Loire, Provence & Corsica, the South) |
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

## Cloud cellars (optional)

Each person gets their own cellar, opened by typing their name and tapping a wine and a region (say Ella + Barolo + Rioja): no email, no password, nothing to remember beyond two pictures. It keeps people's progress apart rather than locking anything away. Settings shows your wine and region, and can change them. Progress syncs to Supabase as you go, so it survives clearing Safari or changing phone.

Setup (once):
1. In the Supabase project, open **SQL Editor**, paste `supabase/duovino.sql`, and run it. It only creates `duovino_`-prefixed objects (one table, two functions) and touches nothing else.
2. Put the project URL and the **anon public** key in `cloud-config.js`.

How it stays private: the name + wine + region is never stored, only its SHA-256 hash; the table has row-level security with no policies, so it can't be read or listed; the app can only call `duovino_load` and `duovino_save` for a cellar it knows. With 64 wine/region pairs per name it isn't a lock, just a way to keep two people's progress separate.

With `cloud-config.js` left blank, the app works exactly as before, with progress on the device only.

### Analytics (admins only)

Run `supabase/duovino-admin.sql` after `duovino.sql`. It adds `duovino_admins` and `duovino_admin_list`, and makes the cellar named Ella an admin. Admins get an "Everyone's progress" card on their profile: each cellar's last activity, a 14-day activity strip, Roots / grapes / regions progress, wines, % known, checkpoints, practice rounds and shakiest wines. The database decides who's an admin, so nobody can unlock it by editing the app.
