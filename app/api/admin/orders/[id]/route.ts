import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin, AdminError } from "@/lib/admin-auth";
import {
  advanceOrderState,
  addTracking,
  addOrderNote,
  refundOrder,
  collectCodPayment,
  getAdminOrder,
} from "@/lib/orders";
import { sendShipmentEmail, sendRefundEmail, sendCancellationEmail } from "@/lib/email";

const schema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("state"),
    status: z.enum(["processing", "shipped", "delivered", "cancelled"]),
  }),
  z.object({
    action: z.literal("tracking"),
    carrier: z.string().trim().min(1).max(120),
    trackingNumber: z.string().trim().min(1).max(120),
  }),
  z.object({ action: z.literal("note"), note: z.string().trim().min(1).max(2000) }),
  z.object({ action: z.literal("refund"), amount: z.number().int().min(1).optional(), restock: z.boolean().optional() }),
  z.object({ action: z.literal("collect_cod") }),
]);

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const order = await getAdminOrder(params.id);
    return NextResponse.json({ order });
  } catch (err) {
    if (err instanceof AdminError) return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json({ error: "Could not load order." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const actorId = await requireAdmin();
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    const order = await getAdminOrder(params.id);
    const customerEmail = order.customer_email;

    if (parsed.data.action === "state") {
      await advanceOrderState(params.id, parsed.data.status, actorId);
      if (parsed.data.status === "shipped" && customerEmail) await sendShipmentEmail(customerEmail);
      if (parsed.data.status === "cancelled" && customerEmail) await sendCancellationEmail(customerEmail);
    } else if (parsed.data.action === "tracking") {
      await addTracking(params.id, parsed.data.carrier, parsed.data.trackingNumber, actorId);
      if (customerEmail) await sendShipmentEmail(customerEmail);
    } else if (parsed.data.action === "note") {
      await addOrderNote(params.id, parsed.data.note, actorId);
    } else if (parsed.data.action === "refund") {
      const result = await refundOrder(params.id, parsed.data.amount, actorId, parsed.data.restock);
      if (customerEmail) await sendRefundEmail(customerEmail);
      return NextResponse.json(result);
    } else if (parsed.data.action === "collect_cod") {
      const result = await collectCodPayment(params.id, actorId);
      return NextResponse.json(result);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AdminError) return NextResponse.json({ error: err.message }, { status: err.status });
    const message = err instanceof Error ? err.message : "Update failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
