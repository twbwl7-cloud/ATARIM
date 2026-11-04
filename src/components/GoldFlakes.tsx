"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMotionValueEvent, useScroll } from "framer-motion";
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

type FlakeSeed = {
  x: number;
  z: number;
  y0: number;
  fall: number;
  sx: number;
  sy: number;
  sz: number;
  delay: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  drift: number;
  phase: number;
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSeeds(count: number): FlakeSeed[] {
  const rnd = mulberry32(0xc01df1a7);
  const out: FlakeSeed[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: (rnd() - 0.5) * 9,
      z: (rnd() - 0.5) * 4.5,
      y0: 3.2 + rnd() * 2.4,
      fall: 7.5 + rnd() * 3.5,
      sx: 0.08 + rnd() * 0.16,
      sy: 0.006 + rnd() * 0.014,
      sz: 0.05 + rnd() * 0.12,
      delay: rnd() * 0.28,
      rotX: (rnd() - 0.5) * 1.4,
      rotY: (rnd() - 0.5) * 1.8,
      rotZ: (rnd() - 0.5) * 1.2,
      drift: 0.2 + rnd() * 0.45,
      phase: rnd() * Math.PI * 2,
    });
  }
  return out;
}

function easeOutCubic(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return 1 - Math.pow(1 - x, 3);
}

/** Gold-leaf field — Y driven by Framer Motion scroll progress (0→1). */
function GoldFlakeField({
  scrollProgress,
  lite,
}: {
  scrollProgress: React.MutableRefObject<number>;
  lite: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const smoothed = useRef(0);
  const t = useRef(0);
  const count = lite ? 28 : 56;
  const seeds = useMemo(() => makeSeeds(count), [count]);
  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D4AF37",
        metalness: 1,
        roughness: 0.2,
        envMapIntensity: lite ? 1.1 : 1.6,
        flatShading: true,
      }),
    [lite],
  );

  useEffect(() => {
    return () => {
      geom.dispose();
      material.dispose();
    };
  }, [geom, material]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.033);
    t.current += dt;

    smoothed.current = THREE.MathUtils.damp(
      smoothed.current,
      scrollProgress.current,
      2.2,
      dt,
    );
    const p = smoothed.current;

    for (let i = 0; i < seeds.length; i++) {
      const mesh = g.children[i] as THREE.Mesh | undefined;
      if (!mesh) continue;
      const s = seeds[i];
      const local = easeOutCubic(
        THREE.MathUtils.clamp(
          (p - s.delay) / Math.max(0.001, 1 - s.delay),
          0,
          1,
        ),
      );

      // Fall dynamically with scroll — hero → second section
      mesh.position.y = s.y0 - s.fall * local;
      mesh.position.x =
        s.x + Math.sin(t.current * 0.55 + s.phase) * s.drift * (0.35 + local);
      mesh.position.z = s.z;

      mesh.rotation.x += dt * s.rotX * (0.4 + local);
      mesh.rotation.y += dt * s.rotY * (0.5 + local);
      mesh.rotation.z += dt * s.rotZ * (0.35 + local);

      mesh.scale.set(s.sx, s.sy, s.sz);
      mesh.visible = true;
    }
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          geometry={geom}
          material={material}
          position={[s.x, s.y0, s.z]}
          scale={[s.sx, s.sy, s.sz]}
          castShadow={false}
          receiveShadow={false}
        />
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#fff6e8" />
      <directionalLight position={[4, 5, 3]} intensity={1.4} color="#FFE7B0" />
      <directionalLight position={[-3, 2, -2]} intensity={0.7} color="#D4AF37" />
      <pointLight
        position={[2, 1.5, 3]}
        intensity={1.2}
        color="#E8D5A3"
        distance={18}
      />
      <pointLight
        position={[-2.5, 0.8, 2]}
        intensity={0.65}
        color="#D4AF37"
        distance={14}
      />
      <Environment preset="studio" environmentIntensity={0.55} />
    </>
  );
}

class Boundary extends Component<
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
 * Fixed full-viewport gold flakes.
 * Scroll Y bound via Framer Motion `useScroll` — flakes fall from hero into section 2.
 */
export function GoldFlakes() {
  const scrollProgress = useRef(0);
  const [ok, setOk] = useState(true);
  const [lite, setLite] = useState(false);
  const [range, setRange] = useState(1400);

  const { scrollY } = useScroll();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOk(false);
      return;
    }
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setLite(narrow);

    const measure = () => {
      // Cover hero exit + second section entry
      setRange(Math.max(window.innerHeight * 1.55, 900));
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Bind flake fall to Framer Motion scroll position
  useMotionValueEvent(scrollY, "change", (y) => {
    scrollProgress.current = THREE.MathUtils.clamp(y / range, 0, 1);
  });

  useEffect(() => {
    scrollProgress.current = THREE.MathUtils.clamp(
      (scrollY.get() || 0) / range,
      0,
      1,
    );
  }, [range, scrollY]);

  if (!ok) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Boundary onError={() => setOk(false)}>
        <Canvas
          dpr={lite ? [1, 1.35] : [1, 2]}
          camera={{ position: [0, 0.2, 6.2], fov: 42, near: 0.1, far: 60 }}
          gl={{
            alpha: true,
            antialias: !lite,
            powerPreference: lite ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.pointerEvents = "none";
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            pointerEvents: "none",
          }}
        >
          <Suspense fallback={null}>
            <Lights />
            <GoldFlakeField scrollProgress={scrollProgress} lite={lite} />
          </Suspense>
        </Canvas>
      </Boundary>
    </div>
  );
}
