"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { whatsappUrl } from "@/lib/site";

const INTRO_MSG =
  "היי דוד, מעוניין בשיחת ייעוץ. אשמח לפתיחת פנייה לפרויקט.";

const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE_LINES = [
  "נכסים דיגיטליים",
  "שאי אפשר",
  "להתעלם מהם",
] as const;

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
    <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden bg-[#050507]">
      {/* Ambient mesh — deep navy + champagne gold, slow drift */}
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="hero-grain pointer-events-none absolute inset-0 opacity-[0.045]"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#050507] via-[#050507]/70 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-[calc(6.5rem+env(safe-area-inset-top))] text-center sm:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-6 text-[11px] font-light tracking-[0.28em] text-gold sm:mb-8 sm:text-xs"
        >
          סטודיו לפיתוח אתרים
        </motion.p>

        <h1 className="display max-w-4xl text-[clamp(2.35rem,7.2vw,5.4rem)] font-light leading-[1.12] tracking-wide text-ink">
          {TITLE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.05,
                  delay: 0.12 + i * 0.16,
                  ease: EASE,
                }}
              >
                {i === 2 ? (
                  <span className="hero-accent-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
          className="mx-auto mt-7 max-w-lg text-sm font-light leading-relaxed tracking-wide text-muted sm:mt-8 sm:text-[15px]"
        >
          אתרי תדמית יוקרתיים בקוד מותאם — ארכיטקטורת המרה, חוויות תלת־ממד,
          ותוצאות שנמדדות בפניות אמיתיות.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.88, ease: EASE }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <Link
            href="/work"
            className="btn-gold inline-flex min-h-11 items-center justify-center rounded-md px-8 py-3 text-[14px] font-light tracking-wide sm:min-h-12 sm:px-10 sm:text-sm"
          >
            תיק עבודות
          </Link>
          <MagneticButton
            href={introHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost min-h-11 justify-center rounded-md px-8 py-3 text-[14px] font-light tracking-wide sm:min-h-12 sm:text-sm"
          >
            שיחת ייעוץ
          </MagneticButton>
        </motion.div>
      </div>

      {/* Delicate champagne scroll line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3 sm:bottom-9"
        aria-hidden
      >
        <span className="text-[10px] font-light tracking-[0.22em] text-muted/70">
          גללו
        </span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
