"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { Coord } from "@/components/wizard/geo";

type Adresseforslag = {
  adressetekst: string;
  postnummer: string;
  poststed: string;
  representasjonspunkt?: { lat: number; lon: number };
};

export function AddressField({
  label,
  value,
  onChange,
  placeholder,
  onUseMyLocation,
}: {
  label: string;
  value: string;
  onChange: (v: string, coord?: Coord | null) => void;
  placeholder?: string;
  onUseMyLocation?: () => void;
}) {
  const [forslag, setForslag] = useState<Adresseforslag[]>([]);
  const [focused, setFocused] = useState(false);
  // Etter et valg fra listen skal ikke det nye feltinnholdet utløse nytt søk.
  const justSelected = useRef(false);

  useEffect(() => {
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }
    if (!focused || value.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(value)}&treffPerSide=8&side=0`,
          { signal: controller.signal },
        );
        if (!res.ok) return;
        const json = (await res.json()) as { adresser?: Adresseforslag[] };
        setForslag(json.adresser ?? []);
      } catch {
        // Ignorer abort/nettverksfeil
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, focused]);

  const velg = (a: Adresseforslag) => {
    const coord = a.representasjonspunkt
      ? { lat: a.representasjonspunkt.lat, lon: a.representasjonspunkt.lon }
      : null;
    onChange(`${a.adressetekst}, ${a.postnummer} ${a.poststed}`, coord);
    setForslag([]);
    justSelected.current = true;
  };

  // Listen vises bare mens feltet har fokus og nok tekst til at forslagene gjelder.
  const aktiveForslag = value.trim().length >= 2 ? forslag : [];
  const visForslag =
    focused && (aktiveForslag.length > 0 || Boolean(onUseMyLocation));

  return (
    <div className="relative">
      <label className="block">
        <span className="mb-2 block text-[15px] font-medium text-ink">
          {label}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value, null)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-[14px] border-[1.5px] border-ink/10 bg-[#F7F5F1] min-h-[52px] px-4 py-3 text-base text-ink outline-none placeholder:text-ink/35 transition-colors focus:border-brand"
        />
      </label>
      {visForslag ? (
        <ul className="absolute top-full right-0 left-0 z-50 mt-1 max-h-72 overflow-y-auto rounded-[14px] border border-ink/10 bg-surface shadow-lg">
          {onUseMyLocation ? (
            <li>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onUseMyLocation();
                  setFocused(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-[#F3EEE3]"
              >
                <MapPin className="h-4 w-4 text-ink/60" />
                Bruk min plassering
              </button>
            </li>
          ) : null}
          {aktiveForslag.map((a, i) => (
            <li key={`${a.adressetekst}-${a.postnummer}-${i}`}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => velg(a)}
                className="flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left text-sm transition-colors hover:bg-[#F3EEE3]"
              >
                <span className="text-ink">{a.adressetekst}</span>
                <span className="text-xs text-ink/50">
                  {a.postnummer} {a.poststed}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
