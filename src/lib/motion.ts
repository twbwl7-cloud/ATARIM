/** Shared Framer Motion presets — GPU-friendly, 60fps-oriented. */

export const luxEase = [0.22, 1, 0.36, 1] as const;

/** Soft fade + slight rise — no blur/filters (those tank frame time). */
export const luxFadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.28, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.7, ease: luxEase },
} as const;

export function luxFadeUpDelay(delay = 0) {
  return {
    ...luxFadeUp,
    transition: { ...luxFadeUp.transition, delay },
  } as const;
}
