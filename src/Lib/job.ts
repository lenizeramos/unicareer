import prisma from "./prisma";
import { Job } from "../types/index";
import { getTotalApplicationsCountByCompanyId } from "./application";

export async function createJob(data: Job) {
  try {
    return await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        skills: data.skills,
        level: data.level,
        type: data.type,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        categories: data.categories,
        responsibilities: data.responsibilities,
        whoYouAre: data.whoYouAre,
        niceToHave: data.niceToHave,
        benefits: data.benefits,
        closingDate: data.closingDate,
        companyId: data.companyId,
      },
    });
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Job creation failed due to database issue.");
  }
}

export async function getJobByCompanyId(
  companyId: string,
  startDate?: Date,
  endDate?: Date
) {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        companyId: companyId,
        deleted: false,
        createdAt: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const jobsWithStatus = jobs.map((job) => ({
      ...job,
      status:
        job.closingDate && job.closingDate > new Date() ? "OPEN" : "CLOSED",
    }));
    return jobsWithStatus;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs due to database issue.");
  }
}

export async function getLastJobsByCompanyId(
  companyId: string,
  limit?: number,
  startDate?: Date,
  endDate?: Date
) {
  try {
    const referenceDate = startDate || new Date();
    const jobs = await prisma.job.findMany({
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
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const jobsWithStatus = jobs.map((job) => ({
      ...job,
      status:
        job.closingDate && job.closingDate > new Date() ? "OPEN" : "CLOSED",
    }));
    return jobsWithStatus;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs due to database issue.");
  }
}

export async function createJobView(jobId: string, candidateId: string) {
  try {
    return await prisma.jobView.upsert({
      where: {
        jobId_candidateId: {
          jobId,
          candidateId,
        },
      },
      create: {
        jobId,
        candidateId,
      },
      update: {},
    });
  } catch (error) {
    console.error("Error creating job view:", error);
    throw new Error("Job view creation failed due to database issue.");
  }
}

export async function getJobViewsCount(
  companyId: string,
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.jobView.count({
      where: {
        job: {
          companyId: companyId,
          deleted: false,
        },
        viewedAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching job views count:", error);
    throw new Error("Failed to fetch job views count due to database issue.");
  }
}

export async function getJobById(jobId: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId, deleted: false },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
    if (!job) {
      return null;
    }
    const jobWithExtras = {
      ...job,
      totalApplications: job._count.applications,
      status:
        job.closingDate && job.closingDate > new Date() ? "OPEN" : "CLOSED",
    };

    return jobWithExtras;
  } catch (error) {
    console.error("Error checking job existence:", error);
    throw new Error("Failed to check job existence due to database issue.");
  }
}

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
    console.error("Error fetching total open jobs:", error);
    throw new Error("Failed to fetch total open jobs due to database issue.");
  }
}

export async function getJobsByType(
  companyId: string,
  startDate?: Date,
  endDate?: Date
) {
  try {
    const jobTypesFromDB = await prisma.job.groupBy({
      by: ["type"],
      where: {
        companyId: companyId,
        deleted: false,
        applications: {
          some: {
            appliedAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      _count: {
        type: true,
      },
    });

    const allJobTypes = [
      "full-time",
      "part-time",
      "remote",
      "internship",
      "contract",
      "freelance",
    ];

    const result: Record<string, number> = {};
    allJobTypes.forEach((type) => {
      result[type] = 0;
    });

    jobTypesFromDB.forEach(({ type, _count }) => {
      if (type && allJobTypes.includes(type.toLowerCase())) {
        result[type.toLowerCase()] = _count.type;
      }
    });

    return result;
  } catch (error) {
    console.error("Error fetching jobs by type:", error);
    throw new Error("Failed to fetch jobs by type due to database issue.");
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
    throw new Error("Failed to fetch dashboard data due to database issue.");
  }
}
