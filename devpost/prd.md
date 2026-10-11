---
doc: prd
status: approved
---

# HawkerLens SG — Product Requirements

HawkerLens SG: snap a hawker dish, get local nutrition + healthier swap. For SG lunch crowds. Source: `scope.md > The Unique Kernel, Who It's For, The Core Loop`.

## The Core Journey
1. Mei opens the app on her phone/laptop at the hawker centre.
2. She taps "Snap dish" (photo upload with preview) or picks the dish name from the grid.
3. She optionally toggles EN / 简体.
4. She sees a nutrition card: photo, calories, protein/carbs/fat, allergen chips, healthier swap, Singlish tip.
5. She taps another dish to compare. Success = understands the dish + one actionable swap in under 30 seconds.

## Screens and Layout
Single-page app, mobile-first:
- Header: logo "HawkerLens SG", language toggle, dish count.
- Hero/upload zone: big dashed drop area + "Snap / Upload" button + file preview.
- Dish grid: 12 photo-emoji cards (name EN + calorie badge).
- Result card: photo, dish name, kcal big, macro bars, allergen chips, "Eat smarter" swap box, Singlish tip, disclaimer.
- Footer: HPB-data disclaimer, Devpost skill-pack credit.
Navigation: scroll, no routing; selecting a dish scrolls to result.

## Look and Feel
Hawker-modern: white cards on warm #FFF8F0, SG red (#EE3324) accents, dark #222 text. System font stack, rounded 16px cards, big emoji photo placeholders (no external images = offline-safe). Playful Singlish microcopy, but nutrition numbers crisp and clinical. Avoid: generic fitness-app dark neon.

## Features and Behavior

### Dish analysis
- 12 SG dishes with kcal, protein/carbs/fat, allergens (gluten, shellfish, peanut, egg, soy, dairy, sesame), spice level, healthier swap, tip EN + ZH.
- Photo upload: FileReader preview shown in result card; stored in memory only (no upload).
- Dish picker: click card → result updates + photo placeholder emoji.
- Language toggle: instant EN/简体 re-render of result + grid labels.
- Search filter: type to filter dish grid.

- As Mei, I want to upload my lunch photo so the result feels like MY dish.
  - [ ] Uploaded photo appears in result card within 1s.
  - [ ] Works with jpg/png, rejects >5MB with friendly message.
- As Mei, I want allergen flags so I avoid shrimp paste.
  - [ ] Each dish shows correct allergen chips from DB.
- As Mei, I want a healthier swap so I can act tomorrow.
  - [ ] Every dish has a swap + kcal saved figure.

## States and Boundaries
- **First use** — no dish selected: friendly empty state "Pick your lunch above 👆".
- **Normal use** — result card populated, compare freely.
- **Error** — oversized/non-image file: inline warning, keeps last result.
- **Persistence** — last dish + language in localStorage; photo not persisted (privacy).
- **Assumptions** — nutrition values are estimates from HPB averages, not medical advice.

## Product Decisions
- Static-only, no backend — reliability + zero-cost hosting, tradeoff: no real AI vision.
- Emoji photo placeholders — offline-safe, tradeoff: less pretty than real photos.
- 12 dishes — covers 80% of hawker lunches, tradeoff: not exhaustive.
- localStorage for prefs only — privacy-friendly.

## What We're Building
Upload + preview, 12-dish DB, picker + search, nutrition card, allergens, swaps, EN/简体, localStorage prefs, responsive single page.

## Deferred From the POC
- Real image recognition (needs API key/cost).
- Accounts/history (needs backend).
- Full menu of 100+ dishes.

## Possible Later Enhancements
Vision API auto-detect. Malay/Tamil. HPB live sync. PWA offline install.

## Non-Goals
- Medical advice (estimates only).
- Restaurant ordering/payment.
- Social sharing (screenshot is enough).

## Open Questions
None blocking spec — dish list frozen at 12, values from HPB averages.
