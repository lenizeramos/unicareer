import { NextResponse, NextRequest } from "next/server";
import { getRecentJobs } from "@/Lib/job";

export async function GET(req: NextRequest) {
  try {
    const limit = Number(req.nextUrl.searchParams.get("take"));
    const searchTermParam = req.nextUrl.searchParams.get("searchTerm");
    const searchLocationParam = req.nextUrl.searchParams.get("searchTerm");

    const searchTerm = searchTermParam ? searchTermParam : undefined;
    const searchLocation = searchLocationParam ? searchLocationParam : undefined;

    const jobs = await getRecentJobs(
      limit,
      undefined,
      undefined,
      searchTerm,
      searchLocation
    );

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
