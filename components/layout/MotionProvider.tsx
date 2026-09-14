"use client";
import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { ready, reducedMotion } = useVisualPreferences();
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const lenis = new Lenis({
      autoRaf: true, lerp: 0.11, smoothWheel: true, syncTouch: false,
      anchors: { offset: -88 },
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent], .swiper, [role='dialog']")),
    });
    const visibility = () => document.hidden ? lenis.stop() : lenis.start();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      lenis.destroy();
    };
  }, [pathname, ready, reducedMotion]);
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</MotionConfig>;
}

