"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";
import WebGLBoundary from "./WebGLBoundary";

const SculptureScene = dynamic(() => import("./SculptureScene"), { ssr: false });
const preloadSculpture = () => (SculptureScene as typeof SculptureScene & { preload?: () => void }).preload?.();

export default function ServiceSculpture({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "1200px 0px", once: true });
  const [rendered, setRendered] = useState(false);
  const { ready, reducedMotion, visible, compact } = useVisualPreferences();
  useEffect(() => {
    const timer = globalThis.setTimeout(preloadSculpture, 80);
    return () => globalThis.clearTimeout(timer);
  }, []);
  return (
    <div ref={ref} className={`service-sculpture sculpture-${index}${rendered ? " is-webgl-ready" : ""}`} aria-hidden="true">
      <div className="sculpture-fallback"><span /></div>
      {ready && near && visible && !reducedMotion && (
        <WebGLBoundary><SculptureScene index={index} compact={compact} onReady={() => setRendered(true)} /></WebGLBoundary>
      )}
    </div>
  );
}

