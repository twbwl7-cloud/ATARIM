"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  demoNiches,
  freeDemoWhatsAppUrl,
  type DemoNicheId,
} from "@/lib/site";

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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="premium-panel relative overflow-hidden rounded-[1.5rem] px-5 py-10 sm:rounded-[1.85rem] sm:px-6 sm:py-12 md:px-12 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_circle_at_12%_18%,rgba(62,200,240,0.22),transparent_48%),radial-gradient(520px_circle_at_88%_80%,rgba(138,232,255,0.14),transparent_45%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-l from-transparent via-cyan/55 to-transparent"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs tracking-[0.24em] text-cyan-bright">
              דוגמה בחינם
            </p>
            {/* L25 free · L29 small step */}
            <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
              קודם רואים.{" "}
              <span className="ink-cyan">אחר כך</span> מחליטים.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:mt-5 md:text-base">
              בחרו סוג עסק, כתבו משפט על מה חשוב לכם, ושלחו. תקבלו דוגמה{" "}
              <span className="ink-gold">שלכם</span> — בלי כרטיס אשראי.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-platinum sm:mt-6">
              <li>
                · בלי <span className="ink-cyan">התחייבות</span>
              </li>
              <li>
                · לפי מה שאתם צריכים — לא תבנית{" "}
                <span className="ink-rose">מוכנה</span>
              </li>
              <li>
                · ממשיכים רק אם זה{" "}
                <span className="ink-gold">מרגיש נכון</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan/30 bg-black/30 p-4 shadow-[0_0_40px_rgba(62,200,240,0.12)] sm:p-5 md:p-6">
            <p className="text-[11px] tracking-[0.18em] text-muted">סוג עסק</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {demoNiches.map((niche) => {
                const active = niche.id === nicheId;
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => setNicheId(niche.id)}
                    className={`rounded-full px-3 py-2 text-sm transition sm:px-3.5 ${
                      active
                        ? "bg-cyan text-rich-black shadow-[0_0_24px_rgba(62,200,240,0.5)]"
                        : "border border-white/15 text-ivory hover:border-cyan/50 hover:text-cyan-bright"
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
                className="mt-2 w-full resize-none rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-ivory outline-none placeholder:text-muted/70 focus:border-cyan/50 focus:shadow-[0_0_20px_rgba(62,200,240,0.18)]"
              />
            </label>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5 flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm"
            >
              לשליחה בוואטסאפ
            </a>
            <p className="mt-3 text-center text-[11px] text-muted">
              {selected.hint}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
