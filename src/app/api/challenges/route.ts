import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });

    // All challenges are unlocked in the free version
    const enriched = challenges.map((c) => ({ ...c, locked: false }));

    return NextResponse.json({ challenges: enriched, hasPaid: true });
  } catch (error) {
    console.error("Get challenges error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
