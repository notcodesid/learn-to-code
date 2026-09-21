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
        bookmarked: true,
        code: true,
      }
    });

    // Convert to record for easier frontend usage
    const progressMap: Record<number, { completed: boolean; bookmarked: boolean; code: string | null }> = {};
    progress.forEach(p => {
      progressMap[p.challengeId] = {
        completed: p.completed,
        bookmarked: p.bookmarked,
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

    const { challengeId, completed, code, bookmarked } = await request.json();

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
        bookmarked: bookmarked ?? false,
        code: code ?? null,
      },
      create: {
        userId: session.user.id,
        challengeId,
        completed: completed ?? false,
        bookmarked: bookmarked ?? false,
        code: code ?? null,
      },
      select: {
        challengeId: true,
        completed: true,
        bookmarked: true,
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

// Export progress as JSON
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
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
        bookmarked: true,
        code: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    const exportData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      userId: session.user.id,
      progress: progress.map(p => ({
        challengeId: p.challengeId,
        completed: p.completed,
        bookmarked: p.bookmarked,
        code: p.code,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
    };

    return NextResponse.json(exportData);
  } catch (error) {
    console.error("Export progress error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Import progress from JSON
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please sign in again." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { progress: importProgress } = body;

    if (!Array.isArray(importProgress)) {
      return NextResponse.json(
        { error: "Invalid import data: progress must be an array" },
        { status: 400 }
      );
    }

    let imported = 0;
    let skipped = 0;

    for (const item of importProgress) {
      if (typeof item.challengeId !== 'number') {
        skipped++;
        continue;
      }

      await prisma.progress.upsert({
        where: {
          userId_challengeId: {
            userId: session.user.id,
            challengeId: item.challengeId,
          }
        },
        update: {
          completed: item.completed ?? false,
          bookmarked: item.bookmarked ?? false,
          code: item.code ?? null,
        },
        create: {
          userId: session.user.id,
          challengeId: item.challengeId,
          completed: item.completed ?? false,
          bookmarked: item.bookmarked ?? false,
          code: item.code ?? null,
        },
      });
      imported++;
    }

    return NextResponse.json({ imported, skipped });
  } catch (error) {
    console.error("Import progress error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}