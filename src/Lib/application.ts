import prisma from "./prisma";
import { Application } from "../types/index";

export async function createApplication(data: Application) {
  try {
    return await prisma.application.create({
      data: {
        jobId: data.jobId,
        candidateId: data.candidateId,
      },
    });
  } catch (error) {
    throw new Error("Application failed due to database issue." + error);
  }
}

export async function getApplicationById(id: string) {
  try {
    return await prisma.application.findUnique({
      where: { id },
      include: {
        candidate: {
          include: {
            user: true,
            education: true,
            workExperience: true,
            languages: true,
            documents: true,
          },
        },
        job: true,
      },
    });
  } catch (error) {
    throw new Error("Application not found." + error);
  }
}