import prisma from "./prisma";

export async function getActiveCompanyMembershipCount(
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.companyMembership.count({
      where: {
        status: "ACTIVE",
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting active company membership:", error);
    throw new Error(
      "Failed to count active company membership due to database issue."
    );
  }
}

export async function getInactiveCompanyMembershipCount(
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.companyMembership.count({
      where: {
        status: "INACTIVE",
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting inactive company membership:", error);
    throw new Error(
      "Failed to count inactive company membership due to database issue."
    );
  }
}

