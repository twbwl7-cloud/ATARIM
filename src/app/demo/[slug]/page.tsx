import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoShell } from "@/components/demos/DemoShell";
import { demos, getDemo } from "@/lib/demos";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "Demo" };
  return {
    title: `${demo.project.title} · Demo`,
    description: demo.heroSub,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();
  return <DemoShell demo={demo} />;
}
