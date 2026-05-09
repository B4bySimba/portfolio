"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const EntryPortalScene = dynamic(
  () => import("../3d/EntryPortalScene").then((m) => m.EntryPortalScene),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const TAGLINE = "Full-stack developer. Builder of scalable systems and data-driven products.";

export function EntryPortal() {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (indexRef.current >= TAGLINE.length) return;

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayedText(TAGLINE.slice(0, indexRef.current));
      if (indexRef.current >= TAGLINE.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [started]);

  return (
    <section
      id="entry"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Entry Portal - Hero"
    >
      {/* 3D Scene */}
      <motion.div
        className="w-full max-w-lg aspect-square mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <EntryPortalScene />
      </motion.div>

      {/* Name etched onto the viewport */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] font-sans text-glow select-none"
          style={{ color: "var(--foreground)" }}
        >
          Benjamin Simba
        </h1>
      </motion.div>

      {/* Tagline */}
      <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-6 px-6">
        <div className="h-8 flex items-center">
          {started ? (
            <p className="font-mono text-sm md:text-base text-center max-w-lg leading-relaxed typewriter-cursor"
               style={{ color: "var(--muted-foreground)" }}>
              {displayedText}
            </p>
          ) : (
            <p className="font-mono text-sm md:text-base text-center max-w-lg opacity-0">
              {TAGLINE}
            </p>
          )}
        </div>

        {/* Breathing chevron */}
        <motion.button
          onClick={() =>
            document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" })
          }
          className="breathe flex flex-col items-center gap-1 cursor-pointer"
          data-interactive
          aria-label="Scroll down"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--muted-foreground)" }} />
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            style={{ color: "var(--muted-foreground)" }}
          >
            <path
              d="M1 1l9 9 9-9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Node labels floating around the cube */}
      <NodeLabels />
    </section>
  );
}

const NODE_LABELS = [
  { label: "Next.js / React", x: "62%", y: "28%" },
  { label: "Node.js / NestJS", x: "22%", y: "38%" },
  { label: "PostgreSQL / MySQL", x: "58%", y: "60%" },
  { label: "AWS / Docker / CI", x: "30%", y: "62%" },
  { label: "Laravel / Python", x: "54%", y: "22%" },
];

function NodeLabels() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {NODE_LABELS.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute font-mono text-[10px] px-2 py-0.5 glass rounded-full"
          style={{
            left: node.x,
            top: node.y,
            color: "var(--muted-foreground)",
            borderColor: "var(--glass-border)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  );
}
