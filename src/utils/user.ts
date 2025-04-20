import { auth } from "@clerk/nextjs/server";

export const getClerkUserId = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Authentication check failed.");
    }

    return userId;
  } catch (error) {
    console.error("Failed to retrieve Clerk user ID:", error);
    throw new Error("Authentication check failed. Please try again.");
  }
};
