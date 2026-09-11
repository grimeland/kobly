"use client";

import { useState } from "react";
import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddressField } from "@/components/wizard/AddressField";
import { MapPickerOverlay } from "@/components/wizard/MapPickerOverlay";
import { reverseGeocodeAddress, type Coord } from "@/components/wizard/geo";
import { StepHeader } from "@/components/wizard/fields";

export function StepAdresse({
  fra,
  til,
  fraCoord,
  tilCoord,
  utenlands,
  initialCenter,
  onFra,
  onTil,
  onUtenlands,
}: {
  fra: string;
  til: string;
  fraCoord: Coord | null;
  tilCoord: Coord | null;
  utenlands: boolean;
  initialCenter?: { lat: number; lon: number; zoom: number } | null;
  onFra: (v: string, coord?: Coord | null) => void;
  onTil: (v: string, coord?: Coord | null) => void;
  onUtenlands: (v: boolean) => void;
}) {
  // Kartvelgeren finnes bare på mobil. På desktop ligger kartet i høyre kolonne.
  const [picker, setPicker] = useState<"fra" | "til" | null>(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const c = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const address = await reverseGeocodeAddress(c, "Min posisjon");
        onFra(address, c);
      },
      undefined,
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <>
      <StepHeader
        title="Hvor skal du flytte?"
        subtitle="Skriv inn adressen du flytter fra og adressen du flytter til."
      />
      <div className="mt-5 flex flex-col gap-5">
        <div>
          <AddressField
            label="Fra"
            value={fra}
            onChange={onFra}
            placeholder="Gate og nummer, sted"
            onUseMyLocation={handleUseMyLocation}
          />
          <MapPickerButton
            onClick={() => setPicker("fra")}
            placed={Boolean(fraCoord)}
          />
        </div>
        <div>
          <AddressField
            label="Til"
            value={til}
            onChange={onTil}
            placeholder={utenlands ? "By og land" : "Gate og nummer, sted"}
          />
          {!utenlands ? (
            <MapPickerButton
              onClick={() => setPicker("til")}
              placed={Boolean(tilCoord)}
            />
          ) : null}
        </div>

        <button
          type="button"
          role="checkbox"
          aria-checked={utenlands}
          onClick={() => onUtenlands(!utenlands)}
          className={cn(
            "inline-flex min-h-[48px] items-center gap-3 self-start rounded-full border-[1.5px] px-5 text-[15px] transition-colors",
            utenlands
              ? "border-brand bg-[#EDE5D8] text-ink"
              : "border-dashed border-ink/20 text-ink/60 hover:border-ink/40",
          )}
        >
          <span
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-[6px] border-[1.5px] transition-colors",
              utenlands ? "border-brand bg-brand" : "border-ink/25",
            )}
          >
            {utenlands ? <Check className="h-3 w-3 text-brand-ink" /> : null}
          </span>
          Jeg flytter til utlandet
        </button>
      </div>

      <MapPickerOverlay
        open={picker !== null}
        onClose={() => setPicker(null)}
        title={
          picker === "til" ? "Hvor flytter du til?" : "Hvor flytter du fra?"
        }
        initialCoord={picker === "til" ? tilCoord : fraCoord}
        initialCenter={initialCenter}
        reverseGeocode={(c) => reverseGeocodeAddress(c)}
        onConfirm={(coord, address) => {
          if (picker === "til") onTil(address, coord);
          else onFra(address, coord);
        }}
      />
    </>
  );
}

/** «Vis i kart» under adressefeltet. Kun mobil. */
function MapPickerButton({
  onClick,
  placed,
}: {
  onClick: () => void;
  placed: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors lg:hidden",
        placed
          ? "bg-accent-lime/40 text-ink ring-1 ring-ink/10"
          : "bg-ink/5 text-ink hover:bg-ink/10",
      )}
    >
      {placed ? (
        <>
          <Check className="h-4 w-4 shrink-0" />
          Plassert i kart · endre
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 shrink-0" />
          Plasser i kart
        </>
      )}
    </button>
  );
}
