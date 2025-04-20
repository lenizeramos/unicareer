import { NextResponse } from "next/server";
import { getRole } from "@/utils/roles";

export async function GET() {
  try {
    const role = await getRole();

    if (!role) {
      return NextResponse.json(null);
    }

    return NextResponse.json(role);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Error fetching user data", { status: 500 });
  }
}
