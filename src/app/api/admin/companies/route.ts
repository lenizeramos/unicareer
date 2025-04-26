import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/server/usersService";
import { getAllCompanies } from "@/Lib/company";

export async function GET(req: NextRequest) {
  try {
    const clerkUserId = await getClerkUserId();

    if (!clerkUserId)
      return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await getUserByClerkId(clerkUserId);

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const startDateParam = req.nextUrl.searchParams.get("startDate");
    const endDateParam = req.nextUrl.searchParams.get("endDate");
    const searchTermParam = req.nextUrl.searchParams.get("search");

    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;
    const searchTerm = searchTermParam ? searchTermParam : undefined;

    const applications = await getAllCompanies(
      startDate,
      endDate,
      searchTerm
    );
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
