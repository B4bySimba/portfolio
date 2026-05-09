"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeCube() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [cyberToast, setCyberToast] = useState(false);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const handleCyberMode = () => {
      setTheme("cyber");
      setCyberToast(true);
      setTimeout(() => setCyberToast(false), 2500);
    };

    window.addEventListener("cyber-mode-engaged", handleCyberMode);
    return () => window.removeEventListener("cyber-mode-engaged", handleCyberMode);
  }, [setTheme]);

  const handleClick = () => {
    if (longPressedRef.current) return;
    const current = resolvedTheme ?? theme;
    const next = current === "dark" || current === "cyber" ? "light" : "dark";
    setTheme(next);
    setRotated((r) => !r);
  };

  const handleMouseDown = () => {
    longPressedRef.current = false;
    pressTimerRef.current = setTimeout(() => {
      longPressedRef.current = true;
      setTheme("cyber");
      setCyberToast(true);
      setTimeout(() => setCyberToast(false), 2500);
      window.dispatchEvent(new CustomEvent("cyber-mode-engaged"));
    }, 800);
  };

  const handleMouseUp = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
  };

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark" || theme === "dark";
  const isCyber = theme === "cyber";

  return (
    <>
      <button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        data-interactive
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 glass rounded-xl flex items-center justify-center"
        style={{
          boxShadow: isCyber
            ? "0 0 20px var(--glow-color), 0 0 40px var(--glow-color)"
            : "0 4px 20px oklch(0 0 0 / 0.15)",
        }}
      >
        <div
          className="theme-cube w-6 h-6 relative"
          style={{
            transformStyle: "preserve-3d",
            transform: rotated ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Front face - sun */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <SunIcon className={isDark || isCyber ? "opacity-40" : "opacity-100"} />
          </div>
          {/* Back face - moon */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <MoonIcon />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {cyberToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed bottom-20 left-1/2 z-50 glass px-4 py-2 rounded-full font-mono text-xs"
            style={{ color: "var(--particle-primary)", borderColor: "var(--particle-primary)" }}
          >
            Neural interface engaged.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
