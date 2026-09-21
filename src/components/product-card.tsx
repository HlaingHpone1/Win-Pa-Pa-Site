import type { Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-6">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-primary-dark">
        {product.kind === "printing" ? <PrintMark /> : <BindMark />}
      </div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6">{product.blurb}</p>
      <p className="mt-6 text-xs font-medium tracking-wide text-ink uppercase">
        {product.from}
      </p>
    </article>
  );
}

function PrintMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="6" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 6V4.5A1.5 1.5 0 0 1 7.5 3h7A1.5 1.5 0 0 1 16 4.5V6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 16v3h10v-3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.2" cy="10.2" r="1" fill="currentColor" />
    </svg>
  );
}

function BindMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="5" y="3" width="12" height="16" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 7h12M5 11h12M5 15h12" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 6.5c1.4 0 1.4 2 0 2M3.5 10.5c1.4 0 1.4 2 0 2M3.5 14.5c1.4 0 1.4 2 0 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
