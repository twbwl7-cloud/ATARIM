"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";

type Seed = {
  x: number;
  z: number;
  scale: number;
  /** Normalized delay 0–0.45 so cascade eases in staggered */
  delay: number;
  rotAxis: THREE.Vector3;
  rotSpeed: number;
  driftAmp: number;
  driftFreq: number;
  phase: number;
  fallSpan: number;
};

function canUseWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function isWeakGpu() {
  if (typeof document === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) return true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    if (!info) return false;
    const renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL));
    return /llvmpipe|swiftshader|softpipe|microsoft basic render/i.test(
      renderer,
    );
  } catch {
    return true;
  }
}

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSeeds(count: number): Seed[] {
  const rnd = mulberry32(0xd1a70d);
  const seeds: Seed[] = [];
  for (let i = 0; i < count; i++) {
    seeds.push({
      x: (rnd() - 0.5) * 7.2,
      z: (rnd() - 0.5) * 3.2,
      scale: 0.045 + rnd() * 0.085,
      delay: rnd() * 0.42,
      rotAxis: new THREE.Vector3(
        rnd() - 0.5,
        rnd() - 0.5,
        rnd() - 0.5,
      ).normalize(),
      rotSpeed: 0.1 + rnd() * 0.22,
      driftAmp: 0.1 + rnd() * 0.18,
      driftFreq: 0.12 + rnd() * 0.22,
      phase: rnd() * Math.PI * 2,
      fallSpan: 5.8 + rnd() * 2.4,
    });
  }
  return seeds;
}

/** Smoothstep ease — no sudden drops */
function easeInOutCubic(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function DiamondField({
  progress,
  lite,
}: {
  progress: React.MutableRefObject<number>;
  lite: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const damp = useRef(0);
  const time = useRef(0);
  const count = lite ? 16 : 28;
  const seeds = useMemo(() => makeSeeds(count), [count]);

  const geom = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const mats = useMemo(() => {
    const base = {
      color: new THREE.Color("#f0e6c8"),
      metalness: 0.12,
      roughness: 0.1,
      transmission: 0.88,
      thickness: 0.7,
      ior: 1.48,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.42,
      envMapIntensity: lite ? 0.55 : 0.9,
      attenuationColor: new THREE.Color("#D4AF37"),
      attenuationDistance: 1.8,
      depthWrite: false,
    } as const;
    return seeds.map(
      () => new THREE.MeshPhysicalMaterial({ ...base }),
    );
  }, [lite, seeds]);

  useEffect(() => {
    return () => {
      geom.dispose();
      mats.forEach((m) => m.dispose());
    };
  }, [geom, mats]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.033);
    time.current += dt;

    // Slow graceful catch-up — never snaps
    damp.current = THREE.MathUtils.damp(
      damp.current,
      progress.current,
      1.55,
      dt,
    );
    const p = damp.current;

    for (let i = 0; i < seeds.length; i++) {
      const mesh = g.children[i] as THREE.Mesh | undefined;
      if (!mesh) continue;
      const s = seeds[i];
      const local = easeInOutCubic(
        THREE.MathUtils.clamp(
          (p - s.delay * 0.55) / (1 - s.delay * 0.35),
          0,
          1,
        ),
      );

      // Start above frame; pour slowly downward
      const y0 = 3.4 + (i % 5) * 0.12;
      mesh.position.y = y0 - s.fallSpan * local;
      mesh.position.x =
        s.x +
        Math.sin(time.current * s.driftFreq + s.phase) *
          s.driftAmp *
          (0.35 + local);
      mesh.position.z = s.z;

      mesh.rotateOnAxis(s.rotAxis, dt * s.rotSpeed * (0.45 + local * 0.7));

      const m = mesh.material as THREE.MeshPhysicalMaterial;
      m.opacity = THREE.MathUtils.lerp(0, 0.42, easeInOutCubic(local * 1.15));
      mesh.visible = local > 0.02;
      mesh.scale.setScalar(s.scale * (0.85 + local * 0.15));
    }
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          geometry={geom}
          material={mats[i]}
          scale={s.scale}
          position={[s.x, 4, s.z]}
          frustumCulled
        />
      ))}
    </group>
  );
}

function CascadeLights({ lite }: { lite: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} color="#fff6e8" />
      <directionalLight
        position={[4.5, 2.5, 3]}
        intensity={0.55}
        color="#E8D5A3"
      />
      <directionalLight
        position={[-3.8, 1.2, -2]}
        intensity={0.35}
        color="#D4AF37"
      />
      <pointLight
        position={[2.2, 1.5, 2.5]}
        intensity={lite ? 0.45 : 0.7}
        color="#D4AF37"
        distance={14}
        decay={2}
      />
      {!lite ? (
        <pointLight
          position={[-2.4, 0.8, 1.6]}
          intensity={0.35}
          color="#F5E6C0"
          distance={12}
          decay={2}
        />
      ) : null}
    </>
  );
}

class CascadeErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

/**
 * Full-hero scroll-tied crystal diamond cascade.
 * pointer-events: none — never blocks CTAs / nav.
 */
export function HeroDiamondCascade() {
  const progress = useRef(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(true);
  const [lite, setLite] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!canUseWebGL()) {
      setOk(false);
      return;
    }
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setLite(isWeakGpu() || narrow);

    const update = () => {
      const host = hostRef.current;
      const section = host?.closest("section");
      if (!section) {
        const y = window.scrollY || 0;
        progress.current = THREE.MathUtils.clamp(
          y / (window.innerHeight * 0.72),
          0,
          1,
        );
        return;
      }
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const range = Math.max(rect.height * 0.85, window.innerHeight * 0.55);
      progress.current = THREE.MathUtils.clamp(scrolled / range, 0, 1);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    type LenisLike = {
      on: (e: string, cb: () => void) => void;
      off: (e: string, cb: () => void) => void;
    };
    const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
    lenis?.on("scroll", update);

    const host = hostRef.current;
    let io: IntersectionObserver | undefined;
    if (host && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { rootMargin: "120px", threshold: 0.02 },
      );
      io.observe(host);
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      lenis?.off("scroll", update);
      io?.disconnect();
    };
  }, []);

  if (!ok) return null;

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <CascadeErrorBoundary onError={() => setOk(false)}>
        <Canvas
          dpr={lite ? [1, 1.25] : [1, 1.75]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0.2, 6.2], fov: 38, near: 0.1, far: 40 }}
          gl={{
            alpha: true,
            antialias: !lite,
            powerPreference: lite ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.pointerEvents = "none";
            gl.domElement.style.touchAction = "none";
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => {
                e.preventDefault();
                setOk(false);
              },
              { once: true },
            );
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            pointerEvents: "none",
          }}
        >
          <Suspense fallback={null}>
            <CascadeLights lite={lite} />
            <DiamondField progress={progress} lite={lite} />
          </Suspense>
        </Canvas>
      </CascadeErrorBoundary>
    </div>
  );
}
