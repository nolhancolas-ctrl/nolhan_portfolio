"use client";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";
import WebGLBoundary from "./WebGLBoundary";

const GradientScene = dynamic(() => import("./GradientScene"), { ssr: false });

export default function GradientBackground() {
  const { ready, reducedMotion, visible, compact } = useVisualPreferences();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotate = useMotionValue(0);
  const rawScale = useMotionValue(1.04);
  const x = useSpring(rawX, { stiffness: 115, damping: 24, mass: 0.55 });
  const y = useSpring(rawY, { stiffness: 115, damping: 24, mass: 0.55 });
  const rotate = useSpring(rawRotate, { stiffness: 100, damping: 26, mass: 0.6 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = window.innerHeight * 0.5;
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-section"));
      const section = sections.reduce<HTMLElement | null>((nearest, candidate) => {
        if (!nearest) return candidate;
        const a = candidate.getBoundingClientRect();
        const b = nearest.getBoundingClientRect();
        return Math.abs(a.top + a.height / 2 - center) < Math.abs(b.top + b.height / 2 - center) ? candidate : nearest;
      }, null);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (center - rect.top) / Math.max(rect.height, 1)));
      const wave = Math.sin(progress * Math.PI * 2);
      const focus = Math.sin(progress * Math.PI);
      rawX.set(wave * (compact ? 7 : 15));
      rawY.set((progress - 0.5) * (compact ? -16 : -32));
      rawRotate.set(wave * (compact ? 0.25 : 0.55));
      rawScale.set(1.08 - focus * (compact ? 0.025 : 0.045));
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [compact, rawRotate, rawScale, rawX, rawY, reducedMotion]);

  return (
    <div className="portfolio-background" aria-hidden="true">
      <div className="portfolio-background-fallback" />
      {ready && !reducedMotion && (
        <motion.div className="portfolio-shader-motion" style={{ x, y, rotate, scale }}>
          <WebGLBoundary><GradientScene active={visible} compact={compact} /></WebGLBoundary>
        </motion.div>
      )}
      <div className="portfolio-background-veil" />
    </div>
  );
}

