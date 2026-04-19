# Changelog — sites/carina-rebecca

Demo site for Carina Rebecca (carina-rebecca.lacop.site).

## 2026-04-19 — Mobile drawer ergonomics + asymmetric cover-frame radius
- Mobile drawer rows had no intrinsic height (inline baseline layout,
  `space-y-4` between items) so the effective touch target was roughly
  28–35px depending on type metrics — below WCAG 2.5.5 44px floor.
  Rebuilt: each row min-h-14 with a divider, 8-char number column, a
  1.2rem label, and an active-page dot in clay floated to the right
  edge. Drawer footer added showing the domain/name.
- Homepage reactive peek frame picked up an asymmetric radius
  treatment: `rounded-tl-[2.25rem]` + `rounded-br-[2.25rem]` with
  sharp `rounded-tr-sm` + `rounded-bl-sm` corners, plus a 1px ring
  in the rule colour. Only on the cover plate — /photos section
  displays keep their squared frames.

## 2026-04-19 — Flatten booklet: categories are sections inside /photos, not pages
- Previously each category was its own page (`/photos/editorial`,
  `/photos/portraiture`, `/photos/lifestyle`) and the booklet expanded
  to N+3 pages. Per the brief, categories are taxonomy within photos
  rather than top-level chapters, so the booklet collapses to a flat
  four-page ledger: cover (01) → photos (02) → about (03) → contact (04).
- `/photos` is now a single-page gallery. All categories stack as
  anchored sections (`#cat-<slug>`); a sticky category strip at the top
  of the page acts as secondary nav with an IntersectionObserver
  scroll-spy that highlights the current series as visitors scroll.
- Deleted `src/app/photos/[slug]/` (page + SeriesClient) entirely —
  those routes no longer exist. `sitemap.ts` dropped the per-category
  URLs and no longer imports `getCategories`; builds are fully static.
- `src/lib/pages.ts::buildPages()` signature changed: no longer takes
  categories, just fixed labels `{cover, photos, about, contact}`.
  Returns a constant 4-page list regardless of tenant. `usePages()`
  updated to match — no category dependency.
- `src/data/content.ts`: added `nav.photos` label and
  `photos.categories_label` for the strip's `aria-label`; intro copy
  rewritten for the one-page model.
- Cover contents list + "Start with {first}" CTA now link to
  `/photos#cat-<slug>` anchors rather than separate pages.
- Dual-build verified: primary and sample-alt both emit 4 routes
  (`/`, `/photos`, `/about`, `/contact`) — identical route shape
  regardless of category count, since categories no longer materialise
  as routes.

## 2026-04-19 — True multi-tenant shell (dynamic booklet)
- The booklet was a fixed 6-page structure with three category pages
  hard-coded to slugs `editorial / portraiture / lifestyle` in
  `content.ts`. Flipping `LACOP_USER_SLUG` to a customer with different
  categories would have rendered broken nav, empty labels, and a 404 on
  the `/photos` redirect. Refactored to a dynamic booklet: cover (01) +
  N category pages (02..N+1) + about (N+2) + contact (N+3). A customer
  with four categories now ships a 7-page booklet; two categories ship
  five. Live ledger is composed by `usePages()` in
  `src/hooks/usePages.ts`, reading `useCategories()` from context.
- New `src/lib/pages.ts` — pure `buildPages(categories, labels)` builder.
- `src/data/content.ts` dropped slug-keyed nav entries
  (`editorial / portraiture / lifestyle`) and the book-vocab keys
  (`colophon / signature`) in favour of plain `cover / about / contact`
  plus whatever `category.name` the customer provides. `cover.open`
  copy now uses a `{first}` token replaced at render with the first
  category's name.
- `ProfileContext` extended to carry `{ profile, categories }` with a
  `useCategories()` hook. Layout fetches both in one `Promise.all` and
  stopped leaking "editorial, portraiture and lifestyle" into the
  default meta description.
- Navigation, Pagination, HomeClient, AboutClient, ContactClient,
  SeriesClient, PhotosClient all rewritten against the live ledger —
  page numbers, labels, and redirects all flow from the customer's
  categories.
- Mobile "Index / Close" burger: `min-h-11 min-w-11 flex` ensures the
  tap target clears 44px even when the text label is narrow.
- Seeded a second demo profile in `src/data/mock.ts` (`sample-alt` with
  four categories: Campaign / Runway / Beauty / Print). Dual build
  verified: primary emits `/photos/{editorial,portraiture,lifestyle}`
  with a 6-page booklet; `LACOP_USER_SLUG=sample-alt` emits
  `/photos/{campaign,runway,beauty,print}` with a 7-page booklet — same
  visual shell, different tenant, different page count.


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
