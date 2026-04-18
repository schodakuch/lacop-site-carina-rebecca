import Link from "next/link";

export default function NotFound() {
  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-16 md:pt-24 pb-24">
      <div className="rule-t pt-4 flex items-baseline justify-between gap-3">
        <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">Off-page</span>
        <span className="mono text-[0.64rem] tracking-[0.24em] tabular-nums text-muted">—</span>
      </div>
      <h1 className="mt-14 md:mt-20 text-[clamp(2.4rem,7vw,4.4rem)] tracking-[-0.02em] font-light">
        Page not found
      </h1>
      <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft max-w-[52ch]">
        No such page in this book.
      </p>
      <div className="mt-8">
        <Link href="/" className="mono text-[0.66rem] uppercase tracking-[0.22em] text-ink hover-line">
          ← Back to the cover
        </Link>
      </div>
    </article>
  );
}
