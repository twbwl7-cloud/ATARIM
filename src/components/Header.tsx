"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, consultLink } from "@/lib/site";

/** Floating light-glass pill navbar */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-3 pt-4 sm:px-5 sm:pt-5 md:px-8">
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center gap-3 rounded-full border border-black/5 bg-white/40 px-3 py-2 shadow-[0_8px_32px_rgba(26,26,26,0.06)] backdrop-blur-md sm:gap-4 sm:px-5 sm:py-2.5">
        <Link
          href="/"
          className="shrink-0 select-none px-2 py-1 font-[family-name:var(--font-frank)] text-[11px] font-light tracking-[0.28em] text-[#1A1A1A] uppercase transition-colors duration-500 ease-in-out hover:text-[#C5A059] sm:text-xs md:text-sm md:tracking-[0.32em]"
          onClick={() => setOpen(false)}
          aria-label="דוד טובול — דף הבית"
        >
          DAVID TUBUL
        </Link>

        <nav
          aria-label="ניווט ראשי"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-2"
        >
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-light tracking-wide transition-colors duration-500 ease-in-out lg:px-4 ${
                  active
                    ? "text-[#C5A059]"
                    : "text-[#6B6B6B] hover:text-[#C5A059]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={consultLink.href}
          className="header-consult hidden shrink-0 rounded-full border border-black/10 px-4 py-1.5 text-[12px] font-light tracking-wide text-[#1A1A1A] transition-all duration-500 ease-in-out hover:border-[#C5A059]/55 hover:text-[#C5A059] md:inline-flex lg:px-5 lg:text-[13px]"
        >
          {consultLink.label}
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          className="ms-auto grid h-9 w-9 place-items-center rounded-full border border-black/10 text-[#1A1A1A] md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-3.5 flex-col gap-1">
            <span
              className={`h-px w-full bg-[#1A1A1A] transition duration-500 ${open ? "translate-y-[2.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full bg-[#1A1A1A] transition duration-500 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full bg-[#1A1A1A] transition duration-500 ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-3 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-light ${
                    isActive(item.href)
                      ? "text-[#C5A059]"
                      : "text-[#1A1A1A] hover:text-[#C5A059]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={consultLink.href}
                onClick={() => setOpen(false)}
                className="header-consult mt-1 rounded-full border border-black/10 px-4 py-3 text-center text-sm font-light text-[#1A1A1A]"
              >
                {consultLink.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
