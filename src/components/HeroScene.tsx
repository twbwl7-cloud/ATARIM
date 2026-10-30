"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const VOID = "#050a14";

/**
 * Pearl recipe + logo spiral core + optical parallax pop.
 * Inner sphere = emblem. Outer = glass. Cradle + rings = depth illusion.
 */
function IllusionPearl({ intensity }: { intensity: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const map = useTexture("/brand/emblem-sphere.jpg");
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  map.wrapS = map.wrapT = THREE.ClampToEdgeWrapping;

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  const coreMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map,
        roughness: 0.22,
        metalness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        iridescence: 1,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 420],
        emissive: new THREE.Color("#1a6aaa"),
        emissiveMap: map,
        emissiveIntensity: 0.7,
      }),
    [map],
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d8e4f0"),
        metalness: 0,
        roughness: 0.04,
        transmission: 0.88,
        thickness: 0.55,
        ior: 1.45,
        transparent: true,
        opacity: 0.55,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.3,
      }),
    [],
  );

  const cradleMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a2230"),
        metalness: 0.9,
        roughness: 0.28,
        clearcoat: 0.65,
        emissive: new THREE.Color("#0c1626"),
        emissiveIntensity: 0.22,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e0b45a"),
        emissive: new THREE.Color("#e0b45a"),
        emissiveIntensity: 0.38,
        metalness: 1,
        roughness: 0.12,
      }),
    [],
  );

  const cyanMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3cb8ff"),
        emissive: new THREE.Color("#3cb8ff"),
        emissiveIntensity: 0.55,
        metalness: 0.85,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = glow.current;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.07);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.07);
    const mx = mouse.current.x;
    const my = mouse.current.y;

    if (root.current) {
      root.current.rotation.y = mx * 0.42 + Math.sin(t * 0.22) * 0.04;
      root.current.rotation.x = -my * 0.34 + Math.cos(t * 0.28) * 0.03;
      const breath = 1 + Math.sin(t * 1.2) * 0.025 + g * 0.4;
      root.current.scale.setScalar(breath);
      // push toward camera = optical pop out of the screen
      root.current.position.z = 0.15 + g * 0.55;
    }

    if (core.current) {
      // core spins slower + shifts more than cradle → stereo depth
      core.current.rotation.y = t * 0.22 + mx * 0.15;
      core.current.position.x = mx * 0.1;
      core.current.position.y = 0.18 + my * 0.08;
      (core.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.65 + g * 1.05 + Math.sin(t * 2.3) * 0.08;
    }

    if (rings.current) {
      rings.current.position.x = mx * 0.24;
      rings.current.position.y = my * 0.2;
      rings.current.rotation.y = t * 0.18;
      rings.current.rotation.z = t * 0.1;
    }

    state.camera.position.z = THREE.MathUtils.lerp(3.55, 0.48, g);
    state.camera.position.x = mx * 0.12 * (1 - g * 0.5);
    state.camera.position.y = 0.08 + my * 0.09 * (1 - g * 0.5);
    state.camera.lookAt(0, 0.1, root.current?.position.z ?? 0);
  });

  return (
    <Float speed={1.15} rotationIntensity={0.14} floatIntensity={0.38}>
      <group ref={root} position={[0, -0.04, 0]}>
        {/* cradle */}
        <mesh
          material={cradleMat}
          rotation={[Math.PI / 2.4, 0.15, 0.1]}
          position={[0, -0.3, -0.02]}
          scale={[1.1, 1.1, 0.52]}
        >
          <sphereGeometry args={[0.7, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* LOGO SPIRAL = the pearl */}
        <mesh ref={core} material={coreMat} position={[0, 0.18, 0.12]}>
          <sphereGeometry args={[0.5, 64, 64]} />
        </mesh>

        {/* glass shell */}
        <mesh material={glassMat} position={[0, 0.18, 0.1]}>
          <sphereGeometry args={[0.58, 64, 64]} />
        </mesh>

        {/* parallax rings */}
        <group ref={rings}>
          <mesh rotation={[1.2, 0.3, 0]} material={goldMat}>
            <torusGeometry args={[0.82, 0.008, 16, 100]} />
          </mesh>
          <mesh rotation={[0.55, 0.85, 0.2]} material={cyanMat}>
            <torusGeometry args={[1.02, 0.005, 12, 90]} />
          </mesh>
          <mesh rotation={[1.35, -0.35, 0.25]} material={goldMat}>
            <torusGeometry args={[1.2, 0.004, 12, 80]} />
          </mesh>
        </group>

        <pointLight position={[0.45, 0.5, 1]} intensity={1.2} color="#f0c86a" distance={5} />
        <pointLight position={[-0.5, 0.2, 0.8]} intensity={0.6} color="#7ec8ff" distance={4} />
        <pointLight position={[0, 0.25, 1.4]} intensity={0.5} color="#ffffff" distance={3.5} />
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 5, 3]} intensity={1.05} color="#efe9de" />
      <directionalLight position={[-3, 1, -2]} intensity={0.3} color="#5a468c" />
    </>
  );
}

export function HeroScene({ intensity }: { intensity: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 bg-[#050a14]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(56,140,140,0.16),transparent_48%),radial-gradient(circle_at_50%_52%,rgba(224,180,90,0.1),transparent_52%)]" />
      <Canvas
        dpr={[1, 1.65]}
        camera={{ position: [0, 0.08, 3.55], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(VOID, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.14;
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="city" environmentIntensity={0.35} />
          <IllusionPearl intensity={intensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
