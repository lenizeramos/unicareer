import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getJobById, canManageJob } from "@/Lib/job";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await context.params;
    if (!jobId) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    const clerkUserId = await getClerkUserId();

    if (!clerkUserId) return new NextResponse("Unauthorized", { status: 401 });

    if (!(await canManageJob(clerkUserId, jobId))) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    const job = await getJobById(jobId);

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error recording job view:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
