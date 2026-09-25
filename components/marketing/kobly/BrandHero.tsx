import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORY_GROUPS } from "./categories";

const liveCount = CATEGORY_GROUPS.flatMap((g) => g.items).length;

export function BrandHero() {
  return (
    <section className="px-6 pt-10 pb-14 sm:px-10 sm:pt-16 sm:pb-20 lg:pt-28 lg:pb-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="font-sans text-sm font-medium text-ink-muted">
          Norges smarteste tilbudstjeneste
        </p>
        <h1 className="mt-4 max-w-4xl text-balance font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.01em] text-ink sm:text-[4rem] lg:text-[5.5rem]">
          Ett skjema. Tre tilbud. Du velger.
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg text-ink-muted sm:text-2xl">
          Kobly kobler deg med kvalitetssjekkede fagfolk innen {liveCount}{" "}
          tjenester. Gratis, uforpliktende og ferdig på under to minutter.
        </p>
        <Link
          href="#tjenester"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-5 text-lg font-medium text-brand-ink transition-colors hover:bg-brand/90"
        >
          Velg tjeneste
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
