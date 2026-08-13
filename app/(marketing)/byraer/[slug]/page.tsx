import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Stars } from "@/components/marketing/agency/Stars";
import { AGENCIES, formatRating, getAgency } from "@/lib/agencies";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return AGENCIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) return {};
  return {
    title: `${agency.name} — flyttebyrå på Kobly`,
    description: `${agency.tagline}. ${agency.short} Se vurderinger fra ${agency.reviewCount} kunder og få tilbud via Kobly.`,
  };
}

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) notFound();

  const ctaLabel = `Få tilbud fra ${agency.name} og 2 andre byråer`;
  const badges = [
    `${agency.jobsCompleted} jobber utført`,
    `${formatRating(agency.rating)} ★ av ${agency.reviewCount} kunder`,
    agency.responseTime,
    `Medlem siden ${agency.memberSince}`,
  ];

  return (
    <>
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        {/* Hero */}
        <section className="px-6 pt-6 sm:px-10 sm:pt-10">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/byraer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Alle byråer
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
              <div>
                <Image
                  src={agency.logo}
                  alt={agency.name}
                  width={400}
                  height={140}
                  quality={100}
                  unoptimized
                  className="h-10 w-auto max-w-[170px] object-contain object-left sm:h-12"
                  style={
                    agency.logoBlendMultiply
                      ? { mixBlendMode: "multiply" }
                      : undefined
                  }
                />
                <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-[52px]">
                  {agency.name}
                </h1>
                <p className="mt-4 text-lg text-ink-muted sm:text-xl">
                  {agency.tagline}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {badges.map((badge) => (
                    <li
                      key={badge}
                      className="rounded-full bg-surface-soft px-4 py-2 text-sm text-ink ring-1 ring-line"
                    >
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA-kort, synlig på desktop */}
              <div className="hidden rounded-[14px] bg-brand p-8 text-brand-ink lg:block">
                <p className="text-xl font-semibold">
                  Tilbud fra {agency.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
                  På Kobly ber du aldri om bare ett tilbud. Vi sender
                  forespørselen din til {agency.name} og to andre byråer som
                  passer flyttingen, slik at du kan sammenligne før du velger.
                </p>
                <Link
                  href="/wizard"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-brand-ink/90"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <p className="mt-4 text-center text-xs text-brand-ink/50">
                  Gratis og uforpliktende
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Om oss */}
        <section className="px-6 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-[680px]">
              <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                Om oss
              </h2>
              {agency.about.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-5 text-base leading-[1.75] text-ink"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Tjenester */}
        <section className="px-6 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              Dette hjelper vi med
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {agency.services.map((service) => (
                <li
                  key={service}
                  className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-4 py-2.5 text-sm text-ink ring-1 ring-line"
                >
                  <Check className="h-4 w-4 shrink-0 text-ink/40" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kundevurderinger */}
        <section className="px-6 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                Hva kundene sier
              </h2>
              <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
                <Stars rating={agency.rating} />
                <span className="font-medium text-ink">
                  {formatRating(agency.rating)}
                </span>
                av {agency.reviewCount} kunder
              </p>
            </div>

            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {agency.reviews.map((review) => (
                <li
                  key={review.name + review.date}
                  className="flex flex-col rounded-[14px] bg-surface-soft p-6 ring-1 ring-line sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Stars rating={review.stars} />
                    <span className="text-xs text-ink-muted">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink">
                    {review.comment}
                  </p>
                  <p className="mt-5 text-sm text-ink-muted">
                    <span className="font-medium text-ink">{review.name}</span>
                    <span className="text-ink/40"> · {review.service}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dekningsområde */}
        <section className="px-6 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              Hvor vi jobber
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {agency.areas.map((area) => (
                <li
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2.5 text-sm text-ink ring-1 ring-line"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-ink/40" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA i bunn */}
        <section className="px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[14px] bg-brand px-7 py-10 text-brand-ink sm:px-12 sm:py-14">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <p className="font-serif text-2xl font-semibold sm:text-3xl">
                    Klar for å hente inn tilbud?
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-ink/70 sm:text-base">
                    Fyll ut én forespørsel, så går den til {agency.name} og to
                    andre byråer som passer flyttingen din. Du velger selv om du
                    vil gå videre med noen av dem.
                  </p>
                </div>
                <Link
                  href="/wizard"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-ink px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-brand-ink/90"
                >
                  Få 3 tilbud gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA på mobil */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link
          href="/wizard"
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-center text-sm font-medium leading-tight text-brand-ink transition-colors hover:bg-brand/90"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>

      <Footer />
    </>
  );
}
