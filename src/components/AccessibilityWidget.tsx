"use client";

import { useEffect, useId, useState } from "react";

const KEY = "dt-a11y";

type A11yState = {
  text: "normal" | "large" | "xlarge";
  contrast: boolean;
  readable: boolean;
};

const DEFAULTS: A11yState = {
  text: "normal",
  contrast: false,
  readable: false,
};

function apply(state: A11yState) {
  const root = document.documentElement;
  root.dataset.a11yText = state.text;
  root.classList.toggle("a11y-contrast", state.contrast);
  root.classList.toggle("a11y-readable", state.readable);
}

/** Floating accessibility control — opposite corner from WhatsApp */
export function AccessibilityWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as A11yState;
      setState(parsed);
      apply(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: A11yState) => {
    setState(next);
    apply(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="a11y-float">
      <button
        type="button"
        className="a11y-float__btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="תפריט נגישות"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" className="a11y-float__icon" aria-hidden>
          <circle cx="12" cy="4.5" r="2.1" fill="currentColor" />
          <path
            fill="currentColor"
            d="M12 7.4c-2.4 0-4.3.5-5.6 1.2-.5.3-.7.9-.4 1.4.3.5.9.7 1.4.4 1-.5 2.5-.9 4.6-.9s3.6.4 4.6.9c.5.3 1.1.1 1.4-.4.3-.5.1-1.1-.4-1.4-1.3-.7-3.2-1.2-5.6-1.2Zm-3.2 4.2v2.1l-2.6 5.4c-.2.5 0 1.1.5 1.3.5.2 1.1 0 1.3-.5l2.2-4.5h1.6l2.2 4.5c.2.5.8.7 1.3.5.5-.2.7-.8.5-1.3l-2.6-5.4v-2.1H8.8Z"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          className="a11y-float__panel"
          role="dialog"
          aria-label="הגדרות נגישות מהירות"
        >
          <p className="a11y-float__title">נגישות מהירה</p>

          <fieldset className="a11y-float__group">
            <legend>גודל טקסט</legend>
            <div className="a11y-float__row">
              {(
                [
                  ["normal", "רגיל"],
                  ["large", "גדול"],
                  ["xlarge", "גדול מאוד"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={
                    state.text === value
                      ? "a11y-float__chip is-active"
                      : "a11y-float__chip"
                  }
                  aria-pressed={state.text === value}
                  onClick={() => persist({ ...state, text: value })}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="a11y-float__toggle">
            <input
              type="checkbox"
              checked={state.contrast}
              onChange={(e) =>
                persist({ ...state, contrast: e.target.checked })
              }
            />
            ניגודיות גבוהה
          </label>

          <label className="a11y-float__toggle">
            <input
              type="checkbox"
              checked={state.readable}
              onChange={(e) =>
                persist({ ...state, readable: e.target.checked })
              }
            />
            גופן קריא יותר
          </label>

          <button
            type="button"
            className="a11y-float__reset"
            onClick={() => {
              persist(DEFAULTS);
              setOpen(false);
            }}
          >
            איפוס
          </button>
        </div>
      ) : null}
    </div>
  );
}
