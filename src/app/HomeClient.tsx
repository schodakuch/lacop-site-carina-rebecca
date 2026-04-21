"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Category, Media, Profile } from "@/lib/types";
import { copy } from "@/data/copy";
import ScrollReveal from "@/components/ScrollReveal";

type Props = {
  profile: Profile;
  categories: Category[];
  media: Media[];
};

export default function HomeClient({ profile, categories, media }: Props) {
  const reduced = useReducedMotion();
  const displayName = profile.display_name ?? profile.slug;

  const heroSrc =
    profile.hero_image_url || media[0]?.url || profile.profile_image_url;

  const stats = profile.stats ?? {};
  const hasStats = Object.keys(stats).length > 0;
  const hasBio = Boolean(profile.bio);

  return (
    <>
      {/* HERO — content fits viewport (svh-capped image, flex-centered on mobile) */}
      <section className="relative px-5 md:px-10 lg:px-14 pt-6 md:pt-10 pb-12 md:pb-16 lg:pb-20 flex flex-col justify-center min-h-[calc(100svh-3.5rem)] md:min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="md:col-span-5 order-2 md:order-1">
            <p className="mono text-[0.68rem] uppercase tracking-[0.26em] text-clay mb-4">
              {profile.role} · {copy.nav.home}
            </p>
            <h1 className="font-serif font-light tracking-[-0.02em] text-[clamp(2.2rem,7.5vw,5.4rem)] leading-[0.98] text-ink">
              <span className="block font-medium">{displayName.split(" ")[0]}</span>
              <span className="block italic text-ink-soft">
                {displayName.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className={`italic text-base md:text-xl mt-5 md:mt-6 max-w-md ${hasBio ? "text-ink-soft" : "text-muted"}`}>
              {profile.bio ?? copy.home.about_empty}
            </p>
            <div className="mt-6 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 text-[0.92rem] font-medium text-paper bg-ink px-6 py-3 hover:bg-clay transition-colors"
              >
                {copy.home.categories_cta} →
              </Link>
              <Link href="/contact" className="hover-line text-[0.95rem] font-medium text-clay">
                {copy.nav.contact}
              </Link>
            </div>
          </div>

          {heroSrc && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 order-1 md:order-2 relative"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-sand max-h-[42svh] md:max-h-[70svh]">
                <Image
                  src={heroSrc}
                  alt={displayName}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="px-5 md:px-10 lg:px-14 py-12 md:py-16 lg:py-20 border-t border-rule">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
              <div>
                <p className="mono text-[0.68rem] uppercase tracking-[0.26em] text-clay mb-3">
                  {copy.home.categories_eyebrow}
                </p>
                <h2 className="font-serif font-light tracking-[-0.02em] text-[clamp(1.8rem,5vw,3rem)] text-ink">
                  {copy.portfolio.title}
                </h2>
              </div>
              <Link href="/portfolio" className="hover-line hidden sm:inline text-[0.92rem] font-medium text-clay">
                {copy.home.categories_cta} →
              </Link>
            </div>
          </ScrollReveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => {
              const cover =
                cat.cover_image_url ||
                media.find((m) => m.category_id === cat.id)?.url;
              return (
                <ScrollReveal key={cat.id} delay={i * 0.08}>
                  <Link href={`/portfolio?category=${cat.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                      {cover && (
                        <Image
                          src={cover}
                          alt={cat.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-baseline justify-between gap-3">
                        <span className="font-serif italic text-[1.5rem] md:text-[1.8rem] text-paper">
                          {cat.name}
                        </span>
                        <span className="mono text-[0.66rem] uppercase tracking-[0.22em] text-paper/80">
                          öffnen →
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </ul>
        </section>
      )}

      {/* STATS + BIO teaser */}
      <section className="px-5 md:px-10 lg:px-14 py-12 md:py-16 lg:py-20 border-t border-rule bg-sand/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <ScrollReveal className="md:col-span-5">
            <p className="mono text-[0.68rem] uppercase tracking-[0.26em] text-clay mb-4">
              {copy.home.stats_eyebrow}
            </p>
            {hasStats ? (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="border-t border-rule pt-3">
                    <dt className="mono text-[0.66rem] uppercase tracking-[0.22em] text-muted mb-1">
                      {key}
                    </dt>
                    <dd className="font-serif text-xl md:text-2xl text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="italic font-serif text-lg text-muted">{copy.home.stats_empty}</p>
            )}
          </ScrollReveal>

          <ScrollReveal className="md:col-span-6 md:col-start-7" delay={0.15}>
            <p className="mono text-[0.68rem] uppercase tracking-[0.26em] text-clay mb-4">
              {copy.home.about_eyebrow}
            </p>
            <p className={`font-serif text-base md:text-lg leading-relaxed ${hasBio ? "text-ink-soft" : "italic text-muted"}`}>
              {profile.bio ?? copy.home.about_empty}
            </p>
            <Link href="/about" className="hover-line inline-block mt-8 text-[0.92rem] font-medium text-clay">
              {copy.home.about_more} →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
