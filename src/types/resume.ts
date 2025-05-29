import { IUsers } from "@/app/Types/slices";

export interface ResumeData {
  id?: string;
  firstName: string;
  lastName: string;
  skills: string[];
  bio?: string;
  user?: IUsers;
  education?: EducationData[];
  workExperience?: WorkExperienceData[];
  languages?: LanguageData[];
}

export interface EducationData {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  country: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  description?: string;
}

export interface WorkExperienceData {
  company: string;
  position: string;
  country: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  description?: string;
}

export interface LanguageData {
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
}

export interface ResumeUploadResponse {
  fileKey: string;
  extractedData: ResumeData;
}

export interface ResumeProcessingError {
    message: string;
    code: 'UPLOAD_ERROR' | 'EXTRACTION_ERROR' | 'ANALYSIS_ERROR' | 'PROCESSING_ERROR';
  }