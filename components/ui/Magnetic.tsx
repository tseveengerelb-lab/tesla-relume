"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/** How far around the button (px) the pointer starts pulling it. */
const radius = 48;
/** Share of the pointer's distance from the centre that the button follows. */
const pull = 0.4;
/** Never drift further than this (px), so the button stays reachable. */
const maxShift = 18;
/** Spring: higher stiffness = snappier; lower damping = more bounce on release. */
const spring = { stiffness: 320, damping: 16, mass: 0.6 };

const clamp = (value: number) => Math.max(-maxShift, Math.min(maxShift, value));

/**
 * Magnetic wrapper: once the pointer comes within `radius` of the button, the
 * button leans toward it on a spring, and springs back with a small overshoot when
 * the pointer moves away. Kept for the order buttons only, so the one main action
 * stands out (figure–ground).
 */
export function Magnetic({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, spring);
  const y = useSpring(ty, spring);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const release = () => {
      tx.set(0);
      ty.set(0);
    };
    const onMove = (event: PointerEvent) => {
      // Touch and pen have no hover.
      if (event.pointerType !== "mouse") return release();
      const box = el.getBoundingClientRect();
      // The box includes the current offset; measure from the resting centre.
      const dx = event.clientX - (box.left - x.get() + box.width / 2);
      const dy = event.clientY - (box.top - y.get() + box.height / 2);
      // Full pull over the button, fading to nothing at `radius` outside it, so a
      // neighbouring button 16px away never gets covered.
      const outside = Math.max(Math.abs(dx) - box.width / 2, Math.abs(dy) - box.height / 2, 0);
      const strength = Math.max(0, 1 - outside / radius);
      tx.set(clamp(dx * pull) * strength);
      ty.set(clamp(dy * pull) * strength);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", release, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", release);
      document.documentElement.removeEventListener("pointerleave", release);
    };
  }, [reduce, tx, ty, x, y]);

  return (
    <motion.span ref={ref} style={{ x, y }} className={cx("inline-flex", className)}>
      {children}
    </motion.span>
  );
}
