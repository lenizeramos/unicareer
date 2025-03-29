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
  createdAt: string;
  updatedAt: string;
}

interface IJobsState {
  jobs: Ijobs[];
  loading: boolean;
  error: string | null;
}

interface IUsers {
  id: string;
  userId: string;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserState {
  users: IUsers[];
  loading: boolean;
  error: string | null;
}

export type { Ijobs, IJobsState, IUsers, IUserState };
