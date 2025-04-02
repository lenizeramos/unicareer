import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    let users;
    const roles: Role[] = ["ADMIN", "CANDIDATE", "COMPANY"];
    if (role && roles.includes(role.toUpperCase() as Role)) {
      switch (role.toLowerCase()) {
        case "candidate":
          users = await prisma.candidate.findMany();
          break;
        case "company":
          users = await prisma.company.findMany();
          break;
        default:
          break;
      }
    } else {
      users = await prisma.user.findMany();
    }

    console.log("from get-users =>", users);
    return NextResponse.json(users);
  } catch (error) {
    console.log("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
