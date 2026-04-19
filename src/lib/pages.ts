// Dynamic booklet ledger. The page list is NOT static — it's built at
// render time from the active customer's categories so the site renders
// correctly regardless of how many categories the customer has or what
// they're called.
//
// Layout is always: cover (01) → category pages (02..N+1) → about (N+2)
// → contact (N+3). A customer with four categories ships a seven-page
// booklet; two categories ship five. No code change needed.

import type { Category } from "./types";

export type Page = {
  n: string;
  key: string;
  href: string;
  label: string;
};

export function buildPages(
  categories: Category[],
  labels: { cover: string; about: string; contact: string },
): Page[] {
  const categoryPages: Page[] = categories.map((c, i) => ({
    n: String(i + 2).padStart(2, "0"),
    key: c.slug,
    href: `/photos/${c.slug}`,
    label: c.name,
  }));

  return [
    { n: "01", key: "cover", href: "/", label: labels.cover },
    ...categoryPages,
    {
      n: String(categories.length + 2).padStart(2, "0"),
      key: "about",
      href: "/about",
      label: labels.about,
    },
    {
      n: String(categories.length + 3).padStart(2, "0"),
      key: "contact",
      href: "/contact",
      label: labels.contact,
    },
  ];
}
