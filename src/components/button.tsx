import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary px-6 text-ink hover:bg-ink hover:text-primary",
  secondary: "border border-ink/15 bg-white px-6 text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "px-1 text-ink hover:text-primary-ink",
  dark: "border border-white/20 bg-white/10 px-6 text-white backdrop-blur-sm hover:border-primary hover:bg-primary hover:text-ink",
};

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-brand text-sm font-semibold tracking-wide whitespace-nowrap transition-[color,background-color,border-color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60";

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1 motion-reduce:transition-none"
    >
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "onClick"> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
};

export function Button({
  children,
  className = "",
  variant = "primary",
  arrow = false,
  onClick,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={onClick}>
        {children}
        {arrow ? <Arrow /> : null}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button type={buttonProps.type ?? "button"} className={classes} onClick={onClick} {...buttonProps}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
