import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PremiumContactForm } from "@/components/PremiumContactForm";
import { nav, site, whatsappUrl } from "@/lib/site";

/**
 * Contact band (charcoal) + floating black footer island.
 * Footer is detached from edges — rounded card, not a full-bleed bar.
 */
export function Footer() {
  return (
    <div className="relative z-10">
      <PremiumContactForm />

      <div className="bg-transparent px-4 pb-6 pt-4 sm:px-5 md:px-8">
        <footer
          className="mx-auto mb-2 flex w-[calc(100%-0.5rem)] max-w-5xl flex-col gap-5 rounded-3xl border border-white/10 bg-black/95 px-8 py-6 shadow-2xl shadow-black/40 backdrop-blur-md sm:mb-4 sm:w-full sm:px-10 sm:py-7 md:flex-row md:items-center md:justify-between md:gap-8 md:px-12"
          aria-label="סיום עמוד"
        >
          <div className="min-w-0">
            <BrandLogo tone="light" size="md" variant="full" href="/" />
            <p className="mt-3 max-w-sm text-xs font-light leading-relaxed text-white/40 sm:text-[13px]">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-light text-white/45">
            {nav.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="transition-colors duration-500 hover:text-[#C5A059]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5EFE6] transition-colors duration-500 hover:text-[#C5A059]"
            >
              וואטסאפ
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors duration-500 hover:text-[#C5A059]"
              dir="ltr"
            >
              {site.email}
            </a>
          </div>

          <p className="text-[11px] font-light tracking-wide text-white/30 md:text-end">
            © 2026 DAVID TOBUL
          </p>
        </footer>
      </div>
    </div>
  );
}
