import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "../../../lib/candidateService";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    console.log("XXXX USER FROM CLERK", userId);
    if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await getUserByClerkId(userId);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Error fetching user data", { status: 500 });
  }
}
