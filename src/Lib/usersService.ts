import prisma from "./prisma";
import { User } from "../types/user";
import { Candidate } from "../types/candidate";
import { Company } from "../types/company";

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
        skills: data.skills,
        resume: data.resume,
        bio: data.bio,
      },
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

export async function createUserAndCandidate(data: User & Candidate) {
  try {
    const user = await createUser(data);
    const candidate = await createCandidate(data, user.id);

    return { user, candidate };
  } catch (error) {
    console.error("Error creating user and candidate:", error);
    throw error;
  }
}

export async function createUserAndCompany(data: User & Company) {
  try {
    const user = await createUser(data);
    const company = await createCompany(data, user.id);
    return { user, company };
  } catch (error) {
    console.error("Error creating user and company:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string | undefined) {
  if (!clerkId) {
    console.error("Clerk ID is missing or undefined");
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
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

