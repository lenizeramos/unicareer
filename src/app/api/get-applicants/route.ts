import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function GET() {
  try {
    const applicants = await prisma.application.findMany({
      include: { candidate: true, job: true },
    });
    return NextResponse.json(applicants);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
