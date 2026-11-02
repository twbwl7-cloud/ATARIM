import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** Wordmark against cream (light) or black footer (dark) */
  tone?: "light" | "dark";
  size?: "sm" | "md";
  href?: string | false;
  className?: string;
  onClick?: () => void;
};

/**
 * Official studio mark: rectilinear DT monogram + horizontal DAVID TUBUL.
 * Uses static SVG asset for reliable gold rendering across browsers.
 */
export function BrandLogo({
  tone = "light",
  size = "sm",
  href = "/",
  className = "",
  onClick,
}: BrandLogoProps) {
  const iconPx = size === "md" ? 32 : 24;
  const textClass = tone === "dark" ? "text-white" : "text-[#121212]";

  const mark = (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}
      dir="ltr"
    >
      <Image
        src="/brand/dt-monogram.svg"
        alt=""
        width={iconPx}
        height={Math.round(iconPx * (40 / 48))}
        className="shrink-0"
        priority={size === "sm"}
        unoptimized
      />
      <span
        className={`select-none text-[10px] font-medium uppercase leading-none tracking-[0.25em] sm:text-[11px] md:text-xs ${textClass}`}
        style={{
          fontFamily: "var(--font-rubik), ui-sans-serif, system-ui, sans-serif",
          fontStyle: "normal",
          transform: "none",
        }}
      >
        DAVID TUBUL
      </span>
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
