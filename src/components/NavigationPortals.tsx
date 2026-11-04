"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { SplitTextReveal } from "@/components/SplitTextReveal";

const EASE = [0.25, 1, 0.5, 1] as const;
const TRANS =
  "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]";

/** Warm cream — never white */
const CREAM = "#FAF9F6";
const CREAM_DEEP = "#F3EFE6";

type PortalVisual = "precision" | "flow" | "assets";

const PortalSceneCanvas = dynamic(
  () =>
    import("@/components/PortalScenes").then((m) => m.PortalSceneCanvas),
  { ssr: false, loading: () => null },
);

const portals = [
  {
    href: "/work",
    eyebrow: "תיק עבודות",
    title: "נכסים חיים",
    lead: "אתרים שנבנו מאפס לקצה העליון — מוכחים באוויר, לא במצגת.",
    span: "md:col-span-7 md:row-span-2 md:min-h-[18rem]",
    visual: "assets" as const,
  },
  {
    href: "/about",
    eyebrow: "החזון שלנו",
    title: "סטנדרט העבודה",
    lead: "בוטיק על פני המוני. דיוק על פני רעש. קוד מותאם — בלי תבניות.",
    span: "md:col-span-5 md:min-h-[11rem]",
    visual: "precision" as const,
  },
  {
    href: "/contact",
    eyebrow: "התחלת פרויקט",
    title: "שיחת ייעוץ",
    lead: "עשר דקות. בדיקת התאמה. כיוון ברור — בלי לחץ מכירה.",
    span: "md:col-span-5 md:min-h-[11rem]",
    visual: "flow" as const,
  },
] as const;

function TiltShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltOk, setTiltOk] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 200,
    damping: 24,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5.5, 5.5]), {
    stiffness: 200,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setTiltOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!tiltOk) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  if (!tiltOk) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function NavigationPortals() {
  return (
    <section
      aria-labelledby="portals-heading"
      className="portal-section relative z-10 border-t border-[#C5A059]/15 px-5 py-5 md:px-8 md:py-8"
      style={{ perspective: 1200, backgroundColor: CREAM }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28, margin: "0px 0px -6% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lux-reveal mb-6 max-w-xl md:mb-8"
        >
          <p className="text-[11px] font-medium tracking-[0.24em] text-[#C5A059]">
            ניווט
          </p>
          <span aria-hidden className="gold-rule mt-3 mb-1 ms-0 me-auto" />
          <SplitTextReveal
            as="h2"
            id="portals-heading"
            text="שלושה מסלולים. בחירה אחת ברורה."
            className="display mt-3 text-3xl font-semibold tracking-wide text-[#121212] md:text-4xl"
          />
          <p className="mt-3 text-sm font-normal leading-relaxed tracking-wide text-[#5C5C5C] md:text-[15px]">
            עבודות שממירות · סטנדרט העבודה · שיחת ייעוץ שמתחילה פרויקט.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {portals.map((portal, index) => (
            <TiltShell
              key={portal.href}
              className={`gold-border magnetic ${portal.span} min-h-[12rem]`}
            >
              <Link
                href={portal.href}
                data-cursor-text="לחץ כדי לגלות"
                className="group gold-border__inner magnetic relative block h-full min-h-[12rem] overflow-hidden"
                style={{ backgroundColor: CREAM }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(155deg, ${CREAM} 0%, ${CREAM_DEEP} 55%, #E8DFD2 100%)`,
                  }}
                />

                {/* Real R3F 3D scene — continuous motion, behind copy */}
                <PortalSceneCanvas kind={portal.visual} />

                <span
                  aria-hidden
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(to top, #FAF9F6 0%, rgba(250,249,246,0.88) 38%, rgba(250,249,246,0.35) 62%, transparent 82%)",
                  }}
                />

                <span
                  className={`relative z-[2] flex h-full min-h-[12rem] flex-col justify-end p-5 sm:p-7 ${TRANS}`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08 * index,
                      ease: EASE,
                    }}
                    className="block"
                  >
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[#C5A059]">
                      {portal.eyebrow}
                    </span>
                    <span className="display mt-2 block text-2xl font-semibold tracking-wide text-[#121212] sm:text-3xl md:text-[2rem]">
                      {portal.title}
                    </span>
                    <span className="mt-2 block max-w-sm text-sm font-normal leading-relaxed tracking-wide text-[#5C5C5C]">
                      {portal.lead.includes("בוטיק") ? (
                        <>
                          <span className="lux-word">בוטיק</span>
                          {portal.lead.slice("בוטיק".length)}
                        </>
                      ) : (
                        portal.lead
                      )}
                    </span>
                    <span
                      className={`mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#121212]/80 ${TRANS} group-hover:text-[#A38A5F]`}
                    >
                      כניסה
                      <span aria-hidden className="text-[#C5A059]">
                        ←
                      </span>
                    </span>
                  </motion.span>
                </span>
              </Link>
            </TiltShell>
          ))}
        </div>
      </div>
    </section>
  );
}
