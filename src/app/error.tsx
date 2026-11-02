"use client";

import { useEffect } from "react";

/** App-level recovery — avoids a blank white crash screen on client errors */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-5 px-5 text-center">
      <p className="text-[11px] tracking-[0.22em] text-gold">תקלה זמנית</p>
      <h1 className="display text-3xl font-light text-ink">
        משהו השתבש בטעינת העמוד.
      </h1>
      <p className="text-sm text-muted">
        נסו לרענן, או חזרו לדף הבית. אם הבעיה נמשכת — כתבו בוואטסאפ.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn-gold rounded-md px-7 py-3 text-sm"
        >
          נסו שוב
        </button>
        <a href="/" className="btn-ghost rounded-md px-7 py-3 text-sm">
          לדף הבית
        </a>
      </div>
    </div>
  );
}
