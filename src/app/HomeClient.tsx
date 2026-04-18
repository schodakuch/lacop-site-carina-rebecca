"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Profile, Category, Media } from "@/lib/types";
import { translations } from "@/data/content";
import { useLang } from "@/context/LanguageContext";

type Props = { profile: Profile; categories: Category[]; media: Media[] };

// Cover: name + subtitle + CTA on the left, reactive image on the right.
// Hovering a series in the contents list morphs the right image to that
// series' cover. That reactive pairing is the site's signature interaction —
// the contents page and the visual frame are one element, not two panels.

export default function HomeClient({ profile, categories, media }: Props) {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const [peekId, setPeekId] = useState<string | null>(null);

  const displayName = profile.display_name ?? profile.slug;
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ").slice(1).join(" ");

  const defaultSrc =
    profile.hero_image_url || media[0]?.url || profile.profile_image_url || "";
  const peekCategory = categories.find((c) => c.id === peekId);
  const peekSrc =
    peekCategory?.cover_image_url ||
    media.find((m) => m.category_id === peekId)?.url ||
    null;
  const activeSrc = peekSrc ?? defaultSrc;
  const activeAlt = peekCategory ? peekCategory.name : displayName;

  const firstSeries = categories[0];
  const countFor = (categoryId: string) =>
    media.filter((m) => m.category_id === categoryId).length;

  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-12 md:pt-20 pb-16 md:pb-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {/* LEFT — name, subtitle, contents */}
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

          <p className="mt-8 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink-soft">
            {profile.bio ?? t(translations.cover.subtitle)}
          </p>

          {firstSeries && (
            <div className="mt-10">
              <Link
                href={`/photos/${firstSeries.slug}`}
                className="inline-block text-[0.98rem] hover-line"
              >
                {t(translations.cover.open)} →
              </Link>
            </div>
          )}

          {/* Contents — hover to peek on the right */}
          <ul
            className="mt-16 md:mt-24 border-t border-rule"
            onMouseLeave={() => setPeekId(null)}
          >
            {categories.map((cat) => {
              const count = countFor(cat.id);
              const isHot = peekId === cat.id;
              return (
                <li
                  key={cat.id}
                  className="border-b border-rule"
                  onMouseEnter={() => setPeekId(cat.id)}
                  onFocus={() => setPeekId(cat.id)}
                  onBlur={() => setPeekId(null)}
                >
                  <Link
                    href={`/photos/${cat.slug}`}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4 md:py-5"
                  >
                    <span
                      className={`text-[1.2rem] md:text-[1.35rem] transition-colors ${
                        isHot ? "text-clay" : "text-ink"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span className="text-[0.86rem] text-muted tabular-nums">
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
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 text-[0.82rem] text-muted hidden md:block">
            {t(translations.cover.hover_hint)}
          </p>
        </div>

        {/* RIGHT — reactive frame */}
        <figure className="md:col-span-6 md:sticky md:top-14 md:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeSrc}
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {activeSrc && (
                  <Image
                    src={activeSrc}
                    alt={activeAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {peekCategory && (
            <figcaption className="mt-3 text-[0.82rem] text-muted">
              {peekCategory.name}
            </figcaption>
          )}
        </figure>
      </div>
    </article>
  );
}
