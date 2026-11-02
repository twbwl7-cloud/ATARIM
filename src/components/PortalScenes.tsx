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

type SceneKind = "precision" | "flow" | "assets";

function canUseWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function SoftLights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 3]} intensity={1.15} color="#fff8e8" />
      <directionalLight position={[-3, 1, -2]} intensity={0.55} color="#d4af37" />
      <pointLight position={[0, 1.2, 2]} intensity={0.45} color="#e8d5a3" />
    </>
  );
}

/** Card 1 — slow spinning wireframe technical mesh */
function PrecisionScene({ lite }: { lite: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.033);
    if (a.current) {
      a.current.rotation.y += d * 0.35;
      a.current.rotation.x += d * 0.12;
    }
    if (b.current) {
      b.current.rotation.y -= d * 0.22;
      b.current.rotation.z += d * 0.08;
    }
  });

  return (
    <group position={[0.55, 0.15, 0]} scale={lite ? 0.92 : 1}>
      <mesh ref={a}>
        <icosahedronGeometry args={[1.15, lite ? 0 : 1]} />
        <meshBasicMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={b} scale={0.72}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          color="#e8d5a3"
          metalness={0.85}
          roughness={0.28}
          emissive="#a38a5f"
          emissiveIntensity={0.22}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh scale={1.45}>
        <torusGeometry args={[1.05, 0.015, 8, lite ? 48 : 72]} />
        <meshBasicMaterial color="#c5a059" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/** Card 2 — orbiting warm spheres (connection / flow) */
function FlowScene({ lite }: { lite: boolean }) {
  const group = useRef<THREE.Group>(null);
  const s1 = useRef<THREE.Mesh>(null);
  const s2 = useRef<THREE.Mesh>(null);
  const s3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    if (s1.current) {
      s1.current.position.x = Math.cos(t * 0.7) * 0.85;
      s1.current.position.y = Math.sin(t * 0.55) * 0.35 + 0.1;
      s1.current.position.z = Math.sin(t * 0.7) * 0.55;
    }
    if (s2.current) {
      s2.current.position.x = Math.cos(t * 0.55 + 2.1) * 1.05;
      s2.current.position.y = Math.cos(t * 0.4) * 0.4 - 0.05;
      s2.current.position.z = Math.sin(t * 0.55 + 2.1) * 0.7;
    }
    if (s3.current) {
      s3.current.position.x = Math.cos(t * 0.4 + 4.2) * 0.55;
      s3.current.position.y = Math.sin(t * 0.65 + 1) * 0.5 + 0.15;
      s3.current.position.z = Math.sin(t * 0.4 + 4.2) * 0.45;
      const pulse = 0.85 + Math.sin(t * 1.4) * 0.12;
      s3.current.scale.setScalar(pulse);
    }
  });

  const segs = lite ? 16 : 28;

  return (
    <group ref={group} position={[0.45, 0.05, 0]}>
      <mesh ref={s1}>
        <sphereGeometry args={[0.48, segs, segs]} />
        <meshPhysicalMaterial
          color="#d4af37"
          roughness={0.25}
          metalness={0.35}
          clearcoat={0.6}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh ref={s2}>
        <sphereGeometry args={[0.36, segs, segs]} />
        <meshPhysicalMaterial
          color="#e8d5a3"
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.45}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={s3}>
        <sphereGeometry args={[0.28, segs, segs]} />
        <meshPhysicalMaterial
          color="#c5a059"
          roughness={0.35}
          metalness={0.25}
          emissive="#a38a5f"
          emissiveIntensity={0.18}
          transparent
          opacity={0.75}
        />
      </mesh>
      {!lite ? (
        <mesh>
          <torusGeometry args={[1.15, 0.02, 8, 64]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.35} />
        </mesh>
      ) : null}
    </group>
  );
}

/** Card 3 — levitating frosted architectural blocks */
function AssetsScene({ lite }: { lite: boolean }) {
  const g = useRef<THREE.Group>(null);
  const boxes = useMemo(
    () => [
      { pos: [0.35, 0.35, 0] as const, size: [0.85, 0.85, 0.85] as const, phase: 0 },
      { pos: [-0.15, -0.15, 0.35] as const, size: [0.65, 0.65, 0.65] as const, phase: 1.2 },
      { pos: [0.75, -0.25, -0.2] as const, size: [0.55, 0.55, 0.55] as const, phase: 2.4 },
      { pos: [0.1, 0.7, -0.35] as const, size: [0.42, 0.42, 0.42] as const, phase: 3.1 },
    ],
    [],
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (g.current) g.current.rotation.y = t * 0.15;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const ph = boxes[i].phase;
      mesh.position.y = boxes[i].pos[1] + Math.sin(t * 0.85 + ph) * 0.18;
      mesh.rotation.x = t * 0.2 + ph * 0.2;
      mesh.rotation.z = t * 0.12 + ph * 0.15;
    });
  });

  return (
    <group ref={g} position={[0.35, 0.1, 0]} scale={lite ? 0.95 : 1.05}>
      {boxes.map((box, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[box.pos[0], box.pos[1], box.pos[2]]}
          castShadow={!lite}
        >
          <boxGeometry args={[...box.size]} />
          {lite ? (
            <meshStandardMaterial
              color="#e8d5a3"
              roughness={0.35}
              metalness={0.2}
              transparent
              opacity={0.72}
            />
          ) : (
            <meshPhysicalMaterial
              color="#f3efe6"
              roughness={0.18}
              metalness={0.08}
              transmission={0.55}
              thickness={0.6}
              ior={1.4}
              transparent
              opacity={0.85}
              attenuationColor="#d4af37"
              attenuationDistance={1.2}
            />
          )}
        </mesh>
      ))}
    </group>
  );
}

function Scene({ kind, lite }: { kind: SceneKind; lite: boolean }) {
  if (kind === "precision") return <PrecisionScene lite={lite} />;
  if (kind === "flow") return <FlowScene lite={lite} />;
  return <AssetsScene lite={lite} />;
}

class PortalErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function CssFallback({ kind }: { kind: SceneKind }) {
  if (kind === "precision") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute end-[8%] top-[12%] h-28 w-28 animate-[spin_18s_linear_infinite] rounded-full border-2 border-[#D4AF37]/60 opacity-70" />
        <div className="absolute end-[14%] top-[20%] h-16 w-16 animate-[spin_12s_linear_infinite_reverse] border border-[#C5A059]/50 opacity-60" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
      </div>
    );
  }
  if (kind === "flow") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute end-[10%] top-[15%] h-24 w-24 animate-pulse rounded-full bg-[#D4AF37]/45 blur-2xl" />
        <div className="absolute end-[25%] top-[40%] h-20 w-20 animate-pulse rounded-full bg-[#C5A059]/40 blur-2xl" />
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute end-[12%] top-[18%] h-20 w-20 rotate-12 rounded-xl border border-[#D4AF37]/50 bg-[#E8D5A3]/40 shadow-lg" />
      <div className="absolute end-[28%] top-[38%] h-16 w-16 -rotate-6 rounded-xl border border-[#C5A059]/45 bg-[#F3EFE6]/50 shadow-md" />
    </div>
  );
}

/** Shared R3F canvas for portal card backgrounds */
export function PortalSceneCanvas({ kind }: { kind: SceneKind }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(true);
  const [lite, setLite] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!canUseWebGL()) {
      setOk(false);
      return;
    }
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setLite(narrow);

    const host = hostRef.current;
    let io: IntersectionObserver | undefined;
    if (host && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { rootMargin: "60px", threshold: 0.05 },
      );
      io.observe(host);
    }
    return () => io?.disconnect();
  }, []);

  if (reduce || !ok) return <CssFallback kind={kind} />;

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-0 [contain:strict]"
      aria-hidden
    >
      <PortalErrorBoundary fallback={<CssFallback kind={kind} />}>
        <Canvas
          dpr={lite ? [1, 1] : [1, 1.25]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0.2, 4.2], fov: 38, near: 0.1, far: 30 }}
          gl={{
            alpha: true,
            antialias: !lite,
            powerPreference: "low-power",
            stencil: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.pointerEvents = "none";
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
            transform: "translateZ(0)",
          }}
        >
          <Suspense fallback={null}>
            <SoftLights />
            <Scene kind={kind} lite={lite} />
          </Suspense>
        </Canvas>
      </PortalErrorBoundary>
    </div>
  );
}
