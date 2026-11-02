/** Fixed champagne orbs — warm gold presence, never blocks UI */
export function AmbientGlow() {
  return (
    <div className="ambient-luxury" aria-hidden>
      <span className="ambient-orb ambient-orb--tr" />
      <span className="ambient-orb ambient-orb--bl" />
      <span className="ambient-orb ambient-orb--mid" />
    </div>
  );
}
