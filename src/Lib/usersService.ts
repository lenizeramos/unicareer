import prisma from "./prisma";
import { User, Candidate, Company } from "../types/index";

async function createUser(data: User) {
  try {
    return await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email || "",
        photo: data.image_url || "",
        role: data.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed due to database issue.");
  }
}

async function createCandidate(data: Candidate, userId: string) {
  try {
    return await prisma.candidate.create({
      data: {
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        skills: data.skills || [],
        resume: data.resume,
        bio: data.bio,
        website: data.website,
        education: data.education?.length ? {
          createMany: {
            data: data.education.map(edu => ({
              institution: edu.institution,
              degree: edu.degree,
              fieldOfStudy: edu.fieldOfStudy,
              country: edu.country,
              startDate: new Date(edu.startDate),
              endDate: edu.endDate && edu.endDate !== 'Present' ? new Date(edu.endDate) : null,
              current: edu.endDate === 'Present',
              description: edu.description
            }))
          }
        } : undefined,
        workExperience: data.workExperience?.length ? {
          createMany: {
            data: data.workExperience.map(exp => ({
              company: exp.company,
              position: exp.position,
              country: exp.country,
              startDate: new Date(exp.startDate),
              endDate: exp.endDate && exp.endDate !== 'Present' ? new Date(exp.endDate) : null,
              current: exp.endDate === 'Present',
              description: exp.description
            }))
          }
        } : undefined,
        languages: data.languages?.length ? {
          createMany: {
            data: data.languages
          }
        } : undefined
      },
      include: {
        education: true,
        workExperience: true,
        languages: true
      }
    });
  } catch (error) {
    console.error("Error creating candidate profile:", error);
    throw new Error("Candidate creation failed.");
  }
}

async function createCompany(data: Company, userId: string) {
  try {
    return await prisma.company.create({
      data: {
        userId,
        name: data.name,
        bio: data.bio,
      },
    });
  } catch (error) {
    console.error("Error creating company profile:", error);
    throw new Error("Company creation failed.");
  }
}

export async function createUserAndCandidate(data: any) {
  return await prisma.user.create({
    data: {
      clerkId: data.id,
      email: data.email,
      role: data.role,
      candidate: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
          skills: data.skills || [],
          bio: data.bio,
          website: data.website,
          ...(data.education?.length && {
            education: {
              createMany: {
                data: data.education.map((edu: any) => ({
                  institution: edu.institution,
                  degree: edu.degree,
                  fieldOfStudy: edu.fieldOfStudy,
                  country: edu.country,
                  startDate: new Date(edu.startDate),
                  endDate: edu.endDate && edu.endDate !== 'Present' ? new Date(edu.endDate) : null,
                  current: edu.endDate === 'Present',
                  description: edu.description
                }))
              }
            }
          }),
          ...(data.workExperience?.length && {
            workExperience: {
              createMany: {
                data: data.workExperience.map((exp: any) => ({
                  company: exp.company,
                  position: exp.position,
                  country: exp.country,
                  startDate: new Date(exp.startDate),
                  endDate: exp.endDate && exp.endDate !== 'Present' ? new Date(exp.endDate) : null,
                  current: exp.endDate === 'Present',
                  description: exp.description
                }))
              }
            }
          }),
          ...(data.languages?.length && {
            languages: {
              createMany: {
                data: data.languages.map((lang: any) => ({
                  name: lang.name,
                  level: lang.level
                }))
              }
            }
          })
        }
      }
    },
    include: {
      candidate: {
        include: {
          education: true,
          workExperience: true,
          languages: true
        }
      }
    }
  });
}

export async function updateCandidate(data: Candidate) {
  try {
    return await prisma.candidate.update({ 
      where: { userId: data.userId }, 
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        skills: data.skills,
        bio: data.bio,
        website: data.website
      }
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw new Error("Failed to update candidate profile. Please try again.");
  }
}

export async function createUserAndCompany(data: User & Company) {
  try {
    const user = await createUser(data);
    const company = await createCompany(data, user.id);
    return { user, company };
  } catch (error) {
    console.error("Error creating user and company:", error);
    throw new Error("Failed to create company profile. Please try again.");
  }
}

export async function getUserByClerkId(clerkId: string | undefined) {
  if (!clerkId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        company: true,
        candidate: true,
        profileImage: true,
      },
    });

    if (!user) {
      console.error(`User not found for Clerk ID: ${clerkId}`);
      return null;
    }

    return user;
  } catch (error) {
    console.error(
      `Error fetching user for Clerk ID: ${clerkId}`,
      error
    );
    return null;
  }
}

export async function waitForUserRole(clerkId: string | undefined, expectedRole: string, maxAttempts = 10): Promise<boolean> {
  if (!clerkId) {
    console.error("Clerk ID is missing or undefined");
    return false;
  }

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId },
        select: { role: true }
      });

      if (user?.role === expectedRole) {
        return true;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error checking role for Clerk ID ${clerkId}:`, error);
    }
  }

  return false;
}

