"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Glyphs shown while a letter is still "decoding". */
const glyphs = "АБВГДЕЖЗИКЛМНОӨПРСТУҮФХЦЧШЭЮЯ0123456789#%&*+=<>";
/** Seconds for the whole line to resolve. */
const total = 0.9;
/** Each letter flickers for this long before it settles (seconds). */
const flicker = 0.35;

const random = () => glyphs[Math.floor(Math.random() * glyphs.length)];

/**
 * Text scramble: when the line scrolls into view every letter flickers through
 * random glyphs, then the letters settle one after another from left to right.
 * The real text sits underneath (invisible) to hold the width, so nothing around
 * it shifts, and screen readers only ever read the real text.
 */
export function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!seen || reduce) return;
    const letters = [...text];
    const step = (total - flicker) / Math.max(letters.length - 1, 1);
    let frame = 0;
    let start = 0;
    let last = 0;
    const tick = (now: number) => {
      start ||= now + delay * 1000;
      const t = (now - start) / 1000;
      // Change the random glyphs about 30 times a second, not every frame.
      if (now - last > 33) {
        last = now;
        setShown(
          letters
            .map((char, i) => (char === " " || t < 0 || t >= i * step + flicker ? char : random()))
            .join(""),
        );
      }
      if (t < total) frame = requestAnimationFrame(tick);
      else setShown(text);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, reduce, text, delay]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0 whitespace-nowrap">
        {shown}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
