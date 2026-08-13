import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { WizardCTA } from "@/components/marketing/WizardCTA";
import { ARTICLES, getArticle, type ArticleBlock } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Kobly`,
    description: article.ingress,
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-serif text-2xl font-semibold leading-snug text-ink sm:text-[28px]">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-6 text-base leading-[1.75] text-ink sm:text-[1.0625rem]">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-6 flex list-disc flex-col gap-2.5 pl-5 text-base leading-[1.65] text-ink marker:text-ink-muted sm:text-[1.0625rem]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="mt-10">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-surface-soft">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 768px) 680px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-ink-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "cta":
      return <WizardCTA className="mt-10" />;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="px-6 pt-6 pb-20 sm:px-10 sm:pt-10 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-[680px]">
              <Link
                href="/blogg"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
                Alle artikler
              </Link>
              <p className="mt-8 text-xs text-ink-muted">
                {formatDate(article.date)} · {article.readMinutes} min lesetid
              </p>
              <h1 className="mt-3 text-balance font-serif text-[2rem] font-semibold leading-[1.1] text-ink sm:text-[2.75rem]">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl">
                {article.ingress}
              </p>
            </div>
            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-[14px] bg-surface-soft sm:mt-14">
              <Image
                src={article.headerImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mx-auto mt-4 max-w-[680px] sm:mt-8">
              {article.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
              <WizardCTA className="mt-14" />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
