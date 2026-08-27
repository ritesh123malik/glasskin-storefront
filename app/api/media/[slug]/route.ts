import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { data: product } = await getSupabaseAdmin()
    .from("products")
    .select("id")
    .eq("slug", params.slug)
    .single();
  if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

  const { data: media } = await getSupabaseAdmin()
    .from("product_media")
    .select("id, media_type, url, alt_text, sort_order, is_primary")
    .eq("product_id", product.id)
    .order("sort_order");

  return NextResponse.json({ media: media ?? [] });
}
