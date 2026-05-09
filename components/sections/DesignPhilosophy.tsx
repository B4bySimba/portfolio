"use client";

import { motion } from "framer-motion";


const SKILL_GROUPS = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    color: "#6ea8fe",
  },
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "Laravel", "PHP", "Python", "REST APIs"],
    color: "#a78bfa",
  },
  {
    category: "Database & Cloud",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "AWS", "Docker"],
    color: "#34d399",
  },
  {
    category: "Practices",
    items: ["CI/CD", "Agile / Scrum", "SEO / SEM", "System Design", "Git"],
    color: "#fbbf24",
  },
] as const;

export function DesignPhilosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-24 md:py-36"
      aria-label="Skills and Expertise"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 overflow-hidden">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-none"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Skills &amp;
            <br />
            <span style={{ color: "var(--primary)" }}>Expertise</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base md:text-lg max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A comprehensive toolkit for building modern, scalable applications
          </motion.p>
        </div>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {SKILL_GROUPS.map((group, index) => (
            <motion.div
              key={group.category}
              className="glass rounded-2xl p-6 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              style={
                {
                  "--card-accent": group.color,
                } as React.CSSProperties
              }
            >
              {/* Top accent line */}
              <div
                className="w-8 h-0.5 rounded-full mb-4"
                style={{ background: group.color }}
                aria-hidden="true"
              />

              <h3
                className="text-base font-semibold mb-4 transition-colors"
                style={{ color: group.color }}
              >
                {group.category}
              </h3>

              <ul className="space-y-2">
                {group.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--card-foreground)" }}
                    initial={{ x: -8, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + skillIndex * 0.04 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: group.color }}
                      aria-hidden="true"
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


