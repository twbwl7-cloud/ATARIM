"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:gap-4 md:px-8 md:py-3.5">
        <Link
          href="/"
          className="group relative flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="David Tubul — דף הבית"
        >
          <span className="relative hidden h-11 w-11 shrink-0 sm:block md:h-12 md:w-12">
            <Image
              src="/brand/emblem.png"
              alt=""
              fill
              sizes="48px"
              unoptimized
              className="object-contain drop-shadow-[0_0_20px_rgba(56,180,255,0.65)]"
            />
          </span>
          {/* CSS wordmark — never clips like a cropped PNG */}
          <span
            className="select-none text-[15px] font-semibold tracking-[0.14em] uppercase sm:text-base md:text-lg"
            style={{
              background: "var(--metal-gold)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 10px rgba(224,180,90,0.35))",
            }}
          >
            David Tubul
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const pathOnly = item.href.split("#")[0] || "/";
            const active = !item.href.includes("#") && pathname === pathOnly;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active ? "text-gold-bright" : "text-muted hover:text-ivory"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#free-demo"
            className="btn-gold hidden rounded-full px-4 py-2.5 text-sm sm:inline-flex"
            onClick={() => setOpen(false)}
          >
            דוגמא בחינם
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-ivory transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-ivory transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-ivory transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
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
            className="glass mx-5 overflow-hidden rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base text-ivory hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#free-demo"
                className="btn-gold mt-2 rounded-full px-4 py-3 text-center text-sm"
                onClick={() => setOpen(false)}
              >
                דוגמא בחינם
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
