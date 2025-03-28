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

interface IDataState {
  data: Ijobs[];
  loading: boolean;
  error: string | null;
}

export type { Ijobs, IDataState };
