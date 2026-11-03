/** Shared Framer Motion presets — spring physics, GPU-friendly. */

export const luxEase = [0.22, 1, 0.36, 1] as const;

/** Premium spring — agency-grade feel (stiffness 100 / damping 20). */
export const luxSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.85,
};

export const luxSpringSoft = {
  type: "spring" as const,
  stiffness: 80,
  damping: 22,
  mass: 0.9,
};

/** Soft fade + slight rise — spring, no blur/filters. */
export const luxFadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.28, margin: "0px 0px -8% 0px" },
  transition: luxSpring,
} as const;

export function luxFadeUpDelay(delay = 0) {
  return {
    ...luxFadeUp,
    transition: { ...luxSpring, delay },
  } as const;
}

/** Stagger children into view */
export const luxStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
} as const;

export const luxStaggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: luxSpring,
  },
} as const;
