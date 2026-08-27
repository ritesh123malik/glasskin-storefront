import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/admin-auth";
import { requestCustomerOrderAction } from "@/lib/orders";

const schema = z.object({
  type: z.enum(["cancel", "return"]),
  reason: z.string().trim().min(3).max(1000),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    userId = await requireUser();
  } catch {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    await requestCustomerOrderAction(params.id, userId, parsed.data.type, parsed.data.reason);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
