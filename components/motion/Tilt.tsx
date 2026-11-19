"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Largest lean in degrees. Small on purpose: the card should feel held, not flipped. */
const maxTilt = 8;
const spring = { stiffness: 260, damping: 22, mass: 0.6 };

/**
 * 3D tilt card: leans toward the pointer in perspective and a soft light follows
 * it across the surface, as if the card catches the light. Mouse only; touch and
 * reduced-motion users get the flat card.
 */
export function Tilt({ className, children }: { className?: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  // Pointer position over the card, 0–1 on each axis; 0.5 is the centre.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const glareX = useTransform(sx, (v) => `${v * 100}%`);
  const glareY = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.14), transparent 55%)`;
  const glareOpacity = useSpring(0, spring);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width);
    py.set((event.clientY - box.top) / box.height);
    glareOpacity.set(1);
  };
  const leave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div className={cx("[perspective:900px]", className)} onPointerMove={move} onPointerLeave={leave}>
      <motion.div className="relative h-full rounded-lg [transform-style:preserve-3d]" style={{ rotateX, rotateY }}>
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.div>
    </div>
  );
}
