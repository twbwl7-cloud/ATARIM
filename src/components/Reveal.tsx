"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { luxRevealTween } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting translateY — default 30px per boutique scroll brief */
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Elegant scroll-intersect reveal:
 * opacity 0→1 + translateY(y→0) with cubic-bezier easing.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`lux-reveal ${className}`.trim()}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -6% 0px" }}
      transition={{ ...luxRevealTween, delay }}
      style={{ willChange: "opacity, transform" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
