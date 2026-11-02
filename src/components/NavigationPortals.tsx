"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

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
      "radial-gradient(ellipse at 70% 20%, rgba(212,175,55,0.22), transparent 45%), linear-gradient(160deg, #ffffff 0%, #f3f1ed 55%, #efece6 100%)",
    pattern:
      "repeating-linear-gradient(-32deg, transparent, transparent 18px, rgba(18,18,18,0.03) 18px, rgba(18,18,18,0.03) 19px)",
  },
  {
    href: "/about",
    eyebrow: "החזון שלנו",
    title: "סטנדרט העבודה",
    lead: "בוטיק על פני המוני. דיוק על פני רעש. קוד מותאם — בלי תבניות.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    visual: "precision" as const,
    gradient:
      "radial-gradient(ellipse at 30% 80%, rgba(163,138,95,0.18), transparent 50%), linear-gradient(145deg, #f9f8f6 0%, #efece6 100%)",
    pattern:
      "repeating-linear-gradient(24deg, transparent, transparent 22px, rgba(212,175,55,0.06) 22px, rgba(212,175,55,0.06) 23px)",
  },
  {
    href: "/contact",
    eyebrow: "התחלת פרויקט",
    title: "שיחת ייעוץ",
    lead: "עשר דקות. בדיקת התאמה. כיוון ברור — בלי לחץ מכירה.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    visual: "flow" as const,
    gradient:
      "radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.2), transparent 48%), linear-gradient(200deg, #ffffff 0%, #f3f1ed 70%)",
    pattern:
      "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(18,18,18,0.035) 28px, rgba(18,18,18,0.035) 29px)",
  },
] as const;

/** Shared 3D tilt — desktop only; mobile keeps continuous backdrop motion */
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
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), {
    stiffness: 220,
    damping: 22,
    mass: 0.35,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 220,
    damping: 22,
    mass: 0.35,
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
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    rawX.set(nx - 0.5);
    rawY.set(ny - 0.5);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  if (!tiltOk) {
    return <div className={className}>{children}</div>;
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

/** Precision — bold moving grid + sweeping light (always-on) */
function PrecisionBackdrop() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.span
        className="portal-grid absolute inset-[-30%] will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163,138,95,0.55) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(163,138,95,0.55) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "36px 36px",
          opacity: 0.5,
        }}
        animate={{ x: [0, 36, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute inset-[-20%] will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(rgba(212,175,55,0.75) 1.35px, transparent 1.45px)",
          backgroundSize: "18px 18px",
          opacity: 0.42,
        }}
        animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="portal-sweep absolute inset-y-[-20%] w-[45%] will-change-transform"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.55) 42%, rgba(212,175,55,0.45) 50%, rgba(255,255,255,0.35) 58%, transparent 100%)",
          mixBlendMode: "soft-light",
        }}
        animate={{ x: ["-60%", "160%"] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
      />
      <span className="absolute -start-6 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full border-[3px] border-[#D4AF37]/55 opacity-60" />
      <span className="absolute -start-2 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border-2 border-[#C5A059]/45 opacity-50" />
    </span>
  );
}

/** Flow — large rich floating orbs (always-on) */
function FlowBackdrop() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.span
        className="absolute -start-[18%] -top-[25%] h-[13rem] w-[13rem] rounded-full bg-[#D4AF37]/55 blur-3xl will-change-transform sm:h-[15rem] sm:w-[15rem]"
        animate={{ x: [0, 28, 0], y: [0, 22, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -end-[20%] -bottom-[30%] h-[14rem] w-[14rem] rounded-full bg-[#A38A5F]/50 blur-3xl will-change-transform sm:h-[16rem] sm:w-[16rem]"
        animate={{ x: [0, -24, 0], y: [0, -28, 0], scale: [1.05, 0.92, 1.05] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.span
        className="absolute start-[28%] top-[18%] h-[8rem] w-[8rem] rounded-full bg-[#E8D5A3]/55 blur-2xl will-change-transform"
        animate={{ opacity: [0.45, 0.85, 0.45], scale: [0.88, 1.2, 0.88], y: [0, -16, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute end-[18%] top-[35%] h-16 w-16 rounded-full border-2 border-[#D4AF37]/70 bg-[#D4AF37]/35 shadow-[0_0_28px_rgba(212,175,55,0.45)] will-change-transform"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.span
        className="absolute start-[12%] bottom-[22%] h-10 w-10 rounded-full border border-[#C5A059]/80 bg-[#C5A059]/40 will-change-transform"
        animate={{ y: [0, 14, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
    </span>
  );
}

/** Assets — tangible translucent solids that rotate/scale continuously */
function AssetsBackdrop() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.span
        className="portal-solid absolute end-[8%] top-[12%] h-28 w-28 rounded-2xl border-2 border-[#D4AF37]/65 bg-gradient-to-br from-[#D4AF37]/55 to-white/40 shadow-[0_18px_40px_rgba(18,18,18,0.14)] backdrop-blur-md will-change-transform sm:h-36 sm:w-36"
        animate={{
          rotate: [16, 28, 12, 16],
          y: [0, -18, 8, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="portal-solid absolute end-[26%] top-[28%] h-24 w-24 rounded-2xl border-2 border-[#A38A5F]/55 bg-gradient-to-tr from-[#C5A059]/50 to-[#F9F8F6]/55 shadow-[0_14px_36px_rgba(18,18,18,0.12)] backdrop-blur-sm will-change-transform sm:h-32 sm:w-32"
        animate={{
          rotate: [8, -6, 14, 8],
          y: [0, 16, -10, 0],
          x: [0, -12, 6, 0],
          scale: [1, 0.92, 1.1, 1],
        }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.span
        className="portal-solid absolute end-[4%] top-[46%] h-20 w-20 rounded-xl border-2 border-[#E8D5A3]/70 bg-gradient-to-b from-white/60 to-[#D4AF37]/45 shadow-[0_12px_30px_rgba(18,18,18,0.1)] backdrop-blur-[3px] will-change-transform sm:h-28 sm:w-28"
        animate={{
          rotate: [24, 40, 18, 24],
          y: [0, -22, 6, 0],
          scale: [0.95, 1.12, 1, 0.95],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />
      <motion.span
        className="absolute start-[10%] top-[20%] h-14 w-14 rotate-12 rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/30 shadow-[0_8px_24px_rgba(212,175,55,0.25)] will-change-transform"
        animate={{ y: [0, -14, 0], rotate: [12, 24, 12], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
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
                  className={`absolute inset-0 origin-center scale-100 will-change-transform ${TRANS}`}
                  style={{
                    backgroundImage: `${portal.pattern}, ${portal.gradient}`,
                  }}
                />

                <PortalVisualLayer visual={portal.visual} />

                {/* Stronger bottom veil so bold backdrops never kill readability */}
                <span
                  aria-hidden
                  className="absolute inset-0 z-[1] bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/78 to-transparent"
                />

                <span
                  className={`relative z-[2] flex h-full min-h-[16rem] flex-col justify-end p-6 sm:p-8 ${TRANS}`}
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
