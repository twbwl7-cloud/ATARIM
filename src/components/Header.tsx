"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";

/** Full-width brand bar — no corner pill */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-[60] border-b border-white/[0.06] bg-[#050507]/78 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[90rem] items-center gap-4 px-4 py-3 sm:px-6 md:gap-8 md:px-10 md:py-3.5">
        <Link
          href="/"
          className="group relative flex shrink-0 items-center gap-2 sm:gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="דוד טובול — דף הבית"
        >
          <span className="relative h-8 w-8 shrink-0 sm:h-10 sm:w-10 md:h-11 md:w-11">
            <Image
              src="/brand/emblem.png"
              alt=""
              fill
              sizes="44px"
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
          className="hidden min-w-0 flex-1 items-center justify-end gap-1 md:flex lg:gap-2"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap px-3 py-2 text-[13px] tracking-[0.04em] transition lg:px-4 lg:text-sm ${
                  active ? "text-gold" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-l from-transparent via-gold to-transparent lg:inset-x-4"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          className="ms-auto grid h-10 w-10 place-items-center rounded-md border border-line bg-paper/80 text-ink sm:h-11 sm:w-11 md:hidden"
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
            className="border-t border-white/[0.06] bg-[#050507]/95 px-4 py-3 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-base ${
                    isActive(item.href) ? "text-gold" : "text-ink hover:bg-mist/40"
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
