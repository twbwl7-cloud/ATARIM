"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

const PULL = 50;

/**
 * Magnetic gold CTA — pulls within 50px, shimmer sweep, soft hover glow.
 */
export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.28 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.28 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < PULL + Math.max(rect.width, rect.height) * 0.35) {
      x.set(dx * 0.32);
      y.set(dy * 0.32);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{
        scale: 1.012,
        boxShadow: "0 0 28px rgba(197, 160, 89, 0.28)",
      }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`btn-shimmer lux-cta cursor-magnet inline-flex ${className}`}
    >
      {children}
    </motion.a>
  );
}
