interface Ijobs {
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
  applications: IApplications[];
  createdAt: string;
  updatedAt: string;
  user: IUsers;
  status: "OPEN" | "CLOSED";
}

interface IJobsState {
  jobs: Ijobs[];
  loading: boolean;
  error: string | null;
}

interface ICompanyJobsState {
  jobs: Ijobs[];
  loading: boolean;
  error: string | null;
}

interface IUsers {
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
  application?: IApplications[];
  createdAt?: string;
  updatedAt?: string;
}

interface IUserState {
  users: IUsers[];
  loading: boolean;
  error: string | null;
}

interface IApplications {
  id: string;
  jobId: string;
  candidateId: string;
  status?: "PENDING" | "INTERVIEWED" | "REJECTED";
  updatedAt?: string;
  appliedAt: string;
  candidate?: ICandidate;
  job?: Ijobs;
}

interface IApplicationsState {
  applications: IApplications[];
  loading: boolean;
  error: string | null;
}

interface ICandidate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  skills: string[];
  resume?: string;
  bio?: string;
  website?: string;
  applications: IApplications[];
}

interface ICandidateState {
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

interface IApplicationByIdState {
  application?: IApplications;
  loading: boolean;
  error: string | null;
}

export type {
  Ijobs,
  IJobsState,
  ICompanyJobsState,
  IUsers,
  IUserState,
  IApplications,
  IApplicationsState,
  ICandidate,
  ICandidateState,
  IApplicationByIdState
};
