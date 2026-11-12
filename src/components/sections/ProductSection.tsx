import { Info } from "lucide-react";
import type { LightboxLabels, Product } from "@/content/types";
import BuyButton from "@/components/form/BuyButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import PriceTable from "./PriceTable";
import ProductGallery from "./ProductGallery";

type Props = {
  product: Product;
  labels: LightboxLabels;
  /** Alternates background so the two products read as separate blocks */
  tinted?: boolean;
};

/** One template for both products: intro, photos, specs, prices, comment, «Купити» */
export default function ProductSection({ product: p, labels, tinted }: Props) {
  const titleId = `${p.id}-title`;
  return (
    <section id={p.id} aria-labelledby={titleId} className={cn("section-y scroll-mt-header", tinted ? "bg-sand" : "bg-white")}>
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading tag={p.tag} title={p.title} text={p.description} id={titleId} />
          <BuyButton productId={p.id} label={p.buyLabel} className="self-start lg:self-auto" />
        </div>

        <Reveal className="mt-10 lg:mt-12">
          <ProductGallery images={p.images} title={p.name} labels={labels} />
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {p.specs.map((group) => (
            <li key={group.title} className={cn("p-6", tinted ? "bg-white" : "bg-sand")}>
              <h3 className="flex items-center gap-2.5 text-h3 text-ink">
                <span aria-hidden className="h-2.5 w-2.5 bg-brand" />
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2 text-[14.5px] text-ink-soft">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <PriceTable table={p.priceTable} caption={`${p.name}: ціни`} />
        </div>

        <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {p.comment ? (
            <p className="flex max-w-3xl gap-3 border-l-[3px] border-brand bg-white/60 py-2 pl-4 text-[14.5px] text-ink-soft">
              <Info size={18} aria-hidden className="mt-0.5 shrink-0 text-ink-muted" />
              {p.comment}
            </p>
          ) : (
            <span />
          )}
          <BuyButton productId={p.id} label={p.buyLabel} className="w-full shrink-0 md:w-auto" />
        </div>
      </div>
    </section>
  );
}
