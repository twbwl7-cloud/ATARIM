"use client";

import { useEffect, useRef, useState } from "react";

const ENABLE =
  "(pointer: fine) and (hover: hover) and (min-width: 768px)";

const MAGNET =
  "a, button, [role='button'], input, textarea, select, label, .cursor-magnet, .premium-panel, .gold-border";

/**
 * Instant difference-blend cursor — 1:1 tracking, zero position lag.
 * Additive magnetic pull + warm glow when near interactive targets.
 * Scale/border animate via CSS only; X/Y updates are direct DOM writes.
 */
export function PremiumCursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const magnetRef = useRef<HTMLElement | null>(null);
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
      return Boolean(el.closest(MAGNET));
    };

    const onMove = (e: MouseEvent) => {
      const node = elRef.current;
      if (!node) return;

      let x = e.clientX;
      let y = e.clientY;
      const magnet = magnetRef.current;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Gentle magnetic pull — ~12% toward target center
        x = e.clientX + (cx - e.clientX) * 0.12;
        y = e.clientY + (cy - e.clientY) * 0.12;
      }

      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      node.style.opacity = "1";
    };

    const onLeave = () => {
      if (elRef.current) elRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (elRef.current) elRef.current.style.opacity = "1";
    };

    const setHover = (next: boolean, magnet: HTMLElement | null) => {
      hoveringRef.current = next;
      magnetRef.current = next ? magnet : null;
      elRef.current?.classList.toggle("is-hover", next);
      elRef.current?.classList.toggle("is-warm", next);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const magnet = target.closest(MAGNET) as HTMLElement | null;
      setHover(Boolean(magnet), magnet);
    };
    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.relatedTarget)) setHover(false, null);
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
