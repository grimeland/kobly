import type { Coord } from "@/components/wizard/geo";

/**
 * Flytmodellen for forespørselsskjemaet.
 *
 * Ett tema per skjerm. Hvilke skjermer som vises avhenger av hva kunden
 * trenger hjelp til, så listen over aktive steg regnes ut fra dataene.
 */

export type Kunde = "privat" | "bedrift";
export type Tjeneste = "begge" | "flyttehjelp" | "flyttevask" | "dodsbo";

export type BoligtypePrivat =
  | "leilighet"
  | "rekkehus"
  | "enebolig"
  | "hytte"
  | "annet";
export type BoligtypeBedrift = "kontor" | "lager" | "butikk" | "annet";
export type Boligtype = BoligtypePrivat | BoligtypeBedrift;

export type Parkering = "0-10" | "10-25" | "25-50" | "50+";
export type Fleksibilitet = "eksakt" | "dager" | "uke" | "fleksibel";
export type Ekstra = "lagring" | "pakking" | "montering";

export type Spesialgjenstand =
  | "piano"
  | "safe"
  | "kunst"
  | "antikviteter"
  | "akvarium"
  | "hvitevarer"
  | "annet";

export type Bolig = {
  type: Boligtype | "";
  storrelse: string;
  /** Leilighet: hvilken etasje. Andre: antall etasjer. */
  etasje: string;
  heis: boolean | null;
  parkering: Parkering | "";
};

export const tomBolig = (): Bolig => ({
  type: "",
  storrelse: "",
  etasje: "",
  heis: null,
  parkering: "",
});

export type WizardData = {
  fra: string;
  fraCoord: Coord | null;
  til: string;
  tilCoord: Coord | null;
  utenlands: boolean;

  kunde: Kunde | "";
  tjeneste: Tjeneste | "";

  fraBolig: Bolig;
  tilBolig: Bolig;

  spesial: Spesialgjenstand[];
  spesialDetaljer: string;
  beskrivelse: string;
  bilder: File[];

  flyttedato: string;
  fleksibilitet: Fleksibilitet | "";
  ekstra: Ekstra[];

  navn: string;
  firma: string;
  telefon: string;
  epost: string;
};

export const tomData = (fra = ""): WizardData => ({
  fra,
  fraCoord: null,
  til: "",
  tilCoord: null,
  utenlands: false,
  kunde: "",
  tjeneste: "",
  fraBolig: tomBolig(),
  tilBolig: tomBolig(),
  spesial: [],
  spesialDetaljer: "",
  beskrivelse: "",
  bilder: [],
  flyttedato: "",
  fleksibilitet: "",
  ekstra: [],
  navn: "",
  firma: "",
  telefon: "",
  epost: "",
});

export type StepId =
  | "adresse"
  | "kunde"
  | "tjeneste"
  | "fraType"
  | "fraDetaljer"
  | "fraParkering"
  | "tilType"
  | "tilDetaljer"
  | "tilParkering"
  | "spesial"
  | "beskrivelse"
  | "dato"
  | "fleksibilitet"
  | "ekstra"
  | "kontakt"
  | "kvittering";

/** Trenger denne tjenesten at noe faktisk fraktes? Kun vask gjør ikke det. */
export const trengerFrakt = (t: Tjeneste | "") => t !== "flyttevask";

/**
 * Aktive steg i rekkefølge, gitt hva som er svart så langt.
 * Ett spørsmål per kort, så kortet aldri blir høyt.
 */
export function aktiveSteg(d: WizardData): StepId[] {
  const frakt = trengerFrakt(d.tjeneste);
  const steg: StepId[] = [
    "adresse",
    "kunde",
    "tjeneste",
    "fraType",
    "fraDetaljer",
    "fraParkering",
  ];
  if (frakt) steg.push("tilType", "tilDetaljer", "tilParkering");
  if (frakt) steg.push("spesial", "beskrivelse");
  steg.push("dato", "fleksibilitet");
  if (frakt) steg.push("ekstra");
  steg.push("kontakt", "kvittering");
  return steg;
}

export const boligtyperPrivat: { id: BoligtypePrivat; label: string }[] = [
  { id: "leilighet", label: "Leilighet" },
  { id: "rekkehus", label: "Rekkehus" },
  { id: "enebolig", label: "Enebolig" },
  { id: "hytte", label: "Hytte" },
  { id: "annet", label: "Annet" },
];

export const boligtyperBedrift: { id: BoligtypeBedrift; label: string }[] = [
  { id: "kontor", label: "Kontor" },
  { id: "lager", label: "Lager" },
  { id: "butikk", label: "Butikk" },
  { id: "annet", label: "Annet" },
];

export const parkeringValg: { id: Parkering; label: string }[] = [
  { id: "0-10", label: "Under 10 m" },
  { id: "10-25", label: "10–25 m" },
  { id: "25-50", label: "25–50 m" },
  { id: "50+", label: "Over 50 m" },
];

export const fleksibilitetValg: {
  id: Fleksibilitet;
  label: string;
  hint: string;
}[] = [
  { id: "eksakt", label: "Eksakt dato", hint: "Må skje denne dagen" },
  { id: "dager", label: "Noen dager", hint: "± 2–3 dager" },
  { id: "uke", label: "En uke", hint: "± 1 uke" },
  { id: "fleksibel", label: "Helt fleksibel", hint: "Byrået foreslår" },
];

export const ekstraValg: { id: Ekstra; label: string; hint: string }[] = [
  { id: "pakking", label: "Pakking", hint: "Byrået pakker for deg" },
  { id: "montering", label: "Montering", hint: "Demontering og montering" },
  { id: "lagring", label: "Lagring", hint: "Mellomlagring av innbo" },
];

export const spesialValg: { id: Spesialgjenstand; label: string }[] = [
  { id: "piano", label: "Piano" },
  { id: "safe", label: "Safe" },
  { id: "hvitevarer", label: "Hvitevarer" },
  { id: "kunst", label: "Kunst" },
  { id: "antikviteter", label: "Antikviteter" },
  { id: "akvarium", label: "Akvarium" },
  { id: "annet", label: "Annet" },
];

export const tjenesteValg: { id: Tjeneste; label: string; hint: string }[] = [
  {
    id: "begge",
    label: "Flyttehjelp og flyttevask",
    hint: "Det vanligste valget",
  },
  { id: "flyttehjelp", label: "Kun flyttehjelp", hint: "Transport og bæring" },
  { id: "flyttevask", label: "Kun flyttevask", hint: "Utvask av boligen" },
  { id: "dodsbo", label: "Dødsbo", hint: "Rydding, flytting og vask" },
];

/** Heis er bare interessant når etasjen er fylt ut og høyere enn 1. */
export function visHeis(b: Bolig): boolean {
  const n = Number(b.etasje);
  return b.etasje.trim() !== "" && Number.isFinite(n) && n > 1;
}

export function detaljerGyldig(b: Bolig): boolean {
  if (!b.storrelse.trim() || Number(b.storrelse) <= 0) return false;
  if (visHeis(b) && b.heis === null) return false;
  return true;
}

export function kontaktGyldig(d: WizardData): boolean {
  return (
    d.navn.trim().length > 1 &&
    /^[\d\s+]{8,}$/.test(d.telefon) &&
    /\S+@\S+\.\S+/.test(d.epost) &&
    (d.kunde !== "bedrift" || d.firma.trim().length > 1)
  );
}

export function stegGyldig(id: StepId, d: WizardData): boolean {
  switch (id) {
    case "adresse":
      return d.fra.trim().length > 2 && d.til.trim().length > 2;
    case "kunde":
      return Boolean(d.kunde);
    case "tjeneste":
      return Boolean(d.tjeneste);
    case "fraType":
      return Boolean(d.fraBolig.type);
    case "fraDetaljer":
      return detaljerGyldig(d.fraBolig);
    case "fraParkering":
      return Boolean(d.fraBolig.parkering);
    case "tilType":
      return Boolean(d.tilBolig.type);
    case "tilDetaljer":
      return detaljerGyldig(d.tilBolig);
    case "tilParkering":
      return Boolean(d.tilBolig.parkering);
    case "spesial":
    case "beskrivelse":
    case "ekstra":
      return true;
    case "dato":
      return Boolean(d.flyttedato);
    case "fleksibilitet":
      return Boolean(d.fleksibilitet);
    case "kontakt":
      return kontaktGyldig(d);
    case "kvittering":
      return aktiveSteg(d)
        .filter((s) => s !== "kvittering")
        .every((s) => stegGyldig(s, d));
  }
}

/* ---------- Oppsummering ---------- */

export type SummaryRow = { steg: StepId; label: string; value: string };

const label = <T extends string>(
  valg: readonly { id: T; label: string }[],
  id: T | "",
) => valg.find((v) => v.id === id)?.label ?? "";

function boligTekst(b: Bolig): string {
  const deler: string[] = [];
  const type =
    label(boligtyperPrivat, b.type as BoligtypePrivat) ||
    label(boligtyperBedrift, b.type as BoligtypeBedrift);
  if (type) deler.push(type);
  if (b.storrelse) deler.push(`${b.storrelse} m²`);
  if (b.etasje)
    deler.push(
      b.type === "leilighet" ? `${b.etasje}. etasje` : `${b.etasje} etasjer`,
    );
  if (visHeis(b) && b.heis !== null) deler.push(b.heis ? "heis" : "uten heis");
  if (b.parkering) deler.push(`parkering ${label(parkeringValg, b.parkering).toLowerCase()}`);
  return deler.join(" · ");
}

export function formatDato(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function oppsummering(d: WizardData): SummaryRow[] {
  const rows: SummaryRow[] = [];
  if (d.fra) rows.push({ steg: "adresse", label: "Fra", value: d.fra });
  if (d.til)
    rows.push({
      steg: "adresse",
      label: "Til",
      value: d.utenlands ? `${d.til} (utenlands)` : d.til,
    });
  if (d.kunde || d.tjeneste)
    rows.push({
      steg: "tjeneste",
      label: "Oppdrag",
      value: [
        d.kunde === "bedrift" ? "Bedrift" : d.kunde === "privat" ? "Privat" : "",
        label(tjenesteValg, d.tjeneste),
      ]
        .filter(Boolean)
        .join(" · "),
    });
  const fraB = boligTekst(d.fraBolig);
  if (fraB) rows.push({ steg: "fraType", label: "Flytter fra", value: fraB });
  const tilB = boligTekst(d.tilBolig);
  if (tilB && trengerFrakt(d.tjeneste))
    rows.push({ steg: "tilType", label: "Flytter til", value: tilB });
  if (trengerFrakt(d.tjeneste)) {
    const spesial = [
      d.spesial.map((s) => label(spesialValg, s)).join(", "),
      d.spesialDetaljer.trim(),
    ]
      .filter(Boolean)
      .join(". ");
    if (spesial)
      rows.push({ steg: "spesial", label: "Tungt eller skjørt", value: spesial });
    if (d.beskrivelse.trim())
      rows.push({ steg: "beskrivelse", label: "Annet", value: d.beskrivelse.trim() });
    if (d.bilder.length)
      rows.push({
        steg: "beskrivelse",
        label: "Bilder",
        value: `${d.bilder.length} ${d.bilder.length === 1 ? "bilde" : "bilder"}`,
      });
  }
  if (d.flyttedato) {
    const fleks = label(fleksibilitetValg, d.fleksibilitet);
    rows.push({
      steg: "dato",
      label: "Når",
      value: [formatDato(d.flyttedato), fleks && fleks.toLowerCase()]
        .filter(Boolean)
        .join(" · "),
    });
  }
  if (d.ekstra.length)
    rows.push({
      steg: "ekstra",
      label: "Ekstra",
      value: d.ekstra.map((e) => label(ekstraValg, e)).join(", "),
    });
  if (d.navn || d.firma)
    rows.push({
      steg: "kontakt",
      label: "Kontakt",
      value: [d.firma, d.navn, d.telefon, d.epost].filter(Boolean).join(" · "),
    });
  return rows;
}
