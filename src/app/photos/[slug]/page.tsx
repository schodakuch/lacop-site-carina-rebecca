import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeriesClient from "./SeriesClient";
import {
  getCategories,
  getCategoryBySlug,
  getMediaByCategory,
} from "@/lib/lacop";

export const revalidate = 10;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };
  return {
    title: category.name,
    description: `${category.name} series.`,
    alternates: { canonical: `/photos/${category.slug}` },
  };
}

export default async function SeriesPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);
  if (!category) notFound();
  const media = await getMediaByCategory(slug);
  return <SeriesClient category={category} categories={categories} media={media} />;
}
