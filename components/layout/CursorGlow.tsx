"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "a, button, [role='button'], input, textarea, select, summary, [data-cursor='active']";

export default function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 780, damping: 48, mass: 0.12 });
  const y = useSpring(pointerY, { stiffness: 780, damping: 48, mass: 0.12 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(finePointer.matches && !reducedMotion);
    sync();
    finePointer.addEventListener("change", sync);
    return () => finePointer.removeEventListener("change", sync);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-enhanced");

    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      setInteractive(event.target instanceof Element && Boolean(event.target.closest(interactiveSelector)));
    };
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.documentElement.classList.remove("cursor-enhanced");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow-layer"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.svg
        className="cursor-chevron"
        viewBox="0 0 20 23"
        fill="none"
        animate={{ scale: interactive ? 1.16 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <path d="M2.05 1.75c-.72-.3-1.47.4-1.2 1.14l6.65 17.25c.28.73 1.3.77 1.64.07l2.18-4.55 4.66-2.05c.73-.32.72-1.36-.02-1.67L2.05 1.75Z" />
      </motion.svg>
    </motion.div>
  );
}

