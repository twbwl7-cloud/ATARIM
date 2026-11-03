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

/** Vertical lockup — curtain / hero / footer (intrinsic aspect after safe-pad) */
const FULL = {
  sm: { w: 132, h: 124 },
  md: { w: 210, h: 197 },
  lg: { w: 300, h: 282 },
} as const;

/** Horizontal lockup — header pill */
const FULL_H = {
  sm: { w: 180, h: 56 },
  md: { w: 230, h: 72 },
  lg: { w: 310, h: 96 },
} as const;

const MARK = {
  sm: { w: 40, h: 40 },
  md: { w: 56, h: 56 },
  lg: { w: 128, h: 128 },
} as const;

const CACHE = "v=7";

/**
 * Official brand mark — always object-contain, overflow-visible, padded safe area.
 * Assets include transparent margins so diamond tips are never clipped.
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
      ? `/brand/dt-emblem.png?${CACHE}`
      : variant === "full-wide"
        ? `/brand/david-tubul-logo-horizontal.png?${CACHE}`
        : `/brand/david-tubul-logo.png?${CACHE}`;

  const mark = (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-visible p-2 sm:p-3 ${className}`}
      dir="ltr"
      style={{ transform: "none" }}
    >
      <Image
        src={src}
        alt="David Tubul — Premium Web Creator"
        width={dims.w}
        height={dims.h}
        className="block h-auto w-full max-w-full shrink-0 object-contain"
        style={{
          width: dims.w,
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
          transform: "none",
        }}
        priority
        quality={100}
        unoptimized
      />
    </span>
  );

  if (href === false) {
    return (
      <span
        className="inline-flex shrink-0 items-center overflow-visible"
        aria-label="David Tubul"
      >
        {mark}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="David Tubul — דף הבית"
      className="inline-flex max-w-full shrink-0 items-center overflow-visible no-underline"
      style={{ transform: "none" }}
    >
      {mark}
    </Link>
  );
}
