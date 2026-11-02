"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ElementType } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  /** Full heading/copy string — split into words for masked reveal */
  text?: string;
  /** Tailwind / layout classes applied to the semantic text element */
  className?: string;
  /** Semantic tag for the text (h1/h2/p…). Defaults to div. */
  as?: ElementType;
  id?: string;
  /** Extra delay before the stagger starts */
  delay?: number;
};

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.048,
      delayChildren: delay,
    },
  }),
};

const wordReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.95, ease: EASE },
  },
};

/**
 * Awwwards-style split-text reveal:
 * each word sits behind an overflow mask and slides up into view
 * when the block enters the viewport.
 */
export function SplitTextReveal({
  text,
  className = "",
  as: Tag = "div",
  id,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const safe = typeof text === "string" ? text : "";
  const words = safe.trim().split(/\s+/).filter(Boolean);
  const animate = ready && !reduce;

  if (!words.length) {
    return (
      <Tag id={id} className={className}>
        {safe}
      </Tag>
    );
  }

  return (
    <motion.div
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={container}
      custom={delay}
    >
      <Tag id={id} className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.06em] me-[0.28em] last:me-0"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={wordReveal}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
