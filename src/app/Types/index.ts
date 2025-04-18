/* import { ResumeData } from "@/types/resume"; */
import React from "react";
import { IApplication } from "./slices";

export interface IButtton {
  text: string | React.ReactNode;
  IsWhite: boolean;
  width?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isDissable?: boolean;
}

export interface ILogo {
  logoSize?: number;
  fontSize?: string;
}

export interface ICardId extends Omit<ICards, "cardId"> {
  cardId:
    | "category"
    | "perks"
    | "dashboardCard"
    | "featuredJob"
    | "jobUpdates"
    | "latestJob"
    | "openPositions"
    | "allJobs"
    | "recentApply"
    | "recentPosted";
  params?: ICards[];
}

export interface ICards {
  icon?: React.ElementType;
  subicons?: React.ElementType;
  cardId?: string;
  logo?: string;
  id?: string;
  title?: string;
  description?: string;
  location?: string;
  skills?: string[] | string;
  level?: string;
  type?: string;
  categories?: string[] | string;
  salaryMin?: number;
  salaryMax?: number;
  responsibilities?: string;
  whoYouAre?: string;
  niceToHave?: string;
  // benefits?: { icon: React.ElementType; title: string; text: string }[];
  benefits?: string[] | string;
  companyname?: string;
  companyId?: string;
  closingDate?: string;
  createdAt?: string;
  applicationsCount?: number;
  subtitle?: string;
  text?: string;
  alt?: string;
  progress?: string;
  total?: number;
  date?: string;
}

export interface IProgressBarProps {
  totalLength: number;
  value: number;
}

export interface ITagComp {
  bgColor?: string;
  textColor: string;
  text: string;
  borderColor?: string;
}

export interface IFilterJobs {
  array: string[] | { min: number; max: number }[];
  title: string;
  type: "jobType" | "category" | "jobLevel" | "salary";
  onFilterChange?: (
    key: string,
    value: string | { min: number; max: number }
  ) => void;
}

export interface ISummaryTable {
  columnNames: string[];
  data: {
    companyName: { name: string; logo: string };
    jobTitle: string;
    dateApplied: string;
    status: string;
  }[];
}

export interface IDashboardNavbar {
  title: string;
  backArrow?: boolean | string;
  button?: IButtton;
}

export interface IDashboardWelcome {
  greeting: string;
  message: string;
  date: string;
}

export interface ICompanyHeader {
  image: string;
  name: string;
  button?: IButtton;
}

export interface IJob {
  id?: string;
  title: string;
  status: string;
  location: string;
  level: string;
  categories: string;
  createdAt: string;
  closingDate: string;
  type: string;
}

export interface IJobList {
  jobs: IJob[];
  columns: { [key: string]: string };
}

export interface JobListProps extends IJobList {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export interface IPayment {
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  invoice?: string;
}

export interface IPaymentsList {
  payments: IPayment[];
  columns: { [key: string]: string };
}

export interface PaymentsListProps extends IPaymentsList {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export interface IBadge {
  status: string;
  color: string;
}

export interface IJobFormProps {
  onClick: (job: {
    title: string;
    closingDate: Date | null;
    level: string;
    type: string;
    salary: number[];
    categories: string;
    skills: string[];
    description: string;
    location: string;
    responsibilities: string;
    whoYouAre: string;
    niceToHave: string;
    benefits: string[];
  }) => void;
}

export interface ICompanyFormProps {
  onSubmit: (company: { name: string; logo: string | null; bio: string; userId: string }) => void;
}

export interface InputFieldProps {
  label: string;
  small?: string;
  id: string;
  name?: string;
  value?: string | number | null;
  minDate?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
  classNameField?: string;
  accept?: string;
  fileLabel?: string;
  filePreview?: React.ReactNode;
}

export interface ISalaryRangeSliderProps {
  label: string;
  small?: string;
  id: string;
  min: number;
  max: number;
  step: number;
  initialValues: number[];
  onChange: (values: number[]) => void;
  required?: boolean;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
}

export interface ISelectFieldProps {
  label: string;
  small?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
  classNameField?: string;
}
export interface ITextAreaFieldProps {
  label: string;
  small?: string;
  id: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
  classNameDivContainer?: string;
  classNameLabel?: string;
  classNameDivLgWidth?: string;
  classNameField?: string;
}

export interface IChipsFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  itemTemplate?: (item: string) => React.ReactNode;
  className?: string;
  labelClass?: string;
  containerClass?: string;
  helperText?: string;
}

export interface AuthFormProps {
  type: "sign-in" | "sign-up";
  role?: "company" | "candidate";
  onRoleChange?: (role: "company" | "candidate") => void;
}

export interface IApplicationProps {
  label: string;
  count: number;
}

export interface ITotalApplicationProps {
  applications: IApplicationProps[];
  totalApplications: number;
}

export interface IStatusCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  trend?: "up" | "down";
  percentage?: string;
}

export interface ICandidateFormProps {
  onSubmit: (data: {
    id?: string;
    firstName: string;
    lastName: string;
    photo: File | null;
    skills: string[];
    bio: string;
    education: Array<{
      institution: string;
      degree: string;
      fieldOfStudy: string;
      country: string;
      startDate: Date;
      endDate?: Date | null;
      current?: boolean;
      description?: string;
    }>;
    workExperience: Array<{
      company: string;
      position: string;
      country: string;
      startDate: Date;
      endDate?: Date | null;
      current?: boolean;
      description?: string;
    }>;
    languages: Array<{
      name: string;
      level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
    }>;
  }) => void;
  initialData?: any;
}

export interface IDashboardData {
  totalApplications: number;
  jobView: number;
  jobOpen: number;
  applicationsSummary: {
    label: string;
    count: number;
  }[];
  companyJobs: IJob[];
}

export interface ApplicationsListProps {
  applications: Application[];
  columns: { [key: string]: string };
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  onViewProfile?: (id: string) => void; 
}

export interface ApplicationsListTableProps {
  applications: IApplication[];
  columns: { [key: string]: string };
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  onViewProfile?: (id: string) => void; 
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface Application {
  id: string;
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  position: string;
  appliedDate: string;
  status: "PENDING" | "INTERVIEWED" | "REJECTED";
  linkedIn?: string;
  resume?: string;
}

export interface IContactInfoItemProps {
  icon: React.ReactNode;
  value: string;
}

export interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
}

export interface IStatusButtonProps {
  applicationId: string;
  currentStatus: string;
  targetStatus: string;
  label: string;
  setStatus: (status: string) => void;
}