"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { whatsappUrl } from "@/lib/site";

/**
 * Luxury zigzag map · A05 pinned · continuous ambient motion
 * H01 process · V11 voice · X-filter clean
 * RTL: path starts on the right and snakes left/right down the map
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

/** ViewBox 1000×640 — zigzag waypoints (RTL: start right) */
const NODES = [
  { x: 820, y: 70 },
  { x: 220, y: 170 },
  { x: 780, y: 300 },
  { x: 240, y: 430 },
  { x: 760, y: 560 },
] as const;

function buildZigzagPath(nodes: readonly { x: number; y: number }[]) {
  if (nodes.length === 0) return "";
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

const PATH_D = buildZigzagPath(NODES);
const PATH_LEN_FALLBACK = 1680;

export function ProcessJourney() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [pathLen, setPathLen] = useState(PATH_LEN_FALLBACK);

  const tipX = useMotionValue<number>(NODES[0].x);
  const tipY = useMotionValue<number>(NODES[0].y);

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

  /** One shared 0→1 progress drives blue bar + gold tip together */
  const progressRaw = useTransform(scrollYProgress, [0.06, 0.86], [0, 1]);
  const progress = useSpring(progressRaw, {
    stiffness: 64,
    damping: 26,
    mass: 0.42,
  });

  useEffect(() => {
    if (reduce) return;
    const syncLen = () => {
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      if (len > 0) {
        setPathLen(len);
        const p = progress.get();
        const pt = path.getPointAtLength(Math.min(1, Math.max(0, p)) * len);
        tipX.set(pt.x);
        tipY.set(pt.y);
      }
    };
    const id = requestAnimationFrame(syncLen);
    return () => cancelAnimationFrame(id);
  }, [reduce, progress, tipX, tipY]);

  useMotionValueEvent(progress, "change", (p) => {
    const clamped = Math.min(1, Math.max(0, p));
    const next = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor(clamped * (STEPS.length - 0.001))),
    );
    setActive((prev) => (prev === next ? prev : next));

    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength() || pathLen;
    const pt = path.getPointAtLength(clamped * len);
    tipX.set(pt.x);
    tipY.set(pt.y);
  });

  const dashOffset = useTransform(progress, (p) => pathLen * (1 - Math.min(1, Math.max(0, p))));
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07, 0.14], [1, 0.6, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const orbX = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

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
      className="relative z-10 h-[360vh] bg-sky sm:h-[380vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Living atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(24,196,224,0.2),transparent_48%),radial-gradient(ellipse_at_15%_70%,rgba(201,162,74,0.12),transparent_46%)]"
        />
        <motion.div
          aria-hidden
          style={{ x: orbX, y: orbY }}
          className="process-orb process-orb--a pointer-events-none absolute -start-10 top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(94,235,245,0.35),transparent_70%)] blur-2xl"
        />
        <motion.div
          aria-hidden
          className="process-orb process-orb--b pointer-events-none absolute -end-8 bottom-28 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(201,162,74,0.22),transparent_72%)] blur-2xl"
        />
        <div className="process-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl shrink-0 items-end justify-between gap-4 px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.16em] text-cyan-deep">איך זה עובד</p>
            <h2 className="display mt-2 text-2xl text-ink sm:text-3xl md:text-4xl">
              איך אתר עולה לאוויר בחמישה צעדים
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              המסך נשאר. גללו — המפה בזיגזג. תמיד יש מלל על היעד הנוכחי.
            </p>
          </div>
          <div className="hidden shrink-0 text-end sm:block">
            <p className="display text-3xl text-cyan-deep/40 md:text-4xl">
              <bdi>{current.n}</bdi>
            </p>
            <p className="mt-1 text-[11px] tracking-[0.12em] text-muted">מתוך 05</p>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 items-stretch gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-5">
          {/* Zigzag map */}
          <div className="relative min-h-[42vh] overflow-hidden rounded-2xl border border-line/70 bg-paper/40 shadow-[var(--shadow-elevated)] lg:min-h-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(94,235,245,0.22),transparent_50%)]"
            />

            <svg
              viewBox="0 0 1000 640"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <linearGradient id="mapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#18c4e0" />
                  <stop offset="55%" stopColor="#5eebf5" />
                  <stop offset="100%" stopColor="#c9a24a" />
                </linearGradient>
                <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Soft base path */}
              <path
                d={PATH_D}
                fill="none"
                stroke="rgba(10,22,40,0.1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 10"
              />

              {/* Drawn progress — same progress as gold tip */}
              <motion.path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="url(#mapStroke)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={pathLen}
                style={{ strokeDashoffset: dashOffset }}
                filter="url(#mapGlow)"
              />

              {/* Ambient flowing dashes — always moving */}
              <path
                d={PATH_D}
                fill="none"
                stroke="rgba(94,235,245,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="10 28"
                className="process-flow-dash"
              />

              {/* Gold tip — locked to the leading edge of the blue bar */}
              <motion.circle
                r="9"
                style={{ cx: tipX, cy: tipY }}
                fill="#c9a24a"
                stroke="#f0e2c4"
                strokeWidth="2"
                filter="url(#mapGlow)"
              />
              <motion.circle
                r="3.5"
                style={{ cx: tipX, cy: tipY }}
                fill="#fff8e8"
              />
            </svg>

            {/* Waypoints */}
            {STEPS.map((step, i) => {
              const node = NODES[i];
              const on = i <= active;
              const isActive = i === active;
              const side = i % 2 === 0 ? "end" : "start";
              return (
                <div
                  key={step.n}
                  className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(node.x / 1000) * 100}%`,
                    top: `${(node.y / 640) * 100}%`,
                  }}
                >
                  <motion.div
                    animate={
                      isActive
                        ? { scale: [1, 1.08, 1], boxShadow: [
                            "0 0 0 0 rgba(201,162,74,0.0)",
                            "0 0 0 14px rgba(201,162,74,0.18)",
                            "0 0 0 0 rgba(201,162,74,0.0)",
                          ] }
                        : { scale: 1 }
                    }
                    transition={
                      isActive
                        ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.35 }
                    }
                    className={`relative grid h-10 w-10 place-items-center rounded-full border-2 text-[11px] font-semibold sm:h-12 sm:w-12 sm:text-sm ${
                      isActive
                        ? "border-gold bg-[linear-gradient(135deg,#e0c06a,#c9a24a)] text-ink"
                        : on
                          ? "border-cyan bg-cyan/30 text-cyan-deep"
                          : "border-line bg-paper/90 text-muted"
                    }`}
                  >
                    <bdi>{step.n}</bdi>
                  </motion.div>
                  <p
                    className={`absolute top-full mt-1.5 whitespace-nowrap text-[10px] tracking-wide sm:text-[11px] ${
                      side === "end" ? "end-0 text-end" : "start-0 text-start"
                    } ${isActive ? "font-semibold text-ink" : "text-muted"}`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}

          </div>

          {/* Always-on step copy */}
          <div className="relative flex min-h-[28vh] flex-col justify-center lg:min-h-0">
            <div className="premium-panel relative overflow-hidden rounded-2xl p-5 sm:p-7 md:p-8">
              <div
                aria-hidden
                className="process-shimmer pointer-events-none absolute inset-0 opacity-40"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.n}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-[1]"
                >
                  <p className="text-[11px] tracking-[0.14em] text-cyan-deep">
                    צעד <bdi>{current.n}</bdi> מתוך 05 · על המפה עכשיו
                  </p>
                  <h3 className="display mt-3 text-2xl text-ink sm:text-3xl md:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
                    {current.body}
                  </p>
                  <motion.p
                    key={`${current.n}-out`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12, duration: 0.35 }}
                    className="mt-6 inline-flex items-center gap-2 rounded-md border border-gold/30 bg-champagne/40 px-3 py-2 text-[11px] tracking-[0.06em] text-ink-soft"
                  >
                    תוצאה
                    <span className="font-semibold text-ink">{current.outcome}</span>
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Mini progress chips — always visible */}
              <div className="relative z-[1] mt-7 flex flex-wrap gap-1.5">
                {STEPS.map((step, i) => (
                  <span
                    key={step.n}
                    className={`rounded-md px-2 py-1 text-[10px] tracking-wide transition ${
                      i === active
                        ? "bg-gold/90 text-ink"
                        : i < active
                          ? "bg-cyan/25 text-cyan-deep"
                          : "bg-ink/5 text-muted"
                    }`}
                  >
                    <bdi>{step.n}</bdi>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: ctaOpacity }}
          className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-line bg-sky/95 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5"
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
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.14em] text-muted"
        >
          גללו — היעד הבא על המפה
        </motion.p>
      </div>
    </section>
  );
}
