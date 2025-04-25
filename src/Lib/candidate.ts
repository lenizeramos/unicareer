import prisma from "./prisma";

export async function getCandidateByClerkId(clerkId: string) {
  try {
    return await prisma.candidate.findFirst({
      where: {
        user: {
          clerkId: clerkId,
        },
      },
      include: {
        user: true,
        education: {
          select: {
            institution: true,
            degree: true,
            fieldOfStudy: true,
            country: true,
            startDate: true,
            endDate: true,
            current: true,
            description: true,
          },
        },
        workExperience: {
          select: {
            company: true,
            position: true,
            country: true,
            startDate: true,
            endDate: true,
            current: true,
            description: true,
          },
        },
        languages: {
          select: {
            name: true,
            level: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching candidate data:`, error);
    throw new Error("Failed to retrieve candidate information.");
  }
}
