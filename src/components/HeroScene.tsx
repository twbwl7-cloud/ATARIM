"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const VOID = "#050a14";

/**
 * Living emblem portal — pops out of the void (same color as hero).
 * Scroll drives Z-axis plunge into the spiral.
 */
function EmblemPortal({ intensity }: { intensity: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const map = useTexture("/brand/emblem.png");
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  const mat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map,
      transparent: true,
      roughness: 0.22,
      metalness: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 0.85,
      iridescenceIOR: 1.4,
      iridescenceThicknessRange: [80, 380],
      emissive: new THREE.Color("#1a6aaa"),
      emissiveIntensity: 0.35,
      emissiveMap: map,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [map]);

  const rimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3cb8ff"),
        emissive: new THREE.Color("#3cb8ff"),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.35,
        roughness: 0.2,
        metalness: 1,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e0b45a"),
        emissive: new THREE.Color("#e0b45a"),
        emissiveIntensity: 0.45,
        metalness: 1,
        roughness: 0.18,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    const mx = state.pointer.x;
    const my = state.pointer.y;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mx, 0.06);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, my, 0.06);

    if (group.current) {
      // Parallax tilt — optical pop out of the screen
      group.current.rotation.y =
        mouse.current.x * 0.35 + Math.sin(t * 0.35) * 0.08 + g * 0.4;
      group.current.rotation.x =
        -mouse.current.y * 0.28 + Math.cos(t * 0.4) * 0.06;
      const breath = 1 + Math.sin(t * 1.2) * 0.025 + g * 0.55;
      group.current.scale.setScalar(breath);
      group.current.position.z = g * 0.35;
    }

    if (disc.current) {
      disc.current.rotation.z = t * 0.08;
      (disc.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.35 + g * 1.2 + Math.sin(t * 2) * 0.08;
    }

    // Camera plunge into the spiral
    state.camera.position.z = THREE.MathUtils.lerp(3.35, 0.42, g);
    state.camera.position.x = THREE.MathUtils.lerp(
      0,
      mouse.current.x * 0.15,
      0.08,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      0.05,
      mouse.current.y * 0.1,
      0.08,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.45}>
      <group ref={group}>
        {/* soft cyan bloom plate behind — no hard frame, blends to void */}
        <mesh position={[0, 0, -0.08]} scale={1.35}>
          <circleGeometry args={[1.05, 64]} />
          <meshBasicMaterial
            color="#0a2040"
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0, -0.06]} scale={1.15}>
          <circleGeometry args={[1.05, 64]} />
          <meshBasicMaterial
            color="#12355a"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>

        {/* living emblem disc */}
        <mesh ref={disc} material={mat}>
          <circleGeometry args={[1.05, 96]} />
        </mesh>

        {/* thin gold orbit — depth cue without a “frame” */}
        <mesh rotation={[Math.PI / 2.05, 0.15, 0]} material={goldMat}>
          <torusGeometry args={[1.18, 0.006, 16, 120]} />
        </mesh>
        <mesh rotation={[1.1, 0.5, 0.2]} material={rimMat}>
          <torusGeometry args={[1.32, 0.004, 12, 100]} />
        </mesh>

        <pointLight position={[0.6, 0.5, 1.2]} intensity={1.4} color="#7ec8ff" distance={6} />
        <pointLight position={[-0.7, -0.2, 0.9]} intensity={0.7} color="#e0b45a" distance={5} />
        <pointLight position={[0, 0, 1.6]} intensity={0.55} color="#ffffff" distance={4} />
        <spotLight
          position={[0, 0, 2.4]}
          angle={0.55}
          penumbra={0.7}
          intensity={1.1}
          color="#c8e8ff"
        />
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 2]} intensity={0.85} color="#e8f4ff" />
      <directionalLight position={[-2, -1, -1]} intensity={0.25} color="#5a468c" />
    </>
  );
}

export function HeroScene({ intensity }: { intensity: MotionValue<number> }) {
  return (
    <div className="absolute inset-0">
      {/* same void as hero — emblem never sits on a separate plate */}
      <div className="absolute inset-0 bg-[#050a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(40,120,200,0.22),transparent_48%),radial-gradient(circle_at_50%_52%,rgba(224,180,90,0.1),transparent_55%)]" />
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.05, 3.35], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(VOID, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="city" environmentIntensity={0.28} />
          <EmblemPortal intensity={intensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
