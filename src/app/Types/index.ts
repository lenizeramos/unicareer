import React from 'react';

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

interface ICardId extends Omit<ICards, 'cardId'>{
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
  logo:string;
  position:string;
  company:string;
  place:string;
  type:string;
  description:string[];
  whoYouAre:string[];
  plus:string[];
  applyBefore:string;
  createdAt:string;
  jobType:string;
  salary:string;
  category:string[];
  skills:string[]
  perks:{icon:React.ElementType, title:string, text:string}[];
  
}

export type {
  IButtton,
  ILogo,
  ICards,
  ICardId,
  IProgressBarProps,
  ITagComp,
  IFilterJobs,
  IJobDescription
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
  roles: string;
  status: string;
  datePosted: string;
  dueDate: string;
  jobType: string;
  applicants: string;
  needs: string;
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

export interface IBadge {
  status: string;
  color: string;
}
