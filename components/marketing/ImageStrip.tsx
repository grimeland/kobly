type Tile = {
  alt: string;
  art: React.ReactNode;
};

const tiles: Tile[] = [
  {
    alt: "Lager med planter",
    art: (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #c9b896 0%, #8a7a5e 60%, #5d5240 100%)",
        }}
      >
        <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect x="0" y="160" width="200" height="80" fill="#7a6a52" />
          <g fill="#3d4a2a" opacity="0.85">
            <ellipse cx="40" cy="155" rx="22" ry="14" />
            <rect x="32" y="155" width="16" height="18" fill="#6b5840" />
            <ellipse cx="90" cy="150" rx="28" ry="18" />
            <rect x="78" y="150" width="24" height="22" fill="#6b5840" />
            <ellipse cx="150" cy="153" rx="24" ry="15" />
            <rect x="140" y="153" width="20" height="20" fill="#6b5840" />
          </g>
          <g stroke="#3d4a2a" strokeWidth="2" fill="none" opacity="0.7">
            <path d="M40 145 v-30 M30 130 q5 -10 10 -5 M50 125 q-5 -8 -10 -3" />
            <path d="M90 142 v-40 M80 122 q5 -12 10 -6 M100 118 q-5 -10 -10 -4" />
            <path d="M150 145 v-32 M140 130 q5 -10 10 -5 M160 125 q-5 -8 -10 -3" />
          </g>
        </svg>
      </div>
    ),
  },
  {
    alt: "Boligbygg",
    art: (
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #b8c8d4 0%, #6e8294 100%)",
        }}
      >
        <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect x="20" y="40" width="160" height="200" fill="#a06a4e" />
          <g fill="#3d2a1f">
            <rect x="35" y="60" width="22" height="28" />
            <rect x="70" y="60" width="22" height="28" />
            <rect x="105" y="60" width="22" height="28" />
            <rect x="140" y="60" width="22" height="28" />
            <rect x="35" y="105" width="22" height="28" />
            <rect x="70" y="105" width="22" height="28" />
            <rect x="105" y="105" width="22" height="28" />
            <rect x="140" y="105" width="22" height="28" />
            <rect x="35" y="150" width="22" height="28" />
            <rect x="70" y="150" width="22" height="28" />
            <rect x="105" y="150" width="22" height="28" />
            <rect x="140" y="150" width="22" height="28" />
          </g>
        </svg>
      </div>
    ),
  },
  {
    alt: "Person i arbeid",
    art: (
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #f0e3d0 0%, #d8b893 100%)",
        }}
      >
        <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="100" cy="80" r="40" fill="#e8b894" />
          <path d="M40 240 Q40 140 100 130 Q160 140 160 240 Z" fill="#d04a3b" />
          <rect x="80" y="170" width="40" height="20" fill="#b8a88a" />
        </svg>
      </div>
    ),
  },
  {
    alt: "Bolig med steinmur",
    art: (
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #d4cfc0 0%, #8a7a64 100%)",
        }}
      >
        <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect x="0" y="180" width="200" height="60" fill="#9a8a72" />
          <g fill="#7a6a52" stroke="#5d4f3d" strokeWidth="0.5">
            <rect x="0" y="180" width="40" height="14" />
            <rect x="40" y="180" width="50" height="14" />
            <rect x="90" y="180" width="35" height="14" />
            <rect x="125" y="180" width="45" height="14" />
            <rect x="170" y="180" width="30" height="14" />
            <rect x="0" y="194" width="55" height="14" />
            <rect x="55" y="194" width="40" height="14" />
            <rect x="95" y="194" width="50" height="14" />
            <rect x="145" y="194" width="55" height="14" />
            <rect x="0" y="208" width="35" height="14" />
            <rect x="35" y="208" width="55" height="14" />
            <rect x="90" y="208" width="40" height="14" />
            <rect x="130" y="208" width="70" height="14" />
          </g>
          <rect x="60" y="120" width="120" height="60" fill="#3d3a35" />
        </svg>
      </div>
    ),
  },
];

export function ImageStrip() {
  return (
    <section className="pb-12 sm:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 sm:px-10 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
          {tiles.map((tile) => (
            <div
              key={tile.alt}
              className="relative aspect-[4/5] w-[68%] shrink-0 snap-start overflow-hidden rounded-2xl md:w-auto"
              role="img"
              aria-label={tile.alt}
            >
              {tile.art}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
