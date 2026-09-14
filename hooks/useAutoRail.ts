"use client";
import { useEffect, type RefObject } from "react";
import { useInView } from "framer-motion";
import { useVisualPreferences } from "./useVisualPreferences";

export function useAutoRail(ref: RefObject<HTMLDivElement>, count: number, speed = 26) {
  const inView = useInView(ref);
  const { ready, reducedMotion, visible, compact } = useVisualPreferences();
  useEffect(() => {
    const rail = ref.current;
    if (!rail || !count || !ready || reducedMotion || !visible || !compact || !inView) return;
    let frame = 0;
    let previous = performance.now();
    let position = rail.scrollLeft;
    let pausedUntil = 0;
    let interacting = false;
    const pause = () => { interacting = true; };
    const resume = () => { interacting = false; pausedUntil = performance.now() + 2500; position = rail.scrollLeft; };
    const tick = (time: number) => {
      const delta = Math.min((time - previous) / 1000, 0.05);
      previous = time;
      if (!interacting && !rail.contains(document.activeElement) && time > pausedUntil) {
        const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
        const loopWidth = (rail.scrollWidth + gap) / 2;
        position += speed * delta;
        if (position >= loopWidth) position -= loopWidth;
        rail.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    };
    rail.addEventListener("pointerenter", pause);
    rail.addEventListener("pointerleave", resume);
    rail.addEventListener("pointerdown", pause);
    rail.addEventListener("pointerup", resume);
    rail.addEventListener("pointercancel", resume);
    rail.addEventListener("focusout", resume);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("pointerenter", pause);
      rail.removeEventListener("pointerleave", resume);
      rail.removeEventListener("pointerdown", pause);
      rail.removeEventListener("pointerup", resume);
      rail.removeEventListener("pointercancel", resume);
      rail.removeEventListener("focusout", resume);
    };
  }, [ref, count, speed, ready, reducedMotion, visible, compact, inView]);
}
