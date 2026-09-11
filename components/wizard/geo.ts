export type Coord = { lat: number; lon: number };

export async function reverseGeocodeAddress(
  c: Coord,
  fallback = "Plassert i kart",
): Promise<string> {
  try {
    const res = await fetch(
      `https://ws.geonorge.no/adresser/v1/punktsok?radius=200&lat=${c.lat}&lon=${c.lon}&treffPerSide=1&side=0`,
    );
    if (!res.ok) return fallback;
    const json = (await res.json()) as {
      adresser?: {
        adressetekst: string;
        postnummer: string;
        poststed: string;
      }[];
    };
    const a = json.adresser?.[0];
    return a
      ? `${a.adressetekst}, ${a.postnummer} ${a.poststed}`
      : fallback;
  } catch {
    return fallback;
  }
}
