import { Mail, MapPin, Phone } from "lucide-react";
import type { LeadFormContent, Product, SiteSettings } from "@/content/types";
import LeadForm from "@/components/form/LeadForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { telHref } from "@/lib/utils";

type Props = {
  content: LeadFormContent;
  products: Pick<Product, "id" | "name">[];
  site: SiteSettings;
};

/** Dark contacts band: intro + phone/e-mail/addresses on the left, the form card on the right */
export default function LeadSection({ content, products, site }: Props) {
  return (
    <section id="kontakty" aria-labelledby="kontakty-title" className="section-y scroll-mt-header bg-ink text-white">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16">
        <div>
          <SectionHeading tag={content.tag} title={content.title} text={content.text} id="kontakty-title" inverted />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <li>
              <p className="eyebrow text-white/50">{site.labels.phone}</p>
              <a
                href={telHref(site.phone.e164)}
                className="mt-2 inline-flex items-center gap-2.5 font-display text-[22px] font-extrabold text-white transition-colors hover:text-brand"
              >
                <Phone size={20} aria-hidden className="text-brand" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <p className="eyebrow text-white/50">{site.labels.email}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-flex items-center gap-2.5 break-all text-[16px] font-semibold text-white transition-colors hover:text-brand"
              >
                <Mail size={18} aria-hidden className="shrink-0 text-brand" />
                {site.email}
              </a>
            </li>
            {site.addresses.map((a) => (
              <li key={a.city}>
                <p className="eyebrow text-white/50">{a.city}</p>
                <a
                  href={a.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex gap-2.5 text-[15.5px] text-white/85 transition-colors hover:text-brand"
                >
                  <MapPin size={18} aria-hidden className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    {a.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id={content.anchor} className="relative scroll-mt-[calc(theme(spacing.header)+1rem)] rounded-card bg-white p-6 text-ink shadow-popup sm:p-8">
          <span aria-hidden className="absolute left-0 right-0 top-0 h-1.5 rounded-t-card bg-brand" />
          <LeadForm content={content} products={products} />
        </div>
      </div>
    </section>
  );
}
