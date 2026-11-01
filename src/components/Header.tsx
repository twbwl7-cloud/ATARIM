"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, whatsappUrl } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      setOverHero(false);
      return;
    }
    const onScroll = () => {
      // Night glass chrome while still near the top of the page
      setOverHero(window.scrollY < window.innerHeight * 1.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const night = overHero && pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-5 md:gap-4 md:px-8 md:py-3.5">
        <Link
          href="/"
          className="group relative flex shrink-0 items-center gap-2 sm:gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="David Tubul — דף הבית"
        >
          <span className="relative h-9 w-9 shrink-0 sm:h-11 sm:w-11 md:h-12 md:w-12">
            <Image
              src="/brand/emblem.png"
              alt=""
              fill
              sizes="48px"
              unoptimized
              className="object-contain"
            />
          </span>
          <span
            className="select-none text-[13px] font-semibold tracking-[0.14em] uppercase sm:text-[15px] sm:tracking-[0.16em] md:text-lg"
            style={{
              background: "var(--metal-gold)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            David Tubul
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1 md:flex ${
            night
              ? "header-glass-night"
              : "border border-cyan/25 bg-paper/70 backdrop-blur-md"
          }`}
        >
          {nav.map((item) => {
            const pathOnly = item.href.split("#")[0] || "/";
            const active = !item.href.includes("#") && pathname === pathOnly;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3.5 py-2 text-sm transition ${
                  night
                    ? active
                      ? "text-cyan-bright"
                      : "text-[rgba(210,235,245,0.72)] hover:text-[#e8fcff]"
                    : active
                      ? "text-cyan-deep"
                      : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(
              "היי דוד, בא לי לשיחת ייעוץ בוואטסאפ על אתר לעסק שלי.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex rounded-md px-3 py-2 text-[12px] sm:px-4 sm:py-2.5 sm:text-sm ${
              night ? "btn-hero" : "btn-gold"
            }`}
            onClick={() => setOpen(false)}
          >
            ייעוץ בוואטסאפ
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            className={`grid h-10 w-10 place-items-center rounded-md sm:h-11 sm:w-11 md:hidden ${
              night
                ? "border border-cyan/25 bg-[rgba(6,14,24,0.7)] text-[#e8fcff] backdrop-blur-md"
                : "border border-line bg-paper/80 text-ink"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full transition ${night ? "bg-[#e8fcff]" : "bg-ink"} ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full transition ${night ? "bg-[#e8fcff]" : "bg-ink"} ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-full transition ${night ? "bg-[#e8fcff]" : "bg-ink"} ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mx-4 overflow-hidden rounded-2xl p-4 sm:mx-5 md:hidden ${
              night
                ? "header-glass-night"
                : "glass"
            }`}
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-3 text-base ${
                    night
                      ? "text-[#e8fcff] hover:bg-white/5"
                      : "text-ink hover:bg-mist/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
