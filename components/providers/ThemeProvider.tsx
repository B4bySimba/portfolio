"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "cyber"]}
      disableTransitionOnChange={false}
    >
      <CyberModeListener />
      {children}
    </NextThemeProvider>
  );
}

function CyberModeListener() {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        const html = document.documentElement;
        html.classList.remove("light", "dark", "cyber");
        html.classList.add("cyber");
        // dispatch a custom event so ThemeCube can react
        window.dispatchEvent(new CustomEvent("cyber-mode-engaged"));
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return null;
}
