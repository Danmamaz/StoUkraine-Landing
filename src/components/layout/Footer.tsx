import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/content/types";
import Img from "@/components/ui/Img";
import { telHref } from "@/lib/utils";

export default function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-14">
        <div>
          <Img src={site.logo.footer.src} alt={site.logo.footer.alt} width={220} height={58} className="h-auto w-[200px]" />
          <p className="mt-5 max-w-xs text-small text-ink-muted">{site.footer.note}</p>
        </div>

        <div>
          <p className="eyebrow text-ink-muted">{site.footer.contactsTitle}</p>
          <ul className="mt-4 space-y-3 text-[14.5px]">
            <li>
              <a href={telHref(site.phone.e164)} className="inline-flex items-center gap-2.5 font-semibold text-ink hover:underline">
                <Phone size={16} aria-hidden className="text-ink-muted" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 break-all text-ink hover:underline">
                <Mail size={16} aria-hidden className="shrink-0 text-ink-muted" />
                {site.email}
              </a>
            </li>
            {site.addresses.map((a) => (
              <li key={a.city} className="flex gap-2.5 text-ink-soft">
                <MapPin size={16} aria-hidden className="mt-1 shrink-0 text-ink-muted" />
                <span>
                  м. {a.city}, {a.lines.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={site.footer.navTitle}>
          <p className="eyebrow text-ink-muted">{site.footer.navTitle}</p>
          <ul className="mt-4 space-y-2.5 text-[14.5px]">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink-soft hover:text-ink hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-small text-ink-muted">{site.footer.copyright}</p>
      </div>
    </footer>
  );
}
