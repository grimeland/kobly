import type { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { BrandHero } from "@/components/marketing/kobly/BrandHero";
import { CategoryGrid } from "@/components/marketing/kobly/CategoryGrid";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Stats } from "@/components/marketing/Stats";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Kobly — Ett skjema. Tre tilbud. Du velger.",
  description:
    "Prototype: Kobly som paraply for flere tjenester. Få tre tilbud fra kvalitetssjekkede fagfolk.",
  robots: { index: false },
};

/**
 * Prototype av en felles forside for hele Kobly-merket, etter modell av
 * tjenestetorget.no: kategorier først, så de generelle seksjonene.
 */
export default function KoblyBrandPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BrandHero />
        <CategoryGrid />
        <HowItWorks />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
