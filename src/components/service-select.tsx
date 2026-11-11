"use client";

import { useEffect, useId, useRef, useState } from "react";

export type ServiceOption = {
  value: string;
  label: string;
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
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
        break;
      case "ArrowUp":
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
        className={`group flex min-h-12 w-full items-center gap-3 rounded-brand border bg-paper px-3.5 text-left text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-ink/25 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/25 ${
          open ? "border-primary bg-white ring-4 ring-primary/25" : "border-hairline"
        }`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openList();
          }
        }}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-brand bg-primary-soft text-primary-ink">
          {selected.icon}
        </span>
        <span id={`${id}-value`} className="flex-1 font-medium">
          {selected.label}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className={`shrink-0 text-slate transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={`${id}-list`}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onKeyDown={onListKeyDown}
        className={`absolute inset-x-0 top-full z-20 mt-2 grid gap-1 rounded-brand border border-hairline bg-white p-1.5 shadow-[0_24px_48px_-20px_rgba(14,17,11,0.35)] outline-none transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
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
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-brand px-2.5 py-2 transition-colors duration-200 ease-out ${
                isActive ? "bg-paper" : ""
              } ${isSelected ? "font-semibold text-ink" : "text-slate"}`}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => choose(index)}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-brand transition-colors duration-200 ease-out ${
                  isSelected ? "bg-primary text-ink" : "bg-paper text-slate"
                }`}
              >
                {option.icon}
              </span>
              <span className="flex-1">{option.label}</span>
              {isSelected ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0 text-primary-ink">
                  <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
