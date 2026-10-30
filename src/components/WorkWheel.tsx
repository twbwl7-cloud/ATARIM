"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  projectHref,
  projects,
  type Project,
} from "@/lib/site";

const ANGLE = 360 / projects.length;

const PREVIEWS: Record<string, string> = {
  lulilac: "/work/lulilac.jpg",
  cookk: "/work/cookk.jpg",
  "luxe-barber": "/work/luxe-barber.jpg",
};

function nearestIndex(rotationDeg: number) {
  const normalized = ((-rotationDeg % 360) + 360) % 360;
  return Math.round(normalized / ANGLE) % projects.length;
}

function WheelCard({
  project,
  index,
  active,
  rotation,
  radius,
}: {
  project: Project;
  index: number;
  active: boolean;
  rotation: MotionValue<number>;
  radius: number;
}) {
  const preview = PREVIEWS[project.id];

  const opacity = useTransform(rotation, (r) => {
    const face = (((r + index * ANGLE) % 360) + 360) % 360;
    const dist = Math.min(face, 360 - face);
    return dist < 55 ? 1 : dist < 110 ? 0.45 : 0.18;
  });

  const scale = useTransform(rotation, (r) => {
    const face = (((r + index * ANGLE) % 360) + 360) % 360;
    const dist = Math.min(face, 360 - face);
    return dist < 40 ? 1.02 : dist < 100 ? 0.96 : 0.88;
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 h-[min(48vh,320px)] w-[min(78vw,240px)] -translate-x-1/2 -translate-y-1/2 sm:h-[min(52vh,380px)] sm:w-[min(72vw,280px)] md:h-[min(58vh,440px)] md:w-[300px]"
      style={{
        transform: `rotateY(${index * ANGLE}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{ opacity, scale }}
        className={`relative h-full w-full overflow-hidden rounded-[1.35rem] transition-[box-shadow,filter] duration-300 ${
          active
            ? "shadow-[0_0_50px_rgba(56,180,255,0.22),0_28px_70px_rgba(0,0,0,0.55)] ring-1 ring-gold-bright/50"
            : "shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
        }`}
      >
        <div className="absolute inset-0 bg-[#0c1524]">
          {preview ? (
            <Image
              src={preview}
              alt=""
              fill
              className="object-cover object-top contrast-[1.05] saturate-[1.15]"
              sizes="(max-width: 768px) 78vw, 300px"
              priority={index === 0}
              quality={92}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/95 via-[#050a14]/25 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="text-[10px] tracking-[0.2em] text-gold-bright">{project.client}</p>
          <p className="display mt-1 text-xl text-ivory sm:text-2xl md:text-3xl">{project.title}</p>
          <p className="mt-2 line-clamp-2 text-xs text-platinum md:text-sm">{project.summary}</p>
          <span
            className={`mt-3 inline-flex items-center gap-2 text-sm font-medium sm:mt-4 ${
              active ? "text-gold-bright" : "text-platinum"
            }`}
          >
            ← כניסה לאתר החי
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function openLive(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

/**
 * Pinned work wheel — same experience on phone and desktop.
 * Screen stays, wheel turns; front card opens the live site.
 */
export function WorkWheel() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(260);
      else if (w < 768) setRadius(320);
      else if (w < 1024) setRadius(380);
      else setRadius(420);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rawRotate = useTransform(scrollYProgress, [0.05, 0.92], [0, -ANGLE * projects.length]);
  const rotation = useSpring(rawRotate, { stiffness: 48, damping: 36, mass: 0.65 });

  useMotionValueEvent(rotation, "change", (v) => {
    setActive(nearestIndex(v));
  });

  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 0.6, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const current = projects[active] ?? projects[0];

  return (
    <section id="work" ref={ref} className="relative bg-[#070e18]">
      <div className="relative h-[280vh] sm:h-[320vh] md:h-[340vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(60,184,255,0.2),transparent_42%),radial-gradient(circle_at_50%_55%,rgba(224,180,90,0.14),transparent_50%),radial-gradient(circle_at_70%_40%,rgba(120,90,200,0.16),transparent_45%)]"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 pt-20 sm:px-6 sm:pt-22 md:flex-row md:items-end md:justify-between md:px-8 md:pt-24">
            <div className="max-w-md">
              <p className="text-xs tracking-[0.22em] text-gold">עבודות חיות</p>
              <h2 className="display mt-2 text-3xl text-ivory sm:mt-3 sm:text-4xl lg:text-5xl">
                שלושה אתרים שאפשר לפתוח
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                גללו לאט. לחצו על הכרטיס הקדמי — נכנסים לאתר האמיתי.
              </p>
            </div>

            <div className="max-w-xs text-start md:text-left">
              <p className="text-[11px] tracking-[0.2em] text-gold">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <p className="display mt-1 text-2xl text-ivory sm:mt-2 sm:text-3xl">{current.title}</p>
              <p className="mt-1 text-sm text-muted">{current.client}</p>
              <a
                href={projectHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLive(projectHref(current));
                }}
                className="btn-gold relative z-30 mt-3 inline-flex rounded-full px-5 py-2.5 text-sm sm:mt-5"
              >
                כניסה ל{current.title}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center">
            <motion.div
              style={{ scale: ringScale }}
              className="pointer-events-none absolute h-[min(58vh,420px)] w-[min(58vh,420px)] rounded-full border border-gold/20 sm:h-[min(70vh,520px)] sm:w-[min(70vh,520px)]"
            />
            <motion.div
              style={{ scale: ringScale }}
              className="pointer-events-none absolute h-[min(70vh,520px)] w-[min(70vh,520px)] rounded-full border border-white/5 sm:h-[min(82vh,620px)] sm:w-[min(82vh,620px)]"
            />

            <div
              className="relative h-[min(52vh,400px)] w-full max-w-5xl sm:h-[min(62vh,480px)]"
              style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
            >
              <motion.div
                style={{
                  rotateY: reduce ? 0 : rotation,
                  transformStyle: "preserve-3d",
                }}
                className="pointer-events-none absolute inset-0"
              >
                {projects.map((project, i) => (
                  <WheelCard
                    key={project.id}
                    project={project}
                    index={i}
                    active={i === active}
                    rotation={rotation}
                    radius={radius}
                  />
                ))}
              </motion.div>

              <a
                href={projectHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLive(projectHref(current));
                }}
                aria-label={`כניסה לאתר ${current.title}`}
                className="absolute top-1/2 left-1/2 z-20 h-[min(48vh,320px)] w-[min(78vw,240px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-[min(52vh,380px)] sm:w-[min(72vw,280px)] md:h-[min(58vh,440px)] md:w-[300px]"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 pb-6 sm:px-6 sm:pb-8 md:px-8">
            <motion.p
              style={{ opacity: hintOpacity }}
              className="text-[10px] tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.24em]"
            >
              גללו — הגלגל זז
            </motion.p>
            <div className="h-px min-w-0 flex-1 overflow-hidden bg-white/10 sm:w-40 sm:flex-none">
              <motion.div style={{ width: progressWidth }} className="h-full bg-gold" />
            </div>
            <div className="flex gap-2">
              {projects.map((p, i) => (
                <span
                  key={p.id}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === active ? "bg-gold scale-125" : "bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
