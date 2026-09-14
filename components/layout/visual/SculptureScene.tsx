"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useRef, useState } from "react";
import { MathUtils, type Group } from "three";

function Sculpture({ index }: { index: number }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, t * 0.18 + pointer.x * 0.25, 4, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, 0.35 + Math.sin(t * 0.35) * 0.15 - pointer.y * 0.2, 4, delta);
    group.current.rotation.z = Math.sin(t * 0.25) * 0.12;
    group.current.position.y = Math.sin(t * 0.7 + index) * 0.09;
  });
  return (
    <group ref={group}>
      <mesh>
        {index === 0 ? <icosahedronGeometry args={[1.15, 0]} /> : index === 1 ? <torusKnotGeometry args={[0.75, 0.27, 100, 16]} /> : <sphereGeometry args={[0.77, 32, 24]} />}
        <meshPhysicalMaterial color={["#d4d5eb", "#d5c9f4", "#efc6b7"][index]} metalness={0.92} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} iridescence={0.28} envMapIntensity={1.6} />
      </mesh>
      {index === 2 && <mesh rotation={[1.1, 0.3, 0]}><torusGeometry args={[1.15, 0.065, 12, 80]} /><meshPhysicalMaterial color="#d7cef5" metalness={0.9} roughness={0.16} /></mesh>}
    </group>
  );
}

export default function SculptureScene({ index, compact, onReady }: { index: number; compact: boolean; onReady?: () => void }) {
  const [lost, setLost] = useState(false);
  if (lost) return null;
  return (
    <Canvas className="sculpture-canvas" dpr={compact ? 1 : 1.25} camera={{ position: [0, 0, 4.8], fov: 38 }} gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", () => setLost(true), { once: true });
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2} color="#f7edff" />
      <Sculpture index={index} />
      <Environment resolution={128} frames={1}>
        <Lightformer position={[-3, 3, 2]} scale={[5, 5, 1]} intensity={4} color="#ffffff" />
        <Lightformer position={[4, 1, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 5, 1]} intensity={3} color="#b9b5ff" />
        <Lightformer position={[0, -4, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 3, 1]} intensity={2} color="#ffd1b6" />
      </Environment>
    </Canvas>
  );
}

