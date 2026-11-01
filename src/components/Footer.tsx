import Link from "next/link";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:py-16 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="display text-2xl font-light text-ink md:text-3xl">{site.nameHe}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {site.tagline}.
          </p>
          <p className="mt-3 text-sm text-gold">
            <bdi dir="ltr">{site.phoneDisplay}</bdi>
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink transition hover:text-gold"
          >
            וואטסאפ
          </a>
        </div>
      </div>
      <div className="space-y-2 border-t border-line px-5 py-4 text-center text-[11px] leading-relaxed text-muted md:px-8">
        <p>
          © 2026 {site.nameHe} · {site.phoneDisplay}
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>מדיניות פרטיות</span>
          <span aria-hidden>·</span>
          <span>הצהרת נגישות</span>
          <span aria-hidden>·</span>
          <span>התכנים להמחשה. מחיר סופי אחרי שיחה.</span>
        </p>
      </div>
    </footer>
  );
}
