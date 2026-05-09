"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isMobileRef = useRef(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    isMobileRef.current = window.matchMedia("(pointer: coarse)").matches;
    if (isMobileRef.current) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-interactive], input, textarea, select, label");
      setIsHovering(!!interactive);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const size = isHovering ? 48 : isPressed ? 20 : 24;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
        className="rounded-full border border-primary relative"
        style={{
          boxShadow: isHovering
            ? "0 0 12px var(--glow-color), inset 0 0 8px var(--glow-color)"
            : "0 0 6px var(--glow-color)",
        }}
      >
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: "radial-gradient(circle, var(--glow-color) 0%, transparent 70%)",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
