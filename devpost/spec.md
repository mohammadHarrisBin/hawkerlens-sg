---
doc: spec
status: approved
---

# HawkerLens SG — Technical Spec

## How This Works, In Plain Language
Three pieces: a dish database (JSON with 12 hawker dishes + nutrition), a web page (shows upload box, dish buttons, result card), and a small script (when you pick a dish or upload a photo, it looks up the dish and draws the card; language toggle re-draws in Chinese). No server, no keys — everything runs in the browser. This shape because the hackathon judges watch a video, never run code, so reliability beats cleverness.

## The Core Journey Through the System
User picks dish → app.js looks up dishes.json by id → renders result card HTML (kcal, macros, allergens, swap) → uploaded photo (FileReader data-URL) replaces emoji. Toggle语言 → same data, zh fields rendered. PRD ref: `prd.md > The Core Journey`.

## Stack
- HTML5 + CSS3 (no framework) — zero build step, opens by double-click. Docs: MDN.
- Vanilla JS (ES2020) — no deps, no version risk. Rationale: learner knows it; tradeoff: no components, fine at this size.
- Static JSON in `data/dishes.json`.
- Fonts: system stack. No CDN required (offline-safe).

## Where It Runs and How Someone Tries It
Browser (Chrome/Edge/Safari, mobile + desktop). No keys, no install. Start: open `index.html` or `python3 -m http.server` / `npx serve`. Demo recording: open page, upload a photo, click 2 dishes, toggle 简体. Deployment optional: GitHub Pages from repo root.

## Look and Feel
Warm paper #FFF8F0, SG red #EE3324 primary buttons/chips, 16px rounded cards, airy 8px-grid spacing, thumb-friendly 48px targets. System-ui font, tabular numbers for kcal. Copy tone: crisp numbers + cheeky Singlish tips. Stack constraint: no Tailwind (keeps single-file review easy); custom CSS ~200 lines honors the direction fully.

## Components

### Dish database (`data/dishes.json`)
12 records: id, name_en, name_zh, emoji, kcal, protein, carbs, fat, allergens[], spice (0-3), swap_en, swap_zh, tip_en, tip_zh, kcal_saved. PRD ref: `prd.md > Features and Behavior`.

### Page shell (`index.html`)
Header, upload zone, search, dish grid container, result card container, footer. PRD ref: `prd.md > Screens and Layout`.

### App logic (`app.js`)
State {dishId, lang, photoDataUrl}. Functions: loadDishes, renderGrid(filter), selectDish, handlePhoto, renderResult, setLang, persistence. PRD ref: `prd.md > Features and Behavior`.

### Styling (`styles.css`)
Mobile-first grid, cards, chips, macro bars, toggle. PRD ref: `prd.md > Look and Feel`.

## Data Model
In-memory state + localStorage {hawkerlens_dish, hawkerlens_lang}. Dishes immutable JSON. Photo data-URL in memory only, never persisted. On return: last dish + lang restored, photo empty state.

## File Structure
```
hawkerlens-sg/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── dishes.json
├── devpost/            # Devpost learning workspace
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   └── spec.md
├── .agents/skills/     # Learn Skill Pack (curriculum, not learner progress)
├── README.md
└── LICENSE (MIT)
```

## External Services and Dependencies
None. No APIs, no DB, no hosting required. GitHub Pages optional (static). YouTube (demo video) + Canva (cover) used at ship time, not runtime.

## Important Failure Modes
- **Oversized/non-image upload** → inline "Wah, file too big / not image lah" warning, keeps last result.
- **dishes.json fails (file:// fetch block)** → app.js falls back to embedded DISHES array; user sees everything anyway.
- **Old browser, no FileReader** → picker still works; upload button hidden with note.

## What Was Simplified and Why
- **Manual dish picker** instead of AI vision — why: no keys/cost, reliable demo. Fuller version would call a vision API + map to dish DB (~1 week + hosting).
- **Emoji placeholders** instead of food photos — why: offline + no licensing issues. Fuller version would license 12 dish photos.
- **localStorage prefs** instead of accounts — why: privacy + zero backend. Fuller version would add login + history.

## Decisions and Open Issues
- Learner choice: static-only (accepted tradeoff: no auto-detect) — reason: solo ship in hours.
- Learner choice: EN + 简体 only (accepted: no Malay/Tamil yet) — reason: covers most, keeps strings manageable.
- Derived: vanilla JS, no framework — follows static-only.
- Uncertainty discussed: "Are estimates defensible?" — resolved: label as HPB-average estimates + disclaimer, not medical advice.
- Open: none blocking build.
