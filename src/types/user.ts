import { Role } from "@prisma/client";
export interface User {
    image_url: string;
    id: string;
    email: string;
    role: Role;
  }