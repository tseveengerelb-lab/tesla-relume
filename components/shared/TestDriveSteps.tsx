"use client";

import { motion } from "motion/react";
import { duration, easeOut, inView } from "@/components/motion/tokens";

/** "Цагаа товлох: өөрт тохирох..." → title and detail. */
function splitStep(step: string) {
  const [title, ...rest] = step.split(":");
  return { title: title.trim(), detail: rest.join(":").trim() };
}

/** Seconds between one step and the next. */
const gap = 0.25;

/**
 * Numbered steps joined by a vertical line (Gestalt: uniform connectedness):
 * the line says "one sequence" without extra words. Identical markers make the
 * steps read as peers (similarity); each title sits tight to its own detail
 * (proximity). As it scrolls in, each step arrives and then draws the line down
 * to the next, so the sequence plays out in order.
 */
export function TestDriveSteps({ steps }: { steps: string[] }) {
  return (
    <motion.ol className="flex flex-col" initial="hidden" whileInView="shown" viewport={inView}>
      {steps.map((step, index) => {
        const { title, detail } = splitStep(step);
        const last = index === steps.length - 1;
        return (
          <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <motion.span
                aria-hidden
                className="absolute top-8 bottom-0 left-[15px] w-px origin-top bg-line"
                variants={{
                  hidden: { scaleY: 0 },
                  shown: { scaleY: 1, transition: { duration: gap * 2, ease: easeOut, delay: index * gap + 0.2 } },
                }}
              />
            )}
            <motion.span
              className="flex size-8 flex-none items-center justify-center rounded-full bg-surface text-sm font-semibold tabular-nums"
              variants={{
                hidden: { opacity: 0, scale: 0.6 },
                shown: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20, delay: index * gap } },
              }}
            >
              {index + 1}
            </motion.span>
            <motion.div
              className="flex flex-col pt-1"
              variants={{
                hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
                shown: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: duration.enter, ease: easeOut, delay: index * gap + 0.05 },
                },
              }}
            >
              <span className="font-semibold">{title}</span>
              {detail && <span className="text-body">{detail}</span>}
            </motion.div>
          </li>
        );
      })}
    </motion.ol>
  );
}
