"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function OrganicCrystal({ pointer }: { pointer: MutableRefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    target.current.x = THREE.MathUtils.lerp(
      target.current.x,
      pointer.current.x,
      0.06,
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      pointer.current.y,
      0.06,
    );

    g.rotation.y += delta * 0.18;
    g.rotation.x += delta * 0.06;
    g.rotation.z = target.current.x * 0.22;
    g.position.x = target.current.x * 0.55;
    g.position.y = target.current.y * 0.35;
  });

  return (
    <group ref={group} scale={1.05}>
      <mesh castShadow>
        <torusKnotGeometry args={[1.05, 0.34, 256, 48, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={768}
          transmission={1}
          roughness={0.18}
          thickness={1.55}
          ior={1.42}
          chromaticAberration={0.035}
          anisotropy={0.12}
          distortion={0.12}
          distortionScale={0.35}
          temporalDistortion={0.08}
          color="#f7f4ef"
          attenuationColor="#C5A059"
          attenuationDistance={2.8}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={1.35} color="#fff8ef" />
      <directionalLight position={[-3, 2, -4]} intensity={0.55} color="#c5a059" />
      <Environment preset="studio" />
    </>
  );
}

/** Slow-rotating frosted crystal — mouse parallax */
export function HeroGlass() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onMove = (e: PointerEvent) => {
      if (reduce.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.x = nx;
      pointer.current.y = -ny;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 4.6], fov: 38, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <OrganicCrystal pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
