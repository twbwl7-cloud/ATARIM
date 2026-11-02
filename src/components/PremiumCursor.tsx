"use client";

import { useEffect, useRef, useState } from "react";

const ENABLE =
  "(pointer: fine) and (hover: hover) and (min-width: 768px)";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, .cursor-magnet, .premium-panel, .gold-border";

/**
 * Ultra-clean 1:1 custom cursor — native pointer coords, zero transform lag.
 * Disabled entirely on coarse/touch pointers.
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
      return Boolean(el.closest(INTERACTIVE));
    };

    const onMove = (e: PointerEvent) => {
      const node = elRef.current;
      if (!node) return;
      // Direct 1:1 — no lerp, no magnetic offset, no RAF queue
      node.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (node.style.opacity !== "1") node.style.opacity = "1";
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

    const onOver = (e: PointerEvent) => setHover(isInteractive(e.target));
    const onOut = (e: PointerEvent) => {
      if (!isInteractive(e.relatedTarget)) setHover(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      root.classList.remove("has-premium-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
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
