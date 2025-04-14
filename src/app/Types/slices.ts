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
  benefits: string | string[];
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

export interface ICompanyJobsState {
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
  website?: string;
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
  status?: "PENDING" | "INTERVIEWED" | "REJECTED";
  updatedAt?: string;
  appliedAt: string;
  candidate?: ICandidate;
  job?: Ijobs;
}

export interface IApplicationsState {
  applications: IApplication[];
  loading: boolean;
  error: string | null;
}

export interface ICandidate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  skills: string[];
  resume?: string;
  bio?: string;
  website?: string;
  applications: IApplication[];
  user?: IUsers;
  education?: IEducation[];
  workExperience?: IWorkExperience[];
  language?: ILanguage[];
}

export interface ICandidateState {
  candidate: ICandidate;
  loading: boolean;
  error: string | null;
}

interface ICompany {
  id: string;
  userId: string;
  name:string;
  bio?: string;
  profileImages?: {
    id: string;
    fileKey: string;
    fileType: string;
    fileName: string;
  }[];
}

export interface IApplicationByIdState {
  application?: IApplication;
  loading: boolean;
  error: string | null;
}

export interface IEducation {
  id: string;
  candidateId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  country: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWorkExperience {
  id: string;
  candidateId: string;
  company: string;
  position: string;
  country: string;
  startDate: string;
  endDate?: string; 
  current?: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILanguage {
  id: string;
  candidateId: string;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "NATIVE";
  createdAt: string;
  updatedAt: string;
}
