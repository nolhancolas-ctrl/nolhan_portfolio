"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "a, button, [role='button'], input, textarea, select, summary, [data-cursor='active']";

export default function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 1050, damping: 48, mass: 0.075 });
  const y = useSpring(pointerY, { stiffness: 1050, damping: 48, mass: 0.075 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [overCal, setOverCal] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(finePointer.matches && !reducedMotion);
    sync();
    finePointer.addEventListener("change", sync);
    return () => finePointer.removeEventListener("change", sync);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const boundCalFrames = new Set<HTMLElement>();

    root.classList.add("cursor-enhanced");

    const enterCal = () => {
      root.classList.add("cursor-over-cal");
      setOverCal(true);
      setVisible(false);
      setInteractive(false);
    };

    const leaveCal = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      root.classList.remove("cursor-over-cal");
      setOverCal(false);
      setVisible(true);
      setInteractive(false);
    };

    const bindCalFrames = () => {
      document.querySelectorAll<HTMLElement>(".cal-frame").forEach((frame) => {
        if (boundCalFrames.has(frame)) return;
        frame.addEventListener("mouseenter", enterCal);
        frame.addEventListener("mouseleave", leaveCal);
        boundCalFrames.add(frame);
      });
    };

    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (target?.closest(".cal-frame")) {
        enterCal();
        return;
      }

      root.classList.remove("cursor-over-cal");
      setOverCal(false);
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      setInteractive(Boolean(target?.closest(interactiveSelector)));
    };

    const hide = () => {
      setVisible(false);
      setOverCal(false);
      root.classList.remove("cursor-over-cal");
    };

    bindCalFrames();

    const observer = new MutationObserver(bindCalFrames);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pointermove", move, {
      passive: true,
      capture: true,
    });
    root.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      observer.disconnect();
      boundCalFrames.forEach((frame) => {
        frame.removeEventListener("mouseenter", enterCal);
        frame.removeEventListener("mouseleave", leaveCal);
      });
      root.classList.remove("cursor-enhanced", "cursor-over-cal");
      window.removeEventListener("pointermove", move, true);
      root.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow-layer"
      style={{ x, y }}
      animate={{ opacity: visible && !overCal ? 1 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.svg
        className="cursor-chevron"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ scale: interactive ? 1.16 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <path d="M2.1 1.85c-.68-.31-1.42.34-1.19 1.06l4.86 15.02c.24.75 1.27.85 1.66.16l3.04-5.35 5.92-2.15c.76-.28.82-1.33.1-1.69L2.1 1.85Z" />
      </motion.svg>
    </motion.div>
  );
}

