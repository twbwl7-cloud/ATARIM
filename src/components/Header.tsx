"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { luxSpring } from "@/lib/motion";
import { navLinks, consultLink } from "@/lib/site";

/** Floating cream glass pill — thin, elegant, black + premium gold */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-3 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5 sm:pt-3.5 md:px-8">
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 overflow-visible rounded-full border border-[#C5A059]/25 bg-[#FAF9F6]/80 px-2.5 py-1 shadow-[0_6px_24px_rgba(18,18,18,0.05)] backdrop-blur-md sm:gap-3 sm:px-4 sm:py-1.5">
        <BrandLogo
          tone="light"
          size="sm"
          variant="full-wide"
          href="/"
          className="!p-1 min-w-0 max-w-[min(100%,10.5rem)] overflow-visible sm:!p-1.5 sm:max-w-[12.5rem]"
          onClick={() => setOpen(false)}
        />

        <nav
          aria-label="ניווט ראשי"
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-5 md:flex lg:gap-x-8"
        >
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`lux-link whitespace-nowrap text-[12.5px] font-light tracking-[0.04em] transition-colors duration-500 ease-in-out lg:text-[13px] ${
                  active
                    ? "text-[#C5A059]"
                    : "text-[#5C5C5C] hover:text-[#C5A059]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={consultLink.href}
          className="header-consult hidden shrink-0 rounded-full border border-black/10 px-4 py-1 text-[12px] font-light tracking-wide md:inline-flex lg:px-5 lg:text-[12.5px]"
        >
          {consultLink.label}
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          className="ms-auto grid h-8 w-8 place-items-center rounded-full border border-[#C5A059]/30 text-[#121212] md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-3.5 flex-col gap-1">
            <span
              className={`h-px w-full bg-[#121212] transition duration-500 ${open ? "translate-y-[2.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full bg-[#C5A059] transition duration-500 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full bg-[#121212] transition duration-500 ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`}
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
            transition={luxSpring}
            className="pointer-events-auto mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#FAF9F6]/92 p-3 shadow-[0_12px_40px_rgba(18,18,18,0.08)] backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-light ${
                    isActive(item.href)
                      ? "text-[#C5A059]"
                      : "text-[#121212] hover:text-[#C5A059]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={consultLink.href}
                onClick={() => setOpen(false)}
                className="header-consult mt-1 rounded-full border border-black/10 px-4 py-3 text-center text-sm font-light"
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
