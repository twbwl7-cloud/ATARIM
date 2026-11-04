"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type Particle = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

function Flakes({ particles }: { particles: Particle[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // סיבוב תמידי איטי ויוקרתי
      groupRef.current.rotation.y += 0.001;

      // הורדת הפתיתים למטה בהתאם לגלילה של המשתמש
      const scrollY = window.scrollY;
      groupRef.current.position.y = -(scrollY * 0.012);
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((data, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={1.5}
          floatIntensity={2}
        >
          <mesh
            position={data.position}
            rotation={data.rotation}
            scale={data.scale}
          >
            {/* צורת יהלום/פתית */}
            <octahedronGeometry args={[1, 0]} />
            {/* חומר מתכתי - זהב יוקרתי */}
            <meshStandardMaterial
              color="#D4AF37"
              metalness={1}
              roughness={0.15}
              envMapIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/**
 * Fixed full-viewport gold flakes — pointer-events none, z-index 50.
 * Scroll moves the group down so flakes travel with the page.
 */
export function GoldFlakes() {
  // Client-only random seeds (avoid SSR mismatch)
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 100 }, () => ({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: Math.random() * 0.08 + 0.02,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // קריטי כדי שתוכל ללחוץ על כפתורים באתר
        zIndex: 50, // מוודא שזה מעל רוב האלמנטים
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.pointerEvents = "none";
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2.5}
          color="#ffffff"
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={1.5}
          color="#D4AF37"
        />
        <Flakes particles={particles} />
      </Canvas>
    </div>
  );
}

export default GoldFlakes;
