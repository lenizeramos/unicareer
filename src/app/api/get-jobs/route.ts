import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: {
          include: {
            profileImages: true,
            user: true,
          },
        },
        applications: true,
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
