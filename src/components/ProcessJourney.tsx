"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "הודעה קצרה",
    accent: "gold" as const,
    body: (
      <>
        כותבים בוואטסאפ מה העסק ומה חסר היום. קובעים שיחה —{" "}
        <span className="ink-cyan">בלי התחייבות</span>.
      </>
    ),
    outcome: "מועד ביומן",
  },
  {
    n: "02",
    title: "שיחה ישרה",
    accent: "rose" as const,
    body: (
      <>
        מה עובד אצלכם, מה לא, ומה המתחרים כבר עושים. אומרים גם מה{" "}
        <span className="ink-rose">לא כדאי</span> לבנות.
      </>
    ),
    outcome: "כיוון ברור",
  },
  {
    n: "03",
    title: "דוגמא בחינם",
    accent: "cyan" as const,
    body: (
      <>
        רואים עמוד ראשי בסגנון שלכם. ממשיכים רק אם זה מרגיש כמו{" "}
        <span className="ink-gold">העסק</span>.
      </>
    ),
    outcome: "רואים לפני תשלום",
  },
  {
    n: "04",
    title: "בנייה ומסירה",
    accent: "gold" as const,
    body: (
      <>
        עיצוב, תוכן, כפתורים — במערכת אחת. אתם מקבלים עדכונים, לא{" "}
        <span className="ink-champagne">הפתעות</span>.
      </>
    ),
    outcome: "אתר על שמכם",
  },
  {
    n: "05",
    title: "עלייה לאוויר",
    accent: "cyan" as const,
    body: (
      <>
        דומיין, הדרכה קצרה, וליווי אם משהו נשבר בגלל הקוד. מטרה:{" "}
        <span className="ink-gold">פניות אמיתיות</span>.
      </>
    ),
    outcome: "פניות אמיתיות",
  },
] as const;

const NUM = {
  gold: "text-gold-bright",
  rose: "text-pink",
  cyan: "text-cyan-bright",
} as const;

/**
 * Locked viewport scrub — screen stays pinned; only the steps content moves.
 */
export function ProcessJourney() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0.08, 0.88], ["8%", "-72%"]);
  const lineScale = useTransform(scrollYProgress, [0.08, 0.88], [0.08, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 0.5, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative z-10 h-[320vh] bg-[#070e18] sm:h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(232,196,106,0.14),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(78,196,255,0.12),transparent_45%),radial-gradient(ellipse_at_50%_50%,rgba(155,125,255,0.06),transparent_55%)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-3xl shrink-0 px-5 pt-20 sm:px-8 sm:pt-24">
          <p className="text-xs tracking-[0.22em] text-gold">איך זה עובד</p>
          <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
            מההודעה הראשונה עד שהאתר{" "}
            <span className="ink-gold">חי</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            המסך <span className="ink-cyan">ננעל</span>. גללו — רק השלבים זזים.
            חמישה שלבים, כל אחד עם{" "}
            <span className="ink-rose">תוצאה</span>.
          </p>
          <div className="mt-5 h-px w-full max-w-xs overflow-hidden bg-white/10">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-l from-gold via-cyan to-pink"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-6 w-full max-w-3xl flex-1 overflow-hidden px-5 sm:mt-8 sm:px-8">
          <div
            aria-hidden
            className="absolute top-0 bottom-24 right-[11px] w-px bg-white/10 md:right-[19px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute top-0 right-[11px] h-[calc(100%-6rem)] w-px bg-gradient-to-b from-gold via-cyan-bright to-pink/50 md:right-[19px]"
          />

          <motion.ol style={{ y: contentY }} className="relative space-y-14 pb-40 sm:space-y-16 md:space-y-20">
            {STEPS.map((step) => (
              <li key={step.n} className="relative flex gap-5 md:gap-10">
                <span
                  aria-hidden
                  className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 border-gold bg-[#070e18] shadow-[0_0_18px_rgba(232,196,106,0.45)] md:mt-2 md:h-10 md:w-10"
                />
                <div className="min-w-0 pb-1">
                  <p className={`display text-sm ${NUM[step.accent]}`}>{step.n}</p>
                  <h3 className="display mt-1 text-2xl text-ivory sm:text-3xl md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                    {step.body}
                  </p>
                  <p className="mt-4 text-[11px] tracking-[0.14em] text-platinum">
                    תוצאה · <span className="ink-gold">{step.outcome}</span>
                  </p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>

        <motion.div
          style={{ opacity: ctaOpacity }}
          className="relative z-20 mx-auto flex w-full max-w-3xl flex-col gap-4 border-t border-gold/20 bg-[#070e18]/90 px-5 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6"
        >
          <div>
            <p className="display text-lg text-ivory sm:text-xl">
              רוצים קודם לראות <span className="ink-gold">דוגמא</span>?
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="ink-cyan">בחינם</span> · בלי התחייבות
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <a href="#free-demo" className="btn-gold rounded-full px-6 py-3 text-center text-sm">
              דוגמא בחינם
            </a>
            <a
              href={whatsappUrl("היי דוד, אשמח לקבוע שיחה קצרה על אתר לעסק שלי.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-full px-6 py-3 text-center text-sm"
            >
              שיחה בוואטסאפ
            </a>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.24em] text-muted"
        >
          גללו — המסך נעול
        </motion.p>
      </div>
    </section>
  );
}
