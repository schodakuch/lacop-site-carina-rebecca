"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/data/content";
import { usePages } from "@/hooks/usePages";

// Booklet prev/next. Given the current page's key (e.g. "cover", "about",
// "contact", or a category slug), finds its index in the live page ledger
// and renders flanking links. Edges show a dash.

export default function Pagination({ pageKey }: { pageKey: string }) {
  const { t } = useLang();
  const pages = usePages();
  const idx = pages.findIndex((p) => p.key === pageKey);
  if (idx < 0) return null;
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  return (
    <nav
      aria-label="Pagination"
      className="rule-t mt-16 md:mt-24 pt-6 grid grid-cols-2 gap-6 text-[0.95rem]"
    >
      <div className="text-left">
        {prev ? (
          <Link href={prev.href} className="group inline-block">
            <span className="mono text-[0.6rem] tracking-[0.24em] text-muted block mb-1">
              {prev.n} · {prev.label}
            </span>
            <span className="hover-line">{t(translations.series.prev)}</span>
          </Link>
        ) : (
          <span className="mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">—</span>
        )}
      </div>
      <div className="text-right">
        {next ? (
          <Link href={next.href} className="group inline-block">
            <span className="mono text-[0.6rem] tracking-[0.24em] text-muted block mb-1">
              {next.n} · {next.label}
            </span>
            <span className="hover-line">{t(translations.series.next)}</span>
          </Link>
        ) : (
          <span className="mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">—</span>
        )}
      </div>
    </nav>
  );
}
