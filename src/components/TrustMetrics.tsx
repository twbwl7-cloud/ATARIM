/** Compact trust metrics strip — additive layer only */
const METRICS = [
  { label: "מהירות טעינה מקסימלית", icon: "bolt" },
  { label: "התאמה מלאה למובייל", icon: "device" },
  { label: "אבטחה", icon: "shield" },
] as const;

function MetricIcon({ kind }: { kind: (typeof METRICS)[number]["icon"] }) {
  if (kind === "bolt") {
    return (
      <svg viewBox="0 0 16 16" className="trust-metric__icon" aria-hidden>
        <path
          fill="currentColor"
          d="M9.2 1.2 3.5 9.1h3.7L6.8 14.8l5.7-7.9H8.8L9.2 1.2Z"
        />
      </svg>
    );
  }
  if (kind === "device") {
    return (
      <svg viewBox="0 0 16 16" className="trust-metric__icon" aria-hidden>
        <path
          fill="currentColor"
          d="M5.2 1.5h5.6c.7 0 1.2.5 1.2 1.2v10.6c0 .7-.5 1.2-1.2 1.2H5.2c-.7 0-1.2-.5-1.2-1.2V2.7c0-.7.5-1.2 1.2-1.2Zm.3 1.2v9.6h5V2.7h-5Zm1.8 10.8h1.4v.7H7.3v-.7Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="trust-metric__icon" aria-hidden>
      <path
        fill="currentColor"
        d="M8 1.4 3.2 3.4v3.7c0 3.1 2.1 5.9 4.8 6.6 2.7-.7 4.8-3.5 4.8-6.6V3.4L8 1.4Zm0 1.3 3.6 1.5v2.9c0 2.3-1.5 4.4-3.6 5.1-2.1-.7-3.6-2.8-3.6-5.1V4.2L8 2.7Z"
      />
    </svg>
  );
}

export function TrustMetrics() {
  return (
    <ul className="trust-metrics" aria-label="מדדי אמון">
      {METRICS.map((item) => (
        <li key={item.label} className="trust-metric">
          <MetricIcon kind={item.icon} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
