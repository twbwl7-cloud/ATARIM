"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ENABLE = "(pointer: fine) and (hover: hover)";
const INTERACTIVE =
  "a, button, [role='button'], .cursor-magnet, .magnetic, .gold-border, input, textarea, select, label";

type Variant = "default" | "hover" | "text";

const RING_SPRING = { stiffness: 150, damping: 15, mass: 0.35 };
const DOT_SPRING = { stiffness: 500, damping: 32, mass: 0.2 };

/**
 * Magnetic custom cursor — desktop pointer only.
 * - Default: cream/gold dot + delayed ring
 * - Hover: expanded frosted ring (links/buttons/cards)
 * - Text: data-cursor-text bubble (portal cards)
 * Soft magnetic pull on interactive targets toward the pointer.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [cursorText, setCursorText] = useState("");
  const pulledRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);
  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);

  useEffect(() => {
    const mq = window.matchMedia(ENABLE);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("has-premium-cursor");

    const clearPull = () => {
      const el = pulledRef.current;
      if (el) {
        el.style.transform = "";
        el.style.transition = "";
        pulledRef.current = null;
      }
    };

    const pullToward = (el: HTMLElement, clientX: number, clientY: number) => {
      if (el.closest("[data-no-magnetic]")) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (clientX - cx) * 0.18;
      const dy = (clientY - cy) * 0.18;
      if (pulledRef.current && pulledRef.current !== el) clearPull();
      pulledRef.current = el;
      el.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      if (!(target instanceof Element)) return;

      const textHost = target.closest<HTMLElement>("[data-cursor-text]");
      if (textHost) {
        const label = textHost.getAttribute("data-cursor-text") || "";
        setCursorText(label);
        setVariant("text");
        // Snap ring toward card center while tracking pointer
        const rect = textHost.getBoundingClientRect();
        mouseX.set(rect.left + rect.width / 2 + (e.clientX - (rect.left + rect.width / 2)) * 0.35);
        mouseY.set(rect.top + rect.height / 2 + (e.clientY - (rect.top + rect.height / 2)) * 0.35);
        pullToward(textHost, e.clientX, e.clientY);
        return;
      }

      const interactive = target.closest<HTMLElement>(INTERACTIVE);
      if (interactive) {
        setVariant("hover");
        setCursorText("");
        const rect = interactive.getBoundingClientRect();
        // Gentle snap toward element center
        mouseX.set(rect.left + rect.width / 2 + (e.clientX - (rect.left + rect.width / 2)) * 0.55);
        mouseY.set(rect.top + rect.height / 2 + (e.clientY - (rect.top + rect.height / 2)) * 0.55);
        pullToward(interactive, e.clientX, e.clientY);
        return;
      }

      setVariant("default");
      setCursorText("");
      clearPull();
    };

    const onLeave = () => {
      setVisible(false);
      clearPull();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-premium-cursor");
      clearPull();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  const ringSize = variant === "text" ? 96 : variant === "hover" ? 56 : 40;
  const showDot = variant === "default";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            borderRadius: 999,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className={
            variant === "text"
              ? "flex items-center justify-center border border-white/25 bg-white/10 backdrop-blur-md"
              : variant === "hover"
                ? "border border-[#D4AF37]/70 bg-[#D4AF37]/10 backdrop-blur-[2px] mix-blend-difference"
                : "border border-[#D4AF37]/45 bg-transparent"
          }
        >
          <AnimatePresence mode="wait">
            {variant === "text" && cursorText ? (
              <motion.span
                key={cursorText}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="px-2 text-center text-[10px] font-medium leading-tight tracking-[0.14em] text-[#F5EFE6]"
              >
                {cursorText}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible && showDot ? 1 : 0,
        }}
      >
        <span className="block h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_0_1px_rgba(245,239,230,0.35)]" />
      </motion.div>
    </div>
  );
}
