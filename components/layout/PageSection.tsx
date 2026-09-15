"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 8%"],
  });

  const progressStops = mobile
    ? [0, 0.045, 0.12, 0.88, 0.955, 1]
    : [0, 0.17, 0.29, 0.76, 0.91, 1];

  const rawOpacity = useTransform(
    scrollYProgress,
    progressStops,
    mobile
      ? [0.02, 0.3, 1, 1, 0.3, 0.02]
      : [0.03, 0.13, 1, 1, 0.28, 0.03],
  );

  const rawY = useTransform(
    scrollYProgress,
    progressStops,
    mobile
      ? [52, 20, 0, 0, -20, -48]
      : [96, 70, 0, 0, -48, -78],
  );

  const rawScale = useTransform(
    scrollYProgress,
    progressStops,
    mobile
      ? [0.955, 0.985, 1, 1, 0.985, 0.955]
      : [0.9, 0.94, 1, 1, 0.94, 0.9],
  );

  const filter = useTransform(
    scrollYProgress,
    progressStops,
    mobile
      ? [
          "blur(6px)",
          "blur(2px)",
          "blur(0px)",
          "blur(0px)",
          "blur(2px)",
          "blur(6px)",
        ]
      : [
          "blur(13px)",
          "blur(10px)",
          "blur(0px)",
          "blur(0px)",
          "blur(7px)",
          "blur(11px)",
        ],
  );

  const spring = mobile
    ? { stiffness: 360, damping: 34, mass: 0.18 }
    : { stiffness: 180, damping: 28, mass: 0.32 };

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
        style={
          reducedMotion
            ? undefined
            : {
                opacity,
                y,
                scale,
                filter,
                transformOrigin: "50% 48%",
              }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}
