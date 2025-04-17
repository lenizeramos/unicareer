import prisma from "./prisma";

export async function getCompanyByClerkId(clerkId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            profileImages: true,
          }
        }
      }
    });
  } catch (error) {
    throw new Error("Application not found." + error);
  }
}