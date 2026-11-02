"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { whatsappUrl } from "@/lib/site";

const HeroGlass = dynamic(
  () => import("@/components/HeroGlass").then((m) => m.HeroGlass),
  { ssr: false, loading: () => null },
);

const INTRO_MSG =
  "היי דוד, מעוניין בשיחת ייעוץ. אשמח לפתיחת פנייה לפרויקט.";

const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE_LINES = ["נכסים דיגיטליים", "שאי אפשר להתעלם מהם."] as const;

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const introHref = whatsappUrl(INTRO_MSG);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden bg-transparent">
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      {!reduce ? <HeroGlass /> : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_50%_42%,rgba(249,248,246,0.9)_0%,rgba(249,248,246,0.68)_38%,rgba(249,248,246,0.22)_62%,transparent_78%)]"
      />

      {/* Guiding thread — tall whisper behind copy, never blocks clicks */}
      <div
        className="pointer-events-none absolute inset-y-[16%] start-1/2 z-[3] hidden w-px -translate-x-1/2 opacity-70 sm:block"
        aria-hidden
      >
        <span className="guiding-thread guiding-thread--tall mx-auto" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-[calc(6.5rem+env(safe-area-inset-top))] text-center sm:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-6 text-[11px] font-medium tracking-[0.22em] text-[#A38A5F] sm:mb-8 sm:text-xs"
        >
          דוד טובול — סטודיו לחוויות רשת
        </motion.p>

        <h1 className="display max-w-3xl text-[clamp(2.35rem,6.6vw,4.85rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#121212]">
          {TITLE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.04em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.05,
                  delay: 0.1 + i * 0.14,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mx-auto mt-7 max-w-2xl text-[15px] font-normal leading-[1.85] tracking-wide text-[#5C5C5C] sm:mt-8 sm:text-base md:text-[17px] md:leading-[1.9]"
        >
          יצירת חוויות דיגיטליות אקסקלוסיביות. עיצוב בוטיק בלתי מתפשר, ארכיטקטורה
          חכמה ותנועה מהפנטת שמשאירה חותם. תהליך אישי שלוקח את המותג שלכם לקצה
          העליון של הרשת.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.72, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-4 sm:mt-10"
        >
          <p className="avail-pulse">
            <span className="avail-pulse__dot" aria-hidden />
            פתוח לפרויקטים חדשים
          </p>

          <div className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <span className="btn-gold-shell">
              <MagneticButton
                href={introHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold min-h-11 justify-center rounded-full px-9 py-3 text-[14px] font-medium tracking-wide sm:min-h-12 sm:px-11 sm:text-sm"
              >
                בואו נדבר
              </MagneticButton>
            </span>
            <Link
              href="/work"
              className="btn-ghost inline-flex min-h-11 items-center justify-center rounded-full px-9 py-3 text-[14px] font-medium tracking-wide sm:min-h-12 sm:px-10 sm:text-sm"
            >
              תיק עבודות
            </Link>
          </div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3 sm:bottom-9"
        aria-hidden
      >
        <span className="text-[10px] font-medium tracking-[0.22em] text-[#5C5C5C]/70">
          גללו
        </span>
        <span className="guiding-thread" />
      </div>
    </section>
  );
}
