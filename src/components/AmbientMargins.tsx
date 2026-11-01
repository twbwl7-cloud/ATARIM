"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only margin atmosphere:
 * pale gold/cyan breathing orbs + thin vertical SVG waves + lazy inverse mouse parallax.
 * Extremely faint · pointer-events none · hidden under 768px.
 */
export function AmbientMargins() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // opposite direction, lazy travel
      targetX = -nx * 18;
      targetY = -ny * 12;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;
      root.style.setProperty("--par-x", `${curX.toFixed(2)}px`);
      root.style.setProperty("--par-y", `${curY.toFixed(2)}px`);
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
      ref={rootRef}
      className="ambient-margins"
      aria-hidden
    >
      {/* Left margin */}
      <div className="ambient-margins__side ambient-margins__side--start">
        <span className="ambient-orb ambient-orb--cyan ambient-orb--a" />
        <span className="ambient-orb ambient-orb--gold ambient-orb--b" />
        <span className="ambient-orb ambient-orb--cyan ambient-orb--c" />
        <svg
          className="ambient-waves"
          viewBox="0 0 80 1200"
          preserveAspectRatio="none"
        >
          <path
            className="ambient-wave ambient-wave--1"
            d="M28 0 C 42 80, 14 160, 28 240 C 42 320, 14 400, 28 480 C 42 560, 14 640, 28 720 C 42 800, 14 880, 28 960 C 42 1040, 14 1120, 28 1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            className="ambient-wave ambient-wave--2"
            d="M52 0 C 38 90, 66 180, 52 270 C 38 360, 66 450, 52 540 C 38 630, 66 720, 52 810 C 38 900, 66 990, 52 1080 C 38 1140, 66 1170, 52 1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
          />
        </svg>
      </div>

      {/* Right margin */}
      <div className="ambient-margins__side ambient-margins__side--end">
        <span className="ambient-orb ambient-orb--gold ambient-orb--d" />
        <span className="ambient-orb ambient-orb--cyan ambient-orb--e" />
        <span className="ambient-orb ambient-orb--gold ambient-orb--f" />
        <svg
          className="ambient-waves"
          viewBox="0 0 80 1200"
          preserveAspectRatio="none"
        >
          <path
            className="ambient-wave ambient-wave--1"
            d="M50 0 C 36 70, 64 150, 50 230 C 36 310, 64 390, 50 470 C 36 550, 64 630, 50 710 C 36 790, 64 870, 50 950 C 36 1030, 64 1110, 50 1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            className="ambient-wave ambient-wave--2"
            d="M26 0 C 40 85, 12 175, 26 265 C 40 355, 12 445, 26 535 C 40 625, 12 715, 26 805 C 40 895, 12 985, 26 1075 C 40 1135, 12 1170, 26 1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
