"use client";

import { motion } from "motion/react";
import { duration, easeOut } from "./tokens";

/**
 * Word-by-word blur-in for the one headline that opens a page. Each word rises
 * 0.35em and comes into focus; the spaces stay real text, so screen readers and
 * copy-paste get the sentence unchanged.
 */
export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={index}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: duration.enter + 0.2, ease: easeOut, delay: delay + index * 0.1 }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
