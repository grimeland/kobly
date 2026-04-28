import { PostnummerInput } from "./PostnummerInput";

function HeroIcons() {
  return (
    <div className="flex items-center gap-2">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
        <rect width="41.4" height="41.4" rx="7" fill="#D9EFA7" />
        <path
          d="M20.6 33.27V20.74M20.6 20.74 9.69 14.48M20.6 20.74l10.91-6.26M14.96 11.06l11.27 6.45M19.35 32.93c.38.22.81.34 1.25.34s.87-.12 1.25-.34l8.77-5.01c.38-.22.7-.54.92-.92.22-.38.34-.81.34-1.25V15.73c0-.44-.12-.87-.34-1.25-.22-.38-.54-.7-.92-.92l-8.77-5.01c-.38-.22-.81-.34-1.25-.34s-.87.12-1.25.34l-8.77 5.01c-.38.22-.7.54-.92.92-.22.38-.34.81-.34 1.25v10.02c0 .44.12.87.34 1.25.22.38.54.7.92.92l8.77 5.01Z"
          stroke="#3D5507"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
        <rect width="41.4" height="41.4" rx="7" fill="#FFFFFF" />
        <g transform="translate(8 7)">
          <path
            d="M19 1.5H7.6c-.7 0-1.4.3-1.9.8a2.7 2.7 0 0 0-.8 1.9V25c0 .7.3 1.4.8 1.9.5.5 1.2.8 1.9.8h16.4c.7 0 1.4-.3 1.9-.8.5-.5.8-1.2.8-1.9V9.5M19 1.5c.4 0 .8.1 1.2.2.4.2.8.4 1.1.7l4.9 5c.3.3.5.7.7 1.1.2.4.2.8.2 1.2M19 1.5v6.9c0 .4.1.7.4 1 .3.3.6.4 1 .4h6.7"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
        <rect width="41.4" height="41.4" rx="7" fill="#D9EFA7" />
        <circle cx="15.5" cy="17.5" r="2" fill="#3D5507" />
        <circle cx="26.5" cy="17.5" r="2" fill="#3D5507" />
        <path
          d="M14 25c1.6 2.4 4.1 4 7 4s5.4-1.6 7-4"
          stroke="#3D5507"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="px-6 pt-8 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:pt-24 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* Mobil: sentrert, ingen kort */}
        <div className="flex flex-col items-center text-center lg:hidden">
          <h1 className="text-balance font-serif text-[2.25rem] font-semibold leading-[1.05] text-ink sm:text-[2.75rem]">
            Vi finner det beste flyttebyrået for deg
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base text-ink-muted">
            Kobly kobler deg med kvalitetssjekkede byråer i ditt område
          </p>
          <PostnummerInput className="mt-7 mx-auto" />
        </div>

        {/* Desktop: split layout med kort */}
        <div className="hidden items-center gap-16 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-display text-sm font-medium tracking-[0.08em] text-ink-muted">
              Norges smarteste tilbudstjeneste
            </p>
            <h1 className="mt-3 text-balance font-serif text-[3.75rem] font-semibold leading-[1.02] text-ink xl:text-[5rem]">
              Vi finner det beste flyttebyrået for deg
            </h1>
          </div>
          <div className="rounded-3xl bg-surface p-6 ring-1 ring-line lg:p-7">
            <HeroIcons />
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Skriv inn postnummeret ditt så kobler vi deg med tre
              håndplukkede, kvalitetssjekkede byråer i ditt område.
            </p>
            <PostnummerInput
              className="mt-5 max-w-none"
              layout="stack"
              cta="Finn tilbud"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
