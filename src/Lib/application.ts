import prisma from "./prisma";
import { Application } from "@prisma/client";
import { ApplicationStatus } from "@prisma/client";

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

export async function getTotalApplicationsCountByCompanyId(
  companyId: string,
  startDate?: Date,
  endDate?: Date
) {
  try {
    return await prisma.application.count({
      where: {
        job: {
          companyId: companyId,
        },
        appliedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching total applications:", error);
    throw new Error(
      "Failed to fetch total applications due to database issue."
    );
  }
}

export async function getApplicationsByCompanyId(
  companyId: string,
  startDate?: Date,
  endDate?: Date,
  searchTerm?: string
) {
  try {
    let matchedStatus;
    if (searchTerm) {
      matchedStatus = ["PENDING", "INTERVIEWED", "REJECTED"].find((status) =>
        status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const applications = await prisma.application.findMany({
      where: {
        job: {
          companyId,
        },
        appliedAt: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
        ...(searchTerm && {
          OR: [
            {
              status: matchedStatus as ApplicationStatus,
            },
            {
              candidate: {
                firstName: { contains: searchTerm, mode: "insensitive" },
              },
            },
            {
              candidate: {
                lastName: { contains: searchTerm, mode: "insensitive" },
              },
            },
            {
              candidate: {
                user: {
                  email: { contains: searchTerm, mode: "insensitive" },
                },
              },
            },
            {
              job: {
                title: { contains: searchTerm, mode: "insensitive" },
              },
            },
          ],
        }),
      },
      include: {
        candidate: {
          include: {
            user: true,
          },
        },
        job: true,
      },
    });

    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications due to database issue.");
  }
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
) {
  try {
    return await prisma.application.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    throw new Error("Application update failed due to database issue." + error);
  }
}
export async function deleteApplication(id: string) {
  try {
    return await prisma.application.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(
      "Application deletion failed due to database issue." + error
    );
  }
}
