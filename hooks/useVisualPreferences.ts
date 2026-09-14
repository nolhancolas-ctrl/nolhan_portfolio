"use client";
import { useEffect, useState } from "react";

export function useVisualPreferences() {
  const [preferences, setPreferences] = useState({ ready: false, reducedMotion: true, visible: true, compact: true });
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const update = () => setPreferences({ ready: true, reducedMotion: motion.matches, visible: !document.hidden, compact: compact.matches });
    update();
    motion.addEventListener("change", update);
    compact.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      motion.removeEventListener("change", update);
      compact.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return preferences;
}
