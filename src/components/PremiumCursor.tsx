"use client";

import { useEffect, useRef, useState } from "react";

const ENABLE =
  "(pointer: fine) and (hover: hover) and (min-width: 768px)";

/**
 * Instant difference-blend cursor — 1:1 tracking, zero position lag.
 * Scale/border animate via CSS only; X/Y updates are direct DOM writes.
 */
export function PremiumCursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

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

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          "a, button, [role='button'], input, textarea, select, label, .cursor-magnet, .premium-panel",
        ),
      );
    };

    const onMove = (e: MouseEvent) => {
      const node = elRef.current;
      if (!node) return;
      // Instant 1:1 — no spring, no transition on transform
      node.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      node.style.opacity = "1";
    };

    const onLeave = () => {
      if (elRef.current) elRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (elRef.current) elRef.current.style.opacity = "1";
    };

    const setHover = (next: boolean) => {
      if (hoveringRef.current === next) return;
      hoveringRef.current = next;
      elRef.current?.classList.toggle("is-hover", next);
    };

    const onOver = (e: MouseEvent) => setHover(isInteractive(e.target));
    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.relatedTarget)) setHover(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      root.classList.remove("has-premium-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      className="instant-cursor"
      aria-hidden
      style={{ opacity: 0, transform: "translate3d(-100px, -100px, 0)" }}
    />
  );
}
