import { NextResponse, NextRequest } from "next/server";
import { getUserByClerkId } from "@/Lib/server/usersService";
import { getClerkUserId } from "@/utils/user";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkIdFromParams = searchParams.get('clerkId');

    const clerkId = clerkIdFromParams || await getClerkUserId();

    if (!clerkId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const user = await getUserByClerkId(clerkId);
    
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Error fetching user data", { status: 500 });
  }
}
