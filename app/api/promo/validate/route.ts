import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { evaluatePromo } from "@/lib/promotions";

const schema = z.object({
  code: z.string().trim().max(64),
  items: z.array(z.object({ variantId: z.string().uuid(), quantity: z.number().int().min(1).max(20) })).min(1).max(20),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const lines = Array.from(
    parsed.data.items.reduce((map, item) => map.set(item.variantId, (map.get(item.variantId) ?? 0) + item.quantity), new Map<string, number>())
  ).map(([variantId, quantity]) => ({ variantId, quantity }));

  // Authoritative subtotal from the server catalog.
  const { getSupabaseAdmin } = await import("@/lib/supabase-admin");
  const { data: variants } = await getSupabaseAdmin()
    .from("product_variants")
    .select("id, price")
    .in("id", lines.map((l) => l.variantId))
    .eq("is_active", true);
  if (!variants || variants.length !== lines.length) {
    return NextResponse.json({ error: "Some items are unavailable." }, { status: 400 });
  }
  const subtotal = lines.reduce((total, line) => total + (variants.find((v) => v.id === line.variantId)?.price ?? 0) * line.quantity, 0);

  const evaluation = await evaluatePromo(parsed.data.code, lines, subtotal);
  if (!evaluation.valid) return NextResponse.json({ valid: false, message: evaluation.message });
  const percent = evaluation.promotion.type === "percentage"
    ? evaluation.promotion.value
    : subtotal > 0
      ? Math.round((evaluation.discountAmount / subtotal) * 100)
      : 0;
  return NextResponse.json({
    valid: true,
    discount: evaluation.discountAmount,
    percent,
    label: evaluation.promotion.code,
  });
}
