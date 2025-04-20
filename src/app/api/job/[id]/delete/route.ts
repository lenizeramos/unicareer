import { NextResponse } from "next/server";
import { softDeleteJobById } from "@/Lib/job";
import { updateApplicationStatusToCancelledJob } from "@/Lib/application";

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

    const deleteJob = await softDeleteJobById(id);

    if (deleteJob.deleted) {
      await updateApplicationStatusToCancelledJob(id);
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
