"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

/**
 * Luminous pearl portal — camera plunges on scroll (A05 / Z-axis plunge).
 */
function Pearl({ intensity }: { intensity: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const pearl = useRef<THREE.Mesh>(null);
  const glow = useRef(0);

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  const shellMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a2230"),
        metalness: 0.88,
        roughness: 0.32,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
        emissive: new THREE.Color("#0c1626"),
        emissiveIntensity: 0.25,
      }),
    [],
  );

  const pearlMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#f2ebe0"),
        metalness: 0.12,
        roughness: 0.14,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        iridescence: 1,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 480],
        emissive: new THREE.Color("#d4a84b"),
        emissiveIntensity: 0.12,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d4a84b"),
        metalness: 1,
        roughness: 0.14,
        emissive: new THREE.Color("#d4a84b"),
        emissiveIntensity: 0.25,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    if (group.current) {
      group.current.rotation.y = t * 0.12 + g * 0.8;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.06;
      const s = 1 + g * 0.35;
      group.current.scale.setScalar(s);
    }
    if (pearl.current) {
      pearl.current.rotation.y = -t * 0.28;
      (pearl.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.12 + g * 0.9;
    }
    // Camera plunge on Z
    state.camera.position.z = THREE.MathUtils.lerp(3.2, 0.55, g);
    state.camera.position.y = THREE.MathUtils.lerp(0.12, 0, g);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.28}>
      <group ref={group} position={[0, -0.02, 0]}>
        <mesh
          material={shellMat}
          rotation={[Math.PI / 2.4, 0.15, 0.1]}
          position={[0, -0.28, 0]}
          scale={[1.15, 1.15, 0.55]}
        >
          <sphereGeometry args={[0.7, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh ref={pearl} material={pearlMat} position={[0, 0.12, 0.05]}>
          <sphereGeometry args={[0.42, 64, 64]} />
        </mesh>
        <mesh rotation={[1.2, 0.3, 0]} material={goldMat}>
          <torusGeometry args={[0.78, 0.008, 16, 100]} />
        </mesh>
        <mesh rotation={[0.4, 0.8, 0.2]} material={goldMat}>
          <torusGeometry args={[1.05, 0.004, 12, 80]} />
        </mesh>
        <pointLight position={[0.4, 0.5, 0.8]} intensity={1} color="#f0c86a" distance={6} />
        <pointLight position={[-0.6, 0.2, 0.4]} intensity={0.4} color="#7ec8c8" distance={5} />
        <pointLight position={[0, 0.1, 0.2]} intensity={0.35} color="#efe9de" distance={3} />
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 5, 3]} intensity={1.05} color="#efe9de" />
      <directionalLight position={[-3, 1, -2]} intensity={0.3} color="#5a468c" />
    </>
  );
}

export function HeroScene({ intensity }: { intensity: MotionValue<number> }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(56,140,140,0.18),transparent_40%),radial-gradient(circle_at_50%_52%,rgba(212,168,75,0.12),transparent_48%),radial-gradient(circle_at_62%_42%,rgba(90,70,140,0.14),transparent_45%)]" />
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.12, 3.2], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="city" environmentIntensity={0.3} />
          <Pearl intensity={intensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
