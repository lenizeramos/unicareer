import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { ICompany } from "@/app/Types/slices";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: ICompany = await request.json();

    // Separate user data from company data
    const {
      // Company-specific fields
      name,
      bio,
      size,
      industry,
      foundedYear,
      toolsAndTechnologies,
      benefits,

      // User fields (shared or user-specific)

      streetAddress,
      city,
      province,
      postalCode,
      website,
      linkedIn,
      twitter,
    } = body;

    const userData = {
      streetAddress,
      city,
      province,
      postalCode,
      website,
      linkedIn,
      twitter,
    };

    const companyData = {
      name,
      bio,
      size,
      industry,
      foundedYear,
      toolsAndTechnologies,
      benefits,
    };

    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        ...userData,
        company: {
          upsert: {
            create: companyData,
            update: companyData,
          },
        },
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating company profile:", error);
    return NextResponse.json(
      { error: "Failed to update company profile" },
      { status: 500 }
    );
  }
}
