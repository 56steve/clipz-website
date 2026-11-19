"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "./ease";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Start offset in px. */
  y?: number;
  /** Animate on page load instead of when scrolled into view. */
  onLoad?: boolean;
}

/** Fades, lifts and un-blurs its children. Renders plain markup for reduced motion. */
export function Reveal({ children, className, delay = 0, y = 28, onLoad = false }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const hidden = { opacity: 0, y, filter: "blur(8px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = { duration: 0.9, delay, ease: EASE_OUT_EXPO };

  return onLoad ? (
    <motion.div className={className} initial={hidden} animate={shown} transition={transition}>
      {children}
    </motion.div>
  ) : (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
