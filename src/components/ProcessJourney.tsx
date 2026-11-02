"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { whatsappUrl } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "שיחת היכרות",
    body: "כותבים מה העסק ומה חסר. קובעים שיחה קצרה — בלי לחץ ובלי כרטיס אשראי.",
    outcome: "מועד ביומן",
  },
  {
    n: "02",
    title: "שיחה ישרה",
    body: "מה כבר ניסיתם, מה עובד בטלפון, ומה לא שווה לבנות. יוצאים עם כיוון אחד.",
    outcome: "רשימה ברורה",
  },
  {
    n: "03",
    title: "כיוון ויזואלי",
    body: "רואים מסך בסגנון שלכם לפני שבונים הכל. לא מתאים — עוצרים. בלי מופע מכירות.",
    outcome: "רואים לפני שבונים",
  },
  {
    n: "04",
    title: "בונים ומעדכנים",
    body: "עיצוב, טקסטים, כפתורים — אצלי. אתם מקבלים עדכון, לא הפתעה באמצע.",
    outcome: "אתר על שמכם",
  },
  {
    n: "05",
    title: "מעלים לאוויר",
    body: "דומיין, הסבר קצר, וליווי אם משהו נשבר. המטרה: הודעות אמיתיות מהאתר.",
    outcome: "הודעות מהאתר",
  },
] as const;

/** Compact process — content-height only, no sticky viewport traps */
export function ProcessJourney() {
  return (
    <section id="process" className="relative z-10 px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          איך זה עובד
        </p>
        <h2 className="display mt-3 text-3xl font-light text-ink md:text-4xl">
          איך אתר עולה לאוויר בחמישה צעדים
        </h2>
        <ol className="mt-8 space-y-8 md:mt-10">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-line pt-5"
            >
              <p className="text-sm text-gold">
                <bdi>{step.n}</bdi>
              </p>
              <h3 className="display mt-1 text-2xl text-ink">{step.title}</h3>
              <p className="mt-3 text-sm text-muted">{step.body}</p>
              <p className="mt-3 text-[11px] text-ink-soft">
                תוצאה · {step.outcome}
              </p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center md:mt-12">
          <MagneticButton
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold justify-center rounded-md px-8 py-3.5 text-sm font-light"
          >
            שיחת ייעוץ בוואטסאפ
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
