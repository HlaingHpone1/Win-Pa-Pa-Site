"use client";

import { useSyncExternalStore } from "react";
import { getBook, MAX_QTY, type Book } from "@/content/books";

export type CartItem = { id: string; qty: number };
export type CartLine = { book: Book; qty: number; total: number };

const STORAGE_KEY = "wpp-cart";
const OPEN_EVENT = "wpp:open-cart";

const empty: CartItem[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = empty;

function parse(raw: string | null): CartItem[] {
  if (!raw) {
    return empty;
  }
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) {
      return empty;
    }
    return value.flatMap((entry) => {
      const id = typeof entry?.id === "string" ? entry.id : "";
      const qty = Math.min(MAX_QTY, Math.floor(Number(entry?.qty)));
      return getBook(id) && qty > 0 ? [{ id, qty }] : [];
    });
  } catch {
    return empty;
  }
}

function getSnapshot() {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cachedItems;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedItems = parse(raw);
  }
  return cachedItems;
}

function getServerSnapshot() {
  return empty;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(items: CartItem[]) {
  const raw = JSON.stringify(items);
  cachedRaw = raw;
  cachedItems = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Private mode or full storage: the cart still works for this page view.
  }
  listeners.forEach((listener) => listener());
}

export function addToCart(id: string, qty = 1) {
  const items = getSnapshot();
  const existing = items.find((item) => item.id === id);
  write(
    existing
      ? items.map((item) => (item.id === id ? { id, qty: Math.min(MAX_QTY, item.qty + qty) } : item))
      : [...items, { id, qty }],
  );
}

export function setCartQty(id: string, qty: number) {
  const items = getSnapshot();
  write(
    qty <= 0
      ? items.filter((item) => item.id !== id)
      : items.map((item) => (item.id === id ? { id, qty: Math.min(MAX_QTY, qty) } : item)),
  );
}

export function clearCart() {
  write(empty);
}

export function openCart() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCart(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lines: CartLine[] = items.flatMap((item) => {
    const book = getBook(item.id);
    return book ? [{ book, qty: item.qty, total: book.price * item.qty }] : [];
  });

  return {
    items,
    lines,
    count: lines.reduce((sum, line) => sum + line.qty, 0),
    subtotal: lines.reduce((sum, line) => sum + line.total, 0),
  };
}

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards; avoids flashing an empty cart. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
