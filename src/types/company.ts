import { Job } from "@prisma/client";
export interface Company {
    name: string;
    bio?: string;
    jobs?: Job[];
  }