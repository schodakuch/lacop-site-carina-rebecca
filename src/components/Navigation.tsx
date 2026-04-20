"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { copy } from "@/data/copy";

// Side rail (desktop) + top bar with sliding drawer (mobile). The rail
// is the nav paradigm that diverges this site from the rest of the
// repo — every other site uses a top bar.

const ROUTES = [
  { href: "/", key: "home", label: copy.nav.home, n: "01" },
  { href: "/portfolio", key: "portfolio", label: copy.nav.portfolio, n: "02" },
  { href: "/about", key: "about", label: copy.nav.about, n: "03" },
  { href: "/contact", key: "contact", label: copy.nav.contact, n: "04" },
] as const;

export default function Navigation() {
  const profile = useProfile();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const displayName = profile.display_name ?? profile.slug;
  const firstName = displayName.split(" ")[0];
  const lastName = displayName.split(" ").slice(1).join(" ");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

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
            Portfolio
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

        <nav aria-label="Hauptnavigation">
          <ol className="space-y-2.5">
            {ROUTES.map((r) => {
              const active = isActive(r.href);
              return (
                <li key={r.key} className="flex items-baseline gap-3">
                  <span
                    className={`mono text-[0.64rem] tracking-[0.22em] tabular-nums ${
                      active ? "text-clay" : "text-muted"
                    }`}
                  >
                    {r.n}
                  </span>
                  <Link
                    href={r.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-[0.94rem] ${active ? "text-clay" : "text-ink"} hover-line`}
                  >
                    {r.label}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div>
          <span className="mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            {profile.website_domain ?? displayName}
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-index"
            className="mono text-[0.66rem] uppercase tracking-[0.22em] text-ink min-h-11 min-w-11 flex items-center justify-center -mr-2"
          >
            {open ? copy.nav.close : copy.nav.menu}
          </button>
        </div>
        <div
          id="mobile-index"
          className={`transition-[max-height,opacity] duration-300 ${
            open
              ? "max-h-[calc(100vh-3.5rem)] opacity-100 border-t border-rule overflow-y-auto"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ol className="px-5 divide-y divide-rule">
            {ROUTES.map((r) => {
              const active = isActive(r.href);
              return (
                <li key={r.key}>
                  <Link
                    href={r.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-5 min-h-14 py-3 ${
                      active ? "text-clay" : "text-ink"
                    }`}
                  >
                    <span
                      className={`mono text-[0.66rem] tracking-[0.22em] tabular-nums w-8 shrink-0 ${
                        active ? "text-clay" : "text-muted"
                      }`}
                    >
                      {r.n}
                    </span>
                    <span className="text-[1.2rem] tracking-[-0.005em]">{r.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </header>
    </>
  );
}
