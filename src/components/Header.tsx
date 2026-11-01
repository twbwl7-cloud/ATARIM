"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";

/** Brand chrome — max 5 links, no hard-sell CTA in the bar */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-[60]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-5 md:gap-4 md:px-8 md:py-3.5">
        <Link
          href="/"
          className="group relative flex shrink-0 items-center gap-2 sm:gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="דוד טובול — דף הבית"
        >
          <span className="relative h-8 w-8 shrink-0 sm:h-11 sm:w-11 md:h-12 md:w-12">
            <Image
              src="/brand/emblem.png"
              alt=""
              fill
              sizes="48px"
              priority
              unoptimized
              className="object-contain"
            />
          </span>
          <span
            className="select-none text-[11px] font-semibold tracking-[0.12em] uppercase sm:text-[15px] sm:tracking-[0.16em] md:text-lg"
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
          aria-label="ניווט ראשי"
          className="glass hidden shrink-0 items-center gap-0.5 rounded-full px-1.5 py-1 md:flex lg:gap-1 lg:px-2"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] transition lg:px-3.5 lg:text-sm ${
                  active ? "text-gold" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          className="grid h-10 w-10 place-items-center rounded-md border border-line bg-paper/80 text-ink sm:h-11 sm:w-11 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-4 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span className={`h-px w-full bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
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
            className="glass mx-4 overflow-hidden rounded-2xl p-4 sm:mx-5 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base text-ink hover:bg-mist/60"
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
