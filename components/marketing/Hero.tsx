import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCard } from "./HeroCard";

export function Hero({
  title = "Vi finner det beste flyttebyrået for deg",
  lead = "Kobly kobler deg med kvalitetssjekkede byråer i ditt område",
  card,
}: {
  title?: string;
  lead?: string;
  card?: React.ComponentProps<typeof HeroCard>;
}) {
  return (
    <section className="px-6 pt-8 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:pt-28 lg:pb-40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="hidden font-sans text-sm font-medium text-ink-muted lg:block">
            Norges smarteste tilbudstjeneste
          </p>
          <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.05] text-ink sm:text-[2.5rem] lg:mt-3 lg:text-[3rem] lg:leading-[1.05] xl:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base text-ink-muted lg:hidden">
            {lead}
          </p>
          <Link
            href="/wizard"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-medium text-brand-ink transition-colors hover:bg-brand/90 lg:hidden"
          >
            Få 3 tilbud gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <HeroCard {...card} />
        </div>
      </div>
    </section>
  );
}
