import Image from "next/image";
import type { Book } from "@/content/books";

/**
 * 2:3 book cover. Uses the cover photo when the book has one, otherwise draws a
 * typographic cover in the book's tone so placeholder titles still look finished.
 */
export function BookCover({
  book,
  title,
  author,
  size = "md",
  className = "",
}: {
  book: Book;
  title: string;
  author: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const small = size === "sm";

  return (
    <div
      className={`@container relative isolate aspect-[2/3] overflow-hidden rounded-brand shadow-[0_18px_36px_-18px_rgba(14,17,11,0.6)] ${className}`}
      style={{ backgroundColor: book.tone }}
    >
      {book.cover ? (
        <Image
          src={book.cover}
          alt=""
          fill
          sizes={small ? "64px" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(255,255,255,0.22),transparent_60%)]"
          />
          {small ? null : (
            <div className="flex h-full flex-col justify-between p-[9%] pl-[14%] text-white">
              <span aria-hidden className="h-1 w-10 rounded-brand bg-primary" />
              <p className="font-display text-[clamp(0.95rem,11cqi,1.6rem)] leading-[1.15] font-semibold tracking-tight text-white [&:lang(my)]:leading-[1.6]">
                {title}
              </p>
              <div className="flex items-end justify-between gap-3">
                <p className="min-w-0 truncate text-xs font-medium tracking-wide text-white/80">{author}</p>
                <p className="text-[0.625rem] font-semibold tracking-[0.18em] whitespace-nowrap text-white/60 uppercase">
                  Win Pa Pa
                </p>
              </div>
            </div>
          )}
        </>
      )}
      {/* Spine: a darker strip with a crease highlight. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/35 via-black/10 to-white/10"
      />
    </div>
  );
}
