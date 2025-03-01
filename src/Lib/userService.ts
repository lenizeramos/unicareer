import prisma from "./prisma";

export interface ClerkUserCreatedEvent {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}

export async function storeUser(data: ClerkUserCreatedEvent) {
  const user = {
    clerkId: data.clerkId,
    email: data.email,
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    photo: data.photo || "",
    updatedAt: new Date(),
  };

  return prisma.user.upsert({
    where: { clerkId: user.clerkId },
    update: {
      clerkId: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      updatedAt: new Date(),
    },
    create: {
      clerkId: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "",
      role: "CANDIDATE",
      photo: user.photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
