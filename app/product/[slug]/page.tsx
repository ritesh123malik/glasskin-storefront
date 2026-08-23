// This is intentionally a SERVER component so generateStaticParams works.
// Client interactivity lives in ProductDetailClient.

import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

// Pre-render every product slug at build time
export async function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.id }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = mockProducts.find((p) => p.id === params.slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
