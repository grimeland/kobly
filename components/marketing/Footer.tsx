import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-brand text-brand-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 sm:py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo tone="brand-ink" />
          <p className="mt-3 max-w-sm text-sm text-brand-ink/70">
            Vi finner det beste flyttebyrået for deg.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-ink/70"
        >
          <a href="#" className="hover:text-brand-ink">
            Om oss
          </a>
          <a href="#" className="hover:text-brand-ink">
            Kontakt
          </a>
          <a href="#" className="hover:text-brand-ink">
            Personvern
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
        <p className="text-xs text-brand-ink/50">
          © {new Date().getFullYear()} Kobly
        </p>
      </div>
    </footer>
  );
}
