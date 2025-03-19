import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { createJobPost } from "../../../Lib/postJob";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    console.log(payload, "payloadddddddddddddddddd");

    const userId = await getClerkUserId();
    console.log(userId, "userId")
    if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

    /* const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json()); */
    payload.companyId = userId;

    await createJobPost(payload);
    return NextResponse.json("Job Post created successfully");
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
