"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-rich-black" /> },
);

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,7,8,0.55)_70%,rgba(7,7,8,0.92)_100%)]" />
      <HeroScene />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-end gap-10 px-5 pb-16 md:justify-center md:px-8 md:pb-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-pink md:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            חוויות דיגיטליות אימרסיביות
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="display text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-7xl"
          >
            {site.name}
            <span className="mt-3 block text-2xl text-gold sm:text-3xl md:text-4xl">
              פלטפורמות פרימיום שנראות כמו מותג יוקרה
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            פיתוח חנויות ואתרי תדמית, ממשקי 3D ומיתוג דיגיטלי יוקרתי — עם בסיס
            טכנולוגי יציב של Next.js, Node.js ו-Java.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-rich-black transition hover:bg-gold-bright"
            >
              בואו נדבר בוואטסאפ
            </a>
            <a
              href="#work"
              className="rounded-full border border-line px-6 py-3.5 text-sm text-ivory transition hover:border-gold/50 hover:text-gold"
            >
              לצפייה בעבודות
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-wrap gap-6 border-t border-line/50 pt-6 text-xs text-muted md:gap-10 md:text-sm"
        >
          <div>
            <p className="text-gold">התמחות</p>
            <p>קליניקות אסתטיקה · מאפיות בוטיק</p>
          </div>
          <div>
            <p className="text-gold">מוצר ליבה</p>
            <p>פלטפורמות 3D ו-E-commerce</p>
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
