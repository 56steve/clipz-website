"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Image frame that opens up as it scrolls into view: the clip mask widens and
 * the picture inside settles from slightly zoomed in.
 */
export function ScrollImage({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 35%"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(14% 12% 14% 12% round 28px)", "inset(0% 0% 0% 0% round 16px)"]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ clipPath }} className="overflow-hidden">
        <motion.div style={{ scale }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}
