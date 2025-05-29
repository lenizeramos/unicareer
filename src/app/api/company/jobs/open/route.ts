import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getLastJobsByCompanyId } from "@/Lib/job";
import { getUserByClerkId } from "@/Lib/server/usersService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let limit = Number(searchParams.get("limit"));

    if (!limit) {
      limit = 100;
    }

    const clerkUserId = await getClerkUserId();

    if (!clerkUserId)
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const companyId = user.company?.id;

    if (companyId) {
      const jobs = await getLastJobsByCompanyId(companyId, limit);

      return NextResponse.json(jobs);
    } else {
      return new NextResponse("Company ID not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
