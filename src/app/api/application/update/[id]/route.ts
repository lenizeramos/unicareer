import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Application ID is required", { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating status", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
