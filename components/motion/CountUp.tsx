"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts the number inside a value up from zero the first time it scrolls into
 * view: "~507 км" runs 0 → 507, "2.9 с" runs 0.0 → 2.9, "$50,000" keeps its commas.
 * Left as plain text when the value is not a single number ("5 буюу 7",
 * "2.6–4.1 с") or is a year. The server renders the final value, so the figure
 * is right without JavaScript and for search engines.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const numbers = value.match(/\d[\d,]*(\.\d+)?/g) ?? [];
  const raw = numbers.length === 1 ? numbers[0] : null;
  const target = raw ? Number(raw.replace(/,/g, "")) : NaN;
  const isYear = raw !== null && /^(19|20)\d\d$/.test(raw);
  const countable = raw !== null && Number.isFinite(target) && !isYear && !reduce;

  const decimals = raw?.split(".")[1]?.length ?? 0;
  const commas = raw?.includes(",") ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el || !countable || !raw) return;
    const [before, after] = [value.slice(0, value.indexOf(raw)), value.slice(value.indexOf(raw) + raw.length)];
    const show = (n: number) => {
      const text = commas
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
      el.textContent = before + text + after;
    };
    if (!seen) {
      show(0);
      return;
    }
    const controls = animate(0, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: show });
    return () => controls.stop();
  }, [seen, countable, raw, value, target, decimals, commas]);

  return <span ref={ref}>{value}</span>;
}
