import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { FooterCTA } from "@/components/marketing/FooterCTA";
import { Stars } from "@/components/marketing/agency/Stars";
import { AGENCIES, formatRating } from "@/lib/agencies";

export const metadata: Metadata = {
  title: "Flyttebyråene på Kobly — kvalitetssjekkede partnere",
  description:
    "Bli kjent med flyttebyråene vi samarbeider med. Se vurderinger, tjenester og hvilke områder de dekker.",
};

export default function AgenciesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="px-6 pt-10 pb-20 sm:px-10 sm:pt-16 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-[52px]">
                Bli kjent med byråene
              </h1>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                Alle byråer på Kobly er kvalitetssjekket. Vi kontrollerer
                registrering i Brønnøysund, ansvarsforsikring og
                skatteattest før noen slipper inn, og vi følger med på hva
                kundene sier om dem etterpå.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-2">
              {AGENCIES.map((agency) => (
                <li key={agency.slug}>
                  <Link
                    href={`/byraer/${agency.slug}`}
                    className="group flex h-full flex-col rounded-[14px] bg-surface-soft p-6 ring-1 ring-line transition-colors hover:bg-surface-soft/60 sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Image
                        src={agency.logo}
                        alt={agency.name}
                        width={400}
                        height={140}
                        quality={100}
                        unoptimized
                        className="h-9 w-auto max-w-[150px] object-contain object-left"
                        style={
                          agency.logoBlendMultiply
                            ? { mixBlendMode: "multiply" }
                            : undefined
                        }
                      />
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-ink">
                      {agency.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {agency.short}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Stars rating={agency.rating} />
                        <span className="font-medium text-ink">
                          {formatRating(agency.rating)}
                        </span>
                        <span>({agency.reviewCount})</span>
                      </span>
                      <span className="inline-flex items-center gap-3">
                        <span aria-hidden className="text-ink/25">
                          ·
                        </span>
                        {agency.jobsCompleted} jobber utført
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <p className="text-xs text-ink-muted">Dekker blant annet</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {agency.areas.slice(0, 4).map((area) => (
                          <span
                            key={area}
                            className="rounded-full bg-bg px-3 py-1.5 text-xs text-ink"
                          >
                            {area}
                          </span>
                        ))}
                        {agency.areas.length > 4 && (
                          <span className="px-1 py-1.5 text-xs text-ink-muted">
                            +{agency.areas.length - 4} til
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
