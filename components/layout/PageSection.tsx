"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PageSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 8%"],
  });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.17, 0.29, 0.76, 0.91, 1], [0.03, 0.13, 1, 1, 0.28, 0.03]);
  const rawY = useTransform(scrollYProgress, [0, 0.17, 0.29, 0.76, 0.91, 1], [96, 70, 0, 0, -48, -78]);
  const rawScale = useTransform(scrollYProgress, [0, 0.17, 0.29, 0.76, 0.91, 1], [0.9, 0.94, 1, 1, 0.94, 0.9]);
  const filter = useTransform(scrollYProgress, [0, 0.17, 0.29, 0.76, 0.91, 1], ["blur(13px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(7px)", "blur(11px)"]);
  const spring = { stiffness: 180, damping: 28, mass: 0.32 };
  const opacity = useSpring(rawOpacity, spring);
  const y = useSpring(rawY, spring);
  const scale = useSpring(rawScale, spring);

  return (
    <section
      ref={ref}
      id={id}
      className={`
        page-section w-full
        max-w-5xl 
        mx-auto 
        px-6 
        py-24 
        ${className}
      `}
    >
      <motion.div
        className="page-section-stage"
        style={reducedMotion ? undefined : { opacity, y, scale, filter }}
      >
        {children}
      </motion.div>
    </section>
  );
}

