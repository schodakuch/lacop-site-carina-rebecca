"use client";

// Redirect /photos → the first series (02 Editorial). The lookbook has no
// separate "contents" page — the cover IS the contents.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { pages } from "@/data/content";

export default function PhotosClient() {
  const router = useRouter();
  useEffect(() => {
    const first = pages.find((p) => p.key === "editorial");
    router.replace(first?.href ?? "/");
  }, [router]);
  return null;
}
