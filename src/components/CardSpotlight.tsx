"use client";

import { useEffect } from "react";

const SELECTOR = ".premium-panel, .gold-border";

/**
 * Additive mouse-tracking amber spotlight for luxury cards.
 * Sets --spot-x / --spot-y CSS vars; styles live in globals.css.
 */
export function CardSpotlight() {
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!mq.matches) return;

    let active: HTMLElement | null = null;

    const setSpot = (el: HTMLElement, x: number, y: number) => {
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
    };

    const onMove = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(SELECTOR) as
        | HTMLElement
        | null
        | undefined;
      if (!el) {
        if (active) {
          active.classList.remove("is-spotlit");
          active = null;
        }
        return;
      }
      if (active && active !== el) active.classList.remove("is-spotlit");
      active = el;
      el.classList.add("is-spotlit");
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpot(el, x, y);
    };

    const onLeave = () => {
      if (!active) return;
      active.classList.remove("is-spotlit");
      active = null;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      active?.classList.remove("is-spotlit");
    };
  }, []);

  return null;
}
