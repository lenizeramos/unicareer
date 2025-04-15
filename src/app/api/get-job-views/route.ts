import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/usersService";
import prisma from "@/Lib/prisma";

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
      const count = await prisma.jobView.count({
        where: {
          job: {
            companyId: companyId,
          },
        },
      });
      console.log("countttttttttt", count)
      return NextResponse.json(count);
    }
  } catch (error) {
    console.error("Failed to fetch job views count", error);
    return new NextResponse("Error", { status: 500 });
  }
}
