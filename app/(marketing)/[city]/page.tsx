import { notFound } from "next/navigation";
import { Header } from "@/components/marketing/Header";
import { CityHero } from "@/components/marketing/CityHero";
import { Stats } from "@/components/marketing/Stats";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Services } from "@/components/marketing/Services";
import { FAQ } from "@/components/marketing/FAQ";
import { FooterCTA } from "@/components/marketing/FooterCTA";
import { Footer } from "@/components/marketing/Footer";
import { DistrictList } from "@/components/marketing/DistrictList";
import { CITIES, type CityKey } from "@/lib/cities";

export function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = CITIES[city as CityKey];
  if (!data) return {};
  return {
    title: `Flyttebyrå i ${data.name} — Kobly`,
    description: `Få tre uforpliktende tilbud fra kvalitetssjekkede flyttebyråer i ${data.name}.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = CITIES[city as CityKey];
  if (!data) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <CityHero city={data} />
        <Stats />
        <HowItWorks />
        <Services />
        {data.slug === "oslo" && <DistrictList />}
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
