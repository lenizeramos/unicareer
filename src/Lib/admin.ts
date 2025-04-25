import prisma from "./prisma";

export async function getTotalOpenJobsByCompanyId(
  companyId: string,
  startDate?: Date,
  endDate?: Date
) {
  try {
    const referenceDate = startDate || new Date();

    return await prisma.job.count({
      where: {
        companyId: companyId,
        deleted: false,
        OR: [
          { closingDate: null },
          {
            closingDate: {
              gte: referenceDate,
            },
          },
        ],
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting open jobs:", error);
    throw new Error("Failed to count open jobs due to database issue.");
  }
}

export async function getAdminDashboardData(
  startDate?: Date,
  endDate?: Date
) {
  try {
    const [
      totalApplications,
      jobOpen,
      applicationsSummary,
      jobView,
      companyJobs,
    ] = await Promise.all([
      getTotalApplicationsCountByCompanyId(companyId, startDate, endDate),
      getTotalOpenJobsByCompanyId(companyId, startDate, endDate),
      getJobsByType(companyId, startDate, endDate),
      getJobViewsCount(companyId, startDate, endDate),
      getLastJobsByCompanyId(companyId, 6, startDate, endDate),
    ]);

    return {
      totalApplications,
      jobOpen,
      applicationsSummary,
      jobView,
      companyJobs,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to load dashboard data due to database issue.");
  }
}
