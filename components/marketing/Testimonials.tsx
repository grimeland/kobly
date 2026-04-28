import Image from "next/image";
import { Play } from "lucide-react";

type Person = {
  name: string;
  title: string;
  src: string;
};

const people: Person[] = [
  {
    name: "Kristoffer Skogen",
    title: "Daglig leder, Flyttegutta Bergen",
    src: "/images/portrait-kristoffer.jpg",
  },
  {
    name: "Sunniva Thune",
    title: "Flyttekoordinator, Næringsflytt",
    src: "/images/portrait-sunniva.jpg",
  },
  {
    name: "Eivind Johansen",
    title: "Daglig leder, Flyttefoten",
    src: "/images/portrait-eivind.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-2xl text-center font-serif text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
          De beste i bransjen.
          <br />
          Her for å hjelpe deg.
        </h2>
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
          {people.map((p) => (
            <article key={p.name} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 flex justify-start p-4 sm:p-5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/55"
                  >
                    <Play className="h-3 w-3 fill-white" strokeWidth={0} />
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
