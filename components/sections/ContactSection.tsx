"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const IsometricEnvelope = dynamic(
  () => import("../3d/IsometricEnvelope").then((m) => m.IsometricEnvelope),
  { ssr: false, loading: () => <div className="w-48 h-48 mx-auto" /> }
);

type FormState = "idle" | "loading" | "success" | "error";
type ButtonState = "idle" | "loading" | "done";

interface ApiButton {
  method: string;
  endpoint: string;
  label: string;
  href: string;
  color: string;
}

const API_BUTTONS: ApiButton[] = [
  {
    method: "POST",
    endpoint: "/contact/email",
    label: "Open email",
    href: "mailto:benjaminsimba0@gmail.com",
    color: "#6ea8fe",
  },
  {
    method: "GET",
    endpoint: "/profile/linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/benjamin-simba",
    color: "#34d399",
  },
  {
    method: "GET",
    endpoint: "/profile/github",
    label: "GitHub",
    href: "https://github.com/B4bySimba",
    color: "#a78bfa",
  },
  {
    method: "GET",
    endpoint: "/docs/resume.pdf",
    label: "Download Resume",
    href: "/resume.pdf",
    color: "#fbbf24",
  },
];

function ApiEndpointButton({ btn }: { btn: ApiButton }) {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => {
        setState("idle");
        if (btn.href.startsWith("mailto:")) {
          window.location.href = btn.href;
        } else if (btn.href.startsWith("/")) {
          const a = document.createElement("a");
          a.href = btn.href;
          a.download = "Benjamin Mwangi - CV";
          a.click();
        } else {
          window.open(btn.href, "_blank", "noopener,noreferrer");
        }
      }, 600);
    }, 200);
  };

  return (
    <motion.button
      onClick={handleClick}
      data-interactive
      aria-label={btn.label}
      className="relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-xl glass font-mono text-sm w-full sm:w-auto"
      style={{ borderColor: `${btn.color}44` }}
      whileHover={{ scale: 1.02, borderColor: `${btn.color}88` }}
      whileTap={{ scale: 0.97 }}
    >
      <span
        className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
        style={{ background: `${btn.color}22`, color: btn.color }}
      >
        {btn.method}
      </span>
      <span style={{ color: "var(--foreground)" }}>{btn.endpoint}</span>

      {state === "loading" && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{ background: btn.color }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        />
      )}

      <AnimatePresence>
        {state === "done" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-xl"
            style={{ background: `${btn.color}22` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <circle cx="10" cy="10" r="9" stroke={btn.color} strokeWidth="1.5" fill="none" />
              <path d="M6 10l3 3 5-5" stroke={btn.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Contact form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate send — replace with your API/Formspree endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl font-mono text-sm outline-none transition-all duration-200 bg-transparent border";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 md:p-8 space-y-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Contact form"
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--primary)" }}
          aria-hidden="true"
        />
        <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          POST /contact/message
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-name"
            className="font-mono text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputBase}
            style={{
              borderColor: "var(--glass-border)",
              color: "var(--foreground)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--glass-border)")
            }
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-email"
            className="font-mono text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputBase}
            style={{
              borderColor: "var(--glass-border)",
              color: "var(--foreground)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--glass-border)")
            }
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="What would you like to discuss?"
          className={`${inputBase} resize-none`}
          style={{
            borderColor: "var(--glass-border)",
            color: "var(--foreground)",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "var(--primary)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "var(--glass-border)")
          }
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={formState === "loading" || formState === "success"}
          data-interactive
          className="relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-semibold font-mono disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "var(--primary)",
            color: "#fff",
          }}
          whileHover={{ scale: formState === "idle" ? 1.03 : 1 }}
          whileTap={{ scale: formState === "idle" ? 0.97 : 1 }}
        >
          {formState === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
              Sending...
            </span>
          ) : formState === "success" ? (
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sent!
            </span>
          ) : (
            "Send Message"
          )}
        </motion.button>

        <AnimatePresence>
          {formState === "success" && (
            <motion.p
              className="font-mono text-xs"
              style={{ color: "#34d399" }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              Message received. I&apos;ll be in touch soon.
            </motion.p>
          )}
          {formState === "error" && (
            <motion.p
              className="font-mono text-xs"
              style={{ color: "#f87171" }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              Something went wrong. Try email instead.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 pb-40 md:pb-36"
      aria-label="Contact - Get in touch"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-[-0.03em] mb-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Get in
          <br />
          <span style={{ color: "var(--primary)" }}>Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — form */}
          <div>
            <ContactForm />
          </div>

          {/* Right — envelope + quick links */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <IsometricEnvelope />
            </motion.div>

            {/* Quick contact buttons */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {API_BUTTONS.map((btn) => (
                <ApiEndpointButton key={btn.endpoint} btn={btn} />
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full status-dot"
                  style={{ background: "#34d399" }}
                  aria-hidden="true"
                />
                <span className="font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Status:{" "}
                  <span style={{ color: "#34d399" }}>Open to opportunities</span>
                </span>
              </div>
              <p className="pgp-fingerprint font-mono" aria-label="Phone and location">
                +254 717 008 835 · Nairobi, Kenya
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
