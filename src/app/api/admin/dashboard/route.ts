import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/server/usersService";
import { getAdminDashboardData } from "@/Lib/admin";

export async function GET(req: NextRequest) {
  try {
    const clerkUserId = await getClerkUserId();

    if (!clerkUserId)
      return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.role !== "ADMIN") {
      return new NextResponse("Admin not found", { status: 404 });
    }

    const startDateParam = req.nextUrl.searchParams.get("startDate");
    const endDateParam = req.nextUrl.searchParams.get("endDate");

    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    const adminDashboardData = await getAdminDashboardData(
      startDate,
      endDate
    );

    return NextResponse.json(adminDashboardData);
  } catch (error) {
    console.error("Failed to fetch company dashboard data", error);
    return new NextResponse("Error", { status: 500 });
  }
}
