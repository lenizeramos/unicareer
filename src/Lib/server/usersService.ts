import prisma from "../prisma";
import { User, Candidate, Company } from "../../types/index";
import { Role } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email || "",
        photo: data.image_url || "",
        role: data.role,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed due to database issue.");
  }
}

export async function createCandidate(data: Candidate, userId: string) {
  try {
    return await prisma.candidate.create({
      data: {
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        skills: data.skills || [],
        resume: data.resume,
        bio: data.bio,
        education: data.education?.length ? {
          createMany: { data: data.education.map(edu => ({
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            country: edu.country,
            startDate: new Date(edu.startDate),
            endDate: edu.endDate && edu.endDate !== 'Present' ? new Date(edu.endDate) : null,
            current: edu.endDate === 'Present',
            description: edu.description
          }))}
        } : undefined,
        workExperience: data.workExperience?.length ? {
          createMany: { data: data.workExperience.map(exp => ({
            company: exp.company,
            position: exp.position,
            country: exp.country,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate && exp.endDate !== 'Present' ? new Date(exp.endDate) : null,
            current: exp.endDate === 'Present',
            description: exp.description
          }))}
        } : undefined,
        languages: data.languages?.length ? {
          createMany: { data: data.languages }
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

export async function createCompany(data: Company, userId: string) {
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

export async function updateCandidate(data: Candidate) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: data.userId },
      include: { candidate: true }
    });


    if (!user?.candidate) {
      throw new Error("Candidate not found");
    }

    return await prisma.candidate.update({
      where: { id: user.candidate.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        skills: data.skills,
        bio: data.bio,
      }
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw new Error("Failed to update candidate profile. Please try again.");
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkId },
      include: {
        candidate: true,
        company: true,
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function checkUserRole(clerkId: string, expectedRole: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { role: true }
    });
    return user?.role === expectedRole;
  } catch (error) {
    console.error(`Error checking role for Clerk ID ${clerkId}:`, error);
    return false;
  }
}

export async function updateCompany(data: {
  userId: string;
  name: string;
  bio?: string;
  logo?: string;
}) {
  try {
    return await prisma.company.update({
      where: { userId: data.userId },
      data: {
        name: data.name,
        bio: data.bio,
      }
    });
  } catch (error) {
    console.error("Error updating company:", error);
    throw new Error("Failed to update company profile");
  }
}

export async function setUserRole(clerkId: string, role: string) {
    try {
      const clerk = await clerkClient(); 
  
      await clerk.users.updateUserMetadata(clerkId, {
        publicMetadata: { role: role.toLowerCase() },
      });
  
      return await prisma.user.update({
        where: { clerkId },
        data: {
          role: role.toUpperCase() as Role,
        },
      });
    } catch (error) {
      console.error("Error setting user role:", error);
      throw new Error("Failed to set user role");
    }
  }

