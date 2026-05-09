"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  {
    id: "entry",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "philosophy",
    label: "Skills",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "architecture",
    label: "Work",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8h4M14 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "writing",
    label: "Writing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("entry");
  const [spinningItem, setSpinningItem] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setSpinningItem(id);
    setTimeout(() => setSpinningItem(null), 700);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: vertical pill on left */}
      <nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1 py-4 px-2 glass rounded-2xl"
        aria-label="Portfolio navigation"
      >
        {/* KM Logo */}
        <div className="mb-3 w-8 h-8 relative" style={{ perspective: 60 }}>
          <KMRings />
        </div>

        <div className="w-px h-4 bg-border" />

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-interactive
              title={item.label}
              aria-label={`Navigate to ${item.label}`}
              className="relative group w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                background: isActive ? "var(--accent)/10" : "transparent",
              }}
            >
              <motion.div
                animate={{
                  rotate: spinningItem === item.id ? 360 : 0,
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{
                  rotate: { duration: 0.6, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 300 },
                }}
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                {item.icon}
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 rounded-xl -z-10"
                  style={{
                    background: "var(--glow-color)",
                    boxShadow: "0 0 12px var(--glow-color)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap glass px-2 py-1 rounded-md">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile: bottom dock */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden justify-around items-center py-3 px-4 glass border-t border-border"
        aria-label="Portfolio navigation"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-interactive
              aria-label={`Navigate to ${item.label}`}
              className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center"
              style={{ color: isActive ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              <motion.div
                animate={{ rotate: spinningItem === item.id ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {item.icon}
              </motion.div>
              <span className="text-[10px] font-mono">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

function KMRings() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center" style={{ perspective: 80 }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="absolute"
        style={{
          animation: "ringRotate1 8s linear infinite",
        }}
      >
        <ellipse cx="16" cy="16" rx="14" ry="6" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="absolute"
        style={{
          animation: "ringRotate2 6s linear infinite reverse",
        }}
      >
        <ellipse cx="16" cy="16" rx="6" ry="14" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
      <span className="relative font-mono font-bold text-[9px] tracking-tight" style={{ color: "var(--primary)" }}>
        BM
      </span>
    </div>
  );
}
