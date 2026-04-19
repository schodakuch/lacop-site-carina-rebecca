"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Category, Media } from "@/lib/types";
import { translations } from "@/data/content";
import { useLang } from "@/context/LanguageContext";
import { usePages } from "@/hooks/usePages";
import Pagination from "@/components/Pagination";

type Props = { categories: Category[]; media: Media[] };

// Single photos page. Each category is an anchored section stacked on
// the same page; a sticky category strip at the top lets visitors jump
// between them and scroll-spies the active series as they scroll. The
// three categories are NOT separate pages — they are sections inside
// this one page.

export default function PhotosClient({ categories, media }: Props) {
  const { t, lang } = useLang();
  const pages = usePages();
  const pageNum = pages.find((p) => p.key === "photos")?.n ?? "—";
  const [activeSlug, setActiveSlug] = useState<string>(
    categories[0]?.slug ?? "",
  );

  // Scroll-spy: mark the category closest to the center of the viewport
  // as active. The rootMargin pulls the detection band to the upper
  // third so a category becomes active just before it fills the screen.
  useEffect(() => {
    if (typeof window === "undefined" || categories.length === 0) return;
    const els = categories
      .map((c) => document.getElementById(`cat-${c.slug}`))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveSlug(visible.target.id.replace(/^cat-/, ""));
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [categories]);

  const mediaByCategory = useMemo(() => {
    const map = new Map<string, Media[]>();
    for (const m of media) {
      if (!m.category_id) continue;
      if (!map.has(m.category_id)) map.set(m.category_id, []);
      map.get(m.category_id)!.push(m);
    }
    return map;
  }, [media]);

  const jumpTo = (slug: string) => {
    const el = document.getElementById(`cat-${slug}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-10 md:pt-16 pb-10">
      {/* Page header strip */}
      <div className="rule-t pt-4 flex items-baseline justify-between gap-3">
        <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">
          {t(translations.nav.photos)}
        </span>
        <span className="mono text-[0.64rem] tracking-[0.24em] tabular-nums text-muted">
          {pageNum}
        </span>
      </div>

      <header className="mt-14 md:mt-20 mb-10 md:mb-14 max-w-[52ch]">
        <h1 className="text-[clamp(2.4rem,7vw,4.4rem)] tracking-[-0.02em] font-light">
          {t(translations.photos.heading)}
        </h1>
        <p className="mt-5 text-[1rem] text-ink-soft">
          {t(translations.photos.intro)}
        </p>
      </header>

      {/* Sticky category strip — the only secondary nav on the page */}
      {categories.length > 0 && (
        <nav
          aria-label={t(translations.photos.categories_label)}
          className="sticky top-0 md:top-4 z-20 -mx-5 md:mx-0 px-5 md:px-0 py-3 mb-10 md:mb-16 bg-paper/90 backdrop-blur-md flex items-center gap-5 md:gap-7 overflow-x-auto rule-b"
        >
          {categories.map((c, i) => {
            const isActive = activeSlug === c.slug;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => jumpTo(c.slug)}
                className={`shrink-0 inline-flex items-baseline gap-2 mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors ${
                  isActive ? "text-clay" : "text-muted hover:text-ink"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Stacked category sections */}
      {categories.map((cat) => {
        const catMedia = mediaByCategory.get(cat.id) ?? [];
        const count = catMedia.length;
        return (
          <section
            key={cat.id}
            id={`cat-${cat.slug}`}
            className="scroll-mt-28 md:scroll-mt-24 pb-16 md:pb-28"
          >
            <div className="flex items-baseline justify-between gap-3 mb-6 md:mb-8 rule-t pt-5">
              <h2 className="text-[clamp(1.8rem,4.5vw,2.8rem)] tracking-[-0.01em] font-light">
                {cat.name}
              </h2>
              <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-muted tabular-nums">
                {count === 0
                  ? lang === "de"
                    ? "leer"
                    : "empty"
                  : count === 1
                    ? t(translations.photos.frame_count.one)
                    : t(translations.photos.frame_count.other).replace(
                        "{n}",
                        String(count),
                      )}
              </span>
            </div>

            {count === 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="slot" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {catMedia.map((m, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  return (
                    <figure key={m.id}>
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                          {cat.name} · {num}
                        </span>
                        {m.photographer_credit && (
                          <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                            © {m.photographer_credit}
                          </span>
                        )}
                      </div>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                        <Image
                          src={m.url}
                          alt={m.title ?? `${cat.name} ${num}`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </figure>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      <Pagination pageKey="photos" />
    </article>
  );
}
