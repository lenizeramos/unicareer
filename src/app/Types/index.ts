interface IButtton {
  text: string;
  IsWhite: boolean;
  width?: string;
  onClick?: () => void;
}

interface ILogo {
  logoSize?: number;
  fontSize?: string;
}

export type { IButtton, ILogo };

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
