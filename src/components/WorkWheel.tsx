"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projectHref, projects, type Project } from "@/lib/site";

function PhonePreview({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <div className="phone-frame mx-auto w-[min(72vw,280px)] sm:w-[min(58vw,300px)]">
      <div className="phone-screen">
        <Image
          src={`/work/mobile/${project.id}.jpg`}
          alt={`תצוגת מובייל — ${project.title}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 72vw, 300px"
          priority={priority}
          quality={90}
        />
      </div>
    </div>
  );
}

function DesktopPreview({ project, priority }: { project: Project; priority?: boolean }) {
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "davidwebsitebuilder.vercel.app";

  return (
    <div className="desktop-frame mx-auto w-full max-w-3xl">
      <div className="desktop-chrome">
        <div className="desktop-chrome-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="desktop-url">{host}</div>
      </div>
      <div className="desktop-screen">
        <Image
          src={`/work/desktop/${project.id}.jpg`}
          alt={`תצוגת מחשב — ${project.title}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 90vw, 768px"
          priority={priority}
          quality={90}
        />
      </div>
    </div>
  );
}

function openLive(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

/** A05 pinned work · device-correct frames · curiosity gap P05 */
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

  const rawIndex = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    [0, projects.length - 0.001],
  );
  const sprung = useSpring(rawIndex, { stiffness: 70, damping: 28, mass: 0.4 });

  useMotionValueEvent(sprung, "change", (v) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.floor(v)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const current = projects[active] ?? projects[0];

  if (reduce) {
    return (
      <section id="work" className="relative bg-day px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.22em] text-gold">עבודות באוויר</p>
          <h2 className="display mt-3 text-3xl text-ink md:text-5xl">
            שלושה אתרים. נכנסים אליהם.
          </h2>
          <ul className="mt-12 space-y-16">
            {projects.map((project, i) => (
              <li key={project.id} className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-gold">{project.client}</p>
                  <h3 className="display mt-2 text-2xl text-ink md:text-3xl">{project.title}</h3>
                  <p className="mt-3 text-sm text-muted">{project.summary}</p>
                  <a
                    href={projectHref(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold mt-5 inline-flex rounded-md px-5 py-2.5 text-sm"
                  >
                    כניסה ל{project.title}
                  </a>
                </div>
                <div>
                  <div className="md:hidden">
                    <PhonePreview project={project} priority={i === 0} />
                  </div>
                  <div className="hidden md:block">
                    <DesktopPreview project={project} priority={i === 0} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={ref} className="relative bg-day">
      <div className="relative h-[280vh] sm:h-[300vh] md:h-[320vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(184,137,45,0.12),transparent_50%)]"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 pt-20 sm:px-6 md:flex-row md:items-end md:justify-between md:px-8 md:pt-24">
            <div className="max-w-md">
              <p className="text-xs tracking-[0.22em] text-gold">עבודות באוויר</p>
              <h2 className="display mt-2 text-2xl text-ink sm:text-3xl md:text-4xl lg:text-5xl">
                שלושה אתרים.{" "}
                <span className="ink-gold">לחצו ונכנסים</span>.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                בטלפון — מסך טלפון. במחשב — מסך מחשב. כמו אצל הלקוח.
              </p>
            </div>

            <div className="max-w-xs text-start md:text-left">
              <p className="text-[11px] tracking-[0.2em] text-gold" dir="ltr">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
              <p className="display mt-1 text-xl text-ink sm:text-2xl md:text-3xl">
                {current.title}
              </p>
              <p className="mt-1 text-sm text-muted">{current.client}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-soft sm:text-sm">
                {current.summary}
              </p>
              <a
                href={projectHref(current)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openLive(projectHref(current));
                }}
                className="btn-gold relative z-30 mt-3 inline-flex rounded-md px-5 py-2.5 text-sm sm:mt-4"
              >
                כניסה ל{current.title}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-4 pt-2 sm:px-6">
            {projects.map((project, i) => {
              const isActive = i === active;
              return (
                <motion.a
                  key={project.id}
                  href={projectHref(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    openLive(projectHref(project));
                  }}
                  aria-label={`כניסה לאתר ${project.title}`}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 18,
                    scale: isActive ? 1 : 0.96,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-8 ${
                    isActive ? "z-20" : "z-10"
                  }`}
                >
                  <div className="md:hidden">
                    <PhonePreview project={project} priority={i === 0} />
                  </div>
                  <div className="hidden md:block">
                    <DesktopPreview project={project} priority={i === 0} />
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 pb-6 sm:px-6 sm:pb-8 md:px-8">
            <p className="text-[10px] tracking-[0.18em] text-muted sm:text-xs">
              גללו — האתר הבא
            </p>
            <div className="h-px min-w-0 flex-1 overflow-hidden bg-ink/10 sm:w-40 sm:flex-none">
              <motion.div style={{ width: progressWidth }} className="h-full bg-gold" />
            </div>
            <div className="flex gap-2">
              {projects.map((p, i) => (
                <span
                  key={p.id}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === active ? "scale-125 bg-gold" : "bg-ink/20"
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
