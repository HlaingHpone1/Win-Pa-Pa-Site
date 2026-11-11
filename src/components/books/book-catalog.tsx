"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useRef, useSyncExternalStore } from "react";
import { BookCard } from "@/components/books/book-card";
import { bookCategories, books, type BookCategory } from "@/content/books";

gsap.registerPlugin(useGSAP);

type Filter = BookCategory | "all";

const HASH_EVENT = "wpp:hash";

function readFilter(): Filter {
  const hash = window.location.hash.slice(1);
  return bookCategories.includes(hash as BookCategory) ? (hash as BookCategory) : "all";
}

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  window.addEventListener(HASH_EVENT, listener);
  return () => {
    window.removeEventListener("hashchange", listener);
    window.removeEventListener(HASH_EVENT, listener);
  };
}

function setFilter(filter: Filter) {
  // replaceState keeps the scroll position, unlike assigning location.hash.
  const url = filter === "all" ? window.location.pathname : `#${filter}`;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(HASH_EVENT));
}

export function BookCatalog() {
  const t = useTranslations("Books");
  const gridRef = useRef<HTMLUListElement>(null);
  const filter = useSyncExternalStore(subscribe, readFilter, () => "all" as Filter);
  const visible = filter === "all" ? books : books.filter((book) => book.category === filter);
  const filters: Filter[] = ["all", ...bookCategories];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(gridRef.current?.children ?? [], {
          autoAlpha: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label={t("filterLabel")}
          className="flex flex-wrap gap-1 rounded-brand border border-hairline bg-white p-1.5"
        >
          {filters.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                className={`inline-flex min-h-11 items-center gap-2 rounded-brand px-4 text-sm font-semibold transition-colors duration-300 ease-out ${
                  active ? "bg-ink text-white" : "text-ink hover:bg-primary-soft"
                }`}
                onClick={() => setFilter(item)}
              >
                {active ? <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" /> : null}
                {item === "all" ? t("all") : t(`categories.${item}`)}
              </button>
            );
          })}
        </div>
        <p className="text-eyebrow text-primary-ink" aria-live="polite">
          {t("count", { count: visible.length })}
        </p>
      </div>

      <ul ref={gridRef} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}
