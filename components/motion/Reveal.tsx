"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { duration, easeOut, inView, stagger } from "./tokens";

/** Fade up from 24px with a soft blur: the blur makes the arrival read as "focusing in". */
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  // `custom` carries an extra delay (variant transitions override the transition
  // prop). Left out when unset: an explicit delay of 0 would cancel the stagger.
  shown: (delay?: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.enter, ease: easeOut, ...(delay ? { delay } : {}) },
  }),
};

type RevealProps = { className?: string; delay?: number; children: ReactNode };

/** One block that fades up the first time it scrolls into view. */
export function Reveal({ className, delay = 0, children }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="shown"
      viewport={inView}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/**
 * A group whose StaggerItem children arrive one after another. Similar things
 * arrive the same way (Gestalt: similarity), and the order follows reading order.
 */
export function Stagger({ className, delay = 0, children }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={inView}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
