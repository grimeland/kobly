"use client";

import { StepHeader, TextField } from "@/components/wizard/fields";
import type { Kunde } from "@/lib/wizard/flow";

export function StepKontakt({
  kunde,
  navn,
  firma,
  telefon,
  epost,
  onNavn,
  onFirma,
  onTelefon,
  onEpost,
}: {
  kunde: Kunde | "";
  navn: string;
  firma: string;
  telefon: string;
  epost: string;
  onNavn: (v: string) => void;
  onFirma: (v: string) => void;
  onTelefon: (v: string) => void;
  onEpost: (v: string) => void;
}) {
  return (
    <>
      <StepHeader
        title="Hvem skal byråene kontakte?"
        subtitle="Du hører fra tre byråer innen 24 timer."
      />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {kunde === "bedrift" ? (
          <div className="sm:col-span-2">
            <TextField
              label="Firma"
              value={firma}
              onChange={onFirma}
              placeholder="Firmanavn"
              autoComplete="organization"
            />
          </div>
        ) : null}
        <TextField
          label="Navn"
          value={navn}
          onChange={onNavn}
          placeholder="Fornavn og etternavn"
          autoComplete="name"
        />
        <TextField
          label="Telefon"
          value={telefon}
          onChange={onTelefon}
          placeholder="+47 000 00 000"
          inputMode="tel"
          type="tel"
          autoComplete="tel"
        />
        <div className="sm:col-span-2">
          <TextField
            label="E-post"
            value={epost}
            onChange={onEpost}
            placeholder="navn@eksempel.no"
            type="email"
            inputMode="email"
            autoComplete="email"
          />
        </div>
      </div>
      <p className="mt-5 text-[13px] leading-snug text-ink/40">
        Gratis og uforpliktende. Kontaktinfoen din deles kun med de tre byråene
        som får forespørselen.
      </p>
    </>
  );
}
