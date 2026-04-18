"use client";

import type { Profile } from "@/lib/types";
import { safeUrl } from "@/lib/utils";
import { translations } from "@/data/content";
import { useLang } from "@/context/LanguageContext";
import Pagination from "@/components/Pagination";

type Props = { profile: Profile };

export default function AboutClient({ profile }: Props) {
  const { t } = useLang();
  const statsEntries = Object.entries(profile.stats);

  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-10 md:pt-16 pb-10">
      <div className="rule-t pt-4 flex items-baseline justify-between gap-3">
        <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">
          {t(translations.nav.colophon)}
        </span>
        <span className="mono text-[0.64rem] tracking-[0.24em] tabular-nums text-muted">05</span>
      </div>

      <header className="mt-14 md:mt-20 mb-12 md:mb-16 max-w-[52ch]">
        <h1 className="text-[clamp(2.4rem,7vw,4.4rem)] tracking-[-0.02em] font-light">
          {t(translations.about.heading)}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-7">
          <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.6] text-ink-soft max-w-[62ch]">
            {profile.about ?? t(translations.about.body)}
          </p>
          {!profile.about && (
            <p className="mt-6 mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
              {t(translations.about.placeholder_note)}
            </p>
          )}
        </div>

        <aside className="md:col-span-4 md:col-start-9 space-y-10">
          <div>
            <h2 className="mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">Stats</h2>
            {statsEntries.length > 0 ? (
              <dl className="mt-4 grid grid-cols-2 gap-y-3 gap-x-6 text-[0.92rem]">
                {statsEntries.map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                      {key}
                    </dt>
                    <dd className="mt-1 text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 text-[0.9rem] text-muted">{t(translations.about.stats_empty)}</p>
            )}
          </div>

          <div>
            <h2 className="mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
              Representation
            </h2>
            {profile.agencies.length > 0 ? (
              <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                {profile.agencies.map((a) => {
                  const href = safeUrl(a.url);
                  const label = a.city ? `${a.name} · ${a.city}` : a.name;
                  return (
                    <li key={a.name}>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className="hover-line">
                          {label} ↗
                        </a>
                      ) : (
                        <span>{label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-[0.9rem] text-muted">
                {t(translations.about.agencies_empty)}
              </p>
            )}
          </div>
        </aside>
      </div>

      <Pagination pageKey="colophon" />
    </article>
  );
}
