import prisma from "./prisma";
import { Role } from "@prisma/client";

export interface User {
  image_url: string;
  id: string;
  email: string;
  role: Role;
}

export interface CandidateData {
  firstName: string;
  lastName: string;
  skills?: string[]
  resume?: string;
  bio?: string;
}

export async function createUserAndCandidate(data: User & CandidateData) {
  console.log(data, "data");

  const user = await prisma.user.create({
    data: {
      clerkId: data.id,
      email: data.email || "",
      photo: data.image_url || "",
      role: data.role,
    },
  });

  const candidate = await prisma.candidate.create({
    data: {
      userId: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      skills: data.skills,
      resume: data.resume,
      bio: data.bio,
    },
  });

  return { user, candidate };
}