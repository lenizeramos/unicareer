import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/Lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        company: true,
      },
    });

    if (!user?.company) {
      return NextResponse.json(
        { error: "Company not found for this user" },
        { status: 404 }
      );
    }

    const payments = await prisma.companyPayments.findMany({
      where: {
        companyId: user.company.id,
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        invoice: true,
      },
    });

    return NextResponse.json(payments);
    
  } catch (error) {
    console.error("Error fetching company payments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
