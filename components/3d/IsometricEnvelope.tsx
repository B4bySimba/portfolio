"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function EnvelopeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Mesh>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "cyber" ? "cyber" : resolvedTheme;

  const primaryColor = currentTheme === "cyber" ? "#ff2d78" : currentTheme === "dark" ? "#22d3ee" : "#0ea5e9";
  const bodyColor = currentTheme === "cyber" ? "#120010" : currentTheme === "dark" ? "#0f172a" : "#f1f5f9";
  const glowColor = currentTheme === "cyber" ? "#ff2d78" : currentTheme === "dark" ? "#22d3ee" : "#0ea5e9";

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.1 - 0.15;

    if (flapRef.current) {
      flapRef.current.rotation.x = Math.PI + Math.sin(state.clock.elapsedTime * 0.6) * 0.3 + 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Front edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 2, 0.1)]} />
        <lineBasicMaterial color={primaryColor} transparent opacity={0.6} />
      </lineSegments>

      {/* V-shape fold bottom */}
      <mesh position={[0, -0.3, 0.06]}>
        <bufferGeometry
          attach="geometry"
          {...(() => {
            const geo = new THREE.BufferGeometry();
            const verts = new Float32Array([
              -1.5, -1.0, 0,
              0, 0.2, 0,
              1.5, -1.0, 0,
            ]);
            geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
            return geo;
          })()}
        />
        <meshStandardMaterial color={primaryColor} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Flap */}
      <mesh ref={flapRef} position={[0, 1.0, 0]} rotation={[Math.PI + 0.3, 0, 0]}>
        <bufferGeometry
          attach="geometry"
          {...(() => {
            const geo = new THREE.BufferGeometry();
            const verts = new Float32Array([
              -1.5, 0, 0,
              0, -1.0, 0,
              1.5, 0, 0,
            ]);
            geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
            const indices = new Uint16Array([0, 1, 2]);
            geo.setIndex(new THREE.BufferAttribute(indices, 1));
            geo.computeVertexNormals();
            return geo;
          })()}
        />
        <meshStandardMaterial
          color={primaryColor}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow */}
      <pointLight position={[0, 0, 0.5]} intensity={1.5} color={glowColor} distance={3} />
      <pointLight position={[0, 0, -0.5]} intensity={0.5} color={glowColor} distance={2} />
    </group>
  );
}

export function IsometricEnvelope() {
  return (
    <div className="w-48 h-48 mx-auto" aria-label="3D rotating envelope">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <EnvelopeModel />
      </Canvas>
    </div>
  );
}
