import prisma from "./prisma";
import { Role } from "@prisma/client";

export interface User {
  image_url: string;
  id: string;
  email: string;
  role: Role;
}

export async function createUser(data: User) {
  console.log(data, "data");

  const user = {
    clerkId: data.id,
    email: data.email || "",
    photo: data.image_url || "",
    role: data.role,
  };

  console.log(user, "user");

  return prisma.user.create({
    data: user,
  });
}
