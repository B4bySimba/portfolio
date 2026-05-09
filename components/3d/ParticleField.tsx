"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface FloatingShapeProps {
  position: [number, number, number];
  type: "octahedron" | "icosahedron" | "torus";
  color: string;
  scale: number;
  speed: number;
  phase: number;
}

function FloatingShape({ position, type, color, scale, speed, phase }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [, y] = position;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y = y + Math.sin(t * 0.3 + phase) * 0.5;
  });

  const geometry = useMemo(() => {
    if (type === "octahedron") return new THREE.OctahedronGeometry(scale, 0);
    if (type === "icosahedron") return new THREE.IcosahedronGeometry(scale, 0);
    return new THREE.TorusGeometry(scale * 0.8, scale * 0.2, 8, 16);
  }, [type, scale]);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial color={color} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function ConnectionLines({ positions }: { positions: [number, number, number][] }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const threshold = 5;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          points.push(new THREE.Vector3(...positions[i]));
          points.push(new THREE.Vector3(...positions[j]));
        }
      }
    }
    if (points.length === 0) return new THREE.BufferGeometry();
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [positions]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#aaaaaa" transparent opacity={0.06} />
    </lineSegments>
  );
}

// Global mouse state shared across renders
const globalMouse = { x: 0, y: 0 };

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { theme, resolvedTheme } = useTheme();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 6 : 16;

  const currentTheme = theme === "cyber" ? "cyber" : resolvedTheme;

  const colorPalette = useMemo(() => {
    if (currentTheme === "cyber") return ["#ff2d78", "#00b4ff", "#39ff14", "#ff2d78"];
    if (currentTheme === "dark") return ["#22d3ee", "#a78bfa", "#818cf8", "#67e8f9"];
    return ["#64748b", "#f59e0b", "#0ea5e9", "#94a3b8"];
  }, [currentTheme]);

  const shapes = useMemo(() => {
    const types: ("octahedron" | "icosahedron" | "torus")[] = ["octahedron", "icosahedron", "torus"];
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 4,
      ] as [number, number, number],
      type: types[i % 3],
      color: colorPalette[i % colorPalette.length],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count, colorPalette]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (globalMouse.x * 0.05 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-globalMouse.y * 0.05 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color={currentTheme === "cyber" ? "#ff2d78" : "#ffffff"}
      />
      <directionalLight position={[-10, -5, -5]} intensity={0.3} color="#aaccff" />

      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      <ConnectionLines positions={shapes.map((s) => s.position)} />
    </group>
  );
}

export function ParticleField() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      globalMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <SceneContent />
      </Canvas>
    </div>
  );
}
