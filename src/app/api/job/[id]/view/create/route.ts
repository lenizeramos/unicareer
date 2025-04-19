import { NextRequest, NextResponse } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/usersService";
import { createJobView, getJobById } from "@/Lib/job";

export async function POST(
  req: NextRequest,
  { params }: { params: any }
) {
  try {
    const jobId = params.id;

    if (!jobId) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    const clerkUserId = await getClerkUserId();
    if (!clerkUserId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await getUserByClerkId(clerkUserId);
    if (!user) return new NextResponse("User not found", { status: 404 });
    if (!user.candidate)
      return new NextResponse("Only candidates can view jobs", { status: 403 });

    const jobExists = await getJobById(jobId);
    if (!jobExists)
      return new NextResponse("Job not found", { status: 404 });

    await createJobView(jobId, user.candidate.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error recording job view:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
