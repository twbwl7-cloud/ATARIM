"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0a1220] pt-24">
      <HeroScene />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-between px-5 pb-10 md:px-8 md:pb-14">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-xl md:max-w-[34rem]">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="mb-6 text-xs tracking-[0.22em] text-platinum md:text-sm"
            >
              {site.name} · סטודיו לאתרים פרימיום
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease }}
              className="display text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] text-ivory"
            >
              העסק שלך{" "}
              <span className="gold-text">חזק.</span>
              <br />
              האתר עדיין לא.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14, ease }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg"
            >
              אתר שנראה כמו המובילים בתחום — עם דימו חי של העמוד שלך לפני
              שמחליטים, בלי התחייבות.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={whatsappUrl(
                  "היי דוד, אשמח לבקש הדמיה בחינם לאתר של העסק שלי.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold rounded-full px-7 py-3.5 text-sm active:scale-[0.97]"
              >
                לבקשת הדמיה בחינם
              </a>
              <a href="#work" className="btn-ghost rounded-full px-6 py-3.5 text-sm">
                גללו לגלגל העבודות
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col items-center gap-2 pt-8 text-[11px] tracking-[0.28em] text-muted"
        >
          <span>גללו</span>
          <span className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
