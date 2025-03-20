import prisma from "./prisma";

interface JobPost {
  title: string;
  description: string;
  location?: string;
  skills: string[];
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  responsibilities?: string;
  whoYouAre?: string;
  niceToHave?: string;
  benefits?: string[];
  closingDate?: string;
  companyId: string;
}
export async function createJobPost(data: JobPost) {
  try {
    return await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        skills: data.skills,
        jobType: data.jobType,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
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
