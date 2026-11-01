"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * H29 about · V11 builder · X-filter
 * Facts only — no מסע / חוויה / חזון / מושלם
 */
const ABOUT_BODY =
  "היי, אני דוד. לומד מדעי המחשב באוניברסיטה הפתוחה. בונה אתרים בקוד — בלי תבניות מהמדף. שלושה אתרים חיים באוויר: לולילק, Cookk ולוקסי. כותבים בוואטסאפ, רואים דוגמה, וממשיכים רק אם זה מדויק לעסק שלכם.";

/** About — portrait + concrete copy · near page bottom */
export function AboutIntro() {
  return (
    <section
      id="about"
      className="section-void relative z-10 overflow-hidden border-y border-line px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto"
        >
          <div className="relative h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <div className="absolute inset-0 rounded-full border-[2px] border-[#D4AF37] p-[3px] shadow-[0_12px_40px_rgba(10,22,40,0.14),0_0_0_6px_rgba(212,175,55,0.12)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-paper">
                <Image
                  src="/brand/david-portrait.jpg"
                  alt="דוד טובול"
                  fill
                  sizes="288px"
                  className="object-cover object-[center_18%]"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan-deep">
            עליי
          </p>
          <h2 className="display mt-3 text-3xl text-ink md:text-4xl lg:text-5xl">
            היי, אני דוד
          </h2>
          <p className="mt-5 text-[15px] leading-[1.75] text-muted sm:text-base md:mt-6 md:text-lg md:leading-[1.8]">
            {ABOUT_BODY}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
