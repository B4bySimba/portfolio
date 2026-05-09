"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const SERVICE_NODES = [
  { label: "API Gateway", position: [1.2, 0.8, 0.6] as [number, number, number], color: "#6ea8fe" },
  { label: "Message Queue", position: [-1.2, 0.6, -0.4] as [number, number, number], color: "#a78bfa" },
  { label: "Database Cluster", position: [0.4, -1.0, 0.8] as [number, number, number], color: "#34d399" },
  { label: "Cache Layer", position: [-0.8, -0.8, -0.6] as [number, number, number], color: "#fbbf24" },
  { label: "Load Balancer", position: [0.2, 1.2, -0.8] as [number, number, number], color: "#fb7185" },
];

function ServiceNode({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const packetRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const targetIndex = (index + 1) % SERVICE_NODES.length;
  const targetPos = new THREE.Vector3(...SERVICE_NODES[targetIndex].position);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const t = state.clock.elapsedTime;
    // Pulsing
    const pulse = 1 + Math.sin(t * 2 + index) * 0.08;
    sphereRef.current.scale.setScalar(pulse);

    // Data packet traveling to next node
    if (packetRef.current) {
      progressRef.current = (progressRef.current + 0.003) % 1;
      const p = progressRef.current;
      const from = new THREE.Vector3(...position);
      packetRef.current.position.lerpVectors(from, targetPos, p);
      packetRef.current.visible = p > 0.05 && p < 0.95;
    }
  });

  return (
    <>
      <mesh ref={sphereRef} position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
      {/* Data packet */}
      <mesh ref={packetRef} position={position}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
    </>
  );
}

function ConnectionLines() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < SERVICE_NODES.length; i++) {
      for (let j = i + 1; j < SERVICE_NODES.length; j++) {
        pts.push(new THREE.Vector3(...SERVICE_NODES[i].position));
        pts.push(new THREE.Vector3(...SERVICE_NODES[j].position));
      }
    }
    return pts;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#aaaaff" transparent opacity={0.12} />
    </lineSegments>
  );
}

function WireframeCube() {
  const cubeRef = useRef<THREE.Group>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "cyber" ? "cyber" : resolvedTheme;

  const edgeColor = currentTheme === "cyber"
    ? "#ff2d78"
    : currentTheme === "dark"
    ? "#22d3ee"
    : "#64748b";

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.0015;
      cubeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={cubeRef}>
      {/* Wireframe cube edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
        <lineBasicMaterial color={edgeColor} transparent opacity={0.5} />
      </lineSegments>

      {/* Inner glass panel faces */}
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color={currentTheme === "cyber" ? "#1a0010" : currentTheme === "dark" ? "#0f172a" : "#f8fafc"}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Service nodes */}
      {SERVICE_NODES.map((node, i) => (
        <ServiceNode key={node.label} position={node.position} color={node.color} index={i} />
      ))}

      <ConnectionLines />

      {/* Lighting inside cube */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color={edgeColor} />
    </group>
  );
}

export function EntryPortalScene() {
  return (
    <div className="w-full h-full" aria-label="Animated 3D distributed system visualization">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#aaccff" />
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <WireframeCube />
        </Float>
      </Canvas>
    </div>
  );
}
