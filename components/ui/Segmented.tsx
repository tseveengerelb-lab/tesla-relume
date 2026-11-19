"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { cx } from "@/lib/cx";

type SegmentedProps = {
  /** Form field name. */
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
  /** Tailwind grid columns, e.g. "grid-cols-3". */
  columns?: string;
};

/**
 * Tabs-style choice (morphing tabs): one highlight slides between options with a
 * spring (shared layout, layoutId), instead of each option switching on and off.
 * Real radio inputs underneath, so arrow keys, form submit and required all work
 * as usual. Every option is visible at once: one tap instead of opening a list.
 */
export function Segmented({ name, label, options, defaultValue, required, columns = "grid-cols-3" }: SegmentedProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const id = useId();

  return (
    <fieldset className="flex w-full flex-col gap-2">
      <legend className="mb-2">{label}</legend>
      <div className={cx("grid gap-1 rounded-lg bg-canvas p-1", columns)}>
        {options.map((option, index) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={cx(
                "relative flex min-h-10 items-center justify-center rounded-md px-2 text-sm font-medium whitespace-nowrap tabular-nums transition-colors duration-330 ease-tesla",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                selected ? "text-white" : "text-body hover:text-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={() => setValue(option)}
                required={required && index === 0}
                className="sr-only"
              />
              {selected && (
                <motion.span
                  layoutId={`${id}-pill`}
                  className="absolute inset-0 rounded-md bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative">{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
