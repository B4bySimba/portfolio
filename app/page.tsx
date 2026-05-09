"use client";

import dynamic from "next/dynamic";
import { EntryPortal } from "@/components/sections/EntryPortal";
import { DesignPhilosophy } from "@/components/sections/DesignPhilosophy";
import { ArchitectureMap } from "@/components/sections/ArchitectureMap";
import { WorkChronology } from "@/components/sections/WorkChronology";
import { WritingSection } from "@/components/sections/WritingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeCube } from "@/components/ui/ThemeCube";

const ParticleField = dynamic(
  () => import("@/components/3d/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen scanlines">
      {/* Animated particle background */}
      <ParticleField />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <FloatingNav />
      <ScrollProgress />

      {/* Theme toggle */}
      <ThemeCube />

      {/* Main content */}
      <main className="relative z-10">
        <EntryPortal />
        <DesignPhilosophy />
        <ArchitectureMap />

        <WorkChronology />
        <WritingSection />
        <ContactSection />
      </main>
    </div>
  );
}
