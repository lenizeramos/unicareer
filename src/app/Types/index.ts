import React from 'react';

interface IButtton {
  text: string | React.ReactNode;
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
