"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { EASE_OUT_EXPO } from "./ease";

/**
 * Wraps the hero image: it fades in on load, drifts with scroll, tilts toward
 * the cursor, and a soft highlight follows the pointer across its surface.
 */
export function TiltFrame({
  children,
  className,
  delay = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [4, -4]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-5, 5]), { stiffness: 120, damping: 20 });
  const highlightX = useTransform(pointerX, [0, 1], [0, 100]);
  const highlightY = useTransform(pointerY, [0, 1], [0, 100]);
  const highlight = useMotionTemplate`radial-gradient(520px circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.09), transparent 45%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const grow = useTransform(scrollYProgress, [0, 0.35], [0.94, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };
  const onPointerLeave = (): void => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
      style={{ perspective: 1400 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div className="relative" style={{ y: drift, scale: grow, rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ backgroundImage: highlight }}
        />
      </motion.div>
    </motion.div>
  );
}
