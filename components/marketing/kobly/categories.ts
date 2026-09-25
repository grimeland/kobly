import type { LucideIcon } from "lucide-react";
import {
  Truck,
  KeyRound,
  Sparkles,
  Warehouse,
  Ruler,
  Building2,
  Hammer,
  Zap,
  Droplets,
  PaintRoller,
  Briefcase,
  Calculator,
} from "lucide-react";

export type Category = {
  name: string;
  blurb: string;
  href?: string;
  icon: LucideIcon;
};

export type CategoryGroup = {
  title: string;
  items: Category[];
};

/**
 * Prototype: hvilke tjenester Kobly-paraplyen kan romme. Bare flyttebyrå og
 * eiendomsmegler har egne sider; resten er merket «Kommer» i UI-et.
 */
export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    title: "Hjem og bolig",
    items: [
      { name: "Flyttebyrå", blurb: "Pakking, bæring og transport", href: "/", icon: Truck },
      { name: "Eiendomsmegler", blurb: "Selg boligen til riktig pris", href: "/megler", icon: KeyRound },
      { name: "Flyttevask", blurb: "Godkjent sluttvask med garanti", icon: Sparkles },
      { name: "Lagring", blurb: "Trygg oppbevaring i nærområdet", icon: Warehouse },
      { name: "Takstmann", blurb: "Tilstandsrapport og verditakst", icon: Ruler },
      { name: "Utleiemegler", blurb: "Lei ut boligen uten stress", icon: Building2 },
    ],
  },
  {
    title: "Oppussing",
    items: [
      { name: "Håndverker", blurb: "Snekker, tømrer og totalentreprise", icon: Hammer },
      { name: "Elektriker", blurb: "Alt fra stikkontakt til elbillader", icon: Zap },
      { name: "Rørlegger", blurb: "Bad, kjøkken og varmtvann", icon: Droplets },
      { name: "Maler", blurb: "Inne og ute, gulv og vegg", icon: PaintRoller },
    ],
  },
  {
    title: "For bedrifter",
    items: [
      { name: "Kontorflytting", blurb: "Flytt utenom arbeidstid", href: "/", icon: Briefcase },
      { name: "Regnskapsfører", blurb: "Løpende regnskap og årsoppgjør", icon: Calculator },
    ],
  },
];
