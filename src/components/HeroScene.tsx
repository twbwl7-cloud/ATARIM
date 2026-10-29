"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { orbitSignals } from "@/lib/site";

/**
 * Spinning maison sphere — book psychology + Luxe Barber signals orbit the ball.
 * doks: Tier-2 3D object · P16 design proof · A05 presence without noise.
 */
function SignalLabel({
  label,
  source,
  position,
}: {
  label: string;
  source: "book" | "barber";
  position: [number, number, number];
}) {
  return (
    <Html position={position} center distanceFactor={6} style={{ pointerEvents: "none" }}>
      <div
        className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] tracking-[0.14em] backdrop-blur-md md:text-[11px] ${
          source === "barber"
            ? "border-gold/45 bg-rich-black/75 text-gold-bright"
            : "border-platinum/35 bg-rich-black/70 text-platinum"
        }`}
      >
        {label}
      </div>
    </Html>
  );
}

function SpinningSphere() {
  const root = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  const shell = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#14161c"),
        metalness: 0.95,
        roughness: 0.22,
        emissive: new THREE.Color("#1a1216"),
        emissiveIntensity: 0.22,
      }),
    [],
  );

  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a15b"),
        metalness: 1,
        roughness: 0.12,
        emissive: new THREE.Color("#c9a15b"),
        emissiveIntensity: 0.28,
      }),
    [],
  );

  const platinum = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d8d2c6"),
        metalness: 0.8,
        roughness: 0.18,
        emissive: new THREE.Color("#9a9488"),
        emissiveIntensity: 0.1,
      }),
    [],
  );

  const points = useMemo(() => {
    return orbitSignals.map((s, i) => {
      const phi = Math.acos(-1 + (2 * i) / orbitSignals.length);
      const theta = Math.sqrt(orbitSignals.length * Math.PI) * phi;
      const r = 1.15;
      return {
        ...s,
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
        ] as [number, number, number],
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = t * 0.28;
      root.current.rotation.x = Math.sin(t * 0.2) * 0.12;
    }
    if (ball.current) {
      ball.current.rotation.y = -t * 0.15;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.45;
      ring.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <group ref={root} scale={0.95} position={[0.1, 0.05, 0]}>
      <mesh ref={ball} material={shell}>
        <sphereGeometry args={[0.62, 48, 48]} />
      </mesh>
      {/* latitude grooves — luxury watch feel */}
      <mesh material={gold} scale={1.01}>
        <torusGeometry args={[0.62, 0.008, 12, 96]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={platinum} scale={1.01}>
        <torusGeometry args={[0.62, 0.005, 12, 80]} />
      </mesh>
      <mesh ref={ring} material={gold}>
        <torusGeometry args={[0.92, 0.01, 16, 100]} />
      </mesh>
      <mesh rotation={[0.9, 0.4, 0.2]} material={platinum}>
        <torusGeometry args={[0.78, 0.005, 12, 80]} />
      </mesh>

      {points.map((p) => (
        <SignalLabel
          key={p.label}
          label={p.label}
          source={p.source}
          position={p.position}
        />
      ))}

      <pointLight position={[0.5, 0.4, 0.8]} intensity={0.7} color="#c9a15b" distance={5} />
      <pointLight position={[-0.6, -0.3, 0.5]} intensity={0.3} color="#d4a8b5" distance={4} />
    </group>
  );
}

function VoidLights() {
  return (
    <>
      <ambientLight intensity={0.14} />
      <directionalLight position={[3, 4, 2]} intensity={1} color="#f5efe4" />
      <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#7a2e3a" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-y-0 end-[-6%] -z-0 w-[min(58vw,560px)] md:end-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,161,91,0.14),transparent_55%)]" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <Suspense fallback={null}>
          <VoidLights />
          <Stars radius={42} depth={32} count={1200} factor={2} saturation={0} fade speed={0.3} />
          <SpinningSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
