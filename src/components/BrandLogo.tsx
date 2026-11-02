import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** Wordmark against cream (light) or black footer (dark) */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** Show wordmark next to the DT icon (default true) */
  showWordmark?: boolean;
  href?: string | false;
  className?: string;
  onClick?: () => void;
};

const SIZES = {
  sm: { icon: 24, text: "text-[10px] sm:text-[11px] md:text-xs", gap: "gap-2.5 sm:gap-3" },
  md: { icon: 32, text: "text-[11px] sm:text-xs md:text-sm", gap: "gap-3" },
  lg: { icon: 88, text: "text-lg sm:text-2xl", gap: "gap-4 sm:gap-5" },
} as const;

/**
 * Official studio mark: rectilinear DT monogram + horizontal DAVID TUBUL.
 * Static SVG for reliable gold rendering across browsers.
 */
export function BrandLogo({
  tone = "light",
  size = "sm",
  showWordmark = true,
  href = "/",
  className = "",
  onClick,
}: BrandLogoProps) {
  const s = SIZES[size];
  const textClass = tone === "dark" ? "text-white" : "text-[#121212]";
  const goldText = tone === "dark" ? "text-[#E8D399]" : "text-[#C5A059]";

  const stacked = size === "lg";

  const mark = (
    <span
      className={`inline-flex ${stacked ? "flex-col" : "flex-row items-center"} ${s.gap} ${className}`}
      dir="ltr"
    >
      <Image
        src="/brand/dt-monogram.svg"
        alt=""
        width={s.icon}
        height={Math.round(s.icon * (40 / 48))}
        className="shrink-0"
        priority
        unoptimized
      />
      {showWordmark ? (
        <span
          className={`select-none font-medium uppercase leading-none tracking-[0.25em] ${s.text} ${stacked ? goldText : textClass}`}
          style={{
            fontFamily: "var(--font-rubik), ui-sans-serif, system-ui, sans-serif",
            fontStyle: "normal",
            transform: "none",
          }}
        >
          DAVID TUBUL
        </span>
      ) : null}
    </span>
  );

  if (href === false) {
    return (
      <span className="inline-flex shrink-0 items-center" aria-label="David Tubul">
        {mark}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="David Tubul — דף הבית"
      className="inline-flex shrink-0 items-center no-underline"
    >
      {mark}
    </Link>
  );
}
