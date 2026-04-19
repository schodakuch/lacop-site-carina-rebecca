"use client";

import { useMemo } from "react";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/data/content";
import { buildPages, type Page } from "@/lib/pages";

// Booklet page ledger — flat 4 pages regardless of how many photo
// categories the active tenant has. Photo categories live as sections
// inside /photos, not as separate pages. Consumers: Navigation,
// Pagination, page-number headers.

export function usePages(): Page[] {
  const { lang, t } = useLang();
  return useMemo(
    () =>
      buildPages({
        cover: t(translations.nav.cover),
        photos: t(translations.nav.photos),
        about: t(translations.nav.about),
        contact: t(translations.nav.contact),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );
}

export type { Page };
