import { notFound } from "next/navigation";
import { getProductsFromSupabase, getProductByIdFromSupabase, isCatalogUnavailableError } from "@/lib/supabase";
import ProductDetailClient from "./ProductDetailClient";
import ProductCatalogUnavailable from "./ProductCatalogUnavailable";
import { ProductJsonLd } from "@/lib/seo";

// Force dynamic server fetching at request time (SSR) or allow static generation
export const revalidate = 60; // Revalidate data every 60s

export async function generateStaticParams() {
  try {
    const products = await getProductsFromSupabase();
    return products.map((p) => ({ slug: p.id }));
  } catch (error) {
    if (isCatalogUnavailableError(error)) return [];
    throw error;
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  try {
    const product = await getProductByIdFromSupabase(params.slug);
    if (!product) notFound();

    const allProducts = await getProductsFromSupabase();
    const related = allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return (
      <>
        <ProductJsonLd
          name={product.name}
          slug={product.id}
          description={product.description}
          price={product.price}
          currency="INR"
          image={product.image}
          category={product.category}
        />
        <ProductDetailClient product={product} relatedProducts={related} />
      </>
    );
  } catch (error) {
    if (isCatalogUnavailableError(error)) {
      return <ProductCatalogUnavailable message={error.message} />;
    }
    throw error;
  }
}
