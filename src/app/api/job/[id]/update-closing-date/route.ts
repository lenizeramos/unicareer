import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { closingDate } = await request.json();

    if (!id || !closingDate) {
      return NextResponse.json(
        { error: "Job ID and closing date are required" },
        { status: 400 }
      );
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        closingDate: new Date(closingDate),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating closing date:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
