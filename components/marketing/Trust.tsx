import Link from "next/link";
import { ArrowRight } from "lucide-react";

const partners = [
  {
    name: "LØFT",
    mark: (
      <span className="font-display text-3xl font-bold tracking-tight text-ink/85">
        L<span className="inline-block -translate-y-0.5">∧</span>FT
      </span>
    ),
  },
  {
    name: "relok.",
    mark: (
      <span className="text-2xl font-bold tracking-tight text-ink/85">
        relok<span className="text-accent-amber">.</span>
      </span>
    ),
  },
  {
    name: "Flyttefoten",
    mark: (
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#D04A3B]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden>
            <path d="M12 3 3 11h2v9h6v-6h2v6h6v-9h2L12 3Z" />
          </svg>
        </span>
        <span className="text-xl font-bold tracking-tight text-ink/85">
          Flyttefoten
        </span>
      </span>
    ),
  },
  {
    name: "FlytteSjef",
    mark: (
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#1F3A2E]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden>
            <path d="M4 18h16M4 18V8l8-4 8 4v10M9 18v-6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-xl font-bold leading-tight tracking-tight text-ink/85">
          FlytteSjef
        </span>
      </span>
    ),
  },
];

export function Trust() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col text-left lg:items-center lg:text-center">
          <h2 className="font-serif text-3xl font-semibold leading-[1.1] text-balance text-ink sm:text-4xl lg:max-w-md">
            Norges smarteste tilbudstjeneste
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg lg:max-w-xl">
            Kobly flytter ikke selv — vi samler byråene som gjør det best, og
            kobler deg med tre som passer akkurat din flytting.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90"
            >
              Få tilbud gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center rounded-full px-5 py-3 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:bg-ink/5"
            >
              Møt byråene
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-14">
          {partners.map((p) => (
            <div key={p.name} aria-label={p.name} className="flex items-center">
              {p.mark}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
