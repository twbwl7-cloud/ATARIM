"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type KeyboardEvent, type MouseEvent } from "react";
import {
  projectHref,
  projectIsExternal,
  whatsappUrl,
  type Project,
} from "@/lib/site";

const accents = {
  gold: "from-gold/30 via-transparent to-transparent",
  pink: "from-pink/25 via-transparent to-transparent",
  ivory: "from-ivory/18 via-transparent to-transparent",
} as const;

type Props = {
  project: Project;
  index?: number;
};

export function MagneticCard({ project, index = 0 }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, rgba(201,161,91,0.26), transparent 52%), radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(122,46,58,0.12), transparent 60%)`;

  const href = projectHref(project);
  const external = projectIsExternal(project);

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.08);
    y.set(dy * 0.08);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(40);
  }

  function openProject() {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject();
    }
  }

  return (
    <motion.article
      ref={ref}
      role="link"
      tabIndex={0}
      aria-label={
        external
          ? `לפתוח אתר חי: ${project.title}`
          : `לפתוח דימו חי: ${project.title}`
      }
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.06 }}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={openProject}
      onKeyDown={onKeyDown}
      className="premium-panel group relative cursor-pointer overflow-hidden rounded-[1.5rem] p-6 md:p-7"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accents[project.accent]} opacity-80`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-gold/50 to-transparent opacity-70"
      />

      <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between gap-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
              {project.format ?? project.category}
            </p>
            <span className="rounded-full border border-line/90 bg-rich-black/50 px-2.5 py-1 text-[10px] text-muted">
              {project.client}
            </span>
          </div>
          <h3 className="display mt-4 text-2xl text-ivory md:text-[2rem]">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line/70 bg-rich-black/55 px-2.5 py-1 text-[11px] text-ivory/85"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line/40 pt-4">
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted underline-offset-4 transition group-hover:text-gold-bright group-hover:underline"
              >
                אתר חי · נפתח בחלון חדש
              </a>
            ) : (
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted underline-offset-4 transition group-hover:text-pink group-hover:underline"
              >
                לחצו לדימו חי · ריחוף חושף פרטים
              </Link>
            )}
            <a
              href={whatsappUrl(
                `היי דוד, התעניינתי בפרויקט בסגנון "${project.title}". אשמח להצעת מחיר.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold opacity-0 transition group-hover:opacity-100 hover:bg-gold hover:text-rich-black"
            >
              לשיחה
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-right scale-x-0 bg-gradient-to-l from-gold-bright via-gold to-pink transition duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}
