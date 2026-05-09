"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  "entry",
  "philosophy",
  "architecture",
  "proficiency",
  "chronology",
  "writing",
  "contact",
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = SECTIONS.indexOf(entry.target.id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center"
      aria-hidden="true"
      style={{ gap: 0 }}
    >
      {/* Track + fill bar */}
      <div className="relative w-0.5 rounded-full overflow-hidden" style={{ height: 180, background: "var(--border)" }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height,
            background: "linear-gradient(to bottom, var(--gradient-from), var(--gradient-to))",
            filter: "drop-shadow(0 0 3px var(--particle-primary))",
          }}
        />
      </div>

      {/* Section dots — absolutely positioned along the track */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ top: "50%", transform: "translateY(-50%)", height: 180 }}
      >
        {SECTIONS.map((id, i) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            className="w-2.5 h-2.5 -ml-1 rounded-full transition-all duration-300"
            style={{
              background: i === activeSection ? "var(--gradient-from)" : "var(--background)",
              border: `1px solid ${i === activeSection ? "var(--gradient-from)" : "var(--border)"}`,
              boxShadow: i === activeSection ? "0 0 8px var(--glow-color)" : "none",
            }}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
          />
        ))}
      </div>
    </div>
  );
}
