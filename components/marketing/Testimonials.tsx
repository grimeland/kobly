import { Play } from "lucide-react";

type Person = {
  name: string;
  title: string;
  initials: string;
  bg: string;
};

const people: Person[] = [
  {
    name: "Kristoffer Skogen",
    title: "Daglig leder, Flyttegutta Bergen",
    initials: "KS",
    bg: "linear-gradient(160deg, #b8a78a 0%, #6e7c5d 100%)",
  },
  {
    name: "Sunniva Thune",
    title: "Flyttekoordinator, Næringsflytt",
    initials: "ST",
    bg: "linear-gradient(160deg, #d8b893 0%, #8a6a4a 100%)",
  },
  {
    name: "Eivind Johansen",
    title: "Daglig leder, Flytteloften",
    initials: "EJ",
    bg: "linear-gradient(160deg, #a8a299 0%, #4d4a45 100%)",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-12 sm:px-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl">
          De beste i bransjen.
          <br />
          Her for å hjelpe deg.
        </h2>
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
          {people.map((p) => (
            <article key={p.name} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <div className="absolute inset-0" style={{ background: p.bg }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl font-bold tracking-tight text-white/30 sm:text-8xl">
                      {p.initials}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 sm:p-5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/50"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" strokeWidth={0} />
                    Spill av video
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{p.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
