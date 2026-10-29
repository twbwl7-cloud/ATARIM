import Link from "next/link";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/60 bg-rich-black/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="display text-2xl text-ivory md:text-3xl">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold">
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-bright"
          >
            וואטסאפ
          </a>
        </div>
      </div>
      <div className="border-t border-line/40 px-5 py-4 text-center text-xs text-muted md:px-8">
        © 2026 {site.name} · נבנה עם Next.js, Three.js ואהבה לפרטים
      </div>
    </footer>
  );
}
