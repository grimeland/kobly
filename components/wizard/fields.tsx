"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Overskrift for et steg. */
export function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <h1 className="m-0 font-serif text-[1.9rem] font-medium leading-[1.12] tracking-[-0.01em] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {subtitle ? (
        <p className="m-0 text-[15px] leading-snug text-ink/55">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function FieldLabel({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-[15px] font-medium text-ink">{children}</span>
      {hint ? <span className="text-xs text-ink/40">{hint}</span> : null}
    </div>
  );
}

const inputClass =
  "w-full min-h-[52px] rounded-[14px] border-[1.5px] border-ink/10 bg-[#F7F5F1] px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal";
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </label>
  );
}

/** Tallfelt med enhet til høyre, f.eks. m². */
export function NumberField({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <span className="relative block">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
          placeholder={placeholder}
          className={cn(inputClass, suffix && "pr-14")}
        />
        {suffix ? (
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-ink/40">
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
  maxLength,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      {label ? <FieldLabel hint={hint}>{label}</FieldLabel> : null}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={cn(inputClass, "resize-none leading-relaxed")}
      />
    </label>
  );
}

/**
 * Ett valg i en gruppe. Minst 52 px høy, så den er lett å treffe på mobil.
 * Brukes både som enkeltvalg (radio) og flervalg (chips), styrt av `multi`.
 */
export function Choice({
  selected,
  onSelect,
  label,
  hint,
  multi = false,
  compact = false,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  hint?: string;
  multi?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-[14px] border-[1.5px] text-left transition-colors",
        compact ? "min-h-[52px] px-4 py-2.5" : "min-h-[60px] px-4 py-3",
        selected
          ? "border-ink/30 bg-[#EFEAE0] text-ink"
          : "border-line bg-[#F7F5F0] text-ink/75 hover:bg-[#F3EFE7]",
      )}
    >
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] transition-colors",
          multi ? "rounded-[6px]" : "rounded-full",
          selected ? "border-ink bg-ink" : "border-ink/20 bg-white/70",
        )}
      >
        {selected ? <Check className="h-3 w-3 text-brand-ink" /> : null}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[15px] font-medium leading-tight">{label}</span>
        {hint ? (
          <span className="mt-0.5 text-[13px] leading-tight text-ink/45">
            {hint}
          </span>
        ) : null}
      </span>
    </button>
  );
}

/** Seksjon inne i et steg: liten overskrift + innhold. */
export function Group({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      {children}
    </div>
  );
}
