"use client";

import { useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";
import {
  Choice,
  Group,
  NumberField,
  StepHeader,
  Textarea,
} from "@/components/wizard/fields";
import { DatePicker } from "@/components/wizard/DatePicker";
import {
  boligtyperBedrift,
  boligtyperPrivat,
  ekstraValg,
  fleksibilitetValg,
  parkeringValg,
  spesialValg,
  tjenesteValg,
  visHeis,
  type Bolig,
  type Ekstra,
  type Fleksibilitet,
  type Kunde,
  type Spesialgjenstand,
  type Tjeneste,
} from "@/lib/wizard/flow";

/* Små steg: ett spørsmål per kort. */

export function StepKunde({
  kunde,
  onKunde,
}: {
  kunde: Kunde | "";
  onKunde: (v: Kunde) => void;
}) {
  return (
    <>
      <StepHeader title="Hvem flytter?" />
      <div className="mt-5 flex flex-col gap-2">
        <Choice
          selected={kunde === "privat"}
          onSelect={() => onKunde("privat")}
          label="Privatperson"
          hint="Bolig, hytte eller leilighet"
        />
        <Choice
          selected={kunde === "bedrift"}
          onSelect={() => onKunde("bedrift")}
          label="Bedrift"
          hint="Kontor, lager eller butikk"
        />
      </div>
    </>
  );
}

export function StepTjeneste({
  kunde,
  tjeneste,
  onTjeneste,
}: {
  kunde: Kunde | "";
  tjeneste: Tjeneste | "";
  onTjeneste: (v: Tjeneste) => void;
}) {
  return (
    <>
      <StepHeader
        title="Hva trenger du hjelp til?"
        subtitle="Dette avgjør hvilke byråer vi spør."
      />
      <div className="mt-5 flex flex-col gap-2">
        {tjenesteValg
          .filter((t) => !(kunde === "bedrift" && t.id === "dodsbo"))
          .map((t) => (
            <Choice
              key={t.id}
              selected={tjeneste === t.id}
              onSelect={() => onTjeneste(t.id)}
              label={t.label}
              hint={t.hint}
            />
          ))}
      </div>
    </>
  );
}

const subjekt = (kunde: Kunde | "") => (kunde === "bedrift" ? "lokalet" : "boligen");
export function StepBoligType({
  retning,
  kunde,
  bolig,
  onChange,
}: {
  retning: "fra" | "til";
  kunde: Kunde | "";
  bolig: Bolig;
  onChange: (b: Bolig) => void;
}) {
  const typer = kunde === "bedrift" ? boligtyperBedrift : boligtyperPrivat;
  return (
    <>
      <StepHeader
        title={`Hva slags ${retning === "fra" ? "sted flytter du fra" : "sted flytter du til"}?`}
      />
      <div className="mt-5 flex flex-col gap-2">
        {typer.map((t) => (
          <Choice
            key={t.id}
            compact
            selected={bolig.type === t.id}
            onSelect={() => onChange({ ...bolig, type: t.id, heis: null })}
            label={t.label}
          />
        ))}
      </div>
    </>
  );
}

export function StepBoligDetaljer({
  retning,
  kunde,
  bolig,
  onChange,
}: {
  retning: "fra" | "til";
  kunde: Kunde | "";
  bolig: Bolig;
  onChange: (b: Bolig) => void;
}) {
  const set = <K extends keyof Bolig>(k: K, v: Bolig[K]) =>
    onChange({ ...bolig, [k]: v });
  const erLeilighet = bolig.type === "leilighet";
  return (
    <>
      <StepHeader
        title={`Hvor stor er ${subjekt(kunde)} du flytter ${retning}?`}
      />
      <div className="mt-5 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Størrelse"
            value={bolig.storrelse}
            onChange={(v) => set("storrelse", v)}
            suffix="m²"
            placeholder="70"
          />
          <NumberField
            label={erLeilighet ? "Etasje" : "Antall etasjer"}
            value={bolig.etasje}
            onChange={(v) => set("etasje", v)}
            placeholder={erLeilighet ? "3" : "1"}
            hint="Valgfritt"
          />
        </div>
        {visHeis(bolig) ? (
          <Group label="Er det heis?">
            <div className="grid grid-cols-2 gap-2">
              <Choice
                compact
                selected={bolig.heis === true}
                onSelect={() => set("heis", true)}
                label="Ja"
              />
              <Choice
                compact
                selected={bolig.heis === false}
                onSelect={() => set("heis", false)}
                label="Nei"
              />
            </div>
          </Group>
        ) : null}
      </div>
    </>
  );
}

export function StepBoligParkering({
  retning,
  bolig,
  onChange,
}: {
  retning: "fra" | "til";
  bolig: Bolig;
  onChange: (b: Bolig) => void;
}) {
  return (
    <>
      <StepHeader
        title={`Hvor nær inngangen kan flyttebilen stå${retning === "til" ? " der du flytter til" : ""}?`}
      />
      <div className="mt-5 flex flex-col gap-2">
        {parkeringValg.map((p) => (
          <Choice
            key={p.id}
            compact
            selected={bolig.parkering === p.id}
            onSelect={() => onChange({ ...bolig, parkering: p.id })}
            label={p.label}
          />
        ))}
      </div>
    </>
  );
}

export function StepSpesial({
  spesial,
  detaljer,
  onSpesial,
  onDetaljer,
}: {
  spesial: Spesialgjenstand[];
  detaljer: string;
  onSpesial: (v: Spesialgjenstand[]) => void;
  onDetaljer: (v: string) => void;
}) {
  const toggle = (id: Spesialgjenstand) =>
    onSpesial(
      spesial.includes(id) ? spesial.filter((s) => s !== id) : [...spesial, id],
    );
  return (
    <>
      <StepHeader
        title="Noe tungt eller skjørt?"
        subtitle="Velg det som gjelder. Hopp over hvis ingenting passer."
      />
      <div className="mt-5 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {spesialValg.map((s) => (
            <Choice
              key={s.id}
              multi
              compact
              selected={spesial.includes(s.id)}
              onSelect={() => toggle(s.id)}
              label={s.label}
            />
          ))}
        </div>
        {spesial.includes("annet") ? (
          <Textarea
            value={detaljer}
            onChange={onDetaljer}
            rows={2}
            placeholder="Hva er det? F.eks. «Stor marmorbenk»"
          />
        ) : null}
      </div>
    </>
  );
}

export function StepBeskrivelse({
  beskrivelse,
  bilder,
  onBeskrivelse,
  onBilder,
}: {
  beskrivelse: string;
  bilder: File[];
  onBeskrivelse: (v: string) => void;
  onBilder: (v: File[]) => void;
}) {
  const previews = useMemo(
    () => bilder.map((f) => URL.createObjectURL(f)),
    [bilder],
  );
  useEffect(
    () => () => previews.forEach((url) => URL.revokeObjectURL(url)),
    [previews],
  );
  return (
    <>
      <StepHeader
        title="Noe annet vi burde vite?"
        subtitle="Valgfritt. Ting som ikke passet i spørsmålene over."
      />
      <div className="mt-5 flex flex-col gap-5">
        <Textarea
          value={beskrivelse}
          onChange={onBeskrivelse}
          rows={4}
          maxLength={2000}
          placeholder="F.eks. ca. antall esker, trang oppgang, port som må åpnes, eller at det må skje før kl. 12."
        />
        <Group label="Har du noen bilder?" hint="Gir et mer presist tilbud">
          {previews.length > 0 ? (
            <div className="mb-2 grid grid-cols-4 gap-2">
              {previews.map((url, i) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-[14px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => onBilder(bilder.filter((_, idx) => idx !== i))}
                    aria-label="Fjern bilde"
                    className="absolute top-1 right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-white transition-colors hover:bg-ink"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <label className="flex min-h-[88px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border-[1.5px] border-dashed border-ink/20 bg-[#F7F5F0] text-[15px] text-ink/60 transition-colors hover:border-ink/40">
            <Upload className="h-4 w-4" />
            <span>{previews.length > 0 ? "Legg til flere" : "Last opp bilder"}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                e.target.files && onBilder([...bilder, ...Array.from(e.target.files)])
              }
              className="hidden"
            />
          </label>
        </Group>
      </div>
    </>
  );
}

export function StepDato({
  dato,
  onDato,
}: {
  dato: string;
  onDato: (v: string) => void;
}) {
  return (
    <>
      <StepHeader title="Når vil du flytte?" />
      <div className="mt-5">
        <DatePicker value={dato} onChange={onDato} />
      </div>
    </>
  );
}

export function StepFleksibilitet({
  fleksibilitet,
  onFleksibilitet,
}: {
  fleksibilitet: Fleksibilitet | "";
  onFleksibilitet: (v: Fleksibilitet) => void;
}) {
  return (
    <>
      <StepHeader
        title="Hvor låst er datoen?"
        subtitle="Fleksible datoer gir ofte bedre pris."
      />
      <div className="mt-5 flex flex-col gap-2">
        {fleksibilitetValg.map((f) => (
          <Choice
            key={f.id}
            compact
            selected={fleksibilitet === f.id}
            onSelect={() => onFleksibilitet(f.id)}
            label={f.label}
            hint={f.hint}
          />
        ))}
      </div>
    </>
  );
}

export function StepEkstra({
  ekstra,
  onEkstra,
}: {
  ekstra: Ekstra[];
  onEkstra: (v: Ekstra[]) => void;
}) {
  const toggle = (id: Ekstra) =>
    onEkstra(
      ekstra.includes(id) ? ekstra.filter((e) => e !== id) : [...ekstra, id],
    );
  return (
    <>
      <StepHeader
        title="Trenger du noe ekstra?"
        subtitle="Valgfritt. Velg det som gjelder."
      />
      <div className="mt-5 flex flex-col gap-2">
        {ekstraValg.map((e) => (
          <Choice
            key={e.id}
            multi
            compact
            selected={ekstra.includes(e.id)}
            onSelect={() => toggle(e.id)}
            label={e.label}
            hint={e.hint}
          />
        ))}
      </div>
    </>
  );
}
