"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavLinks } from "@/components/nav-links";
import { company } from "@/content/site";

const SLIDE_MS = 300;

export function MobileNav() {
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);
  const t = useTranslations("Common");

  useEffect(() => {
    if (!present) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShown(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [present]);

  useEffect(() => {
    if (!present || shown) {
      return;
    }

    const timer = window.setTimeout(() => setPresent(false), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [present, shown]);

  function openMenu() {
    setPresent(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setShown(true));
    });
  }

  function closeMenu() {
    setShown(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-hairline bg-white text-ink transition-colors duration-300 ease-out hover:border-primary"
        aria-expanded={shown}
        aria-controls="mobile-menu"
        onClick={openMenu}
      >
        <span className="sr-only">{t("openMenu")}</span>
        <MenuIcon />
      </button>

      {present
        ? createPortal(
            <div className={`fixed inset-0 z-[60] overflow-hidden ${shown ? "" : "pointer-events-none"}`}>
              <div
                className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
                onClick={closeMenu}
              />
              <aside
                id="mobile-menu"
                aria-label={t("openMenu")}
                aria-hidden={!shown}
                inert={!shown}
                className={`absolute inset-y-0 right-0 flex h-full w-[min(20rem,86vw)] max-w-full flex-col bg-paper shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  shown ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                  <p className="font-display text-base font-semibold text-ink">{company.name}</p>
                  <button
                    type="button"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-hairline bg-white text-ink transition-colors duration-300 ease-out hover:border-primary"
                    onClick={closeMenu}
                  >
                    <span className="sr-only">{t("closeMenu")}</span>
                    <CloseIcon />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <NavLinks
                    onNavigate={closeMenu}
                    className="flex flex-col gap-1"
                    linkClassName="w-full px-3 text-lg"
                  />
                </nav>

                <div className="border-t border-hairline px-5 py-5">
                  <LanguageSwitcher />
                  <Button href="/contact" className="mt-4 w-full" onClick={closeMenu}>
                    {t("cta")}
                  </Button>
                </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
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
