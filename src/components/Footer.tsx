import Link from "next/link";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="display text-2xl text-ink md:text-3xl">{site.nameHe}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            אתר שמביא הודעות — לא רק יופי.
          </p>
          <p className="mt-3 text-sm text-cyan-deep">
            <bdi dir="ltr">{site.phoneDisplay}</bdi>
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-cyan-deep"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink transition hover:text-cyan-deep"
          >
            וואטסאפ
          </a>
        </div>
      </div>
      <div className="space-y-2 border-t border-line px-5 py-4 text-center text-[11px] leading-relaxed text-muted md:px-8">
        <p>
          © 2026 {site.nameHe} · {site.phoneDisplay}
        </p>
        <p>התכנים באתר להמחשה. מחיר סופי אחרי שיחה. אין דיוור בלי הסכמה.</p>
      </div>
    </footer>
  );
}
