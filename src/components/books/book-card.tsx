"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { BookCover } from "@/components/books/book-cover";
import { addToCart, openCart } from "@/components/cart/cart-store";
import { CheckIcon } from "@/components/form-fields";
import { formatKs, type Book } from "@/content/books";

export function BookCard({ book }: { book: Book }) {
  const t = useTranslations("Books");
  const [added, setAdded] = useState(false);
  const timer = useRef<number>(undefined);
  const title = t(`items.${book.id}.title`);
  const author = t(`items.${book.id}.author`);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <article className="group flex h-full flex-col rounded-brand border border-hairline bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_48px_-28px_rgba(14,17,11,0.45)] motion-reduce:hover:translate-y-0">
      <div className="relative rounded-brand bg-paper px-8 pt-8 pb-6">
        <BookCover
          book={book}
          title={title}
          author={author}
          className="mx-auto w-full max-w-56 transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-[1.03] motion-reduce:group-hover:transform-none"
        />
        <p className="text-eyebrow absolute top-3 left-3 rounded-brand bg-primary px-3 py-1.5 text-ink">
          {t(`categories.${book.category}`)}
        </p>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <h3 className="text-subtitle">{title}</h3>
        <p className="mt-1 text-sm text-slate">{author}</p>
        <p className="text-body mt-3 flex-1">{t(`items.${book.id}.blurb`)}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-eyebrow rounded-brand bg-ink px-3 py-2 text-primary">
            {t("price", { amount: formatKs(book.price) })}
          </p>
          <Button
            variant={added ? "secondary" : "primary"}
            className="min-w-0 px-4!"
            aria-live="polite"
            onClick={() => {
              addToCart(book.id);
              setAdded(true);
              openCart();
              window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => setAdded(false), 1600);
            }}
          >
            {added ? <CheckIcon size={14} /> : <CartPlusIcon />}
            {added ? t("added") : t("addToCart")}
          </Button>
        </div>
      </div>
    </article>
  );
}

function CartPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2.5 3.5h2l1.8 9h9l1.7-6.5H6M9 16.5h.01M14 16.5h.01M11.5 7.5v3M10 9h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
