interface IButtton {
  text: string;
  IsWhite: boolean;
  width?: string;
}

interface ILogo {
  logoSize?: number;
  fontSize?: string;
}

export type { IButtton, ILogo };

export interface IDashboardNavbar {
  title: string;
  backArrow?: boolean;
  button?: IButtton;
}

export interface IDashboardWelcome {
  greeting: string;
  message: string;
  date: string;
}