import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { createApplication } from "@/Lib/application";
import { getUserByClerkId } from "@/Lib/server/usersService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const clerkUserId = await getClerkUserId();

    if (!clerkUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await getUserByClerkId(clerkUserId);
    if (!user) {
      return new NextResponse("User not Found", { status: 404 });
    }
    payload.candidateId = user.candidate?.id;
    await createApplication(payload);
    return NextResponse.json("Your application was successfully submitted.");
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
