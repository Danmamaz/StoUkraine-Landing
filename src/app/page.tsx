import { LeadFormProvider } from "@/components/form/LeadFormContext";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MessengerWidget from "@/components/layout/MessengerWidget";
import Hero from "@/components/sections/Hero";
import LeadSection from "@/components/sections/LeadSection";
import ProductSection from "@/components/sections/ProductSection";
import References from "@/components/sections/References";
import { getLandingPage, getSiteSettings } from "@/lib/data";

export default async function Home() {
  const [site, page] = await Promise.all([getSiteSettings(), getLandingPage()]);
  const productOptions = page.products.map(({ id, name }) => ({ id, name }));

  return (
    <LeadFormProvider anchor={page.leadForm.anchor}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-button focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold"
      >
        Перейти до вмісту
      </a>
      <div id="top" />
      <Header site={site} formAnchor={page.leadForm.anchor} />
      <main id="main">
        <Hero hero={page.hero} />
        {page.products.map((product, i) => (
          <ProductSection key={product.id} product={product} labels={site.labels.lightbox} tinted={i % 2 === 0} />
        ))}
        <References content={page.references} products={productOptions} labels={site.labels.lightbox} />
        <LeadSection content={page.leadForm} products={productOptions} site={site} />
      </main>
      <Footer site={site} />
      <MessengerWidget site={site} />
    </LeadFormProvider>
  );
}
