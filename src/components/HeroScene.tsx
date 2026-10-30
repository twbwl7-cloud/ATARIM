"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const VOID = "#050a14";

/**
 * Exact pearl craft — glass orb + brand spiral inside + optical parallax pop.
 */
function IllusionPearl({ intensity }: { intensity: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const face = useRef<THREE.Mesh>(null);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const map = useTexture("/brand/emblem.png");
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c8d8e8"),
        metalness: 0,
        roughness: 0.05,
        transmission: 0.92,
        thickness: 0.65,
        ior: 1.4,
        transparent: true,
        opacity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.2,
      }),
    [],
  );

  const faceMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map,
        transparent: true,
        roughness: 0.2,
        metalness: 0.15,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        iridescence: 0.9,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 380],
        emissive: new THREE.Color("#1a6aaa"),
        emissiveMap: map,
        emissiveIntensity: 0.6,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [map],
  );

  const cradleMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a2230"),
        metalness: 0.9,
        roughness: 0.28,
        clearcoat: 0.6,
        emissive: new THREE.Color("#0c1626"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e0b45a"),
        emissive: new THREE.Color("#e0b45a"),
        emissiveIntensity: 0.35,
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
        roughness: 0.22,
        transparent: true,
        opacity: 0.65,
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
      // Whole assembly tilts toward pointer — pops out of the glass
      root.current.rotation.y = mx * 0.4 + Math.sin(t * 0.25) * 0.04;
      root.current.rotation.x = -my * 0.32 + Math.cos(t * 0.3) * 0.035;
      const breath = 1 + Math.sin(t * 1.2) * 0.025 + g * 0.4;
      root.current.scale.setScalar(breath);
      root.current.position.z = 0.12 + g * 0.5;
    }

    // Inner spiral shifts MORE than cradle → stereoscopic illusion
    if (inner.current) {
      inner.current.position.x = mx * 0.12;
      inner.current.position.y = my * 0.1;
      inner.current.position.z = 0.06 + Math.abs(mx) * 0.04;
      inner.current.rotation.z = t * 0.1;
    }

    if (rings.current) {
      rings.current.position.x = mx * 0.22;
      rings.current.position.y = my * 0.18;
      rings.current.rotation.y = t * 0.15;
      rings.current.rotation.x = t * 0.08;
    }

    if (face.current) {
      (face.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.55 + g * 1.0 + Math.sin(t * 2.2) * 0.07;
    }

    state.camera.position.z = THREE.MathUtils.lerp(3.5, 0.5, g);
    state.camera.position.x = mx * 0.12 * (1 - g * 0.5);
    state.camera.position.y = 0.08 + my * 0.09 * (1 - g * 0.5);
    state.camera.lookAt(0, 0, root.current?.position.z ?? 0);
  });

  return (
    <Float speed={1.15} rotationIntensity={0.14} floatIntensity={0.36}>
      <group ref={root} position={[0, -0.02, 0]}>
        {/* dark cradle — same as pearl hero */}
        <mesh
          material={cradleMat}
          rotation={[Math.PI / 2.35, 0.12, 0.08]}
          position={[0, -0.32, 0]}
          scale={[1.2, 1.2, 0.55]}
        >
          <sphereGeometry args={[0.72, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* brand spiral — replaces the white pearl as the living core */}
        <group ref={inner} position={[0, 0.16, 0.12]}>
          <mesh ref={face} material={faceMat}>
            <circleGeometry args={[0.58, 96]} />
          </mesh>
        </group>

        {/* glass pearl shell — optical depth around the spiral */}
        <mesh material={glassMat} position={[0, 0.16, 0.1]}>
          <sphereGeometry args={[0.62, 64, 64]} />
        </mesh>

        {/* parallax rings — leap toward you */}
        <group ref={rings}>
          <mesh rotation={[1.2, 0.25, 0]} material={goldMat}>
            <torusGeometry args={[0.82, 0.008, 16, 100]} />
          </mesh>
          <mesh rotation={[0.55, 0.9, 0.2]} material={cyanMat}>
            <torusGeometry args={[1.05, 0.005, 12, 90]} />
          </mesh>
          <mesh rotation={[1.4, -0.4, 0.3]} material={goldMat}>
            <torusGeometry args={[1.22, 0.004, 12, 80]} />
          </mesh>
        </group>

        <pointLight position={[0.45, 0.5, 1]} intensity={1.15} color="#f0c86a" distance={5} />
        <pointLight position={[-0.5, 0.15, 0.7]} intensity={0.55} color="#7ec8ff" distance={4} />
        <pointLight position={[0, 0.2, 1.3]} intensity={0.45} color="#ffffff" distance={3.5} />
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
    <div className="absolute inset-0 bg-[#050a14]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(56,140,140,0.16),transparent_48%),radial-gradient(circle_at_50%_52%,rgba(224,180,90,0.1),transparent_52%)]" />
      <Canvas
        dpr={[1, 1.65]}
        camera={{ position: [0, 0.08, 3.5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(VOID, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
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
