"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  id: string;
  value: string;
  label: string;
};

function parseStat(value: string) {
  const match = value.match(/^(.*?)(\d[\d,]*)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, suffix: value, grouped: false };
  }

  return {
    prefix: match[1],
    target: Number(match[2].replaceAll(",", "")),
    suffix: match[3],
    grouped: match[2].includes(","),
  };
}

function formatNumber(value: number, grouped: boolean) {
  return grouped ? value.toLocaleString("en-US") : String(value);
}

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

export function CountUpStats({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-8 py-10 sm:grid-cols-3">
      {stats.map((stat) => (
        <CountUpStat key={stat.id} stat={stat} active={active} />
      ))}
    </div>
  );
}

function CountUpStat({ stat, active }: { stat: Stat; active: boolean }) {
  const parsed = parseStat(stat.value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setCount(parsed.target);
      return;
    }

    const duration = 1400;
    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      setCount(Math.round(parsed.target * easeOutCubic(progress)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, parsed.target]);

  return (
    <div className="text-center sm:text-left">
      <p
        className="font-display text-4xl font-semibold tabular-nums text-white"
        aria-label={stat.value}
      >
        <span aria-hidden>
          {parsed.prefix}
          {formatNumber(count, parsed.grouped)}
          {parsed.suffix}
        </span>
      </p>
      <p className="mt-1 text-sm text-white/90">{stat.label}</p>
    </div>
  );
}
