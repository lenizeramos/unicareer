import prisma from "./prisma";
import { Application, ApplicationStatus } from "@prisma/client";

export async function createApplication(data: Application) {
  try {
    return await prisma.application.create({
      data: {
        jobId: data.jobId,
        candidateId: data.candidateId,
      },
    });
  } catch (error) {
    console.error(`Error creating application:`, error);
    throw new Error("Failed to submit application.");
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
    console.error(`Error fetching application:`, error);
    throw new Error("Failed to retrieve application details.");
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
          deleted: false,
        },
        appliedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  } catch (error) {
    console.error("Error counting applications:", error);
    throw new Error(
      "Failed to retrieve total applications due to database issue."
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
          deleted: false,
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
    throw new Error("Failed to retrieve applications due to database issue.");
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
    console.error(`Error updating status:`, error);
    throw new Error("Failed to update application status.");
  }
}

export async function deleteApplication(id: string) {
  try {
    return await prisma.application.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting application:`, error);
    throw new Error("Failed to delete application.");
  }
}

export async function updateApplicationStatusToCancelledJob(id: string) {
  try {
    return await prisma.application.updateMany({
      where: {
        job: {
          id: id,
        },
      },
      data: {
        status: "CANCELLED_JOB",
      },
    });
  } catch (error) {
    console.error(`Error updating applications to CANCELLED_JOB:`, error);
    throw new Error("Failed to update applications status.");
  }
}

export async function getApplicationsCountByJobId(id: string) {
  try {
    return await prisma.application.count({
      where: { jobId: id },
    });
  } catch (error) {
    console.error(`Error counting applications:`, error);
    throw new Error("Failed to retrieve applications count.");
  }
}
