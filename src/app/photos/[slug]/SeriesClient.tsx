"use client";

import Image from "next/image";
import type { Category, Media } from "@/lib/types";
import { translations } from "@/data/content";
import { useLang } from "@/context/LanguageContext";
import { usePages } from "@/hooks/usePages";
import Pagination from "@/components/Pagination";

type Props = { category: Category; categories: Category[]; media: Media[] };

export default function SeriesClient({ category, media }: Props) {
  const { t, lang } = useLang();
  const pages = usePages();
  const pageEntry = pages.find((p) => p.key === category.slug);
  const pageNum = pageEntry?.n ?? "—";

  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-10 md:pt-16 pb-10">
      {/* Header strip — page number + series name + count */}
      <div className="rule-t pt-4 flex items-baseline justify-between gap-3">
        <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">
          {category.name}
        </span>
        <span className="mono text-[0.64rem] tracking-[0.24em] tabular-nums text-muted">
          {pageNum}
        </span>
      </div>

      <header className="mt-14 md:mt-20 mb-10 md:mb-14 max-w-[52ch]">
        <h1 className="text-[clamp(2.4rem,7vw,4.4rem)] tracking-[-0.02em] font-light">
          {category.name}
        </h1>
        <p className="mt-4 mono text-[0.64rem] uppercase tracking-[0.2em] text-muted">
          {media.length === 0
            ? lang === "de"
              ? "leer"
              : "empty"
            : media.length === 1
              ? t(translations.photos.frame_count.one)
              : t(translations.photos.frame_count.other).replace("{n}", String(media.length))}
        </p>
      </header>

      {/* Photos */}
      {media.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="slot" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {media.map((m, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <figure key={m.id} className="group">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                    {category.name} · {num}
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
                    alt={m.title ?? `${category.name} ${num}`}
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

      <Pagination pageKey={category.slug} />
    </article>
  );
}
