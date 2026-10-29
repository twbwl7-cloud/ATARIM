"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** Compact orbital craft — small, space-void, not a giant jewelry blob */
function OrbitalCore() {
  const root = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const sat = useRef<THREE.Group>(null);

  const hull = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1c22"),
        metalness: 0.85,
        roughness: 0.35,
        emissive: new THREE.Color("#0e1520"),
        emissiveIntensity: 0.35,
      }),
    [],
  );

  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a962"),
        metalness: 1,
        roughness: 0.18,
        emissive: new THREE.Color("#c9a962"),
        emissiveIntensity: 0.25,
      }),
    [],
  );

  const ice = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#9eb7c8"),
        metalness: 0.4,
        roughness: 0.25,
        emissive: new THREE.Color("#6a8a9e"),
        emissiveIntensity: 0.15,
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
      {/* core body */}
      <mesh material={hull}>
        <octahedronGeometry args={[0.38, 0]} />
      </mesh>
      <mesh material={accent} scale={0.42}>
        <octahedronGeometry args={[0.38, 0]} />
      </mesh>

      {/* thin orbital ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.15, 0.25, 0]} material={accent}>
        <torusGeometry args={[0.72, 0.012, 16, 96]} />
      </mesh>
      <mesh rotation={[1.1, 0.5, 0.4]} material={ice}>
        <torusGeometry args={[0.55, 0.006, 12, 80]} />
      </mesh>

      {/* micro satellites */}
      <group ref={sat}>
        <mesh position={[0.95, 0.12, 0]} material={accent}>
          <sphereGeometry args={[0.035, 16, 16]} />
        </mesh>
        <mesh position={[-0.7, -0.25, 0.35]} material={ice}>
          <sphereGeometry args={[0.022, 12, 12]} />
        </mesh>
        <mesh position={[0.2, 0.7, -0.4]} material={hull}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
        </mesh>
      </group>

      {/* soft bloom stand-in */}
      <pointLight position={[0.4, 0.3, 0.6]} intensity={0.55} color="#c9a962" distance={4} />
      <pointLight position={[-0.5, -0.2, 0.4]} intensity={0.35} color="#8eb4c8" distance={3} />
    </group>
  );
}

function VoidLights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 2]} intensity={0.9} color="#e8eef5" />
      <directionalLight position={[-4, -1, -2]} intensity={0.35} color="#4a5a70" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-y-0 end-[-8%] -z-0 w-[min(56vw,520px)] md:end-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,169,98,0.08),transparent_55%)]" />
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
          <Stars radius={40} depth={30} count={900} factor={2.2} saturation={0} fade speed={0.4} />
          <OrbitalCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
