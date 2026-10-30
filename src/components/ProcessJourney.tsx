"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

/**
 * Formal rare process — from first ping to go-live (prompt-formats §7).
 * Vertical progress line. Persuasive, official, no fake urgency.
 */
const STEPS = [
  {
    n: "01",
    title: "פנייה וקביעת שיחה",
    body: "הודעת וואטסאפ קצרה. קובעים יחד שיחת היכרות — בלי לחץ, בלי התחייבות, בתיאום מראש.",
    outcome: "נקבע מועד רשמי ביומן",
  },
  {
    n: "02",
    title: "שיחת היכרות",
    body: "מבינים את העסק, את הלקוח שלכם, ואת מה שהמתחרים כבר עושים ברשת. אומרים בכנות מה כדאי לבנות — ומה לא.",
    outcome: "כיוון ברור + התאמה",
  },
  {
    n: "03",
    title: "הדמיה בחינם",
    body: "לפני שמשלמים על פרויקט מלא — רואים דימו של העמוד הראשי של העסק שלכם. ממשיכים רק אם זה מדויק.",
    outcome: "רואים לפני שמחליטים",
  },
  {
    n: "04",
    title: "בנייה ומסירה",
    body: "עיצוב, תנועה, תוכן והמרה — נבנים כמערכת אחת. אתם מקבלים עדכונים, לא הפתעות בכתב.",
    outcome: "אתר ששייך לכם",
  },
  {
    n: "05",
    title: "עלייה לאוויר",
    body: "העלאה, דומיין על שמכם, הדרכה קצרה. אם משהו נשבר בגלל הקוד — מתוקן. בלי לנטוש אחרי ה־launch.",
    outcome: "נוכחות חיה שמביאה פניות",
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
      className="relative z-10 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.22em] text-gold">02 · למה ממני</p>
        <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
          מהרגע שפונים — עד שהאתר עולה לאוויר
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          תהליך רשמי ושקוף: בלי תבניות מוכנות, בלי הבטחות ריקות, ובלי להעלים
          אחרי התשלום. כל שלב נגמר בתוצאה שאפשר לראות.
        </p>

        <div className="relative mt-16 md:mt-20">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 right-[11px] w-px bg-white/10 md:right-[19px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute top-2 right-[11px] h-[calc(100%-16px)] w-px bg-gradient-to-b from-gold via-gold-bright to-gold/30 md:right-[19px]"
          />

          <ol className="space-y-12 md:space-y-16">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-6 md:gap-10"
              >
                <span
                  aria-hidden
                  className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 border-gold bg-[#070e18] md:mt-2 md:h-10 md:w-10"
                />
                <div className="min-w-0 pb-2">
                  <p className="display text-sm text-gold">{step.n}</p>
                  <h3 className="display mt-1 text-2xl text-ivory md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                    {step.body}
                  </p>
                  <p className="mt-4 text-[11px] tracking-[0.16em] text-platinum">
                    תוצאה · {step.outcome}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="display text-xl text-ivory md:text-2xl">
              מוכנים לשלב הראשון?
            </p>
            <p className="mt-2 text-sm text-muted">
              קובעים שיחה · בלי התחייבות · האתר והקוד על שמכם
            </p>
          </div>
          <a
            href={whatsappUrl(
              "היי דוד, אשמח לקבוע שיחת היכרות רשמית ולשמוע על התהליך עד עלייה לאוויר.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shrink-0 rounded-full px-7 py-3.5 text-sm"
          >
            קביעת שיחת היכרות
          </a>
        </div>
      </div>
    </section>
  );
}
