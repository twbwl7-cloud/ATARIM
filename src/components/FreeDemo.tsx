"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  demoNiches,
  freeDemoWhatsAppUrl,
  type DemoNicheId,
} from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";

/** Offer block — micro-commitment, one CTA, real reassurance (Script 6 / landing) */
export function FreeDemo() {
  const [nicheId, setNicheId] = useState<DemoNicheId>(demoNiches[0].id);
  const [note, setNote] = useState("");

  const selected = demoNiches.find((n) => n.id === nicheId) ?? demoNiches[0];
  const href = freeDemoWhatsAppUrl(selected.label, note);

  return (
    <section
      id="free-demo"
      className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="premium-panel relative overflow-hidden rounded-2xl px-5 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16"
      >
        <div className="relative z-[1] grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
              Soft Entry
            </p>
            <h2 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
              כיוון ויזואלי לפני התחייבות.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:mt-5 md:text-base">
              בחרו נישה, ציינו מה חייב להופיע, שלחו Project Inquiry. מקבלים כיוון
              Bespoke — לא תבנית מהמדף.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-soft sm:mt-6">
              <li>· לא מתאים — עוצרים. בלי לחץ מכירה.</li>
              <li>· לפי המותג שלכם, לא קטלוג מוכן.</li>
              <li>· ממשיכים רק אחרי שראיתם את הסטנדרט.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md sm:p-5 md:p-6">
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">סוג עסק</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {demoNiches.map((niche) => {
                const active = niche.id === nicheId;
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => setNicheId(niche.id)}
                    className={`rounded-md px-3 py-2 text-sm transition-all duration-500 ease-in-out sm:px-3.5 ${
                      active
                        ? "border border-gold/50 bg-gold/15 text-gold"
                        : "border border-white/10 text-ink hover:border-gold/35"
                    }`}
                  >
                    {niche.label}
                  </button>
                );
              })}
            </div>

            <label className="mt-5 block sm:mt-6">
              <span className="text-[11px] tracking-[0.12em] text-muted">
                מה חשוב שיופיע? (לא חובה)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={280}
                placeholder="למשל: כפתור לתור, תפריט עוגות, מראה שקט למספרה…"
                className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-all duration-500 ease-in-out placeholder:text-muted/70 focus:border-gold/40"
              />
            </label>

            <MagneticButton
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5 w-full items-center justify-center rounded-md px-7 py-3.5 text-sm"
            >
              לשליחה בוואטסאפ
            </MagneticButton>
            <p className="mt-3 text-center text-[11px] text-muted">
              {selected.hint} · שליחה = הסכמה שנחזור רק על הבקשה
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
