import Image from "next/image";

const tiles = [
  {
    title: "Flytting",
    src: "/images/boxes-and-plants.jpg",
    alt: "Flytteesker og planter klare for flytting",
  },
  {
    title: "Lagring",
    src: "/images/storage.jpg",
    alt: "Lager med hyller og esker",
  },
  {
    title: "Vask",
    src: "/images/cleaning.jpg",
    alt: "Vask og rengjøring",
  },
];

export function ImageStrip() {
  return (
    <section className="px-6 pb-20 sm:px-10 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
          {tiles.map((tile, i) => (
            <article
              key={tile.src}
              className="flex w-[78%] shrink-0 snap-start flex-col gap-3 md:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 78vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                {tile.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
