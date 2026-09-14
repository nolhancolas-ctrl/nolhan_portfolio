"use client";
import dynamic from "next/dynamic";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";
import WebGLBoundary from "./WebGLBoundary";

const GradientScene = dynamic(() => import("./GradientScene"), { ssr: false });

export default function GradientBackground() {
  const { ready, reducedMotion, visible, compact } = useVisualPreferences();
  return (
    <div className="portfolio-background" aria-hidden="true">
      <div className="portfolio-background-fallback" />
      {ready && !reducedMotion && (
        <WebGLBoundary><GradientScene active={visible} compact={compact} /></WebGLBoundary>
      )}
      <div className="portfolio-background-veil" />
    </div>
  );
}
