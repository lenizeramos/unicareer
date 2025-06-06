import { NextResponse } from "next/server";
import { createUser, createCandidate } from "@/Lib/server/usersService";
import { User, Candidate } from "@/types/index";

export async function POST(request: Request) {
  try {
    const userData: User & Candidate = await request.json();
    const user = await createUser(userData);
    const candidate = await createCandidate(userData, user.id);
    return NextResponse.json({ user, candidate });
  } catch (error) {
    console.error("Error creating candidate user:", error);
    return NextResponse.json(
      { error: "Failed to create candidate profile" }, 
      { status: 500 }
    );
  }
} 