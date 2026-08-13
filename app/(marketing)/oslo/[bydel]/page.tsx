import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, Lightbulb, MapPin } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Trust } from "@/components/marketing/Trust";
import { FAQ } from "@/components/marketing/FAQ";
import { WizardCTA } from "@/components/marketing/WizardCTA";
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
            {/* Brødsmulesti */}
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

        {/* Lokal tekst og fakta */}
        <section className="px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="max-w-[680px] text-base leading-[1.75] text-ink">
              {district.intro[0]}
            </p>

            <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
              <div className="rounded-[14px] bg-surface-soft p-6 ring-1 ring-line sm:p-7">
                <MapPin aria-hidden className="h-5 w-5 text-ink/40" />
                <h2 className="mt-4 text-lg font-semibold text-ink">
                  Områder vi dekker i {district.name}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {district.areas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-bg px-3 py-1.5 text-sm text-ink"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[14px] bg-surface-soft p-6 ring-1 ring-line sm:p-7">
                <Home aria-hidden className="h-5 w-5 text-ink/40" />
                <h2 className="mt-4 text-lg font-semibold text-ink">
                  Typisk bolig her
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  {district.housing}
                </p>
              </div>

              <div className="rounded-[14px] bg-brand p-6 text-brand-ink sm:p-7">
                <Lightbulb aria-hidden className="h-5 w-5 text-brand-ink/50" />
                <h2 className="mt-4 text-lg font-semibold">
                  {district.movingTip.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-brand-ink/75">
                  {district.movingTip.body}
                </p>
              </div>
            </div>

            <p className="mt-12 max-w-[680px] text-base leading-[1.75] text-ink sm:mt-16">
              {district.intro[1]}
            </p>

            <div className="mt-10 max-w-[680px]">
              <WizardCTA />
            </div>
          </div>
        </section>

        <HowItWorks />
        <Trust />
        <FAQ />

        <DistrictList
          currentSlug={district.slug}
          title="Andre bydeler i Oslo"
          intro="Vi dekker hele byen. Skal du flytte til en annen bydel, finner du den her."
        />

        <section className="px-6 pb-20 sm:px-10 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <WizardCTA />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
