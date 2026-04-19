"use client";

import { useState } from "react";
import type { Profile } from "@/lib/types";
import { safeUrl } from "@/lib/utils";
import { translations } from "@/data/content";
import { useLang } from "@/context/LanguageContext";
import { usePages } from "@/hooks/usePages";
import Pagination from "@/components/Pagination";

type Props = { profile: Profile };

const SOCIAL_LABELS: Record<string, { en: string; de: string }> = {
  instagram: { en: "Instagram", de: "Instagram" },
  tiktok: { en: "TikTok", de: "TikTok" },
  youtube: { en: "YouTube", de: "YouTube" },
  snapchat: { en: "Snapchat", de: "Snapchat" },
  website: { en: "Website", de: "Webseite" },
  email: { en: "Email", de: "E-Mail" },
};

function bookingEmailFor(profile: Profile): string {
  if (profile.website_domain) {
    return `hello@${profile.website_domain.replace(/^https?:\/\//, "")}`;
  }
  return `hello@${profile.slug}.lacop.site`;
}

export default function ContactClient({ profile }: Props) {
  const { t, lang } = useLang();
  const pages = usePages();
  const pageNum = pages.find((p) => p.key === "contact")?.n ?? "—";
  const [sent, setSent] = useState(false);
  const bookingEmail = bookingEmailFor(profile);

  const socials = Object.entries(profile.social_links)
    .map(([platform, url]) => ({ platform, url: safeUrl(url) }))
    .filter((s): s is { platform: string; url: string } => !!s.url);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject =
      String(data.get("subject") ?? "").trim() || t(translations.contact.subject_fallback);
    const message = String(data.get("message") ?? "").trim();
    const body =
      `${message}\n\n—\n` +
      `${lang === "de" ? "Von" : "From"}: ${name}\n` +
      `${lang === "de" ? "E-Mail" : "Email"}: ${email}`;
    window.location.href = `mailto:${bookingEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-10 md:pt-16 pb-10">
      <div className="rule-t pt-4 flex items-baseline justify-between gap-3">
        <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">
          {t(translations.nav.contact)}
        </span>
        <span className="mono text-[0.64rem] tracking-[0.24em] tabular-nums text-muted">{pageNum}</span>
      </div>

      <header className="mt-14 md:mt-20 mb-10 md:mb-14 max-w-[52ch]">
        <h1 className="text-[clamp(2.4rem,7vw,4.4rem)] tracking-[-0.02em] font-light">
          {t(translations.contact.heading)}
        </h1>
        <p className="mt-5 text-[1rem] text-ink-soft">{t(translations.contact.lede)}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <aside className="md:col-span-4 space-y-6">
          <ul className="space-y-4 text-[1rem]">
            {socials.map(({ platform, url }) => {
              const base = SOCIAL_LABELS[platform] ?? { en: platform, de: platform };
              return (
                <li key={platform}>
                  <a href={url} target="_blank" rel="noreferrer" className="hover-line">
                    {t(base)} ↗
                  </a>
                </li>
              );
            })}
            {profile.custom_links.map((link) => {
              const href = safeUrl(link.url);
              if (!href) return null;
              return (
                <li key={link.url}>
                  <a href={href} target="_blank" rel="noreferrer" className="hover-line">
                    {link.label} ↗
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-muted pt-2">
            {bookingEmail}
            <span className="block normal-case tracking-normal mt-1 text-[0.68rem]">
              {t(translations.contact.placeholder_note)}
            </span>
          </p>
        </aside>

        <div className="md:col-span-7 md:col-start-6">
          <p className="text-[0.98rem] text-ink-soft max-w-[52ch]">
            {t(translations.contact.form_note)}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
          >
            <Field label={t(translations.contact.labels.name)}>
              <input required type="text" name="name" autoComplete="name" className={fieldClass} />
            </Field>
            <Field label={t(translations.contact.labels.email)}>
              <input required type="email" name="email" autoComplete="email" className={fieldClass} />
            </Field>
            <div className="md:col-span-2">
              <Field label={t(translations.contact.labels.subject)}>
                <input type="text" name="subject" className={fieldClass} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label={t(translations.contact.labels.message)}>
                <textarea required name="message" rows={5} className={`${fieldClass} resize-none`} />
              </Field>
            </div>
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={sent}
                className="inline-flex items-center gap-3 bg-ink text-paper mono uppercase tracking-[0.22em] text-[0.7rem] px-6 py-4 hover:bg-clay disabled:bg-muted transition-colors"
              >
                {sent ? t(translations.contact.sending) : t(translations.contact.send)}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Pagination pageKey="contact" />
    </article>
  );
}

const fieldClass =
  "w-full bg-transparent border-0 border-b border-rule py-2 text-base text-ink transition-colors duration-300 focus:outline-none focus:border-clay";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mono text-[0.62rem] uppercase tracking-[0.18em] text-muted block mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
