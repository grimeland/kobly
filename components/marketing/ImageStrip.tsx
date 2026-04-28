import Image from "next/image";

const tiles = [
  {
    src: "/images/boxes-and-plants.jpg",
    alt: "Lagerlokale med flytteesker og planter",
  },
  {
    src: "/images/building-exterior.jpg",
    alt: "Moderne boligbygg",
  },
  {
    src: "/images/moving-couple.jpg",
    alt: "Par som bærer flyttesker",
  },
  {
    src: "/images/modern-house.jpg",
    alt: "Moderne enebolig",
  },
];

export function ImageStrip() {
  return (
    <section className="px-6 pb-20 sm:px-10 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
          {tiles.map((tile, i) => (
            <div
              key={tile.src}
              className="relative aspect-[4/5] w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl md:w-auto md:aspect-square"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 768px) 25vw, 68vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
