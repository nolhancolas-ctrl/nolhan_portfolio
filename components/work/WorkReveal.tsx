"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
  smoothScale?: boolean;
};

export default function WorkReveal({ children, className = "", delay = 0, drift = 0, smoothScale = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A short, symmetrical focus window: arrive softly, stay crisp, then recede.
  const enter = 0.18 + Math.min(delay, 0.2) * 0.15;
  const leave = 0.82 + Math.min(delay, 0.2) * 0.15;
  const stops = [0, enter, leave, 1];
  const y = useTransform(scrollYProgress, stops, [drift, 0, 0, -drift]);
  const opacity = useTransform(scrollYProgress, stops, [0.7, 1, 1, 0.7]);
  const scale = useTransform(scrollYProgress, stops, [0.975, 1, 1, 0.975]);
  const easedScale = useSpring(scale, { stiffness: 110, damping: 27, mass: 0.75 });
  const filter = useTransform(scrollYProgress, stops, ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reducedMotion ? undefined : { y, opacity, scale: smoothScale ? easedScale : scale, filter }}
    >
      {children}
    </motion.div>
  );
}
