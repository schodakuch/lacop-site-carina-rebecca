// Mock backend — stands in for a live Supabase row set until the real wiring
// lands. Matches the LACOP `public_profiles` + `categories` + `media` shape
// (see repo-root LACOP-DATA-SHAPE.md). Keyed by `profile.slug` so the portfolio
// shell can render any customer when `LACOP_USER_SLUG` points at them.
//
// Media placeholders here are six images pulled from Carina's public
// Instagram (@carinarebecca) so the layout has real photographic content
// while the real shoot selection is finalized.

import type { Category, Media, Profile } from "@/lib/types";

const CARINA_ID = "ca51da00-ca51-4da0-0ca5-1da0ca51da00";

const carinaProfile: Profile = {
  id: CARINA_ID,
  slug: "carina-rebecca",
  display_name: "Carina Rebecca",
  bio: null,
  about: null,
  profile_image_url: "/photos/carina-01.jpg",
  hero_image_url: "/photos/carina-05.jpg",
  role: "model",
  social_links: {
    instagram: "https://www.instagram.com/carinarebecca/",
  },
  stats: {},
  agencies: [],
  custom_links: [],
  website_domain: "carina-rebecca.lacop.site",
};

const CAT_EDITORIAL = "e0000001-ed17-4001-a000-000000000001";
const CAT_PORTRAIT = "e0000002-ed17-4001-a000-000000000002";
const CAT_LIFESTYLE = "e0000003-ed17-4001-a000-000000000003";

const carinaCategories: Category[] = [
  {
    id: CAT_EDITORIAL,
    user_id: CARINA_ID,
    name: "Editorial",
    slug: "editorial",
    cover_image_url: "/photos/carina-01.jpg",
    sort_order: 0,
    is_visible: true,
    created_at: "2026-04-18T00:00:00Z",
  },
  {
    id: CAT_PORTRAIT,
    user_id: CARINA_ID,
    name: "Portraiture",
    slug: "portraiture",
    cover_image_url: "/photos/carina-03.jpg",
    sort_order: 1,
    is_visible: true,
    created_at: "2026-04-18T00:00:00Z",
  },
  {
    id: CAT_LIFESTYLE,
    user_id: CARINA_ID,
    name: "Lifestyle",
    slug: "lifestyle",
    cover_image_url: "/photos/carina-05.jpg",
    sort_order: 2,
    is_visible: true,
    created_at: "2026-04-18T00:00:00Z",
  },
];

const carinaMedia: Media[] = [
  { id: "m-carina-ed-01", user_id: CARINA_ID, category_id: CAT_EDITORIAL,
    type: "photo", storage_path: `${CARINA_ID}/photos/carina-01.jpg`,
    url: "/photos/carina-01.jpg", thumbnail_url: "/photos/carina-01.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 0, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-18T00:00:00Z" },
  { id: "m-carina-ed-02", user_id: CARINA_ID, category_id: CAT_EDITORIAL,
    type: "photo", storage_path: `${CARINA_ID}/photos/carina-02.jpg`,
    url: "/photos/carina-02.jpg", thumbnail_url: "/photos/carina-02.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 1, is_visible: true, width: 640, height: 853, file_size: null,
    uploaded_at: "2026-04-18T00:00:00Z" },
  { id: "m-carina-pt-01", user_id: CARINA_ID, category_id: CAT_PORTRAIT,
    type: "photo", storage_path: `${CARINA_ID}/photos/carina-03.jpg`,
    url: "/photos/carina-03.jpg", thumbnail_url: "/photos/carina-03.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 2, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-18T00:00:00Z" },
  { id: "m-carina-pt-02", user_id: CARINA_ID, category_id: CAT_PORTRAIT,
    type: "photo", storage_path: `${CARINA_ID}/photos/carina-04.jpg`,
    url: "/photos/carina-04.jpg", thumbnail_url: "/photos/carina-04.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 3, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-18T00:00:00Z" },
  { id: "m-carina-ls-01", user_id: CARINA_ID, category_id: CAT_LIFESTYLE,
    type: "photo", storage_path: `${CARINA_ID}/photos/carina-05.jpg`,
    url: "/photos/carina-05.jpg", thumbnail_url: "/photos/carina-05.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 4, is_visible: true, width: 640, height: 853, file_size: null,
    uploaded_at: "2026-04-18T00:00:00Z" },
  { id: "m-carina-ls-02", user_id: CARINA_ID, category_id: CAT_LIFESTYLE,
    type: "photo", storage_path: `${CARINA_ID}/photos/carina-06.jpg`,
    url: "/photos/carina-06.jpg", thumbnail_url: "/photos/carina-06.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 5, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-18T00:00:00Z" },
];

// ─── Demo tenant: sample-alt ───────────────────────────────────────────────
// Clearly-labelled second profile proving the shell is multi-tenant. The
// booklet is composed at render time from this customer's categories —
// a four-category customer ships a 7-page booklet (cover + 4 series +
// about + contact) with no code change. Flip
// LACOP_USER_SLUG=sample-alt to render this customer.
const SAMPLE_ID = "ca51da00-ca51-4da0-0ca5-0000000000aa";

const sampleProfile: Profile = {
  id: SAMPLE_ID,
  slug: "sample-alt",
  display_name: "Sample Alt",
  bio: "Demo profile — proves the shell is multi-tenant. Swap LACOP_USER_SLUG to render a different customer through the same lookbook shell.",
  about: null,
  profile_image_url: "/photos/carina-02.jpg",
  hero_image_url: "/photos/carina-04.jpg",
  role: "model",
  social_links: {},
  stats: {},
  agencies: [],
  custom_links: [],
  website_domain: null,
};

const SAMPLE_CAT_CAMPAIGN = "e0000001-ed17-4001-a000-0000000000aa";
const SAMPLE_CAT_RUNWAY = "e0000002-ed17-4001-a000-0000000000bb";
const SAMPLE_CAT_BEAUTY = "e0000003-ed17-4001-a000-0000000000cc";
const SAMPLE_CAT_PRINT = "e0000004-ed17-4001-a000-0000000000dd";

const sampleCategories: Category[] = [
  {
    id: SAMPLE_CAT_CAMPAIGN,
    user_id: SAMPLE_ID,
    name: "Campaign",
    slug: "campaign",
    cover_image_url: "/photos/carina-02.jpg",
    sort_order: 0,
    is_visible: true,
    created_at: "2026-04-19T00:00:00Z",
  },
  {
    id: SAMPLE_CAT_RUNWAY,
    user_id: SAMPLE_ID,
    name: "Runway",
    slug: "runway",
    cover_image_url: "/photos/carina-04.jpg",
    sort_order: 1,
    is_visible: true,
    created_at: "2026-04-19T00:00:00Z",
  },
  {
    id: SAMPLE_CAT_BEAUTY,
    user_id: SAMPLE_ID,
    name: "Beauty",
    slug: "beauty",
    cover_image_url: "/photos/carina-06.jpg",
    sort_order: 2,
    is_visible: true,
    created_at: "2026-04-19T00:00:00Z",
  },
  {
    id: SAMPLE_CAT_PRINT,
    user_id: SAMPLE_ID,
    name: "Print",
    slug: "print",
    cover_image_url: "/photos/carina-01.jpg",
    sort_order: 3,
    is_visible: true,
    created_at: "2026-04-19T00:00:00Z",
  },
];

const sampleMedia: Media[] = [
  { id: "m-sample-ca-01", user_id: SAMPLE_ID, category_id: SAMPLE_CAT_CAMPAIGN,
    type: "photo", storage_path: `${SAMPLE_ID}/photos/carina-02.jpg`,
    url: "/photos/carina-02.jpg", thumbnail_url: "/photos/carina-02.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 0, is_visible: true, width: 640, height: 853, file_size: null,
    uploaded_at: "2026-04-19T00:00:00Z" },
  { id: "m-sample-ca-02", user_id: SAMPLE_ID, category_id: SAMPLE_CAT_CAMPAIGN,
    type: "photo", storage_path: `${SAMPLE_ID}/photos/carina-05.jpg`,
    url: "/photos/carina-05.jpg", thumbnail_url: "/photos/carina-05.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 1, is_visible: true, width: 640, height: 853, file_size: null,
    uploaded_at: "2026-04-19T00:00:00Z" },
  { id: "m-sample-rw-01", user_id: SAMPLE_ID, category_id: SAMPLE_CAT_RUNWAY,
    type: "photo", storage_path: `${SAMPLE_ID}/photos/carina-04.jpg`,
    url: "/photos/carina-04.jpg", thumbnail_url: "/photos/carina-04.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 2, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-19T00:00:00Z" },
  { id: "m-sample-bt-01", user_id: SAMPLE_ID, category_id: SAMPLE_CAT_BEAUTY,
    type: "photo", storage_path: `${SAMPLE_ID}/photos/carina-06.jpg`,
    url: "/photos/carina-06.jpg", thumbnail_url: "/photos/carina-06.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 3, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-19T00:00:00Z" },
  { id: "m-sample-pr-01", user_id: SAMPLE_ID, category_id: SAMPLE_CAT_PRINT,
    type: "photo", storage_path: `${SAMPLE_ID}/photos/carina-01.jpg`,
    url: "/photos/carina-01.jpg", thumbnail_url: "/photos/carina-01.jpg",
    title: null, description: null, photographer_credit: null, shooting_date: null,
    sort_order: 4, is_visible: true, width: 640, height: 800, file_size: null,
    uploaded_at: "2026-04-19T00:00:00Z" },
];

export const mockProfiles: Record<string, Profile> = {
  [carinaProfile.slug]: carinaProfile,
  [sampleProfile.slug]: sampleProfile,
};

export const mockCategories: Record<string, Category[]> = {
  [CARINA_ID]: carinaCategories,
  [SAMPLE_ID]: sampleCategories,
};

export const mockMedia: Record<string, Media[]> = {
  [CARINA_ID]: carinaMedia,
  [SAMPLE_ID]: sampleMedia,
};
