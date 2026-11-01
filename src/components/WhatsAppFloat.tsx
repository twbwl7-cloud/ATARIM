"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

/** Landing sticky mobile CTA — always reachable, does not block reading */
export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappUrl(
        "היי דוד, בא לי דוגמה בחינם לאתר של העסק שלי — בלי התחייבות.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="דוגמה בחינם בוואטסאפ"
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-5 left-5 z-40 flex max-w-[calc(100vw-2.5rem)] items-center gap-2.5 rounded-xl border border-line bg-paper/95 p-1.5 pe-3 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:gap-3 sm:p-2 sm:pe-4 md:bottom-8 md:left-8"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white sm:h-12 sm:w-12">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.91 4.43-9.91 9.88 0 1.74.46 3.44 1.34 4.94L2 22l5.35-1.4a9.9 9.9 0 0 0 4.69 1.19h.01c5.46 0 9.91-4.43 9.91-9.88C21.96 6.43 17.5 2 12.04 2Zm5.76 14.05c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.56.16.28.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.1 1.55.73 1.82.86.27.14.45.2.52.31.07.12.07.67-.17 1.34Z" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col pe-1">
        <span className="text-[10px] text-muted sm:text-[11px]">בא לראות קודם?</span>
        <span className="truncate text-xs font-semibold text-ink transition group-hover:text-cyan-deep sm:text-sm">
          וואטסאפ · לקבלת דוגמה
        </span>
      </span>
    </motion.a>
  );
}
