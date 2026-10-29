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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#070708] pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_40%,rgba(158,183,200,0.06),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(201,169,98,0.05),transparent_50%)]" />
      <HeroScene />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-center gap-10 px-5 pb-16 md:px-8 md:pb-20">
        <div className="max-w-xl md:max-w-[34rem]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-sky-300/90 md:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            פיתוח חוויות · חלל דיגיטלי
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease }}
            className="display text-4xl leading-[1.06] text-ivory sm:text-5xl md:text-7xl"
          >
            {site.name}
            <span className="mt-4 block text-xl text-gold sm:text-2xl md:text-3xl">
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
              className="rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-rich-black transition hover:bg-gold-bright active:scale-[0.97]"
            >
              בואו נדבר בוואטסאפ
            </a>
            <a
              href="#pillars"
              className="rounded-full border border-line px-6 py-3.5 text-sm text-ivory transition hover:border-gold/50 hover:text-gold"
            >
              לגלול לתוך החלל
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="flex flex-wrap gap-8 border-t border-line/40 pt-6 text-xs text-muted md:gap-12 md:text-sm"
        >
          <div>
            <p className="text-gold">לקוחות</p>
            <p>קליניקות · בוטיק · מסחר</p>
          </div>
          <div>
            <p className="text-gold">חתימה</p>
            <p>גלילה מקובעת · 3D · המרה</p>
          </div>
          <div>
            <p className="text-gold">סטאק</p>
            <p>Next.js · Three.js · Node · Java</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
