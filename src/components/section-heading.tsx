export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow ? (
        <p className={`text-eyebrow flex items-center gap-2 ${dark ? "text-primary" : "text-primary-ink"}`}>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-title ${eyebrow ? "mt-4" : ""} ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {lead ? (
        <p className={`text-lead mt-4 ${dark ? "text-white/70" : ""}`}>{lead}</p>
      ) : null}
    </div>
  );
}
