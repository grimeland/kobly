import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { FooterCTA } from "@/components/marketing/FooterCTA";
import { ARTICLES } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blogg — Kobly",
  description:
    "Guider og tips om flytting: kostnader, flyttevask, pakking og hvordan du velger riktig flyttebyrå.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="px-6 pt-10 pb-20 sm:px-10 sm:pt-16 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-[52px]">
                Blogg
              </h1>
              <p className="mt-4 text-base text-ink-muted sm:text-lg">
                Guider og tips som gjør flyttingen enklere, fra folkene som
                kjenner flyttebyråene best.
              </p>
            </div>
            <div className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blogg/${article.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-soft">
                    <Image
                      src={article.headerImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 text-xs text-ink-muted">
                    {formatDate(article.date)} · {article.readMinutes} min
                    lesetid
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-ink group-hover:underline">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {article.ingress}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
