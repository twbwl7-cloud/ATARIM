"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function LuxuryForm() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a962"),
        metalness: 0.92,
        roughness: 0.22,
        envMapIntensity: 1.35,
      }),
    [],
  );

  const pink = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f0c6cf"),
        metalness: 0.35,
        roughness: 0.35,
        emissive: new THREE.Color("#f0c6cf"),
        emissiveIntensity: 0.08,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.18;
      group.current.rotation.x = Math.sin(t * 0.22) * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.35;
    }
    if (core.current) {
      core.current.rotation.y = -t * 0.4;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.55}>
      <group ref={group} scale={1.15}>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.35, 0.045, 48, 180]} />
          <primitive object={gold} attach="material" />
        </mesh>

        <mesh rotation={[0.4, 0.6, 0.2]}>
          <torusGeometry args={[1.05, 0.028, 32, 140]} />
          <primitive object={pink} attach="material" />
        </mesh>

        <mesh ref={core}>
          <icosahedronGeometry args={[0.72, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={256}
            thickness={1.2}
            roughness={0.18}
            chromaticAberration={0.04}
            anisotropy={0.2}
            distortion={0.15}
            distortionScale={0.25}
            temporalDistortion={0.08}
            color="#f3eee6"
            attenuationColor="#c9a962"
            attenuationDistance={1.4}
          />
        </mesh>

        <mesh position={[0.95, 0.55, 0.4]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <primitive object={gold} attach="material" />
        </mesh>
        <mesh position={[-0.8, -0.45, 0.55]}>
          <sphereGeometry args={[0.045, 24, 24]} />
          <primitive object={pink} attach="material" />
        </mesh>
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 2]} intensity={1.4} color="#fff4e0" />
      <directionalLight position={[-3, -2, -4]} intensity={0.55} color="#f0c6cf" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#c9a962" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-0 bg-[#070708]">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.05 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#070708", 1);
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <LuxuryForm />
          <Environment preset="city" environmentIntensity={0.55} background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
