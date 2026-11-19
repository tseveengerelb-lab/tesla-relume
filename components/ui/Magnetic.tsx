"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/** How far around the button (px) the pointer starts pulling it. */
const radius = 48;
/** Share of the pointer's distance from the centre that the button follows. */
const pull = 0.4;
/** Never drift further than this (px), so the button stays reachable. */
const maxShift = 18;
/** Spring: higher stiffness = snappier; lower damping = more bounce on release. */
const stiffness = 0.18;
const damping = 0.72;

const clamp = (value: number) => Math.max(-maxShift, Math.min(maxShift, value));

/**
 * Magnetic wrapper: once the pointer comes within `radius` of the button, the
 * button leans toward it on a spring, and springs back with a small overshoot when
 * the pointer moves away. A spring follows the pointer every frame, so there is no
 * lag of a fixed-length CSS transition. Kept for the order buttons only, so the one
 * main action stands out (figure–ground).
 */
export function Magnetic({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");

    let x = 0, y = 0; // current offset
    let vx = 0, vy = 0; // velocity
    let tx = 0, ty = 0; // target offset
    let frame = 0;

    const tick = () => {
      vx = (vx + (tx - x) * stiffness) * damping;
      vy = (vy + (ty - y) * stiffness) * damping;
      x += vx;
      y += vy;
      const settled = Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05 && Math.abs(vx) + Math.abs(vy) < 0.05;
      if (settled) {
        x = tx;
        y = ty;
      }
      el.style.transform = x || y ? `translate3d(${x}px, ${y}px, 0)` : "";
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const aim = (nx: number, ny: number) => {
      tx = nx;
      ty = ny;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const release = () => aim(0, 0);

    const onMove = (event: PointerEvent) => {
      // Touch and pen have no hover; reduced motion means no movement at all.
      if (event.pointerType !== "mouse" || reduce.matches) return release();
      const box = el.getBoundingClientRect();
      // The box includes the current offset; measure from the resting centre.
      const dx = event.clientX - (box.left - x + box.width / 2);
      const dy = event.clientY - (box.top - y + box.height / 2);
      // Full pull over the button, fading to nothing at `radius` outside it, so a
      // neighbouring button 16px away never gets covered.
      const outside = Math.max(Math.abs(dx) - box.width / 2, Math.abs(dy) - box.height / 2, 0);
      const strength = 1 - outside / radius;
      if (strength > 0) aim(clamp(dx * pull) * strength, clamp(dy * pull) * strength);
      else release();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", release, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", release);
      document.documentElement.removeEventListener("pointerleave", release);
    };
  }, []);

  return (
    <span ref={ref} className={cx("inline-flex", className)}>
      {children}
    </span>
  );
}
