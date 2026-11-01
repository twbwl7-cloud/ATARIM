"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { DemoContent } from "@/lib/demos";
import { site, whatsappUrl } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  demo: DemoContent;
};

/**
 * Hardcoded luxury demo landing (doks demo-site-script).
 * No backend — mock CTA + visual proof only. Robots: noindex via layout metadata.
 */
export function DemoShell({ demo }: Props) {
  const { palette, project } = demo;
  const [ctaPulse, setCtaPulse] = useState(false);

  function onCta() {
    setCtaPulse(true);
    window.setTimeout(() => setCtaPulse(false), 420);
  }

  return (
    <div
      dir="rtl"
      className="min-h-svh overflow-x-hidden"
      style={
        {
          "--d-bg": palette.bg,
          "--d-ink": palette.ink,
          "--d-soft": palette.soft,
          "--d-accent": palette.accent,
          "--d-surface": palette.surface,
          background: palette.bg,
          color: palette.ink,
        } as CSSProperties
      }
    >
      {/* Demo bar — exit back to portfolio + build credit */}
      <div
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          borderColor: `${palette.ink}14`,
          background: `${palette.bg}ee`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <Link
            href="/work"
            className="text-xs tracking-wide transition hover:opacity-80"
            style={{ color: palette.soft }}
          >
            ← חזרה לתיק עבודות
          </Link>
          <p className="text-[11px] tracking-[0.16em]" style={{ color: palette.soft }}>
            DEMO · נבנה ע״י {site.name}
          </p>
          <a
            href={whatsappUrl(
              `היי דוד, ראיתי את הדוגמה של "${project.title}". בא לי לדבר על משהו דומה.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-[0.97]"
            style={{ background: palette.accent, color: palette.bg }}
          >
            רוצה כזה?
          </a>
        </div>
      </div>

      {/* Hero — one composition */}
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={demo.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.42 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${palette.bg}cc 0%, ${palette.bg}99 40%, ${palette.bg} 100%)`,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end gap-8 px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-xs tracking-[0.24em]"
            style={{ color: palette.accent }}
          >
            {project.client} · {demo.vibe}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease }}
            className="max-w-3xl font-[family-name:var(--font-secular)] text-4xl leading-[1.08] sm:text-5xl md:text-7xl"
            style={{ color: palette.ink }}
          >
            {demo.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease }}
            className="max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: palette.soft }}
          >
            {demo.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={onCta}
              className="rounded-full px-6 py-3.5 text-sm font-semibold transition active:scale-[0.97]"
              style={{
                background: palette.accent,
                color: palette.bg,
                transform: ctaPulse ? "scale(1.03)" : undefined,
              }}
            >
              {demo.cta}
            </button>
            <span className="text-xs md:text-sm" style={{ color: palette.soft }}>
              {demo.proofLine}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p
          className="mb-3 text-xs tracking-[0.22em]"
          style={{ color: palette.accent }}
        >
          למה זה עובד
        </p>
        <h2
          className="mb-12 max-w-2xl font-[family-name:var(--font-secular)] text-3xl md:text-5xl"
          style={{ color: palette.ink }}
        >
          שלושה עקרונות. אפס רעש.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {demo.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="rounded-2xl border p-6 md:p-7"
              style={{
                borderColor: `${palette.ink}18`,
                background: palette.surface,
              }}
            >
              <p
                className="mb-3 text-[11px] tracking-[0.2em]"
                style={{ color: palette.accent }}
              >
                0{i + 1}
              </p>
              <h3
                className="font-[family-name:var(--font-secular)] text-2xl"
                style={{ color: palette.ink }}
              >
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: palette.soft }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stack strip */}
      <section
        className="border-y px-5 py-14 md:px-8"
        style={{ borderColor: `${palette.ink}14` }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm" style={{ color: palette.soft }}>
            מה רץ מאחורי הקלעים
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1.5 text-xs"
                style={{
                  borderColor: `${palette.ink}22`,
                  color: palette.ink,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mock CTA success */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
        <h2
          className="font-[family-name:var(--font-secular)] text-3xl md:text-4xl"
          style={{ color: palette.ink }}
        >
          זו דוגמה חיה — אפשר ללחוץ ולהרגיש
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed md:text-base" style={{ color: palette.soft }}>
          ככה נבנה אתר שמביא הודעות: מראה נקי, תנועה במקום הנכון, וכפתור ברור
          לשיחה. רוצים גרסה מלאה לעסק שלכם?
        </p>
        <a
          href={whatsappUrl(
            `היי דוד, הדוגמה של "${project.title}" דיברה אליי. בואו נדבר.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCta}
          className="mt-8 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold transition active:scale-[0.97]"
          style={{ background: palette.accent, color: palette.bg }}
        >
          בואו נבנה אחד כזה
        </a>
      </section>

      <footer
        className="border-t px-5 py-8 text-center text-xs md:px-8"
        style={{ borderColor: `${palette.ink}14`, color: palette.soft }}
      >
        דוגמה · לא לאנדקס · © {site.name} 2026
      </footer>
    </div>
  );
}
