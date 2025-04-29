import { NextResponse, NextRequest } from "next/server";
import { getRecentJobs } from "@/Lib/job";

export async function GET(req: NextRequest) {
  try {
    const limit = Number(req.nextUrl.searchParams.get("take"));

    const recentJobs = await getRecentJobs(limit);

    return NextResponse.json({ recentJobs });
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
