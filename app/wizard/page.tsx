"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/marketing/Logo";
import { CITIES, type CityKey } from "@/lib/cities";
import {
  aktiveSteg,
  stegGyldig,
  tomData,
  type StepId,
  type WizardData,
} from "@/lib/wizard/flow";
import { MapPanel } from "@/components/wizard/MapPanel";
import { ReceiptPanel } from "@/components/wizard/ReceiptPanel";
import { ThankYou } from "@/components/wizard/ThankYou";
import { StepAdresse } from "@/components/wizard/steps/StepAdresse";
import { StepKontakt } from "@/components/wizard/steps/StepKontakt";
import { StepKvittering } from "@/components/wizard/steps/StepKvittering";
import {
  StepBeskrivelse,
  StepBoligDetaljer,
  StepBoligParkering,
  StepBoligType,
  StepDato,
  StepEkstra,
  StepFleksibilitet,
  StepKunde,
  StepSpesial,
  StepTjeneste,
} from "@/components/wizard/steps/Steps";

/** Stemningsbilde i høyre kolonne på desktop, per tema. */
const ART: Partial<Record<StepId, string>> = {
  kunde: "/images/R1-07829-0034.jpg",
  tjeneste: "/images/R1-07829-0034.jpg",
  fraType: "/images/rull3_26.jpg",
  fraDetaljer: "/images/rull3_26.jpg",
  fraParkering: "/images/rull3_26.jpg",
  tilType: "/images/R1-09476-0023-kopi.jpg",
  tilDetaljer: "/images/R1-09476-0023-kopi.jpg",
  tilParkering: "/images/R1-09476-0023-kopi.jpg",
  spesial: "/images/R1-09476-0028.jpg",
  beskrivelse: "/images/R1-09476-0028.jpg",
  dato: "/images/boxes-and-plants.jpg",
  fleksibilitet: "/images/boxes-and-plants.jpg",
  ekstra: "/images/boxes-and-plants.jpg",
  kontakt: "/images/R1-07829-0034.jpg",
  kvittering: "/images/boxes-and-plants.jpg",
};

/** Liten tag over tittelen på bolig-kortene, så du husker hvilken bolig det gjelder. */
function temaFor(steg: StepId, bedrift: boolean): string | null {
  switch (steg) {
    case "fraType":
    case "fraDetaljer":
    case "fraParkering":
      return bedrift ? "Lokalet du flytter fra" : "Din gamle bolig";
    case "tilType":
    case "tilDetaljer":
    case "tilParkering":
      return bedrift ? "Lokalet du flytter til" : "Din nye bolig";
    default:
      return null;
  }
}

/**
 * Forespørselsskjemaet.
 *
 * Kortet er modalen: framdrift, spørsmål og Tilbake/Neste bor inni det.
 * Ett spørsmål per kort, så det aldri blir høyt. Hvilke kort som vises
 * styres av lib/wizard/flow.ts, og kvitteringen er siste kort før sending.
 */
export default function WizardPage() {
  return (
    <Suspense fallback={null}>
      <WizardPageInner />
    </Suspense>
  );
}

function WizardPageInner() {
  const params = useSearchParams();
  const fraFraUrl = params.get("fra") ?? "";
  const byFraUrl = params.get("by") as CityKey | null;
  const initialCenter = byFraUrl && CITIES[byFraUrl] ? CITIES[byFraUrl] : null;

  const [data, setData] = useState<WizardData>(() => tomData(fraFraUrl));
  const [stegId, setStegId] = useState<StepId>("adresse");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const steg = useMemo(() => aktiveSteg(data), [data]);
  const index = Math.max(0, steg.indexOf(stegId));
  const total = steg.length;
  const erSiste = stegId === "kvittering";
  const valid = stegGyldig(stegId, data);

  const update = <K extends keyof WizardData>(key: K, value: WizardData[K]) =>
    setData((d) => ({ ...d, [key]: value }));
  const updateBolig = (
    key: "fraBolig" | "tilBolig",
    b: WizardData["fraBolig"],
  ) => update(key, b);

  const goTo = (target: StepId) => {
    const ti = steg.indexOf(target);
    if (ti < 0) return;
    setDirection(ti > index ? 1 : -1);
    setStegId(target);
  };
  const next = () => {
    if (!valid) return;
    if (erSiste) {
      console.log("Wizard submitted:", data);
      setSubmitted(true);
      return;
    }
    goTo(steg[index + 1]);
  };
  const back = () => {
    if (index > 0) goTo(steg[index - 1]);
  };

  // Nytt kort: start øverst, ellers står man midt i neste spørsmål på mobil.
  useEffect(() => {
    if (window.scrollY > 0) window.scrollTo({ top: 0 });
  }, [stegId]);

  if (submitted) return <ThankYou />;

  const art = ART[stegId];
  const tema = temaFor(stegId, data.kunde === "bedrift");

  return (
    <div className="relative flex h-dvh flex-col items-center overflow-hidden bg-bg lg:h-auto lg:min-h-dvh lg:overflow-visible">
      {/* Bakgrunn: kun desktop. På mobil fyller flaten hele skjermen. */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden>
        <Image
          src="/images/boxes-and-plants.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/85" />
      </div>

      {/* Logo */}
      <div className="relative z-10 w-full max-w-[1060px] shrink-0 px-5 pt-5 pb-2 sm:px-8 lg:pt-7 lg:pb-4 lg:text-center">
        <Link href="/" aria-label="Kobly hjem" className="inline-block">
          <Logo />
        </Link>
      </div>

      {/* Kortet */}
      <div className="relative z-10 flex min-h-0 w-full max-w-[1060px] flex-1 flex-col lg:min-h-fit lg:justify-center lg:px-8 lg:pb-10">
        <div
          ref={cardRef}
          className="flex min-h-0 w-full flex-1 flex-col bg-bg lg:min-h-[600px] lg:flex-row lg:bg-surface-soft lg:overflow-hidden lg:rounded-[18px] lg:shadow-[0_20px_60px_rgba(0,0,0,0.28),0_4px_16px_rgba(0,0,0,0.10)]"
        >
          {/* Venstre: framdrift, spørsmål, knapper */}
          <div className="flex min-h-0 flex-1 flex-col px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 lg:flex-[0_0_58%] lg:p-11">
            <div className="mb-6 flex shrink-0 items-center gap-3 lg:mb-8">
              <div
                className="flex flex-1 gap-[3px]"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={index + 1}
                aria-label={`Steg ${index + 1} av ${total}`}
              >
                {steg.map((s, i) => (
                  <div
                    key={s}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      i <= index ? "bg-ink" : "bg-ink/10",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Innholdet ruller på mobil, topp og bunn står fast. Fade viser at det er mer. */}
            <div className="relative min-h-0 flex-1 lg:flex lg:flex-col">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-5 bg-gradient-to-b from-bg to-transparent lg:hidden"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-bg to-transparent lg:hidden"
              />
              <div className="h-full overflow-y-auto py-2 [scrollbar-width:none] lg:flex lg:h-auto lg:flex-1 lg:flex-col lg:overflow-visible lg:py-0">
                <div
                  key={stegId}
                  className={cn(
                    "flex flex-1 flex-col",
                    direction > 0 ? "wizard-slide-right" : "wizard-slide-left",
                  )}
                >
                  {tema ? (
                    <span className="mb-0.5 inline-flex self-start rounded-full bg-[#EFEAE0] px-2.5 py-0.5 text-sm font-medium text-ink/60 lg:text-[13px]">
                      {tema}
                    </span>
                  ) : null}
                  {stegId === "adresse" && (
                    <StepAdresse
                      fra={data.fra}
                      til={data.til}
                      fraCoord={data.fraCoord}
                      tilCoord={data.tilCoord}
                      utenlands={data.utenlands}
                      initialCenter={initialCenter}
                      onFra={(v, coord) => {
                        update("fra", v);
                        if (coord !== undefined) update("fraCoord", coord);
                      }}
                      onTil={(v, coord) => {
                        update("til", v);
                        if (coord !== undefined) update("tilCoord", coord);
                      }}
                      onUtenlands={(v) => update("utenlands", v)}
                    />
                  )}
                  {stegId === "kunde" && (
                    <StepKunde
                      kunde={data.kunde}
                      onKunde={(v) =>
                        // Bytter du mellom privat og bedrift, passer ikke boligtypene lenger.
                        setData((d) => ({
                          ...d,
                          kunde: v,
                          tjeneste:
                            v === "bedrift" && d.tjeneste === "dodsbo"
                              ? ""
                              : d.tjeneste,
                          fraBolig: { ...d.fraBolig, type: "", heis: null },
                          tilBolig: { ...d.tilBolig, type: "", heis: null },
                        }))
                      }
                    />
                  )}
                  {stegId === "tjeneste" && (
                    <StepTjeneste
                      kunde={data.kunde}
                      tjeneste={data.tjeneste}
                      onTjeneste={(v) => update("tjeneste", v)}
                    />
                  )}
                  {stegId === "fraType" && (
                    <StepBoligType
                      retning="fra"
                      kunde={data.kunde}
                      bolig={data.fraBolig}
                      onChange={(b) => updateBolig("fraBolig", b)}
                    />
                  )}
                  {stegId === "fraDetaljer" && (
                    <StepBoligDetaljer
                      retning="fra"
                      kunde={data.kunde}
                      bolig={data.fraBolig}
                      onChange={(b) => updateBolig("fraBolig", b)}
                    />
                  )}
                  {stegId === "fraParkering" && (
                    <StepBoligParkering
                      retning="fra"
                      bolig={data.fraBolig}
                      onChange={(b) => updateBolig("fraBolig", b)}
                    />
                  )}
                  {stegId === "tilType" && (
                    <StepBoligType
                      retning="til"
                      kunde={data.kunde}
                      bolig={data.tilBolig}
                      onChange={(b) => updateBolig("tilBolig", b)}
                    />
                  )}
                  {stegId === "tilDetaljer" && (
                    <StepBoligDetaljer
                      retning="til"
                      kunde={data.kunde}
                      bolig={data.tilBolig}
                      onChange={(b) => updateBolig("tilBolig", b)}
                    />
                  )}
                  {stegId === "tilParkering" && (
                    <StepBoligParkering
                      retning="til"
                      bolig={data.tilBolig}
                      onChange={(b) => updateBolig("tilBolig", b)}
                    />
                  )}
                  {stegId === "spesial" && (
                    <StepSpesial
                      spesial={data.spesial}
                      detaljer={data.spesialDetaljer}
                      onSpesial={(v) => update("spesial", v)}
                      onDetaljer={(v) => update("spesialDetaljer", v)}
                    />
                  )}
                  {stegId === "beskrivelse" && (
                    <StepBeskrivelse
                      beskrivelse={data.beskrivelse}
                      bilder={data.bilder}
                      onBeskrivelse={(v) => update("beskrivelse", v)}
                      onBilder={(v) => update("bilder", v)}
                    />
                  )}
                  {stegId === "dato" && (
                    <StepDato
                      dato={data.flyttedato}
                      onDato={(v) => update("flyttedato", v)}
                    />
                  )}
                  {stegId === "fleksibilitet" && (
                    <StepFleksibilitet
                      fleksibilitet={data.fleksibilitet}
                      onFleksibilitet={(v) => update("fleksibilitet", v)}
                    />
                  )}
                  {stegId === "ekstra" && (
                    <StepEkstra
                      ekstra={data.ekstra}
                      onEkstra={(v) => update("ekstra", v)}
                    />
                  )}
                  {stegId === "kontakt" && (
                    <StepKontakt
                      kunde={data.kunde}
                      navn={data.navn}
                      firma={data.firma}
                      telefon={data.telefon}
                      epost={data.epost}
                      onNavn={(v) => update("navn", v)}
                      onFirma={(v) => update("firma", v)}
                      onTelefon={(v) => update("telefon", v)}
                      onEpost={(v) => update("epost", v)}
                    />
                  )}
                  {stegId === "kvittering" && (
                    <StepKvittering data={data} onGoTo={goTo} />
                  )}
                </div>
              </div>
            </div>

            {/* Knapper: alltid synlige nederst */}
            <div className="mt-4 flex shrink-0 items-center justify-between gap-4 lg:mt-7">
              {index > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex min-h-[48px] items-center rounded-full px-2 text-base text-ink/55 lg:text-[15px] transition-colors hover:text-ink"
                >
                  Tilbake
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={next}
                disabled={!valid}
                className={cn(
                  "inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 text-base font-medium transition-colors lg:text-[15px]",
                  valid
                    ? "bg-brand text-brand-ink hover:bg-brand/90"
                    : "cursor-not-allowed bg-ink/10 text-ink/35",
                )}
              >
                {erSiste ? "Send forespørsel" : "Neste"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Høyre: kart på første kort, ellers stemningsbilde. Kun desktop. */}
          <div className="hidden lg:flex lg:flex-1">
            <div
              key={`side-${stegId === "adresse" ? "kart" : stegId === "kontakt" ? "kvittering" : art}`}
              className="wizard-fade-in relative flex-1 overflow-hidden bg-bg"
            >
              {stegId === "adresse" ? (
                <MapPanel
                  from={data.fraCoord}
                  to={data.tilCoord}
                  fromLabel={data.fra}
                  toLabel={data.til}
                  initialCenter={initialCenter}
                  onPlaceFrom={(c, addr) => {
                    update("fraCoord", c);
                    update("fra", addr);
                  }}
                  onPlaceTo={(c, addr) => {
                    update("tilCoord", c);
                    update("til", addr);
                  }}
                />
              ) : stegId === "kontakt" ? (
                <div className="absolute inset-0 overflow-y-auto">
                  <ReceiptPanel data={data} />
                </div>
              ) : art ? (
                <Image
                  src={art}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
