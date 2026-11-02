/** Floating trust badges — additive layer only */
const BADGES = [
  "100% Custom Code — ללא תבניות",
  "ביצועים ומהירות שיא",
] as const;

export function TrustBadges() {
  return (
    <ul className="trust-badges" aria-label="יתרונות">
      {BADGES.map((label) => (
        <li key={label} className="trust-badge">
          {label}
        </li>
      ))}
    </ul>
  );
}
