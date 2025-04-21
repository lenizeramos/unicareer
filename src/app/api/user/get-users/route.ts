import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import prisma from "@/Lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    let users;
    const roles: Role[] = ["ADMIN", "CANDIDATE", "COMPANY"];
    if (role && roles.includes(role.toUpperCase() as Role)) {
      switch (role.toLowerCase()) {
        case "candidate":
          users = await prisma.candidate.findMany({
            include: { user: true, applications: true },
          });
          break;
        case "company":
          users = await prisma.company.findMany({
            include: {
              user: true,
              payments: true,
              companyMembership: true,
              jobs: true,
              profileImages: true,
            },
          });
          break;
        default:
          break;
      }
    } else {
      users = await prisma.user.findMany({
        include: { profileImage: true, candidate: true, company: true },
      });
    }

    return NextResponse.json(users);
  } catch {
    return new NextResponse("Error", { status: 500 });
  }
}
