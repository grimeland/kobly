"use client";

import { oppsummering, type WizardData } from "@/lib/wizard/flow";

/** Kvitteringen i høyre kolonne på desktop. Lesevisning, ingen redigering. */
export function ReceiptPanel({ data }: { data: WizardData }) {
  const rows = oppsummering(data);
  return (
    <div className="flex h-full flex-col bg-[#F3EEE3] p-9">
      <span className="text-sm text-ink/45">Kvittering</span>
      <h3 className="mt-1.5 font-serif text-2xl font-medium leading-tight text-ink">
        Din forespørsel
      </h3>
      <p className="mt-2 text-sm text-ink/50">
        Dette sendes til tre kvalitetssjekkede byråer i ditt område.
      </p>
      <dl className="mt-6 flex flex-col divide-y divide-ink/8">
        {rows.map((r, i) => (
          <div
            key={`${r.label}-${i}`}
            className="grid grid-cols-[6.5rem_1fr] gap-x-3 py-2"
          >
            <dt className="text-[13px] leading-snug text-ink/45">{r.label}</dt>
            <dd className="m-0 text-sm leading-snug text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
