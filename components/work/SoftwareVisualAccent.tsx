"use client";

import { motion, useReducedMotion } from "framer-motion";

type SymbolName = "publish" | "autonomy" | "handoff";

export function SoftwareSymbol({ name, className = "" }: { name: SymbolName; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-[#675795] shadow-[0_8px_24px_rgba(68,50,117,0.08)] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" width="22" height="22" {...common}>
        {name === "publish" && <><rect x="7" y="5.5" width="18" height="21" rx="3" /><path d="M11 11h10M11 15h7M11 19h9" /><path d="m20 24 2 2 4-4" /></>}
        {name === "autonomy" && <><path d="M16 3.5 24 7v7c0 6-3.4 10.7-8 14-4.6-3.3-8-8-8-14V7l8-3.5Z" /><path d="m11.7 15.9 2.8 2.8 5.8-5.9" /></>}
        {name === "handoff" && <><circle cx="8" cy="16" r="3" /><circle cx="24" cy="9" r="3" /><circle cx="24" cy="23" r="3" /><path d="m11 15 10-5M11 17l10 5" /></>}
      </svg>
    </span>
  );
}

export default function SoftwareVisualAccent({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none relative h-24 w-24 [perspective:500px] ${className}`}
      animate={reducedMotion ? undefined : { y: [0, -7, 0], rotateZ: [-3, 3, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff_0%,#ded2f6_30%,#887ab5_68%,#49406d_100%)] shadow-[inset_-8px_-10px_18px_rgba(45,35,85,.25),0_15px_28px_rgba(75,57,120,.2)] [transform:rotateX(18deg)]" />
      <div className="absolute left-0 top-[41%] h-8 w-full rotate-[-23deg] rounded-[50%] border-[3px] border-white/80 shadow-[0_2px_7px_rgba(77,59,133,.2)]" />
      <div className="absolute right-3 top-2 h-2 w-2 rounded-full bg-[#cf9eb4] shadow-[0_0_12px_#d5aac5]" />
    </motion.div>
  );
}
