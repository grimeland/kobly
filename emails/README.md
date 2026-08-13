# Kobly e-postmaler

Ferdige HTML-templates til utviklingsteamet. Hver fil er selvstendig: inline CSS,
tabellbasert layout, maks 600 px, systemfonter, ingen ekstern CSS og ingen JS.

## Filer

Rekkefølgen under følger kundereisen.

| Fil | Mottaker | Utløses av | Emne |
| --- | --- | --- | --- |
| `receipt.html` | Kunde | Forespørsel sendt inn i wizarden | Vi har mottatt flytteforespørselen din |
| `new-lead.html` | Flyttebyrå | Ny forespørsel matchet til byrået | Ny flytteforespørsel i Oslo – svar innen 24 timer |
| `offer.html` | Kunde | Et byrå har sendt tilbud | Du har fått et tilbud fra Flyttefoten |
| `booking-confirmed.html` | Kunde | Kunden har bekreftet et byrå | Flyttingen din er bekreftet med Flyttefoten |

Alle fire viser samme flytting (KOB-2026-4821, Grünerløkka til Nordstrand), slik
at flyten kan leses i sammenheng. Dummy-dataene ligger samlet i
`lib/emails/dummy.ts`, byrådataene i `lib/agencies.ts`.

## Slik henger det sammen

Templatene er skrevet i `lib/emails/` og deler layouten i `lib/emails/layout.ts`
(logo-header, footer, knapp, kort, tekststiler). HTML-filene her er generert fra
dem, så endringer gjøres i `lib/emails/` — ikke direkte i filene her.

Forhåndsvis alle malene i nettleseren på `/email-preview` (mobil- og
fullbredde-visning). Regenerer filene med dev-serveren kjørende:

```bash
npm run emails:build
```

## Til implementering

- Bilder peker på `https://kobly.vercel.app/images/…`. Bytt til produksjons-URL
  eller vedlegg som CID før utsending.
- Dummy-data (adresser, datoer, referansenummer) skal erstattes med felter fra
  forespørselen.
- `#avmelding` og `#personvern` i footeren er plassholdere.
