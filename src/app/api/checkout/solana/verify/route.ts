import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { findAndValidate } from "@/lib/solana-pay";
import { markUserPaid } from "@/lib/payments";

/**
 * Verifies a Solana Pay payment by reference key.
 *
 * GET /api/checkout/solana/verify?reference=<base58>
 *
 * Returns:
 *  - { confirmed: true, paymentId, signature } if the transaction is found and validated.
 *  - { confirmed: false } if still waiting.
 *
 * Once confirmed, the Payment row is updated to status="succeeded" and the user
 * is marked as paid. This endpoint is idempotent.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  // Look up the pending payment.
  const payment = await prisma.payment.findUnique({
    where: { provider_providerRef: { provider: "solana_pay", providerRef: reference } },
  });

  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  if (payment.status === "succeeded") {
    const sig =
      typeof payment.rawPayload === "object" &&
      payment.rawPayload !== null &&
      "signature" in payment.rawPayload
        ? (payment.rawPayload as { signature: string }).signature
        : null;
    return NextResponse.json({
      confirmed: true,
      paymentId: payment.id,
      signature: sig,
    });
  }

  // Resolve the reference key to a PublicKey.
  try {
    const { PublicKey } = await import("@solana/web3.js");
    const refKey = new PublicKey(reference);
    const result = await findAndValidate(refKey);

    if (result.confirmed) {
      // Mark payment as succeeded and record the signature.
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "succeeded",
          rawPayload: { signature: result.signature },
        },
      });
      await markUserPaid(payment.userId);
      console.log(
        `Solana Pay: marked user ${payment.userId} as paid (tx ${result.signature})`
      );
      return NextResponse.json({
        confirmed: true,
        paymentId: payment.id,
        signature: result.signature,
      });
    }

    return NextResponse.json({ confirmed: false });
  } catch (error: any) {
    console.error("Solana Pay verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
