"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { SiteSettings } from "@/content/types";
import Img from "@/components/ui/Img";
import { buttonClass } from "@/components/ui/buttonStyles";
import { cn, telHref } from "@/lib/utils";

type Props = {
  site: Pick<SiteSettings, "logo" | "nav" | "phone" | "header" | "companyName">;
  formAnchor: string;
};

/**
 * Sticky header: logo, anchor navigation, clickable phone and the
 * «Замовити розрахунок» CTA. Below lg the links fold into a drop-down panel.
 */
export default function Header({ site, formAnchor }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-200",
        scrolled || open ? "border-line shadow-[0_6px_24px_-18px_rgba(35,31,32,0.5)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-header items-center justify-between gap-6">
        <a href="#top" onClick={close} className="shrink-0" aria-label={site.companyName}>
          <Img src={site.logo.header.src} alt={site.logo.header.alt} width={148} height={25} priority className="h-[22px] w-auto sm:h-[25px]" />
        </a>

        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="relative py-2 text-[14.5px] font-medium text-ink-soft transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={telHref(site.phone.e164)}
            className="hidden items-center gap-2 whitespace-nowrap font-display text-[15px] font-bold text-ink transition-colors hover:text-ink-soft md:inline-flex"
          >
            <Phone size={16} aria-hidden />
            {site.phone.display}
          </a>
          <a
            href={telHref(site.phone.e164)}
            aria-label={site.phone.display}
            className="flex h-11 w-11 items-center justify-center rounded-button text-ink md:hidden"
          >
            <Phone size={20} aria-hidden />
          </a>
          <a href={`#${formAnchor}`} className={buttonClass("primary", "md", "hidden sm:inline-flex")}>
            {site.header.ctaLabel}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? site.header.menuCloseLabel : site.header.menuOpenLabel}
            className="flex h-11 w-11 items-center justify-center rounded-button text-ink hover:bg-sand lg:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <nav aria-label="Мобільна навігація" className="container-page py-3">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-none">
                <a href={item.href} onClick={close} className="flex min-h-12 items-center text-[16px] font-semibold text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`#${formAnchor}`} onClick={close} className={buttonClass("primary", "lg", "mt-3 w-full sm:hidden")}>
            {site.header.ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
