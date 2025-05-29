import prisma from "./prisma";
import { Job } from "../types/index";
import { getCompanyByClerkId } from "@/Lib/company";

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
  endDate?: Date,
  skip?: number,
  take?: number
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
      skip: skip,
      take: take
    });

    const jobsWithStatus = jobs.map((job) => ({
      ...job,
      status:
        job.closingDate && job.closingDate > new Date() ? "OPEN" : "CLOSED",
    }));
    return jobsWithStatus;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to retrieve jobs due to database issue.");
  }
}

export async function getTotalJobByCompanyId(
  companyId: string,
  startDate?: Date,
  endDate?: Date
) {
  try {
    const totalJobs = await prisma.job.count({
      where: {
        companyId: companyId,
        deleted: false,
        createdAt: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      },
    });

    return totalJobs;
  } catch (error) {
    console.error("Error fetching jobs count:", error);
    throw new Error("Failed to retrieve jobs count due to database issue.");
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

export async function getRecentJobs(
  limit?: number,
  startDate?: Date,
  endDate?: Date,
  searchTerm?: string,
  searchLocation?: string,
) {
  try {
    const referenceDate = startDate || new Date();
    const jobs = await prisma.job.findMany({
      where: {
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
        ...(searchTerm && {
          OR: [
            {
              title: { contains: searchTerm, mode: "insensitive" },
            },
          ],
        }),
        ...(searchLocation && {
          OR: [
            {
              location: { contains: searchTerm, mode: "insensitive" },
            },
          ],
        }),
      },
      select: {
        title: true,          
        createdAt: true,  
        type: true,  
        location: true,   
        company: {          
          select: {
            name: true,
            userId: true,
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return jobs;
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
    throw new Error("Failed to record job view due to database issue.");
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
    throw new Error(
      "Failed to retrieve job views count due to database issue."
    );
  }
}

export async function getJobById(jobId: string) {
  try {
    const job = await prisma.job.findFirst({
      where: { 
        id: jobId,
        deleted: false 
      },
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
    console.error("Error fetching job:", error);
    throw new Error("Failed to retrieve job details due to database issue.");
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
    console.error("Error counting open jobs:", error);
    throw new Error("Failed to count open jobs due to database issue.");
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

    jobTypesFromDB.forEach(({ type, _count }: { type: string | null; _count: { type: number } }) => {
      if (type && allJobTypes.includes(type.toLowerCase())) {
        result[type.toLowerCase()] = _count.type;
      }
    });

    return result;
  } catch (error) {
    console.error("Error fetching jobs by type:", error);
    throw new Error("Failed to retrieve jobs by type due to database issue.");
  }
}

export async function softDeleteJobById(id: string) {
  try {
    return await prisma.job.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error soft-deleting job", error);
    throw new Error("Failed to delete job due to database issue.");
  }
}

export async function updateJobById(id: string, data: Job) {
  try {
    return await prisma.job.update({
      where: { id },
      data: data,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job due to database issue.");
  }
}

export async function updateClosingDateJobById(id: string, closingDate: Date) {
  try {
    return await prisma.job.update({
      where: { id },
      data: {
        closingDate: new Date(closingDate),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating closing date:", error);
    throw new Error("Failed to update job closing date due to database issue.");
  }
}

export async function canManageJob(clerkId: string, targetId: string) {

  try {
    const loggedInCompany = await getCompanyByClerkId(clerkId);

    if (!loggedInCompany?.id) {
      return false;
    }
    const loggedCompanyId = loggedInCompany.id;

    const targetJob = await getJobById(targetId);

    if (!targetJob) {
      return false;
    }
    const targetCompanyId = targetJob.companyId;

    return loggedCompanyId === targetCompanyId;
  } catch (error) {
    console.error("Error checking management permissions:", error);
    throw new Error(
      "Failed to verify job management permissions. Please try again later."
    );
  }
}

export async function getJobsCount(startDate?: Date, endDate?: Date) {
  try {
    return await prisma.job.count({
      where: {
        deleted: false,
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
    });
  } catch (error) {
    console.error("Error counting jobs:", error);
    throw new Error("Failed to count jobs due to database issue.");
  }
}

export async function getJobsWithHiredApplicationsCount(
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.job.count({
      where: {
        applications: {
          some: {
            status: "HIRED",
            ...(startDate && { appliedAt: { gte: startDate } }),
            ...(endDate && { appliedAt: { lte: endDate } }),
          },
        },
      },
    });
  } catch (error) {
    console.error("Error counting jobs with hired applications:", error);
    throw new Error("Failed to count jobs with hired applications.");
  }
}


export async function getCountByJobCategory() {
  try {
   
   const result = await prisma.job.groupBy({
      by: ['categories'],
      _count: {
        categories: true,
      },
      where: {
        deleted: false,
      },
    });

    return result.reduce((acc, item) => {
      if (item.categories) {
        const key = item.categories;
        acc[key] = item._count.categories;
      }
      return acc;
    }, {} as Record<string, number>);

  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs due to database issue.");
  }
}