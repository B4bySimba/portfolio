"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/constants";

const featuredProject = PROJECTS[0]; // propv2
const otherProjects = PROJECTS.slice(1);

export function ArchitectureMap() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="architecture"
      className="relative py-24 md:py-36"
      aria-label="Featured Projects"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-14">
          <motion.p
            className="font-mono text-xs mb-2"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            $ ls ~/production/
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-[-0.03em]"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Featured
            <br />
            <span style={{ color: "var(--primary)" }}>Projects</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base md:text-lg max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Showcasing my most impactful work and technical achievements
          </motion.p>
        </div>

        {/* Featured project — hero card */}
        <motion.div
          className="mb-12 glass rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Visual panel */}
            <div
              className="relative h-56 md:h-auto min-h-[220px] flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${featuredProject.color}22, ${featuredProject.color}08)`,
                borderRight: "1px solid var(--glass-border)",
              }}
              aria-hidden="true"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-center select-none"
              >
                <div
                  className="text-6xl font-bold mb-2"
                  style={{ color: `${featuredProject.color}50` }}
                >
                  v2
                </div>
                <p className="font-mono text-xs" style={{ color: `${featuredProject.color}80` }}>
                  {featuredProject.id}
                </p>
              </motion.div>

              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-16 h-16 opacity-20"
                style={{
                  background: `radial-gradient(circle at 0 0, ${featuredProject.color}, transparent 70%)`,
                }}
              />
            </div>

            {/* Info panel */}
            <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2 py-0.5 rounded-full border"
                      style={{
                        color: featuredProject.color,
                        borderColor: `${featuredProject.color}44`,
                        background: `${featuredProject.color}11`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                  {featuredProject.name}
                </h3>
                <p className="font-mono text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                  {featuredProject.role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--card-foreground)" }}>
                  {featuredProject.description}
                </p>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 gap-4 pt-5 border-t"
                style={{ borderColor: "var(--glass-border)" }}
              >
                {Object.entries(featuredProject.stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div
                      className="text-lg font-bold font-mono"
                      style={{ color: featuredProject.color }}
                    >
                      {value}
                    </div>
                    <div className="text-xs capitalize" style={{ color: "var(--muted-foreground)" }}>
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: "var(--muted)",
                      color: "var(--muted-foreground)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Live link */}
              <motion.a
                href="https://papat.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold self-start"
                style={{
                  background: featuredProject.color,
                  color: "#fff",
                }}
                whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                aria-label="View Property Management Platform live"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                View Live
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Other projects — flip cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="h-80 cursor-pointer"
              style={{ perspective: "1200px" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() =>
                setFlipped(flipped === project.id ? null : project.id)
              }
              aria-label={`${project.name} — click to see details`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setFlipped(flipped === project.id ? null : project.id);
              }}
            >
              <motion.div
                animate={{ rotateY: flipped === project.id ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full"
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: "hidden",
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  <div>
                    {/* Accent line */}
                    <div
                      className="w-6 h-0.5 rounded-full mb-4"
                      style={{ background: project.color }}
                      aria-hidden="true"
                    />
                    <h3
                      className="text-base font-bold mb-2 leading-snug tracking-tight"
                      style={{ color: "var(--foreground)" }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-xs leading-relaxed line-clamp-4"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full font-mono text-[10px]"
                          style={{
                            background: `${project.color}15`,
                            color: project.color,
                            border: `1px solid ${project.color}30`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p
                      className="font-mono text-[10px]"
                      style={{ color: `${project.color}80` }}
                    >
                      tap to flip
                    </p>
                  </div>
                </div>

                {/* Back face */}
                <div
                  className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: "hidden",
                    rotateY: "180deg",
                    transform: "rotateY(180deg)",
                    background: `linear-gradient(135deg, ${project.color}dd, ${project.color}99)`,
                  }}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white mb-4">
                      Key Metrics
                    </h4>
                    <div className="space-y-2.5">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between text-xs text-white/90 font-mono"
                        >
                          <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                          </span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-4 pt-3 border-t border-white/20 space-y-1"
                    >
                      <p className="text-[10px] text-white/70 font-mono uppercase tracking-wider">
                        Stack
                      </p>
                      <p className="text-xs text-white/90 font-mono leading-relaxed">
                        {project.stack.join(" · ")}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/60 font-mono text-[10px] text-center">
                    tap to flip back
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
