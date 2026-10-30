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
      className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="premium-panel relative overflow-hidden rounded-[1.85rem] px-6 py-12 md:px-12 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_circle_at_12%_18%,rgba(212,175,103,0.14),transparent_48%),radial-gradient(520px_circle_at_88%_80%,rgba(90,140,220,0.12),transparent_45%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-l from-transparent via-gold/55 to-transparent"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs tracking-[0.24em] text-gold">דוגמא בחינם</p>
            <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">
              רואים דוגמא למה שאתם רוצים — בלי לשלם קודם
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              בחרו את סוג העסק, כתבו במילה־שתיים מה חשוב לכם, ושלחו. תקבלו
              הדמיה מותאמת לכיוון שלכם לפני החלטה על פרויקט מלא.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-platinum">
              <li>· בלי התחייבות ובלי כרטיס אשראי</li>
              <li>· מבוסס על מה שאתם באמת צריכים — לא תבנית גנרית</li>
              <li>· ממשיכים רק אם הדימו מדויק</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-5 md:p-6">
            <p className="text-[11px] tracking-[0.18em] text-muted">
              בחרו נישה
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {demoNiches.map((niche) => {
                const active = niche.id === nicheId;
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => setNicheId(niche.id)}
                    className={`rounded-full px-3.5 py-2 text-sm transition ${
                      active
                        ? "bg-gold text-rich-black"
                        : "border border-white/15 text-ivory hover:border-gold/50 hover:text-gold-bright"
                    }`}
                  >
                    {niche.label}
                  </button>
                );
              })}
            </div>

            <label className="mt-6 block">
              <span className="text-[11px] tracking-[0.18em] text-muted">
                מה תרצו לראות בדוגמא? (אופציונלי)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={280}
                placeholder="למשל: עמוד בית עם הזמנת תור, תפריט עוגות, או תחושת יוקרה למספרה…"
                className="mt-2 w-full resize-none rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-ivory outline-none placeholder:text-muted/70 focus:border-gold/45"
              />
            </label>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5 flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm"
            >
              שלחו בקשה לדוגמא בחינם
            </a>
            <p className="mt-3 text-center text-[11px] text-muted">
              נפתח וואטסאפ עם ההודעה מוכנה · {selected.hint}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
