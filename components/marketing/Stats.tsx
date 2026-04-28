const stats = [
  { value: "100%", label: "Gratis og uforpliktende" },
  { value: "1 min", label: "Å fylle ut skjema" },
  { value: "5 000+", label: "Fornøyde kunder" },
  { value: "4.8/5", label: "Gjennomsnittlig vurdering" },
];

export function Stats() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col rounded-2xl bg-surface px-5 py-5 ring-1 ring-line sm:px-6 sm:py-6"
            >
              <p className="text-4xl font-bold leading-none tracking-tight text-ink sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-4 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
