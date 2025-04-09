import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { createApplication } from "@/Lib/application";
import { getUserByClerkId } from "@/Lib/usersService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const clerkUserId = await getClerkUserId();

    if (!clerkUserId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const user = await getUserByClerkId(clerkUserId);
    if (!user) {
      return new NextResponse("User not Found", { status: 404 });
    }
    payload.candidateId = user.candidate?.id;
    console.log(payload);
    await createApplication(payload);
    return NextResponse.json("Your application was successfully submitted.");
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
