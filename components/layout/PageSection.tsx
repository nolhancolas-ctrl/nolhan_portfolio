"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const opacity = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0.18, 1, 1, 0.18]);
  const y = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [72, 0, 0, -64]);
  const scale = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0.985, 1, 1, 0.99]);
  const filter = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

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

