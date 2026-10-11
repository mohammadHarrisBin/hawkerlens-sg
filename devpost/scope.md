---
doc: scope
status: approved
---

# HawkerLens SG

One line: Snap any hawker dish, instantly see what's in it and how to eat it healthier.

## The Unique Kernel
Hawker-food-specific nutrition intelligence with Singlish soul — not a generic calorie tracker, but a database of 12 real SG hawker dishes with allergens, healthier swaps ("less rice, more veg, lim kopi-o kosong"), and EN/简体 output. The kernel: it speaks hawker centre.

## Who It's For
Mei, 28, office worker in Raffles Place who lunches at Amoy Food Centre daily. She wants to eat healthier without giving up chicken rice. Today she Googles calories and gets US-centric answers that don't know what "char kway teow" is.

## The Core Loop
Open app → snap/upload dish photo or tap dish name → see calories, allergens, healthier swap + Singlish tip → try the swap tomorrow. Comes back every lunch.

## Inspiration & Identity
Clean hawker-modern: red/white SG accents, big photo-first cards, playful Singlish microcopy ("Wah, 920 kcal!"). Reference: HealthHub food search (accurate but boring) + Google Lens (visual but not local).

## Why This Matters to the Learner
Harris wants a fast, legal, solo-submittable SG-eligible win for Build With AI: Basics that reuses his GitHub/YouTube/Canva assets and demonstrates plan-first AI building.

## What "Working" Looks Like
Single static web app: pick/upload a dish photo, select dish, see nutrition card with calories, macros, allergens, healthier alternative, language toggle. The "oh cool" beat: upload a laksa photo and it says "Wah, 920 kcal — try laksa-yong-tau-foo soup version, save 300 kcal!"

## The POC Boundary
IN: 12-dish local DB, photo upload + preview, dish picker, nutrition card, allergen flags, healthier swap, EN/简体 toggle, offline static hosting.
LATER: real AI image recognition, barcode scan, full hawker centre menus, accounts, calorie history.
CUT: backend/server (static only — keeps demo reliable), real ML classification (rule-based dish picker instead, with reason: 2–4h budget), payments.

## Later
AI vision auto-detect, Malay/Tamil language, HPB API sync, PWA install.

## Explicitly Cut
- Backend DB/auth — static JSON is enough for POC; a server adds deploy risk.
- Live AI image classification — needs API keys + cost; manual picker + photo preview proves the loop.
- Calorie history tracking — out of one-afternoon scope.
