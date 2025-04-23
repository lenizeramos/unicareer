import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, bio, role } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        role,
        company: {
          upsert: {
            create: {
              name,
              bio,
            },
            update: {
              name,
              bio,
            },
          },
        },
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating company profile:", error);
    return NextResponse.json(
      { error: "Failed to update company profile" },
      { status: 500 }
    );
  }
}
