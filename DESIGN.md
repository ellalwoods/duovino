# Duovino design system

Duovino is a Duolingo-style wine-learning web app (vanilla JS, mobile-first PWA, also laid out for desktop).
The look is **"paper, ink and wine"**: a warm, tactile, slightly vintage notebook, like a sommelier's tasting book
with wine-stain rings on it. Calm and literate rather than loud and gamey. Light mode only.

---

## 1. Feel and principles

- **Paper, not screens.** Warm cream backgrounds with a faint noise grain over everything. No pure white, no pure black, no flat greys.
- **Ink type on paper.** An expressive serif for reading and headings; a small, spaced, uppercase monospace for labels, like a typewriter or a wine label.
- **Wine is the accent colour,** and it changes with context: each lesson, wine and region tints the page with its own wine colour.
- **Hand-made marks.** Rings and badges use an SVG "stain" filter so they look like wine-glass rings, not crisp vector circles. Maps have a slight wobble.
- **Tactile buttons.** Buttons and cards have a solid 3px bottom "lip" shadow and press down 2px when tapped.
- **Sentence case everywhere** ("Grapes & places", "Dress Botty", "The big international grapes tasting"). Proper nouns keep their capitals. Mono labels are uppercase via CSS, not typed in caps.
- **Warm, knowing, a little cheeky voice.** Short sentences, British spelling, no exclamation-mark spam, no emoji in body copy (a few functional ones: 🔒 ✨ ✓).
- **One clear primary action per screen,** a full-width pill at the bottom.

---

## 2. Colour

### Core tokens
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#f5eee2` | App background |
| `--paper-2` | `#ece2d1` | Segmented-control track, subtle fills |
| `--cream` / card | `#fffaf2` | Cards, options, inputs, chips |
| `--line` | `#e6d9c3` | Hairlines; card borders use `#ece2cf` / `#e3d6c1` |
| `--ink` | `#2a1a1f` | Text, dark buttons (a warm near-black, aubergine-brown) |
| `--ink-soft` | `#6a5458` | Secondary text, captions, mono labels |
| `--btn` | `#a8434e` | **Primary action** (wine red); lip shadow `#86323c` |
| `--wine` | `#7b2a2a` | Brand wine (garnet) |
| `--fw` | per context | "Feature wine" colour of the current lesson/wine; tints highlights, meters, borders |
| Desktop page bg | `#e9dfcd` + grain | Around the app on wide screens |

### Feedback
| State | Fill | Border/lip |
|---|---|---|
| Right | `#e5efcf` (sheet `#eef3dd`) | `#7f9a45` olive green |
| Wrong | `#f5d6d2` (sheet `#f8e3dd`) | `#a8443a` brick red; option shakes |
| Earned / success note | `#eef3e2` | text `#4f6a2a` |
| Locked / hint note | `#f6e7e2` | text `#a8434e` |
| Ready dot | `#f0c76a` gold glow | |

### Wine palette (`D.C`, used for glasses, bottles and `--fw`)
lemonGreen `#e4e3a2` · lemon `#efdc7c` · gold `#ddb04a` · amber `#c4842c` · tawny `#a5602d` ·
pink `#efa3a4` · salmon `#ee9f80` · ruby `#8b1a2b` · garnet `#7b2a2a` · purple `#4f1637`

Supporting accents: olive `#7c9a4e` (vines, regions), plum `#7c5a8a` (Practice/rules), sea `#dde6e3` and river `#a9c4cc` (maps).

---

## 3. Typography

- **Serif: Fraunces** (Google Fonts, variable: `opsz`, `wght` 300–800, `SOFT`, `WONK`). Fallbacks: Iowan Old Style, Georgia.
  - Big titles: italic, weight 500, `font-variation-settings: 'SOFT' 100, 'WONK' 1` (soft, quirky italic), about 30–40px.
  - Card/section headings: weight 500–600, about 17–26px, letter-spacing −0.01em.
  - Body: about 15–17px, line-height about 1.4–1.45.
- **Mono: DM Mono** (400/500). Fallbacks: SF Mono, Menlo.
  - Used for `.mono` / `.eyebrow` labels: 10–12px, **uppercase**, letter-spacing 0.08–0.1em, colour `--ink-soft`.
  - Examples: "THE POUR · UNIT B1.6", "HOW WELL YOU KNOW IT", "YOUR WINE", tab and step labels, link buttons ("or just read the tasting note", underlined).
- Pattern: **eyebrow (mono, small, uppercase) → italic serif title → serif body.**

---

## 4. Surfaces, shape and depth

- **Grain:** an SVG fractal-noise texture (`--grain`) layered on the paper and on cards and sheets.
- **Radii:** pills `999px` (primary buttons, chips, segmented controls); cards 18–26px; options and inputs 14–16px; small tiles 12–14px.
- **Card:** `#fffaf2` + grain, 1px border `#e3d6c1`, lip `0 3px 0 #e3d6c1`, plus a soft drop `0 22px 40px -24px rgba(42,26,31,.5)`.
- **Lip-press interaction:** `box-shadow: 0 3px 0 <darker>`; on `:active` `translateY(2px)` and the lip shrinks to 1px.
- **Stain filter** (`#stain`, defined once in `index.html`): turbulence + displacement so circles look like wine rings. Used on progress rings, checkpoint badges, stats and map marks.
- **Paper filter** (`#paper`) adds texture to maps and illustrations.

---

## 5. Layout

- **Mobile-first, phone frame max 480px.** Fixed-height app shell: each page (`.tabview` / `.player`) scrolls inside; body never scrolls.
- **Bottom tab bar:** floating rounded pill (`rgba(255,250,241,.84)` with blur), 5 icon tabs: Home (sun), Learn (vine), **Today's glass** (raised round centre button with a gold dot when ready), Cellar (bottle), Journey (globe). Active tab: a small wine-red dot underneath.
- **Desktop (≥900px):** the tab bar becomes a **left sidebar** (232px, "Duovino" in italic Fraunces, labelled items, active item a white rounded pill). Content sits in a centred column (760px; 680px for lessons and questions). Dialogs float centred; Home shows the vineyard as a framed card.
- Spacing is generous: 18–24px page padding, 8–14px gaps between cards, safe-area insets respected.
- Pages remember their scroll position; collapsible sections remember open or closed.

---

## 6. Components

- **Primary button:** full-width pill, `--btn` wine red, white serif 17px semibold, 3px lip. Disabled at 40–45% opacity.
- **Ghost / link buttons:** mono uppercase, `--ink-soft`; links underlined.
- **Segmented control (`.seg`):** pill track `--paper-2`; the selected segment fills wine red with white text.
- **Option (quiz answer):** cream rounded rectangle, 1.5px `#dccdb5` border + lip, serif 17px. Turns green or red (see Feedback). A 2-column grid for short answers.
- **Chips / aroma pills:** cream pills; selected = tinted with `--fw`; result states: right (green fill), missed (dashed green outline), wrong (red, struck through).
- **Feedback sheet:** slides up from the bottom (green for right, pink for wrong), with Botty, an italic one-liner ("Spot on. Pour yourself a little extra." / "A slightly corked answer. Let's decant it."), the correction, an explanation and a Next button.
- **Lesson card (`.lcard`):** one idea per card, swiped or "Next"ed; slides in with a slight rotation. Kinds: text (title + big italic pull line + body), facts (dl rows), compare (two tinted columns), layers (stacked rows), scale, try-it (tap to reveal), label (an interactive wine label), and map.
- **Wine label:** an illustrated bottle label (double ruled border, slight −1.2° tilt, styles per country: burgundy, champagne, italy, spain, germany, generic). Underlined terms are tappable.
- **Meters:** rounded 10px bars on a quartered track: solid fill = the wine's level, hatched stripes = its range, a dark dot with a white ring = your mark. Fill means "how much" (empty = Dry/Low). Labelled with words (Low, Medium−, Medium, Medium+, High; Dry, Off-dry, Medium, Sweet, Luscious).
- **Entry card (`.pr-entry`):** cream card with a round wine-red icon, a bold title, a small subtitle and a chevron. Used for "Practice", "Everyone's progress" etc.
- **Rows (lists):** title + italic subtitle, a hairline divider, and a status pill on the right (green "✓ 90%", wine "START", beige "LOCKED").
- **Checkpoint line:** a bordered card with a stain-ring badge; a ✦ when passed.
- **Pills/badges:** mono uppercase on soft fills.
- **Stats:** stain rings with big numbers, or a 4-up stat row in a cream card.
- **Modals:** bottom sheets on phones (26px top radius), centred cards on desktop; dark translucent backdrop with blur.

---

## 7. Illustration

- **Botty** is the mascot: a speck of noble rot (*Botrytis*), drawn as a round golden grape (`#d9a441`) with a grey fuzzy bloom on top, dot eyes and a small smile (it flips to a frown on wrong answers). He gently bobs. He can wear earned outfits (Hat / Face / Clothes, about 50 items, many inspired by wine regions).
- **Glasses:** simple line-art glasses in the right shape per wine (flute, Bordeaux, Burgundy, white, copita, dessert) with the wine colour inside. In the tasting game they swirl in a flattened circle.
- **Bottles:** flat vector bottles with a label, a vintage year and "dust" that builds with age.
- **Scenes:** the Home vineyard changes with the season and time of day (sky, hills, vine rows, leaves); unlockable postcards of regions.
- **Maps:** schematic, hand-drawn feel: cream land, sea `#dde6e3`, rivers `#a9c4cc`, wobble filter, italic serif place names, spaced mono zone labels (LEFT BANK), wine-coloured dots for highlighted places, numbered pins for quiz questions.
- Style: flat shapes, a few muted colours, thin warm-brown outlines (`#3a2a2a` at about 50% opacity), no gradients beyond soft radial glows.

---

## 8. Motion

- Short and soft: 0.2–0.38s, ease-out or a gentle overshoot (`cubic-bezier(.2,.9,.3,1.15)`) for sheets.
- Cards slide in with a 2° rotation; wrong answers shake; Botty bobs; progress rings draw; the "next" node pulses.
- Respects `prefers-reduced-motion`.
- Subtle haptics (vibrate) and optional glass "clink" sounds.

---

## 9. Copy patterns

- Section metaphors from wine: **The Pour** (lesson), **The Taste** (questions), **From your cellar** (recall), **Today's glass** (daily tasting), **The cellar** (wines you've learned), **Journey** (map and progress), Roots chapters named after soils (Topsoil, Clay, Limestone, Schist, Chalk, Granite).
- Buttons say what happens: "Pour it again", "See the summary", "Shuffle & start", "Taste it", "Next: aromas".
- Wording adapts to the device: "Tap" on phones, "Click" and "with your mouse" on computers.
