import { notFound } from "next/navigation";
import { getProductsFromSupabase, getProductByIdFromSupabase } from "@/lib/supabase";
import ProductDetailClient from "./ProductDetailClient";

// Force dynamic server fetching at request time (SSR) or allow static generation
export const revalidate = 60; // Revalidate data every 60s

export async function generateStaticParams() {
  const products = await getProductsFromSupabase();
  return products.map((p) => ({ slug: p.id }));
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductByIdFromSupabase(params.slug);
  if (!product) notFound();

  const allProducts = await getProductsFromSupabase();
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
