"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

const VOID = "#050a14";

/**
 * Logo spiral with pearl-grade presence + optical pop illusion.
 * Layered depths shift on mouse (stereoscopic parallax). Scroll plunges in.
 */
function OpticalEmblem({ intensity }: { intensity: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const layerA = useRef<THREE.Group>(null);
  const layerB = useRef<THREE.Group>(null);
  const layerC = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);
  const glow = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const map = useTexture("/brand/emblem.png");
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  useMotionValueEvent(intensity, "change", (v) => {
    glow.current = v;
  });

  const faceMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map,
        transparent: true,
        roughness: 0.16,
        metalness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        iridescence: 1,
        iridescenceIOR: 1.32,
        iridescenceThicknessRange: [90, 400],
        emissive: new THREE.Color("#1a6aaa"),
        emissiveMap: map,
        emissiveIntensity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [map],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e0b45a"),
        emissive: new THREE.Color("#e0b45a"),
        emissiveIntensity: 0.4,
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
        emissiveIntensity: 0.7,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.55,
      }),
    [],
  );

  const hazeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#0a2848"),
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
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

    // Optical illusion: each depth layer shifts differently (pop out of screen)
    if (layerA.current) {
      layerA.current.position.x = mx * 0.08;
      layerA.current.position.y = my * 0.06;
      layerA.current.rotation.z = t * 0.06;
    }
    if (layerB.current) {
      layerB.current.position.x = mx * 0.18;
      layerB.current.position.y = my * 0.14;
      layerB.current.rotation.z = -t * 0.11;
    }
    if (layerC.current) {
      layerC.current.position.x = mx * 0.32;
      layerC.current.position.y = my * 0.24;
      layerC.current.rotation.z = t * 0.18;
    }

    if (root.current) {
      root.current.rotation.y = mx * 0.35 + Math.sin(t * 0.3) * 0.05;
      root.current.rotation.x = -my * 0.28 + Math.cos(t * 0.35) * 0.04;
      const breath = 1 + Math.sin(t * 1.25) * 0.028 + g * 0.42;
      root.current.scale.setScalar(breath);
      root.current.position.z = 0.15 + g * 0.45; // push toward camera = pop
    }

    if (disc.current) {
      disc.current.rotation.z = t * 0.09;
      (disc.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.5 + g * 1.1 + Math.sin(t * 2.4) * 0.08;
    }

    // Pearl-style plunge into the spiral
    state.camera.position.z = THREE.MathUtils.lerp(3.55, 0.48, g);
    state.camera.position.x = mx * 0.14 * (1 - g * 0.55);
    state.camera.position.y = 0.06 + my * 0.1 * (1 - g * 0.55);
    state.camera.lookAt(0, 0, root.current?.position.z ?? 0);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.38}>
      <group ref={root}>
        {/* far haze — soft, same void family */}
        <group ref={layerA} position={[0, 0, -0.35]}>
          <mesh scale={1.55} material={hazeMat}>
            <circleGeometry args={[1, 64]} />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, 0.2, 0]} material={cyanMat}>
            <torusGeometry args={[1.15, 0.005, 12, 100]} />
          </mesh>
        </group>

        {/* mid — emblem on a shallow pearl dome (volume + soft edge) */}
        <group ref={layerB} position={[0, 0, 0]}>
          <mesh
            ref={disc}
            material={faceMat}
            rotation={[Math.PI / 2, Math.PI, 0]}
            scale={1.02}
          >
            <sphereGeometry args={[1, 72, 72, 0, Math.PI * 2, 0, Math.PI * 0.38]} />
          </mesh>
          <mesh rotation={[1.15, 0.25, 0]} material={goldMat}>
            <torusGeometry args={[1.08, 0.007, 16, 120]} />
          </mesh>
        </group>

        {/* near — rings leap toward you */}
        <group ref={layerC} position={[0, 0, 0.28]}>
          <mesh rotation={[0.9, 0.55, 0.15]} material={goldMat}>
            <torusGeometry args={[0.95, 0.006, 12, 100]} />
          </mesh>
          <mesh rotation={[1.35, -0.3, 0.4]} material={cyanMat}>
            <torusGeometry args={[1.28, 0.004, 12, 90]} />
          </mesh>
          <mesh rotation={[0.4, 0.9, 0]} material={goldMat}>
            <torusGeometry args={[0.72, 0.005, 12, 80]} />
          </mesh>
        </group>

        <pointLight position={[0.5, 0.45, 1.3]} intensity={1.35} color="#7ec8ff" distance={6} />
        <pointLight position={[-0.55, -0.2, 1]} intensity={0.65} color="#e0b45a" distance={5} />
        <pointLight position={[0, 0.15, 1.7]} intensity={0.5} color="#ffffff" distance={4} />
        <spotLight
          position={[0.2, 0.4, 2.2]}
          angle={0.5}
          penumbra={0.65}
          intensity={1.15}
          color="#c8e8ff"
        />
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[3.5, 4, 2.5]} intensity={0.95} color="#eef5ff" />
      <directionalLight position={[-2.5, -0.4, -1]} intensity={0.28} color="#5a468c" />
    </>
  );
}

export function HeroScene({ intensity }: { intensity: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 bg-[#050a14]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(40,120,200,0.18),transparent_50%),radial-gradient(circle_at_50%_52%,rgba(224,180,90,0.09),transparent_54%)]" />
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.06, 3.55], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(VOID, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.14;
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="city" environmentIntensity={0.3} />
          <OpticalEmblem intensity={intensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
