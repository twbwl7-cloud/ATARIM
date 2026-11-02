"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Mode = "lines" | "words";

type Props = {
  as?: ElementType;
  id?: string;
  className?: string;
  /** Plain string — split by newlines (lines) or spaces (words) */
  text?: string;
  /** Explicit line strings (preferred for Hebrew headlines) */
  lines?: string[];
  /** Optional per-line className (same length as lines) */
  lineClassNames?: string[];
  mode?: Mode;
  delay?: number;
  /** mount = hero-style animate on load; view = whileInView */
  trigger?: "mount" | "view";
  children?: ReactNode;
};

/**
 * Premium split-text reveal — masked slide-up, staggered lines/words.
 * Mounts static first (hydration-safe), then animates after client paint.
 */
export function SplitTextReveal({
  as: Tag = "h2",
  id,
  className = "",
  text,
  lines,
  lineClassNames,
  mode = "lines",
  delay = 0,
  trigger = "view",
  children,
}: Props) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const sourceLines =
    lines ??
    (text
      ? mode === "words"
        ? [text]
        : text.split("\n").filter(Boolean)
      : null);

  if (!sourceLines) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const units =
    mode === "words"
      ? sourceLines.flatMap((line) => line.split(/\s+/).filter(Boolean))
      : sourceLines;

  const animate = ready && !reduce;
  const isMount = trigger === "mount";

  return (
    <Tag id={id} className={className}>
      {units.map((unit, i) => {
        const motionProps = !animate
          ? { initial: false as const }
          : isMount
            ? {
                initial: { y: "110%" },
                animate: { y: "0%" },
                transition: {
                  duration: 1.05,
                  delay: delay + i * (mode === "words" ? 0.045 : 0.12),
                  ease: EASE,
                },
              }
            : {
                initial: { y: "110%" },
                whileInView: { y: "0%" },
                viewport: { once: true, amount: 0.55 },
                transition: {
                  duration: 0.95,
                  delay: delay + i * (mode === "words" ? 0.04 : 0.1),
                  ease: EASE,
                },
              };

        return (
          <span
            key={`${unit}-${i}`}
            className={
              mode === "words"
                ? "inline-block overflow-hidden align-bottom pb-[0.06em]"
                : "block overflow-hidden pb-[0.05em]"
            }
          >
            <motion.span
              className={`inline-block will-change-transform ${lineClassNames?.[i] ?? ""}`}
              {...motionProps}
            >
              {unit}
              {mode === "words" && i < units.length - 1 ? "\u00A0" : null}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
