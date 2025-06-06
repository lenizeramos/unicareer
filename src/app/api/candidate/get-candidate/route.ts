import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
      include: {
        candidate: {
          select: {
            id: true,
            userId: true,
            firstName: true,
            lastName: true,
            skills: true,
            applications: { include: { job: { include: { company: true } } } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      candidateId: user.candidate.id,
      firstName: user.candidate.firstName,
      lastName: user.candidate.lastName,
      skills: user.candidate.skills,
      applications: user.candidate.applications,
    });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
