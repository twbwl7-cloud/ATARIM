/** Peace-of-mind icon row under CTAs — additive layer only */
const ITEMS = [
  { icon: "lock", label: "100% שקיפות ואחריות" },
  { icon: "bolt", label: "טעינה מהירה מובטחת" },
  { icon: "cup", label: "ייעוץ קצר ללא עלות" },
] as const;

function Icon({ kind }: { kind: (typeof ITEMS)[number]["icon"] }) {
  if (kind === "lock") {
    return (
      <svg viewBox="0 0 16 16" className="pom-badge__icon" aria-hidden>
        <path
          fill="currentColor"
          d="M8 1.5A2.8 2.8 0 0 0 5.2 4.3V5.5H4.4c-.7 0-1.2.5-1.2 1.2v5.6c0 .7.5 1.2 1.2 1.2h7.2c.7 0 1.2-.5 1.2-1.2V6.7c0-.7-.5-1.2-1.2-1.2h-.8V4.3A2.8 2.8 0 0 0 8 1.5Zm0 1.2c.9 0 1.6.7 1.6 1.6V5.5H6.4V4.3c0-.9.7-1.6 1.6-1.6ZM8 8.2a1.1 1.1 0 0 1 .6 2v1.1H7.4V10.2A1.1 1.1 0 0 1 8 8.2Z"
        />
      </svg>
    );
  }
  if (kind === "bolt") {
    return (
      <svg viewBox="0 0 16 16" className="pom-badge__icon" aria-hidden>
        <path
          fill="currentColor"
          d="M9.2 1.2 3.5 9.1h3.7L6.8 14.8l5.7-7.9H8.8L9.2 1.2Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="pom-badge__icon" aria-hidden>
      <path
        fill="currentColor"
        d="M3.2 3.2h9.6v1.1H3.2V3.2Zm1.1 2.3h7.4c.9 1.4 1.3 2.9 1.1 4.4-.3 2.1-1.9 3.6-4 3.9-2.5.3-4.7-1.4-5.1-3.9-.3-1.5.1-3 1-4.4h-.4V5.5Zm3.7 1.4c-.9 0-1.7.6-2 1.4-.2.6 0 1.2.4 1.6l.7.7v1.3h1.8V10.6l.7-.7c.4-.4.6-1 .4-1.6-.3-.8-1.1-1.4-2-1.4Z"
      />
    </svg>
  );
}

export function PeaceOfMindBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`pom-badges ${className}`.trim()} aria-label="שקט נפשי">
      {ITEMS.map((item) => (
        <li key={item.label} className="pom-badge">
          <Icon kind={item.icon} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
