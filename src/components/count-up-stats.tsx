"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

function formatStat(value: number, stat: ReturnType<typeof parseStat>) {
  const number = stat.grouped ? value.toLocaleString("en-US") : String(value);
  return `${stat.prefix}${number}${stat.suffix}`;
}

export function CountUpStats({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-count]");

        nodes.forEach((node) => {
          const stat = parseStat(node.dataset.count ?? "");
          const counter = { value: 0 };
          node.textContent = formatStat(0, stat);

          gsap.to(counter, {
            value: stat.target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
            onUpdate: () => {
              node.textContent = formatStat(Math.round(counter.value), stat);
            },
          });
        });

        // Put the real values back if the animation is torn down mid-count.
        return () => {
          nodes.forEach((node) => {
            node.textContent = node.dataset.count ?? "";
          });
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid divide-y divide-ink/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {stats.map((stat) => (
        <div key={stat.id} className="py-8 text-center sm:px-8 sm:py-14 sm:text-left sm:first:pl-0">
          <p className="text-display tabular-nums text-ink" aria-label={stat.value}>
            <span aria-hidden data-count={stat.value}>
              {stat.value}
            </span>
          </p>
          <p className="text-eyebrow mt-3 text-ink/75">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
