"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { buttonClass } from "./Button";

const swap = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(4px)" },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
};

/** Thin ring that spins while the request runs. */
function Spinner() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 animate-spin" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.2" />
      <path d="M18 10a8 8 0 0 0-8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

type LoadingButtonProps = {
  pending: boolean;
  /** Shown while waiting, next to the spinner. */
  pendingLabel: string;
  className?: string;
  children: ReactNode;
};

/**
 * Submit button that never jumps: the label slides out, a spinner and the
 * pending label slide in, and the button's width eases to fit (layout animation)
 * instead of snapping. Stays one control throughout, so focus is never lost.
 */
export function LoadingButton({ pending, pendingLabel, className, children }: LoadingButtonProps) {
  return (
    <motion.button
      type="submit"
      layout
      disabled={pending}
      aria-busy={pending}
      transition={{ layout: { type: "spring", stiffness: 500, damping: 40 } }}
      className={buttonClass({ className: `overflow-hidden disabled:cursor-progress ${className ?? ""}` })}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {pending ? (
          <motion.span key="pending" className="inline-flex items-center gap-2" {...swap}>
            <Spinner />
            {pendingLabel}
          </motion.span>
        ) : (
          <motion.span key="idle" className="inline-flex items-center" {...swap}>
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
