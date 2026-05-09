"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ARTICLES } from "@/lib/constants";

function RadioTowerIcon() {
  return (
    <span className="relative inline-flex items-center gap-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M5 12.5C5 12.5 7 8 12 8C17 8 19 12.5 19 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 9C2 9 5.5 3 12 3C18.5 3 22 9 22 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

const BARS = 80;
const ARTICLE_POSITIONS = [10, 28, 52, 70];

function buildBarHeights() {
  return Array.from({ length: BARS }, (_, i) => {
    let height = 8 + Math.random() * 12;
    ARTICLE_POSITIONS.forEach((pos, ai) => {
      const dist = Math.abs(i - pos);
      if (dist < 5) {
        height = Math.max(height, ARTICLES[ai].frequency * 0.8 * (1 - dist / 6));
      }
    });
    return height;
  });
}

const BASE_HEIGHTS = buildBarHeights();

function SignalSpectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [tooltip, setTooltip] = useState<{
    article: (typeof ARTICLES)[number];
    x: number;
    y: number;
  } | null>(null);

  // Draw on canvas whenever inView changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 600;
    canvas.height = canvas.offsetHeight || 160;
    const W = canvas.width;
    const H = canvas.height;
    const barWidth = W / BARS;

    ctx.clearRect(0, 0, W, H);

    BASE_HEIGHTS.forEach((bh, i) => {
      const isArticle = ARTICLE_POSITIONS.some((pos) => Math.abs(i - pos) < 2);
      const h = inView ? bh : 4;
      const x = i * barWidth + barWidth * 0.1;
      const w = barWidth * 0.7;
      const y = H - h * (H / 100);

      const grad = ctx.createLinearGradient(0, y, 0, H);
      if (isArticle) {
        grad.addColorStop(0, "oklch(0.72 0.18 195 / 0.9)");
        grad.addColorStop(1, "oklch(0.72 0.18 195 / 0.2)");
      } else {
        grad.addColorStop(0, "oklch(0.5 0.02 240 / 0.4)");
        grad.addColorStop(1, "oklch(0.5 0.02 240 / 0.1)");
      }

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h * (H / 100));
    });
  }, [inView]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const barWidth = rect.width / BARS;
    const barIndex = Math.floor(x / barWidth);

    const nearArticle = ARTICLE_POSITIONS.findIndex(
      (pos) => Math.abs(barIndex - pos) < 5
    );

    if (nearArticle !== -1) {
      setTooltip({
        article: ARTICLES[nearArticle],
        x: e.clientX - rect.left,
        y: 0,
      });
    } else {
      setTooltip(null);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-40 mb-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        aria-label="Signal spectrum visualization of articles"
        role="img"
      />

      <AnimatePresence>
        {tooltip && (
          <motion.div
            className="tooltip pointer-events-none absolute"
            style={{ left: Math.min(tooltip.x, 200), top: "10px" }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            <p className="font-mono font-semibold text-xs mb-0.5">{tooltip.article.title}</p>
            <p className="font-mono" style={{ color: "var(--muted-foreground)" }}>
              {tooltip.article.date} · {tooltip.article.readTime}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WritingSection() {
  return (
    <section
      id="writing"
      className="relative py-24 md:py-36"
      aria-label="Writing and Thinking - Transmissions"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <RadioTowerIcon />
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-[-0.03em]"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Transmissions
            </motion.h2>
          </motion.div>
        </div>

        <div className="max-w-3xl">
          <SignalSpectrum />

          {/* Article list - teletype style */}
          <div className="space-y-4">
            {ARTICLES.map((article, i) => (
              <ArticleRow key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleRow({ article, index }: { article: (typeof ARTICLES)[number]; index: number }) {
  return (
    <motion.article
      className="card-spotlight-parent relative glass rounded-xl p-5 overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      data-interactive
    >
      <div className="card-spotlight" aria-hidden="true" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            TRANSMISSION/{String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            {article.date}
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            {article.readTime}
          </span>
        </div>

        <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors tracking-tight link-underline inline-block">
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {article.excerpt}
        </p>
      </div>
    </motion.article>
  );
}
