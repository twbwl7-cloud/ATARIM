import Link from "next/link";
import { PremiumContactForm } from "@/components/PremiumContactForm";
import { nav, site, whatsappUrl } from "@/lib/site";

/** Dark closing band — contact form bleeds into footer */
export function Footer() {
  return (
    <div className="relative z-10 bg-[#0a0a0b] text-[#F5EFE6]">
      <PremiumContactForm />

      <footer className="border-t border-white/10">
        <div
          aria-hidden
          className="mx-auto h-px max-w-xs bg-gradient-to-l from-transparent via-[#D4AF37]/55 to-transparent"
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:py-12 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="max-w-md">
            <p className="display-serif text-2xl font-light tracking-wide text-[#D4AF37] md:text-3xl">
              {site.nameHe}
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-white/45">
              {site.tagline}.
            </p>
            <p className="mt-3 text-sm text-[#D4AF37]/90">
              <bdi dir="ltr">{site.phoneDisplay}</bdi>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/45">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-500 hover:text-[#D4AF37]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#F5EFE6] transition-colors duration-500 hover:text-[#D4AF37]"
            >
              וואטסאפ
            </a>
          </div>
        </div>
        <div className="space-y-2 border-t border-white/10 px-5 py-4 text-center text-[11px] leading-relaxed text-white/35 md:px-8">
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
    </div>
  );
}
