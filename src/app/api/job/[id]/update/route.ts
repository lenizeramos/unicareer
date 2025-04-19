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

    console.log("bodyddddddddd", body);

    delete body.id;
    delete body.companyId;
    delete body.createdAt;

    body.updatedAt = new Date();

    const jobApplications = await prisma.application.count({
      where: { jobId: id },
    });
    console.log("jobApplications", jobApplications);
    if (jobApplications === 0) {
      const updatedJob = await prisma.job.update({
        where: { id },
        data: body,
      });
      return NextResponse.json(updatedJob);
    } else {
      return new NextResponse(
        "You cannot update a job that has applications.",
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error recording job view:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
