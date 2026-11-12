import { cn } from "@/lib/utils";

type Props = {
  tag: string;
  title: string;
  text?: string;
  /** Light text for dark sections */
  inverted?: boolean;
  id?: string;
  className?: string;
};

/** Small yellow-bar tag + h2 + optional intro, shared by every section */
export default function SectionHeading({ tag, title, text, inverted, id, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className={cn("eyebrow flex items-center gap-3", inverted ? "text-white/70" : "text-ink-muted")}>
        <span aria-hidden className="h-[3px] w-7 bg-brand" />
        {tag}
      </p>
      <h2 id={id} className={cn("mt-4 text-h2", inverted ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {text && <p className={cn("mt-4 text-lead", inverted ? "text-white/75" : "text-ink-soft")}>{text}</p>}
    </div>
  );
}
