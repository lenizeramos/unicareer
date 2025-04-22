import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getApplicationsByCompanyId } from "@/Lib/application";
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
      const searchTermParam = req.nextUrl.searchParams.get("search");

      const startDate = startDateParam ? new Date(startDateParam) : undefined;
      const endDate = endDateParam ? new Date(endDateParam) : undefined;
      const searchTerm = searchTermParam ? searchTermParam : undefined;

      const applications = await getApplicationsByCompanyId(
        companyId,
        startDate,
        endDate,
        searchTerm
      );
      return NextResponse.json(applications);
    } else {
      return new NextResponse("Company ID not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
