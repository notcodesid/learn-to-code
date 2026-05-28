import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple query to test DB connection
    const result = await prisma.$queryRaw`SELECT 1 as connected`;

    return NextResponse.json({
      status: "ok",
      database: "connected",
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database health check failed:", error);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: error.message || "Unknown error",
        errorCode: error.code || null,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
