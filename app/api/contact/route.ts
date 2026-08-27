import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email().max(200),
  subject: z.enum(["order", "product", "return", "wholesale", "other"]),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(req: NextRequest) {
  const parsed = contactSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });

  // Placeholder: log to console until Resend/email integration is configured for contact form.
  console.log("[contact]", parsed.data);
  return NextResponse.json({ ok: true });
}
