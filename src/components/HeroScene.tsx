"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const VOID = "#050a14";
const GLB_PATH = "/models/POKEBALL_COSMIC.glb";

/**
 * POKEBALL // Nebula Orb — procedural twin of the Sketchfab cosmic ball
 * (Atahan3D / CC-BY). Drop POKEBALL_COSMIC.glb into public/models to use the original.
 */
function nebulaMaterial() {
  return new THREE.ShaderMaterial({
    transparent: false,
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uGlow;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorld;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        float a = hash(i); float b = hash(i+vec2(1.,0.));
        float c = hash(i+vec2(0.,1.)); float d = hash(i+vec2(1.,1.));
        vec2 u = f*f*(3.-2.*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v=0.; float a=.5;
        for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.05; a*=.55; }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.12;
        // swirling nebula bands
        float swirl = fbm(uv * 4.5 + vec2(t, -t*0.7));
        float swirl2 = fbm(uv * 7.0 + vec2(-t*1.2, t*0.9) + swirl);
        float n = mix(swirl, swirl2, 0.55);

        vec3 deep = vec3(0.05, 0.02, 0.12);
        vec3 blue = vec3(0.15, 0.35, 0.95);
        vec3 mag = vec3(0.75, 0.15, 0.85);
        vec3 pink = vec3(0.95, 0.35, 0.7);
        vec3 col = mix(deep, blue, smoothstep(0.2, 0.55, n));
        col = mix(col, mag, smoothstep(0.45, 0.75, n));
        col = mix(col, pink, smoothstep(0.7, 0.95, n) * 0.65);

        // star flecks
        float stars = step(0.985, hash(uv * 180.0 + floor(uTime*2.0)));
        col += stars * vec3(0.9, 0.95, 1.0);

        // fresnel rim
        float fres = pow(1.0 - max(dot(normalize(vNormal), vec3(0.,0.,1.)), 0.), 2.2);
        col += fres * vec3(0.35, 0.55, 1.0) * (0.35 + uGlow * 0.5);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

function ProceduralNebulaOrb({ intensity }: { intensity: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const band = useRef<THREE.Mesh>(null);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const shellMat = useMemo(() => nebulaMaterial(), []);
  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1e28"),
        metalness: 1,
        roughness: 0.28,
        emissive: new THREE.Color("#0a1020"),
        emissiveIntensity: 0.15,
      }),
    [],
  );
  const buttonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a3140"),
        metalness: 1,
        roughness: 0.2,
      }),
    [],
  );
  const vortexMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c44dff"),
        emissive: new THREE.Color("#ff4dcc"),
        emissiveIntensity: 1.4,
        roughness: 0.3,
        metalness: 0.2,
      }),
    [],
  );
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e0b45a"),
        emissive: new THREE.Color("#e0b45a"),
        emissiveIntensity: 0.35,
        metalness: 1,
        roughness: 0.15,
      }),
    [],
  );
  const cyanMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3cb8ff"),
        emissive: new THREE.Color("#3cb8ff"),
        emissiveIntensity: 0.6,
        metalness: 0.85,
        roughness: 0.22,
        transparent: true,
        opacity: 0.75,
      }),
    [],
  );

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.07);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.07);
    const mx = mouse.current.x;
    const my = mouse.current.y;

    shellMat.uniforms.uTime.value = t;
    shellMat.uniforms.uGlow.value = g;

    if (root.current) {
      root.current.rotation.y = t * 0.18 + mx * 0.45;
      root.current.rotation.x = -my * 0.35 + Math.sin(t * 0.3) * 0.05;
      const breath = 1 + Math.sin(t * 1.15) * 0.02 + g * 0.42;
      root.current.scale.setScalar(breath);
      root.current.position.z = 0.2 + g * 0.6; // optical pop
    }
    if (core.current) {
      core.current.rotation.y = -t * 0.35;
    }
    if (band.current) {
      band.current.rotation.z = Math.sin(t * 0.4) * 0.02;
    }

    state.camera.position.z = THREE.MathUtils.lerp(3.5, 0.45, g);
    state.camera.position.x = mx * 0.14 * (1 - g * 0.5);
    state.camera.position.y = 0.05 + my * 0.1 * (1 - g * 0.5);
    state.camera.lookAt(0, 0, root.current?.position.z ?? 0);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.4}>
      <group ref={root}>
        {/* nebula hemispheres */}
        <mesh ref={core} material={shellMat}>
          <sphereGeometry args={[0.85, 64, 64]} />
        </mesh>

        {/* equatorial metal band */}
        <mesh ref={band} rotation={[0, 0, 0]} material={metalMat}>
          <torusGeometry args={[0.86, 0.07, 24, 80]} />
        </mesh>
        {/* star windows on band */}
        {[-1.2, -0.4, 0.4, 1.2].map((a, i) => (
          <mesh
            key={i}
            position={[Math.sin(a) * 0.86, 0, Math.cos(a) * 0.86]}
            rotation={[0, a, 0]}
            material={goldMat}
          >
            <boxGeometry args={[0.12, 0.08, 0.02]} />
          </mesh>
        ))}

        {/* center button rings + vortex */}
        <group position={[0, 0, 0.82]}>
          <mesh material={buttonMat}>
            <cylinderGeometry args={[0.22, 0.22, 0.06, 48]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} material={metalMat}>
            <torusGeometry args={[0.16, 0.018, 16, 48]} />
          </mesh>
          <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]} material={vortexMat}>
            <circleGeometry args={[0.1, 48]} />
          </mesh>
        </group>

        {/* parallax orbit rings — stereo pop */}
        <mesh rotation={[1.15, 0.3, 0]} material={goldMat} position={[0, 0, 0.05]}>
          <torusGeometry args={[1.05, 0.008, 16, 100]} />
        </mesh>
        <mesh rotation={[0.6, 0.9, 0.2]} position={[0, 0, 0.1]} material={cyanMat}>
          <torusGeometry args={[1.22, 0.005, 12, 90]} />
        </mesh>

        <pointLight position={[0.6, 0.5, 1.2]} intensity={1.3} color="#9ec8ff" distance={6} />
        <pointLight position={[-0.5, -0.2, 1]} intensity={0.8} color="#ff66cc" distance={5} />
        <pointLight position={[0, 0.2, 1.5]} intensity={0.55} color="#ffffff" distance={4} />
        <spotLight position={[0, 1.2, 2]} angle={0.5} penumbra={0.6} intensity={1.1} color="#c8e0ff" />
      </group>
    </Float>
  );
}

function GlbNebulaOrb({ intensity }: { intensity: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const { scene } = useGLTF(GLB_PATH);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.07);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.07);
    const mx = mouse.current.x;
    const my = mouse.current.y;
    if (root.current) {
      root.current.rotation.y = t * 0.2 + mx * 0.4;
      root.current.rotation.x = -my * 0.3;
      root.current.scale.setScalar(1.15 + Math.sin(t * 1.1) * 0.02 + g * 0.4);
      root.current.position.z = 0.15 + g * 0.55;
    }
    state.camera.position.z = THREE.MathUtils.lerp(3.5, 0.45, g);
    state.camera.position.x = mx * 0.12 * (1 - g * 0.5);
    state.camera.position.y = 0.05 + my * 0.09 * (1 - g * 0.5);
    state.camera.lookAt(0, 0, root.current?.position.z ?? 0);
  });

  return (
    <Float speed={1.15} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={root}>
        <primitive object={cloned} />
        <pointLight position={[0.6, 0.5, 1.2]} intensity={1.2} color="#9ec8ff" distance={6} />
        <pointLight position={[-0.5, 0.2, 0.9]} intensity={0.7} color="#ff66cc" distance={5} />
      </group>
    </Float>
  );
}

function OrbSwitcher({ intensity }: { intensity: MotionValue<number> }) {
  const [useGlb, setUseGlb] = useState(false);
  useEffect(() => {
    fetch(GLB_PATH, { method: "HEAD" })
      .then((r) => setUseGlb(r.ok))
      .catch(() => setUseGlb(false));
  }, []);
  if (useGlb) return <GlbNebulaOrb intensity={intensity} />;
  return <ProceduralNebulaOrb intensity={intensity} />;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 5, 3]} intensity={1.05} color="#eef4ff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#6a3a8c" />
    </>
  );
}

export function HeroScene({ intensity }: { intensity: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 bg-[#050a14]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(120,60,180,0.18),transparent_48%),radial-gradient(circle_at_50%_55%,rgba(40,120,220,0.14),transparent_52%)]" />
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.05, 3.5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(VOID, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="night" environmentIntensity={0.4} />
          <OrbSwitcher intensity={intensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
