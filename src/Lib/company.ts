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
    return await prisma.company.findFirst({
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

export async function getCompanyCount(startDate?: Date, endDate?: Date) {
  try {
    return await prisma.company.count({
      where: {
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting company:", error);
    throw new Error("Failed to count company due to database issue.");
  }
}

export async function getAllCompanies(
  startDate?: Date,
  endDate?: Date,
  searchTerm?: string
) {
  try {
    return await prisma.company.findMany({
      where: {
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
        ...(searchTerm && {
          OR: [
            {
              name: { contains: searchTerm, mode: "insensitive" },
            },
          ],
        }),
      },
    });
  } catch (error) {
    console.error("Error getting candidates:", error);
    throw new Error("Failed to get candidates due to database issue.");
  }
}

