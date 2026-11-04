"use client";

import { useMemo, useRef } from "react";
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

  // יצירת חלקיקים עם נתונים מורכבים יותר לתנועה אורגנית
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
      // מהירות אינדיבידואלית לכל פתית לתנועה טבעית יותר
      speed: Math.random() * 0.2 + 0.1,
    }));
  }, [count]);

  useFrame(() => {
    if (groupRef.current) {
      // סיבוב אלגנטי ואיטי של כל הקבוצה
      groupRef.current.rotation.y += 0.0005;

      // חיבור חלק לגלילה - גורם לפתיתים לרדת בהרמוניה עם האתר
      const scrollY = window.scrollY;
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
            {/* צורה מרובת פאות שיוצרת השתקפויות יוקרתיות (כמו יהלום חתוך) */}
            <icosahedronGeometry args={[1, 0]} />
            {/* חומר פיזיקלי ברמה הגבוהה ביותר - מדמה זהב אמיתי */}
            <meshPhysicalMaterial
              color="#D4AF37" // צבע זהב קלאסי
              emissive="#3a2a00" // ברק פנימי עדין
              metalness={1}
              roughness={0.1}
              clearcoat={1} // שכבת הברקה חיצונית (כמו לכה או זכוכית)
              clearcoatRoughness={0.1}
              reflectivity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/**
 * Premium fixed gold flakes — city env, DoF + Bloom, scroll-linked fall.
 */
export function GoldFlakes() {
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
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.pointerEvents = "none";
        }}
      >
        {/* תאורה מתקדמת */}
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

        {/* השתקפויות סביבה (קריטי למראה מתכתי ריאליסטי) */}
        <Environment preset="city" />

        <PremiumFlakes />

        {/* אפקטי מצלמה קולנועיים */}
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.2}
            bokehScale={3} // מטשטש את הפתיתים הרחוקים/קרובים מדי למראה מקצועי
          />
          <Bloom
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
            intensity={0.4} // הילה עדינה מאוד מסביב לזהב
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default GoldFlakes;
