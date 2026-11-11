export function Marquee({ items }: { items: readonly string[] }) {
  const row = items.map((item) => (
    <span key={item} className="flex shrink-0 items-center gap-8 pr-8">
      <span className="text-subtitle whitespace-nowrap text-ink">
        {item}
      </span>
      <span aria-hidden className="text-ink/40">
        ✦
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-primary py-5">
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden className="animate-marquee flex w-max">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}
