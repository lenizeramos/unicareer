import { auth } from "@clerk/nextjs/server";
export const getClerkUserId = async () => {
  const { userId } = await auth();
  return userId;
};
