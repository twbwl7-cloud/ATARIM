"use client";

import { useEffect, useState } from "react";

const KEY = "dt-luxury-boost";

/** Tiny easter egg — gently boosts ambient warmth (additive only) */
export function LuxuryModeToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) === "1";
      setOn(saved);
      document.documentElement.classList.toggle("luxury-boost", saved);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = () => {
    setOn((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("luxury-boost", next);
      try {
        window.localStorage.setItem(KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <button
      type="button"
      className="lux-mode-toggle"
      aria-pressed={on}
      title={on ? "מצב חם פעיל" : "מצב חם / מוד יוקרה"}
      onClick={toggle}
    >
      <span className="lux-mode-toggle__orb" aria-hidden />
      <span className="lux-mode-toggle__label">
        {on ? "מצב חם" : "מוד יוקרה"}
      </span>
    </button>
  );
}
