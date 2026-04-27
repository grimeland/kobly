"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        scrolled ? "bg-bg/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" aria-label="Kobly hjem" className="no-underline">
          <Logo />
        </Link>
        <Link
          href="/wizard"
          className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90"
        >
          Få tilbud gratis
        </Link>
      </div>
    </header>
  );
}
