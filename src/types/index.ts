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
  userEmail?: string;
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
  logo?: string;
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
  deleted: boolean;
  deletedAt: Date;
}

export interface Company {
  id?: string;
  name: string;
  bio?: string;
  jobs?: Job[];
  logo?: string;
}

export interface Candidate {
  userId: string;
  firstName: string;
  lastName: string;
  skills: string[];
  resume?: string;
  bio?: string;
  education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    country: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    current?: boolean;
    description?: string;
  }>;
  workExperience?: Array<{
    company: string;
    position: string;
    country: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    current?: boolean;
    description?: string;
  }>;
  languages?: Array<{
    name: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  }>;
}

export interface Application {
  id?: string;
  jobId: string;
  candidateId: string;
  status?: string;
  appliedAt?: string;
}
