import prisma from "./prisma";
import { getTotalApplicationsCountByCompanyId } from "./application";
import {
  getTotalOpenJobsByCompanyId,
  getJobsByType,
  getJobViewsCount,
  getLastJobsByCompanyId,
} from "./job";

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
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching company data:`, error);
    throw new Error("Failed to retrieve company information.");
  }
}

export async function getCompanyDashboardData(
  companyId: string,
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
