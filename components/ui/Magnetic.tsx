"use client";

import type { PointerEvent, ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Share of the pointer's distance from the centre that the button follows. */
const pull = 0.3;
/** Never drift further than this, so the button stays under the pointer. */
const maxShift = 10;

const clamp = (value: number) => Math.max(-maxShift, Math.min(maxShift, value));

function move(event: PointerEvent<HTMLSpanElement>) {
  const el = event.currentTarget;
  // Touch and pen have no hover; reduced motion means no movement at all.
  if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${clamp((event.clientX - box.left - box.width / 2) * pull)}px`);
  el.style.setProperty("--my", `${clamp((event.clientY - box.top - box.height / 2) * pull)}px`);
}

function reset(event: PointerEvent<HTMLSpanElement>) {
  event.currentTarget.style.setProperty("--mx", "0px");
  event.currentTarget.style.setProperty("--my", "0px");
}

/**
 * Magnetic wrapper: the button leans toward the pointer and settles back when it
 * leaves. Kept for the order buttons only, so the one main action stands out
 * (figure–ground); every other control keeps colour-only motion.
 */
export function Magnetic({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      onPointerMove={move}
      onPointerLeave={reset}
      className={cx(
        "inline-flex translate-x-(--mx,0px) translate-y-(--my,0px) transition-transform duration-330 ease-tesla",
        className,
      )}
    >
      {children}
    </span>
  );
}
