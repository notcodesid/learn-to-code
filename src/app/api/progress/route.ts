import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      console.error("User not found in database:", session.user.id);
      return NextResponse.json(
        { error: "User not found. Please sign in again." },
        { status: 404 }
      );
    }

    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id },
      select: {
        challengeId: true,
        completed: true,
        code: true,
      }
    });

    // Convert to record for easier frontend usage
    const progressMap: Record<number, { completed: boolean; code: string | null }> = {};
    progress.forEach(p => {
      progressMap[p.challengeId] = {
        completed: p.completed,
        code: p.code,
      };
    });

    return NextResponse.json({ progress: progressMap });
  } catch (error) {
    console.error("Get progress error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { challengeId, completed, code } = await request.json();

    if (typeof challengeId !== 'number') {
      return NextResponse.json(
        { error: "Invalid challengeId" },
        { status: 400 }
      );
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      console.error("User not found in database:", session.user.id);
      return NextResponse.json(
        { error: "User not found. Please sign in again." },
        { status: 404 }
      );
    }

    // Upsert progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId,
        }
      },
      update: {
        completed: completed ?? false,
        code: code ?? null,
      },
      create: {
        userId: session.user.id,
        challengeId,
        completed: completed ?? false,
        code: code ?? null,
      },
      select: {
        challengeId: true,
        completed: true,
        code: true,
      }
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Save progress error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}