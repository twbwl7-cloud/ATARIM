"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { luxSpring } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Soft upward reveal — spring physics, opacity + translate only. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ ...luxSpring, delay }}
      style={{ willChange: "opacity, transform" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
