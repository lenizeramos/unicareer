import prisma from "./prisma";
import { Job } from "../types/index";

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

export async function getJobByCompanyId(companyId: string) {
  try {
    const jobs = await prisma.job.findMany({
      where: { companyId: companyId },
      orderBy: { createdAt: "desc" },
      include: {
        applications: {
          include: {
            candidate: {
              include: { user: true },
            },
          },
        },
      },
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

export async function getJobViewsCount(companyId: string, startDate?: Date, endDate?: Date) {
  try {
    return await prisma.jobView.count({
      where: {
        job: {
          companyId: companyId,
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
    return await prisma.job.findUnique({
      where: { id: jobId },
    });
  } catch (error) {
    console.error("Error checking job existence:", error);
    throw new Error("Failed to check job existence due to database issue.");
  }
}