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
  projectIsExternal,
  projects,
  type Project,
} from "@/lib/site";

const RADIUS = 420;
const ANGLE = 360 / projects.length;

const PREVIEWS: Record<string, string> = {
  lulilac: "/work/lulilac.jpg",
  cookk: "/work/cookk.jpg",
  "luxe-barber": "/work/luxe-barber.jpg",
};

function nearestIndex(rotationDeg: number) {
  // Front face is at rotation ≈ -i * ANGLE (card faces camera when group.rotateY + i*ANGLE ≡ 0)
  const normalized = ((-rotationDeg % 360) + 360) % 360;
  return Math.round(normalized / ANGLE) % projects.length;
}

function WheelCard({
  project,
  index,
  active,
  rotation,
}: {
  project: Project;
  index: number;
  active: boolean;
  rotation: MotionValue<number>;
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
    return dist < 40 ? 1.05 : dist < 100 ? 0.92 : 0.78;
  });

  // Visual only inside 3D — hit-testing on rotated faces is unreliable.
  // Clicks go through a flat overlay on the active project (see WorkWheel).
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 h-[min(52vh,380px)] w-[min(72vw,280px)] -translate-x-1/2 -translate-y-1/2 md:h-[min(58vh,440px)] md:w-[300px]"
      style={{
        transform: `rotateY(${index * ANGLE}deg) translateZ(${RADIUS}px)`,
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
              sizes="300px"
              priority={index === 0}
              quality={92}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/95 via-[#050a14]/25 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="text-[10px] tracking-[0.2em] text-gold-bright">{project.client}</p>
          <p className="display mt-1 text-2xl text-ivory md:text-3xl">{project.title}</p>
          <p className="mt-2 line-clamp-2 text-xs text-platinum md:text-sm">{project.summary}</p>
          <span
            className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${
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

function MobileStack() {
  return (
    <div className="space-y-6 px-5 py-16 md:hidden">
      <div>
        <p className="text-xs tracking-[0.22em] text-gold">01 · הוכחה חיה</p>
        <h2 className="display mt-3 text-3xl text-ivory">גלגל העבודות</h2>
        <p className="mt-3 text-sm text-muted">
          לולילק · Cookk · לוקסי — לחצו ונכנסים לאתר החי.
        </p>
      </div>
      {projects.map((project) => {
        const href = projectHref(project);
        const external = projectIsExternal(project);
        const preview = PREVIEWS[project.id];
        return (
          <a
            key={project.id}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="block overflow-hidden rounded-2xl border border-gold/25 bg-elevated"
          >
            <div className="relative aspect-[4/3]">
              {preview ? (
                <Image
                  src={preview}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                />
              ) : null}
            </div>
            <div className="p-4">
              <p className="display text-xl text-ivory">{project.title}</p>
              <p className="mt-1 text-sm text-muted">{project.client}</p>
              <p className="mt-3 text-sm text-gold">← כניסה לאתר החי</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}

/**
 * Pinned work wheel — screen stays, wheel turns (A05 scrub).
 * Three live sites orbit; front card opens the production URL.
 */
export function WorkWheel() {
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

  // Full revolution across pin — each site gets a clear front moment
  const rawRotate = useTransform(scrollYProgress, [0.05, 0.92], [0, -ANGLE * projects.length]);
  const rotation = useSpring(rawRotate, { stiffness: 90, damping: 28, mass: 0.4 });

  useMotionValueEvent(rotation, "change", (v) => {
    setActive(nearestIndex(v));
  });

  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 0.6, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const current = projects[active] ?? projects[0];

  return (
    <section id="work" ref={ref} className="relative bg-[#070e18]">
      {/* Mobile: no pin */}
      <MobileStack />

      {/* Desktop pinned wheel */}
      <div className="relative hidden h-[340vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(60,184,255,0.2),transparent_42%),radial-gradient(circle_at_50%_55%,rgba(224,180,90,0.14),transparent_50%),radial-gradient(circle_at_70%_40%,rgba(120,90,200,0.16),transparent_45%)]"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-8 pt-24">
            <div className="max-w-md">
              <p className="text-xs tracking-[0.22em] text-gold">01 · הוכחה חיה</p>
              <h2 className="display mt-3 text-4xl text-ivory lg:text-5xl">
                גלגל העבודות
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                המסך נשאר. הגלגל מסתובב. שלושה אתרים חיים — עוגות, אסתטיקה,
                מספרה.
              </p>
            </div>

            <div className="max-w-xs text-left">
              <p className="text-[11px] tracking-[0.2em] text-gold">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <p className="display mt-2 text-3xl text-ivory">{current.title}</p>
              <p className="mt-1 text-sm text-muted">{current.client}</p>
              <a
                href={projectHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLive(projectHref(current));
                }}
                className="btn-gold relative z-30 mt-5 inline-flex rounded-full px-5 py-2.5 text-sm"
              >
                כניסה ל{current.title}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center">
            {/* gold orbit rings */}
            <motion.div
              style={{ scale: ringScale }}
              className="pointer-events-none absolute h-[min(70vh,520px)] w-[min(70vh,520px)] rounded-full border border-gold/20"
            />
            <motion.div
              style={{ scale: ringScale }}
              className="pointer-events-none absolute h-[min(82vh,620px)] w-[min(82vh,620px)] rounded-full border border-white/5"
            />
            <div className="pointer-events-none absolute h-[min(58vh,430px)] w-[min(58vh,430px)] rounded-full border border-gold/10" />

            <div
              className="relative h-[min(62vh,480px)] w-full max-w-5xl"
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
                  />
                ))}
              </motion.div>

              {/* Flat hit target over the front card — reliable vs CSS 3D faces */}
              <a
                href={projectHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLive(projectHref(current));
                }}
                aria-label={`כניסה לאתר ${current.title}`}
                className="absolute top-1/2 left-1/2 z-20 h-[min(58vh,440px)] w-[300px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-8 pb-8">
            <motion.p style={{ opacity: hintOpacity }} className="text-xs tracking-[0.24em] text-muted">
              גללו — הגלגל זז, המסך נשאר
            </motion.p>
            <div className="h-px w-40 overflow-hidden bg-white/10">
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
