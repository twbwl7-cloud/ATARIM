"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import React, {
  Component,
  Suspense,
  useMemo,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const VOID_DAY = "#c5eef8";
const VOID_NIGHT = "#050a12";
const GLB_CANDIDATES = [
  "/models/MacbookProProledXDR4K.glb",
  "/models/macbook-pro-proledxdr-4k.glb",
  "/models/MacbookPro.glb",
];

/** Soft XDR wallpaper — vertical light streaks like Sketchfab ProledXDR. */
function screenMaterial() {
  return new THREE.ShaderMaterial({
    transparent: false,
    side: THREE.FrontSide,
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uGlow;
      varying vec2 vUv;

      float hash(float n){ return fract(sin(n) * 43758.5453); }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.08;

        float streaks = 0.0;
        for (int i = 0; i < 10; i++) {
          float fi = float(i);
          float x = hash(fi * 12.7) * 0.9 + 0.05;
          float w = 0.014 + hash(fi * 3.1) * 0.04;
          float speed = 0.12 + hash(fi * 7.3) * 0.4;
          float yShift = fract(uv.y * 0.4 + t * speed + hash(fi));
          float band = exp(-pow((uv.x - x) / w, 2.0));
          float soft = smoothstep(0.0, 0.5, yShift) * (1.0 - smoothstep(0.5, 1.0, yShift));
          streaks += band * soft * (0.55 + hash(fi * 1.9) * 0.5);
        }

        vec3 deep = vec3(0.04, 0.1, 0.16);
        vec3 cyan = vec3(0.12, 0.72, 0.86);
        vec3 ice = vec3(0.55, 0.92, 0.98);
        vec3 white = vec3(0.92, 0.98, 1.0);

        vec3 col = mix(deep, cyan, streaks * 0.8);
        col = mix(col, ice, smoothstep(0.35, 0.9, streaks) * 0.75);
        col = mix(col, white, smoothstep(0.65, 1.25, streaks) * 0.55);

        float cx = length(uv - vec2(0.5, 0.48));
        col += (1.0 - smoothstep(0.0, 0.55, cx)) * uGlow * vec3(0.1, 0.35, 0.42);

        float vig = smoothstep(1.2, 0.3, length(uv - 0.5));
        col *= mix(0.72, 1.0, vig);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

function alu(color = "#1a1c20") {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.92,
    roughness: 0.32,
  });
}

function ProceduralMacbook({ intensity }: { intensity: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const screenMat = useMemo(() => screenMaterial(), []);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const bodyMat = useMemo(() => alu("#1c1e22"), []);
  const darkMat = useMemo(() => alu("#12141a"), []);
  const keyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0e1014"),
        metalness: 0.4,
        roughness: 0.55,
      }),
    [],
  );
  const padMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#15171c"),
        metalness: 0.55,
        roughness: 0.45,
      }),
    [],
  );
  const bezelMat = useMemo(() => alu("#0a0b0e"), []);
  const notchMat = useMemo(() => alu("#050608"), []);

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.06);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.06);
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Lower-band framing: laptop fills the bottom scene under sky copy
    const aspect = state.viewport.aspect || 1;
    const narrow = aspect < 0.85;
    const camZ0 = narrow ? 4.6 : 3.35;
    const camY0 = narrow ? 0.95 : 1.05;
    const modelScale = narrow ? 0.9 : 1.05;
    const modelY = narrow ? -0.18 : -0.28;

    screenMat.uniforms.uTime.value = t;
    screenMat.uniforms.uGlow.value = g;

    if (root.current) {
      root.current.rotation.y = mx * 0.28 + Math.sin(t * 0.25) * 0.04;
      root.current.rotation.x = -0.22 - my * 0.08 + Math.sin(t * 0.35) * 0.015;
      root.current.rotation.z = mx * -0.02;
      const breath = modelScale * (1 + Math.sin(t * 0.95) * 0.008 + g * 0.1);
      root.current.scale.setScalar(breath);
      root.current.position.y = modelY + Math.sin(t * 0.8) * 0.025;
      root.current.position.z = g * 0.5;
    }

    state.camera.position.z = THREE.MathUtils.lerp(camZ0, narrow ? 0.7 : 0.45, g);
    state.camera.position.x = mx * 0.18 * (1 - g * 0.75);
    state.camera.position.y = camY0 + my * 0.1 * (1 - g * 0.6) - g * 0.15;
    state.camera.lookAt(0, (narrow ? 0.35 : 0.28) + g * 0.35, root.current?.position.z ?? 0);
  });

  // Product-shot proportions — open lid built in XZ (closed), then hinged open
  const W = 2.55;
  const D = 1.72;
  const H = 0.055;
  const screenW = 2.38;
  const screenH = 1.52;
  // 0 = closed flat; ~-1.95 ≈ 112° open facing camera (like Sketchfab ref)
  const openAngle = -1.95;

  const keys = useMemo(() => {
    const items: { x: number; z: number; w: number; d: number }[] = [];
    const rows = 5;
    const cols = 14;
    const startX = -1.02;
    const startZ = -0.08;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        items.push({
          x: startX + c * 0.155,
          z: startZ - r * 0.13,
          w: 0.1,
          d: 0.09,
        });
      }
    }
    return items;
  }, []);

  return (
    <Float speed={0.7} rotationIntensity={0.02} floatIntensity={0.08}>
      <group ref={root}>
        {/* base */}
        <mesh castShadow receiveShadow material={bodyMat} position={[0, 0, 0.12]}>
          <boxGeometry args={[W, H, D]} />
        </mesh>
        <mesh material={darkMat} position={[0, H * 0.55, 0.02]}>
          <boxGeometry args={[W * 0.94, 0.008, D * 0.7]} />
        </mesh>

        {keys.map((k, i) => (
          <mesh key={i} material={keyMat} position={[k.x, H * 0.7 + 0.006, k.z]}>
            <boxGeometry args={[k.w, 0.012, k.d]} />
          </mesh>
        ))}

        <mesh material={padMat} position={[0, H * 0.7 + 0.004, 0.58]}>
          <boxGeometry args={[0.82, 0.01, 0.5]} />
        </mesh>

        <mesh
          material={bodyMat}
          position={[0, H * 0.35, -D / 2 + 0.14]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, W * 0.92, 16]} />
        </mesh>

        {/* lid in XZ when closed; screen faces -Y (down); opens toward camera */}
        <group position={[0, H * 0.45, -D / 2 + 0.14]} rotation={[openAngle, 0, 0]}>
          {/* aluminum lid back */}
          <mesh material={bodyMat} position={[0, 0.016, screenH / 2 + 0.02]}>
            <boxGeometry args={[W, 0.032, screenH + 0.1]} />
          </mesh>
          {/* bezel */}
          <mesh material={bezelMat} position={[0, -0.001, screenH / 2 + 0.02]}>
            <boxGeometry args={[screenW + 0.08, 0.01, screenH + 0.08]} />
          </mesh>
          {/* active display — plane faces -Y when closed, toward camera when open */}
          <mesh
            material={screenMat}
            position={[0, -0.008, screenH / 2 + 0.02]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[screenW, screenH]} />
          </mesh>
          {/* notch */}
          <mesh material={notchMat} position={[0, -0.01, 0.06]}>
            <boxGeometry args={[0.24, 0.01, 0.05]} />
          </mesh>
          <mesh position={[0, -0.016, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.012, 16]} />
            <meshStandardMaterial color="#1c1812" metalness={0.8} roughness={0.2} />
          </mesh>
          <pointLight position={[0, -0.35, screenH / 2]} intensity={1.15} color="#5eebf5" distance={5} />
          <pointLight position={[0, -0.12, screenH / 2]} intensity={0.6} color="#18c4e0" distance={3} />
        </group>

        <pointLight position={[1.6, 2.4, 2.2]} intensity={1.1} color="#e8fcff" distance={12} />
        <pointLight position={[-1.4, 1.4, 1.6]} intensity={0.5} color="#18c4e0" distance={9} />
        <spotLight
          position={[0, 3.8, 2.8]}
          angle={0.48}
          penumbra={0.7}
          intensity={1.4}
          color="#dff8fc"
        />
      </group>
    </Float>
  );
}

function fitGlb(root: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  root.scale.setScalar(2.85 / maxDim);
}

function GlbMacbook({
  intensity,
  path,
}: {
  intensity: MotionValue<number>;
  path: string;
}) {
  const root = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    fitGlb(c);
    c.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.06);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.06);
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const aspect = state.viewport.aspect || 1;
    const narrow = aspect < 0.85;
    const camZ0 = narrow ? 4.6 : 3.35;
    const camY0 = narrow ? 0.95 : 1.05;
    const modelScale = narrow ? 0.9 : 1.05;

    if (root.current) {
      root.current.rotation.y = mx * 0.28 + Math.sin(t * 0.22) * 0.04;
      root.current.rotation.x = -0.2 - my * 0.08;
      root.current.scale.setScalar(modelScale * (1 + Math.sin(t * 0.9) * 0.008 + g * 0.1));
      root.current.position.z = g * 0.5;
      root.current.position.y = narrow ? -0.18 : -0.28;
    }

    state.camera.position.z = THREE.MathUtils.lerp(camZ0, narrow ? 0.7 : 0.42, g);
    state.camera.position.x = mx * 0.16 * (1 - g * 0.75);
    state.camera.position.y = camY0 + my * 0.09 * (1 - g * 0.6) - g * 0.12;
    state.camera.lookAt(0, (narrow ? 0.35 : 0.28) + g * 0.3, root.current?.position.z ?? 0);
  });

  return (
    <Float speed={0.7} rotationIntensity={0.02} floatIntensity={0.08}>
      <group ref={root}>
        <primitive object={cloned} />
        <pointLight position={[1.6, 2.4, 2.2]} intensity={1.15} color="#e8fcff" distance={12} />
        <pointLight position={[-1.4, 1.4, 1.6]} intensity={0.5} color="#18c4e0" distance={9} />
        <spotLight position={[0, 3.8, 2.8]} angle={0.48} penumbra={0.7} intensity={1.4} color="#dff8fc" />
      </group>
    </Float>
  );
}

function MacbookSwitcher({ intensity }: { intensity: MotionValue<number> }) {
  const [glbPath, setGlbPath] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const path of GLB_CANDIDATES) {
        try {
          const r = await fetch(path, { method: "HEAD" });
          if (r.ok && !cancelled) {
            setGlbPath(path);
            return;
          }
        } catch {
          /* next */
        }
      }
      if (!cancelled) setGlbPath(null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (glbPath) return <GlbMacbook intensity={intensity} path={glbPath} />;
  return <ProceduralMacbook intensity={intensity} />;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} color="#e8fcff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#18c4e0" />
    </>
  );
}

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

/** Static product shot when WebGL is missing/fails — never leave an empty slab */
function HeroFallback({ theme = "day" }: { theme?: "day" | "night" }) {
  const night = theme === "night";
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${night ? "bg-[#050a12]" : "bg-[#c5eef8]"}`}
      aria-hidden
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          night
            ? "bg-[radial-gradient(ellipse_at_50%_40%,rgba(24,196,224,0.22),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(94,235,245,0.12),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_50%_30%,rgba(94,235,245,0.5),transparent_52%),radial-gradient(ellipse_at_70%_80%,rgba(24,196,224,0.22),transparent_48%)]"
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 top-[6%] flex items-end justify-center px-3 sm:px-8 md:px-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/macbook-ref.jpg"
          alt=""
          width={1600}
          height={1000}
          decoding="async"
          className={`h-[min(72%,28rem)] w-auto max-w-[min(100%,52rem)] object-contain object-bottom sm:h-[min(78%,34rem)] ${
            night
              ? "drop-shadow-[0_32px_60px_rgba(0,0,0,0.65)]"
              : "drop-shadow-[0_28px_50px_rgba(10,22,40,0.2)]"
          }`}
          style={night ? undefined : { mixBlendMode: "multiply" }}
        />
      </div>
    </div>
  );
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void; theme: "day" | "night" },
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
    if (this.state.failed) return <HeroFallback theme={this.props.theme} />;
    return this.props.children;
  }
}

export function HeroScene({
  intensity,
  theme = "day",
}: {
  intensity: MotionValue<number>;
  theme?: "day" | "night";
}) {
  const [ok, setOk] = useState(true);
  const voidColor = theme === "night" ? VOID_NIGHT : VOID_DAY;

  useEffect(() => {
    if (!canUseWebGL()) setOk(false);
  }, []);

  if (!ok) return <HeroFallback theme={theme} />;

  return (
    <div
      className={`absolute inset-0 ${theme === "night" ? "bg-[#050a12]" : "bg-[#c5eef8]"}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          theme === "night"
            ? "bg-[radial-gradient(ellipse_at_50%_40%,rgba(24,196,224,0.18),transparent_52%),radial-gradient(circle_at_50%_78%,rgba(94,235,245,0.1),transparent_58%)]"
            : "bg-[radial-gradient(ellipse_at_50%_38%,rgba(94,235,245,0.4),transparent_52%),radial-gradient(circle_at_50%_78%,rgba(24,196,224,0.18),transparent_58%)]"
        }`}
      />
      <SceneErrorBoundary theme={theme} onError={() => setOk(false)}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.35, 3.6], fov: 30 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(voidColor, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.14;
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => {
                e.preventDefault();
                setOk(false);
              },
              { once: true },
            );
          }}
        >
          <Suspense fallback={null}>
            <Lights />
            <Environment preset="city" environmentIntensity={0.4} />
            <MacbookSwitcher intensity={intensity} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
