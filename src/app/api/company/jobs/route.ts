import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getJobByCompanyId, getTotalJobByCompanyId } from "@/Lib/job";
import { getUserByClerkId } from "@/Lib/server/usersService";

export async function GET(req: NextRequest) {
  try {
    const clerkUserId = await getClerkUserId();

    if (!clerkUserId)
      return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const companyId = user.company?.id;

    if (companyId) {
      const startDateParam = req.nextUrl.searchParams.get("startDate");
      const endDateParam = req.nextUrl.searchParams.get("endDate");

      const startDate = startDateParam ? new Date(startDateParam) : undefined;
      const endDate = endDateParam ? new Date(endDateParam) : undefined;

      const skip = Number(req.nextUrl.searchParams.get("skip"));
      const take = Number(req.nextUrl.searchParams.get("take"));

      const jobs = await getJobByCompanyId(companyId, startDate, endDate, skip, take);
      const totalJobs = await getTotalJobByCompanyId(companyId, startDate, endDate)

      return NextResponse.json({jobs, totalJobs});
    } else {
      return new NextResponse("Company ID not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
