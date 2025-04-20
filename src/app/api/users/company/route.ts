import { NextResponse } from "next/server";
import { createUser, createCompany } from "@/Lib/server/usersService";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const user = await createUser(userData);
    const company = await createCompany(userData, user.id);
    return NextResponse.json({ user, company });
  } catch (error) {
    console.error("Error creating company user:", error);
    return NextResponse.json(
      { error: "Failed to create company profile" }, 
      { status: 500 }
    );
  }
} 