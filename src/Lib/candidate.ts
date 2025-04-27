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

export async function getAllCandidates(
  startDate?: Date,
  endDate?: Date,
  searchTerm?: string
) {
  try {
    const candidates =  await prisma.candidate.findMany({
      where: {
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
        ...(searchTerm && {
          OR: [
            {
              firstName: { contains: searchTerm, mode: "insensitive" },
            },
            {
              lastName: { contains: searchTerm, mode: "insensitive" },
            },
            { user: { email: { contains: searchTerm, mode: "insensitive" } } },
          ],
        }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        skills: true,
        createdAt: true,
        applications: {
          select: {
            id: true,
            status: true,
          },
        },
        user: {
          select: {
            email: true,
            city: true,
            province: true,
            country: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return candidates.map(candidate => ({
      ...candidate,
      totalApplications: candidate._count.applications,
      _count: undefined,
    }));
  } catch (error) {
    console.error("Error getting candidates:", error);
    throw new Error("Failed to get candidates due to database issue.");
  }
}
