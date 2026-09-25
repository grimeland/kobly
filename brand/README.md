# Kobly – grafisk profil

Alt som trengs for å bruke Kobly-identiteten utenfor nettsiden: logo, ikon, farger, fonter og illustrasjonsikoner. Filene her er hentet fra den samme kilden som nettsiden bruker, så det som ligger her er alltid det gjeldende uttrykket.

## Mapper

| Mappe | Innhold |
| --- | --- |
| `logo/` | Logo (ikon + ordmerke) og ikon alene, i SVG. Mørk versjon til lys bakgrunn, lys versjon til mørk bakgrunn. |
| `logo/png/` | Ferdige PNG-eksporter med gjennomsiktig bakgrunn, til presentasjoner, e-post og sosiale medier. |
| `ikoner/` | Illustrasjonsikoner brukt på nettsiden (eske og dokument). |
| `farger/` | Fargepaletten som JSON og som plansje. |
| `fonter/` | Moderat i Regular og Semibold (OTF). |

## Logo

Logoen består av ikonet (sirkel med bue) og ordmerket «Kobly» satt i Moderat Semibold med tett bokstavavstand. Ordmerket er konvertert til kurver, så SVG-filene trenger ikke fonten installert.

| Fil | Bruk |
| --- | --- |
| `kobly-logo.svg` | Standard. Mørk (#232323) på lys bakgrunn. |
| `kobly-logo-lys.svg` | Lys (#F4F1EA) på mørk bakgrunn, for eksempel #221814. |
| `kobly-ikon.svg` | Ikonet alene, mørkt. Til favicon, appikon, profilbilde. |
| `kobly-ikon-lys.svg` | Ikonet alene, lyst. |

Regler:

- Bruk alltid filene her. Ikke tegn logoen på nytt eller sett ordmerket i annen font.
- Minste bredde for logoen er 80 px på skjerm og 20 mm på trykk. Under det brukes ikonet alene.
- Hold luft rundt logoen tilsvarende høyden på ikonet på alle sider.
- Logoen skal være ensfarget, enten mørk eller lys. Ikke farger, gradienter eller skygger.
- Ikke strekk, roter eller skill ikon og ordmerke med annen avstand enn i filen.

## Farger

| Navn | Hex | Bruk |
| --- | --- | --- |
| Bakgrunn | #F4F1EA | Sidebakgrunn, den varme kremtonen |
| Flate | #FFFFFF | Kort og paneler |
| Flate myk | #FAF9F6 | Sekundære flater |
| Blekk | #1A1A1A | Brødtekst og overskrifter |
| Blekk dempet | #5C5C5C | Sekundær tekst |
| Logo | #232323 | Logo på lys bakgrunn |
| Linje | #E6E1D6 | Rammer og skillelinjer |
| Sekundær | #EFEAE0 | Dempede flater og chips |
| Merke | #221814 | Primærknapper og mørke seksjoner |
| Merke blekk | #FAF9F6 | Tekst og logo på mørk bakgrunn |
| Aksent lime | #D6E8A8 | Uthevinger og ikonbakgrunn |
| Aksent rav | #E8A87C | Sekundær aksent |
| Flytt blå | #2F5FA8 | Kart og flyttemarkører |

Grunnstemningen er krem og nesten svart. Lime og rav er aksenter og skal brukes sparsomt, aldri som store flater med tekst på.

## Fonter

- **Moderat** (Regular 400, Semibold 600) er hovedfonten. Brukes til brødtekst, knapper, navigasjon og ordmerket. Filene ligger i `fonter/`. Moderat er en lisensiert font fra Tightype, sjekk at lisensen dekker bruken før du installerer den på nye maskiner eller bruker den i nye kanaler.
- **Crimson Pro** brukes til overskrifter på nettsiden. Gratis fra Google Fonts: https://fonts.google.com/specimen/Crimson+Pro
- **Syne** brukes til enkelte display-elementer. Gratis fra Google Fonts: https://fonts.google.com/specimen/Syne

Uten Moderat tilgjengelig, bruk systemets sans-serif. Ikke bytt til en annen geometrisk font som ligner.

## Ikoner

`ikoner/kobly-eske.svg` og `ikoner/kobly-dokument.svg` er strekikoner på lime bakgrunn (#D9EFA7) med avrundede hjørner, slik de brukes i «Slik fungerer det» på nettsiden. Nye ikoner bør følge samme stil: én strektykkelse, avrundede ender, lime kvadrat bak.

## Regenerere filene

Logo-SVG-ene er generert fra ikonet i `components/marketing/Logo.tsx` og fonten `Moderat-Semibold.otf`. PNG-ene er rendret fra SVG-ene. Endres logoen på nettsiden, må filene her lages på nytt så de ikke går i utakt.
