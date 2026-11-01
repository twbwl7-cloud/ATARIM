"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { whatsappUrl } from "@/lib/site";

/**
 * A05 map — pinned viewport · waypoints 01–05 advance on scroll
 * H01 «איך … בחמישה צעדים» · V11 builder voice · X-filter clean
 */
const STEPS = [
  {
    n: "01",
    title: "הודעה בוואטסאפ",
    body: "כותבים מה העסק ומה חסר. קובעים שיחה — בלי התחייבות ובלי כרטיס אשראי.",
    outcome: "מועד ביומן",
  },
  {
    n: "02",
    title: "שיחה ישרה",
    body: "מה כבר ניסיתם, מה עובד בטלפון, ומה לא שווה לבנות. יוצאים עם כיוון אחד.",
    outcome: "רשימה ברורה",
  },
  {
    n: "03",
    title: "דוגמה לפני תשלום",
    body: "רואים עמוד ראשי בסגנון שלכם. לא מתאים — עוצרים. בלי מופע מכירות.",
    outcome: "רואים לפני שמשלמים",
  },
  {
    n: "04",
    title: "בונים ומעדכנים",
    body: "עיצוב, טקסטים, כפתורים — אצלי. אתם מקבלים עדכון, לא הפתעה באמצע.",
    outcome: "אתר על שמכם",
  },
  {
    n: "05",
    title: "מעלים לאוויר",
    body: "דומיין, הסבר קצר, וליווי אם משהו נשבר. המטרה: הודעות אמיתיות מהאתר.",
    outcome: "הודעות מהאתר",
  },
] as const;

export function ProcessJourney() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(
    scrollYProgress,
    [0.08, 0.88],
    [0, STEPS.length - 0.001],
  );
  const sprung = useSpring(rawIndex, { stiffness: 70, damping: 28, mass: 0.4 });

  useMotionValueEvent(sprung, "change", (v) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const mapFill = useTransform(scrollYProgress, [0.08, 0.88], ["0%", "88%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 0.55, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.86, 0.95], [0, 1]);
  const current = STEPS[active] ?? STEPS[0];

  if (reduce) {
    return (
      <section id="process" className="relative z-10 bg-sky px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs tracking-[0.16em] text-cyan-deep">איך זה עובד</p>
          <h2 className="display mt-3 text-3xl text-ink md:text-5xl">
            איך אתר עולה לאוויר בחמישה צעדים
          </h2>
          <ol className="mt-10 space-y-10">
            {STEPS.map((step) => (
              <li key={step.n} className="border-t border-line pt-5">
                <p className="text-sm text-cyan-deep">
                  <bdi>{step.n}</bdi>
                </p>
                <h3 className="display mt-1 text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm text-muted">{step.body}</p>
                <p className="mt-3 text-[11px] text-ink-soft">
                  תוצאה · {step.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      id="process"
      ref={ref}
      className="relative z-10 h-[340vh] bg-sky sm:h-[360vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(24,196,224,0.18),transparent_48%),radial-gradient(ellipse_at_80%_80%,rgba(201,162,74,0.1),transparent_50%)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl shrink-0 px-5 pt-16 sm:px-8 sm:pt-20">
          <p className="text-xs tracking-[0.16em] text-cyan-deep">איך זה עובד</p>
          {/* H01 */}
          <h2 className="display mt-2 text-2xl text-ink sm:text-3xl md:text-4xl">
            איך אתר עולה לאוויר בחמישה צעדים
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            המסך נשאר. גללו — המפה זזה. כל יעד נגמר בתוצאה.
          </p>
          <div className="mt-4 h-px w-full max-w-xs overflow-hidden bg-ink/10">
            <motion.div style={{ width: progressWidth }} className="h-full bg-cyan" />
          </div>
        </div>

        {/* Map path */}
        <div className="relative z-10 mx-auto mt-6 w-full max-w-3xl shrink-0 px-5 sm:mt-8 sm:px-8">
          <ol className="relative flex items-center justify-between gap-1">
            <span
              aria-hidden
              className="absolute inset-x-[6%] top-1/2 h-px -translate-y-1/2 bg-ink/10"
            />
            <motion.span
              aria-hidden
              className="absolute start-[6%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-l from-cyan to-gold"
              style={{ width: mapFill }}
            />
            {STEPS.map((step, i) => {
              const on = i <= active;
              const currentStep = i === active;
              return (
                <li key={step.n} className="relative z-[1] flex flex-col items-center gap-1.5">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-semibold transition duration-300 sm:h-11 sm:w-11 sm:text-sm ${
                      currentStep
                        ? "border-gold bg-gold text-ink shadow-[0_8px_24px_rgba(201,162,74,0.35)]"
                        : on
                          ? "border-cyan bg-cyan/25 text-cyan-deep"
                          : "border-line bg-sky text-muted"
                    }`}
                  >
                    <bdi>{step.n}</bdi>
                  </span>
                  <span
                    className={`hidden text-[10px] tracking-wide sm:block ${
                      currentStep ? "text-ink" : "text-muted"
                    }`}
                  >
                    {step.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active step card */}
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-2xl flex-1 items-center px-5 py-6 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.n}
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <p className="display text-sm text-cyan-deep">
                צעד <bdi>{current.n}</bdi> מתוך 05
              </p>
              <h3 className="display mt-2 text-3xl text-ink sm:text-4xl md:text-5xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                {current.body}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-paper/70 px-3 py-2 text-[11px] tracking-[0.06em] text-ink-soft shadow-[var(--shadow-contact)]">
                תוצאה
                <span className="font-semibold text-ink">{current.outcome}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          style={{ opacity: ctaOpacity }}
          className="relative z-20 mx-auto flex w-full max-w-3xl flex-col gap-4 border-t border-line bg-sky/95 px-5 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6"
        >
          <div>
            <p className="display text-lg text-ink sm:text-xl">
              רוצים קודם לראות דוגמה?
            </p>
            <p className="mt-1 text-sm text-muted">בחינם. בלי התחייבות.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <a
              href="#free-demo"
              className="btn-gold rounded-md px-6 py-3 text-center text-sm"
            >
              לקבלת דוגמה בחינם
            </a>
            <a
              href={whatsappUrl(
                "היי דוד, בא לי לקבוע שיחה קצרה על אתר לעסק שלי.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-md px-6 py-3 text-center text-sm"
            >
              לשיחה בוואטסאפ
            </a>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.14em] text-muted"
        >
          גללו — היעד הבא
        </motion.p>
      </div>
    </section>
  );
}
