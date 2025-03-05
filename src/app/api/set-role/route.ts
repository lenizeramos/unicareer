import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();
    if (!role) return new NextResponse("Role not provided", { status: 400 });

    const { userId } = await auth();
    console.log(userId, "hhhhhhhhhhh")
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ message: "Role successfully set!" });
  } catch (error) {
    console.error("Error setting role:", error);
    return new NextResponse("Error setting role", { status: 500 });
  }
}
