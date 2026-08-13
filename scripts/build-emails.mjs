/**
 * Skriver e-postmalene i lib/emails/ ut til selvstendige HTML-filer i emails/.
 * Krever at dev-serveren kjører (npm run dev), siden malene rendres av appen.
 *
 *   npm run emails:build
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";

const ORIGIN = process.env.KOBLY_ORIGIN ?? "http://localhost:3000";
const ASSET_BASE = process.env.KOBLY_ASSET_BASE ?? "https://kobly.vercel.app";

// Hent id-ene fra registeret, så nye maler kommer med automatisk.
const registry = readFileSync(new URL("../lib/emails/index.ts", import.meta.url), "utf8");
const ids = [...registry.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);

if (ids.length === 0) {
  console.error("Fant ingen maler i lib/emails/index.ts");
  process.exit(1);
}

mkdirSync(new URL("../emails/", import.meta.url), { recursive: true });

for (const id of ids) {
  const url = `${ORIGIN}/email-preview/${id}/raw?base=${encodeURIComponent(ASSET_BASE)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${id}: ${res.status} ${res.statusText} (kjører dev-serveren?)`);
    process.exit(1);
  }
  const html = await res.text();
  writeFileSync(new URL(`../emails/${id}.html`, import.meta.url), html);
  console.log(`✓ emails/${id}.html`);
}
