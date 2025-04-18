import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status: "INTERVIEWED" },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating status to INTERVIEW:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
