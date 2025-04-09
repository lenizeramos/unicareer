import prisma from "./prisma";
import { Application } from "../types/index";

export async function createApplication(data: Application) {
  console.log(data);
  try {
    return await prisma.application.create({
      data: {
        jobId: data.jobId,
        candidateId: data.candidateId,
      },
    });
  } catch (error) {
    console.log("Error creating application:", error);
    throw new Error("Application failed due to database issue.");
  }
}
