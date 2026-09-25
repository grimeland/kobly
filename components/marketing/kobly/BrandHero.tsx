"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_GROUPS, type Category } from "./categories";

const ALLE = CATEGORY_GROUPS.flatMap((g) => g.items);
const CHIPS = ALLE.filter((c) => c.href).slice(0, 3).concat(
  ALLE.filter((c) => !c.href).slice(0, 1),
);

function KoblyMark({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 27 27" fill="none" aria-hidden className={className}>
      <circle cx="13.5" cy="13.5" r="11.625" stroke="currentColor" strokeWidth="3.75" />
      <path
        d="M16.5 1.875C12.7075 5.23556 10.5 9.26144 10.5 13.5887C10.5 17.8401 12.6307 21.8006 16.3019 25.125"
        stroke="currentColor"
        strokeWidth="3.75"
      />
    </svg>
  );
}

function normaliser(s: string) {
  return s.toLowerCase().replace(/[^a-zæøå0-9]/g, "");
}

export function BrandHero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const treff = useMemo<Category | undefined>(() => {
    const n = normaliser(q);
    if (!n) return undefined;
    return ALLE.find((c) => normaliser(c.name).startsWith(n)) ?? ALLE.find((c) => normaliser(c.name).includes(n));
  }, [q]);

  function finn(c?: Category) {
    const mål = c ?? treff;
    if (mål?.href) router.push(mål.href);
    else document.getElementById("tjenester")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="px-6 pt-8 pb-12 sm:px-10 sm:pt-12 sm:pb-16 lg:pt-28 lg:pb-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="font-sans text-sm font-medium text-ink-muted sm:text-base lg:text-lg">
            Norges smarteste tilbudstjeneste
          </p>
          <h1 className="mt-2 text-balance font-serif text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.01em] text-ink sm:text-[3.5rem] lg:mt-3 lg:text-[4.5rem] xl:text-[5.5rem]">
            Vi finner det beste tilbudet
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            finn();
          }}
          className="mx-auto w-full max-w-[440px] rounded-[18px] bg-surface-soft p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-16px_rgba(0,0,0,0.10)] ring-1 ring-black/[0.04] sm:p-7 lg:max-w-none"
        >
          <div className="flex justify-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-brand text-brand-ink">
              <KoblyMark className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-5 text-center text-lg leading-snug text-ink sm:text-xl">
            Vi finner gode byråer som konkurrerer om oppdraget ditt.
          </p>

          <label className="mt-6 flex h-14 items-center gap-3 rounded-full bg-surface px-5 ring-1 ring-line focus-within:ring-brand">
            <Search className="h-5 w-5 shrink-0 text-ink/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Flyttehjelp?"
              aria-label="Hva trenger du hjelp med?"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/40"
            />
          </label>
          {q && treff ? (
            <p className="mt-2 px-2 text-sm text-ink-muted">
              {treff.href ? `Trykk Finn tilbud for ${treff.name.toLowerCase()}.` : `${treff.name} kommer snart.`}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {CHIPS.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => (c.href ? finn(c) : setQ(c.name))}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-2 text-sm text-ink transition-colors hover:bg-line",
                    !c.href && "text-ink/60",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  {c.name}
                </button>
              );
            })}
            <a
              href="#tjenester"
              className="inline-flex items-center rounded-full bg-secondary px-3.5 py-2 text-sm text-ink/60 transition-colors hover:bg-line"
            >
              + {ALLE.length - CHIPS.length} tjenester
            </a>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-medium text-brand-ink transition-colors hover:bg-brand/90"
          >
            Finn tilbud
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
