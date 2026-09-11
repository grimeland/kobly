"use client";

import Image from "next/image";
import Link from "next/link";

export function ThankYou() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-bg px-5 py-8 sm:px-6 sm:py-10">
      {/* Samme bakgrunnsbilde som wizarden, men mørklagt */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/boxes-and-plants.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="wizard-fade-in relative z-10 my-auto w-full max-w-[520px] rounded-[18px] bg-surface-soft px-6 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-10 sm:py-12">
        <div className="text-center">
          <RoutingIllustration />
          <h1 className="mt-8 font-serif text-3xl font-medium leading-[1.1] text-ink sm:text-4xl">
            Forespørselen er sendt!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Tre kvalitetssjekkede byråer i ditt område har fått den. Du hører fra
            dem innen 24 timer.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-medium text-brand-ink transition-colors hover:bg-brand/90"
        >
          Tilbake til forsiden
        </Link>
      </div>
    </div>
  );
}

/** Kobly til venstre, tre byråer til høyre. Viser at forespørselen rutes videre. */
function RoutingIllustration() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-brand-ink">
        <svg width="24" height="24" viewBox="0 0 27 27" fill="none" aria-hidden>
          <circle
            cx="13.5"
            cy="13.5"
            r="11.625"
            stroke="currentColor"
            strokeWidth="3.75"
          />
          <path
            d="M16.5 1.875C12.7075 5.23556 10.5 9.26144 10.5 13.5887C10.5 17.8401 12.6307 21.8006 16.3019 25.125"
            stroke="currentColor"
            strokeWidth="3.75"
          />
        </svg>
      </span>

      <span aria-hidden className="flex shrink-0 items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
      </span>

      <span className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="success-circle inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-accent-lime"
            style={{ animationDelay: `${120 + i * 110}ms` }}
          >
            <svg width="26" height="26" viewBox="0 0 42 42" fill="none" aria-hidden>
              <path
                d="M20.6 33.27V20.74M20.6 20.74 9.69 14.48M20.6 20.74l10.91-6.26M14.96 11.06l11.27 6.45M19.35 32.93c.38.22.81.34 1.25.34s.87-.12 1.25-.34l8.77-5.01c.38-.22.7-.54.92-.92.22-.38.34-.81.34-1.25V15.73c0-.44-.12-.87-.34-1.25-.22-.38-.54-.7-.92-.92l-8.77-5.01c-.38-.22-.81-.34-1.25-.34s-.87.12-1.25.34l-8.77 5.01c-.38.22-.7.54-.92.92-.22.38-.34.81-.34 1.25v10.02c0 .44.12.87.34 1.25.22.38.54.7.92.92l8.77 5.01Z"
                stroke="#3D5507"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ))}
      </span>
    </div>
  );
}

