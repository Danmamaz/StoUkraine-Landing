import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "dark" | "outline" | "outline-light";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-hover",
  dark: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[14.5px]",
  lg: "min-h-12 px-6 text-[15px]",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
