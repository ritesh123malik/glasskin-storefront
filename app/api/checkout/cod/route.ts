import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { evaluatePromo } from "@/lib/promotions";
import { createCodOrder } from "@/lib/orders";
import { rateLimit } from "@/lib/rate-limit";

const checkoutSchema = z.object({
  items: z.array(z.object({ variantId: z.string().uuid(), quantity: z.number().int().min(1).max(20) })).min(1).max(20),
  promoCode: z.string().trim().max(64).optional(),
  email: z.string().email(),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(6).max(20),
  address: z.object({
    line1: z.string().trim().min(1).max(200),
    line2: z.string().trim().max(200).optional(),
    city: z.string().trim().min(1).max(80),
    state: z.string().trim().min(1).max(80),
    pincode: z.string().trim().min(4).max(12),
    country: z.string().trim().min(2).max(2).default("IN"),
  }),
});

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`cod:${clientIp}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many checkout attempts. Please try again shortly." }, { status: 429 });
  }
  try {
    const parsed = checkoutSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please complete the delivery details." }, { status: 400 });

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
    if (!variants || variants.length !== lines.length) return NextResponse.json({ error: "Some items are unavailable." }, { status: 400 });
    const subtotal = lines.reduce((total, line) => total + (variants.find((v) => v.id === line.variantId)?.price ?? 0) * line.quantity, 0);

    let discountTotal = 0;
    if (parsed.data.promoCode) {
      const evaluation = await evaluatePromo(parsed.data.promoCode, lines, subtotal);
      if (!evaluation.valid) return NextResponse.json({ error: evaluation.message }, { status: 400 });
      discountTotal = evaluation.discountAmount;
    }

    const { orderId, orderNumber, grandTotal } = await createCodOrder(lines, discountTotal);
    const { error: updateError } = await (await import("@/lib/supabase-admin")).getSupabaseAdmin()
      .from("orders")
      .update({
        customer_email: parsed.data.email,
        shipping_address: {
          name: parsed.data.name,
          phone: parsed.data.phone,
          ...parsed.data.address,
        },
      })
      .eq("id", orderId);
    if (updateError) return NextResponse.json({ error: "Could not save delivery details." }, { status: 500 });

    return NextResponse.json({ orderId, orderNumber, grandTotal });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not place order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
