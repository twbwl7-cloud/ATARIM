/** Soft microcopy under primary CTAs — additive layer only */
export function CtaReassurance({
  className = "",
}: {
  className?: string;
}) {
  return (
    <p className={`cta-reassurance ${className}`.trim()}>
      שיחת ייעוץ והתאמה ללא התחייבות | מענה אישי ומהיר
    </p>
  );
}
