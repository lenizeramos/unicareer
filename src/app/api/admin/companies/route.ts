import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/server/usersService";
import { getAllCompanies, getTotalCompanies } from "@/Lib/company";

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

    const skip = Number(req.nextUrl.searchParams.get("skip"));
    const take = Number(req.nextUrl.searchParams.get("take"));

    const companies = await getAllCompanies(
      startDate,
      endDate,
      searchTerm,
      skip,
      take
    );

    const totalCompanies = await getTotalCompanies(
          startDate,
          endDate,
          searchTerm
        );
    return NextResponse.json({companies, totalCompanies});
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
