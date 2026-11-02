"use client";

import { motion } from "framer-motion";

/**
 * Compact craft process — content-height only, no sticky multi-vh traps.
 */
const STEPS = [
  {
    n: "01",
    title: "מה חסר היום",
    body: "מדברים על מה באמת עוצר הודעות — לא על מה שהמתחרים מעתיקים.",
    lever: "בהירות",
  },
  {
    n: "02",
    title: "רגע שנזכרים",
    body: "דבר אחד שתופס: גלילה שנשארת, מוצר בתלת־ממד, או מילה שנדלקת. בלי רעש.",
    lever: "סקרנות",
  },
  {
    n: "03",
    title: "דוגמה חיה",
    body: "רואים עמוד אמיתי לפני שמשלמים. לא מצגת — משהו שאפשר ללחוץ עליו.",
    lever: "רואים עבודה",
  },
  {
    n: "04",
    title: "עולים וסוגרים",
    body: "כפתור ברור לוואטסאפ, תור או הזמנה. בלי הבטחות באוויר.",
    lever: "פעולה",
  },
] as const;

export function CraftProcess() {
  return (
    <section
      className="section-void relative z-10 px-5 py-14 md:px-8 md:py-20"
      aria-label="תהליך העבודה"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.28em] text-gold">המלאכה</p>
        <h2 className="display mt-3 text-3xl text-ink md:text-4xl">
          ארבעה שלבים.{" "}
          <span className="luxury-gradient-text">בלי קיצורי דרך.</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm text-muted">
          תהליך קצר וברור — משיחה ראשונה עד אתר שמביא הודעות.
        </p>

        <ol className="mt-8 space-y-6 md:mt-10">
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
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[11px] tracking-[0.2em] text-gold">
                  {step.lever}
                </p>
                <span className="text-sm text-gold">
                  <bdi>{step.n}</bdi>
                </span>
              </div>
              <h3 className="display mt-2 text-2xl text-ink">{step.title}</h3>
              <p className="mt-3 text-sm text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
