import { NextResponse } from "next/server";
import { updateCandidate } from "@/Lib/server/usersService";
import { getClerkUserId } from "@/utils/user";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const userId = await getClerkUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const updatedUser = await updateCandidate({ ...userData, userId });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating candidate:", error);
    return NextResponse.json(
      { error: "Failed to update candidate profile" }, 
      { status: 500 }
    );
  }
}
