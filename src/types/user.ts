import { Role, Company } from "@prisma/client";
export interface User {
    image_url: string;
    id: string;
    email: string;
    role: Role;
    company: Company;
  }