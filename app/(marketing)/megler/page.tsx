import type { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
import { ImageStrip } from "@/components/marketing/ImageStrip";
import { Trust } from "@/components/marketing/Trust";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Services } from "@/components/marketing/Services";
import { Cities } from "@/components/marketing/Cities";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { FooterCTA } from "@/components/marketing/FooterCTA";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Kobly — Vi finner den beste eiendomsmegleren for deg",
  description:
    "Prototype: Kobly for eiendomsmegling. Samme tjeneste, blå palett.",
  robots: { index: false },
};

const MEGLER_BILDER = [
  "/images/megler/megler-1-hytte.jpg",
  "/images/megler/megler-2-stue-blaa.jpg",
  "/images/megler/megler-3-trehus.jpg",
  "/images/megler/megler-4-murhus.jpg",
  "/images/megler/megler-5-stue-planter.jpg",
];

/**
 * Prototype av eiendomsmegler-varianten. Identisk med forsiden, men
 * wrapper-klassen theme-megler drar paletten mot blått (se globals.css),
 * og bildestripen bruker boligbilder. Ikke lenket fra menyen.
 */
export default function MeglerPage() {
  return (
    <div className="theme-megler flex flex-1 flex-col bg-bg text-ink">
      <Header />
      <main className="flex-1">
        <Hero
          title="Vi finner den beste eiendomsmegleren for deg"
          lead="Kobly kobler deg med kvalitetssjekkede meglere i ditt område"
          card={{
            title: "La meglerne konkurrere om deg",
            body: "Vi kobler deg med 3 håndplukkede, kvalitetssjekkede meglere i ditt område.",
          }}
        />
        <ImageStrip images={MEGLER_BILDER} />
        <HowItWorks />
        <Testimonials />
        <Trust />
        <Services />
        <Cities />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
