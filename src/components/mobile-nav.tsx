"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { NavLinks } from "@/components/nav-links";
import { company } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-hairline bg-white text-ink"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <CloseIcon />
        ) : (
          <MenuIcon />
        )}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto bg-paper px-5 py-8"
        >
          <NavLinks
            onNavigate={() => setOpen(false)}
            className="flex flex-col gap-2"
            linkClassName="text-lg"
          />
          <div className="mt-8">
            <Button href="/contact" className="w-full" onClick={() => setOpen(false)}>
              {company.cta}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
