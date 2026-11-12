import { ArrowDown } from "lucide-react";
import type { HeroContent } from "@/content/types";
import Img from "@/components/ui/Img";
import { buttonClass } from "@/components/ui/buttonStyles";

/** Intro to both products: text + two anchor buttons, two photos on the right */
export default function Hero({ hero }: { hero: HeroContent }) {
  const [main, second] = hero.images;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div className="container-page grid items-center gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-16">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-3 text-ink-muted">
            <span aria-hidden className="h-[3px] w-7 bg-brand" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-5 max-w-[14ch] text-h1 text-ink">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[52ch] text-lead text-ink-soft">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {hero.ctas.map((cta, i) => (
              <a key={cta.href} href={cta.href} className={buttonClass(i === 0 ? "dark" : "outline", "lg", "w-full sm:w-auto")}>
                {cta.label}
                <ArrowDown size={17} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="animate-fade-up animation-delay-200 relative pb-10 sm:pb-14 lg:pb-0">
          {/* Yellow plate echoing the bar in the STO logo */}
          <div aria-hidden className="absolute -right-4 top-8 h-[70%] w-[38%] bg-brand sm:-right-6 lg:-right-10" />
          {main && (
            <figure className="relative ml-auto w-[86%] overflow-hidden rounded-card bg-sand-dark shadow-card">
              <Img
                src={main.image.src}
                alt={main.image.alt}
                width={main.image.width}
                height={main.image.height}
                priority
                sizes="(max-width: 1024px) 86vw, 520px"
                className="aspect-[4/4.2] w-full object-cover"
              />
              <figcaption className="absolute right-3 top-3 rounded-button bg-white/95 px-3 py-1.5 text-[12.5px] font-semibold text-ink">
                {main.caption}
              </figcaption>
            </figure>
          )}
          {second && (
            <figure className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-card border-4 border-white bg-sand-dark shadow-card-hover lg:-bottom-8">
              <Img
                src={second.image.src}
                alt={second.image.alt}
                width={second.image.width}
                height={second.image.height}
                sizes="(max-width: 1024px) 52vw, 300px"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute bottom-2 left-2 rounded-button bg-ink px-2.5 py-1 text-[12px] font-semibold text-white">
                {second.caption}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
