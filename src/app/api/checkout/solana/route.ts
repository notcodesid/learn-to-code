import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildSolanaPayUrl, newReference } from "@/lib/solana-pay";
import QRCode from "qrcode";

/**
 * Creates a Solana Pay payment request (1 USDC).
 *
 * Creates a pending Payment row with status="pending" and providerRef=reference,
 * then returns a Solana Pay URL + QR code data URI for the client to display.
 *
 * The client polls `/api/checkout/solana/verify?reference=...` to confirm payment.
 */
export async function POST(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json(
        { error: "You must be signed in to purchase." },
        { status: 401 }
      );
    }

    if (session.user.hasPaid) {
      return NextResponse.json(
        { error: "You already have lifetime access." },
        { status: 400 }
      );
    }

    // Generate a fresh reference key.
    const reference = newReference();
    const referenceStr = reference.toBase58();

    // Create a pending payment record so we know who this reference belongs to.
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        provider: "solana_pay",
        providerRef: referenceStr,
        amount: 1,
        currency: "USDC",
        status: "pending",
      },
    });

    // Build the Solana Pay URL.
    const url = buildSolanaPayUrl(
      reference,
      "Rust Mentor — Lifetime Unlock",
      `user:${session.user.id}`
    );

    // Generate QR code as data URI.
    const qr = await QRCode.toDataURL(url.toString());

    return NextResponse.json({
      url: url.toString(),
      qr,
      reference: referenceStr,
      paymentId: payment.id,
    });
  } catch (error: any) {
    console.error("Solana Pay checkout error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create payment request" },
      { status: 500 }
    );
  }
}