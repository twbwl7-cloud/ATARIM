"use client";

/** A10 · P14 — always-moving proof strip · brand, not landing scarcity */
const ITEMS = [
  "לולילק · אסתטיקה",
  "Cookk · עוגות",
  "לוקסי · מספרה",
  "אתרי תדמית בקוד",
  "הקוד והדומיין שלכם",
  "וואטסאפ · 052-318-2032",
];

export function TrustMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="הוכחות"
      className="relative z-10 overflow-hidden border-y border-line bg-white/[0.02] py-5 backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--sky)_0%,transparent_12%,transparent_88%,var(--sky)_100%)]"
      />
      <div className="marquee-track pe-12" dir="rtl">
        {loop.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="display shrink-0 text-sm font-light tracking-[0.08em] text-muted sm:text-base"
          >
            {label}
            <span className="accent-dot" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
