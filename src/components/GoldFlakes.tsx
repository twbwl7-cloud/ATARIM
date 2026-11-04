"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import * as THREE from "three";

type Particle = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
};

function PremiumFlakes({ count = 70 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 0.05 + 0.015,
      speed: Math.random() * 0.2 + 0.1,
    }));
  }, [count]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        -(scrollY * 0.015),
        0.1,
      );
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((data, i) => (
        <Float
          key={i}
          speed={data.speed}
          rotationIntensity={2}
          floatIntensity={3}
        >
          <mesh
            position={data.position}
            rotation={data.rotation}
            scale={data.scale}
          >
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="#D4AF37"
              emissive="#3a2a00"
              metalness={1}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              reflectivity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        intensity={2}
        angle={0.15}
        penumbra={1}
        color="#FFF2D8"
      />
      <spotLight
        position={[-10, -10, -10]}
        intensity={1}
        angle={0.15}
        penumbra={1}
        color="#D4AF37"
      />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <PremiumFlakes />
      <EffectComposer enableNormalPass={false} multisampling={4}>
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.2}
          bokehScale={3}
        />
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          intensity={0.4}
        />
      </EffectComposer>
    </>
  );
}

/**
 * Fixed full-viewport gold flakes.
 * Load only via: dynamic(() => import('@/components/GoldFlakes'), { ssr: false })
 */
function GoldFlakes() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          display: "block",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.pointerEvents = "none";
          gl.domElement.style.width = "100%";
          gl.domElement.style.height = "100%";
          gl.domElement.style.display = "block";
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default GoldFlakes;
export { GoldFlakes };
