import { NextResponse, NextRequest } from "next/server";
import { getRole } from "@/utils/roles";

export async function GET(req: NextRequest) {
  try {
    const role = await getRole();

    if (!role) return NextResponse.redirect(new URL("/sign-in", req.url));

    return NextResponse.json(role);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Error fetching user data", { status: 500 });
  }
}
