import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Benjamin Simba — Distributed Systems Engineer",
  description:
    "Architect of distributed systems. Builder of resilient software. Senior backend & full-stack engineer specializing in Go, Rust, TypeScript, and cloud-native architecture.",
  keywords: [
    "backend engineer",
    "distributed systems",
    "Go",
    "Rust",
    "TypeScript",
    "Kubernetes",
    "PostgreSQL",
    "Kafka",
    "system design",
  ],
  authors: [{ name: "Benjamin Simba" }],
  creator: "Benjamin Simba",
  openGraph: {
    title: "Benjamin Simba — Distributed Systems Engineer",
    description: "Architect of distributed systems. Builder of resilient software.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benjamin Simba — Distributed Systems Engineer",
    description: "Architect of distributed systems. Builder of resilient software.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
