import prisma from "./prisma";

export async function getCompletedCompanyPaymentsCount(
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.companyPayments.count({
      where: {
        status: "COMPLETED",
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting completed company payments:", error);
    throw new Error(
      "Failed to count completed company payments due to database issue."
    );
  }
}

export async function getPendingCompanyPaymentsCount(
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.companyPayments.count({
      where: {
        status: "PENDING",
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting pending company payments:", error);
    throw new Error(
      "Failed to count pending company payments due to database issue."
    );
  }
}

