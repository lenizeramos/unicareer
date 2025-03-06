import { auth } from "@clerk/nextjs/server";
export const getUser = async () => {
  const { userId } = await auth();
  return userId;
};
