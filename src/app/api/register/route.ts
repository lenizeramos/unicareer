import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createUserAndCandidate } from "../../../lib/candidateService";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { userId } = await auth();
    if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    console.log(user, "userRRRRRRRRRRRRRR");

    payload.id = userId;
    payload.email = user.email_addresses[0]?.email_address || "Email not found";
    payload.image_url = user.image_url;
    payload.role = Role.CANDIDATE;
    payload.skills = ["JAVA", "DEV"];

    await createUserAndCandidate(payload);

    console.log("USERID:", userId, "EMAIL:", payload.email);

    return NextResponse.json({ userId, email: payload.email });
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
