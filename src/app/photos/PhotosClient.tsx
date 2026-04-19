"use client";

// Redirect /photos → the customer's first category page. The lookbook
// has no separate "contents" page — the cover IS the contents.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/context/ProfileContext";

export default function PhotosClient() {
  const router = useRouter();
  const categories = useCategories();
  useEffect(() => {
    const first = categories[0];
    router.replace(first ? `/photos/${first.slug}` : "/");
  }, [router, categories]);
  return null;
}
