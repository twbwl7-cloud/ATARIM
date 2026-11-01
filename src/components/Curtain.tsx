"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/** A09 / animations.docx — curtain drop entrance (demo script signature). */
export function Curtain() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => setShow(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="curtain-panel flex items-center justify-center"
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="display text-2xl tracking-[0.08em] text-[#5eebf5] sm:text-3xl"
          >
            דוד טובול
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
