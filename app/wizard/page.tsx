"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/marketing/Logo";
import { RadioCard } from "@/components/wizard/RadioCard";
import { Illustration } from "@/components/wizard/Illustration";

type FlytteType = "privat" | "bedrift" | "internasjonal";
type Boligtype = "leilighet" | "rekkehus" | "enebolig" | "annet";

type WizardData = {
  flytteType: FlytteType | "";
  fra: string;
  til: string;
  boligtype: Boligtype | "";
  rooms: string;
  flyttedato: string;
  fleksibel: boolean;
  tilleggstjenester: string[];
  navn: string;
  telefon: string;
  epost: string;
};

const TILLEGG = [
  "Pakking",
  "Møbelmontering",
  "Vask av gammel bolig",
  "Lagring",
  "Kasting og rydding",
  "Tunge ting (piano, safe, etc.)",
];

const TOTAL_STEPS = 6;

export default function WizardPage() {
  const params = useSearchParams();
  const fraFraUrl = params.get("fra") ?? "";

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<WizardData>({
    flytteType: "",
    fra: fraFraUrl,
    til: "",
    boligtype: "",
    rooms: "",
    flyttedato: "",
    fleksibel: false,
    tilleggstjenester: [],
    navn: "",
    telefon: "",
    epost: "",
  });

  const update = <K extends keyof WizardData>(key: K, value: WizardData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleTillegg = (label: string) =>
    setData((d) => ({
      ...d,
      tilleggstjenester: d.tilleggstjenester.includes(label)
        ? d.tilleggstjenester.filter((t) => t !== label)
        : [...d.tilleggstjenester, label],
    }));

  const valid = useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(data.flytteType);
      case 2:
        return /^\d{4}$/.test(data.fra) && /^\d{4}$/.test(data.til);
      case 3:
        return Boolean(data.boligtype) && data.rooms !== "";
      case 4:
        return data.fleksibel || Boolean(data.flyttedato);
      case 5:
        return true;
      case 6:
        return (
          data.navn.trim().length > 1 &&
          /^[\d\s+]{8,}$/.test(data.telefon) &&
          /\S+@\S+\.\S+/.test(data.epost)
        );
      default:
        return false;
    }
  }, [step, data]);

  const next = () => {
    if (!valid) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
    else submit();
  };

  const back = () => setStep(Math.max(1, step - 1));

  const submit = () => {
    console.log("Wizard submitted:", data);
    setSubmitted(true);
  };

  if (submitted) return <ThankYou />;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
          <Link href="/" aria-label="Kobly hjem" className="no-underline">
            <Logo />
          </Link>
          <Link
            href="/"
            aria-label="Lukk"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>
        <div className="mx-auto h-1 w-full max-w-6xl overflow-hidden rounded-full bg-line">
          <div
            className="h-full bg-accent-lime transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </header>

      <main className="flex-1 px-6 pt-12 pb-32 sm:px-10 sm:pt-16 lg:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-sm text-ink-muted">
              Steg {step} av {TOTAL_STEPS}
            </p>

            {step === 1 && (
              <Step1
                value={data.flytteType}
                onChange={(v) => update("flytteType", v)}
              />
            )}
            {step === 2 && (
              <Step2
                fra={data.fra}
                til={data.til}
                onFra={(v) => update("fra", v)}
                onTil={(v) => update("til", v)}
              />
            )}
            {step === 3 && (
              <Step3
                boligtype={data.boligtype}
                rooms={data.rooms}
                onBoligtype={(v) => update("boligtype", v)}
                onRooms={(v) => update("rooms", v)}
              />
            )}
            {step === 4 && (
              <Step4
                date={data.flyttedato}
                fleksibel={data.fleksibel}
                onDate={(v) => update("flyttedato", v)}
                onFleksibel={(v) => update("fleksibel", v)}
              />
            )}
            {step === 5 && (
              <Step5
                selected={data.tilleggstjenester}
                onToggle={toggleTillegg}
              />
            )}
            {step === 6 && (
              <Step6
                navn={data.navn}
                telefon={data.telefon}
                epost={data.epost}
                onNavn={(v) => update("navn", v)}
                onTelefon={(v) => update("telefon", v)}
                onEpost={(v) => update("epost", v)}
              />
            )}
          </div>

          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="mx-auto aspect-square max-w-md">
              <Illustration step={step as 1 | 2 | 3 | 4 | 5 | 6} />
            </div>
          </div>
        </div>
      </main>

      <nav className="sticky bottom-0 left-0 right-0 border-t border-line bg-bg/90 px-6 py-4 backdrop-blur-md sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors",
              step === 1
                ? "invisible"
                : "text-ink ring-1 ring-line hover:bg-ink/5",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!valid}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
              valid
                ? "bg-brand text-brand-ink hover:bg-brand/90"
                : "cursor-not-allowed bg-line text-ink-muted",
            )}
          >
            {step === TOTAL_STEPS ? "Send forespørsel" : "Neste"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </div>
  );
}

function StepHeader({ title }: { title: string }) {
  return (
    <h1 className="mt-3 font-serif text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
      {title}
    </h1>
  );
}

function Step1({
  value,
  onChange,
}: {
  value: WizardData["flytteType"];
  onChange: (v: FlytteType) => void;
}) {
  return (
    <>
      <StepHeader title="Hva slags flytting er det?" />
      <div className="mt-8 flex flex-col gap-3">
        <RadioCard
          selected={value === "privat"}
          title="Privat flytting"
          description="Leilighet, hus eller hybel"
          onSelect={() => onChange("privat")}
        />
        <RadioCard
          selected={value === "bedrift"}
          title="Bedriftsflytting"
          description="Kontor, lager eller næringslokaler"
          onSelect={() => onChange("bedrift")}
        />
        <RadioCard
          selected={value === "internasjonal"}
          title="Internasjonal"
          description="Til eller fra utlandet"
          onSelect={() => onChange("internasjonal")}
        />
      </div>
    </>
  );
}

function Step2({
  fra,
  til,
  onFra,
  onTil,
}: {
  fra: string;
  til: string;
  onFra: (v: string) => void;
  onTil: (v: string) => void;
}) {
  return (
    <>
      <StepHeader title="Hvor skal du flytte?" />
      <p className="mt-3 text-base text-ink-muted">
        Vi bruker postnummer for å koble deg med byråer i ditt område.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <PostnummerField label="Fra postnummer" value={fra} onChange={onFra} />
        <PostnummerField label="Til postnummer" value={til} onChange={onTil} />
      </div>
    </>
  );
}

function PostnummerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d{4}"
        maxLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder="0000"
        className="mt-2 w-full rounded-xl bg-surface px-5 py-3 text-base text-ink ring-1 ring-line outline-none transition-colors focus:ring-ink/30"
      />
    </label>
  );
}

function Step3({
  boligtype,
  rooms,
  onBoligtype,
  onRooms,
}: {
  boligtype: WizardData["boligtype"];
  rooms: string;
  onBoligtype: (v: Boligtype) => void;
  onRooms: (v: string) => void;
}) {
  const types: { value: Boligtype; label: string }[] = [
    { value: "leilighet", label: "Leilighet" },
    { value: "rekkehus", label: "Rekkehus" },
    { value: "enebolig", label: "Enebolig" },
    { value: "annet", label: "Annet" },
  ];
  const roomOptions = ["1", "2", "3", "4", "5+"];
  return (
    <>
      <StepHeader title="Hva slags bolig er det?" />
      <div className="mt-8">
        <p className="text-sm font-medium text-ink">Boligtype</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {types.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onBoligtype(t.value)}
              className={cn(
                "rounded-xl bg-surface px-4 py-3 text-sm font-medium transition-all ring-1",
                boligtype === t.value
                  ? "ring-2 ring-brand text-ink"
                  : "ring-line text-ink hover:ring-ink/20",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="text-sm font-medium text-ink">Antall rom</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {roomOptions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRooms(r)}
              className={cn(
                "h-12 min-w-12 rounded-full bg-surface px-4 text-sm font-medium ring-1 transition-all",
                rooms === r
                  ? "ring-2 ring-brand"
                  : "ring-line hover:ring-ink/20",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Step4({
  date,
  fleksibel,
  onDate,
  onFleksibel,
}: {
  date: string;
  fleksibel: boolean;
  onDate: (v: string) => void;
  onFleksibel: (v: boolean) => void;
}) {
  return (
    <>
      <StepHeader title="Når skal du flytte?" />
      <p className="mt-3 text-base text-ink-muted">
        Velg en dato eller la oss vite om du er fleksibel.
      </p>
      <div className="mt-8">
        <label className="block">
          <span className="text-sm font-medium text-ink">Ønsket flyttedato</span>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              onDate(e.target.value);
              if (e.target.value) onFleksibel(false);
            }}
            disabled={fleksibel}
            className={cn(
              "mt-2 w-full rounded-xl bg-surface px-5 py-3 text-base text-ink ring-1 ring-line outline-none transition-colors focus:ring-ink/30",
              fleksibel && "opacity-50",
            )}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            onFleksibel(!fleksibel);
            if (!fleksibel) onDate("");
          }}
          className={cn(
            "mt-4 inline-flex items-center gap-3 rounded-xl bg-surface px-5 py-3 text-sm font-medium ring-1 transition-all",
            fleksibel ? "ring-2 ring-brand" : "ring-line hover:ring-ink/20",
          )}
        >
          <span
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded transition-colors",
              fleksibel ? "bg-brand" : "ring-1 ring-line",
            )}
          >
            {fleksibel ? (
              <Check className="h-3.5 w-3.5 text-brand-ink" />
            ) : null}
          </span>
          Jeg er fleksibel på datoen
        </button>
      </div>
    </>
  );
}

function Step5({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (label: string) => void;
}) {
  return (
    <>
      <StepHeader title="Trenger du noe ekstra?" />
      <p className="mt-3 text-base text-ink-muted">
        Velg én eller flere. Du kan hoppe over dette steget.
      </p>
      <div className="mt-8 grid gap-2 sm:grid-cols-2">
        {TILLEGG.map((t) => {
          const isSelected = selected.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => onToggle(t)}
              className={cn(
                "flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-left text-sm font-medium ring-1 transition-all",
                isSelected
                  ? "ring-2 ring-brand"
                  : "ring-line hover:ring-ink/20",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors",
                  isSelected ? "bg-brand" : "ring-1 ring-line",
                )}
              >
                {isSelected ? (
                  <Check className="h-3.5 w-3.5 text-brand-ink" />
                ) : null}
              </span>
              {t}
            </button>
          );
        })}
      </div>
    </>
  );
}

function Step6({
  navn,
  telefon,
  epost,
  onNavn,
  onTelefon,
  onEpost,
}: {
  navn: string;
  telefon: string;
  epost: string;
  onNavn: (v: string) => void;
  onTelefon: (v: string) => void;
  onEpost: (v: string) => void;
}) {
  return (
    <>
      <StepHeader title="Hvem skal vi kontakte?" />
      <p className="mt-3 text-base text-ink-muted">
        Vi kobler deg med tre byråer. Du hører fra dem innen 24 timer.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <TextField
          label="Navn"
          value={navn}
          onChange={onNavn}
          placeholder="Ola Nordmann"
        />
        <TextField
          label="Telefon"
          value={telefon}
          onChange={onTelefon}
          placeholder="+47 000 00 000"
          inputMode="tel"
        />
        <TextField
          label="E-post"
          value={epost}
          onChange={onEpost}
          placeholder="ola@eksempel.no"
          type="email"
        />
      </div>
    </>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-2 w-full rounded-xl bg-surface px-5 py-3 text-base text-ink ring-1 ring-line outline-none transition-colors focus:ring-ink/30"
      />
    </label>
  );
}

function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-lime">
        <Check className="h-8 w-8 text-[#3D5507]" strokeWidth={2.5} />
      </span>
      <h1 className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
        Takk for forespørselen!
      </h1>
      <p className="mt-5 max-w-md text-base text-ink-muted sm:text-lg">
        Vi kobler deg med tre kvalitetssjekkede byråer. Du hører fra oss innen
        24 timer.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90"
      >
        Tilbake til forsiden
      </Link>
    </div>
  );
}
