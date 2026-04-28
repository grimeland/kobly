import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-brand text-brand-ink">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-32 sm:px-10 sm:pt-14 sm:pb-40">
        <Logo tone="brand-ink" />
        <p className="mt-3 max-w-md text-sm text-brand-ink/70">
          Vi finner det beste flyttebyrået for deg
        </p>
      </div>
    </footer>
  );
}
