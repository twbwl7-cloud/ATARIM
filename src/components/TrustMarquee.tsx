"use client";

/** A10 · P14 — always-moving proof strip · bright · X-filter clean */
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
      className="relative z-10 overflow-hidden border-y border-line bg-paper/60 py-4 backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--sky)_0%,transparent_12%,transparent_88%,var(--sky)_100%)]"
      />
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
