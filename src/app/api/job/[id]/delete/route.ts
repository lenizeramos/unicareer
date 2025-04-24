import { NextResponse } from "next/server";
import { softDeleteJobById, canManageJob } from "@/Lib/job";
import { updateApplicationStatusToCancelledJob } from "@/Lib/application";
import { getClerkUserId } from "@/utils/user";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const clerkUserId = await getClerkUserId();

    if (!await canManageJob(clerkUserId, id)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
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
