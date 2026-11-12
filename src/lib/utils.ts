export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const telHref = (e164: string) => `tel:${e164}`;

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefixes local /public paths with the sub-path the landing is served from */
export function withBasePath(src: string) {
  return src.startsWith("/") ? `${BASE_PATH}${src}` : src;
}

/** Ukrainian mobile: the 9 digits after +380 */
export function phoneDigits(value: string) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("380")) d = d.slice(3);
  else if (d.startsWith("80")) d = d.slice(2);
  // Numbers after +380 never start with 0 («+380 096…» typed by habit)
  return d.replace(/^0+/, "").slice(0, 9);
}

/** «+380 XX XXX XX XX», filled progressively while typing */
export function formatPhone(value: string) {
  const d = phoneDigits(value);
  if (!d) return "";
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return `+380 ${parts.join(" ")}`;
}
