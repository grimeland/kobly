import type { MetadataRoute } from "next";
import { CITY_LIST } from "@/lib/cities";
import { DISTRICTS } from "@/lib/districts";
import { AGENCIES } from "@/lib/agencies";
import { ARTICLES } from "@/lib/blog";

const BASE = "https://kobly.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/wizard", "/partner", "/blogg", "/byraer"];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...CITY_LIST.map((city) => ({
      url: `${BASE}/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...DISTRICTS.map((district) => ({
      url: `${BASE}/oslo/${district.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...AGENCIES.map((agency) => ({
      url: `${BASE}/byraer/${agency.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...ARTICLES.map((article) => ({
      url: `${BASE}/blogg/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
