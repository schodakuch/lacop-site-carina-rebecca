import type { Metadata } from "next";
import PhotosClient from "./PhotosClient";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Editorial",
  alternates: { canonical: "/photos/editorial" },
};

export default function PhotosPage() {
  return <PhotosClient />;
}
