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

type Pointer = { x: number; y: number };

/** ~40% of previous hero scale — quiet titanium presence */
const BASE_SCALE = 0.42;

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

/** Small grey orb, offset away from headline */
function GlassFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div className="absolute start-[6%] bottom-[14%] h-[min(22vw,11rem)] w-[min(22vw,11rem)] sm:start-[10%] sm:bottom-[18%] sm:h-[min(18vw,10rem)] sm:w-[min(18vw,10rem)]">
        <div className="hero-glass-fallback absolute inset-0 rounded-full" />
        <div className="hero-glass-fallback-core absolute inset-[18%] rounded-full" />
      </div>
    </div>
  );
}

function TitaniumKnot({
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

    target.current.x = THREE.MathUtils.lerp(
      target.current.x,
      pointer.current.x,
      0.045,
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      pointer.current.y,
      0.045,
    );

    g.rotation.y += delta * 0.12;
    g.rotation.x += delta * 0.04;
    // Soft parallax only — keep object parked bottom-start, clear of copy
    g.position.x = -1.55 + target.current.x * 0.18;
    g.position.y = -0.85 + target.current.y * 0.12;
    g.position.z = -1.1;
  });

  const segments = lite ? ([72, 12] as const) : ([128, 24] as const);

  return (
    <group ref={group} scale={BASE_SCALE}>
      <mesh>
        <torusKnotGeometry
          args={[1.05, 0.34, segments[0], segments[1], 2, 3]}
        />
        <meshPhysicalMaterial
          color="#9a9ea6"
          metalness={0.72}
          roughness={0.38}
          clearcoat={0.45}
          clearcoatRoughness={0.28}
          reflectivity={0.55}
          envMapIntensity={lite ? 0.55 : 0.9}
          transparent
          opacity={0.78}
        />
      </mesh>
    </group>
  );
}

function Lights({ lite }: { lite: boolean }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#f5f5f5" />
      <directionalLight
        position={[-4, 1, -3]}
        intensity={0.35}
        color="#a38a5f"
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

/** Compact grey titanium knot — offset, never over the headline */
export function HeroGlass() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const reduce = useRef(false);
  const [ok, setOk] = useState(true);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!canUseWebGL()) {
      setOk(false);
      return;
    }
    setLite(isWeakGpu());

    const onMove = (e: PointerEvent) => {
      if (reduce.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.x = nx;
      pointer.current.y = -ny;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!ok) return <GlassFallback />;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <GlassErrorBoundary onError={() => setOk(false)}>
        <Canvas
          dpr={lite ? [1, 1] : [1, 1.5]}
          camera={{ position: [0, 0.1, 5.2], fov: 36, near: 0.1, far: 40 }}
          gl={{
            alpha: true,
            antialias: !lite,
            powerPreference: lite ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => {
                e.preventDefault();
                setOk(false);
              },
              { once: true },
            );
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Lights lite={lite} />
            <TitaniumKnot pointer={pointer} lite={lite} />
          </Suspense>
        </Canvas>
      </GlassErrorBoundary>
    </div>
  );
}
