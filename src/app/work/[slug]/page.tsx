import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextStepCTA } from "@/components/NextStepCTA";
import { caseStudyHref, getProject, projects } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case Study" };
  return {
    title: `${project.title} · Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="pt-20">
      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          Case Study · {project.format ?? project.category}
        </p>
        <h1 className="display mt-4 text-4xl font-light text-ink md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-3 text-sm tracking-wide text-muted">
          {project.client} · {project.role}
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          {project.summary}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-md px-7 py-3 text-sm"
            >
              כניסה לאתר החי
            </a>
          ) : null}
          <Link
            href="/work"
            className="btn-ghost rounded-md px-7 py-3 text-sm transition-all duration-500 ease-in-out"
          >
            ← כל העבודות
          </Link>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-24 md:grid-cols-3 md:gap-10 md:px-8 md:py-32">
          {[
            ["Challenge", project.challenge],
            ["Approach", project.approach],
            ["Outcome", project.outcome],
          ].map(([label, body]) => (
            <div key={label}>
              <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
                {label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
          Stack
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs tracking-wide text-ink-soft"
            >
              {tech}
            </li>
          ))}
        </ul>

        {next && next.id !== project.id ? (
          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
              Next Case Study
            </p>
            <Link
              href={caseStudyHref(next)}
              className="group mt-4 flex flex-col gap-2 transition-all duration-500 ease-in-out sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="display text-2xl font-light text-ink group-hover:text-gold md:text-3xl">
                {next.title}
              </span>
              <span className="text-sm text-muted group-hover:text-gold">
                {next.client} ←
              </span>
            </Link>
          </div>
        ) : null}
      </section>

      <NextStepCTA
        title="רוצים Case Study כזה לעסק שלכם?"
        lead="Request a Consultation — נבדוק התאמה, נגדיר Conversion-Driven Architecture, ונבנה Bespoke Digital Asset."
      />
    </div>
  );
}
