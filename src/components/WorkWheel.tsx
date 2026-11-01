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

/** Same desktop browser frame on phone and desktop — one premium version */
function DesktopPreview({ project, priority }: { project: Project; priority?: boolean }) {
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "davidwebsitebuilder.vercel.app";

  return (
    <div className="desktop-frame mx-auto w-full max-w-[min(100%,22rem)] sm:max-w-sm lg:max-w-md">
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
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 55vw, 512px"
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

/** A05 pinned work · smaller frames · no text overlap */
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
      <section id="work" className="relative px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">עבודות באוויר</p>
          <h2 className="display mt-4 text-3xl font-light text-ink md:text-5xl">
            שלושה אתרים באוויר. תבדקו בעצמכם.
          </h2>
          <ul className="mt-12 space-y-16">
            {projects.map((project, i) => (
              <li key={project.id} className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-gold">
                    {project.client}
                  </p>
                  <h3 className="display mt-2 text-2xl text-ink md:text-3xl">
                    {project.title}
                  </h3>
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
                  <DesktopPreview project={project} priority={i === 0} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={ref} className="relative">
      <div className="relative h-[260vh] sm:h-[280vh] md:h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(24,196,224,0.18),transparent_48%)]"
          />

          {/* Compact header — never fights the frame */}
          <div className="relative z-20 mx-auto w-full max-w-3xl shrink-0 px-5 pt-16 text-center sm:px-8 sm:pt-20 md:pt-20">
            <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">עבודות באוויר</p>
            <h2 className="display mt-2 text-xl font-light text-ink sm:text-2xl md:text-3xl">
              שלושה אתרים באוויר. תבדקו בעצמכם.
            </h2>
          </div>

          {/* Frame band — deliberately compact so meta never fights it */}
          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-1 sm:px-16 md:px-24">
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
                    y: isActive ? 0 : 14,
                    scale: isActive ? 1 : 0.97,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-x-4 flex items-center justify-center sm:inset-x-10 ${
                    isActive ? "z-20" : "z-10"
                  }`}
                >
                  <div className="w-full">
                    <DesktopPreview project={project} priority={i === 0} />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Project meta under the frame — clear, no overlap */}
          <div className="relative z-20 mx-auto flex w-full max-w-3xl shrink-0 flex-col items-center gap-2 px-5 pb-20 text-center sm:pb-7 md:pb-8">
            <p className="text-[11px] font-medium tracking-[0.16em] text-gold sm:text-xs">
              {String(active + 1).padStart(2, "0")} מתוך{" "}
              {String(projects.length).padStart(2, "0")}
              <span aria-hidden> · </span>
              {current.client}
            </p>
            <p className="display text-lg font-light text-ink sm:text-xl md:text-2xl">
              {current.title}
            </p>
            <p className="max-w-md text-xs font-medium text-ink-soft sm:text-sm">
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
              className="btn-gold mt-1 inline-flex rounded-md px-5 py-2.5 text-sm"
            >
              כניסה ל{current.title}
            </a>
            <div className="mt-2 flex w-full max-w-xs items-center gap-3">
              <p className="shrink-0 text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
                גללו — האתר הבא
              </p>
              <div className="h-px min-w-0 flex-1 overflow-hidden bg-ink/10">
                <motion.div style={{ width: progressWidth }} className="h-full bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
