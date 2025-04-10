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
  applications: IApplicants[];
  createdAt: string;
  updatedAt: string;
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
  application?: IApplicants[];
  createdAt?: string;
  updatedAt?: string;
}

interface IUserState {
  users: IUsers[];
  loading: boolean;
  error: string | null;
}

interface IApplicants {
  id: string;
  jobId: string;
  candidateId: string;
  status: "PENDING" | "INTERVIEWED" | "REJECTED";
  applyedAt: string;
  updatedAt?: string;
}

interface IApplicantsState {
  applicants: IApplicants[];
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
  applications: IApplicants[];
}

interface ICandidateState {
  candidate: ICandidate;
  loading: boolean;
  error: string | null;
}

// interface ICompany {
//   id: string;
//   userId: string;
//   firstName: string;
//   lastName: string;
//   skills?: string[];
//   resume?: string;
//   bio?: string;
//   website?: string;
//   Application: IApplicants[];
// }

// interface ICompanyState {
//   company: ICompany[];
//   loading: boolean;
//   error: string | null;
// }

export type {
  Ijobs,
  IJobsState,
  ICompanyJobsState,
  IUsers,
  IUserState,
  IApplicants,
  IApplicantsState,
  ICandidate,
  ICandidateState,
};
