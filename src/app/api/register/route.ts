import { NextResponse, NextRequest } from "next/server";
import {
  createUserAndCandidate,
  createUserAndCompany,
} from "../../../lib/usersService";
import { getClerkUserId } from "@/utils/user";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const userId  = await getClerkUserId();
    if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    payload.id = userId;
    payload.email = user.email_addresses[0]?.email_address || "Email not found";
    payload.image_url = user.image_url;

    if (payload.role === "CANDIDATE") {
      try {
        payload.skills = ["JAVA", "DEV"];
        await createUserAndCandidate(payload);
        return NextResponse.json("Candidate created successfully");
      } catch (error) {
        console.error("Error", error);
        return new NextResponse("Failed to create Candidate", { status: 500 });
      }
    }

    if (payload.role === "COMPANY") {
      try {
        await createUserAndCompany(payload);
        return NextResponse.json("Company created successfully");
      } catch (error) {
        console.error("Error", error);
        return new NextResponse("Failed to create Company", { status: 500 });
      }
    }
    return new NextResponse("Error", { status: 500 });
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
