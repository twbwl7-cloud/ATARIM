"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { HeroGlassMark } from "@/components/HeroGlassMark";

type Pointer = { x: number; y: number };

/** Quiet glass knot — sized to stay clear of copy */
const BASE_SCALE = 0.5;

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

function GlassFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <HeroGlassMark />
    </div>
  );
}

function ChampagneKnot({
  pointer,
  lite,
}: {
  pointer: MutableRefObject<Pointer>;
  lite: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const dt = Math.min(delta, 0.033);
    target.current.x = THREE.MathUtils.damp(
      target.current.x,
      pointer.current.x,
      4.5,
      dt,
    );
    target.current.y = THREE.MathUtils.damp(
      target.current.y,
      pointer.current.y,
      4.5,
      dt,
    );

    g.rotation.y += dt * 0.14;
    g.rotation.x += dt * 0.045;
    // Parked start-side (visual right in RTL), raised for first viewport
    g.position.x = -1.55 + target.current.x * 0.16;
    g.position.y = 0.05 + target.current.y * 0.12;
    g.position.z = -0.85;
  });

  const segments = lite ? ([56, 10] as const) : ([96, 18] as const);

  return (
    <group ref={group} scale={BASE_SCALE}>
      <mesh frustumCulled>
        <torusKnotGeometry
          args={[1.05, 0.32, segments[0], segments[1], 2, 3]}
        />
        <meshPhysicalMaterial
          color="#e8d5a3"
          metalness={0.42}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={0.85}
          transmission={lite ? 0.28 : 0.48}
          thickness={1.15}
          ior={1.42}
          transparent
          opacity={0.92}
          envMapIntensity={lite ? 0.85 : 1.25}
          attenuationColor="#D4AF37"
          attenuationDistance={2.2}
        />
      </mesh>
    </group>
  );
}

function Lights({ lite }: { lite: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={1.05} color="#fff8ec" />
      <directionalLight
        position={[-3.5, 2, -2]}
        intensity={0.55}
        color="#D4AF37"
      />
      <pointLight
        position={[1.8, 1.2, 2.2]}
        intensity={0.7}
        color="#E8D5A3"
        distance={10}
      />
      {!lite ? <Environment preset="studio" /> : null}
    </>
  );
}

class GlassErrorBoundary extends Component<
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
    if (this.state.failed) return <GlassFallback />;
    return this.props.children;
  }
}

/**
 * Champagne glass knot over a CSS glassmorphism mark.
 * Mark always shows; WebGL adds depth when available.
 */
export function HeroGlass() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const reduce = useRef(false);
  const [ok, setOk] = useState(true);
  const [lite, setLite] = useState(false);
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!canUseWebGL()) {
      setOk(false);
      return;
    }

    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setLite(isWeakGpu() || narrow);

    const onMove = (e: PointerEvent) => {
      if (reduce.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.x = nx;
      pointer.current.y = -ny;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const host = hostRef.current;
    let io: IntersectionObserver | undefined;
    if (host && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { rootMargin: "80px", threshold: 0.05 },
      );
      io.observe(host);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      io?.disconnect();
    };
  }, []);

  if (!ok) return <GlassFallback />;

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    >
      {/* Always-on glassmorphism base — never a flat white disc */}
      <HeroGlassMark />
      <GlassErrorBoundary onError={() => setOk(false)}>
        <Canvas
          dpr={lite ? [1, 1.5] : [1, 2]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0.22, 5.1], fov: 34, near: 0.1, far: 40 }}
          gl={{
            alpha: true,
            antialias: !lite,
            powerPreference: lite ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(
              Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2),
            );
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.touchAction = "none";
            gl.domElement.style.pointerEvents = "none";
            gl.domElement.style.opacity = "0.72";
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
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            pointerEvents: "none",
            transform: "translateZ(0)",
          }}
        >
          <Suspense fallback={null}>
            <Lights lite={lite} />
            <ChampagneKnot pointer={pointer} lite={lite} />
          </Suspense>
        </Canvas>
      </GlassErrorBoundary>
    </div>
  );
}
