"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Premium hero pearl — inspired by depth-agency oyster/pearl presence:
 * one luminous object, quiet motion, no floating UI clutter.
 */
function Pearl() {
  const group = useRef<THREE.Group>(null);
  const pearl = useRef<THREE.Mesh>(null);

  const shellMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a2230"),
        metalness: 0.85,
        roughness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
        emissive: new THREE.Color("#0c1626"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  const pearlMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#f2ebe0"),
        metalness: 0.15,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        iridescence: 1,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [120, 420],
        emissive: new THREE.Color("#d4a84b"),
        emissiveIntensity: 0.08,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d4a84b"),
        metalness: 1,
        roughness: 0.16,
        emissive: new THREE.Color("#d4a84b"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }
    if (pearl.current) {
      pearl.current.rotation.y = -t * 0.35;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={group} scale={1.15} position={[0, -0.05, 0]}>
        {/* lower cradle / shell cup */}
        <mesh
          material={shellMat}
          rotation={[Math.PI / 2.4, 0.2, 0.15]}
          position={[0, -0.28, 0]}
          scale={[1.15, 1.15, 0.55]}
        >
          <sphereGeometry args={[0.7, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* pearl */}
        <mesh ref={pearl} material={pearlMat} position={[0, 0.12, 0.05]}>
          <sphereGeometry args={[0.42, 64, 64]} />
        </mesh>

        {/* thin gold orbit ring */}
        <mesh rotation={[1.2, 0.3, 0]} material={goldMat}>
          <torusGeometry args={[0.78, 0.008, 16, 100]} />
        </mesh>

        <pointLight position={[0.4, 0.5, 0.8]} intensity={0.9} color="#f0c86a" distance={5} />
        <pointLight position={[-0.6, 0.2, 0.4]} intensity={0.35} color="#7ec8c8" distance={4} />
        <pointLight position={[0, -0.4, 0.6]} intensity={0.25} color="#a88bc8" distance={3} />
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} color="#efe9de" />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#5a468c" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 md:inset-y-0 md:end-[-4%] md:start-auto md:w-[min(58vw,640px)]">
      {/* atmospheric glow behind object — depth-style nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_48%,rgba(56,140,140,0.2),transparent_42%),radial-gradient(circle_at_58%_55%,rgba(90,70,140,0.16),transparent_48%),radial-gradient(circle_at_50%_50%,rgba(212,168,75,0.08),transparent_55%)]" />
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.15, 3.2], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="city" environmentIntensity={0.35} />
          <Pearl />
        </Suspense>
      </Canvas>
    </div>
  );
}
