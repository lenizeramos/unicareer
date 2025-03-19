import prisma from "./prisma";

interface JobPost {
  title: string;
  description?: string;
  /* salary?: string;
  type?: string;
  skills?: string[]; */
  companyId: string;
}
export async function createJobPost(data: JobPost) {
  try {
    return await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
       /*  salary: data.salary,
        type: data.type,
        skills: data.skills, */
        companyId: data.companyId,
      },
    });
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Job creation failed due to database issue.");
  }
}
