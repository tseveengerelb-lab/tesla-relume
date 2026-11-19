"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useState } from "react";

/** Spring that trails the real scroll a little, so the progress glides instead of ticking. */
const smooth = { stiffness: 140, damping: 28, restDelta: 0.001 };

/**
 * Scroll progress in two places:
 * - a 2px line along the top edge with a glowing head, filling as you read;
 * - after the first screen, a ring in the corner that fills the same way and
 *   takes you back to the top. The ring shows the percentage for screen readers.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, smooth);
  const headX = useTransform(progress, (v) => `${v * 100}vw`);
  const [percent, setPercent] = useState(0);
  const [away, setAway] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setPercent(Math.round(v * 100)));
  useMotionValueEvent(scrollY, "change", (y) => setAway(y > window.innerHeight));

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-20 h-0.5">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-accent/40 via-accent to-[#7aa2ff]"
          style={{ scaleX: progress }}
        />
        {/* Glowing head at the front of the line. */}
        <motion.div
          className="absolute top-1/2 -ml-3 h-1 w-6 -translate-y-1/2 rounded-full bg-[#9db8ff] blur-[3px]"
          style={{ x: headX }}
        />
      </div>

      <AnimatePresence>
        {away && (
          <motion.button
            type="button"
            aria-label={`Дээш буцах, хуудасны ${percent}% уншсан`}
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="group fixed right-4 bottom-4 z-20 grid size-12 place-items-center rounded-full bg-surface/80 text-ink shadow-lg shadow-black/40 backdrop-blur-md md:right-8 md:bottom-8"
          >
            <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" fill="none" aria-hidden>
              <circle cx="24" cy="24" r="21" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
              <motion.circle
                cx="24"
                cy="24"
                r="21"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>
            <svg
              viewBox="0 0 20 20"
              className="size-4 transition-transform duration-330 ease-tesla group-hover:-translate-y-0.5"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 15V5M5 9.5L10 4.5L15 9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
