"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";

const FINE = "(pointer: fine) and (hover: hover)";

/**
 * Two-part luxury cursor — instant gold dot + spring outer aura.
 * Desktop / fine pointer only; touch devices keep the native cursor.
 */
export function PremiumCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const auraX = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.35 });
  const auraY = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia(FINE);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-premium-cursor");

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          "a, button, [role='button'], input, textarea, select, label, .cursor-magnet",
        ),
      );
    };

    const onOver = (e: MouseEvent) => setHovering(isInteractive(e.target));
    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.relatedTarget)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("has-premium-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <div
      className="premium-cursor pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
      style={{ opacity: visible ? 1 : 0 }}
    >
      <CursorPart x={auraX} y={auraY} hovering={hovering} variant="aura" />
      <CursorPart x={rawX} y={rawY} hovering={hovering} variant="dot" />
    </div>
  );
}

function CursorPart({
  x,
  y,
  hovering,
  variant,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  hovering: boolean;
  variant: "dot" | "aura";
}) {
  const isDot = variant === "dot";

  return (
    <motion.div
      className={
        isDot
          ? "absolute top-0 left-0 rounded-full bg-[#D4AF37]"
          : "absolute top-0 left-0 rounded-full border border-[#D4AF37]/55 bg-[rgba(212,175,55,0.08)]"
      }
      style={{
        x,
        y,
        width: isDot ? 6 : 40,
        height: isDot ? 6 : 40,
        marginLeft: isDot ? -3 : -20,
        marginTop: isDot ? -3 : -20,
        mixBlendMode: hovering && !isDot ? "difference" : "normal",
        boxShadow: isDot
          ? "0 0 10px rgba(212,175,55,0.55)"
          : hovering
            ? "0 0 28px rgba(212,175,55,0.35)"
            : "0 0 18px rgba(212,175,55,0.18)",
      }}
      animate={{
        scale: isDot ? (hovering ? 0.55 : 1) : hovering ? 1.55 : 1,
        backgroundColor: isDot
          ? "#D4AF37"
          : hovering
            ? "rgba(212,175,55,0.22)"
            : "rgba(212,175,55,0.08)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.25 }}
    />
  );
}
