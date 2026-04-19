// Flat 4-page booklet ledger: cover → photos → about → contact.
// Photo categories are NOT separate pages — they live inside the
// photos page as anchored sections with a sticky category strip that
// scroll-spies. Flipping LACOP_USER_SLUG still works: whoever the
// active tenant is, their categories render as sections within /photos.

export type Page = {
  n: string;
  key: string;
  href: string;
  label: string;
};

export function buildPages(labels: {
  cover: string;
  photos: string;
  about: string;
  contact: string;
}): Page[] {
  return [
    { n: "01", key: "cover", href: "/", label: labels.cover },
    { n: "02", key: "photos", href: "/photos", label: labels.photos },
    { n: "03", key: "about", href: "/about", label: labels.about },
    { n: "04", key: "contact", href: "/contact", label: labels.contact },
  ];
}
