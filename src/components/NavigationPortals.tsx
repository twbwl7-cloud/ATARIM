"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

const EASE = [0.25, 1, 0.5, 1] as const;
const LUX = [0.22, 1, 0.36, 1] as const;
const TRANS =
  "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]";

type PortalVisual = "precision" | "flow" | "assets";

/** Unified cream/gold family base — no harsh white */
const portals = [
  {
    href: "/work",
    eyebrow: "תיק עבודות",
    title: "נכסים חיים",
    lead: "אתרים שנבנו מאפס לקצה העליון — מוכחים באוויר, לא במצגת.",
    span: "md:col-span-7 md:row-span-2 md:min-h-[28rem]",
    visual: "assets" as const,
    base: "linear-gradient(155deg, #f3f1ed 0%, #efece6 45%, #e8e2d8 100%)",
  },
  {
    href: "/about",
    eyebrow: "החזון שלנו",
    title: "סטנדרט העבודה",
    lead: "בוטיק על פני המוני. דיוק על פני רעש. קוד מותאם — בלי תבניות.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    visual: "precision" as const,
    base: "linear-gradient(145deg, #f3f1ed 0%, #efece6 50%, #eae4da 100%)",
  },
  {
    href: "/contact",
    eyebrow: "התחלת פרויקט",
    title: "שיחת ייעוץ",
    lead: "עשר דקות. בדיקת התאמה. כיוון ברור — בלי לחץ מכירה.",
    span: "md:col-span-5 md:min-h-[13.5rem]",
    visual: "flow" as const,
    base: "linear-gradient(200deg, #f3f1ed 0%, #efece6 55%, #e7e0d4 100%)",
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
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 24,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), {
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

/**
 * Infinity Grid — vanishing-point 3D mesh (precision / custom code)
 * Continuous drift works on touch devices; no hover dependency.
 */
function PrecisionBackdrop() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <span
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(212,175,55,0.35), transparent 55%)",
        }}
      />
      <span
        className="portal-infinity absolute inset-x-[-20%] bottom-[-40%] top-[8%] origin-bottom"
        style={{
          perspective: "520px",
          perspectiveOrigin: "50% 100%",
        }}
      >
        <motion.span
          className="absolute inset-0 will-change-transform"
          style={{
            transformOrigin: "50% 100%",
            transform: "rotateX(62deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(212,175,55,0.55) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(163,138,95,0.5) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to top, #000 15%, rgba(0,0,0,0.65) 55%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to top, #000 15%, rgba(0,0,0,0.65) 55%, transparent 92%)",
          }}
          animate={{ backgroundPosition: ["0px 0px", "0px 48px"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      </span>
      <motion.span
        className="absolute inset-x-0 top-0 h-[55%] will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.28) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.28) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          opacity: 0.55,
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 0%, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 0%, #000 0%, transparent 75%)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "28px 14px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute start-1/2 top-[42%] h-40 w-40 -translate-x-1/2 rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: LUX }}
      />
      <motion.span
        className="absolute inset-y-0 w-1/3 will-change-transform"
        style={{
          background:
            "linear-gradient(100deg, transparent, rgba(255,248,230,0.55), rgba(212,175,55,0.4), transparent)",
          mixBlendMode: "soft-light",
        }}
        animate={{ x: ["-40%", "140%"] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.4,
        }}
      />
    </span>
  );
}

/**
 * Liquid Glass — morphing warm fluid under frosted veil (connection / flow)
 */
function FlowBackdrop() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.span
        className="absolute -start-[30%] -top-[40%] h-[18rem] w-[18rem] will-change-transform sm:h-[20rem] sm:w-[20rem]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #e8d5a3 0%, #d4af37 45%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.7,
          borderRadius: "42% 58% 55% 45% / 48% 42% 58% 52%",
        }}
        animate={{
          x: [0, 36, -10, 0],
          y: [0, 24, 12, 0],
          borderRadius: [
            "42% 58% 55% 45% / 48% 42% 58% 52%",
            "58% 42% 45% 55% / 42% 58% 42% 58%",
            "48% 52% 60% 40% / 55% 45% 55% 45%",
            "42% 58% 55% 45% / 48% 42% 58% 52%",
          ],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -end-[35%] -bottom-[45%] h-[20rem] w-[20rem] will-change-transform sm:h-[22rem] sm:w-[22rem]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #c5a059 0%, #a38a5f 40%, transparent 72%)",
          filter: "blur(48px)",
          opacity: 0.65,
          borderRadius: "55% 45% 48% 52% / 42% 58% 42% 58%",
        }}
        animate={{
          x: [0, -30, 16, 0],
          y: [0, -28, -8, 0],
          borderRadius: [
            "55% 45% 48% 52% / 42% 58% 42% 58%",
            "42% 58% 55% 45% / 58% 42% 58% 42%",
            "50% 50% 42% 58% / 48% 52% 48% 52%",
            "55% 45% 48% 52% / 42% 58% 42% 58%",
          ],
          scale: [1.05, 0.9, 1.12, 1.05],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
      <motion.span
        className="absolute start-[25%] top-[20%] h-[10rem] w-[12rem] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(232,213,163,0.9) 0%, rgba(212,175,55,0.45) 45%, transparent 70%)",
          filter: "blur(28px)",
          opacity: 0.75,
          borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%",
        }}
        animate={{
          x: [0, 20, -12, 0],
          y: [0, -18, 10, 0],
          scale: [0.9, 1.2, 1, 0.9],
          opacity: [0.55, 0.85, 0.6, 0.55],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Frosted glass overlay — family signature */}
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(243,241,237,0.12) 40%, rgba(239,236,230,0.35) 100%)",
          backdropFilter: "blur(10px) saturate(1.15)",
          WebkitBackdropFilter: "blur(10px) saturate(1.15)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
        }}
      />
    </span>
  );
}

/**
 * Levitating Parallax — premium 3D blocks with deep shadows (growth / assets)
 */
function AssetsBackdrop() {
  const block =
    "absolute rounded-2xl border border-[#D4AF37]/50 backdrop-blur-md will-change-transform";

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ perspective: "900px" }}
    >
      <span
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 75% 35%, rgba(212,175,55,0.22), transparent 60%)",
        }}
      />
      <motion.span
        className={`${block} end-[6%] top-[10%] h-32 w-32 sm:h-40 sm:w-40`}
        style={{
          background:
            "linear-gradient(145deg, rgba(232,213,163,0.75) 0%, rgba(212,175,55,0.55) 48%, rgba(243,241,237,0.5) 100%)",
          boxShadow:
            "0 28px 50px rgba(18,18,18,0.18), 0 8px 18px rgba(212,175,55,0.25), inset 0 1px 0 rgba(255,255,255,0.55)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -22, 6, 0],
          rotateX: [12, 18, 10, 12],
          rotateY: [-18, -10, -22, -18],
          scale: [1, 1.06, 0.98, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={`${block} end-[28%] top-[30%] h-24 w-28 sm:h-32 sm:w-36`}
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(197,160,89,0.55) 55%, rgba(163,138,95,0.4) 100%)",
          boxShadow:
            "0 24px 44px rgba(18,18,18,0.16), 0 6px 14px rgba(163,138,95,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
        animate={{
          y: [0, 18, -12, 0],
          x: [0, -14, 8, 0],
          rotateX: [8, 4, 14, 8],
          rotateY: [14, 22, 8, 14],
          scale: [1, 0.94, 1.08, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
      <motion.span
        className={`${block} end-[2%] top-[48%] h-20 w-20 rounded-xl sm:h-28 sm:w-28`}
        style={{
          background:
            "linear-gradient(200deg, rgba(249,248,246,0.7) 0%, rgba(212,175,55,0.5) 100%)",
          boxShadow:
            "0 20px 36px rgba(18,18,18,0.15), 0 4px 12px rgba(212,175,55,0.28), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        animate={{
          y: [0, -26, 8, 0],
          rotateZ: [8, 18, 4, 8],
          rotateY: [-12, -4, -16, -12],
          scale: [0.96, 1.12, 1, 0.96],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <motion.span
        className="absolute start-[8%] top-[16%] h-14 w-14 rounded-lg will-change-transform sm:h-16 sm:w-16"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,175,55,0.65), rgba(232,213,163,0.4))",
          border: "1px solid rgba(212,175,55,0.55)",
          boxShadow:
            "0 16px 28px rgba(18,18,18,0.14), 0 0 20px rgba(212,175,55,0.3)",
          backdropFilter: "blur(6px)",
        }}
        animate={{
          y: [0, -16, 0],
          rotate: [12, 28, 12],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(255,255,255,0.2) 0%, transparent 35%, rgba(243,241,237,0.25) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
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
      className="relative z-10 border-t border-black/5 bg-[#f3f1ed] px-5 py-20 md:px-8 md:py-28"
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
                  className="absolute inset-0"
                  style={{ background: portal.base }}
                />

                <PortalVisualLayer visual={portal.visual} />

                <span
                  aria-hidden
                  className="absolute inset-0 z-[1] bg-gradient-to-t from-[#f3f1ed] via-[#f3f1ed]/80 to-transparent"
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
