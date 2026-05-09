"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    "Initialising environment...",
    "Loading systems...",
    "Mounting interfaces...",
    "Ready.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 2;
        if (next >= 33) setPhase(1);
        if (next >= 66) setPhase(2);
        if (next >= 95) setPhase(3);
        return Math.min(next, 100);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "var(--background)" }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Animated rings */}
      <div className="relative w-24 h-24 mb-10" style={{ perspective: 200 }}>
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="absolute inset-0"
          style={{ animation: "ringRotate1 4s linear infinite" }}
          aria-hidden="true"
        >
          <ellipse
            cx="48"
            cy="48"
            rx="44"
            ry="18"
            stroke="var(--primary)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
        </svg>
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="absolute inset-0"
          style={{ animation: "ringRotate2 3s linear infinite reverse" }}
          aria-hidden="true"
        >
          <ellipse
            cx="48"
            cy="48"
            rx="18"
            ry="44"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono font-bold text-sm"
            style={{ color: "var(--primary)" }}
          >
            BM
          </span>
        </div>
      </div>

      {/* Status line */}
      <p
        className="font-mono text-xs mb-6 h-4 transition-all duration-300"
        style={{ color: "var(--muted-foreground)" }}
      >
        {phases[phase]}
      </p>

      {/* Progress bar track */}
      <div
        className="w-48 h-px rounded-full overflow-hidden"
        style={{ background: "var(--border)" }}
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full transition-all duration-75"
          style={{
            width: `${progress}%`,
            background: "var(--primary)",
            boxShadow: "0 0 8px var(--primary)",
          }}
        />
      </div>

      {/* Percentage */}
      <p
        className="font-mono text-[10px] mt-3"
        style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
        aria-live="polite"
      >
        {Math.round(progress)}%
      </p>
    </div>
  );
}
