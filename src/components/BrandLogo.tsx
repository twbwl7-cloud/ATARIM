"use client";

import Link from "next/link";
import { useId } from "react";

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
 * Axis-aligned strokes only — no italics, slant, or ribbon effects.
 */
export function BrandLogo({
  tone = "light",
  size = "sm",
  href = "/",
  className = "",
  onClick,
}: BrandLogoProps) {
  const iconClass = size === "md" ? "h-8 w-8" : "h-6 w-6";
  const textClass = tone === "dark" ? "text-white" : "text-[#121212]";

  const mark = (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}
      dir="ltr"
    >
      <DtMonogram className={`shrink-0 ${iconClass}`} />
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

/**
 * Side-by-side geometric D + T — every edge is horizontal or vertical.
 * Reads clearly at 24×24 (header) and 32×32 (footer).
 */
function DtMonogram({ className = "" }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  const fill = `url(#dt-gold-${gid})`;
  const w = 4.5;

  return (
    <svg
      viewBox="0 0 48 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`dt-gold-${gid}`} x1="0" y1="0" x2="48" y2="40">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#E8D399" />
        </linearGradient>
      </defs>

      {/* ——— D (squared) ——— */}
      <rect x="2" y="4" width={w} height="32" fill={fill} />
      <rect x="2" y="4" width="18" height={w} fill={fill} />
      <rect x="15.5" y="4" width={w} height="32" fill={fill} />
      <rect x="2" y="31.5" width="18" height={w} fill={fill} />

      {/* ——— T ——— */}
      <rect x="24" y="4" width="22" height={w} fill={fill} />
      <rect x="32.75" y="4" width={w} height="32" fill={fill} />
    </svg>
  );
}
