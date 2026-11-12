/**
 * Content model of the landing. Shapes mirror the future Sanity documents
 * (siteSettings, landingPage, product, reference, leadForm), so swapping the
 * static files in src/content for GROQ queries touches only src/lib/data.ts.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Phone = {
  /** As shown to people, e.g. «+38 096 022 11 05» */
  display: string;
  /** E.164 without spaces, e.g. «+380960221105» */
  e164: string;
};

export type MessengerKind = "telegram" | "whatsapp" | "viber";

export type Messenger = {
  kind: MessengerKind;
  label: string;
  href: string;
};

export type NavItem = { label: string; href: string };

export type Address = {
  city: string;
  lines: string[];
  mapUrl?: string;
};

export type SiteSettings = {
  companyName: string;
  logo: { header: ImageAsset; footer: ImageAsset };
  phone: Phone;
  email: string;
  addresses: Address[];
  messengers: Messenger[];
  nav: NavItem[];
  header: {
    ctaLabel: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
  };
  messengerWidget: {
    title: string;
    text: string;
    openLabel: string;
    closeLabel: string;
  };
  footer: {
    contactsTitle: string;
    navTitle: string;
    note: string;
    copyright: string;
  };
  seo: { title: string; description: string };
  labels: {
    phone: string;
    email: string;
    writeIn: string;
    lightbox: LightboxLabels;
  };
};

export type LightboxLabels = {
  open: string;
  close: string;
  prev: string;
  next: string;
  photos: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  lead: string;
  images: { image: ImageAsset; caption: string }[];
  ctas: { label: string; href: string }[];
};

export type SpecGroup = { title: string; items: string[] };

export type PriceRow = {
  name: string;
  sku?: string;
  size: string;
  colorName: string;
  /** Hex for the colour dot; omitted for «за палітрою» rows */
  swatch?: string;
  pack: string;
  price: string;
};

export type PriceTable = {
  columns: { name: string; size: string; color: string; pack: string; price: string };
  rows: PriceRow[];
};

export type Product = {
  /** Stable id: anchor on the page and value in the lead form */
  id: string;
  tag: string;
  name: string;
  title: string;
  description: string;
  images: ImageAsset[];
  specs: SpecGroup[];
  priceTable: PriceTable;
  comment?: string;
  buyLabel: string;
};

export type Reference = {
  id: string;
  title: string;
  caption: string;
  /** Product id the object is built with */
  productId?: string;
  images: ImageAsset[];
};

export type ReferencesContent = {
  tag: string;
  title: string;
  text: string;
  items: Reference[];
};

export type LeadFormContent = {
  anchor: string;
  tag: string;
  title: string;
  text: string;
  requiredHint: string;
  optionalHint: string;
  fields: {
    firstName: { label: string; error: string };
    lastName: { label: string; error: string };
    phone: { label: string; placeholder: string; error: string };
    email: { label: string; error: string };
    product: { label: string; emptyOption: string };
    /** Multi-select chips; options are edited in the CMS */
    objectType: { label: string; options: string[] };
    notes: { label: string; placeholder: string };
  };
  submitLabel: string;
  sendingLabel: string;
  success: { title: string; text: string; again: string };
  errorText: string;
  privacyNote: string;
};
