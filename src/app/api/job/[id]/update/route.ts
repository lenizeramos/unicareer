import { NextResponse, NextRequest } from "next/server";
import { getApplicationsCountByJobId } from "@/Lib/application";
import { updateJobById, canManageJob } from "@/Lib/job";
import { getClerkUserId } from "@/utils/user";

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

    delete body.id;
    delete body.companyId;
    delete body.createdAt;

    body.updatedAt = new Date();

    const clerkUserId = await getClerkUserId();

    if (!(await canManageJob(clerkUserId, id))) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    const jobApplications = await getApplicationsCountByJobId(id);

    if (jobApplications === 0) {
      const updatedJob = await updateJobById(id, body);

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
