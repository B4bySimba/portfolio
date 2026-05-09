"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS, SYSTEM_INFO } from "@/lib/constants";

function RadialGauge({
  label,
  value,
  color,
  index,
}: {
  label: string;
  value: number;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1000 + index * 100;
    const steps = 60;
    const inc = value / steps;
    let v = 0;
    const timer = setInterval(() => {
      v = Math.min(v + inc, value);
      setCurrent(Math.round(v));
      if (v >= value) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, index]);

  const RADIUS = 40;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  // Arc is 270 degrees (from 135° to 405°)
  const ARC = CIRCUMFERENCE * 0.75;
  const dashOffset = ARC - (current / 100) * ARC;
  const startAngle = 135;
  const startRad = (startAngle * Math.PI) / 180;
  const cx = 56;
  const cy = 56;

  // Track path: arc from 135° to 135°+270°
  const describeArc = (r: number) => {
    const start = { x: cx + r * Math.cos((135 * Math.PI) / 180), y: cy + r * Math.sin((135 * Math.PI) / 180) };
    const end = { x: cx + r * Math.cos(((135 + 270) * Math.PI) / 180), y: cy + r * Math.sin(((135 + 270) * Math.PI) / 180) };
    return `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`;
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="112" height="112" viewBox="0 0 112 112" aria-label={`${label}: ${value}%`}>
          {/* Track */}
          <path
            d={describeArc(RADIUS)}
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Fill */}
          <path
            d={describeArc(RADIUS)}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.05s linear", filter: `drop-shadow(0 0 4px ${color}88)` }}
          />
          {/* Tick marks */}
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = 135 + (270 / 10) * i;
            const rad = (angle * Math.PI) / 180;
            const inner = RADIUS - 8;
            const outer = RADIUS - 4;
            const x1 = cx + inner * Math.cos(rad);
            const y1 = cy + inner * Math.sin(rad);
            const x2 = cx + outer * Math.cos(rad);
            const y2 = cy + outer * Math.sin(rad);
            const lit = i / 10 <= current / 100;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={lit ? color : "var(--border)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ opacity: lit ? 0.7 : 0.3 }}
              />
            );
          })}
          {/* Value */}
          <text
            x={cx}
            y={cy + 6}
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fontFamily="'Geist Mono', monospace"
            fill={color}
          >
            {current}%
          </text>
        </svg>
      </div>
      <p className="text-xs font-mono text-center leading-tight" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </p>
    </div>
  );
}

export function TechnicalProficiency() {
  return (
    <section
      id="proficiency"
      className="relative py-24 md:py-36"
      aria-label="Technical Proficiency - Runtime Specifications"
    >
      <div className="max-w-5xl mx-auto px-6">
      <div className="mb-12">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-[-0.03em]"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Runtime
          <br />
          <span style={{ color: "var(--primary)" }}>Specifications</span>
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* System info panel */}
        <motion.div
          className="flex-1 glass rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-sm space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full status-dot" style={{ background: "#34d399" }} />
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                system.profile — online
              </span>
            </div>

            {SYSTEM_INFO.map((item, i) => (
              <motion.div
                key={item.key}
                className="flex flex-col sm:flex-row gap-1 sm:gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <span
                  className="shrink-0 w-20 text-xs font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {item.key}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Radial gauges */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-3 gap-4">
            {SKILLS.map((skill, i) => (
              <RadialGauge
                key={skill.label}
                label={skill.label}
                value={skill.value}
                color={skill.color}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
