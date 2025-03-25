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