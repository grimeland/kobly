"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const UKEDAGER = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * Kalender rett i steget, ingen modal. Én måned om gangen, dager før i dag
 * er slått av. Enkel nok til at den oppfører seg likt på alle enheter.
 */
export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (isoDate: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = value ? new Date(value) : today;
  const [visning, setVisning] = useState(
    new Date(start.getFullYear(), start.getMonth(), 1),
  );

  const year = visning.getFullYear();
  const month = visning.getMonth();
  const first = new Date(year, month, 1);
  // Mandag = 0
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const kanTilbake =
    new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const tittel = visning.toLocaleDateString("nb-NO", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-[14px] border-[1.5px] border-ink/10 bg-[#F7F5F1] p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setVisning(new Date(year, month - 1, 1))}
          disabled={!kanTilbake}
          aria-label="Forrige måned"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 disabled:opacity-25"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-serif text-lg font-medium capitalize text-ink">
          {tittel}
        </span>
        <button
          type="button"
          onClick={() => setVisning(new Date(year, month + 1, 1))}
          aria-label="Neste måned"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-ink/40 lg:text-[11px]">
        {UKEDAGER.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <span key={`tom-${i}`} />;
          const key = iso(d);
          const disabled = d < today;
          const selected = value === key;
          const erIdag = key === iso(today);
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onChange(key)}
              aria-pressed={selected}
              className={cn(
                "mx-auto flex h-11 w-11 items-center justify-center rounded-full text-base transition-colors lg:text-[15px]",
                selected
                  ? "bg-brand font-medium text-brand-ink"
                  : disabled
                    ? "text-ink/20"
                    : "text-ink hover:bg-ink/5",
                erIdag && !selected && "font-semibold underline underline-offset-4",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
