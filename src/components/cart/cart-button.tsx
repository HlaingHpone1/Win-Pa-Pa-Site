"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/button";
import { BookCover } from "@/components/books/book-cover";
import { onOpenCart, setCartQty, useCart } from "@/components/cart/cart-store";
import { formatKs, MAX_QTY } from "@/content/books";

const SLIDE_MS = 300;

const iconButton =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-brand border border-white/15 bg-white/10 text-white transition-colors duration-300 ease-out hover:border-primary hover:text-primary";

/** Header cart button plus the slide-in cart drawer (same open/close pattern as MobileNav). */
export function CartButton() {
  const t = useTranslations("Cart");
  const tBooks = useTranslations("Books");
  const { lines, count, subtotal } = useCart();
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => onOpenCart(openDrawer), []);

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

  function openDrawer() {
    setPresent(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setShown(true));
    });
  }

  function closeDrawer() {
    setShown(false);
  }

  return (
    <>
      <button
        type="button"
        className={`${iconButton} relative`}
        aria-expanded={shown}
        aria-controls="cart-drawer"
        onClick={openDrawer}
      >
        <span className="sr-only">
          {t("open")} ({count})
        </span>
        <BagIcon />
        {count > 0 ? (
          <span
            aria-hidden
            className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.6875rem] font-bold text-ink tabular-nums ring-2 ring-ink"
          >
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </button>

      {present
        ? createPortal(
            <div className={`fixed inset-0 z-[60] overflow-hidden ${shown ? "" : "pointer-events-none"}`}>
              <div
                className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
                onClick={closeDrawer}
              />
              <aside
                id="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-label={t("title")}
                aria-hidden={!shown}
                inert={!shown}
                className={`grain absolute inset-y-0 right-0 flex h-full w-[min(26rem,92vw)] max-w-full flex-col bg-ink shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  shown ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <p className="text-subtitle text-white">
                    {t("title")}
                    <span className="ml-2 align-middle text-sm font-normal text-white/50 tabular-nums">
                      ({count})
                    </span>
                  </p>
                  <button type="button" className={iconButton} onClick={closeDrawer}>
                    <span className="sr-only">{t("close")}</span>
                    <CloseIcon />
                  </button>
                </div>

                {lines.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-brand bg-white/10 text-primary">
                      <BagIcon size={28} />
                    </span>
                    <p className="text-body text-white/70">{t("empty")}</p>
                    <Button href="/books" arrow onClick={closeDrawer}>
                      {t("browse")}
                    </Button>
                  </div>
                ) : (
                  <>
                    <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                      {lines.map(({ book, qty, total }) => {
                        const title = tBooks(`items.${book.id}.title`);
                        return (
                          <li
                            key={book.id}
                            className="flex gap-4 rounded-brand border border-white/10 bg-white/5 p-3"
                          >
                            <BookCover
                              book={book}
                              title={title}
                              author=""
                              size="sm"
                              className="w-14 shrink-0"
                            />
                            <div className="flex min-w-0 flex-1 flex-col">
                              <p className="truncate font-semibold text-white">{title}</p>
                              <p className="text-xs text-white/55">
                                {tBooks("price", { amount: formatKs(book.price) })}
                              </p>
                              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                                <div
                                  role="group"
                                  aria-label={t("qty")}
                                  className="inline-flex items-center rounded-brand border border-white/15"
                                >
                                  <QtyButton
                                    label={t("decrease")}
                                    onClick={() => setCartQty(book.id, qty - 1)}
                                  >
                                    −
                                  </QtyButton>
                                  <span className="w-8 text-center text-sm font-semibold text-white tabular-nums">
                                    {qty}
                                  </span>
                                  <QtyButton
                                    label={t("increase")}
                                    disabled={qty >= MAX_QTY}
                                    onClick={() => setCartQty(book.id, qty + 1)}
                                  >
                                    +
                                  </QtyButton>
                                </div>
                                <p className="text-sm font-semibold whitespace-nowrap text-primary tabular-nums">
                                  {tBooks("price", { amount: formatKs(total) })}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="self-start rounded-brand p-1.5 text-white/40 transition-colors duration-300 ease-out hover:text-white"
                              onClick={() => setCartQty(book.id, 0)}
                            >
                              <span className="sr-only">
                                {t("remove")} {title}
                              </span>
                              <CloseIcon size={16} />
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="border-t border-white/10 px-5 py-5">
                      <div className="flex items-baseline justify-between">
                        <p className="text-eyebrow text-white/60">{t("subtotal")}</p>
                        <p className="text-subtitle text-white tabular-nums">
                          {tBooks("price", { amount: formatKs(subtotal) })}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-white/50">{t("deliveryLater")}</p>
                      <Button href="/checkout" className="mt-5 w-full" arrow onClick={closeDrawer}>
                        {t("checkout")}
                      </Button>
                      <Link
                        href="/books"
                        className="mt-3 block text-center text-sm text-white/60 transition-colors duration-300 ease-out hover:text-primary"
                        onClick={closeDrawer}
                      >
                        {t("browse")}
                      </Link>
                    </div>
                  </>
                )}
              </aside>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function QtyButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-brand text-white/80 transition-colors duration-300 ease-out hover:text-primary disabled:opacity-40"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function BagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 6.5h11l-.9 10H5.4l-.9-10ZM7.5 6.5V5a2.5 2.5 0 0 1 5 0v1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
