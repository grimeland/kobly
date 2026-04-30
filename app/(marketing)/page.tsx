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

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ImageStrip />
        <HowItWorks />
        <Testimonials />
        <Trust />
        <Services />
        <Cities />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
