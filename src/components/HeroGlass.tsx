"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
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

/** Soft / software GPUs struggle with MeshTransmissionMaterial */
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

/** Pearl frosted orb when WebGL is unavailable — keeps hero atmosphere */
function GlassFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <div className="absolute left-1/2 top-[42%] h-[min(58vw,28rem)] w-[min(58vw,28rem)] -translate-x-1/2 -translate-y-1/2">
        <div className="hero-glass-fallback absolute inset-0 rounded-full" />
        <div className="hero-glass-fallback-core absolute inset-[18%] rounded-full" />
      </div>
    </div>
  );
}

function OrganicCrystal({
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
      0.06,
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      pointer.current.y,
      0.06,
    );

    g.rotation.y += delta * 0.18;
    g.rotation.x += delta * 0.06;
    g.rotation.z = target.current.x * 0.22;
    g.position.x = target.current.x * 0.55;
    g.position.y = target.current.y * 0.35;
  });

  const segments = lite ? [96, 16] as const : [180, 32] as const;

  return (
    <group ref={group} scale={lite ? 1.0 : 1.05}>
      <mesh>
        <torusKnotGeometry
          args={[1.05, 0.34, segments[0], segments[1], 2, 3]}
        />
        {lite ? (
          <meshPhysicalMaterial
            color="#f4efe6"
            metalness={0.05}
            roughness={0.22}
            transmission={0.92}
            thickness={1.2}
            ior={1.4}
            transparent
            opacity={0.92}
            envMapIntensity={0.9}
            clearcoat={0.35}
            clearcoatRoughness={0.25}
          />
        ) : (
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={512}
            transmission={1}
            roughness={0.18}
            thickness={1.55}
            ior={1.42}
            chromaticAberration={0.03}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.06}
            color="#f7f4ef"
            attenuationColor="#C5A059"
            attenuationDistance={2.8}
          />
        )}
      </mesh>
    </group>
  );
}

function Lights({ lite }: { lite: boolean }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={1.35} color="#fff8ef" />
      <directionalLight
        position={[-3, 2, -4]}
        intensity={0.55}
        color="#c5a059"
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

/** Slow-rotating frosted crystal — mouse parallax, safe WebGL fallback */
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
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <GlassErrorBoundary onError={() => setOk(false)}>
        <Canvas
          dpr={lite ? [1, 1] : [1, 1.5]}
          camera={{ position: [0, 0.15, 4.6], fov: 38, near: 0.1, far: 40 }}
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
            <OrganicCrystal pointer={pointer} lite={lite} />
          </Suspense>
        </Canvas>
      </GlassErrorBoundary>
    </div>
  );
}
