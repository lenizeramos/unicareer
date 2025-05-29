import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        candidate: true,
        job: { include: { company: true } },
      },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
