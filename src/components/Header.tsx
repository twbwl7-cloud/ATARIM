"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, whatsappUrl } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8 md:py-4">
        {/* RTL: right side = brand */}
        <Link
          href="/"
          className="group relative flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="David Tubul — דף הבית"
        >
          <span className="relative block h-10 w-[200px] sm:h-11 sm:w-[240px] md:h-12 md:w-[280px]">
            <Image
              src="/brand/header-logo.png"
              alt="DAVID TUBUL"
              fill
              priority
              sizes="280px"
              className="object-contain object-right drop-shadow-[0_0_14px_rgba(60,160,220,0.35)]"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
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
          <a
            href={whatsappUrl("היי דוד, אשמח לקבוע שיחת היכרות רשמית.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hidden rounded-full px-4 py-2.5 text-sm sm:inline-flex"
          >
            קביעת שיחה
          </a>
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
              <a
                href={whatsappUrl("היי דוד, אשמח לקבוע שיחת היכרות רשמית.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-2 rounded-full px-4 py-3 text-center text-sm"
                onClick={() => setOpen(false)}
              >
                קביעת שיחה
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
