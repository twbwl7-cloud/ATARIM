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

type FlakeSeed = {
  x: number;
  z: number;
  /** Base Y when progress = 0 (above / in upper hero) */
  y0: number;
  /** How far it falls across full progress */
  fall: number;
  sx: number;
  sy: number;
  sz: number;
  delay: number;
  rotAxis: THREE.Vector3;
  rotSpeed: number;
  driftAmp: number;
  driftFreq: number;
  phase: number;
  tumble: number;
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

function makeSeeds(count: number): FlakeSeed[] {
  const rnd = mulberry32(0xa01df1a);
  const seeds: FlakeSeed[] = [];
  for (let i = 0; i < count; i++) {
    const w = 0.06 + rnd() * 0.14;
    const h = 0.008 + rnd() * 0.018;
    const d = 0.045 + rnd() * 0.11;
    seeds.push({
      x: (rnd() - 0.5) * 8.5,
      z: (rnd() - 0.5) * 4.2,
      y0: 2.2 + rnd() * 2.8,
      fall: 5.5 + rnd() * 4.2,
      sx: w,
      sy: h,
      sz: d,
      delay: rnd() * 0.35,
      rotAxis: new THREE.Vector3(
        rnd() - 0.5,
        rnd() - 0.5,
        rnd() - 0.5,
      ).normalize(),
      rotSpeed: 0.35 + rnd() * 0.85,
      driftAmp: 0.15 + rnd() * 0.35,
      driftFreq: 0.2 + rnd() * 0.35,
      phase: rnd() * Math.PI * 2,
      tumble: 0.4 + rnd() * 1.2,
    });
  }
  return seeds;
}

function easeInOutCubic(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function FlakeField({
  progress,
  lite,
}: {
  progress: React.MutableRefObject<number>;
  lite: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const damp = useRef(0);
  const time = useRef(0);
  const count = lite ? 22 : 48;
  const seeds = useMemo(() => makeSeeds(count), [count]);

  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const mats = useMemo(() => {
    const tones = ["#D4AF37", "#C5A059", "#E0C992", "#B8963E"];
    return seeds.map((_, i) => {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(tones[i % tones.length]),
        metalness: 0.95,
        roughness: 0.22,
        envMapIntensity: lite ? 0.85 : 1.35,
        flatShading: true,
      });
    });
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

    damp.current = THREE.MathUtils.damp(
      damp.current,
      progress.current,
      1.8,
      dt,
    );
    const p = damp.current;

    for (let i = 0; i < seeds.length; i++) {
      const mesh = g.children[i] as THREE.Mesh | undefined;
      if (!mesh) continue;
      const s = seeds[i];
      const local = easeInOutCubic(
        THREE.MathUtils.clamp(
          (p - s.delay * 0.5) / Math.max(0.001, 1 - s.delay * 0.35),
          0,
          1,
        ),
      );

      mesh.position.y = s.y0 - s.fall * local;
      mesh.position.x =
        s.x +
        Math.sin(time.current * s.driftFreq + s.phase) *
          s.driftAmp *
          (0.4 + local);
      mesh.position.z = s.z + Math.cos(time.current * s.driftFreq * 0.7) * 0.08;

      mesh.rotateOnAxis(s.rotAxis, dt * s.rotSpeed * (0.55 + local * 0.9));
      mesh.rotation.x += dt * s.tumble * 0.15 * (0.3 + local);

      // Thin gold-leaf scale
      mesh.scale.set(s.sx, s.sy, s.sz);

      // Soft presence — denser as they enter mid-scroll
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(0.15, 0.92, easeInOutCubic(local * 1.1));
      mat.transparent = true;
      mesh.visible = local > 0.01 || p > 0.02;
    }
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          geometry={geom}
          material={mats[i]}
          position={[s.x, s.y0, s.z]}
          scale={[s.sx, s.sy, s.sz]}
          frustumCulled
        />
      ))}
    </group>
  );
}

function FlakeLights({ lite }: { lite: boolean }) {
  return (
    <>
      <ambientLight intensity={0.45} color="#fff8ec" />
      <directionalLight
        position={[5, 4, 3]}
        intensity={1.15}
        color="#FFE9B8"
      />
      <directionalLight
        position={[-4, 2, -2]}
        intensity={0.55}
        color="#D4AF37"
      />
      <pointLight
        position={[2.5, 1.5, 3]}
        intensity={lite ? 0.6 : 1.0}
        color="#E8D5A3"
        distance={16}
        decay={2}
      />
      {!lite ? (
        <pointLight
          position={[-2.8, 0.5, 2]}
          intensity={0.45}
          color="#D4AF37"
          distance={14}
          decay={2}
        />
      ) : null}
    </>
  );
}

class FlakeErrorBoundary extends Component<
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
 * Fixed full-viewport gold-leaf flakes.
 * Scroll progress: page top → deep into the second section.
 * pointer-events: none — never blocks UI.
 */
export function GoldFlakes() {
  const progress = useRef(0);
  const [ok, setOk] = useState(true);
  const [lite, setLite] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!canUseWebGL()) {
      setOk(false);
      return;
    }
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOk(false);
      return;
    }
    setLite(isWeakGpu() || narrow);

    const update = () => {
      // Hero → second section continuous fall
      // ~1.35–1.6 viewports covers hero exit + portals entry
      const range = Math.max(window.innerHeight * 1.45, 720);
      const y = window.scrollY || 0;
      progress.current = THREE.MathUtils.clamp(y / range, 0, 1);
      // Pause render work far below the cascade range
      setVisible(y < range * 1.85);
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

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      lenis?.off("scroll", update);
    };
  }, []);

  if (!ok) return null;

  return (
    <div
      aria-hidden
      className="gold-flakes-layer"
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
      <FlakeErrorBoundary onError={() => setOk(false)}>
        <Canvas
          dpr={lite ? [1, 1.25] : [1, 1.75]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0.15, 6.4], fov: 40, near: 0.1, far: 50 }}
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
            <FlakeLights lite={lite} />
            <FlakeField progress={progress} lite={lite} />
          </Suspense>
        </Canvas>
      </FlakeErrorBoundary>
    </div>
  );
}
