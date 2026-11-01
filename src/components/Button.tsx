import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "light" | "ghost-light";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 min-h-[52px] eyebrow !tracking-[0.26em] transition-colors duration-500 ease-[var(--ease-soft)] active:scale-[0.98] active:duration-100";

const variants: Record<Variant, string> = {
  solid: "bg-deep text-ivory hover:bg-sea",
  outline: "border border-deep/40 text-deep hover:border-deep hover:bg-deep hover:text-ivory",
  light: "bg-ivory text-deep hover:bg-sand",
  "ghost-light": "border border-ivory/60 text-ivory hover:bg-ivory hover:text-deep hover:border-ivory",
};

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

function Arrow() {
  return (
    <svg aria-hidden width="18" height="8" viewBox="0 0 18 8" fill="none" className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
      <path d="M0 4h16.5M13.5 1l3 3-3 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function Button({ href, children, variant = "solid", className = "", type = "button", disabled, onClick }: Props) {
  const cls = `${base} ${variants[variant]} ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        <span>{children}</span>
        <Arrow />
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
}
