import { NextRequest, NextResponse } from "next/server";
import { getAdminOrders } from "@/lib/orders";
import { requireAdmin, AdminError } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const orders = await getAdminOrders(status ?? undefined);
    return NextResponse.json({ orders });
  } catch (err) {
    if (err instanceof AdminError) return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json({ error: "Could not load orders." }, { status: 500 });
  }
}
