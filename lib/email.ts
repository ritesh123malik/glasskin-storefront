import "server-only";

type Email = { to: string; subject: string; html: string };

async function send(email: Email) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email:development]", { to: email.to, subject: email.subject });
    return;
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL ?? "GLASSSKIN <orders@glassskin.com>", ...email }),
  });
  if (!response.ok) throw new Error("Resend could not send email");
}

export function sendOrderConfirmation(to: string, orderNumber: number) {
  return send({ to, subject: `Order #${orderNumber} confirmed`, html: `<p>Thank you. Your GLASSSKIN order #${orderNumber} is confirmed.</p>` });
}

// Lifecycle hooks for Phase 4 fulfillment and support operations.
export function sendShipmentEmail(to: string) { return send({ to, subject: "Your order has shipped", html: "<p>Your order is on its way.</p>" }); }
export function sendRefundEmail(to: string) { return send({ to, subject: "Your refund has been issued", html: "<p>Your refund has been issued.</p>" }); }
export function sendCancellationEmail(to: string) { return send({ to, subject: "Your order was cancelled", html: "<p>Your order was cancelled.</p>" }); }
