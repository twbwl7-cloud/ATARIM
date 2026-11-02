"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import { caseStudyHref, projects, type Project } from "@/lib/site";

/** Same desktop browser frame on phone and desktop — one premium version */
function DesktopPreview({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
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

/** Compact work showcase — content-height only, no sticky viewport traps */
export function WorkWheel() {
  return (
    <section
      id="work"
      className="relative z-10 px-5 py-10 md:px-8 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08),transparent_48%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-light tracking-[0.22em] text-gold">
          עבודות נבחרות
        </p>
        <SplitTextReveal
          as="h2"
          lines={["נכסים חיים — כבר באוויר."]}
          className="display mt-3 text-center text-3xl font-light tracking-wide text-ink md:text-4xl"
        />

        <ul className="mt-8 space-y-8 md:mt-10 md:space-y-12">
          {projects.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                <p className="text-[11px] tracking-[0.16em] text-gold">
                  {String(i + 1).padStart(2, "0")} · {project.client}
                </p>
                <h3 className="display mt-2 text-2xl text-ink md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
                <a
                  href={caseStudyHref(project)}
                  className="btn-gold mt-5 inline-flex rounded-md px-5 py-2.5 text-sm"
                >
                  סיפור מקרה — {project.title}
                </a>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : undefined}>
                <DesktopPreview project={project} priority={i === 0} />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
