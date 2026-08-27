import { getProductsFromSupabase, isCatalogUnavailableError } from "@/lib/supabase";
import ShopClient from "./ShopClient";

export const revalidate = 60; // Revalidate every 60s at server request time

export default async function ShopPage() {
  try {
    const products = await getProductsFromSupabase();
    return <ShopClient initialProducts={products} />;
  } catch (error) {
    if (isCatalogUnavailableError(error)) {
      return <ShopClient initialProducts={[]} catalogError={error.message} />;
    }
    throw error;
  }
}
