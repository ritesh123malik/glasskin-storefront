import "server-only";

import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type CheckoutLine = { variantId: string; quantity: number };
type Variant = { id: string; product_id: string; title: string; sku: string; price: number; currency: string; products: { name: string; image: string; description: string }[] };

/** GST is assumed to be included in the displayed price (tax-inclusive MRP). */
function taxFor(chargeable: number): number {
  const rate = Number(process.env.GST_RATE ?? 18);
  if (!rate) return 0;
  return Math.round((chargeable * rate) / (100 + rate));
}

export async function createPendingStripeOrder(lines: CheckoutLine[], discountTotal: number) {
  const supabaseAdmin = getSupabaseAdmin();
  const ids = lines.map((line) => line.variantId);
  const { data, error } = await supabaseAdmin.from("product_variants").select("id, product_id, title, sku, price, currency, products(name, image, description)").in("id", ids).eq("is_active", true);
  if (error || !data || data.length !== ids.length) throw new Error("One or more selected variants are unavailable.");
  const variants = data as Variant[];
  const byId = new Map(variants.map((variant) => [variant.id, variant]));
  const subtotal = lines.reduce((total, line) => total + (byId.get(line.variantId)?.price ?? 0) * line.quantity, 0);
  const shipping = subtotal >= 99900 ? 0 : 9900;
  const taxTotal = taxFor(subtotal - discountTotal);
  const grandTotal = subtotal - discountTotal + shipping;
  const currency = variants[0].currency;
  if (variants.some((variant) => variant.currency !== currency)) throw new Error("Cart currency mismatch.");

  const { data: order, error: orderError } = await supabaseAdmin.from("orders").insert({ payment_method: "stripe", currency, subtotal, discount_total: discountTotal, shipping_total: shipping, tax_total: taxTotal, grand_total: grandTotal, shipping_address: {}, customer_email: "checkout-pending@invalid.local" }).select("id, order_number").single();
  if (orderError || !order) throw new Error("Could not create order.");
  const items = lines.map((line) => {
    const variant = byId.get(line.variantId)!;
    return { order_id: order.id, variant_id: variant.id, product_name: variant.products[0]?.name ?? "Product", variant_title: variant.title, sku: variant.sku, unit_price: variant.price, quantity: line.quantity, line_total: variant.price * line.quantity };
  });
  const { error: itemError } = await supabaseAdmin.from("order_items").insert(items);
  if (itemError) throw new Error("Could not create order items.");
  const { error: paymentError } = await supabaseAdmin.from("payments").insert({ order_id: order.id, method: "stripe", amount: grandTotal, currency, provider: "stripe" });
  if (paymentError) throw new Error("Could not create payment.");
  const { error: reservationError } = await supabaseAdmin.rpc("reserve_order_inventory", { p_order_id: order.id });
  if (reservationError) throw new Error("Some items are no longer available.");
  return { order, variants, lines, subtotal, shipping, grandTotal, currency };
}

/** Creates a Cash-on-Delivery order. Lifecycle is kept separate from Stripe prepaid states. */
export async function createCodOrder(lines: CheckoutLine[], discountTotal: number) {
  const supabaseAdmin = getSupabaseAdmin();
  const ids = lines.map((line) => line.variantId);
  const { data, error } = await supabaseAdmin.from("product_variants").select("id, product_id, title, sku, price, currency, products(name, image, description)").in("id", ids).eq("is_active", true);
  if (error || !data || data.length !== ids.length) throw new Error("One or more selected variants are unavailable.");
  const variants = data as Variant[];
  const byId = new Map(variants.map((variant) => [variant.id, variant]));
  const subtotal = lines.reduce((total, line) => total + (byId.get(line.variantId)?.price ?? 0) * line.quantity, 0);
  const shipping = subtotal >= 99900 ? 0 : 9900;
  const taxTotal = taxFor(subtotal - discountTotal);
  const grandTotal = subtotal - discountTotal + shipping;
  const currency = variants[0].currency;
  if (variants.some((variant) => variant.currency !== currency)) throw new Error("Cart currency mismatch.");

  const { data: order, error: orderError } = await supabaseAdmin.from("orders").insert({
    payment_method: "cash_on_delivery",
    status: "pending_payment",
    currency,
    subtotal,
    discount_total: discountTotal,
    shipping_total: shipping,
    tax_total: taxTotal,
    grand_total: grandTotal,
    shipping_address: {},
    customer_email: "checkout-pending@invalid.local",
  }).select("id, order_number").single();
  if (orderError || !order) throw new Error("Could not create order.");
  const items = lines.map((line) => {
    const variant = byId.get(line.variantId)!;
    return { order_id: order.id, variant_id: variant.id, product_name: variant.products[0]?.name ?? "Product", variant_title: variant.title, sku: variant.sku, unit_price: variant.price, quantity: line.quantity, line_total: variant.price * line.quantity };
  });
  const { error: itemError } = await supabaseAdmin.from("order_items").insert(items);
  if (itemError) throw new Error("Could not create order items.");
  const { error: paymentError } = await supabaseAdmin.from("payments").insert({ order_id: order.id, method: "cash_on_delivery", amount: grandTotal, currency, provider: "cash_on_delivery", status: "cod_pending_collection" });
  if (paymentError) throw new Error("Could not create payment.");
  const { error: reservationError } = await supabaseAdmin.rpc("reserve_order_inventory", { p_order_id: order.id });
  if (reservationError) throw new Error("Some items are no longer available.");
  return { orderId: order.id, orderNumber: order.order_number, grandTotal };
}

/** Marks a COD payment as collected at delivery; advances the order into fulfilment. */
export async function collectCodPayment(orderId: string, actorId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: payment, error } = await supabaseAdmin.from("payments").select("id, status").eq("order_id", orderId).eq("method", "cash_on_delivery").single();
  if (error || !payment) throw new Error("No COD payment found for this order.");
  if (payment.status === "succeeded") throw new Error("COD already collected.");
  const { error: payError } = await supabaseAdmin.from("payments").update({ status: "succeeded", updated_at: new Date().toISOString() }).eq("id", payment.id);
  if (payError) throw new Error(payError.message);
  const { data: order } = await supabaseAdmin.from("orders").update({ status: "processing", updated_at: new Date().toISOString() }).eq("id", orderId).eq("status", "pending_payment").select("customer_email").single();
  await recordAudit(actorId, "collect_cod", "payments", payment.id, { orderId });
  return { ok: true, customerEmail: order?.customer_email };
}

export async function cancelPendingOrder(orderId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  await supabaseAdmin.rpc("release_order_reservations", { p_order_id: orderId });
  await supabaseAdmin.from("orders").update({ status: "cancelled", cancelled_at: new Date().toISOString() }).eq("id", orderId).eq("status", "pending_payment");
}

export async function attachStripeSession(orderId: string, sessionId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("orders").update({ stripe_checkout_session_id: sessionId }).eq("id", orderId);
  if (error) throw new Error("Could not attach checkout session.");
}

export async function orderForStripeSession(sessionId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.from("orders").select("id, order_number, status, grand_total, currency, customer_email").eq("stripe_checkout_session_id", sessionId).single();
  if (error) return null;
  return data;
}

/** Reads a COD order by its public order number for the post-checkout confirmation page. */
export async function getOrderConfirmation(orderNumber: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, order_number, status, grand_total, currency, customer_email, payment_method")
    .eq("order_number", orderNumber)
    .single();
  if (error) return null;
  return data;
}

async function recordAudit(actorId: string | null, action: string, entityType: string, entityId: string, metadata: Record<string, unknown> = {}) {
  await getSupabaseAdmin()
    .from("admin_audit_log")
    .insert({ actor_id: actorId, action, entity_type: entityType, entity_id: entityId, metadata });
}

export async function getAdminOrders(status?: string) {
  const supabaseAdmin = getSupabaseAdmin();
  let query = supabaseAdmin
    .from("orders")
    .select("id, order_number, status, grand_total, currency, customer_email, created_at, placed_at")
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getAdminOrder(id: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select("*, items:order_items(*), payments(*), shipments(*), return_requests(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return order;
}

type FulfilmentState = "processing" | "shipped" | "delivered" | "cancelled";

export async function advanceOrderState(orderId: string, status: FulfilmentState, actorId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .select("id, status, customer_email")
    .single();
  if (error) throw new Error(error.message);
  await recordAudit(actorId, "order_state", "orders", orderId, { status });
  return data;
}

export async function addTracking(orderId: string, carrier: string, trackingNumber: string, actorId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: existing } = await supabaseAdmin.from("shipments").select("id").eq("order_id", orderId).maybeSingle();
  const payload = {
    order_id: orderId,
    carrier,
    tracking_number: trackingNumber,
    status: "shipped" as const,
    shipped_at: new Date().toISOString(),
  };
  const { error } = existing
    ? await supabaseAdmin.from("shipments").update(payload).eq("id", existing.id)
    : await supabaseAdmin.from("shipments").insert(payload);
  if (error) throw new Error(error.message);
  await recordAudit(actorId, "add_tracking", "shipments", orderId, { carrier, trackingNumber });
  return { ok: true };
}

export async function addOrderNote(orderId: string, note: string, actorId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("orders").update({ admin_notes: note, updated_at: new Date().toISOString() }).eq("id", orderId);
  if (error) throw new Error(error.message);
  await recordAudit(actorId, "add_note", "orders", orderId, { length: note.length });
  return { ok: true };
}

/** Returns fulfilled stock to on-hand inventory when a return is accepted. */
async function restockFulfilledReservations(orderId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: reservations } = await supabaseAdmin
    .from("stock_reservations")
    .select("warehouse_id, variant_id, quantity")
    .eq("order_id", orderId)
    .eq("status", "fulfilled");
  if (!reservations?.length) return;
  for (const reservation of reservations) {
    await supabaseAdmin.rpc("adjust_inventory_on_hand", {
      p_warehouse_id: reservation.warehouse_id,
      p_variant_id: reservation.variant_id,
      p_delta: reservation.quantity,
    });
  }
}

/** Refunds a paid Stripe payment. Omits amount for a full refund. */
export async function refundOrder(orderId: string, amount: number | undefined, actorId: string, restock = false) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: payment, error } = await supabaseAdmin
    .from("payments")
    .select("id, amount, provider_payment_id, method, status")
    .eq("order_id", orderId)
    .eq("method", "stripe")
    .single();
  if (error || !payment) throw new Error("No Stripe payment found for this order.");
  if (payment.status === "refunded" || payment.status === "partially_refunded") throw new Error("Payment already refunded.");

  const stripe = getStripe();
  const refundParams: Stripe.RefundCreateParams = {};
  if (payment.provider_payment_id) {
    if (payment.provider_payment_id.startsWith("pi_")) refundParams.payment_intent = payment.provider_payment_id;
    else refundParams.charge = payment.provider_payment_id;
  }
  if (amount && amount < payment.amount) refundParams.amount = amount;

  const refund = await stripe.refunds.create(refundParams);

  const newStatus = amount && amount < payment.amount ? "partially_refunded" : "refunded";
  await supabaseAdmin.from("payments").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", payment.id);
  await supabaseAdmin.from("orders").update({ status: "refunded", updated_at: new Date().toISOString() }).eq("id", orderId);
  if (restock) await restockFulfilledReservations(orderId);
  await recordAudit(actorId, "refund", "payments", payment.id, { amount: amount ?? payment.amount, refundId: refund.id });
  return { status: newStatus, refundId: refund.id };
}

/** Customer-initiated cancel/return request. Validated server-side; admin resolves it. */
export async function requestCustomerOrderAction(orderId: string, customerId: string, type: "cancel" | "return", reason: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select("id, status, customer_id")
    .eq("id", orderId)
    .single();
  if (error || !order) throw new Error("Order not found.");
  if (order.customer_id !== customerId) throw new Error("Order does not belong to this account.");

  const allowed = type === "cancel"
    ? ["pending_payment", "confirmed", "processing"]
    : ["confirmed", "processing", "shipped", "delivered"];
  if (!allowed.includes(order.status)) throw new Error("This order is not eligible for that request.");

  const { error: insertError } = await supabaseAdmin.from("return_requests").insert({
    order_id: orderId,
    customer_id: customerId,
    reason: `${type === "cancel" ? "Cancel" : "Return"}: ${reason}`,
  });
  if (insertError) throw new Error(insertError.message);
  await supabaseAdmin.from("orders").update({ requested_action: type === "cancel" ? "cancelled" : "refunded", updated_at: new Date().toISOString() }).eq("id", orderId);
  return { ok: true };
}
