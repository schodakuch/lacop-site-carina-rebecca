"use client";

import { useMemo } from "react";
import { useCategories } from "@/context/ProfileContext";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/data/content";
import { buildPages, type Page } from "@/lib/pages";

// Booklet page ledger composed at render time — cover + customer's live
// categories + about + contact. Consumers: Navigation (rail + mobile
// index), Pagination (prev/next), SeriesClient (page number).

export function usePages(): Page[] {
  const categories = useCategories();
  const { lang, t } = useLang();
  return useMemo(
    () =>
      buildPages(categories, {
        cover: t(translations.nav.cover),
        about: t(translations.nav.about),
        contact: t(translations.nav.contact),
      }),
    // `t` is stable per-lang but we depend on lang explicitly so memo
    // invalidates on language toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, lang],
  );
}

export type { Page };
