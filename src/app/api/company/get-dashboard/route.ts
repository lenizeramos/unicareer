import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/client/usersService";
import { getCompanyDashboardData } from "@/Lib/job";

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
    if (!companyId) {
      return new NextResponse("Company not found", { status: 404 });
    }
    const startDateParam = req.nextUrl.searchParams.get("startDate");
    const endDateParam = req.nextUrl.searchParams.get("endDate");

    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    const companyDashboardData = await getCompanyDashboardData(
      companyId,
      startDate,
      endDate
    );
    console.log(companyDashboardData, "companyDashboardData backend!!!!");
    return NextResponse.json(companyDashboardData);
  } catch (error) {
    console.error("Failed to fetch company dashboard data", error);
    return new NextResponse("Error", { status: 500 });
  }
}
