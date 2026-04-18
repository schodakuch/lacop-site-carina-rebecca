# Changelog — sites/carina-rebecca

Demo site for Carina Rebecca (carina-rebecca.lacop.site).

## 2026-04-18 — Mobile fix: hero figure shown above text wall
- On mobile the sticky right-column figure was appearing BELOW the entire
  left column (name + bio + CTA + contents list) — users saw ~500px of text
  before any photograph. `order-1 md:order-2` on the figure and
  `order-2 md:order-1` on the text column now put the hero image first on
  mobile while preserving the desktop left/right split.
- Mobile index sheet (`Navigation.tsx`): was `overflow-hidden` with
  `max-h-[80vh]` — when opened on a short viewport it could cut off entries
  with no way to scroll. Added internal `overflow-y-auto` and capped height
  at `calc(100vh - 3.5rem)` so the full list is always scrollable under the
  fixed top bar.
- Reduced initial `pt-12`→`pt-6` on mobile so the figure lands directly
  under the top bar without a dead band.

## 2026-04-18 — Initial scaffold (Lookbook / side-rail / Swiss minimal)
- Cloned from `sites/lea-emrich` as base (LACOP shape, env-driven multi-customer shell intact) then rebuilt the visual layer.
- Concept: numbered lookbook in six pages — `01 Cover → 02 Editorial → 03 Portraiture → 04 Lifestyle → 05 Colophon → 06 Signature`.
- Navigation: **left side-rail** (desktop, persistent, shows `nn` page numbers and marks active page in clay) + mobile top-bar with a sliding index sheet. Every other site in the repo uses a top bar, so this is the divergent nav paradigm.
- Palette: warm-white `#FBF8F2` paper + ink `#141414` + clay `#B68D6A` accent. Divergent from lea-emrich's cool mist and the other 7 sites' cream/gold.
- Fonts: **Manrope** (body) + JetBrains Mono (meta) — no Inter / Inter Tight (per banned-fonts rule).
- Pagination: booklet-style prev/next at the bottom of every page, looking up the ledger in `content.ts` so adding/removing pages stays one-place.
- `/photos` redirects to `/photos/editorial` — the cover is the contents page; there's no separate index.
- Mock media: six real frames pulled from `@carinarebecca` Instagram split 2 per series across Editorial / Portraiture / Lifestyle.
- LACOP shape strict: iterates `Object.entries(profile.stats)` / `profile.social_links` dynamically, no invented fields, valid UUID v4 ids.

## 2026-04-18 — Strip Claude-default tropes, add hover-peek signature interaction
- Removed `Volume 01` / `Band 01` everywhere (masthead filler).
- Removed `MMXXVI` Roman-numeral label from the side rail.
- Changed photo-count unit from `plates` / `Platten` to `photos` / `Fotos`.
- Renamed `Colophon` → `About`, `Signature` → `Contact` (book-metaphor vocabulary doesn't earn its keep on a portfolio that isn't actually a booklet).
- Added **signature interaction**: the cover page's contents list is hover-reactive — moving over a series morphs the right-column frame to that series' cover with a 450ms crossfade (sticky on scroll, respects `prefers-reduced-motion`). Visually unifies the contents index with the hero frame so they read as one element.
