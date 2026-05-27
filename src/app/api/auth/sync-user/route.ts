import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "No session found" },
        { status: 401 }
      );
    }

    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (existingUser) {
      return NextResponse.json({ 
        message: "User already exists",
        userId: existingUser.id 
      });
    }

    // Create user from session data
    const newUser = await prisma.user.create({
      data: {
        id: session.user.id, // Use the session ID
        email: session.user.email,
        name: session.user.name || session.user.email?.split('@')[0],
        image: session.user.image,
        emailVerified: new Date(), // Assume verified since they have a session
      }
    });

    console.log("Synced user from session:", newUser.id);

    return NextResponse.json({ 
      message: "User created successfully",
      userId: newUser.id 
    });
  } catch (error) {
    console.error("Sync user error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}