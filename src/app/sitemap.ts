import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/lacop";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carina-rebecca.lacop.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const seriesUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/photos/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  return [...base, ...seriesUrls];
}
