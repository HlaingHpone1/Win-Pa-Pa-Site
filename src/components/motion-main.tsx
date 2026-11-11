"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// CSS transitions on the same properties fight GSAP's inline styles (cards can end up stuck
// hidden), so switch them off while an element animates and hand them back afterwards.
function withoutCssTransitions(targets: gsap.TweenTarget) {
  gsap.set(targets, { transition: "none" });
  return () => gsap.set(targets, { clearProps: "transition" });
}

/*
 * Runs the page motion from data attributes so pages stay server components:
 * - [data-hero]       intro items, staggered in on load
 * - [data-hero-mark]  highlighter bar that sweeps across after the intro
 * - [data-reveal]     children slide up when the block scrolls into view
 * - [data-reveal-group] children (cards) stagger in when the group scrolls into view
 */
export function MotionMain({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero]");
        if (heroItems.length) {
          const intro = gsap.timeline({
            defaults: { duration: 0.8, ease: "power3.out" },
            onComplete: withoutCssTransitions(heroItems),
          });
          intro.from(heroItems, { autoAlpha: 0, y: 32, stagger: 0.09 });

          const mark = ref.current?.querySelector("[data-hero-mark]");
          if (mark) {
            intro.fromTo(
              mark,
              { backgroundSize: "0% 0.42em" },
              { backgroundSize: "100% 0.42em", duration: 0.7, ease: "power2.inOut" },
              "-=0.5",
            );
          }
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((block) => {
          gsap.from(block.children, {
            autoAlpha: 0,
            y: 28,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            onComplete: withoutCssTransitions(block.children),
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: withoutCssTransitions(group.children),
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
      });

      document.documentElement.classList.add("motion-ready");
      return () => mm.revert();
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <main ref={ref} id="content" className="flex flex-1 flex-col">
      {children}
    </main>
  );
}
