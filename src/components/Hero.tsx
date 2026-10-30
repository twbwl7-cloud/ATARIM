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
import { whatsappUrl } from "@/lib/site";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Pinned plunge into a living 3D emblem that shares the hero void —
 * no separate “sticker” plate. Optical depth + scroll entry.
 */
function PlungeStage({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const intensityRaw = useTransform(progress, [0.05, 0.9], [0, 1]);
  const intensity = useSpring(intensityRaw, {
    stiffness: 65,
    damping: 26,
    mass: 0.55,
  });

  const textOpacity = useTransform(progress, [0, 0.1, 0.24], [1, 0.75, 0]);
  const textY = useTransform(progress, [0, 0.28], [0, -56]);
  const hintOpacity = useTransform(progress, [0, 0.08, 0.18], [1, 0.4, 0]);
  const veilOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.4, 1]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#050a14]">
      <div className="absolute inset-0 z-0">
        <HeroScene intensity={reduce ? intensityRaw : intensity} />
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-5 pb-[17vh] text-center md:pb-[15vh]"
      >
        <h1 className="display max-w-3xl text-[clamp(2.1rem,5.5vw,3.8rem)] leading-[1.08] text-ivory">
          נכנסים לחוויה.
          <br />
          <span className="gold-text">לא לדף עוד.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
          גללו לאט — הסמל יוצא מהמסך, ואתם נכנסים פנימה.
        </p>
        <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
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
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.3em] text-muted"
      >
        גללו לכניסה
      </motion.p>

      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(40,140,210,0.35)_0%,rgba(5,10,20,0.95)_40%,#050a14_70%)]"
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
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-[#050a14] px-5 pt-24 text-center">
        <h1 className="display text-4xl text-ivory md:text-5xl">
          נכנסים לחוויה.
          <br />
          <span className="gold-text">לא לדף עוד.</span>
        </h1>
        <a
          href={whatsappUrl("היי דוד, אשמח לקבוע שיחת היכרות רשמית.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-8 rounded-full px-7 py-3.5 text-sm"
        >
          קביעת שיחת היכרות
        </a>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#050a14]">
      <div className="sticky top-0 h-screen">
        <PlungeStage progress={scrollYProgress} reduce={false} />
      </div>
    </section>
  );
}
