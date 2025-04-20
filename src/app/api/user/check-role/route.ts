import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { getClerkUserId } from "@/utils/user";

export async function GET(req: Request) {
  try {
    const clerkId = await getClerkUserId();
    if (!clerkId) {
      return NextResponse.json({ role: null });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { role: true }
    });

    return NextResponse.json({ role: user?.role || null });
  } catch (error) {
    console.error("Error checking role:", error);
    return NextResponse.json({ role: null }, { status: 500 });
  }
} 