"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import type { LightboxLabels, Product, ReferencesContent } from "@/content/types";
import Img from "@/components/ui/Img";
import Lightbox from "@/components/ui/Lightbox";
import SectionHeading from "@/components/ui/SectionHeading";

type Props = {
  content: ReferencesContent;
  products: Pick<Product, "id" | "name">[];
  labels: LightboxLabels;
};

/**
 * Project cards. A click opens the centered lightbox with all photos of that
 * project; no navigation away from the landing.
 */
export default function References({ content, products, labels }: Props) {
  const [active, setActive] = useState<{ ref: number; img: number } | null>(null);
  const productName = (id?: string) => products.find((p) => p.id === id)?.name;
  const current = active ? content.items[active.ref] : null;

  return (
    <section id="referencii" aria-labelledby="referencii-title" className="section-y scroll-mt-header bg-sand">
      <div className="container-page">
        <SectionHeading tag={content.tag} title={content.title} text={content.text} id="referencii-title" />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const cover = item.images[0];
            if (!cover) return null;
            const product = productName(item.productId);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive({ ref: i, img: 0 })}
                  aria-label={`${labels.open}: ${item.title} (${item.images.length} ${labels.photos})`}
                  className="group block h-full w-full overflow-hidden rounded-card border border-line bg-white text-left transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-sand-dark">
                    <Img
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {product && (
                      <span className="absolute left-3 top-3 rounded-button bg-white/95 px-2.5 py-1 text-[12px] font-semibold text-ink">
                        {product}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-button bg-ink/85 px-2.5 py-1 text-[12px] font-medium text-white">
                      <Images size={14} aria-hidden />
                      {item.images.length}
                    </span>
                  </span>
                  <span className="block border-t-[3px] border-transparent p-5 transition-colors group-hover:border-brand">
                    <span className="block font-display text-[17px] font-bold text-ink">{item.title}</span>
                    <span className="mt-1 block text-[14px] text-ink-soft">{item.caption}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {current && active && (
        <Lightbox
          images={current.images}
          index={active.img}
          onIndexChange={(img) => setActive(img === null ? null : { ref: active.ref, img })}
          labels={labels}
          title={current.title}
        />
      )}
    </section>
  );
}
