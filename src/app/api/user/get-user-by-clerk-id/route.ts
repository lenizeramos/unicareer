import { NextResponse, NextRequest } from "next/server";
import { getUserByClerkId } from "@/Lib/server/usersService";
import { getClerkUserId } from "@/utils/user";

export async function GET(req: NextRequest) {
  try {
    const userId = await getClerkUserId();

    if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await getUserByClerkId(userId);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Error fetching user data", { status: 500 });
  }
}
