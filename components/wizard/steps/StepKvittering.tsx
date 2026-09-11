"use client";

import { Pencil } from "lucide-react";
import { StepHeader } from "@/components/wizard/fields";
import { oppsummering, type StepId, type WizardData } from "@/lib/wizard/flow";

/** Siste steg: alt samlet, hver linje kan endres før du sender. */
export function StepKvittering({
  data,
  onGoTo,
}: {
  data: WizardData;
  onGoTo: (steg: StepId) => void;
}) {
  const rows = oppsummering(data);
  return (
    <>
      <StepHeader
        title="Stemmer dette?"
        subtitle="Dette sendes til tre kvalitetssjekkede byråer i ditt område."
      />
      <dl className="mt-4 flex flex-col divide-y divide-ink/8">
        {rows.map((r, i) => (
          <div
            key={`${r.label}-${i}`}
            className="grid grid-cols-[1fr_auto] items-start gap-x-2 py-2 sm:grid-cols-[7.5rem_1fr_auto]"
          >
            <dt className="text-sm leading-snug text-ink/45 sm:pt-0.5 lg:text-[13px]">
              {r.label}
            </dt>
            <button
              type="button"
              onClick={() => onGoTo(r.steg)}
              aria-label={`Endre ${r.label.toLowerCase()}`}
              className="row-span-2 inline-flex h-8 w-8 items-center justify-center self-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink sm:row-span-1"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <dd className="m-0 text-base leading-snug text-ink sm:col-start-2 sm:row-start-1 lg:text-sm">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
