export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p
          className="text-xs uppercase tracking-[0.08em] text-neutral-500"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Kobly
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Vi finner det beste flyttebyrået for deg
        </h1>
        <p className="mt-4 text-base text-neutral-600">
          Landingssiden bygges i Fase 2.
        </p>
      </div>
    </main>
  );
}
