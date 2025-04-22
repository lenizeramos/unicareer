import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { createJob } from "@/Lib/job";
import { getUserByClerkId } from "@/Lib/client/usersService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const clerkUserId = await getClerkUserId();

    if (!clerkUserId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    payload.companyId = user.company?.id;

    await createJob(payload);
    return NextResponse.json("Job Post created successfully");
  } catch (error) {
    console.error("Detailed error:", error);
    return new NextResponse(error instanceof Error ? error.message : "Unknown error", { status: 500 });
  }
}
