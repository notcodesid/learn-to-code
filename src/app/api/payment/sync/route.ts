import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { markUserPaid } from "@/lib/payments";

/**
 * Reconciles payment state for the signed-in user.
 *
 * If they have any succeeded Payment row but User.hasPaid is still false
 * (e.g. webhook recorded payment then crashed before unlocking), flip hasPaid.
 * Safe to call repeatedly from /payment/success while polling.
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { hasPaid: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.hasPaid) {
      return NextResponse.json({ hasPaid: true, synced: false });
    }

    const succeededPayment = await prisma.payment.findFirst({
      where: { userId, status: "succeeded" },
      select: { id: true },
    });

    if (succeededPayment) {
      await markUserPaid(userId);
      return NextResponse.json({ hasPaid: true, synced: true });
    }

    return NextResponse.json({ hasPaid: false, synced: false });
  } catch (error) {
    console.error("Payment sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}