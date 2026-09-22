import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-ink hover:bg-primary-dark hover:text-white",
  secondary: "border border-ink/15 bg-white text-ink hover:border-ink/40",
  ghost: "text-ink hover:text-primary-dark",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-wide whitespace-nowrap transition-[color,background-color,border-color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60";

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
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
  onClick,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button type={buttonProps.type ?? "button"} className={classes} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  );
}
