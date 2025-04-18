import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/usersService";
import { getJobById } from "@/Lib/job";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: jobId } = await params;
    if (!jobId) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    const clerkUserId = await getClerkUserId();

    if (!clerkUserId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const job = await getJobById(jobId);

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error recording job view:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
