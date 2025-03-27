import React from "react";

interface IButtton {
  text: string | React.ReactNode;
  IsWhite: boolean;
  width?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface ILogo {
  logoSize?: number;
  fontSize?: string;
}

interface ICardId extends Omit<ICards, "cardId"> {
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

interface ICards {
  icon?: React.ElementType;
  subicons?: React.ElementType;
  title?: string;
  subtitle?: string;
  text?: string;
  logo?: string;
  alt?: string;
  category?: string;
  company?: string;
  type?: string;
  date?: string;
  progress?: string;
  total?: number;
  cardId: string;
}

interface IProgressBarProps {
  totalLength: number;
  value: number;
}

interface ITagComp {
  bgColor?: string;
  textColor: string;
  text: string;
  borderColor?: string;
}

interface IFilterJobs {
  array: string[];
  title: string;
}

interface IJobDescription {
  logo: string;
  position: string;
  company: string;
  place: string;
  type: string;
  description: string[];
  whoYouAre: string[];
  plus: string[];
  applyBefore: string;
  createdAt: string;
  jobType: string;
  salary: string;
  category: string[];
  skills: string[];
  perks: { icon: React.ElementType; title: string; text: string }[];
}

export type {
  IButtton,
  ILogo,
  ICards,
  ICardId,
  IProgressBarProps,
  ITagComp,
  IFilterJobs,
  IJobDescription,
};

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
  /* roles: string;
  status: string;
  datePosted: string;
  dueDate: string;
  jobType: string;
  applicants: string;
  needs: string; */
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
  onSubmit: (company: { name: string; logo: File | null; bio: string }) => void;
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

export interface IApplicantProps {
  label: string;
  count: number;
  color: string;
}

export interface ITotalApplicantProps {
  applicants: IApplicantProps[];
  totalApplicants: number;
}

export interface IStatusCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}


export interface IMiniStatusCardProps {
  title: string;
  value: string | number;
  trend: "up" | "down";
  percentage: string;
}