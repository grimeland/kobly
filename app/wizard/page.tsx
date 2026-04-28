"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/marketing/Logo";
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
  const [direction, setDirection] = useState<1 | -1>(1);
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

  const goTo = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };
  const next = () => {
    if (!valid) return;
    if (step < TOTAL_STEPS) goTo(step + 1);
    else submit();
  };
  const back = () => {
    if (step > 1) goTo(step - 1);
  };

  const submit = () => {
    console.log("Wizard submitted:", data);
    setSubmitted(true);
  };

  if (submitted) return <ThankYou />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-bg">
      {/* Bakgrunnsbilde med overlay */}
      <Image
        src="/images/boxes-and-plants.jpg"
        alt=""
        aria-hidden
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-bg/85" aria-hidden />

      {/* Logo øverst */}
      <Link
        href="/"
        aria-label="Kobly hjem"
        className="absolute left-1/2 top-7 z-10 -translate-x-1/2"
      >
        <Logo />
      </Link>

      {/* Kort */}
      <div
        className={cn(
          "relative z-10 m-4 flex w-full max-w-[1060px] flex-col rounded-2xl bg-surface-soft shadow-[0_20px_60px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.06)]",
          "min-h-[640px] sm:m-6",
        )}
      >
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Venstre kolonne — innhold */}
          <div className="relative flex flex-1 flex-col p-6 pb-24 sm:p-9 sm:pb-24 lg:flex-[0_0_58%] lg:p-11 lg:pb-24">
            {/* Segmenter */}
            <div className="mb-5 flex gap-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-300",
                    i < step ? "bg-ink" : "bg-ink/10",
                  )}
                />
              ))}
            </div>

            {/* Animert steg-innhold */}
            <div
              key={step}
              className={cn(
                "flex flex-1 flex-col gap-3.5",
                direction > 0 ? "wizard-slide-right" : "wizard-slide-left",
              )}
            >
              <span className="font-display text-[11px] tracking-[0.15em] text-ink/35 uppercase">
                Steg {step} av {TOTAL_STEPS}
              </span>

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

            {/* Bunn-nav */}
            <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between sm:right-9 sm:bottom-7 sm:left-9 lg:right-11 lg:left-11">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="text-sm text-ink/40 transition-colors hover:text-ink/70"
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
                  "inline-flex items-center gap-2 rounded-lg px-7 py-2.5 text-sm font-medium transition-colors",
                  valid
                    ? "bg-brand text-brand-ink hover:bg-brand/90"
                    : "cursor-not-allowed bg-ink/10 text-ink/30",
                )}
              >
                {step === TOTAL_STEPS ? "Send forespørsel" : "Neste"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Høyre kolonne — illustrasjon */}
          <div className="hidden p-4 pl-0 lg:flex lg:flex-1">
            <div
              key={`art-${step}`}
              className="wizard-fade-in relative flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-bg"
            >
              <div className="aspect-square w-full max-w-md p-10">
                <Illustration step={step as 1 | 2 | 3 | 4 | 5 | 6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1 className="m-0 font-serif text-3xl font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {subtitle ? (
        <p className="-mt-1 text-sm text-ink/40">{subtitle}</p>
      ) : null}
    </>
  );
}

function PillButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border-[1.5px] px-4 py-4 text-sm transition-colors",
        selected
          ? "border-brand bg-brand text-brand-ink"
          : "border-transparent bg-[#F3EEE3] text-ink/60 hover:bg-[#E8E0D0]",
      )}
    >
      {children}
    </button>
  );
}

function BlockCard({
  selected,
  title,
  description,
  onSelect,
}: {
  selected: boolean;
  title: string;
  description?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-4 rounded-xl border-[1.5px] p-5 text-left transition-colors",
        selected
          ? "border-brand bg-[#EDE5D8]"
          : "border-transparent bg-[#F3EEE3] hover:bg-[#E8E0D0]",
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors",
          selected ? "border-brand bg-brand" : "border-ink/20",
        )}
      >
        {selected ? <Check className="h-3 w-3 text-brand-ink" /> : null}
      </span>
      <span className="flex-1">
        <span className="block text-base font-medium text-ink">{title}</span>
        {description ? (
          <span className="mt-0.5 block text-sm text-ink/50">{description}</span>
        ) : null}
      </span>
    </button>
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
      <div className="mt-4 flex flex-col gap-2.5">
        <BlockCard
          selected={value === "privat"}
          title="Privat flytting"
          description="Leilighet, hus eller hybel"
          onSelect={() => onChange("privat")}
        />
        <BlockCard
          selected={value === "bedrift"}
          title="Bedriftsflytting"
          description="Kontor, lager eller næringslokaler"
          onSelect={() => onChange("bedrift")}
        />
        <BlockCard
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
      <StepHeader
        title="Hvor skal du flytte?"
        subtitle="Vi bruker postnummer for å koble deg med byråer i ditt område"
      />
      <div className="mt-4 flex flex-col gap-3.5">
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
      <span className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-ink/40">
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d{4}"
        maxLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder="0000"
        className="w-full rounded-xl border-[1.5px] border-ink/10 bg-[#F7F5F1] px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-brand"
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
      <div className="mt-2">
        <p className="mb-2 text-xs uppercase tracking-[0.06em] text-ink/40">
          Boligtype
        </p>
        <div className="grid grid-cols-2 gap-2">
          {types.map((t) => (
            <PillButton
              key={t.value}
              selected={boligtype === t.value}
              onClick={() => onBoligtype(t.value)}
            >
              {t.label}
            </PillButton>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-xs uppercase tracking-[0.06em] text-ink/40">
          Antall rom
        </p>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRooms(r)}
              className={cn(
                "h-12 min-w-12 rounded-lg border-[1.5px] px-4 text-sm font-medium transition-colors",
                rooms === r
                  ? "border-brand bg-brand text-brand-ink"
                  : "border-transparent bg-[#F3EEE3] text-ink/60 hover:bg-[#E8E0D0]",
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
      <StepHeader
        title="Når skal du flytte?"
        subtitle="Velg en dato eller la oss vite om du er fleksibel"
      />
      <div className="mt-2 flex flex-col gap-4">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-ink/40">
            Ønsket flyttedato
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              onDate(e.target.value);
              if (e.target.value) onFleksibel(false);
            }}
            disabled={fleksibel}
            className={cn(
              "w-full rounded-xl border-[1.5px] border-ink/10 bg-[#F7F5F1] px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-brand",
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
            "inline-flex items-center gap-3 self-start rounded-full border-[1.5px] border-dashed px-6 py-3 text-sm transition-colors",
            fleksibel
              ? "border-solid border-brand bg-[#EDE5D8] text-ink"
              : "border-ink/20 text-ink/60 hover:border-ink/40",
          )}
        >
          <span
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] transition-colors",
              fleksibel ? "border-brand bg-brand" : "border-ink/20",
            )}
          >
            {fleksibel ? <Check className="h-3 w-3 text-brand-ink" /> : null}
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
      <StepHeader
        title="Trenger du noe ekstra?"
        subtitle="Velg én eller flere — du kan hoppe over"
      />
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {TILLEGG.map((t) => {
          const isSelected = selected.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => onToggle(t)}
              className={cn(
                "flex items-center gap-3 rounded-xl border-[1.5px] px-4 py-3.5 text-left text-sm transition-colors",
                isSelected
                  ? "border-brand bg-[#EDE5D8] text-ink"
                  : "border-transparent bg-[#F3EEE3] text-ink/60 hover:bg-[#E8E0D0]",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors",
                  isSelected ? "border-brand bg-brand" : "border-ink/20",
                )}
              >
                {isSelected ? (
                  <Check className="h-3 w-3 text-brand-ink" />
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
      <StepHeader
        title="La oss ta kontakt"
        subtitle="Vi kobler deg med tre byråer. Du hører fra dem innen 24 timer."
      />
      <div className="mt-2 grid gap-3.5 sm:grid-cols-2">
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
        <div className="sm:col-span-2">
          <TextField
            label="E-post"
            value={epost}
            onChange={onEpost}
            placeholder="ola@eksempel.no"
            type="email"
          />
        </div>
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
      <span className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-ink/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full rounded-xl border-[1.5px] border-ink/10 bg-[#F7F5F1] px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-brand"
      />
    </label>
  );
}

function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-lime">
        <Check className="h-8 w-8 text-[#3D5507]" strokeWidth={2.5} />
      </span>
      <h1 className="mt-6 max-w-xl font-serif text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
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
