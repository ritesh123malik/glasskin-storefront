import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ number: z.string().trim().min(1).max(64) });

export async function GET(
  _req: NextRequest,
  { params }: { params: { number: string } }
) {
  const parsed = schema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order number." }, { status: 400 });
  }

  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase-admin");
    const supabase = getSupabaseAdmin();
    const { data: order, error } = await supabase
      .from("orders")
      .select(
        "id, order_number, status, payment_method, currency, subtotal, discount_total, shipping_total, tax_total, grand_total, customer_email, shipping_address, created_at, placed_at, updated_at, items:order_items(*), payments(*), shipments(*)"
      )
      .eq("order_number", parsed.data.number)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const timeline = buildTimeline(order);
    return NextResponse.json({ order: cleanup(order), timeline });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Order lookup is unavailable right now.";
    if (/supabase/i.test(message) || /config/i.test(message)) {
      return NextResponse.json(
        { error: "Order tracking requires the store backend to be configured." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

type OrderRows = {
  status: string;
  payment_method: string;
  placed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  order_number: string;
  currency: string;
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  grand_total: number;
  customer_email?: string | null;
  shipping_address?: Record<string, string> | null;
  items?: unknown[];
  payments?: { status?: string }[];
  shipments?: { shipped_at?: string | null; status?: string; carrier?: string; tracking_number?: string }[];
};

function buildTimeline(order: OrderRows) {
  const steps: { label: string; time?: string; done: boolean }[] = [];
  const placed = order.placed_at ?? order.created_at;
  steps.push({ label: "Order Placed", time: placed ?? undefined, done: true });

  const confirmed =
    ["confirmed", "processing", "shipped", "delivered"].includes(order.status);
  steps.push({
    label: "Confirmed",
    time: confirmed ? order.updated_at ?? undefined : undefined,
    done: confirmed,
  });

  if (order.status === "delivered") {
    steps.push({ label: "Delivered", done: true });
  }

  if (order.status === "shipped" || order.status === "delivered") {
    const shipment = order.shipments?.[0];
    steps.push({
      label: "Shipped",
      time: shipment?.shipped_at ?? undefined,
      done: true,
    });
  }

  return steps
    .filter((step, index, arr) => arr.findIndex((s) => s.label === step.label) === index)
    .map((step, index) => ({
      ...step,
      state:
        index < steps.length - 1
          ? "complete"
          : order.status === "cancelled"
            ? "cancelled"
            : ["processing", "shipped"].includes(order.status)
              ? "active"
              : "complete",
    }));
}

function cleanup(order: OrderRows) {
  const safe: Record<string, unknown> = { ...order };
  delete safe.customer_email;
  return { ...safe, shipping_address: order.shipping_address ?? {} };
}
