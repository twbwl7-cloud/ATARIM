"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const ABOUT_BODY =
  "היי, אני דוד. המסע שלי לעולם הפיתוח התחיל מתוך תשוקה אמיתית לחבר בין עיצוב מוקפד לטכנולוגיה חכמה. כסטודנט למדעי המחשב שחי את עולם הדיגיטל, הבנתי מהר מאוד שאתר הוא הרבה מעבר לשורות קוד – הוא חלון הראווה היוקרתי ביותר של העסק שלך. כיום, אני מתמחה בהנדסת ממשקים ובניית אתרי פרימיום וחוויות 3D אינטראקטיביות, ללא תבניות מוכנות (100% קוד נקי). המטרה שלי היא לקחת את החזון שלך ולהפוך אותו לנכס דיגיטלי שמרגיש, נראה ועובד מושלם.";

/** About Me — exact copy from user brief · gold-ring portrait */
export function AboutIntro() {
  return (
    <section
      id="about"
      className="reviews-night relative z-10 overflow-hidden border-y border-white/5 px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hero-grid opacity-40"
      />
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto"
        >
          <div className="relative h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <div className="absolute inset-0 rounded-full border-[2px] border-[#D4AF37] p-1 shadow-[0_0_40px_rgba(212,175,55,0.28),0_24px_48px_rgba(0,0,0,0.45)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0a0f1c]">
                <Image
                  src="/brand/david-portrait.png"
                  alt="דוד טובול"
                  fill
                  sizes="288px"
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-bright">
            עליי
          </p>
          <h2 className="display mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
            היי, אני דוד
          </h2>
          <p className="mt-5 text-[15px] leading-[1.75] text-white/75 sm:text-base md:mt-6 md:text-lg md:leading-[1.8]">
            {ABOUT_BODY}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
