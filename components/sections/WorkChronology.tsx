"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";

export function WorkChronology() {
  return (
    <section
      id="chronology"
      className="relative py-24 md:py-36"
      aria-label="Work Chronology - Execution Log"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <motion.p
            className="font-mono text-xs mb-2"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            $ git log --oneline --graph
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-[-0.03em]"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Execution
            <br />
            <span style={{ color: "var(--primary)" }}>Log</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl">
          <GitGraph />
        </div>
      </div>
    </section>
  );
}

function GitGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative">
      {/* SVG graph lines */}
      <svg
        className="absolute left-0 top-0 w-12 h-full pointer-events-none"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Main branch line */}
        <motion.line
          x1="12" y1="20" x2="12" y2="100%"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* OSS branch */}
        <motion.path
          d="M12 240 Q36 240 36 280 L36 340 Q36 380 12 380"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Commit entries */}
      <div className="pl-10 space-y-0">
        {EXPERIENCE.map((entry, i) => (
          <CommitEntry key={entry.hash} entry={entry} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

function CommitEntry({
  entry,
  index,
  inView,
}: {
  entry: (typeof EXPERIENCE)[number];
  index: number;
  inView: boolean;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const isOss = entry.branch === "oss";
  const dotColor = entry.isMerge ? "#fbbf24" : isOss ? "var(--accent)" : "var(--primary)";

  return (
    <motion.div
      className="relative group"
      style={{ paddingBottom: "1.5rem" }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Commit dot */}
      <motion.div
        className="absolute -left-[1.55rem] top-3 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10"
        style={{
          background: entry.isMerge ? "#fbbf2422" : "var(--background)",
          borderColor: dotColor,
          boxShadow: entry.isMerge ? `0 0 10px ${dotColor}66` : "none",
          left: isOss ? "-0.6rem" : "-1.55rem",
        }}
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {entry.isMerge && (
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
        )}
      </motion.div>

      <button
        className="w-full text-left"
        onClick={() => setShowDetails(!showDetails)}
        data-interactive
        aria-expanded={showDetails}
        aria-label={`${entry.company} - ${entry.role}`}
      >
        <div className="glass rounded-xl p-4 hover:border-primary/30 transition-colors card-spotlight-parent relative overflow-hidden">
          <div className="flex flex-wrap items-start gap-3 mb-1">
            <span
              className="font-mono text-[11px] px-1.5 py-0.5 rounded"
              style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
            >
              {entry.hash}
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
              {entry.duration}
            </span>
            {entry.isMerge && (
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded-full border"
                style={{ color: "#fbbf24", borderColor: "#fbbf2444", background: "#fbbf2411" }}
              >
                merge commit
              </span>
            )}
          </div>

          <div className="font-semibold text-base mb-0.5 tracking-tight">
            {entry.company}
            <span className="font-normal text-sm ml-2" style={{ color: "var(--muted-foreground)" }}>
              · {entry.role}
            </span>
          </div>

          <p
            className="font-mono text-xs leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {entry.message}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="overflow-hidden"
          >
            <div
              className="mt-2 ml-2 p-4 rounded-xl text-sm leading-relaxed font-mono"
              style={{
                background: "var(--muted)",
                color: "var(--muted-foreground)",
                borderLeft: `2px solid ${dotColor}`,
              }}
            >
              {entry.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
