"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";
import WebGLBoundary from "./WebGLBoundary";

const SculptureScene = dynamic(() => import("./SculptureScene"), { ssr: false });

export default function ServiceSculpture({ index, preload = false }: { index: number; preload?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "1200px 0px", once: true });
  const active = useInView(ref, { margin: "1200px 0px" });
  const [rendered, setRendered] = useState(false);
  const [desktop, setDesktop] = useState(!preload);
  const [prewarmed, setPrewarmed] = useState(false);
  const { ready, reducedMotion, visible, compact } = useVisualPreferences();

  useEffect(() => {
    const timer = globalThis.setTimeout(() => { void import("./SculptureScene"); }, 80);
    return () => globalThis.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!preload) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [preload]);

  useEffect(() => {
    if (!preload || !desktop) return;
    const timer = window.setTimeout(() => setPrewarmed(true), index === 1 ? 240 : 520);
    return () => window.clearTimeout(timer);
  }, [preload, desktop, index]);

  const shouldMount = ready && (near || prewarmed) && desktop && visible && !reducedMotion;

  return (
    <div ref={ref} className={`service-sculpture sculpture-${index}${rendered ? " is-webgl-ready" : ""}`} aria-hidden="true">
      <div className="sculpture-fallback"><span /></div>
      {shouldMount && (
        <WebGLBoundary>
          <SculptureScene index={index} compact={compact} active={active} onReady={() => setRendered(true)} />
        </WebGLBoundary>
      )}
    </div>
  );
}
