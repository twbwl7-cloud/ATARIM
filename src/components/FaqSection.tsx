"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** תדמית FAQ — answers real objections (P17 specificity · no fake urgency) */
const FAQS = [
  {
    q: "כמה זמן לוקח אתר תדמית?",
    a: "רוב הפרויקטים נסגרים תוך שבועיים עד חודש מהאפיון ועד עלייה לאוויר — תלוי בכמות העמודים ובחומרים שיש לכם מוכנים.",
  },
  {
    q: "זה תבנית מוכנה או קוד מותאם?",
    a: "קוד מותאם. Next.js, תנועה ורספונסיביות לנייד קודם. בלי ערכות מדף ובלי «תבנית פרימיום» שמסתירה את המותג שלכם.",
  },
  {
    q: "מה מקבלים בסוף?",
    a: "אתר חי על הדומיין שלכם, הקוד אצלכם, וואטסאפ/טלפון מחוברים, והדרכה קצרה איך מחליפים טקסט ותמונות.",
  },
  {
    q: "אפשר לראות דוגמה לפני שמשלמים?",
    a: "כן. כשזה מתאים — שולחים כיוון ויזואלי לעסק שלכם לפני התחייבות. לא מתאים? עוצרים שם.",
  },
  {
    q: "למי זה מתאים?",
    a: "קליניקות, מספרות, מזון, נדל״ן ושירותים שצריכים אמון ופנייה — לא חנות עם עגלה. המכירה נסגרת בשיחה.",
  },
] as const;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative z-10 mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32"
    >
      <p className="text-center text-[11px] font-medium tracking-[0.22em] text-gold uppercase">שאלות נפוצות</p>
      <h2 className="display mt-4 text-center text-3xl font-light text-ink md:text-4xl">
        מה שואלים לפני שפונים
      </h2>

      <ul className="mt-10 space-y-2">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="overflow-hidden rounded-xl border border-line bg-paper/40">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-medium text-ink transition hover:bg-mist/40 sm:text-base"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={`shrink-0 text-gold transition ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
