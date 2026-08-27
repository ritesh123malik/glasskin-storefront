import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { createServerSupabase } from "@/lib/supabase-server";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(200).optional(),
  body: z.string().trim().max(4000).optional(),
});

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { data: product } = await getSupabaseAdmin()
    .from("products")
    .select("id")
    .eq("slug", params.slug)
    .single();
  if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

  const { data: reviews } = await getSupabaseAdmin()
    .from("product_reviews")
    .select("id, rating, title, body, is_verified_purchase, helpful_count, created_at, customer:profiles(full_name)")
    .eq("product_id", product.id)
    .eq("is_approved", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  return NextResponse.json({ reviews: reviews ?? [] });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Sign in to leave a review." }, { status: 401 });

    const { data: product } = await getSupabaseAdmin()
      .from("products")
      .select("id")
      .eq("slug", params.slug)
      .single();
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please provide a rating." }, { status: 400 });

    // Check for existing review
    const { data: existing } = await getSupabaseAdmin()
      .from("product_reviews")
      .select("id")
      .eq("product_id", product.id)
      .eq("customer_id", user.id)
      .maybeSingle();
    if (existing) return NextResponse.json({ error: "You have already reviewed this product." }, { status: 400 });

    // Check if customer has a delivered order for this product
    const { data: hasOrder } = await getSupabaseAdmin()
      .from("order_items")
      .select("id, orders!inner(status)")
      .eq("variant_id", product.id)
      .eq("orders.customer_id", user.id)
      .eq("orders.status", "delivered")
      .maybeSingle();

    const { error } = await getSupabaseAdmin().from("product_reviews").insert({
      product_id: product.id,
      customer_id: user.id,
      rating: parsed.data.rating,
      title: parsed.data.title,
      body: parsed.data.body,
      is_verified_purchase: !!hasOrder,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, message: "Review submitted for moderation." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not submit review.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
