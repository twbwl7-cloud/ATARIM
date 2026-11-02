import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  href?: string | false;
  className?: string;
  onClick?: () => void;
};

/** Icon width → height keeps the 56×40 monogram aspect */
const SIZES = {
  sm: { w: 28, text: "text-[10px] sm:text-[11px] md:text-xs" },
  md: { w: 36, text: "text-xs sm:text-sm" },
  lg: { w: 96, text: "text-xl sm:text-2xl md:text-3xl" },
} as const;

/**
 * Official DT + DAVID TUBUL — always horizontal, vertically centered.
 * No slant, italic, or stacked variants.
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
  const h = Math.round((s.w * 40) / 56);
  const textClass =
    tone === "dark" ? "text-white" : size === "lg" ? "text-[#C5A059]" : "text-[#121212]";

  const mark = (
    <span
      className={`inline-flex flex-row items-center gap-2.5 sm:gap-3 ${className}`}
      dir="ltr"
      style={{ transform: "none" }}
    >
      <Image
        src="/brand/dt-monogram.svg"
        alt=""
        width={s.w}
        height={h}
        className="block shrink-0"
        style={{ width: s.w, height: h, transform: "none" }}
        priority
        unoptimized
      />
      {showWordmark ? (
        <span
          className={`select-none font-medium uppercase leading-none tracking-[0.25em] ${s.text} ${textClass}`}
          style={{
            fontFamily: "var(--font-rubik), ui-sans-serif, system-ui, sans-serif",
            fontStyle: "normal",
            fontStretch: "normal",
            transform: "none",
            letterSpacing: "0.25em",
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
      style={{ transform: "none" }}
    >
      {mark}
    </Link>
  );
}
