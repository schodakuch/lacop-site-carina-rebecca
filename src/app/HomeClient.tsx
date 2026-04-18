"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Profile, Category, Media } from "@/lib/types";
import { translations, pages } from "@/data/content";
import { useLang } from "@/context/LanguageContext";

type Props = { profile: Profile; categories: Category[]; media: Media[] };

// Cover page — single spread, title + volume line + series index + open CTA.
// No scroll bait; leans on the numbered index to promise what's inside.

export default function HomeClient({ profile, categories, media }: Props) {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const displayName = profile.display_name ?? profile.slug;
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ").slice(1).join(" ");

  const cover = profile.hero_image_url || media[0]?.url || profile.profile_image_url;
  const firstSeries = pages.find((p) => p.key === "editorial");

  const countFor = (categoryId: string) =>
    media.filter((m) => m.category_id === categoryId).length;

  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-10 md:pt-16 pb-16 md:pb-28">
      {/* Top rule + page number */}
      <div className="rule-t pt-4 flex items-center justify-between">
        <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">
          {t(translations.cover.volume)}
        </span>
        <span className="mono text-[0.64rem] tracking-[0.24em] tabular-nums text-muted">01</span>
      </div>

      {/* Spread */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mt-14 md:mt-24">
        {/* Left: title */}
        <div className="md:col-span-6">
          <motion.h1
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,6.4rem)] tracking-[-0.03em] leading-[0.94] font-light"
          >
            {firstName}
            {lastName && (
              <>
                <br />
                <span className="text-ink-soft">{lastName}</span>
              </>
            )}
          </motion.h1>

          <p className="mt-8 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-soft">
            {profile.bio ?? t(translations.cover.subtitle)}
          </p>

          {firstSeries && (
            <div className="mt-12">
              <Link
                href={firstSeries.href}
                className="inline-flex items-baseline gap-3 text-[0.98rem] hover-line"
              >
                <span className="mono text-[0.64rem] tracking-[0.22em] tabular-nums text-clay">
                  02
                </span>
                {t(translations.cover.open)}
              </Link>
            </div>
          )}
        </div>

        {/* Right: cover frame */}
        <figure className="md:col-span-6">
          {cover ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={cover}
                alt={displayName}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="slot" />
          )}
        </figure>
      </div>

      {/* Contents strip */}
      <section className="rule-t mt-24 md:mt-32 pt-8">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <h2 className="mono text-[0.7rem] uppercase tracking-[0.26em] text-muted">
            {t(translations.photos.heading)}
          </h2>
          <span className="mono text-[0.64rem] tracking-[0.22em] tabular-nums text-muted">
            {categories.length === 0 ? "—" : `${categories.length} series`}
          </span>
        </div>
        <ul className="space-y-3">
          {categories.map((cat, i) => {
            const n = String(i + 2).padStart(2, "0");
            const count = countFor(cat.id);
            return (
              <li key={cat.id} className="rule-b pb-3">
                <Link
                  href={`/photos/${cat.slug}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-6"
                >
                  <span className="mono text-[0.72rem] tracking-[0.22em] tabular-nums text-clay">
                    {n}
                  </span>
                  <span className="text-[1.1rem] md:text-[1.2rem] group-hover:text-clay transition-colors">
                    {cat.name}
                  </span>
                  <span className="mono text-[0.64rem] uppercase tracking-[0.2em] text-muted">
                    {count === 0
                      ? lang === "de"
                        ? "leer"
                        : "empty"
                      : count === 1
                        ? t(translations.photos.frame_count.one)
                        : t(translations.photos.frame_count.other).replace("{n}", String(count))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
