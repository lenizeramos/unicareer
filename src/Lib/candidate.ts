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
      },
    });
  } catch (error) {
    console.error(`Error fetching company data:`, error);
    throw new Error("Failed to retrieve company information.");
  }
}
