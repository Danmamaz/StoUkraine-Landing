/**
 * The only way components get content. Today it reads the static files in
 * src/content; with Sanity these become GROQ fetches with the same return
 * types, and nothing else in the app has to change.
 */
import { site } from "@/content/site";
import { products } from "@/content/products";
import { hero, leadForm, references } from "@/content/page";

export async function getSiteSettings() {
  return site;
}

export async function getLandingPage() {
  return { hero, products, references, leadForm };
}
