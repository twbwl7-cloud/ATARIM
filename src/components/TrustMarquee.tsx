"use client";

/** A10 · P14 — social proof strip after hero (landing Trust beat). */
/** P14 proof strip — facts only, X-filter clean */
const ITEMS = [
  "לולילק · אסתטיקה",
  "Cookk · עוגות",
  "לוקסי · מספרה",
  "דוגמה לפני תשלום",
  "הקוד והדומיין שלכם",
  "וואטסאפ · 052-318-2032",
];

export function TrustMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="הוכחות"
      className="relative z-10 overflow-hidden border-y border-line bg-paper/55 py-4"
    >
      <div className="marquee-track pe-12" dir="rtl">
        {loop.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="display shrink-0 text-sm tracking-[0.04em] text-ink-soft sm:text-base"
          >
            {label}
            <span className="accent-dot" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
