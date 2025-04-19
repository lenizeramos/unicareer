/* import { NextResponse, NextRequest } from "next/server";
import prisma from "@/Lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    const body = await req.json();

    const {
      id: _,
      candidateId: __,
      jobId: ___,
      updatedAt: ____,
      ...safeData
    } = body;

    const updatedJob = await prisma.job.update({
      where: { id },
      data: safeData, 
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error recording job view:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
} */
