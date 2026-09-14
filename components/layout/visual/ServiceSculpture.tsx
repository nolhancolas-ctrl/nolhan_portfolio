"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useVisualPreferences } from "@/hooks/useVisualPreferences";
import WebGLBoundary from "./WebGLBoundary";

const SculptureScene = dynamic(() => import("./SculptureScene"), { ssr: false });

export default function ServiceSculpture({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "80px" });
  const { ready, reducedMotion, visible, compact } = useVisualPreferences();
  return (
    <div ref={ref} className={`service-sculpture sculpture-${index}`} aria-hidden="true">
      <div className="sculpture-fallback"><span /></div>
      {ready && inView && visible && !reducedMotion && (
        <WebGLBoundary><SculptureScene index={index} compact={compact} /></WebGLBoundary>
      )}
    </div>
  );
}
