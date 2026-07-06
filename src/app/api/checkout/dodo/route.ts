import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDodoClient, getDodoProductId } from "@/lib/dodo";

/**
 * Creates a Dodo Payments checkout session for the lifetime unlock.
 * Returns a URL the client should redirect to.
 *
 * The session is keyed to the authenticated user via metadata.userId so the
 * webhook can flip `hasPaid=true` after success.
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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hasPaid: true },
    });
    if (user?.hasPaid) {
      return NextResponse.json(
        { error: "You already have lifetime access." },
        { status: 400 }
      );
    }

    const client = getDodoClient();
    const productId = getDodoProductId("USD"); // USD product only for now. Dodo can still show localized pricing/FX for many customers.

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXTAUTH_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      "http://localhost:3000";

    if (baseUrl.includes("localhost")) {
      console.warn(
        "[Dodo Checkout] baseUrl is localhost. Make sure NEXT_PUBLIC_APP_URL is set in production (Vercel)."
      );
    }

    const checkout = await client.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: {
        email: session.user.email,
        name: session.user.name || session.user.email.split("@")[0],
      },
      return_url: `${baseUrl}/payment/success?provider=dodo`,
      metadata: {
        userId: session.user.id,
        product: "lifetime_unlock",
      },
    });

    // Dodo returns either `checkout_url` or `url` depending on SDK version.
    const url =
      (checkout as any).checkout_url ||
      (checkout as any).url ||
      (checkout as any).payment_link;

    if (!url) {
      console.error("Dodo checkout: no URL in response", checkout);
      return NextResponse.json(
        { error: "Failed to start checkout — missing redirect URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url, sessionId: (checkout as any).session_id });
  } catch (error: any) {
    console.error("Dodo checkout error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to start checkout" },
      { status: 500 }
    );
  }
}
