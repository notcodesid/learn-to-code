import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFreeChallengeIds, isPaywallEnabled } from "@/lib/payments";

export async function GET(_request: NextRequest) {
  try {
    // getServerSession reads request headers/cookies — must not run inside
    // Promise.all or other deferred work that loses the Next.js request scope.
    const session = await getServerSession(authOptions);

    const [challenges, freeIds] = await Promise.all([
      prisma.challenge.findMany({
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
      getFreeChallengeIds(),
    ]);

    const paywallEnabled = isPaywallEnabled();

    // Always read hasPaid from DB — JWT session can be stale after payment status changes.
    let hasPaid = false;
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { hasPaid: true },
      });
      hasPaid = !!user?.hasPaid;
    }

    const enriched = challenges.map((c) => {
      const locked = paywallEnabled && !freeIds.has(c.id) && !hasPaid;
      const { testCases, testCaseSpec, ...challenge } = c;

      if (locked) {
        // Metadata only — no challenge content for unpaid users.
        return {
          id: challenge.id,
          title: challenge.title,
          difficulty: challenge.difficulty,
          category: challenge.category,
          order: challenge.order,
          locked: true,
        };
      }

      return {
        ...challenge,
        hasTestCases: !!testCaseSpec || !!testCases?.trim(),
        hasStructuredTests: !!testCaseSpec,
        locked: false,
      };
    });

    const lockedCount = enriched.filter((c) => c.locked).length;

    return NextResponse.json(
      {
        challenges: enriched,
        hasPaid,
        freeCount: freeIds.size,
        lockedCount,
        totalCount: enriched.length,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Get challenges error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}