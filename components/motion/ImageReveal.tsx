"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { duration, easeOut, inView } from "./tokens";

/**
 * Mask reveal: the photo is uncovered from the bottom up while it settles from a
 * slight zoom. Used for large model photos as they scroll in.
 *
 * The outer frame is what gets watched: Chrome counts a fully clipped element as
 * invisible, so watching the masked layer itself would never fire.
 */
export function ImageReveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, inView);
  const reduce = useReducedMotion();
  const shown = seen || reduce;

  return (
    <div ref={ref} className={cx("relative", className)}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-lg"
        initial={false}
        animate={{ clipPath: shown ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: shown && !reduce ? duration.media : 0, ease: easeOut }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: shown ? 1 : 1.15 }}
          transition={{ duration: shown && !reduce ? duration.media + 0.4 : 0, ease: easeOut }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
