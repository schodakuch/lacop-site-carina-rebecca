import Link from "next/link";
import { copy } from "@/data/copy";

export default function NotFound() {
  return (
    <article className="px-5 md:px-10 max-w-[1100px] pt-16 md:pt-24 pb-24">
      <span className="mono text-[0.64rem] uppercase tracking-[0.24em] text-muted">404</span>
      <h1 className="mt-6 font-serif font-light text-[clamp(2.4rem,7vw,4.4rem)] tracking-[-0.02em]">
        {copy.notfound.heading}
      </h1>
      <p className="mt-5 font-serif text-[1rem] leading-relaxed text-ink-soft max-w-[52ch]">
        {copy.notfound.body}
      </p>
      <div className="mt-8">
        <Link href="/" className="mono text-[0.66rem] uppercase tracking-[0.22em] text-ink hover-line">
          ← {copy.notfound.home}
        </Link>
      </div>
    </article>
  );
}
