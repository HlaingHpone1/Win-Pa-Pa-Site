"use client";

import { useLocale } from "next-intl";
import Script from "next/script";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * Off-screen field real visitors never see or fill in. Bots that fill every input
 * fill this too, and the server quietly drops their submission.
 */
export function HoneypotField() {
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

/** When the form first appeared; the server rejects anything sent back too quickly. */
export function useStartedAt() {
  const [startedAt] = useState(() => Date.now());
  return startedAt;
}

export type TurnstileHandle = { reset: () => void };

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile check. The widget adds a hidden `cf-turnstile-response`
 * input to the surrounding form; each token works once, so call reset() after a failed send.
 */
export function Turnstile({ ref }: { ref?: React.Ref<TurnstileHandle> }) {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current !== undefined) {
        window.turnstile?.reset(widgetId.current);
      }
    },
  }));

  useEffect(
    () => () => {
      if (widgetId.current !== undefined) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = undefined;
      }
    },
    [],
  );

  function render() {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetId.current !== undefined) {
      return;
    }
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      size: "flexible",
      theme: "light",
      language: locale === "en" ? "en" : "auto",
    });
  }

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onReady={render} />
      <div ref={containerRef} className="min-h-[65px] overflow-hidden rounded-brand" />
    </>
  );
}
