import { NextResponse, NextRequest } from "next/server";
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
    console.log("body1111111111111111", body);
    delete body.id;
    delete body.companyId;
    delete body.createdAt;

    body.updatedAt = new Date();
    console.log("body22222222222222", body);
    const updatedJob = await prisma.job.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error recording job view:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
