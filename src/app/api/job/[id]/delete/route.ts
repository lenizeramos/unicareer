import { NextResponse, NextRequest } from "next/server";
/* import prisma from "@/Lib/prisma"; */

export default async function DELETE(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }
    
    /* const deleteJob = await prisma.job.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    }); */

    return NextResponse.json(deleteJob);
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
