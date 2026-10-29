"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-elevated/80 text-[11px] font-semibold tracking-[0.18em] text-gold shadow-[0_0_20px_rgba(212,175,103,0.15)]"
          >
            דט
          </span>
          <span className="flex flex-col leading-tight">
            <span className="display text-lg text-ivory md:text-xl">
              {site.name}
            </span>
            <span className="hidden text-[11px] tracking-wide text-muted sm:block">
              פלטפורמות פרימיום · 3D
            </span>
          </span>
        </Link>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-gold/20 text-gold-bright"
                    : "text-muted hover:text-ivory"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hidden rounded-full px-4 py-2.5 text-sm sm:inline-flex"
          >
            הצעת מחיר בוואטסאפ
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-elevated/85 text-ivory md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">תפריט</span>
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
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-2 rounded-full px-4 py-3 text-center text-sm"
                onClick={() => setOpen(false)}
              >
                הצעת מחיר בוואטסאפ
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
