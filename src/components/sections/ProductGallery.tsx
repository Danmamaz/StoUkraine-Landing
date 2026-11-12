"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import type { ImageAsset, LightboxLabels } from "@/content/types";
import Img from "@/components/ui/Img";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/** One large photo + up to two side photos; each opens the lightbox */
export default function ProductGallery({ images, title, labels }: { images: ImageAsset[]; title: string; labels: LightboxLabels }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = images.slice(0, 3);

  return (
    <>
      <ul className={cn("grid gap-2.5 sm:gap-3", shown.length > 1 && "grid-cols-2 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-2")}>
        {shown.map((img, i) => (
          <li key={img.src} className={cn(i === 0 && shown.length > 1 && "col-span-2 lg:col-span-1 lg:row-span-2")}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.open}: ${img.alt}`}
              className={cn(
                "group relative block h-full w-full overflow-hidden rounded-card bg-sand-dark",
                i === 0 ? "aspect-[16/10] lg:aspect-auto lg:min-h-[400px]" : "aspect-[4/3] lg:aspect-auto lg:min-h-[194px]",
              )}
            >
              <Img
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 1024px) 50vw, 440px"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Maximize2 size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={open} onIndexChange={setOpen} labels={labels} title={title} />
    </>
  );
}
