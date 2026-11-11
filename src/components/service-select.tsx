"use client";

import { useEffect, useId, useRef, useState } from "react";

export type ServiceOption = {
  value: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
};

export function ServiceSelect({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: readonly ServiceOption[];
  defaultValue: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    listRef.current?.focus();
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openList() {
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (option) {
      setValue(option.value);
    }
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + options.length) % options.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative grid gap-2 text-sm">
      <span id={`${id}-label`} className="font-medium text-ink">
        {label}
      </span>
      <input type="hidden" name={name} value={value} />
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        className={`group relative flex w-full items-center gap-3.5 overflow-hidden rounded-brand border p-2.5 pr-3 text-left outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out focus-visible:ring-4 focus-visible:ring-primary/25 ${
          open
            ? "border-primary bg-white ring-4 ring-primary/25"
            : "border-hairline bg-paper hover:border-primary/60 hover:bg-white"
        }`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openList();
          }
        }}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-primary text-ink shadow-[0_8px_20px_-10px_rgba(77,201,52,0.9)]">
          {selected.icon}
        </span>
        <span id={`${id}-value`} className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{selected.label}</span>
          <span className="block truncate text-xs text-slate">{selected.hint}</span>
        </span>
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-brand transition-colors duration-300 ease-out ${
            open ? "bg-ink text-primary" : "bg-white text-ink group-hover:bg-ink group-hover:text-primary"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <ul
        ref={listRef}
        id={`${id}-list`}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onKeyDown={onListKeyDown}
        className={`grain absolute inset-x-0 top-full z-30 mt-2 grid origin-top gap-2 overflow-hidden rounded-brand border border-white/10 bg-ink p-2 shadow-[0_32px_64px_-24px_rgba(14,17,11,0.7)] outline-none transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:grid-cols-2 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const isActive = index === activeIndex;
          return (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={isSelected}
              className={`relative flex cursor-pointer items-start gap-3 rounded-brand border p-3.5 transition-[background-color,border-color,transform] duration-200 ease-out ${
                isSelected
                  ? "border-primary bg-primary text-ink"
                  : isActive
                    ? "border-primary/50 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white"
              } ${open ? "translate-y-0" : "translate-y-1"}`}
              style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => choose(index)}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-brand transition-colors duration-200 ease-out ${
                  isSelected ? "bg-ink text-primary" : "bg-white/10 text-primary"
                }`}
              >
                {option.icon}
              </span>
              <span className="min-w-0 flex-1 pr-6">
                <span className="block font-semibold">{option.label}</span>
                <span className={`mt-0.5 block text-xs leading-5 ${isSelected ? "text-ink/70" : "text-white/55"}`}>
                  {option.hint}
                </span>
              </span>
              <span
                aria-hidden
                className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full transition-[opacity,transform] duration-200 ease-out ${
                  isSelected ? "scale-100 bg-ink text-primary opacity-100" : "scale-50 opacity-0"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                  <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
