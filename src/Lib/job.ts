import prisma from "./prisma";
import { Job } from "../types/job";

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
