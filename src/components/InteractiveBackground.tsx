"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen fixed atmosphere behind the site (desktop ≥768px only).
 * Pale gold + light-blue breathing orbs, thin vertical SVG waves, inverse mouse parallax.
 * z-index: -1 · pointer-events: none · overflow: hidden
 */
export function InteractiveBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tx = -nx * 22;
      ty = -ny * 14;
    };

    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      layer.style.setProperty("--mx", `${cx.toFixed(2)}px`);
      layer.style.setProperty("--my", `${cy.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="interactive-bg"
      aria-hidden
    >
      {/* LEFT side */}
      <div className="interactive-bg__rail interactive-bg__rail--left">
        <div className="interactive-bg__orbs" style={{ transform: "translate3d(var(--mx), var(--my), 0)" }}>
          <span className="interactive-orb interactive-orb--cyan interactive-orb--1" />
          <span className="interactive-orb interactive-orb--gold interactive-orb--2" />
          <span className="interactive-orb interactive-orb--cyan interactive-orb--3" />
        </div>
        <svg className="interactive-waves" viewBox="0 0 60 1400" preserveAspectRatio="none">
          <path
            className="interactive-wave interactive-wave--a"
            d="M22 0 C34 90, 10 180, 22 270 C34 360, 10 450, 22 540 C34 630, 10 720, 22 810 C34 900, 10 990, 22 1080 C34 1170, 10 1300, 22 1400"
            fill="none"
            stroke="rgba(94,235,245,0.55)"
            strokeWidth="1"
          />
          <path
            className="interactive-wave interactive-wave--b"
            d="M40 0 C28 100, 52 200, 40 300 C28 400, 52 500, 40 600 C28 700, 52 800, 40 900 C28 1000, 52 1100, 40 1200 C28 1300, 52 1350, 40 1400"
            fill="none"
            stroke="rgba(201,162,74,0.45)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* RIGHT side */}
      <div className="interactive-bg__rail interactive-bg__rail--right">
        <div
          className="interactive-bg__orbs"
          style={{ transform: "translate3d(calc(var(--mx) * -0.75), calc(var(--my) * 0.85), 0)" }}
        >
          <span className="interactive-orb interactive-orb--gold interactive-orb--4" />
          <span className="interactive-orb interactive-orb--cyan interactive-orb--5" />
          <span className="interactive-orb interactive-orb--gold interactive-orb--6" />
        </div>
        <svg className="interactive-waves" viewBox="0 0 60 1400" preserveAspectRatio="none">
          <path
            className="interactive-wave interactive-wave--a"
            d="M38 0 C26 85, 50 175, 38 265 C26 355, 50 445, 38 535 C26 625, 50 715, 38 805 C26 895, 50 985, 38 1075 C26 1165, 50 1300, 38 1400"
            fill="none"
            stroke="rgba(94,235,245,0.55)"
            strokeWidth="1"
          />
          <path
            className="interactive-wave interactive-wave--b"
            d="M20 0 C32 95, 8 190, 20 285 C32 380, 8 475, 20 570 C32 665, 8 760, 20 855 C32 950, 8 1045, 20 1140 C32 1235, 8 1320, 20 1400"
            fill="none"
            stroke="rgba(201,162,74,0.45)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
