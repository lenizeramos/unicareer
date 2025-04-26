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

export async function getCandidateCount(startDate?: Date, endDate?: Date) {
  try {
    return await prisma.candidate.count({
      where: {
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting candidate:", error);
    throw new Error("Failed to count candidate due to database issue.");
  }
}