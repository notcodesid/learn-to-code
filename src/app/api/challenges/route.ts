import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getFreeChallengeIds } from "@/lib/payments";

export async function GET(_request: NextRequest) {
  try {
    const [challenges, freeIds, session] = await Promise.all([
      prisma.challenge.findMany({
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
      getFreeChallengeIds(),
      getServerSession(authOptions),
    ]);

    const hasPaid = !!session?.user?.hasPaid;

    // Tag each challenge with `locked` so the UI can show the paywall lock.
    // Locked challenges still ship the metadata (title, category, difficulty)
    // but we strip the body so devtools can't bypass the paywall.
    const enriched = challenges.map((c) => {
      const locked = !freeIds.has(c.id) && !hasPaid;
      if (locked) {
        return {
          ...c,
          description: "",
          instructions: "",
          starterCode: "",
          hint: "",
          expectedOutput: null,
          locked: true,
        };
      }
      return { ...c, locked: false };
    });

    return NextResponse.json({ challenges: enriched, hasPaid });
  } catch (error) {
    console.error("Get challenges error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
