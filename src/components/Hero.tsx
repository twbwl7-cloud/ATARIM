"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Signature hero — pinned Z-axis plunge into the pearl (animations.txt / A05).
 * Screen stays. Object grows. You enter. Next section opens.
 */
function PlungeStage({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const intensityRaw = useTransform(progress, [0.08, 0.88], [0, 1]);
  const intensity = useSpring(intensityRaw, { stiffness: 80, damping: 30, mass: 0.45 });

  const textOpacity = useTransform(progress, [0, 0.12, 0.28], [1, 0.85, 0]);
  const textY = useTransform(progress, [0, 0.3], [0, -40]);
  const textScale = useTransform(progress, [0, 0.35], [1, 1.08]);

  const hintOpacity = useTransform(progress, [0, 0.1, 0.22], [1, 0.5, 0]);

  // Entering veil — gold then deep navy as portal opens into next "page"
  const veilOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.55, 1]);
  const sceneScale = useTransform(progress, [0, 0.85], [1, 1.55]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#070e18]">
      <motion.div
        style={{ scale: reduce ? 1 : sceneScale }}
        className="absolute inset-0 origin-center"
      >
        <HeroScene intensity={reduce ? intensityRaw : intensity} />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, y: textY, scale: textScale }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pt-16 text-center"
      >
        <p className="mb-5 text-xs tracking-[0.28em] text-platinum md:text-sm">
          {site.name} · סטודיו נדיר לאתרים
        </p>
        <h1 className="display max-w-4xl text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.05] text-ivory">
          נכנסים לחוויה.
          <br />
          <span className="gold-text">לא לדף עוד.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
          גללו לאט — המסך נשאר, והעולם נפתח מולכם.
        </p>
        <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl("היי דוד, אשמח לקבוע שיחת היכרות רשמית.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-full px-7 py-3.5 text-sm"
          >
            קביעת שיחת היכרות
          </a>
          <a href="#work" className="btn-ghost rounded-full px-6 py-3.5 text-sm">
            לעבודות החיות
          </a>
        </div>
      </motion.div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.3em] text-muted"
      >
        גללו לכניסה
      </motion.p>

      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(240,200,106,0.35)_0%,rgba(7,14,24,0.92)_42%,#070e18_70%)]"
      />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
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

  if (reduce) {
    return (
      <section className="relative min-h-[100svh] bg-[#070e18] pt-24">
        <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-3xl flex-col items-center justify-center px-5 text-center">
          <p className="mb-5 text-xs tracking-[0.28em] text-platinum">
            {site.name} · סטודיו נדיר לאתרים
          </p>
          <h1 className="display text-4xl text-ivory md:text-6xl">
            נכנסים לחוויה.
            <br />
            <span className="gold-text">לא לדף עוד.</span>
          </h1>
          <p className="mt-6 text-muted">אתרים שנבנים כמו מוצר יוקרה — לא כמו תבנית.</p>
          <a
            href={whatsappUrl("היי דוד, אשמח לקבוע שיחת היכרות רשמית.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8 rounded-full px-7 py-3.5 text-sm"
          >
            קביעת שיחת היכרות
          </a>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[280vh] bg-[#070e18]">
      <div className="sticky top-0 h-screen">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
