import { Role } from "@prisma/client";

export type FileUploadModelName =
  | "candidateDocument"
  | "userProfileImage"
  | "companyProfileImage";

export interface FileUploadProps {
  allowedFileTypes: string[];
  uploadText: string;
  uploadingText?: string;
  successText?: string;
  apiRoute: string;
  modelName: FileUploadModelName;
  fieldName: string;
  maxSizeMB?: number;
  userId: string;
  onUploadComplete: (fileKey: string, file: File) => void | Promise<void>;
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileDisplayProps {
  modelName: "candidateDocument" | "userProfileImage" | "companyProfileImage";
  userId: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackImage?: string;
}

export interface User {
  image_url: string;
  id: string;
  email: string;
  role: Role;
  company?: Company;
}

export interface Job {
  title: string;
  description: string;
  location?: string;
  skills: string[];
  level?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
  categories?: string;
  responsibilities?: string;
  whoYouAre?: string;
  niceToHave?: string;
  benefits?: string[];
  closingDate?: Date;
  companyId: string;
}

export interface Company {
  name: string;
  bio?: string;
  jobs?: Job[];
}

export interface Candidate {
  userId: string;
  firstName: string;
  lastName: string;
  skills?: string[];
  resume?: string;
  bio?: string;
  website?: string;
}

export interface Application {
  id?: string;
  jobId: string;
  candidateId: string;
  status?: string;
  appliedAt?: string;
}
