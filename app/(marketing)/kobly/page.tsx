import type { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { BrandHero } from "@/components/marketing/kobly/BrandHero";
import { CategoryGrid } from "@/components/marketing/kobly/CategoryGrid";
import { ImageStrip } from "@/components/marketing/ImageStrip";
import { HowItWorks } from "@/components/marketing/HowItWorks";
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
const BILDER = [
  "/images/boxes-and-plants.jpg",
  "/images/megler/megler-1-hytte.jpg",
  "/images/R1-09131-0032.JPG",
  "/images/megler/megler-2-stue-blaa.jpg",
  "/images/foto__2.jpg",
  "/images/megler/megler-3-trehus.jpg",
];

export default function KoblyBrandPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BrandHero />
        <ImageStrip images={BILDER} />
        <CategoryGrid />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
