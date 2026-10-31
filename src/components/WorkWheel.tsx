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
import { projectHref, projects, type Project } from "@/lib/site";

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
    return dist < 55 ? 1 : dist < 110 ? 0.4 : 0.15;
  });

  const scale = useTransform(rotation, (r) => {
    const face = (((r + index * ANGLE) % 360) + 360) % 360;
    const dist = Math.min(face, 360 - face);
    return dist < 40 ? 1.02 : dist < 100 ? 0.94 : 0.86;
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 h-[min(34vh,220px)] w-[min(52vw,168px)] -translate-x-1/2 -translate-y-1/2 sm:h-[min(36vh,250px)] sm:w-[min(42vw,190px)] md:h-[min(38vh,280px)] md:w-[210px]"
      style={{
        transform: `rotateY(${index * ANGLE}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{ opacity, scale }}
        className={`relative h-full w-full overflow-hidden rounded-2xl transition-[box-shadow,filter] duration-300 ${
          active
            ? "shadow-[0_0_36px_rgba(62,200,240,0.28),0_18px_44px_rgba(0,0,0,0.5)] ring-1 ring-cyan-bright/50"
            : "shadow-[0_12px_32px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
        }`}
      >
        <div className="absolute inset-0 bg-[#0c1524]">
          {preview ? (
            <Image
              src={preview}
              alt=""
              fill
              className="object-cover object-top contrast-[1.05] saturate-[1.12]"
              sizes="(max-width: 768px) 52vw, 210px"
              priority={index === 0}
              quality={90}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/95 via-[#050a14]/3 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
          <p className="text-[9px] tracking-[0.18em] text-gold-bright">{project.client}</p>
          <p className="display mt-0.5 text-base text-ivory sm:text-lg md:text-xl">{project.title}</p>
          <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-platinum sm:text-xs">
            {project.summary}
          </p>
          <span
            className={`mt-2 inline-flex text-[11px] font-medium sm:mt-2.5 sm:text-xs ${
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

export function WorkWheel() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [radius, setRadius] = useState(280);

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
      if (w < 480) setRadius(190);
      else if (w < 768) setRadius(230);
      else if (w < 1024) setRadius(260);
      else setRadius(290);
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

  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 0.6, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const current = projects[active] ?? projects[0];

  return (
    <section id="work" ref={ref} className="relative bg-[#070e18]">
      <div className="relative h-[260vh] sm:h-[280vh] md:h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(62,200,240,0.28),transparent_42%),radial-gradient(circle_at_50%_55%,rgba(138,232,255,0.14),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(26,168,200,0.12),transparent_40%)]"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 pt-20 sm:gap-4 sm:px-6 sm:pt-22 md:flex-row md:items-end md:justify-between md:px-8 md:pt-24">
            <div className="max-w-md">
              <p className="text-xs tracking-[0.22em] text-cyan-bright">עבודות חיות</p>
              <h2 className="display mt-2 text-2xl text-ivory sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl">
                שלושה אתרים שאפשר{" "}
                <span className="ink-cyan">לפתוח</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                גללו לאט. לחצו על הכרטיס הקדמי — נכנסים לאתר{" "}
                <span className="ink-gold">האמיתי</span>.
              </p>
            </div>

            <div className="max-w-xs text-start md:text-left">
              <p className="text-[11px] tracking-[0.2em] text-gold">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
              <p className="display mt-1 text-xl text-ivory sm:mt-2 sm:text-2xl md:text-3xl">
                {current.title}
              </p>
              <p className="mt-1 text-sm text-muted">{current.client}</p>
              <a
                href={projectHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLive(projectHref(current));
                }}
                className="btn-gold relative z-30 mt-3 inline-flex rounded-full px-5 py-2.5 text-sm sm:mt-4"
              >
                כניסה ל{current.title}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center">
            <motion.div
              style={{ scale: ringScale }}
              className="pointer-events-none absolute h-[min(42vh,300px)] w-[min(42vh,300px)] rounded-full border border-gold/15 sm:h-[min(48vh,360px)] sm:w-[min(48vh,360px)]"
            />
            <motion.div
              style={{ scale: ringScale }}
              className="pointer-events-none absolute h-[min(52vh,380px)] w-[min(52vh,380px)] rounded-full border border-white/5 sm:h-[min(58vh,440px)] sm:w-[min(58vh,440px)]"
            />

            <div
              className="relative h-[min(40vh,300px)] w-full max-w-4xl sm:h-[min(44vh,340px)]"
              style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
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
                className="absolute top-1/2 left-1/2 z-20 h-[min(34vh,220px)] w-[min(52vw,168px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-[min(36vh,250px)] sm:w-[min(42vw,190px)] md:h-[min(38vh,280px)] md:w-[210px]"
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
