import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** light = cream surfaces; dark = black footer (logo still gold-on-cream asset) */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** full = vertical lockup; full-wide = header horizontal; mark = diamond only */
  variant?: "full" | "full-wide" | "mark";
  href?: string | false;
  className?: string;
  onClick?: () => void;
};

/** Vertical lockup — curtain / hero / footer */
const FULL = {
  sm: { w: 120, h: 67 },
  md: { w: 200, h: 112 },
  lg: { w: 320, h: 179 },
} as const;

/** Horizontal lockup — header pill */
const FULL_H = {
  sm: { w: 168, h: 40 },
  md: { w: 220, h: 52 },
  lg: { w: 300, h: 72 },
} as const;

const MARK = {
  sm: { w: 36, h: 36 },
  md: { w: 48, h: 48 },
  lg: { w: 120, h: 120 },
} as const;

/**
 * Official brand mark from the client's gold DT seal.
 * full       → vertical diamond + DAVID TOBUL + tagline
 * full-wide  → horizontal (header)
 * mark       → diamond seal only
 */
export function BrandLogo({
  tone: _tone = "light",
  size = "sm",
  variant = "full",
  href = "/",
  className = "",
  onClick,
}: BrandLogoProps) {
  const dims =
    variant === "mark"
      ? MARK[size]
      : variant === "full-wide"
        ? FULL_H[size]
        : FULL[size];
  const src =
    variant === "mark"
      ? "/brand/dt-emblem.png?v=1"
      : variant === "full-wide"
        ? "/brand/david-tobul-logo-horizontal.png?v=1"
        : "/brand/david-tobul-logo.png?v=1";

  const mark = (
    <span
      className={`inline-flex items-center ${className}`}
      dir="ltr"
      style={{ transform: "none" }}
    >
      <Image
        src={src}
        alt="David Tobul — Premium Web Creator"
        width={dims.w}
        height={dims.h}
        className="block h-auto w-auto max-w-none shrink-0 object-contain"
        style={{
          width: dims.w,
          height: "auto",
          transform: "none",
        }}
        priority
        unoptimized
      />
    </span>
  );

  if (href === false) {
    return (
      <span className="inline-flex shrink-0 items-center" aria-label="David Tobul">
        {mark}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="David Tobul — דף הבית"
      className="inline-flex shrink-0 items-center no-underline"
      style={{ transform: "none" }}
    >
      {mark}
    </Link>
  );
}
