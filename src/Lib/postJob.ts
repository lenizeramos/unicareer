import prisma from "./prisma";

interface JobPost {
  title: string;
  description: string;
  location?: string;
  skills: string[];
  level?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
  categories?: string;
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
