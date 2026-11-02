/** Live green ping — additive urgency cue (does not replace existing avail-pulse) */
export function LiveAvailability({ className = "" }: { className?: string }) {
  return (
    <p className={`live-avail ${className}`.trim()} role="status">
      <span className="live-avail__dot" aria-hidden />
      זמין לפרויקטים חדשים לחודש הקרוב (מקומות מוגבלים)
    </p>
  );
}
