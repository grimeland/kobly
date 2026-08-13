import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Stats } from "@/components/marketing/Stats";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Services } from "@/components/marketing/Services";
import { FAQ } from "@/components/marketing/FAQ";
import { FooterCTA } from "@/components/marketing/FooterCTA";
import { DistrictHero } from "@/components/marketing/DistrictHero";
import { DistrictList } from "@/components/marketing/DistrictList";
import { DISTRICTS, getDistrict } from "@/lib/districts";

export function generateStaticParams() {
  return DISTRICTS.map((d) => ({ bydel: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bydel: string }>;
}) {
  const { bydel } = await params;
  const district = getDistrict(bydel);
  if (!district) return {};
  return {
    title: `Flyttebyrå i ${district.name} — få 3 tilbud gratis | Kobly`,
    description: district.metaDescription,
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ bydel: string }>;
}) {
  const { bydel } = await params;
  const district = getDistrict(bydel);
  if (!district) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="px-6 pt-6 sm:px-10 sm:pt-10">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Brødsmulesti">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                <li>
                  <Link
                    href="/"
                    className="-my-1.5 inline-block py-1.5 transition-colors hover:text-ink"
                  >
                    Kobly
                  </Link>
                </li>
                <ChevronRight aria-hidden className="h-3.5 w-3.5 text-ink/30" />
                <li>
                  <Link
                    href="/oslo"
                    className="-my-1.5 inline-block py-1.5 transition-colors hover:text-ink"
                  >
                    Oslo
                  </Link>
                </li>
                <ChevronRight aria-hidden className="h-3.5 w-3.5 text-ink/30" />
                <li aria-current="page" className="text-ink">
                  {district.name}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <DistrictHero district={district} />

        {/* Lokalt innhold. Unikt per bydel, så sidene ikke blir tynne duplikater. */}
        <section className="px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex max-w-[680px] flex-col gap-6">
              <p className="text-base leading-[1.75] text-ink">
                {district.intro[0]}
              </p>
              <p className="text-base leading-[1.75] text-ink">
                {district.intro[1]}
              </p>
              <p className="text-base leading-[1.75] text-ink">
                <span className="font-semibold">{district.movingTip.title}:</span>{" "}
                {district.movingTip.body}
              </p>
              <p className="text-base leading-[1.75] text-ink-muted">
                Byråene våre tar oppdrag i hele bydelen, blant annet{" "}
                {district.areas.slice(0, -1).join(", ")} og{" "}
                {district.areas[district.areas.length - 1]}.
              </p>
            </div>
          </div>
        </section>

        <Stats />
        <HowItWorks />
        <Services />

        <DistrictList
          currentSlug={district.slug}
          title="Andre bydeler i Oslo"
          intro="Vi dekker hele byen. Skal du flytte til en annen bydel, finner du den her."
        />

        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
