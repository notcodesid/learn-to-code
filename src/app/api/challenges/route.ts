import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: [
        { order: 'asc' },
        { id: 'asc' }
      ],
    });

    return NextResponse.json({ challenges });
  } catch (error) {
    console.error("Get challenges error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}