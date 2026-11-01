"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  demoNiches,
  freeDemoWhatsAppUrl,
  type DemoNicheId,
} from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";

/** Landing Final Push + micro-trust · P11 endowed progress (niche pre-selected) */
export function FreeDemo() {
  const [nicheId, setNicheId] = useState<DemoNicheId>(demoNiches[0].id);
  const [note, setNote] = useState("");

  const selected = demoNiches.find((n) => n.id === nicheId) ?? demoNiches[0];
  const href = freeDemoWhatsAppUrl(selected.label, note);

  return (
    <section
      id="free-demo"
      className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="premium-panel relative overflow-hidden rounded-2xl px-5 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_circle_at_12%_18%,rgba(184,137,45,0.12),transparent_48%),radial-gradient(520px_circle_at_88%_80%,rgba(61,107,122,0.08),transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-l from-transparent via-gold/50 to-transparent"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs tracking-[0.24em] text-gold">דוגמה בחינם</p>
            <h2 className="display mt-3 text-3xl text-ink md:text-5xl">
              שלחו שלוש מילים.{" "}
              <span className="ink-gold">תקבלו דף</span>.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:mt-5 md:text-base">
              בחרו סוג עסק, כתבו מה חשוב, ושלחו בוואטסאפ. בלי כרטיס אשראי ובלי
              התחייבות.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-soft sm:mt-6">
              <li>· בלי התחייבות</li>
              <li>· לפי מה שאתם צריכים — לא תבנית מוכנה</li>
              <li>· ממשיכים רק אם זה מרגיש נכון</li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-day/70 p-4 sm:p-5 md:p-6">
            <p className="text-[11px] tracking-[0.18em] text-muted">סוג עסק</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {demoNiches.map((niche) => {
                const active = niche.id === nicheId;
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => setNicheId(niche.id)}
                    className={`rounded-md px-3 py-2 text-sm transition sm:px-3.5 ${
                      active
                        ? "bg-gold text-rich-black"
                        : "border border-line text-ink hover:border-gold/50 hover:text-gold-deep"
                    }`}
                  >
                    {niche.label}
                  </button>
                );
              })}
            </div>

            <label className="mt-5 block sm:mt-6">
              <span className="text-[11px] tracking-[0.18em] text-muted">
                מה חשוב שיופיע? (לא חובה)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={280}
                placeholder="למשל: כפתור לתור, תפריט עוגות, או מראה שקט למספרה…"
                className="mt-2 w-full resize-none rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-gold/50"
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
            <p className="mt-3 text-center text-[11px] text-muted">{selected.hint}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
