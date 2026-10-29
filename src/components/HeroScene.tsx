"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** Compact orbital craft — maison metals: champagne + platinum + rose */
function OrbitalCore() {
  const root = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const sat = useRef<THREE.Group>(null);

  const hull = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#12141a"),
        metalness: 0.92,
        roughness: 0.28,
        emissive: new THREE.Color("#1a1214"),
        emissiveIntensity: 0.28,
      }),
    [],
  );

  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a15b"),
        metalness: 1,
        roughness: 0.14,
        emissive: new THREE.Color("#c9a15b"),
        emissiveIntensity: 0.32,
      }),
    [],
  );

  const platinum = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d8d2c6"),
        metalness: 0.75,
        roughness: 0.2,
        emissive: new THREE.Color("#9a9488"),
        emissiveIntensity: 0.12,
      }),
    [],
  );

  const rose = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a08a"),
        metalness: 0.9,
        roughness: 0.22,
        emissive: new THREE.Color("#7a2e3a"),
        emissiveIntensity: 0.12,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = t * 0.22;
      root.current.rotation.x = Math.sin(t * 0.35) * 0.08;
    }
    if (ring.current) ring.current.rotation.z = t * 0.55;
    if (sat.current) sat.current.rotation.y = -t * 0.9;
  });

  return (
    <group ref={root} scale={0.72} position={[0.15, 0.05, 0]}>
      <mesh material={hull}>
        <octahedronGeometry args={[0.38, 0]} />
      </mesh>
      <mesh material={accent} scale={0.42}>
        <octahedronGeometry args={[0.38, 0]} />
      </mesh>

      <mesh ref={ring} rotation={[Math.PI / 2.15, 0.25, 0]} material={accent}>
        <torusGeometry args={[0.72, 0.012, 16, 96]} />
      </mesh>
      <mesh rotation={[1.1, 0.5, 0.4]} material={platinum}>
        <torusGeometry args={[0.55, 0.006, 12, 80]} />
      </mesh>

      <group ref={sat}>
        <mesh position={[0.95, 0.12, 0]} material={accent}>
          <sphereGeometry args={[0.035, 16, 16]} />
        </mesh>
        <mesh position={[-0.7, -0.25, 0.35]} material={rose}>
          <sphereGeometry args={[0.022, 12, 12]} />
        </mesh>
        <mesh position={[0.2, 0.7, -0.4]} material={platinum}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
        </mesh>
      </group>

      <pointLight position={[0.4, 0.3, 0.6]} intensity={0.65} color="#c9a15b" distance={4} />
      <pointLight position={[-0.5, -0.2, 0.4]} intensity={0.28} color="#d4a8b5" distance={3} />
    </group>
  );
}

function VoidLights() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[3, 4, 2]} intensity={0.95} color="#f5efe4" />
      <directionalLight position={[-4, -1, -2]} intensity={0.28} color="#7a2e3a" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-y-0 end-[-8%] -z-0 w-[min(56vw,520px)] md:end-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,161,91,0.12),transparent_55%)]" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <Suspense fallback={null}>
          <VoidLights />
          <Stars radius={40} depth={30} count={1100} factor={2.1} saturation={0} fade speed={0.35} />
          <OrbitalCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
