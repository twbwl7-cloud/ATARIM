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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-rich-black pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_40%,rgba(201,161,91,0.1),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(212,168,181,0.08),transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(122,46,58,0.08),transparent_45%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-bright/50 to-transparent"
      />
      <HeroScene />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-center gap-10 px-5 pb-16 md:px-8 md:pb-20">
        <div className="max-w-xl md:max-w-[36rem]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.24em] text-platinum md:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_14px_rgba(201,161,91,0.9)]" />
            פיתוח חוויות · חלל דיגיטלי
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease }}
            className="display text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-7xl"
          >
            {site.name}
            <span className="luxury-gradient-text mt-4 block text-xl sm:text-2xl md:text-3xl">
              אתרים שנראים כמו יקום קטן — וסוגרים עסקאות
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            פלטפורמות פרימיום, ממשקי 3D ומיתוג יוקרתי — בנויים כך שהלקוח שלך
            מרגיש את האיכות לפני השיחה הראשונה.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-full px-7 py-3.5 text-sm active:scale-[0.97]"
            >
              בואו נדבר בוואטסאפ
            </a>
            <a
              href="#work"
              className="btn-ghost rounded-full px-7 py-3.5 text-sm"
            >
              לצפות בעבודות חיות
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="flex flex-wrap gap-8 border-t border-line/50 pt-6 text-xs text-muted md:gap-12 md:text-sm"
        >
          <div>
            <p className="mb-1 text-[11px] tracking-[0.18em] text-gold uppercase">
              לקוחות
            </p>
            <p>קליניקות · עוגות · מספרות</p>
          </div>
          <div>
            <p className="mb-1 text-[11px] tracking-[0.18em] text-gold uppercase">
              חתימה
            </p>
            <p>גלילה מקובעת · 3D · המרה</p>
          </div>
          <div>
            <p className="mb-1 text-[11px] tracking-[0.18em] text-gold uppercase">
              סטאק
            </p>
            <p>Next.js · Three.js · Node · Java</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
