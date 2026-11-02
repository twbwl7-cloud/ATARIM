"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;
const TRANS =
  "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]";

type PortalVisual = "precision" | "flow" | "assets";

const portals = [
  {
    href: "/work",
    eyebrow: "תיק עבודות",
    title: "נכסים חיים",
    lead: "אתרים שנבנו מאפס לקצה העליון — מוכחים באוויר, לא במצגת.",
    span: "md:col-span-7 md:row-span-2 md:min-h-[28rem]",
    visual: "assets" as const,
    gradient:
      "radial-gradient(ellipse at 70% 20%, rgba(212,175,55,0.16), transparent 45%), linear-gradient(160deg, #ffffff 0%, #f3f1ed 55%, #efece6 100%)",
    pattern:
      "repeating-linear-gradient(-32deg, transparent, transparent 18px, rgba(18,18,18,0.025) 18px, rgba(18,18,18,0.025) 19px)",
  },
  {
    href: "/about",
    eyebrow: "החזון שלנו",
    title: "סטנדרט העבודה",
    lead: "בוטיק על פני המוני. דיוק על פני רעש. קוד מותאם — בלי תבניות.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    visual: "precision" as const,
    gradient:
      "radial-gradient(ellipse at 30% 80%, rgba(163,138,95,0.14), transparent 50%), linear-gradient(145deg, #f9f8f6 0%, #efece6 100%)",
    pattern:
      "repeating-linear-gradient(24deg, transparent, transparent 22px, rgba(212,175,55,0.05) 22px, rgba(212,175,55,0.05) 23px)",
  },
  {
    href: "/contact",
    eyebrow: "התחלת פרויקט",
    title: "שיחת ייעוץ",
    lead: "עשר דקות. בדיקת התאמה. כיוון ברור — בלי לחץ מכירה.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    visual: "flow" as const,
    gradient:
      "radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.14), transparent 48%), linear-gradient(200deg, #ffffff 0%, #f3f1ed 70%)",
    pattern:
      "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(18,18,18,0.03) 28px, rgba(18,18,18,0.03) 29px)",
  },
] as const;

/** Shared subtle 3D tilt — same physical family for all portal cards */
function TiltShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5.5, -5.5]), {
    stiffness: 220,
    damping: 22,
    mass: 0.35,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6.5, 6.5]), {
    stiffness: 220,
    damping: 22,
    mass: 0.35,
  });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    rawX.set(nx - 0.5);
    rawY.set(ny - 0.5);
    el.style.setProperty("--portal-x", `${nx * 100}%`);
    el.style.setProperty("--portal-y", `${ny * 100}%`);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--portal-x", "68%");
    el.style.setProperty("--portal-y", "32%");
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Precision / code — architectural grid + mouse-tracking warm glow */
function PrecisionBackdrop() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--portal-x, 68%) var(--portal-y, 32%), rgba(212,175,55,0.14), rgba(197,160,89,0.05) 42%, transparent 68%)",
        }}
      />
      <span
        className="absolute inset-[-8%] opacity-[0.07] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-[1.04] group-hover:opacity-[0.11]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163,138,95,0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,138,95,0.55) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, #000 20%, transparent 75%)",
        }}
      />
      <span
        className="absolute inset-0 opacity-[0.08] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:translate-x-1 group-hover:translate-y-0.5 group-hover:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(163,138,95,0.7) 0.8px, transparent 0.9px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 70% 55%, #000 10%, transparent 72%)",
        }}
      />
    </span>
  );
}

/** Flow / conversation — soft pulsing warm orbs */
function FlowBackdrop() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.span
        className="absolute -start-[12%] top-[-18%] h-[9rem] w-[9rem] rounded-full bg-[#D4AF37]/15 blur-3xl"
        animate={{ x: [0, 14, 0], y: [0, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -end-[8%] bottom-[-22%] h-[10rem] w-[10rem] rounded-full bg-[#C5A059]/12 blur-3xl"
        animate={{ x: [0, -12, 0], y: [0, -14, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <motion.span
        className="absolute start-[35%] top-[30%] h-[6.5rem] w-[6.5rem] rounded-full bg-[#E8D5A3]/10 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

/** Assets / growth — glass isometric squares that lift apart on hover */
function AssetsBackdrop() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <span className="portal-glass portal-glass--a absolute end-[12%] top-[18%] h-24 w-24 rounded-2xl border border-[#D4AF37]/20 bg-white/20 shadow-[0_12px_40px_rgba(18,18,18,0.04)] backdrop-blur-[2px] will-change-transform sm:h-32 sm:w-32" />
      <span className="portal-glass portal-glass--b absolute end-[22%] top-[32%] h-20 w-20 rounded-2xl border border-[#D4AF37]/15 bg-[#F9F8F6]/35 shadow-[0_10px_32px_rgba(18,18,18,0.03)] backdrop-blur-[1.5px] will-change-transform sm:h-28 sm:w-28" />
      <span className="portal-glass portal-glass--c absolute end-[8%] top-[42%] h-16 w-16 rounded-xl border border-[#C5A059]/18 bg-white/15 shadow-[0_8px_28px_rgba(18,18,18,0.03)] backdrop-blur-[1px] will-change-transform sm:h-24 sm:w-24" />
    </span>
  );
}

function PortalVisualLayer({ visual }: { visual: PortalVisual }) {
  if (visual === "precision") return <PrecisionBackdrop />;
  if (visual === "flow") return <FlowBackdrop />;
  return <AssetsBackdrop />;
}

export function NavigationPortals() {
  return (
    <section
      aria-labelledby="portals-heading"
      className="relative z-10 border-t border-black/5 bg-transparent px-5 py-20 md:px-8 md:py-28"
      style={{ perspective: 1200 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 max-w-xl md:mb-14"
        >
          <p className="text-[11px] font-medium tracking-[0.24em] text-[#D4AF37]">
            ניווט
          </p>
          <span aria-hidden className="gold-rule mt-3 mb-1 ms-0 me-auto" />
          <h2
            id="portals-heading"
            className="display mt-3 text-3xl font-semibold tracking-wide text-[#121212] md:text-4xl"
          >
            שלושה מסלולים. בחירה אחת ברורה.
          </h2>
          <p className="mt-3 text-sm font-normal leading-relaxed tracking-wide text-[#5C5C5C] md:text-[15px]">
            עבודות שממירות · סטנדרט העבודה · שיחת ייעוץ שמתחילה פרויקט.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {portals.map((portal, index) => (
            <TiltShell
              key={portal.href}
              className={`gold-border ${portal.span} min-h-[16rem]`}
            >
              <Link
                href={portal.href}
                className="group gold-border__inner relative block h-full min-h-[16rem] overflow-hidden"
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-center scale-100 will-change-transform ${TRANS} group-hover:scale-105`}
                  style={{
                    backgroundImage: `${portal.pattern}, ${portal.gradient}`,
                  }}
                />

                <PortalVisualLayer visual={portal.visual} />

                <span
                  aria-hidden
                  className={`absolute inset-0 z-[1] bg-gradient-to-t from-[#F9F8F6]/92 via-[#F9F8F6]/28 to-transparent ${TRANS}`}
                />

                <span
                  className={`relative z-[2] flex h-full min-h-[16rem] flex-col justify-end p-6 sm:p-8 ${TRANS} group-hover:-translate-y-1`}
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
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[#D4AF37]">
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
                      <span aria-hidden className="text-[#D4AF37]">
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
