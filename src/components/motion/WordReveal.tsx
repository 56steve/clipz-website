"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "./ease";

interface WordRevealProps {
  /** Each entry is one line; words rise out of a mask one after another. */
  lines: string[];
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Animate on page load instead of when scrolled into view. */
  onLoad?: boolean;
}

/** Headline animation: every word slides up from behind a clipping mask. */
export function WordReveal({ lines, className, delay = 0, onLoad = false }: WordRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  // Position of every word across all lines, computed up front so render stays pure.
  const wordLines = lines.map((line) => line.split(" "));
  const offsets = wordLines.map((_, i) =>
    wordLines.slice(0, i).reduce((total, words) => total + words.length, 0)
  );
  const trigger = onLoad
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <span className={className}>
      {wordLines.map((words, lineIndex) => (
        <span key={lines[lineIndex]} className="block">
          {words.map((word, wordIndex) => (
            // The trigger sits on this visible wrapper. Observing the word itself
            // never fires, because it starts translated outside its own clip mask.
            <motion.span
              key={`${word}-${wordIndex}`}
              className="inline-block overflow-hidden pb-[0.12em] align-bottom"
              initial="hidden"
              {...trigger}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  shown: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.9,
                      delay: delay + (offsets[lineIndex] + wordIndex) * 0.07,
                      ease: EASE_OUT_EXPO,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
              {"\u00A0"}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
