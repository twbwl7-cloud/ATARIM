import { projects, type Project } from "@/lib/site";
import { MagneticCard } from "@/components/MagneticCard";

type Props = {
  items?: Project[];
  title?: string;
  eyebrow?: string;
  id?: string;
  limit?: number;
};

export function WorkGrid({
  items = projects,
  title = "קטלוג עבודות נבחרות",
  eyebrow = "תיק עבודות",
  id = "work",
  limit,
}: Props) {
  const list = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <section id={id} className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-10 max-w-2xl md:mb-14">
        <p className="text-xs tracking-[0.22em] text-pink">{eyebrow}</p>
        <h2 className="display mt-3 text-3xl text-ivory md:text-5xl">{title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          לחצו על כרטיס ונכנסים לדימו חי של האתר שבניתי — בלי שרת, עם תחושת מוצר
          אמיתי. ריחוף מגנטי חושף את הפרטים.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((project, i) => (
          <MagneticCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
