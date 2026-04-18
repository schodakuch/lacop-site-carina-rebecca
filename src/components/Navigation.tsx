"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import { pages, translations } from "@/data/content";

// Side rail (desktop) + top bar with a sliding index sheet (mobile).
// The rail is the nav paradigm that diverges this site from the rest of
// the repo — every other site uses a top bar.

export default function Navigation() {
  const { lang, toggle, t } = useLang();
  const profile = useProfile();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const displayName = profile.display_name ?? profile.slug;
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ").slice(1).join(" ");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Desktop side rail */}
      <aside
        aria-label="Pages"
        className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 w-[220px] flex-col justify-between px-7 py-8 bg-paper border-r border-rule"
      >
        <Link href="/" className="group block" aria-label={displayName}>
          <span className="mono text-[0.6rem] uppercase tracking-[0.26em] text-muted">
            Lookbook
          </span>
          <span className="block mt-2 text-[1.05rem] leading-tight">
            <span className="font-medium">{firstName}</span>
            {lastName && (
              <>
                <br />
                <span className="font-light text-ink-soft">{lastName}</span>
              </>
            )}
          </span>
        </Link>

        <nav aria-label="Primary">
          <ol className="space-y-2.5">
            {pages.map((p) => {
              const active = isActive(p.href);
              return (
                <li key={p.key} className="flex items-baseline gap-3">
                  <span
                    className={`mono text-[0.64rem] tracking-[0.22em] tabular-nums ${
                      active ? "text-clay" : "text-muted"
                    }`}
                  >
                    {p.n}
                  </span>
                  <Link
                    href={p.href}
                    className={`text-[0.94rem] ${active ? "text-clay" : "text-ink"} hover-line`}
                  >
                    {t(translations.nav[p.key])}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={toggle}
            className="mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-soft hover:text-clay transition-colors"
            aria-label="Toggle language"
          >
            {lang === "en" ? "DE" : "EN"}
          </button>
          <span className="mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
            MMXXVI
          </span>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
        <div className="h-14 px-5 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2" aria-label={displayName}>
            <span className="text-[0.98rem] font-medium">{firstName}</span>
            {lastName && <span className="text-[0.92rem] text-ink-soft">{lastName}</span>}
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              className="mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-soft"
              aria-label="Toggle language"
            >
              {lang === "en" ? "DE" : "EN"}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-index"
              className="mono text-[0.66rem] uppercase tracking-[0.22em] text-ink"
            >
              {open ? t(translations.nav.close) : t(translations.nav.index)}
            </button>
          </div>
        </div>
        <div
          id="mobile-index"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-[80vh] opacity-100 border-t border-rule" : "max-h-0 opacity-0"
          }`}
        >
          <ol className="px-5 py-6 space-y-4">
            {pages.map((p) => (
              <li key={p.key} className="flex items-baseline gap-4">
                <span className="mono text-[0.64rem] tracking-[0.22em] tabular-nums text-muted">
                  {p.n}
                </span>
                <Link
                  href={p.href}
                  className={`text-[1.1rem] ${isActive(p.href) ? "text-clay" : "text-ink"}`}
                >
                  {t(translations.nav[p.key])}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </header>
    </>
  );
}
