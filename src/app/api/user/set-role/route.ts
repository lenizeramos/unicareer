import { NextResponse } from "next/server";
import { setUserRole } from "@/Lib/server/usersService";
import { getClerkUserId } from "@/utils/user";

export async function POST(request: Request) {
  try {
    const { role } = await request.json();
    const userId = await getClerkUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    await setUserRole(userId, role);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting user role:", error);
    return NextResponse.json(
      { error: "Failed to set user role" }, 
      { status: 500 }
    );
  }
}
