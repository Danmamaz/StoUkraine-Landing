import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo, companyName } = await getSiteSettings();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      type: "website",
      locale: "uk_UA",
      siteName: companyName,
      title: seo.title,
      description: seo.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#231F20",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes to <html>/<body> before React hydrates
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
