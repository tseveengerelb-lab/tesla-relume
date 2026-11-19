"use client";

import { useEffect, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { calLink } from "@/data/test-drive";

type CalApi = ((...args: unknown[]) => void) & { ns?: Record<string, (...args: unknown[]) => void> };
declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const NAMESPACE = "test-drive";

/**
 * Cal.com's official embed loader: a small stub that queues calls until
 * embed.js arrives, so a click right after page load still opens the popup.
 */
function loadCal() {
  if (window.Cal?.ns?.[NAMESPACE]) return;
  /* eslint-disable */
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) { a.q.push(ar); };
    const d = C.document;
    C.Cal = C.Cal || function () {
      const cal = C.Cal;
      const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api: any = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  /* eslint-enable */
  window.Cal!("init", NAMESPACE, { origin: "https://app.cal.com" });
  window.Cal!.ns![NAMESPACE]("ui", {
    theme: "dark",
    cssVarsPerTheme: { dark: { "cal-brand": "#3e6ae1" } },
    layout: "month_view",
  });
}

/**
 * Opens the Cal.com booking popup. It is a real link to the booking page, so
 * before the script loads (or if it is blocked) the click still works: it opens
 * Cal.com in a new tab.
 */
export function CalBookingButton({
  model,
  variant,
  className,
  children,
}: {
  model?: string;
  variant?: Parameters<typeof buttonClass>[0]["variant"];
  className?: string;
  children: ReactNode;
}) {
  useEffect(loadCal, []);

  return (
    <a
      href={`https://cal.com/${calLink}`}
      target="_blank"
      rel="noopener"
      className={buttonClass({ variant, className })}
      onClick={(e) => {
        const open = window.Cal?.ns?.[NAMESPACE];
        if (!open) return;
        e.preventDefault();
        open("modal", {
          calLink,
          config: { layout: "month_view", theme: "dark", ...(model ? { notes: `Загвар: ${model}` } : {}) },
        });
      }}
    >
      {children}
    </a>
  );
}
