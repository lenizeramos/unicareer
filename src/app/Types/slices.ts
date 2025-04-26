import { IJob } from ".";

export interface Ijobs {
  id: string;
  title: string;
  description: string;
  location: string;
  skills: string | string[];
  companyId: string;
  level: string;
  type: string;
  categories: string | string[];
  salaryMin: number;
  salaryMax: number;
  responsibilities: string;
  whoYouAre: string;
  niceToHave: string;
  benefits: string[];
  closingDate: string;
  company?: ICompany;
  applications: IApplication[];
  createdAt: string;
  updatedAt: string;
  user: IUsers;
  status: "OPEN" | "CLOSED";
}

export interface IJobsState {
  jobs: Ijobs[];
  loading: boolean;
  error: string | null;
}

export interface IUsers {
  id?: string;
  clerkId?: string;
  email?: string;
  role?: "ADMIN" | "COMPANY" | "CANDIDATE";
  photo?: string;
  userId?: string;
  name?: string;
  bio?: string;
  firstName?: string;
  lastName?: string;
  skills?: string[];
  resume?: string;
  streetAddress?: string;
  city?: string;
  province?: string;
  country?: "CANADA";
  postalCode?: string;
  website?: string;
  linkedIn?: string;
  twitter?: string;
  jobs?: Ijobs[];
  application?: IApplication[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserState {
  users: IUsers[];
  loading: boolean;
  error: string | null;
}

export interface IApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: "PENDING" | "INTERVIEWED" | "REJECTED" | "HIRED" | "CANCELLED_JOB";
  updatedAt?: string;
  appliedAt: string;
  candidate?: ICandidate;
  job?: Ijobs;
  compatibility?: {
    score: number;
    feedback: string;
    recommendation: string;
  };
}

export interface IApplicationsState {
  applications: IApplication[];
  loading: boolean;
  error: string | null;
}

export interface ICandidate {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  skills?: string[];
  resume?: string;
  bio?: string;
  /* website?: string; */
  applications?: IApplication[];
  user?: IUsers;
  education?: IEducation[];
  workExperience?: IWorkExperience[];
  languages?: ILanguage[];
  /* phone?: string; */
  /* instagram?: string;
  twitter?: string;
  address?: string; */
}

export interface ICandidateState {
  candidate?: ICandidate;
  loading: boolean;
  error: string | null;
}

export interface ICompany extends IUsers{
  id: string;
  userId: string;
  name: string;
  bio?: string;
  size?: string;
  industry?: string;
  foundedYear?: string;
  toolsAndTechnologies?: string[];
  benefits?: string[];
  profileImages?: {
    id: string;
    fileKey: string;
    fileType: string;
    fileName: string;
  }[];
}

export interface ICompanyState {
  company?: ICompany;
  loading: boolean;
  error: string | null;
}

export interface IEducation {
  id?: string;
  candidateId?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  country: string;
  startDate?: Date;
  endDate?: Date | null;
  current?: boolean;
  description?: string;
}

export interface IWorkExperience {
  id?: string;
  candidateId?: string;
  company: string;
  position: string;
  country: string;
  startDate?: Date;
  endDate?: Date | null;
  current?: boolean;
  description?: string;
}

export interface ILanguage {
  id?: string;
  candidateId?: string;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "NATIVE";
}

export interface IJobToEditState {
  jobToEdit: IJob | null;
}
