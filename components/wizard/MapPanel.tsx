"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Info, Send, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { reverseGeocodeAddress, type Coord } from "@/components/wizard/geo";

export function MapPanel({
  from,
  to,
  fromLabel,
  toLabel,
  initialCenter,
  onPlaceFrom,
  onPlaceTo,
}: {
  from: Coord | null;
  to: Coord | null;
  fromLabel?: string;
  toLabel?: string;
  initialCenter?: { lat: number; lon: number; zoom: number } | null;
  onPlaceFrom: (c: Coord, address: string) => void;
  onPlaceTo: (c: Coord, address: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const fromMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const toMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const fromCircleRef = useRef<import("leaflet").Circle | null>(null);
  const lineRef = useRef<import("leaflet").Polyline | null>(null);
  const midpointMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const [placing, setPlacing] = useState<"from" | "to" | null>(null);
  const [locating, setLocating] = useState(false);

  const useMyLocation = () => {
    if (!navigator.geolocation || locating) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const c = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const address = await reverseGeocodeAddress(c, "Min posisjon");
        onPlaceFrom(c, address);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | null = null;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current, {
        center: initialCenter
          ? [initialCenter.lat, initialCenter.lon]
          : [60.5, 10.0],
        zoom: initialCenter ? initialCenter.zoom : 5,
        zoomControl: false,
        attributionControl: false,
      });
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 },
      ).addTo(map);
      mapRef.current = map;
      map.invalidateSize();
    };

    const el = containerRef.current;
    if (!el) return;

    observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        if (!mapRef.current) {
          void initMap();
        } else {
          mapRef.current.invalidateSize();
        }
      }
    });
    observer.observe(el);

    if (el.clientWidth > 0 && el.clientHeight > 0) {
      void initMap();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      fromMarkerRef.current = null;
      toMarkerRef.current = null;
      fromCircleRef.current = null;
      lineRef.current = null;
      midpointMarkerRef.current = null;
    };
  }, []);

  // Map click handler for placing mode
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !placing) return;
    const handler = async (e: { latlng: { lat: number; lng: number } }) => {
      const c = { lat: e.latlng.lat, lon: e.latlng.lng };
      const address = await reverseGeocodeAddress(c);
      if (placing === "from") onPlaceFrom(c, address);
      else onPlaceTo(c, address);
      setPlacing(null);
    };
    map.on("click", handler);
    const container = containerRef.current?.querySelector<HTMLElement>(
      ".leaflet-container",
    );
    container?.classList.add("placing-mode");
    return () => {
      map.off("click", handler);
      container?.classList.remove("placing-mode");
    };
  }, [placing, onPlaceFrom, onPlaceTo]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (cancelled || !map) return;

      const pinIcon = (color: string) =>
        L.divIcon({
          className: "",
          html: `<div style="width:36px;height:36px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

      const koblyMidpointIcon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.18);border:1.5px solid #E6E1D6"><svg width="16" height="16" viewBox="0 0 27 27" fill="none"><circle cx="13.5" cy="13.5" r="11.625" stroke="#221814" stroke-width="3.75"/><path d="M16.5 1.875C12.7075 5.23556 10.5 9.26144 10.5 13.5887C10.5 17.8401 12.6307 21.8006 16.3019 25.125" stroke="#221814" stroke-width="3.75"/></svg></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const updateOverlays = () => {
        const fromM = fromMarkerRef.current;
        const toM = toMarkerRef.current;
        if (fromM && toM && lineRef.current) {
          const fromLL = fromM.getLatLng();
          const toLL = toM.getLatLng();
          lineRef.current.setLatLngs([fromLL, toLL]);
          if (midpointMarkerRef.current) {
            midpointMarkerRef.current.setLatLng([
              (fromLL.lat + toLL.lat) / 2,
              (fromLL.lng + toLL.lng) / 2,
            ]);
          }
        }
        if (fromM && fromCircleRef.current) {
          const ll = fromM.getLatLng();
          fromCircleRef.current.setLatLng([ll.lat, ll.lng]);
        }
      };

      const setPin = (
        ref: React.MutableRefObject<import("leaflet").Marker | null>,
        coord: Coord | null,
        color: string,
        onMove: (c: Coord, address: string) => void,
      ) => {
        if (coord) {
          if (ref.current) {
            ref.current.setLatLng([coord.lat, coord.lon]);
          } else {
            const marker = L.marker([coord.lat, coord.lon], {
              icon: pinIcon(color),
              draggable: true,
              autoPan: true,
            }).addTo(map);
            marker.on("drag", updateOverlays);
            marker.on("dragend", async () => {
              const ll = marker.getLatLng();
              const newCoord = { lat: ll.lat, lon: ll.lng };
              const address = await reverseGeocodeAddress(newCoord);
              onMove(newCoord, address);
            });
            ref.current = marker;
          }
        } else if (ref.current) {
          ref.current.remove();
          ref.current = null;
        }
      };

      setPin(fromMarkerRef, from, "#221814", onPlaceFrom);
      setPin(toMarkerRef, to, "#3D5507", onPlaceTo);

      if (from) {
        if (fromCircleRef.current) {
          fromCircleRef.current.setLatLng([from.lat, from.lon]);
        } else {
          fromCircleRef.current = L.circle([from.lat, from.lon], {
            radius: 250,
            color: "#221814",
            fillColor: "#221814",
            fillOpacity: 0.08,
            opacity: 0.25,
            weight: 1,
            interactive: false,
          }).addTo(map);
        }
      } else if (fromCircleRef.current) {
        fromCircleRef.current.remove();
        fromCircleRef.current = null;
      }

      if (from && to) {
        const latlngs: [number, number][] = [
          [from.lat, from.lon],
          [to.lat, to.lon],
        ];
        if (lineRef.current) {
          lineRef.current.setLatLngs(latlngs);
        } else {
          lineRef.current = L.polyline(latlngs, {
            color: "#221814",
            weight: 2.5,
            dashArray: "6 6",
            opacity: 0.7,
          }).addTo(map);
        }
        const midLatLng: [number, number] = [
          (from.lat + to.lat) / 2,
          (from.lon + to.lon) / 2,
        ];
        if (midpointMarkerRef.current) {
          midpointMarkerRef.current.setLatLng(midLatLng);
        } else {
          midpointMarkerRef.current = L.marker(midLatLng, {
            icon: koblyMidpointIcon,
            interactive: false,
            zIndexOffset: 500,
          }).addTo(map);
        }
        map.fitBounds(latlngs, { padding: [40, 40], maxZoom: 13 });
      } else {
        if (lineRef.current) {
          lineRef.current.remove();
          lineRef.current = null;
        }
        if (midpointMarkerRef.current) {
          midpointMarkerRef.current.remove();
          midpointMarkerRef.current = null;
        }
        if (from && !to) map.setView([from.lat, from.lon], 13);
        else if (to && !from) map.setView([to.lat, to.lon], 13);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  const shortLabel = (s?: string) => {
    if (!s) return null;
    const parts = s.split(",");
    return parts[0]?.trim() || s;
  };
  const fromShort = shortLabel(fromLabel);
  const toShort = shortLabel(toLabel);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0" />

      {fromShort || toShort ? (
        <div className="absolute top-3 left-3 z-[1000] inline-flex items-center gap-2 rounded-[10px] bg-white/95 px-3 py-2 text-xs text-ink shadow-[0_1px_4px_rgba(0,0,0,0.12)] backdrop-blur">
          <span className="text-ink/45">Ca.</span>
          <span className="max-w-[110px] truncate font-medium">
            {fromShort ?? "—"}
          </span>
          <ArrowRight className="h-3 w-3 text-ink/30" />
          <span className="max-w-[110px] truncate font-medium">
            {toShort ?? "—"}
          </span>
        </div>
      ) : null}

      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="Zoom inn"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-ink/70 shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#F7F6F3]"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="Zoom ut"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-ink/70 shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#F7F6F3]"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-3 left-3 z-[1000]">
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          aria-label="Bruk min plassering"
          title="Bruk min plassering"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-ink/70 shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#F7F6F3]",
            locating && "animate-pulse",
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 z-[1000] flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => setPlacing(placing === "from" ? null : "from")}
          className={cn(
            "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/70 px-4 py-2 text-xs font-medium shadow-[0_1px_4px_rgba(0,0,0,0.12)] backdrop-blur transition-colors",
            placing === "from"
              ? "bg-brand text-brand-ink"
              : "bg-white/95 text-ink hover:bg-white",
          )}
        >
          {placing === "from" ? "Klikk på kartet" : "Plasser fra"}
        </button>
        <button
          type="button"
          onClick={() => setPlacing(placing === "to" ? null : "to")}
          className={cn(
            "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/70 px-4 py-2 text-xs font-medium shadow-[0_1px_4px_rgba(0,0,0,0.12)] backdrop-blur transition-colors",
            placing === "to"
              ? "bg-brand text-brand-ink"
              : "bg-white/95 text-ink hover:bg-white",
          )}
        >
          {placing === "to" ? "Klikk på kartet" : "Plasser til"}
        </button>
      </div>
      <div className="group absolute right-3 bottom-3 z-[1000]">
        <button
          type="button"
          aria-label="Kart-attribusjon"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/85 text-ink/60 backdrop-blur transition-colors hover:bg-white"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
        <div className="pointer-events-none absolute right-0 bottom-full mb-2 hidden rounded-[6px] bg-white/95 px-2.5 py-1.5 text-[11px] whitespace-nowrap text-ink/70 shadow-md group-hover:block">
          © Leaflet · © CARTO · © OpenStreetMap
        </div>
      </div>
    </>
  );
}
