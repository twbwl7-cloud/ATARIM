"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "הודעה קצרה",
    body: "כותבים בוואטסאפ מה העסק ומה חסר היום. קובעים שיחה — בלי התחייבות.",
    outcome: "מועד ביומן",
  },
  {
    n: "02",
    title: "שיחה ישרה",
    body: "מה עובד אצלכם, מה לא, ומה המתחרים כבר עושים. אומרים גם מה לא כדאי לבנות.",
    outcome: "כיוון ברור",
  },
  {
    n: "03",
    title: "דוגמא בחינם",
    body: "רואים עמוד ראשי בסגנון שלכם. ממשיכים רק אם זה מרגיש כמו העסק.",
    outcome: "רואים לפני תשלום",
  },
  {
    n: "04",
    title: "בנייה ומסירה",
    body: "עיצוב, תוכן, כפתורים — במערכת אחת. אתם מקבלים עדכונים, לא הפתעות.",
    outcome: "אתר על שמכם",
  },
  {
    n: "05",
    title: "עלייה לאוויר",
    body: "דומיין, הדרכה קצרה, וליווי אם משהו נשבר בגלל הקוד.",
    outcome: "פניות אמיתיות",
  },
] as const;

export function ProcessJourney() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 85%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative z-10 px-5 py-16 sm:py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.22em] text-gold">איך זה עובד</p>
        <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
          מההודעה הראשונה עד שהאתר חי
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          חמישה שלבים. בלי הבטחות ריקות. כל שלב נגמר במשהו שאפשר לראות.
        </p>

        <div className="relative mt-12 sm:mt-16 md:mt-20">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 right-[11px] w-px bg-white/10 md:right-[19px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute top-2 right-[11px] h-[calc(100%-16px)] w-px bg-gradient-to-b from-gold via-gold-bright to-gold/30 md:right-[19px]"
          />

          <ol className="space-y-10 sm:space-y-12 md:space-y-16">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-5 md:gap-10"
              >
                <span
                  aria-hidden
                  className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 border-gold bg-[#070e18] md:mt-2 md:h-10 md:w-10"
                />
                <div className="min-w-0 pb-1">
                  <p className="display text-sm text-gold">{step.n}</p>
                  <h3 className="display mt-1 text-xl text-ivory sm:text-2xl md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:mt-3 md:text-base">
                    {step.body}
                  </p>
                  <p className="mt-3 text-[11px] tracking-[0.14em] text-platinum">
                    תוצאה · {step.outcome}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-4 border-t border-white/10 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
          <div>
            <p className="display text-xl text-ivory md:text-2xl">
              רוצים קודם לראות דוגמא?
            </p>
            <p className="mt-2 text-sm text-muted">
              בחינם · בלי כרטיס אשראי · ממשיכים רק אם מדויק
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#free-demo"
              className="btn-gold rounded-full px-7 py-3.5 text-center text-sm"
            >
              דוגמא בחינם
            </a>
            <a
              href={whatsappUrl(
                "היי דוד, אשמח לקבוע שיחה קצרה על אתר לעסק שלי.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-full px-7 py-3.5 text-center text-sm"
            >
              שיחה בוואטסאפ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
