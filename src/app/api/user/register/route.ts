import { NextResponse, NextRequest } from "next/server";
/* import { updateCandidate } from "@/Lib/server/usersService"; */
import { getClerkUserId } from "@/utils/user";

import prisma from "@/Lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const userId = await getClerkUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { user, education, workExperience, languages,...candidate } = await request.json();
    delete candidate.id;

    /* const updatedUser = await updateCandidate({ ...userData, userId }); */
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        ...user,
        candidate: {
          upsert: {
            create: { ...candidate, education: { create: education }, workExperience: {create: workExperience}, languages: {create: languages} },
            update: {
              education: {
                deleteMany: {},
                create: education,
              },
              workExperience: {
                deleteMany: {},
                create: workExperience,
              },
              languages: {
                deleteMany: {},
                create: languages,
              },
              ...candidate,
            },
          },
        },
      },
      include: {
        candidate: {
          include: {
            education: true,
          },
        },
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating candidate:", error);
    return NextResponse.json(
      { error: "Failed to update candidate profile" },
      { status: 500 }
    );
  }
}
