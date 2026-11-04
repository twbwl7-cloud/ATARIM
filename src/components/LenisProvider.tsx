"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Expo-out — award-site default for Lenis programmatic ease */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Site-wide buttery smooth scroll (Lenis).
 * Respects prefers-reduced-motion; resets on route change.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      // Slightly lower lerp = silkier inertia without feeling sluggish
      lerp: 0.075,
      duration: 1.15,
      easing: easeOutExpo,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.92,
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoResize: true,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    document.documentElement.classList.add("lenis-smooth");

    let raf = 0;
    let running = true;

    const loop = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("lenis-smooth");
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  // Multi-page תדמית — reset scroll on every route (Lenis otherwise keeps Y)
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children;
}
