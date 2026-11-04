/** Shared Framer Motion presets — boutique scroll reveals + springs. */

/** Premium cubic-bezier — smooth, decisive, agency-grade */
export const luxEase = [0.22, 1, 0.36, 1] as const;

/** Soft expo-ish settle */
export const luxEaseOut = [0.16, 1, 0.3, 1] as const;

/** Premium spring — interactive chrome (buttons, magnets). */
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

/** Scroll-intersect reveal — fade + float up 30px with cubic-bezier */
export const luxRevealTween = {
  duration: 0.9,
  ease: luxEase,
} as const;

export const luxFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22, margin: "0px 0px -6% 0px" },
  transition: luxRevealTween,
} as const;

export function luxFadeUpDelay(delay = 0) {
  return {
    ...luxFadeUp,
    transition: { ...luxRevealTween, delay },
  } as const;
}

/** Stagger children into view */
export const luxStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
} as const;

export const luxStaggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: luxRevealTween,
  },
} as const;
