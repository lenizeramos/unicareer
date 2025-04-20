import prisma from "@/Lib/prisma";
import { Company } from "@/types";
import { NextResponse } from "next/server";

async function updateCompanyRegister(data: Company, userId: string) {
    try {
      return await prisma.company.update({
        where: {
          userId: userId
        },
        data: {
          name: data.name,
          bio: data.bio,
        },
      });
    } catch (error) {
      console.error("Error updating company profile:", error);
      throw new Error("Company update failed.");
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const company = await updateCompanyRegister(data, data.userId);
        return NextResponse.json(company);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
    }
}