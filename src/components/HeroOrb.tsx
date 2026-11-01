"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function LiquidTorus() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.x = t * 0.18 + mouse.current.y * 0.18;
    mesh.rotation.y = t * 0.26 + mouse.current.x * 0.28;
    mesh.rotation.z = Math.sin(t * 0.2) * 0.12;
    mesh.position.x = THREE.MathUtils.lerp(
      mesh.position.x,
      mouse.current.x * 0.35,
      0.04,
    );
    mesh.position.y = THREE.MathUtils.lerp(
      mesh.position.y,
      -mouse.current.y * 0.2,
      0.04,
    );
  });

  const geom = useMemo(
    () => new THREE.TorusKnotGeometry(0.85, 0.28, 160, 24),
    [],
  );

  return (
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.22}>
      <mesh ref={ref} geometry={geom} scale={1.12}>
        <meshPhysicalMaterial
          color="#12141c"
          metalness={0.35}
          roughness={0.2}
          transmission={0.72}
          thickness={1.1}
          ior={1.45}
          transparent
          opacity={0.95}
          envMapIntensity={1.1}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          attenuationColor="#D4AF37"
          attenuationDistance={1.6}
        />
      </mesh>
      <pointLight
        position={[2.2, 1.4, 2]}
        intensity={1.35}
        color="#E6C280"
        distance={9}
      />
      <pointLight
        position={[-2, -1, 1.5]}
        intensity={0.45}
        color="#7ad7e8"
        distance={8}
      />
      <spotLight
        position={[0, 3.2, 2]}
        angle={0.55}
        penumbra={0.7}
        intensity={0.8}
        color="#f5f0e4"
      />
    </Float>
  );
}

/** Hypnotic frosted knot behind the hero headline — fine-pointer WebGL only */
export function HeroOrb() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl") || c.getContext("experimental-webgl");
      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setOk(Boolean(gl) && fine && !reduce);
    } catch {
      setOk(false);
    }
  }, []);

  if (!ok) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,175,55,0.12),transparent_55%),radial-gradient(ellipse_at_60%_70%,rgba(94,235,245,0.06),transparent_50%)]"
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 opacity-85" aria-hidden>
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <LiquidTorus />
      </Canvas>
    </div>
  );
}
