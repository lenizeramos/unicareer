import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function DELETE(
  req: Request,
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

    const deleteJob = await prisma.job.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });

    if (deleteJob.deleted) {
      await prisma.application.updateMany({
        where: {
          job: {
            id: id,
          },
        },
        data: {
          status: "CANCELLED_JOB",
        },
      });
    }

    return NextResponse.json("Your job was successfully deleted.");
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
