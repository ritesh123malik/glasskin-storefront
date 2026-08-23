import { getProductsFromSupabase } from "@/lib/supabase";
import ShopClient from "./ShopClient";

export const revalidate = 60; // Revalidate every 60s at server request time

export default async function ShopPage() {
  const products = await getProductsFromSupabase();
  return <ShopClient initialProducts={products} />;
}
