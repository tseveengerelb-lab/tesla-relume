"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user": when someone asks their OS for less motion, Motion drops
 * every movement (transform) and keeps only fades, matching the CSS rule in globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
