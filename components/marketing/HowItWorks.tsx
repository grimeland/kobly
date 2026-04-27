function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-lime font-display text-sm font-bold text-[#3D5507]">
      {n}
    </span>
  );
}

function DocumentArt() {
  return (
    <svg width="56" height="56" viewBox="0 0 53 53" fill="none" aria-hidden>
      <path
        d="M31.93 5.41H15.03c-1.12 0-2.2.46-2.99 1.27a4.34 4.34 0 0 0-1.24 3.05v34.6c0 1.15.45 2.25 1.24 3.06.79.81 1.87 1.27 2.99 1.27h25.34c1.12 0 2.2-.46 2.99-1.27a4.34 4.34 0 0 0 1.24-3.06V18.38M31.93 5.41c.66 0 1.32.13 1.94.39.62.26 1.18.65 1.65 1.13l7.58 7.76c.47.48.85 1.06 1.11 1.69a4.4 4.4 0 0 1 .39 1.99M31.93 5.41v10.81c0 .57.22 1.12.62 1.52.4.41.93.64 1.49.64h10.56"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27.09" cy="32.9" r="8.29" stroke="#1A1A1A" strokeWidth="2.77" />
      <path
        d="M29.24 24.57c-2.72 2.41-4.3 5.29-4.3 8.4 0 3.04 1.53 5.88 4.16 8.27"
        stroke="#1A1A1A"
        strokeWidth="2.77"
      />
    </svg>
  );
}

function BoxArt() {
  return (
    <svg width="44" height="44" viewBox="0 0 42 42" fill="none" aria-hidden>
      <rect width="41.4" height="41.4" rx="7" fill="#D9EFA7" />
      <path
        d="M20.6 33.27V20.74M20.6 20.74 9.69 14.48M20.6 20.74l10.91-6.26M14.96 11.06l11.27 6.45M19.35 32.93c.38.22.81.34 1.25.34s.87-.12 1.25-.34l8.77-5.01c.38-.22.7-.54.92-.92.22-.38.34-.81.34-1.25V15.73c0-.44-.12-.87-.34-1.25-.22-.38-.54-.7-.92-.92l-8.77-5.01c-.38-.22-.81-.34-1.25-.34s-.87.12-1.25.34l-8.77 5.01c-.38.22-.7.54-.92.92-.22.38-.34.81-.34 1.25v10.02c0 .44.12.87.34 1.25.22.38.54.7.92.92l8.77 5.01Z"
        stroke="#3D5507"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckArt() {
  return (
    <svg width="44" height="44" viewBox="0 0 42 42" fill="none" aria-hidden>
      <rect width="41.4" height="41.4" rx="7" fill="#D9EFA7" />
      <path
        d="M12 22 L19 28 L31 14"
        stroke="#3D5507"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const steps = [
  {
    n: 1,
    title: "Fyll ut skjema",
    body: "Svar på noen enkle spørsmål. Tar under to minutter.",
    art: (
      <div className="flex items-center justify-center pt-3">
        <DocumentArt />
      </div>
    ),
  },
  {
    n: 2,
    title: "Vi kobler deg med de beste",
    body: "Tre kvalitetssjekkede byråer kobles med din flytting.",
    art: (
      <div className="flex items-center justify-center gap-2 pt-3">
        <BoxArt />
        <BoxArt />
        <BoxArt />
      </div>
    ),
  },
  {
    n: 3,
    title: "Velg tilbud",
    body: "Sammenlign, velg ditt byrå, og avtal resten direkte med dem.",
    art: (
      <div className="flex items-center justify-center gap-2 pt-3">
        <CheckArt />
        <CheckArt />
        <CheckArt />
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-12 sm:px-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Slik fungerer det
        </h2>
        <ol className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex flex-col rounded-2xl bg-surface p-6 sm:p-7"
            >
              <StepBadge n={step.n} />
              {step.art}
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted sm:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
