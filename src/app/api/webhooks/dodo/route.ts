import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "@/lib/prisma";
import { markUserPaid } from "@/lib/payments";

export const runtime = "nodejs";

/**
 * Dodo Payments webhook receiver.
 *
 * Verifies the Standard Webhooks signature, then marks the user as paid on
 * `payment.succeeded` events. Idempotent via the `(provider, providerRef)`
 * unique constraint on the Payment row.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret) {
    console.error("DODO_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const headers = {
    "webhook-id": request.headers.get("webhook-id") || "",
    "webhook-signature": request.headers.get("webhook-signature") || "",
    "webhook-timestamp": request.headers.get("webhook-timestamp") || "",
  };

  let payload: any;
  try {
    const wh = new Webhook(secret);
    payload = wh.verify(rawBody, headers);
  } catch (err) {
    console.error("Dodo webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType: string = payload?.type || payload?.event_type || "";
  const data = payload?.data || payload;

  // We only care about successful one-time payments.
  // Dodo emits e.g. "payment.succeeded" — handle defensively.
  const isSuccess =
    eventType === "payment.succeeded" ||
    eventType === "payment.completed" ||
    data?.status === "succeeded";

  if (!isSuccess) {
    // Acknowledge other events so Dodo stops retrying.
    return NextResponse.json({ received: true, ignored: eventType });
  }

  const paymentId: string | undefined = data?.payment_id || data?.id;
  const metadata = data?.metadata || {};
  const userId: string | undefined = metadata.userId;
  const amount = data?.total_amount ?? data?.amount ?? 0;
  const currency: string = data?.currency || "USD";

  if (!userId || !paymentId) {
    console.error("Dodo webhook: missing userId or paymentId", { metadata, data });
    return NextResponse.json(
      { error: "Missing userId or paymentId" },
      { status: 400 }
    );
  }

  try {
    // Idempotent insert. Always mark the user paid on success — a prior webhook
    // may have recorded the Payment row but failed before updating User.hasPaid,
    // and Dodo retries would otherwise skip the unlock step entirely.
    const existing = await prisma.payment.findUnique({
      where: { provider_providerRef: { provider: "dodo", providerRef: paymentId } },
    });

    if (!existing) {
      await prisma.payment.create({
        data: {
          userId,
          provider: "dodo",
          providerRef: paymentId,
          // Dodo amounts are typically in minor units (cents); store as-is.
          amount: typeof amount === "number" ? amount / 100 : 0,
          currency,
          status: "succeeded",
          rawPayload: payload,
        },
      });
    }

    await markUserPaid(userId);
    console.log(`Dodo: marked user ${userId} as paid (payment ${paymentId})`);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Dodo webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }
}
