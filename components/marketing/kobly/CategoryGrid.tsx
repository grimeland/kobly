import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_GROUPS, type Category } from "./categories";

function CategoryCard({ c }: { c: Category }) {
  const Icon = c.icon;
  const live = Boolean(c.href);
  const inner = (
    <>
      <span
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]",
          live ? "bg-accent-lime text-accent-lime-ink" : "bg-secondary text-ink/50",
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className={cn("text-base font-medium", live ? "text-ink" : "text-ink/60")}>
            {c.name}
          </span>
          {!live ? (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-ink/50">
              Kommer
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-sm text-ink-muted">{c.blurb}</span>
      </span>
      {live ? (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      ) : null}
    </>
  );
  const cls =
    "group flex items-center gap-4 rounded-[14px] bg-surface-soft px-5 py-4 ring-1 ring-line transition-colors";
  return live ? (
    <Link href={c.href!} className={cn(cls, "hover:bg-surface")}>
      {inner}
    </Link>
  ) : (
    <div className={cn(cls, "cursor-default")}>{inner}</div>
  );
}

export function CategoryGrid() {
  return (
    <section id="tjenester" className="px-6 pb-20 sm:px-10 sm:pb-28 lg:pb-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:gap-16">
        {CATEGORY_GROUPS.map((g) => (
          <div key={g.title}>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{g.title}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((c) => (
                <li key={c.name}>
                  <CategoryCard c={c} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
